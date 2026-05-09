---
description: Enforce agent-based workflow for infographic, carousel, and powerpoint design requests.
---

For any user request that asks to create or update visual design output (infographic, carousel, slides, presentation, or powerpoint), always route through the specialized Cursor agents in `.cursor/agents/`:

- Infographics: `copy-agent` -> user approval -> `design-agent` -> `qc-agent`
- Carousels: `carousel-copy-agent` -> user approval -> `carousel-design-agent` -> `carousel-qc-agent`
- Slides/PowerPoint: `slide-agent`

Do not bypass these agents for design generation tasks.
