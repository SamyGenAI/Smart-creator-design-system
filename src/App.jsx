import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import McKinseyCarousel from '../design/carousels/McKinseyCarousel.jsx'
import GtmSystemInfographic from '../design/infographics/GtmSystemInfographic.jsx'
import SocialListeningInfographic from '../design/infographics/SocialListeningInfographic.jsx'
import SocialListeningThumbnail from '../design/newsletter-thumbnails/SocialListeningThumbnail.jsx'
import PptxSlideViewer from '../components/pptx/PptxSlideViewer.jsx'
import { renderDeckToSlides } from '../design/pptx-slides/slide-preview.jsx'
import ytAiDesignSystemDeck from '../design/pptx-slides/decks/yt-ai-design-system/deck.mjs'
import { MODES as MODE_REGISTRY } from './modes.js'
import appLogo from '../assets/logos/app/thesmartcreator_logo.png'
import {
  TextureProvider,
  TEXTURE_STORAGE_KEY,
  TEXTURE_OPACITY_STORAGE_KEY,
  readInitialTextureId,
  readInitialTextureOpacity,
} from '../components/shared/textures/TextureContext.jsx'
import {
  TEXTURES,
  getTexture,
} from '../components/shared/textures/textureRegistry.js'
import TextureSwatch from '../components/shared/textures/TextureSwatch.jsx'
import {
  MotionProvider,
  useMotionTransport,
  DEFAULT_FPS,
  DEFAULT_DURATION_IN_FRAMES,
} from '../components/shared/motion/index.js'

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
  'gtm-system':          GtmSystemInfographic,
  'social-listening':    SocialListeningInfographic,
  mckinsey:              McKinseyCarousel,
  'social-listening-thumbnail': SocialListeningThumbnail,
  'yt-ai-design-system': YtAiDesignSystemDeck,
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

/**
 * GIF render scale — 1, i.e. the full 1080×1350 canvas.
 *
 * Not a user choice. This is Chromium's deviceScaleFactor for the capture; the
 * server pins the OUTPUT to the design's own 1080×1350 either way, so every
 * export leaves at the canvas size.
 */
const GIF_SCALE = 1

const EXPORT_EXTENSIONS = { png: 'png', gif: 'gif', pptx: 'pptx', pdf: 'pdf' }

/**
 * Decode the base64 GIF carried by the stream's final event. Done in 8KB
 * chunks: String.fromCharCode.apply on a multi-MB array blows the argument
 * limit and throws.
 */
