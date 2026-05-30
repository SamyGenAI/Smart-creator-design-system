/**
 * Slide engine — shared by browser preview and .pptx export.
 * Deck files export { meta, slides } only. All layout geometry lives here.
 */

export const CANVAS = { wPx: 1280, hPx: 720, wIn: 10, hIn: 5.625 }
export const xPx = (inches) => (inches / CANVAS.wIn) * CANVAS.wPx
export const yPx = (inches) => (inches / CANVAS.hIn) * CANVAS.hPx
export const wPx = (inches) => (inches / CANVAS.wIn) * CANVAS.wPx
export const hPx = (inches) => (inches / CANVAS.hIn) * CANVAS.hPx
export const pt = (px) => Math.round(px * 0.5625)

export const TOK_CSS = {
  bg: 'var(--color\\/bg\\/canvas)',
  surface: 'var(--color\\/bg\\/surface)',
  brand: 'var(--color\\/bg\\/brand)',
  accent1: 'var(--color\\/bg\\/accent\\/1)',
  accent2: 'var(--color\\/bg\\/accent\\/2)',
  accent3: 'var(--color\\/bg\\/accent\\/3)',
  accent4: 'var(--color\\/bg\\/accent\\/4)',
  accent5: 'var(--color\\/bg\\/accent\\/5)',
  text: 'var(--color\\/text\\/primary)',
  textSec: 'var(--text\\/secondary)',
  textMute: 'var(--theme-color-text-muted)',
  onBrand: 'var(--text\\/invert)',
}

export const CARD_SHADOW_CSS = '0 12px 40px rgba(0,0,0,0.22)'

export function tokCss(token) {
  return TOK_CSS[token] ?? TOK_CSS.text
}

function slide(background, children) {
  return { type: 'slide', background, children: children.flat() }
}

function rect({ x, y, w, h, fill, transparency, radius = 0, shadow = false }) {
  return { type: 'rect', x, y, w, h, fill, transparency, radius, shadow }
}

function oval({ x, y, w, h, fill, transparency = 0 }) {
  return { type: 'oval', x, y, w, h, fill, transparency }
}

function textNode(opts) {
  return { type: 'text', fill: 'text', align: 'left', valign: 'top', margin: 0, bold: false, italic: false, ...opts }
}

function imageNode({ x, y, w, h, src, shadow = false }) {
  return { type: 'image', x, y, w, h, src, shadow }
}

