---
name: brand-setup
description: Capture creator first+last name, update src/creatorIdentity.js (single source of truth), place assets/avatar/avatar-profile.png, then onboard Smart Creator via Track A (website URL + Firecrawl scrape) when the user has visual identity, or Track B (skills/theme-factory presets / custom theme) when they have no site or VI yet — then aspiration vision, design-philosophy.md, DESIGN.md via apply-brand-answers, validation. Use for /setup, @setup, branding, workspace onboarding.
---

# Brand setup (workspace onboarding)

Run this as a guided workflow. Adapt steps by **track** (see gate below). Always document skips (empty inspiration folder, Track B without URL scrape, etc.).

Read [references/questionnaire.md](references/questionnaire.md) for the adaptive question flow. Before sign-off, run **Questions asked (agent sign-off checklist)** at the end of this file, then the questionnaire **Done checklist** for files and commands.

## Track choice (mandatory gate)

Confirm before running Firecrawl or Theme Factory:

| Situation | Track |
|-----------|--------|
| User **has** a website URL or settled visual identity to extract | **Track A — URL extraction** |
| User has **no** website yet **or** says they have **no** visual identity (colors/fonts/logo) yet | **Track B — Theme factory** |

Ask plainly: *Do you already have a site or brand visuals to pull from, or should we start from a Theme Factory preset?*

## Creator identity & avatar (mandatory — right after Track gate)

Do this **before** URL extraction (Track A) or Theme Factory (Track B). The template repo ships with a **neutral author placeholder** so new owners can personalize in one pass.

1. **Given name** — ask: *What is your first name (as you want it to appear)?*
2. **Family name** — ask: *What is your last name (as you want it to appear)?*
3. **Update single identity source** — edit [`src/creatorIdentity.js`](../../src/creatorIdentity.js):
   - `CREATOR_FIRST_NAME = '<firstName>'`
   - `CREATOR_LAST_NAME = '<lastName>'`
   - keep `CREATOR_DISPLAY_NAME` computed from first + last.

4. **Verify** — run a quick repo search for old literal names (for example `Samy Chouaf`) and confirm runtime assets now consume `CREATOR_DISPLAY_NAME` via imports.

   **Consistency:** downstream copy agents reference the same footer/author wording—do not invent alternate spellings mid-workflow.

5. **Avatar / profile image** — ask the user to provide a square-friendly **headshot** (PNG or JPG).

   - **Canonical path:** save (or convert and save) the file as **`assets/avatar/avatar-profile.png`**. This path is referenced by infographic footers, carousels, and slide export defaults.
   - If the source is JPG, convert or re-export as PNG at this path unless the pipeline already resolves both (prefer one canonical file).
   - If they cannot supply an image immediately, explain that footers/CTAs will reference a missing file until `assets/avatar/avatar-profile.png` exists—but **still** proceed with names and branding; remind them before closing onboarding.

Do **not** skip this section for “solo” setups—distribution relies on `src/creatorIdentity.js` being set correctly during `@setup`.

## Track B — Theme factory path

When Track B applies:

1. Read [`skills/theme-factory/SKILL.md`](../theme-factory/SKILL.md) fully.
2. Surface [`skills/theme-factory/theme-showcase.pdf`](../theme-factory/theme-showcase.pdf) for the user (open in IDE or OS viewer; **do not** edit the PDF). Use the SKILL's numbered theme list and wait for explicit **theme # or name**.
3. If none fit, follow the SKILL section **Create your Own Theme**, then derive hex + fonts from what the user approves (same mapping rules as presets).
4. Open the preset file under **`skills/theme-factory/themes/*.md`** and map palettes + typography into **`tmp/brand-answers.json`** semantics using **§ Smart Creator — DESIGN.md mapping** inside the theme-factory SKILL.
5. **Do not** run `scripts/fetch-brand-from-url.mjs` on Track B unless the user later provides a URL. Collect **brand display name + one-line description** by questionnaire instead of trusting `public/brand-data.json` alone (see Prerequisites note below).

### From here, both tracks converge (steps 5–10)

## Prerequisites

