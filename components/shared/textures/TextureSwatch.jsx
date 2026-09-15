/**
 * TextureSwatch — the SVG miniature shown on each texture checkbox.
 *
 * This is preview chrome, not a design surface: it draws in `currentColor` so
 * it inherits the shell's light/dark text colour, and never touches brand
 * tokens. Each miniature is hand-drawn at 40×40 rather than reusing the real
 * CSS layers, because a 40px crop of an 86px grid would show a single line and
 * tell the user nothing — the miniature exaggerates the pattern's character so
 * the twelve options are distinguishable at a glance.
 */

const SIZE = 40

function Frame({ children, title }) {
  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label={title}
      focusable="false"
    >
      <title>{title}</title>
      {children}
    </svg>
  )
}

/** Evenly spaced crossing lines at a given pitch. */
function gridPaths(pitch, width) {
  const lines = []
  for (let p = pitch; p < SIZE; p += pitch) {
    lines.push(<line key={`v${p}`} x1={p} y1="0" x2={p} y2={SIZE} strokeWidth={width} />)
    lines.push(<line key={`h${p}`} x1="0" y1={p} x2={SIZE} y2={p} strokeWidth={width} />)
  }
  return lines
}

/** A pseudo-random but deterministic speckle field — the noise miniatures. */
function speckles({ count, radius, seed }) {
  const dots = []
  let s = seed
  for (let i = 0; i < count; i += 1) {
    s = (s * 1103515245 + 12345) % 2147483648
    const x = (s / 2147483648) * SIZE
    s = (s * 1103515245 + 12345) % 2147483648
    const y = (s / 2147483648) * SIZE
    s = (s * 1103515245 + 12345) % 2147483648
    const o = 0.25 + (s / 2147483648) * 0.75
    dots.push(<circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={radius} opacity={o.toFixed(2)} />)
  }
  return dots
}

const SWATCHES = {
  none: (
    <g stroke="currentColor" strokeWidth="1.5" opacity="0.5" strokeLinecap="round">
      <line x1="10" y1="30" x2="30" y2="10" />
    </g>
  ),
  'atelier-fine': <g stroke="currentColor" opacity="0.75">{gridPaths(5, 0.75)}</g>,
  'atelier-grid': <g stroke="currentColor" opacity="0.8">{gridPaths(10, 1)}</g>,
  'salon-broad': <g stroke="currentColor" opacity="0.85">{gridPaths(20, 1.2)}</g>,
  blueprint: (
    <g stroke="currentColor">
      <g opacity="0.45">{gridPaths(4, 0.6)}</g>
      <g opacity="0.9">{gridPaths(20, 1.4)}</g>
    </g>
  ),
  constellation: (
    <g fill="currentColor" opacity="0.8">
      {[6, 18, 30].map((y) =>
        [6, 18, 30].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />)
      )}
      {[12, 24].map((y) =>
        [12, 24].map((x) => <circle key={`o${x}-${y}`} cx={x} cy={y} r="1.6" />)
      )}
    </g>
  ),
  pinstripe: (
    <g stroke="currentColor" strokeWidth="1" opacity="0.8">
      {[-30, -22, -14, -6, 2, 10, 18, 26, 34].map((o) => (
        <line key={o} x1={o} y1={SIZE} x2={o + SIZE} y2="0" />
      ))}
    </g>
  ),
  'laid-paper': (
    <g stroke="currentColor">
      <g opacity="0.6" strokeWidth="0.7">
        {[4, 8, 12, 16, 20, 24, 28, 32, 36].map((y) => (
          <line key={y} x1="0" y1={y} x2={SIZE} y2={y} />
        ))}
      </g>
      <g opacity="0.95" strokeWidth="1.4">
        <line x1="13" y1="0" x2="13" y2={SIZE} />
        <line x1="27" y1="0" x2="27" y2={SIZE} />
      </g>
    </g>
  ),
  'linen-weave': <g stroke="currentColor" opacity="0.7">{gridPaths(3, 0.6)}</g>,
  sandstone: <g fill="currentColor">{speckles({ count: 130, radius: 1.1, seed: 7 })}</g>,
  'silk-grain': <g fill="currentColor">{speckles({ count: 220, radius: 0.5, seed: 11 })}</g>,
  'cold-press': (
    <g>
      <g fill="currentColor">{speckles({ count: 90, radius: 0.9, seed: 3 })}</g>
      <g stroke="currentColor" strokeWidth="0.5" opacity="0.35">
        {[5, 13, 21, 29, 37].map((y) => (
          <line key={y} x1="0" y1={y} x2={SIZE} y2={y} />
        ))}
      </g>
    </g>
  ),
}

export default function TextureSwatch({ id, label }) {
  return <Frame title={label}>{SWATCHES[id] ?? SWATCHES['atelier-grid']}</Frame>
}
