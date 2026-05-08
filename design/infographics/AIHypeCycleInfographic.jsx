/**
 * AIHypeCycleInfographic — 1080×1350px LinkedIn infographic.
 *
 * Custom two-rectangle template:
 *   Top rectangle    — "The AI hype cycle"   (limaçon snail, never reaches the goal)
 *   Bottom rectangle — "How to break it"     (straight arrow, reaches the goal)
 */

import InfographicHeader from '../../components/InfographicHeader.jsx'
import SquareGridTexture from '../../components/SquareGridTexture.jsx'
import InfographicFooter from '../../components/InfographicFooter.jsx'
import PrimaryGlassSection from '../../components/PrimaryGlassSection.jsx'

const COLOR_STROKE = 'var(--theme-color-text-primary)'
const COLOR_TEXT_PRIMARY = 'var(--theme-color-text-primary)'
const SHADOW_SOFT = 'var(--theme-shadow-card-soft)'
const BORDER_PRIMARY = `2px solid ${COLOR_STROKE}`

// ── Soft brand (pastel) palette used for chip backgrounds ────────────────────
const ACCENT = {
  a1: 'var(--theme-accent-1)',
  a2: 'var(--theme-accent-2)',
  a3: 'var(--theme-accent-3)',
  a4: 'var(--theme-accent-4)',
  a5: 'var(--theme-accent-5)',
}

// ── Diagram coordinate system (matches each rectangle's interior) ────────────
const RECT_W = 975
const RECT_H = 472
const MID_Y = 236
const ANCHOR_CIRCLE_R = 20
const LEFT_ANCHOR_X = 55
const RIGHT_ANCHOR_X = 920

// ── Limaçon-of-Pascal inspired snail path ────────────────────────────────────
function buildSnailPath({ startX, endX, midY, loops = 3, ampX = 74, ampY = 104, segments = 320 }) {
  const N = loops * 2 * Math.PI
  const S = endX - startX
  let d = ''
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const θ = N * t
    const x = startX + S * t + ampX * Math.sin(θ)
    const y = midY - ampY * Math.sin(θ) - ampY * 0.35 * (1 - Math.cos(θ))
    d += (i === 0 ? 'M' : 'L') + x.toFixed(2) + ',' + y.toFixed(2) + ' '
  }
  return d
}

const SNAIL_PATH = buildSnailPath({
  startX: LEFT_ANCHOR_X + ANCHOR_CIRCLE_R + 6,
  endX: 700,
  midY: MID_Y,
  loops: 3,
  ampX: 74,
  ampY: 104,
})

// ── App.jsx demo data ────────────────────────────────────────────────────────
export const demoData = {
  title: 'The AI hype cycle and how to break it',
  highlightWord: 'break it',
  subtitle: 'Chase every trend, or ship one scalable system',
  footer: {
    avatarSrc: '/assets/avatar/avatar-profile.png',
    name: 'Samy Chouaf',
  },
}

export default function AIHypeCycleInfographic({ data = demoData }) {
  const {
    title = demoData.title,
    highlightWord = demoData.highlightWord,
    subtitle = demoData.subtitle,
    footer = demoData.footer,
  } = data

  return (
    <div
      className="bg-canvas flex items-center justify-center relative"
      style={{ width: '1080px', height: '1350px', flexShrink: 0, overflow: 'hidden' }}
      data-name="AIHypeCycleInfographic"
    >
      <SquareGridTexture />

      <div className="flex flex-col h-full items-center relative w-[981px] py-[20px]">
        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <div className="flex-none shrink-0 w-full pb-[10px]">
          <InfographicHeader
            title={title}
            highlightWord={highlightWord}
            subtitle={subtitle}
            allowWrap
            titleStyle={{ fontSize: '52px', letterSpacing: '-1.56px' }}
            subtitleStyle={{ fontSize: '24px', letterSpacing: '-0.48px' }}
            className="gap-[10px]"
          />
        </div>

        {/* ── TWO-RECTANGLE GRID ─────────────────────────────────────────── */}
        <div
          className="flex-1 min-h-0 w-full"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '12px',
          }}
        >
          {/* ── TOP: The AI hype cycle ── */}
          <PrimaryGlassSection title="The AI hype cycle" className="h-full w-full" titleSize="30px">
            <HypeCycleDiagram />
          </PrimaryGlassSection>

          {/* ── BOTTOM: How to break it ── */}
          <PrimaryGlassSection title="How to break it" className="h-full w-full" titleSize="30px">
            <BreakItDiagram />
          </PrimaryGlassSection>
        </div>

        {/* ── FOOTER ─────────────────────────────────────────────────────── */}
        <div className="flex-none shrink-0 w-full pt-[10px]">
          <InfographicFooter
            avatarSrc={footer.avatarSrc || '/assets/avatar/avatar-profile.png'}
            name={footer.name || 'Samy Chouaf'}
            className="h-[60px] relative w-full"
          />
        </div>
      </div>
    </div>
  )
}