const LAYOUTS = {
  'bookend.hero': (p) => {
    return slide('bg', [
      rect({ x: 0.3, y: 0.5, w: 4.2, h: 4.3, fill: 'accent1', transparency: 88, radius: 0.25 }),
      rect({ x: 5.5, y: 0.5, w: 4.2, h: 4.3, fill: 'accent2', transparency: 88, radius: 0.25 }),
      imageNode({ x: 0.5, y: 0.6, w: 3.8, h: 3.8, src: p.leftImage ?? 'assets/illustrations/notion-style/oc-on-the-laptop.svg' }),
      rect({ x: 4.35, y: 2.15, w: 1.3, h: 0.65, fill: 'brand', radius: 0.1, shadow: true }),
      textNode({ x: 4.35, y: 2.15, w: 1.3, h: 0.65, content: '→', fontPx: 50, fill: 'onBrand', align: 'center', valign: 'middle', margin: 0 }),
      imageNode({ x: 5.7, y: 0.6, w: 3.8, h: 3.8, src: p.rightImage ?? 'assets/illustrations/notion-style/notion-ai-agent.svg' }),
      textNode({ x: 1.2, y: 4.55, w: 7.6, h: 0.65, content: p.title, fontPx: 74, fill: 'brand', bold: true, align: 'center', valign: 'middle' }),
      textNode({ x: 1.2, y: 5.1, w: 7.6, h: 0.3, content: p.subtitle, fontPx: 32, fill: 'textSec', italic: true, align: 'center', valign: 'middle' }),
      rect({ x: 0, y: 5.4, w: 10, h: 0.225, fill: 'accent1' }),
      textNode({ x: 0.3, y: 5.4, w: 9.4, h: 0.225, content: p.author, fontPx: 18, fill: 'brand', bold: true, valign: 'middle', margin: 0 }),
    ])
  },

  'bookend.chapter-divider': (p) => {
    const cardX = 2.25
    const cardY = 0.6
    const cardW = 5.5
    const cardH = 4.4
    const badgeSize = 0.9
    const badgeX = cardX + (cardW - badgeSize) / 2
    const badgeY = cardY + 0.35
    const pillW = 1.0
    const pillX = cardX + (cardW - pillW) / 2
    const pillY = badgeY + 1.05
    const orb = p.orbAccent ?? 'accent1'
    const badge = p.badgeAccent ?? 'accent1'
    const pill = p.pillAccent ?? 'accent3'
    return slide('brand', [
      oval({ x: 2.5, y: 0.8, w: 5.0, h: 4.5, fill: orb, transparency: 90 }),
      rect({ x: cardX, y: cardY, w: cardW, h: cardH, fill: 'surface', radius: 0.25, shadow: true }),
      rect({ x: badgeX, y: badgeY, w: badgeSize, h: badgeSize, fill: badge, radius: 0.15, shadow: true }),
      imageNode({ x: badgeX + 0.1, y: badgeY + 0.1, w: 0.7, h: 0.7, src: p.icon ?? 'assets/icons/design/layers-stacked-1--Streamline-Freehand.svg' }),
      rect({ x: pillX, y: pillY, w: pillW, h: 0.26, fill: pill, radius: 0.1 }),
      textNode({ x: pillX, y: pillY, w: pillW, h: 0.26, content: p.partLabel, fontPx: 18, fill: 'brand', bold: true, align: 'center', valign: 'middle', margin: 0 }),
      textNode({ x: cardX + 0.3, y: pillY + 0.38, w: cardW - 0.6, h: 1.6, content: p.title, fontPx: 46, fill: 'brand', bold: true, align: 'center', valign: 'top' }),
    ])
  },

  'custom.ai-slop-showcase': (p) => {
    const frameW = 4.3
    const frameH = 3.4
    const frameY = 0.72
    const header = p.header ?? "You really don't want that for your brand"
    const caption = p.caption ?? 'Generic AI output'
    const left = p.leftImage ?? 'public/screenshots/powerpoint/YT - AI Design system/slide-02-01.png'
    const right = p.rightImage ?? 'public/screenshots/powerpoint/YT - AI Design system/slide-02-02.png'
    return slide('bg', [
      rect({ x: 0, y: 0, w: 10, h: 0.525, fill: 'brand' }),
      imageNode({ x: 0.18, y: 0.07, w: 0.38, h: 0.38, src: 'assets/icons/business/alerts-warning-triangle--Streamline-Freehand.svg' }),
      textNode({ x: 0.68, y: 0, w: 9.0, h: 0.525, content: header, fontPx: 36, fill: 'onBrand', bold: true, valign: 'middle', margin: 0 }),
      rect({ x: 0.55, y: frameY, w: frameW, h: frameH, fill: 'surface', shadow: true }),
      imageNode({ x: 0.55, y: frameY, w: frameW, h: frameH, src: left, shadow: true }),
      rect({ x: 0.55, y: frameY, w: frameW, h: frameH, fill: 'accent4', transparency: 75 }),
      rect({ x: 5.15, y: frameY, w: frameW, h: frameH, fill: 'surface', shadow: true }),
      imageNode({ x: 5.15, y: frameY, w: frameW, h: frameH, src: right, shadow: true }),
      rect({ x: 5.15, y: frameY, w: frameW, h: frameH, fill: 'accent4', transparency: 75 }),
      textNode({ x: 0.55, y: frameY + frameH + 0.08, w: frameW, h: 0.28, content: caption, fontPx: 18, fill: 'textMute', italic: true, align: 'center', valign: 'middle' }),
      textNode({ x: 5.15, y: frameY + frameH + 0.08, w: frameW, h: 0.28, content: caption, fontPx: 18, fill: 'textMute', italic: true, align: 'center', valign: 'middle' }),
    ])
  },

  'custom.platform-size-guide': (p) => {
    const title = p.title ?? 'Social Media Asset Size Guide'
    const colHeaders = p.colHeaders ?? ['Carousel', 'Infographic', 'Slides']
    const colAccents = p.colHeaderAccents ?? ['accent1', 'accent3', 'accent5']
    const platforms = p.platforms ?? []
    const colHeaderY = 0.62
    const colHeaderH = 0.46
    const rowStartY = 1.16
    const rowH = 1.36
    const rowGap = 0.1
    const col0X = 0.12
    const col0W = 1.3
    const colStartX = 1.5
    const colW = 2.68
    const colGap = 0.12
    const nodes = [
      rect({ x: 0, y: 0, w: 10, h: 0.525, fill: 'brand' }),
      textNode({ x: 0.4, y: 0, w: 9.2, h: 0.525, content: title, fontPx: 40, fill: 'onBrand', bold: true, valign: 'middle', margin: 0 }),
    ]
    for (let ci = 0; ci < colHeaders.length; ci += 1) {
      const cx = colStartX + ci * (colW + colGap)
      nodes.push(rect({ x: cx, y: colHeaderY, w: colW, h: colHeaderH, fill: colAccents[ci], radius: 0.1 }))
      if (ci === 2) {
        nodes.push(imageNode({ x: cx + 0.15, y: colHeaderY + 0.07, w: 0.32, h: 0.32, src: 'assets/logos/app/powerpoint.png' }))
        nodes.push(imageNode({ x: cx + 0.52, y: colHeaderY + 0.07, w: 0.32, h: 0.32, src: 'assets/logos/app/slides.google.com.png' }))
        nodes.push(textNode({ x: cx + 0.9, y: colHeaderY, w: colW - 0.9, h: colHeaderH, content: colHeaders[ci], fontPx: 25, fill: 'brand', bold: true, align: 'left', valign: 'middle', margin: 0 }))
      } else {
        nodes.push(textNode({ x: cx, y: colHeaderY, w: colW, h: colHeaderH, content: colHeaders[ci], fontPx: 25, fill: 'brand', bold: true, align: 'center', valign: 'middle', margin: 0 }))
      }
    }
    for (let ri = 0; ri < platforms.length; ri += 1) {
      const plat = platforms[ri]
      const rowY = rowStartY + ri * (rowH + rowGap)
      nodes.push(rect({ x: col0X, y: rowY, w: col0W, h: rowH, fill: 'surface', shadow: true }))
      nodes.push(rect({ x: col0X, y: rowY, w: col0W, h: 0.05, fill: plat.accentToken }))
      nodes.push(imageNode({ x: col0X + 0.18, y: rowY + 0.28, w: 0.5, h: 0.5, src: plat.logo }))
      nodes.push(textNode({ x: col0X + 0.05, y: rowY + 0.84, w: col0W - 0.1, h: 0.35, content: plat.name, fontPx: 20, fill: 'brand', bold: true, align: 'center', valign: 'middle' }))
      for (let ci = 0; ci < plat.cells.length; ci += 1) {
        const cell = plat.cells[ci]
        const cx = colStartX + ci * (colW + colGap)
        nodes.push(rect({ x: cx, y: rowY, w: colW, h: rowH, fill: 'surface', shadow: true }))
        nodes.push(rect({ x: cx, y: rowY, w: colW, h: 0.05, fill: plat.accentToken }))
        nodes.push(imageNode({ x: cx + 0.12, y: rowY + 0.12, w: 0.28, h: 0.28, src: plat.logo }))
        nodes.push(textNode({ x: cx + 0.12, y: rowY + 0.45, w: colW - 0.24, h: 0.45, content: cell.dim, fontPx: 23, fill: 'brand', bold: true, valign: 'middle' }))
        nodes.push(textNode({ x: cx + 0.12, y: rowY + 0.92, w: colW - 0.24, h: 0.35, content: cell.note, fontPx: 18, fill: 'textMute', valign: 'top' }))
      }
    }
    return slide('bg', nodes)
  },
}

/** Resolve deck entries to scene graphs (used by preview + export). */
export function buildScenes(deck) {
  return deck.slides.map((entry) => {
    const build = LAYOUTS[entry.layout]
    if (!build) throw new Error(`Unknown layout "${entry.layout}"`)
    return build(entry.props ?? {})
  })
}
