/**
 * SocialListeningInfographic — 1080×1350 LinkedIn infographic.
 * Topic: "Build a Social Listening Routine"
 *
 * LAYOUT (flex column, header/footer flex-none, body flex-1):
 *   Header
 *   Section 1 — full-width flow panel (981×610): 6 source logos (left column,
 *               stacked) feed by arrow into a Claude hub node, which connects
 *               by a second arrow to the twin "Your Inbox" node.
 *               Built as three flex siblings (left / middle / right) so the
 *               columns cannot overlap by construction — no absolute
 *               positioning is shared across columns.
 *   Section 2 — "How it works" — PrimaryGlassSection with a 4-step list.
 *   Footer
 */

import InfographicCanvas from '../../components/InfographicCanvas.jsx'
import InfographicHeader from '../../components/InfographicHeader.jsx'
import InfographicFooter from '../../components/InfographicFooter.jsx'
import PrimaryGlassSection from '../../components/PrimaryGlassSection.jsx'

const FONT_TITLE = 'var(--font\\/family\\/title)'
const FONT_BODY = 'var(--font\\/family\\/body)'

const C_TEXT = 'var(--theme-color-text-primary)'
const C_TEXT_SEC = 'var(--theme-color-text-secondary)'
const C_ON_PRIMARY = 'var(--theme-color-on-primary)'

// Local one-off: Anthropic-clay fill for the Claude hub tile only.
// Deliberately NOT a DESIGN.md token — this is specific to this infographic and
// must not leak into the shared brand system.
const C_CLAY = '#E8DACA'

const ACCENT_1 = 'var(--theme-accent-1)'
const ACCENT_3 = 'var(--theme-accent-3)'
const BORDER_1 = 'var(--theme-border-1)'

const SURFACE_GLASS_STRONG = 'var(--theme-surface-glass-strong)'
const SHADOW_CARD = 'var(--theme-shadow-card)'
const SHADOW_CARD_SOFT = 'var(--theme-shadow-card-soft)'
// Composed "premium" ambient lift — layers the two shadow tokens instead of
// inventing a literal rgba() value.
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

/* ─── Geometry constants (kept in one place so columns compose without overlap) ─── */
const PANEL_W = 981
const PANEL_H = 610
const SQUARE_PAD = 28
const INNER = PANEL_H - SQUARE_PAD * 2 // 554 — vertical space for the 6 source rows
const INNER_W = PANEL_W - SQUARE_PAD * 2 // 925
const LEFT_COL_W = 340
// Claude and Inbox are twin nodes; the arrow lane sits between them.
const ARROW_LANE_W = 72
const NODE_COL_W = (INNER_W - LEFT_COL_W - ARROW_LANE_W * 2) / 2 // 220.5 each
const TILE = 66
const HUB_TILE = 124

/* ─── Logo glass tile ────────────────────────────────────────────────────── */
function LogoTile({ src, alt, size = TILE, imgSize = 44, fullBleed = false }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 16,
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
        style={
          fullBleed
            ? { width: '100%', height: '100%', objectFit: 'cover', borderRadius: 13 }
            : { width: imgSize, height: imgSize, objectFit: 'contain' }
        }
      />
    </div>
  )
}

/* ─── Caption pill under each source tile ───────────────────────────────── */
function Caption({ children, accent = ACCENT_1 }) {
  return (
    <div
      style={{
        display: 'inline-block',
        background: accent,
        borderRadius: 10,
        padding: '6px 12px',
        width: 'fit-content',
        maxWidth: '100%',
        textAlign: 'left',
        fontFamily: FONT_BODY,
        fontSize: 15,
        fontWeight: 700,
        color: C_TEXT,
        lineHeight: 1.3,
        whiteSpace: 'normal',
      }}
    >
      {children}
    </div>
  )
}

