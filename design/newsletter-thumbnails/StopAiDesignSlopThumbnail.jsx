/**
 * StopAiDesignSlopThumbnail — 420×300 newsletter thumbnail.
 * Topic: "How I fixed AI slop"
 *
 * Visual: a miniature of `design/infographics/AiDesignSystemInfographic.jsx`.
 * The infographic's vertical flow (Data Foundation -> Workflow -> Output ->
 * Publish / Edit manually) is turned sideways so it fits the ~388×170 visual
 * area, inside the same single glass shell. The node names, roles and example
 * badges stay in the infographic. At this scale each stage keeps only its
 * coloured icon chips, and the editor strip plus the destination logos carry
 * the brands.
 *
 * Output is the one brand-fill card, which makes it the focal point where the
 * flow turns into real channels.
 *
 * Tokens only — no chroma here.
 */
import NewsletterThumbnailCanvas from '../../components/newsletter-thumbnail/NewsletterThumbnailCanvas.jsx'
import NewsletterThumbnailTitle from '../../components/newsletter-thumbnail/NewsletterThumbnailTitle.jsx'
import NewsletterThumbnailVisual from '../../components/newsletter-thumbnail/NewsletterThumbnailVisual.jsx'

const C_TEXT = 'var(--theme-color-text-primary)'
const C_TEXT_SEC = 'var(--theme-color-text-secondary)'
const C_ON_PRIMARY = 'var(--theme-color-on-primary)'
const FILL_PRIMARY = 'var(--theme-color-primary)'
const GLASS_STRONG = 'var(--theme-surface-glass-strong)'
const GLASS_DEFAULT = 'var(--theme-surface-glass-default)'
const GLASS_SOFT = 'var(--theme-surface-glass-soft)'
const BORDER_NEUTRAL = C_ON_PRIMARY
const SHADOW_GLASS = 'var(--theme-shadow-surface-glass)'
const SHADOW_BADGE = 'var(--theme-shadow-surface-accent)'
const SHADOW_PRIMARY = 'var(--theme-shadow-surface-primary)'
const ICON_ON_PRIMARY_FILTER = 'var(--theme-on-primary-icon-filter)'
const FONT_TITLE = 'var(--font\\/family\\/title)'
const FONT_BODY = 'var(--font\\/family\\/body)'
const FONT_MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

const accent = (n) => ({ fill: `var(--theme-accent-${n})`, border: `var(--theme-border-${n})` })

/* ── Stage content: the same icons and accent assignment as the infographic ── */
const DATA_FOUNDATION = [
  { src: '/assets/icons/work-office/task-list-clipboard-check--Streamline-Freehand.svg', alt: 'CLAUDE.md', a: accent(1) },
  { src: '/assets/icons/design/color-brush-1--Streamline-Freehand.svg', alt: 'DESIGN.md', a: accent(2) },
  { src: '/assets/icons/internet-networks/cloud-storage-drive--Streamline-Freehand.svg', alt: 'assets', a: accent(3) },
  { src: '/assets/icons/programming-apps-websites/module-three-boxes--Streamline-Freehand.svg', alt: 'components', a: accent(4) },
]

const WORKFLOW = [
  { src: '/assets/icons/design/layers-stacked-1--Streamline-Freehand.svg', alt: 'skills', a: accent(1) },
  { src: '/assets/icons/business/settings-cog--Streamline-Freehand.svg', alt: 'scripts', a: accent(5) },
  { src: '/assets/icons/design/design-tool-magic-wand--Streamline-Freehand.svg', alt: 'templates', a: accent(3) },
  { src: '/assets/icons/programming-apps-websites/programming-user-code--Streamline-Freehand.svg', alt: 'Subagents', a: accent(2) },
]

const ICON_OUTPUT = '/assets/icons/programming-apps-websites/file-code-share-1--Streamline-Freehand.svg'

const EDITORS = [
  { src: '/assets/logos/app/Claude-code.png', label: 'Claude Code' },
  { src: '/assets/logos/app/codex-color.png', label: 'Codex' },
  { src: '/assets/logos/app/cursor.png', label: 'Cursor' },
]

/* Glyph sizes are the infographic's optical-equalization table scaled from
   its 52px tile down to this 22px tile, so the marks keep equal visual mass. */
