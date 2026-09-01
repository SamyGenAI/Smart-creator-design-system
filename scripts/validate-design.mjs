/**
 * validate-design.mjs
 *
 * 1. DESIGN.md schema + token references.
 * 2. src/index.css matches what DESIGN.md would generate (catches the silent
 *    drift where runtime CSS variables keep the previous brand's palette).
 */
import { execFileSync } from 'child_process'
import { resolve } from 'path'
import { parseDesignMd } from './parse-design-md.mjs'

const rootDesignPath = resolve(process.cwd(), 'DESIGN.md')
parseDesignMd(rootDesignPath)

console.log('✓ DESIGN.md schema and token references are valid')

try {
  execFileSync(process.execPath, [resolve(process.cwd(), 'scripts/generate-index-css.mjs'), '--check'], {
    stdio: 'inherit',
  })
} catch {
  process.exit(1)
}
