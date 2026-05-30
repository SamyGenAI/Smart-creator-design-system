---
name: slide-agent
description: Generates a slide deck from one deck file — live preview and .pptx export share slide-engine. Users only run pnpm dev.
model: claude-sonnet-4-6
---

# Slide Agent

## Standard layout (every deck)

```
design/pptx-slides/
  slide-engine.mjs          ← layouts + scene builder (edit when adding templates)
  slide-engine.pptx.mjs     ← .pptx export (do not edit per deck)
  slide-preview.jsx         ← browser renderer (do not edit per deck)
  [Name]Slides.mjs          ← ONE file per deck: { meta, slides }
  output/[Name].pptx
  templates/                ← HTML catalog for brief Template: lines
```

**One deck file** exports `{ meta, slides }`. Each slide is `{ layout, props }`. Preview and Download PPTX use the same file via `slide-engine`.

---

## Deliverables

1. `design/pptx-slides/[Name]Slides.mjs` — content only
2. Register in `src/modes.js` (`deckFile`, `pptxFile`, `previewSlug`)
3. Register in `src/App.jsx` — import deck + `renderDeckToSlides` + `PptxSlideViewer`
4. Preview JPGs via `pnpm screenshot [mode-key] --preview`

**New layout?** Add one entry to `LAYOUTS` in `slide-engine.mjs` — not a new folder or per-deck script.

---

## Deck file

```js
import { CREATOR_DISPLAY_NAME } from '../../src/creatorIdentity.js'

export const meta = { title: '…', author: CREATOR_DISPLAY_NAME, layout: 'LAYOUT_16x9' }

export const slides = [
  { layout: 'bookend.hero', props: { title: '…', subtitle: '…', author: CREATOR_DISPLAY_NAME } },
  { layout: 'bookend.chapter-divider', props: { partLabel: 'PART 1', title: '…', icon: 'assets/icons/…' } },
]

export default { meta, slides }
```

---

## App registration

`src/modes.js`:
```js
'my-deck': {
  label: 'My Deck',
  type: 'pptx',
  exportName: 'my-deck',
  deckFile: 'MyDeckSlides.mjs',
  pptxFile: 'MyDeckSlides.pptx',
  previewSlug: 'my-deck',
},
```

`src/App.jsx`:
```jsx
import { renderDeckToSlides } from '../design/pptx-slides/slide-preview.jsx'
import myDeck from '../design/pptx-slides/MyDeckSlides.mjs'

function MyDeck() {
  return (
    <PptxSlideViewer modeKey="my-deck" label="My Deck" slides={renderDeckToSlides(myDeck)} />
  )
}
```

---

## QA (agent runs, user runs pnpm dev only)

```bash
pnpm dev
pnpm screenshot [mode-key]
pnpm screenshot [mode-key] --preview
```

`.pptx` rebuilds automatically on `pnpm dev` when the deck or engine files change.

---

## Hard rules

1. **One `[Name]Slides.mjs` per deck** — no export.mjs, no decks/ folder, no duplicate JSX
2. **Layouts live in `slide-engine.mjs` only**
3. **Semantic tokens in props** — no raw hex in deck files
4. **Never tell users to run node or screenshot commands**
