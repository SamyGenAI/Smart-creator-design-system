# Component Reference

All components are in `components/`. Each preserves `data-node-id` and `data-name` attributes for Figma round-tripping.

---

## SquareGridTexture — `components/SquareGridTexture.jsx`
- Inline SVG square-grid background texture
- Place as **first child** inside the canvas `div`, before all content
- Props: `opacity` (default `0.05`), `color` (default `"black"`), `cellSize` (default `50`), `width` (default `1080`), `height` (default `1350`)

## InfographicHeader — `components/InfographicHeader.jsx`
- **Figma node:** `48:490`
- Bold title (72.948px) + optional italic subtitle (32px)
- Props: `title`, `highlightWord`, `subtitle`, `highlightColor`, `titleStyle`, `subtitleStyle`, `allowWrap`, `titleClassName`, `subtitleClassName`
- `highlightWord` must appear verbatim in `title` (case-sensitive, matches first occurrence only)
- **Max title: ~18 chars** · **Max subtitle: ~40 chars** (see `references/space-budgets.md`)

## GlassNavySection — `components/GlassNavySection.jsx`
- **Figma node:** `22:324`
- Primary card container: navy header bar (51px) + body area
- Props: `title`, `iconSrc`, `className`, `titleSize` (default `"32px"`)
- **Always pass explicit dimensions via `className`** — default 308×225px is rarely correct
- **Max title: ~20 chars** at 32px, ~25 chars at 24px
- Icons must be dark/black SVGs — component applies `filter: brightness(0) invert(1)` to make them white

## InfographicFooter — `components/InfographicFooter.jsx`
- **Figma node:** `54:894`
- Navy pill (1048×60px): "Follow for more · avatar · name"
- Props: `avatarSrc`, `name`, `className`

## PastelShadowBorderCard — `components/PastelShadowBorderCard.jsx`
- **Figma node:** `52:382`
- Blue-tinted glass card (381×161px) with border and shadow
- Props: `text`, `className`
- **Max text: ~120 chars**

## NumberBullet — `components/NumberBullet.jsx`
- **Figma node:** `49:279`
- Pink badge numbered list (179×138px), exactly 3 items
- Props: `items` (string[3]), `className`
- **Max per item: ~18 chars**

## Checklist — `components/Checklist.jsx`
- **Figma node:** `28:283`
- Green checkmark list (236×189px), exactly 3 items rendered
- Props: `title` (optional), `items` (string[]), `className`
- **Max per item: ~25 chars**

## IconBullet — `components/IconBullet.jsx`
- **Figma node:** `28:384`
- Icon chip + text, exactly 4 rows (319×173px)
- Props: `items` ([{iconSrc, iconAlt, text}]), `accentColor`, `className`
- `accentColor`: blue for Row 1, amber for Row 2
- **Max per item: ~30 chars**

## Table — `components/Table.jsx`
- **Figma node:** `47:1203`
- Amber 3-column × 4-row table (390×133px)
- Props: `headers` (string[3]), `rows` (string[3][3]), `className`
- **Max per cell: ~10 chars**

## Grid8CompanyLogos — `components/Grid8CompanyLogos.jsx`
- **Figma node:** `51:342`
- 4×2 logo grid (272×112px)
- Props: `logos` (array of {src, alt}), `className`
- App icons: `assets/logos/app/{domain}.png` — fetch: `node scripts/fetch-app-logo.mjs domain.com`
- Wordmarks: `assets/logos/text/{domain}.svg` — fetch: `node scripts/fetch-logo.mjs domain.com`
- **Image containment:** cell div is container with `flex items-center justify-center`, img uses `w-full h-full object-contain`. Never use `display: contents` on cell wrappers.

## TextBox — `components/TextBox.jsx`
- **Figma node:** `51:375`
- Small colored text pill (153×34px)
- Props: `text`, `className`

## ColoredTextBoxes — `components/ColoredTextBoxes.jsx`
- **Figma node:** `51:372`
- 2×2 grid of colored squares (172×98px)
- Props: `color` (default chip-green), `className`

## Brand Border Section Family — `components/BrandBorderSectionBase.jsx`

Shared base for colored section cards with title bar + black number badge.

**Solid border wrappers:**
| Component | File | Figma node | Default width |
|---|---|---|---|
| OrangeSolidBorderSection | `components/OrangeSolidBorderSection.jsx` | `66:711` | 415px |
| BlueSolidBorderSection | `components/BlueSolidBorderSection.jsx` | `66:725` | 415px |
| PinkSolidBorderSection | `components/PinkSolidBorderSection.jsx` | `66:739` | 470px |
| GreenSolidBorderSection | `components/GreenSolidBorderSection.jsx` | `66:753` | 470px |

**White border + shadow wrappers:**
| Component | File | Default width |
|---|---|---|
| OrangeWhiteBorderSection | `components/OrangeWhiteBorderSection.jsx` | 600px |
| BlueWhiteBorderSection | `components/BlueWhiteBorderSection.jsx` | 600px |
| PinkWhiteBorderSection | `components/PinkWhiteBorderSection.jsx` | 600px |
| GreenWhiteBorderSection | `components/GreenWhiteBorderSection.jsx` | 600px |

**Common props:** `title`, `number`, `widthClass`, `heightClass`, `children`
**Geometry:** height 195px, header 51px, number badge 44×42px, body area ~134px (overflow-hidden)
**Max title: ~20 chars** at 24px Bold
