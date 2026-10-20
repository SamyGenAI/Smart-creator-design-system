---
name: voice-calibration
description: Build or refine an author's writing guide from their own writing samples and edits, without importing another creator's voice.
---

Vault: follow [`pipelines/vault.md`](../../pipelines/vault.md). `$VAULT` is the `VAULT_PATH` checkout (default `../Samy-SmartOS`). Read `$VAULT/CLAUDE.md` and follow its Content Workflow. Voice, proof, offer, ICP and positioning are read from `$VAULT/raw/me/` (`voice.md`, `proof.md`, `offer.md`). Never write `$VAULT/raw/`. Topic knowledge starts at `$VAULT/wiki/index.md` and `$VAULT/wiki/content-os.md`. If `$VAULT` is missing, stop and ask Samy to set `VAULT_PATH`. Do not copy vault files into this repo, and do not invent numbers, results or testimonials.

Propose edits to `voice.md`. Do not write `$VAULT/raw/` yourself. Not a channel pipeline.

# Calibrate the voice

Read `CLAUDE.md`, `$VAULT/raw/me/voice.md`, the ICP and offer pages beside it, and the source samples the author supplies. There is no capture tool in this repo. If samples are missing, ask the author for them.

Separate writing authored by the person, transcripts of speech, approved ghostwritten posts, rejected drafts and external inspiration. Human edits show preferences; engagement numbers show outcomes, not who wrote a sentence. Do not treat an engagement number as a voice rule, and do not invent one.

## Derive rules from examples

Use several representative samples when available. One sample supports tentative observations, not a universal style. Record the limits of the evidence.

Look for recurring choices in opening lines, sentence rhythm, paragraph length, vocabulary, punctuation, specificity, argument structure and endings. Quote short illustrative passages with source paths. Preserve meaningful irregularities instead of making the voice more polished by default.

`$VAULT/raw/me/voice.md` is immutable from this repo. Propose observed rules as edits the author can apply to that file themselves. File compiled notes under `$VAULT/wiki/` only where `$VAULT/CLAUDE.md` says compiled voice notes belong. Distinguish consistent patterns from context-dependent choices. Do not hard-code a dialect, numeric separator, slang quota, hook length or CTA frequency from this template.

## Calibrate with an actual draft

When drafting is requested, use a supplied, public-use source to write a short sample. Give the author a concrete passage to edit. File their actual corrections as evidence, then update the few rules the corrections support in the proposal. Do not label your own imitation approved.

If writing samples are missing, collect them or produce a clearly labeled neutral draft when that is useful and requested. Do not claim to reproduce a specific voice from a biography alone.

Return the proposed guide and any unresolved voice choices. Say plainly that `$VAULT/raw/me/voice.md` was not modified. If `$VAULT/CLAUDE.md` names a lint command, tell the author; do not invent one.
