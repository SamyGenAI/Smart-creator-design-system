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

function exportPlugin() {
  return {
    name: 'playwright-export-api',
    configureServer(server) {
      ensureAllPptxDecks().catch((err) => {
        console.warn('[slides] Startup sync:', err.message)
      })

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
          const scale = Math.max(1, Math.min(4, Number(url.searchParams.get('scale') || (mode.type === 'infographic' ? '3' : '2'))))

          const browser = await chromium.launch()
          const context = await browser.newContext({
            viewport: { width: 1600, height: 1600 },
            deviceScaleFactor: scale,
          })
          const page = await context.newPage()
          await page.goto(`http://${host}/?mode=${encodeURIComponent(modeKey)}&export=1`, { waitUntil: 'networkidle' })
          await page.waitForTimeout(300)
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
