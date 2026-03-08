// Onion — 3 concentric circles with value labels and side annotations
// Figma node: 117:949 — 398 × 175px
// Pure SVG — no external image dependencies

const W = 398, H = 175;
const CX = 199, CY = 87;
const OUTER_R = 87, MID_R = 62, INNER_R = 40;

// x positions where annotations start
const RIGHT_X = 326; // left edge of right-side text blocks
const LEFT_X  = 72;  // right edge of left-side text block

export default function Onion({
  layers = [
    { value: "$15.5M", label: "Ut justo mattis at",  body: "Nisi adipiscing metus diam dolor nisl tristique. Vel vestibulum leo amet nisl amet risus arcu sed massa." },
    { value: "$7.0M",  label: "Ac et nulla dui",     body: "Blandit iaculis nunc fames ut at mattis. Augue mauris eu tempus elementum morbi aliquam." },
    { value: "$3.5M",  label: "Aliquam pulvinar",    body: "Mauris orci pellentesque gravida eros tellus massa montes aliquam ultricies. Consequat lorem lectus." },
  ],
  className,
}) {
  // y-centers for connector lines aligned to each annotation block
  const lineYs = [32, CY, 140];

  return (
    <div
      className={className || "relative w-[398px] h-[175px]"}
      data-name="onion"
      data-node-id="117:949"
    >
      {/* ── Shapes ────────────────────────────────────────────────────── */}
      <svg
        className="absolute inset-0"
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        aria-hidden="true"
      >
        {/* Concentric circles */}
        <ellipse cx={CX} cy={CY} rx={OUTER_R} ry={OUTER_R} fill="rgba(126,218,255,0.3)" />
        <ellipse cx={CX} cy={CY} rx={MID_R}   ry={MID_R}   fill="#7edaff" />
        <ellipse cx={CX} cy={CY} rx={INNER_R} ry={INNER_R} fill="#092c69" />

        {/* Connector lines */}
        <line x1={CX + OUTER_R} y1={lineYs[0]} x2={RIGHT_X} y2={lineYs[0]} stroke="#092c69" strokeWidth="0.8" />
        <line x1={CX - OUTER_R} y1={lineYs[1]} x2={LEFT_X}  y2={lineYs[1]} stroke="#092c69" strokeWidth="0.8" />
        <line x1={CX + OUTER_R} y1={lineYs[2]} x2={RIGHT_X} y2={lineYs[2]} stroke="#092c69" strokeWidth="0.8" />

        {/* Value labels inside circles */}
        {[
          { text: layers[0]?.value, y: 28 },
          { text: layers[1]?.value, y: CY + 4 },
          { text: layers[2]?.value, y: CY + 34 },
        ].map(({ text, y }, i) => (
          <text
            key={i}
            x={CX}
            y={y}
            textAnchor="middle"
            fill="white"
            fontFamily="Montserrat, sans-serif"
            fontWeight="700"
            fontSize="13"
          >
            {text}
          </text>
        ))}
      </svg>

      {/* ── Annotation blocks ─────────────────────────────────────────── */}
      {/* Right top */}
      <div
        className="absolute flex flex-col gap-[3px]"
        style={{ top: 18, left: RIGHT_X, width: W - RIGHT_X }}
      >
        <p className="font-[family-name:var(--font\/family\/body)] font-bold text-[8px] leading-[1.2] text-[color:var(--text\/primary,black)]">
          {layers[0]?.label}
        </p>
        <p className="font-[family-name:var(--font\/family\/body)] font-normal text-[5px] leading-[1.4] text-[color:var(--text\/primary,black)]">
          {layers[0]?.body}
        </p>
      </div>

      {/* Left middle */}
      <div
        className="absolute flex flex-col gap-[3px] text-right"
        style={{ top: 62, left: 0, width: LEFT_X }}
      >
        <p className="font-[family-name:var(--font\/family\/body)] font-bold text-[8px] leading-[1.2] text-[color:var(--text\/primary,black)]">
          {layers[1]?.label}
        </p>
        <p className="font-[family-name:var(--font\/family\/body)] font-normal text-[5px] leading-[1.4] text-[color:var(--text\/primary,black)]">
          {layers[1]?.body}
        </p>
      </div>

      {/* Right bottom */}
      <div
        className="absolute flex flex-col gap-[3px]"
        style={{ top: 126, left: RIGHT_X, width: W - RIGHT_X }}
      >
        <p className="font-[family-name:var(--font\/family\/body)] font-bold text-[8px] leading-[1.2] text-[color:var(--text\/primary,black)]">
          {layers[2]?.label}
        </p>
        <p className="font-[family-name:var(--font\/family\/body)] font-normal text-[5px] leading-[1.4] text-[color:var(--text\/primary,black)]">
          {layers[2]?.body}
        </p>
      </div>
    </div>
  );
}
