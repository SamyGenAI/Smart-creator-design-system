/**
 * Mode registry — single source of truth for browser-previewed design modes.
 *
 * Imported by both `src/App.jsx` (which adds the React component for each key)
 * and `vite.config.js` (which uses `type` to drive PNG/PDF/PPTX export).
 *
 * Fields:
 *   label       — display name in the top nav
 *   type        — 'infographic' | 'carousel' | 'thumbnail' | 'pptx'
 *   exportName  — file stem for downloads (no extension)
 *
 * infographic modes only (optional — absent/false means today's behaviour):
 *   animated    — true unlocks the transport row and the GIF export branch
 *   motion      — { durationInFrames, fps } for the animation timeline
 *
 * pptx modes only:
 *   deckFile    — deck definition under design/pptx-slides/ (exports { meta, slides })
 *   pptxFile    — output filename under design/pptx-slides/output/
 *   previewSlug — folder under public/screenshots/powerpoint/
 */
export const MODES = {
  'gtm-system':       { label: 'GTM System on Claude Code', type: 'infographic', exportName: 'gtm-system' },
  'social-listening': {
    label: 'Social Listening Routine',
    type: 'infographic',
    exportName: 'social-listening',
    animated: true,
    motion: { durationInFrames: 90, fps: 30 }, // 3s
  },
  'ai-design-system': { label: 'AI Design System Architecture (v2)', type: 'infographic', exportName: 'ai-design-system' },
  mckinsey:           { label: 'McKinsey Carousel',         type: 'carousel',    exportName: 'mckinsey' },
  'social-listening-thumbnail': { label: 'Social Listening (Thumbnail)', type: 'thumbnail', exportName: 'social-listening-thumbnail' },
  'prompt-10x-thumbnail': { label: 'Prompt to 10x AI results (Thumbnail)', type: 'thumbnail', exportName: 'prompt-10x-thumbnail' },
  'stop-ai-design-slop-thumbnail': { label: 'Stop AI design slop (Thumbnail)', type: 'thumbnail', exportName: 'stop-ai-design-slop-thumbnail' },
  'yt-ai-design-system': {
    label: 'YT: AI Design System',
    type: 'pptx',
    exportName: 'yt-ai-design-system',
    deckFile: 'decks/yt-ai-design-system/deck.mjs',
    layoutFile: 'decks/yt-ai-design-system/layouts.mjs',
    pptxFile: 'YtAiDesignSystemSlides.pptx',
    previewSlug: 'YT - AI Design system',
  },
}
