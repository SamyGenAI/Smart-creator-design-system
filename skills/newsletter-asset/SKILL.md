---
name: newsletter-asset
description: >
  In-text newsletter images — the visuals that sit inside an issue's body, with
  no branded title and no footer. Two modes: (1) screenshot — a local screenshot
  framed and centred on the cream grid canvas, never resampled; (2) design — a
  diagram, file tree, code-editor view or small schema built in JSX from tokens.
  Use when the user asks for a newsletter asset, an image/visual/diagram for a
  newsletter section, to frame a newsletter screenshot, or to replace a
  screenshot with a designed version. Not for the 420×300 thumbnail (use
  newsletter-thumbnail) or LinkedIn infographics.
---

# Newsletter asset

An image that lives **inside** the newsletter text. It explains one thing at a
glance; the surrounding paragraph carries the title, so the asset has none.

Everything for this format is **local-only** (gitignored): components, designs,
screenshots and the two registry files. Never `git add` them.

| Path | Holds |
|---|---|
| `components/newsletter-asset/` | `NewsletterAssetCanvas` · `CodeEditorWindow` · `FileTree` |
| `components/newsletter-screenshot/` | `NewsletterScreenshotCanvas` · `NewsletterScreenshotFrame` |
| `design/newsletter-assets/[Name]Asset.jsx` | designed assets |
| `design/newsletter-screenshots/NewsletterScreenshot.jsx` | the one generic screenshot renderer |
| `assets/newsletter-screenshots/` | the source screenshots |
| `src/modes.local.js` · `src/App.local.jsx` | registry (plain data · components) |

## Step 1 — ask (one message, then wait)

Unless the request already answers them:

1. **Mode** — screenshot (path to the image) or design (what it must show).
2. **Placement** — which section of which issue; it decides what to cut.
3. **The one takeaway** the reader gets in a glance.
4. For design: **content** (tree, steps, schema…) and what must **never be cut**.

Never invent the content. If the user pasted a full spec, skip straight to build.

## Mode A — screenshot

1. The image must already be under `assets/newsletter-screenshots/` (never download one).
2. Add one entry to `LOCAL_MODES` in `src/modes.local.js`, spreading `SCREENSHOT`:
   ```js
   'shot-claude-routines': { ...SCREENSHOT, label: 'Claude routines (Screenshot)', exportName: 'claude-routines', src: '/assets/newsletter-screenshots/claude-routines.png' },
   ```
3. Nothing else — `App.local.jsx` renders every mode with a `src` through
   `NewsletterScreenshot` (natural size ÷ 2, 12% even padding, layered shadow,
   2× export so each source pixel maps to one output pixel).

## Mode B — design

Compose:

```jsx
<NewsletterAssetCanvas width={WIDTH} height={HEIGHT}>
  <CodeEditorWindow title="~/path" width={1000} bodyStyle={{ padding: '32px 40px 36px' }}>
    <FileTree root={TREE} tone="dark" />
  </CodeEditorWindow>
</NewsletterAssetCanvas>
```

- **Size**: width **1080**; height fits the content with ~64px canvas margin
  top/bottom (FileTree: rows × 40 + spacers × 16, + 68 body padding + 57
  title bar). No extra panels or footers — they only add height.
- **Readable at newsletter width** (~700px column, so the 1080 canvas shows at
  ~65%): body text **≥ 20px**, labels ≥ 16px. FileTree defaults to 22/40.
- **Editor window is dark** (ink body, invert text) — it's the house look;
  FileTree takes `tone="dark"` inside it, `tone="light"` straight on the canvas.
- **Fonts**: body font token (`'var(--font\\/family\\/body)'` in JS), not mono —
  FileTree draws connectors as CSS lines so it needs no monospace alignment.
- **Content as data** at the top of the file (a `TREE` object, a `STEPS` array)
  so edits never touch layout.
- **Zones** = soft colour per idea, at most ~5. On the dark editor: band =
  `color-mix(in srgb, var(--theme-accent-N) ~20%, transparent)`, pill = the solid
  `--theme-accent-N`.
- **Annotations** are short side labels (`note`), ≤ ~6 words — they carry the
  message. Collapse repetition (`Linkedin/ · X/`) before cutting meaning, and
  collapse contents that don't serve the takeaway into the folder + a note.
- A primitive that will clearly be reused (timeline, terminal, before/after)
  goes in `components/newsletter-asset/` with a data-driven API like `FileTree`.

Reference: `design/newsletter-assets/VaultTreeAsset.jsx` (dark editor + file
tree with colour zones).

### Register

1. `src/modes.local.js` →
   `{ label, type: 'newsletter-asset', exportName, size: { width, height }, exportPng: true, exportScale: 2 }`
2. `src/App.local.jsx` → import the design and add it to `LOCAL_COMPONENTS` under the same key.

## Rules (both modes)

- **Tokens only** — no `#hex`, `rgb()`, named colours or font names; SVG
  `fill`/`stroke` included. Shadows mix `--theme-color-text-primary` via `color-mix`.
- **No creator identity literals** — names come from `src/creatorIdentity.js`
  (`CREATOR_FIRST_NAME`, …), even inside folder names.
- **No title, no footer, no CTA.** The asset is a figure, not a post.
- Canvas texture is pinned to `atelier-grid` so designed assets and screenshots
  match; don't add another texture.
- **No all-caps** titles, labels or pills — sentence case only; get contrast
  from size and weight.
- Finish with `pnpm verify`, then **stop**. Do not render a preview — the user
  runs `pnpm dev`, opens the *Newsletter assets* group and exports PNG.
