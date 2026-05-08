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
const JINA_READER = 'https://r.jina.ai/'

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

  const colors = new Set()
  const fonts = new Set()
  const designPatterns = new Set()

  const hexPattern = /#(?:[0-9a-fA-F]{3,4}){1,2}\b/g
  for (const m of html.match(hexPattern) || []) colors.add(m.toLowerCase())

  const rgbPattern =
    /rgba?\s*\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*[\d.]+)?\s*\)/gi
  for (const m of html.match(rgbPattern) || []) colors.add(m.toLowerCase().replace(/\s/g, ''))

  const hslPattern =
    /hsla?\s*\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?(?:\s*,\s*[\d.]+)?\s*\)/gi
  for (const m of html.match(hslPattern) || []) colors.add(m.toLowerCase().replace(/\s/g, ''))

  const cssVarPattern = /--[\w-]+:\s*([^;]+)/gi
  let cssVarMatch
  while ((cssVarMatch = cssVarPattern.exec(html)) !== null) {
    const value = cssVarMatch[1].trim()
    if (value.match(/#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\(/)) {
      colors.add(value.toLowerCase())
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

  return {
    colors: Array.from(colors).slice(0, 30),
    fonts: Array.from(fonts).slice(0, 15),
    cssSnippet,
    designPatterns: Array.from(designPatterns),
  }
}

async function main() {
  const targetUrl = getTargetUrl(process.argv.slice(2))
  const outPath = DEFAULT_OUT

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

  const extracted = extractStylesFromHtml(rawHtml)

  const payload = {
    fetchedAt: new Date().toISOString(),
    url: targetUrl,
    title: contentData.title || '',
    description: contentData.description || '',
    contentPreview: (contentData.content || '').slice(0, 8000),
    images: contentData.images || {},
    links: contentData.links || {},
    screenshotUrl: screenshot || null,
    colors: extracted.colors,
    fonts: extracted.fonts,
    designPatterns: extracted.designPatterns,
    cssSnippet: extracted.cssSnippet,
  }

  mkdirSync(resolve(ROOT, 'public'), { recursive: true })
  writeFileSync(outPath, JSON.stringify(payload, null, 2), 'utf8')
  console.log(`Wrote ${outPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
