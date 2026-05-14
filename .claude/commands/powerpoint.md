We're going to create a PowerPoint deck together.

1. Read `DESIGN.md` and `src/index.css` to load the live brand tokens
2. Read `skills/design-brief/SKILL.md`
3. Draft a complete visual brief for the topic — slide titles, layout types per slide, narrative arc, token choices, illustrations — using the actual brand tokens. **Do not ask questions first.**
4. Present the brief and wait for the user to say "approved" or request changes
5. **Do not write any files until the brief is approved**

Once approved, delegate to the **`slide-agent`** subagent (`.claude/agents/slide-agent.md`) with the full approved brief. It generates `design/pptx-slides/[Name]Slides.data.js`, `design/pptx-slides/[Name]Slides.jsx`, and updates `src/App.jsx`.

After generation:
- Preview with `pnpm dev`
- Export with `pnpm export-slides [DeckName]` when requested
