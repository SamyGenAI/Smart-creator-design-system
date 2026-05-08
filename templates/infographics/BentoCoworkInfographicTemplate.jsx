/**
 * BentoCoworkInfographicTemplate — 1080×1350px bento-grid infographic layout.
 */

import InfographicHeader from '../../components/InfographicHeader.jsx'
import SquareGridTexture from '../../components/SquareGridTexture.jsx'
import InfographicFooter from '../../components/InfographicFooter.jsx'
import PrimaryGlassSection from '../../components/PrimaryGlassSection.jsx'
import BrandBorderSectionBase from '../../components/BrandBorderSectionBase.jsx'

const GLASS = "bg-[var(--theme-surface-glass-soft)] border-3 border-solid border-[var(--theme-color-on-primary)] content-stretch flex flex-col gap-[10px] h-full w-full items-start relative rounded-[20px] shadow-[var(--theme-shadow-card)]"

export default function BentoCoworkInfographicTemplate({ data = {} }) {
  const {
    title = 'The Claude Cowork Setup Guide',
    highlightWord = 'Cowork',
    subtitle = 'Set up your AI workspace in 30 minutes',
    sections = {},
    footer = {},
  } = data

  return (
    <div
      className="bg-[var(--theme-surface-canvas)] flex items-center justify-center relative"
      style={{ width: '1080px', height: '1350px', flexShrink: 0, overflow: 'hidden' }}
      data-name="BentoCoworkInfographicTemplate"
    >
      <SquareGridTexture />

      <div className="flex flex-col h-full items-center relative w-[981px] py-[28px]">
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

        <div
          className="flex-1 w-full mt-[14px] mb-[14px]"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '2fr 3fr 3fr 3fr 3fr 2fr',
            gap: '12px',
          }}
        >
          <div style={{ gridColumn: '1 / -1' }}>
            <PrimaryGlassSection
              title={sections.overview || "What is Cowork?"}
              className={GLASS}
              titleSize="24px"
            />
          </div>

          <BrandBorderSectionBase
            theme="primary"
            title={sections.s1 || "Create Context Files"}
            number="1"
            widthClass="w-full"
            heightClass="h-full"
            rootName="section-primary"
          />
          <BrandBorderSectionBase
            theme="accent"
            title={sections.s2 || "Set Up Instructions"}
            number="2"
            widthClass="w-full"
            heightClass="h-full"
            rootName="section-accent"
          />

          <BrandBorderSectionBase
            theme="success"
            title={sections.s3 || "Ask Before Starting"}
            number="3"
            widthClass="w-full"
            heightClass="h-full"
            rootName="section-success"
          />
          <BrandBorderSectionBase
            theme="support"
            title={sections.s4 || "Install Plugins"}
            number="4"
            widthClass="w-full"
            heightClass="h-full"
            rootName="section-support"
          />

          <BrandBorderSectionBase
            theme="accent"
            title={sections.s5 || "Connect Your Tools"}
            number="5"
            widthClass="w-full"
            heightClass="h-full"
            rootName="section-accent"
          />
          <BrandBorderSectionBase
            theme="primary"
            title={sections.s6 || "Schedule Tasks"}
            number="6"
            widthClass="w-full"
            heightClass="h-full"
            rootName="section-primary"
          />

          <BrandBorderSectionBase
            theme="success"
            title={sections.s7 || "Go Cross-App"}
            number="7"
            widthClass="w-full"
            heightClass="h-full"
            rootName="section-success"
          />
          <PrimaryGlassSection
            title={sections.quickStart || "First 30 Minutes"}
            className={GLASS}
            titleSize="24px"
          />

          <div style={{ gridColumn: '1 / -1' }}>
            <PrimaryGlassSection
              title={sections.limitations || "Known Limitations"}
              className={GLASS}
              titleSize="24px"
            />
          </div>
        </div>

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
