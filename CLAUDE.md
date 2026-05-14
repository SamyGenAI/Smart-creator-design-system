# Smart Creator — Master Rules for Claude Code

## What we ship
LinkedIn infographics (**1080×1350**) and slide decks (**1280×720**): React + tokens in `src/index.css` → optional Figma push (`mcp__figma__generate_figma_design`).

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
5. Route to the correct agent: `design-agent` (infographics) · `carousel-copy-agent` (carousels) · `slide-agent` (slides)

The `design-brief-agent` (`.claude/agents/design-brief-agent.md`) handles this step end-to-end.

---

## Infographics workflow

**`design-agent`** (see `.claude/agents/design-agent.md`) writes JSX in [`design/infographics/*.jsx`](design/infographics/) and updates [`src/App.jsx`](src/App.jsx). Follow [`skills/infographics-designer/SKILL.md`](skills/infographics-designer/SKILL.md).

---

## Templates & codegen

| Output | How to create |
|---|---|
| Infographic | **By hand**: `InfographicCanvas` + `components/` + section JSX; **`pnpm generate:design` does not apply** |
| Carousel / slides | **`pnpm generate:design`** from [`templates/template-manifest.json`](templates/template-manifest.json) |

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

---

## Slides (1280×720)

Skill: [`skills/slides/SKILL.md`](skills/slides/SKILL.md) · Agent: `.claude/agents/slide-agent.md` · Slide canvas texture per skill (typically **`SquareGridTexture` at ~60%**).

Workflow: slide-agent → `pnpm dev` → `pnpm export-slides [DeckName]` → `.pptx` under [`design/pptx-slides/output/`](design/pptx-slides/output/).
