import { useState } from 'react'
import McKinseyCarousel from '../design/carousels/McKinseyCarousel.jsx'
import ScheduleTasksCarousel from '../design/carousels/ScheduleTasksCarousel.jsx'
import OpenClawCarousel from '../design/carousels/OpenClawCarousel.jsx'
import IgentivVSLSlides from '../design/pptx-slides/IgentivVSLSlides.jsx'
import { SLIDE_DATA as igentivVSLData } from '../design/pptx-slides/IgentivVSLSlides.data.js'
import ClaudeCoworkSetupChecklist from '../design/infographics/ClaudeCoworkSetupChecklist.jsx'
import AIHypeCycleInfographic from '../design/infographics/AIHypeCycleInfographic.jsx'

// ── MODES registry ────────────────────────────────────────────────────────────
// When the slide-agent generates a new deck it adds an entry here.
// type: 'carousel' | 'infographic' | 'slides'
// slideCount is required for type 'slides' — set to SLIDE_DATA.slides.length
//
// Example entry added by agent:
//   myTopic: {
//     label: 'My Topic Slides',
//     component: MyTopicSlides,
//     type: 'slides',
//     slideCount: 8,
//   },

const MODES = {
  'ai-hype-cycle': {
    label: 'AI Hype Cycle',
    component: AIHypeCycleInfographic,
    type: 'infographic',
  },
  'claude-cowork-setup': {
    label: 'Claude Cowork Setup',
    component: ClaudeCoworkSetupChecklist,
    type: 'infographic',
  },
  igentivVSL: {
    label: 'Igentiv VSL',
    component: IgentivVSLSlides,
    type: 'slides',
    slideCount: igentivVSLData.slides.length,
  },
  mckinsey: {
    label: 'McKinsey Carousel',
    component: McKinseyCarousel,
    type: 'carousel',
  },
  scheduleTasks: {
    label: 'Schedule Tasks Carousel',
    component: ScheduleTasksCarousel,
    type: 'carousel',
  },
  openclaw: {
    label: 'OpenClaw 24/7 Agent Carousel',
    component: OpenClawCarousel,
    type: 'carousel',
  },
}

// ── Slide viewer ──────────────────────────────────────────────────────────────

const SLIDE_W = 1280
const SLIDE_H = 720
const SLIDE_GAP = 60

function SlideViewerWrapper({ Component, slideCount, slideIndex, setSlideIndex }) {
  const total = slideCount || 1
  const clamp = (i) => Math.max(0, Math.min(total - 1, i))

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '48px 0 40px',
        gap: 28,
      }}
    >
      {/* Slide viewport — clips to exactly one slide */}
      <div
        style={{
          width: SLIDE_W,
          height: SLIDE_H,
          overflow: 'hidden',
          position: 'relative',
          borderRadius: 16,
          boxShadow: '0 24px 80px rgba(0,0,0,0.55)',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: SLIDE_GAP,
            transform: `translateX(-${slideIndex * (SLIDE_W + SLIDE_GAP)}px)`,
            transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <Component />
        </div>
      </div>

      {/* Prev / counter / next */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 28,
        }}
      >
        <button
          onClick={() => setSlideIndex(clamp(slideIndex - 1))}
          disabled={slideIndex === 0}
          style={navBtnStyle(slideIndex === 0)}
        >
          ←
        </button>

        <span
          style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: 15,
            fontWeight: 600,
            fontFamily: "'Montserrat', sans-serif",
            minWidth: 60,
            textAlign: 'center',
          }}
        >
          {slideIndex + 1} / {total}
        </span>

        <button
          onClick={() => setSlideIndex(clamp(slideIndex + 1))}
          disabled={slideIndex >= total - 1}
          style={navBtnStyle(slideIndex >= total - 1)}
        >
          →
        </button>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: 8 }}>
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => setSlideIndex(i)}
            style={{
              width: i === slideIndex ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === slideIndex ? '#b4eaff' : 'rgba(255,255,255,0.3)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 0.2s ease, background 0.2s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function navBtnStyle(disabled) {
  return {
    width: 44,
    height: 44,
    borderRadius: 12,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: disabled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.18)',
    color: disabled ? 'rgba(255,255,255,0.25)' : 'white',
    fontSize: 20,
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.15s ease',
  }
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeMode, setActiveMode] = useState(Object.keys(MODES)[0])
  const [slideIndex, setSlideIndex] = useState(0)

  const entry = MODES[activeMode]
  const isSlides = entry?.type === 'slides'

  function switchMode(key) {
    setActiveMode(key)
    setSlideIndex(0)
  }

  return (
    <div
      style={{
        background: '#13131f',
        minHeight: '100vh',
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Mode bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '14px 28px',
          background: '#0c0c18',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          overflowX: 'auto',
        }}
      >
        {Object.entries(MODES).map(([key, m]) => (
          <button
            key={key}
            onClick={() => switchMode(key)}
            style={{
              padding: '8px 18px',
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
              background: activeMode === key ? '#b4eaff' : 'rgba(255,255,255,0.1)',
              color: activeMode === key ? '#092c69' : 'rgba(255,255,255,0.8)',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              whiteSpace: 'nowrap',
              transition: 'background 0.15s ease, color 0.15s ease',
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Canvas area */}
      {isSlides ? (
        <SlideViewerWrapper
          Component={entry.component}
          slideCount={entry.slideCount ?? 1}
          slideIndex={slideIndex}
          setSlideIndex={setSlideIndex}
        />
      ) : (
        <div style={{ padding: '40px', overflowX: 'auto' }}>
          <entry.component />
        </div>
      )}
    </div>
  )
}
