# Smart Creator Design System

A Claude-Code-driven workflow that generates **on-brand graphic designs** — infographics, carousels, and slide decks — from plain-English prompts, then ships them directly to **Figma** or exports them as **`.pptx`**.

**Figma is the primary destination.** Infographics and carousels are rendered as pixel-perfect React previews and pushed to your Figma file in one MCP call, where you can edit layers, swap assets, and publish — no manual layout work. For slide decks (16:9 YouTube/keynote format), the export path is `.pptx` via `pnpm export-slides`.

Instead of building in Figma from scratch every time, you describe what you want ("infographic comparing Notion and Airtable", "carousel on AI agent patterns"), and a team of Claude subagents write the copy, lay out the design using fixed tokens/components, QC the result, and hand you the final artifact.

![Smart Creator Design System demo](public/smart-creator-design-system-GIF.gif)

---

## What you can generate

| Format | Canvas | Ships to |
|---|---|---|
| **Infographic** | 1080×1350px | **Figma** (via MCP push) |
| **Carousel** | 1080×1350px × N slides | **Figma** (via MCP push) |
| **Slide deck** | 1280×720px × N slides | **`.pptx`** (via `pnpm export-slides`) |

All three formats share the same token set (colors, fonts, shadows) and component library, so everything stays on-brand by construction.

> **Figma MCP is strongly recommended** for infographics and carousels — it's what the system is built around. Slide decks don't require Figma; they export directly to PowerPoint-compatible `.pptx`.

---

## How it works

```
User topic
   ↓
copy-agent       → writes content, counts characters, assigns hierarchy
   ↓
(you approve the brief)
   ↓
design-agent     → picks components, calculates layout, writes JSX
   ↓
qc-agent         → verifies overflow, char limits, colors, structure
   ↓
pnpm dev         → preview in browser
   ↓
   ├── infographic / carousel  →  Figma MCP push  →  edit & publish in Figma
   └── slide deck              →  pnpm export-slides  →  .pptx file
```

The rules, tokens, component APIs, and character budgets live in `CLAUDE.md` + `references/`, so Claude never invents styles — it only chooses from the existing design system.

---

## Getting started

### 1. Download, open, and install

```bash
git clone https://github.com/<your-user>/Figma-Design-System.git
cd Figma-Design-System
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
```

