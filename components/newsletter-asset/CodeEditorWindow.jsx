/**
 * CodeEditorWindow — dark editor chrome for newsletter assets: a title bar
 * with three window dots and a centred path, over an ink-coloured body.
 *
 * Ink = --theme-color-text-primary, text = --text/invert, so the window stays
 * a dark "editor" on every brand. Uses the same layered "product shot" shadow
 * as NewsletterScreenshotFrame so designed assets and screenshots sit on the
 * canvas the same way. Pair with `<FileTree tone="dark" />`.
 *
 * Props:
 *   title     {string} — path shown in the title bar
 *   width     {number} — CSS px
 *   children           — editor body (FileTree, …)
 *   bodyStyle {object} — extra style for the body (padding, …)
 *
 * LOCAL-ONLY: this folder is gitignored.
 */

const FONT_BODY = 'var(--font\\/family\\/body)'
const INK = 'var(--theme-color-text-primary)'
const ink = (pct) => `color-mix(in srgb, ${INK} ${pct}%, transparent)`
const light = (pct) => `color-mix(in srgb, var(--text\\/invert) ${pct}%, transparent)`

const SHADOW = [
  `0 2px 6px ${ink(10)}`,
  `0 18px 40px -8px ${ink(22)}`,
  `0 30px 80px -20px ${ink(30)}`,
].join(', ')

// Window dots in the brand's own soft accents, not OS traffic-light literals.
const DOTS = ['var(--theme-accent-5)', 'var(--theme-accent-3)', 'var(--theme-accent-2)']

export default function CodeEditorWindow({ title, width, children, bodyStyle }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: `${width}px`, borderRadius: '20px', background: INK, boxShadow: SHADOW }}
      data-name="Code-editor-window"
    >
      <div
        className="relative flex items-center"
        style={{ height: '56px', padding: '0 24px', borderBottom: `1px solid ${light(12)}` }}
      >
        <div className="flex" style={{ gap: '9px' }}>
          {DOTS.map((fill) => (
            <span key={fill} style={{ width: 14, height: 14, borderRadius: '50%', background: fill }} />
          ))}
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ fontFamily: FONT_BODY, fontSize: 17, fontWeight: 600, color: light(70) }}
        >
          {title}
        </div>
      </div>
      <div style={bodyStyle}>{children}</div>
    </div>
  )
}
