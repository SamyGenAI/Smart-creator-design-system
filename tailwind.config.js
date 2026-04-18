/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './templates/**/*.{js,jsx}',
    './design/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      // Design tokens — single source of truth.
      // Use as Tailwind utilities: bg-navy, text-navy, border-border-blue, etc.
      colors: {
        // ── Brand ────────────────────────────────────────────
        navy:           '#092c69',   // --color/blue/500

        // ── Blue primitives ───────────────────────────────────
        'blue-100':     'rgba(126,218,255,0.15)',
        'blue-200':     '#c7efff',
        'blue-300':     '#b4eaff',
        'blue-400':     '#7edaff',

        // ── Cream primitives ──────────────────────────────────
        'canvas':       '#fffceb',   // --color/cream/100 — Infographic bg
        'cream-200':    '#fff4e8',   // --color/cream/200

        // ── Neutral primitives ────────────────────────────────
        'neutral-200':  '#f9fafc',
        'neutral-300':  '#f4f4f8',
        'neutral-400':  '#e3e4eb',
        'neutral-500':  '#cacbd4',
        'neutral-600':  '#a8a9b2',
        'neutral-700':  '#717188',
        'neutral-800':  '#323241',

        // ── Pink primitives ───────────────────────────────────
        'pink-100':     'rgba(255,178,218,0.15)',
        'pink-200':     '#ffe6f3',
        'pink-300':     '#ffb2da',

        // ── Amber primitives ──────────────────────────────────
        'amber-100':    '#fef3c7',
        'amber-200':    '#fde68a',
        'amber-300':    '#fcd34d',

        // ── Green primitives ──────────────────────────────────
        'green-100':    'rgba(169,255,62,0.15)',
        'green-200':    '#d2ff9a',
        'green-300':    '#a9ff3e',

        // ── Orange primitives ─────────────────────────────────
        'orange-100':   'rgba(255,145,77,0.15)',
        'orange-200':   '#ffa066',
        'orange-300':   '#ff914d',

        // ── Component aliases (infographic) ───────────────────
        'card-blue':    'rgba(126,218,255,0.15)',  // --components/card/blue
        'card-amber':   '#fef3c7',                 // --components/card/amber
        'card-pink':    'rgba(255,178,218,0.15)',  // --components/card/pink
        'chip-blue':    '#b4eaff',                 // --components/card-title/blue
        'chip-green':   '#d2ff9a',                 // --components/card-title/green
        'chip-amber':   '#fde68a',                 // --components/card-title/amber
        'chip-pink':    '#ffe6f3',                 // --components/card-title/pink
        'chip-orange':  '#ffa066',                 // --components/card-title/orange
        'border-blue':  '#7edaff',                 // --border/blue
        'border-green': '#a9ff3e',                 // --border/green
        'border-pink':  '#ffb2da',                 // --border/pink
        'border-amber': '#fcd34d',                 // --border/amber
        'border-grey':  '#e3e4eb',                 // --border/grey
        'glass-white':  'rgba(255,255,255,0.1)',
        'pink-bullet':  'rgba(255,178,218,0.7)',
      },
      fontFamily: {
        montserrat:   ['Montserrat', 'sans-serif'],
        'noto-serif': ['Noto Serif', 'serif'],
      },
      // Fixed canvas dimensions for infographic
      width:  { canvas: '1080px', 'inner': '981px', footer: '1048px' },
      height: { canvas: '1350px' },
      borderWidth: { 3: '3px' },
      // Figma MCP overlap grid system: col-1 row-1 places all children in
      // the same grid cell so they stack, then ml-/mt- offsets position them.
      gridColumn: { '1': '1' },
      gridRow:    { '1': '1' },
      borderRadius: {
        'glass':        '20px',
        'glass-header': '10px',
        'card':         '7.951px',
        'pill':         '40px',
      },
      boxShadow: {
        card:            '0px 4px 4px 0px rgba(0,0,0,0.25)',
        'elevation-100': '0px 1px 4px 0px rgba(12,12,13,0.05)',
        'elevation-200': '0px 1px 4px 0px rgba(12,12,13,0.05), 0px 1px 4px 0px rgba(12,12,13,0.10)',
        'elevation-400': '0px 4px 4px -4px rgba(12,12,13,0.10), 0px 16px 32px -4px rgba(12,12,13,0.10)',
        'elevation-500': '0px 4px 4px -4px rgba(12,12,13,0.10), 0px 16px 16px -8px rgba(12,12,13,0.10)',
      },
      // Typography size scale from Figma
      fontSize: {
        'xs-token':  ['12px', { lineHeight: '16px' }],
        'sm-token':  ['16px', { lineHeight: '24px' }],
        'md-token':  ['18px', { lineHeight: '24px' }],
        'lg-token':  ['20px', { lineHeight: '24px' }],
        'xl-token':  ['24px', { lineHeight: '24px' }],
        '2xl-token': ['32px', { lineHeight: '32px' }],
        '4xl-token': ['56px', { lineHeight: '40px' }],
        '5xl-token': ['72px', { lineHeight: '48px' }],
      },
    },
  },
  plugins: [],
}
