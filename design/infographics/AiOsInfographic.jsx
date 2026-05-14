/**
 * AiOsInfographic — 1080×1350px LinkedIn infographic.
 * Topic: What is an AI OS? — definition, evolution line graph, 5 building blocks,
 *        tools, use cases, getting started.
 *
 * LAYOUT (heights in px):
 *   Header   ~100  — title + subtitle
 *   gap       22
 *   Row 1     70   — Definition strip (981 highlighted bar)
 *   gap       22
 *   Row 2    220   — Evolution line graph (981 glass)
 *   gap       22
 *   Row 3    270   — 5 Building Blocks (5 columns, real icons)
 *   gap       22
 *   Row 4    230   — Tools (481) + Use cases (483)
 *   gap       22
 *   Row 5    290   — Get started in 3 steps + file tree (981 glass)
 *   gap       22
 *   Footer    60
 *   Total: 100+22+70+22+220+22+270+22+230+22+290+22+60 = 1372 — trim header to ~78 for ≤1350
 *   Final header used: 78 → total 1350 ✓
 */

import InfographicCanvas from '../../components/InfographicCanvas.jsx'
import InfographicHeader from '../../components/InfographicHeader.jsx'
import InfographicFooter from '../../components/InfographicFooter.jsx'
import PrimaryGlassSection from '../../components/PrimaryGlassSection.jsx'

const FONT_BODY = 'var(--font\\/family\\/body)'
const FONT_TITLE = 'var(--font\\/family\\/title)'
const C_TEXT = 'var(--theme-color-text-primary)'
const C_TEXT_SEC = 'var(--theme-color-text-secondary)'
const C_TEXT_MUTED = 'var(--theme-color-text-muted)'
const C_BRAND = 'var(--theme-color-primary)'
const C_ON_BRAND = 'var(--theme-color-on-primary)'

const ICONS = {
  subagents: '/assets/icons/programming-apps-websites/programming-team-chat--Streamline-Freehand.svg',
  skills: '/assets/icons/programming-apps-websites/module-three-boxes--Streamline-Freehand.svg',
  markdown: '/assets/icons/design/notes-book-1--Streamline-Freehand.svg',
  mcps: '/assets/icons/programming-apps-websites/plugin-jigsaw-puzzle--Streamline-Freehand.svg',
  scripts: '/assets/icons/programming-apps-websites/file-code-share-1--Streamline-Freehand.svg',
  // tools / use cases
  autonomous: '/assets/icons/business/settings-cog-double-1--Streamline-Freehand.svg',
  interactive: '/assets/icons/programming-apps-websites/programming-keyboard-type--Streamline-Freehand.svg',
  async: '/assets/icons/business/time-stopwatch--Streamline-Freehand.svg',
  content: '/assets/icons/design/content-brush-pen--Streamline-Freehand.svg',
  gtm: '/assets/icons/data/trading-graph--Streamline-Freehand.svg',
  marketing: '/assets/icons/data/advertising-ad-browser--Streamline-Freehand.svg',
  product: '/assets/icons/programming-apps-websites/programming-code-idea--Streamline-Freehand.svg',
  // start
  install: '/assets/icons/internet-networks/download-harddrive-1--Streamline-Freehand.svg',
  context: '/assets/icons/business/edit-pen-write-paper--Streamline-Freehand.svg',
  connect: '/assets/icons/programming-apps-websites/plugin-hands-puzzle--Streamline-Freehand.svg',
}

/* ── Section 1: Definition strip ─────────────────────────────────────────── */

function DefinitionStrip() {
  return (
    <div
      style={{
        width: '100%',
        height: 70,
        display: 'flex',
        alignItems: 'center',
        background: 'var(--theme-surface-glass-strong)',
        border: `1.5px solid ${C_BRAND}`,
        borderRadius: 14,
        boxShadow: 'var(--theme-shadow-card)',
        padding: '0 18px',
        gap: 14,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          height: 32,
          padding: '0 14px',
          background: C_BRAND,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: FONT_TITLE,
            fontSize: 13,
            fontWeight: 800,
            color: C_ON_BRAND,
            letterSpacing: '0.8px',
            lineHeight: 1,
            textTransform: 'uppercase',
          }}
        >
          Definition
        </span>
      </div>
      <p
        style={{
          margin: 0,
          fontFamily: FONT_BODY,
          fontSize: 15,
          fontWeight: 500,
          color: C_TEXT,
          lineHeight: 1.35,
        }}
      >
        <span style={{ fontWeight: 700 }}>An AI OS</span> is an autonomous system that orchestrates{' '}
        <span style={{ background: 'var(--theme-accent-1)', padding: '1px 5px', borderRadius: 4, fontWeight: 700 }}>
          subagents, skills, markdown, MCPs &amp; scripts
        </span>{' '}
        to achieve your goal end-to-end.
      </p>
    </div>
  )
}

