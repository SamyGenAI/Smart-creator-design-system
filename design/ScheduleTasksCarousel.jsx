/**
 * LinkedIn Carousel — "How to schedule tasks with Claude"
 * 10 slides: Cover + 2 Context + 4 Steps + Result + Wrapup + CTA
 * 1080x1350px · #fffceb bg · Montserrat
 */

const CARD_SHADOW = '0px 4px 4px 0px rgba(0,0,0,0.25)'
const ACCENT = '#b4eaff'
const CREAM = '#fffceb'
const BLACK = '#000'
const FONT = "'Montserrat', sans-serif"

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: 1080 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 83,
        paddingLeft: 56,
        paddingRight: 56,
        boxSizing: 'border-box',
      }}>
        <span style={{ fontSize: 24, fontWeight: 500, color: BLACK, fontFamily: FONT, whiteSpace: 'nowrap' }}>
          Samy Chouaf
        </span>
        <span style={{ fontSize: 24, fontWeight: 500, color: BLACK, fontFamily: FONT, whiteSpace: 'nowrap' }}>
          Follow
        </span>
      </div>
      <div style={{ marginLeft: 56, marginRight: 56, height: 3, background: BLACK }} />
    </div>
  )
}

// ─── Slide shell ──────────────────────────────────────────────────────────────

function Slide({ children, nodeId, name, withNavbar = true }) {
  return (
    <div
      data-node-id={nodeId}
      data-name={name}
      style={{
        position: 'relative',
        width: 1080,
        height: 1350,
        background: CREAM,
        flexShrink: 0,
        overflow: 'hidden',
        fontFamily: FONT,
      }}
    >
      {withNavbar && <Navbar />}
      {children}
    </div>
  )
}

// ─── AccentPill ───────────────────────────────────────────────────────────────

function AccentPill({ left, top, width, height = 76, radius = 20 }) {
  return (
    <div style={{
      position: 'absolute', left, top, width, height,
      background: ACCENT, borderRadius: radius,
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
        color: BLACK, minWidth: 96, flexShrink: 0,
      }}>
        {number}.
      </span>
      <p style={{ margin: 0, fontSize: 64, fontWeight: 500, lineHeight: '70px', color: BLACK }}>
        {text}
      </p>
    </div>
  )
}

// ─── StepImage ────────────────────────────────────────────────────────────────

function StepImage({ src, alt, naturalWidth, naturalHeight, top = 360 }) {
  const displayWidth = 968
  const displayHeight = Math.round(displayWidth * naturalHeight / naturalWidth)
  return (
    <div style={{
      position: 'absolute', left: 56, top,
      width: displayWidth, height: displayHeight,
      borderRadius: 20, boxShadow: CARD_SHADOW,
    }}>
      <img src={src} alt={alt} style={{
        display: 'block', width: '100%', height: '100%',
        borderRadius: 20, pointerEvents: 'none',
      }} />
    </div>
  )
}

// ─── BottomNote ───────────────────────────────────────────────────────────────

