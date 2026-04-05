/**
 * SlideLayouts — shared layout components for 16:9 slide decks (1280×720px).
 *
 * All layouts use inline styles (no Tailwind) and position content on the
 * fixed 1280×720 canvas. Import SlideCard and SquareGridTexture from this
 * file's siblings; layouts are assembled here for agent-generated decks to
 * import from one place.
 *
 * Canvas: 1280×720, background #EBDBBC, font Montserrat.
 * SquareGridTexture is always the first child at opacity 0.18.
 *
 * Layout types: cover | content | two-column | statement | bullets | quote | end
 */

import SlideCard from './SlideCard.jsx'
import SquareGridTexture from './SquareGridTexture.jsx'

// ── Constants ────────────────────────────────────────────────────────────────

const CANVAS_W = 1280
const CANVAS_H = 720
const SLIDE_BG = '#EBDBBC'
const NAVY = '#092c69'
const ACCENT = '#b4eaff'
const FONT = "'Montserrat', sans-serif"

// ── Canvas shell ─────────────────────────────────────────────────────────────

/**
 * SlideShell — required wrapper for every slide.
 * Props: nodeId, name, children
 */
export function SlideShell({ children, nodeId, name }) {
  return (
    <div
      data-node-id={nodeId}
      data-name={name}
      style={{
        position: 'relative',
        width: CANVAS_W,
        height: CANVAS_H,
        background: SLIDE_BG,
        flexShrink: 0,
        overflow: 'hidden',
        fontFamily: FONT,
      }}
    >
      <SquareGridTexture width={CANVAS_W} height={CANVAS_H} opacity={0.18} />
      {children}
    </div>
  )
}

// ── Accent pill ───────────────────────────────────────────────────────────────

