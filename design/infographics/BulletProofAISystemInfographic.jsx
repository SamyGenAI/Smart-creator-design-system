/**
 * BulletProofAISystemInfographic — 1080×1350px LinkedIn infographic.
 * Topic: The bullet-proof AI system. Vendor-agnostic code base that works
 *        with Claude Code, Cursor, and Codex.
 *
 * LAYOUT (heights in px):
 *   Header     ~130
 *   gap          22
 *   Top GLASS  550   3 logos, dotted lines, codebase tile, caption below
 *   gap          22
 *   Bot GLASS  544   file tree (L) + feature parity table (R), with column subtitles
 *   gap          22
 *   Footer       60
 *   Total: 130+22+550+22+544+22+60 = 1350 ✓
 */

import InfographicCanvas from '../../components/InfographicCanvas.jsx'
import InfographicHeader from '../../components/InfographicHeader.jsx'
import InfographicFooter from '../../components/InfographicFooter.jsx'
import PrimaryGlassSection from '../../components/PrimaryGlassSection.jsx'

const FONT_BODY = 'var(--font\\/family\\/body)'
const FONT_TITLE = 'var(--font\\/family\\/title)'
const FONT_MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
const C_TEXT = 'var(--theme-color-text-primary)'
const C_TEXT_SEC = 'var(--theme-color-text-secondary)'
const C_TEXT_MUTED = 'var(--theme-color-text-muted)'
const C_BRAND = 'var(--theme-color-primary)'
const C_ON_BRAND = 'var(--theme-color-on-primary)'
const ACCENT_1 = 'var(--theme-accent-1)'
const ACCENT_2 = 'var(--theme-accent-2)'
const ACCENT_3 = 'var(--theme-accent-3)'
const ACCENT_4 = 'var(--theme-accent-4)'
const BORDER_NEUTRAL = 'var(--border\\/neutral-1)'

const LOGOS = {
  claude: '/assets/logos/app/claude_code_logo.png',
  cursor: '/assets/logos/app/cursor.png',
  codex: '/assets/logos/app/codex-color.png',
}

const ICONS = {
  codebase: '/assets/icons/programming-apps-websites/programming-hold-code--Streamline-Freehand.svg',
  folderClaude: '/assets/icons/programming-apps-websites/module-three-boxes--Streamline-Freehand.svg',
  folderCursor: '/assets/icons/programming-apps-websites/programming-keyboard-type--Streamline-Freehand.svg',
  folderCodex: '/assets/icons/programming-apps-websites/file-code-share-1--Streamline-Freehand.svg',
}

/* ── TOP SECTION ─────────────────────────────────────────────────────── */

function OperatorLogoTile({ name, imgSrc, tone }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div
        style={{
          width: 124,
          height: 124,
          background: C_ON_BRAND,
          border: `2.5px solid ${tone}`,
          borderRadius: 24,
          boxShadow: '0 12px 26px rgba(0,0,0,0.22), 0 0 0 5px rgba(255,255,255,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 18,
        }}
      >
        <img
          src={imgSrc}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
      <div
        style={{
          background: tone,
          borderRadius: 10,
          padding: '6px 16px',
          border: `2px solid ${C_TEXT}`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_TITLE,
            fontSize: 16,
            fontWeight: 800,
            color: C_TEXT,
            letterSpacing: '0.3px',
            lineHeight: 1.1,
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </span>
      </div>
    </div>
  )
}

function CodebaseTile() {
  return (
    <div
      style={{
        width: 280,
        background: C_TEXT,
        border: `2.5px solid ${C_ON_BRAND}`,
        borderRadius: 16,
        boxShadow: '0 14px 30px rgba(0,0,0,0.32)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Terminal chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '10px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.18)',
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--theme-accent-5)' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--theme-accent-3)' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--theme-accent-2)' }} />
        <span
          style={{
            marginLeft: 8,
            fontFamily: FONT_MONO,
            fontSize: 11,
            fontWeight: 700,
            color: ACCENT_1,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
          }}
        >
          your-codebase
        </span>
      </div>
      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '14px 18px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src={ICONS.codebase}
            alt="codebase"
            style={{ width: 46, height: 46, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span
              style={{
                fontFamily: FONT_TITLE,
                fontSize: 19,
                fontWeight: 800,
                color: C_ON_BRAND,
                lineHeight: 1.1,
                letterSpacing: '-0.4px',
              }}
            >
              One code base
            </span>
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: 11.5,
                fontWeight: 600,
                color: ACCENT_1,
                lineHeight: 1.2,
                letterSpacing: '0.4px',
              }}
            >
              vendor-agnostic
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: ACCENT_2, lineHeight: 1.3, fontWeight: 600 }}>
            ✓ .claude/
          </span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: ACCENT_2, lineHeight: 1.3, fontWeight: 600 }}>
            ✓ .cursor/
          </span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: ACCENT_2, lineHeight: 1.3, fontWeight: 600 }}>
            ✓ .codex/
          </span>
        </div>
      </div>
    </div>
  )
}

