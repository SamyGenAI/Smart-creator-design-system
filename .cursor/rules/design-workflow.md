---
description: Enforce design-brief pre-flight and agent-based workflow for all design requests.
---

For any user request that asks to create or update visual design output (infographic, carousel, slides, presentation, or powerpoint), always run the **design-brief** workflow first:

1. Read `skills/design-brief/SKILL.md`
2. Ask topic, audience, key takeaway, tone, source material, and format-specific questions in **one message**
3. Draft the structured brief and present it for approval
4. **Do not write any files until the brief is approved**

Then route to the correct specialized agent in `.cursor/agents/`:

- **Infographics:** `design-brief-agent` → (on approval) `design-agent` — single-pass JSX following `skills/infographics-designer/SKILL.md`
- **Carousels:** `design-brief-agent` → (on approval) `carousel-copy-agent` → user approval → `carousel-design-agent` → `carousel-qc-agent`
- **Slides/PowerPoint:** `design-brief-agent` → (on approval) `slide-agent`

Do not bypass the design-brief step or the specialized agents for design generation tasks.
