import { useEffect, useRef, useState } from 'react'
import pptxgen from 'pptxgenjs'
import McKinseyCarousel from '../design/carousels/McKinseyCarousel.jsx'
import ScheduleTasksCarousel from '../design/carousels/ScheduleTasksCarousel.jsx'
import OpenClawCarousel from '../design/carousels/OpenClawCarousel.jsx'
import AIOperatingSystemCarousel from '../design/carousels/AIOperatingSystemCarousel.jsx'
import IgentivVSLSlides from '../design/pptx-slides/IgentivVSLSlides.jsx'
import { SLIDE_DATA as igentivVSLData } from '../design/pptx-slides/IgentivVSLSlides.data.js'
import ClaudeDesignWinsInfographic from '../design/infographics/ClaudeDesignWinsInfographic.jsx'
import AiOsInfographic from '../design/infographics/AiOsInfographic.jsx'
import BulletProofAISystemInfographic from '../design/infographics/BulletProofAISystemInfographic.jsx'
import BulletProofAISystemInfographicV2 from '../design/infographics/BulletProofAISystemInfographicV2.jsx'
import { MODES as MODE_REGISTRY } from './modes.js'

// Component map — keyed identically to MODE_REGISTRY. Adding a new design
// requires (1) an entry in src/modes.js and (2) a component here.
const COMPONENTS = {
  'bulletproof-ai': BulletProofAISystemInfographic,
  'bulletproof-ai-v2': BulletProofAISystemInfographicV2,
  'ai-os': AiOsInfographic,
  'claude-design-wins': ClaudeDesignWinsInfographic,
  igentivVSL: IgentivVSLSlides,
  mckinsey: McKinseyCarousel,
  scheduleTasks: ScheduleTasksCarousel,
  openclaw: OpenClawCarousel,
  'ai-operating-system': AIOperatingSystemCarousel,
}

const SLIDE_COUNTS = {
  igentivVSL: igentivVSLData.slides.length,
}

const MODES = Object.fromEntries(
  Object.entries(MODE_REGISTRY).map(([key, meta]) => [
    key,
    { ...meta, component: COMPONENTS[key], slideCount: SLIDE_COUNTS[key] },
  ])
)

const SLIDE_W = 1280
const SLIDE_H = 720
const SLIDE_GAP = 60
const waitFrame = () => new Promise((resolve) => requestAnimationFrame(() => resolve()))
const waitMs = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function sanitizeFileName(raw) {
  return String(raw || 'design').replace(/[^a-z0-9-_]/gi, '-').replace(/-+/g, '-')
}

function SlideViewerWrapper({ Component, slideCount, slideIndex, setSlideIndex, viewportRef }) {
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
      <div
        ref={viewportRef}
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

      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <button onClick={() => setSlideIndex(clamp(slideIndex - 1))} disabled={slideIndex === 0} style={navBtnStyle(slideIndex === 0)}>{'<'}</button>
        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, fontWeight: 600, fontFamily: "'Montserrat', sans-serif", minWidth: 60, textAlign: 'center' }}>{slideIndex + 1} / {total}</span>
        <button onClick={() => setSlideIndex(clamp(slideIndex + 1))} disabled={slideIndex >= total - 1} style={navBtnStyle(slideIndex >= total - 1)}>{'>'}</button>
      </div>

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

function exportBtnStyle(disabled) {
  return {
    padding: '12px 18px',
    borderRadius: 18,
    border: '1px solid rgba(255,255,255,0.7)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: 'rgba(255,255,255,0.86)',
    color: '#111111',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 700,
    fontSize: 13,
    backdropFilter: 'blur(12px) saturate(140%)',
    boxShadow: '0 10px 34px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.8)',
    opacity: disabled ? 0.55 : 1,
    transition: 'all 0.16s ease',
  }
}

