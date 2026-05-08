---
version: alpha
name: Smart Creator
description: >
  LinkedIn infographic design system for fixed 1080×1350px visual content.
  Optimised for AI-assisted generation with Claude Code and Cursor.

colors:
  # ── Brand ─────────────────────────────────────────────────────────────────
  navy: "#092c69"
  primary: "{colors.navy}"

  # ── Blue scale ────────────────────────────────────────────────────────────
  # Note: blue-100, pink-100, green-100, orange-100, glass-white, indicator-1
  # use rgba values which are outside the #hex spec — their values are
  # declared here as comments and emitted into src/index.css by scripts/generate-tokens.mjs.
  # blue-100: rgba(126,218,255,0.15)  ← alpha, kept in template
  blue-200: "#c7efff"
  blue-300: "#b4eaff"
  blue-400: "#7edaff"

  # ── Cream scale ───────────────────────────────────────────────────────────
  canvas: "#fffceb"
  cream-200: "#fff4e8"
  canvas-secondary: "{colors.cream-200}"

  # ── Neutral scale ─────────────────────────────────────────────────────────
  neutral-200: "#f9fafc"
  neutral-300: "#f4f4f8"
  neutral-400: "#e3e4eb"
  neutral-500: "#cacbd4"
  neutral-600: "#a8a9b2"
  neutral-700: "#717188"
  neutral-800: "#323241"

  # ── Pink scale ────────────────────────────────────────────────────────────
  # pink-100: rgba(255,178,218,0.15)  ← alpha, kept in template
  pink-200: "#ffe6f3"
  pink-300: "#ffb2da"

  # ── Amber scale ───────────────────────────────────────────────────────────
  amber-100: "#fef3c7"
  amber-200: "#fde68a"
  amber-300: "#fcd34d"

  # ── Green scale ───────────────────────────────────────────────────────────
  # green-100: rgba(169,255,62,0.15)  ← alpha, kept in template
  green-200: "#d2ff9a"
  green-300: "#a9ff3e"

  # ── Orange scale ──────────────────────────────────────────────────────────
  # orange-100: rgba(255,145,77,0.15)  ← alpha, kept in template
  orange-200: "#ffa066"
  orange-300: "#ff914d"

  # ── Component aliases — cards ─────────────────────────────────────────────
  # surface-accent-1: rgba(126,218,255,0.15)  ← alias of blue-100, kept in template
  surface-accent-3: "{colors.amber-100}"
  # surface-accent-4: rgba(255,178,218,0.15)  ← alias of pink-100, kept in template

  # ── Component aliases — accents (section header pills) ────────────────────
  accent-1: "{colors.blue-300}"
  accent-2: "{colors.green-200}"
  accent-3: "{colors.amber-200}"
  accent-4: "{colors.pink-200}"
  accent-5: "{colors.orange-200}"

  # ── Component aliases — borders ───────────────────────────────────────────
  border-accent-1: "{colors.blue-400}"
  border-accent-2: "{colors.green-300}"
  border-accent-3: "{colors.amber-300}"
  border-accent-4: "{colors.pink-300}"
  border-neutral-1: "{colors.neutral-400}"

  # ── Component micro-tokens ────────────────────────────────────────────────
  # Dark green stroke used inside the Checklist checkmark SVG.
  # Change this if you switch to a non-green accent for checklists.
  check-stroke: "#116F39"

alphaColors:
  blue-100: "rgba(126,218,255,0.15)"
  pink-100: "rgba(255,178,218,0.15)"
  green-100: "rgba(169,255,62,0.15)"
  orange-100: "rgba(255,145,77,0.15)"
  surface-accent-1: "rgba(126,218,255,0.15)"
  surface-accent-4: "rgba(255,178,218,0.15)"
  glass-white: "rgba(255,255,255,0.1)"
  indicator-1: "rgba(255,178,218,0.7)"
  glass-strong: "rgba(255,255,255,0.92)"
  glass-default: "rgba(255,255,255,0.55)"

