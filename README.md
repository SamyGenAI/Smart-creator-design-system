# Smart Creator Design System

A Claude-Code-driven workflow for generating **on-brand LinkedIn infographics, carousels, and slide decks** from plain-English prompts — then pushing them to Figma for final polish, or exporting them straight to `.pptx`.

Instead of designing in Figma from scratch every time, you describe what you want ("infographic comparing Notion and Airtable", "carousel on AI agent patterns"), and a team of Claude subagents write the copy, lay out the design using fixed tokens/components, QC the result, and hand you a pixel-perfect React preview you can push to Figma with one MCP call.

![Smart Creator Design System demo](public/smart-creator-design-system-GIF.gif)

---

## What you can generate

| Format | Canvas | Output |
|---|---|---|
| **Infographic** | 1080×1350px | React JSX → Figma via MCP |
| **Carousel** | 1080×1350px × N slides | React JSX → Figma via MCP |
| **Slide deck** | 1280×720px × N slides | `.pptx` via `pnpm export-slides` |

All three formats share the same token set (colors, fonts, shadows) and component library, so everything stays on-brand by construction.

---

## How it works

```
User topic
   ↓
copy-agent     → writes content, counts characters, assigns hierarchy
   ↓
(you approve the brief)
   ↓
design-agent   → picks components, calculates layout, writes JSX
   ↓
qc-agent       → verifies overflow, char limits, colors, structure
   ↓
pnpm dev       → preview in browser
   ↓
Figma MCP  OR  pnpm export-slides   → ship
```

The rules, tokens, component APIs, and character budgets live in `CLAUDE.md` + `references/`, so Claude never invents styles — it only chooses from the existing design system.

---

## Getting started

### 1. Clone & install

```bash
git clone https://github.com/<your-user>/Figma-Design-System.git
cd Figma-Design-System
pnpm install
```

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

### 3. Claude Code MCP servers

This project is designed to be driven from **Claude Code** with two MCP servers connected:

| MCP | Purpose | Required? |
|---|---|---|
| **Figma Dev Mode MCP** | Lets Claude push generated designs to Figma (`mcp__figma__generate_figma_design`) and read your Figma file for token extraction | Optional — only if you want to round-trip with Figma |
| **Anthropic / Claude Code CLI** | Orchestrates the subagents in `.claude/agents/` | Required |

Figma MCP setup: [https://help.figma.com/hc/en-us/articles/32132100833559](https://help.figma.com/hc/en-us/articles/32132100833559)

No additional Anthropic API key is needed — Claude Code handles auth.

### 4. Run the preview app

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

### Export a deck to `.pptx`

```bash
pnpm export-slides MyDeckName
# → design/pptx-slides/output/MyDeckNameSlides.pptx
```

### Push an infographic/carousel to Figma

Once you're happy with the preview, ask Claude: `"push this to Figma"`. It will call `mcp__figma__generate_figma_design` and give you a URL to open that triggers the capture.

---

## Personalizing it to your brand

This is the important part: **the whole system is driven by a few files.** Swap these out and every future generation uses your brand automatically.

### A. Colors, fonts, shadows → `tailwind.config.js`

Single source of truth for all tokens. Change these and every component updates:

```js
colors: {
  navy:         '#092c69',   // your primary brand color
  canvas:       '#fffceb',   // infographic background
  'card-blue':  'rgba(126,218,255,0.15)',
  // ...
}
```

Typography, shadows (`dropshadow/100–500`), and semantic aliases (`text-primary`, `border-border-blue`, etc.) all live here too.

### B. Design tokens reference → `references/tokens.md`

This is what Claude reads when deciding which token to use. After editing `tailwind.config.js`, update this file so the agents know your palette.

### C. Components → `components/`

The building blocks Claude composes from: `InfographicHeader`, `PastelShadowBorderCard`, `NumberBullet`, `Checklist`, `IconBullet`, `Table`, `GlassNavySection`, `SlideCard`, etc. Each is ~50–100 lines of JSX with fixed sizing.

If you want new layouts, add a component here and document its API in `references/components.md` (that's the spec the design-agent reads).

### D. Templates → `templates/`

`Infographic.jsx` and `ClaudeCoworkInfographic.jsx` are reference layouts (bento grid pattern with CSS Grid `fr` rows). Claude copies these into `design/infographics/` and swaps the `data` object — it never touches structure.

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

### G. Agent rules → `CLAUDE.md` + `.claude/agents/*.md`

`CLAUDE.md` is the master prompt every subagent respects. If your brand has specific voice rules ("always use active voice", "never use emojis", "always end with a CTA"), add them here.

The individual agent files (`copy-agent.md`, `design-agent.md`, `qc-agent.md`, etc.) define each step's job.

---

## Project structure

```
.
├── CLAUDE.md                 ← master rules for Claude Code
├── .claude/agents/           ← subagent definitions (copy/design/qc/slide/carousel)
├── skills/                   ← /infographic, /carousel, /slides skills
├── references/               ← tokens.md · components.md · space-budgets.md
├── tailwind.config.js        ← all design tokens
├── components/               ← reusable JSX components
├── templates/                ← layout templates (Infographic, ClaudeCowork)
├── design/                   ← generated work, grouped by type
│   ├── infographics/         ←   1080×1350 single-canvas pieces
│   ├── carousels/            ←   1080×1350 multi-slide carousels
│   └── pptx-slides/          ←   1280×720 slide decks (.data.js + .jsx)
│       └── output/           ←     exported .pptx files
├── src/App.jsx               ← preview app + MODES registry
├── scripts/
│   ├── fetch-logo.mjs        ← Brandfetch wordmarks
│   ├── fetch-app-logo.mjs    ← logo.dev app icons
│   ├── export-slides.mjs     ← PPTX export
│   └── screenshot.mjs        ← Playwright QC screenshots
├── assets/                   ← avatar, icons, logos, textures, illustrations
└── figma/code-connect.json   ← Figma node ↔ component mappings
```

---

## Tech stack

- **Vite + React 18** (JSX)
- **Tailwind CSS v3** (all tokens)
- **pptxgenjs** for slide export
- **Playwright** for QC screenshots
- **pnpm** package manager
- **Claude Code** as the orchestrator (Opus/Sonnet subagents)
- **Figma Dev Mode MCP** for round-tripping designs

---

## Scripts reference

| Command | What it does |
|---|---|
| `pnpm dev` | Start Vite preview server |
| `pnpm build` | Production build |
| `pnpm export-slides [Name]` | Export a slide deck to `design/pptx-slides/output/[Name]Slides.pptx` |
| `pnpm screenshot <mode-key>` | Take a QC screenshot of a generated piece |
| `node scripts/fetch-logo.mjs domain.com` | Download wordmark SVG from Brandfetch |
| `node scripts/fetch-app-logo.mjs domain.com` | Download square app icon from logo.dev |

---

## License

Personal project — fork freely, but brand assets in `assets/` are illustrative only.