function OperatorDiagram() {
  const W = 945
  // Tile-stack: logo center 65 + half tile 62 + label pill ~38 = ~165,
  // arrow span ~70, codebase tile ~180. Reserve 395 to leave clearance for caption.
  const H = 395

  const logoY = 65
  const logos = [
    { x: 160, y: logoY, tone: ACCENT_3, name: 'Claude Code', src: LOGOS.claude },
    { x: W / 2, y: logoY, tone: ACCENT_1, name: 'Cursor',     src: LOGOS.cursor },
    { x: W - 160, y: logoY, tone: ACCENT_4, name: 'Codex',     src: LOGOS.codex },
  ]

  // Codebase tile placement (top edge at cbTop)
  const cbW = 280
  const cbTop = 225
  const cbCenterX = W / 2

  return (
    <div style={{ position: 'relative', width: W, height: H, margin: '0 auto' }}>
      {/* Dotted connector lines — drawn dark so they read on the light glass surface */}
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }}
      >
        <defs>
          <marker
            id="arrowhead-dark"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5.5"
            markerHeight="5.5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={C_TEXT} />
          </marker>
        </defs>

        {logos.map((l, i) => {
          const startX = l.x
          const startY = l.y + 105 // below the label pill
          // Three distinct landing points along the top edge of the codebase tile
          const landings = [cbCenterX - 95, cbCenterX, cbCenterX + 95]
          const endX = landings[i]
          const endY = cbTop - 4
          const c1x = startX
          const c1y = startY + 44
          const c2x = endX
          const c2y = endY - 40
          return (
            <path
              key={l.name}
              d={`M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`}
              fill="none"
              stroke={C_TEXT}
              strokeWidth="2.6"
              strokeDasharray="2 7"
              strokeLinecap="round"
              markerEnd="url(#arrowhead-dark)"
              opacity="0.9"
            />
          )
        })}
      </svg>

      {/* Logo tiles (above the SVG so their pills cover the line start cleanly) */}
      {logos.map((l) => (
        <div
          key={l.name}
          style={{
            position: 'absolute',
            left: l.x - 62,
            top: l.y - 62,
            width: 124,
            zIndex: 2,
          }}
        >
          <OperatorLogoTile name={l.name} imgSrc={l.src} tone={l.tone} />
        </div>
      ))}

      {/* Codebase tile (above the SVG so the line ends tuck under its top edge) */}
      <div
        style={{
          position: 'absolute',
          left: cbCenterX - cbW / 2,
          top: cbTop,
          width: cbW,
          zIndex: 2,
        }}
      >
        <CodebaseTile />
      </div>
    </div>
  )
}

/* ── BOTTOM LEFT: File tree ─────────────────────────────────────────── */

function FileTreeLine({ children, color, indent = 0, bold = false }) {
  return (
    <div
      style={{
        fontFamily: FONT_MONO,
        fontSize: 13,
        fontWeight: bold ? 700 : 500,
        color: color || C_ON_BRAND,
        lineHeight: '19px',
        whiteSpace: 'pre',
        paddingLeft: indent * 10,
      }}
    >
      {children}
    </div>
  )
}

function FolderBadge({ icon, label, tone, comment }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        padding: '9px 11px',
        background: 'rgba(255,255,255,0.07)',
        border: `1.5px solid ${tone}`,
        borderRadius: 11,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          flexShrink: 0,
          borderRadius: 8,
          background: tone,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={icon} alt={label} style={{ width: 24, height: 24, objectFit: 'contain' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 15,
            fontWeight: 800,
            color: C_ON_BRAND,
            lineHeight: 1.1,
            letterSpacing: '0.3px',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 12,
            fontWeight: 600,
            color: ACCENT_1,
            lineHeight: 1.25,
          }}
        >
          {comment}
        </span>
      </div>
    </div>
  )
}