shadows:
  card: "0px 4px 4px 0px rgba(0,0,0,0.25)"
  card-soft: "0 8px 32px rgba(0,0,0,0.18)"
  elevation-100: "0px 1px 4px 0px rgba(12,12,13,0.05)"
  elevation-200: "0px 1px 4px 0px rgba(12,12,13,0.05), 0px 1px 4px 0px rgba(12,12,13,0.10)"
  elevation-400: "0px 4px 4px -4px rgba(12,12,13,0.10), 0px 16px 32px -4px rgba(12,12,13,0.10)"
  elevation-500: "0px 4px 4px -4px rgba(12,12,13,0.10), 0px 16px 16px -8px rgba(12,12,13,0.10)"
  slide-soft: "0 8px 32px rgba(0,0,0,0.15)"
  slide-glass: "0 8px 32px rgba(0,0,0,0.12)"
  slide-accent: "0 8px 32px rgba(0,0,0,0.10)"
  slide-primary: "0 8px 32px rgba(9,44,105,0.35)"
  surface-primary: "{shadows.slide-primary}"

typography:
  hero:
    fontFamily: Montserrat
    fontSize: 72px
    fontWeight: 700
    lineHeight: 1
  title-serif:
    fontFamily: Noto Serif
    fontSize: 72px
    fontWeight: 700
    lineHeight: 1
  title-4xl:
    fontFamily: Montserrat
    fontSize: 56px
    fontWeight: 700
    lineHeight: 40px
  title-2xl:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: 700
    lineHeight: 32px
  subtitle:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: 500
    lineHeight: 32px
  title-xl:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: 600
    lineHeight: 24px
  body-lg:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: 600
    lineHeight: 24px
  body-md:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: 500
    lineHeight: 24px
  body:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  body-sm:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: 500
    lineHeight: 16px
  caption:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px

rounded:
  glass-header: 10px
  card: 7.951px
  glass: 20px
  pill: 40px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 22px
  xl: 28px
  canvas-width: 1080px
  canvas-height: 1350px
  canvas-inner: 981px
  slide-width: 1280px
  slide-height: 720px
  row-gap: 22px

components:
  surface-accent-1:
    backgroundColor: "#7edaff1a"
    rounded: "{rounded.card}"
  surface-accent-4:
    backgroundColor: "#ffb2da26"
    rounded: "{rounded.card}"
  surface-accent-3:
    backgroundColor: "{colors.amber-100}"
    rounded: "{rounded.card}"
  accent-1:
    backgroundColor: "{colors.accent-1}"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-sm}"
  accent-2:
    backgroundColor: "{colors.accent-2}"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-sm}"
  accent-3:
    backgroundColor: "{colors.accent-3}"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-sm}"
  accent-4:
    backgroundColor: "{colors.accent-4}"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-sm}"
  accent-5:
    backgroundColor: "{colors.accent-5}"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-sm}"
  glass-card:
    backgroundColor: "{colors.navy}"
    rounded: "{rounded.glass}"
  infographic-header:
    backgroundColor: "{colors.canvas}"
    typography: "{typography.hero}"
  infographic-footer:
    backgroundColor: "{colors.navy}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    height: 60px
---

# Smart Creator Design System

A fixed-canvas design system for generating LinkedIn infographics (1080×1350 px) and slide decks (1280×720 px) with Claude Code and Cursor.

## Overview

Smart Creator produces **static, fixed-canvas visual content** — not responsive web pages. Every infographic is a 1080×1350 px absolute-positioned canvas with a warm cream background (`canvas` / `#fffceb`) and a subtle square-grid texture at 5% opacity.

The visual language is **bold, structured, and vibrant**. Content is organised in bento-grid cells using CSS Grid with `fr` rows. Section headers are navy glass panels; content cards use soft pastel tints. A single Montserrat typeface covers all weight/size needs; Noto Serif appears only for decorative serif display titles.

Target audience: B2B professionals sharing insights on LinkedIn. The tone is confident and editorial — not playful, not corporate-dull.

## Colors

The palette is anchored in a deep navy brand color with a set of bright pastel accent families. Each accent family carries a semantic meaning that agents must respect.

