We're going to design a LinkedIn carousel together.

Start by asking me:
1. **What's the topic?** (if not already provided in the command arguments)
2. **Do you have any research, notes, or source material?** (article, bullet points, data — paste it or say "no")

Once you have both answers, run the carousel-designer skill workflow:
- Use the `carousel-copy-agent` to write the content brief (Cover → Context → Steps → Wrap-up → CTA structure) from my topic + research
- Present the brief to me and wait for my approval
- Then use the `carousel-design-agent` to build the JSX slides
- Then use the `carousel-qc-agent` to verify it

Do not start generating anything until you've collected the topic and asked about research.
