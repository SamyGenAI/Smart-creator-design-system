/**
 * DesignWithAI — 1080×1350px LinkedIn infographic.
 * "How to Design with AI in 2026"
 *
 * LAYOUT:
 *   Header       — title + subtitle
 *   Body         — 2-column grid: "Graphic Design" + "Product Design"
 *                  Each column: navy header + 3 GlassNavySection cards
 *   Footer       — branded "Follow for more" bar
 *
 * Cards use the GlassNavySection component (glass white bg, navy header).
 * Workflow pills use rotating colors with soft shadows.
 * "Workflow:" and "Tools:" labels are navy bg with white text.
 */

import InfographicHeader from '../components/InfographicHeader.jsx'
import SquareGridTexture from '../components/SquareGridTexture.jsx'
import InfographicFooter from '../components/InfographicFooter.jsx'
import GlassNavySection from '../components/GlassNavySection.jsx'

/* ── Color palette for workflow pills ──────────────────────────── */
const PILL_COLORS = [
  '#b4eaff',  // blue
  '#fde68a',  // amber
  '#d2ff9a',  // green
  '#ffe6f3',  // pink
  '#ffa066',  // orange
  '#c7efff',  // light blue
]

/* ── Workflow Line ─────────────────────────────────────────────── */
function WorkflowLine({ steps }) {
  return (
    <div className="flex items-center gap-[5px] flex-wrap">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-[5px]">
          <div
            className="flex items-center justify-center rounded-[8px] px-[8px] py-[3px] shrink-0 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10)]"
            style={{ backgroundColor: PILL_COLORS[i % PILL_COLORS.length] }}
          >
            <p className="font-['Montserrat',sans-serif] font-medium text-[11px] text-black leading-[1.3] whitespace-nowrap tracking-[-0.33px]">
              {step}
            </p>
          </div>
          {i < steps.length - 1 && (
            <span className="font-['Montserrat',sans-serif] font-black text-[18px] text-[#092c69] leading-none shrink-0">→</span>
          )}
        </div>
      ))}
    </div>
  )
}

/* ── "Or" Separator ────────────────────────────────────────────── */
function OrSeparator() {
  return (
    <div className="flex items-center gap-[8px] w-full py-[2px]">
      <div className="flex-1 h-[1px] bg-[#092c69] opacity-15" />
      <p className="font-['Montserrat',sans-serif] font-bold text-[10px] text-[#092c69] opacity-50 leading-normal tracking-[-0.3px]">
        Or
      </p>
      <div className="flex-1 h-[1px] bg-[#092c69] opacity-15" />
    </div>
  )
}

/* ── Tool Logo with Name ───────────────────────────────────────── */
function ToolLogo({ src, alt, name }) {
  return (
    <div className="flex items-center gap-[5px]">
      <div
        className="bg-white rounded-[7px] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.18)] flex items-center justify-center overflow-hidden shrink-0"
        style={{ width: '28px', height: '28px', padding: '3px' }}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-contain" />
        ) : (
          <p className="font-['Montserrat',sans-serif] font-bold text-[9px] text-[#092c69] leading-none text-center">
            {(name || alt || '?').charAt(0)}
          </p>
        )}
      </div>
      <p className="font-['Montserrat',sans-serif] font-semibold text-[11px] text-[#092c69] leading-normal tracking-[-0.33px] whitespace-nowrap">
        {name || alt}
      </p>
    </div>
  )
}

/* ── Section Label — navy bg, white text ───────────────────────── */
function SectionLabel({ text }) {
  return (
    <div className="rounded-[5px] px-[7px] py-[2px] self-start shrink-0 bg-[#092c69] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.15)]">
      <p className="font-['Montserrat',sans-serif] font-bold text-[11px] text-white leading-normal tracking-[-0.33px]">
        {text}
      </p>
    </div>
  )
}

