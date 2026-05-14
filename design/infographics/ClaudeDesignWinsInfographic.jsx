/**
 * ClaudeDesignWinsInfographic — 1080×1350px LinkedIn infographic.
 * Topic: 5 things Claude Design does that Canva, Figma AI, and Stitch don't.
 *
 * Angle: contrarian-feature hybrid. Frames Claude Design's 5 differentiators as
 * "unfair advantages" against the field. Uses inline SVG diagrams so the file is
 * self-contained (no asset path dependencies).
 *
 * LAYOUT (heights):
 *   Header   ~170px max — 2-line title with highlight, italic subtitle
 *   gap       22px
 *   Row 1    150px  — Hero hook (981, glass, 3 stat pills)
 *   gap       22px
 *   Row 2    310px  — #1 Reads codebase (482, primary/solid)
 *                     #2 Custom tweak knobs (482, glass)
 *   gap       22px
 *   Row 3    310px  — #3 Web capture (482, support/solid)
 *                     #4 Native Canva handoff (482, success/white)
 *   gap       22px
 *   Row 4    246px  — #5 Multi-system + vs-the-field strip (981, accent/solid)
 *   gap       22px
 *   Footer    60px
 *   Total: ~1350px (vertically centered if a few px under)
 *
 * Adjacent header-color check (no two adjacent rows share treatment):
 *   Row 1: glass         · Row 2L: primary  · Row 2R: glass    ✓
 *   Row 2R: glass        · Row 3L: support  · Row 3R: success  ✓
 *   Row 3R: success      · Row 4: accent                       ✓
 */

import InfographicCanvas from '../../components/InfographicCanvas.jsx'
import InfographicHeader from '../../components/InfographicHeader.jsx'
import InfographicFooter from '../../components/InfographicFooter.jsx'
import BrandBorderSectionBase from '../../components/BrandBorderSectionBase.jsx'
import PrimaryGlassSection from '../../components/PrimaryGlassSection.jsx'
import TextBox from '../../components/TextBox.jsx'
import { CREATOR_DISPLAY_NAME } from '../../src/creatorIdentity.js'

const GLASS_CARD = 'col-1 ml-0 mt-0 row-1'
const FONT_BODY = 'var(--font\\/family\\/body)'
const FONT_TITLE = 'var(--font\\/family\\/title)'

