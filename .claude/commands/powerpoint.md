We're going to create a PowerPoint deck together.

The deck will be produced as a single self-contained PptxGenJS Node script using **only**:
- `skills/pptx/SKILL.md` + `skills/pptx/pptxgenjs.md`
- The Smart Creator design system (`DESIGN.md` + `src/index.css`)

No JSX preview, no shared layout templates, no browser viewer registration.

---

1. Read `DESIGN.md` and `src/index.css` to load the live brand tokens (colors, fonts, shadows, spacing).
2. Read `skills/pptx/SKILL.md` for the design principles + QA checklist that apply to every deck.
3. Read `skills/design-brief/SKILL.md` for the brief format.
4. Draft a complete visual brief for the topic — slide titles, dominant token + supporting accents, visual motif committed across the deck, narrative arc, illustrations, per-slide composition idea — using the actual brand tokens. **Do not ask questions first.**
5. Present the brief and wait for the user to say "approved" or request changes.
6. **Do not write any files until the brief is approved.**

Once approved, delegate to the **`slide-agent`** subagent (`.cursor/agents/slide-agent.md`) with the full approved brief. It writes **one** file:

```
design/pptx-slides/[Name]Slides.mjs
```

The script reads brand tokens at runtime via `scripts/parse-design-md.mjs`, lays out every slide directly with PptxGenJS calls (no shared layout helpers, no layout enum), and writes the editable `.pptx` to `design/pptx-slides/output/[Name]Slides.pptx`.

After the agent finishes, tell the user the run command:

```
node "design/pptx-slides/[Name]Slides.mjs"
```

That command produces the `.pptx`. The user opens it in PowerPoint or Google Slides.