function BottomNote({ text, top }) {
  return (
    <div style={{
      position: 'absolute', left: 39, top,
      width: 1001, minHeight: 152,
      background: '#fff', borderRadius: 40,
      padding: '28px 40px', boxShadow: CARD_SHADOW,
      boxSizing: 'border-box', display: 'flex', alignItems: 'center',
    }}>
      <p style={{ margin: 0, fontSize: 32, fontWeight: 500, lineHeight: '48px', color: BLACK }}>
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
    <Slide nodeId="carousel:schedule-cover" name="Slide-cover" withNavbar={false}>
      {/* Bordered subtitle pill */}
      <div style={{
        position: 'absolute',
        left: 250, top: 110,
        width: 580, height: 76,
        border: '3px solid #000', borderRadius: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <p style={{ margin: 0, fontSize: 40, fontWeight: 500, color: BLACK, lineHeight: '50px', whiteSpace: 'nowrap' }}>
          Claude Scheduled Tasks
        </p>
      </div>

      {/* Accent pill behind "with Claude" */}
      <AccentPill left={200} top={495} width={680} height={130} radius={30} />

      {/* Main title */}
      <div style={{ position: 'absolute', left: 60, top: 230, width: 960 }}>
        <p style={{
          margin: 0, fontSize: 128, fontWeight: 700,
          lineHeight: '130px', textAlign: 'center', color: BLACK,
        }}>
          How to schedule tasks with Claude
        </p>
      </div>

      {/* Illustration */}
      <img
        src="/assets/illustrations/notion-style/oc-time-flies.svg"
        alt=""
        style={{ position: 'absolute', left: 290, top: 870, width: 500, height: 400, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 2: Context — The hook ─────────────────────────────────────────────

function SlideContext1() {
  return (
    <Slide nodeId="carousel:schedule-context-1" name="Slide-context-1">
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 260,
        width: 860,
        fontSize: 96, fontWeight: 700,
        lineHeight: '110px', textAlign: 'center',
        color: BLACK, margin: 0,
      }}>
        Claude can now run tasks while you sleep.
      </p>

      <img
        src="/assets/illustrations/notion-style/Meditation.svg"
        alt=""
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 720, width: 480, height: 420, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 3: Context — No complex tools ─────────────────────────────────────

function SlideContext2() {
  return (
    <Slide nodeId="carousel:schedule-context-2" name="Slide-context-2">
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 200,
        width: 860,
        fontSize: 80, fontWeight: 700,
        lineHeight: '96px', textAlign: 'center',
        color: BLACK, margin: 0,
      }}>
        No complex automation tools needed.
      </p>

      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 580,
        width: 820,
        fontSize: 48, fontWeight: 500,
        lineHeight: '68px', textAlign: 'center',
        color: 'rgba(0,0,0,0.6)', margin: 0,
      }}>
        It runs in the cloud, your computer doesn't even need to be on.
      </p>

      <img
        src="/assets/illustrations/notion-style/scooter.svg"
        alt=""
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 820, width: 480, height: 420, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 4: Step 1 — Go to scheduled page ──────────────────────────────────
// step-1.png: 776x465 -> 968x580

function SlideStep1() {
  return (
    <Slide nodeId="carousel:schedule-step1" name="Slide-step1">
      <StepLabel number={1} text='Go to claude.ai/code/scheduled' />
      <StepImage
        src="/screenshots/carousels/How-to-schedule-trend-report/step-1.png"
        alt="Claude scheduled tasks page with Create button"
        naturalWidth={776} naturalHeight={465} top={380}
      />
      <BottomNote
        text='Click on "Create scheduled task" to get started.'
        top={1000}
      />
    </Slide>
  )
}

// ─── SLIDE 5: Step 2 — Fill the form ─────────────────────────────────────────
// step-2.png: 877x687 -> 968x758

function SlideStep2() {
  return (
    <Slide nodeId="carousel:schedule-step2" name="Slide-step2">
      <StepLabel number={2} text="Fill the form with a name and a clear prompt" />
      <StepImage
        src="/screenshots/carousels/How-to-schedule-trend-report/step-2.png"
        alt="New scheduled task form with name, prompt, and connectors"
        naturalWidth={877} naturalHeight={687} top={350}
      />
      <BottomNote
        text="Add connectors to other apps if needed (Gmail, Figma, Canva...)."
        top={1155}
      />
    </Slide>
  )
}

// ─── SLIDE 6: Step 3 — Real example ──────────────────────────────────────────
// step-3.png: 879x726 -> 968x800

function SlideStep3() {
  return (
    <Slide nodeId="carousel:schedule-step3" name="Slide-step3">
      <StepLabel number={3} text="Real example: Weekly AI trend scanner" />
      <StepImage
        src="/screenshots/carousels/How-to-schedule-trend-report/step-3.png"
        alt="Detailed prompt for weekly AI trend report"
        naturalWidth={879} naturalHeight={726} top={310}
      />
      <BottomNote
        text="Be precise in your prompt and make sure connectors are activated."
        top={1155}
      />
    </Slide>
  )
}

// ─── SLIDE 7: Step 4 — Test your automation ──────────────────────────────────
// step-4.png: 872x472 -> 968x524

function SlideStep4() {
  return (
    <Slide nodeId="carousel:schedule-step4" name="Slide-step4">
      <StepLabel number={4} text="Test your automation" />
      <StepImage
        src="/screenshots/carousels/How-to-schedule-trend-report/step-4.png"
        alt="Scheduled task overview with Run now button"
        naturalWidth={872} naturalHeight={472} top={380}
      />
      <BottomNote
        text='If there are errors, click "Read more" and use Claude to help you debug.'
        top={950}
      />
    </Slide>
  )
}

// ─── SLIDE 8: Result — Full trend report ─────────────────────────────────────
// step-5.png: 726x564 -> 968x752

function SlideResult() {
  return (
    <Slide nodeId="carousel:schedule-result" name="Slide-result">
      <p style={{
        position: 'absolute', left: 90, top: 130, width: 900,
        fontSize: 64, fontWeight: 700, lineHeight: '80px',
        textAlign: 'center', color: BLACK, margin: 0,
      }}>
        Full trend report, fully automated
      </p>

      <StepImage
        src="/screenshots/carousels/How-to-schedule-trend-report/step-5.png"
        alt="Generated weekly AI trend report output"
        naturalWidth={726} naturalHeight={564} top={380}
      />

      <p style={{
        position: 'absolute', left: 110, top: 1170, width: 860,
        fontSize: 36, fontWeight: 500, lineHeight: '52px',
        textAlign: 'center', color: 'rgba(0,0,0,0.6)', margin: 0,
      }}>
        Delivered weekly. No need to have your computer awake.
      </p>
    </Slide>
  )
}

// ─── SLIDE 9: Wrapup — Use case ideas ────────────────────────────────────────

function SlideWrapup() {
  const useCases = [
    {
      icon: '/assets/icons/data/analytics-graph-bar-horizontal--Streamline-Freehand.svg',
      bg: '#b4eaff',
      label: 'Content ideas',
      desc: 'Weekly ideas based on your data and trends',
    },
    {
      icon: '/assets/icons/design/design-tool-magic-wand--Streamline-Freehand.svg',
      bg: '#d2ff9a',
      label: 'Design drafts',
      desc: 'Produce design briefs while you sleep',
    },
    {
      icon: '/assets/icons/business/calendar-grid--Streamline-Freehand.svg',
      bg: '#fde68a',
      label: 'Daily summary',
      desc: 'Calendar + emails recap before your day',
    },
  ]

  return (
    <Slide nodeId="carousel:schedule-wrapup" name="Slide-wrapup">
      <p style={{
        position: 'absolute',
        left: 90, top: 215,
        width: 900,
        fontSize: 64, fontWeight: 700,
        lineHeight: '76px', textAlign: 'center',
        color: BLACK, margin: 0,
      }}>
        Some use case ideas
      </p>

      <div style={{
        position: 'absolute', left: 56, top: 430,
        width: 968,
        display: 'flex', flexDirection: 'column', gap: 32,
      }}>
        {useCases.map(({ icon, bg, label, desc }) => (
          <div key={label} style={{
            background: '#fff', borderRadius: 20,
            padding: '32px 36px',
            boxShadow: CARD_SHADOW,
            display: 'flex', alignItems: 'center', gap: 28,
          }}>
            <div style={{
              width: 96, height: 96, borderRadius: 48,
              background: bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <img src={icon} alt="" style={{ width: 56, height: 56, objectFit: 'contain' }} />
            </div>
            <p style={{ margin: 0, fontSize: 38, fontWeight: 500, lineHeight: '52px', color: BLACK }}>
              <strong>{label}</strong>{': '}<span style={{ color: 'rgba(0,0,0,0.6)' }}>{desc}</span>
            </p>
          </div>
        ))}
      </div>

      <img
        src="/assets/illustrations/notion-style/oc-on-the-laptop.svg"
        alt=""
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 980, width: 360, height: 300, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 10: CTA ───────────────────────────────────────────────────────────

function SlideCTA() {
  return (
    <Slide nodeId="carousel:schedule-cta" name="Slide-CTA" withNavbar={false}>
      {/* Avatar — circular */}
      <div style={{
        position: 'absolute', left: 340, top: 260,
        width: 400, height: 400,
        borderRadius: '50%', overflow: 'hidden',
        boxShadow: CARD_SHADOW,
      }}>
        <img
          src="/assets/avatar/avatar-profile.png"
          alt="Samy Chouaf"
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </div>

      {/* Follow for more */}
      <p style={{
        position: 'absolute', left: 190, top: 730,
        width: 700,
        fontSize: 96, fontWeight: 700,
        lineHeight: '110px', textAlign: 'center',
        color: BLACK, margin: 0, whiteSpace: 'nowrap',
      }}>
        Follow for more
      </p>

      {/* Author name */}
      <p style={{
        position: 'absolute', left: 240, top: 841,
        width: 600,
        fontSize: 48, fontWeight: 500,
        lineHeight: '70px', textAlign: 'center',
        color: BLACK, margin: 0, whiteSpace: 'nowrap',
      }}>
        Samy Chouaf
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

export default function ScheduleTasksCarousel() {
  return (
    <div
      data-node-id="carousel:schedule-tasks"
      data-name="ScheduleTasksCarousel"
      style={{ display: 'flex', gap: 88, alignItems: 'flex-start' }}
    >
      <SlideCover />
      <SlideContext1 />
      <SlideContext2 />
      <SlideStep1 />
      <SlideStep2 />
      <SlideStep3 />
      <SlideStep4 />
      <SlideResult />
      <SlideWrapup />
      <SlideCTA />
    </div>
  )
}
