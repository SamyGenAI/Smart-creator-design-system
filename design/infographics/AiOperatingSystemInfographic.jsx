/**
 * AiOperatingSystemInfographic — 1080×1350 LinkedIn infographic
 *
 * Flowchart-style architecture diagram (Clay-table inspired).
 * Hub at top → splits into two parallel pipelines (OUTBOUND / INBOUND).
 *
 * Each pipeline is rendered as a series of phase containers (banded groups)
 * with numbered badges on the OUTSIDE-TOP-LEFT corner of each phase. Inside,
 * tool nodes show real app logos + their text label.
 *
 * Outbound uses cyan (accent-1). Inbound uses amber (accent-3) per user spec.
 *
 * LAYOUT (heights in px):
 *   Header        110
 *   gap            22
 *   Hub row       150
 *   gap            22
 *   Pipelines    986   (flex:1, two columns side-by-side with equal-height phases)
 *   Footer         60
 *   Total: 110+22+150+22+986+60 = 1350 ✓
 *
 * Pipeline column internal vertical budget (per side):
 *   Column label  46
 *   gap (label→phase 1)   18
 *   Phase 1      168
 *   arrow         34
 *   Phase 2      168
 *   arrow         34
 *   Phase 3      168
 *   arrow         34
 *   Phase 4      268
 *   Total: 46+18+168+34+168+34+168+34+268 = 938 (fits within 986)
 */

import React from 'react'
import InfographicCanvas from '../../components/InfographicCanvas.jsx'
import InfographicHeader from '../../components/InfographicHeader.jsx'
import InfographicFooter from '../../components/InfographicFooter.jsx'

/* ─── Token aliases (no raw chroma) ─────────────────────────────────────── */
const FONT_TITLE = "var(--font\\/family\\/title)"
const FONT_BODY  = "var(--font\\/family\\/body)"

const C_TEXT       = 'var(--theme-color-text-primary)'
const C_TEXT_SEC   = 'var(--theme-color-text-secondary)'
const C_TEXT_MUTED = 'var(--theme-color-text-muted)'
const C_BRAND      = 'var(--theme-color-primary)'
const C_ON_BRAND   = 'var(--theme-color-on-primary)'

// Outbound = cyan; Inbound = amber (per spec change)
const ACCENT_OUT = 'var(--theme-accent-1)'
const BORDER_OUT = 'var(--theme-border-1)'
const ACCENT_IN  = 'var(--theme-accent-3)'   // amber
const BORDER_IN  = 'var(--theme-border-3)'   // amber border

const SURFACE_GLASS_STRONG = 'var(--theme-surface-glass-strong)'
const SURFACE_LAYER_OUT    = 'var(--theme-surface-layer-1)'   // soft cyan band
const SURFACE_LAYER_IN     = 'var(--theme-surface-layer-3)'   // soft amber band
const SHADOW_CARD          = 'var(--theme-shadow-card)'

const LOGOS = {
  claudeCode: '/assets/logos/app/claude_code_logo.png',
  claude:     '/assets/logos/app/claude.ai.png',
  notion:     '/assets/logos/app/notion.com.png',
  figma:      '/assets/logos/app/figma.com.png',
  hubspot:    '/assets/logos/app/hubspot.com.png',
  powerpoint: '/assets/logos/app/powerpoint.png',
  linkedin:   '/assets/logos/app/linkedin.svg',
  x:          '/assets/logos/app/x.png',
  substack:   '/assets/logos/app/substack.png',
  exa:        '/assets/logos/app/exa-ai.png',
  rapidApi:   '/assets/logos/app/rapid-api.png',
  apify:      '/assets/logos/app/apify.png',
  googleSheet:'/assets/logos/app/google-sheet.png',
  salesforce: '/assets/logos/app/salesforce.png',
}

