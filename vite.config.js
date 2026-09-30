import fs from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { chromium } from 'playwright'
import sharp from 'sharp'
// gifenc ships as CommonJS, so it has no named ESM exports — destructure the
// default import. Named `import { GIFEncoder } from 'gifenc'` throws at load.
import gifenc from 'gifenc'
import { MODES } from './src/modes.js'
import { ensureAllPptxDecks, ensurePptxDeck, readPptxFile } from './scripts/sync-pptx-previews.mjs'

const { GIFEncoder, quantize, applyPalette } = gifenc

const SIZES = {
  carousel: { width: 1080, height: 1350 },
  infographic: { width: 1080, height: 1350 },
  thumbnail: { width: 420, height: 300 },
}

function pdfFromJpegs(pages) {
  const parts = []
  let offset = 0
  const offsets = [0]
  const push = (buf) => {
    parts.push(buf)
    offset += buf.length
  }
  const pushTxt = (txt) => push(Buffer.from(txt, 'utf8'))
  pushTxt('%PDF-1.4\n')

  const objects = []
  const addObject = (builder) => {
    const id = objects.length + 1
    objects.push({ id, builder })
    return id
  }

  const pageIds = []
  for (const page of pages) {
    const pageWPt = (page.widthPx * 72) / 96
    const pageHPt = (page.heightPx * 72) / 96
    const imageId = addObject(() => [
      Buffer.from(`<< /Type /XObject /Subtype /Image /Width ${page.widthPx} /Height ${page.heightPx} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page.jpeg.length} >>\nstream\n`, 'utf8'),
      page.jpeg,
      Buffer.from('\nendstream\n', 'utf8'),
    ])
    const stream = `q\n${pageWPt} 0 0 ${pageHPt} 0 0 cm\n/Im${imageId} Do\nQ\n`
    const contentId = addObject(() => Buffer.from(`<< /Length ${stream.length} >>\nstream\n${stream}endstream\n`, 'utf8'))
    const pageId = addObject(() => Buffer.from(`<< /Type /Page /Parent PAGES_ID 0 R /MediaBox [0 0 ${pageWPt} ${pageHPt}] /Resources << /XObject << /Im${imageId} ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>\n`, 'utf8'))
    pageIds.push(pageId)
  }

  const pagesId = addObject(() => Buffer.from(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>\n`, 'utf8'))
  const catalogId = addObject(() => Buffer.from(`<< /Type /Catalog /Pages ${pagesId} 0 R >>\n`, 'utf8'))

  for (const obj of objects) {
    offsets.push(offset)
    pushTxt(`${obj.id} 0 obj\n`)
    const built = obj.builder()
    const items = Array.isArray(built) ? built : [built]
    for (const item of items) {
      if (Buffer.isBuffer(item)) {
        const text = item.toString('utf8')
        if (text.includes('PAGES_ID')) push(Buffer.from(text.replace('PAGES_ID', String(pagesId)), 'utf8'))
        else push(item)
      } else {
        push(Buffer.from(String(item).replace('PAGES_ID', String(pagesId)), 'utf8'))
      }
    }
    pushTxt('endobj\n')
  }

  const xrefOffset = offset
  pushTxt(`xref\n0 ${objects.length + 1}\n`)
  pushTxt('0000000000 65535 f \n')
  for (let i = 1; i <= objects.length; i += 1) pushTxt(`${String(offsets[i]).padStart(10, '0')} 00000 n \n`)
  pushTxt(`trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`)
  return Buffer.concat(parts)
}

/**
 * Wait for fonts and images before the first screenshot. Shared with the PNG
 * path so a GIF frame and a PNG of the same design settle identically.
 */
async function waitForAssets(page) {
  await page.evaluate(async () => {
    await document.fonts.ready
    await Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map((img) => new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true })
          img.addEventListener('error', resolve, { once: true })
        }))
    )
  })
}

/**
 * GIF export — infographics only.
 *
 * Output size is the design's own 1080×1350 by default, or `outputScale`×that
 * for a smaller file (the toolbar offers 0.5 → 540×675). The page is always
 * rasterised at full density and downsampled, so the small variant stays sharp.
 *
 * One Chromium, one page, N screenshots. The frame is driven in-page through
 * `window.__setMotionFrame` (published by MotionProvider when `export=1`);
 * reloading the page per frame turns a ~5s export into ~60s.
 *
 * Two response shapes, same render path:
 *   - default          → the GIF bytes, as a normal file download.
 *   - `?stream=1`      → Server-Sent Events carrying real progress
 *                        ({phase,frame,total}) while frames render, then one
 *                        final `done` event holding the GIF as base64. The
 *                        client cannot see progress on a plain binary response,
 *                        and a 166-frame render at full size is long enough
 *                        that a determinate bar matters.
 *
 * ENCODING: frames are encoded INCREMENTALLY with gifenc — quantised and
 * written to the GIF stream as each one is captured, then discarded. Peak
 * memory is one frame and there is no cap on timeline length.
 *
 * Do not go back to sharp for this. Both of sharp's animated-GIF forms are
 * dead ends here:
 *   - `sharp(concat, { raw: { pageHeight } })` needs every frame stacked into
 *     one tall image, which trips `limitInputPixels` (268,402,689 px) past
 *     ~184 frames at 1080×1350 → "Input image exceeds pixel limit".
 *   - `sharp(pngBuffers, { join: { animated: true } })` drops every per-frame
 *     delay after the first.
 * (And in the strip form, `pageHeight` had to sit INSIDE `raw` or sharp
 * silently emitted a 1-frame GIF.)
 */
async function handleGifExport(req, res, url) {
  let browser = null
  // Progress is opt-in so the plain `/api/export/gif` download keeps working
  // byte-for-byte for any caller that is not listening for events.
  const streaming = url.searchParams.get('stream') === '1'
  let sseOpen = false
  const sendEvent = (event, data) => {
    if (!streaming || !sseOpen) return
    // Explicit escapes, not a multi-line template: the SSE framing
    // (`event:`, `data:`, blank-line terminator) must survive any reformat.
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
  }
  const fail = (status, message) => {
    if (streaming && sseOpen) {
      sendEvent('error', { message })
      res.end()
    } else {
      res.statusCode = status
      res.end(message)
    }
  }
  try {
    const modeKey = url.searchParams.get('mode') || ''
    const mode = MODES[modeKey]
    if (!mode) {
      fail(400, `Unknown mode "${modeKey}"`)
      return
    }
    // Animation is infographic-only, mirroring how PDF rejects non-carousels.
    if (mode.type !== 'infographic') {
      fail(400, 'GIF export is only supported for infographic modes.')
      return
    }

    if (streaming) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/event-stream')
      res.setHeader('Cache-Control', 'no-cache')
      res.setHeader('Connection', 'keep-alive')
      // Vite sits behind no proxy in dev, but this is free insurance against
      // one buffering the stream and defeating the whole point.
      res.setHeader('X-Accel-Buffering', 'no')
      res.flushHeaders?.()
      sseOpen = true
    }

    const size = SIZES.infographic
    const fps = Math.max(1, Math.min(60, Number(url.searchParams.get('fps') || 30)))
    // The incremental encoder has no duration ceiling, so this cap exists only
    // to stop a typo'd query param from launching an hours-long render. It used
    // to be 300, which SILENTLY TRUNCATED longer designs — and a design's tail
    // is exactly where its settled final frame lives, so truncation dropped the
    // finished state. 1800 frames is 60s at 30fps, well past any infographic.
    const durationInFrames = Math.max(
      1,
      Math.min(1800, Number(url.searchParams.get('durationInFrames') || 90))
    )
    // TWO INDEPENDENT SIZE KNOBS — do not collapse them into one.
    //
    //   scale     → Chromium's deviceScaleFactor, i.e. how densely the PAGE is
    //               rasterised before capture (supersampling).
    //   outputW/H → what the GIF actually is.
    //
    // Keeping them separate is what makes the half-size GIF look good: the page
    // is still rendered at full density and then downsampled, so text and logo
    // edges stay clean. Rendering small directly would just be blurry.
    const scale = Math.max(0.25, Math.min(2, Number(url.searchParams.get('scale') || 1)))

    // `outputScale` shrinks the OUTPUT only. 1 = the design's own 1080×1350;
    // 0.5 = 540×675, which is ~4x fewer pixels and so roughly a quarter of the
    // bytes. Clamped to (0, 1] — upscaling a GIF past the canvas size only adds
    // weight without adding detail.
    const outputScale = Math.max(0.1, Math.min(1, Number(url.searchParams.get('outputScale') || 1)))
    // Plain rounding, NOT rounded-to-even. GIF has no chroma subsampling, so
    // odd dimensions are fine here — and forcing even would distort the aspect
    // ratio, since 1350 * 0.5 = 675 is odd: rounding it to 676 stretches the
    // design vertically and makes the exported file disagree with the 540x675
    // the Export menu promises.
    const width = Math.max(1, Math.round(size.width * outputScale))
    const height = Math.max(1, Math.round(size.height * outputScale))

    const host = req.headers.host || 'localhost:5173'

    sendEvent('progress', { phase: 'launching', frame: 0, total: durationInFrames })

    browser = await chromium.launch()
    const context = await browser.newContext({
      viewport: { width: 1600, height: 1600 },
      deviceScaleFactor: scale,
    })
    const page = await context.newPage()

    const pageParams = new URLSearchParams({ mode: modeKey, export: '1', frame: '0' })
    for (const key of ['texture', 'textureOpacity']) {
      const value = url.searchParams.get(key)
      if (value) pageParams.set(key, value)
    }
    await page.goto(`http://${host}/?${pageParams}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(300)
    await waitForAssets(page)

    const locator = page.locator(
      `div[style*="width: ${size.width}px"][style*="height: ${size.height}px"]`
    )

    sendEvent('progress', { phase: 'rendering', frame: 0, total: durationInFrames })

    // Hold the last frame ~1s so the loop reads as a finished design rather
    // than a flicker.
    const perFrame = Math.round(1000 / fps)

    // INCREMENTAL ENCODE. Each frame is quantised and written into the GIF
    // stream the moment it is captured, then dropped — so peak memory is one
    // frame, not the whole timeline, and there is no upper bound on duration.
    //
    // This replaces a `sharp(Buffer.concat(frames), { raw: { pageHeight } })`
    // film strip, which stacked every frame into ONE tall image. That hit
    // sharp's `limitInputPixels` (0x3FFF ** 2 = 268,402,689 px) at 185+ frames
    // of 1080×1350 and failed with "Input image exceeds pixel limit" — so any
    // timeline past ~6.1s was unexportable regardless of content.
    const encoder = GIFEncoder()
    for (let frame = 0; frame < durationInFrames; frame += 1) {
      await page.evaluate((f) => {
        if (typeof window.__setMotionFrame === 'function') window.__setMotionFrame(f)
      }, frame)
      // Let React commit the new frame before the shutter.
      await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => resolve())))
      const png = await locator.first().screenshot({ type: 'png', scale: 'device' })
      // gifenc quantises RGBA, so keep the alpha channel here rather than
      // calling .removeAlpha() as the film-strip path did.
      // This resize is BOTH the scale normaliser and the output downsampler:
      // the screenshot arrives at (canvas * deviceScaleFactor), and this lands
      // it on the requested output size. Lanczos3 is sharp's default and is the
      // right kernel here — it keeps small type legible at 540×675, where a
      // cheaper kernel turns the 14.5px stat labels to mush.
      const rgba = await sharp(png)
        .resize(width, height, { fit: 'fill', kernel: 'lanczos3' })
        .ensureAlpha()
        .raw()
        .toBuffer()

      // Per-frame palette: each frame gets the 256 colours that suit it, which
      // is what keeps the glow gradients from banding. rgba4444 is gifenc's
      // fast path and is plenty for flat brand colour plus soft shadows.
      const palette = quantize(rgba, 256, { format: 'rgba4444' })
      const indexed = applyPalette(rgba, palette, 'rgba4444')
      encoder.writeFrame(indexed, width, height, {
        palette,
        delay: frame === durationInFrames - 1 ? 1000 : perFrame,
      })

      // Real progress: one event per captured frame, which is the only part of
      // this job whose duration actually scales with the timeline. Quantising
      // now happens inside this loop too, so each tick covers capture AND
      // encode for that frame — the bar reflects the true per-frame cost.
      sendEvent('progress', { phase: 'rendering', frame: frame + 1, total: durationInFrames })
    }

    await browser.close()
    browser = null

    // Still worth announcing: writing the trailer and concatenating the byte
    // chunks for a long timeline is not instant, and the client pulses the
    // full bar on this phase rather than sitting silently at 100%.
    sendEvent('progress', { phase: 'encoding', frame: durationInFrames, total: durationInFrames })

    encoder.finish()
    const gif = Buffer.from(encoder.bytes())

    const fileName = `${mode.exportName || modeKey}.gif`

    if (streaming) {
      sendEvent('done', {
        fileName,
        width,
        height,
        bytes: gif.length,
        gif: gif.toString('base64'),
      })
      res.end()
      return
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'image/gif')
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
    res.end(gif)
  } catch (error) {
    if (browser) await browser.close().catch(() => {})
    fail(500, `Export failed: ${error?.message || 'Unknown error'}`)
  }
}

