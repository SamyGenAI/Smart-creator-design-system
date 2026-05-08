# Brand setup questionnaire (adaptive)

Use `public/brand-data.json` as the starting point. Ask only what is missing, ambiguous, or needs confirmation.
Prefer visual references in this order:
1) `public/assets/brand-jina/` (auto-saved from Jina)
2) `public/assets/brand-screenshots/` (user-provided)

## After Jina (`public/brand-data.json`)

1. **Confirm URL**  
   "We extracted data from: [url]. Is this the right site?"

2. **Primary + canvas**  
   From `colors` and vision: propose `navy` (primary) and `canvas` (page background). Ask: "Use these hex values, or paste corrections?"

3. **Accents**  
   From extracted palette + screenshots: propose five accents for cards and section pills (`accent-1` … `accent-5`). Ask for approval or five `#hex` replacements.

4. **Fonts**  
   From `fonts` in JSON + screenshot typography: propose `fonts.primary` and `fonts.serif`. Ask for approval or exact family names (must match how they will appear in CSS / Google Fonts if loaded).

5. **Radii and elevation (optional)**  
   If vision shows strong patterns: suggest `rounded.glass-header`, `glass`, `card`, `pill`. Ask to confirm or skip (skip keeps existing `DESIGN.md` values).

6. **Brand name and one-line description**  
   Prefer `title` / `description` from `public/brand-data.json`; ask the user to correct if wrong.

## If extraction is weak

- Empty or tiny `colors`: check `attemptsUsed` in `public/brand-data.json`. If attempts are low or uncertain, re-run the fetch once; if still empty, ask for pasted brand hex values (primary, background, accents).
- Empty `fonts`: ask for primary and serif names explicitly.
- No `screenshotUrl`: run vision on local assets in `public/assets/brand-jina/` and user-provided files under `public/assets/brand-screenshots/`; rely more on user input when needed.

## Before writing `tmp/brand-answers.json`

- Re-read `DESIGN.md` front matter if needed so references like `{colors.blue-300}` stay valid when the user chooses reference style.
- Ensure every hex is `#` + 3, 6, or 8 hex digits.

## Done checklist

- [ ] `tmp/brand-answers.json` written
- [ ] `node scripts/apply-brand-answers.mjs --input tmp/brand-answers.json`
- [ ] `pnpm tokens:gen`
- [ ] `node scripts/validate-design.mjs`
- [ ] User told about optional assets (`assets/avatar`, icons)
