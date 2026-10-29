/**
 * VaultTreeAsset — the vault's architecture as one code-editor file tree.
 * Newsletter: "AI OS with Groks Bots", Layer 1 section (the second brain).
 *
 * Three zones carry the message: raw/ (sources), wiki/ (brain), outputs/
 * (work), with outputs split into agent/ vs human/. Simplified from the real
 * vault: .gitkeep files, screenshots, design sub-folders and everything inside
 * agent/ and human/ are collapsed. Never cut: AGENTS.md, raw/me/,
 * wiki/index.md, agent vs human.
 *
 * LOCAL-ONLY: this folder is gitignored.
 */
import NewsletterAssetCanvas from '../../components/newsletter-asset/NewsletterAssetCanvas.jsx'
import CodeEditorWindow from '../../components/newsletter-asset/CodeEditorWindow.jsx'
import FileTree from '../../components/newsletter-asset/FileTree.jsx'
import { CREATOR_FIRST_NAME } from '../../src/creatorIdentity.js'

export const WIDTH = 1080
export const HEIGHT = 1264
const WINDOW_WIDTH = 1000

const VAULT = `${CREATOR_FIRST_NAME} Smart OS`

// Zones on the dark editor: the accent at low strength for the panel, the
// solid accent for the pill.
const tint = (token, pct) => `color-mix(in srgb, var(${token}) ${pct}%, transparent)`
const ZONE = {
  raw:     { band: tint('--theme-accent-1', 20), chip: 'var(--theme-accent-1)' },
  wiki:    { band: tint('--theme-accent-2', 18), chip: 'var(--theme-accent-2)' },
  outputs: { band: tint('--text\\/invert', 8), chip: 'var(--theme-surface-glass-strong)' },
  agent:   { band: tint('--theme-accent-4', 24), chip: 'var(--theme-accent-4)' },
  human:   { band: tint('--theme-accent-3', 22), chip: 'var(--theme-accent-3)' },
}

const SPACER = { spacer: true }

const TREE = {
  name: `${VAULT}/`,
  children: [
    { name: 'AGENTS.md', strong: true, note: 'the rules every agent reads first' },
    { name: 'Home.md', note: 'my landing page' },
    SPACER,
    {
      name: 'raw/', strong: true, zone: ZONE.raw, chip: 'Layer 1 · Sources', note: 'never edited by agents',
      children: [
        {
          name: 'me/', strong: true,
          children: [
            { name: 'voice.md', note: 'how I write' },
            { name: 'proof.md', note: 'my real numbers and results' },
            { name: 'offer.md', note: 'what I sell' },
          ],
        },
        { name: 'ideas/', note: 'inbox for raw ideas' },
        { name: 'content/' },
        { name: 'design/', note: 'carousels, infographics, decks, thumbnails' },
        { name: 'gtm/' },
        { name: 'product/ · finance/ · life/' },
      ],
    },
    SPACER,
    {
      name: 'wiki/', strong: true, zone: ZONE.wiki, chip: 'The brain', note: 'compiled, agents write it',
      children: [
        { name: 'smart-os.md', note: 'top hub' },
        { name: 'content-os.md' },
        { name: 'design-os.md' },
        { name: 'gtm-os.md' },
        { name: 'index.md', strong: true, note: 'catalog of every page' },
        { name: 'log.md', note: 'what happened, when' },
        { name: 'prompt-library/' },
      ],
    },
    SPACER,
    {
      name: 'outputs/', strong: true, zone: ZONE.outputs, chip: 'The work', note: 'split by who made it',
      children: [
        { name: 'agent/', strong: true, zone: ZONE.agent, chip: 'Agents', note: 'drafts the bots produce' },
        { name: 'human/', strong: true, zone: ZONE.human, chip: 'Me', note: 'the polished version I keep' },
      ],
    },
  ],
}

export default function VaultTreeAsset() {
  return (
    <NewsletterAssetCanvas width={WIDTH} height={HEIGHT}>
      <CodeEditorWindow title={`~/${VAULT}`} width={WINDOW_WIDTH} bodyStyle={{ padding: '32px 40px 36px' }}>
        <FileTree root={TREE} tone="dark" />
      </CodeEditorWindow>
    </NewsletterAssetCanvas>
  )
}
