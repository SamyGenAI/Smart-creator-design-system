# Smart Creator Design System — Master Rules for Claude Code

## What this project does
Generate LinkedIn infographics (1080×1350px) by:
1. Claude writes a React component using the design system tokens and components
2. Claude pushes the design to Figma using `mcp__figma__generate_figma_design`
3. User edits in Figma manually

**Figma file:** `GBovqF34FkjgtWPj3wUmO3`
**Pages:** Foundations (0:1) · Components (5:15493) · Infographics (5:15851) · Carousels (181:417)

---

## Reference Files

| File | Content | When to read |
|------|---------|-------------|
| `DESIGN.md` | **Single source of truth** — all semantic design tokens, typography, spacing, component specs, and Do's and Don'ts | When looking up any token value or design rule. **Edit this file to change the visual identity.** |
| `references/space-budgets.md` | Per-template vertical budgets + character limits | **Before building any data object** |
| `references/components.md` | Component API reference + max text lengths | When mapping content to components |
| `templates/template-manifest.json` | Template registry used by generation pipeline | When creating new outputs from templates |
| `skills/brand-setup/SKILL.md` | Brand onboarding questionnaire + `DESIGN.md` update flow | When user sets up or rebrands the system |
| `skills/infographics-designer/SKILL.md` | Infographic generation workflow | When user asks to create an infographic |
| `skills/slides/SKILL.md` | Slide deck generation workflow | When user asks to create slides or a presentation |
| `skills/slides/references/slide-layouts.md` | Slide layout pixel specs + character limits | Before writing any slide JSX |

---

## Canvas

| Property | Value |
|---|---|
| Width | 1080px |
| Height | 1350px |
| Background | `#fffceb` (cream) |
| Texture | `SquareGridTexture` component at 5% opacity |
| Inner content width | 981px (centered) |
| Row gap | 22px |

The canvas uses **absolute positioning**. All sizes are fixed in px, not responsive.

---

## Workflow — generating an infographic (Copy-First, 3 Agents)

Uses three specialized subagents in `.claude/agents/`:

```
User topic → copy-agent → design-agent → qc-agent → Done
```

| Step | Agent | Job | Output |
|------|-------|-----|--------|
| 1 | `copy-agent` | Write content, count chars, assign hierarchy | JSON content brief |
| 2 | *(user approval)* | Review copy brief | Approved brief |
| 3 | `design-agent` | Pick components, calculate layout, write JSX | `design/infographics/*.jsx` + `src/App.jsx` |
| 4 | `qc-agent` | Verify footer/overflow/chars/colors/structure | PASS or FAIL report |
| 5 | *(if QC fails)* | Fix issues, re-run QC | Repeat until PASS |
| 6 | *(optional)* | Push to Figma via `mcp__figma__generate_figma_design` | Design in Figma |

See `skills/infographics-designer/SKILL.md` for the full workflow details.

**NEVER modify the visual layout, component sizes, or token values — only the content data.**

---

## Assets

```
assets/
├── avatar/avatar-profile.png ← User profile / headshot (@setup puts it here)
├── textures/                  ← Background textures
├── logos/app/{domain}.png     ← fetch: node scripts/fetch-app-logo.mjs domain.com
├── logos/text/{domain}.svg    ← fetch: node scripts/fetch-logo.mjs domain.com
├── icons/                     ← Section header icons (user adds manually)
└── illustrations/             ← Open-source character illustrations (SVG + JPG)
```

---

## Figma Integration

- **Push-to-edit (primary):** `mcp__figma__generate_figma_design` — requires self-contained JSX with Tailwind classes and `data-node-id` attributes.
- **Auth scope:** pushes land in the Figma account currently authenticated in MCP. For lead-magnet distribution, each user must authenticate MCP with their own Figma account.
- **Read:** `mcp__figma__get_design_context` to verify designs, `mcp__figma__get_metadata` to explore pages

---

## Token Workflow

`DESIGN.md` is the **only** file that defines design tokens. Everything else is derived from it automatically.

| Generated / derived file | How it gets tokens | Never edit directly |
|---|---|---|
| `src/index.css` | `pnpm tokens:gen` | ✓ |
| `tailwind.config.js` theme | Auto — reads `DESIGN.md` at Tailwind build time | ✓ |
| All `components/*.jsx` | CSS variables (`var(--token)`) + Tailwind token classes | ✓ |
| All `design/**/*.jsx` | CSS variables + Tailwind token classes | ✓ |

**When to run `pnpm tokens:gen`:** after every edit to `DESIGN.md`. Regenerates `src/index.css` (CSS custom properties). Tailwind reads DESIGN.md at build time — no extra step needed.

**Tailwind token aliases** (resolved from DESIGN.md, usable as Tailwind classes):
- Colors: `bg-bg-brand`, `bg-bg-canvas`, `bg-bg-accent-1`, `bg-bg-accent-2`, `bg-bg-accent-3`, `bg-bg-accent-4`, `bg-bg-accent-5`, `text-text-primary`
- Border radius: `rounded-glass`, `rounded-glass-header`, `rounded-card`, `rounded-pill`
- Shadows: `shadow-card`, `shadow-elevation-100` … `shadow-elevation-500`
- Fonts: `font-montserrat`, `font-noto-serif`

**CSS variable pattern** (for inline styles): `'var(--color\\/blue\\/500, #092c69)'`

