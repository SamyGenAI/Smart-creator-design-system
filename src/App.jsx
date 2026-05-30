import { useEffect, useState } from 'react'
import McKinseyCarousel from '../design/carousels/McKinseyCarousel.jsx'
import ScheduleTasksCarousel from '../design/carousels/ScheduleTasksCarousel.jsx'
import OpenClawCarousel from '../design/carousels/OpenClawCarousel.jsx'
import AIOperatingSystemCarousel from '../design/carousels/AIOperatingSystemCarousel.jsx'
import ClaudeDesignWinsInfographic from '../design/infographics/ClaudeDesignWinsInfographic.jsx'
import AiOsInfographic from '../design/infographics/AiOsInfographic.jsx'
import BulletProofAISystemInfographic from '../design/infographics/BulletProofAISystemInfographic.jsx'
import BulletProofAISystemInfographicV2 from '../design/infographics/BulletProofAISystemInfographicV2.jsx'
import AiOperatingSystemInfographic from '../design/infographics/AiOperatingSystemInfographic.jsx'
import PptxSlideViewer from '../components/PptxSlideViewer.jsx'
import { renderDeckToSlides } from '../design/pptx-slides/slide-preview.jsx'
import ytAiDesignSystemDeck from '../design/pptx-slides/YtAiDesignSystemSlides.mjs'
import { MODES as MODE_REGISTRY } from './modes.js'

function YtAiDesignSystemDeck() {
  return (
    <PptxSlideViewer
      modeKey="yt-ai-design-system"
      label="YT: AI Design System"
      slides={renderDeckToSlides(ytAiDesignSystemDeck)}
    />
  )
}

const COMPONENTS = {
  'bulletproof-ai':      BulletProofAISystemInfographic,
  'bulletproof-ai-v2':   BulletProofAISystemInfographicV2,
  'ai-os':               AiOsInfographic,
  'claude-design-wins':  ClaudeDesignWinsInfographic,
  mckinsey:              McKinseyCarousel,
  scheduleTasks:         ScheduleTasksCarousel,
  openclaw:              OpenClawCarousel,
  'ai-operating-system': AIOperatingSystemCarousel,
  'ai-os-infographic':   AiOperatingSystemInfographic,
  'yt-ai-design-system':    YtAiDesignSystemDeck,
}

const MODES = Object.fromEntries(
  Object.entries(MODE_REGISTRY).map(([key, meta]) => [
    key,
    { ...meta, component: COMPONENTS[key] ?? null },
  ])
)

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

function exportBtnStyle(disabled) {
  return {
    padding: '12px 18px',
    borderRadius: 18,
    border: '1px solid rgba(255,255,255,0.7)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: 'rgba(255,255,255,0.86)',
    color: '#111111',
    fontFamily: 'var(--font\\/family\\/title)',
    fontWeight: 700,
    fontSize: 13,
    backdropFilter: 'blur(12px) saturate(140%)',
    boxShadow: '0 10px 34px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.8)',
    opacity: disabled ? 0.55 : 1,
    transition: 'all 0.16s ease',
  }
}

export default function App() {
  const [activeMode, setActiveMode] = useState('bulletproof-ai')
  const [exportNotice, setExportNotice] = useState('')
  const [isExporting, setIsExporting] = useState(false)

  const entry = MODES[activeMode]
  const ActiveDesign = entry?.component

  function switchMode(key) {
    setActiveMode(key)
    setExportNotice('')
  }

  function showNotice(text) {
    setExportNotice(text)
    window.setTimeout(() => setExportNotice(''), 3200)
  }

  function exportLabel() {
    if (entry?.type === 'infographic') return 'Download PNG'
    if (entry?.type === 'carousel') return 'Download PDF'
    if (entry?.type === 'pptx') return 'Download PPTX'
    return 'Download'
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const mode = params.get('mode')
    if (mode && MODES[mode]) {
      setActiveMode(mode)
    }
  }, [])

  async function exportFromServer(format) {
    const res = await fetch(`/api/export/${format}?mode=${encodeURIComponent(activeMode)}`)
    if (!res.ok) throw new Error(await res.text())
    const blob = await res.blob()
    const ext = format === 'png' ? 'png' : format === 'pptx' ? 'pptx' : 'pdf'
    downloadBlob(blob, `${sanitizeFileName(entry.exportName)}.${ext}`)
  }

  async function handleExport() {
    if (!entry || isExporting) return
    setIsExporting(true)
    setExportNotice('Preparing download...')
    try {
      if (entry.type === 'infographic') await exportFromServer('png')
      else if (entry.type === 'carousel') await exportFromServer('pdf')
      else if (entry.type === 'pptx') await exportFromServer('pptx')
      showNotice('Download started.')
    } catch (error) {
      showNotice(`Export failed: ${error?.message || 'Unknown error'}`)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div style={{ background: '#13131f', minHeight: '100vh', fontFamily: 'var(--font\\/family\\/title)' }}>
      {/* Mode tabs */}
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
              background: activeMode === key ? 'var(--theme-accent-1)' : 'rgba(255,255,255,0.1)',
              color: activeMode === key ? 'var(--theme-color-primary)' : 'rgba(255,255,255,0.8)',
              fontFamily: 'var(--font\\/family\\/title)',
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

      {/* Export toolbar */}
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
        {exportNotice && (
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, lineHeight: 1.3 }}>{exportNotice}</div>
        )}
      </div>

      {/* Content area */}
      {ActiveDesign ? (
        <div style={{ padding: '40px', overflowX: 'auto' }}>
          <ActiveDesign />
        </div>
      ) : null}
    </div>
  )
}