function exportPlugin() {
  return {
    name: 'playwright-export-api',
    configureServer(server) {
      ensureAllPptxDecks().catch(() => {})

      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || '/', 'http://localhost')

        if (url.pathname === '/api/pptx/slides') {
          try {
            const modeKey = url.searchParams.get('mode') || ''
            const result = await ensurePptxDeck(modeKey)
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ slides: result.slideUrls }))
          } catch (error) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: error?.message || 'Failed to load slides', slides: [] }))
          }
          return
        }

        if (url.pathname === '/api/export/pptx') {
          try {
            const modeKey = url.searchParams.get('mode') || ''
            const mode = MODES[modeKey]
            if (!mode || mode.type !== 'pptx') {
              res.statusCode = 400
              res.end(`Unknown slide deck mode "${modeKey}"`)
              return
            }
            await ensurePptxDeck(modeKey)
            const pptxPath = readPptxFile(modeKey)
            const buffer = fs.readFileSync(pptxPath)
            res.statusCode = 200
            res.setHeader(
              'Content-Type',
              'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            )
            res.setHeader(
              'Content-Disposition',
              `attachment; filename="${mode.exportName || modeKey}.pptx"`,
            )
            res.end(buffer)
          } catch (error) {
            res.statusCode = 500
            res.end(`Export failed: ${error?.message || 'Unknown error'}`)
          }
          return
        }

        if (url.pathname === '/api/export/gif') {
          await handleGifExport(req, res, url)
          return
        }

        const isApi = url.pathname === '/api/export/png' || url.pathname === '/api/export/pdf'
        if (!isApi) return next()

        try {
          const modeKey = url.searchParams.get('mode') || ''
          const mode = MODES[modeKey]
          if (!mode) {
            res.statusCode = 400
            res.end(`Unknown mode "${modeKey}"`)
            return
          }

          const size = SIZES[mode.type]
          if (!size) {
            res.statusCode = 400
            res.end(`Unsupported mode type "${mode.type}" for image/PDF export.`)
            return
          }
          const host = req.headers.host || 'localhost:5173'
          const scale = Math.max(1, Math.min(4, Number(url.searchParams.get('scale') || (mode.type === 'infographic' || mode.type === 'thumbnail' ? '3' : '2'))))

          const browser = await chromium.launch()
          const context = await browser.newContext({
            viewport: { width: 1600, height: 1600 },
            deviceScaleFactor: scale,
          })
          const page = await context.newPage()
          // Forward the texture choice so the export matches the preview.
          const pageParams = new URLSearchParams({ mode: modeKey, export: '1' })
          for (const key of ['texture', 'textureOpacity']) {
            const value = url.searchParams.get(key)
            if (value) pageParams.set(key, value)
          }
          await page.goto(`http://${host}/?${pageParams}`, { waitUntil: 'networkidle' })
          await page.waitForTimeout(300)
          await waitForAssets(page)

          const locator = page.locator(`div[style*="width: ${size.width}px"][style*="height: ${size.height}px"]`)

          if (url.pathname === '/api/export/png') {
            const buffer = await locator.first().screenshot({ type: 'png', scale: 'device' })
            await browser.close()
            res.statusCode = 200
            res.setHeader('Content-Type', 'image/png')
            res.setHeader('Content-Disposition', `attachment; filename="${modeKey}.png"`)
            res.end(buffer)
            return
          }

          if (mode.type !== 'carousel') {
            await browser.close()
            res.statusCode = 400
            res.end('PDF export is only supported for carousel modes.')
            return
          }

          const count = await locator.count()
          const pages = []
          for (let i = 0; i < count; i += 1) {
            await locator.nth(i).scrollIntoViewIfNeeded()
            const png = await locator.nth(i).screenshot({ type: 'png', scale: 'device' })
            const jpeg = await sharp(png).jpeg({ quality: 95 }).toBuffer()
            pages.push({ jpeg, widthPx: size.width * scale, heightPx: size.height * scale })
          }
          await browser.close()
          const pdf = pdfFromJpegs(pages)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/pdf')
          res.setHeader('Content-Disposition', `attachment; filename="${modeKey}.pdf"`)
          res.end(pdf)
        } catch (error) {
          res.statusCode = 500
          res.end(`Export failed: ${error?.message || 'Unknown error'}`)
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), exportPlugin()],
})
