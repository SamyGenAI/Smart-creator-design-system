# Slide Templates — Smart Creator

Canonical layout library for PowerPoint decks. Every **content slide** must map to one of the 15 templates below. Hero and CTA bookends are composed creatively on-brand.

## Files

| File | Purpose |
|------|---------|
| `design/pptx-slides/templates/slideTemplates.html` | Visual preview — open in a browser to inspect layouts |
| `design/pptx-slides/templates/slideTemplates.manifest.json` | Machine-readable catalog (read this first) |

Regenerate the manifest after HTML changes:

```bash
node scripts/extract-slide-template-manifest.mjs
```

---

## Canvas

Templates are **1280×720 px**. Decks use **`LAYOUT_16x9`** (10 in × 5.625 in).

Add these helpers to every deck script (after `TOK` / `FONT`):

```js
const CANVAS = { wPx: 1280, hPx: 720, wIn: 10, hIn: 5.625 }
const xIn = (px) => (px / CANVAS.wPx) * CANVAS.wIn
const yIn = (px) => (px / CANVAS.hPx) * CANVAS.hIn
const wIn = (px) => (px / CANVAS.wPx) * CANVAS.wIn
const hIn = (px) => (px / CANVAS.hPx) * CANVAS.hIn
const pt  = (px) => Math.round(px * 0.5625)  // 720px canvas → 5.625 in → 72 pt/in
```

Title anchor (from `.slide-title` in HTML): `xIn(72)`, `yIn(50)`, `pt(62)`, bold, `TOK.brand`.

---

## Token mapping

Use `TOK` and `FONT` from `parseDesignMd` — never raw hex in deck scripts.

| Template CSS var | `TOK` key |
|------------------|-----------|
| `--cream` | `bg` |
| `--navy` | `brand` |
| `--ink` | `text` |
| `--muted` | `textSec` |
| `--blue-300` | `accent1` |
| `--green-300` | `accent2` |
| `--amber-300` | `accent3` |
| `--pink-300` | `accent4` |
| `--orange-300` | `accent5` |
| white on brand | `onBrand` |

Navy glass templates (`Navy glass cards 3`, `Navy glass cards 4`) use `TOK.brand` slide background.

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

---

## Workflow (template-first)

1. Read `slideTemplates.manifest.json` and open `slideTemplates.html` in a browser.
2. From the approved brief, assign each content slide a **Template:** label (exact `data-screen-label` string).
3. Port the layout to PptxGenJS using px→inch helpers and `TOK`/`FONT`.
4. Comment each slide block: `// Slide N — [Template: Icon columns 3]`
5. **Vary templates** across the deck — no two consecutive content slides use the same template.
6. **Bookends** (hero, CTA): no catalog template — compose creatively with brand tokens and `CREATOR_DISPLAY_NAME`.

### Slot mismatch rules

When content has fewer items than the template:

- **Delete** unused slots (card, column, legend row) — do not leave placeholder text.
- **Never** ship "Icon title N", "Description N", "Card title N", or "Item N" in the final deck.

When content has more items than the template:

- Split across two slides using different templates, or
- Trim to the strongest N items and note the cut in speaker intent.

When no template fits:

- Pick the closest match and adapt (e.g. Icon columns 3 for three bullet points).
- Only compose fully from scratch for hero/CTA bookends.

---

## Port rules

- **`FONT` and `TOK` only** — no raw hex or font names in `.mjs` files.
- **Fresh `shadow()` object** per shape/image call (PptxGenJS mutates in place).
- **Bare 6-char hex** for PptxGenJS color strings (no `#`).
- **Real asset paths** under `assets/` for icons and images.
- **Margin: 0** on text boxes when aligning with shapes at the same x-position.
- **No accent lines under titles** — use whitespace instead.
- Punctuation: comma, colon, or period only — no em dashes.

### Reusable primitives (from HTML)

| Class | PptxGenJS equivalent |
|-------|---------------------|
| `.glass-navy` | Rounded rect, white 10% fill + transparency, 3px white border, shadow |
| `.gn-header` | Rounded rect `TOK.brand` fill, centered bold title, `TOK.onBrand` text |
| `.gn-body` | Text box below header, `TOK.textSec`, `pt(24)` |
| `.pill` | Rounded rect chip with dot + label for legends |
| `.num-badge` | Circle or rounded square with step number |

---

## Browser preview photos

`PptxSlideShow` reads `public/screenshots/powerpoint/[preview-slug]/slide-01.jpg`, `slide-02.jpg`, …

After building the `.pptx`, capture photos with Playwright (same tool as carousel QC):

```bash
# Terminal 1
pnpm dev

# Terminal 2 — writes slide-01.jpg, slide-02.jpg, … to public/screenshots/powerpoint/[preview-slug]/
pnpm screenshot [mode-key] --preview
```

Example: `pnpm screenshot claude-code --preview`

Agent QA (numbered PNGs, git-ignored): `pnpm screenshot [mode-key]` → `qc-screenshots/[mode-key]-1.png`, …

Commit the JPGs under `public/screenshots/powerpoint/` so `pnpm dev` shows the deck without re-running screenshot.

---

## QA — placeholder grep

After building `.pptx`:

```bash
python -m markitdown design/pptx-slides/output/[Name]Slides.pptx | grep -iE "icon title|description [0-9]|card title|item [0-9]|step [0-9]|lorem|xxxx"
```

If grep returns results, fix before declaring success.

Visual QA: run `pnpm screenshot [mode-key]` while `pnpm dev` is up; inspect PNGs in `qc-screenshots/`. Fix overlaps and low-contrast text, rebuild `.pptx`, re-run `--preview`.

---

## Brief integration

For **Slides** format, the design brief must include a **Template:** line on every content slide:

```
**Slide 3 — Three core benefits**
Template: Icon columns 3
Visual treatment: three icon columns with accent-colored icon circles
Content: …
```

Hero and CTA slides omit **Template:** (bookends).
