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

Every slide (except CTA) shares this shell:

```jsx
function Slide({ children, nodeId, name }) {
  return (
    <div data-node-id={nodeId} data-name={name} style={{
      position: 'relative', width: 1080, height: 1350,
      background: '#fffceb', flexShrink: 0, overflow: 'hidden',
      fontFamily: "'Montserrat', sans-serif",
    }}>
      <Navbar />
      {children}
    </div>
  )
}
```

**Navbar** (always present except CTA):
- Author name: left `calc(50% - 360.5px)`, top 0, 217px wide, 83px tall, fontSize 24, fontWeight 500, textAlign center
- "Follow": left `calc(50% + 393.5px)`, same sizing
- Divider: `left: 71, top: 83, width: 938, height: 3, background: '#000'`

**Safe content zone:** `top: 110px` to `top: 1300px` (below navbar, above canvas edge)

---

## 2. Cover Slide

**Purpose:** Hook. Bold title, subtitle, illustration.

### Layout
```
[Navbar]
[Subtitle pill border box]    top: 44, left: 257, w: 565, h: 101
[Bold title]                  top: 217, centered, fontSize: 128, fontWeight: 700
[AccentPill behind title]     top: ~609, full width accent
[Illustration]                top: 875, centered, ~515×369px
```

### Key elements
- **Title:** 128px, Montserrat Bold, centered, line-height 130px, max 2 lines
- **Subtitle:** 64px, Montserrat Medium, inside a bordered pill (3px solid black, borderRadius 30)
- **AccentPill:** `#b4eaff`, height 130px, left 74, width 957, radius 30 — sits behind bottom of title text
- **Illustration:** one `oc-*.svg` from `assets/illustrations/notion-style/`, objectFit contain

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
[AccentPill]     behind key phrase, varies by text position
[Main copy]      top: ~238–500, centered, fontSize: 72, fontWeight: 500
[Optional illustration or decoration]
```

### Key elements
- Large centered text (72px, 500 weight, lineHeight 100px)
- One strong sentence or two short sentences
- Optional illustration bottom half if copy is short (≤2 lines)
- `AccentPill` highlights the most important 2–4 words

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
[Optional bottom note]  top: ~1124, white pill card
```

### Key elements
- **Step label:** number (`1.`, `2.`, etc.) at 64px/500, minWidth 96px + text at 64px/500
- **Screenshot placeholder:** `ScreenPlaceholder` component — user replaces with actual screenshot
- **Bottom note (optional):** white rounded card (borderRadius 40, padding 28px 40px) with descriptive note at 32px

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
[AccentPill]         behind title area
[Title]              top: ~215, fontSize: 64, centered
[Feature rows]       top: ~390, flex column, gap: 20, each row: icon + bold label + desc
```

Each row:
```jsx
<div style={{ display: 'flex', alignItems: 'center', gap: 28,
              background: '#fff', borderRadius: 20, padding: '20px 32px',
              boxShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}>
  <img src={icon} style={{ width: 72, height: 72, objectFit: 'contain' }} />
  <p style={{ margin: 0, fontSize: 38, fontWeight: 500, lineHeight: '52px' }}>
    <strong>{label}</strong>{' — '}<span style={{ color: 'rgba(0,0,0,0.6)' }}>{desc}</span>
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
    <div style={{ position: 'relative', width: 1080, height: 1350,
                  background: '#fffceb', flexShrink: 0, overflow: 'hidden',
                  fontFamily: "'Montserrat', sans-serif" }}>
      {/* Circular avatar */}
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                    top: 260, width: 400, height: 400, borderRadius: '50%',
                    overflow: 'hidden', boxShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}>
        <img src="/assets/avatar/avatar-profile.png"
             style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <AccentPill left={494} top={814} width={302} height={90} radius={20} />
      <p style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                  top: 720, width: 700, fontSize: 96, fontWeight: 700,
                  lineHeight: '110px', textAlign: 'center', margin: 0 }}>
        Follow for more
      </p>
      <p style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                  top: 980, fontSize: 48, fontWeight: 500, textAlign: 'center', margin: 0 }}>
        {authorName}
      </p>
      <img src="/assets/illustrations/notion-style/oc-hi-five.svg"
           style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                    top: 1090, width: 260, height: 220, objectFit: 'contain' }} />
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

## 8. Reusable Sub-components

### AccentPill
```jsx
function AccentPill({ left, top, width, height = 76, radius = 20 }) {
  return <div style={{ position: 'absolute', left, top, width, height,
                       background: '#b4eaff', borderRadius: radius }} />
}
```

### ScreenPlaceholder
```jsx
function ScreenPlaceholder({ top, height = 544, left = 31, width = 1017 }) {
  return (
    <div style={{ position: 'absolute', left, top, width, height, borderRadius: 20,
                  boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
                  background: 'rgba(0,0,0,0.04)', border: '2px dashed rgba(0,0,0,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ margin: 0, fontSize: 28, color: 'rgba(0,0,0,0.25)', fontWeight: 500 }}>
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
