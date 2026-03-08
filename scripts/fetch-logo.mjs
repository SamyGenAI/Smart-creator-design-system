/**
 * Fetch company logos from Brandfetch and save locally.
 *
 * Usage:
 *   node scripts/fetch-logo.mjs notion.com hubspot.com figma.com
 *
 * Requires BRANDFETCH_API_KEY in .env
 * Saves SVGs to assets/logos/{domain}.svg
 * Skips domains that already have a local file.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const LOGOS_DIR = path.join(ROOT, 'assets', 'logos')

// Load API key from .env manually (no dotenv dependency)
const envPath = path.join(ROOT, '.env')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const [key, ...val] = line.split('=')
    if (key?.trim() && !process.env[key.trim()]) {
      process.env[key.trim()] = val.join('=').trim()
    }
  }
}

const API_KEY = process.env.BRANDFETCH_API_KEY
if (!API_KEY) {
  console.error('Missing BRANDFETCH_API_KEY in .env')
  process.exit(1)
}

const domains = process.argv.slice(2)
if (domains.length === 0) {
  console.error('Usage: node scripts/fetch-logo.mjs domain1.com domain2.com ...')
  process.exit(1)
}

for (const domain of domains) {
  const filename = domain.replace(/[^a-z0-9.-]/gi, '-') + '.svg'
  const dest = path.join(LOGOS_DIR, filename)

  if (fs.existsSync(dest)) {
    console.log(`✓ ${domain} — already exists (${filename})`)
    continue
  }

  console.log(`↓ ${domain} — fetching from Brandfetch...`)

  try {
    const res = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    })

    if (!res.ok) {
      console.error(`  ✗ ${domain} — API error ${res.status}: ${await res.text()}`)
      continue
    }

    const brand = await res.json()

    // Find a light-theme SVG — prefer type "logo" (full-color wordmark/brand), fallback to "symbol" or "icon"
    let svgUrl = null
    for (const preferredType of ['logo', 'symbol', 'icon']) {
      const entry = brand.logos?.find(l => l.theme === 'light' && l.type === preferredType)
        ?? brand.logos?.find(l => l.type === preferredType)
      const fmt = entry?.formats?.find(f => f.format === 'svg')
      if (fmt?.src) { svgUrl = fmt.src; break }
    }

    if (!svgUrl) {
      console.error(`  ✗ ${domain} — no SVG found (${brand.logos?.length ?? 0} logos returned)`)
      continue
    }

    const svgRes = await fetch(svgUrl)
    if (!svgRes.ok) {
      console.error(`  ✗ ${domain} — failed to download SVG (${svgRes.status})`)
      continue
    }

    fs.writeFileSync(dest, await svgRes.text(), 'utf8')
    console.log(`  ✓ saved → assets/logos/${filename}`)
  } catch (err) {
    console.error(`  ✗ ${domain} — ${err.message}`)
  }
}
