# Slide Templates — Smart Creator

Canonical layout library for PowerPoint decks. Every **content slide** must map to one of the 15 templates below. Hero and CTA bookends use dedicated layouts in `design/pptx-slides/layouts/`.

## Single source (preview + .pptx)

One deck definition drives **both** the live browser preview and the downloadable `.pptx`:

```
decks/[slug]/deck.mjs     ← agents edit this (content + layout picks)
        ↓
layouts/*.mjs             ← geometry written once per template
        ↓
runtime/render-react.jsx  → PptxSlideViewer (browser)
runtime/render-pptx.mjs   → output/*.pptx (PowerPoint)
```

**No separate JSX and `.mjs` slide files.** Preview and export share the same scene graph.

---

## Files

| File | Purpose |
|------|---------|
| `decks/[slug]/deck.mjs` | **Single source** — `meta` + `slides[{ layout, props }]` |
| `decks/[slug]/export.mjs` | Thin Node script → writes `output/[Name].pptx` |
| `layouts/*.mjs` | One layout per template/bookend; exports `build(props) → scene` |
| `runtime/` | Scene IR, dual renderers, token resolution, layout registry |
| `templates/slideTemplates.html` | Visual reference — open in browser to inspect layouts |
| `templates/slideTemplates.manifest.json` | Catalog (ids, slot counts) — use for brief **Template:** lines |

Regenerate the manifest after HTML changes:

```bash
node scripts/extract-slide-template-manifest.mjs
```

---

## Canvas

Templates are **1280×720 px** / **10 × 5.625 in**. Decks use **`LAYOUT_16x9`**.

Scene nodes use **inches** for `x`, `y`, `w`, `h` and **fontPx** (1280-canvas px) for text. The runtime converts for each backend:

- PptxGenJS: `pt(fontPx)` for font size, inches for position
- React: `xPx(inches)` for position, `fontPx` as CSS px

---

## Token mapping

Layouts use **semantic token keys** (`brand`, `accent1`, `textSec`, …). The runtime resolves them:

| Backend | Resolution |
|---------|------------|
| `.pptx` | `parseDesignMd` → bare 6-char hex |
| Browser | `tok-css.mjs` → CSS variables from `src/index.css` |

Never put raw hex in `deck.mjs` or layout files.

---

## Template picker

| # | Label | Slots | Best for |
|---|-------|-------|----------|
| 1 | Venn 2-circle | 3 regions, 3 legend items | Overlap, comparison, shared traits |
| 2 | Donut chart | 3 segments | Market share, budget split |
| 3 | Iceberg | 3 visible + 3 hidden | Surface vs root cause |
| 4 | Pyramid | 4 tiers | Hierarchy, maturity model |
| 5 | Pie chart | 3 segments | Simple three-part distribution |
| 6 | Vertical timeline | 3 steps | Roadmap, phased rollout |
| 7 | Header cards | 3 cards | Three pillars or value props |
| 8 | Cascade boxes | 3 boxes | Waterfall logic, cause chain |
| 9 | Badge cards | 3 numbered cards | Ranked tips, priorities |
| 10 | Chevron process | 3 steps | Linear workflow, funnel stages |
| 11 | Icon columns 3 | 3 icon columns | Three benefits with icons |
| 12 | Icon columns 6 | 6 icon columns | Feature grid, six-item checklist |
| 13 | Venn 3-circle | 3 circles, 4 regions | Three-way comparison |
| 14 | Navy glass cards 3 | 3 glass cards | Premium cards on brand bg |
| 15 | Navy glass cards 4 | 4 glass cards | Four KPIs or quadrants on brand bg |

Catalog layouts live in `layouts/` (add as needed). Bookends: `bookend.hero`, `bookend.chapter-divider`. Custom one-offs get a dedicated layout file.

---

## Workflow

1. Read `slideTemplates.manifest.json` and open `slideTemplates.html` in a browser.
2. From the approved brief, assign each slide `{ layout, props }` in `deck.mjs`.
3. If no layout exists for a template, add `layouts/[name].mjs` and register in `runtime/registry.mjs`.
4. **Vary templates** across the deck — no two consecutive content slides use the same template.
5. Register in `src/modes.js` + `src/App.jsx` via `DeckPreview`.

### Slot mismatch rules

When content has fewer items than the template:

- **Delete** unused slots — do not leave placeholder text.
- **Never** ship "Icon title N", "Description N", "Card title N", or "Item N".

When content has more items than the template:

- Split across two slides using different templates, or trim to the strongest N items.

---

## Browser preview + screenshots

`DeckPreview` + `PptxSlideViewer` render all slides in the DOM (`data-name="pptx-slide"`).

```bash
pnpm dev
pnpm screenshot [mode-key]           # QA PNGs → qc-screenshots/
pnpm screenshot [mode-key] --preview # JPGs → public/screenshots/powerpoint/[slug]/
```

Playwright targets `[data-name="pptx-slide"]` — toggles visibility in the DOM, no navigation clicking.

---

## Example deck entry

```js
// design/pptx-slides/decks/my-topic/deck.mjs
export const meta = { title: 'My Topic', author: CREATOR_DISPLAY_NAME, layout: 'LAYOUT_16x9' }

export const slides = [
  {
    layout: 'bookend.hero',
    props: { title: 'My Topic', subtitle: 'One line hook.', author: CREATOR_DISPLAY_NAME },
  },
  {
    layout: 'icon-columns-3',  // when layout is implemented
    props: {
      title: 'Three benefits',
      columns: [
        { icon: 'assets/icons/…', title: 'Fast', description: '…' },
        // …
      ],
    },
  },
]
```

---

## Brief integration

For **Slides** format, the design brief must include a **Template:** line on every content slide:

```
**Slide 3 — Three core benefits**
Template: Icon columns 3
Content: …
```

Hero and CTA slides omit **Template:** (bookends).
