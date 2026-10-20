# Smart Creator Content OS — Master Rules for Claude Code

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

**Figma file:** read `FIGMA_FILE_KEY` from `.env` (see [`.claude/commands/figma.md`](.claude/commands/figma.md) for setup)

---

## Read first

| Path | Purpose |
|---|---|
| [`skills/design-brief/SKILL.md`](skills/design-brief/SKILL.md) | **Pre-flight brief** — enrich any design prompt before handing off to a design agent |
| [`skills/infographics-designer/SKILL.md`](skills/infographics-designer/SKILL.md) | Infographic canvas, layout, components, tokens — **primary reference** |
| [`DESIGN.md`](DESIGN.md) | YAML tokens — **only** place brand `#hex` and font names belong; drives Tailwind via `tailwind.config.js` |
| [`skills/brand-setup/SKILL.md`](skills/brand-setup/SKILL.md) | Onboarding / rebrand: Track A or B → `DESIGN.md` + sync `src/index.css` |
| [`skills/newsletter-thumbnail/SKILL.md`](skills/newsletter-thumbnail/SKILL.md) | Newsletter thumbnail **420×300** — canvas, title block, visual area |

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

## Newsletter thumbnails (420×300)

Skill: [`skills/newsletter-thumbnail/SKILL.md`](skills/newsletter-thumbnail/SKILL.md) · Command: `/newsletter-thumbnail`

| Item | Rule |
|---|---|
| Size | **420×300**, fixed px (override only on request) |
| Root | **`NewsletterThumbnailCanvas`** — `bg-bg-canvas` + the selected background texture |
| Title | **`NewsletterThumbnailTitle`** — centred, optional inline highlighter bar (`highlightWord`) |
| Below title | **`NewsletterThumbnailVisual`** — `empty` · `image` (local asset) · `design` (JSX children) |

`/newsletter-thumbnail` **asks for the title + the visual below it**, then writes
`design/newsletter-thumbnails/[Name]Thumbnail.jsx` and registers it in `src/modes.js`
(`type: 'thumbnail'`) + the `COMPONENTS` map in `src/App.jsx`. Export is PNG from the
preview toolbar. Same token rules as infographics — no chroma in the design file.

## Templates & codegen

| Output | How to create |
|---|---|
| Infographic | **By hand**: `InfographicCanvas` + `components/` + section JSX; **`pnpm generate:design` does not apply** |
| Carousel | **`pnpm generate:design`** from [`templates/template-manifest.json`](templates/template-manifest.json) |
| Slide deck | **`slide-agent`** → `design/pptx-slides/[Name]Slides.mjs` + shared `slide-engine.*` |
| Newsletter thumbnail | **By hand**: `NewsletterThumbnailCanvas` + title + visual components |

---

## Tokens & color (brand-agnostic)

- **Chroma lives only in `DESIGN.md`** (YAML `#hex` and references) and in **`src/index.css`** as CSS variables. Tailwind color utilities come from `DESIGN.md` via `tailwind.config.js`.
- **Never put chroma in `design/**/*.jsx`** — no `#hex`, `rgb()`, `hsl()`, named colors, or hardcoded `fontFamily: '…'` in infographic (or other design) files. Use Tailwind tokens (`bg-bg-canvas`, `text-text-primary`, …) and/or `var(--theme-…)`, `var(--color/…)`, `var(--font/family/…)` everywhere, **including every SVG `fill` / `stroke` / `color`**.
- **`src/index.css` is generated** from `DESIGN.md` by `scripts/generate-index-css.mjs` (`pnpm design:sync`). Change `DESIGN.md`, then regenerate — never hand-edit inside the `>>> generated` block. `pnpm design:validate` fails on drift.
- **Brand fill ≠ text colour.** `--theme-color-primary` is the brand **fill**. For text use `--theme-color-text-primary`; for titles `--theme-color-title`; for anything sitting **on** the brand fill `--theme-color-on-primary`. These are derived from brand luminance, so light brands stay legible — never paint title text with `--theme-color-primary`.
- **Tracking is a token**, not a component literal: `var(--font/tracking/title)`. Hardcoded px tracking tuned for one typeface collides glyphs on another.
- Escape slashes in arbitrary Tailwind: `bg-[var(--color\/bg\/brand)]`.

