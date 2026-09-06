import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import McKinseyCarousel from '../design/carousels/McKinseyCarousel.jsx'
import ScheduleTasksCarousel from '../design/carousels/ScheduleTasksCarousel.jsx'
import OpenClawCarousel from '../design/carousels/OpenClawCarousel.jsx'
import AIOperatingSystemCarousel from '../design/carousels/AIOperatingSystemCarousel.jsx'
import GtmSystemCarousel from '../design/carousels/GtmSystemCarousel.jsx'
import ClaudeDesignWinsInfographic from '../design/infographics/ClaudeDesignWinsInfographic.jsx'
import AiOsInfographic from '../design/infographics/AiOsInfographic.jsx'
import BulletProofAISystemInfographic from '../design/infographics/BulletProofAISystemInfographic.jsx'
import BulletProofAISystemInfographicV2 from '../design/infographics/BulletProofAISystemInfographicV2.jsx'
import AiOperatingSystemInfographic from '../design/infographics/AiOperatingSystemInfographic.jsx'
import GtmSystemInfographic from '../design/infographics/GtmSystemInfographic.jsx'
import SocialListeningInfographic from '../design/infographics/SocialListeningInfographic.jsx'
import SocialListeningThumbnail from '../design/newsletter-thumbnails/SocialListeningThumbnail.jsx'
import PptxSlideViewer from '../components/PptxSlideViewer.jsx'
import { renderDeckToSlides } from '../design/pptx-slides/slide-preview.jsx'
import ytAiDesignSystemDeck from '../design/pptx-slides/decks/yt-ai-design-system/deck.mjs'
import claudeCodeBusinessDeck from '../design/pptx-slides/decks/claude-code-business/deck.mjs'
import { MODES as MODE_REGISTRY } from './modes.js'
import appLogo from '../assets/logos/app/thesmartcreator_logo.png'

function YtAiDesignSystemDeck() {
  return (
    <PptxSlideViewer
      modeKey="yt-ai-design-system"
      label="YT: AI Design System"
      slides={renderDeckToSlides(ytAiDesignSystemDeck)}
    />
  )
}

function ClaudeCodeBusinessDeck() {
  return (
    <PptxSlideViewer
      modeKey="claude-code-business"
      label="Claude Code Business"
      slides={renderDeckToSlides(claudeCodeBusinessDeck)}
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
  'gtm-system-carousel': GtmSystemCarousel,
  'ai-os-infographic':   AiOperatingSystemInfographic,
  'gtm-system':          GtmSystemInfographic,
  'social-listening':    SocialListeningInfographic,
  'social-listening-thumbnail': SocialListeningThumbnail,
  'yt-ai-design-system':    YtAiDesignSystemDeck,
  'claude-code-business': ClaudeCodeBusinessDeck,
}

const MODES = Object.fromEntries(
  Object.entries(MODE_REGISTRY).map(([key, meta]) => [
    key,
    { ...meta, component: COMPONENTS[key] ?? null },
  ])
)

/** Human labels for the optgroup headings in the design picker. */
const TYPE_LABELS = {
  infographic: 'Infographics',
  carousel:    'Carousels',
  thumbnail:   'Newsletter thumbnails',
  pptx:        'Slide decks',
}

const THEME_KEY = 'scds:theme'
const ZOOM_STEPS = [0.25, 0.35, 0.5, 0.65, 0.75, 0.9, 1, 1.25, 1.5, 2]
const MIN_ZOOM = ZOOM_STEPS[0]
const MAX_ZOOM = ZOOM_STEPS[ZOOM_STEPS.length - 1]
/**
 * Upper bound for auto-fit. Large designs are still scaled down to fit; small
 * ones (the 420×300 thumbnail) are scaled up to this before they stop growing,
 * which keeps them legible without going soft.
 */
const MAX_AUTOFIT_ZOOM = 2

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

function clampZoom(value) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value))
}

