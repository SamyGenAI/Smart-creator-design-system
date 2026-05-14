import { CarouselNavbarEdge, CarouselSlideShell } from '../../components/CarouselPrimitives.jsx'
import { CREATOR_DISPLAY_NAME } from '../../src/creatorIdentity.js'

/**
 * LinkedInCarouselTemplate — source template for standard 1080×1350 carousels.
 *
 * Navbar: name left · "Follow" right · 3px rule at top=83, left=56, width=968
 * Content starts at top ≈ 110 (below the rule).
 *
 * When building a new carousel:
 *  1. Copy this file to design/carousels/MyTopicCarousel.jsx
 *  2. Replace the slide functions with your own
 *  3. Keep NAVBAR, Slide wrapper, and root export pattern unchanged
 *  4. Register in src/modes.js + src/App.jsx
 */

const CARD_SHADOW = 'var(--theme-shadow-card)'
const TEXT_PRIMARY = 'var(--theme-color-text-primary)'
const TEXT_SECONDARY = 'var(--theme-color-text-secondary)'
const BACKGROUND_PRIMARY = 'var(--theme-surface-canvas)'
const SURFACE_CARD = 'var(--theme-color-on-primary)'   /* white on any brand */
const FONT = "var(--font\\/family\\/title, 'Montserrat', sans-serif)"

const NAVBAR = <CarouselNavbarEdge textColor={TEXT_PRIMARY} fontFamily={FONT} />

function Slide({ children, nodeId, name, withNavbar = true }) {
  return (
    <CarouselSlideShell
      nodeId={nodeId}
      name={name}
      withNavbar={withNavbar}
      navbar={NAVBAR}
      background={BACKGROUND_PRIMARY}
      fontFamily={FONT}
    >
      {children}
    </CarouselSlideShell>
  )
}

// ─── SLIDE 1: Cover ───────────────────────────────────────────────────────────
// withNavbar={false} on cover is common — remove the line if you want it shown.

