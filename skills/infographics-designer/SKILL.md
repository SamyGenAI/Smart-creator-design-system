---
name: infographics-designer
description: Design and generate LinkedIn infographics (1080x1350px) using the Smart Creator Design System. Use when the user asks to create, design, or build a LinkedIn infographic, visual post, or graphic. Triggers on requests like "make an infographic about...", "create a LinkedIn post about...", "design a visual on...", "build an infographic for...", or any visual content creation for LinkedIn.
---

# Infographics Designer — Copy-First Workflow

This skill uses **three specialized agents** in sequence. Content drives layout — never the other way around.

```
User topic → Copy Agent → Design Agent → QC Agent → Done
```

---

## Step 1 — Copy Agent

Delegate to the `copy-agent` subagent with the user's topic.

**Input:** The user's topic/prompt (e.g. "5 levels of AI autonomy in business")

**Output:** A structured JSON content brief with:
- `title`, `highlightWord`, `subtitle`
- `sections[]` — each with `id`, `heading`, `type`, `number`, `body`
- `charReport` — character counts vs. limits for every text field

**What it does:**
- Writes publication-ready copy (concise, punchy, LinkedIn-style)
- Counts characters against hard limits
- Assigns section types (`intro`, `numbered`, `cta`, `visual`, etc.)
- Ensures 6–10 sections max (bento grid capacity)

**Present the copy brief to the user and wait for approval before proceeding.**

---

## Step 2 — Design Agent

Delegate to the `design-agent` subagent with the approved content brief.

**Input:** The approved JSON content brief from Step 1

**Output:**
- `design/infographics/[Name]Infographic.jsx` — complete bento grid template
- Updated `src/App.jsx` — imports the new design with demo data

**What it does:**
- Maps section types to components (GlassNavySection, [Color]SolidBorderSection, etc.)
- Calculates grid rows and `fr` weights based on content density
- Alternates colors (blue → orange → green → pink)
- Writes the JSX using the mandatory bento grid pattern (flex-none header/footer, flex-1 grid)

---

## Step 3 — QC Agent

Delegate to the `qc-agent` subagent to verify the output.

**Input:** The path to the design file created in Step 2

**Output:** A QC report with PASS/FAIL for each check:
1. Footer visibility (flex-none, always visible)
2. Canvas dimensions (1080×1350px)
3. Header (char limits, highlightWord match)
4. Grid structure (fr units, flex-1)
5. Section headings (char limits)
6. Color alternation (no adjacent same-color)
7. Content density (no dead space, no overflow)
8. Component usage (design system components only)
9. Imports and file structure

**If QC fails:** Fix the issues identified in the report, then re-run QC. Repeat until all checks pass.

---

## Visual Assets Available

- **Illustrations** (`assets/illustrations/`) — Character SVGs for card bodies
- **Infographic shapes** (`assets/infographics/`) — Pyramid, Target, VennDiagram, FrogJumps, Growth, Loop, Onion, Process

---

## After QC Passes

1. Run `pnpm dev` and verify visually in the browser
2. If the user wants to push to Figma, call `mcp__figma__generate_figma_design`

---

## Core Design Laws

1. **Never use plain bullets or dashes.** Every list item needs a visual anchor.
2. **Every card must feel full.** ≤15% empty space target.
3. **Color signals meaning.** Blue = features, Amber = process, Green = actions, Pink = ranked items.
4. **Section headers use action verbs.** "Create Files" not "Files".
5. **Empty bodies stay empty.** No placeholder content or dashed borders.
6. **All templates use the bento grid pattern.** Legacy inline-grid is deprecated.
7. **Figma push — never auto-open the browser.** Generate the capture ID, then give the user the URL and say "Please open this URL in your browser." Never use shell commands (`cmd start`, `open`, `xdg-open`) to open a browser. Just share the URL.
8. **NEVER crop images.** Images must never be forced inside a fixed-size container with `objectFit: cover` or `overflow: hidden`. Always compute the display height from the image's natural aspect ratio (`displayHeight = displayWidth * naturalHeight / naturalWidth`) and size the container to fit the image. The component adapts to the image, not the other way around.
