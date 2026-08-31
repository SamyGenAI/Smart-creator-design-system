/**
 * GtmSystemInfographic — 1080×1350px LinkedIn infographic.
 * Topic: "GTM Repository System"
 *
 * LAYOUT:
 *   Header
 *   ── READS spine ──────────────────────────────────
 *   Card /context   (228px)
 *   Card /inputs    (228px)
 *   Row  /skills + CLAUDE.md  (156px)
 *   ── RUNS spine ───────────────────────────────────
 *   Card /scripts   (228px)
 *   ── WRITES spine ─────────────────────────────────
 *   Card /outputs   (156px)
 *   Footer
 */

import InfographicCanvas from '../../components/InfographicCanvas.jsx'
import InfographicHeader from '../../components/InfographicHeader.jsx'
import InfographicFooter from '../../components/InfographicFooter.jsx'

const FONT_BODY  = 'var(--font\\/family\\/body)'
const FONT_TITLE = 'var(--font\\/family\\/title)'
const FONT_MONO  = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

const C_TEXT     = 'var(--theme-color-text-primary)'
const C_TEXT_SEC = 'var(--theme-color-text-secondary)'
const C_BRAND    = 'var(--theme-color-primary)'
const C_ON_BRAND = 'var(--theme-color-on-primary)'

const ACCENT_1 = 'var(--theme-accent-1)'
const ACCENT_2 = 'var(--theme-accent-2)'
const ACCENT_3 = 'var(--theme-accent-3)'
const ACCENT_4 = 'var(--theme-accent-4)'
const ACCENT_5 = 'var(--theme-accent-5)'

const BORDER_1 = 'var(--theme-border-1)'
const BORDER_2 = 'var(--theme-border-2)'
const BORDER_3 = 'var(--theme-border-3)'
const BORDER_4 = 'var(--theme-border-4)'
const BORDER_5 = 'var(--theme-border-5)'

const SHADOW_CARD = 'var(--theme-shadow-card)'

/* ── Icon paths ─────────────────────────────────────────────────────────── */
const ICON_CONTEXT = '/assets/icons/business/edit-pen-write-paper--Streamline-Freehand.svg'
const ICON_INPUTS  = '/assets/icons/internet-networks/cloud-data-transfer--Streamline-Freehand.svg'
const ICON_SKILLS  = '/assets/icons/design/design-tool-magic-wand--Streamline-Freehand.svg'
const ICON_CLAUDE  = '/assets/icons/design/notes-paper--Streamline-Freehand.svg'
const ICON_SCRIPTS = '/assets/icons/programming-apps-websites/file-code-share-1--Streamline-Freehand.svg'
const ICON_OUTPUTS = '/assets/icons/data/analytics-graph-bar-horizontal--Streamline-Freehand.svg'

/* ── Tag pill ───────────────────────────────────────────────────────────── */
function Tag({ children, accent }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center',
      background: accent, borderRadius: 40, padding: '8px 18px',
      fontFamily: FONT_TITLE, fontSize: 18, fontWeight: 800,
      color: C_TEXT, letterSpacing: '0.2px', whiteSpace: 'nowrap',
      lineHeight: 1, boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    }}>
      {children}
    </div>
  )
}

/* ── Slug line ──────────────────────────────────────────────────────────── */
function Slug({ children, accent }) {
  return (
    <div style={{
      fontFamily: FONT_MONO, fontSize: 15, fontWeight: 700,
      color: accent, lineHeight: 1.45, whiteSpace: 'nowrap',
    }}>
      {children}
    </div>
  )
}

/* ── Section card ───────────────────────────────────────────────────────── */
function SectionCard({ number, title, iconSrc, headerBg, borderColor, cardBg, children }) {
  return (
    <div style={{
      width: '100%', height: '100%', borderRadius: 20,
      border: `1.5px solid ${borderColor}`, backgroundColor: cardBg,
      boxShadow: SHADOW_CARD, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Header bar */}
      <div style={{
        height: 62, flexShrink: 0, backgroundColor: headerBg,
        borderBottom: `1.5px solid ${borderColor}`,
        display: 'flex', alignItems: 'center',
        paddingLeft: 10, paddingRight: 16, gap: 12,
      }}>
        {/* Number badge */}
        <div style={{
          width: 44, height: 44, borderRadius: 10, background: C_TEXT,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
        }}>
          <span style={{ fontFamily: FONT_TITLE, fontSize: 28, fontWeight: 900, color: C_ON_BRAND, lineHeight: 1 }}>{number}</span>
        </div>

        {/* Title */}
        <span style={{
          fontFamily: FONT_TITLE, fontSize: 28, fontWeight: 800,
          color: C_TEXT, letterSpacing: '-0.6px', lineHeight: 1, flex: 1,
        }}>{title}</span>

        {/* Icon */}
        <img src={iconSrc} alt="" style={{ width: 38, height: 38, objectFit: 'contain', flexShrink: 0, filter: 'brightness(0)' }} />
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '12px 14px', display: 'flex', alignItems: 'stretch', minHeight: 0 }}>
        {children}
      </div>
    </div>
  )
}

