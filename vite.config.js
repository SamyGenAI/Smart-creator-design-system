import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { chromium } from 'playwright'
import sharp from 'sharp'

const SIZES = {
  carousel: { width: 1080, height: 1350 },
  infographic: { width: 1080, height: 1350 },
  slides: { width: 1280, height: 720 },
}

const MODES = {
  'ai-os': { label: 'What is an AI OS?', type: 'infographic' },
  'notion-ai-pipeline': { label: 'Notion AI Pipeline', type: 'infographic' },
  'claude-design-wins': { label: 'Claude Design - 5 Wins', type: 'infographic' },
  igentivVSL: { label: 'Igentiv VSL', type: 'slides' },
  mckinsey: { label: 'McKinsey Carousel', type: 'carousel' },
  scheduleTasks: { label: 'Schedule Tasks Carousel', type: 'carousel' },
  openclaw: { label: 'OpenClaw 24/7 Agent Carousel', type: 'carousel' },
  leadSearch: { label: 'Lead Search Carousel', type: 'carousel' },
  linkedIn: { label: 'LinkedIn Carousel', type: 'carousel' },
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
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || '/', 'http://localhost')
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
          const host = req.headers.host || 'localhost:5173'
          const slide = Number(url.searchParams.get('slide'))
          const hasSlide = Number.isInteger(slide) && slide >= 0
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
            if (hasSlide && mode.type === 'slides') {
              await page.locator('button[style*="border-radius: 4px"]').nth(slide).click()
              await page.waitForTimeout(250)
            }
            const target = mode.type === 'slides' ? locator.first() : locator.first()
            const buffer = await target.screenshot({ type: 'png', scale: 'device' })
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
