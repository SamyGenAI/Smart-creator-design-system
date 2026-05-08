/**
 * PrimaryGlassSection — primary section container used throughout infographics.
 * Figma node: 22:324
 *
 * Props:
 *   title       string   — text displayed in the primary header bar
 *   iconSrc     string   — URL/path for the 35×35 freehand icon in header
 *   iconAlt     string   — alt text for the icon
 *   children    node     — content rendered inside the card body
 *   className   string   — overrides width/height/positioning (required for layout)
 *
 * Colors sourced from DESIGN.md CSS variables. Edit DESIGN.md + run `pnpm tokens:gen`.
 */
const COLOR_ON_PRIMARY = "var(--theme-color-on-primary)"
const COLOR_PRIMARY = "var(--theme-color-primary)"
const SURFACE_GLASS = "var(--theme-surface-glass-soft)"
const SHADOW_CARD = "var(--theme-shadow-card)"
const FONT_TITLE = "var(--font\\/family\\/title)"
const BASE_CLASS = "border-3 border-solid content-stretch flex flex-col gap-[10px] items-start relative rounded-glass"
const DEFAULT_SIZE_CLASS = "h-[225px] w-[308px]"

export default function PrimaryGlassSection({ title = "xxx", iconSrc = null, iconAlt = "", children, className, titleSize = "32px" }) {
  return (
    <div
      className={`${BASE_CLASS} ${className || DEFAULT_SIZE_CLASS}`}
      style={{ borderColor: COLOR_ON_PRIMARY, backgroundColor: SURFACE_GLASS, boxShadow: SHADOW_CARD }}
      data-name="primary-glass-section"
      data-node-id="22:324"
    >
      <div
        className="border-3 border-solid h-[51px] rounded-glass-header shrink-0 w-full relative flex items-center justify-center"
        style={{ backgroundColor: COLOR_PRIMARY, borderColor: COLOR_ON_PRIMARY }}
        data-node-id="22:309"
      >
        <div className={`font-bold leading-[0] text-[${titleSize}] text-center tracking-[-0.96px]`} style={{ color: COLOR_ON_PRIMARY, fontFamily: FONT_TITLE }} data-node-id="22:310">
          <p className="leading-[normal]">{title}</p>
        </div>

        {iconSrc && (
          <div className="absolute left-[9px] top-1/2 -translate-y-1/2 overflow-clip size-[35px]" data-name="icon">
            <img alt={iconAlt} className="absolute block max-w-none size-full" style={{ filter: 'brightness(0) invert(1)' }} src={iconSrc} />
          </div>
        )}
      </div>

      {children}
    </div>
  )
}
