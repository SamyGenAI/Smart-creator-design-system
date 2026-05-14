We're going to design a LinkedIn carousel together.

1. **Ask the user for their carousel topic first.** Do not draft anything yet. Wait for their answer.
2. Read `DESIGN.md` and `src/index.css` to load the live brand tokens
3. Read `skills/design-brief/SKILL.md`
4. Draft a complete visual brief for the topic — slide titles, narrative arc, visual treatment per slide, token choices, illustrations — using the actual brand tokens.
5. Present the brief and wait for the user to say "approved" or request changes
6. **Do not write any files until the brief is approved**

Once approved, run the carousel-designer workflow in sequence:
- Delegate to **`carousel-copy-agent`** (`.claude/agents/carousel-copy-agent.md`) with the full approved brief
- Present the JSON content brief and wait for a second approval
- Delegate to **`carousel-design-agent`** (`.claude/agents/carousel-design-agent.md`) to build the JSX
- Delegate to **`carousel-qc-agent`** (`.claude/agents/carousel-qc-agent.md`) to verify it
