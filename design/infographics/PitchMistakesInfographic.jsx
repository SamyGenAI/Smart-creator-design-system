/**
 * PitchMistakesInfographic — 1080×1350px LinkedIn infographic.
 * Topic: 5 Pitch Mistakes That Kill Your Funding Round
 * Audience: Early-stage startup founders
 *
 * Layout:
 *   Header   — brand bar with accent-5 pill, title, subline
 *   Body     — vertical stack of 5 mistake cards (flex-row: badge | text | icon)
 *   Footer   — brand pill bar
 *
 * No hex, rgb(), hsl(), or hardcoded fontFamily strings in this file.
 * All color uses Tailwind tokens or var(--…) CSS variables.
 */

import InfographicCanvas from '../../components/InfographicCanvas.jsx'

const FONT_TITLE = "var(--font\\/family\\/title)"
const FONT_BODY = "var(--font\\/family\\/body)"

/* ── Card data ──────────────────────────────────────────────────────────── */

const MISTAKES = [
  {
    number: 1,
    mistake: "No clear problem statement",
    fix: "Lead with the pain, not the product.",
    icon: "/assets/icons/business/alerts-warning-triangle--Streamline-Freehand.svg",
  },
  {
    number: 2,
    mistake: "Vanity metrics over traction",
    fix: "Show retention, not just downloads.",
    icon: "/assets/icons/data/analytics-graph-stock--Streamline-Freehand.svg",
  },
  {
    number: 3,
    mistake: "Team slide as an afterthought",
    fix: "Investors back people first, ideas second.",
    icon: "/assets/icons/work-office/business-management-teamwork-clap--Streamline-Freehand.svg",
  },
  {
    number: 4,
    mistake: "Unrealistic financial projections",
    fix: "Model conservatively. Defend every number.",
    icon: "/assets/icons/data/trading-graph--Streamline-Freehand.svg",
  },
  {
    number: 5,
    mistake: "No ask clarity",
    fix: "Say the exact number and what it unlocks.",
    icon: "/assets/icons/money/money-bag-dollar--Streamline-Freehand.svg",
  },
]

/* ── Component ──────────────────────────────────────────────────────────── */

export default function PitchMistakesInfographic() {
  return (
    <InfographicCanvas data-name="PitchMistakesInfographic">
      {/* Inner column: 981px centered, full height flex col */}
      <div
        style={{
          width: 981,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          position: 'relative',
          zIndex: 1,
          padding: '28px 0',
          boxSizing: 'border-box',
        }}
        data-name="Main"
      >
        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <Header />

        {/* ── BODY — 5 mistake cards ──────────────────────────────────────── */}
        <div
          style={{
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            justifyContent: 'center',
          }}
          data-name="Body"
        >
          {MISTAKES.map((item) => (
            <MistakeCard key={item.number} {...item} />
          ))}
        </div>

        {/* ── FOOTER ─────────────────────────────────────────────────────── */}
        <Footer />
      </div>
    </InfographicCanvas>
  )
}

/* ── Header ─────────────────────────────────────────────────────────────── */

function Header() {
  return (
    <div
      style={{
        flexShrink: 0,
        background: 'var(--color\\/bg\\/brand)',
        borderRadius: 12,
        padding: '24px 36px 28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
      }}
      data-name="Header"
    >
      {/* Accent-5 pill label */}
      <div
        style={{
          background: 'var(--color\\/bg\\/accent\\/5)',
          borderRadius: 40,
          padding: '5px 18px',
          fontFamily: FONT_TITLE,
          fontSize: 13,
          fontWeight: 700,
          color: 'var(--text\\/primary)',
          letterSpacing: '0.4px',
          textTransform: 'uppercase',
        }}
      >
        INVESTOR PITCH
      </div>

      {/* Main headline */}
      <div
        style={{
          fontFamily: FONT_TITLE,
          fontSize: 46,
          fontWeight: 700,
          color: 'var(--text\\/invert)',
          lineHeight: 1.08,
          textAlign: 'center',
          letterSpacing: '-1px',
        }}
      >
        5 Pitch Mistakes That Kill<br />Your Funding Round
      </div>

      {/* Subline */}
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 16,
          fontWeight: 500,
          color: 'var(--text\\/invert)',
          opacity: 0.72,
          textAlign: 'center',
          lineHeight: 1.4,
          letterSpacing: '-0.2px',
        }}
      >
        What every early-stage founder needs to fix before the room goes cold.
      </div>
    </div>
  )
}

/* ── Mistake Card ────────────────────────────────────────────────────────── */

function MistakeCard({ number, mistake, fix, icon }) {
  const isOdd = number % 2 !== 0

  return (
    <div
      style={{
        background: isOdd
          ? 'var(--components\\/card\\/accent-4)'
          : 'var(--components\\/card\\/accent-1)',
        borderRadius: 7.95,
        border: '1px solid var(--border\\/secondary)',
        boxShadow: 'var(--shadow\\/elevation\\/200)',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
      }}
      data-name={`Card-${number}`}
    >
      {/* Numbered badge */}
      <NumberBadge number={number} />

      {/* Text block */}
      <div
        style={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          minWidth: 0,
        }}
      >
        <div
          style={{
            fontFamily: FONT_TITLE,
            fontSize: 18,
            fontWeight: 600,
            color: 'var(--text\\/primary)',
            lineHeight: 1.3,
            letterSpacing: '-0.3px',
          }}
        >
          {mistake}
        </div>
        <div
          style={{
            fontFamily: FONT_BODY,
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--theme-color-text-muted)',
            lineHeight: 1.4,
          }}
        >
          <span
            style={{
              fontWeight: 700,
              color: 'var(--color\\/bg\\/brand)',
            }}
          >
            Fix:
          </span>{' '}
          {fix}
        </div>
      </div>

      {/* Icon container */}
      <IconBox src={icon} />
    </div>
  )
}

/* ── Number Badge ────────────────────────────────────────────────────────── */

function NumberBadge({ number }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'var(--color\\/bg\\/brand)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONT_TITLE,
        fontSize: 22,
        fontWeight: 700,
        color: 'var(--text\\/invert)',
      }}
    >
      {number}
    </div>
  )
}

/* ── Icon Box ────────────────────────────────────────────────────────────── */

function IconBox({ src }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: 56,
        height: 56,
        borderRadius: 10,
        background: 'var(--color\\/bg\\/surface)',
        boxShadow: 'var(--shadow\\/elevation\\/100)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
      }}
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  )
}

/* ── Footer ──────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <div
      style={{
        flexShrink: 0,
        height: 60,
        background: 'var(--color\\/bg\\/brand)',
        borderRadius: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      data-name="Footer"
    >
      <span
        style={{
          fontFamily: FONT_TITLE,
          fontSize: 20,
          fontWeight: 600,
          color: 'var(--text\\/invert)',
          letterSpacing: '-0.3px',
        }}
      >
        Smart Creator&nbsp;&nbsp;·&nbsp;&nbsp;smartcreator.io
      </span>
    </div>
  )
}
