We're going to design a LinkedIn infographic together.

1. Read `DESIGN.md` and `src/index.css` to load the live brand tokens
2. Read `skills/design-brief/SKILL.md`
3. Draft a complete visual brief for the topic — sections, titles, layout components, token choices, illustrations — using the actual brand tokens. **Do not ask questions first.**
4. Present the brief and wait for the user to say "approved" or request changes
5. **Do not write any files until the brief is approved**

Once approved, delegate to the **`design-agent`** subagent (`.cursor/agents/design-agent.md`) with the full approved brief. It reads `skills/infographics-designer/SKILL.md` and builds `design/infographics/[Name]Infographic.jsx` + updates `src/App.jsx` in one pass.
