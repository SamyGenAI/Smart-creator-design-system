# Newsletter

One issue of The Smart Creator, from idea to the moment Samy sends it. This repo does not send email.

## 1. Idea

Samy names the issue, or it is the newsletter root of [content-waterfall.md](content-waterfall.md). In a waterfall, write this issue before the other channels. Notion stage: **Idea**.

## 2. Research

Read `brain/CLAUDE.md`, then `brain/wiki/index.md` and `brain/wiki/content-os.md`. Voice, proof, offer, ICP and positioning come from `brain/raw/me/` (`voice.md`, `proof.md`, `offer.md`). Read earlier issues in `brain/outputs/content/newsletter/published/` so the format stays theirs. Every metric needs a population, a period and a source. Notion stage: **Research / Scripting**.

## 3. Draft

Skill: `skills/newsletter-writer`.

Save subject, preview line and body to `brain/outputs/content/newsletter/drafts/<title>/`.

## 4. Visuals

The email thumbnail is `skills/newsletter-thumbnail-designer` (420×300). That skill is not the YouTube thumbnail.

Render: `pnpm dev`, then Export → **Download PNG**. With the server up: `GET /api/export/png?mode=<modeKey>`.

A diagram inside the issue uses `skills/flowchart` or, when it is a LinkedIn-shaped graphic, `skills/graphics-designer` and then `skills/infographics-designer`.

Save exports in `brain/outputs/content/newsletter/drafts/<title>/Assets/`. Notion stage: **Design or Filming**.

## 5. Review

Samy approves subject, preview and body. Notion stage: **Final copy / Editing**. The issue stays a draft in the email tool until he says go. **Scheduled** only after he schedules the send himself.

## 6. Publishing

Samy sends the issue, moves the folder to `brain/outputs/content/newsletter/published/<title>/`, and sets Notion to **Posted**. The agent does not send.
