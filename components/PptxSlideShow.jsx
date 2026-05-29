import { useCallback, useEffect, useState } from 'react'

const CANVAS_W = 1280
const CANVAS_H = 720

/**
 * Slide deck slideshow — one photo per slide from
 * public/screenshots/powerpoint/[slug]/slide-NN.jpg
 */
export default function PptxSlideShow({ modeKey, label }) {
  const [index, setIndex] = useState(0)
  const [slides, setSlides] = useState([])
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('Preparing your slides…')

  const loadSlides = useCallback(async () => {
    setStatus('loading')
    setMessage('Loading slide photos…')
    try {
      const res = await fetch(`/api/pptx/slides?mode=${encodeURIComponent(modeKey)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not load slides')
      setSlides(data.slides || [])
      setIndex(0)
      if (data.slides?.length) {
        setStatus('ready')
        setMessage('')
      } else {
        setStatus('empty')
        setMessage('Slide photos are not ready yet. Wait a moment, then click Retry.')
      }
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Something went wrong loading the slides.')
    }
  }, [modeKey])

  useEffect(() => {
    loadSlides()
  }, [loadSlides])

  useEffect(() => {
    function onKey(e) {
      if (status !== 'ready' || slides.length === 0) return
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(i + 1, slides.length - 1))
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [status, slides.length])

  const go = (i) => setIndex(Math.max(0, Math.min(i, slides.length - 1)))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      {label && (
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 500 }}>
          {label}
          {status === 'ready' && slides.length > 0 ? ` · Slide ${index + 1} of ${slides.length}` : ''}
        </p>
      )}

      <div
        data-name="PptxSlideShow-canvas"
        style={{
          position: 'relative',
          width: CANVAS_W,
          height: CANVAS_H,
          flexShrink: 0,
          background: '#fffceb',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
        }}
      >
        {status === 'ready' && slides[index] ? (
          <img
            src={slides[index]}
            alt={`Slide ${index + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 40,
              textAlign: 'center',
              color: '#323241',
              fontFamily: 'var(--font\\/family\\/title)',
              fontSize: 16,
              lineHeight: 1.5,
            }}
          >
            <p style={{ margin: '0 0 16px' }}>{message}</p>
            {(status === 'empty' || status === 'error') && (
              <button
                type="button"
                onClick={loadSlides}
                style={{
                  padding: '10px 20px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  background: 'var(--theme-accent-1)',
                  color: 'var(--theme-color-primary)',
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                Retry
              </button>
            )}
          </div>
        )}
      </div>

      {status === 'ready' && slides.length > 1 && (
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
            {slides.map((_, i) => (
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
            disabled={index === slides.length - 1}
            style={navBtnStyle(index === slides.length - 1)}
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      )}

      {status === 'ready' && (
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.45)', fontSize: 12, maxWidth: 520, textAlign: 'center' }}>
          Use the Download PPTX button above to get the editable PowerPoint file.
        </p>
      )}
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
