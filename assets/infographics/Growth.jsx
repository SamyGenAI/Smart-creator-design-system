// Growth — staircase growth chart with 3 phases, milestones, and axis labels
// Figma node: 118:618 — 607 × 346px
// Pure SVG — no external image dependencies

const W = 607, H = 346;
const TOKENS = {
  brand: "var(--theme-color-primary)",
  textPrimary: "var(--theme-color-text-primary)",
  accent1: "var(--theme-accent-1)",
  accent5: "var(--theme-accent-5)",
  accent4: "var(--theme-accent-4)",
  layer1: "var(--theme-surface-layer-1)",
}

// Chart area boundaries (within the full canvas)
const CHART = { left: 93, top: 0, right: W, bottom: 320 };

// Phase column x boundaries (derived from Figma insets)
const PHASES = [
  { x1: 93,  x2: 231, fill: TOKENS.layer1, label: "Learn what is desirable" },
  { x1: 231, x2: 434, fill: TOKENS.accent1, label: "Develop mature forms of your concept" },
  { x1: 434, x2: W,   fill: "var(--theme-border-1)", label: "Test viability" },
];

// Staircase polyline points (data point positions from Figma inset analysis)
// Each point is [x, y] — the step goes: horizontal then vertical
const DATA_POINTS = [
  [126, 280], // step 1
  [176, 255], // step 2
  [230, 209], // milestone 1
  [329, 165], // step 4
  [433, 111], // milestone 2
  [579,  36], // endpoint
];

// Build staircase polyline: right-angle steps between data points
function staircasePoints(pts) {
  const result = [[CHART.left, CHART.bottom]]; // start at chart origin
  pts.forEach(([x, y]) => {
    const prev = result[result.length - 1];
    result.push([x, prev[1]]); // horizontal segment
    result.push([x, y]);        // vertical segment
  });
  return result.map(([x, y]) => `${x},${y}`).join(" ");
}

// Milestone markers (index into DATA_POINTS, color, label, labelY)
const MILESTONES = [
  { idx: 2, fill: TOKENS.accent5, label: "Milestone", labelY: 237 },
  { idx: 4, fill: TOKENS.accent4, label: "Milestone", labelY: 138 },
];

export default function Growth({
  phases: phaseData,
  milestones: milestoneData,
  yAxisLabel = "PROTOTYPE\nCOMPLEXITY",
  xAxisLabel = "ITERATION",
  className,
}) {
  const resolvedPhases = phaseData
    ? PHASES.map((p, i) => ({ ...p, label: phaseData[i]?.label ?? p.label }))
    : PHASES;

  const resolvedMilestones = milestoneData
    ? MILESTONES.map((m, i) => ({ ...m, label: milestoneData[i]?.label ?? m.label }))
    : MILESTONES;

  const yLines = yAxisLabel.split("\n");

  return (
    <div
      className={className || "relative w-[607px] h-[346px]"}
      data-name="growth"
      data-node-id="118:618"
    >
      <svg
        className="absolute inset-0"
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        aria-hidden="true"
      >
        {/* ── Phase background columns ──────────────────────────────── */}
        {resolvedPhases.map((p, i) => (
          <rect
            key={i}
            x={p.x1} y={CHART.top}
            width={p.x2 - p.x1} height={CHART.bottom - CHART.top}
            fill={p.fill}
          />
        ))}

        {/* ── Axis lines ───────────────────────────────────────────── */}
        {/* Y-axis */}
        <line x1={CHART.left} y1={CHART.top} x2={CHART.left} y2={CHART.bottom} stroke={TOKENS.brand} strokeWidth="1.5" />
        {/* X-axis */}
        <line x1={CHART.left} y1={CHART.bottom} x2={CHART.right} y2={CHART.bottom} stroke={TOKENS.brand} strokeWidth="1.5" />

        {/* ── Staircase growth line ─────────────────────────────────── */}
        <polyline
          points={staircasePoints(DATA_POINTS)}
          fill="none"
          stroke={TOKENS.brand}
          strokeWidth="1.5"
        />

        {/* ── Regular data-point dots ───────────────────────────────── */}
        {DATA_POINTS.filter((_, i) => ![2, 4].includes(i)).map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill={TOKENS.brand} />
        ))}

        {/* ── Milestone markers (large, colored) ───────────────────── */}
        {resolvedMilestones.map((m, i) => {
          const [x, y] = DATA_POINTS[m.idx];
          return (
            <g key={i}>
              {/* Outer glow ring */}
              <circle cx={x} cy={y} r="10" fill={m.fill} opacity="0.35" />
              {/* Milestone dot */}
              <circle cx={x} cy={y} r="6" fill={m.fill} />
              {/* Milestone label */}
              <text
                x={x}
                y={m.labelY}
                textAnchor="middle"
                fill={TOKENS.brand}
                fontFamily="Montserrat, sans-serif"
                fontWeight="600"
                fontSize="9"
              >
                {m.label}
              </text>
            </g>
          );
        })}

        {/* ── Phase labels (top of each column) ────────────────────── */}
        {resolvedPhases.map((p, i) => (
          <text
            key={i}
            x={(p.x1 + p.x2) / 2}
            y={15}
            textAnchor="middle"
            fill={TOKENS.brand}
            fontFamily="Montserrat, sans-serif"
            fontWeight="600"
            fontSize="9"
          >
            {p.label}
          </text>
        ))}

        {/* ── Axis labels ───────────────────────────────────────────── */}
        {/* Y-axis label (rotated, left of axis) */}
        {yLines.map((line, i) => (
          <text
            key={i}
            x={CHART.left - 4}
            y={12 + i * 13}
            textAnchor="end"
            fill={TOKENS.textPrimary}
            fontFamily="Montserrat, sans-serif"
            fontWeight="600"
            fontSize="12"
          >
            {line}
          </text>
        ))}
        {/* X-axis label (right of axis) */}
        <text
          x={W}
          y={H}
          textAnchor="end"
          fill={TOKENS.textPrimary}
          fontFamily="Montserrat, sans-serif"
          fontWeight="600"
          fontSize="12"
        >
          {xAxisLabel}
        </text>
      </svg>
    </div>
  );
}
