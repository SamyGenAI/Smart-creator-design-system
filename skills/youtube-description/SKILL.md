---
name: youtube-description
description: Create a YouTube description, resource links and chapters from the actual final video or timestamped transcript.
---

Vault: follow [`pipelines/vault.md`](../../pipelines/vault.md). `$VAULT` is the `VAULT_PATH` checkout (default `../Samy-SmartOS`). Read `$VAULT/CLAUDE.md` and follow its Content Workflow. Voice, proof, offer, ICP and positioning are read from `$VAULT/raw/me/` (`voice.md`, `proof.md`, `offer.md`). Never write `$VAULT/raw/`. Topic knowledge starts at `$VAULT/wiki/index.md` and `$VAULT/wiki/content-os.md`. Save the description to `$VAULT/outputs/content/youtube/drafts/<title>/`. If `$VAULT` is missing, stop and ask Samy to set `VAULT_PATH`. Do not copy vault files into this repo, and do not invent numbers, results or testimonials.

Called by `youtube-writer` for `description.md`. Not a pipeline.

# Package the final video

Read the final cut or its timestamped transcript, viewer promise and actual offer links from `$VAULT/raw/me/offer.md`. If only a script or outline exists, label timings provisional and do not claim final chapters. Cutting, transcription and upload are **later**; the author supplies the cut and the transcript.

Open with what the viewer gets, short and broad: 2 sentences, about 25 words together. Sentence 1, at most 12 words, carries the main search phrase a stranger would type ("content strategy", "repurpose content", "LinkedIn lead generation"); it shows in search and above "more". Sentence 2, at most 15 words, says what the video shows with 1 or 2 secondary search terms. Leave internal numbers and tool lists to the video and the chapters; no keyword stuffing, no hashtag block. Example: "A content strategy that turns 1 video into a week of posts. The content repurposing system I run with Claude Code, step by step."

Add useful resources with verified URLs and clear labels. Link YouTube videos with the full `https://www.youtube.com/watch?v=<id>` URL, never a shortener. Include disclosures or credits from the actual brief, and one relevant next step. Do not invent a sponsor, product entitlement or download link. Public numbers come only from `$VAULT/raw/me/proof.md`.

Derive chapter starts from the final cut. Verify sequence, labels and destination platform chapter rules using current documentation when exact upload readiness matters. Check that cuts did not shift old script timestamps.

Deliver a paste-ready description, proposed title if asked, chapters and a separate list of unresolved links or timing checks. Upload stays with the author. Nothing in this repo publishes the video.
