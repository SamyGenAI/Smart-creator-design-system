import { CarouselNavbarCentered, CarouselSlideShell } from '../../components/CarouselPrimitives.jsx'
import { CREATOR_DISPLAY_NAME } from '../../src/creatorIdentity.js'

/**
 * LinkedIn Carousel — "3 Claude Skills for Lead Search"
 * Style: cream bg #fffceb, black text, #b4eaff accent, Montserrat
 * 1080x1350 slides
 */

const CARD_SHADOW = 'var(--theme-shadow-card)'
const ACCENT = 'var(--theme-accent-1)'
const BACKGROUND_PRIMARY = 'var(--theme-surface-canvas)'
const BLACK = 'var(--theme-color-text-primary)'
const FONT = "var(--font\/family\/title, 'Montserrat', sans-serif)"

const NAVBAR = <CarouselNavbarCentered textColor={BLACK} fontFamily={FONT} />

function Slide({ children, nodeId, name }) {
  return (
    <CarouselSlideShell
      nodeId={nodeId}
      name={name}
      navbar={NAVBAR}
      background={BACKGROUND_PRIMARY}
      fontFamily={FONT}
    >
      {children}
    </CarouselSlideShell>
  )
}

// ─── Accent pill ──────────────────────────────────────────────────────────────

function AccentPill({ left, top, width, height = 76, radius = 20 }) {
  return (
    <div style={{
      position: 'absolute',
      left, top, width, height,
      background: ACCENT,
      borderRadius: radius,
    }} />
  )
}

// ─── Screenshot placeholder ──────────────────────────────────────────────────

function ScreenPlaceholder({ top, height = 544, left = 31, width = 1017, label = '[ screen goes here ]' }) {
  return (
    <div style={{
      position: 'absolute',
      left, top, width, height,
      borderRadius: 20,
      boxShadow: CARD_SHADOW,
      background: 'rgba(0,0,0,0.04)',
      border: '2px dashed rgba(0,0,0,0.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <p style={{ margin: 0, fontSize: 28, color: 'rgba(0,0,0,0.25)', fontWeight: 500 }}>
        {label}
      </p>
    </div>
  )
}

// ─── White card ──────────────────────────────────────────────────────────────

function WhiteCard({ children, top, left = 39, width = 1001, padding = '28px 40px', radius = 30 }) {
  return (
    <div style={{
      position: 'absolute',
      left, top, width,
      background: '#fff',
      borderRadius: radius,
      padding,
      boxShadow: CARD_SHADOW,
      boxSizing: 'border-box',
    }}>
      {children}
    </div>
  )
}

// ─── Bullet item (arrow style) ──────────────────────────────────────────────

function ArrowBullet({ text, fontSize = 40, lineHeight = '58px' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
      <span style={{ fontSize, fontWeight: 700, color: BLACK, lineHeight, flexShrink: 0 }}>&#8594;</span>
      <p style={{ margin: 0, fontSize, fontWeight: 500, lineHeight, color: BLACK }}>{text}</p>
    </div>
  )
}

// ─── Prompt card (italic quote style) ────────────────────────────────────────

function PromptCard({ text, top, left = 39, width = 1001 }) {
  return (
    <WhiteCard top={top} left={left} width={width} padding="32px 44px" radius={24}>
      <p style={{ margin: 0, fontSize: 34, fontWeight: 500, lineHeight: '50px', color: BLACK, fontStyle: 'italic' }}>
        {text}
      </p>
    </WhiteCard>
  )
}

// ─── Numbered flow step ─────────────────────────────────────────────────────

function FlowStep({ number, text, top, left = 56, width = 968 }) {
  return (
    <div style={{
      position: 'absolute',
      left, top, width,
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      background: '#fff',
      borderRadius: 24,
      padding: '24px 36px',
      boxShadow: CARD_SHADOW,
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: 64, height: 64,
        borderRadius: '50%',
        background: ACCENT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: BLACK }}>{number}</span>
      </div>
      <p style={{ margin: 0, fontSize: 36, fontWeight: 500, lineHeight: '50px', color: BLACK }}>{text}</p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDES
// ═══════════════════════════════════════════════════════════════════════════════

// ─── SLIDE 1: Cover ─────────────────────────────────────────────────────────

function SlideCover() {
  return (
    <Slide nodeId="lead:cover" name="Slide-cover">
      {/* Top pill */}
      <div style={{
        position: 'absolute',
        left: 257, top: 44,
        width: 565, height: 101,
        border: `3px solid ${BLACK}`,
        borderRadius: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{ margin: 0, fontSize: 64, fontWeight: 500, color: BLACK, lineHeight: '70px' }}>
          Follow the steps
        </p>
      </div>

      {/* Title */}
      <AccentPill left={74} top={539} width={932} height={130} radius={30} />
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 217,
        width: 940,
        fontSize: 128, fontWeight: 700,
        lineHeight: '130px',
        textAlign: 'center',
        color: BLACK, margin: 0,
        whiteSpace: 'pre-wrap',
      }}>
        {'3 Claude Skills\nfor LEAD\nSEARCH'}
      </p>

      {/* Subtitle */}
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 830,
        width: 800,
        fontSize: 44, fontWeight: 500,
        lineHeight: '62px',
        textAlign: 'center',
        color: 'rgba(0,0,0,0.5)',
        margin: 0,
      }}>
        Turn Claude Code into a GTM engineer
      </p>

      {/* Avatar */}
      <div style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 970,
        width: 280, height: 280,
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: CARD_SHADOW,
      }}>
        <img
          src="/assets/avatar/avatar-profile.png"
          alt={CREATOR_DISPLAY_NAME}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </Slide>
  )
}

