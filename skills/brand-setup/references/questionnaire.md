# Brand setup questionnaire (adaptive)

## Creator identity (**always**, before palettes or themes)

>**Track A & B.** Names and avatar are standardized before brand extraction or Theme Factory.

1. **First name** — ask: *How should your first name appear on footers and bylines?*
2. **Last name** — ask: *How should your family name appear?*
3. **Full display string** — use `` `${first} ${last}`.trim() `` everywhere the workspace still shows **`Your Full Name`** — run the global replacement in the **Creator identity & avatar** section of `skills/brand-setup/SKILL.md`.
4. **Avatar** — confirm a headshot at **`assets/avatar/avatar-profile.png`** (or note deferred upload).

---

## Track gate (always)

1. Ask: *Do you already have a website URL or settled visual identity (logo, fonts, palette) we can mirror?*
   - **Yes** → **Track A** — continue with URL + Jina; follow “After Jina” below starting at URL confirm.
   - **No / not yet / starting blank** → **Track B** — run [`skills/theme-factory/SKILL.md`](../../theme-factory/SKILL.md): show [`theme-showcase.pdf`](../../theme-factory/theme-showcase.pdf), wait for preset # or **Create your Own Theme**, load `themes/*.md`, map to DESIGN tokens per SKILL **§ Smart Creator — DESIGN.md mapping**. Collect `brandName` + tagline verbally; screenshots step may be skipped.

---

Use `public/brand-data.json` as starting point (**Track A** only — verify it was produced by the current user's URL run, not a leftover from the template repo). Track B may bypass Jina entirely—do not insist on canonical URL.

Ask only what is missing, ambiguous, or needs confirmation.
Prefer visual references in this order:

1. `public/assets/brand-jina/` (auto-saved from Jina, **Track A**)
2. `public/assets/brand-screenshots/` (user-provided)
3. `public/assets/design-inspiration/` (designs the user *aspires to*, especially important on **Track B**)

## After Jina (`public/brand-data.json`)

>**Track B:** reuse the questionnaire items below except **§1 Confirm URL**. Source answers from **Theme Factory presets** + user edits instead of Jina payloads.

1. **Confirm URL** (**Track A only**)  
   "We extracted data from: [url]. Is this the right site?"

2. **Brand + canvas roles**  
   From `colors` and vision: propose `colors.bg.brand` (primary brand surface) and `colors.bg.canvas` (page background). Ask: "Use these hex values, or paste corrections?"

3. **Accent roles**  
   From extracted palette + screenshots: propose five accents for cards and section pills (`colors.bg.accent.1` … `colors.bg.accent.5`). Ask for approval or five `#hex` replacements.

4. **Fonts**  
   From `fonts` in JSON + screenshot typography: propose `fonts.primary` and `fonts.serif`. Ask for approval or exact family names (must match how they will appear in CSS / Google Fonts if loaded).

5. **Radii and elevation (optional)**  
   If vision shows strong patterns: suggest `rounded.glass-header`, `glass`, `card`, `pill`. Ask to confirm or skip (skip keeps existing `DESIGN.md` values).

6. **Design inspiration (optional but recommended)**  
   "Share screenshots of designs you love — drop them in `public/assets/design-inspiration/`. I'll use them to build a visual philosophy for your brand (`design-philosophy.md`) that guides every infographic, carousel, and slide."

7. **Brand name and one-line description**  
   **Track A:** prefer `title` / `description` from `public/brand-data.json`; ask the user to correct if wrong.  
   **Track B:** typically **empty or irrelevant** JSON — ask verbally for brand / project display name + one sentence.

## If extraction is weak

- **Track B — no URL pipeline:** derive palette/fonts from **`skills/theme-factory/themes/*.md`** (or a net-new markdown theme you author for **Create your Own Theme**), then confirmations — do not block on `public/brand-data.json`.
- Empty or tiny `colors`: check `attemptsUsed` in `public/brand-data.json`. If attempts are low or uncertain, re-run the fetch once; if still empty, ask for pasted brand hex values (primary, background, accents).
- Empty `fonts`: ask for primary and serif names explicitly.
- No `screenshotUrl`: run vision on local assets in `public/assets/brand-jina/` and user-provided files under `public/assets/brand-screenshots/` and `public/assets/design-inspiration/`; rely more on user input when needed.

## Before writing `tmp/brand-answers.json`

- Re-read `DESIGN.md` front matter if needed so semantic references like `{colors.bg.accent.1}` stay valid when the user chooses reference style.
- Ensure every hex is `#` + 3, 6, or 8 hex digits.

## Done checklist

- [ ] Creator **first + last name** captured; **`Your Full Name`** globally replaced with the joined display string (see **Creator identity & avatar** in `skills/brand-setup/SKILL.md`); repo search confirms no stray placeholder
- [ ] Avatar file present at **`assets/avatar/avatar-profile.png`** (or user warned and deferred explicitly)
- [ ] `design-philosophy.md` at repo root (or explicit user opt-out noted)
- [ ] `skills/design-philosophy/SKILL.md` updated when philosophy changes
- [ ] `tmp/brand-answers.json` written
- [ ] `node scripts/apply-brand-answers.mjs --input tmp/brand-answers.json`
- [ ] `pnpm tokens:gen`
- [ ] `node scripts/validate-design.mjs`
- [ ] User told about optional **`assets/`** pieces (icons, logos) besides the avatar