// ── TOP DIAGRAM ──────────────────────────────────────────────────────────────
function HypeCycleDiagram() {
  return (
    <div className="relative flex-1 w-full overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${RECT_W} ${RECT_H}`}
        preserveAspectRatio="none"
      >
        <path
          d={SNAIL_PATH}
          stroke={COLOR_STROKE}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Dead-end marker at the end of the snail trail */}
        <circle cx="700" cy={MID_Y} r="8" fill={COLOR_STROKE} />

        {/* Anchor circles */}
        <circle cx={LEFT_ANCHOR_X} cy={MID_Y} r={ANCHOR_CIRCLE_R} fill={COLOR_STROKE} />
        <circle cx={RIGHT_ANCHOR_X} cy={MID_Y} r={ANCHOR_CIRCLE_R} fill={COLOR_STROKE} />
      </svg>

      {/* Anchor captions — plain bold text, sitting to the inside of each circle */}
      <PlainLabel x={LEFT_ANCHOR_X + ANCHOR_CIRCLE_R + 14} y={MID_Y + 48}>
        Let&apos;s use AI!
      </PlainLabel>
      <PlainLabel x={RIGHT_ANCHOR_X - ANCHOR_CIRCLE_R - 14} y={MID_Y + 48} anchorRight>
        Business goal
      </PlainLabel>

      {/* Waypoint chips */}
      <Chip x={192} y={44} bg={ACCENT.a2} centerX>
        New AI tool
      </Chip>
      <Chip x={398} y={418} bg={ACCENT.a3} centerX>
        New workflow
      </Chip>
      <Chip x={605} y={44} bg={ACCENT.a5} centerX>
        New Claude Skill
      </Chip>
    </div>
  )
}

