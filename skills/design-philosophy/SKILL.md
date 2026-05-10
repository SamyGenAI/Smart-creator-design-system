---
name: design-philosophy
description: Loads repo-root design-philosophy.md — a visual-philosophy manifesto for the brand aesthetic movement — plus operative contrast/elevation/token rules for generators. Invoked via @skills/design-philosophy during infographic/carousel/slide work after brand-setup. Not a layout spec; pairing with DESIGN.md and skills/infographics-designer/SKILL.md is required.
---

# Design philosophy (visual aesthetic movement)

The manifesto defines a **visual philosophy** — an aesthetic movement interpreted through **form, space, color, composition, imagery, graphics, shapes, and patterns**. It is **not** a pile of infographic templates.

## Critical understanding

| Lens | Guidance |
|---|---|
| **What comes in** | Subtle cues from setup: URL crawl, QA answers, aspiration screenshots (`public/assets/design-inspiration/`). Those are **foundations only** — they must not choke creative latitude. |
| **What gets written** | A named **movement / worldview** generators apply when choosing rhythm, weight, and chromatic discipline. |
| **What happens next** | Every downstream artifact should **express the philosophy visually**: ~**90% visual structure and spatial communication**, ~**10% essential text** — information lives in **design**, not paragraphs. |

### Essential principles (non-negotiable)

- **Visual philosophy** — an aesthetic worldview, not slides filled with bullets.
- **Minimal text on deliverables** — sparse, integrated, essential-only; never lengthy blocks inside the graphic.
- **Spatial expression** — meaning through space, form, color, composition; not through explanation paragraphs.
- **Artistic freedom** — specific enough to steer; open enough that the executing model still chooses like a specialist.
- **Pure design posture** — **art/editorial objects**, not decorated documents.
- **Expert craftsmanship** — repeatedly insist the shipped work reads as *meticulously crafted* and *master-level*.

## Authoring `design-philosophy.md` (brand-setup)

When creating or refreshing the file at the repo root, follow this contract end-to-end.

### Movement title

- **1–2 words**, e.g. *Metabolist Dreams*, *Chromatic Silence*, *Brutalist Joy*.

### Body — four to six substantial paragraphs

Cover these **once each** across the whole piece (no circular repetition of the same color-theory or hierarchy lecture):

- **Space and form**
- **Color and material**
- **Scale and rhythm**
- **Composition and balance**
- **Visual hierarchy**

**Voice:** Write as if drafting a **manifesto for an art movement** — poetic, specific, but leaving **interpretive room** for the next model to execute at an extremely high level.

**Craftsmanship (non-negotiable):** Thread **multiple** explicit phrases that the finished work must feel *meticulously crafted*, the *product of deep expertise*, *painstaking attention*, *master-level execution*, *countless hours* — so downstream agents treat polish as mandatory, not optional.

**Text in the manifesto:** The manifesto itself is prose, but it must **instruct** that **on-canvas copy stays minimal** — short labels, integrated type as visual element, **never** long explanatory blocks in the final graphics.

### Tone calibration (named movements — do not copy verbatim)

Use only as **compass**, not paste: *Concrete Poetry* (monumental form, sculptural type), *Chromatic Language* (color fields carry meaning), *Analog Meditation* (texture, vast negative space, whispered type), *Organic Systems* (modular natural clustering), *Geometric Silence* (grid precision, dramatic quiet zones).

### Subtle reference / conceptual DNA (optional but powerful)

Before closing the file, **deduce** one **quiet conceptual thread** from the brand and inspiration material — niche, refined, **not** literal logo-slogan repetition.

- Someone deep in the subject should sense it intuitively; others should simply see a superb abstract editorial composition.
- It must **stay subtle** — like a musician quoting another tune: only insiders catch it; everyone still enjoys the composition.
- If included, weave it **only** through the philosophy’s language of form, material, rhythm, or hierarchy — **never** announce or explain it on the infographic as a gag.

Keep the movement **genre-agnostic**: do not tether the prose to “this infographic is about X topic.” The aesthetic should travel.

### Closing tie-in — tokens only

Final paragraph maps the movement onto **semantic roles**: dominant `color.bg.brand`, canvas/surface posture, **one sharp accent identity**, elevation / shadow temperament. Reference **tokens and shadow utility names**, not hex literals.

---

## Consumers — before layout

1. **Read** repo-root [`design-philosophy.md`](../../design-philosophy.md) **in full** when it exists. If missing, rely on [`DESIGN.md`](../../DESIGN.md) (Overview + **Color Contrast & Composition Laws**) and note the gap.
2. **Read** [`skills/infographics-designer/SKILL.md`](../infographics-designer/SKILL.md) for infographic canvas and layout conventions when doing infographic work.
3. Obey [**CLAUDE.md**](../../CLAUDE.md) globally.

### Operative laws (always)

- **Contrast:** dark brand / dark fills → `color.text.onBrand` where applicable; light fills → `color.text.primary` / `secondary` / `muted`. No same-family collapse.
- **Palette economy:** at most **2–3** intentional chromatic focal roles per delivered piece — dominant brand + neutrals + **one** sharp accent. Bold commitment beats timid, evenly sprinkled palettes.
- **Elevation:** every card / major shell → at least `shadow-elevation-100`; primary brand glass → `shadow-elevation-400` or stronger. Premium surfaces carry lift.
- **Tokens only** in [`design/**/*`](../../design): semantic CSS vars / Tailwind token classes ([`DESIGN.md`](DESIGN.md)).

### Interpreting the manifesto during build

Treat `design-philosophy.md` like **briefing from a museum curator**: prioritize spatial drama, restraint, repetition, silhouette, chromatic zoning — **not** text volume.

Apply the **refinement discipline**: resist adding ornament on a second pass — **align, kern, soften, deepen shadow clarity, unify spacing** until the layout feels pristine. Prefer cohesion over novelty.
