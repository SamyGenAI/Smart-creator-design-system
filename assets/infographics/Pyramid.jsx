// Pyramid — 3-tier trapezoid pyramid with right-side annotations
// Figma node: 117:952 — 410 × 172.5px
// Pure SVG — no external image dependencies

const W = 410, H = 172.5;

// The pyramid trapezoid (flat top): top edge narrower, base wider
// Derived from Figma tier bounding boxes: top 69px @ y=0, base 197px @ y=172.5
const PYR = {
  topLeft:  64,   // x of top-left corner
  topRight: 133,  // x of top-right corner
  botLeft:  0,    // x of bottom-left corner
  botRight: 197,  // x of bottom-right corner
  height:   H,
};

// Tier band dividers (y positions)
const TIER_Y = [0, 57.5, 115, H];

// Colors from design tokens: orange-300 → orange-200 → light orange
const TIER_COLORS = ["#ff914d", "#ffa066", "#ffd4b5"];

// x coordinate of each side at a given y (linear interpolation along trapezoid sides)
function leftEdge(y)  { return PYR.topLeft  + (PYR.botLeft  - PYR.topLeft)  * (y / H); }
function rightEdge(y) { return PYR.topRight + (PYR.botRight - PYR.topRight) * (y / H); }

// Build a trapezoid polygon path for a band between y1 and y2
function bandPath(y1, y2) {
  const x1l = leftEdge(y1), x1r = rightEdge(y1);
  const x2l = leftEdge(y2), x2r = rightEdge(y2);
  return `M${x1l},${y1} L${x1r},${y1} L${x2r},${y2} L${x2l},${y2} Z`;
}

// Annotation zone starts at x = 63.41% × 410 ≈ 260px
const ANNOT_X = 260;

export default function Pyramid({
  tiers = [
    { value: "677.54k", label: "Iaculis semper sapien dis felis in",   body: "Nullam sagittis ultrices sit sagittis leo neque. In at aenean lorem eget aliquam et etiam." },
    { value: "943.5k",  label: "Diam hac sollicitudin lorem",          body: "Hendrerit augue velit fusce dolor orci id porta lectus. Duis iaculis ornare senectus nunc." },
    { value: "3.25M",   label: "Eu facilisi aliquet hendrerit ornare", body: "Elementum dui et consequat eu quis egestas faucibus. Praesent pulvinar turpis est sagittis." },
  ],
  className,
}) {
  // y center of each band (for value label and connector line)
  const bandCenterY = TIER_Y.slice(0, 3).map((y, i) => (y + TIER_Y[i + 1]) / 2);

  return (
    <div
      className={className || "relative w-[410px] h-[172.5px]"}
      data-name="pyramid"
      data-node-id="117:952"
    >
      {/* ── Shapes ────────────────────────────────────────────────────── */}
      <svg
        className="absolute inset-0"
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        aria-hidden="true"
      >
        {/* 3 trapezoid tiers */}
        {TIER_COLORS.map((color, i) => (
          <path key={i} d={bandPath(TIER_Y[i], TIER_Y[i + 1])} fill={color} />
        ))}

        {/* Value labels centered in each tier */}
        {bandCenterY.map((cy, i) => {
          // approximate horizontal center of the tier at its mid-y
          const midX = (leftEdge(cy) + rightEdge(cy)) / 2;
          return (
            <text
              key={i}
              x={midX * 0.5} // bias toward left since labels are left-of-center in design
              y={cy + 4}
              textAnchor="middle"
              fill="white"
              fontFamily="Montserrat, sans-serif"
              fontWeight="700"
              fontSize="8"
            >
              {tiers[i]?.value}
            </text>
          );
        })}

        {/* Connector lines from tier right edge to annotation zone */}
        {bandCenterY.map((cy, i) => (
          <line
            key={i}
            x1={rightEdge(cy)}
            y1={cy}
            x2={ANNOT_X - 4}
            y2={cy}
            stroke="#092c69"
            strokeWidth="0.8"
          />
        ))}
      </svg>

      {/* ── Annotation blocks ─────────────────────────────────────────── */}
      {tiers.map((tier, i) => (
        <div
          key={i}
          className="absolute flex flex-col gap-[3px]"
          style={{
            top:   bandCenterY[i] - 14,
            left:  ANNOT_X,
            width: W - ANNOT_X,
          }}
        >
          <p className="font-[family-name:var(--font\/family\/body)] font-bold text-[8px] leading-[1.2] text-[color:var(--text\/primary,black)]">
            {tier.label}
          </p>
          <p className="font-[family-name:var(--font\/family\/body)] font-normal text-[5px] leading-[1.4] text-[color:var(--text\/primary,black)]">
            {tier.body}
          </p>
        </div>
      ))}
    </div>
  );
}
