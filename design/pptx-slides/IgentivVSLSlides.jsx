// design/pptx-slides/IgentivVSLSlides.jsx
import { SlideShell, SlideCover, SlideBullets, SlideStatement, SlideEnd, renderSlide } from '../../components/SlideLayouts.jsx'
import SlideCard from '../../components/SlideCard.jsx'
import { SLIDE_DATA } from './IgentivVSLSlides.data.js'

const FONT = "var(--font\/family\/title, 'Montserrat', sans-serif)"
const COLOR_PRIMARY = 'var(--theme-color-primary)'
const COLOR_TEXT_PRIMARY = 'var(--theme-color-text-primary)'
const COLOR_TEXT_MUTED = 'var(--theme-color-text-muted)'
const COLOR_SURFACE_ALERT = 'var(--theme-accent-4)'
const COLOR_SURFACE_SIGNAL = 'var(--theme-accent-3)'
const COLOR_SURFACE_INFO = 'var(--theme-surface-layer-4)'
const COLOR_SURFACE_HIGHLIGHT = 'var(--theme-accent-1)'
const SHADOW_SOFT = 'var(--theme-shadow-card-soft)'
const SHADOW_CARD = 'var(--theme-shadow-card)'

// ── Icon in colored rounded square ───────────────────────────────────────────

function IconSquare({ src, bg = 'var(--theme-accent-1)', size = 52, iconSize = 28 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 14,
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: SHADOW_SOFT,
        flexShrink: 0,
      }}
    >
      <img src={src} alt="" style={{ width: iconSize, height: iconSize, objectFit: 'contain' }} />
    </div>
  )
}

// ── Arrow shape ──────────────────────────────────────────────────────────────

function ArrowDown({ color = COLOR_PRIMARY, size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M12 4v14m0 0l-5-5m5 5l5-5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRight({ color = COLOR_PRIMARY, size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M4 12h14m0 0l-5-5m5 5l-5 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Slide 2: The Problem (custom visual layout) ─────────────────────────────

function SlideProblem() {
  return (
    <SlideShell nodeId="slide-2" name="slide-problem-s2">
      {/* Primary title bar */}
      <SlideCard
        variant="primary"
        padding="0 32px"
        radius={16}
        style={{
          position: 'absolute',
          top: 56,
          left: 60,
          width: 1160,
          height: 80,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 700, color: 'white', fontFamily: FONT }}>
          The Old Playbook Is Broken
        </div>
      </SlideCard>

      {/* Three problem cards in a vertical flow with arrows */}
      <div
        style={{
          position: 'absolute',
          top: 168,
          left: 60,
          width: 1160,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {/* Problem 1 — Cold email */}
        <SlideCard
          variant="white"
          padding="18px 28px"
          radius={16}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 20 }}
        >
          <IconSquare
            src="/assets/icons/email-messages/send-email-paper-plane-1--Streamline-Freehand.png"
            bg={COLOR_SURFACE_ALERT}
            size={56}
            iconSize={30}
          />
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLOR_TEXT_PRIMARY, fontFamily: FONT }}>
              Cold email is dead
            </div>
            <div style={{ fontSize: 15, fontWeight: 500, color: COLOR_TEXT_MUTED, fontFamily: FONT, marginTop: 2 }}>
              Inboxes are flooded, reply rates are near zero. Buyers ignore everything templated.
            </div>
          </div>
        </SlideCard>

        <ArrowDown color={COLOR_TEXT_MUTED} size={24} />

        {/* Problem 2 — Content takes too long */}
        <SlideCard
          variant="white"
          padding="18px 28px"
          radius={16}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 20 }}
        >
          <IconSquare
            src="/assets/icons/business/time-hourglass-triangle--Streamline-Freehand.svg"
            bg={COLOR_SURFACE_SIGNAL}
            size={56}
            iconSize={30}
          />
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLOR_TEXT_PRIMARY, fontFamily: FONT }}>
              Content takes too long
            </div>
            <div style={{ fontSize: 15, fontWeight: 500, color: COLOR_TEXT_MUTED, fontFamily: FONT, marginTop: 2 }}>
              Most teams spend weeks on a post that gets 12 likes and zero leads.
            </div>
          </div>
        </SlideCard>

        <ArrowDown color={COLOR_TEXT_MUTED} size={24} />

        {/* Problem 3 — LinkedIn is a red ocean */}
        <SlideCard
          variant="white"
          padding="18px 28px"
          radius={16}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 20 }}
        >
          <IconSquare
            src="/assets/icons/data/analytics-graph-stock--Streamline-Freehand.svg"
            bg={COLOR_SURFACE_INFO}
            size={56}
            iconSize={30}
          />
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLOR_TEXT_PRIMARY, fontFamily: FONT }}>
              LinkedIn is a red ocean
            </div>
            <div style={{ fontSize: 15, fontWeight: 500, color: COLOR_TEXT_MUTED, fontFamily: FONT, marginTop: 2 }}>
              Everyone is posting, but very few are positioning themselves as the expert buyers trust.
            </div>
          </div>
        </SlideCard>

        {/* Bottom question */}
        <div
          style={{
            marginTop: 8,
            fontSize: 17,
            fontWeight: 600,
            color: COLOR_PRIMARY,
            fontFamily: FONT,
            textAlign: 'center',
          }}
        >
          So how do you stand out and get clients, without burning 20 hours a week?
        </div>
      </div>
    </SlideShell>
  )
}

