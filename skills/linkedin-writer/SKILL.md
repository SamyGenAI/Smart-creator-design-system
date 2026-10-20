---
name: linkedin-writer
description: >-
  Write one LinkedIn asset for the content waterfall: a post, hook options, or
  a carousel brief. Called by content-waterfall. Not a pipeline.
---

Vault: follow [`pipelines/vault.md`](../../pipelines/vault.md). `$VAULT` is the `VAULT_PATH` checkout (default `../Samy-SmartOS`). Read `$VAULT/CLAUDE.md` and follow its Content Workflow. Voice, proof, offer, ICP and positioning are read from `$VAULT/raw/me/` (`voice.md`, `proof.md`, `offer.md`). Never write `$VAULT/raw/`. Topic knowledge starts at `$VAULT/wiki/index.md` and `$VAULT/wiki/content-os.md`. Save under `$VAULT/outputs/content/linkedin/drafts/<title>/`. If `$VAULT` is missing, stop and ask Samy to set `VAULT_PATH`. Do not copy vault files into this repo, and do not invent numbers, results or testimonials.

# LinkedIn writer

The waterfall calls this after YouTube, for one LinkedIn asset. Replies are not this writer. `linkedin-unibox-reply` drafts from a pasted thread, and there is no inbox tool yet.

```bash
node scripts/content-waterfall.mjs next --title "<title>" --channel linkedin
```

The newsletter issue is the argument. Take one point from it. Do not compress the whole issue into the post.

## Post

File: `post.md`, unless a markdown draft is already in the folder. That file is the post. Do not create `post.md` beside it.

Follow `linkedin-copywriter` for the body. The opening follows `linkedin-hook-writer`, including the character check:

```bash
python3 skills/linkedin-hook-writer/scripts/check_hook.py draft.txt
```

One useful point, one reader (ICP in `raw/me/`), one job: Reach, Belief or Signup. The body has to pay off the first line. Public numbers come only from `proof.md`. A CTA only when it matches `offer.md`. Links go in the first comment, and the post says so. One LinkedIn post a day when Samy queues it. This repo does not queue it.

## Hooks

File: `hooks.md`, and only when Samy asks for options or `next` names `hooks`. Otherwise the hook lives in the post. The waterfall treats hooks as done once the post exists, so a bare `next` will not ask for a second file.

Default to 3 options when he asks without a count. Mark the one that should open the post. Counts stay outside the copy. Families and length targets are in `linkedin-hook-writer`. Use his facts. Do not invent a result to make a shape fit.

## Carousel

File: `carousel.md`. This is the copy brief, not the JSX. Write it only when `next` names `carousel` or Samy asks. Skip it with:

```bash
node scripts/content-waterfall.mjs skip --title "<title>" --channel linkedin --asset carousel
```

Follow the arc in `carousel-designer`: cover, 2–3 story slides, context, steps, wrap-up, CTA. 7 to 20 slides. Story slides are one sentence. Each step is one action. The brief lists `type`, `title`, `subtitle`, `body` and `stepNumber` per slide, plus character counts. Present the brief and wait for his approval before `carousel-designer` builds JSX.

## What this hands the design system

| Asset | When | Skill | Save |
|---|---|---|---|
| Infographic for the post | The post needs a graphic, not by default | `graphics-designer`, then `infographics-designer` | `Assets/infographic.png` (1080×1350). `pnpm dev`, Export → Download PNG, or `GET /api/export/png?mode=<modeKey>` |
| Carousel | `carousel.md` is approved | `carousel-designer` | `Assets/carousel.pdf`. Export → Download PDF, or `GET /api/export/pdf?mode=<modeKey>` |
| Process map | The point is a sequence | `flowchart` | `Assets/*.excalidraw` |

Do not call `render.py`. Register JSX the way the design skill says.

## Deliver

Return the draft path. Saving a draft does not publish it. When Samy says he posted it:

```bash
node scripts/content-waterfall.mjs approve --title "<title>" --channel linkedin --yes
```
