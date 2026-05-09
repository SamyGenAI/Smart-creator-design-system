---
version: alpha
name: Smart Creator
description: >
  LinkedIn infographic design system for fixed 1080×1350px visual content.
  Optimised for AI-assisted generation with Claude Code and Cursor.

colors:
  bg:
    canvas: "#fffceb"
    surface: "#ffffff"
    surfaceAlt: "#fff4e8"
    brand: "#092c69"
    accent:
      "1": "#b4eaff"
      "2": "#d2ff9a"
      "3": "#fde68a"
      "4": "#ffe6f3"
      "5": "#ffa066"
  text:
    primary: "#000000"
    secondary: "#323241"
    muted: "#717188"
    onBrand: "#ffffff"
  border:
    subtle: "#e3e4eb"
    strong: "{colors.bg.brand}"
    accent:
      "1": "#7edaff"
      "2": "#a9ff3e"
      "3": "#fcd34d"
      "4": "#ffb2da"
      "5": "#ff914d"
  state:
    success: "{colors.bg.accent.2}"
    warning: "{colors.bg.accent.5}"
    info: "{colors.bg.accent.1}"
    danger: "{colors.bg.accent.4}"
  indicator:
    primary: "{colors.bg.accent.4}"
  stroke:
    check: "#116F39"

alphaColors:
  bg:
    accentSoft:
      "1": "rgba(126,218,255,0.15)"
      "2": "rgba(169,255,62,0.15)"
      "3": "rgba(252,211,77,0.25)"
      "4": "rgba(255,178,218,0.15)"
      "5": "rgba(255,145,77,0.15)"
    surfaceAccent:
      "1": "rgba(126,218,255,0.15)"
      "4": "rgba(255,178,218,0.15)"
  overlay:
    glass:
      subtle: "rgba(255,255,255,0.1)"
      default: "rgba(255,255,255,0.55)"
      strong: "rgba(255,255,255,0.92)"
    indicator:
      primary: "rgba(255,178,218,0.7)"

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
    backgroundColor: "{alphaColors.bg.accentSoft.3}"
    rounded: "{rounded.card}"
  accent-1:
    backgroundColor: "{colors.bg.accent.1}"
    textColor: "{colors.text.primary}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-sm}"
  accent-2:
    backgroundColor: "{colors.bg.accent.2}"
    textColor: "{colors.text.primary}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-sm}"
  accent-3:
    backgroundColor: "{colors.bg.accent.3}"
    textColor: "{colors.text.primary}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-sm}"
  accent-4:
    backgroundColor: "{colors.bg.accent.4}"
    textColor: "{colors.text.primary}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-sm}"
  accent-5:
    backgroundColor: "{colors.bg.accent.5}"
    textColor: "{colors.text.primary}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-sm}"
  glass-card:
    backgroundColor: "{colors.bg.brand}"
    rounded: "{rounded.glass}"
  infographic-header:
    backgroundColor: "{colors.bg.canvas}"
    typography: "{typography.hero}"
  infographic-footer:
    backgroundColor: "{colors.bg.brand}"
    textColor: "{colors.text.onBrand}"
    rounded: "{rounded.pill}"
    height: 60px
---

# Smart Creator Design System

A fixed-canvas design system for generating LinkedIn infographics (1080×1350 px) and slide decks (1280×720 px) with Claude Code and Cursor.

## Overview

Smart Creator produces **static, fixed-canvas visual content** — not responsive web pages. Every infographic is a 1080×1350 px absolute-positioned canvas with a warm background surface (`color.bg.canvas` / `#fffceb`) and a subtle square-grid texture at 5% opacity.

The visual language is **bold, structured, and vibrant**. Content is organised in bento-grid cells using CSS Grid with `fr` rows. Section headers use the brand background role (`color.bg.brand`) with glass overlays, and content cards use soft semantic accent tints. A single Montserrat typeface covers all weight/size needs; Noto Serif appears only for decorative serif display titles.

Target audience: B2B professionals sharing insights on LinkedIn. The tone is confident and editorial — not playful, not corporate-dull.

## Colors

Color tokens are role-based. Use semantic roles only, never family labels.

