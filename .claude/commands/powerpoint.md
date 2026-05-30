We're going to create a PowerPoint deck together.

The deck will be produced as a single self-contained PptxGenJS Node script using **only**:
- `skills/pptx/SKILL.md` + `skills/pptx/pptxgenjs.md`
- The Smart Creator design system (`DESIGN.md` + `src/index.css`)

Slide photos for browser preview use Playwright: `pnpm screenshot <mode-key> --preview` (requires `pnpm dev`). The slideshow uses `components/PptxSlideShow.jsx`.

---

1. Read `DESIGN.md` and `src/index.css` to load the live brand tokens (colors, fonts, shadows, spacing).
2. Read `skills/pptx/SKILL.md` for the design principles + QA checklist that apply to every deck.
3. Read `skills/design-brief/SKILL.md` for the brief format.
4. Draft a complete visual brief for the topic — slide titles, dominant token + supporting accents, visual motif committed across the deck, narrative arc, illustrations, per-slide composition idea — using the actual brand tokens. **Do not ask questions first.**
5. Present the brief and wait for the user to say "approved" or request changes.
6. **Do not write any files until the brief is approved.**

Once approved, delegate to the **`slide-agent`** subagent (`.claude/agents/slide-agent.md`) with the full approved brief. It delivers:

- `design/pptx-slides/[Name]Slides.mjs`
- `design/pptx-slides/output/[Name]Slides.pptx`
- Slide photos in `public/screenshots/powerpoint/[preview-slug]/`
- Registration in `src/modes.js` + `src/App.jsx`

After the agent finishes, tell the user:

```
pnpm dev
```

Open the slide deck tab, browse slides, click **Download PPTX** for the editable PowerPoint file.
