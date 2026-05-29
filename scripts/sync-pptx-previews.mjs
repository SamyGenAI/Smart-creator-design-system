/**
 * Slide deck pipeline (automatic on pnpm dev):
 *   1. Build .pptx from design/pptx-slides/[Name]Slides.mjs
 *   2. Export slide photos → public/screenshots/powerpoint/[slug]/slide-01.jpg …
 *   3. Browser slideshow reads those photos (components/PptxSlideShow.jsx)
 *
 * Photo export uses skills/pptx/scripts/thumbnail.py (--slides-dir).
 */

import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import JSZip from 'jszip'
import sharp from 'sharp'
import { MODES } from '../src/modes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const ROOT = path.resolve(__dirname, '..')

const PPTX_SCRIPTS_DIR = path.join(ROOT, 'skills', 'pptx', 'scripts')
const PPTX_OUTPUT_DIR = path.join(ROOT, 'design', 'pptx-slides', 'output')
const PREVIEW_ROOT = path.join(ROOT, 'public', 'screenshots', 'powerpoint')

function run(cmd, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: false,
      ...options,
    })
    let stdout = ''
    let stderr = ''
    child.stdout?.on('data', (d) => { stdout += d })
    child.stderr?.on('data', (d) => { stderr += d })
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) resolve({ stdout, stderr })
      else reject(new Error(stderr.trim() || stdout.trim() || `${cmd} exited ${code}`))
    })
  })
}

function pythonExecutable() {
  return process.platform === 'win32' ? 'python' : 'python3'
}

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
  const scriptPath = path.join(ROOT, 'design', 'pptx-slides', meta.deckScript)
  const pptxPath = path.join(PPTX_OUTPUT_DIR, meta.pptxFile)
  const photosDir = path.join(PREVIEW_ROOT, meta.previewSlug)
  const qcGridPath = path.join(PPTX_OUTPUT_DIR, `${path.parse(meta.pptxFile).name}-qa.jpg`)
  return { scriptPath, pptxPath, photosDir, qcGridPath }
}

async function buildPptx(scriptPath, pptxPath) {
  if (!fs.existsSync(scriptPath)) {
    throw new Error(`Deck script not found: ${scriptPath}`)
  }
  await run(process.execPath, [scriptPath], { cwd: ROOT })
  if (!fs.existsSync(pptxPath)) {
    throw new Error(`Expected .pptx after build: ${pptxPath}`)
  }
}

/** Export slide-NN.jpg into the deck photo folder (thumbnail.py). */
export async function generateSlidePhotos(pptxPath, photosDir) {
  fs.mkdirSync(photosDir, { recursive: true })
  await run(
    pythonExecutable(),
    ['thumbnail.py', pptxPath, '--slides-dir', photosDir, '--dpi', '150'],
    { cwd: PPTX_SCRIPTS_DIR },
  )
}

async function countSlidesInPptx(pptxPath) {
  const buf = fs.readFileSync(pptxPath)
  const zip = await JSZip.loadAsync(buf)
  const pres = await zip.file('ppt/presentation.xml')?.async('string')
  if (!pres) return 1
  const matches = pres.match(/<p:sldId\b/g)
  return matches?.length || 1
}

/** Last resort so the slideshow has something to show while photos are regenerating. */
async function writeTemporarySlidePhotos(photosDir, slideCount, deckLabel) {
  fs.mkdirSync(photosDir, { recursive: true })
  const w = 1280
  const h = 720
  for (let i = 1; i <= slideCount; i += 1) {
    const svg = `
      <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#fffceb"/>
        <rect x="0" y="0" width="100%" height="56" fill="#092c69"/>
        <text x="48" y="38" font-family="Montserrat, Arial, sans-serif" font-size="22" font-weight="600" fill="#ffffff">${deckLabel}</text>
        <text x="48" y="360" font-family="Montserrat, Arial, sans-serif" font-size="42" font-weight="700" fill="#092c69">Slide ${i}</text>
        <text x="48" y="420" font-family="Montserrat, Arial, sans-serif" font-size="18" fill="#717188">Slide ${i} of ${slideCount}</text>
      </svg>`
    const out = path.join(photosDir, `slide-${String(i).padStart(2, '0')}.jpg`)
    await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toFile(out)
  }
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

function needsPptxBuild(scriptPath, pptxPath) {
  if (!fs.existsSync(pptxPath)) return true
  return statMtime(scriptPath) > statMtime(pptxPath)
}

function needsPhotoRefresh(pptxPath, previewSlug) {
  if (!fs.existsSync(pptxPath)) return false
  const pptxMtime = statMtime(pptxPath)
  const urls = listSlidePhotoUrls(previewSlug)
  if (urls.length === 0) return true
  const newest = urls.reduce((max, url) => {
    const file = path.join(ROOT, 'public', url.replace(/^\//, ''))
    return Math.max(max, statMtime(file))
  }, 0)
  return pptxMtime > newest
}

/**
 * Ensure .pptx exists and slide photos in public/screenshots/powerpoint/[slug]/ are current.
 */
export async function ensurePptxDeck(modeKey) {
  const meta = MODES[modeKey]
  if (!meta || meta.type !== 'pptx') {
    throw new Error(`Unknown slide deck mode: ${modeKey}`)
  }

  const { scriptPath, pptxPath, photosDir } = pathsForMode(modeKey, meta)

  if (needsPptxBuild(scriptPath, pptxPath)) {
    await buildPptx(scriptPath, pptxPath)
  }

  if (needsPhotoRefresh(pptxPath, meta.previewSlug)) {
    try {
      await generateSlidePhotos(pptxPath, photosDir)
    } catch (err) {
      console.warn(`[slides] Photo export for ${modeKey}:`, err.message)
      const existing = listSlidePhotoUrls(meta.previewSlug)
      if (existing.length === 0) {
        const count = await countSlidesInPptx(pptxPath)
        await writeTemporarySlidePhotos(photosDir, count, meta.label)
      }
    }
  }

  const slideUrls = listSlidePhotoUrls(meta.previewSlug)
  return {
    slideUrls,
    previewReady: slideUrls.length > 0,
    pptxPath,
  }
}

/** QA contact sheet for slide-agent (thumbnail.py grid). */
export async function buildQaGrid(modeKey) {
  const meta = MODES[modeKey]
  if (!meta || meta.type !== 'pptx') return null
  const { pptxPath, qcGridPath } = pathsForMode(modeKey, meta)
  await ensurePptxDeck(modeKey)
  const qcPrefix = qcGridPath.replace(/\.jpg$/, '')
  await run(
    pythonExecutable(),
    ['thumbnail.py', pptxPath, qcPrefix, '--cols', '3'],
    { cwd: PPTX_SCRIPTS_DIR },
  )
  return fs.existsSync(qcGridPath) ? qcGridPath : `${qcPrefix}.jpg`
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
