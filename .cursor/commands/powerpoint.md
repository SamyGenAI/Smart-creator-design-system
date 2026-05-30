We're going to create a PowerPoint deck together.

The deck uses a **single source file**: `design/pptx-slides/decks/[slug]/deck.mjs` — the same definition drives live browser preview and the downloadable `.pptx`. Layout geometry lives in shared `design/pptx-slides/layouts/` files.

Using:
- `skills/pptx/SKILL.md` + `skills/pptx/slide-templates.md`
- The Smart Creator design system (`DESIGN.md` + `src/index.css`)

---

1. Read `DESIGN.md` and `src/index.css` for brand tokens.
2. Read `skills/pptx/SKILL.md` and `skills/pptx/slide-templates.md`.
3. Read `skills/design-brief/SKILL.md` for the brief format.
4. Read `design/pptx-slides/templates/slideTemplates.manifest.json` and `decks/yt-ai-design-system/deck.mjs` as reference.
5. Draft a complete visual brief — **Template:** line per content slide. Do not ask questions first.
6. Present the brief and wait for approval. **Do not write files until approved.**

Once approved, delegate to **`slide-agent`** (`.cursor/agents/slide-agent.md`). It delivers:

- `design/pptx-slides/decks/[slug]/deck.mjs` (single source)
- `decks/[slug]/export.mjs` + `output/[Name].pptx`
- Preview JPGs + app registration (`DeckPreview`)

Tell the user:

```
pnpm dev
```

Open the deck tab, browse slides, click **Download PPTX**.
