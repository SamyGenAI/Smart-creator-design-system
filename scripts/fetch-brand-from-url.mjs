/**
 * Fetch brand signals from a website via Firecrawl (branding profile + full-page screenshot).
 * Writes public/brand-data.json for the brand-setup workflow.
 *
 * Usage: node scripts/fetch-brand-from-url.mjs https://example.com
 * Env: FIRECRAWL_API_KEY (required) — https://www.firecrawl.dev/
 *
 * Request: Firecrawl v2 /scrape with `branding` + full-page `screenshot` (and optional helpers below).
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DEFAULT_OUT = resolve(ROOT, 'public', 'brand-data.json')
const DEFAULT_ASSET_DIR = resolve(ROOT, 'public', 'assets', 'brand-firecrawl')
const FIRECRAWL_SCRAPE = 'https://api.firecrawl.dev/v2/scrape'
const MAX_IMAGE_DOWNLOADS = 12

const envPath = resolve(ROOT, '.env')
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const [key, ...val] = trimmed.split('=')
    if (key?.trim() && process.env[key.trim()] === undefined) {
      process.env[key.trim()] = val.join('=').trim()
    }
  }
}

function getTargetUrl(argv) {
  const positional = argv.filter((a) => !a.startsWith('--'))
  const url = positional[0]
  if (!url) throw new Error('Usage: node scripts/fetch-brand-from-url.mjs <https://...>')
  try {
    new URL(url)
  } catch {
    throw new Error(`Invalid URL: ${url}`)
  }
  return url
}

function sleep(ms) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms))
}

function toPublicRelative(absPath) {
  return absPath.replace(ROOT + '\\', '').replaceAll('\\', '/')
}

function safeSlug(value, fallback = 'asset') {
  const clean = String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return clean || fallback
}

function extensionFrom(urlLike, contentType) {
  if (contentType?.includes('image/png')) return '.png'
  if (contentType?.includes('image/jpeg')) return '.jpg'
  if (contentType?.includes('image/webp')) return '.webp'
  if (contentType?.includes('image/gif')) return '.gif'
  if (contentType?.includes('image/svg+xml')) return '.svg'
  const match = String(urlLike).match(/\.(png|jpg|jpeg|webp|gif|svg)(?:$|\?)/i)
  if (!match) return '.png'
  return `.${match[1].toLowerCase() === 'jpeg' ? 'jpg' : match[1].toLowerCase()}`
}

function normalizeMeta(value) {
  if (value == null) return ''
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean).join(' ').trim()
  }
  return String(value).trim()
}

/**
 * @param {object | null | undefined} branding
 * @returns {Record<string, string>}
 */
