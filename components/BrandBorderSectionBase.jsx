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
    cardBg: "bg-[var(--components\\/card\\/blue,rgba(126,218,255,0.15))]",
    headerBg: "bg-[var(--components\\/card-title\\/blue,#b4eaff)]",
    borderColor: "border-[var(--border\\/blue,#7edaff)]",
  },
  orange: {
    cardBg: "bg-[var(--components\\/card\\/orange,rgba(255,145,77,0.15))]",
    headerBg: "bg-[var(--color\\/orange\\/300,#ff914d)]",
    borderColor: "border-[var(--border\\/orange,#ff914d)]",
  },
  pink: {
    cardBg: "bg-[var(--components\\/card\\/pink,rgba(255,178,218,0.15))]",
    headerBg: "bg-[var(--color\\/pink\\/300,#ffb2da)]",
    borderColor: "border-[var(--border\\/pink,#ffb2da)]",
  },
  green: {
    cardBg: "bg-[var(--components\\/card\\/green,rgba(169,255,62,0.15))]",
    headerBg: "bg-[var(--components\\/card-title\\/green,#d2ff9a)]",
    borderColor: "border-[var(--border\\/green,#a9ff3e)]",
  },
}

const VARIANT_STYLES = {
  solid: {
    outerBorder: "border border-solid",
    headerBorder: "border-2 border-solid",
    shadow: "",
    titleTop: "top-[24.5px]",
    badgeGroupPosition: "left-[4px] top-[3px]",
  },
  white: {
    outerBorder: "border-3 border-solid border-white",
    headerBorder: "border-3 border-solid border-white",
    shadow: "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]",
    titleTop: "top-[22.5px]",
    badgeGroupPosition: "left-[2px] top-px",
  },
}

export default function BrandBorderSectionBase({
  theme = "blue",
  variant = "solid",
  title = "xxx",
  number = "1",
  widthClass = "w-[415px]",
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
        `${themeStyles.cardBg} ${variantStyles.outerBorder} ${themeStyles.borderColor} ${variantStyles.shadow} content-stretch flex flex-col gap-[10px] h-[195px] items-start relative rounded-[20px] ${widthClass}`
      }
      data-name={rootName}
      data-node-id={nodeIds.root}
    >
      <div
        className={`${themeStyles.headerBg} ${variantStyles.headerBorder} ${variant === "solid" ? themeStyles.borderColor : ""} h-[51px] rounded-[10px] shrink-0 w-full`}
        data-node-id={nodeIds.header}
      />

      <div
        className={`-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Montserrat:Bold',sans-serif] font-bold h-[39px] justify-center leading-[0] left-1/2 text-[32px] text-[color:var(--text\\/primary,black)] text-center ${variantStyles.titleTop} tracking-[-0.96px] w-[365px]`}
        data-node-id={nodeIds.title}
      >
        <p className="leading-[normal]">{title}</p>
      </div>

      <div
        className={`absolute h-[42px] w-[44px] ${variantStyles.badgeGroupPosition}`}
        data-name="number-badge-black"
        data-node-id={nodeIds.badgeGroup}
      >
        <div
          className="absolute bg-[var(--color\/neutral\/1000,black)] h-[42px] left-[5px] rounded-[5px] top-[4px] w-[44px]"
          data-node-id={nodeIds.badge}
        />
        <div
          className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Montserrat:Bold',sans-serif] font-bold h-[21px] justify-center leading-[0] left-[27px] text-[32px] text-center text-white top-[24.5px] tracking-[-0.96px] w-[22px]"
          data-node-id={nodeIds.number}
        >
          <p className="leading-[normal]">{number}</p>
        </div>
      </div>

      {children}
    </div>
  )
}
