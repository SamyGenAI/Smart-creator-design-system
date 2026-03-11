# Smart Creator Design System — Master Rules for Claude Code

## What this project does
Generate LinkedIn infographics (1080×1350px) by:
1. Claude writes a React component using the design system tokens and components
2. Claude pushes the design to Figma using `mcp__figma__generate_figma_design`
3. User edits in Figma manually

**Figma file:** `GBovqF34FkjgtWPj3wUmO3`
**Pages:** Foundations (0:1) · Components (5:15493) · Infographics (5:15851)

---

## Reference Files

| File | Content | When to read |
|------|---------|-------------|
| `references/space-budgets.md` | Per-template vertical budgets + character limits | **Before building any data object** |
| `references/components.md` | Component API reference + max text lengths | When mapping content to components |
| `references/tokens.md` | Color/typography/shadow token values | When looking up a specific token value |
| `skills/infographics-designer/SKILL.md` | Infographic generation workflow | When user asks to create an infographic |

---

## Canvas

| Property | Value |
|---|---|
| Width | 1080px |
| Height | 1350px |
| Background | `#fffceb` (cream) |
| Texture | `SquareGridTexture` component at 5% opacity |
| Inner content width | 981px (centered) |
| Row gap | 22px |

The canvas uses **absolute positioning**. All sizes are fixed in px, not responsive.

---

## Workflow — generating an infographic

1. User describes the infographic content (topic, key points, data)
2. Claude reads `references/space-budgets.md` for the target template
3. Claude builds the `data` object respecting documented character limits
4. Claude writes or updates `src/App.jsx` (or `design/` working copy) with the new data
5. Claude calls `mcp__figma__generate_figma_design` with the full template render
6. Design appears in Figma for manual editing

**NEVER modify the visual layout, component sizes, or token values — only the content data.**

---

## Assets

```
assets/
├── avatar/profile.jpg         ← User's profile picture (add manually)
├── textures/                  ← Background textures
├── logos/app/{domain}.png     ← fetch: node scripts/fetch-app-logo.mjs domain.com
├── logos/text/{domain}.svg    ← fetch: node scripts/fetch-logo.mjs domain.com
├── icons/                     ← Section header icons (user adds manually)
└── illustrations/             ← Open-source character illustrations (SVG + JPG)
```

---

## Figma Integration

- **Code Connect:** `figma/code-connect.json` links components to Figma nodes
- **Push:** `mcp__figma__generate_figma_design` — requires self-contained JSX with Tailwind classes and `data-node-id` attributes
- **Read:** `mcp__figma__get_design_context` to verify designs, `mcp__figma__get_metadata` to explore pages

---

## Rules for Claude

1. **Never modify token values** — colors, sizes, font weights are fixed.
2. **Never change component structure** — only pass different prop values.
3. **Never download icons** — reference local paths, let user provide files.
4. **Never make the layout responsive** — it's a fixed 1080×1350px canvas.
5. **Always preserve** `data-node-id` and `data-name` attributes.
6. **Content only** — when generating a new infographic, only update the `data` object.
7. **Escape slashes in Tailwind** — `bg-[var(--color\/blue\/500,#092c69)]` not `--color/blue/500`.
8. **Image assets expire** — Figma MCP URLs last 7 days. Save to `assets/` immediately.
9. **Check space budgets** — read `references/space-budgets.md` before generating content. Respect all character limits.
10. **Check SKILL.md** before generating — it contains the trigger and content workflow.
11. **Image containment** — in absolute cells, use `flex items-center justify-center` on container + `w-full h-full object-contain` on img. Never use `display: contents`.
12. **Icons on navy headers are white** — `GlassNavySection` applies brightness/invert filter. Always pass dark/black SVGs.
13. **Logo scripts** — app icons: `node scripts/fetch-app-logo.mjs domain.com`. Wordmarks: `node scripts/fetch-logo.mjs domain.com`.
14. **Text size is adaptive** — body text can increase to fill space (min 12px, max 18px for body), preserving hierarchy: card body < card title < section title < header.
15. **Brand border sections use shared base** — always use wrapper components (`*SolidBorderSection`, `*WhiteBorderSection`), never duplicate JSX.
16. **New templates must use bento grid pattern** — CSS Grid with `fr` rows, `flex-none` header/footer, `flex-1` grid body. See `ClaudeCoworkInfographic.jsx` as reference. The `Infographic.jsx` inline-grid pattern is legacy.
