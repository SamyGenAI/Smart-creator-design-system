/**
 * NewsletterScreenshotFrame — the screenshot itself, floated on the canvas.
 *
 * Rounded corners + a stack of soft, high-blur shadows (the "Apple product
 * shot" look): a hairline edge, a tight contact shadow, and two wide ambient
 * layers. Every length scales with `unit` so a small and a large screenshot
 * get the same proportions, and the deepest shadow stays inside the canvas
 * padding (10 units).
 *
 * The image is drawn at the exact CSS size it is given — never fitted — so the
 * caller controls the pixel mapping (see NewsletterScreenshot).
 *
 * Props:
 *   src     {string} — local path to the screenshot
 *   width   {number} — CSS px
 *   height  {number} — CSS px
 *   unit    {number} — px per shadow/radius unit (canvas padding / 10)
 *   onReady {fn}     — called once the <img> has loaded
 *
 * LOCAL-ONLY: this folder is gitignored.
 */

// Shadow ink is the text colour mixed down, so it follows the theme instead of
// being a literal black.
const ink = (pct) => `color-mix(in srgb, var(--theme-color-text-primary) ${pct}%, transparent)`

function premiumShadow(u) {
  return [
    `0 0 0 1px ${ink(6)}`,
    `0 ${0.2 * u}px ${0.6 * u}px ${ink(6)}`,
    `0 ${1.8 * u}px ${4 * u}px ${-0.8 * u}px ${ink(14)}`,
    `0 ${3 * u}px ${8 * u}px ${-2 * u}px ${ink(22)}`,
  ].join(', ')
}

export default function NewsletterScreenshotFrame({
  src,
  alt = '',
  width,
  height,
  unit,
  onReady,
}) {
  return (
    <img
      src={src}
      alt={alt}
      onLoad={onReady}
      className="block relative"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${Math.max(6, 1.6 * unit)}px`,
        boxShadow: premiumShadow(unit),
      }}
      data-name="Newsletter-screenshot-frame"
    />
  )
}
