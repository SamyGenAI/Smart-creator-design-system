import pptxgen from 'pptxgenjs'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { parseDesignMd } from '../../scripts/parse-design-md.mjs'
import { CREATOR_DISPLAY_NAME } from '../../src/creatorIdentity.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..')

// ── Brand tokens sourced from DESIGN.md ───────────────────────────────────────
const { resolved } = parseDesignMd(path.join(ROOT, 'DESIGN.md'))
const hex = (s) => String(s ?? '000000').replace('#', '').toUpperCase()

const C = resolved.colors
const TOK = {
  bg:       hex(C.bg.canvas),
  surface:  hex(C.bg.surface),
  brand:    hex(C.bg.brand),
  accent1:  hex(C.bg.accent['1']),
  accent2:  hex(C.bg.accent['2']),
  accent3:  hex(C.bg.accent['3']),
  accent4:  hex(C.bg.accent['4']),
  accent5:  hex(C.bg.accent['5']),
  text:     hex(C.text.primary),
  textSec:  hex(C.text.secondary),
  textMute: hex(C.text.muted),
  onBrand:  hex(C.text.onBrand),
}
const FONT = 'Montserrat'

// px → inch helpers (1280×720 template → LAYOUT_16x9)
const CANVAS = { wPx: 1280, hPx: 720, wIn: 10, hIn: 5.625 }
const xIn = (px) => (px / CANVAS.wPx) * CANVAS.wIn
const yIn = (px) => (px / CANVAS.hPx) * CANVAS.hIn
const wIn = (px) => (px / CANVAS.wPx) * CANVAS.wIn
const hIn = (px) => (px / CANVAS.hPx) * CANVAS.hIn
const pt = (px) => Math.round(px * 0.5625)

// ── Presentation setup ────────────────────────────────────────────────────────
const pres = new pptxgen()
pres.layout = 'LAYOUT_16x9'
pres.author = CREATOR_DISPLAY_NAME
pres.title  = 'Claude Code: From Setup to Business Value'

// Shadow factory: always return a fresh object — PptxGenJS mutates in place
const shadow = () => ({ type: 'outer', blur: 6, offset: 2, angle: 135, color: TOK.text, opacity: 0.15 })

