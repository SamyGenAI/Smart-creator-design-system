/**
 * TextBox — small highlighted text box (colored pill/badge).
 * Figma node: 51:375  (text-box)
 *
 * Props:
 *   text        string   — text to display inside the box
 *   color       string   — background color (default: accent token 2 from DESIGN.md)
 *   className   string   — overrides dimensions/positioning
 *
 * Colors from CSS variables in `src/index.css`.
 */
const ACCENT_2 = "var(--theme-accent-2)"
const COLOR_TEXT_PRIMARY = "var(--theme-color-text-primary)"
const FONT_BODY = "var(--font\\/family\\/body)"

export default function TextBox({ text = "", color = ACCENT_2, className }) {
  return (
    <div
      className={className || "inline-flex min-h-[34px] items-center justify-center rounded-[5px] px-2 shadow-card"}
      style={{ background: color }}
      data-name="text-box"
      data-node-id="51:375"
    >
      {text && (
        <p className="font-medium text-[12px] tracking-[-0.36px] text-center leading-normal px-1" style={{ color: COLOR_TEXT_PRIMARY, fontFamily: FONT_BODY }}>
          {text}
        </p>
      )}
    </div>
  )
}
