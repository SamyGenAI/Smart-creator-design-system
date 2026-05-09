---
name: brand-setup
description: Capture creator first+last name, replace template placeholder Your Full Name, place assets/avatar/avatar-profile.png, then onboard Smart Creator via Track A (website URL + Jina) when the user has visual identity, or Track B (skills/theme-factory presets / custom theme) when they have no site or VI yet — then aspiration vision, design-philosophy.md, DESIGN.md via apply-brand-answers, validation. Use for /setup, @setup, branding, workspace onboarding.
---

# Brand setup (workspace onboarding)

Run this as a guided workflow. Adapt steps by **track** (see gate below). Always document skips (empty inspiration folder, Track B without Jina, etc.).

Read [references/questionnaire.md](references/questionnaire.md) for the adaptive question flow and the **Done checklist**.

## Track choice (mandatory gate)

Confirm before running Jina or Theme Factory:

| Situation | Track |
|-----------|--------|
| User **has** a website URL or settled visual identity to extract | **Track A — URL extraction** |
| User has **no** website yet **or** says they have **no** visual identity (colors/fonts/logo) yet | **Track B — Theme factory** |

Ask plainly: *Do you already have a site or brand visuals to pull from, or should we start from a Theme Factory preset?*

## Creator identity & avatar (mandatory — right after Track gate)

Do this **before** URL extraction (Track A) or Theme Factory (Track B). The template repo ships with a **neutral author placeholder** so new owners can personalize in one pass.

1. **Given name** — ask: *What is your first name (as you want it to appear)?*
2. **Family name** — ask: *What is your last name (as you want it to appear)?*
3. **Display name** — set `creatorDisplayName` to a single string: trim and join as `` `${firstName} ${lastName}` `` (normalize internal spaces). Preserve the user’s preferred capitalization.

4. **Replace the placeholder globally** — the repo uses the literal **`Your Full Name`** everywhere a human author/footer/nav label is needed (agents, defaults, templates, examples). Replace **every occurrence** of the exact substring `Your Full Name` with `creatorDisplayName` across tracked source and docs:

   **Include:** `components/`, `templates/`, `skills/`, `.claude/agents/`, `.cursor/agents/`, root `CLAUDE.md`, root `README.md`, and other markdown under `references/` **when** those files contain the placeholder.

   **Exclude:** `node_modules/`, `.git/`, build output, **`design/`** generated outputs (skip those unless the user explicitly wants older exports refreshed), and purely local Claude paths such as `.claude/settings.local.json`.

   After replacing, optionally run a quick repo search for **`Your Full Name`** to confirm zero remaining matches before continuing.

   **Consistency:** downstream copy agents reference the same footer/author wording—do not invent alternate spellings mid-workflow.

5. **Avatar / profile image** — ask the user to provide a square-friendly **headshot** (PNG or JPG).

   - **Canonical path:** save (or convert and save) the file as **`assets/avatar/avatar-profile.png`**. This path is referenced by infographic footers, carousels, and slide export defaults.
   - If the source is JPG, convert or re-export as PNG at this path unless the pipeline already resolves both (prefer one canonical file).
   - If they cannot supply an image immediately, explain that footers/CTAs will reference a missing file until `assets/avatar/avatar-profile.png` exists—but **still** proceed with names and branding; remind them before closing onboarding.

Do **not** skip this section for “solo” setups—distribution relies on neutral defaults (`Your Full Name`) being replaced exactly once during `@setup`.

## Track B — Theme factory path

When Track B applies:

1. Read [`skills/theme-factory/SKILL.md`](../theme-factory/SKILL.md) fully.
2. Surface [`skills/theme-factory/theme-showcase.pdf`](../theme-factory/theme-showcase.pdf) for the user (open in IDE or OS viewer; **do not** edit the PDF). Use the SKILL's numbered theme list and wait for explicit **theme # or name**.
3. If none fit, follow the SKILL section **Create your Own Theme**, then derive hex + fonts from what the user approves (same mapping rules as presets).
4. Open the preset file under **`skills/theme-factory/themes/*.md`** and map palettes + typography into **`tmp/brand-answers.json`** semantics using **§ Smart Creator — DESIGN.md mapping** inside the theme-factory SKILL.
5. **Do not** run `scripts/fetch-brand-from-url.mjs` on Track B unless the user later provides a URL. Collect **brand display name + one-line description** by questionnaire instead of trusting `public/brand-data.json` alone (see Prerequisites note below).

