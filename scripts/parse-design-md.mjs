import { readFileSync } from 'fs'
import { resolve } from 'path'
import yaml from 'js-yaml'

const REQUIRED_ROOT_KEYS = [
  'version',
  'name',
  'description',
  'colors',
  'alphaColors',
  'shadows',
  'typography',
  'rounded',
  'spacing',
  'components',
]

const REQUIRED_COLOR_KEYS = [
  'primary',
  'canvas',
  'blue-200',
  'blue-300',
  'blue-400',
  'amber-100',
  'amber-200',
  'amber-300',
  'green-200',
  'green-300',
  'pink-200',
  'pink-300',
  'orange-200',
  'orange-300',
]

const REQUIRED_ALPHA_KEYS = [
  'blue-100',
  'pink-100',
  'green-100',
  'orange-100',
  'surface-accent-1',
  'surface-accent-4',
  'glass-white',
  'indicator-1',
  'glass-strong',
  'glass-default',
]

const REQUIRED_SHADOW_KEYS = [
  'card',
  'card-soft',
  'elevation-100',
  'elevation-200',
  'elevation-400',
  'elevation-500',
  'slide-soft',
  'slide-glass',
  'slide-accent',
  'surface-primary',
]

const LEGACY_FONT_SCALE = {
  'xs-token': ['12px', { lineHeight: '16px' }],
  'sm-token': ['16px', { lineHeight: '24px' }],
  'md-token': ['18px', { lineHeight: '24px' }],
  'lg-token': ['20px', { lineHeight: '24px' }],
  'xl-token': ['24px', { lineHeight: '24px' }],
  '2xl-token': ['32px', { lineHeight: '32px' }],
  '4xl-token': ['56px', { lineHeight: '40px' }],
  '5xl-token': ['72px', { lineHeight: '48px' }],
}

function extractFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  return yaml.load(match[1]) ?? {}
}

function isPlainObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value)
}

function isReference(value) {
  return typeof value === 'string' && /^\{[^}]+\}$/.test(value)
}

function isHexColor(value) {
  return typeof value === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value)
}

function looksLikeCssValue(value) {
  return typeof value === 'string' && /(px|rem|em|%|vh|vw)$/.test(value)
}

export function validateDesignSpec(design) {
  const errors = []

  if (!isPlainObject(design)) {
    return { ok: false, errors: ['Missing or invalid YAML front matter in DESIGN.md'] }
  }

  for (const key of REQUIRED_ROOT_KEYS) {
    if (!(key in design)) errors.push(`Missing required top-level key: "${key}"`)
  }

  if (!isPlainObject(design.colors)) {
    errors.push('`colors` must be an object')
  } else {
    for (const key of REQUIRED_COLOR_KEYS) {
      if (!(key in design.colors)) errors.push(`Missing required color token: colors.${key}`)
    }

    for (const [key, value] of Object.entries(design.colors)) {
      if (typeof value !== 'string') {
        errors.push(`colors.${key} must be a string`)
      } else if (!isHexColor(value) && !isReference(value)) {
        errors.push(`colors.${key} must be a #hex value or {reference}`)
      }
    }
  }

  if (!isPlainObject(design.typography)) {
    errors.push('`typography` must be an object')
  } else {
    for (const [name, spec] of Object.entries(design.typography)) {
      if (!isPlainObject(spec)) {
        errors.push(`typography.${name} must be an object`)
        continue
      }
      for (const field of ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight']) {
        if (!(field in spec)) {
          errors.push(`typography.${name}.${field} is required`)
        }
      }
    }
  }

  if (!isPlainObject(design.rounded)) {
    errors.push('`rounded` must be an object')
  } else {
    for (const [key, value] of Object.entries(design.rounded)) {
      if (typeof value !== 'string' || (!looksLikeCssValue(value) && !isReference(value))) {
        errors.push(`rounded.${key} must be a CSS size string or {reference}`)
      }
    }
  }

  if (!isPlainObject(design.spacing)) {
    errors.push('`spacing` must be an object')
  }

  if (!isPlainObject(design.components)) {
    errors.push('`components` must be an object')
  }

  if (!isPlainObject(design.alphaColors)) {
    errors.push('`alphaColors` must be an object')
  } else {
    for (const key of REQUIRED_ALPHA_KEYS) {
      if (!(key in design.alphaColors)) errors.push(`Missing required alpha token: alphaColors.${key}`)
    }
  }

  if (!isPlainObject(design.shadows)) {
    errors.push('`shadows` must be an object')
  } else {
    for (const key of REQUIRED_SHADOW_KEYS) {
      if (!(key in design.shadows)) errors.push(`Missing required shadow token: shadows.${key}`)
    }
  }

  return {
    ok: errors.length === 0,
    errors,
  }
}

