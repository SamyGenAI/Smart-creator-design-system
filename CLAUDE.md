# Smart Creator Design System — Master Rules for Claude Code

## What this project does
Generate LinkedIn infographics (1080×1350px) by:
1. Claude writes a React component using the design system tokens and components
2. Claude pushes the design to Figma using `mcp__figma__generate_figma_design`
3. User edits in Figma manually

**Figma file:** `GBovqF34FkjgtWPj3wUmO3`
**Pages:** Foundations (0:1) · Components (5:15493) · Infographics (5:15851)

---

## Workflow — generating an infographic

1. User describes the infographic content (topic, key points, data)
2. Claude builds the `data` object matching the `Infographic.jsx` prop shape
3. Claude writes or updates `src/App.jsx` with the new data
4. Claude calls `mcp__figma__generate_figma_design` with the full `Infographic.jsx` render
5. Design appears in Figma for manual editing

**NEVER modify the visual layout, component sizes, or token values — only the content data.**

---

## Canvas

| Property | Value |
|---|---|
| Width | 1080px |
| Height | 1350px |
| Background | `#fffceb` (cream) |
| Texture | `/assets/textures/square-grid.png` at 5% opacity |
| Inner content width | 981px (centered) |
| Row gap | 22px |

The canvas uses **absolute positioning throughout**. All sizes are fixed in px, not responsive.

---

## Design Tokens

### Colors — Primitives
| Token (CSS var) | Value |
|---|---|
| `--color/blue/100` | `rgba(126,218,255,0.15)` |
| `--color/blue/200` | `#c7efff` |
| `--color/blue/300` | `#b4eaff` |
| `--color/blue/400` | `#7edaff` |
| `--color/blue/500` | `#092c69` |
| `--color/cream/100` | `#fffceb` |
| `--color/cream/200` | `#fff4e8` |
| `--color/neutral/0–1000` | white → #f9fafc → #f4f4f8 → #e3e4eb → #cacbd4 → #a8a9b2 → #717188 → #323241 → black |
| `--color/pink/100–300` | rgba(255,178,218,0.15) → #ffe6f3 → #ffb2da |
| `--color/amber/100–300` | #fef3c7 → #fde68a → #fcd34d |
| `--color/green/100–300` | rgba(169,255,62,0.15) → #d2ff9a → #a9ff3e |
| `--color/orange/100–300` | rgba(255,145,77,0.15) → #ffa066 → #ff914d |

### Colors — Semantic Tokens
| Token (CSS var) | Value | Tailwind alias |
|---|---|---|
| `--color/blue/500` | `#092c69` | `navy` |
| `--text/primary` | `black` | — |
| `--text/secondary` | `#323241` | — |
| `--text/contrast` | `#a8a9b2` | — |
| `--text/text-brand` | `#092c69` | — |
| `--border/blue` | `#7edaff` | `border-blue` |
| `--border/pink` | `#ffb2da` | `border-pink` |
| `--border/green` | `#a9ff3e` | `border-green` |
| `--border/amber` | `#fcd34d` | `border-amber` |
| `--border/grey` | `#e3e4eb` | `border-grey` |
| `--components/background/primary` | `#fffceb` | `canvas` |
| `--components/card/blue` | `rgba(126,218,255,0.15)` | `card-blue` |
| `--components/card/amber` | `#fef3c7` | `card-amber` |
| `--components/card/pink` | `rgba(255,178,218,0.15)` | `card-pink` |
| `--components/card-title/blue` | `#b4eaff` | `chip-blue` |
| `--components/card-title/green` | `#d2ff9a` | `chip-green` |
| `--components/card-title/amber` | `#fde68a` | `chip-amber` |
| `--components/card-title/pink` | `#ffe6f3` | `chip-pink` |
| `--components/card-title/orange` | `#ffa066` | `chip-orange` |
| `--highlight/blue` | `rgba(126,218,255,0.15)` | — |
| `--highlight/green` | `rgba(169,255,62,0.15)` | — |
| `--highlight/orange` | `rgba(255,145,77,0.15)` | — |
| `--highlight/amber` | `#fef3c7` | — |
| Glass card bg | `rgba(255,255,255,0.1)` | `glass-white` |
| Number bullet badge | `rgba(255,178,218,0.7)` | `pink-bullet` |

In Tailwind arbitrary values, CSS variable slashes must be escaped: `bg-[var(--color\/blue\/500,#092c69)]`