function imagesRecordFromBranding(branding) {
  const images = {}
  if (!branding) return images
  if (branding.logo && /^https?:\/\//i.test(branding.logo)) {
    images.logo = branding.logo
  }
  if (branding.images && typeof branding.images === 'object') {
    for (const [k, v] of Object.entries(branding.images)) {
      if (typeof v === 'string' && /^https?:\/\//i.test(v)) images[k] = v
    }
  }
  return images
}

/**
 * @param {object | null | undefined} branding
 * @returns {string[]}
 */
function colorsFromBranding(branding) {
  if (!branding?.colors || typeof branding.colors !== 'object') return []
  const out = []
  for (const v of Object.values(branding.colors)) {
    if (typeof v === 'string' && v.trim()) out.push(v.trim())
  }
  return [...new Set(out.map((c) => c.toLowerCase()))]
}

/**
 * @param {object | null | undefined} branding
 * @returns {string[]}
 */
function fontsFromBranding(branding) {
  const out = []
  if (Array.isArray(branding?.fonts)) {
    for (const f of branding.fonts) {
      if (f && typeof f.family === 'string' && f.family.trim()) out.push(f.family.trim())
    }
  }
  const ff = branding?.typography?.fontFamilies
  if (ff && typeof ff === 'object') {
    for (const v of Object.values(ff)) {
      if (typeof v === 'string' && v.trim()) out.push(v.trim())
    }
  }
  return [...new Set(out)]
}

/**
 * @param {object | null | undefined} branding
 * @returns {string[]}
 */
function designPatternsFromBranding(branding) {
  const p = []
  if (!branding) return p
  if (branding.colorScheme) p.push(`Color scheme: ${branding.colorScheme}`)
  const br = branding.spacing?.borderRadius
  if (br) p.push(`Border radius: ${br}`)
  if (branding.spacing?.baseUnit != null) p.push(`Spacing base unit: ${branding.spacing.baseUnit}px`)
  if (branding.animations && typeof branding.animations === 'object' && Object.keys(branding.animations).length) {
    p.push('Motion / transitions detected')
  }
  return p
}

function typographySnippet(branding) {
  if (!branding?.typography) return ''
  try {
    return JSON.stringify(branding.typography).slice(0, 3000)
  } catch {
    return ''
  }
}

async function scrapeWithFirecrawl(targetUrl) {
  const key = process.env.FIRECRAWL_API_KEY
  if (!key) {
    throw new Error(
      'Missing FIRECRAWL_API_KEY in .env. Get an API key at https://www.firecrawl.dev/ and add FIRECRAWL_API_KEY=...'
    )
  }

  const response = await fetch(FIRECRAWL_SCRAPE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: targetUrl,
      onlyMainContent: false,
      maxAge: 172800000,
      parsers: [],
      formats: ['branding', { type: 'screenshot', fullPage: true }],
    }),
  })

  const rawText = await response.text()
  let json
  try {
    json = JSON.parse(rawText)
  } catch {
    throw new Error(`Firecrawl: expected JSON (${response.status}): ${rawText.slice(0, 500)}`)
  }

  if (!response.ok) {
    throw new Error(`Firecrawl: ${response.status} ${json?.error || json?.message || rawText.slice(0, 400)}`)
  }
  if (json.success === false) {
    throw new Error(`Firecrawl: ${json.error || json.message || 'scrape failed'}`)
  }

  return json.data || {}
}

async function downloadAsset(assetUrl, outDir, baseName) {
  try {
    const response = await fetch(assetUrl)
    if (!response.ok) {
      console.warn(`[fetch-brand-from-url] Asset download failed (${response.status}): ${assetUrl}`)
      return null
    }
    const contentType = response.headers.get('content-type') || ''
    const ext = extensionFrom(assetUrl, contentType)
    const filename = `${safeSlug(baseName)}${ext}`
    const outPath = resolve(outDir, filename)
    const arrayBuffer = await response.arrayBuffer()
    writeFileSync(outPath, Buffer.from(arrayBuffer))
    return outPath
  } catch (err) {
    console.warn(`[fetch-brand-from-url] Asset download error: ${assetUrl}`, err?.message || err)
    return null
  }
}

/**
 * @param {string} outDir
 * @param {string | null | undefined} screenshotField URL or data: URI from Firecrawl
 * @returns {Promise<string | null>}
 */
async function saveScreenshot(outDir, screenshotField) {
  if (!screenshotField) return null
  if (screenshotField.startsWith('data:')) {
    const m = screenshotField.match(/^data:image\/(\w+);base64,(.+)$/s)
    if (m) {
      const buf = Buffer.from(m[2], 'base64')
      const ext = m[1].toLowerCase() === 'jpeg' ? 'jpg' : m[1].toLowerCase()
      const outPath = resolve(outDir, `website-screenshot.${ext}`)
      writeFileSync(outPath, buf)
      return outPath
    }
    return null
  }
  return downloadAsset(screenshotField, outDir, 'website-screenshot')
}