/* ── Card body — terminal + desc/tags ───────────────────────────────────── */
function CardBody({ slugs, slugAccent, description, tags, tagAccent }) {
  return (
    <div style={{ display: 'flex', gap: 14, width: '100%', alignItems: 'stretch' }}>
      {/* Terminal tile */}
      <div style={{
        flexShrink: 0, width: 270, background: '#000000', borderRadius: 12,
        padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 4,
        border: `1.5px solid ${slugAccent}`,
      }}>
        <div style={{ display: 'flex', gap: 5, marginBottom: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT_5 }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT_3 }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT_2 }} />
        </div>
        {slugs.map((s) => <Slug key={s} accent={slugAccent}>{s}</Slug>)}
      </div>

      {/* Right: description + tags */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
        <p style={{ margin: 0, fontFamily: FONT_BODY, fontSize: 17, fontWeight: 600, color: C_TEXT_SEC, lineHeight: 1.55 }}>
          {description}
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tags.map((t) => <Tag key={t} accent={tagAccent}>{t}</Tag>)}
        </div>
      </div>
    </div>
  )
}

/* ── Spine segment ──────────────────────────────────────────────────────── */
function SpineSegment({ height, lineColor, label }) {
  return (
    <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexShrink: 0 }}>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: lineColor, boxShadow: '0 0 8px rgba(0,0,0,0.25)', flexShrink: 0 }} />
        <div style={{ flex: 1, width: 3, background: lineColor, opacity: 0.8 }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: lineColor, boxShadow: '0 0 8px rgba(0,0,0,0.25)', flexShrink: 0 }} />
      </div>
      <div style={{
        background: C_BRAND, borderRadius: 12, padding: '14px 11px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 24px rgba(0,0,0,0.40)',
      }}>
        <span style={{
          writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)',
          fontFamily: FONT_TITLE, fontSize: 18, fontWeight: 900, letterSpacing: '3px',
          color: C_ON_BRAND, textTransform: 'uppercase', lineHeight: 1, whiteSpace: 'nowrap',
        }}>{label}</span>
      </div>
    </div>
  )
}

/* ── File tree node ─────────────────────────────────────────────────────── */
function FileNode({ name, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, opacity: 0.45 }}>
        <path d="M4 2V10C4 11.1 4.9 12 6 12H14" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <path d="M14 2H6C5.4 2 5 2.4 5 3V21C5 21.6 5.4 22 6 22H18C18.6 22 19 21.6 19 21V7L14 2Z" stroke={accent} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 2V7H19" stroke={accent} strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
      <span style={{ fontFamily: FONT_MONO, fontSize: 14, fontWeight: 600, color: accent, whiteSpace: 'nowrap' }}>{name}</span>
    </div>
  )
}

/* ── Half-card shared header ────────────────────────────────────────────── */
function HalfCardHeader({ number, title, iconSrc, headerBg, borderColor }) {
  return (
    <div style={{
      height: 62, flexShrink: 0, backgroundColor: headerBg,
      borderBottom: `1.5px solid ${borderColor}`,
      display: 'flex', alignItems: 'center',
      paddingLeft: 10, paddingRight: 16, gap: 12,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10, background: C_TEXT,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
      }}>
        <span style={{ fontFamily: FONT_TITLE, fontSize: 28, fontWeight: 900, color: C_ON_BRAND, lineHeight: 1 }}>{number}</span>
      </div>
      <span style={{ fontFamily: FONT_TITLE, fontSize: 28, fontWeight: 800, color: C_TEXT, letterSpacing: '-0.6px', lineHeight: 1, flex: 1 }}>{title}</span>
      <img src={iconSrc} alt="" style={{ width: 38, height: 38, objectFit: 'contain', flexShrink: 0, filter: 'brightness(0)' }} />
    </div>
  )
}