function SlideCover() {
  return (
    <Slide nodeId="template:cover" name="Slide-cover" withNavbar={false}>
      {/* Bordered subtitle pill */}
      <div style={{
        position: 'absolute',
        left: 240, top: 110,
        width: 600, height: 76,
        border: `3px solid ${TEXT_PRIMARY}`, borderRadius: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <p style={{ margin: 0, fontSize: 40, fontWeight: 500, color: TEXT_PRIMARY, lineHeight: '50px', whiteSpace: 'nowrap' }}>
          Topic tag · N slides
        </p>
      </div>

      {/* Main title */}
      <div style={{ position: 'absolute', left: 60, top: 240, width: 960 }}>
        <p style={{
          margin: 0, fontSize: 128, fontWeight: 700,
          lineHeight: '130px', textAlign: 'center', color: TEXT_PRIMARY,
        }}>
          Your carousel title here
        </p>
      </div>

      {/* Illustration placeholder */}
      <img
        src="/assets/illustrations/notion-style/oc-on-the-laptop.svg"
        alt=""
        style={{ position: 'absolute', left: 290, top: 870, width: 500, height: 400, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 2: Context / Hook ──────────────────────────────────────────────────

function SlideContext() {
  return (
    <Slide nodeId="template:context" name="Slide-context">
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 280,
        width: 860,
        fontSize: 96, fontWeight: 700,
        lineHeight: '110px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0,
      }}>
        One bold hook sentence here.
      </p>

      <img
        src="/assets/illustrations/notion-style/oc-thinking.svg"
        alt=""
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 700, width: 520, height: 440, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ─── SLIDE 3: Step (repeat pattern for each step) ────────────────────────────
// StepLabel: number left-aligned, text wraps beside it. Starts at top: 130.
// StepImage: use naturalWidth/naturalHeight so it never distorts.
// BottomNote: white pill at bottom with supporting copy.

function SlideStep1() {
  return (
    <Slide nodeId="template:step-1" name="Slide-step-1">
      {/* Step label */}
      <div style={{
        position: 'absolute', left: 56, top: 130, width: 968,
        display: 'flex', alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: 64, fontWeight: 500, lineHeight: '70px', color: TEXT_PRIMARY, minWidth: 96, flexShrink: 0 }}>
          1.
        </span>
        <p style={{ margin: 0, fontSize: 64, fontWeight: 500, lineHeight: '70px', color: TEXT_PRIMARY }}>
          Step title text here
        </p>
      </div>

      {/* Screenshot — replace src and naturalWidth/naturalHeight */}
      <div style={{
        position: 'absolute', left: 56, top: 380,
        width: 968, height: 580,
        borderRadius: 20, boxShadow: CARD_SHADOW, overflow: 'hidden',
      }}>
        <img
          src="/screenshots/placeholder.png"
          alt=""
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
        />
      </div>

      {/* Bottom note */}
      <div style={{
        position: 'absolute', left: 39, top: 1000,
        width: 1001, minHeight: 152,
        background: SURFACE_CARD, borderRadius: 40,
        padding: '28px 40px', boxShadow: CARD_SHADOW,
        boxSizing: 'border-box', display: 'flex', alignItems: 'center',
      }}>
        <p style={{ margin: 0, fontSize: 32, fontWeight: 500, lineHeight: '48px', color: TEXT_PRIMARY }}>
          Supporting note or tip for this step.
        </p>
      </div>
    </Slide>
  )
}

// ─── SLIDE N-1: Wrapup ───────────────────────────────────────────────────────

function SlideWrapup() {
  const items = [
    { label: 'Point one', desc: 'One-line recap' },
    { label: 'Point two', desc: 'One-line recap' },
    { label: 'Point three', desc: 'One-line recap' },
  ]
  return (
    <Slide nodeId="template:wrapup" name="Slide-wrapup">
      <p style={{
        position: 'absolute', left: 90, top: 163,
        width: 900,
        fontSize: 64, fontWeight: 700,
        lineHeight: '76px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0,
      }}>
        Key takeaways
      </p>

      <div style={{
        position: 'absolute', left: 56, top: 391,
        width: 968,
        display: 'flex', flexDirection: 'column', gap: 32,
      }}>
        {items.map(({ label, desc }) => (
          <div key={label} style={{
            background: SURFACE_CARD, borderRadius: 20,
            padding: '28px 36px', boxShadow: CARD_SHADOW,
            display: 'flex', alignItems: 'flex-start', gap: 28,
          }}>
            <p style={{ margin: 0, fontSize: 38, fontWeight: 500, lineHeight: '52px', color: TEXT_PRIMARY }}>
              <strong>{label}</strong>{' — '}<span style={{ color: TEXT_SECONDARY }}>{desc}</span>
            </p>
          </div>
        ))}
      </div>
    </Slide>
  )
}

// ─── SLIDE N: CTA ────────────────────────────────────────────────────────────
// withNavbar={false} — CTA is always navbar-free.

function SlideCTA() {
  return (
    <Slide nodeId="template:cta" name="Slide-CTA" withNavbar={false}>
      {/* Avatar */}
      <div style={{
        position: 'absolute', left: 340, top: 260,
        width: 400, height: 400,
        borderRadius: '50%', overflow: 'hidden',
        boxShadow: CARD_SHADOW,
      }}>
        <img
          src="/assets/avatar/avatar-profile.png"
          alt={CREATOR_DISPLAY_NAME}
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Follow for more */}
      <p style={{
        position: 'absolute', left: 190, top: 730,
        width: 700,
        fontSize: 96, fontWeight: 700,
        lineHeight: '110px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0, whiteSpace: 'nowrap',
      }}>
        Follow for more
      </p>

      {/* Author name */}
      <p style={{
        position: 'absolute', left: 240, top: 841,
        width: 600,
        fontSize: 48, fontWeight: 500,
        lineHeight: '70px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0, whiteSpace: 'nowrap',
      }}>
        {CREATOR_DISPLAY_NAME}
      </p>

      {/* Illustration */}
      <img
        src="/assets/illustrations/notion-style/oc-hi-five.svg"
        alt=""
        style={{ position: 'absolute', left: 365, top: 950, width: 350, height: 296, objectFit: 'contain' }}
      />
    </Slide>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export default function LinkedInCarouselTemplate() {
  return (
    <div
      data-node-id="template:root"
      data-name="LinkedInCarouselTemplate"
      style={{ display: 'flex', gap: 88, alignItems: 'flex-start' }}
    >
      <SlideCover />
      <SlideContext />
      <SlideStep1 />
      <SlideWrapup />
      <SlideCTA />
    </div>
  )
}
