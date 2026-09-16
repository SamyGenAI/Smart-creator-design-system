---
name: infographics-designer
description: LinkedIn infographics (1080×1350). Canvas, components, tokens, layout, render — content-driven, single-pass.
---

# Smart Creator Infographic Skill

Produce 1080×1350 LinkedIn infographics in React, rendered to PNG via Playwright. Optional Figma push.

## Canvas

- Size: **1080 × 1350px**, fixed
- Inner column: 981px centered
- Background: canvas token (`InfographicCanvas` uses `bg-bg-canvas`) + the background texture chosen in the preview toolbar — do not add a texture yourself
- Footer: 60px fixed
- Header: flexible — allow 2-line title wrap, use `clamp()` for font sizing
- Row gap: 22px between sibling rows
- Card gap within a row: 17px standard, adjust to taste

## Components

In `components/` (repo root). Compose what fits; write raw CSS or new JSX for one-off layouts.

- `InfographicCanvas` — root wrapper with grid texture
- `InfographicHeader` / `InfographicFooter` — title block + 60px footer bar
- `BrandBorderSectionBase` — bordered section card with numbered header pill
- `PrimaryGlassSection` — frosted glass panel with brand header bar
- `IconBullet` — icon + text rows (up to 4)
- `NumberBullet` — numbered rows with indicator badges
- `Checklist` — checkmark rows
- `TextBox` — small accent pill / label
- `Table`, `ColoredTextBoxes`, `PastelShadowBorderCard`, `Grid8CompanyLogos` — structured content blocks
- `components/archetypes/*` — optional section patterns (callout, comparison, steps, etc.)

You may write new section layouts as plain JSX with Tailwind classes. There is no rule against it.

## Sections as mini-designs

Each section is its own mini design: pick its own inner pattern (icon-bullets, checklist, mini-SVG diagram, comparison strip, persona rows, …) and its own treatment (`BrandBorderSectionBase` theme or `PrimaryGlassSection`).

## Tokens & brand (no literals in JSX)

The system is **brand-agnostic**. Chroma and typefaces are owned only by **`DESIGN.md`** (YAML front matter) and the artifacts derived from it:

| Layer | Role |
|--------|------|
| **`DESIGN.md`** | Single source for **#hex** in the repo: `colors.*`, `typography.*`, `shadows.*`, `rounded.*`, etc. Consumed by `tailwind.config.js` (Tailwind theme) and must stay consistent with runtime CSS variables. |
| **`src/index.css`** | `:root` **CSS variables** (`--theme-*`, `--color/*`, `--font/*`, …) used by `components/` and infographic JSX. **Generated** from `DESIGN.md` by `pnpm design:sync` — never hand-edit the generated block (see [`skills/brand-setup/SKILL.md`](../brand-setup/SKILL.md)). |
| **`design/infographics/*.jsx`** | **Must not** contain `#hex`, `rgb()`, `hsl()`, named colors, or hardcoded `fontFamily: 'Some Font'`. Use Tailwind token classes (`bg-bg-canvas`, `text-text-primary`, …) and/or `var(--theme-…)`, `var(--color/…)`, `var(--font/family/title)` (escape slashes in Tailwind arbitrary values per `CLAUDE.md`). |

**Rebranding / new brand:** Use **`skills/brand-setup/SKILL.md`** (`/setup`, `@setup`): Track A (site + Firecrawl) or Track B (Theme Factory) → answers JSON piped into `node scripts/apply-brand-answers.mjs` → `pnpm design:sync` regenerates **`src/index.css`** → `pnpm design:validate`. Do not embed one-off brand colors in infographic files.

### Colour roles — brand fill vs text

The brand may be **light** (e.g. lime on white). Pick the role, never the raw brand:

| Token | Use for |
|---|---|
| `--theme-color-primary` | Brand **fill** — header bars, footer bar, filled chrome |
| `--theme-color-on-primary` | Text **and icons sitting on** that fill (derived by luminance) |
| `--theme-color-title` | Infographic/section **title text** (falls back to text colour on a light brand) |
| `--theme-color-text-primary` / `-secondary` / `-muted` | Body text on the canvas |

