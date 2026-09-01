/**
 * Flags non-token color literals (hex, rgb/hsl) and hardcoded font families in
 * the JSX that ships brand surfaces.
 *
 * Scans `design/infographics/`, `components/` and `templates/`. The shared
 * library matters most: a hardcoded value there leaks into *every* carousel and
 * deck generated afterwards, not just one design file.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'fs'
import { join, relative, resolve } from 'path'

const ROOT = process.cwd()

const DIRS = [
  resolve(ROOT, 'design', 'infographics'),
  resolve(ROOT, 'components'),
  resolve(ROOT, 'templates'),
]

const PATTERNS = [
  { name: 'hex color', re: /#[0-9a-fA-F]{3,8}\b/ },
  { name: 'rgb()/rgba()', re: /\brgba?\s*\(/ },
  { name: 'hsl()/hsla()', re: /\bhsla?\s*\(/ },
  { name: 'Tailwind arbitrary #[...]', re: /\[[^\]]*#[0-9a-fA-F]{3,8}[^\]]*\]/ },
  // A named font in JSX bypasses the DESIGN.md font tokens, so a rebrand
  // silently keeps the old typeface.
  { name: 'hardcoded font family', re: /['"][A-Z][A-Za-z ]+['"]\s*,\s*(sans-)?serif/ },
]

/**
 * Preview/viewer chrome is deliberately brand-independent: it is the dark shell
 * *around* the slide, not the slide itself. Anything that paints a brand
 * surface must still use tokens.
 */
const ALLOWED = new Set([
  'components/PptxSlideShow.jsx',
  'components/PptxSlideViewer.jsx',
])

function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
}

function checkFile(content) {
  const stripped = stripComments(content)
  const issues = []
  stripped.split('\n').forEach((line, i) => {
    for (const { name, re } of PATTERNS) {
      if (re.test(line)) {
        issues.push({ line: i + 1, rule: name, snippet: line.trim().slice(0, 120) })
      }
    }
  })
  return issues
}

function collectJsx(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry)
    if (statSync(abs).isDirectory()) {
      collectJsx(abs, out)
      continue
    }
    if (entry.endsWith('.jsx')) out.push(abs)
  }
  return out
}

// The shared library is BLOCKING: a hardcoded value here leaks into every
// design generated afterwards. Existing files under design/ are reported as
// warnings so the check stays runnable in CI without rewriting past output.
function isBlocking(rel) {
  return rel.startsWith('components/') || rel.startsWith('templates/')
}

const files = DIRS.flatMap((dir) => collectJsx(dir))
if (files.length === 0) {
  console.log('✓ token lint (no .jsx files to scan)')
  process.exit(0)
}

let exit = 0
let scanned = 0
let skipped = 0
let warned = 0

for (const abs of files) {
  const rel = relative(ROOT, abs).split('\\').join('/')
  if (ALLOWED.has(rel)) {
    skipped += 1
    continue
  }
  scanned += 1
  const issues = checkFile(readFileSync(abs, 'utf8'))
  if (!issues.length) continue

  const blocking = isBlocking(rel)
  if (blocking) exit = 1
  else warned += 1

  const log = blocking ? console.error : console.warn
  log(`\n${blocking ? '✗' : '!'} ${rel}${blocking ? '' : ' (warning)'}`)
  for (const { line, rule, snippet } of issues) {
    log(`  L${line} (${rule}): ${snippet}`)
  }
}

if (exit === 1) {
  console.error('\nFix: use var(--theme-…) / var(--font\\/family\\/…) / Tailwind token classes from DESIGN.md.')
  process.exit(1)
}

console.log(
  `✓ token lint (${scanned} file(s) scanned, ${skipped} allowlisted` +
    (warned > 0 ? `, ${warned} legacy design file(s) with warnings` : '') +
    ')'
)