function AccentPill({ children, style = {} }) {
  return (
    <span
      style={{
        background: ACCENT,
        borderRadius: 12,
        padding: '2px 12px',
        display: 'inline',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

// ── Layout: Cover ─────────────────────────────────────────────────────────────
/**
 * Props:
 *   id           string   — slide id (used as React key by caller)
 *   title        string   — ≤55 chars
 *   subtitle     string?  — ≤45 chars
 *   illustration string?  — asset path e.g. '/assets/illustrations/notion-style/oc-growing.svg'
 *   accentWord   string?  — word in title to highlight with accent pill
 *   nodeId       string?
 */
export function SlideCover({ id, title, subtitle, illustration, accentWord, nodeId }) {
  const hasIllustration = Boolean(illustration)
  const titleWidth = hasIllustration ? 740 : 960
  const titleLeft = hasIllustration ? 80 : (CANVAS_W - titleWidth) / 2

  // Split title around accentWord for inline highlight
  let titleContent
  if (accentWord && title.includes(accentWord)) {
    const parts = title.split(accentWord)
    titleContent = (
      <>
        {parts[0]}
        <AccentPill>{accentWord}</AccentPill>
        {parts[1]}
      </>
    )
  } else {
    titleContent = title
  }

  return (
    <SlideShell nodeId={nodeId} name={`slide-cover-${id}`}>
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          left: titleLeft,
          width: titleWidth,
          fontSize: 64,
          fontWeight: 700,
          lineHeight: '76px',
          color: '#000000',
          fontFamily: FONT,
          letterSpacing: '-0.5px',
        }}
      >
        {titleContent}
      </div>

      {/* Subtitle card */}
      {subtitle && (
        <SlideCard
          variant="glass"
          padding="20px 32px"
          radius={20}
          style={{
            position: 'absolute',
            top: hasIllustration ? 400 : 380,
            left: titleLeft,
            width: titleWidth,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: '#323241',
              fontFamily: FONT,
              lineHeight: '32px',
            }}
          >
            {subtitle}
          </div>
        </SlideCard>
      )}

      {/* Illustration */}
      {hasIllustration && (
        <img
          src={illustration}
          alt=""
          style={{
            position: 'absolute',
            right: 60,
            top: 60,
            width: 380,
            height: 580,
            objectFit: 'contain',
          }}
        />
      )}
    </SlideShell>
  )
}

// ── Layout: Content ───────────────────────────────────────────────────────────
/**
 * Props:
 *   id      string
 *   title   string   — ≤40 chars
 *   body    string[] — array of paragraphs, each ≤180 chars
 *   image   string?  — asset path
 *   nodeId  string?
 */
export function SlideContent({ id, title, body, image, nodeId }) {
  const hasImage = Boolean(image)
  const bodyWidth = hasImage ? 640 : 1160

  return (
    <SlideShell nodeId={nodeId} name={`slide-content-${id}`}>
      {/* Navy title bar */}
      <SlideCard
        variant="navy"
        padding="0 32px"
        radius={16}
        style={{
          position: 'absolute',
          top: 56,
          left: 60,
          width: 1160,
          height: 80,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: 'white',
            fontFamily: FONT,
            letterSpacing: '-0.2px',
          }}
        >
          {title}
        </div>
      </SlideCard>

      {/* Body text */}
      <SlideCard
        variant="white"
        padding="28px 32px"
        radius={16}
        style={{
          position: 'absolute',
          top: 160,
          left: 60,
          width: bodyWidth,
          height: 496,
          overflow: 'hidden',
        }}
      >
        {(Array.isArray(body) ? body : [body]).map((para, i) => (
          <p
            key={i}
            style={{
              margin: i === 0 ? 0 : '16px 0 0 0',
              fontSize: 18,
              fontWeight: 500,
              color: '#323241',
              fontFamily: FONT,
              lineHeight: '28px',
            }}
          >
            {para}
          </p>
        ))}
      </SlideCard>

      {/* Optional image */}
      {hasImage && (
        <SlideCard
          variant="glass"
          padding="16px"
          radius={16}
          style={{
            position: 'absolute',
            top: 160,
            right: 60,
            width: 488,
            height: 496,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={image}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </SlideCard>
      )}
    </SlideShell>
  )
}

// ── Layout: Two Column ────────────────────────────────────────────────────────
/**
 * Props:
 *   id           string
 *   title        string     — ≤40 chars
 *   leftContent  string|JSX — text or JSX for left panel
 *   rightContent string|JSX — text, image path (string starting with '/'), or JSX
 *   split        string     — '50/50' | '55/45' (default '55/45')
 *   nodeId       string?
 */
export function SlideTwoColumn({ id, title, leftContent, rightContent, split = '55/45', nodeId }) {
  const leftW = split === '55/45' ? 628 : 556
  const rightW = split === '55/45' ? 492 : 556
  const bodyH = 468

  const isImagePath = typeof rightContent === 'string' && rightContent.startsWith('/')

  return (
    <SlideShell nodeId={nodeId} name={`slide-two-column-${id}`}>
      {/* Navy title bar */}
      <SlideCard
        variant="navy"
        padding="0 32px"
        radius={16}
        style={{
          position: 'absolute',
          top: 56,
          left: 60,
          width: 1160,
          height: 80,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 700, color: 'white', fontFamily: FONT }}>
          {title}
        </div>
      </SlideCard>

      {/* Left panel */}
      <SlideCard
        variant="white"
        padding="28px 32px"
        radius={16}
        style={{ position: 'absolute', top: 160, left: 60, width: leftW, height: bodyH, overflow: 'hidden' }}
      >
        {typeof leftContent === 'string' ? (
          <p style={{ margin: 0, fontSize: 18, fontWeight: 500, color: '#323241', fontFamily: FONT, lineHeight: '28px' }}>
            {leftContent}
          </p>
        ) : leftContent}
      </SlideCard>

      {/* Right panel */}
      <SlideCard
        variant="glass"
        padding={isImagePath ? '16px' : '28px 32px'}
        radius={16}
        style={{
          position: 'absolute',
          top: 160,
          right: 60,
          width: rightW,
          height: bodyH,
          display: isImagePath ? 'flex' : undefined,
          alignItems: isImagePath ? 'center' : undefined,
          justifyContent: isImagePath ? 'center' : undefined,
          overflow: 'hidden',
        }}
      >
        {isImagePath ? (
          <img src={rightContent} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        ) : typeof rightContent === 'string' ? (
          <p style={{ margin: 0, fontSize: 18, fontWeight: 500, color: '#323241', fontFamily: FONT, lineHeight: '28px' }}>
            {rightContent}
          </p>
        ) : rightContent}
      </SlideCard>
    </SlideShell>
  )
}

// ── Layout: Statement ─────────────────────────────────────────────────────────
/**
 * Props:
 *   id        string
 *   statement string  — ≤120 chars
 *   accent    string? — phrase within statement to highlight
 *   sub       string? — smaller supporting text below
 *   nodeId    string?
 */
export function SlideStatement({ id, statement, accent, sub, nodeId }) {
  const wordCount = statement.split(' ').length
  const fontSize = wordCount <= 5 ? 72 : wordCount <= 10 ? 64 : 52

  let statementContent
  if (accent && statement.includes(accent)) {
    const parts = statement.split(accent)
    statementContent = (
      <>
        {parts[0]}
        <AccentPill>{accent}</AccentPill>
        {parts[1]}
      </>
    )
  } else {
    statementContent = statement
  }

  return (
    <SlideShell nodeId={nodeId} name={`slide-statement-${id}`}>
      <SlideCard
        variant="glass"
        padding="48px 64px"
        radius={32}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 960,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize,
            fontWeight: 700,
            color: '#000000',
            fontFamily: FONT,
            lineHeight: `${Math.round(fontSize * 1.2)}px`,
            letterSpacing: '-0.5px',
          }}
        >
          {statementContent}
        </div>
        {sub && (
          <div
            style={{
              marginTop: 24,
              fontSize: 20,
              fontWeight: 500,
              color: '#323241',
              fontFamily: FONT,
              opacity: 0.75,
            }}
          >
            {sub}
          </div>
        )}
      </SlideCard>
    </SlideShell>
  )
}

// ── Layout: Bullets ───────────────────────────────────────────────────────────
/**
 * Props:
 *   id      string
 *   title   string  — ≤40 chars
 *   bullets Array<{ icon: string, label: string, desc: string }>
 *             icon  — asset path (SVG), ≤18 chars label, ≤60 chars desc
 *   nodeId  string?
 */
export function SlideBullets({ id, title, bullets = [], nodeId }) {
  const rowH = 80
  const gap = 14
  const totalRows = Math.min(bullets.length, 5)
  const startTop = 160

  return (
    <SlideShell nodeId={nodeId} name={`slide-bullets-${id}`}>
      {/* Navy title bar */}
      <SlideCard
        variant="navy"
        padding="0 32px"
        radius={16}
        style={{
          position: 'absolute',
          top: 56,
          left: 60,
          width: 1160,
          height: 80,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 700, color: 'white', fontFamily: FONT }}>
          {title}
        </div>
      </SlideCard>

      {/* Bullet rows */}
      {bullets.slice(0, totalRows).map((bullet, i) => (
        <SlideCard
          key={i}
          variant="white"
          padding="0 32px"
          radius={16}
          style={{
            position: 'absolute',
            top: startTop + i * (rowH + gap),
            left: 60,
            width: 1160,
            height: rowH,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}
        >
          {bullet.icon && (
            <img
              src={bullet.icon}
              alt=""
              style={{ width: 40, height: 40, objectFit: 'contain', flexShrink: 0 }}
            />
          )}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, overflow: 'hidden' }}>
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#000000',
                fontFamily: FONT,
                whiteSpace: 'nowrap',
              }}
            >
              {bullet.label}
            </span>
            {bullet.desc && (
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#717188',
                  fontFamily: FONT,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {bullet.desc}
              </span>
            )}
          </div>
        </SlideCard>
      ))}
    </SlideShell>
  )
}

