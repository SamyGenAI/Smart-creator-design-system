/**
 * PastelShadowBorderCard — blue-tinted card with border and drop shadow.
 * Figma node: 52:382  (pastel-shadow-border-card)
 *
 * Props:
 *   text        string   — text content inside the card
 *   className   string   — overrides dimensions/positioning
 */
export default function PastelShadowBorderCard({ text = "xxx", className }) {
  return (
    <div
      className={className || "h-[161px] relative w-[381px]"}
      data-name="pastel-shadow-border-card"
      data-node-id="52:382"
    >
      {/* Blue-tinted glass background with border */}
      <div
        className="absolute bg-[var(--components\/card\/blue,rgba(126,218,255,0.15))] border border-[var(--border\/blue,#7edaff)] border-solid inset-0 rounded-[7.951px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
        data-node-id="52:379"
      />

      {/* Text content */}
      <div
        className="absolute flex flex-col font-['Montserrat',sans-serif] font-medium inset-[31.68%_4.95%_51.82%_4.99%] justify-center leading-[0] text-[16px] text-black tracking-[-0.48px]"
        data-node-id="66:759"
      >
        <p className="leading-[normal]">{text}</p>
      </div>
    </div>
  )
}
