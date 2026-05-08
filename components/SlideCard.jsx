/**
 * SlideCard — Frosted-glass rounded card for 16:9 slide content.
 *
 * Props:
 *   children    ReactNode   — slide content
 *   style       object      — additional inline styles (position, left, top, width, height, etc.)
 *   variant     string      — 'white' | 'glass' | 'primary' | 'accent'  (default: 'white')
 *   padding     string      — default '32px 40px'
 *   radius      number      — border-radius in px, default 24
 *   shadow      string      — box-shadow override
 *   blur        boolean     — enable backdrop-filter blur (default true, glass variants only)
 *
 * Colors sourced from DESIGN.md CSS variables. Edit DESIGN.md + run `pnpm tokens:gen`.
 */

const SLIDE_CARD_VARIANTS = {
  white: {
    background: 'var(--theme-surface-glass-strong)',
    boxShadow: 'var(--theme-shadow-surface-soft)',
    backdropFilter: 'blur(12px)',
  },
  glass: {
    background: 'var(--theme-surface-glass-default)',
    boxShadow: 'var(--theme-shadow-surface-glass)',
    backdropFilter: 'blur(20px)',
  },
  primary: {
    background: 'var(--theme-color-primary)',
    boxShadow: 'var(--theme-shadow-surface-primary)',
    backdropFilter: null,
  },
  accent: {
    background: 'var(--theme-accent-1)',
    boxShadow: 'var(--theme-shadow-surface-accent)',
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
  const v = SLIDE_CARD_VARIANTS[variant] ?? SLIDE_CARD_VARIANTS.white
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
