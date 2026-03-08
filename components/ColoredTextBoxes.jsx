/**
 * ColoredTextBoxes — 2×2 grid of colored square chips.
 * Figma node: 51:372  (4-colored-text-boxes)
 *
 * In Figma all 4 boxes share the same color (--components/card-title/green).
 * Pass different colors per box if needed.
 *
 * Props:
 *   color       string    — CSS color value applied to all 4 boxes
 *                           default: var(--components/card-title/green, #d2ff9a)
 *   colors      string[4] — individual colors per box (overrides `color`)
 *   className   string    — overrides dimensions/positioning
 */
export default function ColoredTextBoxes({
  color = "var(--components\\/card-title\\/green,#d2ff9a)",
  colors = null,
  className,
}) {
  const boxInsets = [
    "0_57.56%_65.31%_0",      // top-left
    "0_0_65.31%_57.56%",      // top-right
    "65.31%_57.56%_0_0",      // bottom-left (note: Figma had bottom-right here, kept as-is)
    "65.31%_0_0_57.56%",      // bottom-right
  ]

  return (
    <div
      className={className || "h-[98px] relative w-[172px]"}
      data-name="4-colored-text-boxes"
      data-node-id="51:372"
    >
      {boxInsets.map((inset, i) => (
        <div
          key={i}
          className="absolute rounded-[5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
          style={{
            inset: inset.split('_').join(' '),
            background: colors?.[i] || color,
          }}
          data-node-id={`51:${365 + (i === 3 ? 4 : i)}`}
        />
      ))}
    </div>
  )
}
