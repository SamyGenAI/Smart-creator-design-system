---
name: newsletter-writer
description: >-
  Write one issue of The Smart Creator from the vault, the author's voice and
  one reader takeaway. The content waterfall calls this writer. It is not a pipeline.
---

Vault: follow [`pipelines/vault.md`](../../pipelines/vault.md). `$VAULT` is the `VAULT_PATH` checkout (default `../Samy-SmartOS`). Read `$VAULT/CLAUDE.md` and follow its Content Workflow. Voice, proof, offer, ICP and positioning are read from `$VAULT/raw/me/` (`voice.md`, `proof.md`, `offer.md`). Never write `$VAULT/raw/`. Topic knowledge starts at `$VAULT/wiki/index.md` and `$VAULT/wiki/content-os.md`. Save the issue under `$VAULT/outputs/content/newsletter/drafts/<title>/`. If `$VAULT` is missing, stop and ask Samy to set `VAULT_PATH`. Do not copy vault files into this repo, and do not invent numbers, results or testimonials.

# Newsletter writer

The shared waterfall calls this for one newsletter asset. Newsletter is first. Later channels reuse this issue as the argument. Do not draft YouTube, LinkedIn or X from here.

```bash
node scripts/content-waterfall.mjs next --title "<title>" --channel newsletter
```

Write only the asset that command names. If it reports `exists`, stop. Edit Samy's file only when he asks, and do not add a second copy beside it.

## Issue

Read `voice.md`, `offer.md`, `proof.md`, `$VAULT/wiki/content-os.md` and the full supplied sources. Read earlier issues in `$VAULT/outputs/content/newsletter/published/` so the format stays his. One useful idea per issue.

File: `issue.md` when no draft exists yet. If a markdown file is already in the folder (`How to design with AI.md` or anything else that is not `brief.md`), that file is the issue. Do not create `issue.md` as well.

Shape, when the file is new:

```markdown
# Subject
<the promise the issue delivers>

# Preview
<one line that does not repeat the subject>

# Body
<opening observation, explanation or worked example, practical application, one next step>
```

Outline an opening observation, the explanation or worked example, practical application and a relevant next step. Use sections only when they help reading. Attribute guest experience and distinguish opinion from evidence. Every metric needs its population, period and source. Numbers, results and testimonials come only from `$VAULT/raw/me/proof.md` or a source named in the draft.

Draft a subject and preview line whose promise the issue delivers. Do not use unsupported urgency. Write links with descriptive labels and the full URL. No shortened links.

Edit for new information per paragraph. Preserve his phrasing. Remove inflated transitions and generic lessons. Label any missing quote or fact outside the copy.

## Thumbnail

Only when `next` names `thumbnail`, or Samy asks for it. Skill: `newsletter-thumbnail-designer`. Canvas: 420×300. That skill is not the YouTube thumbnail.

Render with `pnpm dev`, then Export → Download PNG. With the server up: `GET /api/export/png?mode=<modeKey>`. Save `Assets/thumbnail.png`. Do not call `render.py`.

A diagram inside the issue uses `flowchart`, or `graphics-designer` then `infographics-designer` when it is a LinkedIn-shaped graphic. Save that export in `Assets/` under its own name. Do not treat it as the email thumbnail.

## Deliver

Return subject, preview, the draft path and a short source list outside the copy. This repo does not send the email. Samy sends it. When he says it is published:

```bash
node scripts/content-waterfall.mjs approve --title "<title>" --channel newsletter --yes
```

That moves the folder. It does not send.
