import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import yaml from 'js-yaml'
import { deriveDependentTokens, isHexColor, resolveLocalRef } from './derive-brand-tokens.mjs'

const ROOT = process.cwd()
const DESIGN_PATH = resolve(ROOT, 'DESIGN.md')

function parseArgs(argv) {
  const out = {}
  for (let i = 0; i < argv.length; i += 1) {
    const part = argv[i]
    if (!part.startsWith('--')) continue
    const key = part.slice(2)
    const value = argv[i + 1]
    if (!value || value.startsWith('--')) {
      out[key] = true
      continue
    }
    out[key] = value
    i += 1
  }
  return out
}

function deepMerge(target, source) {
  if (source == null || typeof source !== 'object' || Array.isArray(source)) return target
  const out = { ...target }
  for (const [key, value] of Object.entries(source)) {
    if (value != null && typeof value === 'object' && !Array.isArray(value)) {
      out[key] = deepMerge(out[key] ?? {}, value)
      continue
    }
    out[key] = value
  }
  return out
}

function updateTypographyFamilies(typography, titleFont, serifFont) {
  const next = { ...typography }
  for (const [name, spec] of Object.entries(next)) {
    if (!spec || typeof spec !== 'object') continue
    if (name === 'title-serif') {
      next[name] = { ...spec, fontFamily: serifFont }
      continue
    }
    next[name] = { ...spec, fontFamily: titleFont }
  }
  return next
}

/** Walk every string leaf, yielding [dotted path, value]. */
function* walkLeaves(value, path = []) {
  if (value == null) return
  if (typeof value !== 'object') {
    yield [path.join('.'), value]
    return
  }
  if (Array.isArray(value)) return
  for (const [key, child] of Object.entries(value)) {
    yield* walkLeaves(child, [...path, key])
  }
}

/** Every hex literal reachable from `colors` — the palette the brand declared. */
function paletteHexes(design) {
  const set = new Set()
  for (const [, value] of walkLeaves(design.colors ?? {})) {
    const resolved = resolveLocalRef(design, value)
    if (isHexColor(resolved)) set.add(String(resolved).toLowerCase().slice(0, 7))
  }
  return set
}

/**
 * After merging + deriving, no frontmatter key should still carry chroma that
 * is absent from the new palette. Anything left is a hand-written leftover from
 * the previous brand — the exact failure this ticket is about.
 *
 * Neutrals (greys/black/white) and shadow scrims are allowed: they are
 * brand-agnostic by design.
 */
function findStaleHexes(design) {
  const palette = paletteHexes(design)
  const stale = []

  for (const [path, value] of walkLeaves(design)) {
    if (typeof value !== 'string') continue
    // `shadows` are neutral scrims apart from the brand-keyed ones, which
    // deriveDependentTokens() rewrites; skip the section wholesale.
    if (path.startsWith('shadows.')) continue

    const matches = value.match(/#[0-9a-fA-F]{6,8}\b/g) ?? []
    for (const hex of matches) {
      const normalized = hex.toLowerCase().slice(0, 7)
      if (palette.has(normalized)) continue
      if (isNeutral(normalized)) continue
      stale.push({ path, value })
      break
    }

    // rgb()/rgba() literals outside alphaColors are equally suspect.
    if (!path.startsWith('alphaColors.') && /\brgba?\s*\(/.test(value)) {
      stale.push({ path, value })
    }
  }

  return stale
}

/** Greys, black and white carry no brand identity. */
function isNeutral(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return Math.max(r, g, b) - Math.min(r, g, b) <= 12
}

function readFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) {
    throw new Error('DESIGN.md does not contain YAML front matter')
  }
  return {
    frontmatter: yaml.load(match[1]) ?? {},
    body: match[2] ?? '',
  }
}

function readStdin() {
  return new Promise((resolve, reject) => {
    let data = ''
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', (chunk) => { data += chunk })
    process.stdin.on('end', () => resolve(data))
    process.stdin.on('error', reject)
  })
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  // Answers arrive either on stdin (preferred - no file touches the repo)
  // or via --input for a saved JSON file.
  let raw
  if (args.input) {
    raw = readFileSync(resolve(ROOT, args.input), 'utf8')
  } else if (!process.stdin.isTTY) {
    raw = await readStdin()
  } else {
    throw new Error('No answers provided. Pipe JSON on stdin or pass --input <path>')
  }

  if (!raw.trim()) {
    throw new Error('Answers input was empty')
  }

  let answers
  try {
    answers = JSON.parse(raw)
  } catch (error) {
    throw new Error(`Answers input is not valid JSON: ${error.message}`)
  }

  const designContent = readFileSync(DESIGN_PATH, 'utf8')
  const { frontmatter, body } = readFrontMatter(designContent)

  const semanticColors = answers.colors?.semantic ?? answers.colors ?? {}
  const legacyColors = answers.colors?.legacy ?? {}
  const normalizedColors = { ...legacyColors, ...semanticColors }

  const next = deepMerge(frontmatter, {
    name: answers.brandName ?? frontmatter.name,
    description: answers.brandDescription ?? frontmatter.description,
    colors: normalizedColors,
    rounded: answers.rounded ?? {},
    spacing: answers.spacing ?? {},
  })

  if (answers.fonts?.primary || answers.fonts?.serif) {
    const existingPrimary =
      next.typography?.hero?.fontFamily ??
      Object.values(next.typography ?? {}).find((spec) => spec?.fontFamily)?.fontFamily
    const existingSerif =
      next.typography?.['title-serif']?.fontFamily ??
      existingPrimary

    const primary = answers.fonts?.primary ?? existingPrimary
    const serif = answers.fonts?.serif ?? existingSerif
    next.typography = updateTypographyFamilies(next.typography ?? {}, primary, serif)
  }

  // Palette-derived tokens (accent borders, alpha tints, brand shadow, onBrand
  // text) are recomputed rather than carried over from the previous brand.
  const { design: derived, changed } = deriveDependentTokens(next)

  const stale = findStaleHexes(derived)
  if (stale.length > 0) {
    const details = stale.map((s) => `  - ${s.path}: ${s.value}`).join('\n')
    throw new Error(
      `Refusing to write DESIGN.md — these keys still hold a hex that is not part of the new palette:\n${details}\n\n` +
        'Add them to the answers JSON, or extend deriveDependentTokens() in scripts/derive-brand-tokens.mjs.'
    )
  }

  const nextFrontmatter = yaml.dump(derived, {
    lineWidth: 120,
    noRefs: true,
    quotingType: '"',
  })

  const serialized = `---\n${nextFrontmatter}---\n${body.startsWith('\n') ? body.slice(1) : body}`
  writeFileSync(DESIGN_PATH, serialized, 'utf8')
  console.log('✓ DESIGN.md updated from setup answers')
  if (changed.length > 0) {
    console.log(`  derived ${changed.length} dependent token(s): ${changed.join(', ')}`)
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
