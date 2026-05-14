import { CREATOR_DISPLAY_NAME } from '../../src/creatorIdentity.js'

/**
 * LinkedInCarouselTemplate — source template for standard 1080x1350 carousels.
 *
 * Data shape:
 * {
 *   authorName: string,
 *   slides: Array<{
 *     id: string,
 *     title: string,
 *     subtitle?: string,
 *     body?: string,
 *   }>
 * }
 */

const CARD_SHADOW = '0px 4px 4px 0px rgba(0,0,0,0.25)'

function Navbar({ authorName = CREATOR_DISPLAY_NAME }) {
  return (
    <>
      <p style={{ position: 'absolute', left: 80, top: 26, margin: 0, fontSize: 28, fontWeight: 600, color: '#000' }}>
        {authorName}
      </p>
      <p style={{ position: 'absolute', right: 80, top: 26, margin: 0, fontSize: 28, fontWeight: 600, color: '#000' }}>
        Follow
      </p>
      <div style={{ position: 'absolute', left: 71, top: 83, width: 938, height: 3, background: '#000' }} />
    </>
  )
}

function Slide({ authorName, title, subtitle, body }) {
  return (
    <div
      style={{
        position: 'relative',
        width: 1080,
        height: 1350,
        flexShrink: 0,
        overflow: 'hidden',
        background: '#fffceb',
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <Navbar authorName={authorName} />
      <div
        style={{
          position: 'absolute',
          left: 70,
          top: 156,
          width: 940,
          minHeight: 1050,
          borderRadius: 24,
          background: '#fff',
          boxShadow: CARD_SHADOW,
          padding: '56px 52px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          justifyContent: 'center',
        }}
      >
        <h2 style={{ margin: 0, fontSize: 72, lineHeight: '82px', fontWeight: 700, color: '#000' }}>{title}</h2>
        {subtitle ? (
          <p style={{ margin: 0, fontSize: 40, lineHeight: '56px', fontWeight: 500, color: '#092c69' }}>{subtitle}</p>
        ) : null}
        {body ? (
          <p style={{ margin: 0, fontSize: 32, lineHeight: '46px', fontWeight: 500, color: '#323241', whiteSpace: 'pre-wrap' }}>{body}</p>
        ) : null}
      </div>
    </div>
  )
}

export default function LinkedInCarouselTemplate({ data = {} }) {
  const authorName = data.authorName || CREATOR_DISPLAY_NAME
  const slides = Array.isArray(data.slides) && data.slides.length > 0
    ? data.slides
    : [{ id: 'cover', title: 'Template title', subtitle: 'Template subtitle', body: 'Template body copy.' }]

  return (
    <div style={{ display: 'flex', gap: 88, alignItems: 'flex-start' }}>
      {slides.map((slide) => (
        <Slide
          key={slide.id}
          authorName={authorName}
          title={slide.title || 'Untitled'}
          subtitle={slide.subtitle}
          body={slide.body}
        />
      ))}
    </div>
  )
}
