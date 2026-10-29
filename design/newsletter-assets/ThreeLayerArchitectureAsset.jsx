/**
 * ThreeLayerArchitectureAsset — the AI OS as three stacked layers.
 * Newsletter: "AI OS with Groks Bots", the 3-layer architecture section.
 *
 * Takeaway: data lives in a second brain, the bots orchestrate (you stay the
 * boss), and the heavy work runs in one AI OS per domain.
 * Never cut: the three layers in order, "you and the bots, both ways", the
 * specialist bots, the three OS, the tools behind each layer (header logos).
 *
 * Layer 1 shows only the vault's first level (see VaultTreeAsset.jsx).
 *
 * LOCAL-ONLY: this folder is gitignored.
 */
import NewsletterAssetCanvas from '../../components/newsletter-asset/NewsletterAssetCanvas.jsx'
import { CREATOR_AVATAR_SRC, avatarFallback } from '../../src/creatorIdentity.js'

export const WIDTH = 1080
export const HEIGHT = 1200
const CARD_WIDTH = 960

const FONT_BODY = 'var(--font\\/family\\/body)'
const FONT_TITLE = 'var(--font\\/family\\/title)'
const INK = 'var(--theme-color-text-primary)'
const WHITE = 'var(--text\\/invert)'
const ink = (pct) => `color-mix(in srgb, ${INK} ${pct}%, transparent)`
const tint = (token, pct) => `color-mix(in srgb, var(${token}) ${pct}%, transparent)`

const SHADOW = [`0 2px 6px ${ink(8)}`, `0 18px 40px -12px ${ink(18)}`].join(', ')
const TILE_SHADOW = [`0 1px 2px ${ink(10)}`, `0 6px 16px -4px ${ink(16)}`].join(', ')

const LOGO = '/assets/logos/app'
const BOT = '/assets/illustrations/grok-bots'
const ICON = '/assets/icons'

// ── Content ──────────────────────────────────────────────────────────────────

const LAYERS = [
  {
    key: 'brain',
    chip: 'Layer 1',
    title: 'The second brain',
    note: 'Where your raw data lives',
    logos: [
      { label: 'Your computer', src: `${ICON}/internet-networks/wifi-laptop--Streamline-Freehand.svg` },
      { label: 'Obsidian', src: `${LOGO}/obsidian.png`, bleed: true },
      { label: 'Google Drive', src: `${LOGO}/Google_Drive.svg` },
      { label: 'GitHub', src: `${LOGO}/github.com.png` },
    ],
    // First level of the vault only.
    entries: [
      { name: 'AGENTS.md', file: true, note: 'the rules agents read first' },
      { name: 'raw/', fill: '--theme-accent-1', note: 'your voice, offer, clients, past content' },
      { name: 'wiki/', fill: '--theme-accent-2', note: 'the brain, compiled by agents' },
      { name: 'outputs/', fill: '--theme-accent-3', note: 'agent drafts vs your final' },
    ],
  },
  {
    key: 'orchestration',
    chip: 'Layer 2',
    title: 'Orchestration',
    note: 'The bot is the manager, you are the boss',
    logos: [
      { label: 'Grok Bot', src: `${LOGO}/grokbot.png`, bleed: true },
      { label: 'Muse', src: `${LOGO}/Muse.png`, bleed: true },
      { label: 'Claude Duet', src: `${LOGO}/Claude-duet.svg`, bleed: true, zoom: 1.27 },
    ],
    bots: [
      { label: 'Head of content', src: `${BOT}/bot-green.png` },
      { label: 'Graphic designer', src: `${BOT}/bot-pink.png` },
      { label: 'GTM engineer', src: `${BOT}/bot-blue.png` },
    ],
  },
  {
    key: 'os',
    chip: 'Layer 3',
    title: 'One AI OS per domain',
    note: 'Heavy work runs in a coding agent',
    logos: [
      { label: 'Cursor', src: `${LOGO}/cursor.png`, bleed: true },
      { label: 'Claude Code', src: `${LOGO}/Claude-code.png` },
      { label: 'Codex', src: `${LOGO}/codex-color.png`, bleed: true },
    ],
    systems: [
      { name: 'Content OS', accent: '--theme-accent-3', icon: `${ICON}/design/content-typewriter--Streamline-Freehand.svg`, items: 'Research · Copywriting · Scripting' },
      { name: 'Design OS', accent: '--theme-accent-4', icon: `${ICON}/design/color-brush-1--Streamline-Freehand.svg`, items: 'Thumbnails · Infographics · Carousels' },
      { name: 'GTM OS', accent: '--theme-accent-1', icon: `${ICON}/work-office/business-management-agreement--Streamline-Freehand.svg`, items: 'Lead search · Enrichment · Outreach' },
    ],
  },
]

// ── Primitives ───────────────────────────────────────────────────────────────

