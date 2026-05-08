---
name: carousel-designer
description: Design and generate LinkedIn carousels (multi-slide, 1080×1350px each) using the Smart Creator Design System. Use when the user asks to create, design, or build a LinkedIn carousel, slide deck, or swipeable post. Triggers on requests like "make a carousel about...", "create a LinkedIn carousel on...", "design a swipeable post about...", "build a carousel for...", or any multi-slide visual content for LinkedIn.
---

# Carousel Designer — Copy-First Workflow

This skill uses **three specialized agents** in sequence. Content drives layout — never the other way around.

```
User topic → carousel-copy-agent → carousel-design-agent → carousel-qc-agent → Done
```

---

## Carousel Structure (Always 5 slide types)

Every carousel follows this fixed narrative arc:

| # | Slide type | Purpose |
|---|-----------|---------|
| 1 | **Cover** | Bold title + subtitle + illustration. Hook the reader. |
| 2–3 | **Story** (2–3 slides) | Tell a story. Short punchy text + illustration. Spark curiosity BEFORE the how-to. |
| 4–5 | **Context** (1–2 slides) | State the problem and why it matters to the audience. |
| 6–N | **Step-by-step** (3–6 slides) | Numbered steps. One key action per slide. |
| N+1 | **Wrap-up / Bonus** (1 slide) | Summary insight, tips, or a bonus list. |
| Last | **CTA** | Profile photo + "Follow for more" + name. |

Minimum: 7 slides. Maximum: 20 slides.

> **Story slides rule:** A carousel must tell a story. Always insert 2–3 story slides between the Cover and the Context/Steps. Each story slide has very short text (1 sentence max) + a relevant illustration. The goal is to create tension and spark curiosity before the practical content. Never jump straight from cover to step-by-step.

---

## Step 1 — Carousel Copy Agent

Delegate to the `carousel-copy-agent` subagent with the user's topic.

**Input:** The user's topic (e.g. "5 AI tools every marketer should use")

**Output:** A structured JSON content brief:
- `topic`, `authorName` (default "Samy Chouaf")
- `slides[]` — one object per slide with `type`, `title`, `subtitle`, `body`, `stepNumber`
- `charReport` — character counts vs. limits for every text field

**Present the copy brief to the user and wait for approval before proceeding.**

---

## Step 2 — Carousel Design Agent

Delegate to the `carousel-design-agent` subagent with the approved brief.

**Input:** The approved JSON content brief from Step 1

**Output:**
- `design/carousels/[Name]Carousel.jsx` — complete carousel with all slides as JSX
- Updated `src/App.jsx` — imports the new carousel

**Each slide is an independent 1080×1350px panel.** The root component renders them side by side with `gap: 88px` (matching `design/carousels/LinkedInCarousel.jsx` pattern).

---

## Step 3 — Carousel QC Agent

Delegate to the `carousel-qc-agent` subagent to verify the output.

**Input:** Path to the design file from Step 2

**Output:** PASS/FAIL report for each check:
1. Slide count (7–20 slides)
2. Slide order matches structure (Cover → Context → Steps → Wrap-up → CTA)
3. Every slide is exactly 1080×1350px
4. Navbar on every non-CTA, non-Cover slide (name left, "Follow" right, divider at y=83)
5. Cover has: illustration, bold title (≤50 chars), subtitle, accent pill
6. Step slides numbered sequentially from 1
7. CTA slide has: circular avatar, "Follow for more", author name
8. Character limits respected (see `references/slide-types.md`)
9. No overflowing text (placeholders are OK for screenshots)

**If QC fails:** Fix issues and re-run until all checks pass.

---

## Visual Language

- **Canvas:** 1080×1350px, tokenized canvas background (`var(--theme-surface-canvas)`), design-system title font
- **Navbar:** author name left (24px/500), "Follow" right, 3px divider line at y=83 using semantic text token
- **Shared primitives:** use `components/CarouselPrimitives.jsx` (`CarouselNavbarEdge` / `CarouselNavbarCentered` / `CarouselSlideShell`) instead of redefining navbar/shell in each file
- **Accent pill:** semantic accent token (`var(--theme-accent-1)`) behind key text
- **Cards:** tokenized surface/text/shadow values (no hardcoded color literals)
- **Illustrations:** `assets/illustrations/notion-style/oc-*.svg`
- **Avatar (CTA):** `assets/avatar/avatar-profile.png`

See `references/slide-types.md` for per-slide layout specs and character limits.

---

## After QC Passes

1. Run `pnpm dev` and verify visually in the browser
2. Optionally push to Figma: `mcp__figma__generate_figma_design` (push-to-edit flow)
3. Target page: **Carousels (181:417)**

---

## Core Design Laws (Skill-Specific)

1. **One idea per slide.** Each slide communicates exactly one thought.
2. **Step slides are numbered.** Large `1.` prefix (64px, 500 weight) top-left - not a bullet list.
3. **Context slides center the copy.** No step number. Set the scene.
4. **CTA slide is always last.** Circular avatar + "Follow for more" + name.
5. **Illustrations anchor the cover and CTA.** Step slides use screenshots or minimal decoration.
6. **AccentPill highlights the key phrase.** One per slide, behind the most important 2-5 words.
7. **Screen placeholders are valid.** Use `ScreenPlaceholder` for step slides where a screenshot will go.
8. **NEVER use em dashes (—).** Replace with a comma instead. Em dashes are banned from all slide copy and code strings.
9. **Navbar uses flexbox, not pixels.** The Navbar must be a full-width flex container (`justify-content: space-between`) with padding, so "Samy Chouaf" and "Follow" always sit at the extremities and stay inside the slide.
10. **Cover slide has no Navbar.** Only context, step, wrap-up slides get the navbar. CTA and Cover both skip it.
11. **Content screenshots live in `public/screenshots/carousels/{post-slug}/`.** Reference them in JSX as `/screenshots/carousels/{post-slug}/step-1.png`. Vite serves `public/` at the site root. Never use relative paths like `../`.
12. **QC screenshots are separate.** `pnpm screenshot <mode-key>` writes to `qc-screenshots/` (git-ignored). Never reference QC output from JSX — it's for visual QC only.
13. **Vite port** — defaults to 5173 but falls back to 5174 if taken. Always check the terminal output for the actual URL.
14. **Follow global operational rules from `CLAUDE.md`.** This includes Figma push behavior/account scope and image containment rules.
