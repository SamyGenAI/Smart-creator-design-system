---
name: linkedin-copywriter
description: Draft or edit one LinkedIn post using the author's context, writing samples, factual sources and intended funnel job.
---

Vault: follow [`pipelines/vault.md`](../../pipelines/vault.md). `$VAULT` is the `VAULT_PATH` checkout (default `../Samy-SmartOS`). Read `$VAULT/CLAUDE.md` and follow its Content Workflow. Voice, proof, offer, ICP and positioning are read from `$VAULT/raw/me/` (`voice.md`, `proof.md`, `offer.md`). Never write `$VAULT/raw/`. Topic knowledge starts at `$VAULT/wiki/index.md` and `$VAULT/wiki/content-os.md`. Save the post to `$VAULT/outputs/content/linkedin/drafts/<title>/`. If `$VAULT` is missing, stop and ask Samy to set `VAULT_PATH`. Do not copy vault files into this repo, and do not invent numbers, results or testimonials.

Called by `linkedin-writer` for the post body. Not a pipeline. If a markdown file is already in the draft folder, that file is the post. Do not add a second copy.

# Write a LinkedIn post

Read `CLAUDE.md`, `$VAULT/wiki/index.md`, `$VAULT/wiki/content-os.md`, `$VAULT/raw/me/proof.md`, `$VAULT/raw/me/voice.md`, `$VAULT/raw/me/offer.md` and the ICP and positioning pages beside them. Read the full source behind the central claim.

## Find the post

Identify one useful point, its source, the intended reader and the post's job. Work from the supplied brief and existing context; ask for missing information only when it would change the substance. Do not invent a milestone, anecdote or customer quote to make an idea interesting.

Choose a structure that suits the material: a sequence for a process, a story for a real change, evidence for a claim, or a comparison for a decision. Do not force every post into one house format.

Write an opening that the body can substantiate. Prefer a specific observation over manufactured suspense. Use the author's actual rhythm and vocabulary from `$VAULT/raw/me/voice.md`. Do not add slang, self-deprecation, deliberate mistakes, dramatic reversals or numeric claims just to sound human. The opening pass can call `linkedin-hook-writer`.

A thin voice file does not block useful editing of a supplied draft. Preserve the user's wording and use plain language, while being clear that the voice has not yet been calibrated.

## Edit for substance

Check that each paragraph adds information. Cut generic praise, unsupported superlatives, repeated morals, empty transitions and slogan-like conclusions. Keep necessary explanations and qualifications. Read the opening, paragraph starts and ending together: the argument should remain understandable.

Check every factual claim, quote, date and number against its source and public-use status. Keep reported results, targets and illustrative examples distinct. Public numbers come only from `$VAULT/raw/me/proof.md`. Use a CTA only when it fits the chosen funnel job and a real offer in `$VAULT/raw/me/offer.md`.

For repurposing, select one argument from the source rather than compressing the entire source into a post. For revisions, address the user's requested changes first and preserve their facts and meaningful phrasing.

## Deliver or save

Return one paste-ready draft, brief source notes and any material uncertainty. Offer alternate hooks only when useful or requested. Do not put process commentary inside the copy.

Save the draft to `$VAULT/outputs/content/linkedin/drafts/<title>/`. The content calendar is in Notion. Stages are Idea, Research / Scripting, Design or Filming, Final copy / Editing, Scheduled, Posted. Update a card only when the author asked and `$VAULT/wiki/` documents that database. Set the stage that matches the work just finished. Add a publish date only if a date is agreed. Check for the existing card before creating another.

If Notion is not configured, deliver in chat and state it was not saved. Saving a draft does not schedule or publish it. Samy posts it. When he says it is published, `node scripts/content-waterfall.mjs approve --title "<title>" --channel linkedin --yes` moves the folder. That command does not post.
