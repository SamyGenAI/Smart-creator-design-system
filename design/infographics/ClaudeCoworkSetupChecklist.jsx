/**
 * ClaudeCoworkSetupChecklist — 1080×1350px LinkedIn infographic.
 * Bento-grid layout: 8 cards (2 cols × 4 rows) — one per setup phase.
 */

import { useState, useEffect } from 'react'
import InfographicHeader from '../../components/InfographicHeader.jsx'
import InfographicFooter from '../../components/InfographicFooter.jsx'

const COLOR_PRIMARY = 'var(--theme-color-primary)'
const TEXT_PRIMARY = 'var(--theme-color-primary)'
const BACKGROUND_PRIMARY = 'var(--theme-surface-canvas)'
const SURFACE_ELEVATED = 'var(--theme-color-on-primary)'
const SURFACE_GLASS = 'var(--theme-surface-glass-soft)'
const SURFACE_GLASS_STRONG = 'var(--theme-surface-glass-strong)'
const SHADOW_SOFT = 'var(--theme-shadow-card-soft)'
const SHADOW_CARD = 'var(--theme-shadow-card)'

// ── WhiteIcon — fetches SVG and replaces all fills/strokes with white ─────────
// This ensures Figma export sees actual white paths instead of relying on
// CSS filter (brightness/invert) which Figma's capture ignores.

