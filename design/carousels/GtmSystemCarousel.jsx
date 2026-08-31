import { CarouselNavbarEdge, CarouselSlideShell } from '../../components/CarouselPrimitives.jsx'
import { CREATOR_DISPLAY_NAME } from '../../src/creatorIdentity.js'

/**
 * LinkedIn Carousel — "Build Your GTM System on Claude Code"
 * 8 slides: Cover + 6 Layers + CTA
 * 1080×1350px · tokenized · Montserrat
 */

const CARD_SHADOW = 'var(--theme-shadow-card)'
const TEXT_PRIMARY = 'var(--theme-color-text-primary)'
const TEXT_SECONDARY = 'var(--theme-color-text-secondary)'
const BACKGROUND_PRIMARY = 'var(--theme-surface-canvas)'
const SURFACE_CARD = 'var(--theme-color-on-primary)'
const FONT = "var(--font\\/family\\/title, 'Montserrat', sans-serif)"
const BRAND_BG = 'var(--color\\/bg\\/brand)'
const ON_PRIMARY = 'var(--theme-color-on-primary)'
const ACCENT_1 = 'var(--theme-accent-1)'
const ACCENT_2 = 'var(--theme-accent-2)'
const ACCENT_3 = 'var(--theme-accent-3)'
const ACCENT_4 = 'var(--theme-accent-4)'
const ACCENT_5 = 'var(--theme-accent-5)'

const NAVBAR = <CarouselNavbarEdge textColor={TEXT_PRIMARY} fontFamily={FONT} />

function Slide({ children, nodeId, name, withNavbar = true, bg = BACKGROUND_PRIMARY }) {
  return (
    <CarouselSlideShell
      nodeId={nodeId}
      name={name}
      withNavbar={withNavbar}
      navbar={NAVBAR}
      background={bg}
      fontFamily={FONT}
    >
      {children}
    </CarouselSlideShell>
  )
}

function LayerBadge({ number, label, bg = ACCENT_1 }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: 16, background: BRAND_BG,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: ON_PRIMARY, lineHeight: 1 }}>{number}</span>
      </div>
      <div style={{
        background: bg, borderRadius: 12, padding: '10px 20px',
      }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: TEXT_PRIMARY, lineHeight: '34px' }}>{label}</span>
      </div>
    </div>
  )
}

