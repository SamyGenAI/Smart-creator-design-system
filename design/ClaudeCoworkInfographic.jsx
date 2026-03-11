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
    title = 'Claude Cowork setup guide',
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

      <div className="flex flex-col h-full items-center relative w-[981px] py-[20px]">

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <div className="flex-none shrink-0 w-full pb-[8px]">
          <InfographicHeader
            title={title}
            highlightWord={highlightWord}
            subtitle={subtitle}
            allowWrap={true}
            titleStyle={{ fontSize: '64px', letterSpacing: '-1.92px' }}
            subtitleStyle={{ fontSize: '20px', letterSpacing: '-0.4px', fontStyle: 'normal' }}
            className="gap-[6px]"
          />
        </div>

        {/* ── BENTO GRID ─────────────────────────────────────────────────── */}
        <div
          className="flex-1 min-h-0 w-full"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '140px 240px 210px 210px 210px 80px',
            gap: '8px',
          }}
        >
          {/* Row 1 — Overview (full width, navy glass) */}
          <div className="h-full" style={{ gridColumn: '1 / -1' }}>
            <GlassNavySection
              title={sections.overview || "What is Cowork?"}
              className={GLASS}
              titleSize="24px"
              iconSrc="/assets/icons/programming-apps-websites/app-window-expand--Streamline-Freehand.svg"
            >
              
              <div className="flex items-center w-full flex-1 px-[14px] pb-[6px]">
                <p className="font-['Montserrat',sans-serif] font-normal text-[11px] text-black leading-[1.35] tracking-[-0.22px]">
                  The non-technical Claude Code. Delegate tasks in the Desktop app : Claude plans, coordinates sub-agents in parallel, and delivers finished files on your computer. It's like giving an AI agent 'read' and 'edit' access to your Excel, PDF, PPT files 
                </p>
              </div>
            </GlassNavySection>
          </div>

          {/* Row 2 — S1 blue + S2 orange */}
          <BlueSolidBorderSection
            title={sections.s1 || "Create Context Files"}
            number="1"
            widthClass="w-full"
            heightClass="h-full"
          >
            <div className="flex flex-col gap-[8px]">
              <p className="font-['Montserrat',sans-serif] font-medium text-[10px] text-[#323241] leading-[1.3] tracking-[-0.2px]">
                Store your context so Claude remembers you across every task.
              </p>
              {[
                { file: "about-me.md",     desc: "Who you are, your role & success criteria" },
                { file: "brand-voice.md",  desc: "Tone of voice & writing samples" },
                { file: "working-prefs.md",desc: "Output formats & guardrails" },
              ].map(({ file, desc }) => (
                <div key={file} className="flex flex-col gap-[2px] items-start">
                  <span className="font-['Montserrat',sans-serif] font-bold text-[10px] text-[#092c69] bg-[#b4eaff] rounded-[4px] px-[6px] py-[2px] leading-[1.2]">{file}</span>
                  <span className="font-['Montserrat',sans-serif] font-normal text-[10px] text-black leading-[1.3] pl-[2px]">{desc}</span>
                </div>
              ))}
            </div>
          </BlueSolidBorderSection>
          <OrangeSolidBorderSection
            title={sections.s2 || "Set Up Instructions"}
            number="2"
            widthClass="w-full"
            heightClass="h-full"
          >
            <div className="flex flex-col gap-[3px] pb-[4px] flex-1 self-stretch items-center justify-center overflow-hidden">
              <span className="font-['Montserrat',sans-serif] font-bold text-[8px] text-[#092c69] bg-[#ffa066] rounded-[3px] px-[3px] py-[1px] self-start">Global : Settings › Cowork › Edit</span>
              <span className="font-['Montserrat',sans-serif] font-normal text-[8px] text-black leading-[1.2]">❶ Role, domain ❷ Style + formats</span>
              <span className="font-['Montserrat',sans-serif] font-normal text-[8px] text-black leading-[1.2]">❸ Ask before starting ❹ Guardrails</span>
              <span className="font-['Montserrat',sans-serif] font-bold text-[8px] text-[#092c69] bg-[#ffa066] rounded-[3px] px-[3px] py-[1px] self-start">Folder : per project brief</span>
            </div>
          </OrangeSolidBorderSection>

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
        </div>

        {/* ── FOOTER ─────────────────────────────────────────────────────── */}
        <div className="flex-none shrink-0 w-full pt-[8px]">
          <InfographicFooter
            avatarSrc={footer.avatarSrc || '/assets/avatar/avatar-profile.png'}
            name={footer.name || 'Samy Chouaf'}
            className="h-[60px] relative w-full"
          />
        </div>

      </div>
    </div>
  )
}
