import pptxgen from 'pptxgenjs'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parseDesignMd } from '../../scripts/parse-design-md.mjs'
import { buildScenes, pt } from './slide-engine.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')

function getTok() {
  const { resolved } = parseDesignMd(path.join(ROOT, 'DESIGN.md'))
  const hex = (s) => String(s ?? '000000').replace('#', '').toUpperCase()
  const C = resolved.colors
  return {
    hex: {
      bg: hex(C.bg.canvas),
      surface: hex(C.bg.surface),
      brand: hex(C.bg.brand),
      accent1: hex(C.bg.accent['1']),
      accent2: hex(C.bg.accent['2']),
      accent3: hex(C.bg.accent['3']),
      accent4: hex(C.bg.accent['4']),
      accent5: hex(C.bg.accent['5']),
      text: hex(C.text.primary),
      textSec: hex(C.text.secondary),
      textMute: hex(C.text.muted),
      onBrand: hex(C.text.onBrand),
    },
    font: String(
      Object.values(resolved.typography ?? {}).find((s) => s?.fontFamily)?.fontFamily ?? 'Calibri',
    ),
  }
}

function assetPath(src) {
  if (src.startsWith('public/')) return path.join(ROOT, src)
  if (src.startsWith('assets/')) return path.join(ROOT, src)
  return path.join(ROOT, src)
}

function makeShadow() {
  return { type: 'outer', blur: 12, offset: 3, angle: 135, color: '000000', opacity: 0.22 }
}

function noLine() {
  return { width: 0, color: 'FFFFFF', transparency: 100 }
}

function renderNode(pres, slide, node, TOK, FONT) {
  switch (node.type) {
    case 'rect': {
      const shape = node.radius > 0 ? pres.shapes.ROUNDED_RECTANGLE : pres.shapes.RECTANGLE
      const opts = {
        x: node.x,
        y: node.y,
        w: node.w,
        h: node.h,
        fill: { color: TOK[node.fill], transparency: node.transparency ?? 0 },
        line: noLine(),
      }
      if (node.radius > 0) opts.rectRadius = node.radius
      if (node.shadow) opts.shadow = makeShadow()
      slide.addShape(shape, opts)
      break
    }
    case 'oval':
      slide.addShape(pres.shapes.OVAL, {
        x: node.x,
        y: node.y,
        w: node.w,
        h: node.h,
        fill: { color: TOK[node.fill], transparency: node.transparency ?? 0 },
        line: noLine(),
      })
      break
    case 'text':
      slide.addText(node.content, {
        x: node.x,
        y: node.y,
        w: node.w,
        h: node.h,
        fontSize: pt(node.fontPx),
        fontFace: FONT,
        color: TOK[node.fill],
        bold: node.bold,
        italic: node.italic,
        align: node.align,
        valign: node.valign,
        margin: node.margin,
      })
      break
    case 'image': {
      const opts = {
        path: assetPath(node.src),
        x: node.x,
        y: node.y,
        w: node.w,
        h: node.h,
      }
      if (node.shadow) opts.shadow = makeShadow()
      slide.addImage(opts)
      break
    }
    default:
      break
  }
}

/** Build .pptx from a deck module ({ meta, slides }). */
export async function renderDeckToPptx(deck, outFile) {
  const { hex: TOK, font: FONT } = getTok()
  const pres = new pptxgen()
  pres.layout = deck.meta?.layout ?? 'LAYOUT_16x9'
  pres.author = deck.meta?.author ?? ''
  pres.title = deck.meta?.title ?? 'Slide Deck'

  for (const scene of buildScenes(deck)) {
    const s = pres.addSlide()
    s.background = { color: TOK[scene.background] ?? TOK.bg }
    for (const node of scene.children) renderNode(pres, s, node, TOK, FONT)
  }

  const outDir = path.dirname(outFile)
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
  await pres.writeFile({ fileName: outFile })
  return outFile
}

export const ENGINE_ROOT = ROOT
