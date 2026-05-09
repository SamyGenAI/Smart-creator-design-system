We're going to create a PowerPoint deck together.

Start by asking me:
1. **What's the topic?** (if not already provided in the command arguments)
2. **Do you have any research, notes, or source material?** (article, bullet points, data, paste it or say "no")

Once you have both answers, run the slides workflow with the Cursor slide agent:
- Use `.cursor/agents/slide-agent.md` to generate the deck files
- Preview with `pnpm dev`
- Export with `pnpm export-slides [DeckName]` when requested

Do not start generating slides until you've collected the topic and asked about research.
