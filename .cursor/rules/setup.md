---
description: Trigger full brand onboarding (/setup) — Jina extraction, user-approved palette, screenshot vision, DESIGN.md merge, token generation.
---

Run the **brand-setup** skill workflow to onboard this workspace.

1. Read `skills/brand-setup/SKILL.md` and follow every step there (8-step flow: URL, Jina script, review `public/brand-data.json`, user approval of colors/fonts, screenshots under `public/assets/brand-screenshots/`, vision on those files, write `tmp/brand-answers.json`, then `apply-brand-answers`, `pnpm tokens:gen`, `validate-design`).
2. Ask for the website URL first if it was not provided in the message.

Do not skip the Jina extraction step or the screenshot vision step unless the user explicitly opts out.
