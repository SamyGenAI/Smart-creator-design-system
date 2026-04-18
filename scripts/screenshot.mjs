#!/usr/bin/env node
/**
 * Screenshot a rendered design from the dev server.
 *
 * Usage:
 *   node scripts/screenshot.mjs <mode-key> [out-path]
 *
 * The mode-key must match a key in src/App.jsx MODES (e.g. "openclaw",
 * "claude-cowork-setup", "igentivVSL"). For slide decks every slide is
 * captured into a numbered file (out-1.png, out-2.png, ...).
 *
 * Output defaults to qc-screenshots/<mode-key>.png — that folder is
 * git-ignored and reserved for QC output. User-authored content screenshots
 * live under public/screenshots/ and are served by Vite at /screenshots/...
 *
 * Examples:
 *   node scripts/screenshot.mjs claude-cowork-setup
 *   node scripts/screenshot.mjs openclaw qc-screenshots/openclaw.png
 *   node scripts/screenshot.mjs igentivVSL qc-screenshots/vsl.png
 *
 * Requires the dev server to be running (pnpm dev). Reads the actual port
 * from the Vite output if not 5173.
 */

import { chromium } from 'playwright'
import { mkdirSync, existsSync, readFileSync } from 'node:fs'
import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const SIZES = {
  carousel: { width: 1080, height: 1350 },
  infographic: { width: 1080, height: 1350 },
  slides: { width: 1280, height: 720 },
}

function parseModes() {
  const appSrc = readFileSync(join(ROOT, 'src/App.jsx'), 'utf8')
  const block = appSrc.match(/const MODES = \{([\s\S]*?)\n\}/)?.[1] ?? ''
  const modes = {}
  const entryRe = /['"]?([\w-]+)['"]?\s*:\s*\{[\s\S]*?label:\s*['"]([^'"]+)['"][\s\S]*?type:\s*['"](\w+)['"][\s\S]*?\}/g
  let m
  while ((m = entryRe.exec(block)) !== null) {
    modes[m[1]] = { label: m[2], type: m[3] }
  }
  return modes
}

async function detectPort() {
  for (const port of [5173, 5174, 5175, 5176]) {
    try {
      const res = await fetch(`http://localhost:${port}/`)
      if (res.ok) return port
    } catch {}
  }
  throw new Error('Dev server not reachable on ports 5173–5176. Run `pnpm dev` first.')
}

async function main() {
  const [, , modeKey, outArg] = process.argv
  if (!modeKey) {
    console.error('Usage: node scripts/screenshot.mjs <mode-key> [out-path]')
    process.exit(1)
  }

  const modes = parseModes()
  const mode = modes[modeKey]
  if (!mode) {
    console.error(`Unknown mode "${modeKey}". Available: ${Object.keys(modes).join(', ')}`)
    process.exit(1)
  }

  const size = SIZES[mode.type]
  if (!size) {
    console.error(`Unsupported type "${mode.type}" for mode "${modeKey}".`)
    process.exit(1)
  }

  const port = await detectPort()
  const out = outArg || `qc-screenshots/${modeKey}.png`
  const outAbs = resolve(ROOT, out)
  mkdirSync(dirname(outAbs), { recursive: true })

  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1600, height: 1500 } })
  await page.goto(`http://localhost:${port}/`)

  // Click the mode button by label
  await page.getByRole('button', { name: mode.label, exact: true }).click()
  await page.waitForTimeout(400)

  // Locator that matches an actual slide/canvas root (1080×1350 or 1280×720).
  const slideLocator = page.locator(
    `div[style*="width: ${size.width}px"][style*="height: ${size.height}px"]`
  )

  if (mode.type === 'slides') {
    // Slide deck — click each dot indicator and capture the visible slide.
    const dots = await page.locator('button[style*="border-radius: 4px"]').count()
    const total = dots || 1
    const base = outAbs.replace(/\.png$/, '')
    for (let i = 0; i < total; i++) {
      await page.locator('button[style*="border-radius: 4px"]').nth(i).click()
      await page.waitForTimeout(450)
      const file = `${base}-${i + 1}.png`
      await slideLocator.first().screenshot({ path: file })
      console.log(`✓ ${file}`)
    }
  } else if (mode.type === 'carousel') {
    // Carousel = horizontal strip. Capture every slide into numbered files.
    const total = await slideLocator.count()
    const base = outAbs.replace(/\.png$/, '')
    for (let i = 0; i < total; i++) {
      const file = total === 1 ? outAbs : `${base}-${i + 1}.png`
      await slideLocator.nth(i).scrollIntoViewIfNeeded()
      await slideLocator.nth(i).screenshot({ path: file })
      console.log(`✓ ${file}`)
    }
  } else {
    // Infographic — single canvas.
    await slideLocator.first().screenshot({ path: outAbs })
    console.log(`✓ ${outAbs}`)
  }

  await browser.close()
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