function WhiteIcon({ src, size = 30 }) {
  const [svgContent, setSvgContent] = useState(null)
  useEffect(() => {
    fetch(src)
      .then(r => r.text())
      .then(text => {
        const white = text
          .replace(/fill="[^"]*"/g, 'fill="white"')
          .replace(/stroke="[^"]*"/g, 'stroke="white"')
          .replace(/fill:[^;}"]+/g, 'fill:white')
          .replace(/stroke:[^;}"]+/g, 'stroke:white')
        setSvgContent(white)
      })
  }, [src])
  if (!svgContent) return <div style={{ width: size, height: size }} />
  return (
    <div
      style={{ width: size, height: size, flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: svgContent
        .replace(/<svg/, `<svg width="${size}" height="${size}"`) }}
    />
  )
}

// ── ChecklistItem ─────────────────────────────────────────────────────────────

function CheckItem({ text, small = false }) {
  const fontSize = 13
  return (
    <div className="flex items-start" style={{ gap: 10 }}>
      <div
        style={{
          width: 13,
          height: 13,
          marginTop: 3,
          flexShrink: 0,
          border: `2.5px solid ${COLOR_PRIMARY}`,
          borderRadius: 2,
          background: 'transparent',
        }}
      />
      <span
        style={{
          fontFamily: "var(--font\/family\/title, 'Montserrat', sans-serif)",
          fontWeight: 600,
          fontSize,
          color: TEXT_PRIMARY,
          lineHeight: 1.35,
        }}
      >
        {text}
      </span>
    </div>
  )
}

// ── App logo grid (inspired by Grid8CompanyLogos) ────────────────────────────
// Renders logos as white rounded cards stacked vertically in a 2-col grid,
// ordered top-to-bottom matching the checklist bullet order (left col first).

function AppLogos({ logos }) {
  const SIZE = 64
  return (
    <div style={{ flexShrink: 0, display: 'grid', gridTemplateColumns: `${SIZE}px ${SIZE}px`, gridTemplateRows: `${SIZE}px ${SIZE}px`, gap: 8 }}>
      {logos.map((src, i) => (
        <div
          key={i}
          style={{
            width: SIZE, height: SIZE,
            background: SURFACE_ELEVATED,
            borderRadius: 12,
            boxShadow: SHADOW_SOFT,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 6,
          }}
        >
          <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      ))}
    </div>
  )
}

// ── PhaseCard ─────────────────────────────────────────────────────────────────

function PhaseCard({ title, time, iconSrc, items, small = false, logos, illustration }) {
  return (
    <div
      style={{
        background: SURFACE_GLASS,
        border: `4px solid ${SURFACE_ELEVATED}`,
        borderRadius: 20,
        boxShadow: SHADOW_CARD,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
      data-name="phase-card"
      data-node-id="22:324"
    >
      {/* Primary header bar */}
      <div
        style={{
          background: COLOR_PRIMARY,
          borderRadius: '17px 17px 0 0',
          height: 54,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 12,
          paddingRight: 12,
          gap: 9,
        }}
      >
        <WhiteIcon src={iconSrc} size={30} />
        <span
          style={{
            fontFamily: "var(--font\/family\/title, 'Montserrat', sans-serif)",
            fontWeight: 700,
            fontSize: 20,
            color: 'white',
            letterSpacing: '-0.3px',
            flex: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </span>
        {/* White/primary time pill */}
        <div
          style={{
            background: SURFACE_GLASS_STRONG,
            borderRadius: 5,
            padding: '3px 8px',
            flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: "var(--font\/family\/title, 'Montserrat', sans-serif)", fontWeight: 700, fontSize: 13, color: TEXT_PRIMARY, whiteSpace: 'nowrap' }}>
            {time}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '12px 14px',
          gap: 12,
          overflow: 'hidden',
        }}
      >
        {/* Checklist items — fills available width */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: small ? 7 : 10,
            overflow: 'hidden',
          }}
        >
          {items.map((item, i) => (
            <CheckItem key={i} text={item} small={small} />
          ))}
        </div>

        {/* Right-side logo grid */}
        {logos && <AppLogos logos={logos} />}

        {/* Right-side illustration */}
        {illustration && (
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={illustration.src} alt="" style={{ width: illustration.size, height: illustration.size, objectFit: 'contain' }} />
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ClaudeCoworkSetupChecklist() {
  const phases = [
    {
      title: 'Step 1 : Connect Tools',
      time: '15 min',
      iconSrc: '/assets/icons/programming-apps-websites/plugin-jigsaw-puzzle--Streamline-Freehand.svg',
      small: true,
      items: [
        'Install Productivity plugin',
        'Install Memory plugin',
        'Connect Slack',
        'Connect Gmail',
        'Connect Google Calendar',
        'Connect Notion',
      ],
      // Order matches bullet points 3-6: Slack, Gmail, Google Calendar, Notion
      logos: [
        '/assets/logos/app/slack.com.png',           // Connect Slack
        '/assets/logos/app/google-gmail.png',         // Connect Gmail
        '/assets/logos/app/google-calendar.png',      // Connect Google Calendar
        '/assets/logos/app/notion.com.png',           // Connect Notion
      ],
    },
    {
      title: 'Step 2 : about-me.md',
      time: '20 min',
      iconSrc: '/assets/icons/work-office/job-profile-search--Streamline-Freehand.svg',
      items: [
        'Your name and current role',
        'What you\'re building right now',
        'Top 3 priorities this quarter',
        'How you prefer to work daily',
      ],
      illustration: { src: '/assets/illustrations/notion-style/oc-taking-note.svg', size: 110 },
    },
    {
      title: 'Step 3 : brand-voice.md',
      time: '30 min',
      iconSrc: '/assets/icons/design/content-typewriter--Streamline-Freehand.svg',
      items: [
        '3 phrases you always use',
        '3 phrases you never want used',
        'Tone by context (casual / formal)',
        '2–3 writing samples as examples',
      ],
      illustration: { src: '/assets/illustrations/notion-style/oc-lighthouse.svg', size: 110 },
    },
    {
      title: 'Step 4 : working-preferences.md',
      time: '15 min',
      iconSrc: '/assets/icons/business/settings-cog--Streamline-Freehand.svg',
      items: [
        'Output format defaults (.docx, md)',
        '"Always ask before deleting"',
        '"Show your plan before executing"',
        'Your biggest workflow pain points',
      ],
      illustration: { src: '/assets/illustrations/notion-style/oc-work-balance.svg', size: 110 },
    },
    {
      title: 'Step 5 : content-strategy.md',
      time: '20 min',
      iconSrc: '/assets/icons/business/edit-pen-write-paper--Streamline-Freehand.svg',
      items: [
        'Platforms you post content on',
        'Posting cadence per platform',
        'Content formats you use',
        'Link existing skill files',
      ],
      illustration: { src: '/assets/illustrations/notion-style/oc-target.svg', size: 110 },
    },
    {
      title: 'Step 6 : team-members.md',
      time: '10 min',
      iconSrc: '/assets/icons/work-office/collaboration-team-chat--Streamline-Freehand.svg',
      items: [
        'Key people and their specific roles',
        'Communication preferences per person',
        'Connected tools per team member',
      ],
      illustration: { src: '/assets/illustrations/notion-style/oc-handshake.svg', size: 110 },
    },
    {
      title: 'Step 7 : Projects folder',
      time: '15 min',
      iconSrc: '/assets/icons/work-office/task-list-clipboard-check--Streamline-Freehand.svg',
      items: [
        'Create a dedicated /projects folder',
        'One .md file per active project',
        'Include: goal, deadline, and status',
      ],
      illustration: { src: '/assets/illustrations/notion-style/oc-project-development.svg', size: 110 },
    },
    {
      title: 'Step 8 : Memory + Skills',
      time: 'ongoing',
      iconSrc: '/assets/icons/programming-apps-websites/database--Streamline-Freehand.svg',
      items: [
        'Create CLAUDE.md (master context)',
        'Build /memory folder + glossary.md',
        'Skill file for every recurring output',
        'Include: format, voice rules, examples',
      ],
      illustration: { src: '/assets/illustrations/notion-style/oc-growing.svg', size: 110 },
    },
  ]

  return (
    <div
      className="flex items-center justify-center relative"
      style={{ width: '1080px', height: '1350px', flexShrink: 0, overflow: 'hidden', background: BACKGROUND_PRIMARY }}
      data-name="ClaudeCoworkSetupChecklist"
    >
      {/* Background texture — full opacity image, visible on cream bg */}
      <img
        src="/assets/textures/light-squares.png"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 1,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }}
      />

      <div
        className="flex flex-col h-full items-center relative"
        style={{ width: 981, paddingTop: 28, paddingBottom: 28 }}
      >
        {/* ── HEADER ── */}
        <div className="flex-none shrink-0 w-full">
          <InfographicHeader
            title="Claude Cowork quick setup"
            highlightWord="Cowork"
            allowWrap={true}
            titleClassName="text-[52px] font-bold tracking-[-1.5px] leading-[1.05] px-[24px]"
          />
        </div>

        {/* ── BENTO GRID ── */}
        <div
          className="flex-1 w-full"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'repeat(4, 1fr)',
            gap: 10,
            marginTop: 14,
            marginBottom: 14,
          }}
        >
          {phases.map((phase, i) => (
            <PhaseCard
              key={i}
              title={phase.title}
              time={phase.time}
              iconSrc={phase.iconSrc}
              items={phase.items}
              small={phase.small}
              logos={phase.logos}
              illustration={phase.illustration}
            />
          ))}
        </div>

        {/* ── FOOTER ── */}
        <div className="flex-none shrink-0">
          <InfographicFooter
            avatarSrc="/assets/avatar/avatar-profile.png"
            name="Samy Chouaf"
            className="h-[60px] relative w-[1048px]"
          />
        </div>
      </div>
    </div>
  )
}
