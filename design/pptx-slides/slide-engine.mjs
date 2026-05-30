/**
 * Shared slide engine helpers.
 * Deck-specific layouts live beside each deck and are passed into buildScenes().
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

export function slide(background, children) {
  return { type: 'slide', background, children: children.flat() }
}

export function rect({ x, y, w, h, fill, transparency, radius = 0, shadow = false }) {
  return { type: 'rect', x, y, w, h, fill, transparency, radius, shadow }
}

export function oval({ x, y, w, h, fill, transparency = 0 }) {
  return { type: 'oval', x, y, w, h, fill, transparency }
}

export function textNode(opts) {
  return { type: 'text', fill: 'text', align: 'left', valign: 'top', margin: 0, bold: false, italic: false, ...opts }
}

export function imageNode({ x, y, w, h, src, shadow = false }) {
  return { type: 'image', x, y, w, h, src, shadow }
}

/** Resolve deck entries to scene graphs (used by preview + export). */
export function buildScenes(deck) {
  const layouts = deck.layouts ?? {}
  return deck.slides.map((entry) => {
    const build = layouts[entry.layout]
    if (!build) throw new Error(`Unknown layout "${entry.layout}"`)
    return build(entry.props ?? {})
  })
}