// ─────────────────────────────────────────────────────────────────────────────
// Slide 1 — [Bookend: Hero] (dark, navy background)
// ─────────────────────────────────────────────────────────────────────────────
{
  const s = pres.addSlide()
  s.background = { color: TOK.brand }

  // Subtle glow orb (decorative)
  s.addShape(pres.shapes.OVAL, {
    x: 7.7, y: 0.675, w: 2.0, h: 1.5,
    fill: { color: TOK.accent1, transparency: 85 },
    line: { width: 0 },
  })

  // Badge pill
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 0.413, w: 1.6, h: 0.225,
    fill: { color: TOK.accent1 }, line: { width: 0 }, rectRadius: 0.1,
  })
  s.addText('PRACTICAL GUIDE', {
    x: 0.6, y: 0.413, w: 1.6, h: 0.225,
    fontSize: 10, fontFace: FONT, color: TOK.brand, bold: true,
    align: 'center', valign: 'middle', margin: 0,
  })

  // Main title
  s.addText('Claude Code', {
    x: 0.6, y: 0.75, w: 8.5, h: 0.638,
    fontSize: 48, fontFace: FONT, color: TOK.onBrand, bold: true, valign: 'middle',
  })

  // Subtitle
  s.addText('From Setup to Business Value', {
    x: 0.6, y: 1.463, w: 7.5, h: 0.375,
    fontSize: 22, fontFace: FONT, color: TOK.accent1, valign: 'middle',
  })

  // Description
  s.addText('A step-by-step guide for technical teams ready to ship faster with AI.', {
    x: 0.6, y: 1.95, w: 6.5, h: 0.45,
    fontSize: 14, fontFace: FONT, color: TOK.onBrand, valign: 'top',
  })

  // Terminal cursor lines (decorative motif)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.8, y: 0.975, w: 1.5, h: 0.09,
    fill: { color: TOK.accent1 }, line: { width: 0 },
  })
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.8, y: 1.11, w: 1.5, h: 0.09,
    fill: { color: TOK.accent2 }, line: { width: 0 },
  })
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.8, y: 1.245, w: 1.5, h: 0.09,
    fill: { color: TOK.accent3 }, line: { width: 0 },
  })

  // Bottom author bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.325, w: 10, h: 0.3,
    fill: { color: TOK.accent1 }, line: { width: 0 },
  })
  s.addText(CREATOR_DISPLAY_NAME, {
    x: 0.3, y: 5.325, w: 4.5, h: 0.3,
    fontSize: 10, fontFace: FONT, color: TOK.brand, bold: true, valign: 'middle',
  })
  s.addText('claude.ai/code', {
    x: 5.2, y: 5.325, w: 4.5, h: 0.3,
    fontSize: 10, fontFace: FONT, color: TOK.brand, align: 'right', valign: 'middle',
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide 2 — [Template: Header cards] — adapted two-column layout
// ─────────────────────────────────────────────────────────────────────────────
{
  const s = pres.addSlide()
  s.background = { color: TOK.bg }

  // Header band
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.525,
    fill: { color: TOK.brand }, line: { width: 0 },
  })
  s.addText('What is Claude Code?', {
    x: 0.6, y: 0, w: 9, h: 0.525,
    fontSize: 24, fontFace: FONT, color: TOK.onBrand, bold: true, valign: 'middle',
  })

  // Left: bold statement
  s.addText(
    'A terminal-native AI agent that reads your entire codebase and acts on it.',
    {
      x: 0.5, y: 0.75, w: 5.2, h: 0.9,
      fontSize: 18, fontFace: FONT, color: TOK.brand, bold: true, valign: 'top',
    }
  )

  // Left: feature rows with accent chips
  const featureRows = [
    { y: 1.406,  fill: TOK.accent1, text: 'Works in any terminal, no IDE required' },
    { y: 1.8,  fill: TOK.accent2, text: 'Reads, writes, and executes autonomously' },
    { y: 2.194,  fill: TOK.accent3, text: 'Built by Anthropic, powered by Claude 3.7' },
  ]
  for (const r of featureRows) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: r.y, w: 0.08, h: 0.262,
      fill: { color: r.fill }, line: { width: 0 },
    })
    s.addText(r.text, {
      x: 0.7, y: r.y, w: 5.0, h: 0.262,
      fontSize: 13, fontFace: FONT, color: TOK.textSec, valign: 'middle', margin: 0,
    })
  }

  // Right: three info cards with left-border accent
  const rCards = [
    { y: 0.563,  accent: TOK.accent1, title: 'Made for engineers',     body: 'CLI-first workflow, git-aware, no context switching.' },
    { y: 1.49, accent: TOK.accent2, title: 'Understands your repo',  body: 'Reads all files, not just the open tab.' },
    { y: 2.419,  accent: TOK.accent3, title: 'Ships real work',        body: 'Runs tests, commits, opens PRs.' },
  ]
  for (const c of rCards) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.2, y: c.y, w: 3.3, h: 1.125,
      fill: { color: TOK.surface }, shadow: shadow(), line: { width: 0 },
    })
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.2, y: c.y, w: 0.08, h: 1.125,
      fill: { color: c.accent }, line: { width: 0 },
    })
    s.addText(c.title, {
      x: 6.38, y: c.y + 0.09, w: 3.05, h: 0.262,
      fontSize: 13, fontFace: FONT, color: TOK.brand, bold: true, margin: 0,
    })
    s.addText(c.body, {
      x: 6.38, y: c.y + 0.398, w: 3.05, h: 0.6,
      fontSize: 11, fontFace: FONT, color: TOK.textMute, margin: 0,
    })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide 3 — [Template: Vertical timeline] — step 01
