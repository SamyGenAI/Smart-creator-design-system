/**
 * AiDesignSystemInfographic — 1080×1350px LinkedIn infographic.
 * Topic: "The AI Design System Architecture" — data foundation feeds a
 * workflow, the workflow produces output, and output branches to publish or
 * to manual human editing.
 *
 * This is a deliberately NEW structure, distinct from the older
 * `RepoArchitectureInfographic.jsx` (a 3-band vertical stack with no
 * branching). The only thing reused from that file is the `ExampleBadge`
 * idiom: a small accent-tinted pill naming a real on-disk thing, so a reader
 * can go open the repo and find every badge.
 *
 * SINGLE OUTER SHELL: one plain glass rounded rectangle (a `GlassTile`,
 * white border, no header bar) holds the whole flow diagram. Everything
 * inside is a hand-rolled tile in the same idiom, so the piece reads as one
 * big box rather than several stacked ones with duplicate header bars.
 *
 * v4 REVISION (third feedback round — supersedes v3's outer PrimaryGlassSection
 * and its two differently-scaled destination groups):
 *   - The outer shell is now a plain `GlassTile` rounded rectangle with the
 *     same white/neutral border as the tiles inside it. The
 *     `PrimaryGlassSection` brand header bar reading "Design System Repo" is
 *     gone: 51px of header bar plus its bottom gap, spent restating the
 *     infographic's own title.
 *   - Publish and Edit manually now share ONE component
 *     (`DestinationLogo`) at one scale, and both lay out HORIZONTALLY. The
 *     Edit manually group was a 3-tall stacked column (~120px); as a row it
 *     costs the same ~75px the Publish row already did.
 *   - All seven destination marks sit in an IDENTICAL 52px rounded square
 *     (`TILE`) with a soft shadow and the neutral border, so the branch row
 *     reads as one consistent set of chips. Tiles and labels were sized down
 *     from the earlier loose-glyph treatment (84px image row + 16px label ->
 *     52px tile + 15px label) and the branch arrows shortened 92 -> 76px,
 *     which is where the remaining bottom space comes from.
 *   - The freed vertical space goes to the FlowNode example badges, which
 *     were the first thing to clip when the stage cards were squeezed. The
 *     badge rows are no longer the flex sink: each node's badge group is
 *     content-sized and the role line absorbs slack instead, so every badge
 *     is mounted and visible rather than wrapping past a clipped edge.
 *
 * v5 REVISION (fourth feedback round):
 *   - Every icon badge (`IconChip`, the `DestinationLogo` tiles and the
 *     `EditorPill`s) now carries `SHADOW_BADGE`, a softer/tighter drop than
 *     the 32px blur the big glass tiles use, so each chip lifts off its card
 *     without muddying the stack.
 *   - The X mark was rendering as a near-tile-sized black block: the old
 *     glyph table read x.png as a loose 0.564-mass glyph when a pixel scan
 *     shows its badge fills the canvas edge to edge (0.998). Re-measured all
 *     seven marks and rescaled to a constant 28px apparent ink; X drops
 *     47 -> 28px and is centred by the tile's own flex centering.
 *   - The third Edit-manually destination is labelled "Claude design".
 *   - `BranchArrow` gives its label a real row above the arc instead of
 *     absolutely positioning it over the SVG, so "Edit manually" can no
 *     longer sit on the stroke; it is anchored to the LEFT of its column.
 *     The arc is 54px inside the unchanged 76px total, so the vertical
 *     budget below still holds.
 *
 * v6 REVISION (fifth feedback round — badge/role overlap + label scale):
 *   - FIXED the overlap between the example badges and the role line inside the
 *     Data Foundation and Workflow nodes. The role line was the `flex: 1` sink,
 *     so when a badge group wrapped to three rows the node's content exceeded
 *     the card and the badges rode UP into the role text (GlassTile clips with
 *     `overflow: hidden`, which is why it read as overlap rather than spill).
 *     The role line is now content-sized with `marginBottom: 'auto'`, so the
 *     slack becomes a real gap and the badge group is pinned to the card's
 *     bottom padding. Overlap is structural now, not a tuning question.
 *   - Badge strings shortened rather than downscaled (text size is unchanged at
 *     16px). Three badges were individually WIDER than their own ~181px node
 *     column and so could never lay out cleanly:
 *       infographic-design-agent (243px) -> design-agent
 *       template-manifest.json   (225px) -> manifest.json
 *       infographics-designer    (216px) -> infographics
 *     plus `mandatory components` -> `components`, `local assets only` ->
 *     `local assets`, `carousel-copy-agent` -> `copy-agent`, `slide-agent`
 *     kept, `carousel-designer` -> `carousels`, `generate:design` -> `export`,
 *     `typography` -> `fonts`. Widest badge is now 152px in a 181px column.
 *   - "Publish" and "Edit manually" grew 18 -> 24px. `BranchArrow` total height
 *     goes 76 -> 82 and LABEL_ROW 18 -> 24, so `arcH` stays exactly 54 and the
 *     arrow geometry is untouched; the +6px comes out of the two `flex: 1`
 *     stage cards. Both labels still fit their 260px column (Edit manually
 *     ~193px), and since v5 gave the label its own flex row it cannot reach
 *     the arc's vertical band regardless of width.
 *
 * v7 REVISION (sixth feedback round — CARD HEIGHT):
 *   v6 stopped the badges from riding INTO the role text, but four nodes
 *   (CLAUDE.md, components/, scripts/, Subagents) still clipped: those wrap to
 *   three badge rows, and the measured budget gave each flex StageCard only
 *   ~284px where a 2-line role plus 3 badge rows needs ~336px. The cards were
 *   genuinely too short, so the answer was height, not more word-shortening.
 *   Width alone does NOT help: even at the full 981px a node column is ~208px
 *   and the two widest badges (142 + 152) can never share a row.
 *   Reclaimed 84px from the fixed rows and spent it on the two flex cards:
 *     - Output StageCard: icon + label + badges now ONE inline row instead of
 *       two stacked rows, and its IconChip 46 -> 40.        (-40px)
 *     - DownArrow height 26 -> 18, twice.                   (-16px)
 *     - Shell column gap 10 -> 8 across 6 gaps.             (-12px)
 *     - Shell padding 14/16 -> 12/10.                        (-8px)
 *     - StageCard padding 16/18/18 -> 12/14/14, gap 12 -> 8. (-8px)
 *     - FlowNode padding 14/10/12 -> 10/8/10, gap 8 -> 6.
 *   Data Foundation and Workflow also widen 900 -> 981 (full inner width), so
 *   each node column grows 181 -> 208px and `skills/` drops to two badge rows.
 *   Net: each flex StageCard now gets ~329px against a ~312px worst-case need,
 *   a 17px margin. No font size was reduced anywhere.
 *
 * VERTICAL BUDGET (1350 canvas, 14px top+bottom pad, 22px header/shell/footer
 * gaps):
 *   header ~140 · outer glass shell ~1075 (14 pad + 52 editor strip + 10 gap +
 *   Data Foundation StageCard flex + 26 arrow + Workflow StageCard flex +
 *   26 arrow + Output StageCard content-sized (~118) + 76 branch-arrow row +
 *   ~73 destination logo row (52 tile + 6 gap + 15 label) + internal 10px
 *   gaps) · footer 60.
 *   Data Foundation and Workflow StageCards are flex-1 so they absorb
 *   rounding; every other row is content-sized (no `overflow: hidden` on a
 *   container shorter than its children) so nothing clips.
 *
 * BADGES verified against the repo (skills/, package.json scripts,
 * templates/, .claude/agents/) — see inline comments per node.
 *
 * COPY RULES: no em dashes anywhere in visible text, no all-caps words.
 * Static only — no motion, no `animated` flag in src/modes.js.
 */

