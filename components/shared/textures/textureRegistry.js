/**
 * Texture registry — the background textures any canvas can wear.
 *
 * One entry per texture. Each is defined purely in terms of CSS background
 * layers built from design tokens, so a texture rebrands with the palette and
 * never hardcodes chroma (see CLAUDE.md "Tokens & color").
 *
 * Every entry exposes:
 *   id             — stable key, persisted in localStorage and the export URL
 *   label          — premium display name shown in the picker
 *   hint           — one line of description for the picker tooltip
 *   defaultOpacity — opacity that reads well for this pattern
 *   grain          — true for the noise/paper patterns (see below)
 *   layers(ctx)    — the CSS that paints it, given { scale, ink }
 *
 * Two painting strategies, both pure CSS — no image files, no downloads:
 *
 *  • **Gradient layers** (grids, dots, hatching, laid lines, weave) put the
 *    token colour straight into `backgroundImage`.
 *
 *  • **Noise layers** (Sandstone, Silk Grain, Cold Press) use an inline SVG
 *    `feTurbulence` filter as a data URI. Gradients repeat on a fixed pitch,
 *    so they cannot produce random grain — turbulence is the only way to get
 *    it. The SVG is a string in the stylesheet, not an asset.
 *
 * `scale` is a multiplier on a texture's natural pitch. Patterns are authored
 * at 1080px-wide scale; a 420×300 thumbnail passes a smaller scale so a grid
 * tuned for an infographic does not swamp it. See `resolveTextureScale`.
 */

/**
 * Texture ramp — white → light grey → dark grey.
 *
 * Generated into `src/index.css` from the canvas colour (see
 * `scripts/generate-index-css.mjs`), so it inverts on dark brands: the greys
 * darken away from a light canvas and lighten away from a dark one.
 *
 * Textures previously drew in `--theme-surface-canvas-secondary`, which sits
 * about 3% off the canvas (#fff4e8 on #fffceb) and was effectively invisible
 * at normal viewing size. Every texture now picks its values off this ramp
 * instead, so a pattern steps away from the canvas by a real, fixed amount.
 *
 *   HIGHLIGHT — the lifted end; catches light on paper and weave
 *   MID       — light grey; the default for line work
 *   DEEP      — dark grey; the darkest a texture goes
 */
export const TEXTURE_HIGHLIGHT = 'var(--theme-texture-highlight)'
export const TEXTURE_MID = 'var(--theme-texture-mid)'
export const TEXTURE_DEEP = 'var(--theme-texture-deep)'

/** Default line ink — the light-grey middle of the ramp. */
export const TEXTURE_INK = TEXTURE_MID

/** Grid helper: two crossing hairlines at a given pitch. */
function gridLayers(pitch, lineWidth, ink) {
  return {
    backgroundImage:
      `linear-gradient(to right, ${ink} ${lineWidth}px, transparent ${lineWidth}px),` +
      `linear-gradient(to bottom, ${ink} ${lineWidth}px, transparent ${lineWidth}px)`,
    backgroundSize: `${pitch}px ${pitch}px`,
    backgroundRepeat: 'repeat',
  }
}

/** Wrap raw SVG markup as a data URI usable by `backgroundImage`. */
function svgUrl(svg) {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

/**
 * Deterministic fractal-noise tile painted as a real greyscale ramp.
 *
 * This is drawn as an opaque image, not a mask. A mask can only vary how much
 * of one flat colour shows through, so it can darken the canvas but never
 * lighten it — which is why the first version of these textures was invisible.
 * Painting actual greys means the grain runs white → light grey → dark grey
 * and reads as a surface rather than a stain.
 *
 * `contrast` spreads the turbulence around mid-grey; `light`/`dark` are the
 * ends of the ramp. The tile is composited under a low layer opacity, so the
 * canvas colour still shows through and the grain stays neutral.
 */
function noiseSvg({ frequency, octaves, size, seed = 7, contrast = 1, bias = 0 }) {
  // `bias` lifts the whole ramp toward white. Turbulence averages to mid-grey,
  // so an unbiased tile drags a cream canvas toward grey no matter how low the
  // opacity. Lifting the midpoint lets the grain modulate *around* the canvas
  // colour — lighter grains catch the light, darker ones sit in the tooth —
  // instead of laying a grey sheet over it.
  const intercept = (1 - contrast) / 2 + bias
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">` +
    `<filter id="n" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">` +
    `<feTurbulence type="fractalNoise" baseFrequency="${frequency}" numOctaves="${octaves}" seed="${seed}" stitchTiles="stitch"/>` +
    `<feColorMatrix type="saturate" values="0"/>` +
    `<feComponentTransfer>` +
    `<feFuncR type="linear" slope="${contrast}" intercept="${intercept}"/>` +
    `<feFuncG type="linear" slope="${contrast}" intercept="${intercept}"/>` +
    `<feFuncB type="linear" slope="${contrast}" intercept="${intercept}"/>` +
    `<feFuncA type="discrete" tableValues="1 1"/>` +
    `</feComponentTransfer>` +
    `</filter>` +
    `<rect width="100%" height="100%" filter="url(#n)"/>` +
    `</svg>`
  )
}

