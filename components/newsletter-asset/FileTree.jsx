/**
 * FileTree — a folder tree with drawn connector lines, side annotations and
 * optional coloured zones. Set in the body font: connectors are CSS lines in
 * fixed-width indent cells, so alignment never depends on a mono typeface.
 *
 * Data, not markup: pass one root node.
 *
 *   node = {
 *     name      {string}   — 'raw/' (trailing slash = folder) or 'AGENTS.md'
 *     children  {node[]}   — nested nodes; `{ spacer: true }` is a short gap
 *     note      {string}   — side annotation, rendered as "← note"
 *     chip      {string}   — short label pill before the note (zone headers);
 *                            sentence case, never all caps
 *     zone      {{ band, chip }} — CSS colours: `band` paints a soft panel
 *                            behind this node + its subtree, `chip` fills the pill
 *     strong    {boolean}  — bold name (the lines the reader must not miss)
 *   }
 *
 * tone: 'dark' (inside CodeEditorWindow) or 'light' (straight on the canvas).
 *
 * LOCAL-ONLY: this folder is gitignored.
 */

import { useId } from 'react'

const FONT_BODY = 'var(--font\\/family\\/body)'
const mix = (token, pct) => `color-mix(in srgb, var(${token}) ${pct}%, transparent)`

const TONES = {
  dark: {
    name: 'var(--text\\/invert)',
    soft: mix('--text\\/invert', 82),
    note: mix('--text\\/invert', 68),
    guide: mix('--text\\/invert', 28),
    chipText: 'var(--theme-color-text-primary)',
    fileFill: 'var(--text\\/invert)',
    fileFold: mix('--theme-color-text-primary', 14),
    fileStroke: mix('--theme-color-text-primary', 25),
    fileLines: mix('--theme-color-text-primary', 18),
  },
  light: {
    name: 'var(--theme-color-text-primary)',
    soft: 'var(--theme-color-text-secondary)',
    note: 'var(--theme-color-text-secondary)',
    guide: 'var(--theme-color-text-muted)',
    chipText: 'var(--theme-color-text-primary)',
    fileFill: 'var(--theme-surface-glass-strong)',
    fileFold: mix('--theme-color-text-primary', 8),
    fileStroke: 'var(--theme-color-text-muted)',
    fileLines: mix('--theme-color-text-primary', 15),
  },
}

const ICON = 28
const LINE = 1.5

const isFolder = (node) => Boolean(node.children) || node.name.endsWith('/')

// macOS Finder-style folder: darker back panel with the tab, a lighter
// gradient front, and a thin highlight along the front's top edge. Built from
// the accent-1 pair so it follows the brand's blue.
const FOLDER_LIGHT = 'var(--theme-accent-1)'
const FOLDER_MID = 'var(--border\\/accent-1)'
const FOLDER_BACK = 'color-mix(in srgb, var(--border\\/accent-1) 78%, var(--theme-color-text-primary))'

function FolderIcon() {
  // useId() contains ':' — not safe inside url(#…).
  const id = `folder${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  return (
    <svg width={ICON} height={ICON * 0.8} viewBox="0 0 32 25.6" style={{ flex: 'none' }}>
      <defs>
        <linearGradient id={`${id}-front`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: FOLDER_LIGHT }} />
          <stop offset="1" style={{ stopColor: FOLDER_MID }} />
        </linearGradient>
      </defs>
      <path
        d="M1.5 4A2.5 2.5 0 0 1 4 1.5h7.2c.7 0 1.3.3 1.8.8L14.8 4H28a2.5 2.5 0 0 1 2.5 2.5V21a2.5 2.5 0 0 1-2.5 2.5H4A2.5 2.5 0 0 1 1.5 21z"
        style={{ fill: FOLDER_BACK }}
      />
      <path
        d="M1.5 10A2.5 2.5 0 0 1 4 7.5h24a2.5 2.5 0 0 1 2.5 2.5v11.6a2.5 2.5 0 0 1-2.5 2.5H4a2.5 2.5 0 0 1-2.5-2.5z"
        fill={`url(#${id}-front)`}
      />
      <path d="M4 8.3h24" style={{ stroke: mix('--text\\/invert', 70) }} strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  )
}

// macOS-style document: white page, folded corner, faint text lines.
function FileIcon({ c }) {
  return (
    <svg width={ICON} height={ICON * 0.8} viewBox="0 0 32 25.6" style={{ flex: 'none' }}>
      <g transform="translate(8.5 0.3)">
        <path
          d="M2 0.5h9.3L16.5 5.7V23.5a1.5 1.5 0 0 1-1.5 1.5H2A1.5 1.5 0 0 1 .5 23.5V2A1.5 1.5 0 0 1 2 .5z"
          style={{ fill: c.fileFill, stroke: c.fileStroke }}
          strokeWidth="0.8"
        />
        <path d="M11.3 0.5V4.2a1.5 1.5 0 0 0 1.5 1.5h3.7" style={{ fill: c.fileFold, stroke: c.fileStroke }} strokeWidth="0.8" strokeLinejoin="round" />
        {[10, 13.5, 17, 20.5].map((y, i) => (
          <path key={y} d={`M3.5 ${y}h${i === 3 ? 6 : 10}`} style={{ stroke: c.fileLines }} strokeWidth="1.1" strokeLinecap="round" />
        ))}
      </g>
    </svg>
  )
}