/* ── Section 2: Evolution line graph ─────────────────────────────────────── */

const PERIODS = [
  { year: '2023', label: 'Chatbots', sub: 'AI answers', tone: 'a1', x: 0.05, y: 0.9 },
  { year: '2024', label: 'Multimodal', sub: 'AI reads docs', tone: 'a3', x: 0.28, y: 0.78 },
  { year: '2025', label: 'Reasoning', sub: 'AI thinks', tone: 'a4', x: 0.5, y: 0.6 },
  { year: '2025+', label: 'Agents', sub: 'AI acts', tone: 'a2', x: 0.72, y: 0.34 },
  { year: '2026', label: 'AI OS', sub: 'AI orchestrates', tone: 'brand', x: 0.94, y: 0.06 },
]

function toneBg(tone) {
  switch (tone) {
    case 'a1': return 'var(--theme-accent-1)'
    case 'a2': return 'var(--theme-accent-2)'
    case 'a3': return 'var(--theme-accent-3)'
    case 'a4': return 'var(--theme-accent-4)'
    case 'a5': return 'var(--theme-accent-5)'
    case 'brand': return C_BRAND
    default: return 'var(--theme-surface-glass-strong)'
  }
}

function LineGraph() {
  // Render at native size — no preserveAspectRatio scaling, so SVG coords == CSS px.
  // The plot panel inside PrimaryGlassSection is ~945px wide × ~155px tall body.
  const W = 945
  const H = 155
  const PAD_L = 46
  const PAD_R = 12
  const PAD_T = 50   // headroom for callout labels above dots
  const PAD_B = 26   // room for year ticks
  const innerW = W - PAD_L - PAD_R
  const innerH = H - PAD_T - PAD_B

  const points = PERIODS.map((p) => ({
    ...p,
    px: PAD_L + p.x * innerW,
    py: PAD_T + p.y * innerH,
  }))

  // Smooth exponential-feel path using cubic curves
  const pathD = points
    .map((p, i) => {
      if (i === 0) return `M ${p.px} ${p.py}`
      const prev = points[i - 1]
      const cx1 = prev.px + (p.px - prev.px) * 0.55
      const cy1 = prev.py
      const cx2 = prev.px + (p.px - prev.px) * 0.5
      const cy2 = p.py
      return `C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.px} ${p.py}`
    })
    .join(' ')

  const areaD = `${pathD} L ${PAD_L + innerW} ${PAD_T + innerH} L ${PAD_L} ${PAD_T + innerH} Z`

  const yTicks = [
    { y: PAD_T + innerH * 0.05, label: 'High' },
    { y: PAD_T + innerH * 0.5, label: 'Mid' },
    { y: PAD_T + innerH * 0.95, label: 'Low' },
  ]

  return (
    <div style={{ width: W, height: H, position: 'relative', margin: '0 auto' }}>
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{ display: 'block' }}
      >
        {/* Y-axis label */}
        <text
          x={10}
          y={PAD_T + innerH / 2}
          fontFamily="Montserrat, sans-serif"
          fontSize="9"
          fontWeight="800"
          fill={C_TEXT_MUTED}
          textAnchor="middle"
          transform={`rotate(-90 10 ${PAD_T + innerH / 2})`}
          letterSpacing="1.2"
        >
          AUTONOMY
        </text>
        {/* Y-axis ticks */}
        {yTicks.map((t) => (
          <g key={t.label}>
            <line
              x1={PAD_L}
              x2={PAD_L + innerW}
              y1={t.y}
              y2={t.y}
              stroke="var(--theme-border-1)"
              strokeWidth="1"
              strokeDasharray="2 4"
              opacity="0.55"
            />
            <text
              x={PAD_L - 6}
              y={t.y + 3}
              fontFamily="Montserrat, sans-serif"
              fontSize="9"
              fontWeight="700"
              fill={C_TEXT_MUTED}
              textAnchor="end"
            >
              {t.label}
            </text>
          </g>
        ))}
        {/* X-axis baseline */}
        <line
          x1={PAD_L}
          x2={PAD_L + innerW}
          y1={PAD_T + innerH}
          y2={PAD_T + innerH}
          stroke={C_TEXT}
          strokeWidth="1.5"
        />
        {/* Area fill */}
        <path d={areaD} fill={C_BRAND} opacity="0.08" />
        {/* Line */}
        <path d={pathD} fill="none" stroke={C_BRAND} strokeWidth="2.5" strokeLinecap="round" />
        {/* Points + year ticks + year labels */}
        {points.map((p, i) => (
          <g key={p.label}>
            <line
              x1={p.px}
              x2={p.px}
              y1={PAD_T + innerH}
              y2={PAD_T + innerH + 4}
              stroke={C_TEXT}
              strokeWidth="1.2"
            />
            <text
              x={p.px}
              y={PAD_T + innerH + 18}
              fontFamily="Montserrat, sans-serif"
              fontSize="11"
              fontWeight="800"
              fill={C_TEXT}
              textAnchor="middle"
              letterSpacing="0.4"
            >
              {p.year}
            </text>
            <circle cx={p.px} cy={p.py} r={i === points.length - 1 ? 7 : 5} fill={C_BRAND} />
            <circle cx={p.px} cy={p.py} r={i === points.length - 1 ? 4 : 2.5} fill={C_ON_BRAND} />
          </g>
        ))}
      </svg>

      {/* TextBox callouts — sit directly above each dot with a small gap */}
      {points.map((p, i) => {
        const isLast = i === points.length - 1
        const boxW = 100
        const boxH = 34
        const gap = 6  // gap between callout bottom and dot
        // Center callout on dot x, clamped horizontally within the plot
        const leftPx = Math.max(2, Math.min(W - boxW - 2, p.px - boxW / 2))
        // Place callout so its bottom sits `gap` px above the dot
        const topPx = Math.max(2, p.py - boxH - gap)
        return (
          <div
            key={p.label}
            style={{
              position: 'absolute',
              left: leftPx,
              top: topPx,
              width: boxW,
              pointerEvents: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                background: toneBg(p.tone),
                border: `1.5px solid ${isLast ? C_BRAND : C_ON_BRAND}`,
                borderRadius: 6,
                padding: '3px 8px',
                boxShadow: 'var(--theme-shadow-card)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 72,
                height: boxH,
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: FONT_TITLE,
                  fontSize: 11,
                  fontWeight: 700,
                  color: isLast ? C_ON_BRAND : C_TEXT,
                  lineHeight: 1.1,
                  whiteSpace: 'nowrap',
                }}
              >
                {p.label}
              </span>
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 9,
                  fontWeight: 600,
                  color: isLast ? C_ON_BRAND : C_TEXT_SEC,
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                }}
              >
                {p.sub}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Section 3: 5 Building Blocks (with real icons) ─────────────────────── */

const BLOCKS = [
  { icon: ICONS.subagents, title: 'Subagents', desc: 'Parallel workers, isolated context.', tone: 'a1' },
  { icon: ICONS.skills, title: 'Skills', desc: 'Auto-loaded expertise packages.', tone: 'a3' },
  { icon: ICONS.markdown, title: 'Markdown', desc: 'Long-term memory & SOPs.', tone: 'a4' },
  { icon: ICONS.mcps, title: 'MCPs', desc: 'The USB-C of AI tools.', tone: 'a2' },
  { icon: ICONS.scripts, title: 'Scripts', desc: 'Deterministic execution.', tone: 'a5' },
]

function BlockCard({ icon, title, desc, tone }) {
  return (
    <div
      style={{
        flex: 1,
        background: 'var(--theme-surface-glass-strong)',
        border: '1.5px solid var(--theme-color-on-primary)',
        borderRadius: 12,
        padding: '14px 10px 12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 8,
        boxShadow: 'var(--theme-shadow-card)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent band */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: toneBg(tone),
        }}
      />
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          background: toneBg(tone),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 6,
        }}
      >
        <img
          src={icon}
          alt={title}
          style={{ width: 40, height: 40, objectFit: 'contain' }}
        />
      </div>
      <span
        style={{
          fontFamily: FONT_TITLE,
          fontSize: 15,
          fontWeight: 700,
          color: C_TEXT,
          lineHeight: 1.1,
          marginTop: 2,
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 11,
          fontWeight: 500,
          color: C_TEXT_SEC,
          lineHeight: 1.35,
        }}
      >
        {desc}
      </span>
    </div>
  )
}

/* ── Section 4: Tools cards ──────────────────────────────────────────────── */

const TOOLS = [
  {
    name: 'Claude Code',
    icon: ICONS.autonomous,
    tag: 'Autonomous',
    metric: '46%',
    metricLabel: 'most loved',
    note: '~1M ctx · Skills + MCP · long-horizon work',
    tone: 'a1',
  },
  {
    name: 'Cursor',
    icon: ICONS.interactive,
    tag: 'Interactive',
    metric: 'Multi',
    metricLabel: 'model routing',
    note: 'IDE-first · Claude · GPT-5 · Gemini · cloud agents',
    tone: 'a3',
  },
  {
    name: 'Codex',
    icon: ICONS.async,
    tag: 'Async',
    metric: '3M+',
    metricLabel: 'weekly users',
    note: 'Sandboxed VM · async PR delivery',
    tone: 'a4',
  },
]

function ToolCard({ name, icon, tag, metric, metricLabel, note, tone }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 10px',
        background: 'var(--theme-surface-glass-strong)',
        border: '1.5px solid var(--theme-color-on-primary)',
        borderRadius: 10,
        boxShadow: 'var(--theme-shadow-card)',
      }}
    >
      {/* Icon tile */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: toneBg(tone),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <img src={icon} alt={name} style={{ width: 28, height: 28, objectFit: 'contain' }} />
      </div>
      {/* Name + note */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              fontFamily: FONT_TITLE,
              fontSize: 14,
              fontWeight: 800,
              color: C_TEXT,
              lineHeight: 1.1,
            }}
          >
            {name}
          </span>
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: 8.5,
              fontWeight: 800,
              color: C_BRAND,
              background: 'var(--theme-accent-1)',
              padding: '1px 6px',
              borderRadius: 8,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              lineHeight: 1.3,
            }}
          >
            {tag}
          </span>
        </div>
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 10.5,
            fontWeight: 500,
            color: C_TEXT_SEC,
            lineHeight: 1.3,
            display: 'block',
          }}
        >
          {note}
        </span>
      </div>
      {/* Metric */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          borderLeft: '1.5px solid var(--theme-border-1)',
          paddingLeft: 10,
          marginLeft: 2,
          minWidth: 64,
        }}
      >
        <span
          style={{
            fontFamily: FONT_TITLE,
            fontSize: 18,
            fontWeight: 800,
            color: C_BRAND,
            lineHeight: 1,
            letterSpacing: '-0.5px',
          }}
        >
          {metric}
        </span>
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 8,
            fontWeight: 700,
            color: C_TEXT_MUTED,
            lineHeight: 1.2,
            textTransform: 'uppercase',
            letterSpacing: '0.4px',
            marginTop: 2,
            whiteSpace: 'nowrap',
          }}
        >
          {metricLabel}
        </span>
      </div>
    </div>
  )
}