export default function ClaudeDesignWinsInfographic() {
  return (
    <InfographicCanvas data-name="ClaudeDesignWinsInfographic">
      <div
        className="content-stretch flex flex-col gap-[22px] h-full items-center justify-center relative shrink-0 w-[981px]"
        data-name="Main"
      >
        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <div className="max-h-[180px] overflow-hidden shrink-0 w-full">
          <InfographicHeader
            title="Claude Design's 5 unfair advantages"
            highlightWord="unfair"
            subtitle="What it does that Canva, Figma AI & Stitch don't"
            allowWrap
            titleStyle={{ fontSize: '60px', letterSpacing: '-1.8px' }}
            subtitleStyle={{ fontSize: '24px', letterSpacing: '-0.72px' }}
          />
        </div>

        {/* ── ROW 1 — Hero hook (981×150, full-width glass) ─────────────────── */}
        <div
          className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
          data-name="Row 1"
        >
          <PrimaryGlassSection
            title="Apr 17, 2026 — built on Opus 4.7"
            className={`${GLASS_CARD} h-[150px] w-[981px]`}
            titleSize="22px"
          >
            <div className="flex flex-col flex-1 w-full gap-3 justify-center items-center px-[14px] pb-[8px] min-h-0 overflow-hidden">
              <p
                className="font-medium text-[14px] text-text-primary leading-snug tracking-[-0.42px] text-center px-2"
                style={{ fontFamily: FONT_BODY }}
              >
                Most AI design tools restyle. Claude Design rewires how design
                <span style={{ fontWeight: 700 }}> starts</span> — and that's where every other tool stops.
              </p>
              <div className="flex flex-row flex-wrap items-center justify-center gap-2">
                <TextBox text="Apr 17, 2026" color="var(--theme-accent-1)" />
                <TextBox text="Opus 4.7" color="var(--theme-accent-3)" />
                <TextBox text="Pro · Max · Team · Enterprise" color="var(--theme-accent-2)" />
                <TextBox text="claude.ai/design" color="var(--theme-accent-4)" />
              </div>
            </div>
          </PrimaryGlassSection>
        </div>

        {/* ── ROW 2 — #1 Reads codebase (482) | #2 Tweak knobs (482) ────────── */}
        <div
          className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
          data-name="Row 2"
        >
          {/* #1 — Reads your codebase (primary/solid, the killer differentiator) */}
          <div className="col-1 ml-0 mt-0 relative row-1">
            <BrandBorderSectionBase
              theme="primary"
              variant="solid"
              title="Reads your codebase"
              number="1"
              widthClass="w-[482px]"
              heightClass="h-[310px]"
            >
              <CardBody
                diagram={<CodebaseToTokens />}
                why="On onboarding, Claude scans your repo and design files to extract colors, type, and components."
                vs="Canva: pick presets · Figma AI: paste hex"
              />
            </BrandBorderSectionBase>
          </div>

          {/* #2 — Custom tweak knobs (glass, extensibility) */}
          <div className="col-1 ml-[499px] mt-0 relative row-1">
            <PrimaryGlassSection
              title="Custom tweak knobs"
              className={`${GLASS_CARD} h-[310px] w-[482px]`}
              titleSize="22px"
            >
              <NumberedGlassBody
                number="2"
                diagram={<TweakPanel />}
                why="Ask Claude for any property — glow, radius, dark-mode toggle. The panel is built on demand."
                vs="Other tools ship one fixed panel and call it done."
              />
            </PrimaryGlassSection>
          </div>
        </div>

        {/* ── ROW 3 — #3 Web capture (482) | #4 Canva handoff (482) ─────────── */}
        <div
          className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
          data-name="Row 3"
        >
          {/* #3 — Web capture (support/solid) */}
          <div className="col-1 ml-0 mt-0 relative row-1">
            <BrandBorderSectionBase
              theme="support"
              variant="solid"
              title="Web capture import"
              number="3"
              widthClass="w-[482px]"
              heightClass="h-[310px]"
            >
              <CardBody
                diagram={<WebCapture />}
                why="Point Claude at any live URL. It pulls real DOM elements, so prototypes match the real product."
                vs="Others stop at static screenshots and approximations."
              />
            </BrandBorderSectionBase>
          </div>

          {/* #4 — Native Canva handoff (success/white) */}
          <div className="col-1 ml-[499px] mt-0 relative row-1">
            <BrandBorderSectionBase
              theme="success"
              variant="white"
              title="Native Canva handoff"
              number="4"
              widthClass="w-[482px]"
              heightClass="h-[310px]"
            >
              <CardBody
                diagram={<ClaudeToCanva />}
                why="Send a design straight into Canva — fully editable. Anthropic's framing: ideate in Claude, polish in Canva."
                vs="Other tools position as Canva replacements; Claude doesn't."
              />
            </BrandBorderSectionBase>
          </div>
        </div>

        {/* ── ROW 4 — #5 Multi-system + vs-the-field strip (981, accent/solid) */}
        <div
          className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
          data-name="Row 4"
        >
          <BrandBorderSectionBase
            theme="accent"
            variant="solid"
            title="Multiple brand systems, kept clean"
            number="5"
            widthClass="w-[981px]"
            heightClass="h-[246px]"
          >
            <MultiSystemBody />
          </BrandBorderSectionBase>
        </div>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <InfographicFooter
          avatarSrc="/assets/avatar/avatar-profile.png"
          name={CREATOR_DISPLAY_NAME}
          className="h-[60px] relative shrink-0 w-[1048px]"
        />
      </div>
    </InfographicCanvas>
  )
}

/* ── Shared body layouts ────────────────────────────────────────────────── */

