#!/usr/bin/env node
/**
 * export-slides.mjs — Export a slide deck to .pptx using PptxGenJS.
 *
 * Usage:
 *   pnpm export-slides [DeckName]
 *   node scripts/export-slides.mjs [DeckName]
 *
 * Keynote compatibility notes:
 * - All images converted to PNG base64 (no SVG, no file paths)
 * - No `transparency` on fills (Keynote can't parse it reliably)
 * - No `rounding: true` on images (unsupported)
 * - No `sizing` on images (can corrupt)
 * - No `lineSpacingMultiple` (use paraSpaceBefore/After instead)
 * - Fresh shadow objects per call (PptxGenJS mutates them)
 */

import pptxgen from 'pptxgenjs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import fs from 'fs'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const deckName = process.argv[2]
if (!deckName) {
  console.error('Usage: pnpm export-slides [DeckName]')
  console.error('Example: pnpm export-slides AIProductivity')
  process.exit(1)
}

const dataPath = path.join(ROOT, 'design', `${deckName}Slides.data.js`)
if (!fs.existsSync(dataPath)) {
  console.error(`Data file not found: ${dataPath}`)
  process.exit(1)
}

const { SLIDE_DATA } = await import(pathToFileURL(dataPath).href)

// ── PptxGenJS setup ───────────────────────────────────────────────────────────

const pptx = new pptxgen()
pptx.layout = 'LAYOUT_16x9'

const W = 10
const H = 5.625

// Colors — NO '#' prefix, NO 8-char hex (both corrupt the file)
const BG     = 'EBDBBC'
const NAVY   = '092c69'
const ACCENT = 'b4eaff'
const FONT   = 'Verdana'
const C_BLK  = '000000'
const C_BODY = '323241'
const C_MID  = '717188'
const C_WHT  = 'FFFFFF'

// Semi-transparent white equivalents (pre-blended on BG_COLOR)
// white @ 92% on EBDBBC = F3EFE2   (card bg)
// white @ 55% on EBDBBC = F5F0E6   (glass bg)
const CARD_BG  = 'F3EFE2'
const GLASS_BG = 'F5F0E6'

const px = (n) => parseFloat(((n / 1280) * W).toFixed(4))
const py = (n) => parseFloat(((n / 720) * H).toFixed(4))

// ── Image helpers ─────────────────────────────────────────────────────────────

function resolvePath(assetPath) {
  if (!assetPath) return null
  const abs = path.join(ROOT, assetPath.replace(/^\//, ''))
  return fs.existsSync(abs) ? abs : null
}

const imageCache = new Map()

async function imageToBase64(assetPath, rasterWidth = 512) {
  if (!assetPath) return null
  if (imageCache.has(assetPath)) return imageCache.get(assetPath)

  const absPath = resolvePath(assetPath)
  if (!absPath) {
    console.warn(`  [warn] Image not found: ${assetPath}`)
    return null
  }

  const ext = path.extname(absPath).toLowerCase()
  let base64

  try {
    if (ext === '.svg') {
      const pngBuffer = await sharp(absPath).resize(rasterWidth).png().toBuffer()
      base64 = 'image/png;base64,' + pngBuffer.toString('base64')
    } else {
      const buffer = fs.readFileSync(absPath)
      const mime = ext === '.png' ? 'image/png' : 'image/jpeg'
      base64 = `${mime};base64,` + buffer.toString('base64')
    }
  } catch (err) {
    console.warn(`  [warn] Failed to process image ${assetPath}: ${err.message}`)
    return null
  }

  imageCache.set(assetPath, base64)
  return base64
}

async function addImg(pSlide, assetPath, x, y, w, h) {
  const data = await imageToBase64(assetPath, 512)
  if (data) pSlide.addImage({ data, x, y, w, h })
}

// ── Shadow factory — MUST create fresh object each time ──────────────────────

const mkShadow = () => ({
  type: 'outer', blur: 6, offset: 2, angle: 135, color: '000000', opacity: 0.12,
})
const mkShadowSm = () => ({
  type: 'outer', blur: 3, offset: 1, angle: 135, color: '000000', opacity: 0.10,
})

// ── Reusable helpers ─────────────────────────────────────────────────────────

function addRoundRect(pSlide, x, y, w, h, fill, shadow = true) {
  const opts = {
    x, y, w, h,
    fill: { color: fill },
    line: { type: 'none' },
    rectRadius: 0.1,
  }
  if (shadow) opts.shadow = mkShadow()
  pSlide.addShape(pptx.shapes.ROUNDED_RECTANGLE, opts)
}

function addNavyBar(pSlide, title) {
  pSlide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: px(60), y: py(56), w: px(1160), h: py(80),
    fill: { color: NAVY },
    line: { type: 'none' },
    rectRadius: 0.1,
    shadow: mkShadow(),
  })
  pSlide.addText(title || '', {
    x: px(60) + 0.25, y: py(56), w: px(1160) - 0.5, h: py(80),
    fontSize: 18, bold: true, fontFace: FONT, color: C_WHT,
    valign: 'middle', margin: 0,
  })
}

