import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { parseDesignMd } from './parse-design-md.mjs'

const ROOT = process.cwd()
const MANIFEST_PATH = resolve(ROOT, 'templates', 'template-manifest.json')
const APP_PATH = resolve(ROOT, 'src', 'App.jsx')

function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (!token.startsWith('--')) continue
    const key = token.slice(2)
    const value = argv[i + 1]
    if (!value || value.startsWith('--')) {
      args[key] = true
      continue
    }
    args[key] = value
    i += 1
  }
  return args
}

function slugify(input) {
  return String(input)
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

function toPascalCase(input) {
  return String(input)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/[^a-zA-Z0-9]/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('')
}

function insertImports(appCode, importLines) {
  const lines = appCode.split('\n')
  let lastImportIdx = -1
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].startsWith('import ')) lastImportIdx = i
  }
  if (lastImportIdx < 0) return appCode

  const existing = new Set(lines.filter((line) => line.startsWith('import ')))
  const newLines = importLines.filter((line) => !existing.has(line))
  if (newLines.length === 0) return appCode

  lines.splice(lastImportIdx + 1, 0, ...newLines)
  return lines.join('\n')
}

function upsertModeEntry(appCode, modeKey, modeEntry) {
  const keyRegex = new RegExp(`['"]?${modeKey}['"]?\\s*:\\s*\\{`)
  if (keyRegex.test(appCode)) return appCode

  const modesRegex = /const MODES = \{([\s\S]*?)\n\}/
  const match = appCode.match(modesRegex)
  if (!match) {
    throw new Error('Could not locate MODES object in src/App.jsx')
  }

  const body = match[1]
  const trimmed = body.trimEnd()
  const needsComma = trimmed.length > 0 && !trimmed.endsWith(',')
  const separator = needsComma ? ',' : ''
  const nextBody = `${body}${separator}\n${modeEntry}`

  return appCode.replace(modesRegex, `const MODES = {${nextBody}\n}`)
}

function updateAppRegistry({
  modeKey,
  label,
  runtimeType,
  componentName,
  outputType,
  outputFileName,
}) {
  let appCode = readFileSync(APP_PATH, 'utf8')

  const importLines = [
    `import ${componentName} from '../design/${outputType}/${outputFileName}.jsx'`,
  ]

  appCode = insertImports(appCode, importLines)

  const modeEntry = `  ${modeKey}: {\n    label: '${label}',\n    component: ${componentName},\n    type: '${runtimeType}',\n  },`

  appCode = upsertModeEntry(appCode, modeKey, modeEntry)
  writeFileSync(APP_PATH, appCode, 'utf8')
}

function writeInfographicOrCarouselOutput({
  outputType,
  outputFileName,
  componentName,
  templateImportPath,
  templateExport,
  data,
}) {
  const outputDir = resolve(ROOT, 'design', outputType)
  mkdirSync(outputDir, { recursive: true })
  const outputPath = resolve(outputDir, `${outputFileName}.jsx`)
  const serialized = JSON.stringify(data, null, 2)

  const code = `// GENERATED_FROM_TEMPLATE: ${templateImportPath}
import ${templateExport} from '../../${templateImportPath}'

const data = ${serialized}

export default function ${componentName}() {
  return <${templateExport} data={data} />
}
`
  writeFileSync(outputPath, code, 'utf8')
}

function main() {
  const args = parseArgs(process.argv.slice(2))

  if (args.type === 'infographics') {
    throw new Error(
      'Infographics are not generated from templates. Add design/infographics/<Name>Infographic.jsx using InfographicCanvas + components/ (see skills/infographics-designer/SKILL.md), register in src/App.jsx.',
    )
  }

  if (args.type === 'pptx-slides' || args.type === 'slides') {
    throw new Error(
      'Slide decks are not generated from templates/carousels codegen. Each deck lives under design/pptx-slides/decks/[slug]/deck.mjs with deck-local layouts beside it (see .codex/agents/slide-agent.md and skills/pptx/slide-templates.md).',
    )
  }

  const required = ['type', 'template', 'name', 'data']
  for (const key of required) {
    if (!args[key]) {
      throw new Error(
        `Missing --${key}. Usage: pnpm generate:design -- --type carousels --template linkedin --name MyTopic --data ./brief.json`,
      )
    }
  }

  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
  const designTokens = parseDesignMd(resolve(ROOT, 'DESIGN.md'))
  const forbiddenHexes = Object.values(designTokens.colors)
    .filter((value) => /^#[0-9a-fA-F]{6,8}$/.test(value))
    .map((value) => String(value).toLowerCase())
  const templateGroup = manifest[args.type]
  if (!templateGroup) {
    throw new Error(`Unknown --type "${args.type}". Available: ${Object.keys(manifest).join(', ')}`)
  }

  const templateDef = templateGroup[args.template]
  if (!templateDef) {
    throw new Error(`Unknown template "${args.template}" for type "${args.type}"`)
  }

  const dataPath = resolve(ROOT, args.data)
  const data = JSON.parse(readFileSync(dataPath, 'utf8'))
  const dataAsText = JSON.stringify(data).toLowerCase()
  const violatingColor = forbiddenHexes.find((hex) => dataAsText.includes(hex))
  if (violatingColor) {
    throw new Error(
      `Generation blocked: data contains raw brand color ${violatingColor}. Pass semantic labels/content only, not hardcoded brand hex values.`,
    )
  }
  const baseName = toPascalCase(args.name)
  const outputFileName = `${baseName}${templateDef.outputSuffix}`
  const modeKey = args['mode-key'] || slugify(args.name)
  const label = args.label || args.name

  if (args.type === 'carousels') {
    writeInfographicOrCarouselOutput({
      outputType: args.type,
      outputFileName,
      componentName: outputFileName,
      templateImportPath: templateDef.componentPath,
      templateExport: templateDef.componentExport,
      data,
    })
    updateAppRegistry({
      modeKey,
      label,
      runtimeType: 'carousel',
      componentName: outputFileName,
      outputType: args.type,
      outputFileName,
    })
    console.log(`✓ Generated design/${args.type}/${outputFileName}.jsx from template "${args.template}"`)
    return
  }

  throw new Error(`Unsupported type: ${args.type}`)
}

main()
