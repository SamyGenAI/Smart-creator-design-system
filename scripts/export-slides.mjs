#!/usr/bin/env node
/**
 * export-slides.mjs — Export a slide deck to .pptx using PptxGenJS.
 *
 * Usage:
 *   pnpm export-slides [DeckName]
 *   node scripts/export-slides.mjs [DeckName]
 *
 * Reads:  design/[DeckName]Slides.data.js  (exports SLIDE_DATA)
 * Writes: output/[DeckName]Slides.pptx
 *
 * The data file must be plain JS (no JSX). It exports SLIDE_DATA matching:
 *   {
 *     meta: { title, authorName },
 *     slides: [{ id, layout, ...layoutProps }]
 *   }
 *
 * Layout types: cover | content | two-column | statement | bullets | quote | end
 */

import pptxgen from 'pptxgenjs'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const deckName = process.argv[2]
if (!deckName) {
  console.error('Usage: pnpm export-slides [DeckName]')
  console.error('Example: pnpm export-slides AIProductivity')
  process.exit(1)
}

// Load slide data
const dataPath = path.join(ROOT, 'design', `${deckName}Slides.data.js`)
if (!fs.existsSync(dataPath)) {
  console.error(`Data file not found: ${dataPath}`)
  console.error(`Expected: design/${deckName}Slides.data.js`)
  process.exit(1)
}

const { SLIDE_DATA } = await import(dataPath)

// ── PptxGenJS setup ───────────────────────────────────────────────────────────

const pptx = new pptxgen()
pptx.layout = 'LAYOUT_WIDE'  // 13.33" × 7.5" — standard 16:9

// Canvas dimensions
const W = 13.33   // inches (matches 1280px at 96dpi)
const H = 7.5     // inches (matches 720px at 96dpi)

// Design tokens
const BG_COLOR  = 'EBDBBC'
const NAVY      = '092c69'
const ACCENT    = 'b4eaff'
const FONT      = 'Montserrat'
const TEXT_PRI  = '000000'
const TEXT_SEC  = '323241'
const TEXT_MID  = '717188'
const WHITE     = 'FFFFFF'

// Unit helpers — convert pixel coordinates (1280×720 canvas) to inches
const px = (n) => parseFloat(((n / 1280) * W).toFixed(4))
const py = (n) => parseFloat(((n / 720) * H).toFixed(4))