### From here, both tracks converge (steps 5–10)

## Prerequisites

- Optional: `JINA_API_KEY` — **Track A** Jina rate limits (works without a key at lower limits).
- **Theme factory** — **Track B** (`skills/theme-factory/`).
- Host vision on `public/assets/brand-screenshots/`, `public/assets/design-inspiration/`, and when present `public/assets/brand-jina/`.

> **Warning — stale template data:** `public/brand-data.json` ships with placeholder values from the template repo. Always verify it was produced by the current user's URL extraction run before trusting it. On Track B, ignore this file entirely and collect brand name / description verbally.

## Workflow (10 steps)

**Prerequisite:** complete the **Creator identity & avatar** steps above **for names** (`Your Full Name` → `creatorDisplayName` everywhere) **before** the numbered workflow below. Obtain **`assets/avatar/avatar-profile.png`** during the same session when possible — if truly deferred per that section, keep going with branding tokens but remind the user before sign-off.

1. **Website URL (Track A only)**  
   Ask for the canonical site URL. **Track B:** skip; note *no URL* in your session notes.

2. **Jina extraction (Track A only)**  
   Run from the repo root:
   ```bash
   node scripts/fetch-brand-from-url.mjs "<https-url>"
   ```
   This writes [public/brand-data.json](public/brand-data.json) (title, description, content preview, screenshot URL, extracted colors, fonts, design patterns, CSS snippet), and also saves downloaded Jina assets under `public/assets/brand-jina/`.
   The script retries automatically when no colors are extracted, and records `attemptsUsed` in the JSON.

3. **Present extraction (Track A only)**  
   Load `public/brand-data.json` and summarize: colors (first batch), fonts, design patterns, screenshot URL, locally saved assets, and `attemptsUsed`.
   Use locally saved assets first (`savedAssets.screenshot`, `savedAssets.images`) for stable analysis; keep `screenshotUrl` as fallback.  
   **Track B:** skip; instead briefly present the **chosen theme file** (palette + type) and the proposed **semantic token mapping** you will place in `tmp/brand-answers.json`.

4. **User approval / edits**  
   Confirm or collect corrected values (valid `#hex` only where the pipeline expects hex). **Track B:** user is approving the **theme-derived** proposal (and `brandName` / `brandDescription` if not from JSON).
  - Brand surface color (`colors.bg.brand`)
  - Canvas / background color (`colors.bg.canvas`)
  - Optional surface roles (`colors.bg.surface`, `colors.bg.surfaceAlt`)
  - Accent palette for `colors.bg.accent.1` through `colors.bg.accent.5` (each may be `#hex` or `{colors.*}` references)
  - Text roles (`colors.text.primary`, `colors.text.secondary`, `colors.text.onBrand`)
  - Primary sans font and serif display font (`fonts.primary`, `fonts.serif`)
  - Optional: `rounded` overrides (`glass-header`, `glass`, `card`, `pill`) informed by vision + CSS patterns

   **Track A:** if Jina still returned no usable colors after retries, ask the user to paste hex values manually.

5. **Branded screenshots**  
   Ask the user to add representative screenshots (home, marketing, product UI) under `public/assets/brand-screenshots/`. Wait until they confirm files are in place.  
   **Track B:** if they have nothing to screenshot yet, allow **skip** — document the gap — and lean harder on step 6 plus optional manual logo paste later (`assets/`).

6. **Design inspiration uploads**  
   Ask the user: *"Drop screenshots of designs you love (sites, posters, UI, decks, editorial — anything)."* Explain files live in **`public/assets/design-inspiration/`**. Wait until they confirm files are in place (if they reused brand screenshots elsewhere, mirror or copy those files here so aspiration references stay explicit). This step is optional but strongly recommended — skipping it narrows the vision pass to extracted data and user answers alone.

7. **Vision pass (host model)**  
   Read images from all relevant locations (skip hidden or non-image files). **Track B:** when `public/assets/brand-jina/` is empty, base color/texture notes on **theme markdown + inspiration images** and user answers.
   - user-provided brand context: `public/assets/brand-screenshots/`
   - **design aspiration references:** `public/assets/design-inspiration/` (directory may be empty if the user opted out)
   - Jina-downloaded: `public/assets/brand-jina/`

   Describe: dominant colors, typography feel, corner radii, shadows / elevation, spacing density, glass or gradients, **composition and mood**. Merge this with the user's edits from step 4 and **contrast aspiration** from inspiration images (minimal vs maximal, restraint vs kinetic); **Track A:** also fold in `public/brand-data.json`; **Track B:** treat the chosen **theme file** as the primary chromatic baseline when JSON/Jina assets are missing.