function resolveRef(value, design) {
  if (typeof value !== 'string') return value
  const refMatch = value.match(/^\{([^}]+)\}$/)
  if (!refMatch) return value

  const path = refMatch[1].split('.')
  let current = design
  for (const segment of path) {
    if (!isPlainObject(current)) return value
    current = current[segment]
  }

  if (typeof current === 'string' && current.startsWith('{')) {
    return resolveRef(current, design)
  }

  return current ?? value
}

function resolveRefs(obj, design) {
  if (!isPlainObject(obj)) return obj
  const result = {}
  for (const [key, val] of Object.entries(obj)) {
    if (isPlainObject(val)) {
      result[key] = resolveRefs(val, design)
      continue
    }
    result[key] = resolveRef(val, design)
  }
  return result
}

function buildFontSizes(typography, legacyFontScale = LEGACY_FONT_SCALE) {
  if (!typography) return { ...legacyFontScale }
  const sizes = {}

  for (const [name, spec] of Object.entries(typography)) {
    if (!spec?.fontSize) continue
    const options = {}
    if (spec.lineHeight != null) options.lineHeight = String(spec.lineHeight)
    if (spec.letterSpacing) options.letterSpacing = spec.letterSpacing
    sizes[`${name}-token`] = [spec.fontSize, options]
  }

  for (const [name, value] of Object.entries(legacyFontScale)) {
    sizes[name] = value
  }

  return sizes
}

function buildFontFamilies(typography) {
  if (!typography || !isPlainObject(typography)) return {}

  const firstFamily = Object.values(typography).find((spec) => spec?.fontFamily)?.fontFamily
  const titleFamily = String(typography.hero?.fontFamily ?? firstFamily ?? 'sans-serif')
  const bodyFamily = String(typography.body?.fontFamily ?? titleFamily)
  const serifFamily = String(typography['title-serif']?.fontFamily ?? titleFamily)

  const families = {
    title: [titleFamily, 'sans-serif'],
    body: [bodyFamily, 'sans-serif'],
    serif: [serifFamily, 'serif'],
    // Backward-compatible aliases consumed by existing classes/components.
    montserrat: [titleFamily, 'sans-serif'],
    'noto-serif': [serifFamily, 'serif'],
  }

  for (const spec of Object.values(typography)) {
    if (!spec?.fontFamily) continue
    const name = String(spec.fontFamily)
    const key = name.toLowerCase().replace(/\s+/g, '-')
    if (!families[key]) {
      const fallback = /serif/i.test(name) ? 'serif' : 'sans-serif'
      families[key] = [name, fallback]
    }
  }

  return families
}

function flattenTokenMap(obj, prefix = '', out = {}) {
  if (!isPlainObject(obj)) return out
  for (const [key, value] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${key}` : key
    if (isPlainObject(value)) {
      flattenTokenMap(value, next, out)
      continue
    }
    if (value == null) continue
    out[next] = String(value)
    out[key] = String(value)
  }
  return out
}

/**
 * @param {string} filePath
 * @returns {{
 *   colors: Record<string, string>,
 *   alphaColors: Record<string, string>,
 *   fontFamilies: Record<string, string[]>,
 *   fontSizes: Record<string, [string, object]>,
 *   borderRadius: Record<string, string>,
 *   boxShadow: Record<string, string>,
 *   flatTokens: Record<string, string>,
 *   raw: object,
 *   resolved: object,
 * }}
 */
export function parseDesignMd(filePath) {
  const absPath = resolve(process.cwd(), filePath)
  const content = readFileSync(absPath, 'utf8')
  const design = extractFrontMatter(content)

  const validation = validateDesignSpec(design)
  if (!validation.ok) {
    const details = validation.errors.map((e) => `- ${e}`).join('\n')
    throw new Error(`DESIGN.md validation failed:\n${details}`)
  }

  const resolved = resolveRefs(design, design)
  const alphaColors = resolved.alphaColors ?? {}
  const boxShadow = resolved.shadows ?? {}
  const colors = { ...(resolved.colors ?? {}), ...alphaColors }
  const borderRadius = resolved.rounded ?? {}
  const fontFamilies = buildFontFamilies(resolved.typography)
  const fontSizes = buildFontSizes(resolved.typography, resolved.fontScale ?? LEGACY_FONT_SCALE)
  const flatTokens = flattenTokenMap({
    ...resolved,
    colors,
    rounded: borderRadius,
    shadows: boxShadow,
  })

  return {
    colors,
    alphaColors,
    fontFamilies,
    fontSizes,
    borderRadius,
    boxShadow,
    flatTokens,
    raw: design,
    resolved,
  }
}
