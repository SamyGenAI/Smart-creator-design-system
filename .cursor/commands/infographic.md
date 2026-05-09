We're going to design a LinkedIn infographic together.

Start by asking me:
1. **What's the topic?** (if not already provided in the command arguments)
2. **Do you have any research, notes, or source material?** (article, bullet points, data, paste it or say "no")

Once you have both answers, run the infographics-designer skill workflow with the Cursor agents:
- Use the `.cursor/agents/copy-agent.md` workflow to write the content brief
- Present the brief and wait for my approval
- Then use `.cursor/agents/design-agent.md` to build the JSX
- Then use `.cursor/agents/qc-agent.md` to verify it

Do not start generating anything until you've collected the topic and asked about research.