// ─────────────────────────────────────────────────────────────────────────────
{
  const s = pres.addSlide()
  s.background = { color: TOK.bg }

  // Header band
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.525,
    fill: { color: TOK.brand }, line: { width: 0 },
  })
  s.addText('Step 1: Install and Authenticate', {
    x: 0.6, y: 0, w: 9, h: 0.525,
    fontSize: 24, fontFace: FONT, color: TOK.onBrand, bold: true, valign: 'middle',
  })

  // Step circle
  s.addShape(pres.shapes.OVAL, {
    x: 0.5, y: 0.712, w: 0.7, h: 0.525,
    fill: { color: TOK.accent1 }, line: { width: 0 },
  })
  s.addText('01', {
    x: 0.5, y: 0.712, w: 0.7, h: 0.525,
    fontSize: 18, fontFace: FONT, color: TOK.brand, bold: true,
    align: 'center', valign: 'middle', margin: 0,
  })

  // Step heading
  s.addText('Get Claude Code running in under 3 minutes.', {
    x: 1.4, y: 0.788, w: 8.1, h: 0.375,
    fontSize: 18, fontFace: FONT, color: TOK.brand, bold: true, valign: 'middle',
  })

  // Code block background
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.388, w: 9.0, h: 1.125,
    fill: { color: TOK.brand }, shadow: shadow(), line: { width: 0 },
  })
  // Code text (rich text: comments in accent1 italic, commands in white)
  s.addText([
    { text: '# Install globally via npm',            options: { color: TOK.accent1, italic: true, breakLine: true } },
    { text: 'npm install -g @anthropic-ai/claude-code', options: { color: TOK.onBrand, breakLine: true } },
    { text: ' ',                                     options: { color: TOK.onBrand, breakLine: true } },
    { text: '# Launch Claude Code',                  options: { color: TOK.accent1, italic: true, breakLine: true } },
    { text: 'claude',                                options: { color: TOK.onBrand } },
  ], {
    x: 0.7, y: 1.463, w: 8.6, h: 0.975,
    fontSize: 13, fontFace: FONT, valign: 'top',
  })

  // Prerequisites label
  s.addText('Prerequisites:', {
    x: 0.5, y: 2.662, w: 3, h: 0.262,
    fontSize: 12, fontFace: FONT, color: TOK.brand, bold: true, valign: 'middle',
  })

  // Prerequisite pills
  const prereqs = [
    { x: 0.5,  w: 1.5, text: 'Node.js 18+',         fill: TOK.accent1 },
    { x: 2.15, w: 1.3, text: 'npm or npx',           fill: TOK.accent2 },
    { x: 3.6,  w: 1.9, text: 'Anthropic API key',    fill: TOK.accent3 },
  ]
  for (const p of prereqs) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: p.x, y: 2.985, w: p.w, h: 0.24,
      fill: { color: p.fill }, line: { width: 0 }, rectRadius: 0.1,
    })
    s.addText(p.text, {
      x: p.x, y: 2.985, w: p.w, h: 0.24,
      fontSize: 11, fontFace: FONT, color: TOK.brand, align: 'center', valign: 'middle', margin: 0,
    })
  }

  // Auth instruction card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.338, w: 9.0, h: 0.862,
    fill: { color: TOK.surface }, shadow: shadow(), line: { width: 0 },
  })
  s.addText(
    'After launch, Claude Code will prompt for your API key. Get one at console.anthropic.com or claude.ai/code (Pro/Max plans include access).',
    {
      x: 0.7, y: 3.375, w: 8.6, h: 0.788,
      fontSize: 13, fontFace: FONT, color: TOK.textSec, valign: 'middle',
    }
  )

  // Tip note
  s.addText(
    'Tip: Set ANTHROPIC_API_KEY as an env variable for persistent auth across sessions.',
    {
      x: 0.5, y: 4.313, w: 9, h: 0.3,
      fontSize: 11, fontFace: FONT, color: TOK.textMute, italic: true, valign: 'middle',
    }
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide 4 — [Template: Vertical timeline] — step 02
// ─────────────────────────────────────────────────────────────────────────────
{
  const s = pres.addSlide()
  s.background = { color: TOK.bg }

  // Header band
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.525,
    fill: { color: TOK.brand }, line: { width: 0 },
  })
  s.addText('Step 2: Configure Your Environment', {
    x: 0.6, y: 0, w: 9, h: 0.525,
    fontSize: 24, fontFace: FONT, color: TOK.onBrand, bold: true, valign: 'middle',
  })

  // Step circle
  s.addShape(pres.shapes.OVAL, {
    x: 0.5, y: 0.712, w: 0.7, h: 0.525,
    fill: { color: TOK.accent2 }, line: { width: 0 },
  })
  s.addText('02', {
    x: 0.5, y: 0.712, w: 0.7, h: 0.525,
    fontSize: 18, fontFace: FONT, color: TOK.brand, bold: true,
    align: 'center', valign: 'middle', margin: 0,
  })

  // Heading
  s.addText('Tell Claude Code about your project.', {
    x: 1.4, y: 0.788, w: 8.1, h: 0.375,
    fontSize: 18, fontFace: FONT, color: TOK.brand, bold: true, valign: 'middle',
  })

  // Left column: code block
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.388, w: 4.5, h: 1.875,
    fill: { color: TOK.brand }, shadow: shadow(), line: { width: 0 },
  })
  s.addText([
    { text: '# Set working directory',         options: { color: TOK.accent1, italic: true, breakLine: true } },
    { text: 'cd your-project/',                options: { color: TOK.onBrand, breakLine: true } },
    { text: ' ',                               options: { color: TOK.onBrand, breakLine: true } },
    { text: '# Ignore sensitive files',        options: { color: TOK.accent1, italic: true, breakLine: true } },
    { text: "echo '.env' >> .claudeignore",    options: { color: TOK.onBrand, breakLine: true } },
    { text: ' ',                               options: { color: TOK.onBrand, breakLine: true } },
    { text: '# Set project context',           options: { color: TOK.accent1, italic: true, breakLine: true } },
    { text: 'touch CLAUDE.md',                 options: { color: TOK.onBrand } },
  ], {
    x: 0.7, y: 1.463, w: 4.1, h: 1.725,
    fontSize: 12, fontFace: FONT, valign: 'top',
  })

  // Right column card 1: .claudeignore
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 1.388, w: 4.5, h: 0.862,
    fill: { color: TOK.surface }, shadow: shadow(), line: { width: 0 },
  })
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 1.388, w: 0.08, h: 0.862,
    fill: { color: TOK.accent2 }, line: { width: 0 },
  })
  s.addText('.claudeignore', {
    x: 5.38, y: 1.44, w: 4.15, h: 0.225,
    fontSize: 13, fontFace: FONT, color: TOK.brand, bold: true, margin: 0,
  })
  s.addText(
    'Like .gitignore for Claude. Keep secrets, large binaries, and generated files out of context.',
    {
      x: 5.38, y: 1.71, w: 4.15, h: 0.488,
      fontSize: 11, fontFace: FONT, color: TOK.textMute, margin: 0,
    }
  )

  // Right column card 2: CLAUDE.md
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 2.325, w: 4.5, h: 1.013,
    fill: { color: TOK.surface }, shadow: shadow(), line: { width: 0 },
  })
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 2.325, w: 0.08, h: 1.013,
    fill: { color: TOK.accent3 }, line: { width: 0 },
  })
  s.addText('CLAUDE.md', {
    x: 5.38, y: 2.378, w: 4.15, h: 0.225,
    fontSize: 13, fontFace: FONT, color: TOK.brand, bold: true, margin: 0,
  })
  s.addText(
    'Markdown file with project rules, architecture notes, and coding conventions Claude must follow.',
    {
      x: 5.38, y: 2.648, w: 4.15, h: 0.6,
      fontSize: 11, fontFace: FONT, color: TOK.textMute, margin: 0,
    }
  )

  // Bottom tip chips
  const tips = [
    {
      x: 0.5,  fill: TOK.accent1,
      text: 'Set CLAUDE.md once, share with team. Everyone gets the same Claude behavior.',
    },
    {
      x: 3.4,  fill: TOK.accent2,
      text: 'Add design system docs to CLAUDE.md for consistent code style.',
    },
    {
      x: 6.3,  fill: TOK.accent3,
      text: 'Use .claudeignore to prevent accidental exposure of credentials.',
    },
  ]
  for (const t of tips) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: t.x, y: 3.825, w: 2.7, h: 0.825,
      fill: { color: t.fill, transparency: 70 }, line: { width: 0 },
    })
    s.addText(t.text, {
      x: t.x + 0.09, y: 3.87, w: 2.46, h: 0.735,
      fontSize: 10, fontFace: FONT, color: TOK.brand, valign: 'middle',
    })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide 5 — [Template: Chevron process] — step 03
