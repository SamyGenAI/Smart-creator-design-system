import { CarouselNavbarCentered, CarouselSlideShell } from '../../components/CarouselPrimitives.jsx'

/**
 * LinkedIn Carousel — "How to use Claude Code as a non-technical"
 * Style: tokenized background and text · Montserrat
 * Faithful to Figma template node 193:32
 */

const CARD_SHADOW = 'var(--theme-shadow-card)'
const TEXT_PRIMARY = 'var(--theme-color-text-primary)'
const BACKGROUND_PRIMARY = 'var(--theme-surface-canvas)'
const BORDER_PRIMARY = `3px solid ${TEXT_PRIMARY}`

const NAVBAR = <CarouselNavbarCentered textColor={TEXT_PRIMARY} />

function Slide({ children, nodeId, name }) {
  return (
    <CarouselSlideShell
      nodeId={nodeId}
      name={name}
      navbar={NAVBAR}
      background={BACKGROUND_PRIMARY}
    >
      {children}
    </CarouselSlideShell>
  )
}

// ─── Blue accent pill ─────────────────────────────────────────────────────────

function AccentPill({ left, top, width, height = 76, radius = 20 }) {
  return (
    <div style={{
      position: 'absolute',
      left, top, width,
      height,
      background: 'var(--theme-accent-1)',
      borderRadius: radius,
    }} />
  )
}

// ─── Screenshot placeholder (user drops screen manually) ─────────────────────

function ScreenPlaceholder({ top, height = 544, left = 31, width = 1017 }) {
  return (
    <div style={{
      position: 'absolute',
      left,
      top,
      width,
      height,
      borderRadius: 20,
      boxShadow: CARD_SHADOW,
      background: 'rgba(0,0,0,0.04)',
      border: '2px dashed rgba(0,0,0,0.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <p style={{ margin: 0, fontSize: 28, color: 'rgba(0,0,0,0.25)', fontWeight: 500 }}>
        [ screen goes here ]
      </p>
    </div>
  )
}

// ─── Step label (numbered list style matching slides 6 & 7) ──────────────────

function StepLabel({ number, text, italic, top = 217 }) {
  return (
    <div style={{
      position: 'absolute',
      left: 56,
      top,
      width: 1002,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 0,
    }}>
      <span style={{
        fontSize: 64,
        fontWeight: 500,
        lineHeight: '70px',
        color: TEXT_PRIMARY,
        minWidth: 96,
        flexShrink: 0,
      }}>
        {number}.
      </span>
      <p style={{
        margin: 0,
        fontSize: 64,
        fontWeight: 500,
        lineHeight: '70px',
        color: TEXT_PRIMARY,
        fontStyle: italic ? 'italic' : 'normal',
      }}>
        {text}
      </p>
    </div>
  )
}

// ─── Bottom text box (pill with small descriptive text) ──────────────────────

function BottomTextBox({ text, top = 1124 }) {
  return (
    <div style={{
      position: 'absolute',
      left: 39,
      top,
      width: 1001,
      minHeight: 163,
      background: '#fff',
      borderRadius: 40,
      padding: '28px 40px',
      boxShadow: CARD_SHADOW,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
    }}>
      <p style={{
        margin: 0,
        fontSize: 32,
        fontWeight: 500,
        lineHeight: '50px',
        color: TEXT_PRIMARY,
        whiteSpace: 'pre-wrap',
      }}>
        {text}
      </p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXISTING SLIDES (faithful recreation of your Figma design)
// ═══════════════════════════════════════════════════════════════════════════════

function SlideCover() {
  return (
    <Slide nodeId="194:76" name="Slide-cover">
      <div style={{ position: 'absolute', left: 257, top: 44, width: 565, height: 101, border: BORDER_PRIMARY, borderRadius: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ margin: 0, fontSize: 64, fontWeight: 500, color: TEXT_PRIMARY, lineHeight: '70px' }}>Follow the steps</p>
      </div>
      <AccentPill left={74} top={609} width={957} height={130} radius={30} />
      <p style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 217, width: 983, height: 566, fontSize: 128, fontWeight: 700, lineHeight: '130px', textAlign: 'center', color: TEXT_PRIMARY, margin: 0, whiteSpace: 'pre-wrap' }}>
        {'How to use Claude code as a \nnon-technical'}
      </p>
      <img src="/assets/illustrations/notion-style/oc-on-the-laptop.svg" alt="" style={{ position: 'absolute', left: 282, top: 875, width: 515, height: 369, objectFit: 'contain' }} />
    </Slide>
  )
}

function Slide1() {
  return (
    <Slide nodeId="194:82" name="Slide-1">
      <p style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 544, fontSize: 72, fontWeight: 500, lineHeight: '100px', textAlign: 'center', color: TEXT_PRIMARY, margin: 0 }}>
        Claude code sounds scary...
      </p>
    </Slide>
  )
}

