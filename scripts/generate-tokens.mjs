/**
 * generate-tokens.mjs
 *
 * Regenerates src/index.css from DESIGN.md using an inlined
 * CSS blueprint (no external template file).
 */

import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { parseDesignMd } from './parse-design-md.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// ── Paths ────────────────────────────────────────────────────────────────────
const DESIGN_MD_PATH   = resolve(root, 'DESIGN.md')
const OUTPUT_CSS_PATH  = resolve(root, 'src', 'index.css')

// ── Load tokens ──────────────────────────────────────────────────────────────
const tokens = parseDesignMd(DESIGN_MD_PATH)
const tokenMap = tokens.flatTokens

function token(key) {
  const value = tokenMap[key]
  if (value == null) {
    throw new Error(`generate-tokens: missing token "${key}" in DESIGN.md`)
  }
  return String(value)
}

function tokenAny(keys) {
  for (const key of keys) {
    const value = tokenMap[key]
    if (value != null) return String(value)
  }
  throw new Error(`generate-tokens: missing token alternatives [${keys.join(', ')}] in DESIGN.md`)
}

function fontStack(name, fallback) {
  const safeName = String(name).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  return `'${safeName}', ${fallback}`
}

const titleFontFamily = token('typography.hero.fontFamily')
const bodyFontFamily = tokenMap['typography.body.fontFamily']
  ? token('typography.body.fontFamily')
  : titleFontFamily
const serifFontFamily = tokenMap['typography.title-serif.fontFamily']
  ? token('typography.title-serif.fontFamily')
  : titleFontFamily
const primaryColor = tokenAny(['primary', 'colors.primary'])
const canvasSecondary = tokenAny(['canvas-secondary', 'colors.canvas-secondary', 'cream-200'])
const surfacePrimaryShadow = tokenAny(['shadows.surface-primary'])