| Key | What it does | Where to get it | Required? |
|---|---|---|---|
| `BRANDFETCH_API_KEY` | Fetches company **wordmark SVGs** (e.g. "Notion" logotype) via `node scripts/fetch-logo.mjs notion.com` | [brandfetch.com/developers](https://brandfetch.com/developers) — free tier available | Optional — only if you use wordmarks in your designs |
| `LOGO_DEV_API_KEY` | Fetches square **app-icon PNGs** (64×64) via `node scripts/fetch-app-logo.mjs notion.com` | [logo.dev](https://www.logo.dev/) — free tier available | Optional — only if you use app icons |

> You can build infographics without either key. They only exist so Claude can auto-download brand assets when you reference a company.

### 3. Agent compatibility (Cursor + Claude Code)

This repo supports both entry points for onboarding and generation:

| Tool | How to trigger setup |
|---|---|
| **Claude Code (in VS Code or terminal)** | Run `/setup` in a new conversation |
| **Cursor Agent** | Reference `@setup` in chat |

Both paths run the same `brand-setup` skill workflow and produce the same artifacts (`public/brand-data.json`, `tmp/brand-answers.json`, updated `DESIGN.md`, regenerated `src/index.css`).

### 4. Claude Code MCP servers

This project is designed to be driven from **Claude Code** with two MCP servers connected:

| MCP | Purpose | Required? |
|---|---|---|
| **Figma Dev Mode MCP** | Lets Claude push generated designs to Figma (`mcp__figma__generate_figma_design`) so users can edit manually in their own file/account | Optional — only if you want Figma push/edit |
| **Anthropic / Claude Code CLI** | Orchestrates the subagents in `.claude/agents/` | Required |

Figma MCP setup: [https://help.figma.com/hc/en-us/articles/32132100833559](https://help.figma.com/hc/en-us/articles/32132100833559)

No additional Anthropic API key is needed — Claude Code handles auth.

### 5. Run the preview app

```bash
pnpm dev
```

Open the URL Vite prints. You'll see a mode bar at the top — each generated infographic, carousel, or deck registers itself there.

---

## Generating your first piece

Inside Claude Code, just describe what you want:

- **Infographic:** `"Create an infographic comparing Claude Code and Cursor for engineering teams"`
- **Carousel:** `/carousel` then describe the topic
- **Slide deck:** `/slides` then describe the deck

Claude will run the copy → design → QC pipeline, drop a JSX file in the matching `design/` subfolder (`design/infographics/`, `design/carousels/`, or `design/pptx-slides/`), and register it in `src/App.jsx`. Refresh the browser to see it.

---

## First-time brand onboarding (`/setup`)

After installing dependencies, start a **new** chat and run:

- **Claude Code:** `/setup`
- **Cursor Agent:** `@setup`

The agent will first ask whether you have an existing website or visual identity. Your answer determines which track it follows:

### Track A — you have a website or existing brand visuals

1. Provide your site URL
2. Claude runs `node scripts/fetch-brand-from-url.mjs <url>` → saves `public/brand-data.json` (colors, fonts, screenshot, design patterns)
3. Claude presents the extraction; you approve or correct hex values and font names
4. Place brand screenshots in `public/assets/brand-screenshots/`
5. Drop designs you admire in `public/assets/design-inspiration/` (used to write the visual philosophy)
6. Claude analyzes all images and writes `design-philosophy.md` + updates `skills/design-philosophy/SKILL.md`
7. Claude writes `tmp/brand-answers.json` and applies it:
   - `node scripts/apply-brand-answers.mjs --input tmp/brand-answers.json`
   - `pnpm tokens:gen`
   - `node scripts/validate-design.mjs`

### Track B — you have no website or settled visual identity yet

1. Claude opens `skills/theme-factory/theme-showcase.pdf` — pick a preset by number or name (or describe your own)
2. The chosen theme is mapped to semantic tokens; you approve colors and fonts
3. Provide a brand name and one-line description verbally
4. Drop designs you admire in `public/assets/design-inspiration/` (optional but recommended)
5. Claude writes `design-philosophy.md`, `tmp/brand-answers.json`, and applies the brand — same final commands as Track A

**Both tracks produce the same artifacts:** updated `DESIGN.md`, regenerated `src/index.css`, and a `design-philosophy.md` that guides every subsequent generation.

### Export a deck to `.pptx`

```bash
pnpm export-slides MyDeckName
# → design/pptx-slides/output/MyDeckNameSlides.pptx
```

### Push an infographic/carousel to Figma

Once you're happy with the preview, ask Claude: `"push this to Figma"`. It will call `mcp__figma__generate_figma_design` and give you a URL to open that triggers the capture.
Push destination follows the currently authenticated Figma MCP account, so each end user should authenticate MCP with their own Figma account before pushing.

---

## Personalizing it to your brand

This is the important part: **the whole system is driven by a few files.** Swap these out and every future generation uses your brand automatically.

### A. Brand tokens and setup → `DESIGN.md`

`DESIGN.md` front matter is the source of truth for colors, typography, spacing, radii, and component aliases.

Run these commands after updates:

```bash
pnpm design:validate
pnpm tokens:gen
```

For first-time onboarding, use the setup skill in chat (`skills/brand-setup/SKILL.md`) and apply answers with:

```bash
pnpm brand:apply -- --input tmp/brand-answers.json
```

### B. Generated token artifact

- `src/index.css` (generated)

Never edit it directly; regenerate from `DESIGN.md`.

### C. Components → `components/`

The building blocks Claude composes from: `InfographicHeader`, `PastelShadowBorderCard`, `NumberBullet`, `Checklist`, `IconBullet`, `Table`, `PrimaryGlassSection`, `SlideCard`, etc. Each is ~50–100 lines of JSX with fixed sizing.

If you want new layouts, add a component here and document its API in `references/components.md` (that's the spec the design-agent reads).

### D. Templates (source) → `templates/`

Templates are grouped by output type:

- `templates/infographics/`
- `templates/carousels/`
- `templates/pptx-slides/`

`templates/` is **source-only**. Generation must start from these files.

### E. Character budgets → `references/space-budgets.md`

How many characters fit in each cell at each font size. If you change component sizes, update this file so the copy-agent counts correctly.

### F. Assets → `assets/`

```
assets/
├── avatar/profile.jpg        ← your headshot (footer)
├── icons/                    ← section icons — drop your own SVGs in
├── logos/app/                ← auto-populated by fetch-app-logo.mjs
├── logos/text/               ← auto-populated by fetch-logo.mjs
├── illustrations/            ← character illustrations (optional)
└── textures/                 ← background textures
```

Replace `avatar/profile.jpg` with your own photo to personalize the footer signature.

### E. Output folder (generated) → `design/`

`design/` is **output-only**:

- `design/infographics/`
- `design/carousels/`
- `design/pptx-slides/`

Use the standard generator to create new outputs from templates:

```bash
pnpm generate:design -- --type infographics --template infographic --name MyTopic --data tmp/brief.json
```

This writes files in `design/` and auto-registers the mode in `src/App.jsx`.

### F. Agent rules → `CLAUDE.md` + `.claude/agents/*.md`

`CLAUDE.md` is the master prompt every subagent respects. If your brand has specific voice rules ("always use active voice", "never use emojis", "always end with a CTA"), add them here.

The individual agent files (`copy-agent.md`, `design-agent.md`, `qc-agent.md`, etc.) define each step's job.

---

## Project structure

```
.
├── CLAUDE.md                 ← master rules for Claude Code
├── .claude/agents/           ← subagent definitions (copy/design/qc/slide/carousel)
├── skills/                   ← /infographic, /carousel, /slides skills
├── references/               ← components.md · space-budgets.md
├── DESIGN.md                 ← all design tokens (front matter)
├── tailwind.config.js        ← consumes tokens from DESIGN.md
├── components/               ← reusable JSX components
├── templates/                ← source templates only
│   ├── infographics/
│   ├── carousels/
│   └── pptx-slides/
│   └── template-manifest.json
├── design/                   ← generated work, grouped by type
│   ├── infographics/         ←   1080×1350 single-canvas pieces
│   ├── carousels/            ←   1080×1350 multi-slide carousels
│   └── pptx-slides/          ←   1280×720 slide decks (.data.js + .jsx)
│       └── output/           ←     exported .pptx files
├── src/App.jsx               ← preview app + MODES registry
├── scripts/
│   ├── validate-design.mjs   ← DESIGN.md schema validation
│   ├── apply-brand-answers.mjs ← setup answers -> DESIGN.md
│   ├── generate-design-output.mjs ← template -> design output + App registry
│   ├── check-template-boundaries.mjs ← source/output guardrail
│   ├── fetch-logo.mjs        ← Brandfetch wordmarks
│   ├── fetch-app-logo.mjs    ← logo.dev app icons
│   ├── export-slides.mjs     ← PPTX export
│   └── screenshot.mjs        ← Playwright QC screenshots
├── assets/                   ← avatar, icons, logos, textures, illustrations
```

---

## Tech stack

- **Vite + React 18** (JSX)
- **Tailwind CSS v3** (all tokens)
- **pptxgenjs** for slide export
- **Playwright** for QC screenshots
- **pnpm** package manager
- **Claude Code** as the orchestrator (Opus/Sonnet subagents)
- **Figma Dev Mode MCP** for push-to-edit

---

## Scripts reference

| Command | What it does |
|---|---|
| `pnpm dev` | Start Vite preview server |
| `pnpm build` | Production build |
| `pnpm design:validate` | Validate `DESIGN.md` schema and token references |
| `pnpm tokens:gen` | Regenerate `src/index.css` from `DESIGN.md` |
| `pnpm templates:check` | Enforce template folder boundaries |
| `pnpm preflight` | Run design validation, token generation, and template checks |
| `pnpm brand:apply -- --input tmp/brand-answers.json` | Merge setup answers into `DESIGN.md` |
| `pnpm generate:design -- --type ... --template ... --name ... --data ...` | Generate `design/*` output from `templates/*` and register it in `src/App.jsx` |
| `pnpm export-slides [Name]` | Export a slide deck to `design/pptx-slides/output/[Name]Slides.pptx` |
| `pnpm screenshot <mode-key>` | Take a QC screenshot of a generated piece |
| `node scripts/fetch-logo.mjs domain.com` | Download wordmark SVG from Brandfetch |
| `node scripts/fetch-app-logo.mjs domain.com` | Download square app icon from logo.dev |

---

## License

Personal project — fork freely, but brand assets in `assets/` are illustrative only.