function Img({ src, alt, size, round = false }) {
  return (
    <div
      className="flex items-center justify-center flex-none overflow-hidden"
      style={{ width: size, height: size, borderRadius: round ? '50%' : 0 }}
    >
      <img src={src} alt={alt} className="w-full h-full object-contain" onError={round ? avatarFallback : undefined} />
    </div>
  )
}

// White rounded square with a soft shadow — the "app icon" look. Logos that
// already are app icons (`bleed`) fill the tile edge to edge, `zoom` crops a
// file's own transparent margin; plain marks sit at 62% on white. Either way
// every logo reads at the same size.
function AppTile({ src, label, size = 64, bleed = false, zoom = 1 }) {
  return (
    <div
      className="flex items-center justify-center flex-none overflow-hidden"
      style={{ width: size, height: size, borderRadius: size * 0.26, background: WHITE, boxShadow: TILE_SHADOW }}
      title={label}
    >
      {bleed ? (
        <img src={src} alt={label} className="w-full h-full object-cover" style={{ transform: `scale(${zoom})` }} />
      ) : (
        <Img src={src} alt={label} size={Math.round(size * 0.62)} />
      )}
    </div>
  )
}

// Solid card on the layer panel.
const PANEL = {
  borderRadius: 18,
  background: WHITE,
  border: `1.5px solid ${ink(8)}`,
  boxShadow: TILE_SHADOW,
}

function Arrow({ length = 40, direction = 'right' }) {
  const down = direction === 'down'
  const w = down ? 22 : length
  const h = down ? length : 22
  const stroke = { fill: 'none', stroke: INK, strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' }
  return (
    <svg
      width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="flex-none" aria-hidden
      style={direction === 'left' ? { transform: 'scaleX(-1)' } : undefined}
    >
      {down ? (
        <>
          <line x1={11} y1={2} x2={11} y2={h - 3} {...stroke} />
          <path d={`M3 ${h - 11} L11 ${h - 3} L19 ${h - 11}`} {...stroke} />
        </>
      ) : (
        <>
          <line x1={2} y1={11} x2={w - 3} y2={11} {...stroke} />
          <path d={`M${w - 11} 3 L${w - 3} 11 L${w - 11} 19`} {...stroke} />
        </>
      )}
    </svg>
  )
}

// Finder-style glyphs: hairline borders, a darker back panel with the tab,
// a soft drop shadow — no heavy outline.
const GLYPH_SHADOW = { filter: `drop-shadow(0 2px 3px ${ink(14)})` }
const HAIRLINE = { stroke: ink(14), strokeWidth: 1 }

function FolderGlyph({ fill, size = 52 }) {
  const accent = `var(${fill})`
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 50 40" style={GLYPH_SHADOW} aria-hidden>
      <path
        d="M3 6 a3 3 0 0 1 3 -3 h11.5 a3 3 0 0 1 2.2 1 l2.8 3 h21.5 a3 3 0 0 1 3 3 v24 a3 3 0 0 1 -3 3 h-38 a3 3 0 0 1 -3 -3 z"
        fill={`color-mix(in srgb, ${accent} 86%, ${INK})`} {...HAIRLINE}
      />
      <rect x={3} y={11} width={44} height={26} rx={3} fill={accent} {...HAIRLINE} />
      <path d="M5.5 12.2 h39" stroke={WHITE} strokeOpacity={0.7} strokeWidth={1} strokeLinecap="round" />
    </svg>
  )
}

function FileGlyph({ size = 52 }) {
  return (
    <svg width={size * 0.8} height={size * 0.8} viewBox="0 0 32 40" style={GLYPH_SHADOW} aria-hidden>
      <path d="M3 4 a3 3 0 0 1 3 -3 h14 l9 9 v26 a3 3 0 0 1 -3 3 h-20 a3 3 0 0 1 -3 -3 z" fill={WHITE} {...HAIRLINE} />
      <path d="M20 1 v6 a3 3 0 0 0 3 3 h6" fill={ink(6)} {...HAIRLINE} />
      <path d="M9 20 h14 M9 25 h14 M9 30 h9" stroke={ink(22)} strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  )
}

// Frosted white glass panel; the layer badge sits on the brand fill.
const badge = {
  fontSize: 21,
  color: 'var(--theme-color-on-primary)',
  padding: '8px 20px',
  background: 'var(--theme-color-primary)',
}