**What stays hardcoded** in `tailwind.config.js` (canvas structure — not brand tokens):
- `width/height`: canvas and footer fixed dimensions (1080px / 1350px)
- `borderWidth: { 3: '3px' }`: utility override
- `gridColumn/gridRow: { '1': '1' }`: Figma MCP overlap grid helper

---

## Rules for Claude

1. **Never hardcode token values** — use semantic Tailwind token classes (`bg-bg-brand`, `font-montserrat`, `rounded-glass`, `shadow-card`) or CSS variables (`var(--theme-...)`). Edit `DESIGN.md` + run `pnpm tokens:gen` to change them globally.
2. **Do not hand-edit `src/index.css`** — keep it generated from `DESIGN.md` via `scripts/generate-tokens.mjs`. If variable slots must change, update `scripts/generate-tokens.mjs`.
3. **Never change component structure** — only pass different prop values.
4. **Never download icons** — reference local paths, let user provide files.
5. **Never make the layout responsive** — it's a fixed 1080×1350px canvas.
6. **Always preserve** `data-node-id` and `data-name` attributes.
7. **Content only** — when generating a new infographic, only update the `data` object.
8. **Escape slashes in Tailwind** — `bg-[var(--color\/blue\/500,#092c69)]` not `--color/blue/500`.
9. **Image assets expire** — Figma MCP URLs last 7 days. Save to `assets/` immediately.
10. **Check space budgets** — read `references/space-budgets.md` before generating content. Respect all character limits.
11. **Check SKILL.md** before generating — it contains the trigger and content workflow.
12. **Image containment** — in absolute cells, use `flex items-center justify-center` on container + `w-full h-full object-contain` on img. Never use `display: contents`.
13. **Icons on primary headers are white** — `PrimaryGlassSection` applies brightness/invert filter. Always pass dark/black SVGs.
14. **Logo scripts** — app icons: `node scripts/fetch-app-logo.mjs domain.com`. Wordmarks: `node scripts/fetch-logo.mjs domain.com`.
15. **Text size is adaptive** — body text can increase to fill space (min 12px, max 18px for body), preserving hierarchy: card body < card title < section title < header.
16. **Brand border sections use shared base** — always use wrapper components (`*SolidBorderSection`, `*WhiteBorderSection`), never duplicate JSX.
17. **`templates/` is source-only and typed** — use `templates/infographics/`, `templates/carousels/`, `templates/pptx-slides/` only. No JSX files at `templates/` root.
18. **Templates define the skeleton, designs can be richer.** `design/*` outputs may be more detailed than templates for creativity/adaptability, but should preserve the same structural narrative and layout logic.
19. **Figma push — never auto-open the browser.** When pushing to Figma, generate the capture ID then immediately give the user the URL and say "Please open this URL in your browser to trigger the capture." Do not use `cmd start`, `open`, or any shell command to open a browser. Just share the URL.
20. **Default Figma mode is push-to-edit.** Keep the workflow focused on push + manual edit in Figma.
21. **Account safety for distribution.** Remind users that push destination follows the currently authenticated MCP Figma account. For user-owned files, user must authenticate MCP with their own Figma account before pushing.
22. **`design/` is output-only** — generated files live in typed subfolders:
    - `design/infographics/[Name]Infographic.jsx` — 1080×1350 single-canvas pieces
    - `design/carousels/[Name]Carousel.jsx` — 1080×1350 multi-slide carousels
    - `design/pptx-slides/[Name]Slides.jsx` + `[Name]Slides.data.js` — 1280×720 slide decks
    - `design/pptx-slides/output/[Name]Slides.pptx` — exported PPTX files
    Files inside these subfolders import components with `'../../components/...'` (two levels up).
23. **Generate outputs through the pipeline** — use `pnpm generate:design -- --type ... --template ... --name ... --data ...` so new files always originate from template sources and register in `src/App.jsx`.
24. **Validate before generation** — run `pnpm design:validate && pnpm tokens:gen && pnpm templates:check` (or `pnpm preflight`) after changing `DESIGN.md` or templates.
25. **In `design/**/*.jsx`, never use color literals or color-named constants** — no `#hex`, no `rgb/rgba/hsl/hsla`, and no names like `CREAM`, `NAVY`, `BLACK`. Use semantic token constants only (for example `BACKGROUND_PRIMARY`, `SURFACE_ELEVATED`, `TEXT_PRIMARY`) mapped to `var(--theme-...)`.

---

## Slides (16:9 YouTube/Keynote presentations)

| Property | Value |
|---|---|
| Canvas | 1280×720px |
| Background | `#FFFCEB` (`--color/bg/canvas`) |
| Texture | `SquareGridTexture` at 60% opacity |
| Font | Montserrat only |
| Skill | `skills/slides/SKILL.md` |
| Agent | `.claude/agents/slide-agent.md` (single agent, no QC step) |

**Workflow:**
```
User topic → slide-agent → pnpm dev (preview) → pnpm export-slides [Name] → design/pptx-slides/output/[Name]Slides.pptx
```

**Data sidecar pattern** — agent always creates two files:
- `design/pptx-slides/[Name]Slides.data.js` — pure JS, exports `SLIDE_DATA`, no JSX
- `design/pptx-slides/[Name]Slides.jsx` — React component, imports from `.data.js`

The export script (`scripts/export-slides.mjs`) reads from `.data.js` directly (no Vite needed).

**Export command:** `pnpm export-slides [DeckName]`
Output: `design/pptx-slides/output/[DeckName]Slides.pptx`

**App.jsx MODES entry** (added by agent):
```js
[topicSlug]: { label: '...', component: [...], type: 'slides', slideCount: N }
```
