/**
 * ColoredTextBoxes — 2×2 grid of accent square chips.
 * Figma node: 51:372  (4-colored-text-boxes)
 *
 * Props:
 *   color       string    — CSS color value applied to all 4 boxes
 *                           default: accent token 2 from DESIGN.md
 *   colors      string[4] — individual colors per box (overrides `color`)
 *   className   string    — overrides dimensions/positioning
 *
 * Colors from CSS variables in `src/index.css`.
 */
const ACCENT_2 = "var(--theme-accent-2)"

export default function ColoredTextBoxes({
  color = ACCENT_2,
  colors = null,
  className,
}) {
  const boxInsets = [
    "0_57.56%_65.31%_0",      // top-left
    "0_0_65.31%_57.56%",      // top-right
    "65.31%_57.56%_0_0",      // bottom-left
    "65.31%_0_0_57.56%",      // bottom-right
  ]

  return (
    <div
      className={className || "relative min-h-0 h-full w-full min-w-0"}
      data-name="4-colored-text-boxes"
      data-node-id="51:372"
    >
      {boxInsets.map((inset, i) => (
        <div
          key={i}
          className="absolute rounded-[5px] shadow-card"
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
