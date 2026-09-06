/**
 * SquareGridTexture — background grid texture overlay.
 *
 * Place as the first child inside the canvas div, before all content.
 *
 * Two rendering modes:
 *
 *  • **PNG sheet (default)** — the local 1080×1350 asset, which is what the
 *    Figma push expects. Correct at full infographic size.
 *
 *  • **`cellSize` (vector)** — draws the grid with CSS gradients at an exact
 *    whole-pixel pitch. Use this on any canvas smaller than the sheet.
 *
 * Why the vector mode exists: the PNG is 12.6 × 15.76 cells (pitch ≈85.7px at
 * an offset), so it is NOT a seamless tile — `background-repeat` slices a cell
 * in half at every seam. Scaling it down compounds that with a fractional
 * pitch (a 160px tile lands on 12.7px cells), which the renderer rounds to 12
 * or 13 unevenly. Both effects read as "squares of different sizes". Drawing
 * the lines instead makes the grid seamless and resolution-independent.
 */

/** Grid line colour — the canvas-secondary surface token, so it rebrands. */
const GRID_LINE = 'var(--theme-surface-canvas-secondary)'

export default function SquareGridTexture({
  width = 1080,
  height = 1350,
  opacity = 0.6,
  backgroundSize = 'auto',
  /** Cell pitch in px. When set, the grid is drawn as gradients (seamless). */
  cellSize = null,
  /** Grid line thickness in px, vector mode only. */
  lineWidth = 1,
  /** Grid line colour, vector mode only. */
  lineColor = GRID_LINE,
}) {
  const base = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${width}px`,
    height: `${height}px`,
    pointerEvents: 'none',
    opacity,
  }

  // Vector mode — exact pitch, no seams, no resampling.
  const style = cellSize
    ? {
        ...base,
        backgroundImage: `linear-gradient(to right, ${lineColor} ${lineWidth}px, transparent ${lineWidth}px), linear-gradient(to bottom, ${lineColor} ${lineWidth}px, transparent ${lineWidth}px)`,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        backgroundRepeat: 'repeat',
      }
    : {
        ...base,
        backgroundImage: 'url(/assets/textures/light-squares.png)',
        backgroundSize,
        backgroundRepeat: 'repeat',
      }

  return (
    <div
      aria-hidden="true"
      data-name="Texture-square-grid"
      data-node-id="54:895"
      style={style}
    />
  )
}