**Never** paint text with `--theme-color-primary`, and never assume white reads on the brand.

## Icons and illustrations

- Reusable icons: `assets/icons/*.svg` — prefer **`currentColor`** so `fill`/`stroke` inherit from CSS color.
- Reusable illustrations: `assets/illustrations/*.svg` — tokenize fills/strokes with `var(--theme-…)` / `var(--color/…)` where possible.
- **Inline SVG** in infographic JSX: every `fill`, `stroke`, and `color` must use **tokens** (`var(--theme-…)`, etc.) — same rule as the rest of the canvas. No literal chroma.

## Image-to-infographic workflow

When given a reference image and a new topic:

1. Identify the reference's structure: section count, columns, header treatment, footer
2. Identify each section's inner pattern (numbered list, table, icon grid, callout, etc.)
3. Map each pattern to an existing component, or write a new CSS class
4. Swap the reference's color treatment for **semantic** tokens (Tailwind classes from `DESIGN.md` theme and/or `var(--…)` from `src/index.css`) — never copy hex from the reference into JSX
5. Write the JSX in one pass
6. Render: `pnpm dev`, inspect, adjust if needed

## Title and typography

- Faces and sizes come from **`DESIGN.md`** `typography.*` (Tailwind `fontSize` / `fontFamily` keys from `tailwind.config.js`, and/or `var(--font\\/family\\/title)`, `var(--font\\/family\\/body)` from `src/index.css`). Do not hardcode font family names in infographic JSX.
- Title: allow up to 2 lines. Use `text-balance` and `clamp()` for font size. No character limit.
- Subtitle: optional, smaller, italic.
- Body: short lines, line-height 1.35–1.45.

## Layout

- Use CSS Grid for multi-card rows: `grid-template-columns: 1fr 1fr`
- Use `grid-auto-rows: 1fr` so cards equalize automatically
- Cards stretch to row height — don't set heights manually
- Empty space inside a card is a signal to recompose, not to pad

## Render

```bash
pnpm dev
# Then render to PNG via Playwright:
python render.py [InfographicName]
```

Output: 1080×1350 PNG at 2x device pixel ratio.

## Figma push (optional)

```bash
python push_to_figma.py [InfographicName]
```

Pushes the design to Figma via MCP. Run on demand, not on every change.

## Motion (opt-in, infographics only)

Animation is **off by default**. Only build an animated infographic when the
user's prompt asks for it (mentions animation, motion, or a GIF). Carousels,
newsletter thumbnails and slide decks have no motion layer.

### The one rule that governs everything

**Every animated style is a pure function of an integer frame number.** No CSS
keyframes, no `transition`, no `animation` property — those are not
deterministically seekable, so the GIF exporter would screenshot whatever frame
the compositor happened to be on and the result would jitter.

### The primitives

All of them come from one import:

```js
import {
  useCurrentFrame,   // → integer, 0-indexed
  useVideoConfig,    // → { fps, durationInFrames, width, height }
  interpolate,       // map a frame range onto a value range
  Easing,            // linear · quad · cubic · in/out/inOut
  spring,            // damped-harmonic value for natural appearances
  Sequence,          // offset the frame children see; hide them before it
  useInterpolateColors,
} from '../../components/shared/motion/index.js'
```

`interpolate` clamps both ends by default — unclamped values (opacity 1.4, a
negative scale) are the biggest source of broken-looking frames.

### Register the timeline

In `src/modes.js`, on the infographic's entry:

```js
'my-design': {
  label: 'My Design',
  type: 'infographic',
  exportName: 'my-design',
  animated: true,
  motion: { durationInFrames: 90, fps: 30 },   // 3s
},
```

