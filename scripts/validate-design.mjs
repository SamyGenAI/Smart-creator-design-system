import { resolve } from 'path'
import { parseDesignMd } from './parse-design-md.mjs'

const rootDesignPath = resolve(process.cwd(), 'DESIGN.md')
parseDesignMd(rootDesignPath)

console.log('✓ DESIGN.md schema and token references are valid')