function FileTreePanel() {
  return (
    <div
      style={{
        flex: 1,
        background: C_TEXT,
        border: `2px solid ${C_ON_BRAND}`,
        borderRadius: 14,
        padding: '16px 18px 18px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--theme-shadow-card)',
        minWidth: 0,
      }}
    >
      {/* Terminal chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 12 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--theme-accent-5)' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--theme-accent-3)' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--theme-accent-2)' }} />
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            fontWeight: 700,
            color: ACCENT_1,
            letterSpacing: '0.6px',
            marginLeft: 6,
            textTransform: 'uppercase',
          }}
        >
          your-codebase
        </span>
      </div>

      {/* File tree text — condensed so the badges fit without overflow */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 12 }}>
        <FileTreeLine bold>your-project/</FileTreeLine>
        <FileTreeLine>├── src/</FileTreeLine>
        <FileTreeLine>├── package.json</FileTreeLine>
        <FileTreeLine>├── .claude/</FileTreeLine>
        <FileTreeLine indent={1} color={ACCENT_1}>└── agents · commands</FileTreeLine>
        <FileTreeLine>├── .cursor/</FileTreeLine>
        <FileTreeLine indent={1} color={ACCENT_1}>└── agents · commands</FileTreeLine>
        <FileTreeLine>└── .codex/</FileTreeLine>
        <FileTreeLine indent={1} color={ACCENT_1}>└── agents · commands</FileTreeLine>
      </div>

      {/* Folder badges */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
        <FolderBadge
          icon={ICONS.folderClaude}
          label=".claude"
          tone={ACCENT_3}
          comment="subagents · slash cmds"
        />
        <FolderBadge
          icon={ICONS.folderCursor}
          label=".cursor"
          tone={ACCENT_1}
          comment="subagents · slash cmds"
        />
        <FolderBadge
          icon={ICONS.folderCodex}
          label=".codex"
          tone={ACCENT_4}
          comment="subagents · slash cmds"
        />
      </div>
    </div>
  )
}

/* ── BOTTOM RIGHT: Feature parity table ─────────────────────────────── */

const TABLE_ROWS = [
  { label: 'Subagents',        claude: 'yes', cursor: 'yes',     codex: 'yes' },
  { label: 'Slash commands',   claude: 'yes', cursor: 'limited', codex: 'yes' },
  { label: 'LLM agnostic',     claude: 'no',  cursor: 'yes',     codex: 'no'  },
  { label: 'MCP support',      claude: 'yes', cursor: 'yes',     codex: 'yes' },
  { label: 'Native GUI IDE',   claude: 'no',  cursor: 'yes',     codex: 'no'  },
  { label: 'Tab autocomplete', claude: 'no',  cursor: 'yes',     codex: 'no'  },
  { label: 'Cloud agents',     claude: 'yes', cursor: 'yes',     codex: 'yes' },
  { label: 'Skills',           claude: 'yes', cursor: 'no',      codex: 'yes' },
  { label: 'Code review',      claude: 'yes', cursor: 'yes',     codex: 'yes' },
  { label: 'Open source',      claude: 'no',  cursor: 'no',      codex: 'yes' },
]

