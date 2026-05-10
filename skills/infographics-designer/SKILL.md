---
name: infographics-designer
description: LinkedIn infographics (1080×1350). Canvas, components, tokens, layout, render — content-driven, single-pass.
---

# Smart Creator Infographic Skill

Produce 1080×1350 LinkedIn infographics in React, rendered to PNG via Playwright. Optional Figma push.

## Canvas

- Size: **1080 × 1350px**, fixed
- Inner column: 981px centered
- Background: canvas token (`InfographicCanvas` uses `bg-bg-canvas`) + `SquareGridTexture` at **5%**
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
| **`src/index.css`** | `:root` **CSS variables** (`--theme-*`, `--color/*`, `--font/*`, …) used by `components/` and infographic JSX. After brand onboarding, **sync** variables when the palette changes (see [`skills/brand-setup/SKILL.md`](../brand-setup/SKILL.md) — `apply-brand-answers`, validation, Done checklist). |
| **`design/infographics/*.jsx`** | **Must not** contain `#hex`, `rgb()`, `hsl()`, named colors, or hardcoded `fontFamily: 'Some Font'`. Use Tailwind token classes (`bg-bg-canvas`, `text-text-primary`, …) and/or `var(--theme-…)`, `var(--color/…)`, `var(--font/family/title)` (escape slashes in Tailwind arbitrary values per `CLAUDE.md`). |

**Rebranding / new brand:** Use **`skills/brand-setup/SKILL.md`** (`/setup`, `@setup`): Track A (site + Firecrawl) or Track B (Theme Factory) → `tmp/brand-answers.json` → `node scripts/apply-brand-answers.mjs` → align **`src/index.css`** with the updated semantic roles → `pnpm design:validate`. Do not embed one-off brand colors in infographic files.

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

## What this skill does NOT enforce

- No character caps per component
- No pixel math for row heights
- No fill ratio checks before render
- No "every section must use a different visual treatment"
- No pre-flight planning headers
- No multi-agent handoff

## Agent

Use **`.claude/agents/design-agent.md`** or **`.cursor/agents/design-agent.md`** for the one-pass infographic workflow (read this skill first, then implement `design/infographics/[Name]Infographic.jsx` + `src/App.jsx`).
