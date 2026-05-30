#!/usr/bin/env node
/**
 * Screenshot a rendered design from the dev server (Playwright).
 *
 * Usage:
 *   node scripts/screenshot.mjs <mode-key> [out-path] [--preview]
 *
 * Carousel / infographic: single file or numbered strip (qc-screenshots/ by default).
 * pptx deck:
 *   --preview  → public/screenshots/powerpoint/[previewSlug]/slide-01.jpg …
 *   (default)  → qc-screenshots/<mode-key>-1.png … for agent QA
 *
 * Requires `pnpm dev` to be running.
 *
 * Examples:
 *   node scripts/screenshot.mjs claude-code --preview
 *   node scripts/screenshot.mjs openclaw
 *   pnpm screenshot claude-code --preview
 */

import { chromium } from 'playwright'
import { mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { MODES } from '../src/modes.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const SIZES = {
  carousel: { width: 1080, height: 1350 },
  infographic: { width: 1080, height: 1350 },
  pptx: { width: 1280, height: 720 },
}

export async function detectDevPort() {
  for (const port of [5173, 5174, 5175, 5176]) {
    try {
      const res = await fetch(`http://localhost:${port}/`)
      if (res.ok) return port
    } catch {}
  }
  throw new Error('Dev server not reachable on ports 5173–5176. Run `pnpm dev` first.')
}

/**
 * Capture slides for a registered mode. Returns written file paths (absolute).
 */
export async function captureModeScreenshots(modeKey, options = {}) {
  const { preview = false, outArg = null, port: portOverride = null } = options

  const mode = MODES[modeKey]
  if (!mode) {
    throw new Error(`Unknown mode "${modeKey}". Available: ${Object.keys(MODES).join(', ')}`)
  }

  const size = SIZES[mode.type]
  if (!size) {
    throw new Error(`Unsupported type "${mode.type}" for mode "${modeKey}".`)
  }

  const port = portOverride ?? (await detectDevPort())
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1600, height: 1500 } })
  await page.goto(`http://localhost:${port}/`)

  await page.getByRole('button', { name: mode.label, exact: true }).click()
  await page.waitForTimeout(400)

  // pptx slides: all rendered in DOM simultaneously as div[data-name="pptx-slide"]
  // carousel / infographic: located by inline style dimensions
  const slideLocator =
    mode.type === 'pptx'
      ? page.locator('[data-name="pptx-slide"]')
      : page.locator(`div[style*="width: ${size.width}px"][style*="height: ${size.height}px"]`)

  const written = []

  try {
    if (mode.type === 'pptx') {
      await slideLocator.first().waitFor({ state: 'attached', timeout: 15000 })
      const total = await slideLocator.count()

      let outBase
      if (preview) {
        if (!mode.previewSlug) {
          throw new Error(`Mode "${modeKey}" has no previewSlug for --preview output.`)
        }
        outBase = join(ROOT, 'public', 'screenshots', 'powerpoint', mode.previewSlug, 'slide')
        mkdirSync(dirname(outBase + '-01.jpg'), { recursive: true })
      } else if (outArg) {
        outBase = resolve(ROOT, outArg).replace(/\.png$/i, '')
      } else {
        outBase = join(ROOT, 'qc-screenshots', modeKey)
        mkdirSync(dirname(outBase + '-1.png'), { recursive: true })
      }

      for (let i = 0; i < total; i += 1) {
        // Make slide visible by evaluating the DOM directly (no clicking needed)
        await page.evaluate((idx) => {
          const slides = document.querySelectorAll('[data-name="pptx-slide"]')
          slides.forEach((el, j) => {
            el.style.visibility = j === idx ? 'visible' : 'hidden'
          })
        }, i)
        await page.waitForTimeout(300)

        const pngPath = `${outBase}-${i + 1}.png`
        await slideLocator.nth(i).screenshot({ path: pngPath })

        if (preview) {
          const jpgPath = join(
            ROOT,
            'public',
            'screenshots',
            'powerpoint',
            mode.previewSlug,
            `slide-${String(i + 1).padStart(2, '0')}.jpg`,
          )
          await sharp(pngPath).jpeg({ quality: 92 }).toFile(jpgPath)
          written.push(jpgPath)
          console.log(`✓ ${jpgPath}`)
        } else {
          written.push(pngPath)
          console.log(`✓ ${pngPath}`)
        }
      }
    } else if (mode.type === 'carousel') {
      const total = await slideLocator.count()
      const outAbs = outArg ? resolve(ROOT, outArg) : resolve(ROOT, `qc-screenshots/${modeKey}.png`)
      mkdirSync(dirname(outAbs), { recursive: true })
      const base = outAbs.replace(/\.png$/i, '')

      for (let i = 0; i < total; i += 1) {
        const file = total === 1 ? outAbs : `${base}-${i + 1}.png`
        await slideLocator.nth(i).scrollIntoViewIfNeeded()
        await slideLocator.nth(i).screenshot({ path: file })
        written.push(file)
        console.log(`✓ ${file}`)
      }
    } else {
      const outAbs = outArg ? resolve(ROOT, outArg) : resolve(ROOT, `qc-screenshots/${modeKey}.png`)
      mkdirSync(dirname(outAbs), { recursive: true })
      await slideLocator.first().screenshot({ path: outAbs })
      written.push(outAbs)
      console.log(`✓ ${outAbs}`)
    }
  } finally {
    await browser.close()
  }

  return written
}

async function main() {
  const args = process.argv.slice(2).filter((a) => a !== '--preview')
  const preview = process.argv.includes('--preview')
  const [modeKey, outArg] = args

  if (!modeKey) {
    console.error('Usage: node scripts/screenshot.mjs <mode-key> [out-path] [--preview]')
    process.exit(1)
  }

  try {
    await captureModeScreenshots(modeKey, { preview, outArg })
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

const isMain =
  process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))
if (isMain) {
  main()
}
