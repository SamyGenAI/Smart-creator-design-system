# Content waterfall

One pipeline for every channel. One idea becomes a newsletter issue, then a YouTube package, then LinkedIn, then X. One asset at a time. The skill [`skills/content-waterfall`](../skills/content-waterfall/SKILL.md) is the stage order. This page is the path an agent runs.

There are no per-channel pipelines. [`platforms.json`](platforms.json) is the config: writers, asset files, and what each asset hands the design system. The writers are skills, not pipelines.

| Order | Writer | Required assets | Optional, on request |
|---|---|---|---|
| 1 | `newsletter-writer` | Issue | 420×300 thumbnail |
| 2 | `youtube-writer` | Script, titles, description | Thumbnail concept |
| 3 | `linkedin-writer` | Post | Hooks file, carousel |
| 4 | `x-writer` | Article | Thread, post |

Video cutting, transcription, upload and motion graphics are later. Samy does those.

## State

Asset state is the vault folders `outputs/content/<channel>/{drafts,published}/<title>/`. A markdown file Samy already saved counts. `waterfall.json` in the newsletter folder records the linked folder names, skips and approval. It does not replace the files.

```bash
node scripts/content-waterfall.mjs init --title "<title>"
node scripts/content-waterfall.mjs status --title "<title>"
node scripts/content-waterfall.mjs next --title "<title>"
```

`next` returns the first missing required asset in the order above. It does not create the copy. `next --channel linkedin` continues that platform, including an optional asset. `next --channel linkedin --asset carousel` asks for that asset only. If the file exists, the command says `exists` and the agent stops.

Link a folder whose name is not the title, without moving it:

```bash
node scripts/content-waterfall.mjs link --title "<title>" --channel linkedin --folder "<folder>"
```

Skip a piece he does not want:

```bash
node scripts/content-waterfall.mjs skip --title "<title>" --channel x --asset thread
```

## 1. Idea

Samy names the idea, or stage 0 of the skill brings him 3 to 5 ideas with proof of heat. He picks. Never pick for him. Notion stage: **Idea**.

## 2. Research

Read [`vault.md`](vault.md), then `$VAULT/CLAUDE.md`, `$VAULT/wiki/index.md` and `$VAULT/wiki/content-os.md`. Ground the brief in `$VAULT/raw/me/` (`voice.md`, `proof.md`, `offer.md`). Check every product or market claim at its source.

Write `brief.md` in the newsletter draft from [`skills/content-waterfall/references/brief-template.md`](../skills/content-waterfall/references/brief-template.md) only when that file is missing. Notion stage: **Research / Scripting**.

## 3. Draft the next asset

Run `next`. Call that row's writer and no other. The newsletter issue is the argument. Do not re-derive it per channel.

| Asset | Writer | Also read |
|---|---|---|
| Issue, thumbnail | `newsletter-writer` | |
| Script, titles, description, thumbnail concept | `youtube-writer` | `youtube-title-outlier-packaging`, `youtube-description`, `youtube-thumbnail` |
| Post, hooks, carousel | `linkedin-writer` | `linkedin-copywriter`, `linkedin-hook-writer`, `carousel-designer` for the build |
| Article, thread, post | `x-writer` | `x-article-writer`, `x-planner` |

A later run starts at `status` and continues from the files already in the vault.

## 4. Visuals for that asset

`platforms.json` names the design skill, the canvas and the render for the asset just drafted. Do the handoff only when `handsTo` is set and he wants the visual. `graphics-designer` chooses a graphic. `flowchart` builds a process map. Rendered images go in that draft's `Assets/`.

The YouTube thumbnail is a concept until a 1280×720 canvas exists. Do not use the newsletter thumbnail for it. Notion stage for design, and for filming he does himself: **Design or Filming**.

## 5. Review

He approves the asset before it is queued. Notion stage: **Final copy / Editing**. **Scheduled** only after he queues it on that platform. There is no publishing tool in this repo.

Engagers become conversations only from threads he pastes. `linkedin-unibox-reply` drafts. He sends. Nothing is sent automatically.

## 6. Publishing

He publishes the piece himself. Nothing is posted or sent by this repo. When he says that channel's piece is published:

```bash
node scripts/content-waterfall.mjs approve --title "<title>" --channel newsletter --yes
```

Without `--yes` the command refuses. With `--yes` it moves `drafts/<folder>/` to `published/<folder>/` and does nothing else. If `published/` already has that folder, it refuses rather than overwrite. He sets Notion to **Posted**. The next idea is still his.
