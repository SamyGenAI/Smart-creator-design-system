// VennDiagram — 3-circle Venn diagram with mix-blend-mode: multiply
// Figma node: 117:1039 — 387 × 296.25px
// Pure SVG — no external image dependencies

const W = 387, H = 296.25;

// Circle centers and radius (all r=84, from Figma inset analysis)
const R = 84;
const CIRCLES = [
  { cx: 202, cy:  84, fill: "#092c69", titleColor: "white", subtitleColor: "white", title: "Viability",    subtitle: "BUSINESS"  },
  { cx:  84, cy: 135, fill: "#7edaff", titleColor: "white", subtitleColor: "white", title: "Desirability", subtitle: "HUMAN"     },
  { cx: 185, cy: 212, fill: "#ffb2da", titleColor: "white", subtitleColor: "white", title: "Feasibility",  subtitle: "TECHNICAL" },
];

// "Innovation" callout: small bordered circle outside the main Venn + connector line
const INNOVATION = {
  cx: 30, cy: 148,
  r: 26,
  label: "Innovation",
  // Line from right edge of callout circle to a point near the triple-intersection
  lineX1: 56, lineY1: 148,
  lineX2: 140, lineY2: 148,
};

export default function VennDiagram({
  circles: circleData,
  innovation = "Innovation",
  className,
}) {
  const resolvedCircles = circleData
    ? CIRCLES.map((c, i) => ({ ...c, title: circleData[i]?.title ?? c.title, subtitle: circleData[i]?.subtitle ?? c.subtitle }))
    : CIRCLES;

  return (
    <div
      className={className || "relative w-[387px] h-[296.25px]"}
      data-name="venn-diagram"
      data-node-id="117:1039"
    >
      <svg
        className="absolute inset-0"
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        aria-hidden="true"
        // Isolate blend so circles only blend with each other
        style={{ isolation: "isolate" }}
      >
        {/* 3 overlapping circles with multiply blend */}
        {resolvedCircles.map((c, i) => (
          <circle
            key={i}
            cx={c.cx}
            cy={c.cy}
            r={R}
            fill={c.fill}
            style={{ mixBlendMode: "multiply" }}
          />
        ))}

        {/* Circle labels — rendered ABOVE the blend layer so they stay legible */}
        {resolvedCircles.map((c, i) => (
          <g key={`label-${i}`}>
            <text
              x={c.cx}
              y={c.cy - 4}
              textAnchor="middle"
              fill={c.titleColor}
              fontFamily="Montserrat, sans-serif"
              fontWeight="500"
              fontSize="15"
            >
              {c.title}
            </text>
            <text
              x={c.cx}
              y={c.cy + 12}
              textAnchor="middle"
              fill={c.subtitleColor}
              fontFamily="Montserrat, sans-serif"
              fontWeight="900"
              fontSize="9"
              letterSpacing="0.5"
            >
              {c.subtitle}
            </text>
          </g>
        ))}

        {/* Innovation callout */}
        {/* Connector line from triple intersection to small callout circle */}
        <line
          x1={INNOVATION.lineX2} y1={INNOVATION.lineY1}
          x2={INNOVATION.lineX1 + INNOVATION.r} y2={INNOVATION.lineY1}
          stroke="#a9ff3e"
          strokeWidth="1.5"
        />
        {/* Small dot at intersection point */}
        <circle cx={INNOVATION.lineX2} cy={INNOVATION.lineY2} r="4" fill="white" stroke="#092c69" strokeWidth="1" />
        {/* Callout circle */}
        <circle
          cx={INNOVATION.cx}
          cy={INNOVATION.cy}
          r={INNOVATION.r}
          fill="white"
          stroke="#a9ff3e"
          strokeWidth="2"
        />
        <text
          x={INNOVATION.cx}
          y={INNOVATION.cy + 4}
          textAnchor="middle"
          fill="#092c69"
          fontFamily="Montserrat, sans-serif"
          fontWeight="700"
          fontSize="9.75"
        >
          {innovation}
        </text>
      </svg>
    </div>
  );
}
