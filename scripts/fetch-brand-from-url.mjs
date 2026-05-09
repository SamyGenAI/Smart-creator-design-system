/**
 * Fetch brand signals from a website via Jina Reader (HTML + content + pageshot).
 * Writes public/brand-data.json for the brand-setup workflow.
 *
 * Usage: node scripts/fetch-brand-from-url.mjs https://example.com
 * Env: JINA_API_KEY (optional, higher rate limits when set)
 */

import { mkdirSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DEFAULT_OUT = resolve(ROOT, 'public', 'brand-data.json')
const DEFAULT_ASSET_DIR = resolve(ROOT, 'public', 'assets', 'brand-jina')
const JINA_READER = 'https://r.jina.ai/'
const MAX_IMAGE_DOWNLOADS = 12

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

function jinaHeaders(extra = {}) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...extra,
  }
  const key = process.env.JINA_API_KEY
  if (key) headers.Authorization = `Bearer ${key}`
  return headers
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

async function fetchJinaHtml(targetUrl) {
  const response = await fetch(JINA_READER, {
    method: 'POST',
    headers: jinaHeaders({
      'X-Return-Format': 'html',
      'X-Timeout': '60',
    }),
    body: JSON.stringify({ url: targetUrl }),
  })
  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Jina Reader (html): ${response.status} ${text}`)
  }
  const json = await response.json()
  const data = json.data
  if (typeof data === 'object' && data !== null) {
    return data.html || data.content || ''
  }
  return typeof data === 'string' ? data : ''
}

async function fetchJinaContent(targetUrl) {
  const response = await fetch(JINA_READER, {
    method: 'POST',
    headers: jinaHeaders({
      'X-Return-Format': 'content',
      'X-With-Images-Summary': 'true',
      'X-With-Links-Summary': 'true',
      'X-Timeout': '60',
      'X-Remove-Selector':
        'script, noscript, iframe, .cookie-banner, .cookie-consent, .popup, .modal, .advertisement, .ads, [data-ad], .tracking, .analytics',
    }),
    body: JSON.stringify({ url: targetUrl }),
  })
  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Jina Reader (content): ${response.status} ${text}`)
  }
  const json = await response.json()
  const data = json.data
  if (typeof data === 'string') {
    return {
      title: '',
      description: '',
      url: targetUrl,
      content: data,
    }
  }
  return { ...data, url: data?.url || targetUrl }
}

