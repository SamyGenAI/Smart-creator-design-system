/**
 * NewsletterAssetCanvas — root for a code-designed newsletter asset (an image
 * that sits inside the newsletter text: no title block, no footer).
 *
 * Same canvas fill + registry texture as the other newsletter formats, but the
 * size is set per asset (the content decides the shape). Pinned to the house
 * square grid ('atelier-grid') like the screenshots, so a designed asset and a
 * framed screenshot read as one family; pass `textureId={null}` to follow the
 * preview toolbar. The grid is drawn lighter than the registry default (0.5
 * vs 0.7) so it stays behind the figure. Children are centred on both axes.
 *
 * LOCAL-ONLY: this folder is gitignored.
 */
import BackgroundTexture from '../shared/textures/BackgroundTexture.jsx'

export default function NewsletterAssetCanvas({
  children,
  width,
  height,
  textureId = 'atelier-grid',
  textureOpacity = 0.5,
  className = '',
  style,
  ...rootProps
}) {
  return (
    <div
      className={`newsletter-asset-canvas bg-bg-canvas relative overflow-hidden flex flex-col items-center justify-center ${className}`.trim()}
      style={{ ...style, width: `${width}px`, height: `${height}px` }}
      data-name="Newsletter-asset"
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
