/**
 * Ensures design/infographics/*.jsx imports the canonical infographic root.
 */
import { existsSync, readdirSync, readFileSync } from 'fs'
import { resolve, join } from 'path'

const ROOT = process.cwd()
const DIR = resolve(ROOT, 'design', 'infographics')
const CANVAS_IMPORT =
  /from\s+['"]\.\.\/\.\.\/components\/InfographicCanvas\.jsx['"]/

function fail(message) {
  console.error(`✗ ${message}`)
  process.exitCode = 1
}

if (!existsSync(DIR)) {
  console.log('✓ Infographic canvas check skipped (no design/infographics/)')
  process.exit(0)
}

const files = readdirSync(DIR).filter((f) => f.endsWith('.jsx'))
if (files.length === 0) {
  console.log('✓ Infographic canvas check (no .jsx files yet)')
  process.exit(0)
}

for (const f of files) {
  const abs = join(DIR, f)
  const content = readFileSync(abs, 'utf8')
  const problems = []

  if (!CANVAS_IMPORT.test(content)) {
    problems.push(
      'must import InfographicCanvas from ../../components/InfographicCanvas.jsx',
    )
  }
  /** Invalid tailwind token; `bg-bg-canvas` is correct. Avoid matching inside `bg-bg-canvas`. */
  if (/(?<!-)bg-canvas\b/.test(content)) {
    problems.push(
      'invalid tailwind utility "bg-canvas" — wrap with InfographicCanvas (or use bg-bg-canvas)',
    )
  }

  if (problems.length) {
    fail(`${f}: ${problems.join('; ')}`)
  }
}

if (process.exitCode === 1) {
  process.exit(1)
}

console.log(`✓ Infographic canvas (${files.length} file(s)) use InfographicCanvas`)