- **Navy (`#092c69`):** The primary brand color. Used for section header bars, the footer pill, and key text. All icons placed on primary surfaces must be dark/black SVGs — the `PrimaryGlassSection` component applies `filter: brightness(0) invert(1)` to render them white.
- **Blue scale (`#c7efff` → `#7edaff`):** Features, capabilities, primary/key content sections. Use `accent-1` (`#b4eaff`) for section title accents and `surface-accent-1` (15% blue tint) for card backgrounds.
- **Amber scale (`#fef3c7` → `#fcd34d`):** Process, how-it-works, step-by-step sequences. Use `accent-3` (`#fde68a`) for accents, `surface-accent-3` (`#fef3c7`) for card backgrounds.
- **Green scale (`#d2ff9a` → `#a9ff3e`):** Actions, outcomes, checklists, results. Use `accent-2` (`#d2ff9a`) for accents.
- **Pink scale (`#ffe6f3` → `#ffb2da`):** Numbered/ranked items. Use `accent-4` (`#ffe6f3`) for accents, `indicator-1` (70% pink tint) for numbered badge backgrounds.
- **Orange scale (`#ffa066` → `#ff914d`):** Warnings, alternatives, secondary actions. Use `accent-5` (`#ffa066`) for accents.
- **Cream (`#fffceb`):** The canvas background. All infographics and slides use this as the page background.
- **Neutrals (`#f9fafc` → `#323241`):** Supporting surfaces, borders, and secondary text.

> Alpha-channel variants (glass tints for cards and highlights) use `rgba` values which are defined as `blue-100`, `pink-100`, `green-100`, `orange-100`, `glass-white`, and `indicator-1` in the token pipeline. These are not editable via the `colors` YAML block above (rgba is outside the `#hex` spec) but can be changed in `DESIGN.md` (`alphaColors`) and reflected in `src/index.css` via `pnpm tokens:gen`.

## Typography

All text uses **Montserrat**. Noto Serif is reserved for decorative serif display titles only.

- **Hero / Section header (`hero`, 72px Bold):** Infographic main title. Single line, `whitespace-nowrap`. Maximum ~18 characters at 1080 px width.
- **Display serif (`title-serif`, Noto Serif 72px Bold):** Decorative alternative title style. Use sparingly.
- **Title 4xl (`title-4xl`, 56px Bold):** Large section numerals or prominent stat callouts.
- **Title 2xl (`title-2xl`, 32px Bold):** Primary section header label inside navy bars.
- **Subtitle (`subtitle`, 32px Medium Italic):** Infographic subtitle below the hero title. Maximum ~40 characters.
- **Title XL (`title-xl`, 24px SemiBold):** Secondary section headers and card titles.
- **Body LG (`body-lg`, 20px SemiBold):** Emphasized list items or key facts.
- **Body MD (`body-md`, 18px Medium):** Comfortable body text; default for longer descriptions.
- **Body (`body`, 16px Regular):** Standard body copy and comparison row text.
- **Body SM (`body-sm`, 14px Medium):** Default for list items inside cards (checklist, icon-bullet, number-bullet). Text size is adaptive: minimum 12px, maximum 18px, preserving hierarchy — card body < card title < section title < header.
- **Caption (`caption`, 12px Medium):** Metadata, footnotes, and fine print.

Both Montserrat and Noto Serif are loaded from Google Fonts in `index.html`.

## Layout

The canvas is **fixed at 1080×1350 px** — this is not a responsive web layout. All sizes are in `px`, never `%` or `rem`.

### Infographic (1080×1350 px)
- Outer canvas: `1080×1350px` with `background: canvas` and `SquareGridTexture` at 5% opacity
- Inner content column: `981px` centered
- Row gap: `22px`
- All layout uses **CSS Grid bento-grid pattern** with `fr` rows, `flex-none` header/footer, `flex-1` grid body
- The legacy inline-grid pattern (`Infographic.jsx`) is deprecated; all new templates use the bento-grid approach

### Slide deck (1280×720 px)
- Canvas: `1280×720px` with `background: canvas` and `SquareGridTexture` at 60% opacity
- Font: Montserrat only (same families, different opacity on texture)

