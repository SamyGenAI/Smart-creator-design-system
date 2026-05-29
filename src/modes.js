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
 * pptx modes only (also used by scripts/sync-pptx-previews.mjs):
 *   deckScript  — PptxGenJS script under design/pptx-slides/
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
  'claude-code': {
    label: 'Claude Code Setup (Slides)',
    type: 'pptx',
    exportName: 'claude-code-slides',
    deckScript: 'ClaudeCodeSlides.mjs',
    pptxFile: 'ClaudeCodeSlides.pptx',
    previewSlug: 'claude-code',
  },
}
