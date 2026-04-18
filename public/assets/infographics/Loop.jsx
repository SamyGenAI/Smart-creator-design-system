// Loop — 3-circle cyclic diagram with curved arrows and handwritten-style labels
// Figma node: 117:1010 — 419 × 341.76px
// Pure SVG — no external image dependencies
// Requires "Permanent Marker" font (already in index.html via Google Fonts)

const W = 419, H = 341.76;

// 3 circle centers (from Figma inset analysis)
//  Top    = Secondary research (dark navy)
//  Bottom = Primary research (medium blue)
//  Right  = Research perimeter (light blue)
const CIRCLES = [
  { cx: 181, cy:  79, r: 72, fill: "#092c69", textColor: "white",   label: "Secondary\nresearch" },
  { cx: 181, cy: 261, r: 72, fill: "#7edaff", textColor: "white",   label: "Primary\nresearch"   },
  { cx: 338, cy: 170, r: 72, fill: "rgba(126,218,255,0.4)", textColor: "#092c69", label: "Research\nperimeter" },
];

// Curved arrow paths between circles (clockwise: top → right → bottom → top)
// Using cubic bezier curves that arc around the outside of the circles
const ARROWS = [
  // Top → Right: arc along upper-right
  { d: "M 245,108 C 310,80 360,100 340,100", tip: { x: 340, y: 100 } },
  // Right → Bottom: arc along lower-right
  { d: "M 352,235 C 365,285 310,320 245,290", tip: { x: 245, y: 290 } },
  // Bottom → Top: arc along left side
  { d: "M 117,235 C 50,190 50,120 117,108", tip: { x: 117, y: 108 } },
];

// Handwritten-style labels at transition points (from Figma)
const CYCLE_LABELS = [
  { text: "Scope",  x: 358, y: 16  },
  { text: "Define", x: 360, y: 326 },
  { text: "Adjust", x: 242, y: 236 },
  { text: "Feed",   x: 18,  y: 168 },
];

// Small dot size at arrowhead connection points
const DOT_R = 5;

export default function Loop({
  circles: circleData,
  cycleLabels,
  className,
}) {
  const resolvedCircles = circleData
    ? CIRCLES.map((c, i) => ({ ...c, label: circleData[i]?.label ?? c.label }))
    : CIRCLES;

  const resolvedLabels = cycleLabels
    ? CYCLE_LABELS.map((l, i) => ({ ...l, text: cycleLabels[i] ?? l.text }))
    : CYCLE_LABELS;

  return (
    <div
      className={className || "relative w-[419px] h-[341.76px]"}
      data-name="loop"
      data-node-id="117:1010"
    >
      <svg
        className="absolute inset-0"
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        overflow="visible"
        aria-hidden="true"
      >
        <defs>
          <marker id="loop-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <circle cx="4" cy="4" r="3" fill="#092c69" />
          </marker>
        </defs>

        {/* Curved connector arrows */}
        {ARROWS.map((arrow, i) => (
          <path
            key={i}
            d={arrow.d}
            fill="none"
            stroke="#092c69"
            strokeWidth="1.5"
            markerEnd="url(#loop-arrow)"
          />
        ))}

        {/* Small connection dots at arrow origins */}
        <circle cx={245} cy={108} r={DOT_R} fill="#b4eaff" stroke="#092c69" strokeWidth="1" />
        <circle cx={352} cy={235} r={DOT_R} fill="#b4eaff" stroke="#092c69" strokeWidth="1" />
        <circle cx={117} cy={235} r={DOT_R} fill="#b4eaff" stroke="#092c69" strokeWidth="1" />

        {/* Circles */}
        {resolvedCircles.map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={c.fill} />
        ))}

        {/* Circle labels (multi-line via tspan) */}
        {resolvedCircles.map((c, i) => {
          const lines = c.label.split("\n");
          return (
            <text
              key={i}
              x={c.cx}
              y={c.cy - (lines.length - 1) * 7}
              textAnchor="middle"
              fill={c.textColor}
              fontFamily="Montserrat, sans-serif"
              fontWeight={i === 0 ? "600" : "700"}
              fontSize="12"
            >
              {lines.map((line, j) => (
                <tspan key={j} x={c.cx} dy={j === 0 ? 0 : 14}>{line}</tspan>
              ))}
            </text>
          );
        })}

        {/* Handwritten-style cycle labels */}
        {resolvedLabels.map((label, i) => (
          <text
            key={i}
            x={label.x}
            y={label.y}
            textAnchor="middle"
            fill="black"
            fontFamily="'Permanent Marker', cursive"
            fontSize="20"
          >
            {label.text}
          </text>
        ))}
      </svg>
    </div>
  );
}
