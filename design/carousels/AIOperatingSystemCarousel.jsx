import { CarouselNavbarEdge, CarouselSlideShell } from '../../components/CarouselPrimitives.jsx'
import { CREATOR_DISPLAY_NAME } from '../../src/creatorIdentity.js'

/**
 * LinkedIn Carousel — "Your GTM AI OS"
 * 10 slides: Cover + 2 Story + Context + 4 Steps + Wrapup + CTA
 * 1080×1350px · tokenized background · Montserrat
 */

const CARD_SHADOW = 'var(--theme-shadow-card)'
const TEXT_PRIMARY = 'var(--theme-color-text-primary)'
const TEXT_SECONDARY = 'var(--theme-color-text-secondary)'
const BACKGROUND_PRIMARY = 'var(--theme-surface-canvas)'
const SURFACE_CARD = 'var(--theme-color-on-primary)'
const FONT = "var(--font\\/family\\/title, 'Montserrat', sans-serif)"

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

// ─── StepLabel ────────────────────────────────────────────────────────────────

function StepLabel({ number, text }) {
  return (
    <div style={{
      position: 'absolute', left: 56, top: 130, width: 968,
      display: 'flex', alignItems: 'flex-start',
    }}>
      <span style={{
        fontSize: 64, fontWeight: 500, lineHeight: '70px',
        color: 'var(--theme-accent-2)', minWidth: 96, flexShrink: 0,
      }}>
        {number}.
      </span>
      <p style={{ margin: 0, fontSize: 64, fontWeight: 500, lineHeight: '70px', color: TEXT_PRIMARY }}>
        {text}
      </p>
    </div>
  )
}

// ─── ScreenPlaceholder ────────────────────────────────────────────────────────