import InfographicCanvas from '../../components/infographic/InfographicCanvas.jsx'
import InfographicHeader from '../../components/infographic/InfographicHeader.jsx'
import InfographicFooter from '../../components/infographic/InfographicFooter.jsx'

const FONT_BODY = 'var(--font\\/family\\/body)'
const FONT_TITLE = 'var(--font\\/family\\/title)'
/* Filenames, folders and pnpm scripts are code, not prose — a mono face
   marks them as literal things the reader can go open. No chroma, so
   token-lint safe. */
const FONT_MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
const TRACKING_TITLE = 'var(--font\\/tracking\\/title)'

const C_TEXT = 'var(--theme-color-text-primary)'
const C_TEXT_SEC = 'var(--theme-color-text-secondary)'
const C_ON_PRIMARY = 'var(--theme-color-on-primary)'

/* ── ALL-GLASS tokens for inner tiles ────────────────────────────────────── */
const GLASS_STRONG = 'var(--theme-surface-glass-strong)'
const GLASS_DEFAULT = 'var(--theme-surface-glass-default)'
const GLASS_SOFT = 'var(--theme-surface-glass-soft)'
const BORDER_NEUTRAL = C_ON_PRIMARY
const SHADOW_GLASS = 'var(--theme-shadow-surface-glass)'
/* Softer, tighter drop used on the small icon badges so each chip lifts off
   its card without the heavy 32px blur the big glass tiles carry. */
