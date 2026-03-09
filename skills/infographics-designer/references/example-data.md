# Example Data Objects

Complete, production-ready examples for both infographic templates.

---

## Table of Contents
1. [Infographic — "The Ultimate Claude Guide"](#1-infographic--the-ultimate-claude-guide)
2. [ComparisonInfographic — "AI Tools VS AI Systems"](#2-comparisoninfographic--ai-tools-vs-ai-systems)

---

## 1. Infographic — "The Ultimate Claude Guide"

**Spec:** Educational post about using Claude AI. Audience: developers and knowledge workers. Angle: practical tips + data.

```js
const data = {
  title: "The Ultimate Claude Guide",
  highlightWord: "Claude",
  subtitle: "Everything you need to get started",

  row1: {
    card1: {
      title: "What Is Claude?",
      iconSrc: null,
      checklist: {
        title: "Built for",
        items: [
          "Long-form reasoning & analysis",
          "Code generation & debugging",
          "Safe, nuanced conversations",
        ],
      },
    },
    card2: {
      title: "Key Capabilities",
      iconSrc: null,
      iconBullet: {
        items: [
          { iconSrc: null, text: "200K token context window" },
          { iconSrc: null, text: "Reads PDFs, images & code" },
          { iconSrc: null, text: "Writes, edits & summarises" },
          { iconSrc: null, text: "Calls tools and browses the web" },
        ],
      },
    },
  },

  row2: {
    title: "How Models Compare",
    iconSrc: null,
    iconBullet: {
      items: [
        { iconSrc: null, text: "Haiku — fast & cost-efficient" },
        { iconSrc: null, text: "Sonnet — balanced power & speed" },
        { iconSrc: null, text: "Opus — maximum reasoning depth" },
      ],
    },
    table: {
      headers: ["Model", "Speed", "Context"],
      rows: [
        ["Haiku", "Fastest", "200K"],
        ["Sonnet", "Balanced", "200K"],
        ["Opus", "Deepest", "200K"],
      ],
    },
  },

  row3: {
    card1: {
      title: "Prompt Tips",
      iconSrc: null,
      sectionTitle: "3 Rules That Work",
      numberBullet: {
        items: [
          "Give context, not just a question",
          "Specify the output format you want",
          "Iterate — first draft is never final",
        ],
      },
    },
    card2: {
      title: "Works With",
      iconSrc: null,
      sectionTitle: "Top Integrations",
      logos: undefined,  // user adds logo files manually
    },
    card3: {
      title: "Pricing",
      iconSrc: null,
      sectionTitle: "Free Tier Includes",
      highlightText: "Free tier",
      colorBoxColor: "var(--components\\/card-title\\/green,#d2ff9a)",
    },
  },

  row4: {
    title: "Start Today",
    iconSrc: null,
    sectionTitle: "Your next step",
    pastelCard: {
      text: "Claude isn't just a chatbot — it's a thinking partner that scales with your ambition.",
    },
    checklist1: {
      title: "Quick wins",
      items: [
        "Try claude.ai free in 2 minutes",
        "Test the API with 5 sample prompts",
      ],
    },
    checklist2: {
      items: [
        "Join the Discord community",
        "Read the prompt engineering guide",
      ],
    },
  },

  footer: {
    avatarSrc: "/assets/avatar/profile.jpg",
    name: "Samy Chouaf",
  },
}
```

---

## 2. ComparisonInfographic — "AI Tools VS AI Systems"

**Spec:** Contrast single-task AI tools with multi-agent AI systems. Audience: tech founders and operators. Angle: paradigm shift.

```js
const data = {
  title: "AI Tools VS AI Systems",
  highlightWord: "AI Systems",
  subtitle: null,
  col1Header: "AI Tool",
  col2Header: "AI System",
  rows: [
    {
      label: "Scope",
      col1: "Handles one predefined task at a time",
      col2: "Coordinates multiple tools toward a shared goal",
    },
    {
      label: "Autonomy",
      col1: "Requires humans to manually chain each step",
      col2: "Plans, delegates, and acts end-to-end on its own",
    },
    {
      label: "Memory",
      col1: "Stateless — resets after every single call",
      col2: "Persists context and state across the full workflow",
    },
    {
      label: "Integration",
      col1: "Plugs into one API or service at a time",
      col2: "Orchestrates 10+ tools and data sources at once",
    },
    {
      label: "Output",
      col1: "Returns a single answer or artifact per run",
      col2: "Ships compound, multi-step deliverables end-to-end",
    },
    {
      label: "Adaptability",
      col1: "Breaks when inputs or context unexpectedly changes",
      col2: "Self-corrects, reroutes, and retries on failure",
    },
    {
      label: "Cost at Scale",
      col1: "Manual effort grows linearly with volume",
      col2: "Scales workflows without adding headcount",
    },
    {
      label: "Failure Mode",
      col1: "Needs a human to debug and restart",
      col2: "Detects errors autonomously and retries",
    },
  ],
  footer: {
    avatarSrc: "/assets/avatar/profile.jpg",
    name: "Samy Chouaf",
  },
}
```

---

## Content Quality Checklist

Before finalising any data object, verify:

- [ ] `title` is ≤30 chars and reads well at 73px bold
- [ ] `highlightWord` appears verbatim inside `title`
- [ ] All bullet text is 4–8 words (short, punchy)
- [ ] Table cells are ≤12 chars each
- [ ] `pastelCard.text` is a single strong sentence, ≤100 chars
- [ ] `highlightText` is ≤12 chars
- [ ] `numberBullet.items` has exactly 3 items
- [ ] ComparisonInfographic `rows` has exactly 8 items
- [ ] All `iconSrc` fields are `null` (user adds icons manually)