function Slide2() {
  return (
    <Slide nodeId="200:110" name="Slide-2">
      <p style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 299, width: 544, fontSize: 72, fontWeight: 500, lineHeight: '100px', textAlign: 'center', color: TEXT_PRIMARY, margin: 0 }}>
        But you don't need to write a single line of code to use it.
      </p>
      <img src="/assets/illustrations/notion-style/oc-work-balance.svg" alt="" style={{ position: 'absolute', left: 432, top: 823, width: 309, height: 379, objectFit: 'contain' }} />
    </Slide>
  )
}

function Slide3() {
  const items = [
    { src: '/assets/logos/app/microsoft.com.png', text: 'Creating and editing complex Excel files', top: 588, iconW: 131, iconH: 122, left: 111, textLeft: 302 },
    { src: '/assets/logos/app/microsoft.com.png', text: 'Creating branded PowerPoint presentations', top: 830, iconW: 131, iconH: 122, left: 111, textLeft: 286 },
    { src: '/assets/logos/app/folder.png',         text: 'Managing files and folders on your computer', top: 1035, iconW: 159, iconH: 150, left: 101, textLeft: 288 },
  ]
  return (
    <Slide nodeId="200:69" name="Slide-3">
      <AccentPill left={194} top={253} width={577} />
      <p style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 241, width: 659, fontSize: 72, fontWeight: 500, lineHeight: '100px', textAlign: 'center', color: TEXT_PRIMARY, margin: 0 }}>
        Claude Cowork is great for :
      </p>
      {items.map(({ src, text, top, iconW, iconH, left, textLeft }) => (
        <div key={top} style={{ position: 'absolute', left, top, display: 'flex', alignItems: 'center', width: 878 }}>
          <img src={src} alt="" style={{ width: iconW, height: iconH, objectFit: 'contain', flexShrink: 0 }} />
          <p style={{ position: 'absolute', left: textLeft - left, margin: 0, fontSize: 48, fontWeight: 500, lineHeight: '70px', color: TEXT_PRIMARY, width: 692 }}>{text}</p>
        </div>
      ))}
    </Slide>
  )
}

function Slide4() {
  const items = [
    { src: '/assets/logos/app/figma.com.png',    text: 'Building complex AI-design systems',             top: 578, left: 145, iconW: 97,  iconH: 146, textLeft: 301 },
    { src: '/assets/logos/app/linkedin.com.png', text: 'Building advanced GTM sales systems',            top: 800, left: 132, iconW: 121, iconH: 121, textLeft: 301 },
    { src: '/assets/logos/app/google.com.png',   text: 'Building advanced Marketing systems (Ads, SEO...)', top: 1018, left: 129, iconW: 150, iconH: 150, textLeft: 301 },
  ]
  return (
    <Slide nodeId="200:717" name="Slide-4">
      <AccentPill left={414} top={251} width={475} />
      <p style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 238, width: 723, fontSize: 72, fontWeight: 500, lineHeight: '100px', textAlign: 'center', color: TEXT_PRIMARY, margin: 0 }}>
        What Claude Code unlocks :
      </p>
      {items.map(({ src, text, top, left, iconW, iconH, textLeft }) => (
        <div key={top} style={{ position: 'absolute', left, top, display: 'flex', alignItems: 'center' }}>
          <img src={src} alt="" style={{ width: iconW, height: iconH, objectFit: 'contain', flexShrink: 0 }} />
          <p style={{ position: 'absolute', left: textLeft - left, margin: 0, fontSize: 48, fontWeight: 500, lineHeight: '70px', color: TEXT_PRIMARY, width: 741 }}>{text}</p>
        </div>
      ))}
    </Slide>
  )
}

