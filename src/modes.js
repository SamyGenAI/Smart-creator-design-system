/**
 * Mode registry — single source of truth for design modes.
 *
 * Imported by both `src/App.jsx` (which adds the React component for each key)
 * and `vite.config.js` (which uses `type` to drive PNG/PDF export). When you add
 * a new design, register it here once.
 *
 * Fields:
 *   label       — display name in the top nav
 *   type        — 'infographic' | 'carousel' | 'slides' (drives canvas size)
 *   exportName  — file stem for downloads (no extension)
 *   slideCount  — optional, only for slide decks
 */
export const MODES = {
  'bulletproof-ai':    { label: 'Bullet-Proof AI System',    type: 'infographic', exportName: 'bulletproof-ai-system' },
  'bulletproof-ai-v2': { label: 'Bullet-Proof AI System V2', type: 'infographic', exportName: 'bulletproof-ai-system-v2' },
  'ai-os':             { label: 'What is an AI OS?',         type: 'infographic', exportName: 'ai-os' },
  'claude-design-wins':{ label: 'Claude Design - 5 Wins',    type: 'infographic', exportName: 'claude-design-wins' },
  igentivVSL:          { label: 'Igentiv VSL',               type: 'slides',      exportName: 'IgentivVSL' },
  mckinsey:            { label: 'McKinsey Carousel',         type: 'carousel',    exportName: 'mckinsey' },
  scheduleTasks:       { label: 'Schedule Tasks Carousel',   type: 'carousel',    exportName: 'scheduleTasks' },
  openclaw:            { label: 'OpenClaw 24/7 Agent Carousel', type: 'carousel', exportName: 'openclaw' },
  'ai-operating-system': { label: 'AI Operating System', type: 'carousel', exportName: 'ai-operating-system' },
}