### Spacing scale
`xs` (4px) → `sm` (8px) → `md` (16px) → `lg` (22px / row gap) → `xl` (28px / canvas vertical padding)

## Elevation & Depth

Depth is expressed through **background tint layers** rather than heavy shadows. Cards float above the canvas using a combination of tinted backgrounds and a soft drop shadow.

- **`shadow-card`** — `0px 4px 4px 0px rgba(0,0,0,0.25)` — standard card elevation
- **`shadow-elevation-100`** — `0px 1px 4px 0px rgba(12,12,13,0.05)` — subtle lift
- **`shadow-elevation-200`** — double 1px/4px spread — medium surface lift
- **`shadow-elevation-400`** — `0px 4px 4px -4px + 0px 16px 32px -4px` — prominent floating card
- **`shadow-elevation-500`** — `0px 4px 4px -4px + 0px 16px 16px -8px` — highest elevation

The primary `PrimaryGlassSection` component also uses a `border: 1px solid rgba(255,255,255,0.1)` (glass-white) inner border to create a frosted-glass premium feel.

## Shapes

All interactive/container elements follow a consistent radius vocabulary:

- **`rounded-card` (8px):** Standard card radius. Used for `PastelShadowBorderCard`, `BrandBorderSection` family, `Table`, and most content cards.
- **`rounded-glass-header` (10px):** Header bar of glass-navy sections.
- **`rounded-glass` (20px):** Full `PrimaryGlassSection` container radius.
- **`rounded-pill` (40px):** Chip badges, the `InfographicFooter` pill, and `TextBox` components.

Never mix rounded and sharp corners in the same composition. All section cards in a single infographic should use the same radius family.

## Components

The design system provides these atomic components (all in `components/`):

| Component | Description | Key prop(s) |
|---|---|---|
| `SquareGridTexture` | SVG background texture | `opacity`, `cellSize` |
| `InfographicHeader` | Hero title + subtitle | `title`, `highlightWord`, `subtitle` |
| `PrimaryGlassSection` | Primary header + body container | `title`, `iconSrc`, `className` |
| `InfographicFooter` | Navy pill footer | `avatarSrc`, `name` |
| `PastelShadowBorderCard` | Blue glass card with shadow | `text` |
| `NumberBullet` | Pink numbered list (exactly 3) | `items` |
| `Checklist` | Green checkmark list | `items` |
| `IconBullet` | Icon + text rows (exactly 4) | `items`, `accentColor` |
| `Table` | Amber 3×4 table | `headers`, `rows` |
| `Grid8CompanyLogos` | 4×2 logo grid | `logos` |
| `TextBox` | Small colored pill | `text` |
| `BrandBorderSection` family | Colored section card with numbered badge | `title`, `number`, `children` |

**Chip/card color semantics** are fixed:
- Blue chips → features/capabilities
- Amber chips → process/steps
- Green chips → actions/outcomes
- Pink chips → numbered/ranked
- Orange chips → warnings/alternatives

## Do's and Don'ts

- **Do** use `navy` (`#092c69`) only for section headers, the footer pill, and primary action elements.
- **Do** always pass dark/black SVG icons to `PrimaryGlassSection` — the component applies `filter: brightness(0) invert(1)`.
- **Do** read `references/space-budgets.md` before generating content and respect all character limits.
- **Do** use the bento-grid pattern (CSS Grid with `fr` rows) for all new infographic templates.
- **Do** use `flex items-center justify-center` on image container divs and `w-full h-full object-contain` on `<img>` tags for logos.
- **Do** escape forward slashes in Tailwind arbitrary values: `bg-[var(--color\/blue\/500,#092c69)]`.
- **Don't** make the layout responsive — the canvas is always a fixed `1080×1350px`.
- **Don't** modify token values in `tailwind.config.js` or `src/index.css` directly — edit `DESIGN.md` and run `pnpm tokens:gen`.
- **Don't** use `display: contents` on image cell wrappers.
- **Don't** use more than two font weights in the same visual region.
- **Don't** mix `rounded-glass` and `rounded-card` radii in the same infographic.
- **Don't** place the `InfographicHeader` title on more than one line — enforce `whitespace-nowrap`.
