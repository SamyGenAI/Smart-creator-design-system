import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import yaml from 'js-yaml'

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

  const nextFrontmatter = yaml.dump(next, {
    lineWidth: 120,
    noRefs: true,
    quotingType: '"',
  })

  const serialized = `---\n${nextFrontmatter}---\n${body.startsWith('\n') ? body.slice(1) : body}`
  writeFileSync(DESIGN_PATH, serialized, 'utf8')
  console.log('✓ DESIGN.md updated from setup answers')
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