function Slide5() {
  return (
    <Slide nodeId="211:119" name="Slide-5">
      <p style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 238, width: 647, fontSize: 72, fontWeight: 500, lineHeight: '100px', textAlign: 'center', color: TEXT_PRIMARY, margin: 0 }}>
        Here's how to get started with Claude Code
      </p>
      {/* Arrow pointing right (rotated) */}
      <p style={{ position: 'absolute', left: 813, top: 459, fontSize: 128, color: TEXT_PRIMARY, margin: 0, lineHeight: '77px', transform: 'rotate(-90deg)', transformOrigin: 'center center', width: 77, textAlign: 'center' }}>
        ↓
      </p>
      <img src="/assets/illustrations/notion-style/oc-sling-shot.svg" alt="" style={{ position: 'absolute', left: 330, top: 675, width: 420, height: 360, objectFit: 'contain' }} />
    </Slide>
  )
}

function Slide6() {
  return (
    <Slide nodeId="211:158" name="Slide-6">
      <StepLabel number={1} text={'Easy mode : Download Claude app — claude.com/download'} italic={false} />
      <ScreenPlaceholder top={588} height={423} left={52} width={976} />
    </Slide>
  )
}

function Slide7() {
  return (
    <Slide nodeId="211:190" name="Slide-7">
      <StepLabel number={2} text={'Easy mode : Open the App and click "Code"'} italic={false} />
      <ScreenPlaceholder top={513} height={544} left={31} width={1017} />
      <BottomTextBox text={'Then choose a folder on your computer, add connectors\n(to use external apps), add skills, plugins...'} top={1124} />
    </Slide>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// NEW SLIDES
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Transition: "It's a great start but I recommend VS Code" ─────────────────

function SlideVSCodeTransition() {
  return (
    <Slide nodeId="carousel:vscode-transition" name="Slide-VSCode-transition">
      <p style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 800, fontSize: 72, fontWeight: 500, lineHeight: '100px', textAlign: 'center', color: TEXT_PRIMARY, margin: 0 }}>
        It's a great start but I recommend using Claude Code with VS Code
      </p>
    </Slide>
  )
}

// ─── Pro step 1 : Download VS Code ───────────────────────────────────────────

function SlidePro1() {
  return (
    <Slide nodeId="carousel:pro-1" name="Slide-Pro-1">
      <StepLabel number={1} text={'Pro mode : Download VS Code (free) at code.visualstudio.com'} />
      <ScreenPlaceholder top={450} height={580} />
    </Slide>
  )
}

// ─── Pro step 2 : Open a folder ───────────────────────────────────────────────

function SlidePro2() {
  return (
    <Slide nodeId="carousel:pro-2" name="Slide-Pro-2">
      <StepLabel number={2} text={'Pro mode : Open a folder on your computer to start a project'} />
      <ScreenPlaceholder top={450} height={580} />
    </Slide>
  )
}

// ─── Pro step 3 : Download Claude Code extension ─────────────────────────────

function SlidePro3() {
  return (
    <Slide nodeId="carousel:pro-3" name="Slide-Pro-3">
      <StepLabel number={3} text={'Pro mode : Download the "Claude Code" extension'} />
      <ScreenPlaceholder top={450} height={580} />
    </Slide>
  )
}

// ─── Pro step 4 : Click on Claude icon ───────────────────────────────────────

function SlidePro4() {
  return (
    <Slide nodeId="carousel:pro-4" name="Slide-Pro-4">
      <StepLabel number={4} text={'Pro mode : Click on the Claude icon and start prompting'} />
      <ScreenPlaceholder top={450} height={580} />
    </Slide>
  )
}

// ─── Try these prompts ────────────────────────────────────────────────────────

function SlidePrompts() {
  const prompts = [
    '"Generate 100 ad variations for my product from a single brief"',
    '"Build a full design system for my content and product brand"',
    '"Enrich 200 leads from this CSV using our CRM API"',
    '"Create a competitor analysis report from these 10 URLs"',
  ]
  return (
    <Slide nodeId="carousel:prompts" name="Slide-Prompts">
      <AccentPill left={129} top={253} width={694} />
      <p style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 241, width: 880, fontSize: 72, fontWeight: 500, lineHeight: '100px', textAlign: 'center', color: TEXT_PRIMARY, margin: 0 }}>
        Try these prompts to get started
      </p>
      <div style={{ position: 'absolute', left: 56, top: 440, width: 968, display: 'flex', flexDirection: 'column', gap: 28 }}>
        {prompts.map((p, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 24, padding: '28px 40px', boxShadow: CARD_SHADOW }}>
            <p style={{ margin: 0, fontSize: 40, fontWeight: 500, lineHeight: '58px', color: TEXT_PRIMARY, fontStyle: 'italic' }}>{p}</p>
          </div>
        ))}
      </div>
    </Slide>
  )
}

