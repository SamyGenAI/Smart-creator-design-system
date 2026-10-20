---
name: newsletter-writer
description: >-
  Write a useful newsletter issue from source material, the author's voice and
  one coherent reader takeaway.
---

Workspace: this repo is the Content OS. Read `CLAUDE.md` here, then `brain/CLAUDE.md` and follow its Content Workflow. Voice, proof, offer, ICP and positioning are read from `brain/raw/me/` (`voice.md`, `proof.md`, `offer.md`, and sibling pages). Never write `brain/raw/`. Topic knowledge starts at `brain/wiki/index.md` and `brain/wiki/content-os.md`. Save the issue to `brain/outputs/content/newsletter/drafts/<title>/`. The 420×300 thumbnail is a different skill: `newsletter-thumbnail-designer`. If `brain/` is not checked out, stop and ask Samy to add the submodule (command in the README). Do not copy vault files into this repo, and do not invent numbers, results or testimonials.

# Write one issue

Read `brain/raw/me/voice.md`, the ICP, offer and positioning pages in `brain/raw/me/`, `brain/wiki/content-os.md` and the full supplied sources. Establish the newsletter's promise and the issue's one useful idea. Existing editions in `brain/outputs/content/newsletter/published/` define recurring format; do not invent a permanent house style from one draft.

Outline an opening observation, the explanation or worked example, practical application and a relevant next step. Use sections only when they help reading. Attribute guest experience and distinguish opinion from evidence. Every metric needs its population, period and source. Numbers, results and testimonials come only from `brain/raw/me/proof.md` or a source named in the draft.

Draft a subject and preview line whose promise the issue delivers. Do not use unsupported urgency or turn the preview into a repeated subject. Write links with descriptive labels; verify targets when supplied or retrieved.

Edit for new information per paragraph. Preserve the author's distinctive phrasing; remove inflated transitions and generic lessons. Label any missing quote or fact outside the copy.

Deliver subject, preview line, paste-ready body and a short source/check list outside it. When the author asks for posts from the issue, use `content-waterfall` and the channel skills. A completed issue is a draft until the author approves it. This repo does not send the email. The author sends it, moves the folder to `brain/outputs/content/newsletter/published/<title>/` and sets the Notion stage to Posted.

The thumbnail, when one is needed, is built by `newsletter-thumbnail-designer` and exported from `pnpm dev` (Export → Download PNG) into the draft's `Assets/` folder.