- **`color.bg.brand` (`#092c69`):** Primary brand surface for section headers and footer.
- **`color.bg.canvas` (`#fffceb`):** Base page background for infographics and slides.
- **`color.bg.surface` / `color.bg.surfaceAlt`:** Secondary container layers.
- **`color.bg.accent.1..5`:** Semantic accent slots for chips, cards, and section highlights.
- **`color.text.primary|secondary|muted|onBrand`:** Text contrast roles by surface.
- **`color.border.subtle|strong` + `color.border.accent.1..5`:** Divider and emphasis borders.
- **`color.state.success|warning|info|danger`:** State semantics for status-driven UI copy.

> Alpha-channel variants use semantic keys in `alphaColors` (`bg.accentSoft.*`, `bg.surfaceAccent.*`, `overlay.glass.*`, `overlay.indicator.*`). These can be changed in `DESIGN.md` and reflected in `src/index.css` via `pnpm tokens:gen`.

## Typography

All text uses **Montserrat**. Noto Serif is reserved for decorative serif display titles only.

- **Hero / Section header (`hero`, 72px Bold):** Infographic main title. Single line, `whitespace-nowrap`. Maximum ~18 characters at 1080 px width.
- **Display serif (`title-serif`, Noto Serif 72px Bold):** Decorative alternative title style. Use sparingly.
- **Title 4xl (`title-4xl`, 56px Bold):** Large section numerals or prominent stat callouts.
- **Title 2xl (`title-2xl`, 32px Bold):** Primary section header label inside brand bars.
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

The primary `PrimaryGlassSection` component also uses `alphaColors.overlay.glass.subtle` for an inner frosted-glass border.

## Shapes

All interactive/container elements follow a consistent radius vocabulary:

- **`rounded-card` (8px):** Standard card radius. Used for `PastelShadowBorderCard`, `BrandBorderSection` family, `Table`, and most content cards.
- **`rounded-glass-header` (10px):** Header bar of glass brand sections.
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
| `InfographicFooter` | Brand pill footer | `avatarSrc`, `name` |
| `PastelShadowBorderCard` | Accent-tinted glass card with shadow | `text` |
| `NumberBullet` | Numbered list (exactly 3) | `items` |
| `Checklist` | Checkmark list | `items` |
| `IconBullet` | Icon + text rows (exactly 4) | `items`, `accentColor` |
| `Table` | Accent 3×4 table | `headers`, `rows` |
| `Grid8CompanyLogos` | 4×2 logo grid | `logos` |
| `TextBox` | Small colored pill | `text` |
| `BrandBorderSection` family | Colored section card with numbered badge | `title`, `number`, `children` |

**Chip/card accent semantics** are fixed by role:
- `color.bg.accent.1` → features/capabilities
- `color.bg.accent.2` → actions/outcomes
- `color.bg.accent.3` → process/steps
- `color.bg.accent.4` → numbered/ranked
- `color.bg.accent.5` → warnings/alternatives

## Do's and Don'ts

- **Do** use `color.bg.brand` only for section headers, the footer pill, and primary action elements.
- **Do** always pass dark/black SVG icons to `PrimaryGlassSection` — the component applies `filter: brightness(0) invert(1)`.
- **Do** read `references/space-budgets.md` before generating content and respect all character limits.
- **Do** use the bento-grid pattern (CSS Grid with `fr` rows) for all new infographic templates.
- **Do** use `flex items-center justify-center` on image container divs and `w-full h-full object-contain` on `<img>` tags for logos.
- **Do** escape forward slashes in Tailwind arbitrary values: `bg-[var(--color\/bg\/brand,#092c69)]`.
- **Don't** make the layout responsive — the canvas is always a fixed `1080×1350px`.
- **Don't** modify token values in `tailwind.config.js` or `src/index.css` directly — edit `DESIGN.md` and run `pnpm tokens:gen`.
- **Don't** use `display: contents` on image cell wrappers.
- **Don't** use more than two font weights in the same visual region.
- **Don't** mix `rounded-glass` and `rounded-card` radii in the same infographic.
- **Don't** place the `InfographicHeader` title on more than one line — enforce `whitespace-nowrap`.
