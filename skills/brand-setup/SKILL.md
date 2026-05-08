---
name: brand-setup
description: Onboard or rebrand the Smart Creator design system using a website URL (Jina Reader extraction), user-approved colors and fonts, local screenshot vision analysis, then apply answers to DESIGN.md and regenerate CSS tokens. Use when the user runs /setup or @setup, asks to set up branding, personalize the repo for their brand, onboard a new workspace, or make generated infographics and carousels match a new brand.
---

# Brand setup (workspace onboarding)

Run this as a guided, multi-step workflow. Do not skip the Jina extraction step or the screenshot vision step unless the user explicitly opts out of one (then document the gap).

Read [references/questionnaire.md](references/questionnaire.md) for the adaptive question flow.

## Prerequisites

- Optional: `JINA_API_KEY` in the environment for higher Jina rate limits (works without a key at lower limits).
- Use the host product vision (Claude Code / Cursor) on image files under `public/assets/brand-screenshots/`.

## Workflow (8 steps)

1. **Website URL**  
   Ask for the canonical site URL if not already provided.

2. **Jina extraction**  
   Run from the repo root:
   ```bash
   node scripts/fetch-brand-from-url.mjs "<https-url>"
   ```
   This writes [public/brand-data.json](public/brand-data.json) (title, description, content preview, screenshot URL, extracted colors, fonts, design patterns, CSS snippet), and also saves downloaded Jina assets under `public/assets/brand-jina/`.
   The script retries automatically when no colors are extracted, and records `attemptsUsed` in the JSON.

3. **Present extraction**  
   Load `public/brand-data.json` and summarize: colors (first batch), fonts, design patterns, screenshot URL, locally saved assets, and `attemptsUsed`.
   Use locally saved assets first (`savedAssets.screenshot`, `savedAssets.images`) for stable analysis; keep `screenshotUrl` as fallback.

4. **User approval / edits**  
   Confirm or collect corrected values (valid `#hex` only where the pipeline expects hex):
   - Primary brand color (maps to `colors.navy` in answers)
   - Canvas / background color (`colors.canvas`)
   - Accent palette for `accent-1` through `accent-5` (each may be `#hex` or `{colors.*}` references if the user prefers)
   - Primary sans font and serif display font (`fonts.primary`, `fonts.serif`)
   - Optional: `rounded` overrides (`glass-header`, `glass`, `card`, `pill`) informed by vision + CSS patterns

   If Jina still returned no usable colors after retries, ask the user to paste hex values manually.

5. **Branded screenshots**  
   Ask the user to add representative screenshots (home, marketing, product UI) under `public/assets/brand-screenshots/`. Wait until they confirm files are in place.

6. **Vision pass (host model)**  
   Read images from both locations (skip hidden or non-image files):
   - user-provided: `public/assets/brand-screenshots/`
   - Jina-downloaded: `public/assets/brand-jina/`
   Describe: dominant colors, typography feel, corner radii, shadows / elevation, spacing density, glass or gradients. Merge this with `public/brand-data.json` and the user’s edits from step 4.

7. **Answers JSON**  
   Write `tmp/brand-answers.json` using this shape (fill from steps 4–6; omit keys the user did not change so `apply-brand-answers` keeps existing `DESIGN.md` values where appropriate):

   ```json
   {
     "brandName": "Brand display name",
     "brandDescription": "One sentence.",
     "fonts": {
       "primary": "Font Name",
       "serif": "Serif Font Name"
     },
     "colors": {
       "navy": "#hex",
       "canvas": "#hex",
       "accent-1": "#hex or {colors.blue-300}",
       "accent-2": "",
       "accent-3": "",
       "accent-4": "",
       "accent-5": ""
     },
     "rounded": {
       "glass-header": "10px",
       "glass": "20px",
       "card": "8px",
       "pill": "40px"
     }
   }
   ```

   Only include `colors` keys you intend to overwrite. `scripts/apply-brand-answers.mjs` deep-merges into `DESIGN.md` front matter.

8. **Apply and validate**  
   From repo root:
   ```bash
   node scripts/apply-brand-answers.mjs --input tmp/brand-answers.json
   pnpm tokens:gen
   node scripts/validate-design.mjs
   ```

   Report: which areas changed (brand name, description, colors, fonts, radii), whether `pnpm tokens:gen` succeeded, and validation result.

## Guardrails

- Update `DESIGN.md` only via `scripts/apply-brand-answers.mjs` for the automated merge path. If the user needs tokens not covered by answers (full palette retune), edit `DESIGN.md` manually afterward and re-run `pnpm tokens:gen` and `node scripts/validate-design.mjs`.
- Do not hand-edit `src/index.css`; regenerate with `pnpm tokens:gen`.
- If the user gives non-hex color values where hex is required, ask for a valid `#hex`.
- Keep `design/` output-only; onboarding must not edit generated designs.
- If color extraction is empty, run the script again once manually before asking for manual palette values:
  ```bash
  node scripts/fetch-brand-from-url.mjs "<https-url>"
  ```
- Prefer local assets saved by the script (`public/assets/brand-jina/`) for consistent vision analysis.

## Follow-up for the user

- Avatar: `assets/avatar/profile.jpg` (per project docs)
- Icons and logos under `assets/` as needed for templates