// Resolve an asset path (/assets/...) to an absolute filesystem path
function resolvePath(assetPath) {
  if (!assetPath) return null
  const abs = path.join(ROOT, assetPath.replace(/^\//, ''))
  return fs.existsSync(abs) ? abs : null
}

// ── Layout renderers ──────────────────────────────────────────────────────────

function addCoverSlide(pSlide, data) {
  const hasIllustration = Boolean(data.illustration)
  const titleW = hasIllustration ? px(740) : px(960)
  const titleX = hasIllustration ? px(80) : px((1280 - (hasIllustration ? 740 : 960)) / 2)

  // Title
  pSlide.addText(data.title || '', {
    x: titleX, y: py(180), w: titleW, h: py(200),
    fontSize: 42, bold: true, fontFace: FONT, color: TEXT_PRI,
    align: 'left', wrap: true, lineSpacingMultiple: 1.15,
    charSpacing: -0.5,
  })

  // Accent pill behind accentWord — PptxGenJS can't inline-highlight a word,
  // so we draw a rect behind the title area as a design accent
  pSlide.addShape(pptx.ShapeType.roundRect, {
    x: titleX, y: py(175), w: titleW, h: py(210),
    fill: { type: 'none' },
    line: { type: 'none' },
  })

  // Subtitle card (rounded rect + text)
  if (data.subtitle) {
    const cardTop = hasIllustration ? py(400) : py(380)
    pSlide.addShape(pptx.ShapeType.roundRect, {
      x: titleX, y: cardTop, w: titleW, h: py(80),
      fill: { type: 'solid', color: WHITE, transparency: 45 },
      line: { type: 'none' },
      rectRadius: 0.12,
    })
    pSlide.addText(data.subtitle, {
      x: titleX + 0.2, y: cardTop + 0.05, w: titleW - 0.4, h: py(80) - 0.1,
      fontSize: 16, fontFace: FONT, color: TEXT_SEC,
      align: 'left', valign: 'middle', wrap: true,
    })
  }

  // Illustration
  const imgPath = resolvePath(data.illustration)
  if (imgPath) {
    pSlide.addImage({ path: imgPath, x: px(880), y: py(60), w: px(340), h: py(580), sizing: { type: 'contain', w: px(340), h: py(580) } })
  }
}

function addNavyTitleBar(pSlide, title) {
  pSlide.addShape(pptx.ShapeType.roundRect, {
    x: px(60), y: py(56), w: px(1160), h: py(80),
    fill: { color: NAVY },
    line: { type: 'none' },
    rectRadius: 0.1,
  })
  pSlide.addText(title || '', {
    x: px(60) + 0.25, y: py(56), w: px(1160) - 0.5, h: py(80),
    fontSize: 20, bold: true, fontFace: FONT, color: WHITE,
    valign: 'middle',
  })
}

function addBodyCard(pSlide, x, y, w, h, body, variant = 'white') {
  const bg = variant === 'glass'
    ? { type: 'solid', color: WHITE, transparency: 45 }
    : { type: 'solid', color: WHITE, transparency: 8 }

  pSlide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    fill: bg,
    line: { type: 'none' },
    rectRadius: 0.1,
  })

  const lines = Array.isArray(body) ? body : [body]
  const text = lines.join('\n\n')
  if (text) {
    pSlide.addText(text, {
      x: x + 0.22, y: y + 0.18, w: w - 0.44, h: h - 0.36,
      fontSize: 13, fontFace: FONT, color: TEXT_SEC,
      valign: 'top', wrap: true, lineSpacingMultiple: 1.4,
    })
  }
}

function addContentSlide(pSlide, data) {
  addNavyTitleBar(pSlide, data.title)

  const hasImage = Boolean(data.image)
  const bodyW = hasImage ? px(640) : px(1160)
  const bodyH = py(496)

  addBodyCard(pSlide, px(60), py(160), bodyW, bodyH, data.body)

  if (hasImage) {
    const cardX = px(720)
    const cardW = px(488)
    pSlide.addShape(pptx.ShapeType.roundRect, {
      x: cardX, y: py(160), w: cardW, h: bodyH,
      fill: { type: 'solid', color: WHITE, transparency: 45 },
      line: { type: 'none' },
      rectRadius: 0.1,
    })
    const imgPath = resolvePath(data.image)
    if (imgPath) {
      pSlide.addImage({ path: imgPath, x: cardX + 0.1, y: py(160) + 0.1, w: cardW - 0.2, h: bodyH - 0.2, sizing: { type: 'contain', w: cardW - 0.2, h: bodyH - 0.2 } })
    }
  }
}

function addTwoColumnSlide(pSlide, data) {
  addNavyTitleBar(pSlide, data.title)

  const split = data.split || '55/45'
  const leftW  = split === '55/45' ? px(628) : px(556)
  const rightW = split === '55/45' ? px(492) : px(556)
  const bodyH  = py(468)
  const rightX = px(1280) - px(60) - rightW

  addBodyCard(pSlide, px(60), py(160), leftW, bodyH, data.leftContent)

  // Right panel
  const isImg = typeof data.rightContent === 'string' && data.rightContent.startsWith('/')
  pSlide.addShape(pptx.ShapeType.roundRect, {
    x: rightX, y: py(160), w: rightW, h: bodyH,
    fill: { type: 'solid', color: WHITE, transparency: 45 },
    line: { type: 'none' },
    rectRadius: 0.1,
  })
  if (isImg) {
    const imgPath = resolvePath(data.rightContent)
    if (imgPath) {
      pSlide.addImage({ path: imgPath, x: rightX + 0.1, y: py(160) + 0.1, w: rightW - 0.2, h: bodyH - 0.2, sizing: { type: 'contain', w: rightW - 0.2, h: bodyH - 0.2 } })
    }
  } else if (typeof data.rightContent === 'string') {
    pSlide.addText(data.rightContent, {
      x: rightX + 0.22, y: py(160) + 0.18, w: rightW - 0.44, h: bodyH - 0.36,
      fontSize: 13, fontFace: FONT, color: TEXT_SEC,
      valign: 'top', wrap: true, lineSpacingMultiple: 1.4,
    })
  }
}