// ─── SLIDE 2: Problem ───────────────────────────────────────────────────────

function SlideProblem() {
  const tools = [
    'LinkedIn Sales Nav',
    'Apollo',
    'ZoomInfo',
    'Google Sheets',
    'Manual research',
  ]
  return (
    <Slide nodeId="lead:problem" name="Slide-problem">
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 160,
        width: 880,
        fontSize: 64, fontWeight: 700,
        lineHeight: '80px',
        textAlign: 'center',
        color: BLACK, margin: 0,
      }}>
        Most founders use 5 tools for lead gen
      </p>

      <div style={{
        position: 'absolute',
        left: 56, top: 420,
        width: 968,
        display: 'flex', flexDirection: 'column', gap: 20,
      }}>
        {tools.map((t, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: 20,
            padding: '20px 40px',
            boxShadow: CARD_SHADOW,
          }}>
            <p style={{ margin: 0, fontSize: 44, fontWeight: 500, lineHeight: '60px', color: BLACK }}>{t}</p>
          </div>
        ))}
      </div>

      {/* Bottom verdict */}
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 1180,
        width: 800,
        fontSize: 48, fontWeight: 700,
        lineHeight: '64px',
        textAlign: 'center',
        color: 'rgba(0,0,0,0.4)',
        margin: 0,
      }}>
        Slow, Expensive, Fragmented
      </p>
    </Slide>
  )
}

// ─── SLIDE 3: What if ───────────────────────────────────────────────────────