// ── Layout: Quote ─────────────────────────────────────────────────────────────
/**
 * Props:
 *   id     string
 *   quote  string  — ≤140 chars
 *   author string  — ≤30 chars
 *   role   string? — role / attribution
 *   avatar string? — image path
 *   nodeId string?
 */
export function SlideQuote({ id, quote, author, role, avatar, nodeId }) {
  return (
    <SlideShell nodeId={nodeId} name={`slide-quote-${id}`}>
      {/* Decorative large quotation mark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 40,
          left: 60,
          fontSize: 280,
          fontWeight: 700,
          color: NAVY,
          opacity: 0.07,
          lineHeight: 1,
          fontFamily: FONT,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        &ldquo;
      </div>

      {/* Quote card */}
      <SlideCard
        variant="glass"
        padding="48px 56px"
        radius={28}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 960,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 26,
            fontWeight: 500,
            fontStyle: 'italic',
            color: '#000000',
            fontFamily: FONT,
            lineHeight: '40px',
            textAlign: 'center',
          }}
        >
          {quote}
        </p>

        {/* Attribution row */}
        <div
          style={{
            marginTop: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}
        >
          {avatar && (
            <img
              src={avatar}
              alt={author}
              style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />
          )}
          <div style={{ textAlign: avatar ? 'left' : 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: NAVY, fontFamily: FONT }}>
              {author}
            </div>
            {role && (
              <div style={{ fontSize: 15, fontWeight: 500, color: '#717188', fontFamily: FONT }}>
                {role}
              </div>
            )}
          </div>
        </div>
      </SlideCard>
    </SlideShell>
  )
}

