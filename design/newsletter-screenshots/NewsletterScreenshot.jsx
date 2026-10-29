/**
 * NewsletterScreenshot — one screenshot, centred on the cream square grid.
 *
 * The screenshot is NEVER resampled: the canvas is generated around it.
 *   - The image is drawn at natural size / EXPORT_SCALE CSS px, and the PNG
 *     export renders at EXPORT_SCALE (set as `exportScale` in modes.local.js),
 *     so every source pixel lands on exactly one output pixel.
 *   - Padding is PADDING_RATIO of the screenshot's longer side, equal on all
 *     four sides, so the screenshot sits dead centre whatever its shape.
 *
 * Generic: every image dropped into assets/newsletter-screenshots/ becomes its
 * own mode (see src/modes.local.js) rendered through this component.
 *
 * LOCAL-ONLY: this folder is gitignored.
 */
import { useEffect, useState } from 'react'
import NewsletterScreenshotCanvas from '../../components/newsletter-screenshot/NewsletterScreenshotCanvas.jsx'
import NewsletterScreenshotFrame from '../../components/newsletter-screenshot/NewsletterScreenshotFrame.jsx'

export const EXPORT_SCALE = 2
const PADDING_RATIO = 0.12

export default function NewsletterScreenshot({ src, alt = 'Newsletter screenshot' }) {
  const [natural, setNatural] = useState(null)
  const [ready, setReady] = useState(false)

  // Read the natural size first; the canvas is built from it.
  useEffect(() => {
    let alive = true
    setNatural(null)
    setReady(false)
    const probe = new Image()
    probe.onload = () => alive && setNatural({ w: probe.naturalWidth, h: probe.naturalHeight })
    probe.src = src
    return () => { alive = false }
  }, [src])

  if (!natural) return null

  const width = natural.w / EXPORT_SCALE
  const height = natural.h / EXPORT_SCALE
  const pad = Math.round(Math.max(width, height) * PADDING_RATIO)

  return (
    <NewsletterScreenshotCanvas
      width={width + pad * 2}
      height={height + pad * 2}
      // The export waits on this before capturing.
      data-ready={ready ? 'true' : 'false'}
    >
      <NewsletterScreenshotFrame
        src={src}
        alt={alt}
        width={width}
        height={height}
        unit={pad / 10}
        onReady={() => setReady(true)}
      />
    </NewsletterScreenshotCanvas>
  )
}
