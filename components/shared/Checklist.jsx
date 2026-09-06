/**
 * Checklist — bulleted list with checkmark icons.
 * Figma node: 28:283  (Checklist)
 * Uses Checkmark sub-component (inline, no separate file needed).
 * Supports 2–4 items. Layout from Figma is optimized for 3 items.
 *
 * Props:
 *   title       string    — bold label above the list (optional, set null to hide)
 *   items       string[]  — list text items (2–4)
 *   className   string    — overrides dimensions/positioning
 *
 * Colors from CSS variables in `src/index.css`.
 */
const ACCENT_2 = "var(--theme-accent-2)"
const COLOR_TEXT_PRIMARY = "var(--theme-color-text-primary)"
const FONT_TITLE = "var(--font\\/family\\/title)"
const FONT_BODY = "var(--font\\/family\\/body)"

// Checkmark icon — rendered as a colored badge
// Figma node: 5:15858
function Checkmark({ className }) {
  return (
    <div className={className || "relative size-[25px]"} data-name="Checkmark" data-node-id="5:15858">
      {/* Accent badge square */}
      <div className="absolute inset-0 rounded-[4px]" style={{ backgroundColor: ACCENT_2 }} />
      {/* Checkmark stroke — color from check-stroke token in DESIGN.md */}
      <svg className="absolute inset-[15%]" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 7L5.5 10.5L12 4" stroke="var(--check-stroke)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default function Checklist({ title = null, items = ["xxx", "xxx", "xxx"], className }) {
  // Figma uses absolute positioning for 3 rows. We replicate positions for up to 4 items.
  const rowInsets = [
    "24.34%_29.24%_62.43%_0",   // row 1 (top)
    "55.56%_29.24%_31.22%_0",   // row 2 (middle)
    "86.77%_29.24%_0_0",        // row 3 (bottom — only in 3-item version)
  ]

  return (
    <div
      className={className || "relative min-h-0 h-full w-full min-w-0"}
      data-name="Checklist"
      data-node-id="28:283"
    >
      {/* Optional title */}
      {title && (
        <div
          className="absolute flex flex-col font-bold inset-[0_0_91.01%_0.85%] justify-center leading-[0] text-[14px] tracking-[-0.42px]"
          style={{ color: COLOR_TEXT_PRIMARY, fontFamily: FONT_TITLE }}
          data-node-id="28:198"
        >
          <p className="leading-[normal]">{title}</p>
        </div>
      )}

      {/* List items */}
      {items.slice(0, 3).map((item, i) => (
        <div
          key={i}
          className="absolute content-stretch flex gap-[10px] items-center"
          style={{ inset: rowInsets[i].split('_').join(' ') }}
          data-node-id={`28:${261 + i * 2}`}
        >
          <Checkmark className="relative shrink-0 size-[25px]" />
          <div
            className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[14px] tracking-[-0.42px] w-[234px] overflow-hidden"
            style={{ color: COLOR_TEXT_PRIMARY, fontFamily: FONT_BODY }}
            data-node-id={`28:${253 + i * 2}`}
          >
            <p className="leading-[normal]">{item}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
