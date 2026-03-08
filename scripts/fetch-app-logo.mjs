/**
 * Fetch square app/icon logos from logo.dev and save locally.
 *
 * Usage:
 *   node scripts/fetch-app-logo.mjs notion.com hubspot.com figma.com
 *
 * Requires LOGO_DEV_API_KEY in .env
 * Saves PNGs to assets/logos/app/{domain}.png
 * Skips domains that already have a local file.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const LOGOS_DIR = path.join(ROOT, 'assets', 'logos', 'app')

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

const API_KEY = process.env.LOGO_DEV_API_KEY
if (!API_KEY) {
  console.error('Missing LOGO_DEV_API_KEY in .env')
  process.exit(1)
}

const domains = process.argv.slice(2)
if (domains.length === 0) {
  console.error('Usage: node scripts/fetch-app-logo.mjs domain1.com domain2.com ...')
  process.exit(1)
}

for (const domain of domains) {
  const filename = domain.replace(/[^a-z0-9.-]/gi, '-') + '.png'
  const dest = path.join(LOGOS_DIR, filename)

  if (fs.existsSync(dest)) {
    console.log(`✓ ${domain} — already exists (${filename})`)
    continue
  }

  console.log(`↓ ${domain} — fetching from logo.dev...`)

  try {
    const url = `https://img.logo.dev/${domain}?token=${API_KEY}&size=64&format=png`
    const res = await fetch(url)

    if (!res.ok) {
      console.error(`  ✗ ${domain} — API error ${res.status}`)
      continue
    }

    const buffer = Buffer.from(await res.arrayBuffer())
    fs.writeFileSync(dest, buffer)
    console.log(`  ✓ saved → assets/logos/app/${filename}`)
  } catch (err) {
    console.error(`  ✗ ${domain} — ${err.message}`)
  }
}