/* ── Glass Navy Card body content ──────────────────────────────── */
function CardBody({ workflows, logos }) {
  return (
    <div className="flex flex-col gap-[14px] flex-1 w-full px-[10px] py-[8px] min-h-0 justify-start overflow-hidden">
      {/* Workflow section */}
      <div className="flex flex-col gap-[4px]">
        <SectionLabel text="Workflow :" />
        {workflows.map((wf, i) => (
          <div key={i}>
            {i > 0 && <OrSeparator />}
            <WorkflowLine steps={wf} />
          </div>
        ))}
      </div>

      {/* Tools section */}
      <div className="flex flex-col gap-[4px]">
        <SectionLabel text="Tools :" />
        <div className="flex items-center gap-[10px] flex-wrap">
          {logos.map((logo, i) => (
            <ToolLogo key={i} src={logo.src} alt={logo.alt} name={logo.name} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Glass card className (fills flex space) ───────────────────── */
const GLASS_CARD = "bg-[rgba(255,255,255,0.1)] border-3 border-solid border-white content-stretch flex flex-col gap-[6px] items-start relative rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full h-full"

/* ── Main Infographic ──────────────────────────────────────────── */
export default function DesignWithAI({ data = {} }) {
  const {
    title = 'How to Design with AI',
    highlightWord = 'with AI',
    subtitle = 'The ultimate toolkit for designers in 2026',
    graphicDesign = {},
    productDesign = {},
    footer = {},
  } = data

  // ─── GRAPHIC DESIGN CARDS ───────────────────────────────────────
  const gd = graphicDesign.cards || [
    {
      title: 'Social Content',
      workflows: [
        ['Build brand kit (Figma/Canva)', 'Create assets (NanoBanana)', 'Write brief', 'Generate (Claude)', 'Refine manually', 'Schedule & post'],
      ],
      logos: [
        { src: '/assets/logos/app/canva.com.png', alt: 'Canva', name: 'Canva' },
        { src: '/assets/logos/app/figma.com.png', alt: 'Figma', name: 'Figma' },
        { src: '/assets/logos/app/nanobanana.com.png', alt: 'NanoBanana', name: 'NanoBanana 2' },
        { src: '/assets/logos/app/claude.ai.png', alt: 'Claude', name: 'Claude Code' },
      ],
    },
    {
      title: 'Ads & Campaigns',
      workflows: [
        ['Upload brand assets (Pomelli/Claude)', 'Extract Brand DNA', 'Generate ad creatives', 'A/B variations at scale', 'Launch campaign'],
        ['Generate assets (NanoBanana)', 'Add to branded templates (Canva/Figma)', 'Launch campaign'],
      ],
      logos: [
        { src: '/assets/logos/app/claude.ai.png', alt: 'Claude', name: 'Claude Code' },
        { src: '/assets/logos/app/canva.com.png', alt: 'Canva', name: 'Canva' },
        { src: '/assets/logos/app/figma.com.png', alt: 'Figma', name: 'Figma' },
        { src: '/assets/logos/app/pomelli.ai.png', alt: 'Pomelli', name: 'Pomelli' },
        { src: '/assets/logos/app/nanobanana.com.png', alt: 'NanoBanana', name: 'NanoBanana 2' },
      ],
    },
    {
      title: 'Brand Assets',
      workflows: [
        ['Define brand brief', 'Generate logo concepts (NanoBanana)', 'Refine in Figma', 'Build brand system', 'Export all formats'],
        ['Use AI brand generator (Pomelli)', 'Review & customize', 'Export assets'],
      ],
      logos: [
        { src: '/assets/logos/app/figma.com.png', alt: 'Figma', name: 'Figma' },
        { src: '/assets/logos/app/nanobanana.com.png', alt: 'NanoBanana', name: 'NanoBanana 2' },
        { src: '/assets/logos/app/pomelli.ai.png', alt: 'Pomelli', name: 'Pomelli' },
      ],
    },
  ]

  // ─── PRODUCT DESIGN CARDS ──────────────────────────────────────
  const pd = productDesign.cards || [
    {
      title: 'Landing Pages',
      workflows: [
        ['Describe the page (prompt)', 'AI generates full site (Lovable/v0)', 'Refine in editor', 'Ship to production'],
        ['Design in Figma', 'Convert to code (Claude Code/Cursor)', 'Deploy (Framer)'],
      ],
      logos: [
        { src: '/assets/logos/app/claude.ai.png', alt: 'Claude', name: 'Claude Code' },
        { src: '/assets/logos/app/lovable.dev.png', alt: 'Lovable', name: 'Lovable' },
        { src: '/assets/logos/app/v0.dev.png', alt: 'v0', name: 'v0' },
        { src: null, alt: 'Framer', name: 'Framer' },
      ],
    },
    {
      title: 'Web & Mobile Apps',
      workflows: [
        ['Design UI (Figma Make)', 'AI generates prototype (Stitch)', 'Code with AI (Cursor/Claude)', 'Test & iterate'],
        ['Prompt full app (Lovable/Antigravity)', 'Customize & connect APIs', 'Deploy'],
      ],
      logos: [
        { src: '/assets/logos/app/figma.com.png', alt: 'Figma', name: 'Figma Make' },
        { src: '/assets/logos/app/stitch.withgoogle.com.png', alt: 'Stitch', name: 'Stitch' },
        { src: '/assets/logos/app/cursor.com.png', alt: 'Cursor', name: 'Cursor' },
        { src: '/assets/logos/app/claude.ai.png', alt: 'Claude', name: 'Claude Code' },
        { src: '/assets/logos/app/lovable.dev.png', alt: 'Lovable', name: 'Lovable' },
        { src: null, alt: 'Antigravity', name: 'Antigravity' },
      ],
    },
    {
      title: 'Design Systems',
      workflows: [
        ['Define tokens in Figma', 'Build components (Figma)', 'Sync to code (Figma MCP + Cursor)', 'Auto-generate docs'],
        ['AI generates component library (Stitch)', 'Map to Figma (Code Connect)', 'Maintain with Claude'],
      ],
      logos: [
        { src: '/assets/logos/app/figma.com.png', alt: 'Figma', name: 'Figma' },
        { src: '/assets/logos/app/stitch.withgoogle.com.png', alt: 'Stitch', name: 'Stitch' },
        { src: '/assets/logos/app/cursor.com.png', alt: 'Cursor', name: 'Cursor' },
        { src: '/assets/logos/app/claude.ai.png', alt: 'Claude', name: 'Claude Code' },
      ],
    },
  ]

  return (
    <div
      className="bg-[#fffceb] flex items-center justify-center relative"
      style={{ width: '1080px', height: '1350px', flexShrink: 0, overflow: 'hidden' }}
      data-name="DesignWithAI"
    >
      <SquareGridTexture />

      <div className="flex flex-col h-full items-center relative w-[981px] py-[28px]">

        {/* ── HEADER ─────────────────────────────────────────── */}
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

        {/* ── BODY: 2-column grid — rows align across columns ── */}
        <div
          className="flex-1 w-full mt-[14px] mb-[14px] min-h-0"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto 1fr 1fr 1fr',
            gap: '10px 16px',
          }}
        >
          {/* Column headers */}
          <div
            className="bg-[var(--color\/blue\/500,#092c69)] border-3 border-solid border-white h-[70px] rounded-[14px] w-full relative flex items-center justify-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
            data-name="graphic-design-header"
          >
            <p className="font-['Montserrat',sans-serif] font-bold text-[36px] text-center text-white tracking-[-1.08px] leading-normal">
              {graphicDesign.title || "Graphic Design"}
            </p>
          </div>
          <div
            className="bg-[var(--color\/blue\/500,#092c69)] border-3 border-solid border-white h-[70px] rounded-[14px] w-full relative flex items-center justify-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
            data-name="product-design-header"
          >
            <p className="font-['Montserrat',sans-serif] font-bold text-[36px] text-center text-white tracking-[-1.08px] leading-normal">
              {productDesign.title || "Product Design"}
            </p>
          </div>

          {/* Row 1: Social Content | Landing Pages */}
          <GlassNavySection title={gd[0].title} className={GLASS_CARD} titleSize="18px" iconSrc="/assets/icons/white/content-brush-pen--Streamline-Freehand.svg" iconAlt="Social Content">
            <CardBody workflows={gd[0].workflows} logos={gd[0].logos} />
          </GlassNavySection>
          <GlassNavySection title={pd[0].title} className={GLASS_CARD} titleSize="18px" iconSrc="/assets/icons/white/website-development-browser-hand--Streamline-Freehand.svg" iconAlt="Landing Pages">
            <CardBody workflows={pd[0].workflows} logos={pd[0].logos} />
          </GlassNavySection>

          {/* Row 2: Ads & Campaigns | Web & Mobile Apps */}
          <GlassNavySection title={gd[1].title} className={GLASS_CARD} titleSize="18px" iconSrc="/assets/icons/white/advertising-ad-browser--Streamline-Freehand.svg" iconAlt="Ads & Campaigns">
            <CardBody workflows={gd[1].workflows} logos={gd[1].logos} />
          </GlassNavySection>
          <GlassNavySection title={pd[1].title} className={GLASS_CARD} titleSize="18px" iconSrc="/assets/icons/white/connect-device-exchange--Streamline-Freehand.svg" iconAlt="Web & Mobile Apps">
            <CardBody workflows={pd[1].workflows} logos={pd[1].logos} />
          </GlassNavySection>

          {/* Row 3: Brand Assets | Design Systems */}
          <GlassNavySection title={gd[2].title} className={GLASS_CARD} titleSize="18px" iconSrc="/assets/icons/white/color-brush-1--Streamline-Freehand.svg" iconAlt="Brand Assets">
            <CardBody workflows={gd[2].workflows} logos={gd[2].logos} />
          </GlassNavySection>
          <GlassNavySection title={pd[2].title} className={GLASS_CARD} titleSize="18px" iconSrc="/assets/icons/white/layers-stacked-1--Streamline-Freehand.svg" iconAlt="Design Systems">
            <CardBody workflows={pd[2].workflows} logos={pd[2].logos} />
          </GlassNavySection>
        </div>

        {/* ── FOOTER ─────────────────────────────────────────── */}
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