const PUBLISH_LOGOS = [
  { src: '/assets/logos/app/linkedin.svg', alt: 'LinkedIn', glyph: 15 },
  { src: '/assets/logos/app/youtube.com.png', alt: 'YouTube', glyph: 20 },
  { src: '/assets/logos/app/substack.png', alt: 'Substack', glyph: 13 },
  { src: '/assets/logos/app/x.png', alt: 'X', glyph: 12 },
]

const EDIT_LOGOS = [
  { src: '/assets/logos/app/figma.com.png', alt: 'Figma', glyph: 16 },
  { src: '/assets/logos/app/canva.com.png', alt: 'Canva', glyph: 12 },
  { src: '/assets/logos/app/claude.ai.png', alt: 'Claude design', glyph: 18 },
]

/* ─── Geometry ───────────────────────────────────────────────────────────── */
const CHIP = 26
const LOGO_TILE = 22
const DEST_LABEL = 11
const DEST_LABEL_GAP = 3
const DEST_GROUP_GAP = 12
// One destination group = label row + gap + logo tile. The branch SVG is
// exactly as tall as the two groups, so its arrowheads land on each logo
// row's vertical centre by construction.
const DEST_GROUP_H = DEST_LABEL + DEST_LABEL_GAP + LOGO_TILE
const DEST_H = DEST_GROUP_H * 2 + DEST_GROUP_GAP
const BRANCH_W = 22