### Typography
| Role | Font family | CSS var | Weight | Size |
|---|---|---|---|---|
| Title / serif display | Noto Serif | `--font/family/title-serif` | Bold (700) | 72px |
| Hero title (infographic) | Montserrat | `--font/family/title` | Bold (700) | 72.948px |
| Title 4xlarge | Montserrat | `--font/family/title` | Bold (700) | 56px |
| Title large / section header | Montserrat | `--font/family/title` | Bold (700) | 32px |
| Subtitle (infographic) | Montserrat | `--font/family/title` | Medium Italic (500) | 32px |
| Title medium | Montserrat | `--font/family/title` | SemiBold (600) | 24px |
| Body bold / large | Montserrat | `--font/family/title` | SemiBold/Medium (600/500) | 20px |
| Body / list text (infographic) | Montserrat | `--font/family/title` | Medium (500) | 14px |
| Footer | Montserrat | `--font/family/title` | SemiBold (600) | 24px |
| Body base | Montserrat | `--font/family/body` | Regular (400) | 16px |
| Caption | Montserrat | `--font/family/body` | Medium (500) | 12px |

**Font families:** `--font/family/title` = Montserrat · `--font/family/body` = Montserrat · `--font/family/title-serif` = Noto Serif
**Note:** Both title and body use Montserrat. Noto Serif is an optional alternative for big display titles only.

**Font size scale:** xs=12 · sm=16 · md=18 · lg=20 · xl=24 · 2xl=32 · 4xl=56 · 5xl=72

Google Fonts: Montserrat + DM Sans + Noto Serif (see index.html)

---

## Component Inventory

All components are in `components/`. Each preserves `data-node-id` and `data-name` attributes for Figma round-tripping.

### SquareGridTexture — `components/SquareGridTexture.jsx`
- Inline SVG square-grid background texture — renders in Figma, no image file needed
- Place as **first child** inside the canvas `div`, before all content
- Props: `opacity` (default `0.05`), `color` (default `"black"`), `cellSize` (default `50`), `width` (default `1080`), `height` (default `1350`)
- Used in every infographic template between the cream background and the layout content

### InfographicHeader — `components/InfographicHeader.jsx`
- **Figma node:** `48:490`
- Infographic header: single bold title line + optional italic subtitle
- Title: 72.948px Montserrat Bold, navy `#092c69`, tracking -2.1884px — **all words same style, no size variation**
- Subtitle: 32px Montserrat Medium Italic, navy `#092c69` — **optional**, omit or pass `null` to hide
- `highlightWord` — a word or phrase within `title` to wrap with a colored background rectangle (inline, chip-blue `#b4eaff` by default). Pass `null` for no highlight.
- `highlightColor` — background color of the highlight rectangle (default `#b4eaff`)
- Props: `title`, `highlightWord` (optional), `subtitle` (optional), `highlightColor`
- Uses `flex-[1_0_0]` — grows to fill remaining header space automatically
- Used in: `templates/Infographic.jsx`, `templates/ComparisonInfographic.jsx`

### GlassNavySection — `components/GlassNavySection.jsx`
- **Figma node:** `22:324`
- Primary card container used in every row
- Navy header bar (51px) with centered bold title and optional icon (35×35px, top-left)
- `className` prop controls width and height — **always pass explicit dimensions**
- Default size: 308×225px

### InfographicFooter — `components/InfographicFooter.jsx`
- **Figma node:** `54:894`
- Navy pill (1048×60px) with "Follow for more · avatar · name"
- Props: `avatarSrc`, `name`
- Avatar file: `assets/avatar/profile.jpg`

### PastelShadowBorderCard — `components/PastelShadowBorderCard.jsx`
- **Figma node:** `52:382`
- Blue-tinted glass card (381×161px) with border and shadow
- Single `text` prop

### NumberBullet — `components/NumberBullet.jsx`
- **Figma node:** `49:279`
- Pink badge numbered list (179×138px), exactly 3 items

### Checklist — `components/Checklist.jsx`
- **Figma node:** `28:283`
- Green checkmark list (236×189px), 2–3 items, optional `title`

### IconBullet — `components/IconBullet.jsx`
- **Figma node:** `28:384`
- Icon chip + text, 4 rows (319×173px)
- `accentColor` prop switches chip color: blue (Row 1) or amber (Row 2)
- `items`: `[{ iconSrc, iconAlt, text }]`

### Table — `components/Table.jsx`
- **Figma node:** `47:1203`
- Amber 3-column × 4-row table (390×133px)
- Props: `headers[3]`, `rows[3][3]`

