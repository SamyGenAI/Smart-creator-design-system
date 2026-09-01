/**
 * generate-index-css.mjs
 *
 * `src/index.css` used to be hand-synced from DESIGN.md ("35 variables, miss one
 * and runtime silently disagrees"). This makes DESIGN.md the single source of
 * truth and generates the `:root` block from it.
 *
 *   node scripts/generate-index-css.mjs          # write src/index.css
 *   node scripts/generate-index-css.mjs --check  # exit 1 on drift (validate-design)
 *
 * Everything outside the generated block is preserved verbatim, so hand-written
 * rules (e.g. `.infographic-canvas`) survive regeneration.
 */
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { parseDesignMd } from './parse-design-md.mjs'
import { luminance, contrastRatio, pickReadableOn, isHexColor } from './derive-brand-tokens.mjs'

const ROOT = process.cwd()
const CSS_PATH = resolve(ROOT, 'src', 'index.css')
const DESIGN_PATH = resolve(ROOT, 'DESIGN.md')

const START = '/* >>> generated from DESIGN.md - do not edit by hand (pnpm design:sync) */'
const END = '/* <<< end generated */'

/** CSS custom properties escape `/` as `\/`. */
function esc(name) {
  return name.replace(/\//g, '\\/')
}

function quoteFont(stack) {
  if (!Array.isArray(stack)) return String(stack)
  const [family, ...fallbacks] = stack
  return ["'" + family + "'", ...fallbacks].join(', ')
}

/**
 * Text/icon colour that stays legible on `bg`, choosing between the design's own
 * dark text and white. This is the role split from the ticket: a brand colour is
 * a *fill*, and what sits on top of it must be derived, not assumed dark.
 */
function onColor(bg, darkText) {
  if (!isHexColor(bg)) return '#ffffff'
  return pickReadableOn(bg, [isHexColor(darkText) ? darkText : '#000000', '#ffffff'])
}

/**
 * Titles are painted with the brand only when the brand actually reads against
 * the canvas (WCAG >= 4.5). A light brand (e.g. lime on white) falls back to the
 * text colour instead of rendering near-illegible.
 */
function titleColor(brand, canvas, textPrimary) {
  if (!isHexColor(brand) || !isHexColor(canvas)) return textPrimary ?? brand
  return contrastRatio(brand, canvas) >= 4.5 ? brand : (textPrimary ?? brand)
}

/** Tight display tracking suits geometric sans; serifs need near-neutral. */
function defaultTracking(titleStack) {
  const family = Array.isArray(titleStack) ? titleStack[0] : String(titleStack ?? '')
  const generic = Array.isArray(titleStack) ? titleStack[titleStack.length - 1] : ''
  const isSerif = generic === 'serif' || /serif|georgia|garamond|playfair|rufina/i.test(family)
  return isSerif ? '-0.01em' : '-0.03em'
}

export function buildRootBlock(tokens) {
  const c = tokens.resolved.colors ?? {}
  const a = tokens.resolved.alphaColors ?? {}
  const s = tokens.resolved.shadows ?? {}
  const fam = tokens.fontFamilies ?? {}

  const bg = c.bg ?? {}
  const text = c.text ?? {}
  const border = c.border ?? {}
  const accent = bg.accent ?? {}
  const bAccent = border.accent ?? {}
  const soft = a.bg?.accentSoft ?? {}
  const glass = a.overlay?.glass ?? {}

  const brand = bg.brand
  const onBrand = text.onBrand ?? onColor(brand, text.primary)

  const L = []
  const push = (name, value) => L.push('  --' + esc(name) + ': ' + value + ';')
  const section = (label) => {
    L.push('')
    L.push('  /* -- ' + label + ' -- */')
  }

  section('Semantic palette')
  push('color/bg/canvas', bg.canvas)
  push('color/bg/surface', bg.surface)
  push('color/bg/surface-alt', bg.surfaceAlt)
  push('color/bg/brand', brand)
  for (const k of ['1', '2', '3', '4', '5']) push('color/bg/accent/' + k, accent[k])

  section('Text')
  push('text/primary', text.primary)
  push('text/secondary', text.secondary)
  push('text/contrast', text.muted ?? text.secondary)
  push('text/invert', onBrand)
  push('text/text-brand', brand)

  section('Border')
  push('border/primary', border.strong ?? brand)
  push('border/secondary', border.subtle)
  for (const k of ['1', '2', '3', '4', '5']) push('border/accent-' + k, bAccent[k])
  push('border/neutral-1', border.subtle)

  section('Background')
  push('components/background/primary', bg.canvas)
  push('components/background/secondary', bg.surfaceAlt)
  push('components/background/white', bg.surface)

  section('Card')
  push('components/card/white', bg.surface)
  push('components/card/cream', bg.canvas)
  push('components/card/accent-1', a.bg?.surfaceAccent?.['1'] ?? soft['1'])
  push('components/card/accent-3', accent['3'])
  push('components/card/accent-4', a.bg?.surfaceAccent?.['4'] ?? soft['4'])

  section('Card-title accents')
  for (const k of ['1', '2', '3', '4', '5']) push('components/card-title/accent-' + k, accent[k])

  section('Component micro-tokens')
  push('check-stroke', c.stroke?.check)

  section('Highlight')
  for (const k of ['1', '2', '3', '5']) push('highlight/accent-' + k, soft[k])

  section('Surfaces (slides/cards)')
  push('surface/glass/strong', glass.strong)
  push('surface/glass/default', glass.default)

  section('Shadows')
  push('shadow/card', s.card)
  push('shadow/card-soft', s['card-soft'])
  for (const k of ['100', '200', '400', '500']) push('shadow/elevation/' + k, s['elevation-' + k])
  for (const k of ['soft', 'glass', 'accent', 'primary']) push('shadow/slide/' + k, s['slide-' + k])

  section('Typography')
  push('font/family/title', quoteFont(fam.title))
  push('font/family/body', quoteFont(fam.body))
  push('font/family/title-serif', quoteFont(fam.serif))

  // Tracking belongs with the font token, not baked into a component: display
  // tracking tuned for a geometric sans collides glyphs on a serif.
  push('font/tracking/title', tokens.resolved.typography?.hero?.letterSpacing ?? defaultTracking(fam.title))
  push('font/tracking/subtitle', tokens.resolved.typography?.subtitle?.letterSpacing ?? '-0.03em')

  L.push('')
  const fontSizes = { xs: 12, sm: 16, md: 18, lg: 20, xl: 24, '2xl': 32, '4xl': 56, '5xl': 72 }
  for (const [k, v] of Object.entries(fontSizes)) push('font/size/' + k, v + 'px')

  L.push('')
  const lineHeights = { xs: 16, sm: 24, md: 32, lg: 40, xl: 48 }
  for (const [k, v] of Object.entries(lineHeights)) push('font/line-height/' + k, v + 'px')

  section('Semantic aliases (component-facing, color-agnostic)')
  // --theme-color-primary is the brand FILL.
  push('theme-color-primary', brand)
  // --theme-color-on-primary is what reads on top of that fill (text + icons).
  push('theme-color-on-primary', onBrand)
  // --theme-color-text-primary is body/title TEXT on the canvas - never the fill.
  push('theme-color-text-primary', text.primary)
  push('theme-color-text-secondary', text.secondary)
  push('theme-color-text-muted', text.muted ?? text.secondary)
  // Titles: brand-coloured only while the brand reads on the canvas, else text.
  push('theme-color-title', titleColor(brand, bg.canvas, text.primary))
  // Icons sitting on the brand fill (PrimaryGlassSection filters to this).
  push('theme-on-primary-icon-filter', luminance(onBrand) > 0.5 ? 'brightness(0) invert(1)' : 'brightness(0)')

  L.push('')
  push('theme-surface-canvas', bg.canvas)
  push('theme-surface-canvas-secondary', bg.surfaceAlt)
  push('theme-surface-layer-1', a.bg?.surfaceAccent?.['1'] ?? soft['1'])
  push('theme-surface-layer-2', a.bg?.surfaceAccent?.['4'] ?? soft['4'])
  push('theme-surface-layer-3', soft['3'])
  push('theme-surface-layer-4', soft['1'])
  push('theme-surface-layer-5', soft['2'])
  push('theme-surface-layer-6', soft['5'])
  push('theme-surface-glass-soft', glass.default)
  push('theme-surface-glass-strong', glass.strong)
  push('theme-surface-glass-default', glass.default)

  L.push('')
  for (const k of ['1', '2', '3', '4', '5']) push('theme-accent-' + k, accent[k])
  push('theme-indicator-1', a.overlay?.indicator?.primary)

  L.push('')
  for (const k of ['1', '2', '3', '4', '5']) push('theme-border-' + k, bAccent[k])

  L.push('')
  push('theme-shadow-card', s.card)
  push('theme-shadow-card-soft', s['card-soft'])
  push('theme-shadow-surface-soft', s['slide-soft'])
  push('theme-shadow-surface-glass', s['slide-glass'])
  push('theme-shadow-surface-accent', s['slide-accent'])
  push('theme-shadow-surface-primary', s['slide-primary'])

  const missing = L.filter((line) => /: (undefined|null);$/.test(line))
  if (missing.length > 0) {
    throw new Error('Cannot generate index.css - unresolved tokens:\n' + missing.join('\n'))
  }

  return [
    START,
    ':root {',
    ...L,
    '}',
    '',
    '/* Base text styling - without this, unstyled text falls back to the UA serif. */',
    '@layer base {',
    '  body {',
    '    font-family: var(--' + esc('font/family/body') + ');',
    '    color: var(--theme-color-text-primary);',
    '    background-color: var(--theme-surface-canvas);',
    '  }',
    '}',
    END,
  ].join('\n')
}

function render(existing, block) {
  const startIdx = existing.indexOf(START)
  const endIdx = existing.indexOf(END)
  if (startIdx !== -1 && endIdx !== -1) {
    return existing.slice(0, startIdx) + block + existing.slice(endIdx + END.length)
  }
  // First run: replace the legacy hand-written `:root { ... }` block.
  const rootMatch = existing.match(/:root\s*\{[\s\S]*?\n\}/)
  if (rootMatch) return existing.replace(rootMatch[0], block)
  return existing.trimEnd() + '\n\n' + block + '\n'
}

function main() {
  const check = process.argv.includes('--check')
  const tokens = parseDesignMd(DESIGN_PATH)
  const block = buildRootBlock(tokens)
  const existing = readFileSync(CSS_PATH, 'utf8')
  const next = render(existing, block)

  if (check) {
    if (next !== existing) {
      console.error('✗ src/index.css is out of sync with DESIGN.md')
      console.error('  Run: node scripts/generate-index-css.mjs')
      process.exit(1)
    }
    console.log('✓ src/index.css matches DESIGN.md')
    return
  }

  if (next === existing) {
    console.log('✓ src/index.css already up to date')
    return
  }
  writeFileSync(CSS_PATH, next, 'utf8')
  console.log('✓ src/index.css generated from DESIGN.md')
}

main()
