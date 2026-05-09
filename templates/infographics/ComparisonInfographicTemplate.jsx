/**
 * ComparisonInfographicTemplate — 1080×1350px two-column comparison layout.
 */

import SquareGridTexture from '../../components/SquareGridTexture.jsx'
import InfographicHeader from '../../components/InfographicHeader.jsx'
import InfographicFooter from '../../components/InfographicFooter.jsx'

export default function ComparisonInfographicTemplate({ data = {} }) {
  const {
    title = "AI Tools VS AI Systems",
    highlightWord = "AI Systems",
    subtitle = null,
    col1Header = "AI Tool",
    col2Header = "AI System",
    rows = [],
    footer = {},
  } = data

  return (
    <div
      className="flex items-center justify-center relative"
      style={{ width: '1080px', height: '1350px', flexShrink: 0, overflow: 'hidden', backgroundColor: '#fffceb' }}
      data-name="ComparisonInfographic"
      data-node-id="5:15871"
    >
      <SquareGridTexture />

      <div
        className="flex flex-col gap-[22px] items-center justify-center relative w-[981px] h-full"
        data-name="Main"
        data-node-id="54:914"
      >
        <div className="max-h-[390px] overflow-hidden shrink-0 w-full">
          <InfographicHeader
            title={title}
            highlightWord={highlightWord}
            subtitle={subtitle}
          />
        </div>

        <div
          className="flex flex-col gap-[10px] w-full shrink-0"
          data-name="ComparisonArea"
        >
          <div className="flex items-center gap-[10px]">
            <div className="shrink-0" style={{ width: '160px' }} />
            <div className="flex-1 flex justify-center">
              <span
                className="bg-[#ffa066] text-[#323241] font-bold text-[20px] tracking-[-0.6px] rounded-[20px] px-[28px] py-[8px] whitespace-nowrap"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {col1Header}
              </span>
            </div>
            <div className="flex-1 flex justify-center">
              <span
                className="bg-[#b4eaff] text-[#092c69] font-bold text-[20px] tracking-[-0.6px] rounded-[20px] px-[28px] py-[8px] whitespace-nowrap"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {col2Header}
              </span>
            </div>
          </div>

          {rows.map((row, i) => (
            <div
              key={i}
              className="flex items-stretch gap-[10px]"
              style={{ height: '92px' }}
              data-name={`Row-${i + 1}`}
            >
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

        <InfographicFooter
          avatarSrc={footer.avatarSrc || "/assets/avatar/avatar-profile.png"}
          name={footer.name || "Your Full Name"}
          className="h-[60px] relative shrink-0 w-[1048px]"
        />
      </div>
    </div>
  )
}