function TerminalBlock({ lines, accentColor = ACCENT_3 }) {
  return (
    <div style={{
      background: '#1a1a2e', borderRadius: 16, padding: '20px 24px',
      boxSizing: 'border-box', boxShadow: CARD_SHADOW,
    }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#27c93f' }} />
      </div>
      {lines.map((line, i) => (
        <p key={i} style={{
          margin: 0, fontSize: 22, fontWeight: 500, lineHeight: '34px',
          color: line.accent ? accentColor : '#e0e0e0',
          fontFamily: FONT,
        }}>
          {line.text}
        </p>
      ))}
    </div>
  )
}

function Chip({ label, bg = ACCENT_1 }) {
  return (
    <div style={{
      background: bg, borderRadius: 40, padding: '8px 20px', display: 'inline-flex',
    }}>
      <span style={{ fontSize: 20, fontWeight: 600, color: TEXT_PRIMARY, lineHeight: '24px' }}>{label}</span>
    </div>
  )
}

function LogoRow({ logos }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
      {logos.map(({ src, label }) => (
        <div key={label} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: SURFACE_CARD, borderRadius: 12, padding: '10px 16px',
          boxShadow: CARD_SHADOW,
        }}>
          <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <span style={{ fontSize: 18, fontWeight: 600, color: TEXT_PRIMARY, lineHeight: '22px', whiteSpace: 'nowrap' }}>{label}</span>
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDES
// ═══════════════════════════════════════════════════════════════════════════════

function SlideCover() {
  return (
    <Slide nodeId="carousel:cover" name="Slide-cover" withNavbar={false}>
      {/* Top label pill */}
      <div style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 100,
        border: `3px solid ${TEXT_PRIMARY}`, borderRadius: 40,
        padding: '12px 36px', display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap',
      }}>
        <span style={{ fontSize: 28, fontWeight: 500, color: TEXT_PRIMARY, lineHeight: '34px' }}>6 layers</span>
      </div>

      {/* Main title */}
      <div style={{ position: 'absolute', left: 56, top: 190, width: 968, textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 112, fontWeight: 700, lineHeight: '118px', color: TEXT_PRIMARY }}>
          GTM System
        </p>
        <p style={{ margin: 0, fontSize: 80, fontWeight: 700, lineHeight: '88px', color: TEXT_PRIMARY }}>
          on Claude Code
        </p>
      </div>

      {/* Subtitle */}
      <p style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        top: 520, width: 840, margin: 0,
        fontSize: 30, fontWeight: 500, lineHeight: '44px',
        textAlign: 'center', color: TEXT_SECONDARY,
      }}>
        Context in. Scored leads out. Here's the exact folder structure that powers it.
      </p>

      {/* Layer pills grid */}
      <div style={{
        position: 'absolute', left: 56, top: 640, width: 968,
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16,
      }}>
        {[
          { n: '1', label: '/context', bg: ACCENT_1 },
          { n: '2', label: '/inputs', bg: ACCENT_4 },
          { n: '3', label: '/skills', bg: ACCENT_1 },
          { n: '4', label: 'CLAUDE.md', bg: ACCENT_3 },
          { n: '5', label: '/scripts', bg: ACCENT_5 },
          { n: '6', label: '/outputs', bg: ACCENT_2 },
        ].map(({ n, label, bg }) => (
          <div key={label} style={{
            background: bg, borderRadius: 16, padding: '20px 16px',
            display: 'flex', alignItems: 'center', gap: 12, boxShadow: CARD_SHADOW,
          }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: TEXT_PRIMARY, lineHeight: 1 }}>{n}.</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: TEXT_PRIMARY, lineHeight: '30px', fontFamily: 'monospace' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Claude Code logo */}
      <div style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        bottom: 60, display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <img src="/assets/logos/app/claude_code_logo.png" alt="Claude Code" style={{ width: 56, height: 56, objectFit: 'contain' }} />
        <span style={{ fontSize: 28, fontWeight: 700, color: TEXT_PRIMARY }}>Claude Code</span>
      </div>
    </Slide>
  )
}

