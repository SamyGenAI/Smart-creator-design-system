#!/usr/bin/env node
/**
 * Regenerate design/pptx-slides/templates/slideTemplates.manifest.json
 * from the bundled HTML in slideTemplates.html.
 *
 * Usage: node scripts/extract-slide-template-manifest.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const HTML_PATH = path.join(ROOT, 'design', 'pptx-slides', 'templates', 'slideTemplates.html')
const MANIFEST_PATH = path.join(ROOT, 'design', 'pptx-slides', 'templates', 'slideTemplates.manifest.json')

const SLOT_HINTS = {
  'Venn 2-circle': { regions: 3, legendItems: 3, items: 3, descriptions: 3 },
  'Donut chart': { segments: 3, legendItems: 3 },
  Iceberg: { visibleItems: 3, hiddenItems: 3 },
  Pyramid: { tiers: 4 },
  'Pie chart': { segments: 3, legendItems: 3 },
  'Vertical timeline': { steps: 3, descriptions: 3 },
  'Header cards': { cards: 3, headers: 3, descriptions: 3 },
  'Cascade boxes': { boxes: 3, descriptions: 3 },
  
  'Badge cards': { cards: 3, badges: 3, descriptions: 3 },
  'Chevron process': { steps: 3, descriptions: 3 },
  'Icon columns 3': { columns: 3, icons: 3, titles: 3, descriptions: 3 },
  'Icon columns 6': { columns: 6, icons: 6, titles: 6, descriptions: 6 },
  'Venn 3-circle': { circles: 3, overlapRegions: 4, legendItems: 4 },
  'Navy glass cards 3': { cards: 3, headers: 3, descriptions: 3 },
  'Navy glass cards 4': { cards: 4, headers: 4, descriptions: 4 },
}

const BEST_FOR = {
  'Venn 2-circle': 'Overlap, comparison, or shared traits between two concepts',
  'Donut chart': 'Market share, budget split, or proportional breakdown',
  Iceberg: 'Surface vs root cause, visible symptoms vs underlying drivers',
  Pyramid: 'Hierarchy, maturity model, or priority stack',
  'Pie chart': 'Simple three-part distribution with legend',
  'Vertical timeline': 'Sequential process, roadmap milestones, or phased rollout',
  'Header cards': 'Three parallel pillars, features, or value props with titled cards',
  'Cascade boxes': 'Waterfall logic, cause chain, or descending dependency flow',
  'Badge cards': 'Numbered priorities, ranked tips, or ordered recommendations',
  'Chevron process': 'Linear workflow, funnel stages, or handoff sequence',
  'Icon columns 3': 'Three benefits, capabilities, or talking points with icons',
  'Icon columns 6': 'Feature grid, checklist of six items, or compact capability matrix',
  'Venn 3-circle': 'Three-way comparison, intersection of domains, or ecosystem overlap',
  'Navy glass cards 3': 'Premium three-card layout on dark brand background with glass effect',
  'Navy glass cards 4': 'Four-quadrant summary, KPI cards, or compact comparison on brand background',
}

function slugify(label) {
  return label.toLowerCase().replace(/\s+/g, '-')
}

function extractTemplateHtml(htmlPath) {
  const raw = fs.readFileSync(htmlPath, 'utf8')
  const m = raw.match(/<script type="__bundler\/template">\s*\n([\s\S]*?)\n\s*<\/script>/)
  if (!m) throw new Error('Could not find __bundler/template block in slideTemplates.html')
  return JSON.parse(m[1])
}

function extractTitleAnchor(css) {
  const block = css.match(/\.slide-title\s*\{([^}]+)\}/)?.[1] ?? ''
  const num = (prop) => {
    const m = block.match(new RegExp(`${prop}:\\s*([\\d.]+)px`))
    return m ? Number(m[1]) : null
  }
  return {
    topPx: num('top') ?? 50,
    leftPx: num('left') ?? 72,
    fontPx: num('font-size') ?? 62,
    fontWeight: 800,
    colorVar: '--navy',
    tokKey: 'brand',
  }
}

function main() {
  const bundled = extractTemplateHtml(HTML_PATH)
  const css = bundled.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? ''
  const labels = [...bundled.matchAll(/<div class="slide" data-screen-label="([^"]+)"/g)].map((m) => m[1])

  if (labels.length === 0) throw new Error('No data-screen-label slides found')

  const existing = fs.existsSync(MANIFEST_PATH)
    ? JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
    : {}

  const manifest = {
    version: 1,
    source: 'design/pptx-slides/templates/slideTemplates.html',
    canvas: {
      widthPx: 1280,
      heightPx: 720,
      pptxLayout: 'LAYOUT_16x9',
      widthIn: 10,
      heightIn: 5.625,
    },
    conversion: {
      xIn: 'xPx / 1280 * 10',
      yIn: 'yPx / 720 * 5.625',
      wIn: 'wPx / 1280 * 10',
      hIn: 'hPx / 720 * 5.625',
      fontPt: 'Math.round(fontPx * 0.5625)',
    },
    titleAnchor: extractTitleAnchor(css),
    tokenMap: existing.tokenMap ?? {},
    primitives: existing.primitives ?? {},
    templates: labels.map((label) => ({
      id: slugify(label),
      label,
      dataScreenLabel: label,
      slots: SLOT_HINTS[label] ?? {},
      bestFor: BEST_FOR[label] ?? '',
      placeholderPattern: existing.templates?.find((t) => t.label === label)?.placeholderPattern ?? '',
      bodyTopPx: 130,
      ...(label.startsWith('Navy glass') ? { background: 'brand' } : {}),
    })),
    bookends: existing.bookends ?? {
      hero: 'No catalog template. Compose creatively: brand background, badge pill, large title, subtitle, author bar.',
      cta: 'No catalog template. Compose creatively: brand background, key takeaway, CREATOR_DISPLAY_NAME, follow CTA.',
    },
  }

  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`Wrote ${path.relative(ROOT, MANIFEST_PATH)} (${labels.length} templates)`)
}

main()