// ── Slide 3: The Solution (custom 2-card + Igentiv text) ─────────────────────

function SlideSolution() {
  return (
    <SlideShell nodeId="slide-3" name="slide-solution-s3">
      {/* Primary title bar */}
      <SlideCard
        variant="primary"
        padding="0 32px"
        radius={16}
        style={{
          position: 'absolute',
          top: 56,
          left: 60,
          width: 1160,
          height: 80,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 700, color: 'white', fontFamily: FONT }}>
          Two Levers, One System
        </div>
      </SlideCard>

      {/* Two horizontal cards */}
      <div
        style={{
          position: 'absolute',
          top: 168,
          left: 60,
          width: 1160,
          display: 'flex',
          gap: 24,
        }}
      >
        {/* Card 1 — Premium Content */}
        <SlideCard
          variant="white"
          padding="32px 28px"
          radius={20}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 16,
          }}
        >
          <IconSquare
            src="/assets/icons/design/content-brush-pen--Streamline-Freehand.svg"
            bg={COLOR_SURFACE_HIGHLIGHT}
            size={64}
            iconSize={34}
          />
          <div style={{ fontSize: 22, fontWeight: 700, color: COLOR_TEXT_PRIMARY, fontFamily: FONT }}>
            Premium Content
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, color: COLOR_TEXT_MUTED, fontFamily: FONT, lineHeight: '24px' }}>
            High-quality posts that position you as the go-to expert. Content builds trust before the first call.
          </div>
        </SlideCard>

        {/* Plus sign between cards */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              background: COLOR_PRIMARY,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: SHADOW_CARD,
            }}
          >
            <span style={{ color: 'white', fontSize: 24, fontWeight: 700, fontFamily: FONT, lineHeight: 1 }}>+</span>
          </div>
        </div>

        {/* Card 2 — Targeted Leads */}
        <SlideCard
          variant="white"
          padding="32px 28px"
          radius={20}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 16,
          }}
        >
          <IconSquare
            src="/assets/icons/data/analytics-graph-bar-horizontal--Streamline-Freehand.svg"
            bg={COLOR_SURFACE_HIGHLIGHT}
            size={64}
            iconSize={34}
          />
          <div style={{ fontSize: 22, fontWeight: 700, color: COLOR_TEXT_PRIMARY, fontFamily: FONT }}>
            Targeted Leads
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, color: COLOR_TEXT_MUTED, fontFamily: FONT, lineHeight: '24px' }}>
            Real buying signals tell you who's ready to talk. No cold outreach, just warm conversations.
          </div>
        </SlideCard>
      </div>

      {/* Igentiv — "We handle both." */}
      <div
        style={{
          position: 'absolute',
          bottom: 56,
          left: 0,
          width: 1280,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, color: COLOR_TEXT_MUTED, fontFamily: FONT, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>
          Igentiv Studio
        </div>
        <div style={{ fontSize: 40, fontWeight: 700, color: COLOR_TEXT_PRIMARY, fontFamily: FONT }}>
          We handle both.
        </div>
      </div>
    </SlideShell>
  )
}

// ── Main deck component ──────────────────────────────────────────────────────

export default function IgentivVSLSlides() {
  const slides = SLIDE_DATA.slides

  return (
    <div style={{ display: 'flex', gap: 60, alignItems: 'flex-start' }}>
      {slides.map((slide) => {
        // Custom layouts
        if (slide.layout === 'custom-problem') return <SlideProblem key={slide.id} />
        if (slide.layout === 'custom-solution') return <SlideSolution key={slide.id} />
        // Standard layouts
        return renderSlide(slide)
      })}
    </div>
  )
}