/* ─── Source row: tile + label + caption ────────────────────────────────── */
function SourceRow({ src, alt, label, caption, fullBleed }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
      <LogoTile src={src} alt={alt} fullBleed={fullBleed} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0 }}>
        <span
          style={{
            fontFamily: FONT_TITLE,
            fontSize: 19,
            fontWeight: 800,
            color: C_TEXT,
            letterSpacing: '-0.2px',
            lineHeight: 1.1,
          }}
        >
          {label}
        </span>
        <Caption>{caption}</Caption>
      </div>
    </div>
  )
}

/* ─── Single straight connector (Claude → Your Inbox), drawn in its own lane ── */
function StraightConnector({ width, height }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" style={{ flexShrink: 0, overflow: 'visible' }}>
      <line x1="0" y1={height / 2} x2={width - 13} y2={height / 2} stroke={C_TEXT} strokeWidth="3" strokeLinecap="round" />
      <polygon points={`${width - 15},${height / 2 - 8} ${width - 15},${height / 2 + 8} ${width},${height / 2}`} fill={C_TEXT} />
    </svg>
  )
}

/* ─── Hub node — big tile + label + caption. Shared by Claude and Your Inbox
 *     so the two nodes stay visually twinned. ─────────────────────────────── */
function HubNode({ src, alt, label, tileBg, imgSize, caption, captionStyle }) {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: HUB_TILE,
          height: HUB_TILE,
          borderRadius: 24,
          background: tileBg,
          boxShadow: SHADOW_TILE,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={src} alt={alt} style={{ width: imgSize, height: imgSize, objectFit: 'contain' }} />
      </div>
      <span
        style={{
          fontFamily: FONT_TITLE,
          fontSize: 22,
          fontWeight: 800,
          color: C_TEXT,
          letterSpacing: '-0.4px',
          lineHeight: 1,
        }}
      >
        {label}
      </span>
      <div
        style={{
          borderRadius: 12,
          padding: '10px 12px',
          textAlign: 'center',
          fontFamily: FONT_BODY,
          fontSize: 20,
          lineHeight: 1.3,
          width: '100%',
          boxSizing: 'border-box',
          ...captionStyle,
        }}
      >
        {caption}
      </div>
    </div>
  )
}

const SOURCES = [
  { key: 'linkedin', src: LOGOS.linkedin, alt: 'LinkedIn', label: 'LinkedIn', caption: 'Competitor posts, engagement' },
  { key: 'x', src: LOGOS.x, alt: 'X', label: 'X', caption: 'Trending takes, threads' },
  { key: 'youtube', src: LOGOS.youtube, alt: 'YouTube', label: 'YouTube', caption: 'New videos, comments' },
  { key: 'reddit', src: LOGOS.reddit, alt: 'Reddit', label: 'Reddit', caption: 'Threads, comments', fullBleed: true },
  { key: 'google', src: LOGOS.google, alt: 'Google', label: 'Google (Web)', caption: 'News, fresh articles' },
  { key: 'gmail', src: LOGOS.gmail, alt: 'Gmail', label: 'Gmail (Newsletters)', caption: 'Newsletter roundups' },
]

const STEPS = [
  { n: '1', text: 'Open Claude Code.' },
  {
    n: '2',
    text:
      'Create a social listening skill: a watchlist of your favorite creators / competitors on each platform (LinkedIn, X, YouTube), plus the subreddits, newsletters, blogs ... that matter to you.',
  },
  {
    n: '3',
    text: 'Connect the data providers : EXA (web), APIFY (LinkedIn posts), X API, Gemini (YouTube), Gmail account (newsletters).',
  },
  { n: '4', text: 'Schedule a routine to send you a daily or weekly digest.' },
]

