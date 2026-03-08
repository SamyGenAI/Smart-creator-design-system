/**
 * SquareGridTexture — background-image texture overlay.
 * Uses the local PNG asset which renders correctly when pushed to Figma.
 *
 * Place as the first child inside the canvas div, before all content.
 */
export default function SquareGridTexture({
  width = 1080,
  height = 1350,
  opacity = 0.6,
}) {
  return (
    <div
      aria-hidden="true"
      data-name="Texture-square-grid"
      data-node-id="54:895"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${width}px`,
        height: `${height}px`,
        pointerEvents: 'none',
        opacity,
        backgroundImage: 'url(/assets/textures/light-squares.png)',
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
      }}
    />
  )
}
