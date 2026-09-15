/**
 * SocialListeningThumbnail — 420×300 newsletter thumbnail.
 * Topic: "Social Listening routine"
 *
 * Visual: the flow diagram from SocialListeningInfographic, reduced to its
 * skeleton — the 6 sources grouped into one rounded glass square (3×2 grid)
 * → arrow → Claude hub tile → arrow → inbox tile. No labels, no captions, no
 * "How it works" section: at thumbnail scale only the logos and arrows read.
 * Grouping the sources instead of stacking them one-wide frees the width the
 * logos needed to grow.
 *
 * Tokens only — no chroma here (the infographic's local clay tile fill is
 * deliberately dropped so every tile stays brand-swappable).
 */
import NewsletterThumbnailCanvas from '../../components/newsletter-thumbnail/NewsletterThumbnailCanvas.jsx'
import NewsletterThumbnailTitle from '../../components/newsletter-thumbnail/NewsletterThumbnailTitle.jsx'
import NewsletterThumbnailVisual from '../../components/newsletter-thumbnail/NewsletterThumbnailVisual.jsx'

const C_TEXT = 'var(--theme-color-text-primary)'
const SURFACE_GLASS_STRONG = 'var(--theme-surface-glass-strong)'
const SHADOW_CARD = 'var(--theme-shadow-card)'
const SHADOW_CARD_SOFT = 'var(--theme-shadow-card-soft)'
// Same composed ambient lift as the infographic — two shadow tokens layered.
const SHADOW_TILE = `${SHADOW_CARD_SOFT}, ${SHADOW_CARD}`

const LOGOS = {
  linkedin: '/assets/logos/app/linkedin.svg',
  x: '/assets/logos/app/x.png',
  youtube: '/assets/logos/app/youtube.com.png',
  reddit: '/assets/logos/app/reddit.svg',
  google: '/assets/logos/app/google.com.png',
  gmail: '/assets/logos/app/google-gmail.png',
  claude: '/assets/logos/app/claude.ai.png',
}

/* ─── Geometry — scaled down from the infographic panel ──────────────────── */
// The visual area is ~388×157 after the title block and padding.
// Widths: 140 (sources) + 52 + 54 + 52 + 54 = 352, inside 388; the 140 square
// also leaves a little air top and bottom in the ~157px height.
const SOURCES_PANEL = 140
const SOURCES_PAD = 10
const SOURCES_GAP = 8
// 3 columns inside the panel: (140 - 2×10 - 2×8) / 3 = 34.7 per cell.
const SOURCE_IMG = 31
const HUB_TILE = 54
const HUB_IMG = 34
// The lane is wider than the arrow it draws; the difference becomes the
// breathing room between the arrow and the boxes on either side.
const ARROW_LANE_W = 52
const ARROW_W = 30

/**
 * Per-logo optical size multipliers.
 *
 * The assets are inconsistent: some are bare glyphs that fill their viewBox
 * edge-to-edge (X), others sit inside their own padding or badge background
 * (Reddit), and YouTube's play button is wide-and-short so an equal box makes
 * it read small. Scaling each to match perceived weight rather than box size.
 */
const SOURCE_SCALE = {
  x: 0.8,
  youtube: 1.22,
  reddit: 0.82,
  linkedin: 1.0,
  google: 1.0,
  gmail: 1.06,
}

/* ─── Logo tile ──────────────────────────────────────────────────────────── */
function LogoTile({ src, alt, size = HUB_TILE, imgSize = HUB_IMG, radius = 12 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: SURFACE_GLASS_STRONG,
        boxShadow: SHADOW_TILE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: imgSize, height: imgSize, objectFit: 'contain', display: 'block' }}
      />
    </div>
  )
}

/* ─── Sources panel — one glass square holding the 6 source logos (3×2) ──── */
function SourcesPanel({ sources }) {
  return (
    <div
      style={{
        width: SOURCES_PANEL,
        height: SOURCES_PANEL,
        borderRadius: 16,
        background: SURFACE_GLASS_STRONG,
        boxShadow: SHADOW_TILE,
        boxSizing: 'border-box',
        padding: SOURCES_PAD,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: SOURCES_GAP,
        placeItems: 'center',
        flexShrink: 0,
      }}
    >
      {sources.map((s) => (
        <div
          key={s.key}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={s.src}
            alt={s.alt}
            style={{
              width: SOURCE_IMG * (SOURCE_SCALE[s.key] ?? 1),
              height: SOURCE_IMG * (SOURCE_SCALE[s.key] ?? 1),
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>
      ))}
    </div>
  )
}

/* ─── Straight connector with arrowhead, drawn in its own lane ───────────── */
function StraightConnector({ width, height = 14 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      style={{ flexShrink: 0, overflow: 'visible' }}
    >
      <line
        x1="0"
        y1={height / 2}
        x2={width - 7}
        y2={height / 2}
        stroke={C_TEXT}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <polygon
        points={`${width - 8},${height / 2 - 4.5} ${width - 8},${height / 2 + 4.5} ${width},${height / 2}`}
        fill={C_TEXT}
      />
    </svg>
  )
}

const SOURCES = [
  { key: 'linkedin', src: LOGOS.linkedin, alt: 'LinkedIn' },
  { key: 'x', src: LOGOS.x, alt: 'X' },
  { key: 'youtube', src: LOGOS.youtube, alt: 'YouTube' },
  { key: 'reddit', src: LOGOS.reddit, alt: 'Reddit' },
  { key: 'google', src: LOGOS.google, alt: 'Google' },
  { key: 'gmail', src: LOGOS.gmail, alt: 'Gmail' },
]

export default function SocialListeningThumbnail() {
  return (
    <NewsletterThumbnailCanvas>
      <NewsletterThumbnailTitle
        title="Social Listening routine"
        highlightWord="Social Listening"
      />
      <NewsletterThumbnailVisual variant="design">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {/* SOURCES — one glass square grouping all 6 logos */}
          <SourcesPanel sources={SOURCES} />

          {/* ARROW LANE — sources → Claude */}
          <div
            style={{
              width: ARROW_LANE_W,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <StraightConnector width={ARROW_W} />
          </div>

          {/* CLAUDE HUB */}
          <LogoTile src={LOGOS.claude} alt="Claude" size={HUB_TILE} imgSize={HUB_IMG} radius={12} />

          {/* ARROW LANE — Claude → inbox */}
          <div
            style={{
              width: ARROW_LANE_W,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <StraightConnector width={ARROW_W} />
          </div>

          {/* INBOX — twin of the Claude hub */}
          <LogoTile src={LOGOS.gmail} alt="Your Inbox" size={HUB_TILE} imgSize={HUB_IMG} radius={12} />
        </div>
      </NewsletterThumbnailVisual>
    </NewsletterThumbnailCanvas>
  )
}
