/**
 * BrandBorderSectionBase — shared section card for brand colors and border styles.
 *
 * Variants:
 *   - solid: colored border (no shadow)
 *   - white: white border + drop shadow
 *
 * Themes (semantic IDs):
 *   - primary, accent, support, success
 *
 *
 * All color values are read from DESIGN.md-driven CSS variables.
 * Edit DESIGN.md and run `pnpm tokens:gen` to change theme colors.
 */
const BORDER_SECTION_THEME_STYLES = {
  primary: {
    cardBg: 'var(--theme-surface-layer-4)',
    headerBg: 'var(--theme-accent-1)',
    borderColor: 'var(--theme-border-1)',
  },
  accent: {
    cardBg: 'var(--theme-surface-layer-6)',
    headerBg: 'var(--theme-border-5)',
    borderColor: 'var(--theme-border-5)',
  },
  support: {
    cardBg: 'var(--theme-surface-layer-2)',
    headerBg: 'var(--theme-border-4)',
    borderColor: 'var(--theme-border-4)',
  },
  success: {
    cardBg: 'var(--theme-surface-layer-5)',
    headerBg: 'var(--theme-border-2)',
    borderColor: 'var(--theme-border-2)',
  },
}

const BORDER_SECTION_VARIANT_STYLES = {
  solid: {
    outerBorderWidth: '1px',
    headerBorderWidth: '2px',
    shadow: undefined,
    titleTopClass: 'top-[24px]',
    badgePositionClass: 'left-[4px] top-[3px]',
  },
  white: {
    outerBorderWidth: '3px',
    headerBorderWidth: '3px',
    shadow: 'var(--theme-shadow-card)',
    titleTopClass: 'top-[22px]',
    badgePositionClass: 'left-[2px] top-px',
  },
}

const COLOR_ON_PRIMARY = 'var(--theme-color-on-primary)'
const COLOR_NEUTRAL_STRONG = 'var(--color\\/neutral\\/1000)'
const COLOR_TEXT_PRIMARY = 'var(--theme-color-text-primary)'
const FONT_TITLE = 'var(--font\\/family\\/title)'

export default function BrandBorderSectionBase({
  theme = "primary",
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
  const themeStyles = BORDER_SECTION_THEME_STYLES[theme] || BORDER_SECTION_THEME_STYLES.primary
  const variantStyles = BORDER_SECTION_VARIANT_STYLES[variant] || BORDER_SECTION_VARIANT_STYLES.solid

  return (
    <div
      className={
        className ||
        `content-stretch flex flex-col gap-[10px] ${heightClass} items-start relative rounded-glass ${widthClass} overflow-hidden`
      }
      style={
        className
          ? undefined
          : {
              backgroundColor: themeStyles.cardBg,
              borderStyle: "solid",
              borderWidth: variantStyles.outerBorderWidth,
              borderColor: variant === "white" ? COLOR_ON_PRIMARY : themeStyles.borderColor,
              boxShadow: variantStyles.shadow,
            }
      }
      data-name={rootName}
      data-node-id={nodeIds.root}
    >
      <div
        className="h-[51px] rounded-glass-header shrink-0 w-full border-solid"
        style={{
          backgroundColor: themeStyles.headerBg,
          borderWidth: variantStyles.headerBorderWidth,
          borderColor: variant === "white" ? COLOR_ON_PRIMARY : themeStyles.borderColor,
        }}
        data-node-id={nodeIds.header}
      />

      <div
        className={`-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-bold h-[39px] justify-center leading-[0] left-1/2 text-[24px] text-center ${variantStyles.titleTopClass} tracking-[-0.72px] w-full px-[44px]`}
        style={{ color: COLOR_TEXT_PRIMARY, fontFamily: FONT_TITLE }}
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
          className="absolute h-[42px] left-[5px] rounded-[5px] top-[4px] w-[44px]"
          style={{ backgroundColor: COLOR_NEUTRAL_STRONG }}
          data-node-id={nodeIds.badge}
        />
        <div
          className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-bold h-[21px] justify-center leading-[0] left-[27px] text-[24px] text-center top-[24.5px] tracking-[-0.72px] w-[22px]"
          style={{ color: COLOR_ON_PRIMARY, fontFamily: FONT_TITLE }}
          data-node-id={nodeIds.number}
        >
          <p className="leading-[normal]">{number}</p>
        </div>
      </div>

      {children && (
        <div className="flex flex-col flex-1 w-full px-[14px] py-[6px] overflow-hidden justify-center">
          {children}
        </div>
      )}
    </div>
  )
}