function readStoredTheme() {
  if (typeof window === 'undefined') return 'light'
  try {
    const stored = window.localStorage.getItem(THEME_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* storage unavailable — fall through to system preference */
  }
  try {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  } catch {
    /* no matchMedia — default light */
  }
  return 'light'
}

export default function App() {
  const [activeMode, setActiveMode] = useState('bulletproof-ai')
  const [exportNotice, setExportNotice] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const [theme, setTheme] = useState(readStoredTheme)
  const [zoom, setZoom] = useState(1)
  const [autoFit, setAutoFit] = useState(true)

  const stageRef = useRef(null)
  const designRef = useRef(null)
  const noticeTimer = useRef(null)

  const entry = MODES[activeMode]
  const ActiveDesign = entry?.component
  const isDark = theme === 'dark'

  const groupedModes = useMemo(() => {
    const groups = new Map()
    for (const [key, m] of Object.entries(MODES)) {
      const type = m.type || 'other'
      if (!groups.has(type)) groups.set(type, [])
      groups.get(type).push([key, m])
    }
    return [...groups.entries()]
  }, [])

  function switchMode(key) {
    setActiveMode(key)
    setExportNotice('')
    setAutoFit(true)
  }

  const showNotice = useCallback((text) => {
    setExportNotice(text)
    window.clearTimeout(noticeTimer.current)
    noticeTimer.current = window.setTimeout(() => setExportNotice(''), 3200)
  }, [])

  useEffect(() => () => window.clearTimeout(noticeTimer.current), [])

  function exportLabel() {
    if (entry?.type === 'infographic') return 'Download PNG'
    if (entry?.type === 'thumbnail') return 'Download PNG'
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

  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* storage unavailable — theme simply won't persist */
    }
    document.documentElement.setAttribute('data-shell-theme', theme)
    document.documentElement.style.colorScheme = theme
  }, [theme])

  /**
   * Auto-fit: scale the design so its natural size fills the available stage.
   * Measured from the design's own bounding box, so it works for 1080×1350
   * infographics, carousels and 1280×720 decks alike.
   *
   * Designs smaller than the stage are scaled UP (to MAX_AUTOFIT_ZOOM) so a
   * 420×300 newsletter thumbnail is actually readable instead of sitting as a
   * postage stamp in the middle of a large viewport.
   */
  const fitToStage = useCallback(() => {
    const stage = stageRef.current
    const design = designRef.current
    if (!stage || !design) return
    const naturalW = design.scrollWidth
    const naturalH = design.scrollHeight
    if (!naturalW || !naturalH) return
    // Stage padding is fluid (clamp), so measure it instead of assuming.
    const cs = window.getComputedStyle(stage)
    const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)
    const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom)
    const availableW = stage.clientWidth - padX
    const availableH = stage.clientHeight - padY
    if (availableW <= 0 || availableH <= 0) return
    const next = Math.min(availableW / naturalW, availableH / naturalH, MAX_AUTOFIT_ZOOM)
    setZoom(clampZoom(Number(next.toFixed(3))))
  }, [])

  useLayoutEffect(() => {
    if (!autoFit) return
    fitToStage()
  }, [autoFit, activeMode, fitToStage])

  useEffect(() => {
    if (!autoFit) return undefined
    const onResize = () => fitToStage()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [autoFit, fitToStage])

  function stepZoom(direction) {
    setAutoFit(false)
    setZoom((current) => {
      if (direction > 0) {
        const next = ZOOM_STEPS.find((s) => s > current + 0.001)
        return next ?? MAX_ZOOM
      }
      const prev = [...ZOOM_STEPS].reverse().find((s) => s < current - 0.001)
      return prev ?? MIN_ZOOM
    })
  }

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
      else if (entry.type === 'thumbnail') await exportFromServer('png')
      else if (entry.type === 'carousel') await exportFromServer('pdf')
      else if (entry.type === 'pptx') await exportFromServer('pptx')
      showNotice('Download started.')
    } catch (error) {
      showNotice(`Export failed: ${error?.message || 'Unknown error'}`)
    } finally {
      setIsExporting(false)
    }
  }

  const t = isDark ? DARK : LIGHT

  return (
    <div style={{ ...shellStyle(t), ...cssVars(t) }}>
      <style>{GLOBAL_CSS}</style>

      <header style={topBarStyle(t)}>
        <div style={brandStyle(t)}>
          <img src={appLogo} alt="The Smart Creator" style={brandMarkStyle(t)} />
        </div>

        <div style={dividerStyle(t)} aria-hidden="true" />

        <div style={pickerWrapStyle}>
          <span id="design-picker-label" style={pickerLabelStyle(t)}>
            Design
          </span>
          <DesignPicker
            t={t}
            groups={groupedModes}
            value={activeMode}
            currentLabel={entry?.label || 'Select a design'}
            onChange={switchMode}
          />
        </div>

        <div style={topBarActionsStyle}>
          <span style={typeBadgeStyle(t)}>{TYPE_LABELS[entry?.type] || 'Design'}</span>

          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="scds-btn"
            style={iconBtnStyle(t)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting}
            className="scds-btn"
            style={primaryBtnStyle(t, isExporting)}
          >
            {isExporting ? 'Preparing...' : exportLabel()}
          </button>
        </div>
      </header>

      <div style={subBarStyle(t)}>
        <div style={zoomGroupStyle(t)}>
          <button
            type="button"
            onClick={() => stepZoom(-1)}
            disabled={zoom <= MIN_ZOOM + 0.001}
            className="scds-btn"
            style={zoomBtnStyle(t, zoom <= MIN_ZOOM + 0.001)}
            aria-label="Zoom out"
          >
            <MinusIcon />
          </button>
          <span style={zoomReadoutStyle(t)}>{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            onClick={() => stepZoom(1)}
            disabled={zoom >= MAX_ZOOM - 0.001}
            className="scds-btn"
            style={zoomBtnStyle(t, zoom >= MAX_ZOOM - 0.001)}
            aria-label="Zoom in"
          >
            <PlusIcon />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setAutoFit(true)}
          className="scds-btn"
          style={ghostBtnStyle(t, autoFit)}
          aria-pressed={autoFit}
        >
          Fit to screen
        </button>

        <button
          type="button"
          onClick={() => {
            setAutoFit(false)
            setZoom(1)
          }}
          className="scds-btn"
          style={ghostBtnStyle(t, false)}
        >
          Actual size
        </button>

        {exportNotice && <div style={noticeStyle(t)}>{exportNotice}</div>}
      </div>

      <main ref={stageRef} style={stageStyle(t)}>
        {ActiveDesign ? (
          <div style={zoomLayerStyle(zoom)}>
            <div ref={designRef} style={{ display: 'inline-block' }}>
              <ActiveDesign />
            </div>
          </div>
        ) : (
          <div style={emptyStateStyle(t)}>No preview component registered for this design.</div>
        )}
      </main>
    </div>
  )
}

