---
name: theme-factory
description: Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 10 pre-set themes with colors/fonts that you can apply to any artifact that has been creating, or can generate a new theme on-the-fly.
license: Complete terms in LICENSE.txt
---


# Theme Factory Skill

This skill provides a curated collection of professional font and color themes themes, each with carefully selected color palettes and font pairings. Once a theme is chosen, it can be applied to any artifact.

## Purpose

To apply consistent, professional styling to presentation slide decks, use this skill. Each theme includes:
- A cohesive color palette with hex codes
- Complementary font pairings for headers and body text
- A distinct visual identity suitable for different contexts and audiences

## Usage Instructions

To apply styling to a slide deck or other artifact:

1. **Show the theme showcase**: Display the `theme-showcase.pdf` file to allow users to see all available themes visually. Do not make any modifications to it; simply show the file for viewing.
2. **Ask for their choice**: Ask which theme to apply to the deck
3. **Wait for selection**: Get explicit confirmation about the chosen theme
4. **Apply the theme**: Once a theme has been chosen, apply the selected theme's colors and fonts to the deck/artifact

## Themes Available

The following 10 themes are available, each showcased in `theme-showcase.pdf`:

1. **Ocean Depths** - Professional and calming maritime theme
2. **Sunset Boulevard** - Warm and vibrant sunset colors
3. **Forest Canopy** - Natural and grounded earth tones
4. **Modern Minimalist** - Clean and contemporary grayscale
5. **Golden Hour** - Rich and warm autumnal palette
6. **Arctic Frost** - Cool and crisp winter-inspired theme
7. **Desert Rose** - Soft and sophisticated dusty tones
8. **Tech Innovation** - Bold and modern tech aesthetic
9. **Botanical Garden** - Fresh and organic garden colors
10. **Midnight Galaxy** - Dramatic and cosmic deep tones

## Theme Details

Each theme is defined in the `themes/` directory with complete specifications including:
- Cohesive color palette with hex codes
- Complementary font pairings for headers and body text
- Distinct visual identity suitable for different contexts and audiences

## Application Process

After a preferred theme is selected:
1. Read the corresponding theme file from the `themes/` directory
2. Apply the specified colors and fonts consistently throughout the deck
3. Ensure proper contrast and readability
4. Maintain the theme's visual identity across all slides

## Create your Own Theme
To handle cases where none of the existing themes work for an artifact, create a custom theme. Based on provided inputs, generate a new theme similar to the ones above. Give the theme a similar name describing what the font/color combinations represent. Use any basic description provided to choose appropriate colors/fonts. After generating the theme, show it for review and verification. Following that, apply the theme as described above.

---

## Smart Creator — `DESIGN.md` mapping (brand onboarding)

When [`skills/brand-setup/SKILL.md`](../brand-setup/SKILL.md) routes a user through **Track B — Theme factory**, this skill supplies the **starter palette and fonts**. The agent must **expand** each theme’s short list into Smart Creator’s semantic roles (`tmp/brand-answers.json` → `apply-brand-answers.mjs`). Use this mapping — adjust per theme wording (some themes describe “Primary background” vs “Primary dark”) but keep **contrast**:

| DESIGN.md semantic role | How to derive from theme Markdown |
|---|---|
| `colors.bg.brand` | Hue labeled primary dark / deep / navy / charcoal **or** the strongest anchored brand hue (readable as a header/footer bar). Must stay **dark enough** that `colors.text.onBrand` (#fff or approved light) reads clearly. |
| `colors.bg.canvas` | Lightest wash: cream / fog / linen / labeled page background — **prefer** readability as global canvas behind texture. Never pick the same hex as `brand`. |
| `colors.bg.surface` | Pure white `#ffffff` or the theme’s “White / crisp card” hex if lighter than canvas |
| `colors.bg.surfaceAlt` | Mid-light tint derived from accents (soft mix) OR second light swatch |
| `colors.bg.accent.1 … 5` | Spread chromatic accents: assign **distinct** hues from palette bullets; synthesize sensible tints/variations until five slots carry clear roles (capabilities / outcomes / steps / ranked / warning energy per `DESIGN.md` semantics). Prefer **few strong hues over five near-duplicates.** |
| `colors.text.primary` | Near-black on light surfaces (`#000000` or softened black) unless theme dictates otherwise |
| `colors.text.secondary` | Neutral dark gray harmonizing with brand |
| `colors.text.onBrand` | Typically `#ffffff` — confirm contrast on `colors.bg.brand` |
| `fonts.primary` | Typography **Headers** line (prefer web-safe / Google Fonts name the project can load) |
| `fonts.serif` | If theme has single family, reuse for serif display or propose a complementary serif (Noto Serif, etc.) consistent with SKILL tone |

**Border / state derivation:** Optionally extend into `DESIGN.md` front matter manually later (`apply-brand-answers` may not expose every nested key)—at minimum populate **bg/text** semantics.

**Elevation:** Preserve Smart Creator mandatory shadows per `DESIGN.md` (**Color Contrast & Composition Laws**); theme files do not override shadow tokens unless user edits beyond defaults.

Always **present** hex values to user for tweak approval before merging into `DESIGN.md`.