function SlideWhatIf() {
  const lines = [
    'One terminal',
    'One AI agent',
    'Zero subscriptions',
  ]
  return (
    <Slide nodeId="lead:whatif" name="Slide-whatif">
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 160,
        width: 820,
        fontSize: 64, fontWeight: 700,
        lineHeight: '80px',
        textAlign: 'center',
        color: BLACK, margin: 0,
      }}>
        What if Claude Code could do it all?
      </p>

      <div style={{
        position: 'absolute',
        left: 56, top: 480,
        width: 968,
        display: 'flex', flexDirection: 'column', gap: 28,
      }}>
        {lines.map((line, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{
              width: 56, height: 56,
              borderRadius: '50%',
              background: ACCENT,
              flexShrink: 0,
            }} />
            <p style={{ margin: 0, fontSize: 56, fontWeight: 500, lineHeight: '72px', color: BLACK }}>{line}</p>
          </div>
        ))}
      </div>

      <AccentPill left={206} top={870} width={668} height={80} radius={20} />
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 862,
        width: 880,
        fontSize: 52, fontWeight: 700,
        lineHeight: '96px',
        textAlign: 'center',
        color: BLACK, margin: 0,
      }}>
        Here are the 3 skills you need
      </p>

      <img
        src="/assets/illustrations/notion-style/oc-target.svg"
        alt=""
        style={{ position: 'absolute', left: 380, top: 1000, width: 320, height: 280, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 4: What powers it (Exa) ─────────────────────────────────────────

function SlideExa() {
  const points = [
    'Exa is a search API built for AI agents',
    'Unlike Google, it returns structured data, not links',
    'It searches companies, people, and news using neural search (meaning, not keywords)',
    'Connect it to Claude Code via MCP',
  ]
  return (
    <Slide nodeId="lead:exa" name="Slide-exa">
      <AccentPill left={268} top={228} width={420} height={76} radius={20} />
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 220,
        width: 800,
        fontSize: 64, fontWeight: 700,
        lineHeight: '80px',
        textAlign: 'center',
        color: BLACK, margin: 0,
      }}>
        First: what powers it
      </p>

      <div style={{
        position: 'absolute',
        left: 56, top: 400,
        width: 968,
        display: 'flex', flexDirection: 'column', gap: 24,
      }}>
        {points.map((p, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: 20,
            padding: '24px 36px',
            boxShadow: CARD_SHADOW,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              <div style={{
                width: 12, height: 12,
                borderRadius: '50%',
                background: ACCENT,
                flexShrink: 0,
                marginTop: 18,
              }} />
              <p style={{ margin: 0, fontSize: 38, fontWeight: 500, lineHeight: '54px', color: BLACK }}>{p}</p>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  )
}

// ─── SLIDE 5: Skill 1 — Company Research ────────────────────────────────────

function SlideSkill1() {
  return (
    <Slide nodeId="lead:skill1" name="Slide-skill1">
      {/* Skill number badge */}
      <div style={{
        position: 'absolute',
        left: 56, top: 140,
        display: 'flex', alignItems: 'center', gap: 20,
      }}>
        <div style={{
          width: 80, height: 80,
          borderRadius: '50%',
          background: ACCENT,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 40, fontWeight: 700, color: BLACK }}>1</span>
        </div>
        <p style={{ margin: 0, fontSize: 28, fontWeight: 500, color: 'rgba(0,0,0,0.4)', lineHeight: '36px' }}>SKILL</p>
      </div>

      {/* Title */}
      <p style={{
        position: 'absolute',
        left: 56, top: 260,
        width: 968,
        fontSize: 56, fontWeight: 700,
        lineHeight: '68px',
        color: BLACK, margin: 0,
      }}>
        Company Research Agent
      </p>

      {/* Bullets */}
      <div style={{
        position: 'absolute',
        left: 56, top: 400,
        width: 968,
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <ArrowBullet text="Finds company info, competitors, news, financials" />
        <ArrowBullet text="Builds company lists by market or niche" />
        <ArrowBullet text="Returns structured data, not web pages" />
      </div>

      {/* Example prompt */}
      <p style={{
        position: 'absolute',
        left: 56, top: 670,
        fontSize: 28, fontWeight: 700,
        color: 'rgba(0,0,0,0.35)',
        margin: 0,
        letterSpacing: 2,
      }}>
        EXAMPLE PROMPT
      </p>
      <PromptCard
        text={'"Find 20 AI startups in Europe building developer tools, include funding stage and employee count"'}
        top={720}
        left={39}
        width={1001}
      />

      {/* Screenshot placeholder */}
      <ScreenPlaceholder top={920} height={380} left={39} width={1001} label="[ Skill in action: screen ]" />
    </Slide>
  )
}

// ─── SLIDE 6: Skill 2 — Lead Generation ─────────────────────────────────────

function SlideSkill2() {
  return (
    <Slide nodeId="lead:skill2" name="Slide-skill2">
      <div style={{
        position: 'absolute',
        left: 56, top: 140,
        display: 'flex', alignItems: 'center', gap: 20,
      }}>
        <div style={{
          width: 80, height: 80,
          borderRadius: '50%',
          background: ACCENT,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 40, fontWeight: 700, color: BLACK }}>2</span>
        </div>
        <p style={{ margin: 0, fontSize: 28, fontWeight: 500, color: 'rgba(0,0,0,0.4)', lineHeight: '36px' }}>SKILL</p>
      </div>

      <p style={{
        position: 'absolute',
        left: 56, top: 260,
        width: 968,
        fontSize: 56, fontWeight: 700,
        lineHeight: '68px',
        color: BLACK, margin: 0,
      }}>
        Lead Generation Agent
      </p>

      <div style={{
        position: 'absolute',
        left: 56, top: 400,
        width: 968,
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <ArrowBullet text="Generates enriched lead lists at scale" />
        <ArrowBullet text="Scores each company on ICP fit (1-10)" />
        <ArrowBullet text="Outputs a CSV with enrichment signals" />
      </div>

      <p style={{
        position: 'absolute',
        left: 56, top: 670,
        fontSize: 28, fontWeight: 700,
        color: 'rgba(0,0,0,0.35)',
        margin: 0,
        letterSpacing: 2,
      }}>
        EXAMPLE PROMPT
      </p>
      <PromptCard
        text={'"Generate 200 B2B SaaS leads with 50-200 employees that need [your product], score on ICP fit"'}
        top={720}
        left={39}
        width={1001}
      />

      <ScreenPlaceholder top={920} height={380} left={39} width={1001} label="[ Skill in action: screen ]" />
    </Slide>
  )
}

// ─── SLIDE 7: Skill 3 — People Search ───────────────────────────────────────

function SlideSkill3() {
  return (
    <Slide nodeId="lead:skill3" name="Slide-skill3">
      <div style={{
        position: 'absolute',
        left: 56, top: 140,
        display: 'flex', alignItems: 'center', gap: 20,
      }}>
        <div style={{
          width: 80, height: 80,
          borderRadius: '50%',
          background: ACCENT,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 40, fontWeight: 700, color: BLACK }}>3</span>
        </div>
        <p style={{ margin: 0, fontSize: 28, fontWeight: 500, color: 'rgba(0,0,0,0.4)', lineHeight: '36px' }}>SKILL</p>
      </div>

      <p style={{
        position: 'absolute',
        left: 56, top: 260,
        width: 968,
        fontSize: 56, fontWeight: 700,
        lineHeight: '68px',
        color: BLACK, margin: 0,
      }}>
        People Search Agent
      </p>

      <div style={{
        position: 'absolute',
        left: 56, top: 400,
        width: 968,
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <ArrowBullet text="Finds LinkedIn profiles and professional backgrounds" />
        <ArrowBullet text="Searches by role, company, location" />
        <ArrowBullet text="Returns public bios and contact info" />
      </div>

      <p style={{
        position: 'absolute',
        left: 56, top: 670,
        fontSize: 28, fontWeight: 700,
        color: 'rgba(0,0,0,0.35)',
        margin: 0,
        letterSpacing: 2,
      }}>
        EXAMPLE PROMPT
      </p>
      <PromptCard
        text={'"Find the VP of Sales at these 20 companies, include LinkedIn profile and current role"'}
        top={720}
        left={39}
        width={1001}
      />

      <ScreenPlaceholder top={920} height={380} left={39} width={1001} label="[ Skill in action: screen ]" />
    </Slide>
  )
}

// ─── SLIDE 8: Chain them together ───────────────────────────────────────────

function SlideChain() {
  return (
    <Slide nodeId="lead:chain" name="Slide-chain">
      <AccentPill left={120} top={228} width={840} height={76} radius={20} />
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 220,
        width: 900,
        fontSize: 60, fontWeight: 700,
        lineHeight: '76px',
        textAlign: 'center',
        color: BLACK, margin: 0,
      }}>
        The real power? Chain them together
      </p>

      <FlowStep number={1} text="Research a market (Company Research)" top={420} />

      {/* Connector arrow */}
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 530, fontSize: 48, color: 'rgba(0,0,0,0.2)', margin: 0,
      }}>
        &#8595;
      </p>

      <FlowStep number={2} text="Generate 100+ scored leads (Lead Gen)" top={590} />

      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 700, fontSize: 48, color: 'rgba(0,0,0,0.2)', margin: 0,
      }}>
        &#8595;
      </p>

      <FlowStep number={3} text="Find decision-makers (People Search)" top={760} />

      {/* Bottom text */}
      <div style={{
        position: 'absolute',
        left: 56, top: 960,
        width: 968,
      }}>
        <p style={{
          margin: 0, fontSize: 44, fontWeight: 500,
          lineHeight: '64px', color: BLACK, textAlign: 'center',
        }}>
          All from one Claude Code session
        </p>
        <p style={{
          margin: 0, fontSize: 44, fontWeight: 700,
          lineHeight: '64px', color: 'rgba(0,0,0,0.35)', textAlign: 'center',
        }}>
          All automatic
        </p>
      </div>

      <img
        src="/assets/illustrations/notion-style/oc-sling-shot.svg"
        alt=""
        style={{ position: 'absolute', left: 380, top: 1100, width: 320, height: 220, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 9: Results ───────────────────────────────────────────────────────

function SlideResults() {
  const stats = [
    { value: '50', label: 'Enriched leads' },
    { value: 'ICP', label: 'Scores included' },
    { value: 'LinkedIn', label: 'Profiles found' },
    { value: '15 min', label: 'From my terminal' },
  ]
  return (
    <Slide nodeId="lead:results" name="Slide-results">
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 160,
        width: 820,
        fontSize: 60, fontWeight: 700,
        lineHeight: '76px',
        textAlign: 'center',
        color: BLACK, margin: 0,
      }}>
        I ran this exact workflow
      </p>

      <div style={{
        position: 'absolute',
        left: 56, top: 370,
        width: 968,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 24,
      }}>
        {stats.map(({ value, label }) => (
          <div key={label} style={{
            background: '#fff',
            borderRadius: 24,
            padding: '40px 36px',
            boxShadow: CARD_SHADOW,
            textAlign: 'center',
          }}>
            <p style={{ margin: 0, fontSize: 56, fontWeight: 700, lineHeight: '68px', color: BLACK }}>{value}</p>
            <p style={{ margin: '12px 0 0', fontSize: 28, fontWeight: 500, lineHeight: '40px', color: 'rgba(0,0,0,0.45)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{
        position: 'absolute',
        left: 56, top: 980,
        width: 968,
        display: 'flex', flexDirection: 'column', gap: 8,
        textAlign: 'center',
      }}>
        <p style={{ margin: 0, fontSize: 40, fontWeight: 500, lineHeight: '56px', color: 'rgba(0,0,0,0.35)' }}>No browser</p>
        <p style={{ margin: 0, fontSize: 40, fontWeight: 500, lineHeight: '56px', color: 'rgba(0,0,0,0.35)' }}>No CRM</p>
        <p style={{ margin: 0, fontSize: 40, fontWeight: 500, lineHeight: '56px', color: 'rgba(0,0,0,0.35)' }}>No spreadsheet</p>
      </div>

      <img
        src="/assets/illustrations/notion-style/oc-money-profits.svg"
        alt=""
        style={{ position: 'absolute', left: 380, top: 1120, width: 320, height: 200, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 10: Setup CTA ────────────────────────────────────────────────────

function SlideSetup() {
  const steps = [
    'Get the 3 skills ready to copy-paste',
    'Step-by-step setup for Claude Code + Exa MCP',
    'Prompt templates to start generating leads today',
  ]
  return (
    <Slide nodeId="lead:setup" name="Slide-setup">
      <AccentPill left={130} top={228} width={820} height={76} radius={20} />
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 180,
        width: 960,
        fontSize: 56, fontWeight: 700,
        lineHeight: '76px',
        textAlign: 'center',
        color: BLACK, margin: 0,
        whiteSpace: 'pre-wrap',
      }}>
        {'Full setup guide +\nprompt ideas in my newsletter'}
      </p>

      <div style={{
        position: 'absolute',
        left: 56, top: 470,
        width: 968,
        display: 'flex', flexDirection: 'column', gap: 24,
      }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: 24,
            padding: '28px 40px',
            boxShadow: CARD_SHADOW,
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}>
            <div style={{
              width: 56, height: 56,
              borderRadius: '50%',
              background: ACCENT,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: BLACK }}>&#10003;</span>
            </div>
            <p style={{ margin: 0, fontSize: 36, fontWeight: 500, lineHeight: '50px', color: BLACK }}>{s}</p>
          </div>
        ))}
      </div>

      {/* CTA box */}
      <div style={{
        position: 'absolute',
        left: 56, top: 950,
        width: 968,
        background: BLACK,
        borderRadius: 30,
        padding: '40px 48px',
        boxSizing: 'border-box',
        textAlign: 'center',
      }}>
        <p style={{ margin: 0, fontSize: 44, fontWeight: 700, lineHeight: '60px', color: BACKGROUND_PRIMARY }}>
          Link in comments
        </p>
        <p style={{ margin: '8px 0 0', fontSize: 32, fontWeight: 500, lineHeight: '48px', color: 'rgba(255,252,235,0.5)' }}>
          Or DM me "LEADS" and I will send it to you
        </p>
      </div>

      <img
        src="/assets/illustrations/notion-style/oc-handing-key.svg"
        alt=""
        style={{ position: 'absolute', left: 380, top: 1130, width: 320, height: 200, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 11: CTA Follow ───────────────────────────────────────────────────

function SlideCTA() {
  return (
    <Slide nodeId="lead:cta" name="Slide-CTA">
      {/* Avatar */}
      <div style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 260,
        width: 400, height: 400,
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: CARD_SHADOW,
      }}>
        <img
          src="/assets/avatar/avatar-profile.png"
          alt={CREATOR_DISPLAY_NAME}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Headline */}
      <AccentPill left={494} top={814} width={302} height={90} radius={20} />
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 720,
        width: 700,
        fontSize: 96, fontWeight: 700,
        lineHeight: '110px',
        textAlign: 'center',
        color: BLACK, margin: 0,
      }}>
        Follow for more
      </p>

      {/* Name */}
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 980,
        width: 600,
        fontSize: 48, fontWeight: 500,
        lineHeight: '70px',
        textAlign: 'center',
        color: BLACK, margin: 0,
      }}>
        {CREATOR_DISPLAY_NAME}
      </p>

      <img
        src="/assets/illustrations/notion-style/oc-hi-five.svg"
        alt=""
        style={{
          position: 'absolute',
          left: '50%', transform: 'translateX(-50%)',
          top: 1090,
          width: 260, height: 220,
          objectFit: 'contain',
        }}
      />
    </Slide>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export default function LeadSearchCarousel() {
  return (
    <div
      data-node-id="lead:root"
      data-name="LeadSearchCarousel"
      style={{ display: 'flex', gap: 88, alignItems: 'flex-start' }}
    >
      <SlideCover />
      <SlideProblem />
      <SlideWhatIf />
      <SlideExa />
      <SlideSkill1 />
      <SlideSkill2 />
      <SlideSkill3 />
      <SlideChain />
      <SlideResults />
      <SlideSetup />
      <SlideCTA />
    </div>
  )
}
