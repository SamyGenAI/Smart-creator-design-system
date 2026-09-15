/**
 * InfographicCanvas — canonical 1080×1350 infographic root.
 * Background and texture match DESIGN.md: canvas color + a registry texture.
 *
 * The texture itself comes from the preview toolbar (see
 * `components/shared/textures/`). Pass `textureId` to pin one texture into a
 * design regardless of the toolbar, or `textureOpacity` to override its
 * strength; leave both unset for the default behaviour.
 */
import BackgroundTexture from '../shared/textures/BackgroundTexture.jsx'

export const INFOGRAPHIC_WIDTH = 1080
export const INFOGRAPHIC_HEIGHT = 1350

export default function InfographicCanvas({
  children,
  className = '',
  textureId = null,
  textureOpacity = null,
  ...rootProps
}) {
  return (
    <div
      className={`infographic-canvas bg-bg-canvas relative flex items-center justify-center overflow-hidden ${className}`.trim()}
      {...rootProps}
    >
      <BackgroundTexture
        width={INFOGRAPHIC_WIDTH}
        height={INFOGRAPHIC_HEIGHT}
        textureId={textureId}
        opacity={textureOpacity}
      />
      {children}
    </div>
  )
}