function addStatementSlide(pSlide, data) {
  const words = (data.statement || '').split(' ').length
  const fontSize = words <= 5 ? 44 : words <= 10 ? 38 : 32

  const cardW = px(960)
  const cardH = py(320)
  const cardX = (W - cardW) / 2
  const cardY = (H - cardH) / 2

  pSlide.addShape(pptx.ShapeType.roundRect, {
    x: cardX, y: cardY, w: cardW, h: cardH,
    fill: { type: 'solid', color: WHITE, transparency: 45 },
    line: { type: 'none' },
    rectRadius: 0.22,
  })

  pSlide.addText(data.statement || '', {
    x: cardX + 0.5, y: cardY + 0.3, w: cardW - 1, h: cardH - 0.6,
    fontSize, bold: true, fontFace: FONT, color: TEXT_PRI,
    align: 'center', valign: 'middle', wrap: true, lineSpacingMultiple: 1.25,
    charSpacing: -0.5,
  })

  if (data.sub) {
    pSlide.addText(data.sub, {
      x: cardX + 0.5, y: cardY + cardH - 0.6, w: cardW - 1, h: 0.5,
      fontSize: 14, fontFace: FONT, color: TEXT_SEC,
      align: 'center', transparency: 25,
    })
  }
}

function addBulletsSlide(pSlide, data) {
  addNavyTitleBar(pSlide, data.title)

  const bullets = (data.bullets || []).slice(0, 5)
  const rowH = py(80)
  const gap = py(14)
  const startY = py(160)

  bullets.forEach((bullet, i) => {
    const y = startY + i * (rowH + gap)

    pSlide.addShape(pptx.ShapeType.roundRect, {
      x: px(60), y, w: px(1160), h: rowH,
      fill: { type: 'solid', color: WHITE, transparency: 8 },
      line: { type: 'none' },
      rectRadius: 0.1,
    })

    let textX = px(60) + 0.3
    const iconPath = resolvePath(bullet.icon)
    if (iconPath) {
      const iconSize = py(44)
      pSlide.addImage({ path: iconPath, x: px(60) + 0.2, y: y + (rowH - iconSize) / 2, w: iconSize, h: iconSize })
      textX = px(60) + 0.2 + iconSize + 0.18
    }

    const textW = px(60) + px(1160) - 0.3 - textX
    pSlide.addText([
      { text: (bullet.label || '') + '   ', options: { bold: true, fontSize: 14, fontFace: FONT, color: TEXT_PRI } },
      { text: bullet.desc || '',           options: { bold: false, fontSize: 12, fontFace: FONT, color: TEXT_MID } },
    ], { x: textX, y, w: textW, h: rowH, valign: 'middle' })
  })
}