export const TEXTURES = [
  {
    id: 'none',
    label: 'Blank',
    hint: 'No texture — the bare canvas colour.',
    defaultOpacity: 0,
    layers: () => null,
  },
  {
    id: 'atelier-fine',
    label: 'Atelier Fine',
    hint: 'A tight architect grid — precise, technical, quiet.',
    defaultOpacity: 0.7,
    layers: ({ scale, ink }) => gridLayers(Math.max(6, Math.round(44 * scale)), 1, ink),
  },
  {
    id: 'atelier-grid',
    label: 'Atelier Grid',
    hint: 'The house grid — the default drafting square.',
    defaultOpacity: 0.7,
    layers: ({ scale, ink }) => gridLayers(Math.max(10, Math.round(86 * scale)), 1, ink),
  },
  {
    id: 'salon-broad',
    label: 'Salon Broad',
    hint: 'Wide squares — airy and editorial, lets the layout breathe.',
    defaultOpacity: 0.8,
    layers: ({ scale, ink }) => gridLayers(Math.max(20, Math.round(170 * scale)), 1, ink),
  },
  {
    id: 'blueprint',
    label: 'Blueprint',
    hint: 'A fine grid with a heavier major line every fifth square.',
    defaultOpacity: 0.75,
    layers: ({ scale, ink }) => {
      const minor = Math.max(6, Math.round(36 * scale))
      const major = minor * 5
      return {
        backgroundImage:
          `linear-gradient(to right, ${ink} 2px, transparent 2px),` +
          `linear-gradient(to bottom, ${ink} 2px, transparent 2px),` +
          `linear-gradient(to right, ${ink} 1px, transparent 1px),` +
          `linear-gradient(to bottom, ${ink} 1px, transparent 1px)`,
        backgroundSize: `${major}px ${major}px, ${major}px ${major}px, ${minor}px ${minor}px, ${minor}px ${minor}px`,
        backgroundRepeat: 'repeat',
      }
    },
  },
  {
    id: 'constellation',
    label: 'Constellation',
    hint: 'A field of soft dots set on a diagonal offset.',
    defaultOpacity: 0.9,
    layers: ({ scale, ink }) => {
      const pitch = Math.max(12, Math.round(56 * scale))
      const dot = Math.max(1.2, Number((2.6 * scale).toFixed(2)))
      return {
        backgroundImage:
          `radial-gradient(${ink} ${dot}px, transparent ${dot}px),` +
          `radial-gradient(${ink} ${dot}px, transparent ${dot}px)`,
        backgroundSize: `${pitch}px ${pitch}px, ${pitch}px ${pitch}px`,
        backgroundPosition: `0 0, ${pitch / 2}px ${pitch / 2}px`,
        backgroundRepeat: 'repeat',
      }
    },
  },
  {
    id: 'pinstripe',
    label: 'Pinstripe',
    hint: 'Diagonal hatching — tailored, with a sense of motion.',
    defaultOpacity: 0.75,
    layers: ({ scale, ink }) => {
      const pitch = Math.max(6, Math.round(14 * scale))
      return {
        backgroundImage: `repeating-linear-gradient(45deg, ${ink} 0 1.5px, transparent 1.5px ${pitch}px)`,
        backgroundRepeat: 'repeat',
      }
    },
  },
  {
    id: 'laid-paper',
    label: 'Laid Paper',
    hint: 'Classic laid lines with a faint chain — stationery stock.',
    defaultOpacity: 0.7,
    layers: ({ scale, ink }) => {
      const laid = Math.max(4, Math.round(9 * scale))
      const chain = Math.max(40, Math.round(150 * scale))
      return {
        backgroundImage:
          `repeating-linear-gradient(to bottom, ${ink} 0 1px, transparent 1px ${laid}px),` +
          `repeating-linear-gradient(to right, ${ink} 0 1.5px, transparent 1.5px ${chain}px)`,
        backgroundRepeat: 'repeat',
      }
    },
  },
  {
    id: 'linen-weave',
    label: 'Linen Weave',
    hint: 'A woven crosshatch — bookcloth over the whole canvas.',
    defaultOpacity: 0.85,
    layers: ({ scale, ink }) => {
      const pitch = Math.max(4, Math.round(7 * scale))
      return {
        backgroundImage:
          `repeating-linear-gradient(to right, ${ink} 0 1px, transparent 1px ${pitch}px),` +
          `repeating-linear-gradient(to bottom, ${ink} 0 1px, transparent 1px ${pitch}px)`,
        backgroundRepeat: 'repeat',
      }
    },
  },
  {
    id: 'sandstone',
    label: 'Sandstone',
    hint: 'A coarse mineral grain — tactile and print-like.',
    defaultOpacity: 0.3,
    grain: true,
    layers: ({ scale }) => {
      const size = Math.max(120, Math.round(220 * Math.max(scale, 0.5)))
      return {
        backgroundImage: svgUrl(noiseSvg({ frequency: 0.7, octaves: 3, size: 220, contrast: 0.95, bias: 0.42 })),
        backgroundSize: `${size}px ${size}px`,
        backgroundRepeat: 'repeat',
      }
    },
  },
  {
    id: 'silk-grain',
    label: 'Silk Grain',
    hint: 'A whisper of fine noise — barely there, kills flat banding.',
    defaultOpacity: 0.2,
    grain: true,
    layers: ({ scale }) => {
      const size = Math.max(100, Math.round(180 * Math.max(scale, 0.5)))
      return {
        backgroundImage: svgUrl(noiseSvg({ frequency: 1.4, octaves: 2, size: 180, contrast: 0.8, bias: 0.44 })),
        backgroundSize: `${size}px ${size}px`,
        backgroundRepeat: 'repeat',
      }
    },
  },
  {
    id: 'cold-press',
    label: 'Cold Press',
    hint: 'Watercolour paper — a soft fibrous tooth across the sheet.',
    defaultOpacity: 0.34,
    grain: true,
    layers: ({ scale }) => {
      const size = Math.max(140, Math.round(240 * Math.max(scale, 0.5)))
      return {
        // Anisotropic turbulence — stretched horizontally, so the grain reads
        // as drawn-out fibres rather than even speckle.
        backgroundImage: svgUrl(
          noiseSvg({ frequency: '0.03 0.38', octaves: 4, size: 240, seed: 3, contrast: 0.9, bias: 0.4 })
        ),
        backgroundSize: `${size}px ${size}px`,
        backgroundRepeat: 'repeat',
      }
    },
  },
]

export const TEXTURE_IDS = TEXTURES.map((t) => t.id)

/** The texture every canvas falls back to — the historical square grid. */
export const DEFAULT_TEXTURE_ID = 'atelier-grid'

export function getTexture(id) {
  return (
    TEXTURES.find((t) => t.id === id) ||
    TEXTURES.find((t) => t.id === DEFAULT_TEXTURE_ID)
  )
}

/**
 * Pitch multiplier for a canvas of a given width.
 *
 * Textures are authored at 1080px-wide scale. A 420px thumbnail gets ~0.39,
 * which keeps a grid legible instead of showing three enormous squares. The
 * result is clamped so a very small canvas never collapses the pattern to mush.
 */
export function resolveTextureScale(width, baseWidth = 1080) {
  if (!width) return 1
  return Math.min(1, Math.max(0.25, width / baseWidth))
}
