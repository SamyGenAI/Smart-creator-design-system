/**
 * PastelShadowBorderCard — tinted card with border and drop shadow.
 * Figma node: 52:382  (pastel-shadow-border-card)
 *
 * Props:
 *   text        string   — text content inside the card
 *   className   string   — overrides dimensions/positioning
 *
 * Colors sourced from DESIGN.md CSS variables. Edit DESIGN.md + run `pnpm tokens:gen`.
 */
const SURFACE_LAYER_1 = "var(--theme-surface-layer-1)"
const BORDER_1 = "var(--theme-border-1)"
const SHADOW_CARD = "var(--theme-shadow-card)"
const COLOR_TEXT_PRIMARY = "var(--theme-color-text-primary)"
const FONT_BODY = "var(--font\\/family\\/body)"

export default function PastelShadowBorderCard({ text = "xxx", className }) {
  return (
    <div
      className={className || "h-[161px] relative w-[381px]"}
      data-name="pastel-shadow-border-card"
      data-node-id="52:382"
    >
      {/* Tinted surface background with border */}
      <div
        className="absolute border border-solid inset-0 rounded-card"
        style={{ backgroundColor: SURFACE_LAYER_1, borderColor: BORDER_1, boxShadow: SHADOW_CARD }}
        data-node-id="52:379"
      />

      {/* Text content */}
      <div
        className="absolute flex flex-col font-medium inset-[31.68%_4.95%_51.82%_4.99%] justify-center leading-[0] text-[16px] tracking-[-0.48px]"
        style={{ color: COLOR_TEXT_PRIMARY, fontFamily: FONT_BODY }}
        data-node-id="66:759"
      >
        <p className="leading-[normal]">{text}</p>
      </div>
    </div>
  )
}