---

## Global rules

1. **Assets:** design files reference **local paths only**. Brand/tool logos **may be downloaded** when missing — fetch from the vendor's own domain (favicon, `og:image`, press kit), verify the file is a real image at usable resolution, save under `assets/logos/app/`, and reference it locally from then on. Never hotlink a remote URL from a design file, and never substitute a different company's mark for a missing one. Icons still come from `assets/icons/` — don't download those. Figma image URLs expire (~7 days) → save under `assets/`.
2. **Images:** containers `flex items-center justify-center` · `img` `w-full h-full object-contain` · never `display: contents`.
3. **Primary glass icons:** supply **dark, single-colour** SVGs. `PrimaryGlassSection` filters them to whatever reads on the brand fill via `--theme-on-primary-icon-filter` (white on a dark brand, black on a light one) — do **not** hardcode `brightness(0) invert(1)`.
4. **Preserve** `data-node-id` / `data-name` on design-system nodes.
5. **`design/` imports:** `'../../components/<folder>/...'` from `design/*/` (two levels up). `components/` is grouped by format:

   | Folder | Contents |
   |---|---|
   | `components/infographic/` | `InfographicCanvas` · `InfographicHeader` · `InfographicFooter` · `PrimaryGlassSection` · `BrandBorderSectionBase` |
   | `components/carousel/` | `CarouselPrimitives` |
   | `components/newsletter-thumbnail/` | `NewsletterThumbnailCanvas` · `NewsletterThumbnailTitle` · `NewsletterThumbnailVisual` |
   | `components/pptx/` | `PptxSlideShow` · `PptxSlideViewer` (preview chrome — token-lint allowlisted) |
   | `components/shared/` | Cross-format primitives: `BackgroundTexture` (in `shared/textures/`) · `Table` · `TextBox` · `Checklist` · `IconBullet` · `NumberBullet` · `ColoredTextBoxes` · `Grid8CompanyLogos` · `PastelShadowBorderCard` |
6. **Figma push:** share capture URL — **never** shell-open browser · remind user auth = their MCP Figma account.
7. **DESIGN.md:** after YAML changes, run `pnpm design:sync` (regenerates `src/index.css`) then `pnpm design:validate` (schema + drift). Tailwind picks the theme up on the next dev/build. `pnpm verify` runs validate + token lint + template boundaries — the same checks CI runs.
8. **Do NOT render previews.** Never call `render.py`, `python render.py …`, `curl /api/export/png|pdf`, or any other server/headless render step to "verify" a design. The user runs `pnpm dev` themselves once the design file is written — that is the only inspection step. Stop after writing the JSX + registering in `src/App.jsx`.
9. **No hardcoded creator identity.** Never put a creator name, handle, URL, or avatar path directly in `design/**/*.jsx`. Always use `<InfographicFooter />` (resolves name + avatar automatically). If the body copy needs the display name, import `CREATOR_DISPLAY_NAME` from `src/creatorIdentity.js`; for an avatar use `CREATOR_AVATAR_SRC` + `avatarFallback` from the same module. `src/creatorIdentity.js` is **tracked and stays neutral** (`Your Name`); the real name lives in the gitignored `src/creatorIdentity.local.js` written by `/setup`, and the real headshot in the gitignored `assets/avatar/avatar-profile.png`. This keeps every design rebrandable — and the repo redeployable — from one place.
10. **Mandatory infographic components.** Every infographic must use `InfographicHeader` for the title block and `InfographicFooter` for the footer — never replace them with custom divs. Section cards must come from `PrimaryGlassSection` or `BrandBorderSectionBase` (or other `components/` primitives) rather than being written from scratch.
11. **Background textures are user-chosen, not authored.** Every canvas (`InfographicCanvas`, `NewsletterThumbnailCanvas`, `CarouselSlideShell`) already paints the texture the user picked in the preview toolbar. Never add a texture element to a design file, and never hardcode a grid. The registry lives in [`components/shared/textures/textureRegistry.js`](components/shared/textures/textureRegistry.js) — 12 options (Blank, Atelier Fine/Grid, Salon Broad, Blueprint, Constellation, Pinstripe, Laid Paper, Linen Weave, Sandstone, Silk Grain, Cold Press). A design that genuinely must pin one texture passes `textureId` to its canvas; otherwise leave it alone. Adding a texture means adding one registry entry plus one miniature in `TextureSwatch.jsx`.