// ── Layout: Cover ────────────────────────────────────────────────────────────

async function addCoverSlide(pSlide, data) {
  const hasIllu = Boolean(data.illustration)
  const titleW = hasIllu ? px(740) : px(960)
  const titleX = hasIllu ? px(80) : (W - titleW) / 2

  pSlide.addText(data.title || '', {
    x: titleX, y: py(180), w: titleW, h: py(200),
    fontSize: 36, bold: true, fontFace: FONT, color: C_BLK,
    align: 'left', wrap: true, margin: 0,
  })

  if (data.subtitle) {
    const cy = hasIllu ? py(400) : py(380)
    addRoundRect(pSlide, titleX, cy, titleW, py(80), GLASS_BG, false)
    pSlide.addText(data.subtitle, {
      x: titleX + 0.2, y: cy, w: titleW - 0.4, h: py(80),
      fontSize: 14, fontFace: FONT, color: C_BODY,
      align: 'left', valign: 'middle', wrap: true, margin: 0,
    })
  }

  if (hasIllu) {
    await addImg(pSlide, data.illustration, px(880), py(60), px(340), py(580))
  }
}

// ── Layout: Content ──────────────────────────────────────────────────────────

async function addContentSlide(pSlide, data) {
  addNavyBar(pSlide, data.title)

  const hasImg = Boolean(data.image)
  const bodyW = hasImg ? px(640) : px(1160)
  const bodyH = py(496)

  addRoundRect(pSlide, px(60), py(160), bodyW, bodyH, CARD_BG)

  const lines = Array.isArray(data.body) ? data.body : [data.body || '']
  const textParts = lines.map((line, i) => ({
    text: line,
    options: {
      fontSize: 12, fontFace: FONT, color: C_BODY,
      breakLine: i < lines.length - 1,
      paraSpaceAfter: 8,
    },
  }))
  pSlide.addText(textParts, {
    x: px(60) + 0.22, y: py(160) + 0.18, w: bodyW - 0.44, h: bodyH - 0.36,
    valign: 'top', wrap: true, margin: 0,
  })

  if (hasImg) {
    const cx = px(720), cw = px(488)
    addRoundRect(pSlide, cx, py(160), cw, bodyH, GLASS_BG)
    await addImg(pSlide, data.image, cx + 0.15, py(160) + 0.15, cw - 0.3, bodyH - 0.3)
  }
}

// ── Layout: Two Column ───────────────────────────────────────────────────────

