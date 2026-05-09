const DEFAULT_FONT = "var(--font\\/family\\/title, 'Montserrat', sans-serif)"
const DEFAULT_TEXT = 'var(--theme-color-text-primary)'
const DEFAULT_BACKGROUND = 'var(--theme-surface-canvas)'

export function CarouselNavbarEdge({
  textColor = DEFAULT_TEXT,
  fontFamily = DEFAULT_FONT,
  leftLabel = 'Your Full Name',
  rightLabel = 'Follow',
}) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: 1080 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 83,
        paddingLeft: 56,
        paddingRight: 56,
        boxSizing: 'border-box',
      }}>
        <span style={{ fontSize: 24, fontWeight: 500, color: textColor, fontFamily, whiteSpace: 'nowrap' }}>
          {leftLabel}
        </span>
        <span style={{ fontSize: 24, fontWeight: 500, color: textColor, fontFamily, whiteSpace: 'nowrap' }}>
          {rightLabel}
        </span>
      </div>
      <div style={{ marginLeft: 56, marginRight: 56, height: 3, background: textColor }} />
    </div>
  )
}

export function CarouselNavbarCentered({
  textColor = DEFAULT_TEXT,
  fontFamily = DEFAULT_FONT,
  leftLabel = 'Your Full Name',
  rightLabel = 'Follow',
}) {
  return (
    <>
      <p style={{
        position: 'absolute',
        left: 'calc(50% - 360.5px)',
        top: 0,
        width: 217,
        height: 83,
        lineHeight: '100px',
        fontSize: 24,
        fontWeight: 500,
        textAlign: 'center',
        color: textColor,
        margin: 0,
        fontFamily,
      }}>
        {leftLabel}
      </p>
      <p style={{
        position: 'absolute',
        left: 'calc(50% + 393.5px)',
        top: 0,
        width: 217,
        height: 83,
        lineHeight: '100px',
        fontSize: 24,
        fontWeight: 500,
        textAlign: 'center',
        color: textColor,
        margin: 0,
        fontFamily,
      }}>
        {rightLabel}
      </p>
      <div style={{
        position: 'absolute',
        left: 71,
        top: 83,
        width: 938,
        height: 3,
        background: textColor,
      }} />
    </>
  )
}

export function CarouselSlideShell({
  children,
  nodeId,
  name,
  withNavbar = true,
  navbar = null,
  background = DEFAULT_BACKGROUND,
  fontFamily = DEFAULT_FONT,
}) {
  return (
    <div
      data-node-id={nodeId}
      data-name={name}
      style={{
        position: 'relative',
        width: 1080,
        height: 1350,
        background,
        flexShrink: 0,
        overflow: 'hidden',
        fontFamily,
      }}
    >
      {withNavbar && navbar}
      {children}
    </div>
  )
}
