---
name: slides
description: Generate a 16:9 presentation slide deck (1280×720px) using the Smart Creator Design System. Use when the user asks to create slides, a presentation, a slide deck, or a pitch. Triggers on "make slides about...", "create a presentation on...", "build a slide deck for...", "generate slides on...".
---

# Slides Designer — Single-Agent Workflow

This skill uses **one agent** that combines copy and design in a single pass. No separate copy brief approval step.

```
User topic → slide-agent → Done
```

---

## Slide Format

- **Canvas:** 1280×720px (16:9, standard Keynote / YouTube)
- **Background:** `#EBDBBC` (`--color/cream/300`) + SquareGridTexture at 18% opacity
- **Font:** Montserrat throughout (no Noto Serif in slides)
- **Aesthetic:** Rounded cards, frosted glass, high-blur drop shadows

---

## Step 1 — Delegate to slide-agent

Spawn the `slide-agent` subagent with the user's topic.

The agent outputs:
1. `design/[TopicName]Slides.data.js` — pure JS data file (no JSX)
2. `design/[TopicName]Slides.jsx` — React deck component
3. Updated `src/App.jsx` — adds new deck to MODES with slide count

---

## Deck structure

| Slide | Layout | Purpose |
|---|---|---|
| 1 | `cover` | Hook: title + subtitle + illustration |
| 2–3 | `content` or `statement` | Context — why this matters |
| 4–N | `content`, `bullets`, `two-column` | Core content, one idea per slide |
| N+1 | `statement` or `quote` | Key insight or memorable pull-quote |
| Last | `end` | "Follow for more" CTA |

- Minimum 5 slides. Maximum 15 slides. Typical: 7–10.
- One idea per slide — never cram two topics.

---

## Visual language

| Element | Value |
|---|---|
| Canvas background | `#EBDBBC` |
| Texture | SquareGridTexture opacity 0.18 |
| Card component | `SlideCard` from `components/SlideCard.jsx` |
| Card border-radius | 24px (default) |
| Card shadow | `0 8px 32px rgba(0,0,0,0.15)` |
| Card blur | `backdrop-filter: blur(12px)` |
| Navy title bars | `SlideCard variant="navy"` — `#092c69`, white text |
| Accent color | `#b4eaff` |
| Font | Montserrat |
| Illustrations | `assets/illustrations/notion-style/oc-*.svg` |
| Avatar | `assets/avatar/avatar-profile.png` |
| Icons | `assets/icons/[category]/[name].svg` |

---

## After generation

1. Run `pnpm dev` — preview the deck in the slide viewer (arrows + dots)
2. Export to PPTX: `pnpm export-slides [TopicName]`
   - Output: `output/[TopicName]Slides.pptx`
3. Open in Keynote, add animations, record with Screen Studio

---

## Core design laws

1. **One idea per slide.** Never combine two topics in one slide.
2. **SlideCard wraps every content area.** No ad-hoc rounded divs.
3. **End slide is always last.** Never add content after the `end` layout.
4. **NEVER use em dashes.** Use a comma instead.
5. **data.js is pure JS.** No JSX, no React imports in the data file.
6. **Figma push — never auto-open the browser.** Share the URL, say "Please open in your browser."
7. **Slide count in MODES.** Always set `slideCount: SLIDE_DATA.slides.length` in App.jsx.
