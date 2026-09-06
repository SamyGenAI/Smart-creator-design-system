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
 * Colors from CSS variables in `src/index.css`.
 *
 * Example:
 *   <InfographicHeader
 *     title="AI Tools VS AI Systems"
 *     highlightWord="AI Systems"
 *     subtitle="Everything you need to know"
 *     titleStyle={{ fontSize: '64px', letterSpacing: '-1.92px' }}
 *   />
 */
// Titles are TEXT, not the brand fill. --theme-color-title resolves to the
// brand only while it reads against the canvas, and to the text colour
// otherwise, so a light brand does not render near-illegible titles.
const COLOR_TITLE = "var(--theme-color-title, var(--theme-color-text-primary))"
const ACCENT_1 = "var(--theme-accent-1)"
const FONT_TITLE = "var(--font\\/family\\/title)"
// Tracking belongs with the font token: -2.1884px was tuned for Montserrat and
// visibly collides glyphs when the brand font is a serif.
const TRACKING_TITLE = "var(--font\\/tracking\\/title, -0.03em)"
const TRACKING_SUBTITLE = "var(--font\\/tracking\\/subtitle, -0.03em)"

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
        style={{ lineHeight: 0, fontSize: '72.948px', letterSpacing: TRACKING_TITLE, color: COLOR_TITLE, fontFamily: FONT_TITLE, ...titleStyle }}
        data-node-id="5:15875"
      >
        <p className="leading-[normal]">{renderTitle()}</p>
      </div>

      {/* Subtitle — optional */}
      {subtitle && (
        <div
          className={`flex flex-col font-medium italic justify-center relative shrink-0 ${allowWrap ? "text-center whitespace-normal break-words w-full" : "whitespace-nowrap"} ${subtitleClassName}`}
          style={{ lineHeight: 0, fontSize: '32px', letterSpacing: TRACKING_SUBTITLE, color: COLOR_TITLE, fontFamily: FONT_TITLE, ...subtitleStyle }}
          data-node-id="5:15876"
        >
          <p className="leading-[normal]">{subtitle}</p>
        </div>
      )}
    </div>
  )
}
