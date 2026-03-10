/**
 * BrandBorderSectionBase — shared section card for brand colors and border styles.
 *
 * Variants:
 *   - solid: colored border (no shadow)
 *   - white: white border + drop shadow
 *
 * Themes:
 *   - blue, orange, pink, green
 */
const THEME_STYLES = {
  blue: {
    cardBg: "rgba(126, 218, 255, 0.15)",
    headerBg: "#b4eaff",
    borderColor: "#7edaff",
  },
  orange: {
    cardBg: "rgba(255, 145, 77, 0.15)",
    headerBg: "#ff914d",
    borderColor: "#ff914d",
  },
  pink: {
    cardBg: "rgba(255, 178, 218, 0.15)",
    headerBg: "#ffb2da",
    borderColor: "#ffb2da",
  },
  green: {
    cardBg: "rgba(169, 255, 62, 0.15)",
    headerBg: "#a9ff3e",
    borderColor: "#a9ff3e",
  },
}

const VARIANT_STYLES = {
  solid: {
    outerBorderWidth: "1px",
    headerBorderWidth: "2px",
    shadow: undefined,
    titleTopClass: "top-[24px]",
    badgePositionClass: "left-[4px] top-[3px]",
  },
  white: {
    outerBorderWidth: "3px",
    headerBorderWidth: "3px",
    shadow: "0px 4px 4px 0px rgba(0,0,0,0.25)",
    titleTopClass: "top-[22px]",
    badgePositionClass: "left-[2px] top-px",
  },
}

export default function BrandBorderSectionBase({
  theme = "blue",
  variant = "solid",
  title = "xxx",
  number = "1",
  widthClass = "w-[415px]",
  heightClass = "h-[195px]",
  rootName = "brand-border-section",
  nodeIds = {},
  children = null,
  className,
}) {
  const themeStyles = THEME_STYLES[theme] || THEME_STYLES.blue
  const variantStyles = VARIANT_STYLES[variant] || VARIANT_STYLES.solid

  return (
    <div
      className={
        className ||
        `content-stretch flex flex-col gap-[10px] ${heightClass} items-start relative rounded-[20px] ${widthClass}`
      }
      style={
        className
          ? undefined
          : {
              backgroundColor: themeStyles.cardBg,
              borderStyle: "solid",
              borderWidth: variantStyles.outerBorderWidth,
              borderColor: variant === "white" ? "#ffffff" : themeStyles.borderColor,
              boxShadow: variantStyles.shadow,
            }
      }
      data-name={rootName}
      data-node-id={nodeIds.root}
    >
      <div
        className="h-[51px] rounded-[10px] shrink-0 w-full border-solid"
        style={{
          backgroundColor: themeStyles.headerBg,
          borderWidth: variantStyles.headerBorderWidth,
          borderColor: variant === "white" ? "#ffffff" : themeStyles.borderColor,
        }}
        data-node-id={nodeIds.header}
      />

      <div
        className={`-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Montserrat',sans-serif] font-bold h-[39px] justify-center leading-[0] left-1/2 text-[24px] text-[color:var(--text\\/primary,black)] text-center ${variantStyles.titleTopClass} tracking-[-0.72px] w-full px-[44px]`}
        data-node-id={nodeIds.title}
      >
        <p className="leading-[normal]">{title}</p>
      </div>

      <div
        className={`absolute h-[42px] w-[44px] ${variantStyles.badgePositionClass}`}
        data-name="number-badge-black"
        data-node-id={nodeIds.badgeGroup}
      >
        <div
          className="absolute bg-[var(--color\/neutral\/1000,black)] h-[42px] left-[5px] rounded-[5px] top-[4px] w-[44px]"
          data-node-id={nodeIds.badge}
        />
        <div
          className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Montserrat',sans-serif] font-bold h-[21px] justify-center leading-[0] left-[27px] text-[24px] text-center text-white top-[24.5px] tracking-[-0.72px] w-[22px]"
          data-node-id={nodeIds.number}
        >
          <p className="leading-[normal]">{number}</p>
        </div>
      </div>

      {children}
    </div>
  )
}