const SHADOW_BADGE = 'var(--theme-shadow-surface-accent)'

/* Accent chips — colour is confined to icon tiles and badge tints, softened
   against the canvas token so it stays correct on any brand (same helper as
   RepoArchitectureInfographic.jsx). */
const soften = (token, pct) => `color-mix(in oklab, ${token} ${pct}%, var(--theme-surface-canvas))`

const ACCENTS = [1, 2, 3, 4, 5].map((n) => ({
  fill: `var(--theme-accent-${n})`,
  border: `var(--theme-border-${n})`,
  soft: soften(`var(--theme-accent-${n})`, 60),
  softBorder: soften(`var(--theme-border-${n})`, 82),
}))

/* WHITE stage cards (reverting v2's light-blue highlight). The repo's
   generated white/surface token is `--theme-surface-glass-strong`, an
   effectively-opaque near-white (rgba(255,255,255,0.92)) — the same fill
   every other glass tile in this file already uses, so the three stage
   cards now read as plain white cards with a neutral on-primary border,
   not a separate colour treatment. */
const STAGE_FILL = GLASS_STRONG
const STAGE_BORDER = BORDER_NEUTRAL

/* ── Icons ────────────────────────────────────────────────────────────────── */
const ICON_CLAUDE_MD = '/assets/icons/work-office/task-list-clipboard-check--Streamline-Freehand.svg'
const ICON_DESIGN_MD = '/assets/icons/design/color-brush-1--Streamline-Freehand.svg'
const ICON_ASSETS = '/assets/icons/internet-networks/cloud-storage-drive--Streamline-Freehand.svg'
const ICON_COMPONENTS = '/assets/icons/programming-apps-websites/module-three-boxes--Streamline-Freehand.svg'

const ICON_SKILLS = '/assets/icons/design/layers-stacked-1--Streamline-Freehand.svg'
const ICON_SCRIPTS = '/assets/icons/business/settings-cog--Streamline-Freehand.svg'
const ICON_TEMPLATES = '/assets/icons/design/design-tool-magic-wand--Streamline-Freehand.svg'
const ICON_SUBAGENTS = '/assets/icons/programming-apps-websites/programming-user-code--Streamline-Freehand.svg'

const ICON_OUTPUT = '/assets/icons/programming-apps-websites/file-code-share-1--Streamline-Freehand.svg'

/* ── Logos ────────────────────────────────────────────────────────────────── */
const LOGO_CLAUDE_CODE = '/assets/logos/app/Claude-code.png'
const LOGO_CODEX = '/assets/logos/app/codex-color.png'
const LOGO_CURSOR = '/assets/logos/app/cursor.png'

const LOGO_LINKEDIN = '/assets/logos/app/linkedin.svg'
const LOGO_YOUTUBE = '/assets/logos/app/youtube.com.png'
const LOGO_SUBSTACK = '/assets/logos/app/substack.png'
const LOGO_X = '/assets/logos/app/x.png'

const LOGO_FIGMA = '/assets/logos/app/figma.com.png'
const LOGO_CANVA = '/assets/logos/app/canva.com.png'
const LOGO_CLAUDE_DESIGN = '/assets/logos/app/claude.ai.png'

