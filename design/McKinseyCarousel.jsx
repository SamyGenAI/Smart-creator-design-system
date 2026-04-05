/**
 * LinkedIn Carousel — "How to make McKinsey level slides with AI"
 * 13 slides: Cover + 2 Story + Rules + 6 Steps + Result + Comparison + CTA
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
// Container adapts to image proportions. Never crops.

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
    <Slide nodeId="281:212" name="Slide-cover" withNavbar={false}>
      {/* Bordered subtitle pill */}
      <div style={{
        position: 'absolute',
        left: 230, top: 110,
        width: 620, height: 76,
        border: '3px solid #000', borderRadius: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <p style={{ margin: 0, fontSize: 40, fontWeight: 500, color: BLACK, lineHeight: '50px', whiteSpace: 'nowrap' }}>
          Consulting-quality slides
        </p>
      </div>

      {/* Accent pill behind "slides with AI" */}
      <AccentPill left={490} top={495} width={530} height={130} radius={30} />

      {/* Main title */}
      <div style={{ position: 'absolute', left: 60, top: 230, width: 960 }}>
        <p style={{
          margin: 0, fontSize: 128, fontWeight: 700,
          lineHeight: '130px', textAlign: 'center', color: BLACK,
        }}>
          How to make<br />McKinsey level<br />slides with AI
        </p>
      </div>

      {/* Illustration */}
      <img
        src="/assets/illustrations/notion-style/oc-target.svg"
        alt=""
        style={{ position: 'absolute', left: 290, top: 870, width: 500, height: 400, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 2: Story — The problem ─────────────────────────────────────────────

function SlideStory1() {
  return (
    <Slide nodeId="carousel:story-1" name="Slide-story-1">
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 280,
        width: 860,
        fontSize: 96, fontWeight: 700,
        lineHeight: '110px', textAlign: 'center',
        color: BLACK, margin: 0,
      }}>
        Most slides confuse instead of convince.
      </p>

      <AccentPill left={160} top={490} width={760} height={110} radius={30} />

      <img
        src="/assets/illustrations/notion-style/oc-thinking.svg"
        alt=""
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 700, width: 520, height: 440, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 3: Story — The insight ─────────────────────────────────────────────

function SlideStory2() {
  return (
    <Slide nodeId="carousel:story-2" name="Slide-story-2">
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 200,
        width: 860,
        fontSize: 80, fontWeight: 700,
        lineHeight: '96px', textAlign: 'center',
        color: BLACK, margin: 0,
      }}>
        McKinsey consultants cracked the code decades ago.
      </p>

      <AccentPill left={100} top={436} width={880} height={110} radius={30} />

      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 620,
        width: 820,
        fontSize: 48, fontWeight: 500,
        lineHeight: '68px', textAlign: 'center',
        color: 'rgba(0,0,0,0.6)', margin: 0,
      }}>
        Now you can teach their exact rules to Claude, in minutes.
      </p>

      <img
        src="/assets/illustrations/notion-style/oc-lighthouse.svg"
        alt=""
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 820, width: 480, height: 420, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 4: The 3 rules ─────────────────────────────────────────────────────

function SlideRules() {
  const rules = [
    {
      number: '01',
      title: 'Action title',
      body: 'A full sentence stating the conclusion. Reading titles alone gives you the entire argument.',
      bodyWidth: 715,
    },
    {
      number: '02',
      title: 'Pyramid Principle',
      body: 'Answer first, evidence second. Main point -> 2-3 key arguments -> supporting data.',
      bodyWidth: 787,
    },
    {
      number: '03',
      title: 'One message per slide',
      body: 'Every chart and bullet serves a single insight. Two points = two slides.',
      bodyWidth: 756,
    },
  ]

  return (
    <Slide nodeId="281:222" name="Slide-rules">
      <p style={{
        position: 'absolute',
        left: 90, top: 163,
        width: 900,
        fontSize: 64, fontWeight: 700,
        lineHeight: '76px', textAlign: 'center',
        color: BLACK, margin: 0,
      }}>
        The 3 rules of great consulting slides
      </p>

      <div style={{
        position: 'absolute', left: 56, top: 391,
        width: 968,
        display: 'flex', flexDirection: 'column', gap: 32,
      }}>
        {rules.map(({ number, title, body, bodyWidth }) => (
          <div key={number} style={{
            background: '#fff', borderRadius: 20,
            padding: '28px 36px',
            boxShadow: CARD_SHADOW,
            display: 'flex', alignItems: 'flex-start', gap: 28,
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: 36,
              background: ACCENT,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: BLACK }}>{number}</span>
            </div>
            <div>
              <p style={{ margin: 0, marginBottom: 10, fontSize: 38, fontWeight: 700, lineHeight: '50px', color: BLACK, whiteSpace: 'nowrap' }}>
                {title}
              </p>
              <p style={{ margin: 0, fontSize: 30, fontWeight: 500, lineHeight: '44px', color: 'rgba(0,0,0,0.6)', width: bodyWidth }}>
                {body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  )
}

// ─── SLIDE 5: Step 1 ─────────────────────────────────────────────────────────
// step-1.png: 780x492 -> 968x611

function SlideStep1() {
  return (
    <Slide nodeId="281:273" name="Slide-step1">
      <StepLabel number={1} text="Upload your template + ask Claude to document colors, fonts & styling" />
      <StepImage
        src="/screenshots/carousels/how-to-make-mckinsey-slides-with-ai/step-1.png"
        alt="Prompt asking Claude to document brand styles"
        naturalWidth={780} naturalHeight={492} top={469}
      />
      <BottomNote
        text="Also teach Claude your slide rules: action titles, pyramid principle, one message per slide."
        top={1109}
      />
    </Slide>
  )
}

// ─── SLIDE 6: Step 2 ─────────────────────────────────────────────────────────
// step-2.png: 1845x927 -> 968x486

function SlideStep2() {
  return (
    <Slide nodeId="281:296" name="Slide-step2">
      <StepLabel number={2} text="Claude generates a full McKinsey brand skill (works with any brand too)" />
      <StepImage
        src="/screenshots/carousels/how-to-make-mckinsey-slides-with-ai/step-2.png"
        alt="Generated brand skill interface"
        naturalWidth={1845} naturalHeight={927} top={480}
      />
      <BottomNote
        text="The AI creates a complete style guide based on your examples and preferences."
        top={1000}
      />
    </Slide>
  )
}

// ─── SLIDE 7: Step 3 ─────────────────────────────────────────────────────────
// step-3.png: 750x255 -> 968x329

function SlideStep3() {
  return (
    <Slide nodeId="281:319" name="Slide-step3">
      <StepLabel number={3} text="Click 'Copy to your skills' to add it permanently to your toolkit" />
      <StepImage
        src="/screenshots/carousels/how-to-make-mckinsey-slides-with-ai/step-3.png"
        alt="Copy to skills button"
        naturalWidth={750} naturalHeight={255} top={410}
      />
      <BottomNote
        text="Now you have a reusable brand assistant that knows your exact style preferences."
        top={770}
      />
    </Slide>
  )
}

// ─── SLIDE 8: Step 4 ─────────────────────────────────────────────────────────
// step-4.png: 705x300 -> 968x412

function SlideStep4() {
  return (
    <Slide nodeId="281:342" name="Slide-step4">
      <StepLabel number={4} text="Start a new chat, use a simple prompt + upload your data" />
      <StepImage
        src="/screenshots/carousels/how-to-make-mckinsey-slides-with-ai/step-4.png"
        alt="Simple prompt with data upload"
        naturalWidth={705} naturalHeight={300} top={398}
      />
      <BottomNote
        text="Claude now understands your brand and consulting slide principles automatically."
        top={838}
      />
    </Slide>
  )
}

// ─── SLIDE 9: Step 5 ─────────────────────────────────────────────────────────
// step-5.png: 1770x885 -> 968x484

function SlideStep5() {
  return (
    <Slide nodeId="281:365" name="Slide-step5">
      <StepLabel number={5} text="Result: full professional slides with your data + exact branding" />
      <StepImage
        src="/screenshots/carousels/how-to-make-mckinsey-slides-with-ai/step-5.png"
        alt="Professional branded slide output"
        naturalWidth={1770} naturalHeight={885} top={434}
      />
      <BottomNote
        text="Action titles, pyramid structure, one insight per slide, all automatically applied."
        top={952}
      />
    </Slide>
  )
}

// ─── SLIDE 10: Step 6 (Bonus) ─────────────────────────────────────────────────
// step-6.png: 453x210 -> 968x449

function SlideStep6() {
  return (
    <Slide nodeId="281:388" name="Slide-step6">
      <StepLabel number={6} text="BONUS: Turn any graph screenshot into your own branding instantly" />
      <StepImage
        src="/screenshots/carousels/how-to-make-mckinsey-slides-with-ai/step-6.png"
        alt="Graph rebranding feature"
        naturalWidth={453} naturalHeight={210} top={464}
      />
      <BottomNote
        text="Upload a competitor slide or research chart, Claude recreates it in your style."
        top={944}
      />
    </Slide>
  )
}

// ─── SLIDE 11: Result ─────────────────────────────────────────────────────────
// step-7.png: 1866x939 -> 968x487

function SlideResult() {
  return (
    <Slide nodeId="281:411" name="Slide-result">
      <p style={{
        position: 'absolute', left: 90, top: 130, width: 900,
        fontSize: 64, fontWeight: 700, lineHeight: '80px',
        textAlign: 'center', color: BLACK, margin: 0,
      }}>
        Claude reproduces any graph, fully editable in your brand
      </p>

      {/* step-7.png: 1866x939 -> 968x487 */}
      <div style={{
        position: 'absolute', left: 56, top: 460,
        width: 968, height: 487,
        borderRadius: 20, boxShadow: CARD_SHADOW,
      }}>
        <img
          src="/screenshots/carousels/how-to-make-mckinsey-slides-with-ai/step-7.png"
          alt="Claude branded graph result"
          style={{ display: 'block', width: '100%', height: '100%', borderRadius: 20, pointerEvents: 'none' }}
        />
      </div>

      <p style={{
        position: 'absolute', left: 110, top: 990, width: 860,
        fontSize: 36, fontWeight: 500, lineHeight: '52px',
        textAlign: 'center', color: 'rgba(0,0,0,0.6)', margin: 0,
      }}>
        The output matches your colors, fonts, and layout. Every element is editable.
      </p>
    </Slide>
  )
}

// ─── SLIDE 12: Comparison ─────────────────────────────────────────────────────
// step-8-screenshot.png: 834x525 -> 474x298
// step-8-ai.png: 1023x576 -> 474x267

function SlideComparison() {
  return (
    <Slide nodeId="281:429" name="Slide-comparison">
      <p style={{
        position: 'absolute', left: 90, top: 130, width: 900,
        fontSize: 64, fontWeight: 700, lineHeight: '80px',
        textAlign: 'center', color: BLACK, margin: 0,
      }}>
        Screenshot vs AI, spot the difference
      </p>

      {/* Left: Original — 834x525 -> 474x298 */}
      <div style={{ position: 'absolute', left: 42, top: 406, width: 474 }}>
        <p style={{ margin: 0, marginBottom: 20, fontSize: 32, fontWeight: 600, lineHeight: '40px', color: BLACK, textAlign: 'center' }}>
          Original screenshot
        </p>
        <img
          src="/screenshots/carousels/how-to-make-mckinsey-slides-with-ai/step-8-screenshot.png"
          alt="Original chart screenshot"
          style={{ display: 'block', width: 474, height: 298, borderRadius: 16, boxShadow: CARD_SHADOW, pointerEvents: 'none' }}
        />
      </div>

      {/* Right: AI recreation — 1023x576 -> 474x267 */}
      <div style={{ position: 'absolute', left: 562, top: 406, width: 474 }}>
        <p style={{ margin: 0, marginBottom: 20, fontSize: 32, fontWeight: 600, lineHeight: '40px', color: BLACK, textAlign: 'center' }}>
          Claude recreation
        </p>
        <img
          src="/screenshots/carousels/how-to-make-mckinsey-slides-with-ai/step-8-ai.png"
          alt="AI-recreated chart in McKinsey style"
          style={{ display: 'block', width: 474, height: 267, borderRadius: 16, boxShadow: CARD_SHADOW, pointerEvents: 'none' }}
        />
      </div>

      <p style={{
        position: 'absolute', left: 90, top: 880, width: 900,
        fontSize: 32, fontWeight: 500, lineHeight: '48px',
        textAlign: 'center', color: 'rgba(0,0,0,0.6)', margin: 0,
      }}>
        Works with your own branding and data. Claude takes the template as inspiration and adapts it.
      </p>
    </Slide>
  )
}

// ─── SLIDE 13: CTA ────────────────────────────────────────────────────────────

function SlideCTA() {
  return (
    <Slide nodeId="281:455" name="Slide-CTA" withNavbar={false}>
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

export default function McKinseyCarousel() {
  return (
    <div
      data-node-id="281:211"
      data-name="McKinseyCarousel"
      style={{ display: 'flex', gap: 88, alignItems: 'flex-start' }}
    >
      <SlideCover />
      <SlideStory1 />
      <SlideStory2 />
      <SlideRules />
      <SlideStep1 />
      <SlideStep2 />
      <SlideStep3 />
      <SlideStep4 />
      <SlideStep5 />
      <SlideStep6 />
      <SlideResult />
      <SlideComparison />
      <SlideCTA />
    </div>
  )
}