function Icon({ folder, c }) {
  return folder ? <FolderIcon /> : <FileIcon c={c} />
}

/**
 * One indent cell. The vertical line sits under the parent's icon centre.
 *   kind: 'pass' (│), 'tee' (├─), 'elbow' (└─), 'blank'
 */
function Cell({ kind, ctx }) {
  const x = ICON / 2 - LINE / 2
  const line = { position: 'absolute', background: ctx.c.guide }
  return (
    <span className="relative" style={{ width: ctx.indent, height: '100%', flex: 'none' }}>
      {(kind === 'pass' || kind === 'tee') && <span style={{ ...line, left: x, width: LINE, top: 0, bottom: 0 }} />}
      {kind === 'elbow' && <span style={{ ...line, left: x, width: LINE, top: 0, height: '50%' }} />}
      {(kind === 'tee' || kind === 'elbow') && (
        <span style={{ ...line, left: x, right: 6, height: LINE, top: `calc(50% - ${LINE / 2}px)` }} />
      )}
    </span>
  )
}

function Row({ node, cells, ctx }) {
  const { c } = ctx
  return (
    <div className="relative flex items-center" style={{ height: node.spacer ? ctx.spacerHeight : ctx.lineHeight }}>
      <div className="flex items-center" style={{ width: ctx.treeWidth, height: '100%', flex: 'none', whiteSpace: 'nowrap' }}>
        {cells.map((kind, i) => <Cell key={i} kind={kind} ctx={ctx} />)}
        {!node.spacer && <Icon folder={isFolder(node)} c={c} />}
        {!node.spacer && (
          <span
            style={{
              marginLeft: 10,
              color: node.strong ? c.name : c.soft,
              fontWeight: node.strong ? 700 : 500,
            }}
          >
            {node.name}
          </span>
        )}
      </div>
      {(node.chip || node.note) && (
        <div className="flex items-center" style={{ gap: 12, whiteSpace: 'nowrap' }}>
          {node.chip && (
            <span
              style={{
                background: node.zone?.chip ?? 'var(--theme-surface-glass-strong)',
                color: c.chipText,
                fontSize: ctx.fontSize * 0.8,
                fontWeight: 700,
                lineHeight: `${Math.round(ctx.fontSize * 1.4)}px`,
                padding: '0 12px',
                borderRadius: '999px',
              }}
            >
              {node.chip}
            </span>
          )}
          {node.note && (
            <span style={{ color: c.note, fontSize: ctx.fontSize * 0.9, fontWeight: 500 }}>
              <span style={{ marginRight: 8 }}>←</span>
              {node.note}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

/** `guides[i]` = does column i still carry an ancestor's line? */
function Branch({ nodes, guides, ctx }) {
  const lastIndex = nodes.findLastIndex((n) => !n.spacer)
  const pass = guides.map((on) => (on ? 'pass' : 'blank'))

  return nodes.map((node, i) => {
    if (node.spacer) {
      return <Row key={`spacer-${i}`} node={node} cells={[...pass, i < lastIndex ? 'pass' : 'blank']} ctx={ctx} />
    }
    const last = i === lastIndex
    const row = <Row node={node} cells={[...pass, last ? 'elbow' : 'tee']} ctx={ctx} />
    const children = node.children && (
      <Branch nodes={node.children} guides={[...guides, !last]} ctx={ctx} />
    )

    if (!node.zone) {
      return (
        <div key={node.name}>
          {row}
          {children}
        </div>
      )
    }

    // The panel starts where this node's icon starts, so ancestor lines stay
    // outside it and the subtree reads as one block.
    const depth = guides.length + 1
    return (
      <div key={node.name} className="relative">
        <div
          className="absolute"
          style={{
            left: depth * ctx.indent - 12,
            right: -12,
            top: 2,
            bottom: 2,
            borderRadius: '12px',
            background: node.zone.band,
          }}
        />
        <div className="relative">
          {row}
          {children}
        </div>
      </div>
    )
  })
}

export default function FileTree({
  root,
  tone = 'dark',
  fontSize = 22,
  lineHeight = 40,
  spacerHeight = 16,
  indent = 34,
  treeWidth = 440,
}) {
  const ctx = { c: TONES[tone], fontSize, lineHeight, spacerHeight, indent, treeWidth }
  return (
    <div style={{ fontFamily: FONT_BODY, fontSize, lineHeight: `${lineHeight}px` }} data-name="File-tree">
      <Row node={{ ...root, strong: true }} cells={[]} ctx={ctx} />
      <Branch nodes={root.children ?? []} guides={[]} ctx={ctx} />
    </div>
  )
}
