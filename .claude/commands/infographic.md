We're going to design a LinkedIn infographic together.

Start by asking me:
1. **What's the topic?** (if not already provided in the command arguments)
2. **Do you have any research, notes, or source material?** (article, bullet points, data — paste it or say "no")

Once you have both answers, run the infographics-designer skill workflow:
- Use the `copy-agent` to write the content brief from my topic + research
- Present the brief to me and wait for my approval
- Then use the `design-agent` to build the JSX
- Then use the `qc-agent` to verify it

Do not start generating anything until you've collected the topic and asked about research.