8. **Philosophy files**  
   After the vision pass, write **both** files in one pass:

   **a) `design-philosophy.md` at the repository root.** This defines an **aesthetic movement**, not infographic templates. Follow the **full authoring contract** in [`skills/design-philosophy/SKILL.md`](../design-philosophy/SKILL.md) (critical understanding → manifesto paragraphs → subtle conceptual DNA → token tie-in). In summary:
   - **Name the movement** (1–2 words).
   - **4–6 substantial paragraphs**, each major axis **once**: space/form; color/material; scale/rhythm; composition/balance; visual hierarchy — **manifesto tone**, poetic but executable.
   - **Craftsmanship**: repeat throughout that work must feel *meticulously crafted*, *master-level*, *painstaking*, *deep expertise* — downstream agents must treat polish as mandatory.
   - **Visual-first mandate**: downstream pieces express ideas through layout and chromatic/spatial signals; **minimal on-canvas text** — essential labels only, no paragraph blocks inside graphics.
   - **Subtle reference (optional):** one refined conceptual thread from brand + inspiration, never literal or announced — see design-philosophy skill **§ Subtle reference / conceptual DNA**.
   - **Closing:** one paragraph mapping the movement to **semantic tokens** (roles + elevation posture, no hex dumps).

   If the user opted out of inspiration files, synthesize from approved tokens + questionnaire only; record the gap in a short front-of-file note.

   **b) Update [`skills/design-philosophy/SKILL.md`](../design-philosophy/SKILL.md)** so `@skills/design-philosophy` always loads: (a) the path to repo-root **`design-philosophy.md`** (read it in full when present), (b) cross-links to **Color Contrast & Composition Laws** in `DESIGN.md`, (c) mandatory elevation + 2–3 color economy reminders, (d) `references/space-budgets.md` before layout work. Keep YAML `name: design-philosophy` and a description that mentions the root manifesto.

9. **Answers JSON**  
   Write `tmp/brand-answers.json` using this shape (fill from steps 4, 7, and 8 when prose needs brand voice; **Track B:** seed colors/fonts from the **theme → DESIGN.md mapping** from step 4; omit keys the user did not change so `apply-brand-answers` keeps existing `DESIGN.md` values where appropriate):

   ```json
   {
     "brandName": "Brand display name",
     "brandDescription": "One sentence.",
     "fonts": {
       "primary": "Font Name",
       "serif": "Serif Font Name"
     },
     "colors": {
       "semantic": {
         "bg": {
           "brand": "#hex",
           "canvas": "#hex",
           "surface": "#hex",
           "surfaceAlt": "#hex",
           "accent": {
             "1": "#hex",
             "2": "#hex",
             "3": "#hex",
             "4": "#hex",
             "5": "#hex"
           }
         },
         "text": {
           "primary": "#hex",
           "secondary": "#hex",
           "onBrand": "#hex"
         }
       }
     },
     "rounded": {
       "glass-header": "10px",
       "glass": "20px",
       "card": "8px",
       "pill": "40px"
     }
   }
   ```

   Only include `colors.semantic` keys you intend to overwrite. `scripts/apply-brand-answers.mjs` deep-merges into `DESIGN.md` front matter.

10. **Apply and validate**  
    From repo root:
    ```bash
    node scripts/apply-brand-answers.mjs --input tmp/brand-answers.json
    pnpm tokens:gen
    node scripts/validate-design.mjs
    ```

    Report: which areas changed (brand name, description, colors, fonts, radii), whether `pnpm tokens:gen` succeeded, and validation result.

## Guardrails

- **Theme fonts:** presets often name **DejaVu Sans** (or similar). If not already loaded for the workspace, resolve to nearest **Google Fonts** pairings acceptable to the user, add the import to **`index.html`**, and align `fonts.primary` / `fonts.serif` in `brand-answers.json` accordingly. Example import line to add inside `<head>`:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet">
  ```
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

- Profile / avatar image: **`assets/avatar/avatar-profile.png`** (required for footer and slide defaults; confirmed during Creator identity & avatar).
- Icons and logos under `assets/` as needed for templates.
- See [references/questionnaire.md](references/questionnaire.md) **Done checklist** to verify nothing was skipped.
