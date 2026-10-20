---
name: content-waterfall
description: Run one content waterfall from idea to draft to published. Newsletter first, then YouTube, then LinkedIn, then X, one asset at a time. Use when Samy gives the idea of the week, wants the next platform piece, or asks to repurpose. Calls the four writers. Does not post.
---

Vault: follow [`pipelines/vault.md`](../../pipelines/vault.md). `$VAULT` is the `VAULT_PATH` checkout (default `../Samy-SmartOS`). Read `$VAULT/CLAUDE.md` and follow its Content Workflow. Voice, proof, offer, ICP and positioning are read from `$VAULT/raw/me/` (`voice.md`, `proof.md`, `offer.md`). Never write `$VAULT/raw/`. Topic knowledge starts at `$VAULT/wiki/index.md` and `$VAULT/wiki/content-os.md`. The operating order is [`pipelines/content-waterfall.md`](../../pipelines/content-waterfall.md). Config is [`pipelines/platforms.json`](../../pipelines/platforms.json). The brief is `$VAULT/outputs/content/newsletter/drafts/<title>/brief.md`. Each asset goes in `$VAULT/outputs/content/<channel>/drafts/<title>/`, images in `Assets/`. If `$VAULT` is missing, stop and ask Samy to set `VAULT_PATH`. Do not copy vault files into this repo, and do not invent numbers, results or testimonials. Skill-local `references/` resolve from this skill directory.

# Content waterfall

One idea becomes a newsletter issue, then a YouTube package, then LinkedIn, then X. Production order is that sequence. One asset at a time. The four writers do the drafting. This skill decides which asset is next and stops there.

```bash
node scripts/content-waterfall.mjs status --title "<title>"
node scripts/content-waterfall.mjs next --title "<title>"
```

A bare `next` returns the first missing required asset: newsletter issue, YouTube script, titles, description, LinkedIn post, X Article. Optional assets (thumbnail, carousel, thread, post, a separate hooks file) show in `status` and in `next --channel <channel>`. Pass `--asset <id>` to draft that one even when earlier assets are still open. If the command says `exists`, do not write another file.

Publish dates live in the brief. They are not a reason to draft every channel in one pass.

Video cutting, motion graphics and upload automation are later. Samy records and uploads. This repo never posts or sends.

## The stages at a glance

| Stage | What happens | Output | Samy decides |
|---|---|---|---|
| 0 Idea | Scan what is hot on YouTube, X and LinkedIn, add last week's signals | A slate of 3 to 5 ideas with proof of heat | The pick |
| 1 Brief | Packaging notes, then the brief | `brief.md` from `references/brief-template.md`, only if missing | Release date |
| 2 Next | Read the vault folders and `waterfall.json` | One asset id | Skip or redirect |
| 3 Draft | The writer for that asset only | One new file, or an edit he asked for | The wording |
| 4 Visual | The design handoff on that asset, when `handsTo` is set | One export in `Assets/` | Whether it needs a visual |
| 5 Review | He approves before anything is queued | The same file | Go |
| 6 Publish | He publishes. Then the folder may move | `published/<title>/` | The word published |

Enter where the work is. A title that already has an issue starts at the next missing asset.

## Standing rules

- The idea is his. The slate proposes 3 to 5 ideas with proof of heat. He picks. Never pick the idea of the week for him.
- One asset per run. A later run calls `status` and continues. Do not regenerate a file that is already in the draft folder.
- Never overwrite a draft he wrote. If the folder holds `How to design with AI.md`, that file is the asset. Propose a change or wait until he asks.
- Truth over packaging. Numbers come only from `$VAULT/raw/me/proof.md` or a wiki page that cites a source. Drop a planned number the video does not show.
- Write in his voice (`$VAULT/raw/me/voice.md`). When he calls a line generic, rewrite that section from his words.
- The newsletter issue is the argument. YouTube, LinkedIn and X adapt it. They do not invent a thesis.
- Link videos with the full `https://www.youtube.com/watch?v=<id>` URL. Never a shortener.
- Drafting is not publishing. Notion **Scheduled** only after he queues it. Notion **Posted** only after he says it is live.

## Writers

| Order | Channel | Writer | Formats |
|---|---|---|---|
| 1 | Newsletter | `newsletter-writer` | Issue, then the 420×300 thumbnail |
| 2 | YouTube | `youtube-writer` | Script, titles, description, thumbnail concept |
| 3 | LinkedIn | `linkedin-writer` | Post, hooks, carousel |
| 4 | X | `x-writer` | Article, thread, post |

Format modules those writers call: `linkedin-copywriter`, `linkedin-hook-writer`, `youtube-title-outlier-packaging`, `youtube-description`, `youtube-thumbnail`, `x-article-writer`, `x-planner`. They are not pipelines.

## Stage 0: Find the idea

| Scan | What to bring back |
|---|---|
| Last week's close | Winners, the best questions, customer wins he has already cleared |
| YouTube | Outliers from `youtube-title-outlier-packaging` |
| X | Posts going viral in the niche, checked the way `x-planner` describes |
| LinkedIn | Outlier posts, with their hooks, from creators he follows |

