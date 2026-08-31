import path from 'node:path'
import fs from 'node:fs'
import sharp from 'sharp'

/** Target resolution for embedded slide images (inches → pixels). */
export const PPTX_RASTER_DPI = 192
const MIN_PX = 64
const MAX_PX = 2048

export function isSvgSource(src) {
  return path.extname(String(src ?? '')).toLowerCase() === '.svg'
}

export function targetPixelSize(wIn, hIn, dpi = PPTX_RASTER_DPI) {
  const clamp = (n) => Math.max(MIN_PX, Math.min(MAX_PX, n))
  return {
    w: clamp(Math.round(Math.max(wIn, 0.01) * dpi)),
    h: clamp(Math.round(Math.max(hIn, 0.01) * dpi)),
  }
}

/** Per-export cache: same SVG at the same display size is rasterized once. */
export function createRasterCache() {
  return new Map()
}

/**
 * Resolve an image node for PptxGenJS.
 * SVG sources are rasterized to PNG base64; raster formats keep their file path.
 *
 * @returns {Promise<{ path?: string, data?: string }>}
 */
export async function resolveImagePayload({ src, w, h }, absPath, cache) {
  if (!isSvgSource(src)) {
    return { path: absPath }
  }

  const { w: widthPx, h: heightPx } = targetPixelSize(w, h)
  const cacheKey = `${absPath}:${widthPx}x${heightPx}`
  if (cache.has(cacheKey)) {
    return { data: cache.get(cacheKey) }
  }

  if (!fs.existsSync(absPath)) {
    throw new Error(`SVG asset not found: ${src} (${absPath})`)
  }

  const density = Math.max(PPTX_RASTER_DPI, Math.ceil(Math.max(widthPx, heightPx) / 4))
  const pngBuffer = await sharp(absPath, { density })
    .resize(widthPx, heightPx, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer()

  const data = `image/png;base64,${pngBuffer.toString('base64')}`
  cache.set(cacheKey, data)
  return { data }
}
