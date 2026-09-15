/**
 * SquareGridTexture — back-compatible alias for `BackgroundTexture`.
 *
 * Textures are now a registry (`components/shared/textures/`) driven by the
 * preview toolbar, so this component no longer owns any drawing of its own. It
 * stays because existing design files and the skills docs import it by name.
 *
 * New code should import `BackgroundTexture` directly.
 *
 * Legacy props are mapped onto the registry:
 *   cellSize       — ignored; pitch now derives from the canvas width, which
 *                    is what the old `cellSize` escape hatch was hand-tuning
 *   backgroundSize — ignored; the PNG sheet path is gone (it was never a
 *                    seamless tile, which is why the vector path existed)
 *   lineColor      — maps to `ink`
 */
import BackgroundTexture from './textures/BackgroundTexture.jsx'

export default function SquareGridTexture({
  width = 1080,
  height = 1350,
  opacity = null,
  textureId = null,
  lineColor = undefined,
  // Accepted and ignored — see the note above.
  cellSize: _cellSize,
  lineWidth: _lineWidth,
  backgroundSize: _backgroundSize,
  ...rest
}) {
  return (
    <BackgroundTexture
      width={width}
      height={height}
      opacity={opacity}
      textureId={textureId}
      {...(lineColor ? { ink: lineColor } : {})}
      {...rest}
    />
  )
}
