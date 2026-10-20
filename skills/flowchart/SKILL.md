---
name: flowchart
description: Create editable flowcharts, system maps and funnels with semantic icons, structured operation cards, distinct skill and decision shapes, and verified routing.
---

Workspace: this repo is the Content OS. Read `CLAUDE.md` here, then `brain/CLAUDE.md` and follow its Content Workflow. Voice, proof, offer, ICP and positioning are read from `brain/raw/me/` (`voice.md`, `proof.md`, `offer.md`, and sibling pages). Never write `brain/raw/`. Topic knowledge starts at `brain/wiki/index.md` and `brain/wiki/content-os.md`. Save the `.excalidraw` scene in the draft's `Assets/` folder: `brain/outputs/content/<channel>/drafts/<title>/Assets/`. If `brain/` is not checked out, stop and ask Samy to add the submodule (command in the README). Do not copy vault files into this repo, and do not invent numbers, results or testimonials. Skill-local `references/` and `scripts/` resolve from this skill directory.

# Draw an editable flowchart

Read `CLAUDE.md`, the actual workflow sources and `DESIGN.md` when the diagram must match the brand. For a content funnel, read `brain/wiki/content-os.md` and the pipeline in `pipelines/`. When editing, inspect the existing scene and generator, preserve manual changes and retain the current viewing URL.

## Model the process

Identify triggers, inputs, operations, decisions, outputs, exceptions and feedback before choosing the layout. Give each nontrivial branch an explicit destination.

Use narrowing shapes for filtering, lanes for ownership and arrows for real dependencies. A taxonomy of pillars or test dimensions is a set of choices, not a sequential process. Top/middle/bottom describe content jobs; readers need not pass through every stage.

In signal-based outreach, distinguish engagement capture, buyer-fit qualification, routing, draft creation, review and sending. Label proposed steps and dated snapshots. Engagement alone does not imply buyer intent, permission or a sale. Drawing an operation does not execute it. Nothing in a diagram is posted or sent.

## Make the roles visible

Read [the visual grammar and helper API](references/design-and-tools.md) when authoring a scene.

- **Source/reference:** quiet file card or compact list; no action-style header that implies execution.
- **Function/operation:** square card, light title band, semantic icon, labeled input/work rows and a distinct output strip.
- **Skill:** rounded card and contrasting title band for a procedure that applies context or judgment. Classify its responsibility, not whether its name contains AI.
- **Decision:** short question inside a diamond, with labeled exits and explicit hold/retry destinations.
- **Signal/result:** a compact event or result shape. A numeric result can use large type with its unit, population and date. The number must come from `brain/raw/me/proof.md` or a source named on the diagram.
- **Grouping:** shared alignments or a light container for a meaningful stage. Use different compositions for an overview, taxonomy, funnel and result breakdown.

Use semantic line icons for recognizable concepts such as a source file, person, company, context brain, calendar, message or verification. Keep icon size and stroke consistent. Each icon stays editable and grouped with its card. Icons are not a substitute for readable labels.

Use `DESIGN.md` tokens when the diagram must match the brand. The included helper defaults to neutral grays and a standard font slot; it contains no logo, signature or client connections. Do not invent a logo or a result.

## Build and inspect

Use the named tool or existing project canvas. For Excalidraw, `scripts/flowchart.py` and its adjacent `primitives.py` build native shapes, semantic icons, grouped cards, embedded images and reciprocal arrow bindings using Python's standard library. No scene is created on import. Pass a theme and font slot explicitly when integrating with a custom canvas.

This helper is the right tool for an editable process map. A LinkedIn infographic, carousel or newsletter thumbnail is a different surface: hand that to `graphics-designer`, which routes it to the design-system skill. Do not claim an SVG is a native hosted diagram.

Compute connector endpoints from current card bounds. Route long returns outside the main flow. Leave room for labels. Shorten, wrap or enlarge a card before shrinking its text.

Python estimates text sizes for authoring; actual glyph measurement and visual inspection are still required. Render or import using the available editor. Verify actual fonts, text containment, connector collisions, branch meaning, reciprocal bindings and image aspect ratio. Do not silently substitute fonts or flatten editable elements to make validation pass.

Open the rendered overview and useful detail views. A dense working map needs zoom; a phone preview checks hierarchy, not proof that every field is readable. Split a social graphic into fewer nodes or multiple slides.

Deliver the editable scene, preview where available, dimensions, viewing URL and any inspection limitation. Keep reusable mechanics here and domain content in the draft's `Assets/` folder.
