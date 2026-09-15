/**
 * NewsletterThumbnailCanvas — canonical 420×300 newsletter-thumbnail root.
 *
 * Mirrors InfographicCanvas (canvas fill + a registry texture) at thumbnail
 * scale. Fixed px, non-responsive. Figma: Newsletter-thumbnail 27:123.
 *
 * Structure inside the canvas is always:
 *   NewsletterThumbnailTitle   — flex-none, top block
 *   visual area                — flex-1, empty | image | design
 *
 * Texture pitch scales down automatically from the canvas width, so a grid
 * authored for a 1080px infographic stays fine-grained here instead of showing
 * a handful of huge squares.
 */
import BackgroundTexture from '../shared/textures/BackgroundTexture.jsx'

export const THUMBNAIL_WIDTH = 420
export const THUMBNAIL_HEIGHT = 300

export default function NewsletterThumbnailCanvas({
  children,
  width = THUMBNAIL_WIDTH,
  height = THUMBNAIL_HEIGHT,
  textureId = null,
  textureOpacity = null,
  className = '',
  ...rootProps
}) {
  return (
    <div
      className={`newsletter-thumbnail-canvas bg-bg-canvas relative flex flex-col overflow-hidden ${className}`.trim()}
      style={{ width: `${width}px`, height: `${height}px` }}
      data-name="Newsletter-thumbnail"
      data-node-id="27:123"
      {...rootProps}
    >
      <BackgroundTexture
        width={width}
        height={height}
        textureId={textureId}
        opacity={textureOpacity}
      />
      {children}
    </div>
  )
}
