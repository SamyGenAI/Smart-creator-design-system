/**
 * BulletProofAISystemInfographicV2 — 1080×1350 LinkedIn infographic.
 *
 * Faithful port of the Claude Design handoff prototype "Bulletproof AI System.html".
 * Two horizontal navy-glass sections:
 *   TOP    — "One codebase, three operators": Claude/Cursor/Codex on dark cards,
 *            dashed (no-arrowhead) lines converging on a black "One codebase" tile,
 *            blue caption strip below.
 *   BOTTOM — "Mirror your config, switch in one keystroke":
 *            ASCII file tree (left) + feature parity table (right).
 * Header: "The [bulletproof] AI system" with blue pill highlight + italic hook.
 */

import InfographicCanvas from '../../components/InfographicCanvas.jsx'
import InfographicFooter from '../../components/InfographicFooter.jsx'

const FONT_TITLE = "var(--font\\/family\\/title)"
const FONT_MONO = "'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace"

const C_BRAND = 'var(--theme-color-primary)'
const C_ON_BRAND = 'var(--theme-color-on-primary)'
const C_TEXT = 'var(--theme-color-text-primary)'
const C_TEXT_SEC = 'var(--theme-color-text-secondary)'
const C_TEXT_MUTED = 'var(--theme-color-text-muted)'
const ACCENT_BLUE_CHIP = 'var(--theme-accent-1)'
const ACCENT_BLUE_STROKE = 'var(--border\\/accent-1)'
const ACCENT_BLUE_BODY = 'rgba(126,218,255,0.18)'
const ACCENT_GREEN = '#a9ff3e'
const ACCENT_AMBER_BODY = '#fde68a'
const ACCENT_AMBER_STROKE = '#fcd34d'
const BORDER_GREY = '#e3e4eb'
const NEUTRAL_TXT = '#1f2330'
const NEUTRAL_DIM = '#717188'
const NEUTRAL_PREFIX = '#a8a9b2'
const SHADOW_CARD = 'var(--theme-shadow-card)'

const LOGOS = {
  claude: '/assets/logos/app/claude_code_logo.png',
  cursor: '/assets/logos/app/cursor.png',
  codex: '/assets/logos/app/codex-color.png',
}

/* ─── Header pill highlight ─────────────────────────────────── */

function PillHighlight({ word }) {
  return (
    <span
      style={{
        background: ACCENT_BLUE_CHIP,
        padding: '0 18px',
        borderRadius: 10,
        display: 'inline-block',
        transform: 'rotate(-1.5deg)',
        boxShadow: SHADOW_CARD,
      }}
    >
      {word}
    </span>
  )
}

function Header() {
  return (
    <div style={{ position: 'relative', padding: '50px 50px 0', textAlign: 'center' }}>
      <h1
        style={{
          fontFamily: FONT_TITLE,
          fontWeight: 700,
          fontSize: 72.948,
          letterSpacing: '-2.1884px',
          lineHeight: 1.02,
          color: C_BRAND,
          margin: 0,
        }}
      >
        The <PillHighlight word="bulletproof" />
        <br />
        AI system
      </h1>
      <div
        style={{
          fontSize: 28,
          fontWeight: 500,
          fontStyle: 'italic',
          letterSpacing: '-0.84px',
          color: C_BRAND,
          marginTop: 18,
          fontFamily: FONT_TITLE,
        }}
      >
        One codebase. Three operators. Zero lock-in.
      </div>
    </div>
  )
}

/* ─── Navy glass section (matches source HTML chrome) ───────── */

function NavySection({ title, children, bodyPad = '22px 24px 22px' }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.10)',
        border: `3px solid ${C_ON_BRAND}`,
        borderRadius: 20,
        padding: 4,
        boxShadow: SHADOW_CARD,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div
        style={{
          background: C_BRAND,
          borderRadius: 10,
          height: 54,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 22px',
          color: C_ON_BRAND,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontFamily: FONT_TITLE,
            fontSize: 23,
            fontWeight: 700,
            letterSpacing: '-0.69px',
            textAlign: 'center',
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ padding: bodyPad, flex: 1, minHeight: 0, position: 'relative' }}>
        {children}
      </div>
    </div>
  )
}

/* ─── Tool logo card (dark card w/ tinted radial glow) ──────── */

