/**
 * IconBullet — icon accent badge + text list, 4 rows.
 * Figma node: 28:384  (icon-bullet)
 *
 * Props:
 *   items         {iconSrc, iconAlt, text}[]  — exactly 4 items
 *   accentColor   string                      — accent background CSS value
 *                                               default: `--theme-accent-1`
 *   className     string                      — overrides dimensions/positioning
 *
 * Note: pass a different semantic accent variable when needed.
 *
 * Colors from CSS variables in `src/index.css`.
 */
const COLOR_TEXT_PRIMARY = "var(--theme-color-text-primary)"
const FONT_BODY = "var(--font\\/family\\/body)"
const ACCENT_1 = "var(--theme-accent-1)"
const SURFACE_GLASS_STRONG = "var(--theme-surface-glass-strong)"

export default function IconBullet({
  items = [
    { iconSrc: null, iconAlt: "", text: "xxx" },
    { iconSrc: null, iconAlt: "", text: "xxx" },
    { iconSrc: null, iconAlt: "", text: "xxx" },
    { iconSrc: null, iconAlt: "", text: "xxx" },
  ],
  accentColor = ACCENT_1,
  className,
}) {
  // Row vertical offsets from Figma
  const rowTops = [0, 47, 94, 141]
  const accentInsets = [
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
      className={className || "relative min-h-0 h-full w-full min-w-0"}
      data-name="icon-bullet"
      data-node-id="28:384"
    >
      {items.slice(0, 4).map((item, i) => (
        <div key={i} className="absolute contents" data-node-id={`37:${1363 - i}`}>
          {/* Text */}
          <div
            className="absolute flex flex-col font-medium justify-center leading-[0] text-[14px] tracking-[-0.42px] overflow-hidden"
            style={{ inset: textInsets[i].split('_').join(' '), color: COLOR_TEXT_PRIMARY, fontFamily: FONT_BODY }}
            data-node-id={`28:${334 + (i === 0 ? 0 : i === 1 ? -1 : i === 2 ? 1 : 2)}`}
          >
            <p className="leading-[normal]">{item.text}</p>
          </div>

          {/* Icon accent badge */}
          <div className="absolute contents" style={{ inset: accentInsets[i].split('_').join(' ') }}>
            <div
              className="absolute rounded-[5px] shadow-card"
              style={{
                inset: accentInsets[i].split('_').join(' '),
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
                className="absolute size-[24px] rounded-[3px]"
                data-node-id={`placeholder-${i}`}
                style={{ left: '4px', top: `${rowTops[i] + 4}px`, backgroundColor: SURFACE_GLASS_STRONG }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
