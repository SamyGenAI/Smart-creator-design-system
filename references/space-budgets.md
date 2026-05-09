# Space Budgets — Per-Template Layout Constraints

Read this file **before** building any data object. Every text value must fit within the documented limits.

---

## Infographic.jsx

**Canvas:** 1080 × 1350px · **Inner width:** 981px · **Gap:** 22px between rows

### Vertical Space Budget

| Element | Height | Type |
|---------|--------|------|
| Header | **208px max** | Flexible (flex-1) — grows to fill, but MUST NOT exceed 208px |
| Row 1 | 257px | Fixed |
| Row 2 | 225px | Fixed |
| Row 3 | 314px | Fixed |
| Row 4 | 176px | Fixed |
| Footer | 60px | Fixed |
| 5 gaps × 22px | 110px | Fixed |
| **Total** | **1350px** | |

**If the header exceeds 208px, the footer gets clipped off-canvas.**

### Header Constraints

- Title: 73px Montserrat Bold, single line, `whitespace-nowrap`
- **Max title length: ~18 characters** (at 73px bold in 981px width)
- Subtitle: 32px Montserrat Medium Italic, single line
- **Max subtitle length: ~40 characters**
- Title + subtitle + 9px gap ≈ 114px intrinsic height
- Do NOT use `allowWrap=true` in this template

### Component Text Limits

| Component | Location | Width | Font | Max chars per item |
|-----------|----------|-------|------|--------------------|
| PrimaryGlassSection title | All cards | varies | 32px Bold | ~20 chars |
| Checklist items | Row 1 Card 1, Row 4 | 234px | 14px Medium | **25 chars** |
| IconBullet items | Row 1 Card 2, Row 2 | ~275px text area | 14px Medium | **30 chars** |
| NumberBullet items | Row 3 Card 1 | ~137px text area | 14px Medium | **18 chars** |
| Table headers | Row 2 | ~90px per column | 14px SemiBold | **10 chars** |
| Table cells | Row 2 | ~90px per column | 14px Medium | **10 chars** |
| PastelShadowBorderCard | Row 4 | 381px × 161px | 14px | **120 chars total** |
| Section title (bold label) | Row 3, Row 4 | 144–164px | 14px Bold | **18 chars** |

### Row Card Widths

| Row | Cards | Widths |
|-----|-------|--------|
| Row 1 | 2 cards | 321px + 633px |
| Row 2 | 1 card (full) | 977px |
| Row 3 | 3 cards | 321px + 308px + 308px |
| Row 4 | 1 card (full) | 981px |

---

## ComparisonInfographic.jsx

**Canvas:** 1080 × 1350px · **Inner width:** 981px · **Gap:** 22px between header/comparison/footer

### Vertical Space Budget

| Element | Height | Type |
|---------|--------|------|
| Header | **390px max** | Flexible (flex-1) |
| Column header chips | ~50px | Fixed |
| 8 rows × 92px | 736px | Fixed |
| 7 row gaps × 10px | 70px | Fixed |
| Footer | 60px | Fixed |
| 2 gaps × 22px | 44px | Fixed |
| **Total** | **1350px** | |

### Header Constraints

- Same InfographicHeader component as Infographic.jsx
- 390px budget is generous — single-line title + subtitle fits easily
- **Max title length: ~18 characters** (same 73px font)
- **Max subtitle length: ~40 characters**

### Component Text Limits

| Element | Width | Font | Max chars |
|---------|-------|------|-----------|
| Row label (brand pill) | 160px - 24px padding = 136px | 16px Bold | **14 chars** |
| Col1/Col2 description | ~370px - 36px padding = 334px | 16px Medium | **50 chars** (2 lines at line-height 1.45) |
| Column header chip text | auto | 20px Bold | **15 chars** |

**Row height is fixed at 92px.** With 16px font at 1.45 line-height, max **3 lines** fit (~50 chars). Longer text overflows the row.

---

## ClaudeCoworkInfographic.jsx (Bento Grid)

**Canvas:** 1080 × 1350px · **Inner width:** 981px · **Padding:** 28px top/bottom

### Vertical Space Budget

| Element | Height | Type |
|---------|--------|------|
| Header | Auto (flex-none) | Intrinsic — title wraps if needed |
| Grid body | **flex-1** (fills remaining) | Auto-distributed via `fr` units |
| Footer | 60px (flex-none) | Fixed |
| Grid gap | 12px between cells | Fixed |
| Margins | 14px above + 14px below grid | Fixed |

**This template is footer-safe.** The grid absorbs available space via `fr` units. The footer is `flex-none` and always visible.

### Grid Row Distribution

```
gridTemplateRows: '2fr 3fr 3fr 3fr 3fr 2fr'
```

With ~1130px available for the grid (after header ~130px + footer 60px + padding 28px×2):
- 2fr rows ≈ 141px each (rows 1, 6)
- 3fr rows ≈ 212px each (rows 2–5)

### Component Text Limits

| Component | Font | Max chars |
|-----------|------|-----------|
| PrimaryGlassSection title | 24px Bold | **25 chars** |
| BrandBorderSection title | 24px Bold | **20 chars** |

**Section bodies are currently empty** (header-only cards). When adding body content, respect the `fr`-allocated height (~212px for 3fr rows, minus 51px header = ~161px body).

---

## Quick Reference — Safe Content Lengths

Use these as hard limits when writing content:

| Field | Max chars | Example |
|-------|-----------|---------|
| Infographic title | 18 | "The Ultimate Guide" |
| Infographic subtitle | 40 | "Everything you need to know about AI tools" |
| Card header (32px) | 20 | "Key Features" |
| Card header (24px) | 25 | "Getting Started Guide" |
| Checklist item | 25 | "Real-time collaboration" |
| IconBullet item | 30 | "Automated workflow management" |
| NumberBullet item | 18 | "Define your goals" |
| Table cell | 10 | "Enterprise" |
| Comparison row label | 14 | "Data Privacy" |
| Comparison description | 50 | "Processes data locally with end-to-end encryption" |