function SlideLayer1Context() {
  return (
    <Slide nodeId="carousel:layer-1" name="Slide-layer-1">
      {/* Layer badge */}
      <div style={{ position: 'absolute', left: 56, top: 110, width: 968 }}>
        <LayerBadge number="1" label="/context" bg={ACCENT_1} />
      </div>

      {/* Title */}
      <p style={{
        position: 'absolute', left: 56, top: 210, width: 968,
        margin: 0, fontSize: 52, fontWeight: 700, lineHeight: '60px', color: TEXT_PRIMARY,
      }}>
        Your knowledge folder
      </p>

      {/* Description card */}
      <div style={{
        position: 'absolute', left: 56, top: 290, width: 968,
        background: 'rgba(180,234,255,0.25)', borderRadius: 16,
        border: `2px solid ${ACCENT_1}`,
        padding: '20px 24px', boxSizing: 'border-box',
      }}>
        <p style={{ margin: 0, fontSize: 26, fontWeight: 500, lineHeight: '38px', color: TEXT_PRIMARY }}>
          This is the foundation of your lead generation system. Claude reads it before every run.
        </p>
      </div>

      {/* Terminal block */}
      <div style={{ position: 'absolute', left: 56, top: 430, width: 460 }}>
        <TerminalBlock
          accentColor={ACCENT_1}
          lines={[
            { text: 'competitor-radar.md', accent: true },
            { text: 'icp-definition.md', accent: true },
            { text: 'positioning.md', accent: true },
            { text: 'profile.md', accent: true },
          ]}
        />
      </div>

      {/* What goes in */}
      <div style={{
        position: 'absolute', left: 540, top: 430, width: 484,
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {[
          { icon: '🎯', text: 'ICP definition' },
          { icon: '📍', text: 'Your positioning' },
          { icon: '⚔️', text: 'Competitor radar' },
        ].map(({ icon, text }) => (
          <div key={text} style={{
            background: SURFACE_CARD, borderRadius: 12, padding: '16px 20px',
            display: 'flex', alignItems: 'center', gap: 14, boxShadow: CARD_SHADOW,
          }}>
            <span style={{ fontSize: 28, lineHeight: 1 }}>{icon}</span>
            <span style={{ fontSize: 24, fontWeight: 600, color: TEXT_PRIMARY, lineHeight: '30px' }}>{text}</span>
          </div>
        ))}
      </div>

      {/* LinkedIn logo row */}
      <div style={{ position: 'absolute', left: 56, top: 760, width: 968 }}>
        <p style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 600, color: TEXT_SECONDARY }}>Sources</p>
        <LogoRow logos={[
          { src: '/assets/logos/app/linkedin.svg', label: 'LinkedIn profile data' },
        ]} />
      </div>

      {/* Bottom note */}
      <div style={{
        position: 'absolute', left: 39, top: 890,
        width: 1001, background: SURFACE_CARD, borderRadius: 40,
        padding: '28px 40px', boxShadow: CARD_SHADOW, boxSizing: 'border-box',
      }}>
        <p style={{ margin: 0, fontSize: 28, fontWeight: 500, lineHeight: '42px', color: TEXT_PRIMARY }}>
          Feed /context once: ICP, positioning, competitor map. Claude uses it on every lead run — no re-explaining.
        </p>
      </div>
    </Slide>
  )
}

