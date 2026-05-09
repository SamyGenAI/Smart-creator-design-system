// FrogJumps — 4 ascending semi-circle arcs on a brand baseline
// Figma node: 117:951 — 420 × 189px
// Pure SVG — no external image dependencies

const W = 420, H = 189;
const BASELINE_Y = 120;
const TOKENS = {
  brand: "var(--theme-color-primary)",
  accent1: "var(--theme-accent-1)",
  accent1Strong: "var(--theme-border-1)",
  accent4: "var(--theme-accent-4)",
}

const ARCS = [
  { cx: 50,  r: 38, fill: TOKENS.accent4 },
  { cx: 128, r: 50, fill: TOKENS.accent1 },
  { cx: 225, r: 60, fill: TOKENS.accent4 },
  { cx: 342, r: 69, fill: TOKENS.accent1Strong },
];

// Upper semi-circle path: arc from left to right, bulge going UP
function arcPath(cx, r) {
  return `M ${cx - r} ${BASELINE_Y} A ${r} ${r} 0 0 1 ${cx + r} ${BASELINE_Y}`;
}

export default function FrogJumps({
  steps = [
    { value: "1250", label: "Leo eu netus"    },
    { value: "2000", label: "Lacus mauris"    },
    { value: "3670", label: "Mi nunc amet"    },
    { value: "5800", label: "Proin tincidunt" },
  ],
  className,
}) {
  const LABEL_Y = 144; // y position for labels below baseline

  return (
    <div
      className={className || "relative w-[420px] h-[189px]"}
      data-name="frog-jumps"
      data-node-id="117:951"
    >
      <svg
        className="absolute inset-0"
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        aria-hidden="true"
      >
        <defs>
          {/* Arrowhead marker for vertical connectors */}
          <marker id="fj-arrow" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto">
            <path d="M0,0 L3,6 L6,0" fill="none" stroke={TOKENS.brand} strokeWidth="1" />
          </marker>
        </defs>

        {/* Semi-circle arcs */}
        {ARCS.map((arc, i) => (
          <path
            key={i}
            d={arcPath(arc.cx, arc.r)}
            fill={arc.fill}
            stroke="none"
          />
        ))}

        {/* Navy baseline bar */}
        <rect x="0" y={BASELINE_Y} width={W} height="5" rx="2.5" fill={TOKENS.brand} />

        {/* Vertical arrow connectors from value text to arc top */}
        {ARCS.map((arc, i) => {
          const topY = BASELINE_Y - arc.r;
          return (
            <line
              key={i}
              x1={arc.cx}
              y1={topY - 16}
              x2={arc.cx}
              y2={topY - 2}
              stroke={TOKENS.brand}
              strokeWidth="0.8"
              markerEnd="url(#fj-arrow)"
            />
          );
        })}

        {/* Value text above each arc */}
        {ARCS.map((arc, i) => (
          <text
            key={i}
            x={arc.cx}
            y={BASELINE_Y - arc.r - 20}
            textAnchor="middle"
            fill={TOKENS.brand}
            fontFamily="Montserrat, sans-serif"
            fontWeight="700"
            fontSize="13"
          >
            {steps[i]?.value}
          </text>
        ))}

        {/* Label text below baseline */}
        {ARCS.map((arc, i) => (
          <text
            key={i}
            x={arc.cx}
            y={LABEL_Y}
            textAnchor="middle"
            fill={TOKENS.brand}
            fontFamily="Montserrat, sans-serif"
            fontWeight="700"
            fontSize="8"
          >
            {steps[i]?.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
