/**
 * SlideCard — Frosted-glass rounded card for 16:9 slide content.
 *
 * Props:
 *   children    ReactNode   — slide content
 *   style       object      — additional inline styles (position, left, top, width, height, etc.)
 *   variant     string      — 'white' | 'glass' | 'navy' | 'accent'  (default: 'white')
 *   padding     string      — default '32px 40px'
 *   radius      number      — border-radius in px, default 24
 *   shadow      string      — box-shadow override
 *   blur        boolean     — enable backdrop-filter blur (default true, glass variants only)
 */

const VARIANTS = {
  white: {
    background: 'rgba(255,255,255,0.92)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    backdropFilter: 'blur(12px)',
  },
  glass: {
    background: 'rgba(255,255,255,0.55)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    backdropFilter: 'blur(20px)',
  },
  navy: {
    background: '#092c69',
    boxShadow: '0 8px 32px rgba(9,44,105,0.35)',
    backdropFilter: null,
  },
  accent: {
    background: '#b4eaff',
    boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
    backdropFilter: 'blur(8px)',
  },
}

export default function SlideCard({
  children,
  style = {},
  variant = 'white',
  padding = '32px 40px',
  radius = 24,
  shadow,
  blur = true,
}) {
  const v = VARIANTS[variant] ?? VARIANTS.white
  const backdropFilter = blur && v.backdropFilter ? v.backdropFilter : undefined

  return (
    <div
      style={{
        borderRadius: radius,
        padding,
        boxShadow: shadow ?? v.boxShadow,
        background: v.background,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