// ── Layout: End (CTA) ─────────────────────────────────────────────────────────
/**
 * Props:
 *   id           string
 *   authorName   string  — displayed below avatar
 *   handle       string? — social handle (optional)
 *   avatar       string? — defaults to /assets/avatar/avatar-profile.png
 *   illustration string? — optional decorative illustration path
 *   nodeId       string?
 */
export function SlideEnd({ id, authorName, handle, avatar, illustration, nodeId }) {
  const avatarSrc = avatar || '/assets/avatar/avatar-profile.png'

  return (
    <SlideShell nodeId={nodeId} name={`slide-end-${id}`}>
      {/* Avatar */}
      <img
        src={avatarSrc}
        alt={authorName}
        style={{
          position: 'absolute',
          top: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 160,
          height: 160,
          borderRadius: '50%',
          objectFit: 'cover',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        }}
      />

      {/* "Follow for more" with accent pill */}
      <div
        style={{
          position: 'absolute',
          top: 300,
          left: 0,
          width: CANVAS_W,
          textAlign: 'center',
          fontSize: 52,
          fontWeight: 700,
          color: '#000000',
          fontFamily: FONT,
          letterSpacing: '-0.5px',
        }}
      >
        Follow for{' '}
        <AccentPill style={{ borderRadius: 14 }}>more</AccentPill>
      </div>

      {/* Author name */}
      <div
        style={{
          position: 'absolute',
          top: 400,
          left: 0,
          width: CANVAS_W,
          textAlign: 'center',
          fontSize: 26,
          fontWeight: 600,
          color: NAVY,
          fontFamily: FONT,
        }}
      >
        {authorName}
      </div>

      {/* Handle */}
      {handle && (
        <div
          style={{
            position: 'absolute',
            top: 444,
            left: 0,
            width: CANVAS_W,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 400,
            color: '#717188',
            fontFamily: FONT,
          }}
        >
          {handle}
        </div>
      )}

      {/* Optional decorative illustration */}
      {illustration && (
        <img
          src={illustration}
          alt=""
          style={{
            position: 'absolute',
            right: 80,
            bottom: 40,
            width: 220,
            height: 280,
            objectFit: 'contain',
            opacity: 0.85,
          }}
        />
      )}
    </SlideShell>
  )
}

// ── renderSlide helper ────────────────────────────────────────────────────────
/**
 * Convenience renderer — maps a slide data object to the correct layout component.
 * Agent-generated deck files can use this instead of a manual switch.
 *
 * Usage in a deck file:
 *   import { renderSlide } from '../components/SlideLayouts.jsx'
 *   export default function MySlides() {
 *     return <div style={{ display: 'flex', gap: 60 }}>{SLIDE_DATA.slides.map(renderSlide)}</div>
 *   }
 */
export function renderSlide(slide) {
  switch (slide.layout) {
    case 'cover':       return <SlideCover      key={slide.id} {...slide} />
    case 'content':     return <SlideContent    key={slide.id} {...slide} />
    case 'two-column':  return <SlideTwoColumn  key={slide.id} {...slide} />
    case 'statement':   return <SlideStatement  key={slide.id} {...slide} />
    case 'bullets':     return <SlideBullets    key={slide.id} {...slide} />
    case 'quote':       return <SlideQuote      key={slide.id} {...slide} />
    case 'end':         return <SlideEnd        key={slide.id} {...slide} />
    default:            return null
  }
}