function LayerCard({ layer, children }) {
  return (
    <div
      className="relative flex flex-col"
      style={{
        width: CARD_WIDTH,
        gap: 22,
        padding: '26px 32px 30px',
        borderRadius: 28,
        background: tint('--text\\/invert', 58),
        backdropFilter: 'blur(14px)',
        border: `1.5px solid ${tint('--text\\/invert', 95)}`,
        boxShadow: `inset 0 1px 0 ${tint('--text\\/invert', 90)}, ${SHADOW}`,
      }}
      data-name={`Layer-${layer.key}`}
    >
      <div className="flex items-center" style={{ gap: 16 }}>
        <div className="flex flex-col flex-1" style={{ gap: 6 }}>
          <div className="flex items-center" style={{ gap: 14 }}>
            <span
              style={{
                fontFamily: FONT_BODY, fontWeight: 700, borderRadius: 999, whiteSpace: 'nowrap', ...badge,
              }}
            >
              {layer.chip}
            </span>
            <span
              style={{
                fontFamily: FONT_TITLE, fontSize: 34, fontWeight: 800, color: 'var(--theme-color-title)',
                letterSpacing: 'var(--font\\/tracking\\/title)', lineHeight: 1.1,
              }}
            >
              {layer.title}
            </span>
          </div>
          <span style={{ fontFamily: FONT_BODY, fontSize: 20, fontWeight: 700, color: ink(78) }}>
            {layer.note}
          </span>
        </div>
        <div className="flex items-center" style={{ gap: 12 }}>
          {layer.logos.map((l) => (
            <AppTile key={l.label} {...l} />
          ))}
        </div>
      </div>
      {children}
    </div>
  )
}

// ── Layers ───────────────────────────────────────────────────────────────────

function BrainLayer({ layer }) {
  return (
    <div className="flex" style={{ gap: 16 }}>
      {layer.entries.map((e) => (
        <div key={e.name} className="flex flex-col flex-1" style={{ ...PANEL, gap: 8, padding: '16px 18px 18px' }}>
          <div className="flex items-end" style={{ height: 44 }}>
            {e.file ? <FileGlyph /> : <FolderGlyph fill={e.fill} />}
          </div>
          <span style={{ fontFamily: FONT_BODY, fontSize: 22, fontWeight: 700, color: INK }}>{e.name}</span>
          <span style={{ fontFamily: FONT_BODY, fontSize: 17, fontWeight: 500, color: ink(62), lineHeight: 1.3 }}>
            {e.note}
          </span>
        </div>
      ))}
    </div>
  )
}

function OrchestrationLayer({ layer }) {
  return (
    <div className="flex items-center" style={{ gap: 18 }}>
      {/* You — the boss */}
      <div className="flex flex-col items-center flex-none" style={{ gap: 6, width: 110 }}>
        <div style={{ padding: 4, borderRadius: '50%', background: WHITE, boxShadow: TILE_SHADOW }}>
          <Img src={CREATOR_AVATAR_SRC} alt="You" size={84} round />
        </div>
        <span style={{ fontFamily: FONT_BODY, fontSize: 22, fontWeight: 700, color: INK }}>You</span>
      </div>

      {/* Two-way: you direct the bots, they come back with work to approve */}
      <div className="flex flex-col items-center flex-none" style={{ gap: 10 }}>
        <Arrow length={64} />
        <Arrow length={64} direction="left" />
      </div>

      {/* Specialized bots */}
      <div className="flex flex-1" style={{ gap: 14 }}>
        {layer.bots.map((b) => (
          <div key={b.label} className="flex flex-col items-center flex-1" style={{ ...PANEL, gap: 10, padding: '16px 12px 16px' }}>
            <Img src={b.src} alt={b.label} size={56} />
            <span style={{ fontFamily: FONT_BODY, fontSize: 19, fontWeight: 700, color: INK, whiteSpace: 'nowrap' }}>{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function OsLayer({ layer }) {
  return (
    <div className="flex" style={{ gap: 16 }}>
      {layer.systems.map((os) => (
        <div key={os.name} className="flex flex-col flex-1" style={{ ...PANEL, gap: 10, padding: '18px 20px 20px' }}>
          <div className="flex items-center" style={{ gap: 12 }}>
            <div
              className="flex items-center justify-center flex-none"
              style={{ width: 52, height: 52, borderRadius: 14, background: `var(${os.accent})`, boxShadow: TILE_SHADOW }}
            >
              <Img src={os.icon} alt="" size={30} />
            </div>
            <span style={{ fontFamily: FONT_TITLE, fontSize: 25, fontWeight: 800, color: 'var(--theme-color-title)', letterSpacing: 'var(--font\\/tracking\\/title)' }}>
              {os.name}
            </span>
          </div>
          <span style={{ fontFamily: FONT_BODY, fontSize: 19, fontWeight: 500, color: 'var(--theme-color-text-secondary)', lineHeight: 1.35 }}>
            {os.items}
          </span>
        </div>
      ))}
    </div>
  )
}

const BODIES = { brain: BrainLayer, orchestration: OrchestrationLayer, os: OsLayer }

export default function ThreeLayerArchitectureAsset() {
  return (
    <NewsletterAssetCanvas width={WIDTH} height={HEIGHT}>
      <div className="relative flex flex-col items-center" style={{ gap: 8 }}>
        {LAYERS.map((layer, i) => {
          const Body = BODIES[layer.key]
          return (
            <div key={layer.key} className="flex flex-col items-center" style={{ gap: 8 }}>
              {i > 0 && <Arrow direction="down" length={40} />}
              <LayerCard layer={layer}>
                <Body layer={layer} />
              </LayerCard>
            </div>
          )
        })}
      </div>
    </NewsletterAssetCanvas>
  )
}