/** Card body for BrandBorderSectionBase: diagram on top, why + vs underneath. */
function CardBody({ diagram, why, vs }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 4,
      }}
    >
      <div style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {diagram}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', paddingBottom: 2 }}>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 12.5,
            fontWeight: 600,
            color: 'var(--theme-color-text-primary)',
            lineHeight: 1.35,
            textAlign: 'center',
            margin: 0,
          }}
        >
          {why}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: 10.5,
              fontWeight: 600,
              color: 'var(--theme-color-text-secondary)',
              lineHeight: 1.3,
              textAlign: 'center',
              fontStyle: 'italic',
              backgroundColor: 'var(--theme-surface-glass-strong)',
              padding: '3px 9px',
              borderRadius: 999,
              border: '1px solid var(--theme-color-text-secondary)',
            }}
          >
            vs · {vs}
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * Body for PrimaryGlassSection cards (glass section doesn't have a number badge),
 * so we render a small number chip top-right inside the body.
 */
function NumberedGlassBody({ number, diagram, why, vs }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 14px 8px',
        position: 'relative',
        boxSizing: 'border-box',
        minHeight: 0,
      }}
    >
      {/* Number chip */}
      <div
        style={{
          position: 'absolute',
          top: 6,
          right: 8,
          width: 30,
          height: 30,
          borderRadius: 6,
          background: 'var(--theme-color-text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT_TITLE,
          fontSize: 16,
          fontWeight: 700,
          color: 'var(--theme-color-on-primary)',
        }}
      >
        {number}
      </div>

      <div style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {diagram}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', paddingBottom: 2 }}>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 12.5,
            fontWeight: 600,
            color: 'var(--theme-color-text-primary)',
            lineHeight: 1.35,
            textAlign: 'center',
            margin: 0,
          }}
        >
          {why}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: 10.5,
              fontWeight: 600,
              color: 'var(--theme-color-text-secondary)',
              lineHeight: 1.3,
              textAlign: 'center',
              fontStyle: 'italic',
              backgroundColor: 'var(--theme-surface-glass-strong)',
              padding: '3px 9px',
              borderRadius: 999,
              border: '1px solid var(--theme-color-text-secondary)',
            }}
          >
            vs · {vs}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── #1 diagram — Codebase {} → extracted brand system ─────────────────── */
function CodebaseToTokens() {
  return (
    <svg
      viewBox="0 0 380 140"
      width="380"
      height="140"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ fontFamily: FONT_BODY }}
    >
      <defs>
        <marker id="arrTokens" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--theme-color-text-primary)" />
        </marker>
      </defs>

      {/* Repo card */}
      <rect
        x="6" y="35" width="100" height="70" rx="8"
        fill="var(--theme-surface-glass-strong)"
        stroke="var(--theme-color-text-primary)"
        strokeWidth="1.5"
      />
      <text x="56" y="62" textAnchor="middle" fontSize="22" fontWeight="800" fill="var(--theme-color-primary)">{'{ }'}</text>
      <text x="56" y="82" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--theme-color-text-primary)">your repo</text>
      <text x="56" y="95" textAnchor="middle" fontSize="8" fontWeight="500" fill="var(--theme-color-text-secondary)">+ design files</text>

      {/* Arrow */}
      <line x1="111" y1="70" x2="148" y2="70" stroke="var(--theme-color-text-primary)" strokeWidth="2" markerEnd="url(#arrTokens)" />
      <text x="129" y="62" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--theme-color-primary)">scan</text>

      {/* Output: brand system panel */}
      <rect
        x="152" y="14" width="222" height="112" rx="10"
        fill="var(--theme-color-primary)"
      />
      <text x="263" y="32" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--theme-color-on-primary)">Your brand system</text>

      {/* Color row */}
      <text x="163" y="56" fontSize="8" fontWeight="600" fill="var(--theme-color-on-primary)" opacity="0.7">colors</text>
      <circle cx="208" cy="53" r="9" fill="var(--theme-accent-1)" stroke="var(--theme-color-on-primary)" strokeWidth="1" />
      <circle cx="230" cy="53" r="9" fill="var(--theme-accent-2)" stroke="var(--theme-color-on-primary)" strokeWidth="1" />
      <circle cx="252" cy="53" r="9" fill="var(--theme-accent-3)" stroke="var(--theme-color-on-primary)" strokeWidth="1" />
      <circle cx="274" cy="53" r="9" fill="var(--theme-accent-4)" stroke="var(--theme-color-on-primary)" strokeWidth="1" />
      <circle cx="296" cy="53" r="9" fill="var(--theme-accent-5)" stroke="var(--theme-color-on-primary)" strokeWidth="1" />

      {/* Type row */}
      <text x="163" y="80" fontSize="8" fontWeight="600" fill="var(--theme-color-on-primary)" opacity="0.7">type</text>
      <text x="208" y="84" fontSize="20" fontWeight="800" fill="var(--theme-color-on-primary)">Aa</text>
      <text x="240" y="83" fontSize="11" fontWeight="500" fill="var(--theme-color-on-primary)" opacity="0.85">— Title / Body</text>

      {/* Components row */}
      <text x="163" y="106" fontSize="8" fontWeight="600" fill="var(--theme-color-on-primary)" opacity="0.7">comps</text>
      <rect x="205" y="96" width="40" height="16" rx="4" fill="var(--theme-accent-1)" />
      <text x="225" y="107" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--theme-color-text-primary)">Button</text>
      <rect x="252" y="96" width="40" height="16" rx="4" fill="var(--theme-accent-3)" />
      <text x="272" y="107" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--theme-color-text-primary)">Card</text>
      <rect x="299" y="96" width="44" height="16" rx="4" fill="var(--theme-accent-2)" />
      <text x="321" y="107" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--theme-color-text-primary)">Avatar</text>
    </svg>
  )
}