async function addTwoColumnSlide(pSlide, data) {
  addNavyBar(pSlide, data.title)

  const leftW  = px(628), rightW = px(492), bodyH = py(468)
  const rightX = W - px(60) - rightW

  addRoundRect(pSlide, px(60), py(160), leftW, bodyH, CARD_BG)
  const leftText = typeof data.leftContent === 'string' ? data.leftContent : ''
  pSlide.addText(leftText, {
    x: px(60) + 0.22, y: py(160) + 0.18, w: leftW - 0.44, h: bodyH - 0.36,
    fontSize: 12, fontFace: FONT, color: C_BODY,
    valign: 'top', wrap: true, margin: 0,
  })

  addRoundRect(pSlide, rightX, py(160), rightW, bodyH, GLASS_BG)
  const isImg = typeof data.rightContent === 'string' && data.rightContent.startsWith('/')
  if (isImg) {
    await addImg(pSlide, data.rightContent, rightX + 0.15, py(160) + 0.15, rightW - 0.3, bodyH - 0.3)
  } else if (typeof data.rightContent === 'string') {
    pSlide.addText(data.rightContent, {
      x: rightX + 0.22, y: py(160) + 0.18, w: rightW - 0.44, h: bodyH - 0.36,
      fontSize: 12, fontFace: FONT, color: C_BODY,
      valign: 'top', wrap: true, margin: 0,
    })
  }
}

// ── Layout: Statement ────────────────────────────────────────────────────────

function addStatementSlide(pSlide, data) {
  const words = (data.statement || '').split(' ').length
  const fontSize = words <= 5 ? 36 : words <= 10 ? 30 : 26

  const cw = px(960), ch = data.sub ? py(320) : py(260)
  const cx = (W - cw) / 2, cy = (H - ch) / 2

  addRoundRect(pSlide, cx, cy, cw, ch, GLASS_BG)

  pSlide.addText(data.statement || '', {
    x: cx + 0.4, y: cy + 0.3, w: cw - 0.8, h: ch - (data.sub ? 1.0 : 0.6),
    fontSize, bold: true, fontFace: FONT, color: C_BLK,
    align: 'center', valign: 'middle', wrap: true, margin: 0,
  })

  if (data.sub) {
    pSlide.addText(data.sub, {
      x: cx + 0.4, y: cy + ch - 0.6, w: cw - 0.8, h: 0.4,
      fontSize: 12, fontFace: FONT, color: C_MID,
      align: 'center', valign: 'middle', margin: 0,
    })
  }
}

// ── Layout: Bullets ──────────────────────────────────────────────────────────

async function addBulletsSlide(pSlide, data) {
  addNavyBar(pSlide, data.title)

  const bullets = (data.bullets || []).slice(0, 5)
  const rowH = py(80), gap = py(14), startY = py(160)

  for (let i = 0; i < bullets.length; i++) {
    const b = bullets[i]
    const y = startY + i * (rowH + gap)

    addRoundRect(pSlide, px(60), y, px(1160), rowH, CARD_BG)

    let textX = px(60) + 0.3
    const imgData = await imageToBase64(b.icon)
    if (imgData) {
      const iconSz = py(44)
      pSlide.addImage({ data: imgData, x: px(60) + 0.2, y: y + (rowH - iconSz) / 2, w: iconSz, h: iconSz })
      textX = px(60) + 0.2 + iconSz + 0.18
    }

    const textW = px(60) + px(1160) - 0.3 - textX
    pSlide.addText([
      { text: (b.label || '') + '   ', options: { bold: true, fontSize: 13, fontFace: FONT, color: C_BLK } },
      { text: b.desc || '',            options: { fontSize: 11, fontFace: FONT, color: C_MID } },
    ], { x: textX, y, w: textW, h: rowH, valign: 'middle', margin: 0 })
  }
}

// ── Layout: Quote ────────────────────────────────────────────────────────────

