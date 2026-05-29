---
version: alpha
name: Smart Creator
description: >
  LinkedIn infographic design system for fixed 1080×1350px visual content.
  Optimised for AI-assisted generation with Claude Code and Cursor.

colors:
  bg:
    canvas: "#fffceb"
    surface: "#ffffff"
    surfaceAlt: "#fff4e8"
    brand: "#092c69"
    accent:
      "1": "#b4eaff"
      "2": "#d2ff9a"
      "3": "#fde68a"
      "4": "#ffe6f3"
      "5": "#ffa066"
  text:
    primary: "#000000"
    secondary: "#323241"
    muted: "#717188"
    onBrand: "#ffffff"
  border:
    subtle: "#e3e4eb"
    strong: "{colors.bg.brand}"
    accent:
      "1": "#7edaff"
      "2": "#a9ff3e"
      "3": "#fcd34d"
      "4": "#ffb2da"
      "5": "#ff914d"
  state:
    success: "{colors.bg.accent.2}"
    warning: "{colors.bg.accent.5}"
    info: "{colors.bg.accent.1}"
    danger: "{colors.bg.accent.4}"
  indicator:
    primary: "{colors.bg.accent.4}"
  stroke:
    check: "#116F39"

alphaColors:
  bg:
    accentSoft:
      "1": "rgba(126,218,255,0.15)"
      "2": "rgba(169,255,62,0.15)"
      "3": "rgba(252,211,77,0.25)"
      "4": "rgba(255,178,218,0.15)"
      "5": "rgba(255,145,77,0.15)"
    surfaceAccent:
      "1": "rgba(126,218,255,0.15)"
      "4": "rgba(255,178,218,0.15)"
  overlay:
    glass:
      subtle: "rgba(255,255,255,0.1)"
      default: "rgba(255,255,255,0.55)"
      strong: "rgba(255,255,255,0.92)"
    indicator:
      primary: "rgba(255,178,218,0.7)"

shadows:
  card: "0px 4px 4px 0px rgba(0,0,0,0.25)"
  card-soft: "0 8px 32px rgba(0,0,0,0.18)"
  elevation-100: "0px 1px 4px 0px rgba(12,12,13,0.05)"
  elevation-200: "0px 1px 4px 0px rgba(12,12,13,0.05), 0px 1px 4px 0px rgba(12,12,13,0.10)"
  elevation-400: "0px 4px 4px -4px rgba(12,12,13,0.10), 0px 16px 32px -4px rgba(12,12,13,0.10)"
  elevation-500: "0px 4px 4px -4px rgba(12,12,13,0.10), 0px 16px 16px -8px rgba(12,12,13,0.10)"
  slide-soft: "0 8px 32px rgba(0,0,0,0.15)"
  slide-glass: "0 8px 32px rgba(0,0,0,0.12)"
  slide-accent: "0 8px 32px rgba(0,0,0,0.10)"
  slide-primary: "0 8px 32px rgba(9,44,105,0.35)"
  surface-primary: "{shadows.slide-primary}"

typography:
  hero:
    fontFamily: Montserrat
    fontSize: 72px
    fontWeight: 700
    lineHeight: 1
  title-serif:
    fontFamily: Noto Serif
    fontSize: 72px
    fontWeight: 700
    lineHeight: 1
  title-4xl:
    fontFamily: Montserrat
    fontSize: 56px
    fontWeight: 700
    lineHeight: 40px
  title-2xl:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: 700
    lineHeight: 32px
  subtitle:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: 500
    lineHeight: 32px
  title-xl:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: 600
    lineHeight: 24px
  body-lg:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: 600
    lineHeight: 24px
  body-md:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: 500
    lineHeight: 24px
  body:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  body-sm:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: 500
    lineHeight: 16px
  caption:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px

rounded:
  glass-header: 10px
  card: 7.951px
  glass: 20px
  pill: 40px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 22px
  xl: 28px
  canvas-width: 1080px
  canvas-height: 1350px
  canvas-inner: 981px
  row-gap: 22px

components:
  surface-accent-1:
    backgroundColor: "#7edaff1a"
    rounded: "{rounded.card}"
  surface-accent-4:
    backgroundColor: "#ffb2da26"
    rounded: "{rounded.card}"
  surface-accent-3:
    backgroundColor: "{alphaColors.bg.accentSoft.3}"
    rounded: "{rounded.card}"
  accent-1:
    backgroundColor: "{colors.bg.accent.1}"
    textColor: "{colors.text.primary}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-sm}"
  accent-2:
    backgroundColor: "{colors.bg.accent.2}"
    textColor: "{colors.text.primary}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-sm}"
  accent-3:
    backgroundColor: "{colors.bg.accent.3}"
    textColor: "{colors.text.primary}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-sm}"
  accent-4:
    backgroundColor: "{colors.bg.accent.4}"
    textColor: "{colors.text.primary}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-sm}"
  accent-5:
    backgroundColor: "{colors.bg.accent.5}"
    textColor: "{colors.text.primary}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-sm}"
  glass-card:
    backgroundColor: "{colors.bg.brand}"
    rounded: "{rounded.glass}"
  infographic-header:
    backgroundColor: "{colors.bg.canvas}"
    typography: "{typography.hero}"
  infographic-footer:
    backgroundColor: "{colors.bg.brand}"
    textColor: "{colors.text.onBrand}"
    rounded: "{rounded.pill}"
    height: 60px
---

# Human-readable design rules

Fixed canvas: **infographic 1080×1350** (`InfographicCanvas`). **Slide decks** are 4:3 PowerPoint / Google Slides (10×7.5 in via PptxGenJS — see [`skills/pptx/SKILL.md`](skills/pptx/SKILL.md)), not React canvas. Colors, typography, radii, and shadows in the YAML above feed **Tailwind** via `tailwind.config.js`. Runtime **CSS variables** for components live in `src/index.css` — edit that file directly for theme tweaks.

## Colors (roles)

| Role | Use |
|---|---|
| `colors.bg.brand` | Headers, footer bar, primary chrome |
| `colors.bg.canvas` | Page / InfographicCanvas fill |
| `colors.bg.accent.1..5` | Meaningful accents (chips, tiers) |
| `colors.text.*` / `colors.text.onBrand` | Contrast pairs |
| `alphaColors.overlay.glass.*` | Glass frosts |

Composition: **few strong colors**; respect contrast (see `.claude/agents/infographic-design-agent.md` + `skills/infographics-designer/SKILL.md`).

## Typography (see YAML `typography`)

Montserrat everywhere for product work; optional Noto for display. Titles may wrap (~2 lines on the infographic header); no fixed character cap.

## Layout

Infographic: **981px** inner column, **22px** vertical rhythm, **`flex-none` header/footer**. Prefer CSS Grid layouts sized for content (bento typical, not mandatory).

## Elevation — token names (`shadows` in YAML)

Use `shadow-elevation-*` / `shadow-card` classes mapped from tokens — every card-grade surface lifts.

## Components

Primitives live under `components/` (see `skills/infographics-designer/SKILL.md`). Chips: accent **1** features · **2** outcomes · **3** process · **4** ranked · **5** caution.

## Mandatory don’ts

No responsive breakpoints · Do not put raw hex into `tailwind.config.js` theme (use YAML here) · No `display:contents` on asset cells · Escaped Tailwind refs: `--color\\/bg\\/brand`.
