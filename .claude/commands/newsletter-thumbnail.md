We're going to design a newsletter thumbnail together (**420×300**).

Read [`skills/newsletter-thumbnail/SKILL.md`](../../skills/newsletter-thumbnail/SKILL.md) first — it owns the format, the components and the token rules.

## Step 1 — ask (one message, then stop)

Ask the user, in a single message, and **wait for the answer**:

1. **Title** — the exact text for the thumbnail. Also ask which word/phrase inside it should sit on the highlighter bar (or "none").
2. **Visual below the title** — one of:
   - `empty` — nothing below the title (grid texture only)
   - `image` — they give a local path under `assets/` (never download one)
   - `design` — they describe it; you compose it from `components/` primitives

Never infer the title or the visual. If they only give a topic, ask for the exact title wording.

If they mention different dimensions, use those instead of 420×300 and pass them to `NewsletterThumbnailCanvas` via `width` / `height`.

## Step 2 — build (only after the answer)

Write `design/newsletter-thumbnails/[Name]Thumbnail.jsx` using
`NewsletterThumbnailCanvas` + `NewsletterThumbnailTitle` + `NewsletterThumbnailVisual`,
then register it in `src/modes.js` (`type: 'thumbnail'`) and the `COMPONENTS` map in `src/App.jsx`.

Rules:
- **No chroma in the design file** — tokens only (`var(--theme-…)`, `var(--font/…)`, Tailwind token classes). This is what makes the thumbnail rebrand automatically for other users.
- Run `pnpm verify` when done.
- **Do not render a preview** — the user runs `pnpm dev` themselves and picks the design from the "Newsletter thumbnails" group.
