/**
 * Flags obvious non-token color literals in design/infographics/*.jsx
 * (hex, rgb/hsl functions). Optional — run when touching infographic JSX.
 */
import { existsSync, readdirSync, readFileSync } from 'fs'
import { join, resolve } from 'path'

const ROOT = process.cwd()
const DIR = resolve(ROOT, 'design', 'infographics')

const PATTERNS = [
  { name: 'hex color', re: /#[0-9a-fA-F]{3,8}\b/ },
  { name: 'rgb()/rgba()', re: /\brgba?\s*\(/ },
  { name: 'hsl()/hsla()', re: /\bhsla?\s*\(/ },
  { name: 'Tailwind arbitrary #[...]', re: /\[[^\]]*#[0-9a-fA-F]{3,8}[^\]]*\]/ },
]

function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
}

function checkFile(content) {
  const stripped = stripComments(content)
  const issues = []
  const lines = stripped.split('\n')
  lines.forEach((line, i) => {
    for (const { name, re } of PATTERNS) {
      if (re.test(line)) {
        issues.push({ line: i + 1, rule: name, snippet: line.trim().slice(0, 120) })
      }
    }
  })
  return issues
}

if (!existsSync(DIR)) {
  console.log('✓ infographic token lint (no design/infographics/)')
  process.exit(0)
}

const files = readdirSync(DIR).filter((f) => f.endsWith('.jsx'))
if (files.length === 0) {
  console.log('✓ infographic token lint (no .jsx files)')
  process.exit(0)
}

let exit = 0
for (const f of files) {
  const abs = join(DIR, f)
  const content = readFileSync(abs, 'utf8')
  const colorIssues = checkFile(content)
  if (colorIssues.length) {
    exit = 1
    console.error(`\n✗ ${f}`)
    for (const { line, rule, snippet } of colorIssues) {
      console.error(`  L${line} (${rule}): ${snippet}`)
    }
  }
}

if (exit === 1) {
  console.error('\nFix: use var(--theme-…) / Tailwind token classes from DESIGN.md.')
  process.exit(1)
}

console.log(`✓ infographic token lint (${files.length} file(s))`)
