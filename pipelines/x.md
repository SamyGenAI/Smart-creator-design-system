# X

X posts and X Articles. The waterfall owns two of them per video: the video post and the X Article. Everything else is planned here.

## 1. Idea

Samy sits the planning session, or the piece arrives from [content-waterfall.md](content-waterfall.md). Notion stage: **Idea**.

## 2. Research

Read `brain/CLAUDE.md`, then `brain/wiki/index.md` and `brain/wiki/content-os.md`. Voice, proof, offer, ICP and positioning come from `brain/raw/me/` (`voice.md`, `proof.md`, `offer.md`). For a native post, check the niche the way `skills/x-planner` describes, and check any news claim at its source. Never use someone else's result as Samy's. Notion stage: **Research / Scripting**.

## 3. Draft

| Piece | Skill |
|---|---|
| Week of posts, micro posts, chapter threads | `skills/x-planner` |
| X Article, or the post that announces a video | `skills/x-article-writer` |

Save to `brain/outputs/content/x/drafts/<title>/`. An Article adapts the approved newsletter. It does not invent a new thesis.

## 4. Visuals

`skills/graphics-designer` places each figure, then `skills/infographics-designer` or `skills/carousel-designer` builds it. A process map uses `skills/flowchart`.

Render: `pnpm dev`, then Export → **Download PNG** (infographic) or **Download PDF** (carousel). With the server up: `GET /api/export/png?mode=<modeKey>` or `GET /api/export/pdf?mode=<modeKey>`.

Save the cover and inline images, numbered in article order, in `brain/outputs/content/x/drafts/<title>/Assets/`. Notion stage: **Design or Filming**.

## 5. Review

Samy picks, cuts and edits. Keep his words. Notion stage: **Final copy / Editing**. **Scheduled** only after he queues the post in X.

## 6. Publishing

Samy publishes in the native X editor, moves the folder to `brain/outputs/content/x/published/<title>/`, and sets Notion to **Posted**. The agent does not post or schedule.
