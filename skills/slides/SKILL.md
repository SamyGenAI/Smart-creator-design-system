---
name: slides
description: Generate a 16:9 presentation slide deck (1280x720px) using the Smart Creator Design System. Use when the user asks to create slides, a presentation, a slide deck, or a pitch. Triggers on "make slides about...", "create a presentation on...", "build a slide deck for...", "generate slides on...".
---

# Slides Designer — Single-Agent Workflow

This skill uses **one agent** that combines copy and design in a single pass. No separate copy brief approval step.

```
User topic -> slide-agent -> Done
```

---

## Slide Format

- **Canvas:** 1280x720px (16:9, standard Keynote / YouTube)
- **Background:** `#FFFCEB` (`--color/cream/300`) + SquareGridTexture at 60% opacity
- **Font:** Verdana
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
| 2-3 | `content` or `statement` | Context — why this matters |
| 4-N | `content`, `bullets`, `two-column` | Core content, one idea per slide |
| N+1 | `statement` or `quote` | Key insight or memorable pull-quote |
| Last | `end` | "Follow for more" CTA |

- Minimum 5 slides. Maximum 15 slides. Typical: 7-10.
- One idea per slide — never cram two topics.
- **Vary layouts across the deck** — never repeat the same layout for consecutive slides.

---

## Visual language

| Element | Value |
|---|---|
| Canvas background | `#FFFCEB` |
| Texture | SquareGridTexture opacity 0.60 |
| Card component | `SlideCard` from `components/SlideCard.jsx` |
| Card border-radius | 24px (default) |
| Card shadow | `0 8px 32px rgba(0,0,0,0.15)` |
| Card blur | `backdrop-filter: blur(12px)` |
| Navy title bars | `SlideCard variant="navy"` — `#092c69`, white text |
| Accent color | `#b4eaff` |
| Font | Verdana |
| Illustrations | `assets/illustrations/notion-style/oc-*.svg` |
| Avatar | `assets/avatar/avatar-profile.png` |
| Icons | `assets/icons/[category]/[name].svg` |

---

## Design principles (from PPTX skill)

The slide-agent has access to the official PPTX skill (`~/.agents/skills/pptx/`) for design best practices. Key principles:

### Storytelling
- **Build narrative tension.** Hook -> context -> insights -> memorable close.
- **One idea per slide.** Never combine topics.
- **Every slide needs a visual element.** Text-only slides are forgettable.

### Visual design
- **Vary layouts.** Don't repeat the same layout for consecutive slides. Mix cover, content, bullets, statement, two-column, quote.
- **Dominance over equality.** One element should dominate each slide.
- **Icons inside containers.** Never leave icons floating alone — they must be inside colored rounded shapes with shadows (handled by SlideBullets layout).
- **Leave breathing room.** Don't fill every inch. White space is a design tool.
- **Commit to a visual motif.** The design system provides accent pills, navy title bars, and glass cards — use them consistently.

### Avoid
- Don't repeat the same layout consecutively
- Don't create text-only slides
- Don't use accent lines under titles (hallmark of AI slides)
- Don't use low-contrast elements
- Don't center body text (left-align paragraphs, center only titles/statements)

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
8. **Vary layouts.** Never use the same layout for consecutive slides.
9. **Every slide needs a visual.** Illustrations, icons, or card variants — no bare text.
10. **Icons inside containers.** Never floating alone — always inside SlideCard or colored shape.