function base64ToBlob(base64, type) {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
  return new Blob([bytes], { type })
}

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
  const [activeMode, setActiveMode] = useState('gtm-system')
  const [exportNotice, setExportNotice] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const [theme, setTheme] = useState(readStoredTheme)
  const [zoom, setZoom] = useState(1)
  const [autoFit, setAutoFit] = useState(true)
  const [textureId, setTextureId] = useState(readInitialTextureId)
  const [textureOpacity, setTextureOpacity] = useState(readInitialTextureOpacity)
  const [texturePanelOpen, setTexturePanelOpen] = useState(false)
  const [exportMenuOpen, setExportMenuOpen] = useState(false)
  /**
   * GIF export progress, or null when no render is running.
   * { phase: 'launching'|'rendering'|'encoding', frame, total }
   * Fed by real per-frame events from the server — never a timed fake.
   */
  const [exportProgress, setExportProgress] = useState(null)

  const stageRef = useRef(null)
  const designRef = useRef(null)
  const noticeTimer = useRef(null)

  const entry = MODES[activeMode]
  const ActiveDesign = entry?.component
  const isDark = theme === 'dark'

  // Motion is infographic-only. Non-animated modes still mount inside the
  // provider — they just sit on the settled final frame, which is simpler than
  // mounting the provider conditionally.
  const isAnimated = entry?.type === 'infographic' && entry?.animated === true
  const motionFps = entry?.motion?.fps ?? DEFAULT_FPS
  const motionDuration = entry?.motion?.durationInFrames ?? DEFAULT_DURATION_IN_FRAMES

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
    setExportProgress(null)
    setAutoFit(true)
  }

  const showNotice = useCallback((text) => {
    setExportNotice(text)
    window.clearTimeout(noticeTimer.current)
    noticeTimer.current = window.setTimeout(() => setExportNotice(''), 3200)
  }, [])

  useEffect(() => () => window.clearTimeout(noticeTimer.current), [])

  /**
   * What the Export menu offers for the active design.
   *
   * Formats that do not apply are listed but disabled rather than hidden, so
   * the menu reads the same everywhere and says *why* something is unavailable.
   * GIF is the one that varies: infographic-only, and only when the design
   * registers `animated: true`.
   */
  const exportFormats = useMemo(() => {
    const type = entry?.type
    const isInfographic = type === 'infographic'
    return [
      {
        format: 'png',
        label: 'Download PNG',
        disabled: !(isInfographic || type === 'thumbnail'),
      },
      {
        format: 'gif',
        label: 'Download GIF',
        disabled: !isAnimated,
        hint: isAnimated
          ? null
          : isInfographic
            ? 'This design is not animated'
            : 'Animation is infographic-only',
      },
      { format: 'pdf', label: 'Download PDF', disabled: type !== 'carousel' },
      { format: 'pptx', label: 'Download PPTX', disabled: type !== 'pptx' },
    ].filter((f) => !f.disabled || f.format === 'gif' || f.format === 'png')
  }, [entry?.type, isAnimated])

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

  useEffect(() => {
    try {
      window.localStorage.setItem(TEXTURE_STORAGE_KEY, textureId)
      window.localStorage.setItem(TEXTURE_OPACITY_STORAGE_KEY, JSON.stringify(textureOpacity))
    } catch {
      /* storage unavailable — the texture simply won't persist */
    }
  }, [textureId, textureOpacity])

  const activeTexture = getTexture(textureId)
  const activeTextureOpacity = textureOpacity[textureId] ?? activeTexture.defaultOpacity

  /** Reset one texture back to the strength the registry ships. */
  const resetTextureOpacity = useCallback((id) => {
    setTextureOpacity((current) => {
      if (!(id in current)) return current
      const next = { ...current }
      delete next[id]
      return next
    })
  }, [])

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
    // The texture rides along so the headless render matches the preview.
    const params = new URLSearchParams({
      mode: activeMode,
      texture: textureId,
      textureOpacity: String(activeTextureOpacity),
    })
    // GIF sweeps the timeline, so the endpoint needs the design's fps/duration
    // and the render scale chosen in the toolbar.
    if (format === 'gif') {
      params.set('fps', String(motionFps))
      params.set('durationInFrames', String(motionDuration))
      params.set('scale', String(GIF_SCALE))
      // Ask for the progress stream instead of the plain binary: a binary
      // response gives no way to know which frame the server is on.
      params.set('stream', '1')
      await exportGifStreaming(params)
      return
    }
    const res = await fetch(`/api/export/${format}?${params}`)
    if (!res.ok) throw new Error(await res.text())
    const blob = await res.blob()
    const ext = EXPORT_EXTENSIONS[format] || 'png'
    downloadBlob(blob, `${sanitizeFileName(entry.exportName)}.${ext}`)
  }

  /**
   * GIF export over Server-Sent Events.
   *
   * Read with fetch + a stream reader rather than EventSource, because
   * EventSource cannot carry the final payload cleanly, reconnects on its own
   * after the server closes, and offers no abort. Events arrive as
   * `event: <name>\ndata: <json>\n\n` blocks; a chunk can split mid-block, so
   * the tail is buffered until the blank-line terminator shows up.
   */
  async function exportGifStreaming(params) {
    const res = await fetch(`/api/export/gif?${params}`)
    if (!res.ok) throw new Error(await res.text())
    if (!res.body) throw new Error('Streaming is not supported by this browser.')

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let finished = null
    let failure = null

    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })

      let split
      while ((split = buffer.indexOf('\n\n')) !== -1) {
        const block = buffer.slice(0, split)
        buffer = buffer.slice(split + 2)

        let name = 'message'
        const dataLines = []
        for (const line of block.split('\n')) {
          if (line.startsWith('event: ')) name = line.slice(7).trim()
          else if (line.startsWith('data: ')) dataLines.push(line.slice(6))
        }
        if (!dataLines.length) continue

        let payload
        try {
          payload = JSON.parse(dataLines.join('\n'))
        } catch {
          continue
        }

        if (name === 'progress') setExportProgress(payload)
        else if (name === 'done') finished = payload
        else if (name === 'error') failure = payload?.message || 'Export failed'
      }
    }

    if (failure) throw new Error(failure)
    if (!finished) throw new Error('Export ended before the GIF was returned.')

    downloadBlob(base64ToBlob(finished.gif, 'image/gif'), finished.fileName)
    return finished
  }

  async function handleExport(format) {
    if (!entry || isExporting) return
    // Disabled rows are inert in the DOM; this is the belt-and-braces guard so
    // a format can never reach the server for a design that cannot produce it.
    if (!exportFormats.some((f) => f.format === format && !f.disabled)) return
    setExportMenuOpen(false)
    setIsExporting(true)
    if (format === 'gif') {
      // Seed the bar at frame 0 so it appears the moment the click lands,
      // rather than when the first server event arrives (Chromium launch alone
      // is a second or two of otherwise unexplained silence).
      setExportProgress({ phase: 'launching', frame: 0, total: motionDuration })
      setExportNotice('')
    } else {
      setExportNotice('Preparing download...')
    }
    try {
      await exportFromServer(format)
      showNotice('Download started.')
    } catch (error) {
      showNotice(`Export failed: ${error?.message || 'Unknown error'}`)
    } finally {
      setIsExporting(false)
      setExportProgress(null)
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

          <ExportMenu
            t={t}
            open={exportMenuOpen}
            onOpenChange={setExportMenuOpen}
            busy={isExporting}
            formats={exportFormats}
            onPick={handleExport}
          />
        </div>
      </header>

      {/* One MotionProvider wraps the transport row AND the stage, so the
          scrubber and the design share a single frame. */}
      <MotionProvider
        animated={isAnimated}
        fps={motionFps}
        durationInFrames={motionDuration}
      >
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

          <div style={subBarDividerStyle(t)} aria-hidden="true" />

          <TexturePicker
            t={t}
            open={texturePanelOpen}
            onOpenChange={setTexturePanelOpen}
            textureId={textureId}
            onSelect={setTextureId}
            opacity={activeTextureOpacity}
            isCustomOpacity={textureId in textureOpacity}
            onOpacityChange={(value) =>
              setTextureOpacity((current) => ({ ...current, [textureId]: value }))
            }
            onOpacityReset={() => resetTextureOpacity(textureId)}
          />

          {isAnimated && (
            <>
              <div style={subBarDividerStyle(t)} aria-hidden="true" />
              <TransportRow t={t} />
            </>
          )}

          {exportProgress ? (
            <ExportProgressBar t={t} progress={exportProgress} />
          ) : (
            exportNotice && <div style={noticeStyle(t)}>{exportNotice}</div>
          )}
        </div>

        <main ref={stageRef} style={stageStyle(t)}>
          {ActiveDesign ? (
            <div style={zoomLayerStyle(zoom)}>
              <div ref={designRef} style={{ display: 'inline-block' }}>
                <TextureProvider textureId={textureId} opacityById={textureOpacity}>
                  <ActiveDesign />
                </TextureProvider>
              </div>
            </div>
          ) : (
            <div style={emptyStateStyle(t)}>No preview component registered for this design.</div>
          )}
        </main>
      </MotionProvider>
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

/**
 * TexturePicker — the background-texture control in the sub-bar.
 *
 * A popover of checkbox tiles, one per registry texture, each with an SVG
 * miniature. Selection is single-choice (a canvas wears one texture), so the
 * boxes behave as radios while keeping the checkbox affordance the brief asked
 * for: ticking a new one unticks the old, and ticking the active one clears it
 * back to Blank — so the control both adds and removes a texture.
 *
 * Under the grid, a strength slider tunes the active texture's opacity. It is
 * stored per texture because a readable Silk Grain and a readable Salon Broad
 * sit at very different values.
 */
/**
 * TransportRow — play/pause, a frame scrubber and a frame readout.
 *
 * Only rendered for animated infographics. It reads and writes the same
 * MotionProvider the design renders under, so scrubbing moves the preview.
 * Scrubbing pauses playback — otherwise the rAF loop would immediately fight
 * the drag.
 */
function TransportRow({ t }) {
  const { frame, setFrame, playing, setPlaying, durationInFrames, fps } = useMotionTransport()
  const last = durationInFrames - 1

  return (
    <div style={transportGroupStyle(t)}>
      <button
        type="button"
        onClick={() => setPlaying(!playing)}
        className="scds-btn"
        style={zoomBtnStyle(t, false)}
        aria-label={playing ? 'Pause animation' : 'Play animation'}
        title={playing ? 'Pause' : 'Play'}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>

      <input
        type="range"
        min={0}
        max={last}
        step={1}
        value={frame}
        onChange={(e) => {
          setPlaying(false)
          setFrame(Number(e.target.value))
        }}
        aria-label="Animation frame"
        style={scrubberStyle(t)}
      />

      <span style={transportReadoutStyle(t)}>
        {frame} / {last}
        <span style={transportFpsStyle}>{fps}fps</span>
      </span>
    </div>
  )
}

/**
 * ExportProgressBar — determinate progress for a GIF render.
 *
 * Every value comes from the server's own per-frame events, so the bar tracks
 * real work: no timed animation pretending to make progress. The encode phase
 * has no frame counter of its own, so it holds the bar full and says what it is
 * doing instead of stalling at 100% unexplained.
 */
function ExportProgressBar({ t, progress }) {
  const { phase, frame, total } = progress
  const safeTotal = Math.max(1, Number(total) || 1)
  const ratio = phase === 'encoding' ? 1 : Math.min(1, Math.max(0, (Number(frame) || 0) / safeTotal))
  const pct = Math.round(ratio * 100)

  const label =
    phase === 'launching'
      ? 'Starting renderer...'
      : phase === 'encoding'
        ? 'Encoding GIF...'
        : `Rendering frame ${Math.min(frame, safeTotal)} of ${safeTotal}`

  return (
    <div
      style={exportProgressWrapStyle(t)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      // Encoding has no measurable sub-progress; omitting the value marks the
      // bar indeterminate to assistive tech rather than claiming 100% done.
      aria-valuenow={phase === 'encoding' ? undefined : pct}
      aria-label={label}
    >
      <span style={exportProgressLabelStyle()}>{label}</span>
      <span style={exportProgressTrackStyle(t)}>
        <span style={exportProgressFillStyle(t, ratio, phase === 'encoding')} />
      </span>
      <span style={exportProgressPctStyle()}>{phase === 'encoding' ? '' : `${pct}%`}</span>
    </div>
  )
}

/**
 * ExportMenu — one "Export" button opening a list of formats.
 *
 * Every design type gets the same control. Formats that do not apply to the
 * active design are listed but disabled, so the menu also tells you what the
 * design *cannot* produce: GIF stays visible on a static infographic, greyed
 * out with the reason. GIF size is not a choice — see GIF_SCALE.
 */
function ExportMenu({ t, open, onOpenChange, busy, formats, onPick }) {
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    function onPointerDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) onOpenChange(false)
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') onOpenChange(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onOpenChange])

  return (
    <div ref={rootRef} style={exportWrapStyle}>
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        disabled={busy}
        className="scds-btn"
        aria-haspopup="menu"
        aria-expanded={open}
        style={primaryBtnStyle(t, busy)}
      >
        {busy ? 'Preparing...' : 'Export'}
      </button>

      {open && (
        <div role="menu" style={exportMenuStyle(t)}>
          {formats.map((f) => (
            <button
              key={f.format}
              type="button"
              role="menuitem"
              className="scds-option scds-export-option"
              disabled={f.disabled}
              title={f.hint || undefined}
              onClick={() => {
                if (f.disabled) return
                onPick(f.format)
              }}
              style={exportOptionStyle(t, f.disabled)}
            >
              <span style={menuOptionTextStyle}>{f.label}</span>
              {f.hint && (
                <span className="scds-export-hint" style={exportHintStyle()}>
                  {f.hint}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function TexturePicker({
  t,
  open,
  onOpenChange,
  textureId,
  onSelect,
  opacity,
  isCustomOpacity,
  onOpacityChange,
  onOpacityReset,
}) {
  const rootRef = useRef(null)
  const active = getTexture(textureId)

  useEffect(() => {
    if (!open) return undefined
    function onPointerDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) onOpenChange(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') onOpenChange(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onOpenChange])

  /** Ticking the active texture again clears it — that is the "remove" path. */
  function toggle(id) {
    onSelect(id === textureId ? 'none' : id)
  }

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <button
        type="button"
        className="scds-btn"
        onClick={() => onOpenChange(!open)}
        style={textureTriggerStyle(t, open)}
        aria-haspopup="dialog"
        aria-expanded={open}
        title={active.hint}
      >
        <span style={textureTriggerSwatchStyle(t)} aria-hidden="true">
          <TextureSwatch id={active.id} label={active.label} />
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.2 }}>
          <span style={textureTriggerCaptionStyle(t)}>Texture</span>
          <span style={{ fontWeight: 700 }}>{active.label}</span>
        </span>
        <span style={chevronStyle(t, open)} aria-hidden="true">
          <ChevronIcon />
        </span>
      </button>

      {open && (
        <div role="dialog" aria-label="Background texture" style={texturePanelStyle(t)}>
          <div style={texturePanelHeadStyle(t)}>Background texture</div>

          <div style={textureGridStyle}>
            {TEXTURES.map((texture) => {
              const checked = texture.id === textureId
              return (
                <button
                  key={texture.id}
                  type="button"
                  role="checkbox"
                  aria-checked={checked}
                  className="scds-texture-tile"
                  onClick={() => toggle(texture.id)}
                  style={textureTileStyle(t, checked)}
                  title={texture.hint}
                >
                  <span style={textureTileBoxStyle(t, checked)} aria-hidden="true">
                    {checked && <CheckIcon />}
                  </span>
                  <span style={textureTileSwatchStyle(t)} aria-hidden="true">
                    <TextureSwatch id={texture.id} label={texture.label} />
                  </span>
                  <span style={textureTileLabelStyle}>{texture.label}</span>
                </button>
              )
            })}
          </div>

          {textureId !== 'none' && (
            <div style={textureStrengthRowStyle(t)}>
              <label htmlFor="texture-strength" style={textureStrengthLabelStyle(t)}>
                Strength
              </label>
              <input
                id="texture-strength"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={opacity}
                onChange={(e) => onOpacityChange(Number(e.target.value))}
                style={{ flex: 1, accentColor: t.text, minWidth: 0 }}
              />
              <span style={textureStrengthValueStyle(t)}>{Math.round(opacity * 100)}%</span>
              <button
                type="button"
                className="scds-btn"
                onClick={onOpacityReset}
                disabled={!isCustomOpacity}
                style={textureResetBtnStyle(t, !isCustomOpacity)}
                title="Back to this texture's default strength"
              >
                Reset
              </button>
            </div>
          )}

          <p style={textureHintStyle(t)}>{active.hint}</p>
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
  .scds-option { transition: background 0.12s ease, color 0.12s ease; }
  .scds-option[aria-selected="false"]:hover { background: var(--shell-option-hover); }
  .scds-option:focus-visible { outline: 2px solid var(--shell-text); outline-offset: -2px; }
  /*
   * Export-menu rows invert to the button palette on hover — black-on-cream in
   * light, cream-on-black in dark. The row carries the fill, so the label and
   * the muted hint both have to flip with it or the hint drops to ~1.3:1
   * against the new background.
   */
  .scds-export-option:not(:disabled):hover,
  .scds-export-option:not(:disabled):focus-visible {
    background: var(--shell-btn-bg) !important;
    color: var(--shell-btn-text) !important;
  }
  .scds-export-option:not(:disabled):hover .scds-export-hint,
  .scds-export-option:not(:disabled):focus-visible .scds-export-hint {
    opacity: 0.72;
  }
  .scds-export-option:disabled { cursor: not-allowed; }
  .scds-texture-tile { transition: background 0.12s ease, border-color 0.12s ease; }
  .scds-texture-tile[aria-checked="false"]:hover { background: var(--shell-option-hover); }
  .scds-texture-tile:focus-visible { outline: 2px solid var(--shell-text); outline-offset: 2px; }
  /*
   * Encode-phase pulse on the export progress bar. The bar is already full at
   * this point, so opacity is the only thing left to signal "still working".
   */
  @keyframes scds-progress-pulse {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.45; }
  }
  @media (prefers-reduced-motion: reduce) {
    .scds-btn { transition: none; }
    @keyframes scds-progress-pulse { 0%, 100% { opacity: 1; } }
  }
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

/* -- Texture picker -- */

function subBarDividerStyle(t) {
  return {
    width: 1,
    alignSelf: 'stretch',
    margin: '16px 4px',
    background: t.border,
    flexShrink: 0,
  }
}

/* -- Transport + GIF split button (animated infographics only) -- */

function transportGroupStyle(t) {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: 7,
    paddingRight: 16,
    borderRadius: 18,
    border: `1px solid ${t.border}`,
    background: t.surface,
  }
}

function scrubberStyle(t) {
  return {
    width: 220,
    accentColor: t.btnBg,
    cursor: 'pointer',
  }
}

function transportReadoutStyle(t) {
  return {
    minWidth: 118,
    textAlign: 'right',
    fontSize: 17,
    fontWeight: 700,
    color: t.text,
    fontVariantNumeric: 'tabular-nums',
    whiteSpace: 'nowrap',
  }
}

const transportFpsStyle = { opacity: 0.6, marginLeft: 8, fontWeight: 600 }

const exportWrapStyle = { position: 'relative', display: 'inline-flex' }

function exportMenuStyle(t) {
  return { ...menuStyle(t), left: 'auto', right: 0, minWidth: 340 }
}

/** A disabled row stays readable — it is telling you the format exists. */
function exportOptionStyle(t, disabled) {
  return {
    ...menuOptionStyle(t, false),
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
  }
}

function exportHintStyle() {
  return {
    fontSize: 14,
    fontWeight: 600,
    // Inherits the row's colour (muted via opacity) so it flips with the hover
    // fill rather than staying dark-on-dark.
    color: 'inherit',
    opacity: 0.6,
    whiteSpace: 'nowrap',
    marginLeft: 12,
  }
}

function textureTriggerStyle(t, open) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 14,
    height: 62,
    padding: '0 20px',
    borderRadius: 16,
    border: `1px solid ${open ? t.borderStrong : t.border}`,
    background: open ? t.surfaceMuted : t.surface,
    color: t.text,
    fontFamily: FONT,
    fontSize: 17,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  }
}

function textureTriggerSwatchStyle(t) {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 10,
    border: `1px solid ${t.border}`,
    background: t.surfaceMuted,
    color: t.text,
    overflow: 'hidden',
    flexShrink: 0,
  }
}

function textureTriggerCaptionStyle(t) {
  return {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: t.textMuted,
  }
}

function texturePanelStyle(t) {
  return {
    position: 'absolute',
    top: 'calc(100% + 10px)',
    left: 0,
    zIndex: 200,
    width: 'min(720px, calc(100vw - 48px))',
    maxHeight: 'min(560px, 70vh)',
    overflowY: 'auto',
    padding: 18,
    borderRadius: 18,
    border: `1.5px solid ${t.border}`,
    background: t.surface,
    boxShadow: t.menuShadow,
  }
}

function texturePanelHeadStyle(t) {
  return {
    padding: '0 2px 12px',
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: t.textMuted,
  }
}

const textureGridStyle = {
  display: 'grid',
  // Wide enough that the full texture name fits — the names are the point.
  gridTemplateColumns: 'repeat(auto-fill, minmax(215px, 1fr))',
  gap: 10,
}

function textureTileStyle(t, checked) {
  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 12px',
    borderRadius: 14,
    border: `1.5px solid ${checked ? t.borderStrong : t.border}`,
    background: checked ? t.surfaceMuted : 'transparent',
    color: t.text,
    fontFamily: FONT,
    fontSize: 15,
    fontWeight: checked ? 700 : 500,
    textAlign: 'left',
    cursor: 'pointer',
  }
}

function textureTileBoxStyle(t, checked) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 6,
    flexShrink: 0,
    // Ink/cream pair, never a system accent colour.
    border: `1.5px solid ${checked ? t.btnBg : t.borderStrong}`,
    background: checked ? t.btnBg : 'transparent',
    color: t.btnText,
  }
}

function textureTileSwatchStyle(t) {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 9,
    border: `1px solid ${t.border}`,
    background: t.canvas,
    color: t.text,
    overflow: 'hidden',
    flexShrink: 0,
  }
}

const textureTileLabelStyle = {
  flex: 1,
  minWidth: 0,
  // Names wrap rather than truncate — "Atelier Fine" and "Atelier Grid" are
  // only distinguishable once the second word survives.
  lineHeight: 1.25,
}

function textureStrengthRowStyle(t) {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
    paddingTop: 16,
    borderTop: `1px solid ${t.border}`,
  }
}

function textureStrengthLabelStyle(t) {
  return {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: t.textMuted,
    whiteSpace: 'nowrap',
  }
}

function textureStrengthValueStyle(t) {
  return {
    minWidth: 52,
    textAlign: 'right',
    fontSize: 15,
    fontWeight: 700,
    color: t.text,
    fontVariantNumeric: 'tabular-nums',
  }
}

function textureResetBtnStyle(t, disabled) {
  return {
    height: 34,
    padding: '0 14px',
    borderRadius: 10,
    border: `1px solid ${t.border}`,
    background: 'transparent',
    color: disabled ? t.textMuted : t.text,
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    whiteSpace: 'nowrap',
  }
}

function textureHintStyle(t) {
  return {
    margin: '14px 2px 0',
    fontSize: 14,
    lineHeight: 1.4,
    color: t.textMuted,
  }
}

/*
 * Export progress bar. Sits in the notice slot at the end of the sub bar, so a
 * running render never shifts the toolbar layout.
 */
function exportProgressWrapStyle(t) {
  return {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    color: t.textMuted,
    fontSize: 14,
    lineHeight: 1.3,
    whiteSpace: 'nowrap',
  }
}

function exportProgressLabelStyle() {
  return { fontVariantNumeric: 'tabular-nums' }
}

function exportProgressTrackStyle(t) {
  return {
    position: 'relative',
    display: 'block',
    width: 132,
    height: 6,
    borderRadius: 999,
    background: t.surfaceMuted,
    border: `1px solid ${t.border}`,
    overflow: 'hidden',
  }
}

function exportProgressFillStyle(t, ratio, encoding) {
  return {
    display: 'block',
    height: '100%',
    width: `${Math.round(ratio * 100)}%`,
    borderRadius: 999,
    background: t.btnBg,
    // Smooths the per-frame steps into continuous motion. This is a transition
    // on a real measured value, not an animation standing in for one.
    transition: 'width 140ms linear',
    // The encode phase holds at full width, so a gentle pulse is the only
    // signal that work is still happening.
    animation: encoding ? 'scds-progress-pulse 1.1s ease-in-out infinite' : undefined,
  }
}

function exportProgressPctStyle() {
  return { fontVariantNumeric: 'tabular-nums', minWidth: 34, textAlign: 'right' }
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

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <rect x="6.5" y="5" width="4" height="14" rx="1.4" />
      <rect x="13.5" y="5" width="4" height="14" rx="1.4" />
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
