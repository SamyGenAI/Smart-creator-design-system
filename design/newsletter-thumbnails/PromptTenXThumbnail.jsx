/**
 * PromptTenXThumbnail — 420×300 newsletter thumbnail.
 * Topic: "How to prompt to 10x AI results"
 *
 * Visual: the three methods from the newsletter, reduced to a 3-column row of
 * numbered glass tiles. The source copy carries sub-bullets under each method
 * (structure/colour specifics, vision-model notes, the hand-sketch workflow) —
 * those stay in the newsletter body. At ~388×170 the visual area can hold a
 * number, a short label and one supporting line per column before type drops
 * below reading size, so the tiles carry the method names and nothing else.
 *
 * Tokens only — no chroma here.
 */
import NewsletterThumbnailCanvas from '../../components/newsletter-thumbnail/NewsletterThumbnailCanvas.jsx'
import NewsletterThumbnailTitle from '../../components/newsletter-thumbnail/NewsletterThumbnailTitle.jsx'
import NewsletterThumbnailVisual from '../../components/newsletter-thumbnail/NewsletterThumbnailVisual.jsx'

const C_TEXT = 'var(--theme-color-text-primary)'
const C_TITLE = 'var(--theme-color-title, var(--theme-color-text-primary))'
const C_ON_PRIMARY = 'var(--theme-color-on-primary)'
const FILL_PRIMARY = 'var(--theme-color-primary)'
const SURFACE_GLASS_STRONG = 'var(--theme-surface-glass-strong)'
const SHADOW_CARD = 'var(--theme-shadow-card)'
const SHADOW_CARD_SOFT = 'var(--theme-shadow-card-soft)'
const SHADOW_TILE = `${SHADOW_CARD_SOFT}, ${SHADOW_CARD}`
// Softer lift for the icon badge — it sits ON a glass tile, so the full
// two-layer tile shadow would read as a second card rather than a badge.
const SHADOW_BADGE = 'var(--theme-shadow-surface-accent)'
const FONT_TITLE = 'var(--font\/family\/title)'
const FONT_BODY = 'var(--font\/family\/body)'
const TRACKING_TITLE = 'var(--font\/tracking\/title, -0.03em)'

/* ─── Geometry ───────────────────────────────────────────────────────────── */
// Visual area is ~388×170 after the title block and the 16px visual padding.
// 3 columns + 2 gaps of 10 → (388 - 20) / 3 ≈ 122 per tile.
const TILE_GAP = 10
const BADGE = 22
const ICON_BOX = 38
const ICON_IMG = 24

/**
 * The three methods. `label` is the method itself; `hint` is the single
 * supporting line that survives at this scale — a compression of that
 * method's sub-bullets, not a second bullet list.
 */
/*
 * The icons are Streamline Freehand line art — black strokes on transparent.
 * They are NOT tinted: colour comes from the accent square behind them, which
 * is the repo's established pattern (IconBullet) and keeps the icon legible on
 * any brand. Each card takes a different accent so the row reads as a set.
 */
const METHODS = [
  {
    n: '1',
    label: 'Give specific instructions',
    hint: 'Structure + colour',
    icon: '/assets/icons/work-office/task-list-clipboard-check--Streamline-Freehand.svg',
    iconAlt: 'Checklist of instructions',
    accent: 'var(--theme-accent-2)',
  },
  {
    n: '2',
    label: 'Upload a screenshot',
    hint: 'Showing beats telling',
    icon: '/assets/icons/images-photography/picture-double-landscape--Streamline-Freehand.png',
    iconAlt: 'Screenshot of a design',
    accent: 'var(--theme-accent-3)',
  },
  {
    n: '3',
    label: 'Design by hand',
    hint: 'Sketch, then upload',
    icon: '/assets/icons/design/design-tool-brush-ruler--Streamline-Freehand.svg',
    iconAlt: 'Brush and ruler',
    accent: 'var(--theme-accent-4)',
  },
]

/* ─── One numbered method tile ───────────────────────────────────────────── */
/*
 * Layout: the number is a small marker pinned top-left, NOT a centred badge —
 * two stacked centred badges (number over icon) ate ~42px of the ~170px column
 * and made the number compete with the icon for the same focal spot. Pinning it
 * leaves the icon square as the single centred hero.
 */
function MethodTile({ n, label, hint, icon, iconAlt, accent }) {
  return (
    <div
      style={{
        position: 'relative',
        flex: 1,
        minWidth: 0,
        height: '100%',
        borderRadius: 14,
        background: SURFACE_GLASS_STRONG,
        boxShadow: SHADOW_TILE,
        boxSizing: 'border-box',
        padding: '12px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        textAlign: 'center',
      }}
    >
      {/* Number marker — pinned top-left, on the brand fill.
          Centring is done with a single full-height line box: lineHeight equals
          the badge height, so the digit sits on the font's own vertical centre
          instead of being nudged by a hand-tuned padding. */}
      <div
        style={{
          position: 'absolute',
          top: 8,
          left: 8,
          width: BADGE,
          height: BADGE,
          borderRadius: '50%',
          background: FILL_PRIMARY,
          color: C_ON_PRIMARY,
          boxSizing: 'border-box',
          fontFamily: FONT_TITLE,
          fontSize: 13,
          fontWeight: 700,
          lineHeight: `${BADGE}px`,
          textAlign: 'center',
        }}
      >
        {n}
      </div>

      {/* Icon badge — rounded square, accent fill, soft shadow. */}
      <div
        style={{
          width: ICON_BOX,
          height: ICON_BOX,
          borderRadius: 10,
          background: accent,
          boxShadow: SHADOW_BADGE,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <img
          src={icon}
          alt={iconAlt}
          style={{
            width: ICON_IMG,
            height: ICON_IMG,
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>

      <p
        style={{
          margin: 0,
          fontFamily: FONT_TITLE,
          fontSize: 14,
          lineHeight: '17px',
          fontWeight: 700,
          letterSpacing: TRACKING_TITLE,
          color: C_TITLE,
        }}
      >
        {label}
      </p>

      <p
        style={{
          margin: 0,
          fontFamily: FONT_BODY,
          fontSize: 11,
          lineHeight: '14px',
          color: C_TEXT,
          opacity: 0.72,
        }}
      >
        {hint}
      </p>
    </div>
  )
}

export default function PromptTenXThumbnail() {
  return (
    <NewsletterThumbnailCanvas>
      {/* 30/38 rather than the 36/45 default — the title runs to two lines and
          the three-tile row below needs the height back. */}
      <NewsletterThumbnailTitle
        title="How to prompt to 10x AI results"
        highlightWord="10x AI results"
        fontSize={30}
        lineHeight={38}
      />
      <NewsletterThumbnailVisual variant="design">
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'center',
            gap: TILE_GAP,
            width: '100%',
            height: '100%',
          }}
        >
          {METHODS.map((m) => (
            <MethodTile
              key={m.n}
              n={m.n}
              label={m.label}
              hint={m.hint}
              icon={m.icon}
              iconAlt={m.iconAlt}
              accent={m.accent}
            />
          ))}
        </div>
      </NewsletterThumbnailVisual>
    </NewsletterThumbnailCanvas>
  )
}
