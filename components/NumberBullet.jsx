/**
 * NumberBullet — numbered list with pink badge circles.
 * Figma node: 49:279  (number-bullet)
 * Supports exactly 3 items.
 *
 * Props:
 *   items       string[]  — array of 3 text strings
 *   className   string    — overrides dimensions/positioning
 */
export default function NumberBullet({ items = ["xxxxxxx", "xxxxxx", "xxxxxx"], className }) {
  const rows = [
    { top: "0", badgeInset: "0_82.12%_76.81%_0", numInset: "4.35%_86.03%_81.16%_3.35%", textInset: "5.8%_6.15%_81.88%_23.46%", num: "1" },
    { top: "37.68%", badgeInset: "37.68%_82.12%_39.13%_0", numInset: "42.03%_86.03%_43.48%_3.35%", textInset: "45.65%_0_42.03%_23.46%", num: "2" },
    { top: "75.36%", badgeInset: "75.36%_82.12%_1.45%_0", numInset: "79.71%_86.03%_5.8%_3.35%", textInset: "81.16%_0_6.52%_23.46%", num: "3" },
  ]

  return (
    <div
      className={className || "h-[138px] relative w-[179px]"}
      data-name="number-bullet"
      data-node-id="49:279"
    >
      {rows.map((row, i) => (
        <div key={i} className="absolute contents" style={{ top: row.top }} data-node-id={`49:${276 + i}`}>
          {/* Pink numbered badge */}
          <div
            className={`absolute bg-[rgba(255,178,218,0.7)] rounded-[50px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]`}
            style={{ inset: row.badgeInset.split('_').map(v => v).join(' ').replace(/_/g, ' ') }}
            data-node-id={`49:${265 + i * 2}`}
          />
          <div
            className="absolute flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] text-[16px] text-black text-center tracking-[-0.48px]"
            style={{ inset: row.numInset.split('_').join(' ') }}
            data-node-id={`49:${266 + i * 2}`}
          >
            <p className="leading-[normal]">{row.num}</p>
          </div>

          {/* Item text */}
          <div
            className="absolute flex flex-col font-[family-name:var(--font\/family\/body,'Montserrat:Medium',sans-serif)] font-medium justify-center leading-[0] text-[14px] text-[color:var(--text\/primary,black)] tracking-[-0.42px]"
            style={{ inset: row.textInset.split('_').join(' ') }}
            data-node-id={`49:${262 + i}`}
          >
            <p className="leading-[normal]">{items[i] || ""}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
