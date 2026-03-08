// Target — 3 concentric circles (bullseye) with 3 callout annotations
// Figma node: 117:950 — 440 × 187.5px
// Pure SVG — no external image dependencies

const W = 440, H = 187.5;

// All 3 circles share the same center (from Figma: perfectly centered)
const CX = 220, CY = 94;
const OUTER_R = 94, MID_R = 60, INNER_R = 25;

// Colors (outer → inner): green → pink → blue
const RING_COLORS = ["#d2ff9a", "#ffe6f3", "#b4eaff"];

// Annotation zones (from Figma inset analysis)
const RIGHT_X = 352; // left edge of right annotation blocks
const LEFT_W  = 87;  // width of left annotation block

export default function Target({
  rings = [
    { label: "Cursus nibh vel",        body: "Viverra amet aliquet pellentesque tristique volutpat lectus ac enim nisl. Ac justo et cursus dui. Nisl diam faucibus mauris." },
    { label: "Ultrices nisi senectus", body: "Purus sem in massa vitae. Eros sed ultricies quis quam. Est fermentum lobortis euismod gravida pharetra sit pretium turpis." },
    { label: "Tempus commodo",         body: "Magna elit amet etiam elit morbi leo amet leo est. Sed venenatis enim nulla at mattis dignissim. Elementum ultrices." },
  ],
  className,
}) {
  return (
    <div
      className={className || "relative w-[440px] h-[187.5px]"}
      data-name="target"
      data-node-id="117:950"
    >
      {/* ── Shapes ────────────────────────────────────────────────────── */}
      <svg
        className="absolute inset-0"
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        aria-hidden="true"
      >
        {/* Concentric rings (outer → inner) */}
        <circle cx={CX} cy={CY} r={OUTER_R} fill={RING_COLORS[0]} />
        <circle cx={CX} cy={CY} r={MID_R}   fill={RING_COLORS[1]} />
        <circle cx={CX} cy={CY} r={INNER_R} fill={RING_COLORS[2]} />

        {/* Connector lines to annotations */}
        {/* Top-right: from top of outer ring upward-right to annotation */}
        <line x1={CX + 66} y1={CY - 66} x2={RIGHT_X} y2={14}  stroke="#092c69" strokeWidth="0.8" />
        {/* Bottom-right: from right-mid of middle ring to annotation */}
        <line x1={CX + 50} y1={CY + 40} x2={RIGHT_X} y2={152} stroke="#092c69" strokeWidth="0.8" />
        {/* Left: from left edge of outer ring horizontally to left annotation */}
        <line x1={CX - OUTER_R} y1={CY} x2={LEFT_W} y2={CY}  stroke="#092c69" strokeWidth="0.8" />
      </svg>

      {/* ── Annotation blocks ─────────────────────────────────────────── */}
      {/* Top-right */}
      <div
        className="absolute flex flex-col gap-[3px]"
        style={{ top: 9, left: RIGHT_X, width: W - RIGHT_X }}
      >
        <p className="font-[family-name:var(--font\/family\/body)] font-bold text-[8px] leading-[1.2] text-[color:var(--text\/primary,black)]">
          {rings[0]?.label}
        </p>
        <p className="font-[family-name:var(--font\/family\/body)] font-normal text-[5px] leading-[1.4] text-[color:var(--text\/primary,black)]">
          {rings[0]?.body}
        </p>
      </div>

      {/* Bottom-right */}
      <div
        className="absolute flex flex-col gap-[3px]"
        style={{ top: 141, left: RIGHT_X, width: W - RIGHT_X }}
      >
        <p className="font-[family-name:var(--font\/family\/body)] font-bold text-[8px] leading-[1.2] text-[color:var(--text\/primary,black)]">
          {rings[1]?.label}
        </p>
        <p className="font-[family-name:var(--font\/family\/body)] font-normal text-[5px] leading-[1.4] text-[color:var(--text\/primary,black)]">
          {rings[1]?.body}
        </p>
      </div>

      {/* Left */}
      <div
        className="absolute flex flex-col gap-[3px] text-right"
        style={{ top: 75, left: 0, width: LEFT_W }}
      >
        <p className="font-[family-name:var(--font\/family\/body)] font-bold text-[8px] leading-[1.2] text-[color:var(--text\/primary,black)]">
          {rings[2]?.label}
        </p>
        <p className="font-[family-name:var(--font\/family\/body)] font-normal text-[5px] leading-[1.4] text-[color:var(--text\/primary,black)]">
          {rings[2]?.body}
        </p>
      </div>
    </div>
  );
}
