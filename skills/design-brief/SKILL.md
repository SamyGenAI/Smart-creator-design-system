---
name: design-brief
description: Pre-flight skill that turns a user topic into a fully-formed, agent-drafted visual brief — layout, sections, titles, colors, illustrations — for user approval before any code is generated.
---

# Design Brief — Propose First, Ask Nothing

The goal is **zero friction for the user**. They give a topic. You propose a complete, opinionated brief. They say "looks good" or tweak one or two things. Then you build.

**Do not ask questions before drafting.** Read the topic, read `DESIGN.md` and `src/index.css` for the live brand tokens, then write the brief confidently. If something is genuinely ambiguous (e.g. the format was not stated), resolve it yourself with the most sensible default and note your assumption in the brief.

---

## Step 1 — Read the brand before writing anything

Before drafting, read:
- `DESIGN.md` — palette, accent colors, typography tokens, radii
- `src/index.css` — CSS variable names for the running token set

Use what you find. The brief must reference the actual brand tokens, not generic placeholders.

---

## Step 2 — Draft the full brief

Write a complete, concrete brief. Every field must be filled — no "TBD", no "depends on content". Be opinionated. The user will correct what they disagree with.

Use this structure:

---

### Brief format

```
## Design Brief — [Format]: [Proposed title]

**Format:** Infographic / Carousel / Slides
**Topic:** [one sentence]
**Audience:** [who will read this — infer from topic if not stated]
**Tone:** [e.g. Educational & clear / Bold & direct / Friendly & conversational]
**Key takeaway:** [the one thing the reader should remember or do]

---

### Layout & Structure

**[Section / Slide 1 title]**
Visual treatment: [e.g. PrimaryGlassSection with brand header bar]
Content: [2–4 bullet points or sentences describing what goes here]

**[Section / Slide 2 title]** *(Slides format only)*
Template: [exact `dataScreenLabel` from `design/pptx-slides/templates/slideTemplates.manifest.json`, e.g. `Icon columns 3` — assign one for every slide; only omit with a one-sentence justification when no catalog template truly fits]
Visual treatment: [e.g. 2-column card grid using PastelShadowBorderCard]
Content: [2–4 bullet points or sentences]

… (all sections/slides)

**Footer / CTA**
Content: [author name, tagline or CTA text]

---

### Visual design

**Background:** [token name, e.g. `bg-bg-canvas` (#fffceb)]
**Header bar:** [token name, e.g. `bg-bg-brand` (#092c69) with white title text]
**Accent colors used:** [list which accent tokens appear and where, e.g. accent-1 (#b4eaff) for step pills]
**Typography:** [title font token, body font token]
**Illustration(s):** [specific asset path(s) from assets/illustrations/ or assets/icons/, or "none"]
**Card style:** [e.g. PastelShadowBorderCard with subtle border / PrimaryGlassSection / BrandBorderSectionBase]

---

### Copy notes

[2–3 sentences on voice, vocabulary level, and anything specific to preserve from the user's original prompt]
```

---

## Step 3 — Present and wait for approval

After presenting the brief, write exactly one line:

> *Does this look right? Say "approved" to start building, or tell me what to change.*

Do not generate any files. Do not start the design agent. Wait.

---

## Step 4 — Route on approval

When the user approves (or approves with small edits), hand the **complete brief** to the correct agent — include every section, the visual design spec, and any verbatim source material the user provided.

| Format | Agent |
|--------|-------|
| Infographic | `infographic-design-agent` — single agent that owns the brief **and** the build. It reads `skills/infographics-designer/SKILL.md`, prior infographics, and the component library, drafts the brief, waits for approval, and writes `design/infographics/[Name]Infographic.jsx`. When the request is an infographic, you usually just delegate to it directly rather than drafting the brief in-chat. |
| Carousel | `carousel-copy-agent` → (JSON brief approval) → `carousel-design-agent` → `carousel-qc-agent` |
| Slides | `slide-agent` — single-source `decks/[slug]/deck.mjs` + `decks/[slug]/layouts.mjs`; preview and `.pptx` from the same deck definition; user runs `pnpm dev` only |

---

## Guardrails

- **No questions before the brief.** Draft first, ask nothing.
- **Use real token names.** Brief must reference actual CSS variable names and Tailwind token classes from `DESIGN.md` / `src/index.css` — not hex literals and not generic "blue" / "dark".
- **Templates first for slides.** In slide briefs, every slide must map to a catalog template unless you explicitly justify why no template fits; if a custom layout is needed, say which template it most closely adapts and what slot you are stretching or removing.
- **Prefer decomposition over invention.** If a slide feels awkward to template, split it into two slides or change the angle before inventing a new layout.
- **No invented facts.** If source material is thin, say so in "Copy notes" and note what content will be suggested during generation.
- **Illustrations must exist.** Only reference asset paths that exist under `assets/`. If unsure, list the closest match and note it as a suggestion.
- **One approval gate.** The design agent never starts before the user explicitly approves the brief.