/* ── Glass tile shell ─────────────────────────────────────────────────────── */
function GlassTile({ borderWidth = 2, fill = GLASS_STRONG, borderColor = BORDER_NEUTRAL, radius = 16, children, style }) {
  return (
    <div
      style={{
        borderRadius: radius,
        border: `${borderWidth}px solid ${borderColor}`,
        backgroundColor: fill,
        boxShadow: SHADOW_GLASS,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        minHeight: 0,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ── Small colourful icon chip — the only place hue lives besides badges ──── */
function IconChip({ src, alt, accent, size = 48 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 13,
        background: accent.fill,
        border: `1.5px solid ${accent.border}`,
        boxShadow: SHADOW_BADGE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <img src={src} alt={alt} style={{ width: size - 18, height: size - 18, objectFit: 'contain' }} />
    </div>
  )
}

/* ── Example badge — a real name pulled from the repo, tinted with its
 *    node's own accent. Reused idiom from RepoArchitectureInfographic.jsx. ── */
function ExampleBadge({ accent, children }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: accent.soft,
        border: `1.5px solid ${accent.softBorder}`,
        borderRadius: 40,
        padding: '4px 12px',
        fontFamily: FONT_MONO,
        fontSize: 16,
        fontWeight: 700,
        color: C_TEXT,
        whiteSpace: 'nowrap',
        lineHeight: 1.15,
      }}
    >
      {children}
    </span>
  )
}

/* ── Node used inside the Data Foundation / Workflow stage cards ────────── */
function FlowNode({ iconSrc, accent, name, role, examples }) {
  return (
    <GlassTile radius={16} fill={GLASS_DEFAULT} style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          height: '100%',
          padding: '10px 8px 10px',
          textAlign: 'center',
        }}
      >
        <IconChip src={iconSrc} alt="" accent={accent} size={46} />
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 19,
            fontWeight: 800,
            color: C_TEXT,
            letterSpacing: '-0.2px',
            lineHeight: 1.1,
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: FONT_BODY,
            /* 17px, up from 14px, spending the height reclaimed in v7. 17 is
               the ceiling, not a taste call: at 18px the `assets/` role
               ("Icons, logos and textures, stored locally") wraps to a THIRD
               line in the ~208px node column, which adds ~22px and clips the
               card again. At 17px every role still sets in two lines with
               real margin and the worst card measures ~320 of the ~329px
               available. */
            fontSize: 17,
            fontWeight: 600,
            color: C_TEXT_SEC,
            lineHeight: 1.25,
            /* Content-sized, with the slack pushed BELOW it via marginBottom:
               auto. Previously this line was `flex: 1`, so when the badge
               group wrapped to three rows the flex sink swallowed the
               overflow and the badges rode up into the role text (the outer
               GlassTile clips with overflow: hidden, so it read as overlap).
               Now the free space is a real gap between role and badges. */
            flexShrink: 0,
            marginBottom: 'auto',
            /* Reserve two lines so the four role blocks share a baseline and
               the icon/name rows above them line up across the columns. It is
               a minimum, not a cap: a face wider than measured may take a
               third line, and the badge group below stays content-sized, so
               it grows into the card's own slack instead of clipping. */
            minHeight: 17 * 1.25 * 2,
          }}
        >
          {role}
        </span>
        {/* Content-sized, NOT flex-1: the badges are the payload of this
            node (every one names a real thing on disk), so the role line
            above absorbs any slack and the badges always render in full. */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            /* 7px, up from 5px. This single value is BOTH the horizontal gap
               between badges and the vertical gap between wrapped rows, so it
               costs height: at 3 badge rows, 7px leaves ~5px of card slack
               while 10px would overrun. No node gains an extra row from it --
               every wrap point here is decided by badge width, not the gap. */
            gap: 7,
            rowGap: 6,
            justifyContent: 'center',
            alignContent: 'flex-start',
            flexShrink: 0,
            marginTop: 6,
          }}
        >
          {examples.map((e) => (
            <ExampleBadge key={e} accent={accent}>
              {e}
            </ExampleBadge>
          ))}
        </div>
      </div>
    </GlassTile>
  )
}

