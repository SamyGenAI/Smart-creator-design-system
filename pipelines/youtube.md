# YouTube

Packaging for one video: titles, description, thumbnail concept. Recording, cutting, transcription, upload, and motion graphics are **later**. Samy does those himself.

## 1. Idea

Samy picks the idea, or it is stage 0 of [content-waterfall.md](content-waterfall.md). The idea stays his. Notion stage: **Idea**.

## 2. Research

Read `brain/CLAUDE.md`, then `brain/wiki/index.md` and `brain/wiki/content-os.md`. Voice, proof, offer, ICP and positioning come from `brain/raw/me/` (`voice.md`, `proof.md`, `offer.md`). Outlier titles come from `skills/youtube-title-outlier-packaging`. A title number is allowed only when Samy can show it on camera and it is in `proof.md` or the cut. Notion stage: **Research / Scripting**.

## 3. Draft

| Piece | Skill |
|---|---|
| Waterfall brief and chapter outline | `skills/content-waterfall` (the outline is the script) |
| Two titles and thumbnail concepts | `skills/youtube-title-outlier-packaging` |
| Description, links, chapters | `skills/youtube-description` |

Save to `brain/outputs/content/youtube/drafts/<title>/`. The waterfall brief is `brief.md` in that folder. If there is no final cut, mark chapter times provisional.

## 4. Visuals

Thumbnail concept: `skills/youtube-thumbnail`. Target size 1280×720, also readable at 320×180.

This app has no YouTube thumbnail canvas. Do not use `skills/newsletter-thumbnail-designer` (that is the 420×300 email image). A dedicated thumbnail render, plus video and motion, are **later**. Save the concept in `brain/outputs/content/youtube/drafts/<title>/Assets/`.

A still that is actually a LinkedIn graphic uses `skills/graphics-designer` and `skills/infographics-designer`, then `pnpm dev` and Export → **Download PNG** (`GET /api/export/png?mode=<modeKey>` with the server up).

Notion stage while Samy is recording or filming: **Design or Filming**.

## 5. Review

Samy picks the title and the thumbnail concept. Notion stage: **Final copy / Editing**. He uploads, private first. **Scheduled** only after he sets the premiere or publish time himself.

## 6. Publishing

Samy publishes the video, moves the folder to `brain/outputs/content/youtube/published/<title>/`, and sets Notion to **Posted**. The agent does not upload.
