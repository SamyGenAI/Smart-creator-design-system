/**
 * TextBox — small highlighted text box (colored pill/badge).
 * Figma node: 51:375  (text-box)
 *
 * In Figma this was an image asset. We re-implement it as a styled div
 * with the same green accent background. Used in pairs in Row 3, Card 3.
 *
 * Props:
 *   text        string   — text to display inside the box
 *   color       string   — background color (default: chip-green)
 *   className   string   — overrides dimensions/positioning
 */
export default function TextBox({ text = "", color = "var(--components\\/card-title\\/green,#d2ff9a)", className }) {
  return (
    <div
      className={className || "h-[34px] relative w-[153px]"}
      data-name="text-box"
      data-node-id="51:375"
    >
      <div
        className="absolute inset-0 rounded-[5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex items-center justify-center"
        style={{ background: color }}
      >
        {text && (
          <p className="font-['Montserrat',sans-serif] font-medium text-[12px] text-black tracking-[-0.36px] text-center leading-normal px-1">
            {text}
          </p>
        )}
      </div>
    </div>
  )
}