/* ── Stage card — the white, centered wrapper shared by Data Foundation,
 *    Workflow and Output. Centering it inside a max-width column (rather
 *    than full-bleed) reads as a card sitting on the canvas, not an
 *    edge-to-edge band. Data Foundation and Workflow stretch via the
 *    parent's `flex: 1`; Output is left content-sized (no forced height)
 *    so wrapping badges can never clip against a guessed pixel number. ─── */
function StageCard({ title, maxWidth = 900, children, style }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', ...style }}>
      <GlassTile
        radius={22}
        fill={STAGE_FILL}
        borderColor={STAGE_BORDER}
        borderWidth={3}
        style={{ width: '100%', maxWidth, minHeight: 0 }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            padding: '12px 14px 14px',
            flex: 1,
            minHeight: 0,
          }}
        >
          <span
            style={{
              fontFamily: FONT_TITLE,
              fontSize: 24,
              fontWeight: 800,
              color: C_TEXT,
              letterSpacing: '-0.4px',
              lineHeight: 1,
            }}
          >
            {title}
          </span>
          {children}
        </div>
      </GlassTile>
    </div>
  )
}

/* ── Plain down arrow connecting two stacked stage cards — solid, centered,
 *    no dashes. ───────────────────────────────────────────────────────── */
function DownArrow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 18, flexShrink: 0 }}>
      <svg width="22" height="24" viewBox="0 0 22 24" fill="none" style={{ flexShrink: 0 }}>
        <line x1="11" y1="0" x2="11" y2="12" stroke={C_TEXT} strokeWidth="3" strokeLinecap="round" />
        <polygon points="1,10 21,10 11,23" fill={C_TEXT} />
      </svg>
    </div>
  )
}

/* ── Branch arrow: Output -> Publish (left) or Output -> Edit manually
 *    (right). Redrawn so the path clearly starts at the Output card's
 *    bottom edge (top of this component, centered) and fans out to end
 *    with an arrowhead pointing straight down at the destination logo
 *    group below. Solid stroke, no dashes. The "Publish" / "Edit manually"
 *    wording now lives ONLY here — there is no destination card heading
 *    anymore. ───────────────────────────────────────────────────────── */
function BranchArrow({ direction, label }) {
  const isLeft = direction === 'left'
  const w = 260
  // Total height stays 76 so the vertical budget in this file's header
  // comment still holds; the label row and its gap are carved OUT of that
  // 76 rather than added to it, so the arc is 76 - 18 - 4 = 54 tall.
  // 82 total (was 76): the label row grew 18 -> 24 to fit the larger 24px
  // type, and the 6px went onto the total rather than being taken out of the
  // arc, so `arcH` stays exactly 54 and the arrow geometry is untouched.
  const h = 82
  const LABEL_ROW = 24
  const LABEL_GAP = 4
  const arcH = h - LABEL_ROW - LABEL_GAP
  // Starts centered at the top (directly under Output's bottom edge),
  // curves out to isLeft ? left : right, and lands vertically so the
  // arrowhead points straight down onto the destination group.
  const startX = w / 2
  const endX = isLeft ? 34 : w - 34
  const path = `M ${startX} 0 C ${startX} ${arcH * 0.45}, ${endX} ${arcH * 0.35}, ${endX} ${arcH - 14}`
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: w, height: h, flexShrink: 0 }}>
      {/* The label gets its OWN ROW above the arrow instead of being absolutely
          positioned on top of it. Overlap is then structurally impossible
          rather than a matter of picking offsets that clear the stroke.
          Previously both labels were pinned inside the SVG's box at top: 6,
          and "Edit manually" (the widest string here, ~135px) at right: 10
          spanned x 115 to 250 while the right curve passes through x 131 to
          162 in exactly that vertical band — so the text sat on the stroke.
          Each label now hugs the outer edge of its own column: Publish on
          the right (its arrow exits left), Edit manually on the LEFT. */}
      <div
        style={{
          display: 'flex',
          justifyContent: isLeft ? 'flex-end' : 'flex-start',
          alignItems: 'center',
          height: LABEL_ROW,
          flexShrink: 0,
          marginBottom: LABEL_GAP,
        }}
      >
        <span
          style={{
            fontFamily: FONT_TITLE,
            fontSize: 24,
            fontWeight: 800,
            color: C_TEXT,
            whiteSpace: 'nowrap',
            lineHeight: 1,
          }}
        >
          {label}
        </span>
      </div>
      <svg width={w} height={arcH} viewBox={`0 0 ${w} ${arcH}`} fill="none" style={{ flexShrink: 0, display: 'block' }}>
        <path d={path} stroke={C_TEXT} strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Arrowhead pointing straight down at the destination group */}
        <polygon points={`${endX - 9},${arcH - 14} ${endX + 9},${arcH - 14} ${endX},${arcH - 1}`} fill={C_TEXT} />
      </svg>
    </div>
  )
}