async function fetchOnce(targetUrl) {
  const data = await scrapeWithFirecrawl(targetUrl)
  const branding = data.branding || null
  const meta = data.metadata && typeof data.metadata === 'object' ? data.metadata : {}

  const title = normalizeMeta(meta.title)
  const description = normalizeMeta(meta.description)
  const screenshotRemote =
    typeof data.screenshot === 'string' && data.screenshot.trim() ? data.screenshot.trim() : ''

  const colors = colorsFromBranding(branding)
  const fonts = fontsFromBranding(branding)
  const designPatterns = designPatternsFromBranding(branding)

  const images = imagesRecordFromBranding(branding)

  const metaLines = [title, description].filter(Boolean)
  const personality = branding?.personality
  let personalityLine = ''
  if (personality && typeof personality === 'object') {
    try {
      personalityLine = JSON.stringify(personality)
    } catch {
      personalityLine = ''
    }
  }
  const contentPreview = [metaLines.join('\n\n'), personalityLine].filter(Boolean).join('\n\n').slice(0, 8000)

  const links = {}
  if (branding?.logo && /^https?:\/\//i.test(branding.logo)) {
    links.logo = branding.logo
  }

  return {
    raw: data,
    branding,
    title,
    description,
    contentPreview,
    images,
    links,
    screenshotUrl: screenshotRemote || null,
    colors,
    fonts,
    designPatterns,
    cssSnippet: typographySnippet(branding),
  }
}

async function fetchWithRetries(targetUrl, maxAttempts = 3) {
  let last = null
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const result = await fetchOnce(targetUrl)
    last = result
    if (result.colors.length > 0) {
      if (attempt > 1) {
        console.log(`[fetch-brand-from-url] Colors found on retry ${attempt}/${maxAttempts}`)
      }
      return { ...result, attemptsUsed: attempt }
    }
    if (attempt < maxAttempts) {
      const waitMs = 800 * attempt
      console.warn(
        `[fetch-brand-from-url] No branded colors detected (attempt ${attempt}/${maxAttempts}). Retrying in ${waitMs}ms...`
      )
      await sleep(waitMs)
    }
  }
  return { ...last, attemptsUsed: maxAttempts }
}

async function main() {
  const targetUrl = getTargetUrl(process.argv.slice(2))
  const outPath = DEFAULT_OUT
  const assetDir = DEFAULT_ASSET_DIR
  mkdirSync(resolve(ROOT, 'public'), { recursive: true })
  mkdirSync(assetDir, { recursive: true })

  const {
    raw,
    branding,
    title,
    description,
    contentPreview,
    images,
    links,
    screenshotUrl,
    colors,
    fonts,
    designPatterns,
    cssSnippet,
    attemptsUsed,
  } = await fetchWithRetries(targetUrl, 3)

  const savedAssets = {
    screenshot: null,
    images: [],
  }

  if (screenshotUrl) {
    const screenshotPath = await saveScreenshot(assetDir, screenshotUrl)
    if (screenshotPath) savedAssets.screenshot = toPublicRelative(screenshotPath)
  }

  const imageCandidates = Array.from(
    new Set(Object.values(images).filter((u) => typeof u === 'string' && /^https?:\/\//i.test(u)))
  ).slice(0, MAX_IMAGE_DOWNLOADS)

  for (let i = 0; i < imageCandidates.length; i += 1) {
    const localPath = await downloadAsset(imageCandidates[i], assetDir, `image-${String(i + 1).padStart(2, '0')}`)
    if (localPath) savedAssets.images.push(toPublicRelative(localPath))
  }

  const payload = {
    fetchedAt: new Date().toISOString(),
    attemptsUsed,
    source: 'firecrawl',
    url: targetUrl,
    title,
    description,
    contentPreview,
    images,
    links,
    screenshotUrl,
    savedAssets,
    brandingProfile: branding,
    colors,
    fonts,
    designPatterns,
    cssSnippet,
  }

  writeFileSync(outPath, JSON.stringify(payload, null, 2), 'utf8')
  console.log(`Wrote ${outPath}`)
  if (raw && typeof raw === 'object' && !branding) {
    console.warn('[fetch-brand-from-url] No branding object in response — check Firecrawl plan and URL.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