function ToolCard({ name, src, alt, tint, size = 102 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div
        style={{
          width: 116,
          height: 116,
          borderRadius: 22,
          background: '#0b0d12',
          border: `3px solid ${C_ON_BRAND}`,
          boxShadow: '0 8px 18px rgba(9,44,105,0.22), 0 2px 4px rgba(0,0,0,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 19,
            background: `radial-gradient(circle at 50% 55%, ${tint}33 0%, transparent 70%)`,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{ width: size, height: size, objectFit: 'contain' }}
          />
        </div>
      </div>
      <div
        style={{
          fontFamily: FONT_TITLE,
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: '-0.45px',
          color: C_ON_BRAND,
        }}
      >
        {name}
      </div>
    </div>
  )
}

/* ─── Top section: logos → codebase diagram ─────────────────── */

function LogosDiagram() {
  const W = 980
  const H = 248
  const cardY = 50
  const cardCenters = [W * 0.18, W * 0.5, W * 0.82]
  const baseY = 208
  const baseX = W * 0.5

  return (
    <div style={{ position: 'relative', width: '100%', height: H }}>
      {/* Dashed lines from each logo to the codebase tile (no arrowheads) */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {cardCenters.map((cx, i) => {
          const sx = cx
          const sy = cardY + 70
          const ex = baseX
          const ey = baseY - 38
          const mx = (sx + ex) / 2
          const my = sy + (ey - sy) * 0.55
          const d = `M ${sx} ${sy} C ${sx} ${my}, ${mx} ${my}, ${ex} ${ey}`
          return (
            <path
              key={i}
              d={d}
              stroke={C_BRAND}
              strokeOpacity="0.55"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
              fill="none"
            />
          )
        })}
      </svg>

      {/* Logo row */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          padding: '0 24px',
        }}
      >
        <ToolCard name="Claude Code" alt="Claude Code" src={LOGOS.claude} tint="#D97757" size={102} />
        <ToolCard name="Cursor"      alt="Cursor"      src={LOGOS.cursor} tint="#000000" size={90} />
        <ToolCard name="Codex"       alt="Codex"       src={LOGOS.codex}  tint="#10a37f" size={80} />
      </div>

      {/* Black codebase tile */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: baseY,
          transform: 'translate(-50%, -50%)',
          background: '#0b0d12',
          border: `3px solid ${C_ON_BRAND}`,
          borderRadius: 16,
          padding: '12px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          boxShadow: '0 6px 14px rgba(0,0,0,0.28)',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="34"
          height="34"
          fill="none"
          stroke={C_ON_BRAND}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="8 6 2 12 8 18" />
          <polyline points="16 6 22 12 16 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: FONT_TITLE,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '1.4px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            Your code
          </div>
          <div
            style={{
              fontFamily: FONT_TITLE,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '-0.6px',
              color: C_ON_BRAND,
            }}
          >
            One codebase
          </div>
        </div>
      </div>
    </div>
  )
}

function DiagramCaption() {
  return (
    <div
      style={{
        marginTop: 14,
        background: ACCENT_BLUE_BODY,
        border: `1.5px solid ${ACCENT_BLUE_STROKE}`,
        borderRadius: 12,
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke={C_BRAND}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        <path d="M17 1l4 4-4 4" />
        <path d="M3 11V9a4 4 0 014-4h14" />
        <path d="M7 23l-4-4 4-4" />
        <path d="M21 13v2a4 4 0 01-4 4H3" />
      </svg>
      <div
        style={{
          fontFamily: FONT_TITLE,
          fontSize: 17,
          fontWeight: 600,
          letterSpacing: '-0.4px',
          color: C_TEXT,
        }}
      >
        Same codebase. Hit a wall with one, switch operator, keep shipping.
      </div>
    </div>
  )
}

/* ─── File tree (ASCII style, mac chrome) ───────────────────── */

function FolderIcon({ color = NEUTRAL_DIM }) {
  return (
    <svg viewBox="0 0 24 18" width="22" height="17" style={{ flexShrink: 0 }}>
      <path
        d="M2 4 a2 2 0 0 1 2-2 h5 l2.2 2.2 h8.8 a2 2 0 0 1 2 2 v9.6 a2 2 0 0 1 -2 2 H4 a2 2 0 0 1 -2-2 Z"
        fill={color}
        stroke={NEUTRAL_TXT}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg viewBox="0 0 18 22" width="16" height="20" style={{ flexShrink: 0 }}>
      <path
        d="M2 2 h9 l5 5 v13 a1 1 0 0 1 -1 1 H2 a1 1 0 0 1 -1-1 V3 a1 1 0 0 1 1-1 Z"
        fill={C_ON_BRAND}
        stroke={NEUTRAL_TXT}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M11 2 v5 h5" fill="none" stroke={NEUTRAL_TXT} strokeWidth="1.2" />
    </svg>
  )
}

function TreeRow({ kind = 'folder', name, prefix, color, dim, bold }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        fontFamily: FONT_MONO,
        fontSize: 15.5,
        lineHeight: 1.35,
        color: dim ? NEUTRAL_DIM : NEUTRAL_TXT,
        fontWeight: bold ? 700 : 500,
      }}
    >
      <span style={{ color: NEUTRAL_PREFIX, whiteSpace: 'pre' }}>{prefix}</span>
      {kind === 'folder' ? <FolderIcon color={color} /> : <FileIcon />}
      <span style={{ color: color || (dim ? NEUTRAL_DIM : NEUTRAL_TXT) }}>{name}</span>
    </div>
  )
}

function FileTreePanel() {
  const claudeC = '#D97757'
  const cursorC = NEUTRAL_TXT
  const codexC = '#10a37f'

  return (
    <div
      style={{
        border: `1.5px solid ${BORDER_GREY}`,
        borderRadius: 12,
        padding: '14px 16px 14px 14px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: C_ON_BRAND,
      }}
    >
      {/* Faux finder chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <div style={{ width: 11, height: 11, borderRadius: 11, background: '#ff5f57' }} />
        <div style={{ width: 11, height: 11, borderRadius: 11, background: '#febc2e' }} />
        <div style={{ width: 11, height: 11, borderRadius: 11, background: '#28c840' }} />
        <div
          style={{
            marginLeft: 'auto',
            fontFamily: FONT_TITLE,
            fontSize: 12,
            fontWeight: 600,
            color: NEUTRAL_PREFIX,
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
          }}
        >
          my-project/
        </div>
      </div>

      <TreeRow prefix=""      kind="folder" name="my-project/"   color={C_BRAND}  bold />
      <TreeRow prefix="├─ "    kind="folder" name=".claude/"      color={claudeC} bold />
      <TreeRow prefix="│   ├─ " kind="folder" name="agents/"      dim />
      <TreeRow prefix="│   └─ " kind="folder" name="commands/"    dim />
      <TreeRow prefix="├─ "    kind="folder" name=".cursor/"      color={cursorC} bold />
      <TreeRow prefix="│   ├─ " kind="folder" name="agents/"      dim />
      <TreeRow prefix="│   └─ " kind="folder" name="commands/"    dim />
      <TreeRow prefix="├─ "    kind="folder" name=".codex/"       color={codexC}  bold />
      <TreeRow prefix="│   ├─ " kind="folder" name="agents/"      dim />
      <TreeRow prefix="│   └─ " kind="folder" name="commands/"    dim />
      <TreeRow prefix="├─ "    kind="folder" name="src/"          dim />
      <TreeRow prefix="└─ "    kind="file"   name="package.json"  dim />

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 10,
          borderTop: `1px dashed ${BORDER_GREY}`,
          fontFamily: FONT_TITLE,
          fontSize: 12.5,
          fontWeight: 500,
          color: '#323241',
          lineHeight: 1.35,
        }}
      >
        <strong style={{ color: C_BRAND }}>3 folders instead of 1.</strong>{' '}
        Same prompts, agents and slash commands, mirrored per operator.
      </div>
    </div>
  )
}

/* ─── Parity table ─────────────────────────────────────────── */

const FEATURES = [
  ['Subagents',       'parallel/specialized', 'yes', 'yes',     'yes'],
  ['Slash commands',  'reusable prompts',     'yes', 'limited', 'yes'],
  ['LLM agnostic',    'multi-model choice',   'no',  'yes',     'no'],
  ['MCP support',     'tool protocol',        'yes', 'yes',     'yes'],
  ['Native GUI IDE',  'editor surface',       'no',  'yes',     'no'],
  ['Tab autocomplete','inline suggestions',   'no',  'yes',     'no'],
  ['Cloud agents',    'background runs',      'yes', 'yes',     'yes'],
  ['Skills',          'SKILL.md workflows',   'yes', 'no',      'yes'],
  ['Code review',     'built-in',             'yes', 'yes',     'yes'],
  ['Open source',     '',                     'no',  'no',      'yes'],
]

function ParityCell({ value }) {
  if (value === 'yes') {
    return (
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 5,
          background: ACCENT_GREEN,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
        }}
      >
        <svg viewBox="0 0 14 14" width="13" height="13" fill="none">
          <path
            d="M2 7 L5.5 10.5 L12 4"
            stroke="#0b3a14"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  }
  if (value === 'no') {
    return (
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 5,
          background: 'rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
        }}
      >
        <svg viewBox="0 0 14 14" width="12" height="12" fill="none">
          <path
            d="M3 3 L11 11 M11 3 L3 11"
            stroke={NEUTRAL_DIM}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    )
  }
  return (
    <div
      style={{
        width: 50,
        height: 20,
        borderRadius: 5,
        background: ACCENT_AMBER_BODY,
        border: `1px solid ${ACCENT_AMBER_STROKE}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        fontFamily: FONT_TITLE,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.4px',
        color: '#7a5b00',
        textTransform: 'uppercase',
      }}
    >
      Partial
    </div>
  )
}

function ParityTable() {
  const colHeads = [
    { name: 'Claude', color: '#D97757' },
    { name: 'Cursor', color: NEUTRAL_TXT },
    { name: 'Codex',  color: '#10a37f' },
  ]

  return (
    <div
      style={{
        border: `1.5px solid ${BORDER_GREY}`,
        borderRadius: 12,
        padding: '10px 12px 10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: C_ON_BRAND,
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.55fr 0.6fr 0.6fr 0.6fr',
          alignItems: 'end',
          columnGap: 6,
          paddingBottom: 6,
          marginBottom: 4,
          borderBottom: `2px solid ${C_BRAND}`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_TITLE,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            color: C_BRAND,
          }}
        >
          Feature
        </div>
        {colHeads.map((c) => (
          <div
            key={c.name}
            style={{
              textAlign: 'center',
              fontWeight: 800,
              letterSpacing: '-0.4px',
              color: c.color,
              fontSize: 20,
              fontFamily: FONT_TITLE,
            }}
          >
            {c.name}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {FEATURES.map(([label, sub, c, cu, co], i) => (
          <div
            key={label}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.55fr 0.6fr 0.6fr 0.6fr',
              alignItems: 'center',
              columnGap: 6,
              padding: '4px 4px',
              background: i % 2 === 1 ? 'rgba(126,218,255,0.10)' : 'transparent',
              borderRadius: 4,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <div
                style={{
                  fontFamily: FONT_TITLE,
                  fontSize: 13.5,
                  fontWeight: 700,
                  letterSpacing: '-0.3px',
                  color: NEUTRAL_TXT,
                }}
              >
                {label}
              </div>
              {sub && (
                <div
                  style={{
                    fontFamily: FONT_TITLE,
                    fontSize: 10.5,
                    fontWeight: 500,
                    color: NEUTRAL_DIM,
                  }}
                >
                  {sub}
                </div>
              )}
            </div>
            <ParityCell value={c} />
            <ParityCell value={cu} />
            <ParityCell value={co} />
          </div>
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          marginTop: 6,
          paddingTop: 6,
          borderTop: `1px dashed ${BORDER_GREY}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          fontFamily: FONT_TITLE,
          fontSize: 11,
          fontWeight: 600,
          color: NEUTRAL_DIM,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 12, height: 12, background: ACCENT_GREEN, borderRadius: 3 }} /> yes
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span
            style={{
              width: 24,
              height: 12,
              background: ACCENT_AMBER_BODY,
              border: `1px solid ${ACCENT_AMBER_STROKE}`,
              borderRadius: 3,
            }}
          />{' '}
          partial
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 12, height: 12, background: 'rgba(0,0,0,0.10)', borderRadius: 3 }} /> no
        </span>
      </div>
    </div>
  )
}

