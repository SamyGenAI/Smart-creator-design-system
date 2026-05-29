# Smart Creator Design System

A Claude-Code-driven workflow that generates **on-brand graphic designs** — infographics, carousels, and slide decks — from plain-English prompts, then ships them directly to **Figma** or exports them as **`.png`**, **`.pdf`**, or **`.pptx`**.

**Figma is the primary destination.** Infographics and carousels are rendered as pixel-perfect React previews and pushed to your Figma file in one MCP call, where you can edit layers, swap assets, and publish — no manual layout work. Slide decks (4:3 PowerPoint / Google Slides format) use a PptxGenJS script per deck plus slide photos in `public/screenshots/powerpoint/` for browser preview — run **`pnpm dev`** to browse and download the editable `.pptx`.

Instead of building in Figma from scratch every time, you describe what you want ("infographic comparing Notion and Airtable", "carousel on AI agent patterns"), and Claude lays out the design using tokens and `components/`, then you preview in the browser and optionally push to Figma or export slides.

![Smart Creator Design System demo](public/smart-creator-design-system-GIF.gif)

---

## What you can generate

| Format | Canvas | Ships to |
|---|---|---|
| **Infographic** | 1080×1350px | **PNG** or **Figma** (via /figma command) |
| **Carousel** | 1080×1350px × N slides | **PDF** or **Figma** (via /figma command) |
| **Slide deck** | 10 in × 7.5 in (4:3 — PowerPoint / Google Slides standard) | **`.pptx`** (one standalone PptxGenJS Node script per deck) |

All three formats share the same token set (colors, fonts, shadows) and component library, so everything stays on-brand by construction.

> **Figma MCP is strongly recommended** for infographics and carousels — it's what the system is built around. Slide decks don't require Figma; they export directly to PowerPoint-compatible `.pptx`.

---

## How it works

```
User topic
   ↓
Infographics: infographic-design-agent (`skills/infographics-designer/SKILL.md`) → brief → approval → JSX in design/infographics/
Carousels:    carousel-copy-agent → design → QC
Slides:       slide-agent
   ↓
pnpm dev         → preview in browser
   ↓
   ├── infographic / carousel  →  Figma MCP push  →  edit & publish in Figma
   └── slide deck              →  pnpm dev  →  preview + Download PPTX
```

The rules, tokens, and layout guidance live in **`skills/infographics-designer/SKILL.md`** (infographics), **`CLAUDE.md`**, and **`DESIGN.md`**.

---

## Getting started

### 1. Download, open, and install

```bash
git clone https://github.com/SamyGenAI/Smart-creator-design-system.git
cd Smart-creator-design-system
pnpm install
```

Open the repo in either:
- **Cursor** (Agent mode workflow supported)
- **VS Code + Claude Code** (slash-command workflow supported)

### 2. Set up API keys

Copy `.env.example` to `.env` and fill in the keys you need:

```bash
cp .env.example .env
```

```
BRANDFETCH_API_KEY=
LOGO_DEV_API_KEY=
FIRECRAWL_API_KEY=

# Figma MCP — optional
FIGMA_FILE_KEY=
FIGMA_CAROUSEL_NODE_ID=
FIGMA_INFOGRAPHIC_NODE_ID=
```

