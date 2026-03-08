// Process — 4-step linear process with colored circles, arrows, and labels
// Figma node: 117:976 — 390 × 93.5px
// Pure SVG — no external image dependencies

const W = 390, H = 93.5;

// 4 circles at equal spacing, r=25, cy=25
const CIRCLE_CX = [37.5, 142.5, 247.5, 352.5];
const CIRCLE_R  = 25;
const CIRCLE_CY = 25;

// Each step has an outer (ring) and inner (fill) color
const COLORS = [
  { outer: "#ffe6f3",             inner: "#ffb2da" }, // pink
  { outer: "rgba(126,218,255,0.3)", inner: "#b4eaff" }, // blue
  { outer: "rgba(169,255,62,0.15)", inner: "#d2ff9a" }, // green
  { outer: "rgba(255,145,77,0.15)", inner: "#ffa066" }, // orange
];

const LABEL_Y = 58; // y where step labels start (62% of 93.5)

export default function Process({
  steps = [
    { label: "Euismod blandit",  body: "Varius ipsum elementum sed donec ac. Et ac tincidunt sed tortor." },
    { label: "Id et facilisi mi", body: "Et sociis aenean pulvinar lorem enim. Cursus est quis nulla tempor." },
    { label: "Suspendisse",       body: "Auctor aenean et adipiscing eget enim. Non accumsan aenean interdum." },
    { label: "In purus at nec",   body: "Eget metus augue tempus sed. Ut convallis ac vitae lacus consectetur." },
  ],
  className,
}) {
  return (
    <div
      className={className || "relative w-[390px] h-[93.5px]"}
      data-name="process"
      data-node-id="117:976"
    >
      <svg
        className="absolute inset-0"
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        aria-hidden="true"
      >
        <defs>
          <marker id="proc-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 L2,3.5 Z" fill="#092c69" />
          </marker>
        </defs>

        {/* Circle pairs (outer light ring + inner colored fill) */}
        {CIRCLE_CX.map((cx, i) => (
          <g key={i}>
            <circle cx={cx} cy={CIRCLE_CY} r={CIRCLE_R}     fill={COLORS[i].outer} />
            <circle cx={cx} cy={CIRCLE_CY} r={CIRCLE_R - 6} fill={COLORS[i].inner} />
          </g>
        ))}

        {/* Arrow connectors between circles */}
        {CIRCLE_CX.slice(0, 3).map((cx, i) => {
          const x1 = cx + CIRCLE_R + 2;
          const x2 = CIRCLE_CX[i + 1] - CIRCLE_R - 8;
          return (
            <line
              key={i}
              x1={x1} y1={CIRCLE_CY}
              x2={x2} y2={CIRCLE_CY}
              stroke="#092c69"
              strokeWidth="1"
              markerEnd="url(#proc-arrow)"
            />
          );
        })}

        {/* Step title labels */}
        {CIRCLE_CX.map((cx, i) => (
          <text
            key={i}
            x={cx}
            y={LABEL_Y}
            textAnchor="middle"
            fill="#092c69"
            fontFamily="Montserrat, sans-serif"
            fontWeight="700"
            fontSize="8"
          >
            {steps[i]?.label}
          </text>
        ))}

        {/* Step body text — max 2 lines, 75px width each */}
        {CIRCLE_CX.map((cx, i) => (
          <text
            key={i}
            x={cx}
            y={LABEL_Y + 11}
            textAnchor="middle"
            fill="#323241"
            fontFamily="Montserrat, sans-serif"
            fontWeight="400"
            fontSize="5"
          >
            {/* Simple single-line truncate — use the first ~55 chars */}
            {(steps[i]?.body || "").slice(0, 55)}
          </text>
        ))}
      </svg>
    </div>
  );
}