function addQuoteSlide(pSlide, data) {
  pSlide.addText('\u201C', {
    x: px(60), y: py(30), w: px(200), h: py(200),
    fontSize: 120, fontFace: FONT, color: NAVY, margin: 0,
  })

  const cw = px(960), ch = py(360)
  const cx = (W - cw) / 2, cy = (H - ch) / 2

  addRoundRect(pSlide, cx, cy, cw, ch, GLASS_BG)

  pSlide.addText(data.quote || '', {
    x: cx + 0.4, y: cy + 0.3, w: cw - 0.8, h: ch - 1.0,
    fontSize: 16, italic: true, fontFace: FONT, color: C_BLK,
    align: 'center', valign: 'top', wrap: true, margin: 0,
  })

  pSlide.addText(data.author || '', {
    x: cx + 0.4, y: cy + ch - 0.6, w: cw - 0.8, h: 0.4,
    fontSize: 12, bold: true, fontFace: FONT, color: NAVY,
    align: 'center', margin: 0,
  })
}

// ── Layout: End ──────────────────────────────────────────────────────────────

async function addEndSlide(pSlide, data) {
  const avatarPath = data.avatar || '/assets/avatar/avatar-profile.png'
  const avatarData = await imageToBase64(avatarPath)

  // Avatar as plain image (no rounding — Keynote can't handle it)
  if (avatarData) {
    const sz = py(160)
    pSlide.addImage({ data: avatarData, x: (W - sz) / 2, y: py(100), w: sz, h: sz })
  }

  pSlide.addText('Follow for more', {
    x: (W - px(720)) / 2, y: py(296), w: px(720), h: py(80),
    fontSize: 30, bold: true, fontFace: FONT, color: C_BLK,
    align: 'center', valign: 'middle', margin: 0,
  })

  pSlide.addText(data.authorName || '', {
    x: 0, y: py(400), w: W, h: py(40),
    fontSize: 18, fontFace: FONT, color: NAVY,
    align: 'center', bold: true, margin: 0,
  })

  if (data.handle) {
    pSlide.addText(data.handle, {
      x: 0, y: py(440), w: W, h: py(30),
      fontSize: 13, fontFace: FONT, color: C_MID,
      align: 'center', margin: 0,
    })
  }

  if (data.illustration) {
    await addImg(pSlide, data.illustration, px(1000), py(400), px(220), py(280))
  }
}

// ── Custom: Problem slide ────────────────────────────────────────────────────

async function addCustomProblemSlide(pSlide) {
  addNavyBar(pSlide, 'The Old Playbook Is Broken')

  const problems = [
    { icon: '/assets/icons/email-messages/send-email-paper-plane-1--Streamline-Freehand.png', bg: 'FFD6D6', title: 'Cold email is dead', desc: 'Inboxes are flooded, reply rates are near zero. Buyers ignore everything templated.' },
    { icon: '/assets/icons/business/time-hourglass-triangle--Streamline-Freehand.svg', bg: 'FFF3D6', title: 'Content takes too long', desc: 'Most teams spend weeks on a post that gets 12 likes and zero leads.' },
    { icon: '/assets/icons/data/analytics-graph-stock--Streamline-Freehand.svg', bg: 'D6E8FF', title: 'LinkedIn is a red ocean', desc: 'Everyone is posting, but very few position themselves as the expert buyers trust.' },
  ]

  const startY = py(160), rowH = py(125), gap = py(28)

  for (let i = 0; i < problems.length; i++) {
    const p = problems[i]
    const y = startY + i * (rowH + gap)

    addRoundRect(pSlide, px(60), y, px(1160), rowH, CARD_BG)

    // Icon square
    const sq = py(48), sqX = px(60) + 0.22, sqY = y + (rowH - sq) / 2
    pSlide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: sqX, y: sqY, w: sq, h: sq,
      fill: { color: p.bg }, line: { type: 'none' }, rectRadius: 0.06,
      shadow: mkShadowSm(),
    })

    const iconData = await imageToBase64(p.icon, 256)
    if (iconData) {
      const isz = sq * 0.55
      pSlide.addImage({ data: iconData, x: sqX + (sq - isz) / 2, y: sqY + (sq - isz) / 2, w: isz, h: isz })
    }

    const tX = sqX + sq + 0.2, tW = px(60) + px(1160) - tX - 0.3
    pSlide.addText(p.title, {
      x: tX, y: y + 0.06, w: tW, h: rowH * 0.4,
      fontSize: 13, bold: true, fontFace: FONT, color: C_BLK, valign: 'bottom', margin: 0,
    })
    pSlide.addText(p.desc, {
      x: tX, y: y + rowH * 0.42, w: tW, h: rowH * 0.5,
      fontSize: 10, fontFace: FONT, color: C_MID, valign: 'top', wrap: true, margin: 0,
    })

    // Arrow between rows
    if (i < problems.length - 1) {
      pSlide.addShape(pptx.shapes.DOWN_ARROW, {
        x: (W - 0.2) / 2, y: y + rowH + 0.04, w: 0.2, h: gap - 0.08,
        fill: { color: 'CCCCCC' }, line: { type: 'none' },
      })
    }
  }

  pSlide.addText('So how do you stand out and get clients, without burning 20 hours a week?', {
    x: px(100), y: H - py(70), w: px(1080), h: py(50),
    fontSize: 11, bold: true, fontFace: FONT, color: NAVY,
    align: 'center', valign: 'middle', margin: 0,
  })
}

