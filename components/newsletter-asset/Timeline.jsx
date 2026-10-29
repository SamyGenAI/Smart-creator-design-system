/**
 * Timeline — horizontal launch timeline for newsletter assets.
 *
 * One evenly spaced column per item: app-icon tile, a date pill sitting on the
 * axis, then name / company / one-line note. `gap: true` on an item draws the
 * axis segment leading into it dashed (a long stretch of time between two
 * launches) without breaking the even rhythm.
 *
 *   items: [{ label, logo, date, company, note, bleed?, zoom?, fit?, gap?, highlight? }]
 *   - bleed: logo already is an app icon → fills the tile (zoom crops its margin)
 *   - fit:   plain mark size as a fraction of the tile (default 0.62; wordmarks ~0.84)
 *   - highlight: date pill on the brand fill (the rest are ink outlines)
 *
 * LOCAL-ONLY: this folder is gitignored.
 */
const FONT_BODY = 'var(--font\\/family\\/body)'
const FONT_TITLE = 'var(--font\\/family\\/title)'
const INK = 'var(--theme-color-text-primary)'
const WHITE = 'var(--text\\/invert)'
const ink = (pct) => `color-mix(in srgb, ${INK} ${pct}%, transparent)`

const TILE_SHADOW = [`0 1px 2px ${ink(10)}`, `0 6px 16px -4px ${ink(16)}`].join(', ')
const AXIS_HEIGHT = 44
const AXIS_STROKE = 3

function LogoTile({ item, size }) {
  const { logo, label, bleed = false, zoom = 1, fit = 0.62 } = item
  return (
    <div
      className="flex items-center justify-center flex-none overflow-hidden"
      style={{ width: size, height: size, borderRadius: size * 0.26, background: WHITE, boxShadow: TILE_SHADOW }}
    >
      {bleed ? (
        <img src={logo} alt={label} className="w-full h-full object-cover" style={{ transform: `scale(${zoom})` }} />
      ) : (
        <div className="flex items-center justify-center" style={{ width: size * fit, height: size * fit }}>
          <img src={logo} alt={label} className="w-full h-full object-contain" />
        </div>
      )}
    </div>
  )
}

// Half of the axis on one side of a column; dashed when it spans a gap.
function AxisHalf({ side, dashed }) {
  const line = dashed
    ? { borderTop: `${AXIS_STROKE}px dashed ${ink(30)}` }
    : { borderTop: `${AXIS_STROKE}px solid ${ink(22)}` }
  return (
    <div
      className="absolute"
      style={{ top: (AXIS_HEIGHT - AXIS_STROKE) / 2, [side]: 0, width: '50%', ...line }}
      aria-hidden
    />
  )
}

function DatePill({ date, highlight }) {
  return (
    <span
      className="relative"
      style={{
        fontFamily: FONT_BODY,
        fontSize: 20,
        fontWeight: 700,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        padding: '11px 18px',
        borderRadius: 999,
        color: highlight ? 'var(--theme-color-on-primary)' : INK,
        background: highlight ? 'var(--theme-color-primary)' : WHITE,
        border: highlight ? '2px solid transparent' : `2px solid ${ink(16)}`,
        boxShadow: TILE_SHADOW,
      }}
    >
      {date}
    </span>
  )
}

export default function Timeline({ items, columnWidth = 190, tileSize = 112 }) {
  return (
    <div className="flex" data-name="Timeline">
      {items.map((item, i) => (
        <div
          key={item.label}
          className="flex flex-col items-center flex-none"
          style={{ width: columnWidth, gap: 22 }}
        >
          <LogoTile item={item} size={tileSize} />

          <div className="relative flex items-center justify-center w-full" style={{ height: AXIS_HEIGHT }}>
            {i > 0 && <AxisHalf side="left" dashed={item.gap} />}
            {i < items.length - 1 && <AxisHalf side="right" dashed={items[i + 1].gap} />}
            <DatePill date={item.date} highlight={item.highlight} />
          </div>

          <div className="flex flex-col items-center text-center" style={{ gap: 6, padding: '0 8px' }}>
            <span
              style={{
                fontFamily: FONT_TITLE, fontSize: 26, fontWeight: 800, lineHeight: 1.1,
                color: 'var(--theme-color-title)', letterSpacing: 'var(--font\\/tracking\\/title)',
              }}
            >
              {item.label}
            </span>
            <span style={{ fontFamily: FONT_BODY, fontSize: 20, fontWeight: 700, color: ink(70) }}>
              {item.company}
            </span>
            <span
              style={{
                fontFamily: FONT_BODY, fontSize: 20, fontWeight: 500, lineHeight: 1.3,
                color: 'var(--theme-color-text-secondary)',
              }}
            >
              {item.note}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
