---
name: youtube-writer
description: >-
  Write one YouTube asset for the content waterfall: a script, titles, a
  description, or a thumbnail concept. Called by content-waterfall. Not a pipeline.
---

Vault: follow [`pipelines/vault.md`](../../pipelines/vault.md). `$VAULT` is the `VAULT_PATH` checkout (default `../Samy-SmartOS`). Read `$VAULT/CLAUDE.md` and follow its Content Workflow. Voice, proof, offer, ICP and positioning are read from `$VAULT/raw/me/` (`voice.md`, `proof.md`, `offer.md`). Never write `$VAULT/raw/`. Topic knowledge starts at `$VAULT/wiki/index.md` and `$VAULT/wiki/content-os.md`. Save under `$VAULT/outputs/content/youtube/drafts/<title>/`. If `$VAULT` is missing, stop and ask Samy to set `VAULT_PATH`. Do not copy vault files into this repo, and do not invent numbers, results or testimonials.

# YouTube writer

The waterfall calls this after the newsletter issue, for one YouTube asset at a time. Recording, cutting, transcription, upload and motion graphics stay with Samy. They are later.

```bash
node scripts/content-waterfall.mjs next --title "<title>" --channel youtube
```

Write only that asset. If the file exists (`Script.md` counts as the script), do not write another. The newsletter issue for this title is the argument. Do not invent a new thesis.

## Script

File: `script.md`, unless `Script.md` or another root markdown draft is already there. That existing file is the script.

Read the issue and `brief.md` in the newsletter draft when they exist. Spoken lines follow `voice.md`.

| Column | What it holds |
|---|---|
| Cold open | The result, on screen, in the first sentences. It delivers the title's promise. |
| Chapters | One chapter, one claim. Say what is on screen. One chapter answers one buyer objection so it can be sent later as a timestamped reply. |
| Close | The resource and the newsletter. One action. |

A number is allowed only when it is in `$VAULT/raw/me/proof.md` and Samy can show it on camera. If there is no final cut, say the script is pre-cut. Do not invent chapter times.

## Titles

File: `titles.md`. Follow `youtube-title-outlier-packaging`. Two variants, different structures, each claim marked **proven**, **on video only** or **packaging hypothesis**. Proven means `proof.md` or the cut. Packaging first: the script has to deliver the title. Do not package a comparison the video is not.

## Description

File: `description.md`. Follow `youtube-description`.

Open with what the viewer gets: 2 sentences, about 25 words together. Sentence 1, at most 12 words, carries the main search phrase. Sentence 2, at most 15 words, says what the video shows. No keyword stuffing, no hashtag block.

Resources use full URLs. YouTube links use `https://www.youtube.com/watch?v=<id>`. Chapter times come from the final cut. If there is no cut, mark them provisional. Offer links come from `offer.md`. Do not invent a sponsor or a download.

## Thumbnail

File: `Assets/thumbnail-concept.md`. Follow `youtube-thumbnail`. Target 1280×720, also readable at 320×180.

This app has no YouTube thumbnail canvas. Do not use `newsletter-thumbnail-designer` (that is the 420×300 email image). Do not stretch an infographic into a fake still. A number on the concept has to be in `proof.md` and shown in the video.

Write four lines: text, visual, colour role from `DESIGN.md`, what not to do. One dominant promise, 2 to 5 words.

A still that is actually a LinkedIn graphic uses `graphics-designer` and `infographics-designer`, then `pnpm dev` and Export → Download PNG (`GET /api/export/png?mode=<modeKey>` with the server up). Save it under `Assets/` with its own name. Do not call `render.py`.

## Deliver

Return the asset path and any claim Samy must confirm. This repo does not upload. When he says the video is published:

```bash
node scripts/content-waterfall.mjs approve --title "<title>" --channel youtube --yes
```
