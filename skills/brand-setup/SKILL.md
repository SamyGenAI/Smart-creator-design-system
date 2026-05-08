---
name: brand-setup
description: Run initial design-system onboarding for new users by asking a short brand questionnaire, writing DESIGN.md from answers, regenerating tokens, and validating the setup. Use when user asks to set up branding, personalize templates, onboard a new workspace, or make all generated designs match a new brand.
---

# Brand Setup Skill

Use this skill to initialize or rebrand the design system through a short chat questionnaire.

## Workflow

1. Ask the user these questions in chat:
   - Brand name
   - Brand description (one sentence)
   - Primary brand color (`#hex`)
   - Canvas background color (`#hex`)
   - Accent palette aliases (`accent-1`, `accent-2`, `accent-3`, `accent-4`, `accent-5`) as `#hex`
   - Primary font family and serif display font family
   - Optional rounded overrides (`glass-header`, `glass`, `card`, `pill`)

2. Build an answers JSON file at `tmp/brand-answers.json` with this shape:

```json
{
  "brandName": "Acme Brand",
  "brandDescription": "One sentence description",
  "fonts": {
    "primary": "<font-family-name>",
    "serif": "<font-family-name>"
  },
  "colors": {
    "navy": "<hex>",
    "canvas": "<hex>",
    "accent-1": "{colors.blue-300}",
    "accent-2": "{colors.green-200}",
    "accent-3": "{colors.amber-200}",
    "accent-4": "{colors.pink-200}",
    "accent-5": "{colors.orange-200}"
  },
  "rounded": {
    "glass-header": "10px",
    "glass": "20px",
    "card": "7.951px",
    "pill": "40px"
  }
}
```

3. Apply the answers:

```bash
node scripts/apply-brand-answers.mjs --input tmp/brand-answers.json
```

4. Regenerate and validate:

```bash
pnpm tokens:gen
node scripts/validate-design.mjs
```

5. Report:
   - Which tokens changed
   - Whether token generation succeeded
   - Any follow-up needed for assets (`assets/avatar/profile.jpg`, icons/logos)

## Guardrails

- Update only `DESIGN.md` via `scripts/apply-brand-answers.mjs`.
- Do not hand-edit `src/index.css`; regenerate it from `DESIGN.md` with `pnpm tokens:gen`.
- If user gives non-hex color values, ask for a valid `#hex`.
- Keep `design/` as output-only; setup should not edit generated designs.
