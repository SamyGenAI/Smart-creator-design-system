# Skill: Generate Infographic

## Trigger
Use this skill when the user asks to:
- "Create an infographic about X"
- "Make a LinkedIn post / visual about X"
- "Design an infographic on X"
- "Generate a 1080×1350 visual for X"
- "Build a new infographic"

## What this skill does
Generates a complete LinkedIn infographic (1080×1350px) using the Smart Creator Design System, then pushes it to Figma.

---

## Step-by-Step Workflow

### Step 1 — Understand the content
Ask the user (or infer from their prompt):
- **Topic** — what is the infographic about?
- **5 key points or sections** — one per card/row
- **Data or lists** — for the table, checklists, number bullets, icon bullets
- **Tone** — educational, inspirational, data-driven?

If the user gave a detailed prompt, proceed directly to Step 2.

### Step 2 — Build the data object
Write the infographic `data` prop following this exact shape (from `templates/Infographic.jsx`):

```js
const data = {
  title: "...",           // max ~30 chars for single line
  subtitle: "...",        // max ~50 chars, italic

  row1: {
    card1: {
      title: "...",       // section header (max 20 chars)
      iconSrc: null,      // or "/assets/icons/your-icon.svg"
      checklist: {
        title: "...",     // optional bold label above list
        items: ["...", "...", "..."],  // 2-3 items
      },
    },
    card2: {
      title: "...",
      iconSrc: null,
      iconBullet: {
        items: [
          { iconSrc: null, text: "..." },  // 4 items
          { iconSrc: null, text: "..." },
          { iconSrc: null, text: "..." },
          { iconSrc: null, text: "..." },
        ],
      },
      imageSrc: null,     // optional screenshot/image path
    },
  },

  row2: {
    title: "...",
    iconSrc: null,
    iconBullet: {
      items: [
        { iconSrc: null, text: "..." },  // 3-4 items (amber accent)
        { iconSrc: null, text: "..." },
        { iconSrc: null, text: "..." },
      ],
    },
    table: {
      headers: ["...", "...", "..."],         // 3 column headers
      rows: [
        ["...", "...", "..."],                // 3 data rows
        ["...", "...", "..."],
        ["...", "...", "..."],
      ],
    },
    imageSrc: null,
  },

  row3: {
    card1: {
      title: "...",
      iconSrc: null,
      sectionTitle: "...",
      numberBullet: { items: ["...", "...", "..."] },  // exactly 3
    },
    card2: {
      title: "...",
      iconSrc: null,
      sectionTitle: "...",
      logos: undefined,   // uses default logos from Grid8CompanyLogos
    },
    card3: {
      title: "...",
      iconSrc: null,
      sectionTitle: "...",
      highlightText: "...",   // short highlighted label (max 12 chars)
      colorBoxColor: "var(--components\\/card-title\\/green,#d2ff9a)",
    },
  },

  row4: {
    title: "...",
    iconSrc: null,
    sectionTitle: "...",
    pastelCard: { text: "..." },   // key insight / quote (max 100 chars)
    checklist1: {
      title: "...",
      items: ["...", "..."],   // 2 items
    },
    checklist2: {
      items: ["...", "..."],   // 2 items
    },
  },

  footer: {
    avatarSrc: "/assets/avatar/profile.jpg",
    name: "Samy Chouaf",
  },
}
```

### Step 3 — Write App.jsx
Update `src/App.jsx` with the new `data` object and import statement.

### Step 4 — Push to Figma
Call `mcp__figma__generate_figma_design` with the complete rendered JSX of `Infographic.jsx`.

### Step 5 — Confirm
Tell the user: "Design pushed to Figma. Open the file to review and edit manually."

---

## Content Guidelines

- **Title:** Keep to one line (~30 chars). Bold, navy, 73px.
- **Subtitle:** Italic, descriptive, max ~50 chars.
- **Section titles (GlassNavySection headers):** 1–3 words, uppercase-style works well.
- **Body text (checklist, icon-bullet, number-bullet):** Short phrases, 3–7 words each.
- **Table headers:** 1 word each. Data cells: numbers or short strings.
- **PastelShadowBorderCard:** Key insight or CTA. Can be a short sentence.
- **HighlightText:** Very short label for emphasis (e.g., "200K tokens", "Free tier").

## Constraints (from CLAUDE.md)
- Never change component layouts or token values
- Never download icons — pass `iconSrc: null` and user adds icons manually
- Never make the layout responsive
- Always use `Infographic.jsx` template — do not build from scratch
- Image assets from Figma expire in 7 days — do not use them in new infographics