function addQuoteSlide(pSlide, data) {
  // Decorative quote mark
  pSlide.addText('\u201C', {
    x: px(60), y: py(30), w: px(200), h: py(200),
    fontSize: 160, fontFace: FONT, color: NAVY,
    transparency: 88,
  })

  const cardW = px(960)
  const cardH = py(360)
  const cardX = (W - cardW) / 2
  const cardY = (H - cardH) / 2

  pSlide.addShape(pptx.ShapeType.roundRect, {
    x: cardX, y: cardY, w: cardW, h: cardH,
    fill: { type: 'solid', color: WHITE, transparency: 45 },
    line: { type: 'none' },
    rectRadius: 0.2,
  })

  pSlide.addText(data.quote || '', {
    x: cardX + 0.45, y: cardY + 0.35, w: cardW - 0.9, h: cardH - 1.1,
    fontSize: 18, italic: true, fontFace: FONT, color: TEXT_PRI,
    align: 'center', valign: 'top', wrap: true, lineSpacingMultiple: 1.5,
  })

  // Attribution
  const attribution = `— ${data.author || ''}${data.role ? ', ' + data.role : ''}`
  pSlide.addText(attribution, {
    x: cardX + 0.45, y: cardY + cardH - 0.65, w: cardW - 0.9, h: 0.5,
    fontSize: 13, bold: true, fontFace: FONT, color: NAVY,
    align: 'center',
  })
}

function addEndSlide(pSlide, data) {
  const avatarSrc = resolvePath(data.avatar) || resolvePath('/assets/avatar/avatar-profile.png')

  // Avatar
  if (avatarSrc) {
    const size = py(160)
    pSlide.addImage({
      path: avatarSrc,
      x: (W - size) / 2, y: py(100),
      w: size, h: size,
      rounding: true,
    })
  }

  // Accent pill behind "more"
  pSlide.addShape(pptx.ShapeType.roundRect, {
    x: (W - px(320)) / 2, y: py(300), w: px(320), h: py(72),
    fill: { color: ACCENT },
    line: { type: 'none' },
    rectRadius: 0.1,
  })

  // "Follow for more"
  pSlide.addText('Follow for more', {
    x: (W - px(720)) / 2, y: py(296), w: px(720), h: py(80),
    fontSize: 36, bold: true, fontFace: FONT, color: TEXT_PRI,
    align: 'center', valign: 'middle',
  })

  // Author name
  pSlide.addText(data.authorName || '', {
    x: 0, y: py(400), w: W,
    fontSize: 20, fontFace: FONT, color: NAVY,
    align: 'center', bold: true,
  })

  // Handle
  if (data.handle) {
    pSlide.addText(data.handle, {
      x: 0, y: py(440), w: W,
      fontSize: 15, fontFace: FONT, color: TEXT_MID,
      align: 'center',
    })
  }

  // Optional illustration
  const illuPath = resolvePath(data.illustration)
  if (illuPath) {
    pSlide.addImage({ path: illuPath, x: px(1000), y: py(400), w: px(220), h: py(280), sizing: { type: 'contain', w: px(220), h: py(280) } })
  }
}

// ── Main render loop ──────────────────────────────────────────────────────────

for (const slide of SLIDE_DATA.slides) {
  const pSlide = pptx.addSlide()
  pSlide.background = { color: BG_COLOR }

  switch (slide.layout) {
    case 'cover':       addCoverSlide(pSlide, slide);       break
    case 'content':     addContentSlide(pSlide, slide);     break
    case 'two-column':  addTwoColumnSlide(pSlide, slide);   break
    case 'statement':   addStatementSlide(pSlide, slide);   break
    case 'bullets':     addBulletsSlide(pSlide, slide);     break
    case 'quote':       addQuoteSlide(pSlide, slide);       break
    case 'end':         addEndSlide(pSlide, slide);         break
    default:
      console.warn(`Unknown layout: "${slide.layout}" (slide id: ${slide.id}) — skipped`)
  }
}

// ── Write output ──────────────────────────────────────────────────────────────

const outputDir = path.join(ROOT, 'output')
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

const outputPath = path.join(outputDir, `${deckName}Slides.pptx`)
await pptx.writeFile({ fileName: outputPath })

console.log(`Exported: output/${deckName}Slides.pptx`)
