# Slide Layouts — Pixel Specs & Character Limits

Canvas: **1280×720px**. All coordinates are in px. Background: `var(--theme-surface-canvas)`.
All layouts import from `components/SlideLayouts.jsx`. All content areas use `SlideCard`.

---

## SlideShell (required wrapper)

Every slide must be wrapped in `<SlideShell>`.

```jsx
import { SlideShell } from '../components/SlideLayouts.jsx'

<SlideShell nodeId="slide-1" name="slide-cover-s1">
  {/* slide content */}
</SlideShell>
```

- Size: 1280×720, `position: relative`, `overflow: hidden`
- Background: `var(--theme-surface-canvas)`
- First child: `SquareGridTexture width={1280} height={720} opacity={0.18}` (handled internally)

---

## Layout: `cover`

**Use for:** Hook slide (always slide 1).

**Props:**
| Prop | Type | Limit | Required |
|---|---|---|---|
| `title` | string | ≤55 chars | yes |
| `subtitle` | string | ≤45 chars | no |
| `illustration` | string (asset path) | — | no |
| `accentWord` | string | one word from title | no |

**Pixel zones:**
- Title: `top: 180`, `left: 80` (with illustration) / centered (without), `width: 740 / 960`, `fontSize: 64`, `fontWeight: 700`, `lineHeight: 76px`
- Subtitle card: `SlideCard variant="glass"`, `top: 400/380`, same x/width as title, `padding: 20px 32px`
- Illustration: `right: 60, top: 60, width: 380, height: 580`, `objectFit: contain`

**Example data:**
```js
{ id: 's1', layout: 'cover', title: 'How to Build a Personal Brand', subtitle: 'A practical system for 2025', illustration: '/assets/illustrations/notion-style/oc-growing.svg', accentWord: 'Personal' }
```

---

## Layout: `content`

**Use for:** Standard content slide with title + body text + optional image.

**Props:**
| Prop | Type | Limit | Required |
|---|---|---|---|
| `title` | string | ≤40 chars | yes |
| `body` | string[] | ≤180 chars per paragraph, max 4 paragraphs | yes |
| `image` | string (asset path) | — | no |

**Pixel zones:**
- Primary title bar: `SlideCard variant="primary"`, `top: 56, left: 60, width: 1160, height: 80`, `fontSize: 26, fontWeight: 700`
- Body card: `SlideCard variant="surface"`, `top: 160, left: 60, width: 1160 (no image) / 640 (with image), height: 496`
- Image card: `SlideCard variant="glass"`, `top: 160, right: 60, width: 488, height: 496`

**Example data:**
```js
{ id: 's2', layout: 'content', title: 'Why Most People Fail at Branding', body: ['They focus on tactics before strategy.', 'A personal brand is built on clarity — not content.'], image: '/assets/illustrations/notion-style/oc-thinking.svg' }
```

---

## Layout: `two-column`

**Use for:** Split slide — text on left, visual or text on right.

**Props:**
| Prop | Type | Limit | Required |
|---|---|---|---|
| `title` | string | ≤40 chars | yes |
| `leftContent` | string or JSX | ≤400 chars if string | yes |
| `rightContent` | string, asset path, or JSX | — | yes |
| `split` | `'50/50'` or `'55/45'` | — | no (default `'55/45'`) |

**Pixel zones (55/45 split):**
- Title bar: same as `content`
- Left panel: `SlideCard variant="surface"`, `top: 160, left: 60, width: 628, height: 468`
- Right panel: `SlideCard variant="glass"`, `top: 160, right: 60, width: 492, height: 468`

**Example data:**
```js
{ id: 's3', layout: 'two-column', title: 'The 2 Paths', leftContent: 'Path A: Reactive. Post when inspired. Hope the algorithm picks it up.', rightContent: '/assets/illustrations/notion-style/oc-sling-shot.svg' }
```

---

## Layout: `statement`

**Use for:** Single bold idea — maximum visual impact.

**Props:**
| Prop | Type | Limit | Required |
|---|---|---|---|
| `statement` | string | ≤120 chars | yes |
| `accent` | string | phrase within statement | no |
| `sub` | string | ≤80 chars | no |

**Font size rule:** 1–5 words = 72px, 6–10 words = 64px, 11+ words = 52px

**Card:** `SlideCard variant="glass"`, centered both axes, `width: 960, padding: 48px 64px, borderRadius: 32`

**Example data:**
```js
{ id: 's5', layout: 'statement', statement: 'Consistency beats talent every single time.', accent: 'Consistency beats talent' }
```

---

## Layout: `bullets`

**Use for:** Title + 3–5 icon bullet rows.

