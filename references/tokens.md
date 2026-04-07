# Design Tokens Reference

All token values are **immutable** — never modify colors, sizes, font weights, or shadows.

---

## Colors — Primitives

| Token (CSS var) | Value |
|---|---|
| `--color/blue/100` | `rgba(126,218,255,0.15)` |
| `--color/blue/200` | `#c7efff` |
| `--color/blue/300` | `#b4eaff` |
| `--color/blue/400` | `#7edaff` |
| `--color/blue/500` | `#092c69` |
| `--color/cream/100` | `#fffceb` |
| `--color/cream/200` | `#fff4e8` |
| `--color/cream/300` | `#FFFCEB` — Slide canvas background |
| `--color/neutral/0–1000` | white → #f9fafc → #f4f4f8 → #e3e4eb → #cacbd4 → #a8a9b2 → #717188 → #323241 → black |
| `--color/pink/100–300` | rgba(255,178,218,0.15) → #ffe6f3 → #ffb2da |
| `--color/amber/100–300` | #fef3c7 → #fde68a → #fcd34d |
| `--color/green/100–300` | rgba(169,255,62,0.15) → #d2ff9a → #a9ff3e |
| `--color/orange/100–300` | rgba(255,145,77,0.15) → #ffa066 → #ff914d |

## Colors — Semantic Tokens

| Token (CSS var) | Value | Tailwind alias |
|---|---|---|
| `--color/blue/500` | `#092c69` | `navy` |
| `--text/primary` | `black` | — |
| `--text/secondary` | `#323241` | — |
| `--text/contrast` | `#a8a9b2` | — |
| `--text/text-brand` | `#092c69` | — |
| `--border/blue` | `#7edaff` | `border-blue` |
| `--border/pink` | `#ffb2da` | `border-pink` |
| `--border/green` | `#a9ff3e` | `border-green` |
| `--border/orange` | `#ff914d` | `border-orange` |
| `--border/amber` | `#fcd34d` | `border-amber` |
| `--border/grey` | `#e3e4eb` | `border-grey` |
| `--components/background/primary` | `#fffceb` | `canvas` |
| `--components/card/blue` | `rgba(126,218,255,0.15)` | `card-blue` |
| `--components/card/green` | `rgba(169,255,62,0.15)` | `card-green` |
| `--components/card/orange` | `rgba(255,145,77,0.15)` | `card-orange` |
| `--components/card/amber` | `#fef3c7` | `card-amber` |
| `--components/card/pink` | `rgba(255,178,218,0.15)` | `card-pink` |
| `--components/card-title/blue` | `#b4eaff` | `chip-blue` |
| `--components/card-title/green` | `#d2ff9a` | `chip-green` |
| `--components/card-title/amber` | `#fde68a` | `chip-amber` |
| `--components/card-title/pink` | `#ffe6f3` | `chip-pink` |
| `--components/card-title/orange` | `#ffa066` | `chip-orange` |
| `--highlight/blue` | `rgba(126,218,255,0.15)` | — |
| `--highlight/green` | `rgba(169,255,62,0.15)` | — |
| `--highlight/orange` | `rgba(255,145,77,0.15)` | — |
| `--highlight/amber` | `#fef3c7` | — |
| Glass card bg | `rgba(255,255,255,0.1)` | `glass-white` |
| Number bullet badge | `rgba(255,178,218,0.7)` | `pink-bullet` |

**Escape slashes in Tailwind:** `bg-[var(--color\/blue\/500,#092c69)]`

---

## Typography

| Role | Font family | CSS var | Weight | Size |
|---|---|---|---|---|
| Title / serif display | Noto Serif | `--font/family/title-serif` | Bold (700) | 72px |
| Hero title (infographic) | Montserrat | `--font/family/title` | Bold (700) | 72.948px |
| Title 4xlarge | Montserrat | `--font/family/title` | Bold (700) | 56px |
| Title large / section header | Montserrat | `--font/family/title` | Bold (700) | 32px |
| Subtitle (infographic) | Montserrat | `--font/family/title` | Medium Italic (500) | 32px |
| Title medium | Montserrat | `--font/family/title` | SemiBold (600) | 24px |
| Body bold / large | Montserrat | `--font/family/title` | SemiBold/Medium (600/500) | 20px |
| Body / list text | Montserrat | `--font/family/title` | Medium (500) | 14px |
| Footer | Montserrat | `--font/family/title` | SemiBold (600) | 24px |
| Body base | Montserrat | `--font/family/body` | Regular (400) | 16px |
| Caption | Montserrat | `--font/family/body` | Medium (500) | 12px |

**Font families:** title = Montserrat · body = Montserrat · title-serif = Noto Serif
**Font size scale:** xs=12 · sm=16 · md=18 · lg=20 · xl=24 · 2xl=32 · 4xl=56 · 5xl=72
**Google Fonts loaded:** Montserrat + DM Sans + Noto Serif (see index.html)

---

## Color Meaning (Design Guidance)

- **Blue** chips (`chip-blue #b4eaff`) → features, capabilities, primary content
- **Amber** chips (`chip-amber #fde68a`) → process, how-it-works, steps
- **Green** (`chip-green #d2ff9a`) → actions, outcomes, checklists
- **Pink** badges → numbered/ranked items
- **Orange** → warnings, alternatives, secondary actions
