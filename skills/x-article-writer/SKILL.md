---
name: x-article-writer
description: Write or revise a compact native X Article in the author's voice from their newsletter, framework, posts or lead magnet, with the strongest supported result first and useful graphics placed where they explain the argument. Also writes the X post that announces a video. Use for X Articles and illustrated long posts on X; use x-planner for ordinary X posts.
---

Vault: follow [`pipelines/vault.md`](../../pipelines/vault.md). `$VAULT` is the `VAULT_PATH` checkout (default `../Samy-SmartOS`). Read `$VAULT/CLAUDE.md` and follow its Content Workflow. Voice, proof, offer, ICP and positioning are read from `$VAULT/raw/me/` (`voice.md`, `proof.md`, `offer.md`). Never write `$VAULT/raw/`. Topic knowledge starts at `$VAULT/wiki/index.md` and `$VAULT/wiki/content-os.md`. Save the article to `$VAULT/outputs/content/x/drafts/<title>/` and images to that folder's `Assets/`. If `$VAULT` is missing, stop and ask Samy to set `VAULT_PATH`. Do not copy vault files into this repo, and do not invent numbers, results or testimonials.

Called by `x-writer` for `article.md`. Not a pipeline. If a markdown draft is already in the folder, that file is the article. Do not add a second copy.

# X Article writer

Turn the author's material into an article a reader can use. Text and graphics explain the same argument. In a content waterfall the X Article adapts the approved newsletter; it does not invent a new thesis.

## Ground the brief

Read positioning, ICP and offer from `$VAULT/raw/me/`, plus `$VAULT/raw/me/proof.md` and `$VAULT/raw/me/voice.md`. Pillars and funnel jobs come from `$VAULT/wiki/` (start at `$VAULT/wiki/content-os.md`). Then read the actual source: the newsletter, transcript, framework or post the article comes from. Use the voice file for the author's voice, not LinkedIn's hook length or formatting limits.

Establish a short working brief: the reader's problem, the thesis, the author's own contribution, the evidence, the section order and the graphics. Ask only for information that changes the argument.

For a supplied X URL, read the actual post and any linked Article, including its cover and inline graphics. If access is partial, say what was read. Never infer an article from its preview.

## Write the article

- Lead with the strongest supported result and the reader's payoff. The title is specific; the introduction states the result, the author's relevant proof and what the reader will be able to build.
- Follow the result with the mechanism: the tools, the order of operations, the decisions and the reasons. Keep the author's concrete details and first-person experience.
- Make it personal through documented habits, mistakes and decisions, not by swapping "you" for "I".
- Keep the author's own names for their frameworks and explain each the first time.
- Prefer the shortest complete explanation. A section can be 2 sentences and a graphic. Do not pad to a word count.
- Separate what was demonstrated from what is proposed. Numbers come only from `$VAULT/raw/me/proof.md`; keep differing time windows separate.
- Use a reference article for craft only: how it sets stakes and lets graphics carry information. Never import its anecdotes, numbers or distinctive lines.
- Numerals, no em dashes, no hashtags, no generic AI phrases.

## Graphics

Place each graphic where it explains the next step of the argument. A caption must add information; omit it when the figure explains itself. Use `graphics-designer` (then the design-system skill it names) or `flowchart` for new figures and keep the editable source. For the X handoff, export a cover and full-resolution inline images numbered in article order, with a short placement guide, into `Assets/`.

Render a design-system graphic with `pnpm dev` and the preview toolbar Export menu (PNG for an infographic, PDF for a carousel). With the dev server up those are `GET /api/export/png?mode=<modeKey>` and `GET /api/export/pdf?mode=<modeKey>`. Do not call `render.py`.

## The video post

When the waterfall needs the X post for a new video: 1 short line about the reader's world or the result, 1 or 2 lines on what the video shows, the native video if available, and the full `https://www.youtube.com/watch?v=<id>` URL. No shortened links. Save it in the same X draft folder.

## Deliver

Return the article, the title, the cover and the inline graphics with their positions, plus any unresolved facts. Drafting does not authorize publishing or scheduling. Hand the draft and assets to the author for the native X editor. Samy publishes in the X editor. When he says it is published, `node scripts/content-waterfall.mjs approve --title "<title>" --channel x --yes` moves the folder. That command does not post.

Review before returning: does the title promise something useful, does the opening carry the strongest supported result, would the author recognise their reasoning, can a reader scan it and act, and do text, figures and links describe the same system?
