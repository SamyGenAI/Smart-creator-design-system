/**
 * NewsletterThumbnailTitle — the title block of a 420×300 newsletter thumbnail.
 * Figma nodes: 27:128 (highlight bar) + 27:129 (title text)
 *
 * The title is centred at the top of the canvas. An optional `highlightWord`
 * is painted on a soft accent bar (the Figma "highlighter" pass) which wraps
 * with the text instead of being a fixed rectangle, so any title length works.
 *
 * Props:
 *   title          {string} — full title text
 *   highlightWord  {string} — exact substring of `title` to sit on the accent
 *                             bar. Optional; omit for a plain title.
 *   highlightColor {string} — accent bar fill. Default: border accent 1 at the
 *                             Figma 60% opacity, via color-mix on the token.
 *   highlightRadius {number} — corner radius of the highlighter bar in px.
 *                              Default 10 (Figma). Rounded on every corner,
 *                              including when the highlight wraps to a 2nd line.
 *   fontSize       {number} — px. Default 36 (Figma). Drop to ~30 for long titles.
 *   lineHeight     {number} — px. Default 45 (Figma).
 *   titleStyle     {object} — inline style overrides
 */

// Titles are TEXT: --theme-color-title resolves to the brand only while it
// reads against the canvas, so light brands stay legible.
const COLOR_TITLE = 'var(--theme-color-title, var(--theme-color-text-primary))'
const FONT_TITLE = 'var(--font\/family\/title)'
const TRACKING_TITLE = 'var(--font\/tracking\/title, -0.03em)'
// Figma uses the accent-1 border tone at 60%. Expressed against the token so a
// rebrand swaps it automatically.
const HIGHLIGHT_DEFAULT = 'color-mix(in srgb, var(--theme-border-1) 60%, transparent)'
const SHADOW_CARD = 'var(--theme-shadow-card)'
// Figma rounds the highlighter bar at 10px. There is no radius CSS variable in
// the generated theme, so this stays a plain geometry literal (not chroma).
const HIGHLIGHT_RADIUS_PX = 10

export default function NewsletterThumbnailTitle({
  title = 'Your Title Here',
  highlightWord = null,
  highlightColor = HIGHLIGHT_DEFAULT,
  highlightRadius = HIGHLIGHT_RADIUS_PX,
  fontSize = 36,
  lineHeight = 45,
  className = '',
  titleStyle = {},
}) {
  const renderTitle = () => {
    if (!highlightWord || !title.includes(highlightWord)) return title
    const index = title.indexOf(highlightWord)
    const before = title.slice(0, index)
    const after = title.slice(index + highlightWord.length)
    return (
      <>
        {before}
        <span
          style={{
            // box-decoration-clone re-applies the radius + padding to EVERY
            // line box, so a highlight that wraps stays fully rounded instead
            // of rendering square inner edges.
            boxDecorationBreak: 'clone',
            WebkitBoxDecorationBreak: 'clone',
            backgroundColor: highlightColor,
            borderRadius: `${highlightRadius}px`,
            boxShadow: SHADOW_CARD,
            padding: '2px 10px',
          }}
        >
          {highlightWord}
        </span>
        {after}
      </>
    )
  }

  return (
    <div
      className={`flex-none relative w-full px-[13px] pt-[21px] text-center ${className}`.trim()}
      data-name="Newsletter-thumbnail-title"
      data-node-id="27:129"
    >
      <p
        className="font-bold [word-break:break-word] m-0"
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: `${lineHeight}px`,
          letterSpacing: TRACKING_TITLE,
          color: COLOR_TITLE,
          fontFamily: FONT_TITLE,
          ...titleStyle,
        }}
      >
        {renderTitle()}
      </p>
    </div>
  )
}