| Key | What it does | Where to get it | Required? |
|---|---|---|---|
| `BRANDFETCH_API_KEY` | Fetches company **wordmark SVGs** (e.g. "Notion" logotype) via `node scripts/fetch-logo.mjs notion.com` | [brandfetch.com/developers](https://brandfetch.com/developers) — free tier available | Optional — only if you use wordmarks in your designs |
| `LOGO_DEV_API_KEY` | Fetches square **app-icon PNGs** (64×64) via `node scripts/fetch-app-logo.mjs notion.com` | [logo.dev](https://www.logo.dev/) — free tier available | Optional — only if you use app icons |
| `FIRECRAWL_API_KEY` | Powers **`node scripts/fetch-brand-from-url.mjs`** during `/setup` (Track A): scrape **branding** + full-page **screenshot** for `public/brand-data.json` | [firecrawl.dev](https://www.firecrawl.dev/) — sign up and copy an API key from the dashboard | Required for **Track A** URL extraction; not used on Theme Factory-only onboarding |
| `FIGMA_FILE_KEY` | Your Figma file key — the alphanumeric ID in `figma.com/design/<key>/...` | From your Figma file URL | Optional — only needed for Figma push via `/figma` |
| `FIGMA_CAROUSEL_NODE_ID` | Target page/frame node ID for carousel push | Right-click page in Figma → Copy link → `node-id` param | Optional |
| `FIGMA_INFOGRAPHIC_NODE_ID` | Target page/frame node ID for infographic push | Right-click page in Figma → Copy link → `node-id` param | Optional |

> You can build infographics without the logo keys. For brand onboarding from a live website (`/setup` Track A), add **Firecrawl** so the fetch script can run. Figma push is completely optional — you can always download designs as PNG/PDF or `.pptx` from the browser preview instead.

### 3. Agent compatibility (Claude Code, Cursor, Codex)

This repo supports both entry points for onboarding and generation:

| Tool | How to trigger setup |
|---|---|
| **Claude Code (in VS Code or terminal)** | Run `/setup` in a new conversation |
| **Cursor Agent** | Reference `/setup` in chat |
| **Codex** | Mention `setup` in chat |

Both paths run the same `brand-setup` skill workflow and produce the same artifacts (`public/brand-data.json`, `tmp/brand-answers.json`, updated `DESIGN.md`, and `src/index.css` kept in sync with the palette).

### 4. Claude Code MCP servers

This project is designed to be driven from **Claude Code** with two MCP servers connected:

| MCP | Purpose | Required? |
|---|---|---|
| **Figma Dev Mode MCP** | Lets Claude push generated designs to Figma (`mcp__figma__generate_figma_design`) so users can edit manually in their own file/account | Optional — only if you want Figma push/edit |
| **Anthropic / Claude Code CLI** | Orchestrates the subagents in `.claude/agents/` | Required |

Figma MCP setup: [https://help.figma.com/hc/en-us/articles/32132100833559](https://help.figma.com/hc/en-us/articles/32132100833559)

Once connected, add `FIGMA_FILE_KEY`, `FIGMA_CAROUSEL_NODE_ID`, and `FIGMA_INFOGRAPHIC_NODE_ID` to your `.env` (see step 2). The `/setup` onboarding flow will walk you through this.

**No Figma? No problem.** You can skip Figma entirely and download designs directly from the browser preview:
- **Infographics / carousels** → PNG or PDF via the browser print dialog or a screenshot tool
- **Slide decks** → open the deck tab in the preview app, browse slide photos, click **Download PPTX** for the editable file in `design/pptx-slides/output/`.

No additional Anthropic API key is needed — Claude Code handles auth.

### 5. Run the preview app

```bash
pnpm dev
```

Open the URL Vite prints. You'll see a mode bar at the top — each generated infographic, carousel, or deck registers itself there.

---

## Generating your first piece

Inside Claude Code, just type the following commands and answer the questions :

- **Infographic:** `/infographic`
- **Carousel:** `/carousel`
- **Slide deck:** `/slides`

Claude will add a JSX file in the matching `design/` subfolder (`design/infographics/`, `design/carousels/`, or `design/pptx-slides/`) and register it in `src/App.jsx`.

> **Pro tip — prompt precisely and show what "good" looks like.** Frontier Claude models (Opus/Sonnet 4.x) have strong vision capabilities, so the more specific you are *and* the more visual reference you provide, the closer the first generation will be to what you want. Instead of "make a carousel on AI agents", try: "8-slide carousel on AI agent patterns for technical founders, opinionated tone, ends with a hiring CTA — match the layout density of the attached screenshot." Drop reference images directly into chat (competitor designs, mood boards, sketches, even rough Figma exports) — Claude will read composition, hierarchy, spacing, and color emphasis from them and translate that into on-brand JSX using your tokens.

---

## First-time brand onboarding (`/setup`)

After installing dependencies, start a **new** chat and run: `/setup`


The agent will collect your **first and last names** as they should appear on footers and slides, write them once in **`src/creatorIdentity.js`** (single source of truth), and have you supply **`assets/avatar/avatar-profile.png`**. Details: `skills/brand-setup/SKILL.md` (sections **Creator identity & avatar**, then Track A/B).

After onboarding finishes, start a **new conversation** before asking for infographic/carousel/slide generation. This context reset is required for best results and avoids context overload.

The agent will first ask whether you have an existing website or visual identity. Your answer determines which track it follows:

### Track A — you have a website or existing brand visuals

1. Provide your site URL and ensure **`FIRECRAWL_API_KEY`** is set in `.env` ([Firecrawl](https://www.firecrawl.dev/) dashboard).
2. Claude runs `node scripts/fetch-brand-from-url.mjs <url>` → Firecrawl returns **branding** + **screenshot** → saves `public/brand-data.json` (colors, fonts, screenshot, design patterns, optional `brandingProfile`)
3. Claude presents the extraction; you approve or correct hex values and font names
4. Place brand screenshots in `public/assets/brand-screenshots/`
5. (Optional) Add brand screenshots to `public/assets/brand-screenshots/` for validation
6. Claude writes `tmp/brand-answers.json` and applies it:
   - `node scripts/apply-brand-answers.mjs --input tmp/brand-answers.json`
   - `node scripts/validate-design.mjs`
   - Sync updated colors into `src/index.css` when the palette changed

### Track B — you have no website or settled visual identity yet

1. Claude opens `skills/theme-factory/theme-showcase.pdf` — pick a preset by number or name (or describe your own)
2. The chosen theme is mapped to semantic tokens; you approve colors and fonts
3. Provide a brand name and one-line description verbally
4. (Optional) Add screenshots to `public/assets/brand-screenshots/` for validation
5. Claude writes `tmp/brand-answers.json` and applies the brand — same final commands as Track A

**Both tracks produce the same artifacts:** updated `DESIGN.md` and aligned `src/index.css` (manual sync for CSS variables).

### Slide decks (PowerPoint)

Run `pnpm dev`, open the slide deck tab (e.g. **Claude Code Setup (Slides)**), browse slide photos with the arrows, and click **Download PPTX** for the editable PowerPoint file.

Slide photos are generated automatically and saved under `public/screenshots/powerpoint/` (one image per slide). The browser slideshow reads those files.

### Push an infographic/carousel to Figma

Once you're happy with the preview, run `/figma` (Claude Code) or `@figma` (Cursor), or just ask Claude: `"push this to Figma"`. Claude will read your `FIGMA_FILE_KEY` and node IDs from `.env`, call `mcp__figma__generate_figma_design`, and give you a URL to open that triggers the capture.
Push destination follows the currently authenticated Figma MCP account — each user should authenticate MCP with their own Figma account before pushing.

> **First time?** `/setup` includes an optional Figma MCP step that walks you through adding the `.env` keys. If you skipped it, run `/figma` anyway — it will detect missing config and guide you through setup.

---

## Personalizing it to your brand

This is the important part: **the whole system is driven by a few files.** Swap these out and every future generation uses your brand automatically.

### A. Brand tokens and setup → `DESIGN.md`

`DESIGN.md` front matter is the source of truth for colors, typography, spacing, radii, and component aliases.

Run after `DESIGN.md` updates:

```bash
pnpm design:validate
```

For first-time onboarding, use the setup skill in chat (`skills/brand-setup/SKILL.md`) and apply answers with:

```bash
pnpm brand:apply -- --input tmp/brand-answers.json
```

### B. Runtime tokens → `src/index.css`

- `src/index.css` — **source of truth** for CSS variables consumed by `components/` and infographic JSX. Edit directly; keep roughly in sync with `DESIGN.md` when you change the brand palette.

### C. Components → `components/`

The building blocks Claude composes from: `InfographicHeader`, `InfographicFooter`, `PastelShadowBorderCard`, `NumberBullet`, `Checklist`, `IconBullet`, `Table`, `PrimaryGlassSection`, `BrandBorderSectionBase`, etc.

If you want new layouts, add a component here and describe usage inline or in **`skills/infographics-designer/SKILL.md`** when it is a recurring pattern.

### D. Templates (source) → `templates/`

- `templates/carousels/` — source templates for carousels (used by `pnpm generate:design`).

Infographics and slide decks **do not** use this folder. Infographics are written by hand under [`design/infographics/`](design/infographics/). Slide decks are written by the slide-agent as one standalone PptxGenJS Node script per deck under [`design/pptx-slides/`](design/pptx-slides/), with zero shared template.

### E. Assets → `assets/`

```
assets/
├── avatar/avatar-profile.png ← your headshot (footer / carousels / slides export)
├── icons/                    ← section icons — drop your own SVGs in
├── logos/app/                ← auto-populated by fetch-app-logo.mjs
├── logos/text/               ← auto-populated by fetch-logo.mjs
├── illustrations/            ← character illustrations (optional)
└── textures/                 ← background textures
```

During `@setup`, add your portrait as `assets/avatar/avatar-profile.png` (square-friendly headshot) so infographics, carousels, and slide exports resolve the avatar.

### F. Output folder (generated) → `design/`

`design/` is **output-only**:

- `design/infographics/`
- `design/carousels/`
- `design/pptx-slides/`

**Carousels and slides:**

```bash
pnpm generate:design -- --type carousels --template linkedin --name MyTopic --data tmp/brief.json
```

**Infographics:** create `design/infographics/<Name>Infographic.jsx` with [`components/InfographicCanvas.jsx`](components/InfographicCanvas.jsx) and any components you need from [`components/`](components/); register in `src/App.jsx` (see [`skills/infographics-designer/SKILL.md`](skills/infographics-designer/SKILL.md)).

### G. Agent rules → `CLAUDE.md` + `.claude/agents/*.md`

`CLAUDE.md` is the master prompt every subagent respects. If your brand has specific voice rules ("always use active voice", "never use emojis", "always end with a CTA"), add them here.

Agent files under `.claude/agents/` define specialized flows (`infographic-design-agent` for infographics — which owns both the brief and the build — and carousel/slide agents for those formats).

---

## Project structure

```
.
├── CLAUDE.md                 ← master rules for Claude Code
├── .claude/agents/           ← subagent definitions (design / slide / carousel)
├── skills/                   ← includes `infographics-designer/SKILL.md` (read first for 1080×1350)
├── references/               ← optional notes (not required for infographics)
├── DESIGN.md                 ← all design tokens (front matter)
├── tailwind.config.js        ← consumes tokens from DESIGN.md
├── components/               ← reusable JSX components
├── templates/                ← source templates (carousels + pptx-slides)
│   ├── carousels/
│   ├── pptx-slides/
│   └── template-manifest.json
├── design/                   ← generated work, grouped by type
│   ├── infographics/         ←   1080×1350 single-canvas pieces
│   ├── carousels/            ←   1080×1350 multi-slide carousels
│   └── pptx-slides/          ←   4:3 slide decks (one [Name]Slides.mjs per deck)
│       └── output/           ←     exported .pptx files (produced by running each .mjs)
├── src/App.jsx               ← preview app + MODES registry
├── scripts/
│   ├── validate-design.mjs   ← DESIGN.md schema validation
│   ├── apply-brand-answers.mjs ← setup answers -> DESIGN.md
│   ├── generate-design-output.mjs ← template -> design output + App registry
│   ├── check-template-boundaries.mjs ← source/output guardrail
│   ├── fetch-logo.mjs        ← Brandfetch wordmarks
│   ├── fetch-app-logo.mjs    ← logo.dev app icons
│   ├── parse-design-md.mjs   ← DESIGN.md loader (used by slide decks for tokens)
│   └── screenshot.mjs        ← Playwright QC screenshots
├── assets/                   ← avatar, icons, logos, textures, illustrations
```

---

## Tech stack

- **Vite + React 18** (JSX)
- **Tailwind CSS v3** (all tokens)
- **pptxgenjs** for slide export
- **Playwright** for Quality Check (QC) screenshots
- **pnpm** package manager
- **Claude Code** as the orchestrator (Opus/Sonnet subagents)
- **Figma Dev Mode MCP** for push-to-edit

---

## Pro tips for prompting

The system is only as good as the brief you hand it. A few habits that consistently produce on-brand, first-shot designs:

1. **Be precise about intent, not just topic.** State the audience, the *one* takeaway, the tone, the format, and the CTA in a single sentence before invoking a slash command. "Infographic comparing Notion vs Airtable" is weak. "1080×1350 infographic for solo operators choosing their first ops tool — single takeaway: Airtable wins for relational data, Notion wins for docs — neutral tone, no winner declared, footer CTA to my newsletter" is strong.
2. **Show what "good" looks like — drop in reference images.** Frontier Claude models (Opus/Sonnet 4.x) have strong vision capabilities. Paste screenshots of designs you admire (competitor carousels, magazine spreads, dashboards, Figma mockups, even hand sketches) directly into the chat. Claude reads composition, density, hierarchy, color emphasis, and typography rhythm from images and translates it into JSX using *your* tokens — so you keep your brand while borrowing structure.
3. **Constrain the layout when you have an opinion.** "3 cards in a row, second card emphasized" or "stat block top-left, illustration top-right, checklist below" cuts iteration time dramatically vs leaving layout open-ended.
4. **Iterate with diffs, not rewrites.** Once a draft exists, prompt deltas ("swap card 2 and 3", "make the header tighter — match this screenshot's spacing") instead of regenerating from scratch. The system is designed for surgical edits inside the JSX file.

---

## License

Personal project — fork freely, but brand assets in `assets/` are illustrative only.
