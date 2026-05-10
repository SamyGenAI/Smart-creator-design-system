import { existsSync, readdirSync, statSync, readFileSync } from 'fs'
import { resolve } from 'path'

const ROOT = process.cwd()
const TEMPLATES_DIR = resolve(ROOT, 'templates')

const REQUIRED_TEMPLATE_DIRS = ['carousels', 'pptx-slides']
const ALLOWED_ROOT_ENTRIES = new Set([...REQUIRED_TEMPLATE_DIRS, 'template-manifest.json'])

function fail(message) {
  console.error(`✗ ${message}`)
  process.exitCode = 1
}

function walk(dir, result = []) {
  const entries = readdirSync(dir)
  for (const entry of entries) {
    const abs = resolve(dir, entry)
    const stat = statSync(abs)
    if (stat.isDirectory()) {
      walk(abs, result)
      continue
    }
    result.push(abs)
  }
  return result
}

if (!existsSync(TEMPLATES_DIR)) {
  fail('templates/ directory is missing')
} else {
  const rootEntries = readdirSync(TEMPLATES_DIR)

  for (const required of REQUIRED_TEMPLATE_DIRS) {
    if (!rootEntries.includes(required)) fail(`templates/${required}/ is missing`)
  }

  for (const entry of rootEntries) {
    if (!ALLOWED_ROOT_ENTRIES.has(entry)) {
      fail(`Unexpected templates root entry: templates/${entry}. Only typed subfolders are allowed.`)
    }
  }

  const templateFiles = walk(TEMPLATES_DIR).filter((file) => file.endsWith('.js') || file.endsWith('.jsx'))
  for (const file of templateFiles) {
    const content = readFileSync(file, 'utf8')
    if (content.includes('../design/') || content.includes('../../design/')) {
      fail(`Template references output folder (design/) and breaks source/output isolation: ${file}`)
    }
  }
}

if (process.exitCode === 1) {
  process.exit(1)
}

console.log('✓ Template boundaries are valid (typed source folders, no design/ imports)')
