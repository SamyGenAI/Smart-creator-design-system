import { CarouselNavbarEdge, CarouselSlideShell } from '../../components/CarouselPrimitives.jsx'
import { CREATOR_DISPLAY_NAME } from '../../src/creatorIdentity.js'

/**
 * LinkedIn Carousel — "Setup your 24/7 AI agent in 10 minutes"
 * 13 slides: Cover + 2 Story + 1 Context + 8 Steps + Wrapup + CTA
 * 1080x1350px · tokenized background · Montserrat
 *
 * STYLE VARIANT: neo-brutalist cards (3px black border + 8px hard offset shadow,
 * no blur) instead of the standard soft white shadow. Text boxes are cream with
 * the same border/offset shadow to feel like stickers on the canvas.
 */

const HARD_SHADOW = '8px 8px 0px 0px var(--theme-color-text-primary)'
const SOFT_SHADOW = 'var(--theme-shadow-card)'
const BACKGROUND_ACCENT = 'var(--theme-accent-1)'
const BACKGROUND_PRIMARY = 'var(--theme-surface-canvas)'
const BACKGROUND_SECONDARY = 'var(--theme-surface-canvas-secondary)'
const SURFACE_ELEVATED = 'var(--theme-color-on-primary)'
const TEXT_PRIMARY = 'var(--theme-color-text-primary)'
const TEXT_SECONDARY = 'var(--theme-color-text-secondary)'
const FONT = "var(--font\/family\/title, 'Montserrat', sans-serif)"
const BORDER_PRIMARY = `3px solid ${TEXT_PRIMARY}`
const BACKGROUND_SUPPORT = 'var(--theme-accent-2)'
const BACKGROUND_SIGNAL = 'var(--theme-accent-3)'
const BACKGROUND_ACTION = 'var(--theme-accent-4)'
const BACKGROUND_HIGHLIGHT = 'var(--theme-accent-5)'
const BACKGROUND_INFO = 'var(--theme-border-1)'

const SCREENS = '/screenshots/carousels/How to setup 24-7 AI agent'

const NAVBAR = <CarouselNavbarEdge textColor={TEXT_PRIMARY} fontFamily={FONT} />

function Slide({ children, nodeId, name, withNavbar = true }) {
  return (
    <CarouselSlideShell
      nodeId={nodeId}
      name={name}
      withNavbar={withNavbar}
      navbar={NAVBAR}
      background={BACKGROUND_PRIMARY}
      fontFamily={FONT}
    >
      {children}
    </CarouselSlideShell>
  )
}

// ─── AccentPill ───────────────────────────────────────────────────────────────

function AccentPill({ left, top, width, height = 76, radius = 20 }) {
  return (
    <div style={{
      position: 'absolute', left, top, width, height,
      background: BACKGROUND_ACCENT, borderRadius: radius,
    }} />
  )
}

// ─── StepLabel ────────────────────────────────────────────────────────────────

function StepLabel({ number, text }) {
  return (
    <div style={{
      position: 'absolute', left: 56, top: 130, width: 968,
      display: 'flex', alignItems: 'flex-start',
    }}>
      <span style={{
        fontSize: 64, fontWeight: 500, lineHeight: '70px',
        color: TEXT_PRIMARY, minWidth: 96, flexShrink: 0,
      }}>
        {number}.
      </span>
      <p style={{ margin: 0, fontSize: 64, fontWeight: 500, lineHeight: '70px', color: TEXT_PRIMARY }}>
        {text}
      </p>
    </div>
  )
}

// ─── StepImage (VARIANT: black border + hard offset shadow) ───────────────────

