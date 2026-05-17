---
description: Enforce design-brief pre-flight and agent-based workflow for all design requests.
---

For any user request that asks to create or update visual design output (infographic, carousel, slides, presentation, or powerpoint), always run the **design-brief** workflow first:

1. Read `skills/design-brief/SKILL.md`
2. Draft a structured visual brief (sections, layout, tokens, illustrations) and present it for approval
3. **Do not write any files until the brief is approved**

Then route to the correct specialized agent in `.cursor/agents/`:

- **Infographics:** `infographic-design-agent` — single agent that owns both the brief and the build. It reads `skills/infographics-designer/SKILL.md`, prior infographics under `design/infographics/`, and the `components/` library, then drafts the brief, waits for approval, and writes the JSX in one pass.
- **Carousels:** draft the brief in-chat → (on approval) `carousel-copy-agent` → user approval → `carousel-design-agent` → `carousel-qc-agent`
- **Slides/PowerPoint:** draft the brief in-chat → (on approval) `slide-agent`

Do not bypass the design-brief step or the specialized agents for design generation tasks.