/* ── Section 4b: Use case rows ───────────────────────────────────────────── */

const USE_CASES = [
  { icon: ICONS.content, label: 'Content', note: 'Carousels, videos, newsletters', tone: 'a1' },
  { icon: ICONS.gtm, label: 'GTM', note: 'Sourcing, scoring, outbound', tone: 'a3' },
  { icon: ICONS.marketing, label: 'Marketing', note: 'Briefs, creative, reports', tone: 'a4' },
  { icon: ICONS.product, label: 'Product', note: 'Specs, refactors, QA, docs', tone: 'a2' },
]

function UseCaseRow({ icon, label, note, tone }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 8px',
        background: 'var(--theme-surface-glass-strong)',
        border: '1.5px solid var(--theme-color-on-primary)',
        borderRadius: 8,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: toneBg(tone),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <img src={icon} alt={label} style={{ width: 22, height: 22, objectFit: 'contain' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
        <span
          style={{
            fontFamily: FONT_TITLE,
            fontSize: 12.5,
            fontWeight: 800,
            color: C_TEXT,
            lineHeight: 1.15,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 10.5,
            fontWeight: 500,
            color: C_TEXT_SEC,
            lineHeight: 1.25,
          }}
        >
          {note}
        </span>
      </div>
    </div>
  )
}

/* ── Section 5: Get started ──────────────────────────────────────────────── */

function StartStep({ n, title, desc }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: '12px 14px',
        background: 'var(--theme-surface-glass-strong)',
        border: '1.5px solid var(--theme-color-on-primary)',
        borderRadius: 10,
        boxShadow: 'var(--theme-shadow-card)',
        position: 'relative',
        minHeight: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          paddingBottom: 8,
          borderBottom: '1px dashed var(--theme-border-1)',
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: C_TEXT,
            color: C_ON_BRAND,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: FONT_TITLE,
            fontWeight: 800,
            fontSize: 15,
            flexShrink: 0,
          }}
        >
          {n}
        </div>
        <span
          style={{
            fontFamily: FONT_TITLE,
            fontSize: 14,
            fontWeight: 800,
            color: C_TEXT,
            lineHeight: 1.15,
          }}
        >
          {title}
        </span>
      </div>
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 12,
          fontWeight: 500,
          color: C_TEXT_SEC,
          lineHeight: 1.4,
          margin: 0,
        }}
      >
        {desc}
      </p>
    </div>
  )
}

