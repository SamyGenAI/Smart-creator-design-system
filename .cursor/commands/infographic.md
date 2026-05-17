We're going to design a LinkedIn infographic together.

Delegate the entire flow to the **`infographic-design-agent`** subagent (`.cursor/agents/infographic-design-agent.md`). It is the single owner of the infographic workflow — it drafts the visual brief, waits for the user to approve, and then writes the JSX.

Before drafting, the agent must:

1. Read `skills/infographics-designer/SKILL.md`, `skills/design-brief/SKILL.md`, `DESIGN.md`, and `src/index.css`
2. Read at least 2 existing infographics under `design/infographics/` end-to-end
3. Skim the relevant components under `components/`

The agent presents a complete brief, waits for "approved", and then builds `design/infographics/[Name]Infographic.jsx` + registers it in `src/modes.js` and `src/App.jsx` in one pass.

**Do not write any files until the brief is approved.**
