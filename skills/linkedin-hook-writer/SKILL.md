---
name: linkedin-hook-writer
description: Write, revise or compare LinkedIn hooks in the author's voice, with measured character counts and mobile-first opening budgets. Use for hook options, first-line edits, or the opening pass inside linkedin-copywriter.
---

Vault: follow [`pipelines/vault.md`](../../pipelines/vault.md). `$VAULT` is the `VAULT_PATH` checkout (default `../Samy-SmartOS`). Read `$VAULT/CLAUDE.md` and follow its Content Workflow. Voice, proof, offer, ICP and positioning are read from `$VAULT/raw/me/` (`voice.md`, `proof.md`, `offer.md`). Never write `$VAULT/raw/`. Topic knowledge starts at `$VAULT/wiki/index.md` and `$VAULT/wiki/content-os.md`. The hook is part of the post saved to `$VAULT/outputs/content/linkedin/drafts/<title>/`. If `$VAULT` is missing, stop and ask Samy to set `VAULT_PATH`. Do not copy vault files into this repo, and do not invent numbers, results or testimonials. Skill-local `scripts/` resolve from this skill directory.

Called by `linkedin-writer` for the opening. Not a pipeline. Hook options go in `hooks.md` only when he asks. Otherwise the hook stays in the post.

# LinkedIn hook writer

Own the opening, including how it connects to the body. The full post's voice, facts and ending stay with `linkedin-copywriter`.

## Ground the hook

Read `$VAULT/raw/me/voice.md` and the draft or factual brief. Identify the intended reader (ICP in `$VAULT/raw/me/`) and the specific point the body supports. Check tone against the author's recent posts in `$VAULT/wiki/` and in published drafts. Public numbers follow `$VAULT/raw/me/proof.md`.

The author's current instructions and wording come first. The first line can be a claim, question, confession, comparison, result, story detail or framework promise. No invented drama, no automatic "I" opener, no compulsory number.

## Hook families that work for founders

These are shapes, not claims. Fill them only with the author's own facts.

- Result + "with this simple X": "I got a 51% reply rate with this simple sequence."
- Test or comparison: "I tested A vs B vs C" + a short stance on the next line.
- Big claim + "Here is how you can benefit".
- News + result: "<Tool> is out. Here is how we cut our costs by 72%."
- Confession + change: "I felt stuck and changed my rate from $200/h to $1k/h."
- Stakes: "Our biggest competitor just raised $100M." + "Here is how we try to survive."
- Before and after: "Last year I struggled with X." / "This year I built Y."
- Receipt as the promise: "300k impressions in 7 days resulted in 109 signups."

Use the author's own numbers only. Avoid the "Everyone is doing X. Almost nobody says Y." opener; readers recognise it as AI copy.

## Length: house targets, not platform limits

- **First line: aim for about 40 to 60 characters.** A stronger 35- or 85-character line can be right.
- **Essential opening: aim within 140 characters**, including spaces and newlines: usually the first line plus an informative second beat. Make line 1 meaningful on its own; do not hide the point after character 140.
- **Inspect the first 210 characters** as an extra stress check.
- **The whole post has a 3'000-character limit.** Count the finished draft too.

The 140 and 210 figures are working budgets, not a published LinkedIn cutoff. Rendered wrapping, blank lines and viewport change the fold. Never claim a character slice is the exact feed preview.

## Shape and select

1. Identify the concrete point, why the reader cares and any real tension.
2. Draft or revise the opening. The second beat adds specificity, a consequence, a contrast or a clear promise. It does not repeat line 1.
3. For requested options, vary the angle, not the adjectives. Default to 3 only when options are asked for without a count; a full-post task needs 1 chosen hook.
4. Judge each candidate on clarity to a stranger, specificity, relevance, the author's voice and whether the body pays it off.
5. Run the counter on the exact chosen text and inspect the 140 and 210 slices. If a necessary word comes too late, move it earlier. Do not pad short hooks.

```bash
python3 skills/linkedin-hook-writer/scripts/check_hook.py draft.txt
# Or pipe the plain-text draft to the same command.
```

The counter measures Unicode code points, reports UTF-16 units for emoji-heavy text and preserves whitespace. Its slices are text checks, not a simulation of LinkedIn's layout.

## Return

For a hook-only request, return the selected opening with the counts for line 1 and the opening block. If options were requested, mark the recommended one and say why in 1 line. Keep counts outside the copy. When called by `linkedin-copywriter`, use the chosen opening in the draft and keep routine diagnostics internal.
