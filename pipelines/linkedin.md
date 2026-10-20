# LinkedIn

One LinkedIn piece, from idea to the moment Samy posts it. Replies are not this path: `skills/linkedin-unibox-reply` drafts from a pasted thread, and there is no inbox tool yet.

## 1. Idea

Samy names the idea, or it arrives from [content-waterfall.md](content-waterfall.md). Notion stage: **Idea**.

## 2. Research

Read `brain/CLAUDE.md`, then `brain/wiki/index.md` and `brain/wiki/content-os.md`, then the pages on this topic. Voice, proof, offer, ICP and positioning come from `brain/raw/me/` (`voice.md`, `proof.md`, `offer.md`). Numbers, results and testimonials only from `proof.md` or a source named in the draft. Notion stage: **Research / Scripting**.

## 3. Draft

Skill: `skills/linkedin-copywriter`. The opening uses `skills/linkedin-hook-writer`.

Save the post to `brain/outputs/content/linkedin/drafts/<title>/`.

## 4. Visuals

`skills/graphics-designer` chooses the graphic, then:

| Piece | Design skill | Render |
|---|---|---|
| Infographic | `skills/infographics-designer` (1080×1350) | `pnpm dev`, then Export → **Download PNG**. With the server up: `GET /api/export/png?mode=<modeKey>` |
| Carousel | `skills/carousel-designer` | `pnpm dev`, then Export → **Download PDF**. With the server up: `GET /api/export/pdf?mode=<modeKey>` |
| Process map | `skills/flowchart` | Excalidraw export from the editor |

Do not call `render.py`. Save the file in `brain/outputs/content/linkedin/drafts/<title>/Assets/`.

Notion stage: **Design or Filming**.

## 5. Review

Samy approves the copy and the visual. Notion stage: **Final copy / Editing** while he edits. **Scheduled** only after he queues the post himself, in LinkedIn. One LinkedIn post a day.

## 6. Publishing

Samy posts it, moves the folder to `brain/outputs/content/linkedin/published/<title>/`, and sets Notion to **Posted**. The agent does not post, schedule, or move the folder.
