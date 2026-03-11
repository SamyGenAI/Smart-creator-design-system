---
name: infographics-designer
description: Design and generate LinkedIn infographics (1080×1350px) using the Smart Creator Design System. Use when the user asks to create, design, or build a LinkedIn infographic, visual post, or graphic. Triggers on requests like "make an infographic about...", "create a LinkedIn post about...", "design a visual on...", "build an infographic for...", or any visual content creation for LinkedIn.
---

# Infographics Designer

The bottleneck is **design**, not data. The job is to choose the right visual component for each piece of content, ensure no card has dead space, and scale typography so everything feels intentional.

See `references/visual-components.md` for the full component vocabulary and design patterns.
See `references/example-data.md` for complete worked examples.

**Visual assets available:**
- **Illustrations** (`assets/illustrations/`) — Open-source character illustrations (SVG + JPG). Use to fill empty card space, add personality, or illustrate abstract concepts. See `references/visual-components.md` §11 for the full catalog.
- **Infographic shapes** (`assets/infographics/`) — Prop-driven SVG React components: `Pyramid`, `Target`, `VennDiagram`, `FrogJumps`, `Growth`, `Loop`, `Onion`, `Process`. Use these instead of building geometric shapes from scratch. See `references/visual-components.md` §12 for props and sizing.

---

## Core Design Laws

**1. Never use plain bullets or dashes.**
Every list item must have a visual anchor: icon chip, numbered badge, checkmark, logo, or color swatch. If none of the existing components fit, build a new one.

**2. Every card must feel full.**
- Too much text → reduce font size (minimum 12px)
- Too little text → increase font size (up to 18px for body), or add a visual element
- Target: ≤15% of card interior as empty space

**3. Color signals meaning.**
- Blue chips (`chip-blue #b4eaff`) → features, capabilities, primary content
- Amber chips (`chip-amber #fde68a`) → process, how-it-works, steps
- Green (`chip-green #d2ff9a`) → actions, outcomes, checklists
- Pink badges → numbered/ranked items
- Keep color consistent within each row

**4. Every section header needs an icon.**
Pass `iconSrc` to `GlassNavySection` for every card. If user hasn't provided icons yet, use `null` and note it.

**5. Screenshots and images add credibility.**
When a card has spare horizontal space, add a screenshot or image (`imageSrc`). Especially effective in Row 1 Card 2 and Row 2.

---

## Design Workflow

### Step 0 — Start from a template
When using an existing template as a design starting point, **duplicate it into the `design/` folder** before making any changes. This keeps the original template clean and gives you an isolated copy to iterate on.

```
cp templates/MyTemplate.jsx design/MyTemplate.jsx
```

All content iteration happens in `design/`. The `templates/` folder stays read-only.

### Step 1 — Understand the content structure
From the user's topic, identify:
- How many distinct ideas? (maps to rows/cards)
- Which ideas are lists? comparisons? steps? stats? categories?
- Is there a "hero insight" worth featuring large?

### Step 2 — Map content to components
Read `references/visual-components.md`. Ask: **"What is the most visual way to show this?"**

| Content type | Best component |
|---|---|
| Feature list, use cases, benefits | `IconBullet` |
| Checklist, requirements, actions | `Checklist` |
| Ranked list, steps 1-2-3 | `NumberBullet` |
| Comparison data, matrix | `Table` |
| Brand/tool showcase | `Grid8CompanyLogos` |
| Key quote, insight, CTA | `PastelShadowBorderCard` |
| Numbered section callout (colored border) | `OrangeSolidBorderSection`, `BlueSolidBorderSection`, `PinkSolidBorderSection`, `GreenSolidBorderSection` |
| Numbered section callout (white border + shadow) | `OrangeWhiteBorderSection`, `BlueWhiteBorderSection`, `PinkWhiteBorderSection`, `GreenWhiteBorderSection` |
| Categories, tags, themes | `ColoredTextBoxes` |
| Large stat or KPI | **Build new: `StatCallout`** |
| Hierarchy, focus, layers | `Pyramid`, `Target`, `Onion` (from `assets/infographics/`) |
| Cycle, loop, feedback | `Loop` (from `assets/infographics/`) |
| Process, pipeline | `Process`, `FrogJumps` (from `assets/infographics/`) |
| Overlap, intersection | `VennDiagram` (from `assets/infographics/`) |
| Growth, progress | `Growth` (from `assets/infographics/`) |
| Abstract concept needing warmth | **Illustration** (from `assets/illustrations/`) |

### Step 3 — Present the design spec for approval

**STOP. Do not generate code yet.**

Present the full design spec to the user as a structured table:

```
## Proposed Design

**Title:** "..." (highlight: "...")
**Subtitle:** "..."
**Template:** Infographic / ComparisonInfographic

| Row | Card | Header title | Component | Content summary | Illustration/Shape |
|-----|------|-------------|-----------|----------------|--------------------|
| 1   | 1    | ...         | Checklist | 3 items: ...   | —                  |
| 1   | 2    | ...         | IconBullet| 4 items: ...   | oc-target.svg      |
| 2   | —    | ...         | Pyramid   | 3 tiers: ...   | —                  |
| ... | ...  | ...         | ...       | ...            | ...                |

**Notes:** [any icons the user needs to add, any missing assets]

Ready to generate?
```

