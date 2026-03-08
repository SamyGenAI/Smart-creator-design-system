/**
 * IconBullet — icon chip + text list, 4 rows.
 * Figma node: 28:384  (icon-bullet)
 *
 * Props:
 *   items         {iconSrc, iconAlt, text}[]  — exactly 4 items
 *   accentColor   string                      — chip background CSS value
 *                                               default: var(--components/card-title/blue, #b4eaff)
 *   className     string                      — overrides dimensions/positioning
 *
 * Note: when used in Row 2 (amber context), accentColor should be
 *   "var(--components\/card-title\/amber,#fde68a)"
 */
export default function IconBullet({
  items = [
    { iconSrc: null, iconAlt: "", text: "xxx" },
    { iconSrc: null, iconAlt: "", text: "xxx" },
    { iconSrc: null, iconAlt: "", text: "xxx" },
    { iconSrc: null, iconAlt: "", text: "xxx" },
  ],
  accentColor = "var(--components\\/card-title\\/blue,#b4eaff)",
  className,
}) {
  // Row vertical offsets from Figma
  const rowTops = [0, 47, 94, 141]
  const chipInsets = [
    "0_89.97%_81.5%_0",
    "27.17%_89.97%_54.34%_0",
    "54.34%_89.97%_27.17%_0",
    "81.5%_89.97%_0_0",
  ]
  const textInsets = [
    "4.05%_0_86.13%_13.79%",
    "31.79%_0_58.38%_13.79%",
    "58.38%_0_31.79%_13.79%",
    "85.55%_0.63%_4.62%_13.17%",
  ]

  return (
    <div
      className={className || "h-[173px] relative w-[319px]"}
      data-name="icon-bullet"
      data-node-id="28:384"
    >
      {items.slice(0, 4).map((item, i) => (
        <div key={i} className="absolute contents" data-node-id={`37:${1363 - i}`}>
          {/* Text */}
          <div
            className="absolute flex flex-col font-[family-name:var(--font\/family\/body,'Montserrat:Medium',sans-serif)] font-medium justify-center leading-[0] text-[14px] text-[color:var(--text\/primary,black)] tracking-[-0.42px]"
            style={{ inset: textInsets[i].split('_').join(' ') }}
            data-node-id={`28:${334 + (i === 0 ? 0 : i === 1 ? -1 : i === 2 ? 1 : 2)}`}
          >
            <p className="leading-[normal]">{item.text}</p>
          </div>

          {/* Icon chip */}
          <div className="absolute contents" style={{ inset: chipInsets[i].split('_').join(' ') }}>
            <div
              className="absolute rounded-[5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
              style={{
                inset: chipInsets[i].split('_').join(' '),
                background: accentColor,
              }}
            />
            {item.iconSrc ? (
              <img
                alt={item.iconAlt || ""}
                className="absolute overflow-clip size-[24px] object-contain"
                style={{ left: '4px', top: `${rowTops[i] + 4}px` }}
                src={item.iconSrc}
              />
            ) : (
              <div
                className="absolute size-[24px] rounded-[3px] bg-black/10"
                style={{ left: '4px', top: `${rowTops[i] + 4}px` }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