/**
 * DesignPicker — a custom listbox replacing the native <select>.
 *
 * The native control renders its popup with the OS accent colour (blue on
 * Windows), which cannot be restyled from CSS. This renders the menu itself so
 * selection and hover use only the shell's cream/dark palette.
 */
function DesignPicker({ t, groups, value, currentLabel, onChange }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  const flatKeys = useMemo(
    () => groups.flatMap(([, items]) => items.map(([key]) => key)),
    [groups]
  )

  useEffect(() => {
    if (!open) return undefined
    function onPointerDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open])

  function move(delta) {
    const i = flatKeys.indexOf(value)
    const next = flatKeys[Math.min(flatKeys.length - 1, Math.max(0, i + delta))]
    if (next && next !== value) onChange(next)
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      setOpen(false)
      return
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) {
        setOpen(true)
        return
      }
      move(e.key === 'ArrowDown' ? 1 : -1)
      return
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen((o) => !o)
    }
  }

  return (
    <div ref={rootRef} style={{ position: 'relative', flex: 1, minWidth: 0 }}>
      <button
        type="button"
        className="scds-select"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby="design-picker-label"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        style={selectStyle(t)}
      >
        <span style={selectValueStyle}>{currentLabel}</span>
        <span style={chevronStyle(t, open)} aria-hidden="true">
          <ChevronIcon />
        </span>
      </button>

      {open && (
        <div role="listbox" aria-labelledby="design-picker-label" style={menuStyle(t)}>
          {groups.map(([type, items]) => (
            <div key={type} role="group" aria-label={TYPE_LABELS[type] || type}>
              <div style={menuGroupLabelStyle(t)}>{TYPE_LABELS[type] || type}</div>
              {items.map(([key, m]) => {
                const selected = key === value
                return (
                  <button
                    key={key}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className="scds-option"
                    onClick={() => {
                      onChange(key)
                      setOpen(false)
                    }}
                    style={menuOptionStyle(t, selected)}
                  >
                    <span style={menuOptionTextStyle}>{m.label}</span>
                    {selected && <CheckIcon />}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Theme palettes — shell chrome only. Designs keep their own tokens.  */
/* ------------------------------------------------------------------ */

const LIGHT = {
  canvas:       '#fffceb',
  stage:        '#f6f2e2',
  surface:      '#ffffff',
  surfaceMuted: '#f3efdf',
  border:       'rgba(20,20,26,0.10)',
  borderStrong: 'rgba(20,20,26,0.18)',
  text:         '#14141a',
  textMuted:    'rgba(20,20,26,0.58)',
  btnBg:        '#14141a',
  btnText:      '#fffceb',
  shadow:       '0 1px 2px rgba(20,20,26,0.06)',
  menuShadow:   '0 24px 60px -12px rgba(20,20,26,0.28)',
  optionHover:  'rgba(20,20,26,0.06)',
  logoBorder:   '1px solid rgba(20,20,26,0.08)',
}

const DARK = {
  canvas:       '#0e0e12',
  stage:        '#141419',
  surface:      '#1a1a21',
  surfaceMuted: '#22222a',
  border:       'rgba(255,255,255,0.10)',
  borderStrong: 'rgba(255,255,255,0.20)',
  text:         '#f4f2e9',
  textMuted:    'rgba(244,242,233,0.58)',
  btnBg:        '#fffceb',
  btnText:      '#14141a',
  shadow:       '0 1px 2px rgba(0,0,0,0.4)',
  menuShadow:   '0 24px 60px -12px rgba(0,0,0,0.6)',
  optionHover:  'rgba(255,255,255,0.07)',
  logoBorder:   '1px solid rgba(255,255,255,0.12)',
}

/**
 * Expose the shell palette as CSS variables so nested chrome (e.g.
 * PptxSlideViewer controls) can theme itself without prop drilling.
 */
function cssVars(t) {
  return {
    '--shell-surface': t.surface,
    '--shell-surface-muted': t.surfaceMuted,
    '--shell-border': t.border,
    '--shell-border-strong': t.borderStrong,
    '--shell-text': t.text,
    '--shell-text-muted': t.textMuted,
    '--shell-btn-bg': t.btnBg,
    '--shell-btn-text': t.btnText,
    '--shell-option-hover': t.optionHover,
  }
}

const GLOBAL_CSS = `
  .scds-btn { transition: background 0.15s ease, border-color 0.15s ease, opacity 0.15s ease, transform 0.12s ease; }
  .scds-btn:not(:disabled):hover { filter: brightness(1.08); }
  .scds-btn:not(:disabled):active { transform: translateY(1px); }
  .scds-btn:focus-visible, .scds-select:focus-visible {
    outline: 2px solid var(--shell-text);
    outline-offset: 2px;
  }
  .scds-select { transition: border-color 0.15s ease; }
  .scds-select:hover { border-color: var(--shell-border-strong); }
  .scds-option { transition: background 0.12s ease; }
  .scds-option[aria-selected="false"]:hover { background: var(--shell-option-hover); }
  .scds-option:focus-visible { outline: 2px solid var(--shell-text); outline-offset: -2px; }
`

/* ------------------------------------------------------------------ */
/* Style builders                                                      */
/* ------------------------------------------------------------------ */

const FONT = 'var(--font\\/family\\/title)'

function shellStyle(t) {
  return {
    background: t.canvas,
    color: t.text,
    minHeight: '100vh',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: FONT,
    letterSpacing: '-0.01em',
  }
}

function topBarStyle(t) {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 32,
    padding: '0 clamp(24px, 3.5vw, 56px)',
    /* Large by default, but gives space back to the stage on short screens. */
    minHeight: 'clamp(104px, 13vh, 132px)',
    background: t.canvas,
    borderBottom: `1px solid ${t.border}`,
    flex: 'none',
    zIndex: 100,
    flexWrap: 'wrap',
  }
}

function brandStyle(t) {
  return {
    display: 'flex',
    alignItems: 'center',
    color: t.text,
    flexShrink: 0,
  }
}

function brandMarkStyle(t) {
  return {
    height: 'clamp(56px, 8vh, 76px)',
    width: 'auto',
    borderRadius: 16,
    display: 'block',
    objectFit: 'contain',
    flexShrink: 0,
    // Keeps the cream-ground logo from floating on the dark canvas.
    border: t.logoBorder,
  }
}

function dividerStyle(t) {
  return {
    width: 1,
    height: 68,
    background: t.border,
    flexShrink: 0,
  }
}

const pickerWrapStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  flex: '1 1 420px',
  minWidth: 0,
  maxWidth: 680,
}

function pickerLabelStyle(t) {
  return {
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: t.textMuted,
    whiteSpace: 'nowrap',
  }
}

function selectStyle(t) {
  return {
    width: '100%',
    appearance: 'none',
    WebkitAppearance: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    height: 72,
    padding: '0 26px',
    borderRadius: 18,
    border: `1.5px solid ${t.border}`,
    background: t.surface,
    color: t.text,
    fontFamily: FONT,
    fontWeight: 600,
    fontSize: 21,
    textAlign: 'left',
    cursor: 'pointer',
    boxShadow: t.shadow,
  }
}

const selectValueStyle = {
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

function chevronStyle(t, open) {
  return {
    flexShrink: 0,
    pointerEvents: 'none',
    color: t.textMuted,
    display: 'flex',
    transform: open ? 'rotate(180deg)' : 'none',
    transition: 'transform 0.15s ease',
  }
}

/* -- Dropdown menu -- */

function menuStyle(t) {
  return {
    position: 'absolute',
    top: 'calc(100% + 10px)',
    left: 0,
    right: 0,
    zIndex: 200,
    maxHeight: 'min(460px, 60vh)',
    overflowY: 'auto',
    padding: 8,
    borderRadius: 18,
    border: `1.5px solid ${t.border}`,
    background: t.surface,
    boxShadow: t.menuShadow,
  }
}

function menuGroupLabelStyle(t) {
  return {
    padding: '12px 14px 6px',
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: t.textMuted,
  }
}

function menuOptionStyle(t, selected) {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    padding: '14px 14px',
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: FONT,
    fontSize: 18,
    fontWeight: selected ? 700 : 500,
    // Selection uses the ink/cream pair — never a system accent colour.
    background: selected ? t.btnBg : 'transparent',
    color: selected ? t.btnText : t.text,
  }
}

const menuOptionTextStyle = {
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

const topBarActionsStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  marginLeft: 'auto',
}

function typeBadgeStyle(t) {
  return {
    padding: '13px 24px',
    borderRadius: 999,
    border: `1px solid ${t.border}`,
    background: t.surfaceMuted,
    color: t.textMuted,
    fontSize: 16,
    fontWeight: 600,
    whiteSpace: 'nowrap',
  }
}

function primaryBtnStyle(t, disabled) {
  return {
    height: 72,
    padding: '0 38px',
    borderRadius: 18,
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: t.btnBg,
    color: t.btnText,
    fontFamily: FONT,
    fontWeight: 700,
    fontSize: 20,
    opacity: disabled ? 0.55 : 1,
    whiteSpace: 'nowrap',
  }
}

function iconBtnStyle(t) {
  return {
    width: 72,
    height: 72,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    border: `1.5px solid ${t.border}`,
    background: t.surface,
    color: t.text,
    cursor: 'pointer',
    padding: 0,
  }
}

function subBarStyle(t) {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '0 clamp(24px, 3.5vw, 56px)',
    minHeight: 'clamp(76px, 9vh, 92px)',
    background: t.stage,
    borderBottom: `1px solid ${t.border}`,
    flex: 'none',
    zIndex: 90,
    flexWrap: 'wrap',
  }
}

function zoomGroupStyle(t) {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: 7,
    borderRadius: 18,
    border: `1px solid ${t.border}`,
    background: t.surface,
  }
}

function zoomBtnStyle(t, disabled) {
  return {
    width: 52,
    height: 52,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    border: 'none',
    background: 'transparent',
    color: disabled ? t.textMuted : t.text,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    padding: 0,
  }
}

function zoomReadoutStyle(t) {
  return {
    minWidth: 86,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 700,
    color: t.text,
    fontVariantNumeric: 'tabular-nums',
  }
}

function ghostBtnStyle(t, active) {
  return {
    height: 62,
    padding: '0 28px',
    borderRadius: 16,
    border: `1px solid ${active ? t.borderStrong : t.border}`,
    background: active ? t.surfaceMuted : t.surface,
    color: active ? t.text : t.textMuted,
    fontFamily: FONT,
    fontWeight: 600,
    fontSize: 17,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  }
}

function noticeStyle(t) {
  return {
    marginLeft: 'auto',
    color: t.textMuted,
    fontSize: 16,
    lineHeight: 1.3,
  }
}

function stageStyle(t) {
  return {
    flex: 1,
    minHeight: 0,
    background: t.stage,
    overflow: 'auto',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 'clamp(16px, 2.5vh, 32px)',
  }
}

function zoomLayerStyle(zoom) {
  return {
    transform: `scale(${zoom})`,
    transformOrigin: 'top center',
    transition: 'transform 0.12s ease-out',
    flexShrink: 0,
  }
}

function emptyStateStyle(t) {
  return {
    margin: 'auto',
    color: t.textMuted,
    fontSize: 14,
  }
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M5 12h14" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}
