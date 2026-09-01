/**
 * derive-brand-tokens.mjs
 *
 * Colour maths + derivation for tokens that are *functions of the palette*
 * rather than free choices: accent borders, alpha tints, brand-keyed shadows,
 * and any on-brand text/icon colour.
 *
 * These used to be hand-written in DESIGN.md, so `/setup` left the previous
 * brand's chroma behind (see ticket "‑/setup leaves the workspace
 * half-rebranded"). Everything here is pure so both `apply-brand-answers.mjs`
 * and the index.css generator can share it.
 */

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

export function isHexColor(value) {
  return typeof value === 'string' && HEX_RE.test(value)
}

export function isReference(value) {
  return typeof value === 'string' && /^\{[^}]+\}$/.test(value)
}

/** #abc | #aabbcc | #aabbccdd -> { r, g, b, a } with 0-255 channels, 0-1 alpha. */
export function parseHex(value) {
  if (!isHexColor(value)) return null
  let hex = value.slice(1)
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1
  return { r, g, b, a }
}

function clampChannel(n) {
  return Math.max(0, Math.min(255, Math.round(n)))
}

export function toHex({ r, g, b }) {
  return `#${[r, g, b].map((c) => clampChannel(c).toString(16).padStart(2, '0')).join('')}`
}

/** WCAG relative luminance, 0 (black) → 1 (white). */
export function luminance(value) {
  const rgb = typeof value === 'string' ? parseHex(value) : value
  if (!rgb) return 0
  const channel = (c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b)
}

/** WCAG contrast ratio between two colours (1 → 21). */
export function contrastRatio(a, b) {
  const la = luminance(a)
  const lb = luminance(b)
  const [hi, lo] = la >= lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}

/**
 * Pick whichever candidate reads best *on* `background`.
 * This is the fix for "--theme-color-primary doubles as title colour":
 * never assume the brand is dark.
 */
export function pickReadableOn(background, candidates) {
  let best = candidates[0]
  let bestRatio = -1
  for (const candidate of candidates) {
    const ratio = contrastRatio(background, candidate)
    if (ratio > bestRatio) {
      bestRatio = ratio
      best = candidate
    }
  }
  return best
}

/** True when text on this background should be dark. */
export function isLightColor(value) {
  return luminance(value) > 0.45
}

/** Mix `value` toward `target` by `amount` (0-1). */
export function mix(value, target, amount) {
  const a = parseHex(value)
  const b = parseHex(target)
  if (!a || !b) return value
  return toHex({
    r: a.r + (b.r - a.r) * amount,
    g: a.g + (b.g - a.g) * amount,
    b: a.b + (b.b - a.b) * amount,
  })
}

/** `#rrggbb` + alpha -> `rgba(r,g,b,a)` string, as DESIGN.md stores alpha tokens. */
export function rgba(value, alpha) {
  const c = parseHex(value)
  if (!c) return value
  const a = Math.round(alpha * c.a * 1000) / 1000
  return `rgba(${c.r},${c.g},${c.b},${a})`
}

/**
 * Border accents are a darker/more saturated sibling of the accent fill.
 * Light fills darken toward black; already-dark fills lighten so the border
 * stays visible against the fill.
 */
export function deriveBorderAccent(accentHex) {
  if (!isHexColor(accentHex)) return accentHex
  return isLightColor(accentHex) ? mix(accentHex, '#000000', 0.22) : mix(accentHex, '#ffffff', 0.22)
}

const ACCENT_KEYS = ['1', '2', '3', '4', '5']
const SOFT_ALPHA = { 1: 0.15, 2: 0.15, 3: 0.25, 4: 0.15, 5: 0.15 }

/**
 * Rebuild every palette-derived token from the semantic colours already merged
 * into the DESIGN.md front matter. Mutates nothing — returns a new object.
 *
 * @param {object} design  DESIGN.md front matter (post-merge)
 * @returns {{ design: object, changed: string[] }}
 */
export function deriveDependentTokens(design) {
  const next = structuredClone(design)
  const changed = []

  const set = (path, value) => {
    const parts = path.split('.')
    let cursor = next
    for (const part of parts.slice(0, -1)) {
      if (cursor[part] == null || typeof cursor[part] !== 'object') cursor[part] = {}
      cursor = cursor[part]
    }
    const leaf = parts[parts.length - 1]
    if (cursor[leaf] !== value) changed.push(path)
    cursor[leaf] = value
  }

  const bg = next.colors?.bg ?? {}
  const brand = bg.brand
  const accents = bg.accent ?? {}

  // ── Accent borders + soft tints ────────────────────────────────────────────
  for (const key of ACCENT_KEYS) {
    const accent = accents[key]
    if (!isHexColor(accent)) continue

    const border = deriveBorderAccent(accent)
    set(`colors.border.accent.${key}`, border)
    // Soft tints are keyed to the *border* colour: it carries the accent's
    // identity at low opacity better than the pale fill does.
    set(`alphaColors.bg.accentSoft.${key}`, rgba(border, SOFT_ALPHA[key]))
  }

  // surfaceAccent only defines 1 and 4 (see REQUIRED_ALPHA_KEYS).
  for (const key of ['1', '4']) {
    const soft = next.alphaColors?.bg?.accentSoft?.[key]
    if (soft) set(`alphaColors.bg.surfaceAccent.${key}`, soft)
  }

  // ── Indicator overlay follows colors.indicator.primary ────────────────────
  const indicator = resolveLocalRef(next, next.colors?.indicator?.primary)
  if (isHexColor(indicator)) {
    set('alphaColors.overlay.indicator.primary', rgba(deriveBorderAccent(indicator), 0.7))
  }

  // ── Component surfaces point at the alpha tints, never at raw hex ─────────
  // These shipped as hand-written 8-digit hexes and silently kept the old
  // brand's accents through a rebrand.
  for (const key of ['1', '3', '4']) {
    if (!next.components?.[`surface-accent-${key}`]) continue
    set(`components.surface-accent-${key}.backgroundColor`, `{alphaColors.bg.accentSoft.${key}}`)
  }

  // ── Brand-keyed shadow ────────────────────────────────────────────────────
  if (isHexColor(brand)) {
    set('shadows.slide-primary', `0 8px 32px ${rgba(brand, 0.35)}`)
  }

  // ── Border strong tracks the brand (kept as a reference, not a copy) ──────
  if (next.colors?.border && !isReference(next.colors.border.strong)) {
    set('colors.border.strong', '{colors.bg.brand}')
  }

  // ── On-brand text must stay legible on a light brand ──────────────────────
  if (isHexColor(brand)) {
    const dark = resolveLocalRef(next, next.colors?.text?.primary)
    const onBrand = pickReadableOn(brand, [isHexColor(dark) ? dark : '#000000', '#ffffff'])
    set('colors.text.onBrand', onBrand)
  }

  return { design: next, changed }
}

/** Resolve a one-hop `{colors.x.y}` reference inside the same document. */
export function resolveLocalRef(design, value) {
  let current = value
  for (let hops = 0; hops < 8; hops += 1) {
    if (!isReference(current)) return current
    const path = current.slice(1, -1).split('.')
    let cursor = design
    for (const part of path) {
      if (cursor == null || typeof cursor !== 'object') return value
      cursor = cursor[part]
    }
    current = cursor
  }
  return current
}
