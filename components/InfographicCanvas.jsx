/**
 * InfographicCanvas — canonical 1080×1350 infographic root.
 * Background and texture match DESIGN.md: canvas color + SquareGridTexture at 5%.
 */
import SquareGridTexture from './SquareGridTexture.jsx'

/** Default texture opacity — infographic spec (slides use SquareGridTexture with higher opacity). */
export const INFOGRAPHIC_TEXTURE_OPACITY = 0.05

export default function InfographicCanvas({
  children,
  className = '',
  textureOpacity = INFOGRAPHIC_TEXTURE_OPACITY,
  ...rootProps
}) {
  return (
    <div
      className={`infographic-canvas bg-bg-canvas relative flex items-center justify-center overflow-hidden ${className}`.trim()}
      {...rootProps}
    >
      <SquareGridTexture opacity={textureOpacity} />
      {children}
    </div>
  )
}
