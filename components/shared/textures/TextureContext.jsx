/**
 * TextureContext — carries the toolbar's texture choice down to every canvas.
 *
 * Canvases read it through `BackgroundTexture`, so no design file has to thread
 * a prop. Outside a provider the default selection applies, which keeps design
 * files renderable on their own (Figma push, unit rendering, the export page
 * before the provider mounts).
 *
 * The selection is read from, in order: an explicit provider value → the
 * `texture` / `textureOpacity` URL params → localStorage → the registry
 * default. The URL leg is what makes PNG/PDF export match the preview: the
 * export server loads `/?mode=…&export=1&texture=…` in a headless browser.
 */
import { createContext, useCallback, useContext, useMemo } from 'react'
import { DEFAULT_TEXTURE_ID, getTexture, TEXTURE_IDS } from './textureRegistry.js'

export const TEXTURE_STORAGE_KEY = 'scds:texture'
export const TEXTURE_OPACITY_STORAGE_KEY = 'scds:textureOpacity'

const TextureContext = createContext(null)

function isValidId(id) {
  return typeof id === 'string' && TEXTURE_IDS.includes(id)
}

/** Read the initial texture id from URL → localStorage → registry default. */
export function readInitialTextureId() {
  if (typeof window === 'undefined') return DEFAULT_TEXTURE_ID
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('texture')
    if (isValidId(fromUrl)) return fromUrl
  } catch {
    /* no URL access — fall through */
  }
  try {
    const stored = window.localStorage.getItem(TEXTURE_STORAGE_KEY)
    if (isValidId(stored)) return stored
  } catch {
    /* storage unavailable — fall through */
  }
  return DEFAULT_TEXTURE_ID
}

/**
 * Per-texture opacity overrides, as a `{ [id]: number }` map.
 *
 * Kept per texture because the pleasant strength of Silk Grain (0.4) and of
 * Salon Broad (0.8) are nothing alike — one shared slider would make switching
 * textures feel broken.
 */
export function readInitialTextureOpacity() {
  if (typeof window === 'undefined') return {}
  try {
    const fromUrl = new URLSearchParams(window.location.search)
    const id = fromUrl.get('texture')
    const raw = fromUrl.get('textureOpacity')
    if (isValidId(id) && raw != null && raw !== '') {
      const value = Number(raw)
      if (Number.isFinite(value)) return { [id]: Math.min(1, Math.max(0, value)) }
    }
  } catch {
    /* no URL access — fall through */
  }
  try {
    const stored = JSON.parse(window.localStorage.getItem(TEXTURE_OPACITY_STORAGE_KEY) || '{}')
    if (stored && typeof stored === 'object') return stored
  } catch {
    /* storage unavailable or corrupt — start clean */
  }
  return {}
}

export function TextureProvider({ textureId, opacityById = {}, children }) {
  const value = useMemo(
    () => ({
      textureId: isValidId(textureId) ? textureId : DEFAULT_TEXTURE_ID,
      opacityById,
    }),
    [textureId, opacityById]
  )
  return <TextureContext.Provider value={value}>{children}</TextureContext.Provider>
}

/**
 * The active selection, plus an `opacityFor(id)` lookup that returns the user's
 * override for a texture or `null` to mean "use the texture's own default".
 */
export function useTextureSelection() {
  const ctx = useContext(TextureContext)
  const textureId = ctx?.textureId ?? readInitialTextureId()
  const opacityById = ctx?.opacityById ?? {}

  const opacityFor = useCallback(
    (id) => {
      const value = opacityById[id]
      return typeof value === 'number' && Number.isFinite(value) ? value : null
    },
    [opacityById]
  )

  return { textureId, texture: getTexture(textureId), opacityFor }
}
