# Smart Creator Content OS — Master Rules for Codex

## What this repo is

This repo is Samy's **Content OS**: content skills, channel pipelines, and the design system in one place. It drafts The Smart Creator newsletter and the content that sells the Smart Operating System. Grok Bot orchestrates. Claude Code, Codex, or Cursor do the work. The sibling repo `Smart-creator-lead-gen-system` is GTM OS. Do not rename this repo.

Four things to do, in order:

1. **This is the Content OS.** Copy and visuals are one workflow. The design system below is the render layer, and its rules still apply.
2. **Read the vault first.** The private vault is [Samy-SmartOS](https://github.com/SamyGenAI/Samy-SmartOS), on Karpathy's LLM-wiki layout. Its path is `VAULT_PATH` in `.env`, default `../Samy-SmartOS`. Rules: [`pipelines/vault.md`](pipelines/vault.md). Read `$VAULT/CLAUDE.md` and follow its **Content Workflow**. Never write `$VAULT/raw/`. Never overwrite a draft that is already in the folder. Do not copy vault files into this repo. If the checkout is missing, stop and ask Samy to set `VAULT_PATH`.
3. **Run the one waterfall.** The only content pipeline is [`pipelines/content-waterfall.md`](pipelines/content-waterfall.md). It calls four writers, in order: newsletter, YouTube, LinkedIn, X. One asset at a time. State is the vault folders `outputs/content/<channel>/{drafts,published}/<title>/`, plus `waterfall.json` for that idea. Asset names and design handoffs are in [`pipelines/platforms.json`](pipelines/platforms.json).
4. **Render with the design system, as today.** Build visuals with the design skills and export from this app. Samy runs `pnpm dev` and uses the preview toolbar **Export** menu. With the dev server up, the same routes are `GET /api/export/png?mode=<modeKey>`, `GET /api/export/pdf?mode=<modeKey>` (carousels), `GET /api/export/pptx?mode=<modeKey>` (decks) and `GET /api/export/gif?mode=<modeKey>` (animated infographics only). Save the file into the draft's `Assets/`. Do not call `render.py`.

| Order | Writer | Formats |
|---|---|---|
| 1. Newsletter | `newsletter-writer` | Issue, then the 420×300 thumbnail |
| 2. YouTube | `youtube-writer` | Script, titles, description, thumbnail concept |
| 3. LinkedIn | `linkedin-writer` | Post, hooks, carousel |
| 4. X | `x-writer` | Article, thread, post |

Check what already exists before writing:

```bash
node scripts/content-waterfall.mjs status --title "<title>"
node scripts/content-waterfall.mjs next --title "<title>"
```

Public numbers, results and testimonials come only from `$VAULT/raw/me/proof.md` or a source named in the draft. The content calendar is in Notion. Stages: **Idea**, **Research / Scripting**, **Design or Filming**, **Final copy / Editing**, **Scheduled**, **Posted**. Samy approves every piece. Nothing is posted or sent automatically. A channel counts as published only after he says so. Then `node scripts/content-waterfall.mjs approve --title "<title>" --channel <channel> --yes` moves that folder and does not post. There is no inbox tool yet; `linkedin-unibox-reply` drafts from threads he pastes. Video editing and motion graphics are **later**.

`graphics-designer` chooses a graphic and hands the build to a design skill. It does not replace `infographics-designer`. `youtube-thumbnail` is a 1280×720 concept. `newsletter-thumbnail-designer` is the 420×300 email image. Do not swap them.

---

## What we ship
LinkedIn infographics (**1080×1350**, React preview) and slide decks (**16:9** JSX live preview + `.pptx` via PptxGenJS): brand tokens in `DESIGN.md` / `src/index.css` → optional Figma push for infographics (`mcp__figma__generate_figma_design`).

**Figma file:** read `FIGMA_FILE_KEY` from `.env` (see `.claude/commands/figma.md` for setup)

---

## Read first

| Path | Purpose |
|---|---|
| [`skills/infographics-designer/SKILL.md`](skills/infographics-designer/SKILL.md) | Infographic canvas, layout, components, tokens — **primary reference** |
| [`DESIGN.md`](DESIGN.md) | YAML tokens — **only** place brand `#hex` and font names belong; drives Tailwind via `tailwind.config.js` |
| [`skills/brand-setup/SKILL.md`](skills/brand-setup/SKILL.md) | Onboarding / rebrand: Track A or B → `DESIGN.md` + sync `src/index.css` |

---

## Infographic canvas

| Item | Rule |
|---|---|
| Size | **1080×1350**, fixed px, non-responsive |
| Root | **`InfographicCanvas`** — `bg-bg-canvas` + the selected background texture (chosen in the preview toolbar; never roll your own full-canvas texture) |
| Inner | **981px** centered · row gap **22px** · header/footer **`flex-none`**, body **`flex-1`** |
| Position | overlap grid helpers allowed (`col-1`/`row-1` + margins) |

---

## Design brief (pre-flight — all formats)

Before generating any design, run the **design-brief** workflow:

1. Read `skills/design-brief/SKILL.md`
2. Ask topic, audience, key takeaway, tone, source material + format-specific questions in one message
3. Draft the structured brief and present for approval
4. **Do not write any files until the brief is approved**
5. Route to the correct agent: `infographic-design-agent` (infographics) · `carousel-copy-agent` (carousels) · `slide-agent` (slides)

For **infographics**, the brief step and the build step are owned by the **same** agent — `.codex/agents/infographic-design-agent.md` — so there is no separate brief agent to hand off to.

---

## Infographics workflow

**`infographic-design-agent`** (see `.codex/agents/infographic-design-agent.md`) drafts the brief, waits for approval, then writes JSX in [`design/infographics/*.jsx`](design/infographics/) and updates [`src/App.jsx`](src/App.jsx). It is required to read [`skills/infographics-designer/SKILL.md`](skills/infographics-designer/SKILL.md), prior designs under [`design/infographics/`](design/infographics/), and the [`components/`](components/) library before drafting.

---

## Templates & codegen

| Output | How to create |
|---|---|
| Infographic | **By hand**: `InfographicCanvas` + `components/` + section JSX; **`pnpm generate:design` does not apply** |
| Carousel | **`pnpm generate:design`** from [`templates/template-manifest.json`](templates/template-manifest.json) |
| Slide deck | **`slide-agent`** → `design/pptx-slides/[Name]Slides.mjs` + shared `slide-engine.*` |

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

---

## Slides (PowerPoint / Google Slides 16:9 — `LAYOUT_16x9`, 10 in × 5.625 in)

Skill: [`skills/pptx/SKILL.md`](skills/pptx/SKILL.md) + [`skills/pptx/slide-templates.md`](skills/pptx/slide-templates.md) + [`skills/pptx/pptxgenjs.md`](skills/pptx/pptxgenjs.md) · Agent: `.codex/agents/slide-agent.md` · Templates: [`design/pptx-slides/templates/slideTemplates.html`](design/pptx-slides/templates/slideTemplates.html) · Tokens: `DESIGN.md` + `src/index.css`.

Each deck is **one file**: `design/pptx-slides/[Name]Slides.mjs` exports `{ meta, slides }`. Shared **`slide-engine.mjs`** (layouts), **`slide-preview.jsx`** (browser), and **`slide-engine.pptx.mjs`** (export) render the same deck for preview and `.pptx`.

Workflow:

1. `/powerpoint <topic>` — brief, approval.
2. **`slide-agent`** writes `[Name]Slides.mjs`, registers app, captures preview JPGs.
3. User runs **`pnpm dev`** — browse slides, **Download PPTX**.