/* ── #2 diagram — Tweak panel with sliders + "ask Claude" add knob ─────── */
function TweakPanel() {
  return (
    <svg
      viewBox="0 0 320 150"
      width="320"
      height="150"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ fontFamily: FONT_BODY }}
    >
      {/* Panel background */}
      <rect
        x="50" y="6" width="220" height="138" rx="12"
        fill="var(--theme-surface-glass-strong)"
        stroke="var(--theme-color-primary)"
        strokeWidth="2"
      />
      <text x="160" y="24" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--theme-color-text-primary)">Tweaks</text>

      {/* Slider 1: Glow */}
      <text x="64" y="49" fontSize="10" fontWeight="700" fill="var(--theme-color-text-secondary)">Glow</text>
      <line x1="106" y1="46" x2="252" y2="46" stroke="var(--theme-color-text-secondary)" strokeWidth="2" opacity="0.25" />
      <line x1="106" y1="46" x2="178" y2="46" stroke="var(--theme-color-primary)" strokeWidth="2.5" />
      <circle cx="178" cy="46" r="6" fill="var(--theme-color-primary)" />

      {/* Slider 2: Radius */}
      <text x="64" y="73" fontSize="10" fontWeight="700" fill="var(--theme-color-text-secondary)">Radius</text>
      <line x1="106" y1="70" x2="252" y2="70" stroke="var(--theme-color-text-secondary)" strokeWidth="2" opacity="0.25" />
      <line x1="106" y1="70" x2="222" y2="70" stroke="var(--theme-color-primary)" strokeWidth="2.5" />
      <circle cx="222" cy="70" r="6" fill="var(--theme-color-primary)" />

      {/* Toggle: Dark mode */}
      <text x="64" y="97" fontSize="10" fontWeight="700" fill="var(--theme-color-text-secondary)">Dark</text>
      <rect x="210" y="88" width="44" height="18" rx="9" fill="var(--theme-accent-2)" stroke="var(--theme-color-primary)" strokeWidth="1.5" />
      <circle cx="245" cy="97" r="6" fill="var(--theme-color-primary)" />

      {/* + Add knob button */}
      <rect
        x="86" y="117" width="148" height="22" rx="11"
        fill="var(--theme-accent-3)"
        stroke="var(--theme-color-primary)"
        strokeWidth="1.5"
        strokeDasharray="3 2"
      />
      <text x="160" y="132" textAnchor="middle" fontSize="10" fontWeight="800" fill="var(--theme-color-text-primary)">+ ask Claude for any knob</text>
    </svg>
  )
}