### Grid8CompanyLogos — `components/Grid8CompanyLogos.jsx`
- **Figma node:** `51:342`
- 4×2 logo grid (272×112px)
- App icons → `assets/logos/app/{domain}.png` — fetch with `node scripts/fetch-app-logo.mjs` (64px, logo.dev)
- Wordmarks → `assets/logos/text/{domain}.svg` — fetch with `node scripts/fetch-logo.mjs` (Brandfetch)
- **Image containment rule:** each cell div is the absolute container (`inset` via style) + `flex items-center justify-center`. The img uses `w-full h-full object-contain`. Never use `display: contents` on a cell wrapper — it removes the bounding box and breaks `object-contain`.

### TextBox — `components/TextBox.jsx`
- **Figma node:** `51:375`
- Small colored text pill (153×34px) — used in pairs in Row 3 Card 3

### ColoredTextBoxes — `components/ColoredTextBoxes.jsx`
- **Figma node:** `51:372`
- 2×2 grid of colored squares (172×98px) — default color: chip-green

---

## Infographic Layout

Template: `templates/Infographic.jsx`
Data prop shape is documented at the top of that file.

```
Canvas 1080×1350px
└── Main column 981px wide, flex-col, gap-22px
    ├── Header   — title (72px) + subtitle (32px italic) — flex-1 grows
    ├── Row 1    — 321px card + 633px card, side by side
    ├── Row 2    — 977px full-width card
    ├── Row 3    — 321px + 308px + 308px cards
    ├── Row 4    — 981px full-width card
    └── Footer   — 1048×60px pill
```

Row positions are controlled by `ml-[Xpx] mt-[Ypx]` in the `inline-grid` overlap system.
**Do not change these offset values** — they are pixel-perfect from Figma.

---

## Assets

```
assets/
├── avatar/
│   └── profile.jpg          ← User's profile picture (add manually)
├── textures/
│   └── square-grid.png      ← Background texture (add manually from Figma)
├── logos/
│   ├── app/                 ← Square app icons from logo.dev (PNG, 160px)
│   │   ├── notion.com.png     fetch: node scripts/fetch-app-logo.mjs notion.com
│   │   └── ...
│   └── text/                ← Full-color wordmark SVGs from Brandfetch
│       ├── notion.com.svg     fetch: node scripts/fetch-logo.mjs notion.com
│       └── ...
└── icons/                   ← Section header icons (add manually)
    └── (your Streamline Freehand icons)
```

**Do NOT download or auto-generate icons.** The user adds them manually.
Figma MCP image URLs expire in 7 days — do not hardcode them in components.

---

## Figma Integration

### Code Connect mappings — `figma/code-connect.json`
Links each React component to its Figma node for round-tripping.

### Pushing to Figma
Use `mcp__figma__generate_figma_design` with the rendered React code.
The tool requires:
- Self-contained JSX with all assets as inline URLs or absolute paths
- Tailwind classes (no CSS modules)
- `data-node-id` attributes on every element (already in all components)

### Getting design context
`mcp__figma__get_design_context` — use to verify a component matches Figma.
`mcp__figma__get_metadata` — use to explore page structure.

---

## Rules for Claude

1. **Never modify token values** — colors, sizes, font weights are fixed.
2. **Never change component structure** — only pass different prop values.
3. **Never download icons** — reference local paths, let user provide files.
4. **Never make the layout responsive** — it's a fixed 1080×1350px canvas.
5. **Always preserve** `data-node-id` and `data-name` attributes.
6. **Use the Infographic.jsx template** — do not build layouts from scratch.
7. **Content only** — when generating a new infographic, only update the `data` object in App.jsx.
8. **Escape slashes in Tailwind** — `bg-[var(--color\/blue\/500,#092c69)]` not `--color/blue/500`.
9. **Image assets expire** — Figma MCP URLs last 7 days. Save to `assets/` immediately.
10. **Check SKILL.md** before generating — it contains the trigger and content workflow.
11. **Image containment in absolute cells** — when an `img` must fill an absolutely-positioned cell, make the cell div the container (with `flex items-center justify-center`) and set `w-full h-full object-contain` on the img. Never use `display: contents` on a wrapper — it removes the bounding box and `object-contain` has nothing to constrain against.
12. **Icons on navy headers are white** — `GlassNavySection` applies `filter: brightness(0) invert(1)` to `iconSrc`. Always pass dark/black SVG icons; do not pre-whiten them.
13. **Logo scripts** — app icons: `node scripts/fetch-app-logo.mjs domain.com` (64px PNG, logo.dev). Wordmarks: `node scripts/fetch-logo.mjs domain.com` (SVG, Brandfetch).
14. **Text size is adaptive** — body text inside cards can be increased beyond the default (e.g. 13px → 16px) to fill available space and reduce emptiness, as long as visual hierarchy is preserved: card body < card title < section title < header. Never exceed the next tier in the type scale. Row/card dimensions must be adjusted together to avoid overflow.
