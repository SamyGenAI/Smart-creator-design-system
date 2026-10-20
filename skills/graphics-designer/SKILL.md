---
name: graphics-designer
description: Decide the job of one graphic, carousel or banner, then hand the build to the design system. Use before infographics-designer, carousel-designer or newsletter-thumbnail-designer.
---

Workspace: this repo is the Content OS. Read `CLAUDE.md` here, then `brain/CLAUDE.md` and follow its Content Workflow. Voice, proof, offer, ICP and positioning are read from `brain/raw/me/` (`voice.md`, `proof.md`, `offer.md`, and sibling pages). Never write `brain/raw/`. Topic knowledge starts at `brain/wiki/index.md` and `brain/wiki/content-os.md`. The finished image goes in `brain/outputs/content/<channel>/drafts/<title>/Assets/`. If `brain/` is not checked out, stop and ask Samy to add the submodule (command in the README). Do not copy vault files into this repo, and do not invent numbers, results or testimonials.

# Design a graphic

This skill chooses what the graphic says. It does not replace the design system.

`infographics-designer` stays the skill that builds a 1080×1350 LinkedIn infographic in JSX. `carousel-designer` builds the carousel. `newsletter-thumbnail-designer` builds the 420×300 email thumbnail. `youtube-thumbnail` is a different surface (a YouTube still) and is not this skill. `flowchart` builds an editable process map. Read the content brief, `DESIGN.md`, and the positioning, ICP and voice pages in `brain/raw/me/` before choosing.

Establish the information relationship before choosing a composition: a thesis, sequence, comparison, hierarchy, evidence or reflection. Keep the copy faithful to its source. A missing number or screenshot is not permission to invent one.

Use dimensions from the requested destination or supplied brief. Verify current platform requirements when exact compliance matters. Infer routine layout details; ask only when a missing choice changes the content or format materially.

## Which design skill builds it

| Ask | Skill | Canvas | Render |
|---|---|---|---|
| LinkedIn infographic | `infographics-designer` | 1080×1350 | `pnpm dev`, Export → Download PNG. Or `GET /api/export/png?mode=<modeKey>` with the dev server up |
| LinkedIn carousel | `carousel-designer` | 1080×1350 × N | `pnpm dev`, Export → Download PDF. Or `GET /api/export/pdf?mode=<modeKey>` |
| Newsletter thumbnail | `newsletter-thumbnail-designer` | 420×300 | `pnpm dev`, Export → Download PNG. Or `GET /api/export/png?mode=<modeKey>` |
| Process map or funnel | `flowchart` | Excalidraw scene | The editor's own export, saved beside the `.excalidraw` |
| YouTube thumbnail | `youtube-thumbnail` | No canvas in this app yet | Concept only, until a 1280×720 mode exists |

Follow that skill's rules, including the design-brief gate for infographics, carousels and slides. Register the JSX in `src/modes.js` and `src/App.jsx` the way that skill says. Save the export into the draft's `Assets/` folder. Do not call `render.py`.

## Visual choices

Brand colour and type come from `DESIGN.md` and the design-system components. Do not put a hex colour or a font name in a design file. Do not invent a logo, author signature or decorative footer. Include a call to action only when the brief provides a useful next step.

Let spacing, hierarchy and truthful relationships carry the graphic. Do not force diagrams into quotes or turn every slide into identical cards. Keep authentic product screenshots intact and use supplied photography with known permissions.

For carousels, give each page a specific job and maintain continuity.

## Deliver

Return the design file path, the mode key, the export path under `Assets/`, the dimensions and any limitation. Producing one graphic does not authorize changing `DESIGN.md` or publishing the piece.
