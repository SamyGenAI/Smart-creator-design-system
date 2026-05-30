/**
 * Slide deck pipeline (automatic on pnpm dev):
 *   1. Build .pptx from design/pptx-slides/[Name]Slides.mjs via slide-engine.pptx.mjs
 *   2. Preview JPGs in public/screenshots/powerpoint/[slug]/
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { MODES } from '../src/modes.js'
import { renderDeckToPptx } from '../design/pptx-slides/slide-engine.pptx.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const ROOT = path.resolve(__dirname, '..')

const PPTX_DIR = path.join(ROOT, 'design', 'pptx-slides')
const PPTX_OUTPUT_DIR = path.join(PPTX_DIR, 'output')
const PREVIEW_ROOT = path.join(ROOT, 'public', 'screenshots', 'powerpoint')
const ENGINE_FILES = [
  path.join(PPTX_DIR, 'slide-engine.mjs'),
  path.join(PPTX_DIR, 'slide-engine.pptx.mjs'),
]

function statMtime(filePath) {
  try {
    return fs.statSync(filePath).mtimeMs
  } catch {
    return 0
  }
}

export function getPptxModes() {
  return Object.entries(MODES).filter(([, meta]) => meta.type === 'pptx')
}

export function pathsForMode(modeKey, meta) {
  const deckPath = path.join(PPTX_DIR, meta.deckFile)
  const pptxPath = path.join(PPTX_OUTPUT_DIR, meta.pptxFile)
  const photosDir = path.join(PREVIEW_ROOT, meta.previewSlug)
  return { deckPath, pptxPath, photosDir }
}

async function buildPptx(deckPath, pptxPath) {
  if (!fs.existsSync(deckPath)) {
    throw new Error(`Deck file not found: ${deckPath}`)
  }
  const deck = await import(pathToFileURL(deckPath).href)
  await renderDeckToPptx(deck.default ?? deck, pptxPath)
}

export function listSlidePhotoUrls(previewSlug) {
  const photosDir = path.join(PREVIEW_ROOT, previewSlug)
  if (!fs.existsSync(photosDir)) return []
  return fs
    .readdirSync(photosDir)
    .filter((f) => /^slide-\d+\.(jpg|jpeg|png)$/i.test(f))
    .sort()
    .map((f) => `/screenshots/powerpoint/${previewSlug}/${f}`)
}

function needsPptxBuild(deckPath, pptxPath) {
  if (!fs.existsSync(pptxPath)) return true
  const pptxMtime = statMtime(pptxPath)
  if (statMtime(deckPath) > pptxMtime) return true
  for (const f of ENGINE_FILES) {
    if (statMtime(f) > pptxMtime) return true
  }
  return false
}

function photosAreStale(pptxPath, previewSlug) {
  if (!fs.existsSync(pptxPath)) return false
  const pptxMtime = statMtime(pptxPath)
  const urls = listSlidePhotoUrls(previewSlug)
  if (urls.length === 0) return false
  const newest = urls.reduce((max, url) => {
    const file = path.join(ROOT, 'public', url.replace(/^\//, ''))
    return Math.max(max, statMtime(file))
  }, 0)
  return pptxMtime > newest
}

export async function ensurePptxDeck(modeKey) {
  const meta = MODES[modeKey]
  if (!meta || meta.type !== 'pptx') {
    throw new Error(`Unknown slide deck mode: ${modeKey}`)
  }

  const { deckPath, pptxPath } = pathsForMode(modeKey, meta)

  if (needsPptxBuild(deckPath, pptxPath)) {
    await buildPptx(deckPath, pptxPath)
  }

  const slideUrls = listSlidePhotoUrls(meta.previewSlug)

  if (slideUrls.length === 0) {
    console.warn(`[slides] ${meta.label}: no slide photos yet in public/screenshots/powerpoint/${meta.previewSlug}/`)
  } else if (photosAreStale(pptxPath, meta.previewSlug)) {
    console.warn(`[slides] ${meta.label}: .pptx is newer than preview photos — re-run pnpm screenshot ${modeKey} --preview`)
  }

  return { slideUrls, previewReady: slideUrls.length > 0, pptxPath }
}

export async function ensureAllPptxDecks() {
  for (const [key, meta] of getPptxModes()) {
    try {
      await ensurePptxDeck(key)
      const n = listSlidePhotoUrls(meta.previewSlug).length
      console.log(`[slides] ${meta.label}: ${n} photo(s) in public/screenshots/powerpoint/${meta.previewSlug}/`)
    } catch (err) {
      console.warn(`[slides] ${key}: ${err.message}`)
    }
  }
}

export function readPptxFile(modeKey) {
  const meta = MODES[modeKey]
  if (!meta || meta.type !== 'pptx') throw new Error(`Unknown slide deck mode: ${modeKey}`)
  const { pptxPath } = pathsForMode(modeKey, meta)
  if (!fs.existsSync(pptxPath)) {
    throw new Error('PowerPoint file not ready. Close and run pnpm dev again.')
  }
  return pptxPath
}

const isMain =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))
if (isMain) {
  ensureAllPptxDecks().catch((err) => {
    console.error(err.message)
    process.exit(1)
  })
}
