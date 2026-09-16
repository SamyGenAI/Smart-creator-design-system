import fs from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { chromium } from 'playwright'
import sharp from 'sharp'
import { MODES } from './src/modes.js'
import { ensureAllPptxDecks, ensurePptxDeck, readPptxFile } from './scripts/sync-pptx-previews.mjs'

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
 * One Chromium, one page, N screenshots. The frame is driven in-page through
 * `window.__setMotionFrame` (published by MotionProvider when `export=1`);
 * reloading the page per frame turns a ~5s export into ~60s.
 *
 * Encoding note, learned the hard way: `pageHeight` MUST sit inside the `raw`
 * object. Outside it, sharp silently produces a 1-frame GIF. And
 * `sharp(pngBuffers, { join: { animated: true } })` drops every per-frame delay
 * after the first.
 */
async function handleGifExport(req, res, url) {
  let browser = null
  try {
    const modeKey = url.searchParams.get('mode') || ''
    const mode = MODES[modeKey]
    if (!mode) {
      res.statusCode = 400
      res.end(`Unknown mode "${modeKey}"`)
      return
    }
    // Animation is infographic-only, mirroring how PDF rejects non-carousels.
    if (mode.type !== 'infographic') {
      res.statusCode = 400
      res.end('GIF export is only supported for infographic modes.')
      return
    }

    const size = SIZES.infographic
    const fps = Math.max(1, Math.min(60, Number(url.searchParams.get('fps') || 30)))
    const durationInFrames = Math.max(
      1,
      Math.min(300, Number(url.searchParams.get('durationInFrames') || 90))
    )
    // Half scale (540×675). Capped at 1, not just defaulted: full-size frames
    // take far longer to render and the extra resolution does not survive GIF's
    // 256-colour quantisation, so it only buys a slower, heavier file.
    const scale = Math.max(0.25, Math.min(1, Number(url.searchParams.get('scale') || 0.5)))
    const width = Math.round(size.width * scale)
    const height = Math.round(size.height * scale)

    const host = req.headers.host || 'localhost:5173'

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

    const frames = []
    for (let frame = 0; frame < durationInFrames; frame += 1) {
      await page.evaluate((f) => {
        if (typeof window.__setMotionFrame === 'function') window.__setMotionFrame(f)
      }, frame)
      // Let React commit the new frame before the shutter.
      await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => resolve())))
      const png = await locator.first().screenshot({ type: 'png', scale: 'device' })
      const raw = await sharp(png).resize(width, height, { fit: 'fill' }).removeAlpha().raw().toBuffer()
      frames.push(raw)
    }

    await browser.close()
    browser = null

    // Hold the last frame ~1s so the loop reads as a finished design rather
    // than a flicker.
    const perFrame = Math.round(1000 / fps)
    const delay = frames.map((_, i) => (i === frames.length - 1 ? 1000 : perFrame))

    const gif = await sharp(Buffer.concat(frames), {
      raw: { width, height: height * frames.length, channels: 3, pageHeight: height },
    })
      .gif({ delay, loop: 0, dither: 1.0 })
      .toBuffer()

    res.statusCode = 200
    res.setHeader('Content-Type', 'image/gif')
    res.setHeader('Content-Disposition', `attachment; filename="${mode.exportName || modeKey}.gif"`)
    res.end(gif)
  } catch (error) {
    if (browser) await browser.close().catch(() => {})
    res.statusCode = 500
    res.end(`Export failed: ${error?.message || 'Unknown error'}`)
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
