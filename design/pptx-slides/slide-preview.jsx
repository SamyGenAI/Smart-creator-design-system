import React from 'react'
import {
  buildScenes,
  CANVAS,
  xPx,
  yPx,
  wPx,
  hPx,
  tokCss,
  CARD_SHADOW_CSS,
} from './slide-engine.mjs'

const FONT_BODY = 'var(--font\\/family\\/body)'

function webSrc(src) {
  if (src.startsWith('public/')) return `/${src.slice('public/'.length)}`
  if (src.startsWith('assets/')) return `/${src}`
  return src.startsWith('/') ? src : `/${src}`
}

function renderNode(node, key) {
  const abs = {
    position: 'absolute',
    left: xPx(node.x),
    top: yPx(node.y),
    width: wPx(node.w),
    height: hPx(node.h),
    boxSizing: 'border-box',
  }

  switch (node.type) {
    case 'rect':
      return (
        <div
          key={key}
          style={{
            ...abs,
            background: tokCss(node.fill),
            opacity: node.transparency != null ? 1 - node.transparency / 100 : 1,
            borderRadius: node.radius > 0 ? Math.round(node.radius * 72) : 0,
            boxShadow: node.shadow ? CARD_SHADOW_CSS : undefined,
            border: 'none',
          }}
        />
      )
    case 'oval':
      return (
        <div
          key={key}
          style={{
            ...abs,
            background: tokCss(node.fill),
            opacity: node.transparency != null ? 1 - node.transparency / 100 : 1,
            borderRadius: '50%',
          }}
        />
      )
    case 'text': {
      const justify =
        node.align === 'center' ? 'center' : node.align === 'right' ? 'flex-end' : 'flex-start'
      const alignItems =
        node.valign === 'middle' ? 'center' : node.valign === 'bottom' ? 'flex-end' : 'flex-start'
      return (
        <div
          key={key}
          style={{ ...abs, display: 'flex', alignItems, justifyContent: justify, padding: node.margin || 0 }}
        >
          <span
            style={{
              color: tokCss(node.fill),
              fontSize: node.fontPx,
              fontWeight: node.bold ? 700 : 400,
              fontStyle: node.italic ? 'italic' : 'normal',
              textAlign: node.align,
              lineHeight: 1.3,
              fontFamily: FONT_BODY,
              width: '100%',
            }}
          >
            {node.content}
          </span>
        </div>
      )
    }
    case 'image':
      return (
        <img
          key={key}
          src={webSrc(node.src)}
          alt=""
          style={{
            ...abs,
            objectFit: 'contain',
            boxShadow: node.shadow ? CARD_SHADOW_CSS : undefined,
          }}
        />
      )
    default:
      return null
  }
}

export function renderDeckToSlides(deck) {
  return buildScenes(deck).map((scene, index) => (
    <div
      key={`slide-${index}`}
      style={{
        width: CANVAS.wPx,
        height: CANVAS.hPx,
        position: 'relative',
        background: tokCss(scene.background),
        fontFamily: FONT_BODY,
        overflow: 'hidden',
      }}
    >
      {scene.children.map((node, i) => renderNode(node, i))}
    </div>
  ))
}
