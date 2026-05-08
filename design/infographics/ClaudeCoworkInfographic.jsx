/**
 * ClaudeCoworkInfographic — 1080×1350px LinkedIn infographic template.
 * Bento-grid layout: 10 sections (7 numbered + 3 non-numbered).
 *
 * LAYOUT (top to bottom, inner width 981px):
 *   Header       — title (64px) + subtitle (20px)
 *   Bento Grid   — CSS Grid 2-col, 6 rows
 *     Row 1      — Overview (full width, primary glass, 140px)
 *     Row 2      — Section 1 (primary) + Section 2 (accent)   (240px)
 *     Row 3      — Section 3 (success) + Section 4 (support)   (210px)
 *     Row 4      — Section 5 (accent) + Section 6 (primary)    (210px)
 *     Row 5      — Section 7 (success) + Quick Start (primary) (210px)
 *     Row 6      — Limitations (full width, primary glass, 80px)
 *   Footer       — "Follow for more" pill bar
 */

import InfographicHeader from '../../components/InfographicHeader.jsx'
import SquareGridTexture from '../../components/SquareGridTexture.jsx'
import InfographicFooter from '../../components/InfographicFooter.jsx'
import PrimaryGlassSection from '../../components/PrimaryGlassSection.jsx'
import BrandBorderSectionBase from '../../components/BrandBorderSectionBase.jsx'