function ScreenPlaceholder({ top, height = 544, left = 31, width = 1017 }) {
  return (
    <div style={{
      position: 'absolute', left, top, width, height, borderRadius: 20,
      boxShadow: 'var(--theme-shadow-card)',
      background: 'var(--theme-surface-layer-1)', border: '2px dashed var(--theme-color-text-secondary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <p style={{ margin: 0, fontSize: 28, color: 'var(--theme-color-text-secondary)', fontWeight: 500 }}>
        [ screen goes here ]
      </p>
    </div>
  )
}

// ─── BottomNote ───────────────────────────────────────────────────────────────

function BottomNote({ text, top }) {
  return (
    <div style={{
      position: 'absolute', left: 39, top,
      width: 1001, minHeight: 152,
      background: SURFACE_CARD, borderRadius: 40,
      padding: '28px 40px', boxShadow: CARD_SHADOW,
      boxSizing: 'border-box', display: 'flex', alignItems: 'center',
    }}>
      <p style={{ margin: 0, fontSize: 32, fontWeight: 500, lineHeight: '48px', color: TEXT_PRIMARY }}>
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
    <Slide nodeId="carousel:cover" name="Slide-cover" withNavbar={false}>
      {/* Bordered subtitle pill */}
      <div style={{
        position: 'absolute',
        left: 240, top: 110,
        width: 600, height: 76,
        border: `3px solid ${TEXT_PRIMARY}`, borderRadius: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <p style={{ margin: 0, fontSize: 40, fontWeight: 500, color: TEXT_PRIMARY, lineHeight: '50px', whiteSpace: 'nowrap' }}>
          Claude Code, Codex & Cursor
        </p>
      </div>

      {/* Main title */}
      <div style={{ position: 'absolute', left: 60, top: 240, width: 960 }}>
        <p style={{
          margin: 0, fontSize: 128, fontWeight: 700,
          lineHeight: '130px', textAlign: 'center', color: TEXT_PRIMARY,
        }}>
          Your GTM AI OS
        </p>
      </div>

      {/* Illustration */}
      <img
        src="/assets/illustrations/notion-style/oc-on-the-laptop.svg"
        alt=""
        style={{ position: 'absolute', left: 290, top: 870, width: 500, height: 400, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 2: Story 1 ─────────────────────────────────────────────────────────

function SlideStory1() {
  return (
    <Slide nodeId="carousel:story-1" name="Slide-story-1">
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 280,
        width: 860,
        fontSize: 80, fontWeight: 700,
        lineHeight: '96px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0,
      }}>
        You open 6 tabs. Write a brief. Paste into ChatGPT. Copy-edit. Reformat. Start over.
      </p>

      <img
        src="/assets/illustrations/notion-style/oc-time-flies.svg"
        alt=""
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 700, width: 520, height: 440, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 3: Story 2 ─────────────────────────────────────────────────────────

function SlideStory2() {
  return (
    <Slide nodeId="carousel:story-2" name="Slide-story-2">
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 280,
        width: 860,
        fontSize: 80, fontWeight: 700,
        lineHeight: '96px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0,
      }}>
        The best GTM teams don't use AI tools. They run AI systems.
      </p>

      <img
        src="/assets/illustrations/notion-style/oc-thinking.svg"
        alt=""
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 700, width: 520, height: 440, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 4: Context ─────────────────────────────────────────────────────────

function SlideContext() {
  return (
    <Slide nodeId="carousel:context" name="Slide-context">
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 280,
        width: 860,
        fontSize: 80, fontWeight: 700,
        lineHeight: '96px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0,
      }}>
        One AI stack. Every content task from strategy to publish, automated.
      </p>

      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 620,
        width: 820,
        fontSize: 48, fontWeight: 500,
        lineHeight: '68px', textAlign: 'center',
        color: TEXT_SECONDARY, margin: 0,
      }}>
        Claude Code orchestrates. Codex writes the logic. Cursor handles the IDE.
      </p>
    </Slide>
  )
}

// ─── SLIDE 5: Step 1 ──────────────────────────────────────────────────────────

function SlideStep1() {
  return (
    <Slide nodeId="carousel:step-1" name="Slide-step-1">
      <StepLabel number={1} text="Use Claude Code as your AI brain" />

      <ScreenPlaceholder top={310} height={544} />

      <BottomNote
        text="Claude Code reads your brand docs, your audience, and your content goals, then runs the whole workflow from the CLI."
        top={870}
      />
    </Slide>
  )
}

// ─── SLIDE 6: Step 2 ──────────────────────────────────────────────────────────

function SlideStep2() {
  return (
    <Slide nodeId="carousel:step-2" name="Slide-step-2">
      <StepLabel number={2} text="Let Codex write the pipeline code" />

      <ScreenPlaceholder top={310} height={544} />

      <BottomNote
        text="Codex drafts the automation scripts, schedulers, formatters, API connectors, so your content ops run without babysitting."
        top={870}
      />
    </Slide>
  )
}

// ─── SLIDE 7: Step 3 ──────────────────────────────────────────────────────────

function SlideStep3() {
  return (
    <Slide nodeId="carousel:step-3" name="Slide-step-3">
      <StepLabel number={3} text="Refine every output inside Cursor" />

      <ScreenPlaceholder top={310} height={544} />

      <BottomNote
        text="Cursor's AI inline editor lets you prompt-edit the final copy in context. Tweak tone, length, CTAs without leaving the file."
        top={870}
      />
    </Slide>
  )
}

// ─── SLIDE 8: Step 4 ──────────────────────────────────────────────────────────

function SlideStep4() {
  return (
    <Slide nodeId="carousel:step-4" name="Slide-step-4">
      <StepLabel number={4} text="Chain them: research, draft, publish" />

      <ScreenPlaceholder top={310} height={544} />

      <BottomNote
        text="One prompt triggers Claude Code. It calls Codex to scaffold the post. You refine in Cursor. Done. Repeat 10x per day."
        top={870}
      />
    </Slide>
  )
}

// ─── SLIDE 9: Wrapup ──────────────────────────────────────────────────────────

function SlideWrapup() {
  const items = [
    { icon: '/assets/icons/programming-apps-websites/programming-code-idea--Streamline-Freehand.svg', label: 'LinkedIn posts', desc: 'Drafted, edited, and formatted in one loop' },
    { icon: '/assets/icons/data/analytics-board-graph-line--Streamline-Freehand.svg', label: 'SEO briefs', desc: 'Keyword research to outline, automated' },
    { icon: '/assets/icons/design/content-brush-pen--Streamline-Freehand.svg', label: 'Email sequences', desc: 'Personalized copy at scale, no rewrites' },
    { icon: '/assets/icons/design/notes-paper--Streamline-Freehand.svg', label: 'Case studies', desc: 'Sourced, structured, and polished in minutes' },
  ]

  return (
    <Slide nodeId="carousel:wrapup" name="Slide-wrapup">
      <p style={{
        position: 'absolute', left: 90, top: 163,
        width: 900,
        fontSize: 64, fontWeight: 700,
        lineHeight: '76px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0,
      }}>
        What you can build now
      </p>

      <div style={{
        position: 'absolute', left: 56, top: 320,
        width: 968,
        display: 'flex', flexDirection: 'column', gap: 20,
      }}>
        {items.map(({ icon, label, desc }) => (
          <div key={label} style={{
            background: SURFACE_CARD, borderRadius: 20,
            padding: '20px 32px', boxShadow: CARD_SHADOW,
            display: 'flex', alignItems: 'center', gap: 28,
          }}>
            {icon && (
              <img src={icon} alt="" style={{ width: 72, height: 72, objectFit: 'contain' }} />
            )}
            <p style={{ margin: 0, fontSize: 38, fontWeight: 500, lineHeight: '52px', color: TEXT_PRIMARY }}>
              <strong>{label}</strong>{' '}<span style={{ color: TEXT_SECONDARY }}>{desc}</span>
            </p>
          </div>
        ))}
      </div>
    </Slide>
  )
}

// ─── SLIDE 10: CTA ────────────────────────────────────────────────────────────

function SlideCTA() {
  return (
    <div
      data-node-id="carousel:cta"
      data-name="Slide-CTA"
      style={{
        position: 'relative', width: 1080, height: 1350,
        background: BACKGROUND_PRIMARY, flexShrink: 0, overflow: 'hidden',
        fontFamily: FONT,
      }}
    >
      {/* Avatar — circular */}
      <div style={{
        position: 'absolute', left: 340, top: 260,
        width: 400, height: 400,
        borderRadius: '50%', overflow: 'hidden',
        boxShadow: CARD_SHADOW,
      }}>
        <img
          src="/assets/avatar/avatar-profile.png"
          alt={CREATOR_DISPLAY_NAME}
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Follow for more */}
      <p style={{
        position: 'absolute', left: 190, top: 720,
        width: 700,
        fontSize: 96, fontWeight: 700,
        lineHeight: '110px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0, whiteSpace: 'nowrap',
      }}>
        Follow for more
      </p>

      {/* Author name */}
      <p style={{
        position: 'absolute', left: 240, top: 870,
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
        style={{ position: 'absolute', left: 365, top: 1020, width: 350, height: 296, objectFit: 'contain' }}
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export default function AIOperatingSystemCarousel() {
  return (
    <div
      data-node-id="carousel:root"
      data-name="AIOperatingSystemCarousel"
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
      <SlideWrapup />
      <SlideCTA />
    </div>
  )
}