The slate: 3 to 5 ideas, each with its proof of heat, the pillar from `$VAULT/wiki/` (start at `content-os.md`), the funnel job and the receipt he can show on camera. Prefer ideas with more demand than supply.

Run `init` once he picks, so the newsletter draft folder and `waterfall.json` exist. `init` does not write the issue and does not touch a file he already saved.

Notion stage after the pick: **Idea**.

## Stage 1: Brief

1. Take the picked idea in his words. Choose 1 pillar and 1 funnel stage from `offer.md`, the ICP pages and `voice.md`.
2. Stance check: read what he published on the topic, starting from `$VAULT/wiki/`. The new piece builds on it or names the change.
3. Facts: check every product, model or market claim at its source and date it. Numbers, results and testimonials come only from `proof.md` or a source quoted in the brief.
4. Worked example and resource: prefer what he can show and what already exists.
5. Write the brief from `references/brief-template.md` to the newsletter draft's `brief.md` when that file is absent. Do not overwrite an existing brief.
6. Ask him only what he alone knows: the release date. List everything else under open decisions.

Notion stage: **Research / Scripting**.

## Stage 2: Next asset

```bash
node scripts/content-waterfall.mjs next --title "<title>"
```

Link a folder that does not use the title as its name:

```bash
node scripts/content-waterfall.mjs link --title "<title>" --channel linkedin --folder "<folder>"
```

Skip what this idea does not need:

```bash
node scripts/content-waterfall.mjs skip --title "<title>" --channel linkedin --asset carousel
```

The content calendar lives in Notion. Update a card only when he asked and `$VAULT/wiki/` documents that database. Otherwise keep the dated plan in the brief. Stages: Idea, Research / Scripting, Design or Filming, Final copy / Editing, Scheduled, Posted.

Default publish calendar, counted from release day D. This is when pieces go out, not permission to draft them all now.

| Day | Piece | Platform | Writer |
|---|---|---|---|
| D | Newsletter | Newsletter | `newsletter-writer` |
| D | The video | YouTube | `youtube-writer` |
| D | X Article | X | `x-writer` |
| His pick | Native video post | LinkedIn | `linkedin-writer` |
| That week's slot | The lesson | LinkedIn | `linkedin-writer` |
| D+7 | The resource post | LinkedIn | `linkedin-writer` |
| Open slots | Idea posts that stand without the video | LinkedIn or X | the matching writer |

## Stage 3: Draft

Call the one writer. Pass the asset id. Do not call the other three.

Save under `$VAULT/outputs/content/<channel>/drafts/<title>/` using the filename in `platforms.json`. An existing markdown draft satisfies the primary asset for that channel. Leave it in place.

Notion stage once that asset is in the folder: **Final copy / Editing**.

## Stage 4: Visual

Only for the asset just drafted, and only when he wants it. Read `handsTo` in `platforms.json`.

| Asset | Design skill | Render |
|---|---|---|
| Newsletter thumbnail | `newsletter-thumbnail-designer` | 420×300 PNG |
| YouTube thumbnail | `youtube-thumbnail` | Concept file only, 1280×720 |
| LinkedIn infographic | `infographics-designer` | 1080×1350 PNG |
| LinkedIn carousel | `carousel-designer` | 1080×1350 PDF |
| X figure or process map | `graphics-designer` or `flowchart` | PNG, PDF or `.excalidraw` |

`pnpm dev`, then the preview toolbar Export menu. With the server up: `GET /api/export/png?mode=<modeKey>`, `GET /api/export/pdf?mode=<modeKey>`, `GET /api/export/pptx?mode=<modeKey>`, `GET /api/export/gif?mode=<modeKey>` for an animated infographic. Do not call `render.py`. Save the file in that draft's `Assets/`.

## Stage 5: Review

He approves the copy and the visual. **Scheduled** only after he queues it himself. Keep 1 LinkedIn post a day. The newsletter stays a draft in the email tool until he says go.

## Stage 6: Publish

He posts, sends or uploads. Then, and only then:

```bash
node scripts/content-waterfall.mjs approve --title "<title>" --channel <channel> --yes
```

The command moves that channel's folder from `drafts/` to `published/`. It does not post, send, upload or schedule. Without `--yes` it refuses. If the published folder already exists, it refuses so his copy is safe.

## Convert and close

There is no inbox tool. Work from threads he pastes.

- Qualify company and person fit from the paste and from ICP in `$VAULT/raw/me/`. Do not invent fit.
- `linkedin-unibox-reply` drafts one reply. He sends it. If the copy changes after approval, ask again.
- No sequence and no send without his go.

At the close, rank pieces he has already published. The top one or two can be repurposed later as their own `next` run. Customer wins go into the next brief only with permission and cleared numbers from `proof.md`. The next idea stays his. Record results in the brief.

## Hand-off

After the asset, tell him the file path, what `status` now shows, and the following asset. Do not start that following asset in the same run unless he asked for it.
