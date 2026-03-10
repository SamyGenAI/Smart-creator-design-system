/**
 * InfographicHeader — bold title with optional inline word highlight + optional subtitle.
 * Figma node: 48:490
 *
 * Props:
 *   title          {string}  — full title text, all words same style (72.948px Montserrat Bold)
 *   highlightWord  {string}  — word or phrase inside `title` to highlight with a color rectangle.
 *                              Must match exactly (case-sensitive). Optional.
 *   subtitle       {string}  — smaller italic line below the title (32px Montserrat Medium Italic).
 *                              Optional — omit or pass null/empty to hide.
 *   highlightColor {string}  — background color of the highlight rectangle.
 *                              Default: var(--components/card-title/blue, #b4eaff)
 *
 * Example:
 *   <InfographicHeader
 *     title="AI Tools VS AI Systems"
 *     highlightWord="AI Systems"
 *     subtitle="Everything you need to know"
 *   />
 */
export default function InfographicHeader({
  title = "Your Title Here",
  highlightWord = null,
  subtitle = null,
  highlightColor = "#b4eaff",
  titleClassName = "",
  subtitleClassName = "",
  allowWrap = false,
  className = "",
}) {
  // Split title into before / highlight / after parts
  const renderTitle = () => {
    if (!highlightWord || !title.includes(highlightWord)) {
      return title
    }
    const [before, after] = title.split(highlightWord)
    return (
      <>
        {before}
        <span
          style={{ backgroundColor: highlightColor, borderRadius: '6px', padding: '0 6px' }}
        >
          {highlightWord}
        </span>
        {after}
      </>
    )
  }

  return (
    <div
      className={`content-stretch flex flex-[1_0_0] flex-col gap-[9px] items-center justify-center min-h-px min-w-px relative w-full ${className}`}
      data-name="Header"
      data-node-id="48:490"
    >
      {/* Title — uniform bold style, optional inline highlight */}
      <div
        className={`flex flex-col font-['Montserrat',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#092c69] text-[72.948px] tracking-[-2.1884px] ${allowWrap ? "text-center whitespace-normal break-words w-full" : "whitespace-nowrap"} ${titleClassName}`}
        data-node-id="5:15875"
      >
        <p className="leading-[normal]">{renderTitle()}</p>
      </div>

      {/* Subtitle — optional, only rendered when provided */}
      {subtitle && (
        <div
          className={`flex flex-col font-['Montserrat',sans-serif] font-medium italic justify-center leading-[0] relative shrink-0 text-[#092c69] text-[32px] tracking-[-0.96px] ${allowWrap ? "text-center whitespace-normal break-words w-full" : "whitespace-nowrap"} ${subtitleClassName}`}
          data-node-id="5:15876"
        >
          <p className="leading-[normal]">{subtitle}</p>
        </div>
      )}
    </div>
  )
}
