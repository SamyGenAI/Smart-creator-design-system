# Visual Component Reference

Every component in the design system, with design intent, when to use it, and what it looks like.

## Table of Contents
1. [PrimaryGlassSection — The card container](#1-primaryglasssection--the-card-container)
2. [IconBullet — Feature lists](#2-iconbullet--feature-lists)
3. [Checklist — Action items](#3-checklist--action-items)
4. [NumberBullet — Ranked lists](#4-numberbullet--ranked-lists)
5. [Table — Comparison grids](#5-table--comparison-grids)
6. [Grid8CompanyLogos — Brand showcase](#6-grid8companylogos--brand-showcase)
7. [PastelShadowBorderCard — Key insight](#7-pastelshadowbordercard--key-insight)
8. [ColoredTextBoxes — Category grid](#8-coloredtextboxes--category-grid)
9. [InfographicHeader — Title block](#9-infographicheader--title-block)
10. [New Component Patterns](#10-new-component-patterns)
11. [Illustrations — Character art](#11-illustrations--character-art)
12. [Diagram Patterns — Build with primitives](#12-diagram-patterns--build-with-primitives)
13. [Brand Border Sections — Numbered callout cards](#13-brand-border-sections--numbered-callout-cards)

---

## 1. PrimaryGlassSection — The card container

**What it looks like:** Semi-transparent glass card with a primary header bar (51px tall). The header has high-contrast title text centered, and a freehand icon top-left.

**This is always the outer container.** Content components are positioned absolutely *over* it, starting below the 51px header.

**When to use:** Every section in every row. You never have content floating without a PrimaryGlassSection behind it.

**Design notes:**
- Header title: 1–4 words, title-case or ALL CAPS
- Icon top-left: 35×35px, comes from `assets/icons/`, auto-inverted for on-primary contrast
- Size is set via `className` — always pass explicit `w-[Xpx] h-[Ypx]`
- Content starts at approximately `mt-[58px]` from top of card (below header)

**Available card sizes (from the layout):**
| Row | Card | Width | Height |
|---|---|---|---|
| Row 1 | Narrow | 321px | 257px |
| Row 1 | Wide | 633px | 257px |
| Row 2 | Full-width | 977px | 225px |
| Row 3 | Card 1 | 321px | 314px |
| Row 3 | Card 2–3 | 308px | 314px |
| Row 4 | Full-width | 981px | 176px |

---

## 2. IconBullet — Feature lists

**What it looks like:** A vertical list of 4 rows (32px chip + icon + text). Each row has a small tokenized square chip with a Streamline Freehand icon inside, then text to the right.

**When to use:**
- Feature lists ("4 things Claude can do")
- Use cases ("Where to apply it")
- Benefits or reasons
- Any list where each item deserves a distinct icon

**Design notes:**
- Exactly 4 items (the component is fixed at 4 rows × 173px total)
- Accent color: semantic accent token (e.g., `accent-1` / `accent-3`)
- Text: 14px medium, 5–10 words per item
- Icons: user provides to `assets/icons/` — pass `iconSrc` per item

**Fits inside:** Row 1 Card 2 (319×173px area), Row 2 left (319×173px area)

---

## 3. Checklist — Action items

**What it looks like:** A list of 2–3 items, each with a themed checkmark icon on the left.

**When to use:**
- Prerequisites, requirements
- Action items, next steps
- Things to verify or complete
- "What you need" type content

**Design notes:**
- 2 or 3 items (2 items for Row 4 checklists, 3 items for Row 1 Card 1)
- Optional bold `title` label above the list
- Text: 14px medium, 4–8 words per item
- Checkmark is a visual 3D-style tokenized box, not a flat emoji

**Fits inside:** Row 1 Card 1 (236×189px), Row 4 two side-by-side checklists (236×136px each)

---

## 4. NumberBullet — Ranked lists

**What it looks like:** 3 rows, each with a rounded badge showing a bold number (1, 2, 3) and text to the right.

**When to use:**
- Steps in a process (Step 1, Step 2, Step 3)
- Ranked items ("Top 3 reasons")
- Sequential actions
- Priority order

**Design notes:**
- Exactly 3 items (fixed component)
- Badge: semantic accent badge (`var(--theme-accent-4)`) rounded pill with tokenized shadow
- Text: 14px medium, 4–8 words per item
- Do NOT use for unordered lists — use `Checklist` or `IconBullet` instead

**Fits inside:** Row 3 Card 1 (179×138px area)

---

## 5. Table — Comparison grids

**What it looks like:** A 3-column × 4-row table (1 header row + 3 data rows). Tokenized header background, alternating surface rows, semantic borders.

**When to use:**
- Side-by-side comparisons (Model A vs B vs C)
- Feature matrices
- Data with categories
- Any structured 3×3 data

**Design notes:**
- Fixed: 3 columns, 3 data rows (never more or fewer in the existing component)
- Column headers: 1 word each (bold, tokenized accent header)
- Cell data: numbers, short strings (≤12 chars per cell)
- Sits beside `IconBullet` in Row 2, so keep it concise

**Fits inside:** Row 2 (390×133px, positioned at ml-[304px])

---

## 6. Grid8CompanyLogos — Brand showcase

**What it looks like:** A 4-column × 2-row grid of elevated surface rounded cards, each containing a logo. Drop shadow on each cell.

**When to use:**
- "Works with these tools"
- "Used by these companies"
- Tech stack showcase
- Partner/integration logos

**Design notes:**
- Up to 8 logos (4×2 grid)
- App icons → `assets/logos/app/{domain}.png` (fetch: `node scripts/fetch-app-logo.mjs domain.com`)
- Wordmarks → `assets/logos/text/{domain}.svg` (fetch: `node scripts/fetch-logo.mjs domain.com`)
- Each cell: surface background token, `rounded-[5px]`, tokenized shadow

**Fits inside:** Row 3 Card 2 (272×112px area at ml-[18px] mt-[185px])

---

## 7. PastelShadowBorderCard — Key insight

**What it looks like:** A softly tinted glass card with semantic border and drop shadow. Contains a single block of text.

**When to use:**
- Hero insight or key takeaway
- A memorable quote
- The core message of the section
- A CTA or call-to-action statement

**Design notes:**
- Single `text` prop — one strong sentence, ≤100 characters
- Background: `var(--theme-surface-layer-1)`, border: `var(--theme-color-border-accent)`
- Text: 16px medium `var(--theme-color-text-primary)`
- If text is short (≤50 chars), increase to 20px

**Fits inside:** Row 4 (381×161px, positioned at ml-[258px])

---

## 8. ColoredTextBoxes — Category grid

**What it looks like:** A 2×2 grid of colored rounded squares (no text inside the boxes by default).

**When to use:**
- Visual color palette for a concept
- 4 categories shown as color blocks
- Abstract decoration alongside a highlight label

**Design notes:**
- Color via `colorBoxColor` prop — use any accent token
- Pairs visually with `TextBox` components and a `highlightText` label
- The boxes themselves have no text — they're color indicators

**Fits inside:** Row 3 Card 3 (172×98px area)

---

## 9. InfographicHeader — Title block

**What it looks like:** Large bold primary-title text (72px) with one word or phrase highlighted in a tokenized chip, plus an italic subtitle below.

**Design notes:**
- `highlightWord`: pick the most important word in the title — the one that carries the concept
- `highlightColor`: default semantic accent token, can use any accent token
- Subtitle: italic, 32px — completes the thought or adds context
- Title: ≤30 chars for single line. Longer titles wrap and compress.

---

## 10. New Component Patterns

When none of the above fits, build inline JSX. These are proven patterns:

### StatCallout
Large KPI with label. Use when you have a single striking number.
```jsx
<div className="absolute ml-[20px] mt-[60px] flex flex-col items-start gap-[4px]">
  <span className="text-[56px] font-['var(--font\\/family\\/title)'] font-bold text-[var(--theme-color-text-primary)] tracking-[-1.68px] leading-none">87%</span>
  <span className="text-[14px] font-medium text-[var(--theme-color-text-primary)] tracking-[-0.42px]">of users save 2h/day</span>
</div>
```

### StepFlow (horizontal arrow sequence)
3–4 steps connected by arrows. Use for process flows, pipelines.
```jsx
<div className="absolute ml-[20px] mt-[65px] flex items-center gap-[8px]">
  {["Prompt", "Process", "Output"].map((step, i, arr) => (
    <React.Fragment key={step}>
      <div className="bg-[var(--theme-accent-2)] rounded-[8px] px-[14px] py-[10px] shadow-[var(--theme-shadow-card)]">
        <span className="text-[13px] font-['var(--font\\/family\\/title)'] font-semibold text-[var(--theme-color-text-primary)]">{step}</span>
      </div>
      {i < arr.length - 1 && (
        <span className="text-[var(--theme-color-text-primary)] text-[20px] font-bold">→</span>
      )}
    </React.Fragment>
  ))}
</div>
```

### Funnel (CSS clip-path, top to bottom narrowing)
Use for conversion funnels, priority pyramids, filtering flows.
```jsx
{[
  { label: "Awareness", color: "var(--theme-accent-1)", clip: "polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)" },
  { label: "Interest",  color: "var(--theme-accent-2)", clip: "polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)" },
  { label: "Decision",  color: "var(--theme-accent-3)", clip: "polygon(20% 0%, 80% 0%, 70% 100%, 30% 100%)" },
  { label: "Action",    color: "var(--theme-accent-4)",  clip: "polygon(30% 0%, 70% 0%, 60% 100%, 40% 100%)" },
].map(({ label, color, clip }) => (
  <div key={label} style={{ clipPath: clip, backgroundColor: color }}
    className="w-full h-[44px] flex items-center justify-center shadow-[var(--theme-shadow-card)]">
    <span className="text-[13px] font-['var(--font\\/family\\/title)'] font-semibold text-[var(--theme-color-text-primary)]">{label}</span>
  </div>
))}
```

### Pyramid (SVG trapezoids, bottom to top)
Use for hierarchy, maturity models, priority stacking.
Build with inline JSX and semantic tokens when a hierarchy diagram is needed.

---

## 11. Illustrations — Character art

**Path:** `assets/illustrations/oc-*.svg` (vector) and `oc-*.jpg` (raster fallback)

Character illustrations from the Open Peeps / Storyset style. Use to add warmth, fill empty card space, or visually anchor an abstract concept.

**Usage:** Place as an absolutely-positioned `<img>` inside a card body:
```jsx
<img src="/assets/illustrations/oc-target.svg" alt=""
  className="absolute right-[10px] bottom-[10px] w-[120px] h-auto opacity-90" />
```

### Illustration Catalog

| File | Visual | Best for |
|---|---|---|
| `oc-target` | Person aiming at a target | Goals, focus, precision, KPIs |
| `oc-growing` | Person with upward growth | Growth, progress, scaling |
| `oc-lighthouse` | Person next to a lighthouse | Guidance, vision, strategy |
| `oc-puzzle` | Person assembling puzzle pieces | Integration, problem-solving, teamwork |
| `oc-sling-shot` | Person pulling a slingshot | Launch, momentum, acceleration |
| `oc-thinking` | Person in thinking pose | Analysis, ideation, planning |
| `oc-taking-note` | Person writing notes | Documentation, learning, knowledge |
| `oc-on-the-laptop` | Person working on laptop | Productivity, tech, remote work |
| `oc-project-development` | Person with project board | Project management, planning |
| `oc-money-profits` | Person with money/charts | Revenue, ROI, business results |
| `oc-handshake` | Two people shaking hands | Partnership, deals, collaboration |
| `oc-hi-five` | Two people high-fiving | Success, celebration, team wins |
| `oc-handing-key` | Person handing a key | Access, security, onboarding |
| `oc-time-flies` | Person with clock | Time management, deadlines, speed |
| `oc-work-balance` | Person balancing | Work-life balance, trade-offs |

**Design rules:**
- Prefer SVG for crispness at any size
- Size: typically 100–150px wide inside a card, positioned bottom-right or bottom-left
- Use `opacity-90` to blend with the card background
- One illustration per card max — don't overdo it
- Only use when the card has spare space (≥30% empty) or to replace a placeholder

---

## 12. Diagram Patterns — Build with primitives

Use inline JSX + semantic tokens to build conceptual diagrams when list/table components are not enough.

### Recommended patterns

- **Hierarchy / pyramid:** stacked trapezoids built with `clipPath` or nested boxes
- **Concentric priorities:** nested circles for focus rings
- **Venn overlap:** partially overlapping circles with centered labels
- **Cycle loop:** 3-step circular arrows using absolutely positioned pills and arrow glyphs
- **Linear process:** 4-step horizontal chips with connectors
- **Growth staircase:** ascending blocks with one short label per step

### Guidance

- Keep diagrams simple: 3-5 nodes max per visual
- Use only semantic theme tokens (`var(--theme-...)`), never hardcoded colors
- Fit diagrams to their card body by reserving header space and testing at final card size
- Prefer concise labels, then support detail in a nearby paragraph or list

---

## 13. Brand Border Sections — Numbered callout cards

**What it looks like:** A rounded accent card with a 51px title bar and a high-contrast number badge in the top-left.

**When to use:**
- Numbered section intros (1, 2, 3, ...)
- Row-level chapter cards before detailed bullets/tables
- Strong thematic separators between sections

**Component API:**
- Single component: `BrandBorderSectionBase`
- Theme variants: `theme="primary" | "accent" | "support" | "success"`
- Border style: `variant="solid" | "white"`

**Design notes:**
- Shared base component: `BrandBorderSectionBase` (do not duplicate layout across colors)
- Fixed dimensions by Figma family:
  - Solid accent tiers 1/2: `w-[415px] h-[195px]`
  - Solid accent tiers 3/4: `w-[470px] h-[195px]`
  - White-border family: `w-[600px] h-[195px]`
- Header title style is fixed: title-font bold tier `32px`, tracking `-0.96px`
- Badge is fixed: high-contrast rounded square with on-badge number