function StatusGlyph({ kind }) {
  if (kind === 'yes') {
    return (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" fill={ACCENT_2} stroke={C_TEXT} strokeWidth="1.4" />
        <path d="M 5.5 10.5 L 8.7 13.5 L 14.5 7" stroke={C_TEXT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    )
  }
  if (kind === 'no') {
    return (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" fill="var(--theme-accent-4)" stroke={C_TEXT} strokeWidth="1.4" />
        <path d="M 6.5 6.5 L 13.5 13.5 M 13.5 6.5 L 6.5 13.5" stroke={C_TEXT} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      </svg>
    )
  }
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" fill={ACCENT_3} stroke={C_TEXT} strokeWidth="1.4" />
      <path d="M 5.5 10 L 14.5 10" stroke={C_TEXT} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

function ParityTable() {
  return (
    <div
      style={{
        flex: 1,
        background: 'var(--theme-surface-glass-strong)',
        border: `2px solid ${C_ON_BRAND}`,
        borderRadius: 14,
        padding: '14px 14px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--theme-shadow-card)',
        minWidth: 0,
      }}
    >
      {/* Table header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.55fr 0.85fr 0.85fr 0.85fr',
          alignItems: 'center',
          padding: '0 8px 10px',
          borderBottom: `1.5px solid ${C_TEXT}`,
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontFamily: FONT_TITLE,
            fontSize: 13,
            fontWeight: 800,
            color: C_TEXT_MUTED,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}
        >
          Feature
        </span>
        {['Claude', 'Cursor', 'Codex'].map((h) => (
          <span
            key={h}
            style={{
              fontFamily: FONT_TITLE,
              fontSize: 14,
              fontWeight: 800,
              color: C_TEXT,
              letterSpacing: '0.3px',
              textAlign: 'center',
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {TABLE_ROWS.map((row, i) => (
          <div
            key={row.label}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.55fr 0.85fr 0.85fr 0.85fr',
              alignItems: 'center',
              padding: '7px 8px',
              borderRadius: 8,
              background: i % 2 === 0 ? 'rgba(255,255,255,0.55)' : 'transparent',
            }}
          >
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: 14,
                fontWeight: 600,
                color: C_TEXT,
                lineHeight: 1.2,
              }}
            >
              {row.label}
            </span>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <StatusGlyph kind={row.claude} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <StatusGlyph kind={row.cursor} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <StatusGlyph kind={row.codex} />
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 16,
          marginTop: 10,
          paddingTop: 10,
          borderTop: `1px dashed ${BORDER_NEUTRAL}`,
        }}
      >
        {[
          { kind: 'yes',     label: 'Yes' },
          { kind: 'limited', label: 'Limited' },
          { kind: 'no',      label: 'No' },
        ].map((l) => (
          <div key={l.kind} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <StatusGlyph kind={l.kind} />
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: 12,
                fontWeight: 700,
                color: C_TEXT_SEC,
                letterSpacing: '0.3px',
              }}
            >
              {l.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Column subtitle bar (bottom section) ───────────────────────────── */

function ColumnSubtitle({ children, tone }) {
  return (
    <div
      style={{
        background: tone,
        border: `2px solid ${C_TEXT}`,
        borderRadius: 10,
        padding: '7px 14px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.10)',
        textAlign: 'center',
        marginBottom: 10,
      }}
    >
      <span
        style={{
          fontFamily: FONT_TITLE,
          fontSize: 16,
          fontWeight: 800,
          color: C_TEXT,
          letterSpacing: '-0.2px',
          lineHeight: 1.15,
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </span>
    </div>
  )
}

/* ── Main ─────────────────────────────────────────────────────────────── */

export default function BulletProofAISystemInfographic() {
  return (
    <InfographicCanvas data-name="BulletProofAISystemInfographic">
      <div
        className="content-stretch flex flex-col gap-[22px] h-full items-center justify-center relative shrink-0 w-[981px]"
        data-name="Main"
      >
        {/* ── HEADER ────────────────────────────────────────────────── */}
        <div className="max-h-[130px] overflow-hidden shrink-0 w-full">
          <InfographicHeader
            title="The bullet-proof AI system"
            highlightWord="bullet-proof"
            subtitle="Vendor-agnostic. Swap the operator, keep the code."
            titleStyle={{ fontSize: '54px', letterSpacing: '-1.62px' }}
            subtitleStyle={{ fontSize: '20px', letterSpacing: '-0.6px' }}
            allowWrap
          />
        </div>

        {/* ── TOP: Operator switching diagram ────────────────────────── */}
        <PrimaryGlassSection
          title="Same code base, easy switch between operators"
          className="h-[550px] w-[981px] shrink-0"
          titleSize="22px"
        >
          <div
            style={{
              flex: 1,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '8px 8px 14px',
              gap: 10,
            }}
          >
            <OperatorDiagram />
            <p
              style={{
                margin: 0,
                fontFamily: FONT_BODY,
                fontSize: 15,
                fontWeight: 600,
                fontStyle: 'italic',
                color: C_TEXT_SEC,
                lineHeight: 1.35,
                textAlign: 'center',
                maxWidth: 820,
              }}
            >
              Hit token limits on Claude? Switch to Cursor or Codex.
              <br />
              The code stays the same, only the operator changes.
            </p>
          </div>
        </PrimaryGlassSection>

        {/* ── BOTTOM: File tree + Feature parity table ──────────────── */}
        <PrimaryGlassSection
          title="3 folders, 3 operators, 1 code base"
          className="h-[544px] w-[981px] shrink-0"
          titleSize="22px"
        >
          <div
            style={{
              flex: 1,
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: 14,
              padding: '14px 14px 14px',
              alignItems: 'stretch',
              minHeight: 0,
            }}
          >
            {/* Left column: subtitle + file tree */}
            <div style={{ flex: '0 0 370px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <ColumnSubtitle tone={ACCENT_3}>The file structure</ColumnSubtitle>
              <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
                <FileTreePanel />
              </div>
            </div>
            {/* Right column: subtitle + parity table */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <ColumnSubtitle tone={ACCENT_1}>The feature parity</ColumnSubtitle>
              <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
                <ParityTable />
              </div>
            </div>
          </div>
        </PrimaryGlassSection>

        {/* ── FOOTER ────────────────────────────────────────────────── */}
        <InfographicFooter className="h-[60px] relative shrink-0 w-[1048px]" name="Smart Creator" />
      </div>
    </InfographicCanvas>
  )
}
