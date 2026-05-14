# Slide Types — Layout Specs & Character Limits

Reference for the `carousel-design-agent` and `carousel-qc-agent`.

---

## Table of Contents
1. [Slide Shell (shared)](#1-slide-shell-shared)
2. [Cover Slide](#2-cover-slide)
3. [Context Slide](#3-context-slide)
4. [Step Slide](#4-step-slide)
5. [Wrap-up / Bonus Slide](#5-wrap-up--bonus-slide)
6. [CTA Slide](#6-cta-slide)
7. [Character Limits Summary](#7-character-limits-summary)
8. [Reusable Sub-components](#8-reusable-sub-components)

---

## 1. Slide Shell (shared)

Every slide (except CTA) shares this shell. Prefer importing `CarouselSlideShell` + `CarouselNavbarEdge`/`CarouselNavbarCentered` from `components/CarouselPrimitives.jsx`:

```jsx
function Slide({ children, nodeId, name, navbar }) {
  return (
    <CarouselSlideShell
      nodeId={nodeId}
      name={name}
      withNavbar
      navbar={navbar}
      background={'var(--theme-surface-canvas)'}
      fontFamily={"var(--font\\/family\\/title)"}
    >
      {children}
    </CarouselSlideShell>
  )
}
```

**Navbar** (always present except CTA):
- Author name: left `calc(50% - 360.5px)`, top 0, 217px wide, 83px tall, fontSize 24, fontWeight 500, textAlign center
- "Follow": left `calc(50% + 393.5px)`, same sizing
- Divider color should use semantic text token (e.g. `var(--theme-color-text-primary)`)

**Safe content zone:** `top: 110px` to `top: 1300px` (below navbar, above canvas edge)

---

## 2. Cover Slide

**Purpose:** Hook. Bold title, subtitle, illustration.

### Layout
```
[Navbar — omit on cover: withNavbar={false}]
[Subtitle pill border box]    top: 110, centered, w: ~600, h: 76
[Bold title]                  top: 240, centered, fontSize: 128, fontWeight: 700
[Illustration]                top: 870, centered, ~500×400px
```

### Key elements
- **Title:** 128px, title-font bold tier, centered, line-height 130px, max 2 lines
- **Subtitle:** 40px, title-font medium, inside a bordered pill (3px solid `TEXT_PRIMARY`, borderRadius 30) — no background fill
- **Illustration:** one `oc-*.svg` from `assets/illustrations/notion-style/`, objectFit contain
- **No AccentPill** — do not place any colored rectangle behind the title or anywhere on this slide

### Character limits
| Field | Max chars | Notes |
|-------|-----------|-------|
| title | 50 | 2 lines max at 128px |
| subtitle | 30 | fits in pill at 64px |

---

## 3. Context Slide

**Purpose:** Set the problem or "why this matters". No step number. Copy-heavy.

### Layout
```
[Navbar]
[Main copy]      top: ~260–280, centered, fontSize: 72–96, fontWeight: 700
[Optional illustration or decoration]
```

### Key elements
- Large centered text (72–96px, 700 weight, lineHeight 110px)
- One strong sentence or two short sentences
- Optional illustration bottom half if copy is short (≤2 lines)
- **No AccentPill** — emphasis belongs in the text weight and color, not a background rectangle

### Character limits
| Field | Max chars | Notes |
|-------|-----------|-------|
| main copy | 120 | 72px, ~2–3 lines |
| accent phrase | 30 | words highlighted by pill |

---

## 4. Step Slide

**Purpose:** One numbered action. The main "how-to" content.

### Layout
```
[Navbar]
[Step number + text]    top: 217, left: 56, flex row, number=64px bold
[Screenshot area]       top: ~450–550, borderRadius 20, boxShadow
[Optional bottom note]  top: ~1124, elevated surface pill card
```

### Key elements
- **Step label:** number (`1.`, `2.`, etc.) at 64px/500, minWidth 96px + text at 64px/500
- **Screenshot placeholder:** `ScreenPlaceholder` component — **only add when the brief includes `"screenshot": true` or the user explicitly requests placeholders.** By default, omit it. When omitted, place BottomNote directly below the StepLabel (16px gap) and optionally center a relevant illustration in the remaining space.
- **Bottom note (optional):** elevated surface rounded card (borderRadius 40, padding 28px 40px) with descriptive note at 32px

```jsx
function StepLabel({ number, text, top = 217 }) {
  return (
    <div style={{ position: 'absolute', left: 56, top, width: 1002,
                  display: 'flex', alignItems: 'flex-start', gap: 0 }}>
      <span style={{ fontSize: 64, fontWeight: 500, lineHeight: '70px',
                     minWidth: 96, flexShrink: 0 }}>{number}.</span>
      <p style={{ margin: 0, fontSize: 64, fontWeight: 500, lineHeight: '70px' }}>{text}</p>
    </div>
  )
}
```

### Character limits
| Field | Max chars | Notes |
|-------|-----------|-------|
| step text | 80 | 64px, max 2 lines |
| bottom note | 140 | 32px, 2–3 lines |

---

## 5. Wrap-up / Bonus Slide

**Purpose:** Summary, key insight, or bonus list of tips.

### Layout option A — Bonus list (icon + label + description rows)
```
[Navbar]
[Title]              top: ~163–215, fontSize: 64, centered
[Feature rows]       top: ~390, flex column, gap: 20, each row: icon + bold label + desc
```

Each row:
```jsx
<div style={{ display: 'flex', alignItems: 'center', gap: 28,
              background: 'var(--theme-color-on-primary)', borderRadius: 20, padding: '20px 32px',
              boxShadow: 'var(--theme-shadow-card)' }}>
  <img src={icon} style={{ width: 72, height: 72, objectFit: 'contain' }} />
  <p style={{ margin: 0, fontSize: 38, fontWeight: 500, lineHeight: '52px' }}>
    <strong>{label}</strong>{' — '}<span style={{ color: 'var(--theme-color-text-secondary)' }}>{desc}</span>
  </p>
</div>
```
Max 5 rows. Each row is ~144px tall.

### Layout option B — Key insight (large centered text)
```
[Navbar]
[Large centered copy]    top: ~300, fontSize: 72–96px, centered
[Illustration]           bottom half if space available
```

### Character limits
| Field | Max chars | Notes |
|-------|-----------|-------|
| slide title | 45 | 64px centered |
| bonus item label | 15 | bold, 38px |
| bonus item desc | 55 | muted, 38px |
| insight copy | 100 | 72–96px, 2–3 lines |

---

## 6. CTA Slide

**Purpose:** Drive a follow. Always the last slide.

### Layout
```
[NO Navbar]
[Circular avatar]     top: 260, centered, 400×400px, borderRadius 50%, overflow hidden
[AccentPill]          behind "more" in "Follow for more"
["Follow for more"]   top: 720, centered, fontSize: 96, fontWeight: 700
[Author name]         top: 980, centered, fontSize: 48, fontWeight: 500
[Illustration]        top: 1090, centered, ~260×220px
```

```jsx
function SlideCTA() {
  return (
    <div
      data-node-id="carousel:cta"
      data-name="Slide-CTA"
      style={{ position: 'relative', width: 1080, height: 1350,
               background: BACKGROUND_PRIMARY, flexShrink: 0, overflow: 'hidden',
               fontFamily: FONT }}
    >
      {/* Circular avatar */}
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                    top: 260, width: 400, height: 400, borderRadius: '50%',
                    overflow: 'hidden', boxShadow: CARD_SHADOW }}>
        <img src="/assets/avatar/avatar-profile.png"
             alt={CREATOR_DISPLAY_NAME}
             style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <p style={{ position: 'absolute', left: 190, top: 730,
                  width: 700, fontSize: 96, fontWeight: 700,
                  lineHeight: '110px', textAlign: 'center',
                  color: TEXT_PRIMARY, margin: 0, whiteSpace: 'nowrap' }}>
        Follow for more
      </p>
      <p style={{ position: 'absolute', left: 240, top: 841,
                  width: 600, fontSize: 48, fontWeight: 500,
                  lineHeight: '70px', textAlign: 'center',
                  color: TEXT_PRIMARY, margin: 0, whiteSpace: 'nowrap' }}>
        {CREATOR_DISPLAY_NAME}
      </p>
      <img src="/assets/illustrations/notion-style/oc-hi-five.svg"
           alt=""
           style={{ position: 'absolute', left: 365, top: 950,
                    width: 350, height: 296, objectFit: 'contain' }} />
    </div>
  )
}
```

### Character limits
| Field | Max chars | Notes |
|-------|-----------|-------|
| author name | 20 | 48px |

---

## 7. Character Limits Summary

| Field | Max chars | Font |
|-------|-----------|------|
| Cover title | 50 | 128px Bold |
| Cover subtitle | 30 | 64px Medium |
| Context copy | 120 | 72px Medium |
| Step text | 80 | 64px Medium |
| Step bottom note | 140 | 32px Medium |
| Wrap-up title | 45 | 64px Medium |
| Bonus item label | 15 | 38px Bold |
| Bonus item desc | 55 | 38px Medium |
| Insight copy | 100 | 72–96px Medium |
| CTA author name | 20 | 48px Medium |

---

## 8. Contrast & Overlap Rules

These are hard rules enforced by the QC agent. Violations are a FAIL.

### Contrast
| Background | Required text color |
|---|---|
| `var(--theme-bg-brand)` (navy) | white / `var(--theme-color-on-primary)` |
| `var(--theme-surface-canvas)` (cream) | `TEXT_PRIMARY` (black) |
| `var(--theme-color-on-primary)` (white surface) | `TEXT_PRIMARY` (black) |
| accent-1 … accent-5 (light pastels) | `TEXT_PRIMARY` (black) |

Never write `color: 'white'` on a cream/white/pastel background. Never write `TEXT_PRIMARY` on a navy background.

### No element overlap
- Minimum **16px gap** between every pair of absolutely-positioned elements.
- Trace each slide top-to-bottom before finalising `top` values.
- Canonical step slide stack:
  1. Navbar 0–83px
  2. StepLabel `top: 130` (allow 2 lines × 70px = 140px height)
  3. Tool chip `top: StepLabel_bottom + 16`
  4. ScreenPlaceholder `top: chip_bottom + 16`, height 500px
  5. BottomNote `top: placeholder_bottom + 16`, height ≈ 152px
  6. Check: BottomNote bottom ≤ 1300px

---

## 9. Reusable Sub-components

> **AccentPill is banned.** Never define or use a floating colored rectangle behind text as a highlight. It misaligns and looks broken. Use font weight, token color, or a text-wrapping chip for emphasis instead.

### ScreenPlaceholder (opt-in only)

> **Default: OFF.** Only use when `"screenshot": true` is in the brief or the user explicitly asks for placeholders.

```jsx
function ScreenPlaceholder({ top, height = 544, left = 31, width = 1017 }) {
  return (
    <div style={{ position: 'absolute', left, top, width, height, borderRadius: 20,
                  boxShadow: 'var(--theme-shadow-card)',
                  background: 'var(--theme-surface-layer-1)', border: '2px dashed var(--theme-color-text-secondary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ margin: 0, fontSize: 28, color: 'var(--theme-color-text-secondary)', fontWeight: 500 }}>
        [ screen goes here ]
      </p>
    </div>
  )
}
```

### Illustration pick guide
| Slide topic | Suggested illustration |
|-------------|----------------------|
| Getting started / launch | `oc-sling-shot.svg` |
| Working / productivity | `oc-on-the-laptop.svg` |
| Balance / trade-offs | `oc-work-balance.svg` |
| Goals / strategy | `oc-target.svg` |
| Growth / scaling | `oc-growing.svg` |
| Learning / notes | `oc-taking-note.svg` |
| Thinking / planning | `oc-thinking.svg` |
| Success / celebration | `oc-hi-five.svg` (CTA) |
| Partnership | `oc-handshake.svg` |
| Time / deadlines | `oc-time-flies.svg` |