/* ── Destination logo tile — used by BOTH the Publish and the Edit manually
 *    groups so the two branches read at exactly the same size. Every mark now
 *    sits in an IDENTICAL rounded square (one `TILE` box, one radius, one
 *    soft shadow, one neutral border), so the row reads as a set of chips
 *    rather than seven loose glyphs. Both groups lay out horizontally.
 *
 *    `glyph` is the size of the IMAGE INSIDE the tile, not the tile itself —
 *    the tile is constant. See the optical-equalization note below. ─────── */
const TILE = 52

function DestinationLogo({ src, alt, label, glyph }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 0 }}>
      <div
        style={{
          width: TILE,
          height: TILE,
          borderRadius: 14,
          background: GLASS_DEFAULT,
          border: `1.5px solid ${BORDER_NEUTRAL}`,
          boxShadow: SHADOW_BADGE,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <img src={src} alt={alt} style={{ width: glyph, height: glyph, objectFit: 'contain', display: 'block' }} />
      </div>
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 15,
          fontWeight: 600,
          color: C_TEXT,
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  )
}

/*
 * Optical-equalization pass, rescaled for the uniform tile.
 *
 * `object-fit: contain` guarantees equal BOX size, not equal INK size, so each
 * `glyph` is sized to hold the geometric mean of that file's own ink extents,
 * sqrt(w * h), constant. Apparent visual MASS is what matches; a wide mark
 * stays wide. Ink ratios measured by a raw-pixel bounding-box scan of each
 * file against its own background (and via the clipPath geometry for the
 * LinkedIn SVG):
 *
 *   x.png          1600x1600  ink 0.998 x 0.998  mass 0.998  (solid black
 *                  badge — the glyph fills its canvas edge to edge)
 *   canva.com.png    64x64    ink 0.984 x 0.984  mass 0.984  (round badge)
 *   substack.png   2500x2500  ink 0.876 x 0.998  mass 0.935
 *   linkedin.svg    375x375   ink ~0.808 x 0.808 mass 0.808  (rounded badge)
 *   figma.com.png    64x64    ink 0.609 x 0.922  mass 0.750
 *   claude.ai.png    64x64    ink 0.672 x 0.672  mass 0.672
 *   youtube.com.png  64x64    ink 0.703 x 0.516  mass 0.602
 *
 * Target apparent ink 28px inside the 52px tile:
 *     x         mass 0.998 -> 28px   (was 47px: that number came from an
 *               earlier mis-measurement that read the badge as a loose glyph,
 *               so X rendered as a near-tile-sized black block beside marks
 *               half its weight. 28px leaves an even 12px of white on all
 *               four sides and the square is centred by the tile's own
 *               flex centering.)
 *     canva     mass 0.984 -> 28px
 *     substack  mass 0.935 -> 30px
 *     linkedin  mass 0.808 -> 35px
 *     figma     mass 0.750 -> 37px
 *     claude    mass 0.672 -> 42px
 *     youtube   mass 0.602 -> 47px  (ink 33x24, wide as the mark truly is)
 * Every glyph stays inside the 52px tile with breathing room.
 */
