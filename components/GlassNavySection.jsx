/**
 * GlassNavySection — primary card container used throughout infographics.
 * Figma node: 22:324  (glass-navy-section)
 *
 * Props:
 *   title       string   — text displayed in the navy header bar
 *   iconSrc     string   — URL/path for the 35×35 freehand icon in header
 *   iconAlt     string   — alt text for the icon
 *   children    node     — content rendered inside the card body
 *   className   string   — overrides width/height/positioning (required for layout)
 */
export default function GlassNavySection({ title = "xxx", iconSrc = null, iconAlt = "", children, className, titleSize = "32px" }) {
  return (
    <div
      className={className || "bg-[rgba(255,255,255,0.1)] border-3 border-solid border-white content-stretch flex flex-col gap-[10px] h-[225px] items-start relative rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[308px]"}
      data-name="glass-navy-section"
      data-node-id="22:324"
    >
      {/* Navy header bar */}
      <div
        className="bg-[var(--color\/blue\/500,#092c69)] border-3 border-solid border-white h-[51px] rounded-[10px] shrink-0 w-full relative flex items-center justify-center"
        data-node-id="22:309"
      >
        {/* Title */}
        <div
          className={`font-['Montserrat',sans-serif] font-bold leading-[0] text-[${titleSize}] text-center text-white tracking-[-0.96px]`}
          data-node-id="22:310"
        >
          <p className="leading-[normal]">{title}</p>
        </div>

        {/* Icon in the top-left of the header */}
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
