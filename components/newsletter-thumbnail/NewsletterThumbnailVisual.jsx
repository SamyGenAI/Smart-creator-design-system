/**
 * NewsletterThumbnailVisual — the area below the title in a newsletter thumbnail.
 *
 * Three variants, chosen by the user when running /newsletter-thumbnail:
 *   'empty'  — nothing; the grid texture carries the space (Figma default)
 *   'image'  — a local asset, contained and centred (never cropped)
 *   'design' — arbitrary JSX children (icons, tiles, a diagram)
 *
 * Always flex-1 so the title block keeps its fixed top position.
 *
 * Props:
 *   variant  {'empty'|'image'|'design'}
 *   src      {string} — local path under /assets, required for variant="image"
 *   alt      {string}
 *   padding  {number} — px inset around the visual. Default 16.
 *   children {node}   — the design, for variant="design"
 */
export default function NewsletterThumbnailVisual({
  variant = 'empty',
  src = null,
  alt = '',
  padding = 16,
  className = '',
  children = null,
}) {
  const base = `relative flex-1 min-h-0 w-full flex items-center justify-center ${className}`.trim()
  const style = { padding: `${padding}px` }

  if (variant === 'empty') {
    return <div className={base} style={style} data-name="Newsletter-thumbnail-visual" aria-hidden="true" />
  }

  if (variant === 'image') {
    return (
      <div className={base} style={style} data-name="Newsletter-thumbnail-visual">
        {src && <img src={src} alt={alt} className="w-full h-full object-contain" />}
      </div>
    )
  }

  return (
    <div className={base} style={style} data-name="Newsletter-thumbnail-visual">
      {children}
    </div>
  )
}