/* ── #3 diagram — Live URL → real DOM components ───────────────────────── */
function WebCapture() {
  return (
    <svg
      viewBox="0 0 380 140"
      width="380"
      height="140"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ fontFamily: FONT_BODY }}
    >
      <defs>
        <marker id="arrCapture" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--theme-color-text-primary)" />
        </marker>
      </defs>

      {/* Browser window */}
      <rect
        x="10" y="20" width="150" height="100" rx="8"
        fill="var(--theme-surface-glass-strong)"
        stroke="var(--theme-color-text-primary)"
        strokeWidth="1.5"
      />
      {/* URL bar */}
      <rect x="16" y="26" width="138" height="16" rx="4" fill="var(--theme-accent-1)" />
      <circle cx="24" cy="34" r="2" fill="var(--theme-color-text-primary)" />
      <text x="36" y="38" fontSize="9" fontWeight="700" fill="var(--theme-color-text-primary)">stripe.com</text>

      {/* Page mock */}
      <rect x="20" y="50" width="90" height="6" rx="2" fill="var(--theme-color-text-primary)" opacity="0.55" />
      <rect x="20" y="62" width="68" height="6" rx="2" fill="var(--theme-color-text-primary)" opacity="0.3" />
      <rect x="20" y="80" width="50" height="22" rx="4" fill="var(--theme-accent-2)" />
      <text x="45" y="94" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--theme-color-text-primary)">Buy</text>
      <rect x="78" y="80" width="74" height="22" rx="4" fill="var(--theme-accent-3)" />
      <text x="115" y="94" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--theme-color-text-primary)">Pricing</text>

      {/* Arrow */}
      <line x1="167" y1="70" x2="206" y2="70" stroke="var(--theme-color-text-primary)" strokeWidth="2" markerEnd="url(#arrCapture)" />
      <text x="186" y="62" textAnchor="middle" fontSize="9" fontWeight="800" fill="var(--theme-color-primary)">capture</text>

      {/* Output: extracted real components */}
      <text x="290" y="20" textAnchor="middle" fontSize="9" fontWeight="800" fill="var(--theme-color-text-primary)">real DOM elements</text>

      <rect x="216" y="28" width="68" height="22" rx="5" fill="var(--theme-color-primary)" />
      <text x="250" y="42" textAnchor="middle" fontSize="9" fontWeight="800" fill="var(--theme-color-on-primary)">{'<Button>'}</text>

      <rect x="294" y="28" width="74" height="22" rx="5" fill="var(--theme-accent-3)" stroke="var(--theme-color-text-primary)" strokeWidth="1" />
      <text x="331" y="42" textAnchor="middle" fontSize="9" fontWeight="800" fill="var(--theme-color-text-primary)">{'<Card>'}</text>

      <rect x="216" y="58" width="152" height="58" rx="6" fill="var(--theme-surface-glass-strong)" stroke="var(--theme-color-text-primary)" strokeWidth="1" />
      <rect x="225" y="68" width="90" height="6" rx="2" fill="var(--theme-color-text-primary)" opacity="0.6" />
      <rect x="225" y="80" width="65" height="5" rx="2" fill="var(--theme-color-text-primary)" opacity="0.4" />
      <rect x="225" y="95" width="48" height="14" rx="4" fill="var(--theme-accent-1)" />
      <text x="249" y="105" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--theme-color-text-primary)">primary</text>
      <rect x="278" y="95" width="48" height="14" rx="4" fill="var(--theme-accent-4)" />
      <text x="302" y="105" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--theme-color-text-primary)">ghost</text>
    </svg>
  )
}

/* ── #4 diagram — Claude → Canva handoff ───────────────────────────────── */
function ClaudeToCanva() {
  return (
    <svg
      viewBox="0 0 380 140"
      width="380"
      height="140"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ fontFamily: FONT_BODY }}
    >
      <defs>
        <marker id="arrHandoff" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--theme-color-text-primary)" />
        </marker>
      </defs>

      {/* Claude box */}
      <rect
        x="14" y="28" width="130" height="84" rx="12"
        fill="var(--theme-color-primary)"
      />
      <text x="79" y="55" textAnchor="middle" fontSize="16" fontWeight="800" fill="var(--theme-color-on-primary)">Claude</text>
      <text x="79" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--theme-color-on-primary)" opacity="0.9">Design</text>
      <rect x="34" y="84" width="90" height="20" rx="6" fill="var(--theme-accent-1)" />
      <text x="79" y="98" textAnchor="middle" fontSize="9" fontWeight="800" fill="var(--theme-color-text-primary)">→ ideate</text>

      {/* Arrow + handoff label */}
      <line x1="150" y1="70" x2="226" y2="70" stroke="var(--theme-color-text-primary)" strokeWidth="2.5" markerEnd="url(#arrHandoff)" />
      <text x="188" y="62" textAnchor="middle" fontSize="10" fontWeight="800" fill="var(--theme-color-text-primary)">handoff</text>
      <text x="188" y="86" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--theme-color-text-secondary)">PDF · PPTX · link</text>

      {/* Canva box */}
      <rect
        x="234" y="28" width="130" height="84" rx="12"
        fill="var(--theme-accent-2)"
        stroke="var(--theme-color-text-primary)"
        strokeWidth="2"
      />
      <text x="299" y="55" textAnchor="middle" fontSize="16" fontWeight="800" fill="var(--theme-color-text-primary)">Canva</text>
      <text x="299" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--theme-color-text-primary)">Editable</text>
      <rect x="254" y="84" width="90" height="20" rx="6" fill="var(--theme-color-primary)" />
      <text x="299" y="98" textAnchor="middle" fontSize="9" fontWeight="800" fill="var(--theme-color-on-primary)">→ polish</text>

      {/* Footer caption */}
      <text x="190" y="130" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--theme-color-text-secondary)">complement, not compete</text>
    </svg>
  )
}

