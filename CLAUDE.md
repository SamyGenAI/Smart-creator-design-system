# Smart Creator — Master Rules for Claude Code

## What we ship
LinkedIn infographics (**1080×1350**, React preview) and slide decks (**4:3** `.pptx` via PptxGenJS + photo preview in the app): brand tokens in `DESIGN.md` / `src/index.css` → optional Figma push for infographics (`mcp__figma__generate_figma_design`).

**Figma file:** read `FIGMA_FILE_KEY` from `.env` (see [`.claude/commands/figma.md`](.claude/commands/figma.md) for setup)

---

## Read first

| Path | Purpose |
|---|---|
| [`skills/design-brief/SKILL.md`](skills/design-brief/SKILL.md) | **Pre-flight brief** — enrich any design prompt before handing off to a design agent |
| [`skills/infographics-designer/SKILL.md`](skills/infographics-designer/SKILL.md) | Infographic canvas, layout, components, tokens — **primary reference** |
| [`DESIGN.md`](DESIGN.md) | YAML tokens — **only** place brand `#hex` and font names belong; drives Tailwind via `tailwind.config.js` |
| [`skills/brand-setup/SKILL.md`](skills/brand-setup/SKILL.md) | Onboarding / rebrand: Track A or B → `DESIGN.md` + sync `src/index.css` |

---

## Infographic canvas

| Item | Rule |
|---|---|
| Size | **1080×1350**, fixed px, non-responsive |
| Root | **`InfographicCanvas`** — `bg-bg-canvas` + `SquareGridTexture` at **5%** (never roll your own full-canvas texture) |
| Inner | **981px** centered · row gap **22px** · header/footer **`flex-none`**, body **`flex-1`** |
| Position | overlap grid helpers allowed (`col-1`/`row-1` + margins) |

---

## Design brief (pre-flight — all formats)

Before generating any design (infographic, carousel, or slides), run the **design-brief** workflow:

1. Read [`skills/design-brief/SKILL.md`](skills/design-brief/SKILL.md)
2. Ask topic, audience, key takeaway, tone, source material + format-specific questions in **one message**
3. Draft the structured brief and present for approval
4. **Do not write any files until the brief is approved**
5. Route to the correct agent: `infographic-design-agent` (infographics) · `carousel-copy-agent` (carousels) · `slide-agent` (slides)

For **infographics**, the brief step and the build step are owned by the **same** agent — [`.claude/agents/infographic-design-agent.md`](.claude/agents/infographic-design-agent.md) — so there is no separate brief agent to hand off to. For carousels and slides, the brief is drafted in-chat before delegating.

---

## Infographics workflow

**`infographic-design-agent`** (see [`.claude/agents/infographic-design-agent.md`](.claude/agents/infographic-design-agent.md)) drafts the brief, waits for approval, then writes JSX in [`design/infographics/*.jsx`](design/infographics/) and updates [`src/App.jsx`](src/App.jsx). It is required to read [`skills/infographics-designer/SKILL.md`](skills/infographics-designer/SKILL.md), prior designs under [`design/infographics/`](design/infographics/), and the [`components/`](components/) library before drafting.

---

## Templates & codegen

| Output | How to create |
|---|---|
| Infographic | **By hand**: `InfographicCanvas` + `components/` + section JSX; **`pnpm generate:design` does not apply** |
| Carousel | **`pnpm generate:design`** from [`templates/template-manifest.json`](templates/template-manifest.json) |
| Slide deck | **`slide-agent`** → one `design/pptx-slides/[Name]Slides.mjs` per deck, ports from [`design/pptx-slides/templates/`](design/pptx-slides/templates/) |

---

## Tokens & color (brand-agnostic)