That flag is what shows the transport row (play/pause + scrubber) and the GIF
**Download GIF** entry in the Export dropdown. Without it, that entry stays
visible but disabled, labelled "This design is not animated".

### THE LAST FRAME MUST BE THE FINISHED DESIGN

This is load-bearing, not a style note. Outside a `MotionProvider`,
`useCurrentFrame()` returns `durationInFrames - 1` — the final frame. That is
what makes an animated design still render correctly as a **static PNG**, in
`/api/export/png`, and in a **Figma push**, with no changes to any of those
paths.

So every animation must land on its finished value — opacity 1, no transform —
and **every element must be mounted and settled before the final frame**. Budget
for it: if the last element starts at frame 67 and takes 14 frames to arrive, it
is settled at 81, which fits inside a 90-frame timeline. Starting it at 76 would
not.

Springs settle asymptotically (0.99997, never exactly 1), which leaves a
sub-pixel scale on the final frame. Snap the tail:

```js
const SETTLE_EPSILON = 0.001
const settle = (v) => (v > 1 - SETTLE_EPSILON ? 1 : v)
const appear = settle(spring({ frame, fps, config: { damping: 18, stiffness: 150 } }))
```

### Worked example — a staggered list

`Sequence` offsets the frame its children see: a child at timeline frame 40
inside `from={30}` sees frame 10. That is the clean way to stagger, because each
row runs the *same* local animation and only its `from` differs.

```jsx
const STEP_STAGGER = 7
const ENTRY_FRAMES = 14

/** Shared entrance — finished (opacity 1, translate 0) at ENTRY_FRAMES. */
function useEntrance({ slideY = 0 } = {}) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, ENTRY_FRAMES], [0, 1], {
    easing: Easing.out(Easing.cubic),
  })
  const offset = interpolate(frame, [0, ENTRY_FRAMES], [1, 0], {
    easing: Easing.out(Easing.cubic),
  })
  return { opacity, transform: `translateY(${slideY * offset}px)` }
}

function StepRow({ n, text }) {
  const motion = useEntrance({ slideY: 18 })
  return <div style={{ display: 'flex', gap: 14, ...motion }}>{/* … */}</div>
}

// call site
{STEPS.map((s, i) => (
  <Sequence key={s.n} from={STEPS_FROM + i * STEP_STAGGER}>
    <StepRow n={s.n} text={s.text} />
  </Sequence>
))}
```

### Animating a colour

You cannot numerically interpolate `var(--theme-accent-1)`, and resolving it to
a hex literal would fail the token lint. So pass **token names** — they are
resolved at runtime and mixed in OKLab:

```js
const bg = useInterpolateColors(frame, [0, 30], ['--theme-accent-1', '--theme-color-primary'])
```

No chroma ever appears in source, so rebranding keeps working.

### Reference

`design/infographics/SocialListeningInfographic.jsx` is the worked reference —
staggered sources, spring connectors, spring hub nodes, staggered steps.
`design/infographics/GtmSystemInfographic.jsx` is the un-animated control.

### Export

The preview toolbar's **Export** dropdown offers **PNG** and **GIF**. GIF
always renders at **540×675** — not a choice: full 1080×1350 takes far longer
and the extra resolution does not survive GIF's 256-colour quantisation anyway.
Expect some banding for the same reason — glass and gradient surfaces will
posterise.

## What this skill does NOT enforce

- No character caps per component
- No pixel math for row heights
- No fill ratio checks before render
- No "every section must use a different visual treatment"
- No pre-flight planning headers
- No multi-agent handoff

## Agent

Use **`.claude/agents/infographic-design-agent.md`**, **`.cursor/agents/infographic-design-agent.md`**, or **`.codex/agents/infographic-design-agent.md`** for the end-to-end infographic workflow. That agent reads this skill, the prior infographics under `design/infographics/`, and the `components/` library, drafts the visual brief, waits for user approval, and then implements `design/infographics/[Name]Infographic.jsx` + registers it in `src/modes.js` / `src/App.jsx` in a single pass.
