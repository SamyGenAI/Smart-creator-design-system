We're going to make an image that goes inside the newsletter text — a framed screenshot or a designed asset (no title, no footer).

Read [`skills/newsletter-asset/SKILL.md`](../../skills/newsletter-asset/SKILL.md) first — it owns the two modes, the components and the registry.

If the request doesn't already say, ask in **one message** and wait: screenshot or design, placement in the issue, the one takeaway, and (for design) the content plus what must never be cut. Never invent the content.

Then build, register in `src/modes.local.js` + `src/App.local.jsx`, run `pnpm verify`, and stop — the user previews with `pnpm dev`.