const PUBLISH_LOGOS = [
  { src: LOGO_LINKEDIN, alt: 'LinkedIn', label: 'LinkedIn', glyph: 35 },
  { src: LOGO_YOUTUBE, alt: 'YouTube', label: 'YouTube', glyph: 47 },
  { src: LOGO_SUBSTACK, alt: 'Substack', label: 'Substack', glyph: 30 },
  { src: LOGO_X, alt: 'X', label: 'X', glyph: 28 },
]

const EDIT_LOGOS = [
  { src: LOGO_FIGMA, alt: 'Figma', label: 'Figma', glyph: 37 },
  { src: LOGO_CANVA, alt: 'Canva', label: 'Canva', glyph: 28 },
  { src: LOGO_CLAUDE_DESIGN, alt: 'Claude', label: 'Claude design', glyph: 42 },
]

/* ── Editor logo pill for the top-left strip inside the outer glass shell ── */
function EditorPill({ src, alt, label }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        background: GLASS_DEFAULT,
        border: `1.5px solid ${BORDER_NEUTRAL}`,
        borderRadius: 40,
        padding: '8px 18px 8px 10px',
        boxShadow: SHADOW_BADGE,
      }}
    >
      <img src={src} alt={alt} style={{ width: 28, height: 28, objectFit: 'contain', flexShrink: 0 }} />
      <span style={{ fontFamily: FONT_TITLE, fontSize: 18, fontWeight: 800, color: C_TEXT, whiteSpace: 'nowrap', lineHeight: 1 }}>
        {label}
      </span>
    </div>
  )
}

