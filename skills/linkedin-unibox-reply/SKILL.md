---
name: linkedin-unibox-reply
description: Draft LinkedIn DM replies in the author's voice from a pasted thread, one at a time, and never send. Use when Samy pastes a LinkedIn thread and wants a reply. There is no inbox tool yet.
---

Vault: follow [`pipelines/vault.md`](../../pipelines/vault.md). `$VAULT` is the `VAULT_PATH` checkout (default `../Samy-SmartOS`). Read `$VAULT/CLAUDE.md` and follow its Content Workflow. Voice, proof, offer, ICP and positioning are read from `$VAULT/raw/me/` (`voice.md`, `proof.md`, `offer.md`). Never write `$VAULT/raw/`. Topic knowledge starts at `$VAULT/wiki/index.md` and `$VAULT/wiki/content-os.md`. If a reply belongs to a piece, file it under `$VAULT/outputs/content/linkedin/drafts/<title>/`. If `$VAULT` is missing, stop and ask Samy to set `VAULT_PATH`. Do not copy vault files into this repo, and do not invent numbers, results or testimonials. Skill-local `references/` resolve from this skill directory.

Not a channel pipeline. One reply from a pasted thread. Never send.

# LinkedIn replies

There is no inbox tool yet. Work from a thread the author pastes: the counterpart, the messages, and the link if they have one. Draft 1 LinkedIn DM reply at a time in the author's voice. Never send. Sending happens only after the author approves that exact draft and sends it themselves. If the copy changes after approval, ask again.

Voice sources: `$VAULT/raw/me/voice.md`, compressed for DMs, and the author's own past messages in the paste. Avoid the shapes in [references/anti-patterns.md](references/anti-patterns.md).

## DM, comment, post

| Surface | Length | Job |
| --- | --- | --- |
| LinkedIn DM | Short: usually under 240 characters, 1 to 4 short paragraphs | Answer their last message. Specific, founder to founder |
| Public comment | 1 to 3 lines | A real observation or question; almost never a CTA |
| Post or article | Long form | `linkedin-copywriter` |

## Voice rules

1. **Answer the thread.** Reference their last question, constraint or stack. No product monologue.
2. **Short and specific.** Everyday words with precise nouns. Keep the author's informal rhythm without a slang quota.
3. **Ship the artifact.** When they asked for the repo, recording or link, put it in the draft so the author can send it in the same message.
4. **Peer tone.** Credit their work; compare tools fairly.
5. **Admit uncertainty** when true. Never invent demos, timelines, capabilities or prices.
6. **No calendar push by default.** "Walk you through", "grab 15 minutes", "quick demo", "hop on a call" only when they asked, or a call is already being arranged.
7. **1 clear next step at most:** a link, a question or a deliverable. Prefer what unblocks them without a meeting.
8. **Match their language and register.**
9. **Never copy a tool's suggested reply.** Rewrite from the pasted thread in the author's words.
10. **No em dashes.** A period, comma or "and".

## Workflow

1. **Start from the paste.** There is nothing to list until the author pastes threads. Cap a digest at 8 to 10 threads; prefer threads where the author already wrote.
2. **Read the thread:** the counterpart, the last inbound message, the author's earlier messages and the thread link if they included one.
3. **Classify 1 intent:** deliverable (send what they asked for), clarify (answer with the mechanism), qualify (1 or 2 concrete questions about their workflow), continue (1 specific advance), schedule (only if they asked), decline or redirect (an honest mismatch), social (peer warmth).
4. **Draft exactly 1 reply** and show: counterpart, intent, draft, thread link.
5. **Gate:** preview only. The author sends only after they approve this exact copy; if the copy changes after approval, ask again.
6. **Learn:** when the author approves or edits a reply, keep their final wording as a voice example they can file. Do not write `$VAULT/raw/` yourself. Propose the line for `$VAULT/raw/me/voice.md` and let them apply it.

## Morning digest

From threads the author pasted: name, 1-line last message, intent, link. Then ask which to draft, or draft the first if the author said "just start".
