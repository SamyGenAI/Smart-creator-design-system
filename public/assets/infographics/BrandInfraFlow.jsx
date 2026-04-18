// BrandInfraFlow — AI+Human brand infrastructure flow diagram
// 650 × 420px — 3-tier vertical flow: Brand → Agents → On-brand output
// Hybrid SVG (arrows) + HTML (boxes) — uses design system tokens

const W = 650, H = 460;

const TAG_COLORS = [
  { bg: "#b4eaff", text: "#092c69" },
  { bg: "#fde68a", text: "#092c69" },
  { bg: "#d2ff9a", text: "#092c69" },
  { bg: "#ffa066", text: "#092c69" },
  { bg: "#ffe6f3", text: "#092c69" },
];

const AGENT_STYLES = [
  { header: "#b4eaff", bg: "rgba(126,218,255,0.15)", border: "#7edaff" },
  { header: "#ffa066", bg: "rgba(255,145,77,0.15)", border: "#ff914d" },
  { header: "#d2ff9a", bg: "rgba(169,255,62,0.15)", border: "#a9ff3e" },
];

const BRAND_BOX = { x: 35, y: 10, w: 580, h: 150 };
const AGENT_Y = 220;
const AGENT_H = 88;
const AGENT_W = 170;
const AGENT_X = [45, 240, 435];
const AGENT_CX = [130, 325, 520];
const OUTPUT_BOX = { x: 75, y: 355, w: 500, h: 95 };

export default function BrandInfraFlow({
  brandItems = [
    "Fonts", "Typography", "Manifesto", "Strategy",
    "Assets", "Templates", "Guidelines", "Tone of Voice",
  ],
  agents = [
    { label: "Agent 1", name: "Copy Writer" },
    { label: "Agent 2", name: "Designer" },
    { label: "Agent 3", name: "Quality Check" },
  ],
  output = "On brand design ready to post and editable on Figma  ",
  figmaLogoSrc = "/assets/logos/app/figma.com.png",
  className,
}) {
  return (
    <div
      className={className || "relative"}
      style={{ width: W, height: H, flexShrink: 0 }}
      data-name="brand-infra-flow"
    >
      {/* ── SVG connector arrows ────────────────────────────────────── */}
      <svg
        className="absolute inset-0 pointer-events-none"
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        aria-hidden="true"
      >
        <defs>
          <marker id="bif-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0.5 L7,4 L0,7.5 L1.5,4 Z" fill="#092c69" />
          </marker>
        </defs>

        {/* Fork: brand box → 3 agents */}
        <line x1={325} y1={BRAND_BOX.y + BRAND_BOX.h} x2={325} y2={185} stroke="#092c69" strokeWidth="2" />
        <line x1={AGENT_CX[0]} y1={185} x2={AGENT_CX[2]} y2={185} stroke="#092c69" strokeWidth="2" />
        {AGENT_CX.map((cx, i) => (
          <line
            key={`fork-${i}`}
            x1={cx} y1={185}
            x2={cx} y2={AGENT_Y - 6}
            stroke="#092c69" strokeWidth="2"
            markerEnd="url(#bif-arrow)"
          />
        ))}

        {/* Merge: 3 agents → output box */}
        {AGENT_CX.map((cx, i) => (
          <line
            key={`merge-up-${i}`}
            x1={cx} y1={AGENT_Y + AGENT_H}
            x2={cx} y2={AGENT_Y + AGENT_H + 18}
            stroke="#092c69" strokeWidth="2"
          />
        ))}
        <line
          x1={AGENT_CX[0]} y1={AGENT_Y + AGENT_H + 18}
          x2={AGENT_CX[2]} y2={AGENT_Y + AGENT_H + 18}
          stroke="#092c69" strokeWidth="2"
        />
        <line
          x1={325} y1={AGENT_Y + AGENT_H + 18}
          x2={325} y2={OUTPUT_BOX.y - 6}
          stroke="#092c69" strokeWidth="2"
          markerEnd="url(#bif-arrow)"
        />
      </svg>

      {/* ── Brand Infrastructure box (navy) ─────────────────────────── */}
      <div
        className="absolute rounded-[16px] flex flex-col items-center justify-center overflow-hidden"
        style={{
          top: BRAND_BOX.y,
          left: BRAND_BOX.x,
          width: BRAND_BOX.w,
          height: BRAND_BOX.h,
          background: "#092c69",
          boxShadow: "0 4px 12px rgba(9,44,105,0.25)",
        }}
      >
        <span
          className="font-['Montserrat',sans-serif] font-bold text-white tracking-[-0.4px] mb-[14px]"
          style={{ fontSize: 20 }}
        >
          Brand Infrastructure
        </span>
        <div className="flex flex-wrap gap-[8px] justify-center px-[24px]">
          {brandItems.map((item, i) => {
            const c = TAG_COLORS[i % TAG_COLORS.length];
            return (
              <span
                key={item}
                className="font-['Montserrat',sans-serif] font-semibold rounded-[6px] px-[10px] py-[4px] leading-[1.3]"
                style={{ fontSize: 12, backgroundColor: c.bg, color: c.text }}
              >
                {item}
              </span>
            );
          })}
        </div>
      </div>

      {/* ── Agent boxes ─────────────────────────────────────────────── */}
      {agents.map((agent, i) => {
        const s = AGENT_STYLES[i % AGENT_STYLES.length];
        return (
          <div
            key={i}
            className="absolute rounded-[12px] overflow-hidden flex flex-col"
            style={{
              top: AGENT_Y,
              left: AGENT_X[i],
              width: AGENT_W,
              height: AGENT_H,
              border: `2px solid ${s.border}`,
              background: s.bg,
            }}
          >
            <div
              className="flex items-center justify-center shrink-0"
              style={{ height: 30, background: s.header }}
            >
              <span
                className="font-['Montserrat',sans-serif] font-bold tracking-[-0.2px] uppercase"
                style={{ fontSize: 11, color: "#092c69" }}
              >
                {agent.label}
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center px-[8px]">
              <span
                className="font-['Montserrat',sans-serif] font-semibold text-center leading-[1.3] tracking-[-0.3px]"
                style={{ fontSize: 16, color: "#092c69" }}
              >
                {agent.name}
              </span>
            </div>
          </div>
        );
      })}

      {/* ── Output box (green border) ───────────────────────────────── */}
      <div
        className="absolute rounded-[12px] flex flex-col items-center justify-center gap-[10px]"
        style={{
          top: OUTPUT_BOX.y,
          left: OUTPUT_BOX.x,
          width: OUTPUT_BOX.w,
          height: OUTPUT_BOX.h,
          border: "2px solid #a9ff3e",
          background: "rgba(169,255,62,0.15)",
        }}
      >
        <span
          className="font-['Montserrat',sans-serif] font-semibold text-center leading-[1.4] tracking-[-0.28px] px-[16px]"
          style={{ fontSize: 14, color: "#092c69" }}
        >
          {output}
        </span>
        <div
          className="shrink-0 flex items-center justify-center rounded-[10px]"
          style={{
            width: 40,
            height: 40,
            background: "#ffffff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
          }}
        >
          <img
            src={figmaLogoSrc}
            alt="Figma"
            className="w-[24px] h-[24px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