// ── Custom: Solution slide ───────────────────────────────────────────────────

async function addCustomSolutionSlide(pSlide) {
  addNavyBar(pSlide, 'Two Levers, One System')

  const cards = [
    { icon: '/assets/icons/design/content-brush-pen--Streamline-Freehand.svg', title: 'Premium Content', desc: 'High-quality posts that position you as the go-to expert. Content builds trust before the first call.' },
    { icon: '/assets/icons/data/analytics-graph-bar-horizontal--Streamline-Freehand.svg', title: 'Targeted Leads', desc: 'Real buying signals tell you who\'s ready to talk. No cold outreach, just warm conversations.' },
  ]

  const cw = px(500), ch = py(300), cy = py(175)
  const gapX = px(100), totalW = cw * 2 + gapX, startX = (W - totalW) / 2

  for (let i = 0; i < cards.length; i++) {
    const c = cards[i]
    const x = startX + i * (cw + gapX)

    addRoundRect(pSlide, x, cy, cw, ch, CARD_BG)

    // Icon square
    const sq = py(56), sqX = x + (cw - sq) / 2, sqY = cy + 0.25
    pSlide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: sqX, y: sqY, w: sq, h: sq,
      fill: { color: ACCENT }, line: { type: 'none' }, rectRadius: 0.06,
      shadow: mkShadowSm(),
    })

    const iconData = await imageToBase64(c.icon, 256)
    if (iconData) {
      const isz = sq * 0.55
      pSlide.addImage({ data: iconData, x: sqX + (sq - isz) / 2, y: sqY + (sq - isz) / 2, w: isz, h: isz })
    }

    pSlide.addText(c.title, {
      x: x + 0.15, y: sqY + sq + 0.12, w: cw - 0.3, h: 0.35,
      fontSize: 14, bold: true, fontFace: FONT, color: C_BLK,
      align: 'center', valign: 'middle', margin: 0,
    })

    pSlide.addText(c.desc, {
      x: x + 0.25, y: sqY + sq + 0.5, w: cw - 0.5, h: 0.8,
      fontSize: 10, fontFace: FONT, color: C_MID,
      align: 'center', valign: 'top', wrap: true, margin: 0,
    })
  }

  // Plus circle
  const pSz = py(40), pX = (W - pSz) / 2, pY = cy + (ch - pSz) / 2
  pSlide.addShape(pptx.shapes.OVAL, {
    x: pX, y: pY, w: pSz, h: pSz,
    fill: { color: NAVY }, line: { type: 'none' }, shadow: mkShadowSm(),
  })
  pSlide.addText('+', {
    x: pX, y: pY, w: pSz, h: pSz,
    fontSize: 16, bold: true, fontFace: FONT, color: C_WHT,
    align: 'center', valign: 'middle', margin: 0,
  })

  pSlide.addText('IGENTIV STUDIO', {
    x: 0, y: py(530), w: W, h: py(28),
    fontSize: 9, bold: true, fontFace: FONT, color: C_MID,
    align: 'center', charSpacing: 2, margin: 0,
  })

  pSlide.addText('We handle both.', {
    x: 0, y: py(560), w: W, h: py(55),
    fontSize: 24, bold: true, fontFace: FONT, color: C_BLK,
    align: 'center', valign: 'middle', margin: 0,
  })
}

