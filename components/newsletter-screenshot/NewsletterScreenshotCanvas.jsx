/**
 * NewsletterScreenshotCanvas — root for a newsletter screenshot.
 *
 * Sibling of NewsletterThumbnailCanvas: same canvas fill + registry texture,
 * but sized by the caller from the screenshot (no fixed format). Pinned to the
 * house square grid ('atelier-grid') by default, since that grid is part of
 * this asset's look; pass `textureId={null}` to follow the preview toolbar.
 * Children are centred on both axes.
 *
 * LOCAL-ONLY: this folder is gitignored.
 */
import BackgroundTexture from '../shared/textures/BackgroundTexture.jsx'

export default function NewsletterScreenshotCanvas({
  children,
  width,
  height,
  textureId = 'atelier-grid',
  textureOpacity = null,
  className = '',
  ...rootProps
}) {
  return (
    <div
      className={`newsletter-screenshot-canvas bg-bg-canvas relative overflow-hidden flex items-center justify-center ${className}`.trim()}
      style={{ width: `${width}px`, height: `${height}px` }}
      data-name="Newsletter-screenshot"
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
