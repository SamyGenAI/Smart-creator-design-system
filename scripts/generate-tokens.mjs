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
const primaryColor = tokenAny(['colors.bg.brand'])
const canvasColor = tokenAny(['colors.bg.canvas'])
const surfaceColor = tokenAny(['colors.bg.surface'])
const surfaceAltColor = tokenAny(['colors.bg.surfaceAlt'])
const surfacePrimaryShadow = tokenAny(['shadows.surface-primary'])

const css = `@tailwind base;
@tailwind components;
@tailwind utilities;

/*
  Design token CSS variables.
  Source: DESIGN.md (edit there, then run \`pnpm tokens:gen\`).
*/
:root {
  /* ── Semantic palette ─────────────────────────────────────── */
  --color\\/bg\\/canvas: ${canvasColor};
  --color\\/bg\\/surface: ${surfaceColor};
  --color\\/bg\\/surface-alt: ${surfaceAltColor};
  --color\\/bg\\/brand: ${primaryColor};
  --color\\/bg\\/accent\\/1: ${token('colors.bg.accent.1')};
  --color\\/bg\\/accent\\/2: ${token('colors.bg.accent.2')};
  --color\\/bg\\/accent\\/3: ${token('colors.bg.accent.3')};
  --color\\/bg\\/accent\\/4: ${token('colors.bg.accent.4')};
  --color\\/bg\\/accent\\/5: ${token('colors.bg.accent.5')};

  /* ── Text ────────────────────────────────────────────────── */
  --text\\/primary:    ${token('colors.text.primary')};
  --text\\/secondary:  ${token('colors.text.secondary')};
  --text\\/contrast:   ${token('colors.text.muted')};
  --text\\/invert:     ${token('colors.text.onBrand')};
  --text\\/text-brand: ${primaryColor};

  /* ── Border ──────────────────────────────────────────────── */
  --border\\/primary:   ${token('colors.border.strong')};
  --border\\/secondary: ${token('colors.border.subtle')};
  --border\\/accent-1:  ${token('colors.border.accent.1')};
  --border\\/accent-2:  ${token('colors.border.accent.2')};
  --border\\/accent-3:  ${token('colors.border.accent.3')};
  --border\\/accent-4:  ${token('colors.border.accent.4')};
  --border\\/accent-5:  ${token('colors.border.accent.5')};
  --border\\/neutral-1: ${token('colors.border.subtle')};

  /* ── Background ──────────────────────────────────────────── */
  --components\\/background\\/primary:   ${canvasColor};
  --components\\/background\\/secondary: ${surfaceAltColor};
  --components\\/background\\/white:     white;

  /* ── Card ────────────────────────────────────────────────── */
  --components\\/card\\/white: white;
  --components\\/card\\/cream: ${canvasColor};
  --components\\/card\\/accent-1: ${token('alphaColors.bg.surfaceAccent.1')};
  --components\\/card\\/accent-3: ${token('colors.bg.accent.3')};
  --components\\/card\\/accent-4: ${token('alphaColors.bg.surfaceAccent.4')};

  /* ── Card-title accents ──────────────────────────────────── */
  --components\\/card-title\\/accent-1: ${token('colors.bg.accent.1')};
  --components\\/card-title\\/accent-2: ${token('colors.bg.accent.2')};
  --components\\/card-title\\/accent-3: ${token('colors.bg.accent.3')};
  --components\\/card-title\\/accent-4: ${token('colors.bg.accent.4')};
  --components\\/card-title\\/accent-5: ${token('colors.bg.accent.5')};

  /* ── Component micro-tokens ───────────────────────────────── */
  --check-stroke: ${token('colors.stroke.check')};

  /* ── Highlight ───────────────────────────────────────────── */
  --highlight\\/accent-1: ${token('alphaColors.bg.accentSoft.1')};
  --highlight\\/accent-2: ${token('alphaColors.bg.accentSoft.2')};
  --highlight\\/accent-3: ${token('alphaColors.bg.accentSoft.3')};
  --highlight\\/accent-5: ${token('alphaColors.bg.accentSoft.5')};

  /* ── Surfaces (slides/cards) ─────────────────────────────── */
  --surface\\/glass\\/strong: ${token('alphaColors.overlay.glass.strong')};
  --surface\\/glass\\/default: ${token('alphaColors.overlay.glass.default')};

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
  --theme-color-on-primary: ${token('colors.text.onBrand')};
  --theme-color-text-primary: ${token('colors.text.primary')};
  --theme-color-text-secondary: ${token('colors.text.secondary')};
  --theme-color-text-muted: ${token('colors.text.muted')};

  --theme-surface-canvas: ${canvasColor};
  --theme-surface-canvas-secondary: ${surfaceAltColor};
  --theme-surface-layer-1: ${token('alphaColors.bg.surfaceAccent.1')};
  --theme-surface-layer-2: ${token('alphaColors.bg.surfaceAccent.4')};
  --theme-surface-layer-3: ${token('alphaColors.bg.accentSoft.3')};
  --theme-surface-layer-4: ${token('alphaColors.bg.accentSoft.1')};
  --theme-surface-layer-5: ${token('alphaColors.bg.accentSoft.2')};
  --theme-surface-layer-6: ${token('alphaColors.bg.accentSoft.5')};
  --theme-surface-glass-soft: ${token('alphaColors.overlay.glass.default')};
  --theme-surface-glass-strong: ${token('alphaColors.overlay.glass.strong')};
  --theme-surface-glass-default: ${token('alphaColors.overlay.glass.default')};

  --theme-accent-1: ${token('colors.bg.accent.1')};
  --theme-accent-2: ${token('colors.bg.accent.2')};
  --theme-accent-3: ${token('colors.bg.accent.3')};
  --theme-accent-4: ${token('colors.bg.accent.4')};
  --theme-accent-5: ${token('colors.bg.accent.5')};
  --theme-indicator-1: ${token('alphaColors.overlay.indicator.primary')};

  --theme-border-1: ${token('colors.border.accent.1')};
  --theme-border-2: ${token('colors.border.accent.2')};
  --theme-border-3: ${token('colors.border.accent.3')};
  --theme-border-4: ${token('colors.border.accent.4')};
  --theme-border-5: ${token('colors.border.accent.5')};

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