/* ─── ToolNode — logo tile + text label ─────────────────────────────────── */
function ToolNode({ label, logo, tone = 'out', width = 152 }) {
  const border = tone === 'out' ? BORDER_OUT : BORDER_IN
  return (
    <div
      style={{
        width,
        background: SURFACE_GLASS_STRONG,
        border: `2px solid ${border}`,
        borderRadius: 12,
        boxShadow: SHADOW_CARD,
        padding: '10px 8px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {/* Logo tile — glass effect, white solid border, drop shadow */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          background: 'var(--theme-surface-glass-default)',
          border: `2px solid ${C_ON_BRAND}`,
          boxShadow: '0 4px 10px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.10)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <img
          src={logo.src}
          alt={logo.alt}
          style={{ width: 36, height: 36, objectFit: 'contain' }}
        />
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: FONT_TITLE,
          fontSize: 13,
          fontWeight: 800,
          color: C_TEXT,
          lineHeight: 1.15,
          textAlign: 'center',
          letterSpacing: '-0.2px',
        }}
      >
        {label}
      </span>
    </div>
  )
}

/* ─── Phase container — banded group with EXTERNAL numbered badge ────────── */
function Phase({ n, label, tone = 'out', children, height }) {
  const surface = tone === 'out' ? SURFACE_LAYER_OUT : SURFACE_LAYER_IN
  const border = tone === 'out' ? BORDER_OUT : BORDER_IN
  const accent = tone === 'out' ? ACCENT_OUT : ACCENT_IN
  return (
    <div style={{ position: 'relative', height, flexShrink: 0 }}>
      {/* External number badge — sits on top-left corner OUTSIDE the section */}
      <div
        style={{
          position: 'absolute',
          top: -14,
          left: -10,
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: accent,
          border: `2.5px solid ${border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT_TITLE,
          fontSize: 17,
          fontWeight: 800,
          color: C_TEXT,
          lineHeight: 1,
          boxShadow: SHADOW_CARD,
          zIndex: 5,
        }}
      >
        {n}
      </div>

      {/* Section container */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: surface,
          border: `1.5px solid ${border}`,
          borderRadius: 16,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          padding: '12px 14px 14px',
          overflow: 'hidden',
        }}
      >
        {/* Title BADGE — INSIDE the section at top center, pill, navy fill */}
        <div
          style={{
            alignSelf: 'center',
            background: C_BRAND,
            borderRadius: 20,
            padding: '7px 16px',
            fontFamily: FONT_TITLE,
            fontSize: 15,
            fontWeight: 600,
            color: C_ON_BRAND,
            letterSpacing: '-0.3px',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            boxShadow: SHADOW_CARD,
            flexShrink: 0,
          }}
        >
          {label}
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 0,
            marginTop: 6,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

/* ─── Vertical arrow between phases ──────────────────────────────────────── */
function VerticalArrow({ height = 34, color = C_BRAND }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height, flexShrink: 0, width: '100%' }}>
      <svg width="14" height={height} viewBox={`0 0 14 ${height}`} fill="none" style={{ overflow: 'visible' }}>
        <line x1="7" y1="2" x2="7" y2={height - 10} stroke={color} strokeWidth="2" strokeLinecap="round" />
        <polygon points={`1,${height - 11} 13,${height - 11} 7,${height - 1}`} fill={color} />
      </svg>
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function AiOperatingSystemInfographic() {
  // Outbound phase contents
  const outboundPhases = [
    {
      n: 1,
      label: 'Ideate',
      height: 168,
      content: (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ToolNode
            label="Content ideas"
            logo={{ src: LOGOS.notion, alt: 'Notion' }}
            tone="out"
            width={164}
          />
        </div>
      ),
    },
    {
      n: 2,
      label: 'Write & design',
      height: 168,
      content: (
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: 8, width: '100%' }}>
          <ToolNode
            label="Writer"
            logo={{ src: LOGOS.claude, alt: 'Claude' }}
            tone="out"
            width={138}
          />
          <ToolNode
            label="Designer"
            logo={{ src: LOGOS.claude, alt: 'Claude' }}
            tone="out"
            width={138}
          />
        </div>
      ),
    },
    {
      n: 3,
      label: 'Produce assets',
      height: 168,
      content: (
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: 4, width: '100%' }}>
          <ToolNode
            label="Carousel"
            logo={{ src: LOGOS.figma, alt: 'Figma' }}
            tone="out"
            width={106}
          />
          <ToolNode
            label="Infographic"
            logo={{ src: LOGOS.figma, alt: 'Figma' }}
            tone="out"
            width={106}
          />
          <ToolNode
            label="Slide deck"
            logo={{ src: LOGOS.powerpoint, alt: 'PowerPoint' }}
            tone="out"
            width={106}
          />
        </div>
      ),
    },
    {
      n: 4,
      label: 'Publish',
      height: 268,
      content: (
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: 4, width: '100%' }}>
          <ToolNode
            label="LinkedIn"
            logo={{ src: LOGOS.linkedin, alt: 'LinkedIn' }}
            tone="out"
            width={106}
          />
          <ToolNode
            label="X"
            logo={{ src: LOGOS.x, alt: 'X' }}
            tone="out"
            width={106}
          />
          <ToolNode
            label="Substack"
            logo={{ src: LOGOS.substack, alt: 'Substack' }}
            tone="out"
            width={106}
          />
        </div>
      ),
    },
  ]

  // Inbound phase contents — matching heights with outbound
  const inboundPhases = [
    {
      n: 1,
      label: 'Capture & source',
      height: 168,
      content: (
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: 8, width: '100%' }}>
          <ToolNode
            label="Profile + site"
            logo={{ src: LOGOS.rapidApi, alt: 'RapidAPI' }}
            tone="in"
            width={138}
          />
          <ToolNode
            label="Find prospects"
            logo={{ src: LOGOS.exa, alt: 'Exa.ai' }}
            tone="in"
            width={138}
          />
        </div>
      ),
    },
    {
      n: 2,
      label: 'Score & tier',
      height: 168,
      content: (
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: 8, width: '100%' }}>
          <ToolNode
            label="Score leads"
            logo={{ src: LOGOS.claude, alt: 'Claude' }}
            tone="in"
            width={138}
          />
          <ToolNode
            label="Warm reactions"
            logo={{ src: LOGOS.apify, alt: 'Apify' }}
            tone="in"
            width={138}
          />
        </div>
      ),
    },
    {
      n: 3,
      label: 'Enrich & write',
      height: 168,
      content: (
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: 8, width: '100%' }}>
          <ToolNode
            label="Enrich"
            logo={{ src: LOGOS.exa, alt: 'Exa.ai' }}
            tone="in"
            width={138}
          />
          <ToolNode
            label="DMs"
            logo={{ src: LOGOS.claude, alt: 'Claude' }}
            tone="in"
            width={138}
          />
        </div>
      ),
    },
    {
      n: 4,
      label: 'Export & activate',
      height: 268,
      content: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          {/* Top: Google Sheets */}
          <ToolNode
            label="Export CSV"
            logo={{ src: LOGOS.googleSheet, alt: 'Google Sheets' }}
            tone="in"
            width={140}
          />

          {/* Fan-out connectors — single Y splitting to 3 children */}
          <svg width="280" height="22" viewBox="0 0 280 22" fill="none" style={{ flexShrink: 0 }}>
            {/* Trunk down */}
            <line x1="140" y1="0" x2="140" y2="8" stroke={C_BRAND} strokeWidth="2" />
            {/* Horizontal beam */}
            <line x1="40" y1="8" x2="240" y2="8" stroke={C_BRAND} strokeWidth="2" />
            {/* 3 drops with arrowheads */}
            <line x1="40" y1="8" x2="40" y2="16" stroke={C_BRAND} strokeWidth="2" />
            <polygon points="34,14 46,14 40,21" fill={C_BRAND} />
            <line x1="140" y1="8" x2="140" y2="16" stroke={C_BRAND} strokeWidth="2" />
            <polygon points="134,14 146,14 140,21" fill={C_BRAND} />
            <line x1="240" y1="8" x2="240" y2="16" stroke={C_BRAND} strokeWidth="2" />
            <polygon points="234,14 246,14 240,21" fill={C_BRAND} />
          </svg>

          {/* Bottom row: 3 destinations */}
          <div style={{ display: 'flex', justifyContent: 'space-around', gap: 4, width: '100%' }}>
            <ToolNode
              label="Notion"
              logo={{ src: LOGOS.notion, alt: 'Notion' }}
              tone="in"
              width={102}
            />
            <ToolNode
              label="Hubspot"
              logo={{ src: LOGOS.hubspot, alt: 'Hubspot' }}
              tone="in"
              width={102}
            />
            <ToolNode
              label="Salesforce"
              logo={{ src: LOGOS.salesforce, alt: 'Salesforce' }}
              tone="in"
              width={102}
            />
          </div>
        </div>
      ),
    },
  ]

  // Render one pipeline column
  const renderColumn = (label, accent, border, phases, tone) => (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Column label — original colored bar style (cyan / amber) */}
      <div
        style={{
          background: accent,
          border: `2px solid ${border}`,
          borderRadius: 10,
          padding: '11px 16px',
          textAlign: 'center',
          fontFamily: FONT_TITLE,
          fontSize: 18,
          fontWeight: 800,
          color: C_TEXT,
          letterSpacing: '0.6px',
          textTransform: 'uppercase',
          lineHeight: 1.1,
          boxShadow: SHADOW_CARD,
          marginBottom: 22,
          height: 46,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {label}
      </div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>

      {phases.map((p, i) => (
        <React.Fragment key={i}>
          <Phase n={p.n} label={p.label} tone={tone} height={p.height}>
            {p.content}
          </Phase>
          {i < phases.length - 1 && <VerticalArrow height={34} />}
        </React.Fragment>
      ))}
      </div>
    </div>
  )

  return (
    <InfographicCanvas>
      <div
        className="content-stretch flex flex-col items-center relative shrink-0 w-[981px]"
        style={{ gap: 22, height: '100%' }}
        data-name="Main"
      >
        {/* ── HEADER ──────────────────────────────────────────────── */}
        <div className="shrink-0 w-full" style={{ paddingTop: 8 }}>
          <InfographicHeader
            title="AI system for content & lead gen"
            highlightWord="AI system"
            subtitle="One brain. Two pipelines."
            titleStyle={{ fontSize: '56px', letterSpacing: '-1.68px' }}
            subtitleStyle={{ fontSize: '28px', letterSpacing: '-0.84px' }}
          />
        </div>

        {/* ── HUB ROW ─────────────────────────────────────────────── */}
        <div className="shrink-0 w-full" style={{ height: 150, position: 'relative' }}>
          {/* Hub card centered — black background, white text only */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              transform: 'translateX(-50%)',
              width: 480,
              height: 130,
              background: '#0b0d12',
              border: `3px solid ${C_ON_BRAND}`,
              borderRadius: 18,
              boxShadow: SHADOW_CARD,
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              padding: '0 26px',
              zIndex: 3,
            }}
          >
            {/* Logo (no tile background — sits directly on the black card) */}
            <div
              style={{
                width: 88,
                height: 88,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <img
                src={LOGOS.claudeCode}
                alt="Claude Code"
                style={{ width: 84, height: 84, objectFit: 'contain' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span
                style={{
                  fontFamily: FONT_TITLE,
                  fontSize: 11,
                  fontWeight: 800,
                  color: C_ON_BRAND,
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  opacity: 0.7,
                }}
              >
                Orchestrator
              </span>
              <span
                style={{
                  fontFamily: FONT_TITLE,
                  fontSize: 30,
                  fontWeight: 800,
                  color: C_ON_BRAND,
                  lineHeight: 1.05,
                  letterSpacing: '-0.9px',
                }}
              >
                Claude Code
              </span>
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 12,
                  fontWeight: 500,
                  fontStyle: 'italic',
                  color: C_ON_BRAND,
                  lineHeight: 1.3,
                  marginTop: 2,
                  opacity: 0.7,
                }}
              >
                Skills · MCPs · Subagents
              </span>
            </div>
          </div>

          {/* Split connectors: hub bottom-center → two column tops */}
          <svg
            width="981"
            height="60"
            viewBox="0 0 981 60"
            fill="none"
            style={{
              position: 'absolute',
              left: 0,
              top: 110,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <path
              d="M 490 0 C 490 30, 245 20, 245 60"
              stroke={C_BRAND}
              strokeWidth="2.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 490 0 C 490 30, 736 20, 736 60"
              stroke={C_BRAND}
              strokeWidth="2.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* ── PIPELINES — two columns, equal-height phases aligned ──── */}
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 17,
            flex: 1,
            minHeight: 0,
          }}
        >
          {renderColumn('Inbound · Content creation', ACCENT_OUT, BORDER_OUT, outboundPhases, 'out')}
          {renderColumn('Outbound · Lead generation', ACCENT_IN, BORDER_IN, inboundPhases, 'in')}
        </div>

        {/* ── FOOTER ──────────────────────────────────────────────── */}
        <InfographicFooter className="h-[60px] relative shrink-0 w-[1048px]" />
      </div>
    </InfographicCanvas>
  )
}