// ─────────────────────────────────────────────────────────────────────────────
{
  const s = pres.addSlide()
  s.background = { color: TOK.bg }

  // Header band
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.525,
    fill: { color: TOK.brand }, line: { width: 0 },
  })
  s.addText('Step 3: Run Your First Task', {
    x: 0.6, y: 0, w: 9, h: 0.525,
    fontSize: 24, fontFace: FONT, color: TOK.onBrand, bold: true, valign: 'middle',
  })

  // Step circle
  s.addShape(pres.shapes.OVAL, {
    x: 0.5, y: 0.712, w: 0.7, h: 0.525,
    fill: { color: TOK.accent3 }, line: { width: 0 },
  })
  s.addText('03', {
    x: 0.5, y: 0.712, w: 0.7, h: 0.525,
    fontSize: 18, fontFace: FONT, color: TOK.brand, bold: true,
    align: 'center', valign: 'middle', margin: 0,
  })

  // Heading
  s.addText('Natural language in, working code out.', {
    x: 1.4, y: 0.788, w: 8.1, h: 0.375,
    fontSize: 18, fontFace: FONT, color: TOK.brand, bold: true, valign: 'middle',
  })

  // Left panel: "You Type" (dark)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.388, w: 4.3, h: 1.8,
    fill: { color: TOK.brand }, line: { width: 0 },
  })
  s.addText('YOU TYPE', {
    x: 0.6, y: 1.478, w: 3.9, h: 0.225,
    fontSize: 10, fontFace: FONT, color: TOK.onBrand, bold: true, margin: 0,
  })
  s.addText(
    '"Fix the failing tests in the auth module and add error handling for null tokens."',
    {
      x: 0.6, y: 1.763, w: 3.9, h: 1.313,
      fontSize: 13, fontFace: FONT, color: TOK.onBrand, italic: true, valign: 'top',
    }
  )

  // Arrow
  s.addText('\u2192', {
    x: 4.78, y: 1.95, w: 0.5, h: 0.375,
    fontSize: 24, fontFace: FONT, color: TOK.accent3, align: 'center', valign: 'middle',
  })

  // Right panel: "Claude Does" (light green tint)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 1.388, w: 4.3, h: 1.8,
    fill: { color: TOK.accent2, transparency: 70 },
    line: { color: TOK.accent2, width: 1 },
  })
  s.addText('CLAUDE DOES', {
    x: 5.4, y: 1.478, w: 3.9, h: 0.225,
    fontSize: 10, fontFace: FONT, color: TOK.brand, bold: true, margin: 0,
  })
  s.addText([
    { text: 'Reads all test files and auth module',  options: { bullet: true, breakLine: true } },
    { text: 'Identifies 3 failing assertions',       options: { bullet: true, breakLine: true } },
    { text: 'Patches auth.js with null checks',      options: { bullet: true, breakLine: true } },
    { text: 'Re-runs tests: 14/14 pass',             options: { bullet: true } },
  ], {
    x: 5.4, y: 1.763, w: 3.9, h: 1.313,
    fontSize: 12, fontFace: FONT, color: TOK.textSec, valign: 'top',
  })

  // Starter tasks section
  s.addText('Try these starter tasks:', {
    x: 0.5, y: 3.375, w: 9, h: 0.3,
    fontSize: 13, fontFace: FONT, color: TOK.brand, bold: true, valign: 'middle',
  })
  const starterChips = [
    { x: 0.5, w: 2.5,  text: 'Write a unit test for X',   fill: TOK.accent1 },
    { x: 3.3, w: 2.5,  text: 'Refactor this function',    fill: TOK.accent2 },
    { x: 6.1, w: 2.95, text: 'Generate JSDoc comments',   fill: TOK.accent3 },
  ]
  for (const c of starterChips) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: c.x, y: 3.787, w: c.w, h: 0.285,
      fill: { color: c.fill }, line: { width: 0 }, rectRadius: 0.1,
    })
    s.addText(c.text, {
      x: c.x, y: 3.787, w: c.w, h: 0.285,
      fontSize: 11, fontFace: FONT, color: TOK.brand, align: 'center', valign: 'middle', margin: 0,
    })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide 6 — [Template: Navy glass cards 4] — 2×2 use-case grid
