import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const LIB_DIR = path.dirname(fileURLToPath(import.meta.url))
export const REPO_ROOT = path.resolve(LIB_DIR, '../..')
export const CHANNELS = ['newsletter', 'youtube', 'linkedin', 'x']

let envLoaded = false

export function loadEnvFile() {
  if (envLoaded) return
  envLoaded = true
  const envPath = path.join(REPO_ROOT, '.env')
  if (!fs.existsSync(envPath)) return
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim()
    if (key && process.env[key] === undefined) process.env[key] = value
  }
}

export function resolveVaultPath() {
  loadEnvFile()
  const configured = process.env.VAULT_PATH?.trim() || '../Samy-SmartOS'
  return path.resolve(REPO_ROOT, configured)
}

export function assertTitle(title) {
  if (typeof title !== 'string' || !title.trim()) {
    throw new Error('Pass --title "<title>".')
  }
  const clean = title.trim()
  if (clean.length > 180) throw new Error('Title is too long.')
  if (/[/\\]/.test(clean) || clean.includes('..') || clean.startsWith('.')) {
    throw new Error('Title cannot be a path.')
  }
  return clean
}

export function assertChannel(channel) {
  if (!CHANNELS.includes(channel)) {
    throw new Error(`Unknown channel "${channel}". Use one of: ${CHANNELS.join(', ')}.`)
  }
  return channel
}

/** Refuse any write outside outputs/content/<channel>/{drafts,published}/. raw/ stays read-only. */
export function assertContentWrite(vaultRoot, target) {
  const vault = path.resolve(vaultRoot)
  const abs = path.resolve(target)
  const rel = path.relative(vault, abs)
  if (!rel || rel.startsWith('..') || path.isAbsolute(rel)) {
    throw new Error(`Refusing to write outside the vault: ${abs}`)
  }
  const parts = rel.split(path.sep).filter(Boolean)
  if (parts[0] === 'raw') throw new Error('Refusing to write raw/. It is read-only.')
  if (parts[0] !== 'outputs' || parts[1] !== 'content') {
    throw new Error('Refusing to write outside outputs/content/.')
  }
  if (!CHANNELS.includes(parts[2])) throw new Error(`Unknown channel "${parts[2]}".`)
  if (parts[3] !== 'drafts' && parts[3] !== 'published') {
    throw new Error('Refusing to write outside drafts/ or published/.')
  }
  return abs
}

export function contentDir(vaultRoot, channel, bucket, folderName) {
  return path.join(vaultRoot, 'outputs', 'content', channel, bucket, folderName)
}
