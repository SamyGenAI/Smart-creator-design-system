/**
 * Mode registry — single source of truth for browser-previewed design modes.
 *
 * Imported by both `src/App.jsx` (which adds the React component for each key)
 * and `vite.config.js` (which uses `type` to drive PNG/PDF/PPTX export).
 *
 * Fields:
 *   label       — display name in the top nav
 *   type        — 'infographic' | 'carousel' | 'pptx'
 *   exportName  — file stem for downloads (no extension)
 *
 * pptx modes only:
 *   deckFile    — deck definition under design/pptx-slides/ (exports { meta, slides })
 *   pptxFile    — output filename under design/pptx-slides/output/
 *   previewSlug — folder under public/screenshots/powerpoint/
 */
export const MODES = {
  'bulletproof-ai':    { label: 'Bullet-Proof AI System',    type: 'infographic', exportName: 'bulletproof-ai-system' },
  'bulletproof-ai-v2': { label: 'Bullet-Proof AI System V2', type: 'infographic', exportName: 'bulletproof-ai-system-v2' },
  'ai-os':             { label: 'What is an AI OS?',         type: 'infographic', exportName: 'ai-os' },
  'claude-design-wins':{ label: 'Claude Design - 5 Wins',    type: 'infographic', exportName: 'claude-design-wins' },
  mckinsey:            { label: 'McKinsey Carousel',         type: 'carousel',    exportName: 'mckinsey' },
  scheduleTasks:       { label: 'Schedule Tasks Carousel',   type: 'carousel',    exportName: 'scheduleTasks' },
  openclaw:            { label: 'OpenClaw 24/7 Agent Carousel', type: 'carousel', exportName: 'openclaw' },
  'ai-operating-system': { label: 'Build Your AI Operating System', type: 'carousel', exportName: 'ai-operating-system' },
  'ai-os-infographic':   { label: 'AI OS Infographic',   type: 'infographic', exportName: 'ai-os-infographic' },
  'yt-ai-design-system': {
    label: 'YT: AI Design System',
    type: 'pptx',
    exportName: 'yt-ai-design-system',
    deckFile: 'decks/yt-ai-design-system/deck.mjs',
    layoutFile: 'decks/yt-ai-design-system/layouts.mjs',
    pptxFile: 'YtAiDesignSystemSlides.pptx',
    previewSlug: 'YT - AI Design system',
  },
  'claude-code-business': {
    label: 'Claude Code Business',
    type: 'pptx',
    exportName: 'claude-code-business',
    deckFile: 'decks/claude-code-business/deck.mjs',
    layoutFile: 'decks/claude-code-business/layouts.mjs',
    pptxFile: 'ClaudeCodeBusinessSlides.pptx',
    previewSlug: 'Claude Code Business',
  },
}