- **Chroma lives only in `DESIGN.md`** (YAML `#hex` and references) and in **`src/index.css`** as CSS variables. Tailwind color utilities come from `DESIGN.md` via `tailwind.config.js`.
- **Never put chroma in `design/**/*.jsx`** — no `#hex`, `rgb()`, `hsl()`, named colors, or hardcoded `fontFamily: '…'` in infographic (or other design) files. Use Tailwind tokens (`bg-bg-canvas`, `text-text-primary`, …) and/or `var(--theme-…)`, `var(--color/…)`, `var(--font/family/…)` everywhere, **including every SVG `fill` / `stroke` / `color`**.
- **`src/index.css`:** edit `:root` variables when the palette changes; keep them aligned with `DESIGN.md` after onboarding (**[`skills/brand-setup/SKILL.md`](skills/brand-setup/SKILL.md)** — Track A/B, `apply-brand-answers`, Done checklist).
- Escape slashes in arbitrary Tailwind: `bg-[var(--color\/bg\/brand)]`.

---

## Global rules

1. **Assets:** local paths only; no downloading icons · Figma image URLs expire (~7 days) → save under `assets/`.
2. **Images:** containers `flex items-center justify-center` · `img` `w-full h-full object-contain` · never `display: contents`.
3. **Primary glass icons:** dark SVGs only (`PrimaryGlassSection` filters to white).
4. **Preserve** `data-node-id` / `data-name` on design-system nodes.
5. **`design/` imports:** `'../../components/...'` from `design/infographics/` (two levels up).
6. **Figma push:** share capture URL — **never** shell-open browser · remind user auth = their MCP Figma account.
7. **DESIGN.md:** after YAML changes, Tailwind theme updates on next dev/build; run `pnpm design:validate` if you want YAML checked.
8. **Do NOT render previews.** Never call `render.py`, `python render.py …`, `curl /api/export/png|pdf`, or any other server/headless render step to "verify" a design. The user runs `pnpm dev` themselves once the design file is written — that is the only inspection step. Stop after writing the JSX + registering in `src/App.jsx`.
9. **No hardcoded creator identity.** Never put a creator name, handle, URL, or avatar path directly in `design/**/*.jsx`. Always use `<InfographicFooter />` (reads from `src/creatorIdentity.js` + `/assets/avatar/avatar-profile.png` automatically). If the body copy needs the display name, import `CREATOR_DISPLAY_NAME` from `src/creatorIdentity.js`. This keeps every design rebrandable in one place.
10. **Mandatory infographic components.** Every infographic must use `InfographicHeader` for the title block and `InfographicFooter` for the footer — never replace them with custom divs. Section cards must come from `PrimaryGlassSection` or `BrandBorderSectionBase` (or other `components/` primitives) rather than being written from scratch.

---

## Slides (PowerPoint / Google Slides 16:9 — `LAYOUT_16x9`, 10 in × 5.625 in)

Skill: [`skills/pptx/SKILL.md`](skills/pptx/SKILL.md) + [`skills/pptx/slide-templates.md`](skills/pptx/slide-templates.md) + [`skills/pptx/pptxgenjs.md`](skills/pptx/pptxgenjs.md) · Agent: `.claude/agents/slide-agent.md` · Templates: [`design/pptx-slides/templates/slideTemplates.html`](design/pptx-slides/templates/slideTemplates.html) · Tokens: `DESIGN.md` + `src/index.css`.

Each deck is **one standalone PptxGenJS Node script** at `design/pptx-slides/[Name]Slides.mjs`. Content slides port from the **15-layout template catalog** (`slideTemplates.manifest.json`). The slide-agent also captures **slide photos** to `public/screenshots/powerpoint/[preview-slug]/` via `scripts/screenshot.mjs` (Playwright) and registers the deck in `src/modes.js` + `src/App.jsx` (`PptxSlideShow`).

Workflow:

1. `/powerpoint <topic>` — draft brief (`skills/design-brief/SKILL.md`), wait for approval.
2. On approval, **`slide-agent`** delivers: `.mjs` script, `.pptx`, slide photos, QA grid, app registration.
3. User runs **`pnpm dev`** — browse slides in the browser, click **Download PPTX** for the editable file.
