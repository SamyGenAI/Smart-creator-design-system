/**
 * CompanionLaunchesAsset — the 2026 wave of personal AI agents, as one
 * horizontal launch timeline (US launch months).
 * Newsletter: "AI OS with Groks Bots".
 *
 * Takeaway: every lab shipped a consumer companion in 6 months (Feb → Oct 2026).
 * Never cut: the five logos, US launch months, company per product.
 *
 * Dates (US): Instinct private beta Feb (invite-only wave Aug) · Grok Bot beta
 * Aug 11 · Muse Sep 8 · Dots Sep 29 (DevDay) · Claude Duet Oct 21 (research
 * preview). The Feb → Aug segment is dashed: the startup went first, the labs
 * followed within ten weeks.
 *
 * LOCAL-ONLY: this folder is gitignored.
 */
import NewsletterAssetCanvas from '../../components/newsletter-asset/NewsletterAssetCanvas.jsx'
import Timeline from '../../components/newsletter-asset/Timeline.jsx'

export const WIDTH = 1080
export const HEIGHT = 540
const CARD_WIDTH = 1000

const INK = 'var(--theme-color-text-primary)'
const ink = (pct) => `color-mix(in srgb, ${INK} ${pct}%, transparent)`
const SHADOW = [`0 2px 6px ${ink(8)}`, `0 18px 40px -12px ${ink(18)}`].join(', ')

const LOGO = '/assets/logos/app'

// ── Content ──────────────────────────────────────────────────────────────────

const LAUNCHES = [
  { label: 'Instinct', company: 'Startup', note: 'No app, just text it', date: 'Feb 2026', logo: `${LOGO}/instinct.png`, fit: 0.84 },
  { label: 'Grok Bot', company: 'xAI', note: 'Gets its own computer', date: 'Aug 2026', logo: `${LOGO}/grokbot.png`, bleed: true, gap: true },
  { label: 'Muse', company: 'Meta', note: 'Lives in WhatsApp', date: 'Sep 2026', logo: `${LOGO}/Muse.png`, bleed: true },
  { label: 'Dots', company: 'OpenAI', note: 'Works after you close the chat', date: 'Sep 2026', logo: `${LOGO}/dots.png`, fit: 0.8 },
  { label: 'Claude Duet', company: 'Anthropic', note: 'Briefs you every morning', date: 'Oct 2026', logo: `${LOGO}/Claude-duet.svg`, bleed: true, zoom: 1.27, highlight: true },
]

// ── Asset ────────────────────────────────────────────────────────────────────

export default function CompanionLaunchesAsset() {
  return (
    <NewsletterAssetCanvas width={WIDTH} height={HEIGHT}>
      <div
        className="relative flex items-center justify-center"
        style={{
          width: CARD_WIDTH,
          padding: '44px 24px',
          borderRadius: 28,
          background: 'var(--text\\/invert)',
          border: `1.5px solid ${ink(8)}`,
          boxShadow: SHADOW,
        }}
      >
        <Timeline items={LAUNCHES} columnWidth={190} tileSize={112} />
      </div>
    </NewsletterAssetCanvas>
  )
}
