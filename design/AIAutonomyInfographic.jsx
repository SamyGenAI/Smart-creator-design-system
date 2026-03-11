/**
 * AIAutonomyInfographic — 1080×1350px LinkedIn infographic template.
 * Bento-grid layout: 5 autonomy levels + Pyramid visual + illustration.
 *
 * LAYOUT (top to bottom, inner width 981px):
 *   Header       — title (73px) + subtitle (32px italic)
 *   Bento Grid   — CSS Grid 2-col, 6 rows (auto-distributed via fr units)
 *     Row 1      — Intro (full width, 2fr)
 *     Row 2      — Level 1 (blue) + Level 2 (orange)   (3fr)
 *     Row 3      — Pyramid visual (full width, 4fr)
 *     Row 4      — Level 3 (green) + Level 4 (pink)    (3fr)
 *     Row 5      — Level 5 (orange) + Illustration      (3fr)
 *     Row 6      — CTA (full width, 2fr)
 *   Footer       — "Follow for more" pill bar
 *
 * DATA PROP SHAPE:
 * {
 *   title:         string,
 *   highlightWord: string,
 *   subtitle:      string,
 *   sections: {
 *     intro:       string,
 *     level1:      string,
 *     level2:      string,
 *     level3:      string,
 *     level4:      string,
 *     level5:      string,
 *     cta:         string,
 *   },
 *   pyramid: {
 *     tiers: [{ value, label, body }]
 *   },
 *   illustrationTitle: string,
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
import Pyramid from '../assets/infographics/Pyramid.jsx'

const GLASS = "bg-[rgba(255,255,255,0.1)] border-3 border-solid border-white content-stretch flex flex-col gap-[10px] h-full w-full items-start relative rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"

export default function AIAutonomyInfographic({ data = {} }) {
  const {
    title = 'AI Autonomy',
    highlightWord = 'Autonomy',
    subtitle = 'The 5 levels every business must know',
    sections = {},
    pyramid = {},
    illustrationTitle = 'The Growth Path',
    footer = {},
  } = data

  const pyramidTiers = pyramid.tiers || [
    { value: "Level 5", label: "Self-Evolving AI", body: "AI improves its own models and processes without human input." },
    { value: "Level 3-4", label: "Automated & Autonomous", body: "AI executes full workflows. Humans monitor outcomes, not steps." },
    { value: "Level 1-2", label: "Assisted & Augmented", body: "Humans lead. AI suggests, drafts, and accelerates decisions." },
  ]

  return (
    <div
      className="bg-[#fffceb] flex items-center justify-center relative"
      style={{ width: '1080px', height: '1350px', flexShrink: 0, overflow: 'hidden' }}
      data-name="AIAutonomyInfographic"
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
            gridTemplateRows: '2fr 3fr 4fr 3fr 3fr 2fr',
            gap: '12px',
          }}
        >
          {/* Row 1 — Intro (full width, navy glass) */}
          <div style={{ gridColumn: '1 / -1' }}>
            <GlassNavySection
              title={sections.intro || "What is AI Autonomy?"}
              className={GLASS}
              titleSize="24px"
            />
          </div>

          {/* Row 2 — Level 1 blue + Level 2 orange */}
          <BlueSolidBorderSection
            title={sections.level1 || "Assist the Human"}
            number="1"
            widthClass="w-full"
            heightClass="h-full"
          />
          <OrangeSolidBorderSection
            title={sections.level2 || "Augment Decisions"}
            number="2"
            widthClass="w-full"
            heightClass="h-full"
          />

          {/* Row 3 — Pyramid visual (full width, navy glass with Pyramid child) */}
          <div style={{ gridColumn: '1 / -1' }}>
            <GlassNavySection
              title={sections.pyramidTitle || "The 5 Levels"}
              className={GLASS}
              titleSize="24px"
            >
              <div className="flex-1 w-full flex items-center justify-center px-[20px] pb-[10px]">
                <Pyramid
                  tiers={pyramidTiers}
                  className="relative w-[410px] h-[172.5px]"
                />
              </div>
            </GlassNavySection>
          </div>

          {/* Row 4 — Level 3 green + Level 4 pink */}
          <GreenSolidBorderSection
            title={sections.level3 || "Automate Tasks"}
            number="3"
            widthClass="w-full"
            heightClass="h-full"
          />
          <PinkSolidBorderSection
            title={sections.level4 || "Act Autonomously"}
            number="4"
            widthClass="w-full"
            heightClass="h-full"
          />

          {/* Row 5 — Level 5 orange + Illustration navy glass */}
          <OrangeSolidBorderSection
            title={sections.level5 || "Self-Evolve"}
            number="5"
            widthClass="w-full"
            heightClass="h-full"
          />
          <GlassNavySection
            title={illustrationTitle}
            className={GLASS}
            titleSize="24px"
          >
            <div className="flex-1 w-full flex items-center justify-center pb-[10px]">
              <img
                src="/assets/illustrations/oc-growing.svg"
                alt=""
                className="w-auto h-full max-h-[120px] object-contain"
              />
            </div>
          </GlassNavySection>

          {/* Row 6 — CTA (full width, navy glass) */}
          <div style={{ gridColumn: '1 / -1' }}>
            <GlassNavySection
              title={sections.cta || "Start Your AI Journey"}
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