/* ─── Pieces ─────────────────────────────────────────────────────────────── */
function IconChip({ src, alt, a }) {
  return (
    <div
      style={{
        width: CHIP,
        height: CHIP,
        borderRadius: 8,
        background: a.fill,
        border: `1px solid ${a.border}`,
        boxShadow: SHADOW_BADGE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <img src={src} alt={alt} style={{ width: 16, height: 16, objectFit: 'contain', display: 'block' }} />
    </div>
  )
}

function StageLabel({ children, color = C_TEXT }) {
  return (
    <span
      style={{
        fontFamily: FONT_TITLE,
        fontSize: 11,
        fontWeight: 800,
        lineHeight: 1,
        color,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}

/* White glass stage card holding a 2×2 grid of icon chips. */
function StageCard({ label, items }) {
  return (
    <div
      style={{
        borderRadius: 12,
        background: GLASS_STRONG,
        border: `1.5px solid ${BORDER_NEUTRAL}`,
        boxShadow: SHADOW_GLASS,
        padding: '8px 9px 9px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 7,
        flexShrink: 0,
      }}
    >
      <StageLabel>{label}</StageLabel>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(2, ${CHIP}px)`, gap: 5 }}>
        {items.map((it) => (
          <IconChip key={it.alt} src={it.src} alt={it.alt} a={it.a} />
        ))}
      </div>
    </div>
  )
}

/* Output — the single brand-fill card. The icon is filtered to whatever reads
   on the brand fill, never a hardcoded invert. */
function OutputCard() {
  return (
    <div
      style={{
        borderRadius: 12,
        background: FILL_PRIMARY,
        boxShadow: SHADOW_PRIMARY,
        padding: '8px 8px 9px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        flexShrink: 0,
      }}
    >
      <StageLabel color={C_ON_PRIMARY}>Output</StageLabel>
      <img
        src={ICON_OUTPUT}
        alt="Design output"
        style={{ width: 26, height: 26, objectFit: 'contain', display: 'block', filter: ICON_ON_PRIMARY_FILTER }}
      />
      <span style={{ fontFamily: FONT_MONO, fontSize: 9, fontWeight: 800, color: C_ON_PRIMARY, lineHeight: 1 }}>
        design/
      </span>
    </div>
  )
}

function RightArrow() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" style={{ flexShrink: 0, display: 'block' }}>
      <line x1="1" y1="6" x2="8" y2="6" stroke={C_TEXT} strokeWidth="2" strokeLinecap="round" />
      <polygon points="7,1 13,6 7,11" fill={C_TEXT} />
    </svg>
  )
}

/* Fans out from the Output card's right edge to the two logo rows. */
function BranchArrow() {
  const mid = DEST_H / 2
  const yTop = DEST_LABEL + DEST_LABEL_GAP + LOGO_TILE / 2
  const yBot = DEST_GROUP_H + DEST_GROUP_GAP + yTop
  const endX = BRANCH_W - 6
  const curve = (y) => `M 1 ${mid} C ${BRANCH_W * 0.5} ${mid}, ${BRANCH_W * 0.3} ${y}, ${endX} ${y}`
  return (
    <svg width={BRANCH_W} height={DEST_H} viewBox={`0 0 ${BRANCH_W} ${DEST_H}`} fill="none" style={{ flexShrink: 0, display: 'block' }}>
      <path d={curve(yTop)} stroke={C_TEXT} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d={curve(yBot)} stroke={C_TEXT} strokeWidth="2" strokeLinecap="round" fill="none" />
      <polygon points={`${endX - 1},${yTop - 4} ${BRANCH_W},${yTop} ${endX - 1},${yTop + 4}`} fill={C_TEXT} />
      <polygon points={`${endX - 1},${yBot - 4} ${BRANCH_W},${yBot} ${endX - 1},${yBot + 4}`} fill={C_TEXT} />
    </svg>
  )
}

function LogoTile({ src, alt, glyph }) {
  return (
    <div
      style={{
        width: LOGO_TILE,
        height: LOGO_TILE,
        borderRadius: 6,
        background: GLASS_STRONG,
        border: `1px solid ${BORDER_NEUTRAL}`,
        boxShadow: SHADOW_BADGE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        flexShrink: 0,
      }}
    >
      <img src={src} alt={alt} style={{ width: glyph, height: glyph, objectFit: 'contain', display: 'block' }} />
    </div>
  )
}

function DestinationGroup({ label, logos }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: DEST_LABEL_GAP, height: DEST_GROUP_H }}>
      <span style={{ fontFamily: FONT_TITLE, fontSize: 10, fontWeight: 800, lineHeight: `${DEST_LABEL}px`, color: C_TEXT_SEC, whiteSpace: 'nowrap' }}>
        {label}
      </span>
      <div style={{ display: 'flex', gap: 4 }}>
        {logos.map((l) => (
          <LogoTile key={l.alt} src={l.src} alt={l.alt} glyph={l.glyph} />
        ))}
      </div>
    </div>
  )
}

function EditorPill({ src, label }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        background: GLASS_DEFAULT,
        border: `1px solid ${BORDER_NEUTRAL}`,
        borderRadius: 40,
        padding: '3px 9px 3px 4px',
        boxShadow: SHADOW_BADGE,
      }}
    >
      <img src={src} alt={label} style={{ width: 14, height: 14, objectFit: 'contain', display: 'block', flexShrink: 0 }} />
      <span style={{ fontFamily: FONT_BODY, fontSize: 10, fontWeight: 700, color: C_TEXT, lineHeight: 1, whiteSpace: 'nowrap' }}>
        {label}
      </span>
    </div>
  )
}

export default function StopAiDesignSlopThumbnail() {
  return (
    <NewsletterThumbnailCanvas>
      {/* 30/38 rather than the 36/45 default: the title sets on two lines and
          the flow diagram below needs the height back. */}
      <NewsletterThumbnailTitle
        title="How I fixed AI slop"
        highlightWord="AI slop"
        fontSize={30}
        lineHeight={38}
      />
      <NewsletterThumbnailVisual variant="design" padding={12}>
        {/* Single glass shell, as in the infographic. */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 16,
            background: GLASS_SOFT,
            border: `2px solid ${BORDER_NEUTRAL}`,
            boxShadow: SHADOW_GLASS,
            boxSizing: 'border-box',
            padding: '8px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            {EDITORS.map((e) => (
              <EditorPill key={e.label} src={e.src} label={e.label} />
            ))}
          </div>

          <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <StageCard label="Data" items={DATA_FOUNDATION} />
            <RightArrow />
            <StageCard label="Workflow" items={WORKFLOW} />
            <RightArrow />
            <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <OutputCard />
              <BranchArrow />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: DEST_GROUP_GAP, flexShrink: 0 }}>
              <DestinationGroup label="Publish" logos={PUBLISH_LOGOS} />
              <DestinationGroup label="Edit manually" logos={EDIT_LOGOS} />
            </div>
          </div>
        </div>
      </NewsletterThumbnailVisual>
    </NewsletterThumbnailCanvas>
  )
}