function FileTreePanel() {
  const Line = ({ children, dim = false, indent = 0 }) => (
    <div
      style={{
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
        fontSize: 10,
        fontWeight: 500,
        color: dim ? 'var(--theme-accent-1)' : C_ON_BRAND,
        lineHeight: '14px',
        whiteSpace: 'pre',
        paddingLeft: indent * 8,
      }}
    >
      {children}
    </div>
  )
  return (
    <div
      style={{
        flex: 1.05,
        background: C_BRAND,
        borderRadius: 10,
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--theme-shadow-card)',
        overflow: 'hidden',
      }}
    >
      {/* Terminal-style chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--theme-accent-5)' }} />
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--theme-accent-3)' }} />
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--theme-accent-2)' }} />
        <span
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
            fontSize: 9.5,
            fontWeight: 700,
            color: 'var(--theme-accent-1)',
            letterSpacing: '0.6px',
            marginLeft: 6,
            textTransform: 'uppercase',
          }}
        >
          your-project ~
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Line>your-project/</Line>
        <Line>├── CLAUDE.md          <span style={{ color: 'var(--theme-accent-1)' }}># memory</span></Line>
        <Line>├── .mcp.json          <span style={{ color: 'var(--theme-accent-1)' }}># MCPs</span></Line>
        <Line>└── .claude/</Line>
        <Line indent={1}>├── agents/        <span style={{ color: 'var(--theme-accent-1)' }}># subagents</span></Line>
        <Line indent={1}>├── skills/        <span style={{ color: 'var(--theme-accent-1)' }}># skills</span></Line>
        <Line indent={1}>└── commands/      <span style={{ color: 'var(--theme-accent-1)' }}># slash cmds</span></Line>
      </div>
    </div>
  )
}

/* ── SectionCard — local section wrapper with themed colored header, no badge ── */

/**
 * headerTone:
 *   'primary' → cyan header (matches old BrandBorderSectionBase theme="primary")
 *   'accent'  → orange header (theme="accent")
 *   'support' → pink header   (theme="support")
 *   'success' → green header  (theme="success")
 *
 * Title text is black on colored headers (matches old behavior — only the
 * navy `PrimaryGlassSection` header uses white text, and that component is
 * still used for the evolution graph + start steps).
 */
const SECTION_TONES = {
  primary: { bar: 'var(--theme-accent-1)', border: 'var(--theme-border-1)', card: 'var(--theme-surface-layer-4)' },
  accent:  { bar: 'var(--theme-border-5)', border: 'var(--theme-border-5)', card: 'var(--theme-surface-layer-6)' },
  support: { bar: 'var(--theme-border-4)', border: 'var(--theme-border-4)', card: 'var(--theme-surface-layer-2)' },
  success: { bar: 'var(--theme-border-2)', border: 'var(--theme-border-2)', card: 'var(--theme-surface-layer-5)' },
}

function SectionCard({
  title,
  width = 981,
  height,
  children,
  bodyPadding = '8px 14px 10px',
  headerTone = 'primary',
}) {
  const tone = SECTION_TONES[headerTone] || SECTION_TONES.primary
  return (
    <div
      style={{
        width,
        height,
        flexShrink: 0,
        background: tone.card,
        border: `1px solid ${tone.border}`,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Colored header bar — mirrors old BrandBorderSectionBase header styling */}
      <div
        style={{
          height: 51,
          background: tone.bar,
          borderBottom: `2px solid ${tone.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: FONT_TITLE,
            fontSize: 20,
            fontWeight: 700,
            color: C_TEXT,
            letterSpacing: '-0.6px',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </span>
      </div>
      {/* Body */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: bodyPadding,
          minHeight: 0,
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* ── Main component ──────────────────────────────────────────────────────── */

export default function AiOsInfographic() {
  return (
    <InfographicCanvas data-name="AiOsInfographic">
      <div
        className="content-stretch flex flex-col gap-[22px] h-full items-center justify-center relative shrink-0 w-[981px]"
        data-name="Main"
      >
        {/* ── HEADER ───────────────────────────────────────────────────── */}
        <div className="max-h-[100px] overflow-hidden shrink-0 w-full">
          <InfographicHeader
            title="What is an AI OS?"
            highlightWord="AI OS"
            subtitle="The stack that runs the workflow"
            titleStyle={{ fontSize: '58px', letterSpacing: '-1.74px' }}
            subtitleStyle={{ fontSize: '20px', letterSpacing: '-0.6px' }}
          />
        </div>

        {/* ── ROW 1 — Definition strip ─────────────────────────────────── */}
        <div className="w-[981px] shrink-0">
          <DefinitionStrip />
        </div>

        {/* ── ROW 2 — Evolution line graph ─────────────────────────────── */}
        <PrimaryGlassSection
          title="The evolution of AI"
          className="h-[220px] w-[981px] shrink-0"
          titleSize="20px"
        >
          <div style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'center', padding: '0 4px' }}>
            <LineGraph />
          </div>
        </PrimaryGlassSection>

        {/* ── ROW 3 — 5 Building blocks ────────────────────────────────── */}
        <SectionCard
          title="The 5 building blocks of an AI OS"
          headerTone="primary"
          width={981}
          height={270}
          bodyPadding="10px 12px 12px"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              width: '100%',
              flex: 1,
              alignItems: 'stretch',
            }}
          >
            {BLOCKS.map((b) => (
              <BlockCard key={b.title} {...b} />
            ))}
          </div>
        </SectionCard>

        {/* ── ROW 4 — Tools + Use cases ────────────────────────────────── */}
        <div className="flex flex-row gap-[17px] w-full shrink-0">
          <SectionCard
            title="The tools"
            headerTone="accent"
            width={481}
            height={230}
            bodyPadding="8px 10px 8px"
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 7,
                width: '100%',
              }}
            >
              {TOOLS.map((t) => (
                <ToolCard key={t.name} {...t} />
              ))}
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 10,
                  fontWeight: 600,
                  fontStyle: 'italic',
                  color: C_TEXT_MUTED,
                  lineHeight: 1.3,
                  margin: '2px 4px 0',
                  textAlign: 'center',
                }}
              >
                Serious builders run Claude Code + Cursor together.
              </p>
            </div>
          </SectionCard>

          <SectionCard
            title="Where it replaces hours"
            headerTone="success"
            width={483}
            height={230}
            bodyPadding="8px 10px 8px"
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 7,
                width: '100%',
              }}
            >
              {USE_CASES.map((u) => (
                <UseCaseRow key={u.label} {...u} />
              ))}
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 10,
                  fontWeight: 600,
                  fontStyle: 'italic',
                  color: C_TEXT_MUTED,
                  lineHeight: 1.3,
                  margin: '2px 4px 0',
                  textAlign: 'center',
                }}
              >
                Anything repeated on a computer is a candidate.
              </p>
            </div>
          </SectionCard>
        </div>

        {/* ── ROW 5 — Get started ──────────────────────────────────────── */}
        <PrimaryGlassSection
          title="Start your AI OS in 3 steps"
          className="h-[290px] w-[981px] shrink-0"
          titleSize="20px"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              padding: '12px 14px 14px',
              flex: 1,
              width: '100%',
              alignItems: 'stretch',
            }}
          >
            <StartStep
              n="1"
              title="Install Claude Code"
              desc="Download the desktop app. One terminal, one entry point to your OS."
            />
            <StartStep
              n="2"
              title="Create your context"
              desc="Add CLAUDE.md at your project root — the long-term memory of your OS."
            />
            <StartStep
              n="3"
              title="Connect a skill + MCP"
              desc="One skill for the task you do most. One MCP for the tool you live in."
            />
            <FileTreePanel />
          </div>
        </PrimaryGlassSection>

        {/* ── FOOTER ───────────────────────────────────────────────────── */}
        <InfographicFooter className="h-[60px] relative shrink-0 w-[1048px]" name="Smart Creator" />
      </div>
    </InfographicCanvas>
  )
}