export default function AiDesignSystemInfographic() {
  return (
    <InfographicCanvas>
      <div
        className="flex flex-col items-center relative shrink-0 w-[981px]"
        style={{ gap: 22, paddingTop: 14, paddingBottom: 14, height: '100%' }}
        data-name="Main"
      >
        {/* HEADER */}
        <InfographicHeader
          title="The AI Design System Architecture"
          highlightWord="Design System"
          subtitle="Works with Claude Code, Codex, Cursor"
          titleStyle={{ fontSize: '46px', letterSpacing: TRACKING_TITLE }}
          subtitleStyle={{ fontSize: '20px', letterSpacing: TRACKING_TITLE }}
          className="flex-none"
        />

        {/* OUTER GLASS SHELL — a plain rounded glass rectangle with the same
            white border treatment as the section tiles inside it. The old
            "Design System Repo" brand header bar is gone: it cost 51px of
            vertical space and only restated the infographic title. */}
        <div className="w-full flex-1" style={{ minHeight: 0 }}>
          <GlassTile
            radius={26}
            fill={GLASS_SOFT}
            borderColor={BORDER_NEUTRAL}
            borderWidth={3}
            style={{ width: '100%', height: '100%' }}
          >
            <div
              style={{
                width: '100%',
                flex: 1,
                minHeight: 0,
                padding: '12px 10px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {/* Editor logo strip — top-left corner of the glass box */}
              <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                <EditorPill src={LOGO_CLAUDE_CODE} alt="Claude Code" label="Claude Code" />
                <EditorPill src={LOGO_CODEX} alt="Codex" label="Codex" />
                <EditorPill src={LOGO_CURSOR} alt="Cursor" label="Cursor" />
              </div>

              {/* Data Foundation — white stage card, centered */}
              <StageCard title="Data Foundation" maxWidth={981} style={{ flex: 1, minHeight: 0 }}>
                <div style={{ display: 'flex', gap: 12, flex: 1, minHeight: 0 }}>
                  <FlowNode
                    iconSrc={ICON_CLAUDE_MD}
                    accent={ACCENTS[0]}
                    name="CLAUDE.md"
                    role="The rulebook every agent reads first"
                    examples={['canvas size', 'local assets', 'components']}
                  />
                  <FlowNode
                    iconSrc={ICON_DESIGN_MD}
                    accent={ACCENTS[1]}
                    name="DESIGN.md"
                    role="The only file holding brand colors and fonts"
                    examples={['colors', 'fonts', 'spacing']}
                  />
                  <FlowNode
                    iconSrc={ICON_ASSETS}
                    accent={ACCENTS[2]}
                    name="assets/"
                    role="Icons, logos and textures, stored locally"
                    examples={['icons', 'logos', 'textures']}
                  />
                  <FlowNode
                    iconSrc={ICON_COMPONENTS}
                    accent={ACCENTS[3]}
                    name="components/"
                    role="Shared blocks reused across every format"
                    examples={['Canvas', 'GlassSection', 'Checklist']}
                  />
                </div>
              </StageCard>

              {/* Arrow */}
              <DownArrow />

              {/* Workflow — white stage card, centered */}
              <StageCard title="Workflow" maxWidth={981} style={{ flex: 1, minHeight: 0 }}>
                <div style={{ display: 'flex', gap: 12, flex: 1, minHeight: 0 }}>
                  <FlowNode
                    iconSrc={ICON_SKILLS}
                    accent={ACCENTS[0]}
                    name="skills/"
                    role="How to build each format, step by step"
                    examples={['infographics', 'carousels', 'pptx']}
                  />
                  <FlowNode
                    iconSrc={ICON_SCRIPTS}
                    accent={ACCENTS[4]}
                    name="scripts/"
                    role="Sync tokens, validate, export files"
                    examples={['design:sync', 'tokens:lint', 'export']}
                  />
                  <FlowNode
                    iconSrc={ICON_TEMPLATES}
                    accent={ACCENTS[2]}
                    name="templates/"
                    role="Reusable structures for carousels"
                    examples={['manifest.json', 'carousels']}
                  />
                  <FlowNode
                    iconSrc={ICON_SUBAGENTS}
                    accent={ACCENTS[1]}
                    name="Subagents"
                    role="Specialized agents that own one format each"
                    examples={['design-agent', 'slide-agent', 'copy-agent']}
                  />
                </div>
              </StageCard>

              {/* Arrow */}
              <DownArrow />

              {/* Output — same white StageCard treatment, centered, content
                  sized now that the iteration loop no longer reserves space
                  beside it. Icon+label on one row, badges wrap freely on a
                  row below so nothing can clip against a guessed height. */}
              <StageCard title="Output" maxWidth={520} style={{ flexShrink: 0 }}>
                {/* ONE row: icon, label and badges inline. This was two stacked
                    rows (icon+label, then badges), which cost ~40px of fixed
                    height that the two flex StageCards above needed in order to
                    fit their third badge row. Output has only four short
                    badges, so it reads fine on a single line. */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <IconChip src={ICON_OUTPUT} alt="" accent={ACCENTS[3]} size={40} />
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 22,
                      fontWeight: 800,
                      color: C_TEXT,
                      letterSpacing: '-0.2px',
                      lineHeight: 1,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Design/
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'center' }}>
                    {['Infographic', 'Carousel', 'Slides', 'Thumbnail'].map((e) => (
                      <ExampleBadge key={e} accent={ACCENTS[3]}>
                        {e}
                      </ExampleBadge>
                    ))}
                  </div>
                </div>
              </StageCard>

              {/* Branch row — arrows originate at Output's bottom edge and
                  point down to the two logo groups below. */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 220, flexShrink: 0 }}>
                <BranchArrow direction="left" label="Publish" />
                <BranchArrow direction="right" label="Edit manually" />
              </div>

              {/* Publish / Edit manually — logos and names directly on the
                  canvas, no destination cards. Both groups are horizontal
                  rows at the same logo scale, so this band is one line of
                  marks instead of a 4-wide group beside a 3-tall column. */}
              <div style={{ display: 'flex', gap: 24, flexShrink: 0, alignItems: 'flex-start' }}>
                <div style={{ flex: 4, display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                  {PUBLISH_LOGOS.map((l) => (
                    <DestinationLogo key={l.alt} src={l.src} alt={l.alt} label={l.label} glyph={l.glyph} />
                  ))}
                </div>
                <div style={{ flex: 3, display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                  {EDIT_LOGOS.map((l) => (
                    <DestinationLogo key={l.alt} src={l.src} alt={l.alt} label={l.label} glyph={l.glyph} />
                  ))}
                </div>
              </div>
            </div>
          </GlassTile>
        </div>

        {/* FOOTER */}
        <InfographicFooter className="h-[60px] relative shrink-0 w-[1048px] flex-none" />
      </div>
    </InfographicCanvas>
  )
}