// ── Main render loop ──────────────────────────────────────────────────────────

for (const slide of SLIDE_DATA.slides) {
  const pSlide = pptx.addSlide()
  pSlide.background = { color: BG }

  switch (slide.layout) {
    case 'cover':           await addCoverSlide(pSlide, slide);     break
    case 'content':         await addContentSlide(pSlide, slide);   break
    case 'two-column':      await addTwoColumnSlide(pSlide, slide); break
    case 'statement':       addStatementSlide(pSlide, slide);       break
    case 'bullets':         await addBulletsSlide(pSlide, slide);   break
    case 'quote':           addQuoteSlide(pSlide, slide);           break
    case 'end':             await addEndSlide(pSlide, slide);       break
    case 'custom-problem':  await addCustomProblemSlide(pSlide);    break
    case 'custom-solution': await addCustomSolutionSlide(pSlide);   break
    default:
      console.warn(`Unknown layout "${slide.layout}" (${slide.id}) — skipped`)
  }
}

// ── Write output ──────────────────────────────────────────────────────────────

const outputDir = path.join(ROOT, 'output')
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

let outputPath = path.join(outputDir, `${deckName}Slides.pptx`)
try {
  if (fs.existsSync(outputPath)) {
    const fd = fs.openSync(outputPath, 'r+')
    fs.closeSync(fd)
  }
} catch {
  outputPath = path.join(outputDir, `${deckName}Slides-${Date.now()}.pptx`)
  console.log(`Original locked, writing to: ${path.basename(outputPath)}`)
}

await pptx.writeFile({ fileName: outputPath })

// ── Post-process: graft slides onto Keynote-compatible scaffold ──────────────
// PptxGenJS produces PPTX files that PowerPoint can open but Keynote rejects
// (phantom content-type entries, missing a:noFill in line elements, incompatible
// theme/master/layout structures). Fix: keep only the slides, media, and notes
// that PptxGenJS generated, and graft them onto a known-good scaffold exported
// from Google Slides (scripts/keynote-scaffold.pptx).

import JSZip from 'jszip'

const scaffoldPath = path.join(__dirname, 'keynote-scaffold.pptx')