**Props:**
| Prop | Type | Limit | Required |
|---|---|---|---|
| `title` | string | ≤40 chars | yes |
| `bullets` | Array | 3–5 items | yes |
| `bullets[].icon` | string (asset path) | — | no |
| `bullets[].label` | string | ≤18 chars | yes |
| `bullets[].desc` | string | ≤60 chars | no |

**Pixel zones:**
- Title bar: `top: 56, left: 60, width: 1160, height: 80`
- Bullet rows start at `top: 160`, each row `height: 80`, `gap: 14` between rows
- Icon: `40×40px`, left-aligned inside row
- Label: `fontSize: 18, fontWeight: 700`
- Desc: `fontSize: 16, fontWeight: 500, color: var(--theme-color-text-secondary)`

**Max 5 bullets.** Total height budget: 160 + 5×(80+14) − 14 = 616px (fits within 720px canvas).

**Example data:**
```js
{ id: 's4', layout: 'bullets', title: '5 Pillars of a Strong Brand', bullets: [
  { icon: '/assets/icons/business/target.svg', label: 'Clarity', desc: 'Know exactly who you help and how.' },
  { icon: '/assets/icons/work-office/idea.svg', label: 'Voice', desc: 'A distinct tone people recognize instantly.' },
  { icon: '/assets/icons/business/chart.svg', label: 'Consistency', desc: 'Show up the same way, every time.' },
]}
```

---

## Layout: `quote`

**Use for:** Pull quote with attribution.

**Props:**
| Prop | Type | Limit | Required |
|---|---|---|---|
| `quote` | string | ≤140 chars | yes |
| `author` | string | ≤30 chars | yes |
| `role` | string | ≤40 chars | no |
| `avatar` | string (asset path) | — | no |

**Card:** `SlideCard variant="glass"`, centered both axes, `width: 960, padding: 48px 56px, borderRadius: 28`
- Quote: `fontSize: 26, fontStyle: italic, lineHeight: 40px`
- Attribution: `fontSize: 18, fontWeight: 700, color: var(--theme-color-text-primary)`
- Decorative `"` glyph: `fontSize: 280, color: var(--theme-color-text-primary), opacity: 0.07`

**Example data:**
```js
{ id: 's7', layout: 'quote', quote: 'Your brand is what people say about you when you are not in the room.', author: 'Jeff Bezos' }
```

---

## Layout: `end`

**Use for:** CTA / "Follow for more" — always the last slide.

**Props:**
| Prop | Type | Limit | Required |
|---|---|---|---|
| `authorName` | string | ≤30 chars | yes |
| `handle` | string | ≤30 chars | no |
| `avatar` | string (asset path) | defaults to `/assets/avatar/avatar-profile.png` | no |
| `illustration` | string (asset path) | — | no |

**Pixel zones:**
- Avatar: `160×160px, borderRadius: 50%`, centered at `top: 100`
- "Follow for more": `fontSize: 52, fontWeight: 700`, centered at `top: 300`
- Author name: `fontSize: 26, fontWeight: 600, color: var(--theme-color-text-primary)`, centered at `top: 400`
- Handle: `fontSize: 20, fontWeight: 400, color: var(--theme-color-text-secondary)`, centered at `top: 444`
- Illustration: `right: 80, bottom: 40, width: 220, height: 280`

**Example data:**
```js
{ id: 'send', layout: 'end', authorName: 'Your Full Name' }
```

---

## Asset paths quick reference

```
/assets/illustrations/notion-style/oc-growing.svg
/assets/illustrations/notion-style/oc-thinking.svg
/assets/illustrations/notion-style/oc-on-the-laptop.svg
/assets/illustrations/notion-style/oc-target.svg
/assets/illustrations/notion-style/oc-taking-note.svg
/assets/illustrations/notion-style/oc-sling-shot.svg
/assets/illustrations/notion-style/oc-work-balance.svg
/assets/illustrations/notion-style/oc-handshake.svg
/assets/illustrations/notion-style/oc-money-profits.svg
/assets/illustrations/notion-style/oc-project-development.svg
/assets/illustrations/brand-style/rocket.png
/assets/illustrations/brand-style/compass.png
/assets/illustrations/brand-style/light-bulb.png
/assets/avatar/avatar-profile.png
/assets/icons/business/   (charts, briefcase, strategy, ...)
/assets/icons/work-office/ (tools, productivity, ...)
/assets/icons/data/        (analytics, charts, ...)
```

---

## Character limit summary

| Field | Max |
|---|---|
| `cover.title` | 55 |
| `cover.subtitle` | 45 |
| `content.title` | 40 |
| `content.body[]` | 180 per paragraph |
| `two-column.title` | 40 |
| `bullets.title` | 40 |
| `bullets[].label` | 18 |
| `bullets[].desc` | 60 |
| `statement.statement` | 120 |
| `quote.quote` | 140 |
| `quote.author` | 30 |
| `end.authorName` | 30 |
