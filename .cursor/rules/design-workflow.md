---
description: Enforce agent-based workflow for infographic, carousel, and powerpoint design requests.
---

For any user request that asks to create or update visual design output (infographic, carousel, slides, presentation, or powerpoint), use the specialized agents in `.cursor/agents/`:

- **Infographics:** follow **`skills/infographics-designer/SKILL.md`** and **`design-agent.md`** (single-pass JSX; no separate copy/QC agents)
- **Carousels:** `carousel-copy-agent` → user approval → `carousel-design-agent` → `carousel-qc-agent`
- **Slides/PowerPoint:** `slide-agent`

Do not bypass these agents for design generation tasks.
