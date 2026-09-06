/**
 * NewsletterThumbnailCanvas — canonical 420×300 newsletter-thumbnail root.
 *
 * Mirrors InfographicCanvas (canvas fill + SquareGridTexture) at thumbnail
 * scale. Fixed px, non-responsive. Figma: Newsletter-thumbnail 27:123.
 *
 * Structure inside the canvas is always:
 *   NewsletterThumbnailTitle   — flex-none, top block
 *   visual area                — flex-1, empty | image | design
 */
import SquareGridTexture from '../shared/SquareGridTexture.jsx'

export const THUMBNAIL_WIDTH = 420
export const THUMBNAIL_HEIGHT = 300

/** Texture opacity at thumbnail scale — the grid is dense, so it stays light. */
export const THUMBNAIL_TEXTURE_OPACITY = 0.7

/**
 * Grid cell pitch at thumbnail scale, in px.
 *
 * 20px divides 420×300 exactly (21×15 cells), so every square is identical and
 * no partial cell lands at an edge. Drawn as gradients by SquareGridTexture —
 * the PNG sheet is not a seamless tile and produced visibly uneven squares
 * when scaled down to this canvas.
 */
export const THUMBNAIL_GRID_CELL = 20

export default function NewsletterThumbnailCanvas({
  children,
  width = THUMBNAIL_WIDTH,
  height = THUMBNAIL_HEIGHT,
  textureOpacity = THUMBNAIL_TEXTURE_OPACITY,
  gridCell = THUMBNAIL_GRID_CELL,
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
      <SquareGridTexture
        width={width}
        height={height}
        opacity={textureOpacity}
        cellSize={gridCell}
      />
      {children}
    </div>
  )
}