/* ─── Main ──────────────────────────────────────────────────── */

export default function BulletProofAISystemInfographicV2() {
  return (
    <InfographicCanvas data-name="BulletProofAISystemInfographicV2">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: 1080,
          height: 1350,
        }}
      >
        <Header />

        {/* Two stacked navy sections, absolutely positioned to leave space for footer */}
        <div
          style={{
            position: 'absolute',
            top: 256,
            left: 40,
            right: 40,
            bottom: 132,
            display: 'grid',
            gridTemplateRows: 'minmax(0, 0.78fr) minmax(0, 1fr)',
            gap: 18,
          }}
        >
          <NavySection title="One codebase, three operators" bodyPad="14px 20px 14px">
            <LogosDiagram />
            <DiagramCaption />
          </NavySection>

          <NavySection title="Mirror your config files, switch in one click" bodyPad="14px 14px 14px">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '0.95fr 1.35fr',
                gap: 16,
                height: '100%',
              }}
            >
              <FileTreePanel />
              <ParityTable />
            </div>
          </NavySection>
        </div>

        {/* Footer pill */}
        <div style={{ position: 'absolute', left: 16, right: 16, bottom: 22 }}>
          <InfographicFooter className="h-[60px] relative w-full" name="Samy Chouaf" />
        </div>
      </div>
    </InfographicCanvas>
  )
}