function SlideLayer2Inputs() {
  return (
    <Slide nodeId="carousel:layer-2" name="Slide-layer-2">
      {/* Layer badge */}
      <div style={{ position: 'absolute', left: 56, top: 110, width: 968 }}>
        <LayerBadge number="2" label="/inputs" bg={ACCENT_4} />
      </div>

      {/* Title */}
      <p style={{
        position: 'absolute', left: 56, top: 210, width: 968,
        margin: 0, fontSize: 52, fontWeight: 700, lineHeight: '60px', color: TEXT_PRIMARY,
      }}>
        Lead lists you already have
      </p>

      {/* Description card */}
      <div style={{
        position: 'absolute', left: 56, top: 290, width: 968,
        background: 'rgba(255,178,218,0.18)', borderRadius: 16,
        border: `2px solid ${ACCENT_4}`,
        padding: '20px 24px', boxSizing: 'border-box',
      }}>
        <p style={{ margin: 0, fontSize: 26, fontWeight: 500, lineHeight: '38px', color: TEXT_PRIMARY }}>
          Every qualified lead is a data point to enrich or learn from.
        </p>
      </div>

      {/* Terminal block */}
      <div style={{ position: 'absolute', left: 56, top: 430, width: 460 }}>
        <TerminalBlock
          accentColor={ACCENT_4}
          lines={[
            { text: 'crm-export.csv', accent: true },
            { text: 'clay-list.csv', accent: true },
            { text: 'sales-nav-list.csv', accent: true },
            { text: 'linkedin-connections.csv', accent: true },
          ]}
        />
      </div>

      {/* Source tags */}
      <div style={{
        position: 'absolute', left: 540, top: 430, width: 484,
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        {[
          { label: 'CRM', bg: ACCENT_4 },
          { label: 'Sales Nav', bg: ACCENT_1 },
          { label: 'LinkedIn', bg: ACCENT_1 },
        ].map(({ label, bg }) => (
          <div key={label} style={{
            background: bg, borderRadius: 12, padding: '18px 24px',
            boxShadow: CARD_SHADOW,
          }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: TEXT_PRIMARY }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Logo row */}
      <div style={{ position: 'absolute', left: 56, top: 760, width: 968 }}>
        <p style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 600, color: TEXT_SECONDARY }}>Tools</p>
        <LogoRow logos={[
          { src: '/assets/logos/app/linkedin.svg', label: 'LinkedIn' },
          { src: '/assets/logos/app/hubspot.com.png', label: 'HubSpot' },
          { src: '/assets/logos/app/google-sheet.png', label: 'Google Sheets' },
        ]} />
      </div>

      {/* Bottom note */}
      <div style={{
        position: 'absolute', left: 39, top: 890,
        width: 1001, background: SURFACE_CARD, borderRadius: 40,
        padding: '28px 40px', boxShadow: CARD_SHADOW, boxSizing: 'border-box',
      }}>
        <p style={{ margin: 0, fontSize: 28, fontWeight: 500, lineHeight: '42px', color: TEXT_PRIMARY }}>
          Drop your CSVs in /inputs. Claude reads structure automatically — no mapping needed.
        </p>
      </div>
    </Slide>
  )
}

function SlideLayer3Skills() {
  const skills = [
    { file: 'enrich-leads', label: 'Enrich leads', color: ACCENT_1 },
    { file: 'find-leads', label: 'Find leads', color: ACCENT_2 },
    { file: 'post-engagers', label: 'Post engagers', color: ACCENT_4 },
    { file: 'score-leads', label: 'Score leads', color: ACCENT_3 },
    { file: 'export-leads', label: 'Export leads', color: ACCENT_5 },
  ]

  return (
    <Slide nodeId="carousel:layer-3" name="Slide-layer-3">
      {/* Layer badge */}
      <div style={{ position: 'absolute', left: 56, top: 110, width: 968 }}>
        <LayerBadge number="3" label="/skills" bg={ACCENT_1} />
      </div>

      {/* Title */}
      <p style={{
        position: 'absolute', left: 56, top: 210, width: 968,
        margin: 0, fontSize: 52, fontWeight: 700, lineHeight: '60px', color: TEXT_PRIMARY,
      }}>
        Slash commands that run workflows
      </p>

      {/* Skills grid */}
      <div style={{
        position: 'absolute', left: 56, top: 300, width: 968,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
      }}>
        {skills.map(({ file, label, color }) => (
          <div key={file} style={{
            background: SURFACE_CARD, borderRadius: 14, padding: '18px 20px',
            display: 'flex', alignItems: 'center', gap: 14, boxShadow: CARD_SHADOW,
            border: `2px solid ${color}`,
          }}>
            <div style={{
              background: color, borderRadius: 8, padding: '6px 12px', flexShrink: 0,
            }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }}>/</span>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color: TEXT_PRIMARY, lineHeight: '26px', fontFamily: 'monospace' }}>{file}</p>
              <p style={{ margin: 0, fontSize: 18, fontWeight: 500, color: TEXT_SECONDARY, lineHeight: '22px' }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Logo row - tools used for finding/enriching */}
      <div style={{ position: 'absolute', left: 56, top: 760, width: 968 }}>
        <p style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 600, color: TEXT_SECONDARY }}>Powered by</p>
        <LogoRow logos={[
          { src: '/assets/logos/app/apify.png', label: 'Apify' },
          { src: '/assets/logos/app/rapid-api.png', label: 'RapidAPI' },
          { src: '/assets/logos/app/exa-ai.png', label: 'Exa AI' },
          { src: '/assets/logos/app/linkedin.svg', label: 'LinkedIn' },
        ]} />
      </div>

      {/* Bottom note */}
      <div style={{
        position: 'absolute', left: 39, top: 890,
        width: 1001, background: SURFACE_CARD, borderRadius: 40,
        padding: '28px 40px', boxShadow: CARD_SHADOW, boxSizing: 'border-box',
      }}>
        <p style={{ margin: 0, fontSize: 28, fontWeight: 500, lineHeight: '42px', color: TEXT_PRIMARY }}>
          /find-leads, /score-leads, /enrich-leads — each skill is a reusable program. Type it once, run it forever.
        </p>
      </div>
    </Slide>
  )
}