try {
  const genBuf = fs.readFileSync(outputPath)
  const genZip = await JSZip.loadAsync(genBuf)
  const scaffoldZip = await JSZip.loadAsync(fs.readFileSync(scaffoldPath))

  const finalZip = new JSZip()

  // 1. Copy ALL scaffold files (theme, masters, layouts, fonts, presProps, etc.)
  const scaffoldFiles = []
  scaffoldZip.forEach((relPath, file) => {
    if (!file.dir) scaffoldFiles.push(relPath)
  })
  for (const f of scaffoldFiles) {
    finalZip.file(f, await scaffoldZip.file(f).async('nodebuffer'))
  }

  // 2. Collect slides, media, and notesSlides from PptxGenJS output
  const genSlides = [], genMedia = [], genNotes = [], genSlideRels = [], genNoteRels = []
  genZip.forEach((relPath) => {
    if (relPath.startsWith('ppt/slides/slide') && relPath.endsWith('.xml'))
      genSlides.push(relPath)
    else if (relPath.startsWith('ppt/slides/_rels/slide') && relPath.endsWith('.xml.rels'))
      genSlideRels.push(relPath)
    else if (relPath.startsWith('ppt/media/') && !relPath.endsWith('/'))
      genMedia.push(relPath)
    else if (relPath.startsWith('ppt/notesSlides/notesSlide') && relPath.endsWith('.xml'))
      genNotes.push(relPath)
    else if (relPath.startsWith('ppt/notesSlides/_rels/notesSlide') && relPath.endsWith('.xml.rels'))
      genNoteRels.push(relPath)
  })

  // Copy slides, slide rels, media, notes, note rels
  for (const f of [...genSlides, ...genSlideRels, ...genMedia, ...genNotes, ...genNoteRels]) {
    let data = await genZip.file(f).async('nodebuffer')
    // Fix empty <a:ln></a:ln> → <a:ln><a:noFill/></a:ln> in XML files
    if (f.endsWith('.xml')) {
      let text = data.toString('utf-8')
      text = text.replace(/<a:ln><\/a:ln>/g, '<a:ln><a:noFill/></a:ln>')
      data = Buffer.from(text, 'utf-8')
    }
    finalZip.file(f, data)
  }

  const slideCount = genSlides.length

  // 3. Rebuild presentation.xml — take scaffold's version, replace sldIdLst
  let presXml = (await scaffoldZip.file('ppt/presentation.xml').async('string'))
  // Remove existing sldIdLst content
  presXml = presXml.replace(/<p:sldIdLst>[\s\S]*?<\/p:sldIdLst>/, () => {
    let entries = ''
    for (let i = 0; i < slideCount; i++) {
      entries += `<p:sldId id="${256 + i}" r:id="rId${7 + i}"/>`
    }
    return `<p:sldIdLst>${entries}</p:sldIdLst>`
  })
  finalZip.file('ppt/presentation.xml', presXml)

  // 4. Rebuild presentation.xml.rels — scaffold's non-slide rels + slide rels
  let presRels = (await scaffoldZip.file('ppt/_rels/presentation.xml.rels').async('string'))
  // Remove existing slide relationships
  presRels = presRels.replace(/<Relationship[^>]*Target="slides\/[^"]*"[^>]*\/>/g, '')
  // Insert new slide rels before closing tag
  let slideRelEntries = ''
  for (let i = 0; i < slideCount; i++) {
    slideRelEntries += `<Relationship Id="rId${7 + i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i + 1}.xml"/>`
  }
  presRels = presRels.replace('</Relationships>', slideRelEntries + '</Relationships>')
  finalZip.file('ppt/_rels/presentation.xml.rels', presRels)

  // 5. Rebuild [Content_Types].xml — scaffold's version + slide/notes overrides
  let ctXml = (await scaffoldZip.file('[Content_Types].xml').async('string'))
  // Remove existing slide/notes overrides
  ctXml = ctXml.replace(/<Override[^>]*PartName="\/ppt\/slides\/[^"]*"[^>]*\/>/g, '')
  ctXml = ctXml.replace(/<Override[^>]*PartName="\/ppt\/notesSlides\/[^"]*"[^>]*\/>/g, '')
  // Add overrides for our slides and notes
  let newOverrides = ''
  for (let i = 1; i <= slideCount; i++) {
    newOverrides += `<Override ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml" PartName="/ppt/slides/slide${i}.xml"/>`
    newOverrides += `<Override ContentType="application/vnd.openxmlformats-officedocument.presentationml.notesSlide+xml" PartName="/ppt/notesSlides/notesSlide${i}.xml"/>`
  }
  // Add image content type if not present
  if (!ctXml.includes('Extension="png"')) {
    newOverrides = `<Default ContentType="image/png" Extension="png"/>` + newOverrides
  }
  ctXml = ctXml.replace('</Types>', newOverrides + '</Types>')
  finalZip.file('[Content_Types].xml', ctXml)

  // 6. Write final file
  const finalBuf = await finalZip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  })
  fs.writeFileSync(outputPath, finalBuf)

  console.log(`  [keynote-fix] Grafted ${slideCount} slides onto Keynote scaffold`)
  console.log(`Exported: ${path.relative(ROOT, outputPath)}`)
} catch (err) {
  console.warn(`  [warn] Keynote post-processing failed: ${err.message}`)
  console.log(`Exported (unpatched): ${path.relative(ROOT, outputPath)}`)
}