const css = `@tailwind base;
@tailwind components;
@tailwind utilities;

/*
  Design token CSS variables.
  Source: DESIGN.md (edit there, then run \`pnpm tokens:gen\`).
*/
:root {
  /* ── Primitive: Blue ──────────────────────────────────────── */
  --color\\/blue\\/100: ${token('alphaColors.blue-100')};
  --color\\/blue\\/200: ${token('blue-200')};
  --color\\/blue\\/300: ${token('blue-300')};
  --color\\/blue\\/400: ${token('blue-400')};
  --color\\/blue\\/500: ${primaryColor};

  /* ── Primitive: Cream ────────────────────────────────────── */
  --color\\/cream\\/100: ${token('canvas')};
  --color\\/cream\\/200: ${token('cream-200')};
  --color\\/cream\\/300: ${token('canvas')};

  /* ── Primitive: Neutral ──────────────────────────────────── */
  --color\\/neutral\\/0:    white;
  --color\\/neutral\\/200:  ${token('neutral-200')};
  --color\\/neutral\\/300:  ${token('neutral-300')};
  --color\\/neutral\\/400:  ${token('neutral-400')};
  --color\\/neutral\\/500:  ${token('neutral-500')};
  --color\\/neutral\\/600:  ${token('neutral-600')};
  --color\\/neutral\\/700:  ${token('neutral-700')};
  --color\\/neutral\\/800:  ${token('neutral-800')};
  --color\\/neutral\\/1000: black;

  /* ── Primitive: Pink ─────────────────────────────────────── */
  --color\\/pink\\/100: ${token('alphaColors.pink-100')};
  --color\\/pink\\/200: ${token('pink-200')};
  --color\\/pink\\/300: ${token('pink-300')};

  /* ── Primitive: Amber ────────────────────────────────────── */
  --color\\/amber\\/100: ${token('amber-100')};
  --color\\/amber\\/200: ${token('amber-200')};
  --color\\/amber\\/300: ${token('amber-300')};

  /* ── Primitive: Green ────────────────────────────────────── */
  --color\\/green\\/100: ${token('alphaColors.green-100')};
  --color\\/green\\/200: ${token('green-200')};
  --color\\/green\\/300: ${token('green-300')};

  /* ── Primitive: Orange ───────────────────────────────────── */
  --color\\/orange\\/100: ${token('alphaColors.orange-100')};
  --color\\/orange\\/200: ${token('orange-200')};
  --color\\/orange\\/300: ${token('orange-300')};

  /* ── Text ────────────────────────────────────────────────── */
  --text\\/primary:    black;
  --text\\/secondary:  ${token('neutral-800')};
  --text\\/contrast:   ${token('neutral-600')};
  --text\\/invert:     white;
  --text\\/text-brand: ${primaryColor};

  /* ── Border ──────────────────────────────────────────────── */
  --border\\/primary:   black;
  --border\\/secondary: ${primaryColor};
  --border\\/accent-1:  ${token('border-accent-1')};
  --border\\/accent-2:  ${token('border-accent-2')};
  --border\\/accent-3:  ${token('border-accent-3')};
  --border\\/accent-4:  ${token('border-accent-4')};
  --border\\/accent-5:  ${token('orange-300')};
  --border\\/neutral-1: ${token('border-neutral-1')};

  /* ── Background ──────────────────────────────────────────── */
  --components\\/background\\/primary:   ${token('canvas')};
  --components\\/background\\/secondary: ${canvasSecondary};
  --components\\/background\\/white:     white;

  /* ── Card ────────────────────────────────────────────────── */
  --components\\/card\\/white: white;
  --components\\/card\\/cream: ${token('canvas')};
  --components\\/card\\/accent-1: ${token('alphaColors.surface-accent-1')};
  --components\\/card\\/accent-3: ${token('amber-100')};
  --components\\/card\\/accent-4: ${token('alphaColors.surface-accent-4')};

  /* ── Card-title accents ──────────────────────────────────── */
  --components\\/card-title\\/accent-1: ${token('accent-1')};
  --components\\/card-title\\/accent-2: ${token('accent-2')};
  --components\\/card-title\\/accent-3: ${token('accent-3')};
  --components\\/card-title\\/accent-4: ${token('accent-4')};
  --components\\/card-title\\/accent-5: ${token('accent-5')};

  /* ── Component micro-tokens ───────────────────────────────── */
  --check-stroke: ${token('check-stroke')};

  /* ── Highlight ───────────────────────────────────────────── */
  --highlight\\/accent-1: ${token('alphaColors.blue-100')};
  --highlight\\/accent-2: ${token('alphaColors.green-100')};
  --highlight\\/accent-3: ${token('amber-100')};
  --highlight\\/accent-5: ${token('alphaColors.orange-100')};

  /* ── Surfaces (slides/cards) ─────────────────────────────── */
  --surface\\/glass\\/strong: ${token('alphaColors.glass-strong')};
  --surface\\/glass\\/default: ${token('alphaColors.glass-default')};

  /* ── Shadows ─────────────────────────────────────────────── */
  --shadow\\/card: ${token('shadows.card')};
  --shadow\\/card-soft: ${token('shadows.card-soft')};
  --shadow\\/elevation\\/100: ${token('shadows.elevation-100')};
  --shadow\\/elevation\\/200: ${token('shadows.elevation-200')};
  --shadow\\/elevation\\/400: ${token('shadows.elevation-400')};
  --shadow\\/elevation\\/500: ${token('shadows.elevation-500')};
  --shadow\\/slide\\/soft: ${token('shadows.slide-soft')};
  --shadow\\/slide\\/glass: ${token('shadows.slide-glass')};
  --shadow\\/slide\\/accent: ${token('shadows.slide-accent')};
  --shadow\\/slide\\/primary: ${surfacePrimaryShadow};

  /* ── Typography ──────────────────────────────────────────── */
  --font\\/family\\/title: ${fontStack(titleFontFamily, 'sans-serif')};
  --font\\/family\\/body: ${fontStack(bodyFontFamily, 'sans-serif')};
  --font\\/family\\/title-serif: ${fontStack(serifFontFamily, 'serif')};

  --font\\/size\\/xs: 12px;
  --font\\/size\\/sm: 16px;
  --font\\/size\\/md: 18px;
  --font\\/size\\/lg: 20px;
  --font\\/size\\/xl: 24px;
  --font\\/size\\/2xl: 32px;
  --font\\/size\\/4xl: 56px;
  --font\\/size\\/5xl: 72px;

  --font\\/line-height\\/xs: 16px;
  --font\\/line-height\\/sm: 24px;
  --font\\/line-height\\/md: 32px;
  --font\\/line-height\\/lg: 40px;
  --font\\/line-height\\/xl: 48px;

  /* ── Semantic aliases (component-facing, color-agnostic) ── */
  --theme-color-primary: ${primaryColor};
  --theme-color-on-primary: white;
  --theme-color-text-primary: black;
  --theme-color-text-secondary: ${token('neutral-800')};
  --theme-color-text-muted: ${token('neutral-700')};

  --theme-surface-canvas: ${token('canvas')};
  --theme-surface-canvas-secondary: ${canvasSecondary};
  --theme-surface-layer-1: ${token('alphaColors.surface-accent-1')};
  --theme-surface-layer-2: ${token('alphaColors.surface-accent-4')};
  --theme-surface-layer-3: ${token('amber-100')};
  --theme-surface-layer-4: ${token('alphaColors.blue-100')};
  --theme-surface-layer-5: ${token('alphaColors.green-100')};
  --theme-surface-layer-6: ${token('alphaColors.orange-100')};
  --theme-surface-glass-soft: ${token('alphaColors.glass-default')};
  --theme-surface-glass-strong: ${token('alphaColors.glass-strong')};
  --theme-surface-glass-default: ${token('alphaColors.glass-default')};

  --theme-accent-1: ${token('accent-1')};
  --theme-accent-2: ${token('accent-2')};
  --theme-accent-3: ${token('accent-3')};
  --theme-accent-4: ${token('accent-4')};
  --theme-accent-5: ${token('accent-5')};
  --theme-indicator-1: ${token('alphaColors.indicator-1')};

  --theme-border-1: ${token('border-accent-1')};
  --theme-border-2: ${token('border-accent-2')};
  --theme-border-3: ${token('border-accent-3')};
  --theme-border-4: ${token('border-accent-4')};
  --theme-border-5: ${token('orange-300')};

  --theme-shadow-card: ${token('shadows.card')};
  --theme-shadow-card-soft: ${token('shadows.card-soft')};
  --theme-shadow-surface-soft: ${token('shadows.slide-soft')};
  --theme-shadow-surface-glass: ${token('shadows.slide-glass')};
  --theme-shadow-surface-accent: ${token('shadows.slide-accent')};
  --theme-shadow-surface-primary: ${surfacePrimaryShadow};
}

/* Fixed canvas — required for infographic absolute positioning */
.infographic-canvas {
  width: 1080px;
  height: 1350px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

/* Slide canvas — 1280×720px, 16:9 ratio */
.slide-canvas {
  width: 1280px;
  height: 720px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}
`

// ── Prepend generated-file warning ───────────────────────────────────────────
const header = `/* ⚠️  Auto-generated from DESIGN.md — do not edit directly.
   Run \`pnpm tokens:gen\` to regenerate from DESIGN.md.
   Source: scripts/generate-tokens.mjs */\n\n`

writeFileSync(OUTPUT_CSS_PATH, header + css, 'utf8')

console.log('✓  src/index.css regenerated from DESIGN.md')