Wait for the user to confirm, request changes, or approve. **Only proceed to Step 4 after explicit user approval.**

### Step 4 — Validate against space budgets, then build the data object

**MANDATORY: Read `references/space-budgets.md` for the chosen template before writing any content.**

For each text value in your data object, verify it fits within the documented character limits:
- Infographic title ≤ 18 chars, subtitle ≤ 40 chars
- Card headers ≤ 20 chars (32px) or ≤ 25 chars (24px)
- Checklist items ≤ 25 chars, IconBullet items ≤ 30 chars, NumberBullet items ≤ 18 chars
- Table cells ≤ 10 chars
- See `references/space-budgets.md` for the full limits table

If content exceeds a limit, **shorten the text** — do not increase component dimensions.

Use the template in `references/example-data.md`.
For infographic shapes, import from `assets/infographics/` — e.g. `import Pyramid from '../assets/infographics/Pyramid.jsx'`.
For illustrations, reference `assets/illustrations/oc-*.svg` (or `.jpg`) via `<img>` tags.
For new components, write JSX directly into the template at the correct row position.

### Step 5 — Write App.jsx and push to Figma
Update `src/App.jsx`, then call `mcp__figma__generate_figma_design`.

---

## Using Visual Assets

### Infographic shapes (`assets/infographics/`)
These are prop-driven React/SVG components. Import and place them inside cards:
```jsx
import Pyramid from '../assets/infographics/Pyramid.jsx'
// Then in the card body:
<Pyramid tiers={[{ value: "10K", label: "Awareness", body: "Top of funnel" }, ...]} />
```
All shapes accept a `className` prop for sizing. See `references/visual-components.md` §12 for each shape's props.

### Illustrations (`assets/illustrations/`)
Character illustrations add personality and fill empty card space. Use as `<img>` tags:
```jsx
<img src="/assets/illustrations/oc-target.svg" alt="" className="absolute right-[10px] bottom-[10px] w-[120px] h-auto opacity-90" />
```
See `references/visual-components.md` §11 for the full catalog and which concepts they convey.

### Building truly new components
Only build from scratch when no existing component or shape fits. Follow the container pattern:
```jsx
<div className="rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-[var(--components\/card-title\/blue,#b4eaff)]">
```
Always use design tokens for colors, Montserrat for fonts, and fixed px sizing.

---

## Typography Sizing Guide

| Card content density | Font size | When |
|---|---|---|
| Very dense (4+ long items) | 12px | Full icon-bullet lists with long text |
| Normal (2–4 items) | 14px | Default for all components |
| Sparse (1–2 short items) | 16–18px | Single stats, short callouts |

Hierarchy rule: card body < section label < navy header (32px, fixed) < main title (72px, fixed). Never exceed the next tier when scaling up.

---

## Creating New Templates (Bento Grid Pattern)

Use this pattern when building a new infographic template from scratch with many sections.

### Bento Grid Layout

Use **CSS Grid with `fr` rows** so vertical space is auto-distributed — no dead space at the bottom:

```jsx
<div
  className="flex-1 w-full mt-[14px] mb-[14px]"
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '2fr 3fr 3fr 3fr 2fr', // tune row weights to content density
    gap: '12px',
  }}
>
  {/* Full-width row */}
  <div style={{ gridColumn: '1 / -1' }}>
    <GlassNavySection title="..." className={GLASS} />
  </div>

  {/* Two-column rows */}
  <BlueSolidBorderSection title="..." number="1" widthClass="w-full" heightClass="h-full" />
  <OrangeSolidBorderSection title="..." number="2" widthClass="w-full" heightClass="h-full" />
</div>
```

The outer column must be `flex flex-col h-full` with `flex-1` on the grid div and `flex-none` on header/footer.

### Bento Design Rules

1. **Only use existing section components** — `GlassNavySection` and `[Color]SolidBorderSection`. Never add placeholder elements, dashed outlines, or wrapper divs inside empty card bodies.
2. **Alternating colors, no two adjacent cells share a color** — across both columns and rows. Sequence example: blue/orange → green/pink → orange/blue → green/navy.
3. **Full-width rows for intro/summary sections** — use `gridColumn: '1 / -1'` for the first and last rows. Give them less `fr` weight (e.g. `2fr`) since they need less height than content rows (`3fr`).
4. **Pass `widthClass="w-full" heightClass="h-full"`** to all `[Color]SolidBorderSection` children so they fill their grid cell. The `GLASS` constant handles this for `GlassNavySection`.
5. **Section titles use actionable verbs** — e.g. "Create Context Files" not "Context Files", "Install Plugins" not "Plugins", "Schedule Tasks" not "Scheduled Tasks".
6. **Empty bodies stay empty** — do not render placeholder content, dashed borders, or anything inside an empty card. The colored header bar + clean interior is the correct empty state.
7. **All new templates MUST use the bento grid pattern.** The `Infographic.jsx` inline-grid pattern is legacy and must not be copied. The bento pattern with `flex-none` header/footer and `flex-1` grid body **structurally prevents** the footer from being pushed off-canvas.