export default function App() {
  const [activeMode, setActiveMode] = useState(Object.keys(MODES)[0])
  const [slideIndex, setSlideIndex] = useState(0)
  const [exportNotice, setExportNotice] = useState('')
  const [isExporting, setIsExporting] = useState(false)

  const slideViewportRef = useRef(null)

  const entry = MODES[activeMode]
  const isSlides = entry?.type === 'slides'
  const ActiveDesign = entry?.component

  function switchMode(key) {
    setActiveMode(key)
    setSlideIndex(0)
    setExportNotice('')
  }

  function showNotice(text) {
    setExportNotice(text)
    window.setTimeout(() => setExportNotice(''), 3200)
  }

  function exportLabel() {
    if (entry?.type === 'infographic') return 'Download PNG'
    if (entry?.type === 'carousel') return 'Download PDF'
    if (entry?.type === 'slides') return 'Download PPTX'
    return 'Download'
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const mode = params.get('mode')
    if (mode && MODES[mode]) {
      setActiveMode(mode)
      setSlideIndex(0)
    }
  }, [])

  async function exportFromServer(format) {
    const mode = encodeURIComponent(activeMode)
    const res = await fetch(`/api/export/${format}?mode=${mode}`)
    if (!res.ok) throw new Error(await res.text())
    const blob = await res.blob()
    const extension = format === 'png' ? 'png' : 'pdf'
    downloadBlob(blob, `${sanitizeFileName(entry.exportName)}.${extension}`)
  }

  async function exportSlidesPptx() {
    const total = entry.slideCount || 1
    const current = slideIndex
    const pptx = new pptxgen()
    pptx.layout = 'LAYOUT_16x9'

    for (let i = 0; i < total; i += 1) {
      setSlideIndex(i)
      await waitFrame()
      await waitFrame()
      await waitMs(50)

      const res = await fetch(`/api/export/png?mode=${encodeURIComponent(activeMode)}&slide=${i}&scale=2`)
      if (!res.ok) throw new Error(await res.text())
      const pngBlob = await res.blob()
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(pngBlob)
      })

      const slide = pptx.addSlide()
      slide.addImage({ data: dataUrl, x: 0, y: 0, w: 13.333, h: 7.5 })
    }

    setSlideIndex(current)
    await pptx.writeFile({ fileName: `${sanitizeFileName(entry.exportName)}.pptx` })
  }

  async function handleExport() {
    if (!entry || isExporting) return
    setIsExporting(true)
    setExportNotice('Preparing download...')

    try {
      if (entry.type === 'infographic') await exportFromServer('png')
      else if (entry.type === 'carousel') await exportFromServer('pdf')
      else if (entry.type === 'slides') await exportSlidesPptx()
      showNotice('Download started.')
    } catch (error) {
      showNotice(`Export failed: ${error?.message || 'Unknown error'}`)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div style={{ background: '#13131f', minHeight: '100vh', fontFamily: "'Montserrat', sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#0c0c18', borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'sticky', top: 0, zIndex: 100, overflowX: 'auto' }}>
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

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 12,
          padding: '12px 28px',
          background: '#10101b',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'sticky',
          top: 58,
          zIndex: 90,
        }}
      >
        <button onClick={handleExport} disabled={isExporting} style={exportBtnStyle(isExporting)}>
          {isExporting ? 'Preparing...' : exportLabel()}
        </button>
        {exportNotice ? (
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, lineHeight: 1.3 }}>{exportNotice}</div>
        ) : null}
      </div>

      {isSlides ? (
        <SlideViewerWrapper
          Component={entry.component}
          slideCount={entry.slideCount ?? 1}
          slideIndex={slideIndex}
          setSlideIndex={setSlideIndex}
          viewportRef={slideViewportRef}
        />
      ) : ActiveDesign ? (
        <div style={{ padding: '40px', overflowX: 'auto' }}>
          <ActiveDesign />
        </div>
      ) : null}
    </div>
  )
}
