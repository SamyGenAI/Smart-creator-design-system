/**
 * ComparisonInfographic — 1080×1350px two-column comparison layout.
 * Layout: header + column labels + 8 rows of 3 cards each + footer.
 *
 * DATA PROP SHAPE:
 * {
 *   titleLine1:  string   — large navy display title (no highlight)
 *   titleLine2:  string   — text shown on navy highlight rectangle
 *   col1Header:  string   — left description column label (orange, AI Tool)
 *   col2Header:  string   — right description column label (blue, AI System)
 *   rows: [               — exactly 8 items
 *     { label: string, col1: string, col2: string }
 *   ],
 *   footer: { avatarSrc, name }
 * }
 */

import SquareGridTexture from '../components/SquareGridTexture.jsx'
import InfographicHeader from '../components/InfographicHeader.jsx'
import InfographicFooter from '../components/InfographicFooter.jsx'

export default function ComparisonInfographic({ data = {} }) {
  const {
    title         = "AI Tools VS AI Systems",
    highlightWord = "AI Systems",
    subtitle      = null,
    col1Header    = "AI Tool",
    col2Header = "AI System",
    rows       = [],
    footer     = {},
  } = data

  return (
    <div
      className="flex items-center justify-center relative"
      style={{ width: '1080px', height: '1350px', flexShrink: 0, overflow: 'hidden', backgroundColor: '#fffceb' }}
      data-name="ComparisonInfographic"
      data-node-id="5:15871"
    >
      <SquareGridTexture />

      {/* Main content column — 981px wide, vertically centered */}
      <div
        className="flex flex-col gap-[22px] items-center justify-center relative w-[981px] h-full"
        data-name="Main"
        data-node-id="54:914"
      >

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="max-h-[390px] overflow-hidden shrink-0 w-full">
          <InfographicHeader
            title={title}
            highlightWord={highlightWord}
            subtitle={subtitle}
          />
        </div>

        {/* ── COMPARISON AREA ────────────────────────────────────── */}
        <div
          className="flex flex-col gap-[10px] w-full shrink-0"
          data-name="ComparisonArea"
        >
          {/* Column header chips */}
          <div className="flex items-center gap-[10px]">
            {/* Spacer aligned with label column */}
            <div className="shrink-0" style={{ width: '160px' }} />
            {/* AI Tool header — orange */}
            <div className="flex-1 flex justify-center">
              <span
                className="bg-[#ffa066] text-[#323241] font-bold text-[20px] tracking-[-0.6px] rounded-[20px] px-[28px] py-[8px] whitespace-nowrap"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {col1Header}
              </span>
            </div>
            {/* AI System header — blue */}
            <div className="flex-1 flex justify-center">
              <span
                className="bg-[#b4eaff] text-[#092c69] font-bold text-[20px] tracking-[-0.6px] rounded-[20px] px-[28px] py-[8px] whitespace-nowrap"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {col2Header}
              </span>
            </div>
          </div>

          {/* 8 comparison rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex items-stretch gap-[10px]"
              style={{ height: '92px' }}
              data-name={`Row-${i + 1}`}
            >
              {/* Card 1 — Feature label (navy bg, white bold text) */}
              <div
                className="shrink-0 flex items-center justify-center rounded-[14px] bg-[#092c69] px-[12px]"
                style={{ width: '160px' }}
              >
                <p
                  className="text-white font-bold text-[16px] tracking-[-0.48px] text-center leading-[1.3]"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {row.label}
                </p>
              </div>

              {/* Card 2 — AI Tool description (orange tint) */}
              <div
                className="flex-1 flex items-center rounded-[14px] px-[18px] py-[12px]"
                style={{
                  background: 'rgba(255,145,77,0.12)',
                  border: '1.5px solid #ff914d',
                }}
              >
                <p
                  className="text-[#323241] font-medium text-[16px] tracking-[-0.32px] leading-[1.45]"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {row.col1}
                </p>
              </div>

              {/* Card 3 — AI System description (blue tint) */}
              <div
                className="flex-1 flex items-center rounded-[14px] px-[18px] py-[12px]"
                style={{
                  background: 'rgba(126,218,255,0.15)',
                  border: '1.5px solid #7edaff',
                }}
              >
                <p
                  className="text-[#092c69] font-semibold text-[16px] tracking-[-0.32px] leading-[1.45]"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {row.col2}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── FOOTER ─────────────────────────────────────────────── */}
        <InfographicFooter
          avatarSrc={footer.avatarSrc || "/assets/avatar/avatar-profile.png"}
          name={footer.name || "Samy Chouaf"}
          className="h-[60px] relative shrink-0 w-[1048px]"
        />

      </div>
    </div>
  )
}
