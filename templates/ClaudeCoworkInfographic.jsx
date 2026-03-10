/**
 * ClaudeCoworkInfographic — 1080×1350px LinkedIn infographic template.
 * Bento-grid layout: 10 sections (7 numbered + 3 non-numbered).
 *
 * LAYOUT (top to bottom, inner width 981px):
 *   Header       — title (73px) + subtitle (32px italic)
 *   Bento Grid   — CSS Grid 2-col, 6 rows (auto-distributed via fr units)
 *     Row 1      — Overview (full width, 2fr)
 *     Row 2      — Section 1 (blue) + Section 2 (orange)   (3fr)
 *     Row 3      — Section 3 (green) + Section 4 (pink)    (3fr)
 *     Row 4      — Section 5 (orange) + Section 6 (blue)   (3fr)
 *     Row 5      — Section 7 (green) + Quick Start (navy)  (3fr)
 *     Row 6      — Limitations (full width, 2fr)
 *   Footer       — "Follow for more" pill bar
 *
 * DATA PROP SHAPE:
 * {
 *   title:         string,
 *   highlightWord: string,
 *   subtitle:      string,
 *   sections: {
 *     overview:    string,   // "What is Cowork?"
 *     s1–s7:       string,   // numbered section titles
 *     quickStart:  string,   // "First 30 Minutes"
 *     limitations: string,   // "Known Limitations"
 *   },
 *   footer: { avatarSrc, name }
 * }
 */

import InfographicHeader from '../components/InfographicHeader.jsx'
import SquareGridTexture from '../components/SquareGridTexture.jsx'
import InfographicFooter from '../components/InfographicFooter.jsx'
import GlassNavySection from '../components/GlassNavySection.jsx'
import BlueSolidBorderSection from '../components/BlueSolidBorderSection.jsx'
import OrangeSolidBorderSection from '../components/OrangeSolidBorderSection.jsx'
import GreenSolidBorderSection from '../components/GreenSolidBorderSection.jsx'
import PinkSolidBorderSection from '../components/PinkSolidBorderSection.jsx'

const GLASS = "bg-[rgba(255,255,255,0.1)] border-3 border-solid border-white content-stretch flex flex-col gap-[10px] h-full w-full items-start relative rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"

export default function ClaudeCoworkInfographic({ data = {} }) {
  const {
    title = 'The Claude Cowork Setup Guide',
    highlightWord = 'Cowork',
    subtitle = 'Set up your AI workspace in 30 minutes',
    sections = {},
    footer = {},
  } = data

  return (
    <div
      className="bg-[#fffceb] flex items-center justify-center relative"
      style={{ width: '1080px', height: '1350px', flexShrink: 0, overflow: 'hidden' }}
      data-name="ClaudeCoworkInfographic"
    >
      <SquareGridTexture />

      <div className="flex flex-col h-full items-center relative w-[981px] py-[28px]">

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <div className="flex-none shrink-0 w-full">
          <InfographicHeader
            title={title}
            highlightWord={highlightWord}
            subtitle={subtitle}
            allowWrap={true}
            titleClassName="text-[72.948px] font-bold tracking-[-2.1884px] leading-[1.02] px-[24px]"
            subtitleClassName="text-[32px] font-medium italic tracking-[-0.96px] leading-[1.1] px-[24px]"
          />
        </div>

        {/* ── BENTO GRID ─────────────────────────────────────────────────── */}
        <div
          className="flex-1 w-full mt-[14px] mb-[14px]"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '2fr 3fr 3fr 3fr 3fr 2fr',
            gap: '12px',
          }}
        >
          {/* Row 1 — Overview (full width, navy glass) */}
          <div style={{ gridColumn: '1 / -1' }}>
            <GlassNavySection
              title={sections.overview || "What is Cowork?"}
              className={GLASS}
              titleSize="24px"
            />
          </div>

          {/* Row 2 — S1 blue + S2 orange */}
          <BlueSolidBorderSection
            title={sections.s1 || "Create Context Files"}
            number="1"
            widthClass="w-full"
            heightClass="h-full"
          />
          <OrangeSolidBorderSection
            title={sections.s2 || "Set Up Instructions"}
            number="2"
            widthClass="w-full"
            heightClass="h-full"
          />

          {/* Row 3 — S3 green + S4 pink */}
          <GreenSolidBorderSection
            title={sections.s3 || "Ask Before Starting"}
            number="3"
            widthClass="w-full"
            heightClass="h-full"
          />
          <PinkSolidBorderSection
            title={sections.s4 || "Install Plugins"}
            number="4"
            widthClass="w-full"
            heightClass="h-full"
          />

          {/* Row 4 — S5 orange + S6 blue */}
          <OrangeSolidBorderSection
            title={sections.s5 || "Connect Your Tools"}
            number="5"
            widthClass="w-full"
            heightClass="h-full"
          />
          <BlueSolidBorderSection
            title={sections.s6 || "Schedule Tasks"}
            number="6"
            widthClass="w-full"
            heightClass="h-full"
          />

          {/* Row 5 — S7 green + Quick Start navy glass */}
          <GreenSolidBorderSection
            title={sections.s7 || "Go Cross-App"}
            number="7"
            widthClass="w-full"
            heightClass="h-full"
          />
          <GlassNavySection
            title={sections.quickStart || "First 30 Minutes"}
            className={GLASS}
            titleSize="24px"
          />

          {/* Row 6 — Limitations (full width, navy glass) */}
          <div style={{ gridColumn: '1 / -1' }}>
            <GlassNavySection
              title={sections.limitations || "Known Limitations"}
              className={GLASS}
              titleSize="24px"
            />
          </div>
        </div>

        {/* ── FOOTER ─────────────────────────────────────────────────────── */}
        <div className="flex-none shrink-0">
          <InfographicFooter
            avatarSrc={footer.avatarSrc || '/assets/avatar/avatar-profile.png'}
            name={footer.name || 'Samy Chouaf'}
            className="h-[60px] relative w-[1048px]"
          />
        </div>

      </div>
    </div>
  )
}