// ─── Bonus : Power features ───────────────────────────────────────────────────

function SlideBonus() {
  const features = [
    {
      icon: '/assets/icons/business/settings-cog-double-1--Streamline-Freehand.svg',
      label: 'CLAUDE.md',
      desc: 'Permanent memory — Claude knows who you are every session',
    },
    {
      icon: '/assets/icons/programming-apps-websites/module-three-boxes--Streamline-Freehand.svg',
      label: 'Subagents',
      desc: 'Mini AIs that run focused tasks in parallel inside your session',
    },
    {
      icon: '/assets/icons/work-office/collaboration-team-chat--Streamline-Freehand.svg',
      label: 'Agent Teams',
      desc: 'Multiple Claude sessions that collaborate and challenge each other',
    },
    {
      icon: '/assets/icons/programming-apps-websites/plugin-hands-puzzle--Streamline-Freehand.svg',
      label: 'Skills',
      desc: 'Reusable superpowers you build once, use forever',
    },
    {
      icon: '/assets/icons/business/paragraphs-bullets--Streamline-Freehand.svg',
      label: 'Slash commands',
      desc: '/write-newsletter, /competitor-analysis, /build-design-system...',
    },
  ]
  return (
    <Slide nodeId="carousel:bonus" name="Slide-Bonus">
      <AccentPill left={56} top={253} width={230} />
      <p style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 215, width: 940, fontSize: 64, fontWeight: 500, lineHeight: '86px', textAlign: 'center', color: TEXT_PRIMARY, margin: 0 }}>
        Bonus : Give Claude Code superpowers
      </p>
      <div style={{ position: 'absolute', left: 56, top: 390, width: 968, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {features.map(({ icon, label, desc }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 28, background: '#fff', borderRadius: 20, padding: '20px 32px', boxShadow: CARD_SHADOW }}>
            <img src={icon} alt="" style={{ width: 72, height: 72, objectFit: 'contain', flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: 38, fontWeight: 500, lineHeight: '52px', color: TEXT_PRIMARY }}>
              <strong>{label}</strong>
              {' — '}
              <span style={{ color: 'rgba(0,0,0,0.6)' }}>{desc}</span>
            </p>
          </div>
        ))}
      </div>
    </Slide>
  )
}

// ─── CTA : Follow for more ────────────────────────────────────────────────────

function SlideCTA() {
  return (
    <Slide nodeId="carousel:cta" name="Slide-CTA">
      {/* Avatar */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: 260,
        width: 400,
        height: 400,
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: CARD_SHADOW,
      }}>
        <img
          src="/assets/avatar/avatar-profile.png"
          alt="Samy Chouaf"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* "Follow for more" headline */}
      <p style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: 720,
        width: 700,
        fontSize: 96,
        fontWeight: 700,
        lineHeight: '110px',
        textAlign: 'center',
        color: TEXT_PRIMARY,
        margin: 0,
      }}>
        Follow for more
      </p>

      {/* Blue accent pill behind "more" */}
      <AccentPill left={494} top={814} width={302} height={90} radius={20} />

      {/* Name */}
      <p style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: 980,
        width: 600,
        fontSize: 48,
        fontWeight: 500,
        lineHeight: '70px',
        textAlign: 'center',
        color: TEXT_PRIMARY,
        margin: 0,
      }}>
        Samy Chouaf
      </p>

      {/* Illustration bottom */}
      <img
        src="/assets/illustrations/notion-style/oc-hi-five.svg"
        alt=""
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: 1090,
          width: 260,
          height: 220,
          objectFit: 'contain',
        }}
      />
    </Slide>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export default function LinkedInCarousel() {
  return (
    <div
      data-node-id="193:33"
      data-name="LinkedInCarousel"
      style={{ display: 'flex', gap: 88, alignItems: 'flex-start' }}
    >
      {/* Existing slides */}
      <SlideCover />
      <Slide1 />
      <Slide2 />
      <Slide3 />
      <Slide4 />
      <Slide5 />
      <Slide6 />
      <Slide7 />
      {/* New slides */}
      <SlideVSCodeTransition />
      <SlidePro1 />
      <SlidePro2 />
      <SlidePro3 />
      <SlidePro4 />
      <SlidePrompts />
      <SlideBonus />
      <SlideCTA />
    </div>
  )
}