// ─────────────────────────────────────────────────────────────────────────────
{
  const s = pres.addSlide()
  s.background = { color: TOK.brand }

  s.addText('Business Use Cases: Engineering', {
    x: 0.6, y: 0.188, w: 9, h: 0.45,
    fontSize: 28, fontFace: FONT, color: TOK.onBrand, bold: true, valign: 'middle',
  })
  s.addText('Where Claude Code pays back fastest for dev teams.', {
    x: 0.6, y: 0.638, w: 9, h: 0.3,
    fontSize: 13, fontFace: FONT, color: TOK.accent1, valign: 'middle',
  })

  // 2x2 card grid
  const engCards = [
    {
      x: 0.45, y: 1.05, accent: TOK.accent1,
      title: 'Code Review at Scale',
      body:  'Claude reviews every PR for logic errors, missing tests, and style violations. Ships in parallel with your team.',
      stat:  '3x faster reviews',
    },
    {
      x: 5.25, y: 1.05, accent: TOK.accent2,
      title: 'Test Generation',
      body:  'Describe a function, get full test suites. Covers edge cases human reviewers miss.',
      stat:  '80% test coverage baseline',
    },
    {
      x: 0.45, y: 3.075, accent: TOK.accent3,
      title: 'Codebase Onboarding',
      body:  'New hire asks Claude to explain any module, trace data flows, or map dependencies instantly.',
      stat:  'Day 1 productivity',
    },
    {
      x: 5.25, y: 3.075, accent: TOK.accent4,
      title: 'Bug Triage and Fix',
      body:  'Paste a stack trace. Claude locates the root cause, proposes a patch, and opens a PR.',
      stat:  'Minutes not hours',
    },
  ]

  for (const c of engCards) {
    // White card
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: c.y, w: 4.3, h: 1.875,
      fill: { color: TOK.surface }, shadow: shadow(), line: { width: 0 },
    })
    // Top accent bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: c.y, w: 4.3, h: 0.06,
      fill: { color: c.accent }, line: { width: 0 },
    })
    // Title
    s.addText(c.title, {
      x: c.x + 0.112, y: c.y + 0.12, w: 4.0, h: 0.262,
      fontSize: 14, fontFace: FONT, color: TOK.brand, bold: true, margin: 0,
    })
    // Body
    s.addText(c.body, {
      x: c.x + 0.112, y: c.y + 0.42, w: 4.0, h: 0.9,
      fontSize: 12, fontFace: FONT, color: TOK.textMute, valign: 'top', margin: 0,
    })
    // Stat chip (pill at card bottom)
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: c.x + 0.112, y: c.y + 1.485, w: 2.8, h: 0.225,
      fill: { color: c.accent }, line: { width: 0 }, rectRadius: 0.1,
    })
    s.addText(c.stat, {
      x: c.x + 0.112, y: c.y + 1.485, w: 2.8, h: 0.225,
      fontSize: 10, fontFace: FONT, color: TOK.brand, bold: true,
      align: 'center', valign: 'middle', margin: 0,
    })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide 7 — [Template: Icon columns 3] — three team columns