- **Track A:** `FIRECRAWL_API_KEY` in `.env` — required for `scripts/fetch-brand-from-url.mjs`. User obtains a key at [https://www.firecrawl.dev/](https://www.firecrawl.dev/) (dashboard).
- **Theme factory** — **Track B** (`skills/theme-factory/`).
- Host vision on `public/assets/brand-screenshots/`, `public/assets/design-inspiration/`, and when present `public/assets/brand-firecrawl/`.

> **Warning — stale template data:** `public/brand-data.json` ships with placeholder values from the template repo. Always verify it was produced by the current user's URL extraction run before trusting it. On Track B, ignore this file entirely and collect brand name / description verbally.

## Workflow (10 steps)

**Prerequisite:** complete the **Creator identity & avatar** steps above (update `src/creatorIdentity.js`) **before** the numbered workflow below. Obtain **`assets/avatar/avatar-profile.png`** during the same session when possible — if truly deferred per that section, keep going with branding tokens but remind the user before sign-off.

1. **Website URL (Track A only)**  
   Ask for the canonical site URL. **Track B:** skip; note *no URL* in your session notes.

2. **Firecrawl extraction (Track A only)**  
   Ensure `.env` contains `FIRECRAWL_API_KEY` ([Firecrawl](https://www.firecrawl.dev/)). Run from the repo root:
   ```bash
   node scripts/fetch-brand-from-url.mjs "<https-url>"
   ```
   This writes [public/brand-data.json](public/brand-data.json) (title, description, content preview, screenshot URL, colors, fonts, design patterns, typography snippet, optional full `brandingProfile`), and saves downloaded assets under `public/assets/brand-firecrawl/`.
   The script retries automatically when no branded colors are extracted, and records `attemptsUsed` in the JSON.

3. **Present extraction (Track A only)**  
   Load `public/brand-data.json` and summarize: colors (first batch), fonts, design patterns, screenshot URL, locally saved assets, `brandingProfile` highlights if present, and `attemptsUsed`.
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

   **Track A:** if extraction still returned no usable colors after retries, ask the user to paste hex values manually.

5. **Branded screenshots**  
   Ask the user to add representative screenshots (home, marketing, product UI) under `public/assets/brand-screenshots/`. Wait until they confirm files are in place.  
   **Track B:** if they have nothing to screenshot yet, allow **skip** — document the gap — and lean harder on step 6 plus optional manual logo paste later (`assets/`).

6. **Design inspiration uploads**  
   Ask the user: *"Drop screenshots of designs you love (sites, posters, UI, decks, editorial — anything)."* Explain files live in **`public/assets/design-inspiration/`**. Wait until they confirm files are in place (if they reused brand screenshots elsewhere, mirror or copy those files here so aspiration references stay explicit). This step is optional but strongly recommended — skipping it narrows the vision pass to extracted data and user answers alone.

7. **Vision pass (host model)**  
   Read images from all relevant locations (skip hidden or non-image files). **Track B:** when `public/assets/brand-firecrawl/` is empty or unused, base color/texture notes on **theme markdown + inspiration images** and user answers.
   - user-provided brand context: `public/assets/brand-screenshots/`
   - **design aspiration references:** `public/assets/design-inspiration/` (directory may be empty if the user opted out)
   - script-saved captures: `public/assets/brand-firecrawl/`

   Describe: dominant colors, typography feel, corner radii, shadows / elevation, spacing density, glass or gradients, **composition and mood**. Merge this with the user's edits from step 4 and **contrast aspiration** from inspiration images (minimal vs maximal, restraint vs kinetic); **Track A:** also fold in `public/brand-data.json`; **Track B:** treat the chosen **theme file** as the primary chromatic baseline when JSON or scrape assets are missing.

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

   **b) Update [`skills/design-philosophy/SKILL.md`](../design-philosophy/SKILL.md)** so `@skills/design-philosophy` always loads: (a) the path to repo-root **`design-philosophy.md`** (read it in full when present), (b) cross-links to **Color Contrast & Composition Laws** in `DESIGN.md`, (c) mandatory elevation + 2–3 color economy reminders, (d) [`skills/infographics-designer/SKILL.md`](../infographics-designer/SKILL.md) for infographic canvas when layout work touches infographics. Keep YAML `name: design-philosophy` and a description that mentions the root manifesto.

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
    node scripts/validate-design.mjs
    ```

    Then **sync** any changed semantic colors into `src/index.css` (`:root` CSS variables) so runtime components match `DESIGN.md`.

    Report: which areas changed (brand name, description, colors, fonts, radii), whether validation succeeded, and that `src/index.css` was updated if palette roles changed.

## Guardrails

- **Theme fonts:** presets often name **DejaVu Sans** (or similar). If not already loaded for the workspace, resolve to nearest **Google Fonts** pairings acceptable to the user, add the import to **`index.html`**, and align `fonts.primary` / `fonts.serif` in `brand-answers.json` accordingly. Example import line to add inside `<head>`:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet">
  ```
- Update `DESIGN.md` only via `scripts/apply-brand-answers.mjs` for the automated merge path. If the user needs tokens not covered by answers (full palette retune), edit `DESIGN.md` manually afterward, run `node scripts/validate-design.mjs`, and mirror the changes into `src/index.css`.
- **`src/index.css`** holds runtime CSS variables — edit it when brand colors change (there is no codegen step).
- If the user gives non-hex color values where hex is required, ask for a valid `#hex`.
- Keep `design/` output-only; onboarding must not edit generated designs.
- If color extraction is empty, run the script again once manually before asking for manual palette values:
  ```bash
  node scripts/fetch-brand-from-url.mjs "<https-url>"
  ```
- Prefer local assets saved by the script (`public/assets/brand-firecrawl/`) for consistent vision analysis.

## Follow-up for the user

- Profile / avatar image: **`assets/avatar/avatar-profile.png`** (required for footer and slide defaults; confirmed during Creator identity & avatar).
- Icons and logos under `assets/` as needed for templates.
- See [references/questionnaire.md](references/questionnaire.md) **Done checklist** to verify nothing was skipped.

## Questions asked (agent sign-off checklist)

Before closing onboarding, confirm you **posed or explicitly confirmed** each item below. Use **N/A** and one line of session notes for track-skipped rows. Do not check a box if you only assumed the answer without asking.

**Everyone**

- [ ] **Track gate** — *Do you already have a site or brand visuals to pull from, or should we start from a Theme Factory preset?* (or equivalent plain wording)
- [ ] **First name** — *What is your first name (as you want it to appear)?*
- [ ] **Last name** — *What is your last name (as you want it to appear)?*
- [ ] **Avatar** — Asked for a square-friendly headshot (PNG/JPG) for **`assets/avatar/avatar-profile.png`**, **or** user explicitly deferred (note deferral; remind at sign-off)

**Track A — URL extraction**

- [ ] **Canonical site URL** — asked before running `fetch-brand-from-url.mjs`
- [ ] **Post-scrape** — *We extracted data from: [url]. Is this the right site?* (or equivalent) after `public/brand-data.json` reflects this run
- [ ] **Palette & type approval** — user confirmed or corrected proposed colors, accents, text roles, fonts, and optional radii (or supplied manual hex if extraction was weak)

**Track B — Theme factory**

- [ ] **Theme choice** — user picked a **theme # or name** from the showcase (or completed **Create your Own Theme** per `skills/theme-factory/SKILL.md`)
- [ ] **Brand naming** — **brand display name** and **one-line description** collected from the user (do not rely on template `public/brand-data.json`)
- [ ] **Theme-derived tokens** — user approved or corrected the proposed semantic mapping before `tmp/brand-answers.json`

**Both tracks (after identity)**

- [ ] **Branded screenshots** — asked to add files under `public/assets/brand-screenshots/` and waited for confirmation **or** documented an approved skip (common on Track B)
- [ ] **Design inspiration** — asked for drops under `public/assets/design-inspiration/` **or** documented opt-out / empty folder
- [ ] **Brand sentence** — **Track A:** confirmed or corrected **brand name + one-line description** from extraction; **Track B:** already covered above

**Handoff**

- [ ] User reminded about **`assets/avatar/avatar-profile.png`** if still missing
- [ ] Optional **icons / logos** under `assets/` mentioned if relevant

Then run the **Done checklist** in [references/questionnaire.md](references/questionnaire.md) for file and script completion (replace placeholder, JSON, `src/index.css` sync, validation).
