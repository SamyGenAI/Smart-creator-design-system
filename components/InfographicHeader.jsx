/**
 * InfographicHeader — bold title with optional inline word highlight + optional subtitle.
 * Figma node: 48:490
 *
 * Props:
 *   title          {string}  — full title text, all words same style (72.948px, title font token)
 *   highlightWord  {string}  — word or phrase inside `title` to highlight with a color rectangle.
 *                              Must match exactly (case-sensitive). Optional.
 *   subtitle       {string}  — smaller italic line below the title (32px, title font token).
 *                              Optional — omit or pass null/empty to hide.
 *   highlightColor {string}  — background color of the highlight rectangle.
 *                              Default: `--theme-accent-1`
 *   titleStyle     {object}  — inline style overrides for the title (e.g. fontSize, letterSpacing)
 *   subtitleStyle  {object}  — inline style overrides for the subtitle
 *
 * Colors sourced from DESIGN.md CSS variables. Edit DESIGN.md + run `pnpm tokens:gen`.
 *
 * Example:
 *   <InfographicHeader
 *     title="AI Tools VS AI Systems"
 *     highlightWord="AI Systems"
 *     subtitle="Everything you need to know"
 *     titleStyle={{ fontSize: '64px', letterSpacing: '-1.92px' }}
 *   />
 */
const COLOR_PRIMARY = "var(--theme-color-primary)"
const ACCENT_1 = "var(--theme-accent-1)"
const FONT_TITLE = "var(--font\\/family\\/title)"

export default function InfographicHeader({
  title = "Your Title Here",
  highlightWord = null,
  subtitle = null,
  highlightColor = ACCENT_1,
  titleClassName = "",
  subtitleClassName = "",
  titleStyle = {},
  subtitleStyle = {},
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
      {/* Title */}
      <div
        className={`flex flex-col font-bold justify-center relative shrink-0 overflow-hidden ${allowWrap ? "text-center whitespace-normal break-words w-full" : "whitespace-nowrap"} ${titleClassName}`}
        style={{ lineHeight: 0, fontSize: '72.948px', letterSpacing: '-2.1884px', color: COLOR_PRIMARY, fontFamily: FONT_TITLE, ...titleStyle }}
        data-node-id="5:15875"
      >
        <p className="leading-[normal]">{renderTitle()}</p>
      </div>

      {/* Subtitle — optional */}
      {subtitle && (
        <div
          className={`flex flex-col font-medium italic justify-center relative shrink-0 ${allowWrap ? "text-center whitespace-normal break-words w-full" : "whitespace-nowrap"} ${subtitleClassName}`}
          style={{ lineHeight: 0, fontSize: '32px', letterSpacing: '-0.96px', color: COLOR_PRIMARY, fontFamily: FONT_TITLE, ...subtitleStyle }}
          data-node-id="5:15876"
        >
          <p className="leading-[normal]">{subtitle}</p>
        </div>
      )}
    </div>
  )
}