// ─────────────────────────────────────────────────────────────────────────────
{
  const s = pres.addSlide()
  s.background = { color: TOK.bg }

  // Header band
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.525,
    fill: { color: TOK.brand }, line: { width: 0 },
  })
  s.addText('Business Use Cases: Beyond Engineering', {
    x: 0.6, y: 0, w: 9, h: 0.525,
    fontSize: 24, fontFace: FONT, color: TOK.onBrand, bold: true, valign: 'middle',
  })
  s.addText('Non-engineering teams unlock value faster than you expect.', {
    x: 0.5, y: 0.563, w: 9, h: 0.262,
    fontSize: 12, fontFace: FONT, color: TOK.textSec, valign: 'middle',
  })

  // 3-column card layout
  const cols = [
    {
      cardX: 0.45, circleX: 0.9,  fill: TOK.accent1, icon: 'P',
      title:   'Product and Ops',
      bullets: [
        'Draft PRDs and specs',
        'Run SQL queries via natural language',
        'Automate repetitive scripts',
        'Parse and summarize logs',
      ],
      chip: 'No SQL skills required',
    },
    {
      cardX: 3.55, circleX: 4.0, fill: TOK.accent2, icon: 'D',
      title:   'Data and Analytics',
      bullets: [
        'Build Python data pipelines',
        'Clean and transform datasets',
        'Generate chart scaffolding',
        'Explain complex queries',
      ],
      chip: '10x faster pipeline setup',
    },
    {
      cardX: 6.65, circleX: 7.1, fill: TOK.accent3, icon: 'S',
      title:   'Security and Compliance',
      bullets: [
        'Audit dependency vulnerabilities',
        'Generate security checklists',
        'Review config for misconfigs',
        'Draft policy documentation',
      ],
      chip: 'Continuous audit coverage',
    },
  ]

  for (const col of cols) {
    // Card
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.cardX, y: 0.862, w: 2.9, h: 3.15,
      fill: { color: TOK.surface }, shadow: shadow(), line: { width: 0 },
    })
    // Icon circle
    s.addShape(pres.shapes.OVAL, {
      x: col.circleX, y: 0.975, w: 0.8, h: 0.6,
      fill: { color: col.fill }, line: { width: 0 },
    })
    s.addText(col.icon, {
      x: col.circleX, y: 0.975, w: 0.8, h: 0.6,
      fontSize: 16, fontFace: FONT, color: TOK.brand, bold: true,
      align: 'center', valign: 'middle', margin: 0,
    })
    // Title
    s.addText(col.title, {
      x: col.cardX + 0.075, y: 1.688, w: 2.7, h: 0.338,
      fontSize: 13, fontFace: FONT, color: TOK.brand, bold: true, valign: 'middle',
    })
    // Thin separator
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.cardX, y: 2.063, w: 2.9, h: 0.038,
      fill: { color: col.fill }, line: { width: 0 },
    })
    // Bullet list
    s.addText(
      col.bullets.map((b, i) => ({
        text: b,
        options: { bullet: true, breakLine: i < col.bullets.length - 1 },
      })),
      {
        x: col.cardX + 0.075, y: 2.138, w: 2.7, h: 1.35,
        fontSize: 11, fontFace: FONT, color: TOK.textMute, valign: 'top',
      }
    )
    // Bottom chip
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: col.cardX + 0.075, y: 3.69, w: 2.7, h: 0.225,
      fill: { color: col.fill }, line: { width: 0 }, rectRadius: 0.1,
    })
    s.addText(col.chip, {
      x: col.cardX + 0.075, y: 3.69, w: 2.7, h: 0.225,
      fontSize: 10, fontFace: FONT, color: TOK.brand, bold: true,
      align: 'center', valign: 'middle', margin: 0,
    })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide 8 — [Bookend: CTA] — stats and next steps