/* ── Read row: /skills + CLAUDE.md side by side ─────────────────────────── */
function ReadRow() {
  const ROW_H = 156
  const skillCol1 = ['enrich-leads', 'export-leads', 'find-leads']
  const skillCol2 = ['post-engagers', 'score-leads']

  const claudeBadges = [
    { label: '/context', accent: ACCENT_1 },
    { label: '/inputs',  accent: ACCENT_4 },
    { label: '/scripts', accent: ACCENT_5 },
    { label: '/outputs', accent: ACCENT_2 },
  ]

  const halfCard = (borderColor, bg) => ({
    flex: 1, height: ROW_H, borderRadius: 20,
    border: `1.5px solid ${borderColor}`, backgroundColor: bg,
    boxShadow: SHADOW_CARD, overflow: 'hidden',
    display: 'flex', flexDirection: 'column', flexShrink: 0,
  })

  return (
    <div style={{ display: 'flex', gap: 22, width: '100%', height: 156, flexShrink: 0 }}>

      {/* /skills */}
      <div style={halfCard(BORDER_1, 'var(--theme-surface-layer-4)')}>
        <HalfCardHeader number="3" title="/skills" iconSrc={ICON_SKILLS} headerBg={ACCENT_1} borderColor={BORDER_1} />
        <div style={{ flex: 1, background: '#000', padding: '0 16px', display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Folder root */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M3 7C3 5.9 3.9 5 5 5H10L12 7H19C20.1 7 21 7.9 21 9V18C21 19.1 20.1 20 19 20H5C3.9 20 3 19.1 3 18V7Z" stroke={BORDER_1} strokeWidth="1.8" />
            </svg>
            <span style={{ fontFamily: FONT_MONO, fontSize: 13, fontWeight: 700, color: BORDER_1 }}>/skills</span>
          </div>
          <div style={{ width: 1, alignSelf: 'stretch', margin: '10px 0', background: BORDER_1, opacity: 0.2, flexShrink: 0 }} />
          {/* Col 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {skillCol1.map((f) => <FileNode key={f} name={f} accent={BORDER_1} />)}
          </div>
          {/* Col 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {skillCol2.map((f) => <FileNode key={f} name={f} accent={BORDER_1} />)}
          </div>
        </div>
      </div>

      {/* CLAUDE.md */}
      <div style={halfCard(BORDER_3, 'var(--theme-surface-layer-3)')}>
        <HalfCardHeader number="4" title="CLAUDE.md" iconSrc={ICON_CLAUDE} headerBg={ACCENT_3} borderColor={BORDER_3} />
        <div style={{ flex: 1, padding: '0 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <p style={{ margin: 0, fontFamily: FONT_BODY, fontSize: 15, fontWeight: 600, color: C_TEXT_SEC, lineHeight: 1.5 }}>
            Master rules file : tells Claude which folders to read, run, and write.
          </p>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {claudeBadges.map(({ label, accent }) => (
              <div key={label} style={{
                display: 'inline-flex', alignItems: 'center', background: accent,
                borderRadius: 40, padding: '6px 14px',
                fontFamily: FONT_TITLE, fontSize: 15, fontWeight: 800,
                color: C_TEXT, whiteSpace: 'nowrap', lineHeight: 1,
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              }}>{label}</div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

/* ── Main ───────────────────────────────────────────────────────────────── */

const GAP    = 22
const CARD_H = { context: 228, inputs: 228, readrow: 156, scripts: 228, outputs: 210 }

const SPINE_READS_H  = CARD_H.context + GAP + CARD_H.inputs + GAP + CARD_H.readrow
const SPINE_RUNS_H   = CARD_H.scripts
const SPINE_WRITES_H = CARD_H.outputs

export default function GtmSystemInfographic() {
  return (
    <InfographicCanvas>
      <div
        className="flex flex-col items-center relative shrink-0 w-[981px]"
        style={{ gap: GAP, paddingTop: 24, paddingBottom: 24 }}
        data-name="Main"
      >
        {/* HEADER */}
        <style>{`
          @keyframes float-cw {
            0%   { transform: translateY(0px)   rotate(-6deg); }
            50%  { transform: translateY(-8px)  rotate(-3deg); }
            100% { transform: translateY(0px)   rotate(-6deg); }
          }
          @keyframes float-ccw {
            0%   { transform: translateY(0px)   rotate(6deg); }
            50%  { transform: translateY(-8px)  rotate(3deg); }
            100% { transform: translateY(0px)   rotate(6deg); }
          }
        `}</style>
        <div className="shrink-0 w-full" style={{ display: 'flex', alignItems: 'center', gap: 24, justifyContent: 'center' }}>
          {/* Claude Code logo */}
          <div style={{
            width: 96, height: 96, borderRadius: 22, background: '#ffffff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            filter: 'drop-shadow(0 8px 24px rgba(204,90,60,0.70))',
            animation: 'float-cw 3.6s ease-in-out infinite',
          }}>
            <img src="/assets/logos/app/claude_code_logo.png" alt="Claude Code" style={{ width: 80, height: 80, objectFit: 'contain' }} />
          </div>

          <InfographicHeader
            title="GTM Repository System"
            highlightWord="GTM"
            subtitle="Context in. Scored leads out."
            titleStyle={{ fontSize: '54px', letterSpacing: '-1.8px' }}
            subtitleStyle={{ fontSize: '20px', letterSpacing: '-0.4px' }}
            allowWrap
            className="flex-1"
          />

          {/* Codex logo */}
          <img
            src="/assets/logos/app/codex-color.png"
            alt="Codex"
            style={{
              width: 96, height: 96, objectFit: 'contain', flexShrink: 0,
              filter: 'drop-shadow(0 8px 24px rgba(100,100,255,0.45))',
              animation: 'float-ccw 3.6s ease-in-out infinite 0.5s',
            }}
          />
        </div>

        {/* CARDS + SPINE */}
        <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', gap: GAP, flexShrink: 0 }}>

          {/* Spine — absolute right side */}
          <div style={{
            position: 'absolute', right: 0, top: 0, width: 82,
            height: SPINE_READS_H + GAP + SPINE_RUNS_H + GAP + SPINE_WRITES_H,
            display: 'flex', flexDirection: 'column', zIndex: 10, pointerEvents: 'none',
          }}>
            <SpineSegment height={SPINE_READS_H}  lineColor={BORDER_1} label="Reads" />
            <div style={{ height: GAP, flexShrink: 0 }} />
            <SpineSegment height={SPINE_RUNS_H}   lineColor={BORDER_5} label="Runs" />
            <div style={{ height: GAP, flexShrink: 0 }} />
            <SpineSegment height={SPINE_WRITES_H} lineColor={BORDER_2} label="Writes" />
          </div>

          {/* Card 1 — /context */}
          <div style={{ width: 878, height: CARD_H.context, flexShrink: 0 }}>
            <SectionCard number="1" title="/context" iconSrc={ICON_CONTEXT}
              headerBg={ACCENT_1} borderColor={BORDER_1} cardBg="var(--theme-surface-layer-4)">
              <CardBody
                slugs={['competitor-radar.md', 'icp-definition.md', 'positioning.md', 'profile.md']}
                slugAccent={BORDER_1}
                description="Your knowledge folder : ICP, positionning, main competitors, and your LinkedIn profile. This context is the foundation of your lead generation system."
                tags={['ICP', 'Positioning', 'LinkedIn profile data']}
                tagAccent={ACCENT_1}
              />
            </SectionCard>
          </div>

          {/* Card 2 — /inputs */}
          <div style={{ width: 878, height: CARD_H.inputs, flexShrink: 0 }}>
            <SectionCard number="2" title="/inputs" iconSrc={ICON_INPUTS}
              headerBg={ACCENT_4} borderColor={BORDER_4} cardBg="var(--theme-surface-layer-2)">
              <CardBody
                slugs={['crm-export.csv', 'clay-list.csv', 'sales-nav-list.csv', 'linkedin-connections.csv']}
                slugAccent={BORDER_4}
                description="Lead lists you already have : CRM extracts, Clay tables, your Linkedin connections as CSV, Sales Nav export... Every qualified lead is a data point that can be enriched or that we can learn from. "
                tags={['CRM', 'Clay', 'Sales Nav', 'LinkedIn']}
                tagAccent={ACCENT_4}
              />
            </SectionCard>
          </div>

          {/* Row 3+4 — /skills + CLAUDE.md */}
          <div style={{ width: 878, flexShrink: 0 }}>
            <ReadRow />
          </div>

          {/* Card 5 — /scripts */}
          <div style={{ width: 878, height: CARD_H.scripts, flexShrink: 0 }}>
            <SectionCard number="5" title="/scripts" iconSrc={ICON_SCRIPTS}
              headerBg={ACCENT_5} borderColor={BORDER_5} cardBg="var(--theme-surface-layer-6)">
              <CardBody
                slugs={['score-leads.js', 'enrich-leads.js', 'scrape-linkedin.js', 'export-csv.js']}
                slugAccent={BORDER_5}
                description="Deterministic, repeatable workflows. Each script reads /context and /inputs, then writes to /outputs. The scripts are used by the skils to : find, score, enrich and export leads."
                tags={['Scoring', 'Enrichment', 'Scraping', 'Export']}
                tagAccent={ACCENT_5}
              />
            </SectionCard>
          </div>

          {/* Card 6 — /outputs */}
          <div style={{ width: 878, height: CARD_H.outputs, flexShrink: 0 }}>
            <SectionCard number="6" title="/outputs" iconSrc={ICON_OUTPUTS}
              headerBg={ACCENT_2} borderColor={BORDER_2} cardBg="var(--theme-surface-layer-5)">
              <CardBody
                slugs={['scored-leads.csv', 'enriched-leads.csv', 'export-ready.csv']}
                slugAccent={BORDER_2}
                description="Final deliverables: scored and enriched CSVs ready to import into your CRM or sequencer."
                tags={['Scored leads', 'Enriched leads', 'CSV format']}
                tagAccent={ACCENT_2}
              />
            </SectionCard>
          </div>

        </div>

        {/* FOOTER */}
        <InfographicFooter className="h-[60px] relative shrink-0 w-[1048px]" />
      </div>
    </InfographicCanvas>
  )
}
