---
name: newsletter-thumbnail-designer
description: >
  420×300 newsletter thumbnail format — canvas, title block with highlighter bar,
  and the visual area below it (empty / image / design). Use whenever a newsletter
  thumbnail is created or edited.
---

# Newsletter thumbnail — 420×300

Source of truth: Figma `Newsletter-thumbnail` (node `27:123`).
Files live in [`design/newsletter-thumbnails/`](../../design/newsletter-thumbnails/) and are
registered with `type: 'thumbnail'`.

## Canvas

| Item | Rule |
|---|---|
| Size | **420×300**, fixed px, non-responsive (override only if the user asks) |
| Root | **`NewsletterThumbnailCanvas`** — `bg-bg-canvas` + `SquareGridTexture`; never roll your own texture |
| Flow | `flex flex-col`: title block **`flex-none`**, visual area **`flex-1`** |

```jsx
<NewsletterThumbnailCanvas>
  <NewsletterThumbnailTitle title="…" highlightWord="…" />
  <NewsletterThumbnailVisual variant="empty" />
</NewsletterThumbnailCanvas>
```

## Title block — `NewsletterThumbnailTitle`

- Centred, top of the canvas, `36px / 45px` line-height by default (the Figma values).
- `highlightWord` paints an inline accent bar behind that phrase — it **wraps with the
  text**, so it never becomes a fixed rectangle that clips a longer title.
  The fill is `--theme-border-1` at 60% via `color-mix`, so it swaps per brand.
- Long titles: drop `fontSize` to ~30 and `lineHeight` to ~38 rather than letting
  three lines push into the visual area.
- Title colour is `--theme-color-title` (falls back to text-primary) — **never**
  `--theme-color-primary`, which is the brand *fill* and goes illegible on light brands.

## Visual area — `NewsletterThumbnailVisual`

| `variant` | Use |
|---|---|
| `empty` | Nothing below the title; the grid texture carries the space. The Figma default. |
| `image` | `src` = local path under `assets/` only — **never download an asset**. Rendered `object-contain`, centred, never cropped. |
| `design` | Pass JSX children — compose from `components/` primitives (`PrimaryGlassSection`, `IconBullet`, `TextBox`, …) rather than writing raw cards. |

At 420×300 the visual area is roughly **388×170** after padding — keep it to one
idea: a few icons, a single tile row, or one small diagram. Do not port an
infographic section wholesale.

## Tokens (non-negotiable)

No `#hex`, `rgb()`, `hsl()`, named colours, or hardcoded `fontFamily` in
`design/newsletter-thumbnails/*.jsx` or in the thumbnail components. Use
`var(--theme-…)`, `var(--color/…)`, `var(--font/family/…)` and Tailwind token
classes — including every SVG `fill` / `stroke`. This is what lets another
user's brand swap in automatically via `DESIGN.md` → `src/index.css`.

## Register + finish

1. `design/newsletter-thumbnails/[Name]Thumbnail.jsx`
2. `src/modes.js` → `{ label, type: 'thumbnail', exportName }`
3. `COMPONENTS` map in `src/App.jsx`
4. `pnpm verify`
5. **Stop.** Do not render a preview — the user runs `pnpm dev` and exports PNG from the toolbar.