function StepImage({ src, alt, naturalWidth, naturalHeight, top = 360, width = 940 }) {
  const displayHeight = Math.round(width * naturalHeight / naturalWidth)
  const left = Math.round((1080 - width) / 2)
  return (
    <div style={{
      position: 'absolute', left, top,
      width, height: displayHeight,
      border: BORDER_PRIMARY,
      borderRadius: 18,
      boxShadow: HARD_SHADOW,
      background: SURFACE_ELEVATED,
      overflow: 'hidden',
    }}>
      <img src={src} alt={alt} style={{
        display: 'block', width: '100%', height: '100%',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

// ─── BottomNote (VARIANT: cream sticker with black border + hard shadow) ──────

function BottomNote({ text, top }) {
  return (
    <div style={{
      position: 'absolute', left: 70, top,
      width: 940, minHeight: 148,
      background: BACKGROUND_SECONDARY,
      border: BORDER_PRIMARY,
      borderRadius: 24,
      padding: '28px 40px',
      boxShadow: HARD_SHADOW,
      boxSizing: 'border-box',
      display: 'flex', alignItems: 'center',
    }}>
      <p style={{ margin: 0, fontSize: 32, fontWeight: 500, lineHeight: '46px', color: TEXT_PRIMARY }}>
        {text}
      </p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDES
// ═══════════════════════════════════════════════════════════════════════════════

// ─── SLIDE 1: Cover ───────────────────────────────────────────────────────────

function SlideCover() {
  return (
    <Slide nodeId="carousel:openclaw-cover" name="Slide-cover" withNavbar={false}>
      {/* Bordered subtitle pill */}
      <div style={{
        position: 'absolute',
        left: 290, top: 110,
        width: 500, height: 76,
        border: BORDER_PRIMARY, borderRadius: 30,
        background: BACKGROUND_SECONDARY,
        boxShadow: HARD_SHADOW,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <p style={{ margin: 0, fontSize: 36, fontWeight: 500, color: TEXT_PRIMARY, lineHeight: '46px', whiteSpace: 'nowrap' }}>
          OpenClaw on Hostinger
        </p>
      </div>

      {/* Accent pill behind "10 minutes" */}

      {/* Main title */}
      <div style={{ position: 'absolute', left: 60, top: 260, width: 960 }}>
        <p style={{
          margin: 0, fontSize: 120, fontWeight: 700,
          lineHeight: '128px', textAlign: 'center', color: TEXT_PRIMARY,
        }}>
          How to setup a 24/7 AI agent in 10 minutes
        </p>
      </div>

      {/* Illustration */}
      <img
        src="/assets/illustrations/notion-style/oc-on-the-laptop.svg"
        alt=""
        style={{ position: 'absolute', left: 290, top: 940, width: 500, height: 340, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 2: Story 1 ────────────────────────────────────────────────────────

function SlideStory1() {
  return (
    <Slide nodeId="carousel:openclaw-story-1" name="Slide-story-1">
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 220,
        width: 900,
        fontSize: 84, fontWeight: 700,
        lineHeight: '100px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0,
      }}>
        Your AI agent works without you touching your computer.
      </p>

      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 700,
        width: 820,
        fontSize: 44, fontWeight: 700,
        lineHeight: '60px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0,
      }}>
        3 design drafts and 2 warm leads, ready in your WhatsApp.
      </p>

      <img
        src="/assets/illustrations/notion-style/nc-woman-typing-on-machine.svg"
        alt=""
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 870, width: 460, height: 400, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 3: Story 2 ────────────────────────────────────────────────────────

function SlideStory2() {
  return (
    <Slide nodeId="carousel:openclaw-story-2" name="Slide-story-2">
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 220,
        width: 900,
        fontSize: 84, fontWeight: 700,
        lineHeight: '100px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0,
      }}>
        The setup is simple, no technical skill needed.
      </p>

      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 700,
        width: 820,
        fontSize: 44, fontWeight: 700,
        lineHeight: '60px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0,
      }}>
        10 minutes, 8 clicks, zero code.
      </p>

      <img
        src="/assets/illustrations/notion-style/oc-puzzle.svg"
        alt=""
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 870, width: 460, height: 400, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 4: Context ────────────────────────────────────────────────────────

function SlideContext() {
  return (
    <Slide nodeId="carousel:openclaw-context" name="Slide-context">
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 220,
        width: 900,
        fontSize: 84, fontWeight: 700,
        lineHeight: '100px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0,
      }}>
        You don't need a $600 Mac mini under your desk.
      </p>

      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 700,
        width: 820,
        fontSize: 44, fontWeight: 700,
        lineHeight: '60px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0,
      }}>
        Run OpenClaw in the cloud, on a cheap VPS.
      </p>

      <img
        src="/assets/illustrations/notion-style/oc-lighthouse.svg"
        alt=""
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 870, width: 460, height: 400, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 5: Step 1 — Pick VPS plan ────────────────────────────────────────
// step-1.webp: 1456x817

function SlideStep1() {
  return (
    <Slide nodeId="carousel:openclaw-step1" name="Slide-step1">
      <StepLabel number={1} text="Pick a Hostinger VPS with OpenClaw pre-installed" />
      <StepImage
        src={`${SCREENS}/step-1.webp`}
        alt="Hostinger OpenClaw landing page with KVM 2 plan"
        naturalWidth={1456} naturalHeight={817}
        top={390} width={940}
      />
      <BottomNote
        text="KVM 2 or higher is recommended. OpenClaw is already selected at checkout."
        top={960}
      />
    </Slide>
  )
}

// ─── SLIDE 6: Step 2 — Setup the VPS ────────────────────────────────────────
// step-2.webp: 1456x907

function SlideStep2() {
  return (
    <Slide nodeId="carousel:openclaw-step2" name="Slide-step2">
      <StepLabel number={2} text="Once provisioned, go to VPS and click Setup" />
      <StepImage
        src={`${SCREENS}/step-2.webp`}
        alt="hPanel sidebar with VPS selected and Setup button highlighted"
        naturalWidth={1456} naturalHeight={907}
        top={330} width={900}
      />
      <BottomNote
        text="Hostinger walks you through the rest of the setup from here."
        top={1020}
      />
    </Slide>
  )
}

// ─── SLIDE 7: Step 3 — Pick Docker application ──────────────────────────────
// step-3.webp: 1456x650

function SlideStep3() {
  return (
    <Slide nodeId="carousel:openclaw-step3" name="Slide-step3">
      <StepLabel number={3} text="Pick Docker application, then select OpenClaw" />
      <StepImage
        src={`${SCREENS}/step-3.webp`}
        alt="Docker catalog with Docker application tab and OpenClaw highlighted"
        naturalWidth={1456} naturalHeight={650}
        top={450} width={940}
      />
      <BottomNote
        text="Skip n8n, OpenClaw sits in the same Docker catalog."
        top={900}
      />
    </Slide>
  )
}

// ─── SLIDE 8: Step 4 — Configure env vars ───────────────────────────────────
// step-4.webp: 1456x1398

function SlideStep4() {
  return (
    <Slide nodeId="carousel:openclaw-step4" name="Slide-step4">
      <StepLabel number={4} text="Configure your Gateway Token and API keys" />
      <StepImage
        src={`${SCREENS}/step-4.webp`}
        alt="Environment variable form for OpenClaw template"
        naturalWidth={1456} naturalHeight={1398}
        top={330} width={700}
      />
      <BottomNote
        text="Save the Gateway Token somewhere secure. It's your master key."
        top={1020}
      />
    </Slide>
  )
}

// ─── SLIDE 9: Step 5 — Open the project ─────────────────────────────────────
// step-5.webp: 1456x565

function SlideStep5() {
  return (
    <Slide nodeId="carousel:openclaw-step5" name="Slide-step5">
      <StepLabel number={5} text="In Docker Manager, grab the token and click Open" />
      <StepImage
        src={`${SCREENS}/step-5.webp`}
        alt="Docker Manager > Projects with Gateway token and Open button"
        naturalWidth={1456} naturalHeight={565}
        top={440} width={940}
      />
      <BottomNote
        text="Projects > Gateway token. Copy it, then click Open."
        top={900}
      />
    </Slide>
  )
}

// ─── SLIDE 10: Step 6 — Paste token and login ───────────────────────────────
// step-6.webp: 1224x921

function SlideStep6() {
  return (
    <Slide nodeId="carousel:openclaw-step6" name="Slide-step6">
      <StepLabel number={6} text="Paste the token and log in" />
      <StepImage
        src={`${SCREENS}/step-6.webp`}
        alt="OpenClaw welcome login screen with token field"
        naturalWidth={1224} naturalHeight={921}
        top={320} width={760}
      />
      <BottomNote
        text="If you lose the token, find it in Projects > Manage > Environment."
        top={1050}
      />
    </Slide>
  )
}

// ─── SLIDE 11: Step 7 — You're in ───────────────────────────────────────────
// step-7.webp: 1456x649

function SlideStep7() {
  return (
    <Slide nodeId="carousel:openclaw-step7" name="Slide-step7">
      <StepLabel number={7} text="You're in. Welcome to your dashboard." />
      <StepImage
        src={`${SCREENS}/step-7.webp`}
        alt="OpenClaw dashboard with chat interface"
        naturalWidth={1456} naturalHeight={649}
        top={400} width={940}
      />
      <BottomNote
        text="This is where you'll create skills, memory, and 24/7 cron jobs."
        top={930}
      />
    </Slide>
  )
}

// ─── SLIDE 12: Step 8 — Connect WhatsApp ────────────────────────────────────
// step-8.webp: 1456x862

function SlideStep8() {
  return (
    <Slide nodeId="carousel:openclaw-step8" name="Slide-step8">
      <StepLabel number={8} text="Go to Channels and click Show QR" />

      {/* WhatsApp logo badge next to step number */}
      <img
        src="/assets/logos/app/whatsapp.com.png"
        alt="WhatsApp"
        style={{
          position: 'absolute',
          right: 56, top: 118,
          width: 96, height: 96,
          borderRadius: 20,
          border: BORDER_PRIMARY,
          boxShadow: HARD_SHADOW,
          objectFit: 'cover',
          background: SURFACE_ELEVATED,
        }}
      />

      <StepImage
        src={`${SCREENS}/step-8.webp`}
        alt="OpenClaw Channels page with Show QR button highlighted"
        naturalWidth={1456} naturalHeight={862}
        top={340} width={900}
      />
      <BottomNote
        text="Scan with WhatsApp > Linked devices. Your agent is now a contact."
        top={990}
      />
    </Slide>
  )
}

// ─── SLIDE 13: Wrapup — 3 first skills ──────────────────────────────────────

function SlideWrapup() {
  const prompts = [
    {
      icon: '/assets/icons/business/alert-alarm-clock--Streamline-Freehand.svg',
      bg: 'var(--theme-accent-1)',
      title: 'Every day 7am',
      body: 'Summarize my calendar + top news.',
    },
    {
      icon: '/assets/icons/business/time-clock-nine-twenty-five-1--Streamline-Freehand.svg',
      bg: BACKGROUND_SUPPORT,
      title: 'Friday 6pm',
      body: 'Send me a weekly recap of my DMs.',
    },
    {
      icon: '/assets/icons/data/analytics-graph-line-triple--Streamline-Freehand.svg',
      bg: BACKGROUND_SIGNAL,
      title: 'Monday 9am',
      body: 'Scan trending posts in my niche.',
    },
    {
      icon: '/assets/icons/email-messages/send-email-paper-plane-1--Streamline-Freehand.png',
      bg: BACKGROUND_ACTION,
      title: 'On new lead',
      body: 'Draft a reply and ping me.',
    },
    {
      icon: '/assets/icons/business/view-binocular--Streamline-Freehand.svg',
      bg: BACKGROUND_HIGHLIGHT,
      title: 'Daily 8pm',
      body: 'Monitor 5 competitor accounts.',
    },
    {
      icon: '/assets/icons/business/edit-pen-write-paper--Streamline-Freehand.svg',
      bg: BACKGROUND_INFO,
      title: 'Every Sunday',
      body: 'Turn my week into 3 post drafts.',
    },
  ]

  return (
    <Slide nodeId="carousel:openclaw-wrapup" name="Slide-wrapup">
      <p style={{
        position: 'absolute',
        left: 60, top: 150,
        width: 960,
        fontSize: 64, fontWeight: 700,
        lineHeight: '76px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0,
      }}>
        6 prompt ideas to get you started
      </p>

      <div style={{
        position: 'absolute', left: 56, top: 310,
        width: 968,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 28,
      }}>
        {prompts.map(({ icon, bg, title, body }) => (
          <div key={title} style={{
            background: BACKGROUND_SECONDARY,
            border: BORDER_PRIMARY,
            borderRadius: 22,
            padding: '22px 24px 24px',
            boxShadow: HARD_SHADOW,
            minHeight: 230,
            display: 'flex', flexDirection: 'column', gap: 14,
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: 36,
              background: bg,
              border: BORDER_PRIMARY,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <img src={icon} alt="" style={{ width: 42, height: 42, objectFit: 'contain' }} />
            </div>
            <p style={{ margin: 0, fontSize: 26, fontWeight: 700, lineHeight: '32px', color: TEXT_PRIMARY }}>
              {title}
            </p>
            <p style={{ margin: 0, fontSize: 24, fontWeight: 500, lineHeight: '32px', color: TEXT_SECONDARY }}>
              {body}
            </p>
          </div>
        ))}
      </div>

      <p style={{
        position: 'absolute', left: 70, top: 1205,
        width: 940,
        fontSize: 30, fontWeight: 700, lineHeight: '40px',
        textAlign: 'center', color: TEXT_PRIMARY, margin: 0,
      }}>
        Ask anything, OpenClaw will find a way to do it.
      </p>
    </Slide>
  )
}

// ─── SLIDE 14: CTA ───────────────────────────────────────────────────────────

function SlideCTA() {
  return (
    <Slide nodeId="carousel:openclaw-cta" name="Slide-CTA" withNavbar={false}>
      {/* Avatar — circular */}
      <div style={{
        position: 'absolute', left: 340, top: 260,
        width: 400, height: 400,
        borderRadius: '50%', overflow: 'hidden',
        boxShadow: SOFT_SHADOW,
      }}>
        <img
          src="/assets/avatar/avatar-profile.png"
          alt={CREATOR_DISPLAY_NAME}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </div>

      {/* Follow for more */}
      <p style={{
        position: 'absolute', left: 190, top: 730,
        width: 700,
        fontSize: 96, fontWeight: 700,
        lineHeight: '110px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0, whiteSpace: 'nowrap',
      }}>
        Follow for more
      </p>

      {/* Author name */}
      <p style={{
        position: 'absolute', left: 240, top: 841,
        width: 600,
        fontSize: 48, fontWeight: 500,
        lineHeight: '70px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0, whiteSpace: 'nowrap',
      }}>
        {CREATOR_DISPLAY_NAME}
      </p>

      {/* Illustration */}
      <img
        src="/assets/illustrations/notion-style/oc-hi-five.svg"
        alt=""
        style={{ position: 'absolute', left: 365, top: 950, width: 350, height: 296, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export default function OpenClawCarousel() {
  return (
    <div
      data-node-id="carousel:openclaw"
      data-name="OpenClawCarousel"
      style={{ display: 'flex', gap: 88, alignItems: 'flex-start' }}
    >
      <SlideCover />
      <SlideStory1 />
      <SlideStory2 />
      <SlideContext />
      <SlideStep1 />
      <SlideStep2 />
      <SlideStep3 />
      <SlideStep4 />
      <SlideStep5 />
      <SlideStep6 />
      <SlideStep7 />
      <SlideStep8 />
      <SlideWrapup />
      <SlideCTA />
    </div>
  )
}