---

## Animation (infographics only)

Skill: [`skills/infographics-designer/SKILL.md`](skills/infographics-designer/SKILL.md) § Motion · Primitives: [`components/shared/motion/`](components/shared/motion/)

**Opt-in.** Static is the default — only animate when the user's prompt asks for it. Carousels, newsletter thumbnails and slide decks have no motion layer, and `/api/export/gif` returns 400 for them.

| Item | Rule |
|---|---|
| Model | **Frame-as-input**: every animated style is a pure function of `useCurrentFrame()`. Never CSS keyframes or `transition` — those are not deterministically seekable, so GIF frames would jitter. |
| Primitives | `useCurrentFrame` · `useVideoConfig` · `interpolate` · `Easing` · `spring` · `Sequence` · `useInterpolateColors`, all from `components/shared/motion/index.js` |
| Register | `animated: true` + `motion: { durationInFrames, fps }` on the infographic's `src/modes.js` entry |
| Export | Preview toolbar **Export** dropdown → **PNG**, **GIF (full size)** (1080×1350) or **GIF (small)** (540×675, ~2.4× smaller). Both GIF entries are disabled for designs without `animated: true`. Frames are encoded **incrementally** (gifenc), so there is no cap on timeline length. The page is always captured at full density and downsampled, so the small variant stays legible. |
| Colour | `useInterpolateColors` takes **token names**, never literals, and mixes in OKLab — so the token lint stays green and rebranding still works |

**The last frame must be the finished static design.** Outside a `MotionProvider`, `useCurrentFrame()` returns the final frame — that is what keeps PNG export, the Figma push and no-provider rendering working with zero changes. Every element must be mounted and settled before `durationInFrames - 1`, and springs need their asymptotic tail snapped to exactly 1.

Reference: [`design/infographics/SocialListeningInfographic.jsx`](design/infographics/SocialListeningInfographic.jsx). Control (un-animated): [`design/infographics/GtmSystemInfographic.jsx`](design/infographics/GtmSystemInfographic.jsx).

---

## Slides (PowerPoint / Google Slides 16:9 — `LAYOUT_16x9`, 10 in × 5.625 in)

Skill: [`skills/pptx/SKILL.md`](skills/pptx/SKILL.md) + [`skills/pptx/slide-templates.md`](skills/pptx/slide-templates.md) + [`skills/pptx/pptxgenjs.md`](skills/pptx/pptxgenjs.md) · Agent: `.claude/agents/slide-agent.md` · Templates: [`design/pptx-slides/templates/slideTemplates.html`](design/pptx-slides/templates/slideTemplates.html) · Tokens: `DESIGN.md` + `src/index.css`.

Each deck is **one file**: `design/pptx-slides/[Name]Slides.mjs` exports `{ meta, slides }`. Shared **`slide-engine.mjs`** (layouts), **`slide-preview.jsx`** (browser), and **`slide-engine.pptx.mjs`** (export) render the same deck for preview and `.pptx`.

Workflow:

1. `/powerpoint <topic>` — brief, approval.
2. **`slide-agent`** writes `[Name]Slides.mjs`, registers app, captures preview JPGs.
3. User runs **`pnpm dev`** — browse slides, **Download PPTX**.