// ── BOTTOM DIAGRAM ───────────────────────────────────────────────────────────
function BreakItDiagram() {
  const ARROW_START = LEFT_ANCHOR_X + ANCHOR_CIRCLE_R + 6
  const ARROW_END = RIGHT_ANCHOR_X - ANCHOR_CIRCLE_R - 8

  // Waypoints alternate above / below the arrow so the longer chips don't crowd.
  const waypoints = [
    { x: 200, label: "New API, let's test in my system", bg: ACCENT.a3, ignored: false, above: true },
    { x: 475, label: "New MCP, let's connect to my system", bg: ACCENT.a2, ignored: false, above: false },
    { x: 775, label: 'New tool, ignored', bg: ACCENT.a4, ignored: true, above: true },
  ]

  const CHIP_ABOVE_Y = 70
  const CHIP_BELOW_Y = 402

  return (
    <div className="relative flex-1 w-full overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${RECT_W} ${RECT_H}`}
        preserveAspectRatio="none"
      >
        <defs>
          <marker
            id="breakArrowHead"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={COLOR_STROKE} />
          </marker>
        </defs>

        {/* Straight arrow */}
        <line
          x1={ARROW_START}
          y1={MID_Y}
          x2={ARROW_END}
          y2={MID_Y}
          stroke={COLOR_STROKE}
          strokeWidth="6"
          strokeLinecap="round"
          markerEnd="url(#breakArrowHead)"
        />

        {/* Waypoint dots on the arrow */}
        {waypoints.map((w) => (
          <circle key={w.x} cx={w.x} cy={MID_Y} r="8" fill={COLOR_STROKE} />
        ))}

        {/* Dashed connectors from each dot toward its chip (clear gap on both ends) */}
        {waypoints.map((w) => {
          const startY = w.above ? MID_Y - 14 : MID_Y + 14
          const endY = w.above ? CHIP_ABOVE_Y + 30 : CHIP_BELOW_Y - 30
          return (
            <line
              key={`connector-${w.x}`}
              x1={w.x}
              y1={startY}
              x2={w.x}
              y2={endY}
              stroke={COLOR_STROKE}
              strokeWidth="2"
              strokeDasharray="4 5"
            />
          )
        })}

        {/* Anchor circles */}
        <circle cx={LEFT_ANCHOR_X} cy={MID_Y} r={ANCHOR_CIRCLE_R} fill={COLOR_STROKE} />
        <circle cx={RIGHT_ANCHOR_X} cy={MID_Y} r={ANCHOR_CIRCLE_R} fill={COLOR_STROKE} />
      </svg>

      {/* Anchor captions */}
      <PlainLabel x={LEFT_ANCHOR_X + ANCHOR_CIRCLE_R + 14} y={MID_Y + 48}>
        Let&apos;s build an AI system
      </PlainLabel>
      <PlainLabel x={RIGHT_ANCHOR_X - ANCHOR_CIRCLE_R - 14} y={MID_Y + 48} anchorRight>
        Business goal
      </PlainLabel>

      {/* Waypoint chips — alternating above / below */}
      {waypoints.map((w) => (
        <Chip
          key={w.x}
          x={w.x}
          y={w.above ? CHIP_ABOVE_Y : CHIP_BELOW_Y}
          bg={w.bg}
          ignored={w.ignored}
          centerX
        >
          {w.label}
        </Chip>
      ))}
    </div>
  )
}

// ── SHARED COMPONENTS ────────────────────────────────────────────────────────

// Plain text label (no background) — used for the left/right anchor captions.
function PlainLabel({ x, y, children, anchorRight = false }) {
  return (
    <div
      className="absolute font-montserrat font-bold text-black"
      style={{
        left: anchorRight ? undefined : `${(x / RECT_W) * 100}%`,
        right: anchorRight ? `${((RECT_W - x) / RECT_W) * 100}%` : undefined,
        top: `${(y / RECT_H) * 100}%`,
        transform: 'translateY(-50%)',
        fontSize: '22px',
        letterSpacing: '-0.44px',
        whiteSpace: 'nowrap',
        lineHeight: 1.2,
      }}
    >
      {children}
    </div>
  )
}

// Pastel chip — used for waypoint labels on the curve / arrow.
function Chip({ x, y, bg, children, centerX = false, ignored = false }) {
  const translate = centerX ? 'translate(-50%, -50%)' : 'translateY(-50%)'
  return (
    <div
      className="absolute font-montserrat"
      style={{
        left: `${(x / RECT_W) * 100}%`,
        top: `${(y / RECT_H) * 100}%`,
        transform: translate,
        background: bg,
        color: COLOR_TEXT_PRIMARY,
        borderRadius: '12px',
        padding: '10px 16px',
        fontSize: '18px',
        fontWeight: 600,
        letterSpacing: '-0.36px',
        whiteSpace: 'nowrap',
        boxShadow: SHADOW_SOFT,
        border: BORDER_PRIMARY,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      {ignored && <GreenTickBox />}
      <span style={ignored ? { textDecoration: 'line-through', opacity: 0.7 } : undefined}>
        {children}
      </span>
    </div>
  )
}

// Green filled checkbox with a black tick inside.
function GreenTickBox() {
  return (
    <span
      aria-hidden
      style={{
        width: '22px',
        height: '22px',
        background: 'var(--theme-accent-2)',
        border: BORDER_PRIMARY,
        borderRadius: '4px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12.5l4 4L19 7"
          stroke={COLOR_STROKE}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