/* ── Row 4 body — multi-system left + vs-the-field strip right ──────────── */
function MultiSystemBody() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        gap: 16,
        alignItems: 'stretch',
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      {/* Left: description + multi-brand visual */}
      <div
        style={{
          flex: '0 0 320px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--theme-color-text-primary)',
            lineHeight: 1.35,
            textAlign: 'center',
            margin: 0,
          }}
        >
          Teams maintain <span style={{ fontWeight: 800 }}>more than one</span> design system in parallel — each refined over time. Critical for agencies and sub-brands.
        </p>
        <MultiBrandStack />
      </div>

      {/* Right: vs-the-field strip */}
      <div
        style={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: FONT_TITLE,
            fontSize: 12,
            fontWeight: 800,
            color: 'var(--theme-color-text-secondary)',
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
            paddingLeft: 8,
            marginBottom: 2,
          }}
        >
          vs the field
        </div>
        <VsRow tool="Figma AI" take="Style picker, paste hex" highlight={false} />
        <VsRow tool="Canva" take="Brand kits, manual setup" highlight={false} />
        <VsRow tool="Stitch / Make" take="Template-based, fixed knobs" highlight={false} />
        <VsRow tool="Claude Design" take="Code-aware brand, extensible knobs, multi-system" highlight={true} />
      </div>
    </div>
  )
}

/** Compact stack of 3 mini brand cards with swatches — the "multi-system" visual. */
function MultiBrandStack() {
  const brands = [
    { label: 'Brand A', swatches: ['var(--theme-accent-1)', 'var(--theme-accent-3)', 'var(--theme-color-primary)'] },
    { label: 'Brand B', swatches: ['var(--theme-accent-2)', 'var(--theme-accent-5)', 'var(--theme-color-text-primary)'] },
    { label: 'Brand C', swatches: ['var(--theme-accent-4)', 'var(--theme-accent-1)', 'var(--theme-color-text-secondary)'] },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'stretch' }}>
      {brands.map((b, i) => (
        <div
          key={i}
          style={{
            flex: '0 0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            padding: '6px 8px',
            borderRadius: 8,
            background: 'var(--theme-surface-glass-strong)',
            border: '1px solid var(--theme-color-text-primary)',
          }}
        >
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: 10,
              fontWeight: 800,
              color: 'var(--theme-color-text-primary)',
              letterSpacing: '0.2px',
            }}
          >
            {b.label}
          </span>
          <div style={{ display: 'flex', gap: 3 }}>
            {b.swatches.map((s, j) => (
              <span
                key={j}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  background: s,
                  border: '1px solid var(--theme-color-text-primary)',
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/** A single row in the "vs the field" strip. */
function VsRow({ tool, take, highlight }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 10px',
        borderRadius: 8,
        background: highlight ? 'var(--theme-color-primary)' : 'var(--theme-surface-glass-strong)',
        border: highlight ? '1.5px solid var(--theme-color-text-primary)' : '1px solid var(--theme-color-text-secondary)',
      }}
    >
      <div
        style={{
          minWidth: 130,
          maxWidth: 130,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <span
          style={{
            fontFamily: FONT_TITLE,
            fontSize: 12,
            fontWeight: 800,
            color: highlight ? 'var(--theme-color-on-primary)' : 'var(--theme-color-text-primary)',
            letterSpacing: '-0.2px',
          }}
        >
          {tool}
        </span>
      </div>
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 12,
          fontWeight: 600,
          color: highlight ? 'var(--theme-color-on-primary)' : 'var(--theme-color-text-primary)',
          lineHeight: 1.3,
          flex: '1 1 auto',
        }}
      >
        {take}
      </span>
      <span
        style={{
          fontFamily: FONT_TITLE,
          fontSize: 13,
          fontWeight: 800,
          color: highlight ? 'var(--theme-accent-2)' : 'var(--theme-color-text-secondary)',
        }}
      >
        {highlight ? '✓' : '–'}
      </span>
    </div>
  )
}