async function fetchJinaScreenshot(targetUrl) {
  const response = await fetch(JINA_READER, {
    method: 'POST',
    headers: jinaHeaders({
      'X-Return-Format': 'pageshot',
      'X-Timeout': '30',
    }),
    body: JSON.stringify({ url: targetUrl }),
  })
  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Jina pageshot: ${response.status} ${text}`)
  }
  const json = await response.json()
  return json.data?.screenshotUrl || json.data?.url || ''
}

/**
 * @param {string} html
 * @returns {{ colors: string[], fonts: string[], cssSnippet: string, designPatterns: string[] }}
 */
function extractStylesFromHtml(html) {
  if (!html) {
    return { colors: [], fonts: [], cssSnippet: '', designPatterns: [] }
  }

  const colorCounts = new Map()
  const bumpColor = (raw) => {
    const key = String(raw).toLowerCase().replace(/\s/g, '')
    colorCounts.set(key, (colorCounts.get(key) || 0) + 1)
  }

  const isFilteredColor = (key) => {
    if (key.startsWith('rgba(') && key.endsWith(',0)')) return true
    if (!key.startsWith('#')) return false
    const body = key.slice(1)
    if (body.length === 3) return body === '000' || body === 'fff'
    if (body.length === 4) {
      const rgb = body.slice(0, 3)
      return rgb === '000' || rgb === 'fff'
    }
    if (body.length >= 6) {
      const rgb6 = body.slice(0, 6)
      return rgb6 === '000000' || rgb6 === 'ffffff'
    }
    return false
  }

  const fonts = new Set()
  const designPatterns = new Set()

  const hexPattern = /#(?:[0-9a-fA-F]{3,4}){1,2}\b/g
  for (const m of html.match(hexPattern) || []) bumpColor(m)

  const rgbPattern =
    /rgba?\s*\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*[\d.]+)?\s*\)/gi
  for (const m of html.match(rgbPattern) || []) bumpColor(m)

  const hslPattern =
    /hsla?\s*\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?(?:\s*,\s*[\d.]+)?\s*\)/gi
  for (const m of html.match(hslPattern) || []) bumpColor(m)

  const cssVarPattern = /--[\w-]+:\s*([^;]+)/gi
  let cssVarMatch
  while ((cssVarMatch = cssVarPattern.exec(html)) !== null) {
    const value = cssVarMatch[1].trim()
    if (value.match(/#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\(/)) {
      bumpColor(value)
    }
  }

  const fontFamilyPattern = /font-family\s*:\s*([^;}"]+)/gi
  let fontMatch
  while ((fontMatch = fontFamilyPattern.exec(html)) !== null) {
    const fontValue = fontMatch[1].trim().replace(/['"]/g, '')
    if (fontValue && !fontValue.includes('inherit') && !fontValue.includes('var(')) {
      fontValue.split(',').forEach((f) => {
        const cleaned = f.trim()
        if (
          cleaned &&
          ![
            'sans-serif',
            'serif',
            'monospace',
            'cursive',
            'fantasy',
            'system-ui',
            'ui-sans-serif',
            'ui-serif',
            'ui-monospace',
          ].includes(cleaned.toLowerCase())
        ) {
          fonts.add(cleaned)
        }
      })
    }
  }

  const fontFacePattern = /@font-face\s*\{[^}]*font-family\s*:\s*["']?([^"';}\s]+)["']?/gi
  let fontFaceMatch
  while ((fontFaceMatch = fontFacePattern.exec(html)) !== null) {
    fonts.add(fontFaceMatch[1].trim())
  }

  const googleFontsPattern = /fonts\.googleapis\.com\/css[^"']*family=([^"'&]+)/gi
  let googleMatch
  while ((googleMatch = googleFontsPattern.exec(html)) !== null) {
    const fontNames = decodeURIComponent(googleMatch[1]).split('|')
    fontNames.forEach((name) => {
      const cleanName = name.split(':')[0].replace(/\+/g, ' ').trim()
      if (cleanName) fonts.add(cleanName)
    })
  }

  const googleFontsV2Pattern = /fonts\.googleapis\.com\/css2\?family=([^"'&]+)/gi
  let googleV2Match
  while ((googleV2Match = googleFontsV2Pattern.exec(html)) !== null) {
    const fontPart = decodeURIComponent(googleV2Match[1])
    fontPart.split('&family=').forEach((part) => {
      const cleanName = part.split(':')[0].replace(/\+/g, ' ').trim()
      if (cleanName && cleanName !== 'family') fonts.add(cleanName)
    })
  }

  if (/use\.typekit\.net\/([a-z0-9]+)\.css/i.test(html)) {
    designPatterns.add('Adobe Fonts (Typekit)')
  }

  if (html.includes('tailwindcss') || /class="[^"]*(?:flex|grid|p-\d|m-\d|text-\w+-\d|bg-\w+-\d)[^"]*"/.test(html)) {
    designPatterns.add('Tailwind CSS')
  }
  if (html.includes('bootstrap') || /class="[^"]*(?:container|row|col-|btn-|navbar)[^"]*"/.test(html)) {
    designPatterns.add('Bootstrap')
  }
  if (html.includes('chakra') || html.includes('@chakra-ui')) designPatterns.add('Chakra UI')
  if (html.includes('material-ui') || html.includes('@mui')) designPatterns.add('Material UI')
  if (html.includes('ant-design') || html.includes('antd')) designPatterns.add('Ant Design')
  if (html.includes('framer-motion') || html.includes('motion.div')) designPatterns.add('Framer Motion')
  if (html.includes('gsap') || html.includes('greensock')) designPatterns.add('GSAP')
  if (html.includes('aos') && html.includes('data-aos')) designPatterns.add('AOS (Animate On Scroll)')
  if (html.includes('styled-components') || html.includes('sc-')) designPatterns.add('Styled Components')
  if (html.includes('emotion') || html.includes('css-')) designPatterns.add('Emotion CSS')

  const borderRadiusMatches = html.match(/border-radius\s*:\s*([^;}"]+)/gi) || []
  const roundedClasses = html.match(/rounded-(?:sm|md|lg|xl|2xl|3xl|full)/g) || []
  if (borderRadiusMatches.length > 10 || roundedClasses.length > 10) {
    designPatterns.add('Rounded corners (modern style)')
  }

  const shadowMatches = html.match(/box-shadow\s*:/gi) || []
  const shadowClasses = html.match(/shadow-(?:sm|md|lg|xl|2xl)/g) || []
  if (shadowMatches.length > 5 || shadowClasses.length > 5) {
    designPatterns.add('Shadow-heavy design')
  }

  const gradientMatches = html.match(/(?:linear-gradient|radial-gradient)/gi) || []
  if (gradientMatches.length > 3) designPatterns.add('Gradient usage')

  if (
    html.includes('dark:') ||
    html.includes('prefers-color-scheme: dark') ||
    html.includes('.dark ')
  ) {
    designPatterns.add('Dark mode support')
  }

  if (html.includes('backdrop-filter') || html.includes('backdrop-blur')) {
    designPatterns.add('Glassmorphism')
  }

  const styleTagPattern = /<style[^>]*>([\s\S]*?)<\/style>/gi
  const styleContents = []
  let styleMatch
  while ((styleMatch = styleTagPattern.exec(html)) !== null) {
    styleContents.push(styleMatch[1])
  }

  const inlineStylePattern = /style\s*=\s*["']([^"']+)["']/gi
  const inlineStyles = []
  let inlineMatch
  while ((inlineMatch = inlineStylePattern.exec(html)) !== null) {
    inlineStyles.push(inlineMatch[1])
  }

  const cssSnippet = [...styleContents.slice(0, 2), ...inlineStyles.slice(0, 10)]
    .join('\n')
    .substring(0, 3000)

  const rankedColors = [...colorCounts.entries()]
    .filter(([k]) => !isFilteredColor(k))
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k)
    .slice(0, 30)

  return {
    colors: rankedColors,
    fonts: Array.from(fonts).slice(0, 15),
    cssSnippet,
    designPatterns: Array.from(designPatterns),
  }
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

async function fetchOnce(targetUrl) {
  const [rawHtml, contentData, screenshot] = await Promise.all([
    fetchJinaHtml(targetUrl).catch((err) => {
      console.warn('[fetch-brand-from-url] HTML fetch failed:', err?.message || err)
      return ''
    }),
    fetchJinaContent(targetUrl),
    fetchJinaScreenshot(targetUrl).catch((err) => {
      console.warn('[fetch-brand-from-url] Screenshot fetch failed:', err?.message || err)
      return ''
    }),
  ])
  return { rawHtml, contentData, screenshot, extracted: extractStylesFromHtml(rawHtml) }
}

async function fetchWithRetries(targetUrl, maxAttempts = 3) {
  let last = null
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const result = await fetchOnce(targetUrl)
    last = result
    if (result.extracted.colors.length > 0) {
      if (attempt > 1) {
        console.log(`[fetch-brand-from-url] Colors found on retry ${attempt}/${maxAttempts}`)
      }
      return { ...result, attemptsUsed: attempt }
    }
    if (attempt < maxAttempts) {
      const waitMs = 800 * attempt
      console.warn(
        `[fetch-brand-from-url] No colors detected (attempt ${attempt}/${maxAttempts}). Retrying in ${waitMs}ms...`
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

  const { contentData, screenshot, extracted, attemptsUsed } = await fetchWithRetries(targetUrl, 3)

  const savedAssets = {
    screenshot: null,
    images: [],
  }

  if (screenshot) {
    const screenshotPath = await downloadAsset(screenshot, assetDir, 'website-screenshot')
    if (screenshotPath) savedAssets.screenshot = toPublicRelative(screenshotPath)
  }

  const imageCandidates = Array.from(
    new Set(
      Object.values(contentData.images || {}).filter(
        (value) => typeof value === 'string' && /^https?:\/\//i.test(value)
      )
    )
  ).slice(0, MAX_IMAGE_DOWNLOADS)

  for (let i = 0; i < imageCandidates.length; i += 1) {
    const localPath = await downloadAsset(imageCandidates[i], assetDir, `image-${String(i + 1).padStart(2, '0')}`)
    if (localPath) savedAssets.images.push(toPublicRelative(localPath))
  }

  const payload = {
    fetchedAt: new Date().toISOString(),
    attemptsUsed,
    url: targetUrl,
    title: contentData.title || '',
    description: contentData.description || '',
    contentPreview: (contentData.content || '').slice(0, 8000),
    images: contentData.images || {},
    links: contentData.links || {},
    screenshotUrl: screenshot || null,
    savedAssets,
    colors: extracted.colors,
    fonts: extracted.fonts,
    designPatterns: extracted.designPatterns,
    cssSnippet: extracted.cssSnippet,
  }

  writeFileSync(outPath, JSON.stringify(payload, null, 2), 'utf8')
  console.log(`Wrote ${outPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