export default function ClaudeCoworkInfographic({ data = {} }) {
  const {
    title = 'Claude Cowork',
    highlightWord = 'Cowork',
    subtitle = 'Set up your AI workspace in 30 minutes',
    sections = {},
    footer = {},
  } = data

  return (
    <div
      className="bg-canvas flex items-center justify-center relative"
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
            gridTemplateRows: '2fr 3fr 3fr 3fr 3fr 1.2fr',
            gap: '8px',
          }}
        >

          {/* ── ROW 1 — Overview (full width, primary glass) ── */}
          <div className="h-full" style={{ gridColumn: '1 / -1' }}>
            <PrimaryGlassSection
              title={sections.overview || "What is Cowork?"}
              className="h-full w-full"
              titleSize="24px"
              iconSrc="/assets/icons/programming-apps-websites/app-window-expand--Streamline-Freehand.svg"
            >
              <div className="flex items-center w-full flex-1 px-[14px] pb-[6px] -mt-[4px] gap-[10px]">
                <p className="font-montserrat font-medium text-[13px] text-black leading-[1.4] tracking-[-0.26px] flex-1">
                  The non-technical Claude Code. Delegate tasks in the Desktop app — Claude plans, coordinates sub-agents, and delivers finished files.
                </p>
                <div className="shrink-0 self-center">
                  <img src="/assets/illustrations/oc-on-the-laptop.svg" alt="Person on laptop" style={{ width: '100px', height: 'auto' }} />
                </div>
              </div>
            </PrimaryGlassSection>
          </div>

          {/* ── ROW 2 — S1 blue + S2 orange ── */}
          <BrandBorderSectionBase
            theme="primary"
            title={sections.s1 || "Create Context Files"}
            number="1"
            widthClass="w-full"
            heightClass="h-full"
            rootName="section-primary"
          >
            <div className="flex flex-col gap-[6px] overflow-hidden">
              <p className="font-montserrat font-medium text-[12px] text-[var(--theme-color-text-secondary)] leading-[1.3] tracking-[-0.24px]">
                Store your context so Claude remembers you across every task.
              </p>
              {[
                { file: "about-me.md",      desc: "Role, success criteria, examples" },
                { file: "brand-voice.md",   desc: "Tone, samples, anti-patterns" },
                { file: "working-prefs.md", desc: "Formats, guardrails, file naming" },
              ].map(({ file, desc }) => (
                <div key={file} className="flex items-center gap-[6px]">
                  <span className="font-montserrat font-bold text-[11px] text-[var(--theme-color-primary)] bg-[var(--theme-accent-1)] rounded-[4px] px-[6px] py-[2px] leading-[1.2] shrink-0">{file}</span>
                  <span className="font-montserrat font-normal text-[11px] text-black leading-[1.3]">{desc}</span>
                </div>
              ))}
            </div>
          </BrandBorderSectionBase>

          <BrandBorderSectionBase
            theme="accent"
            title={sections.s2 || "Set Up Instructions"}
            number="2"
            widthClass="w-full"
            heightClass="h-full"
            rootName="section-accent"
          >
            <div className="flex flex-col gap-[6px] overflow-hidden w-full">
              <span className="font-montserrat font-bold text-[10px] text-[var(--theme-color-primary)] bg-[var(--theme-accent-5)] rounded-[4px] px-[6px] py-[2px] self-start leading-[1.3]">
                Global · Settings › Cowork › Edit
              </span>
              <div className="flex flex-col gap-[5px]">
                {[
                  "❶ Role & domain",
                  "❷ Style + output formats",
                  "❸ Ask before starting",
                  "❹ Guardrails & limits",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-[6px]">
                    <div className="w-[3px] h-[3px] rounded-full bg-[var(--theme-color-primary)] shrink-0" />
                    <span className="font-montserrat font-normal text-[12px] text-black leading-[1.3]">{item}</span>
                  </div>
                ))}
              </div>
              <span className="font-montserrat font-bold text-[10px] text-[var(--theme-color-primary)] bg-[var(--theme-accent-5)] rounded-[4px] px-[6px] py-[2px] self-start leading-[1.3] mt-[2px]">
                Folder · one brief per project
              </span>
            </div>
          </BrandBorderSectionBase>

          {/* ── ROW 3 — S3 green + S4 pink ── */}
          <BrandBorderSectionBase
            theme="success"
            title={sections.s3 || "Ask Before Starting"}
            number="3"
            widthClass="w-full"
            heightClass="h-full"
            rootName="section-success"
          >
            <div className="flex flex-col gap-[8px] overflow-hidden w-full">
              <div className="bg-[var(--theme-surface-glass-soft)] rounded-[8px] px-[10px] py-[8px] border border-[var(--theme-color-text-muted)]">
                <p className="font-montserrat font-medium text-[12px] text-[var(--theme-color-primary)] leading-[1.4] tracking-[-0.24px] italic">
                  "I want to [TASK] so that [OUTCOME]. Read all files first. Ask clarifying questions before starting."
                </p>
              </div>
              <div className="flex items-center gap-[6px]">
                <div className="w-[4px] h-[4px] rounded-full bg-[var(--theme-color-primary)] shrink-0" />
                <span className="font-montserrat font-semibold text-[12px] text-black leading-[1.3]">Better context &gt; better prompts</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <div className="w-[4px] h-[4px] rounded-full bg-[var(--theme-color-primary)] shrink-0" />
                <span className="font-montserrat font-normal text-[12px] text-black leading-[1.3]">Cuts revision loops in half</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <div className="w-[4px] h-[4px] rounded-full bg-[var(--theme-color-primary)] shrink-0" />
                <span className="font-montserrat font-normal text-[12px] text-black leading-[1.3]">Use on every non-trivial task</span>
              </div>
            </div>
          </BrandBorderSectionBase>

          <BrandBorderSectionBase
            theme="support"
            title={sections.s4 || "Install Plugins"}
            number="4"
            widthClass="w-full"
            heightClass="h-full"
            rootName="section-support"
          >
            <div className="flex flex-col gap-[7px] overflow-hidden w-full">
              <div className="flex flex-wrap gap-[4px]">
                {["Productivity", "Marketing", "Sales", "Finance", "Legal", "Data Analysis", "Product Mgmt"].map((tag) => (
                  <span key={tag} className="font-montserrat font-semibold text-[10px] text-[var(--theme-color-primary)] bg-[var(--theme-accent-4)] rounded-[4px] px-[6px] py-[2px] leading-[1.2]">{tag}</span>
                ))}
              </div>
              <div className="flex flex-col gap-[5px] mt-[2px]">
                <div className="flex items-center gap-[6px]">
                  <div className="w-[4px] h-[4px] rounded-full bg-[var(--theme-color-primary)] shrink-0" />
                  <span className="font-montserrat font-normal text-[12px] text-black leading-[1.3]">Type / for slash commands</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <div className="w-[4px] h-[4px] rounded-full bg-[var(--theme-color-primary)] shrink-0" />
                  <span className="font-montserrat font-normal text-[12px] text-black leading-[1.3]">Markdown files — fully customizable</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <div className="w-[4px] h-[4px] rounded-full bg-[var(--theme-color-primary)] shrink-0" />
                  <span className="font-montserrat font-normal text-[12px] text-black leading-[1.3]">Browse › Install › Customize</span>
                </div>
              </div>
            </div>
          </BrandBorderSectionBase>

          {/* ── ROW 4 — S5 orange + S6 blue ── */}
          <BrandBorderSectionBase
            theme="accent"
            title={sections.s5 || "Connect Your Tools"}
            number="5"
            widthClass="w-full"
            heightClass="h-full"
            rootName="section-accent"
          >
            <div className="flex flex-col gap-[7px] overflow-hidden w-full">
              <span className="font-montserrat font-bold text-[10px] text-[var(--theme-color-primary)] bg-[var(--theme-accent-5)] rounded-[4px] px-[6px] py-[2px] self-start leading-[1.3]">
                50+ connectors via MCP · Free on all plans
              </span>
              <div className="flex flex-wrap gap-[4px]">
                {["Google Drive", "Slack", "Notion", "Figma", "HubSpot", "Gmail", "Calendar", "Asana"].map((tool) => (
                  <span key={tool} className="font-montserrat font-semibold text-[10px] text-white bg-[var(--theme-color-primary)] rounded-[4px] px-[6px] py-[2px] leading-[1.2]">{tool}</span>
                ))}
              </div>
              <div className="flex items-center gap-[6px]">
                <div className="w-[4px] h-[4px] rounded-full bg-[var(--theme-color-primary)] shrink-0" />
                <span className="font-montserrat font-normal text-[12px] text-black leading-[1.3]">Settings › Connectors › Authenticate</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <div className="w-[4px] h-[4px] rounded-full bg-[var(--theme-color-primary)] shrink-0" />
                <span className="font-montserrat font-normal text-[12px] text-black leading-[1.3]">One-time setup per connector</span>
              </div>
            </div>
          </BrandBorderSectionBase>

          <BrandBorderSectionBase
            theme="primary"
            title={sections.s6 || "Schedule Tasks"}
            number="6"
            widthClass="w-full"
            heightClass="h-full"
            rootName="section-primary"
          >
            <div className="flex flex-col gap-[8px] overflow-hidden w-full">
              <div className="flex flex-col gap-[6px]">
                {[
                  { label: "How", text: 'Type /schedule or click "Scheduled"' },
                  { label: "Frequency", text: "Daily, weekly, or custom recurrence" },
                ].map(({ label, text }) => (
                  <div key={label} className="flex flex-col gap-[1px]">
                    <span className="font-montserrat font-bold text-[11px] text-[var(--theme-color-primary)] leading-[1.2]">{label}</span>
                    <span className="font-montserrat font-normal text-[12px] text-black leading-[1.3]">{text}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-[6px] bg-[var(--theme-surface-layer-3)] rounded-[6px] px-[8px] py-[6px]">
                <span className="text-[12px] leading-none mt-[1px]">⚠️</span>
                <span className="font-montserrat font-medium text-[11px] text-[var(--theme-color-primary)] leading-[1.35]">Only runs while computer is awake + app open</span>
              </div>
            </div>
          </BrandBorderSectionBase>

          {/* ── ROW 5 — S7 success + Quick Start primary glass ── */}
          <BrandBorderSectionBase
            theme="success"
            title={sections.s7 || "Go Cross-App"}
            number="7"
            widthClass="w-full"
            heightClass="h-full"
            rootName="section-success"
          >
            <div className="flex flex-col gap-[8px] overflow-hidden w-full">
              <div className="flex flex-col gap-[6px]">
                {[
                  { from: "Excel", to: "PowerPoint", desc: "Pass data between apps" },
                  { from: "Analyze", to: "Present", desc: "Charts into slides" },
                ].map(({ from, to, desc }) => (
                  <div key={from} className="flex items-center gap-[6px]">
                    <span className="font-montserrat font-bold text-[11px] text-white bg-[var(--theme-color-primary)] rounded-[4px] px-[6px] py-[2px] leading-[1.2] shrink-0">{from}</span>
                    <span className="font-montserrat font-bold text-[12px] text-[var(--theme-color-primary)] leading-[1.2]">→</span>
                    <span className="font-montserrat font-bold text-[11px] text-white bg-[var(--theme-color-primary)] rounded-[4px] px-[6px] py-[2px] leading-[1.2] shrink-0">{to}</span>
                    <span className="font-montserrat font-normal text-[11px] text-black leading-[1.3]">{desc}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-[6px] mt-[2px]">
                <div className="w-[4px] h-[4px] rounded-full bg-[var(--theme-color-primary)] shrink-0" />
                <span className="font-montserrat font-medium text-[12px] text-black leading-[1.3]">Mac · Max / Team / Enterprise only</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <div className="w-[4px] h-[4px] rounded-full bg-[var(--theme-color-primary)] shrink-0" />
                <span className="font-montserrat font-normal text-[12px] text-black leading-[1.3]">Both Office add-ins required</span>
              </div>
            </div>
          </BrandBorderSectionBase>

          <PrimaryGlassSection
            title={sections.quickStart || "First 30 Minutes"}
            className="h-full w-full"
            titleSize="24px"
            iconSrc="/assets/icons/business/time-stopwatch--Streamline-Freehand.svg"
          >
            <div className="flex flex-1 w-full px-[14px] pb-[8px] overflow-hidden -mt-[4px] gap-[10px]">
              <div className="flex flex-col gap-[5px] flex-1">
                {[
                  { time: "0–5",    task: "Install app" },
                  { time: "5–10",   task: "Context files" },
                  { time: "10–15",  task: "Global instructions" },
                  { time: "15–20",  task: "Verification prompt" },
                  { time: "20–25",  task: "First real task" },
                  { time: "25–28",  task: "Install plugin" },
                  { time: "28–30",  task: "Connect a tool" },
                ].map(({ time, task }) => (
                  <div key={time} className="flex items-center gap-[6px]">
                    <span className="font-montserrat font-bold text-[9px] text-[var(--theme-color-primary)] bg-[var(--theme-surface-glass-strong)] rounded-[3px] px-[4px] py-[1px] leading-[1.3] shrink-0 min-w-[38px] text-center">{time}</span>
                    <span className="font-montserrat font-normal text-[11px] text-black leading-[1.3]">{task}</span>
                  </div>
                ))}
              </div>
              <div className="shrink-0 self-center">
                <img src="/assets/illustrations/oc-time-flies.svg" alt="Time flies" style={{ width: '130px', height: 'auto' }} />
              </div>
            </div>
          </PrimaryGlassSection>

          {/* ── ROW 6 — Limitations (full width, primary glass) ── */}
          <div className="h-full" style={{ gridColumn: '1 / -1' }}>
            <PrimaryGlassSection
              title={sections.limitations || "Known Limitations"}
              className="h-full w-full"
              titleSize="20px"
              iconSrc="/assets/icons/business/alerts-warning-triangle--Streamline-Freehand.svg"
            >
              <div className="flex items-center gap-[8px] px-[14px] pb-[8px] flex-wrap overflow-hidden flex-1">
                {[
                  "No cross-session memory",
                  "Stops if app closes",
                  "Usage burns faster",
                  "Desktop only",
                  "No image generation",
                  "Research preview",
                ].map((item) => (
                  <span key={item} className="font-montserrat font-medium text-[10px] text-[var(--theme-color-primary)] bg-[var(--theme-surface-glass-strong)] rounded-[4px] px-[7px] py-[3px] leading-[1.2] whitespace-nowrap">{item}</span>
                ))}
              </div>
            </PrimaryGlassSection>
          </div>

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