// ─────────────────────────────────────────────────────────────────────────────
{
  const s = pres.addSlide()
  s.background = { color: TOK.brand }

  // Title and subtitle
  s.addText('Start Today', {
    x: 0.6, y: 0.225, w: 9, h: 0.488,
    fontSize: 36, fontFace: FONT, color: TOK.onBrand, bold: true, valign: 'middle',
  })
  s.addText('Three numbers. Three steps.', {
    x: 0.6, y: 0.788, w: 9, h: 0.3,
    fontSize: 14, fontFace: FONT, color: TOK.accent1, valign: 'middle',
  })

  // Left: three stat blocks
  const stats = [
    { y: 0.872, number: '10 min', label: 'to your first completed task' },
    { y: 1.772, number: '40%',    label: 'faster code reviews on average' },
    { y: 2.672, number: 'Zero',   label: 'IDE dependency. Works in any terminal.' },
  ]
  for (const st of stats) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: st.y, w: 4.5, h: 1.013,
      fill: { color: TOK.surface, transparency: 88 }, line: { width: 0 },
    })
    s.addText(st.number, {
      x: 0.7, y: st.y + 0.112, w: 4.1, h: 0.413,
      fontSize: 32, fontFace: FONT, color: TOK.accent3, bold: true, valign: 'middle',
    })
    s.addText(st.label, {
      x: 0.7, y: st.y + 0.563, w: 4.1, h: 0.338,
      fontSize: 12, fontFace: FONT, color: TOK.onBrand, valign: 'middle',
    })
  }

  // Right: action steps
  s.addText('Your next 3 steps:', {
    x: 5.3, y: 1.163, w: 4.2, h: 0.3,
    fontSize: 16, fontFace: FONT, color: TOK.onBrand, bold: true, valign: 'middle',
  })

  const actionSteps = [
    { y: 1.181, n: '1',
      title: 'Install Claude Code',
      sub:   'npm install -g @anthropic-ai/claude-code',
    },
    { y: 1.8, n: '2',
      title: 'Run one real task',
      sub:   'Pick a ticket from your backlog and try it now.',
    },
    { y: 2.419, n: '3',
      title: 'Share CLAUDE.md',
      sub:   'Add your conventions and roll it out to the team.',
    },
  ]

  for (const st of actionSteps) {
    // Numbered circle
    s.addShape(pres.shapes.OVAL, {
      x: 5.3, y: st.y, w: 0.45, h: 0.338,
      fill: { color: TOK.accent1 }, line: { width: 0 },
    })
    s.addText(st.n, {
      x: 5.3, y: st.y, w: 0.45, h: 0.338,
      fontSize: 14, fontFace: FONT, color: TOK.brand, bold: true,
      align: 'center', valign: 'middle', margin: 0,
    })
    // Step title
    s.addText(st.title, {
      x: 5.88, y: st.y, w: 3.6, h: 0.225,
      fontSize: 14, fontFace: FONT, color: TOK.onBrand, bold: true, valign: 'middle', margin: 0,
    })
    // Step body
    s.addText(st.sub, {
      x: 5.88, y: st.y + 0.248, w: 3.6, h: 0.375,
      fontSize: 11, fontFace: FONT, color: TOK.accent1, valign: 'top',
    })
  }

  // Bottom bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.325, w: 10, h: 0.3,
    fill: { color: TOK.accent1 }, line: { width: 0 },
  })
  s.addText('claude.ai/code', {
    x: 0, y: 5.325, w: 10, h: 0.3,
    fontSize: 11, fontFace: FONT, color: TOK.brand, bold: true, align: 'center', valign: 'middle',
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// Write output
// ─────────────────────────────────────────────────────────────────────────────
const outDir = path.join(ROOT, 'design', 'pptx-slides', 'output')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
const outFile = path.join(outDir, 'ClaudeCodeSlides.pptx')

await pres.writeFile({ fileName: outFile })
console.log(`Exported: ${path.relative(ROOT, outFile)}`)
