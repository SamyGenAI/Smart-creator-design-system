import { Children, isValidElement, useEffect, useState } from 'react'

const CANVAS_W = 1280
const CANVAS_H = 720

/**
 * PptxSlideViewer
 *
 * Renders an array of React slide elements one at a time with prev/next
 * controls and dot navigation. All slides remain in the DOM (visibility:
 * hidden for non-active ones) so Playwright can screenshot each
 * div[style*="width: 1280px"][style*="height: 720px"] element directly
 * without any clicking.
 *
 * Props:
 *   slides   — React element whose children are individual slide elements,
 *              OR an array of React elements
 *   label    — optional heading shown above the deck
 *   modeKey  — used for aria labels (optional)
 */
export default function PptxSlideViewer({ slides, label, modeKey }) {
  // Accept an array of elements directly, or a single element/node
  const slideArray = Array.isArray(slides)
    ? slides
    : Children.toArray(slides)
  const total = slideArray.length
  const [index, setIndex] = useState(0)

  useEffect(() => {
    function onKey(e) {
      if (total === 0) return
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(i + 1, total - 1))
      if (e.key === 'ArrowLeft')  setIndex((i) => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total])

  const go = (i) => setIndex(Math.max(0, Math.min(i, total - 1)))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      {label && (
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 500 }}>
          {label}
          {total > 0 ? ` · Slide ${index + 1} of ${total}` : ''}
        </p>
      )}

      {/* Slide stack — all slides rendered in DOM, only active one visible */}
      <div
        style={{
          position: 'relative',
          width: CANVAS_W,
          height: CANVAS_H,
          flexShrink: 0,
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
        }}
      >
        {slideArray.map((slide, i) => (
          <div
            key={i}
            data-name="pptx-slide"
            style={{
              position: i === 0 ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              width: CANVAS_W,
              height: CANVAS_H,
              visibility: i === index ? 'visible' : 'hidden',
              pointerEvents: i === index ? 'auto' : 'none',
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Navigation controls */}
      {total > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            style={navBtnStyle(index === 0)}
            aria-label="Previous slide"
          >
            ←
          </button>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {slideArray.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                style={{
                  width: i === index ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background: i === index ? 'var(--theme-accent-1)' : 'rgba(255,255,255,0.25)',
                  transition: 'width 0.15s ease, background 0.15s ease',
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === total - 1}
            style={navBtnStyle(index === total - 1)}
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      )}

      <p style={{ margin: 0, color: 'rgba(255,255,255,0.45)', fontSize: 12, maxWidth: 520, textAlign: 'center' }}>
        Use the Download PPTX button above to get the editable PowerPoint file.
      </p>
    </div>
  )
}

function navBtnStyle(disabled) {
  return {
    width: 44,
    height: 44,
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.2)',
    background: disabled ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.12)',
    color: disabled ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.9)',
    fontSize: 20,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'var(--font\\/family\\/title)',
  }
}
