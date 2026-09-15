/**
 * BackgroundTexture — paints one registry texture across a canvas.
 *
 * Place as the first child inside the canvas div, before all content. The
 * canvas supplies its own size; the texture picks its pitch from that size via
 * `resolveTextureScale`, so the same texture id reads correctly on a 1080×1350
 * infographic and on a 420×300 thumbnail.
 *
 * The active texture comes from `TextureProvider` (driven by the preview
 * toolbar) unless a canvas passes an explicit `textureId`, which always wins —
 * a design file that must ship one specific texture can pin it.
 */
import { getTexture, resolveTextureScale, TEXTURE_INK } from './textureRegistry.js'
import { useTextureSelection } from './TextureContext.jsx'

export default function BackgroundTexture({
  width = 1080,
  height = 1350,
  /** Pin a texture, ignoring the toolbar. Omit to follow the selection. */
  textureId = null,
  /** Override the texture's own default opacity. */
  opacity = null,
  /** Pitch multiplier override — defaults to a size-derived scale. */
  scale = null,
  ink = TEXTURE_INK,
}) {
  const selected = useTextureSelection()
  const texture = getTexture(textureId ?? selected.textureId)
  const resolvedScale = scale ?? resolveTextureScale(width)
  const layers = texture.layers({ scale: resolvedScale, ink })

  if (!layers) return null

  const resolvedOpacity =
    opacity ?? selected.opacityFor(texture.id) ?? texture.defaultOpacity

  if (!resolvedOpacity) return null

  return (
    <div
      aria-hidden="true"
      data-name="Texture-background"
      data-node-id="54:895"
      data-texture={texture.id}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${width}px`,
        height: `${height}px`,
        pointerEvents: 'none',
        opacity: resolvedOpacity,
        ...layers,
      }}
    />
  )
}
