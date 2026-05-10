/**
 * tailwind.config.js
 *
 * Theme extension (colors, typography, radii, shadows) is parsed from DESIGN.md
 * for Tailwind utilities. For runtime CSS variables used in components, edit
 * `src/index.css` directly.
 *
 * Non-token values (canvas dimensions, grid overrides) remain hardcoded below.
 */

import { parseDesignMd } from './scripts/parse-design-md.mjs'

const tokens = parseDesignMd('./DESIGN.md')

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
      // ── From DESIGN.md ─────────────────────────────────────────────────────
      colors:       tokens.colors,
      fontFamily:   tokens.fontFamilies,
      fontSize:     tokens.fontSizes,
      borderRadius: tokens.borderRadius,
      boxShadow:    tokens.boxShadow,

      // ── Canvas / grid constraints (not design tokens) ───────────────────────
      // These are fixed structural values for the infographic/slide canvases.
      width:  { canvas: '1080px', inner: '981px', footer: '1048px' },
      height: { canvas: '1350px' },
      borderWidth: { 3: '3px' },
      // Figma MCP overlap grid: col-1/row-1 stacks children in the same cell;
      // ml-/mt- offsets then position them absolutely within the overlap.
      gridColumn: { '1': '1' },
      gridRow:    { '1': '1' },
    },
  },
  plugins: [],
}
