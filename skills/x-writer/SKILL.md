---
name: x-writer
description: >-
  Write one X asset for the content waterfall: an Article, a thread, or a post.
  Called by content-waterfall. Not a pipeline.
---

Vault: follow [`pipelines/vault.md`](../../pipelines/vault.md). `$VAULT` is the `VAULT_PATH` checkout (default `../Samy-SmartOS`). Read `$VAULT/CLAUDE.md` and follow its Content Workflow. Voice, proof, offer, ICP and positioning are read from `$VAULT/raw/me/` (`voice.md`, `proof.md`, `offer.md`). Never write `$VAULT/raw/`. Topic knowledge starts at `$VAULT/wiki/index.md` and `$VAULT/wiki/content-os.md`. Save under `$VAULT/outputs/content/x/drafts/<title>/`. If `$VAULT` is missing, stop and ask Samy to set `VAULT_PATH`. Do not copy vault files into this repo, and do not invent numbers, results or testimonials.

# X writer

The waterfall calls this last, for one X asset. The Article adapts the approved newsletter. It does not invent a thesis. A week of native posts is still planned with Samy through `x-planner`. This writer drafts the piece he picked.

```bash
node scripts/content-waterfall.mjs next --title "<title>" --channel x
```

If he does not want X for this idea:

```bash
node scripts/content-waterfall.mjs skip --title "<title>" --channel x
```

## Article

File: `article.md`, unless a markdown draft is already in the folder. Follow `x-article-writer`.

Lead with the strongest result the newsletter actually supports, and the reader's payoff. Then the mechanism: tools, order, decisions. Keep his names for frameworks. Numerals, no em dashes, no hashtags. Numbers only from `proof.md`. Separate what was shown from what is proposed.

The video post, when the waterfall needs one, is a short `post.md`: one line about the reader's world or the result, one or two lines on what the video shows, and the full `https://www.youtube.com/watch?v=<id>` URL. No shortened links.

## Thread

File: `thread.md`. Only when the material needs steps. A thread is not a chopped newsletter.

| Post | Job |
|---|---|
| 1 | Stands alone. The point is in the first line. Someone who never opens the thread still gets it. |
| 2…n-1 | One step each. The tool, the number or the mistake that makes it his. |
| Last | The action, or the full YouTube or newsletter URL. One ask. |

Each post fits a single X post. Do not number a thread that is really one post. Check any news claim at its source. Never use someone else's result as his.

## Post

File: `post.md`. Follow the writing rules in `x-planner`: one point, the point in the first line, short, in `voice.md`. It has to stand without the LinkedIn post and without the video. If it does not, cut it or fix it. Media when he has a real asset. Captions for a launch use the product's words from `offer.md`, without hype adjectives.

Lane planning (repurposed LinkedIn, native posts from the niche, launches) stays in `x-planner`. Record his picks and cuts in `skills/x-planner/references/verdicts.md`. Do not post the slate.

## What this hands the design system

An Article figure is placed where it explains the next step. `graphics-designer` chooses the surface, then:

| Figure | Skill | Save |
|---|---|---|
| One graphic | `infographics-designer` | `Assets/01-cover.png`, then `02-…` in article order. PNG via Export or `GET /api/export/png?mode=<modeKey>` |
| Multi-slide | `carousel-designer` | PDF via Export or `GET /api/export/pdf?mode=<modeKey>` |
| Process | `flowchart` | `Assets/*.excalidraw` |

A caption has to add information. Omit it when the figure is clear. Do not call `render.py`.

## Deliver

Return the draft path and any unresolved fact. Samy publishes in the X editor. When he says it is published:

```bash
node scripts/content-waterfall.mjs approve --title "<title>" --channel x --yes
```