function SlideLayer4ClaudeMd() {
  const folders = ['/context', '/inputs', '/scripts', '/outputs']

  return (
    <Slide nodeId="carousel:layer-4" name="Slide-layer-4">
      {/* Layer badge */}
      <div style={{ position: 'absolute', left: 56, top: 110, width: 968 }}>
        <LayerBadge number="4" label="CLAUDE.md" bg={ACCENT_3} />
      </div>

      {/* Title */}
      <p style={{
        position: 'absolute', left: 56, top: 210, width: 968,
        margin: 0, fontSize: 52, fontWeight: 700, lineHeight: '60px', color: TEXT_PRIMARY,
      }}>
        Master rules file
      </p>

      {/* Description */}
      <div style={{
        position: 'absolute', left: 56, top: 290, width: 968,
        background: 'rgba(253,230,138,0.35)', borderRadius: 16,
        border: `2px solid ${ACCENT_3}`,
        padding: '20px 24px', boxSizing: 'border-box',
      }}>
        <p style={{ margin: 0, fontSize: 26, fontWeight: 500, lineHeight: '38px', color: TEXT_PRIMARY }}>
          Tells Claude which folders to read, run, and write. Every skill respects it automatically.
        </p>
      </div>

      {/* Folder pointers */}
      <div style={{ position: 'absolute', left: 56, top: 430, width: 460 }}>
        <TerminalBlock
          accentColor={ACCENT_3}
          lines={[
            { text: '# GTM System', accent: false },
            { text: '', accent: false },
            { text: 'READ: /context', accent: true },
            { text: 'READ: /inputs', accent: true },
            { text: 'RUN:  /scripts', accent: true },
            { text: 'WRITE: /outputs', accent: true },
          ]}
        />
      </div>

      {/* Folder tags */}
      <div style={{
        position: 'absolute', left: 540, top: 430, width: 484,
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {[
          { folder: '/context', action: 'READS', bg: ACCENT_1 },
          { folder: '/inputs', action: 'READS', bg: ACCENT_4 },
          { folder: '/scripts', action: 'RUNS', bg: ACCENT_5 },
          { folder: '/outputs', action: 'WRITES', bg: ACCENT_2 },
        ].map(({ folder, action, bg }) => (
          <div key={folder} style={{
            background: SURFACE_CARD, borderRadius: 12, padding: '14px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: CARD_SHADOW,
          }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: TEXT_PRIMARY, fontFamily: 'monospace' }}>{folder}</span>
            <div style={{ background: bg, borderRadius: 8, padding: '4px 14px' }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }}>{action}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div style={{
        position: 'absolute', left: 39, top: 890,
        width: 1001, background: SURFACE_CARD, borderRadius: 40,
        padding: '28px 40px', boxShadow: CARD_SHADOW, boxSizing: 'border-box',
      }}>
        <p style={{ margin: 0, fontSize: 28, fontWeight: 500, lineHeight: '42px', color: TEXT_PRIMARY }}>
          One file. Persistent across every session. This is what makes Claude remember your whole system.
        </p>
      </div>
    </Slide>
  )
}

function SlideLayer5Scripts() {
  const scripts = [
    { file: 'score-leads.js', label: 'Scoring', bg: ACCENT_5 },
    { file: 'enrich-leads.js', label: 'Enrichment', bg: ACCENT_1 },
    { file: 'scrape-linkedin.js', label: 'Scraping', bg: ACCENT_4 },
    { file: 'export-csv.js', label: 'Export', bg: ACCENT_2 },
  ]

  return (
    <Slide nodeId="carousel:layer-5" name="Slide-layer-5">
      {/* Layer badge */}
      <div style={{ position: 'absolute', left: 56, top: 110, width: 968 }}>
        <LayerBadge number="5" label="/scripts" bg={ACCENT_5} />
      </div>

      {/* Title */}
      <p style={{
        position: 'absolute', left: 56, top: 210, width: 968,
        margin: 0, fontSize: 52, fontWeight: 700, lineHeight: '60px', color: TEXT_PRIMARY,
      }}>
        Deterministic, repeatable workflows
      </p>

      {/* Description */}
      <div style={{
        position: 'absolute', left: 56, top: 292, width: 968,
        background: 'rgba(255,145,77,0.15)', borderRadius: 16,
        border: `2px solid ${ACCENT_5}`,
        padding: '20px 24px', boxSizing: 'border-box',
      }}>
        <p style={{ margin: 0, fontSize: 26, fontWeight: 500, lineHeight: '38px', color: TEXT_PRIMARY }}>
          Each script reads /context and /inputs, then writes to /outputs. Called by skills.
        </p>
      </div>

      {/* Script cards */}
      <div style={{
        position: 'absolute', left: 56, top: 410, width: 968,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
      }}>
        {scripts.map(({ file, label, bg }) => (
          <div key={file} style={{
            background: SURFACE_CARD, borderRadius: 14, padding: '20px 24px',
            boxShadow: CARD_SHADOW, border: `2px solid ${bg}`,
          }}>
            <p style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700, color: TEXT_PRIMARY, lineHeight: '24px', fontFamily: 'monospace' }}>{file}</p>
            <div style={{ background: bg, borderRadius: 8, padding: '4px 12px', display: 'inline-flex' }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }}>{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Logo row */}
      <div style={{ position: 'absolute', left: 56, top: 740, width: 968 }}>
        <p style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 600, color: TEXT_SECONDARY }}>Data sources</p>
        <LogoRow logos={[
          { src: '/assets/logos/app/apify.png', label: 'Apify' },
          { src: '/assets/logos/app/rapid-api.png', label: 'RapidAPI' },
          { src: '/assets/logos/app/exa-ai.png', label: 'Exa AI' },
          { src: '/assets/logos/app/google-sheet.png', label: 'Sheets' },
        ]} />
      </div>

      {/* Bottom note */}
      <div style={{
        position: 'absolute', left: 39, top: 870,
        width: 1001, background: SURFACE_CARD, borderRadius: 40,
        padding: '28px 40px', boxShadow: CARD_SHADOW, boxSizing: 'border-box',
      }}>
        <p style={{ margin: 0, fontSize: 28, fontWeight: 500, lineHeight: '42px', color: TEXT_PRIMARY }}>
          Scripts run the same way every time. Context changes, logic stays stable.
        </p>
      </div>
    </Slide>
  )
}

function SlideLayer6Outputs() {
  const files = [
    { name: 'scored-leads.csv', label: 'Scored leads', bg: ACCENT_2 },
    { name: 'enriched-leads.csv', label: 'Enriched leads', bg: ACCENT_1 },
    { name: 'export-ready.csv', label: 'CRM-ready', bg: ACCENT_2 },
  ]

  return (
    <Slide nodeId="carousel:layer-6" name="Slide-layer-6">
      {/* Layer badge */}
      <div style={{ position: 'absolute', left: 56, top: 110, width: 968 }}>
        <LayerBadge number="6" label="/outputs" bg={ACCENT_2} />
      </div>

      {/* Title */}
      <p style={{
        position: 'absolute', left: 56, top: 210, width: 968,
        margin: 0, fontSize: 52, fontWeight: 700, lineHeight: '60px', color: TEXT_PRIMARY,
      }}>
        Final deliverables
      </p>

      {/* Description */}
      <div style={{
        position: 'absolute', left: 56, top: 292, width: 968,
        background: 'rgba(210,255,154,0.25)', borderRadius: 16,
        border: `2px solid ${ACCENT_2}`,
        padding: '20px 24px', boxSizing: 'border-box',
      }}>
        <p style={{ margin: 0, fontSize: 26, fontWeight: 500, lineHeight: '38px', color: TEXT_PRIMARY }}>
          Scored and enriched CSVs ready to import into your CRM or sequencer.
        </p>
      </div>

      {/* Output files */}
      <div style={{
        position: 'absolute', left: 56, top: 430, width: 968,
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        {files.map(({ name, label, bg }) => (
          <div key={name} style={{
            background: SURFACE_CARD, borderRadius: 16, padding: '20px 28px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: CARD_SHADOW, border: `2px solid ${bg}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 28, lineHeight: 1 }}>📄</span>
              <span style={{ fontSize: 24, fontWeight: 700, color: TEXT_PRIMARY, fontFamily: 'monospace' }}>{name}</span>
            </div>
            <div style={{ background: bg, borderRadius: 10, padding: '6px 16px' }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: TEXT_PRIMARY }}>{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Logo row */}
      <div style={{ position: 'absolute', left: 56, top: 730, width: 968 }}>
        <p style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 600, color: TEXT_SECONDARY }}>Export to</p>
        <LogoRow logos={[
          { src: '/assets/logos/app/google-sheet.png', label: 'Google Sheets' },
          { src: '/assets/logos/app/hubspot.com.png', label: 'HubSpot' },
          { src: '/assets/logos/app/salesforce.png', label: 'Salesforce' },
        ]} />
      </div>

      {/* Bottom note */}
      <div style={{
        position: 'absolute', left: 39, top: 870,
        width: 1001, background: SURFACE_CARD, borderRadius: 40,
        padding: '28px 40px', boxShadow: CARD_SHADOW, boxSizing: 'border-box',
      }}>
        <p style={{ margin: 0, fontSize: 28, fontWeight: 500, lineHeight: '42px', color: TEXT_PRIMARY }}>
          The loop runs itself: /inputs in, scored leads out, imported. Repeat every morning.
        </p>
      </div>
    </Slide>
  )
}

function SlideCTA() {
  return (
    <div
      data-node-id="carousel:cta"
      data-name="Slide-cta"
      style={{
        position: 'relative', width: 1080, height: 1350,
        background: BRAND_BG, flexShrink: 0, overflow: 'hidden',
        fontFamily: FONT, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Avatar */}
      <div style={{
        width: 160, height: 160, borderRadius: '50%',
        border: `4px solid ${ACCENT_2}`,
        overflow: 'hidden', marginBottom: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <img
          src="/assets/avatar/avatar-profile.png"
          alt={CREATOR_DISPLAY_NAME}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* CTA text */}
      <p style={{
        margin: '0 0 16px', fontSize: 56, fontWeight: 700,
        lineHeight: '64px', textAlign: 'center', color: ON_PRIMARY,
        width: 820,
      }}>
        Grab my free starter kit
      </p>

      {/* Down arrow */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        marginBottom: 24,
      }}>
        <p style={{
          margin: 0, fontSize: 32, fontWeight: 500,
          lineHeight: '42px', textAlign: 'center', color: ACCENT_1,
        }}>
          in first comment
        </p>
        {/* Arrow pointing down */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 4, height: 48, background: ACCENT_2, borderRadius: 2 }} />
          <div style={{
            width: 0, height: 0,
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderTop: `28px solid ${ACCENT_2}`,
          }} />
        </div>
      </div>

      {/* Author */}
      <p style={{
        margin: '24px 0 0', fontSize: 32, fontWeight: 700,
        color: ON_PRIMARY, textAlign: 'center',
      }}>
        {CREATOR_DISPLAY_NAME}
      </p>
      <p style={{
        margin: '8px 0 0', fontSize: 24, fontWeight: 500,
        color: ACCENT_1, textAlign: 'center',
      }}>
        Follow for more
      </p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export default function GtmSystemCarousel() {
  return (
    <div
      data-node-id="carousel:gtm-system"
      data-name="GtmSystemCarousel"
      style={{ display: 'flex', gap: 88, alignItems: 'flex-start' }}
    >
      <SlideCover />
      <SlideLayer1Context />
      <SlideLayer2Inputs />
      <SlideLayer3Skills />
      <SlideLayer4ClaudeMd />
      <SlideLayer5Scripts />
      <SlideLayer6Outputs />
      <SlideCTA />
    </div>
  )
}