/* ─── Step row for "How it works" ────────────────────────────────────────── */
function StepRow({ n, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, width: '100%' }}>
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: ACCENT_1,
          border: `2px solid ${BORDER_1}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontFamily: FONT_TITLE,
          fontSize: 18,
          fontWeight: 800,
          color: C_TEXT,
          boxShadow: SHADOW_CARD,
        }}
      >
        {n}
      </div>
      <p
        style={{
          margin: 0,
          fontFamily: FONT_BODY,
          fontSize: 22,
          fontWeight: 600,
          color: C_TEXT_SEC,
          lineHeight: 1.4,
          paddingTop: 4,
        }}
      >
        {text}
      </p>
    </div>
  )
}

export default function SocialListeningInfographic() {
  return (
    <InfographicCanvas>
      <div
        className="content-stretch flex flex-col items-center relative shrink-0 w-[981px]"
        style={{ gap: 22, height: '100%' }}
        data-name="Main"
      >
        {/* ── HEADER ──────────────────────────────────────────────── */}
        <div className="shrink-0 w-full" style={{ paddingTop: 4 }}>
          <InfographicHeader
            title="Build a Social Listening Routine"
            highlightWord="Social Listening"
            subtitle="Scan LinkedIn, Reddit, YouTube, Newsletters and X on autopilot."
            titleStyle={{ fontSize: '62px', fontWeight: 900, letterSpacing: '-1.86px' }}
            subtitleStyle={{ fontSize: '32px', letterSpacing: '-0.5px' }}
            allowWrap
          />
        </div>

        {/* ── SECTION 1 — FLOW SQUARE ─────────────────────────────── */}
        <div className="shrink-0 w-full" style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              width: PANEL_W,
              height: PANEL_H,
              margin: '0 auto',
              borderRadius: 24,
              border: `2px solid ${BORDER_1}`,
              background: SURFACE_GLASS_STRONG,
              boxShadow: SHADOW_CARD,
              boxSizing: 'border-box',
              padding: SQUARE_PAD,
              display: 'flex',
              alignItems: 'stretch',
            }}
          >
            {/* LEFT COLUMN — 6 stacked source rows (fixed width, own flex box) */}
            <div
              style={{
                width: LEFT_COL_W,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {SOURCES.map((s) => (
                <SourceRow key={s.key} src={s.src} alt={s.alt} label={s.label} caption={s.caption} fullBleed={s.fullBleed} />
              ))}
            </div>

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
              <StraightConnector width={ARROW_LANE_W} height={30} />
            </div>

            {/* CLAUDE NODE */}
            <div
              style={{
                width: NODE_COL_W,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <HubNode
                src={LOGOS.claude}
                alt="Claude"
                label="Claude"
                tileBg={C_CLAY}
                imgSize={76}
                caption="Reads all 6 sources, finds what matters, drafts the digest."
                captionStyle={{
                  background: SURFACE_GLASS_STRONG,
                  border: `2px solid ${BORDER_1}`,
                  color: C_TEXT_SEC,
                  fontWeight: 600,
                }}
              />
            </div>

            {/* ARROW LANE — Claude → Your Inbox */}
            <div
              style={{
                width: ARROW_LANE_W,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <StraightConnector width={ARROW_LANE_W} height={30} />
            </div>

            {/* YOUR INBOX NODE — twin of the Claude node */}
            <div
              style={{
                width: NODE_COL_W,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <HubNode
                src={LOGOS.gmail}
                alt="Your Inbox"
                label="Your Inbox"
                tileBg={SURFACE_GLASS_STRONG}
                imgSize={80}
                caption="Weekly social listening digest on autopilot"
                captionStyle={{
                  background: ACCENT_3,
                  color: C_TEXT_SEC,
                  fontWeight: 700,
                }}
              />
            </div>
          </div>
        </div>

        {/* ── SECTION 2 — "HOW IT WORKS" ──────────────────────────── */}
        <div className="w-full flex-1" style={{ minHeight: 0 }}>
          <PrimaryGlassSection title="How it works" titleSize="36px" className="h-full w-full">
            <div
              style={{
                width: '100%',
                flex: 1,
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 16,
                padding: '16px 30px 18px',
                boxSizing: 'border-box',
              }}
            >
              {STEPS.map((s) => (
                <StepRow key={s.n} n={s.n} text={s.text} />
              ))}
            </div>
          </PrimaryGlassSection>
        </div>

        {/* ── FOOTER ──────────────────────────────────────────────── */}
        <InfographicFooter className="h-[60px] relative shrink-0 w-[1048px]" />
      </div>
    </InfographicCanvas>
  )
}
