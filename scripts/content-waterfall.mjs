#!/usr/bin/env node
/**
 * Content waterfall state.
 *
 * One idea, four channels, one asset at a time.
 * Order: newsletter, then YouTube, then LinkedIn, then X.
 * Reads and writes only the vault at VAULT_PATH (default ../Samy-SmartOS).
 * Never writes raw/. Never overwrites an existing draft file.
 * Never posts, schedules, uploads, or sends.
 *
 *   node scripts/content-waterfall.mjs status --title "How to design with AI"
 *   node scripts/content-waterfall.mjs next --title "How to design with AI"
 *   node scripts/content-waterfall.mjs next --title "..." --channel linkedin --asset carousel
 *   node scripts/content-waterfall.mjs init --title "..."
 *   node scripts/content-waterfall.mjs link --title "..." --channel linkedin --folder "How to design with AI 1"
 *   node scripts/content-waterfall.mjs skip --title "..." --channel x --asset thread
 *   node scripts/content-waterfall.mjs approve --title "..." --channel newsletter --yes
 *   node scripts/content-waterfall.mjs self-test
 */

import fs from 'fs'
import os from 'os'
import path from 'path'
import { spawnSync } from 'child_process'
import { fileURLToPath } from 'url'
import {
  CHANNELS,
  REPO_ROOT,
  assertChannel,
  assertContentWrite,
  assertTitle,
  contentDir,
  resolveVaultPath,
} from './lib/vault.mjs'

const SCRIPT_PATH = fileURLToPath(import.meta.url)
const CONFIG_PATH = path.join(REPO_ROOT, 'pipelines', 'platforms.json')
const RESERVED_ROOT = new Set(['brief.md'])

function loadConfig() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))
  if (!Array.isArray(config.order) || config.order.join() !== CHANNELS.join()) {
    throw new Error('pipelines/platforms.json order must be newsletter, youtube, linkedin, x.')
  }
  return config
}

function parseArgs(argv) {
  const out = { _: [] }
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i]
    if (!token.startsWith('--')) {
      out._.push(token)
      continue
    }
    const key = token.slice(2)
    const next = argv[i + 1]
    if (next === undefined || next.startsWith('--')) out[key] = true
    else {
      out[key] = next
      i++
    }
  }
  return out
}

function emit(payload, code = 0) {
  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`)
  process.exit(code)
}

function fail(code, error, extra = {}) {
  emit({ ok: false, error, ...extra }, code)
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function writeJson(vault, file, data) {
  assertContentWrite(vault, file)
  const dir = path.dirname(file)
  fs.mkdirSync(dir, { recursive: true })
  const tmp = `${file}.tmp`
  fs.writeFileSync(tmp, `${JSON.stringify(data, null, 2)}\n`)
  fs.renameSync(tmp, file)
}

function listDirs(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
}

function findManifests(vault, title) {
  const hits = []
  for (const channel of CHANNELS) {
    for (const bucket of ['drafts', 'published']) {
      const base = path.join(vault, 'outputs', 'content', channel, bucket)
      for (const name of listDirs(base)) {
        const file = path.join(base, name, 'waterfall.json')
        if (!fs.existsSync(file)) continue
        let data
        try {
          data = readJson(file)
        } catch {
          continue
        }
        if (data && data.title === title) {
          hits.push({ file, data, channel, bucket, folder: name })
        }
      }
    }
  }
  hits.sort((a, b) => {
    const score = (hit) => CHANNELS.indexOf(hit.channel) + (hit.bucket === 'drafts' ? 0 : 10)
    return score(a) - score(b)
  })
  return hits
}

function folderHasWork(dir) {
  if (!dir || !fs.existsSync(dir)) return false
  return fs.readdirSync(dir).some((name) => name !== 'waterfall.json' && name !== 'Assets')
}

function resolveFolder(vault, channel, title, manifest) {
  const linked = manifest?.folders?.[channel]
  const names = []
  if (typeof linked === 'string' && linked.trim()) names.push(linked.trim())
  if (!names.includes(title)) names.push(title)
  let publishedHit = null
  for (const name of names) {
    const draftDir = contentDir(vault, channel, 'drafts', name)
    const publishedDir = contentDir(vault, channel, 'published', name)
    const draftExists = fs.existsSync(draftDir) && fs.statSync(draftDir).isDirectory()
    const publishedExists = fs.existsSync(publishedDir) && fs.statSync(publishedDir).isDirectory()
    if (draftExists && (folderHasWork(draftDir) || !publishedExists)) {
      return { name, bucket: 'drafts', dir: draftDir }
    }
    if (publishedExists) publishedHit = { name, bucket: 'published', dir: publishedDir }
  }
  if (publishedHit) return publishedHit
  return { name: names[0], bucket: null, dir: null }
}

function rootMarkdown(dir) {
  if (!dir || !fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((name) => name.endsWith('.md') && !name.startsWith('.'))
}

function siblingReserved(assets, asset) {
  const reserved = new Set(RESERVED_ROOT)
  for (const other of assets) {
    if (other.id === asset.id) continue
    for (const file of other.files || []) {
      if (!file.includes('/')) reserved.add(path.basename(file))
    }
  }
  return reserved
}

function filePresent(dir, rel) {
  if (!dir) return null
  const abs = path.join(dir, rel)
  if (fs.existsSync(abs) && fs.statSync(abs).isFile()) return abs
  return null
}

function assetHit(dir, asset, assets) {
  for (const rel of asset.files || []) {
    const abs = filePresent(dir, rel)
    if (abs) return { present: true, path: abs, via: rel }
  }
  if (asset.acceptPrimaryMarkdown && dir) {
    const named = new Set((asset.files || []).map((file) => path.basename(file)))
    const reserved = siblingReserved(assets, asset)
    const candidates = rootMarkdown(dir).filter((name) => !reserved.has(name) && !named.has(name))
    if (candidates.length > 0) {
      return { present: true, path: path.join(dir, candidates[0]), via: 'existing-draft' }
    }
  }
  return { present: false, path: null, via: null }
}

function scanAssets(config, folders) {
  const found = {}
  for (const channel of config.order) {
    const assets = config.platforms[channel].assets
    const dir = folders[channel].dir
    for (const asset of assets) {
      found[`${channel}/${asset.id}`] = {
        channel,
        id: asset.id,
        label: asset.label,
        required: Boolean(asset.required),
        ...assetHit(dir, asset, assets),
        satisfiedBy: null,
      }
    }
    for (const asset of assets) {
      const key = `${channel}/${asset.id}`
      if (found[key].present) continue
      for (const otherId of asset.satisfiedByAssets || []) {
        const other = found[`${channel}/${otherId}`]
        if (other?.present) {
          found[key] = {
            ...found[key],
            present: true,
            path: other.path,
            via: `satisfied-by:${otherId}`,
            satisfiedBy: otherId,
          }
          break
        }
      }
    }
  }
  return found
}

function skippedSet(manifest) {
  return new Set(Array.isArray(manifest?.skipped) ? manifest.skipped : [])
}

function pickNext(config, assets, manifest, { channel, assetId, includeOptional }) {
  const skipped = skippedSet(manifest)
  const channels = channel ? [channel] : config.order
  const considerOptional = Boolean(channel || includeOptional || assetId)
  for (const name of channels) {
    for (const asset of config.platforms[name].assets) {
      if (assetId && asset.id !== assetId) continue
      const key = `${name}/${asset.id}`
      if (skipped.has(key)) continue
      if (!considerOptional && !asset.required) continue
      const hit = assets[key]
      if (!hit.present) {
        return { channel: name, asset, key, present: false }
      }
      if (assetId) return { channel: name, asset, key, present: true, path: hit.path, via: hit.via }
    }
  }
  return null
}

function snapshot(config, assets, folders, manifest) {
  const view = {}
  for (const channel of config.order) {
    const folder = folders[channel]
    view[channel] = {
      folder: folder.bucket ? folder.name : null,
      stage: folder.bucket === 'published' ? 'published' : folder.bucket === 'drafts' ? 'draft' : 'missing',
      assets: {},
    }
    for (const asset of config.platforms[channel].assets) {
      const key = `${channel}/${asset.id}`
      const hit = assets[key]
      let status = 'missing'
      if (skippedSet(manifest).has(key)) status = 'skipped'
      else if (hit.present) status = 'present'
      view[channel].assets[asset.id] = {
        status,
        required: Boolean(asset.required),
        via: hit.via,
        path: hit.path,
      }
    }
  }
  return view
}

function describeNext(config, choice, folders, title) {
  if (!choice) return null
  const folder = folders[choice.channel]
  const draftDir = folder.dir || contentDir(resolveVaultPath(), choice.channel, 'drafts', folder.name || title)
  return {
    channel: choice.channel,
    asset: choice.asset.id,
    label: choice.asset.label,
    required: Boolean(choice.asset.required),
    present: Boolean(choice.present),
    path: choice.path || null,
    via: choice.via || null,
    file: choice.asset.files[0],
    writer: config.platforms[choice.channel].writer,
    draftDir,
    handsTo: choice.asset.handsTo || null,
    action: choice.present ? 'exists' : 'write',
  }
}

function summary(config, view, next) {
  const present = []
  const missing = []
  for (const channel of config.order) {
    for (const [id, asset] of Object.entries(view[channel].assets)) {
      const label = `${channel}/${id}`
      if (asset.status === 'present') present.push(label)
      else if (asset.status === 'missing' && asset.required) missing.push(label)
    }
  }
  const nextLabel = next ? `${next.channel}/${next.asset}` : 'none'
  return `Next: ${nextLabel}. Present: ${present.join(', ') || 'none'}. Missing required: ${missing.join(', ') || 'none'}.`
}

function blankManifest(title) {
  return {
    title,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    notes: '',
    folders: { newsletter: null, youtube: null, linkedin: null, x: null },
    approval: { newsletter: null, youtube: null, linkedin: null, x: null },
    skipped: [],
    lastNext: null,
  }
}

function mergeManifest(prev, next) {
  const keep = {}
  if (prev && typeof prev === 'object') {
    for (const [key, value] of Object.entries(prev)) {
      if (!['title', 'created', 'updated', 'notes', 'folders', 'approval', 'skipped', 'lastNext', 'assets'].includes(key)) {
        keep[key] = value
      }
    }
  }
  return {
    ...keep,
    title: next.title,
    created: prev?.created || next.created,
    updated: next.updated,
    notes: typeof prev?.notes === 'string' ? prev.notes : '',
    folders: { ...blankManifest(next.title).folders, ...(prev?.folders || {}), ...(next.folders || {}) },
    approval: { ...blankManifest(next.title).approval, ...(prev?.approval || {}), ...(next.approval || {}) },
    skipped: Array.isArray(next.skipped) ? next.skipped : (prev?.skipped || []),
    lastNext: next.lastNext === undefined ? (prev?.lastNext || null) : next.lastNext,
    assets: next.assets,
  }
}

function manifestChanged(prev, next) {
  if (!prev) return true
  const strip = ({ updated, ...rest }) => rest
  return JSON.stringify(strip(prev)) !== JSON.stringify(strip(next))
}

function preferredManifestPath(vault, title, folders, existing) {
  if (folders.newsletter?.dir) return path.join(folders.newsletter.dir, 'waterfall.json')
  if (existing?.file) return existing.file
  return path.join(contentDir(vault, 'newsletter', 'drafts', title), 'waterfall.json')
}

function loadState(vault, title) {
  const config = loadConfig()
  if (!fs.existsSync(vault) || !fs.statSync(vault).isDirectory()) {
    const error = new Error(`Vault not found at ${vault}. Set VAULT_PATH in .env (default ../Samy-SmartOS).`)
    error.code = 2
    throw error
  }
  const hits = findManifests(vault, title)
  const existing = hits[0] || null
  const manifest = existing?.data || null
  const folders = {}
  for (const channel of config.order) folders[channel] = resolveFolder(vault, channel, title, manifest)
  const assets = scanAssets(config, folders)
  return { config, manifest, existing, folders, assets, hits }
}

function assetView(config, assets) {
  const view = {}
  for (const [key, hit] of Object.entries(assets)) {
    view[key] = { status: hit.present ? 'present' : 'missing', via: hit.via }
  }
  return view
}

function buildManifest(title, prev, folders, assets, config, patch = {}) {
  const folderNames = {}
  const approval = {}
  for (const channel of config.order) {
    folderNames[channel] = folders[channel].bucket ? folders[channel].name : (prev?.folders?.[channel] || null)
    if (folders[channel].bucket === 'published') approval[channel] = 'published'
    else if (folders[channel].bucket === 'drafts') approval[channel] = prev?.approval?.[channel] === 'published' ? 'published' : 'draft'
    else approval[channel] = prev?.approval?.[channel] || null
  }
  return mergeManifest(prev, {
    title,
    created: prev?.created || new Date().toISOString(),
    updated: new Date().toISOString(),
    folders: { ...folderNames, ...(patch.folders || {}) },
    approval,
    skipped: patch.skipped || prev?.skipped || [],
    lastNext: patch.lastNext === undefined ? prev?.lastNext || null : patch.lastNext,
    assets: assetView(config, assets),
  })
}

function saveManifest(vault, title, state, patch = {}) {
  const next = buildManifest(title, state.manifest, state.folders, state.assets, state.config, patch)
  const target = preferredManifestPath(vault, title, state.folders, state.existing)
  if (state.manifest && !manifestChanged(state.manifest, next) && state.existing?.file === target) {
    return { manifest: state.manifest, wrote: false, file: state.existing.file }
  }
  if (fs.existsSync(target)) {
    let current
    try {
      current = readJson(target)
    } catch {
      throw new Error(`Refusing to overwrite ${target}. It is not a waterfall manifest.`)
    }
    if (!current || current.title !== title) {
      throw new Error(`Refusing to overwrite ${target}. It belongs to a different idea.`)
    }
  }
  writeJson(vault, target, next)
  return { manifest: next, wrote: true, file: target }
}

function requireVault(vault) {
  if (!fs.existsSync(vault)) {
    fail(2, `Vault not found at ${vault}. Set VAULT_PATH in .env (default ../Samy-SmartOS).`)
  }
}

function commandStatus(vault, title, { write }) {
  requireVault(vault)
  const state = loadState(vault, title)
  const choice = pickNext(state.config, state.assets, state.manifest, {})
  const next = describeNext(state.config, choice, state.folders, title)
  const view = snapshot(state.config, state.assets, state.folders, state.manifest)
  let manifestFile = state.existing?.file || null
  if (write && (state.existing || Object.values(state.folders).some((folder) => folder.dir))) {
    const saved = saveManifest(vault, title, state)
    manifestFile = saved.file
  }
  emit({
    ok: true,
    command: 'status',
    title,
    vault,
    manifest: manifestFile,
    summary: summary(state.config, view, next),
    next,
    channels: view,
  })
}

function commandNext(vault, title, args) {
  requireVault(vault)
  const state = loadState(vault, title)
  const channel = args.channel ? assertChannel(args.channel) : null
  const assetId = typeof args.asset === 'string' ? args.asset : null
  if (assetId && !channel) fail(1, 'Pass --channel with --asset.')
  if (channel && assetId && !state.config.platforms[channel].assets.some((asset) => asset.id === assetId)) {
    fail(1, `Unknown asset "${assetId}" for ${channel}.`)
  }
  const choice = pickNext(state.config, state.assets, state.manifest, {
    channel,
    assetId,
    includeOptional: Boolean(args['include-optional']),
  })
  const next = describeNext(state.config, choice, state.folders, title)
  if (state.existing || Object.values(state.folders).some((folder) => folder.dir)) {
    saveManifest(vault, title, state, {
      lastNext: next ? { channel: next.channel, asset: next.asset, at: new Date().toISOString() } : null,
    })
  }
  emit({
    ok: true,
    command: 'next',
    title,
    vault,
    summary: summary(state.config, snapshot(state.config, state.assets, state.folders, state.manifest), next),
    next,
    note: next?.action === 'exists'
      ? 'This asset already exists. Do not write another copy.'
      : 'Write only this asset. Leave every other file as it is.',
  })
}

function commandInit(vault, title) {
  requireVault(vault)
  const draft = contentDir(vault, 'newsletter', 'drafts', title)
  const published = contentDir(vault, 'newsletter', 'published', title)
  const existingDraftFiles = fs.existsSync(draft)
    ? fs.readdirSync(draft).filter((name) => name !== 'waterfall.json')
    : []
  if (!fs.existsSync(published)) {
    fs.mkdirSync(path.join(draft, 'Assets'), { recursive: true })
    assertContentWrite(vault, path.join(draft, 'waterfall.json'))
  }
  const state = loadState(vault, title)
  const saved = saveManifest(vault, title, state, {
    folders: { newsletter: state.folders.newsletter.name || title },
  })
  emit({
    ok: true,
    command: 'init',
    title,
    vault,
    manifest: saved.file,
    wrote: saved.wrote,
    preserved: existingDraftFiles,
    note: 'Draft files already in the folder were left unchanged. Nothing was posted.',
  })
}

function commandLink(vault, title, args) {
  requireVault(vault)
  const channel = assertChannel(args.channel)
  const folder = assertTitle(args.folder)
  const located = ['drafts', 'published']
    .map((bucket) => ({ bucket, dir: contentDir(vault, channel, bucket, folder) }))
    .find((item) => fs.existsSync(item.dir))
  if (!located) {
    fail(1, `No ${channel} folder named "${folder}" under drafts/ or published/.`)
  }
  const state = loadState(vault, title)
  state.manifest = state.manifest || blankManifest(title)
  state.manifest.folders = { ...(state.manifest.folders || {}), [channel]: folder }
  state.folders[channel] = { name: folder, bucket: located.bucket, dir: located.dir }
  state.assets = scanAssets(state.config, state.folders)
  const saved = saveManifest(vault, title, state, { folders: { [channel]: folder } })
  emit({
    ok: true,
    command: 'link',
    title,
    channel,
    folder,
    bucket: located.bucket,
    manifest: saved.file,
    note: 'Linked the existing folder. No draft file was modified.',
  })
}

function commandSkip(vault, title, args) {
  requireVault(vault)
  const channel = assertChannel(args.channel)
  const state = loadState(vault, title)
  const ids = args.asset
    ? [args.asset]
    : state.config.platforms[channel].assets.map((asset) => asset.id)
  for (const id of ids) {
    if (!state.config.platforms[channel].assets.some((asset) => asset.id === id)) {
      fail(1, `Unknown asset "${id}" for ${channel}.`)
    }
  }
  const skipped = new Set(skippedSet(state.manifest))
  const keys = ids.map((id) => `${channel}/${id}`)
  if (args.undo) keys.forEach((key) => skipped.delete(key))
  else keys.forEach((key) => skipped.add(key))
  if (!state.existing && !Object.values(state.folders).some((folder) => folder.dir)) {
    fail(1, 'Run init before skip, so the manifest has a folder to live in.')
  }
  const saved = saveManifest(vault, title, state, { skipped: [...skipped] })
  emit({
    ok: true,
    command: 'skip',
    title,
    skipped: saved.manifest.skipped,
    manifest: saved.file,
  })
}

function commandApprove(vault, title, args) {
  requireVault(vault)
  const channel = assertChannel(args.channel)
  const state = loadState(vault, title)
  const folder = state.folders[channel]
  if (folder.bucket === 'published') {
    emit({
      ok: true,
      command: 'approve',
      title,
      channel,
      already: true,
      path: folder.dir,
      note: 'Already in published/. Nothing was posted.',
    })
  }
  if (folder.bucket !== 'drafts' || !folder.dir) {
    fail(1, `No ${channel} draft folder for "${title}".`)
  }
  const destination = contentDir(vault, channel, 'published', folder.name)
  if (fs.existsSync(destination)) {
    fail(1, `Refusing to overwrite published folder ${destination}.`)
  }
  if (!args.yes) {
    fail(1, 'Refusing to move the draft. Re-run with --yes only after Samy says this piece is published. Nothing is posted.', {
      wouldMove: { from: folder.dir, to: destination },
    })
  }
  assertContentWrite(vault, folder.dir)
  assertContentWrite(vault, destination)
  fs.mkdirSync(path.dirname(destination), { recursive: true })
  fs.renameSync(folder.dir, destination)
  const after = loadState(vault, title)
  const saved = saveManifest(vault, title, after, {
    folders: { [channel]: folder.name },
  })
  emit({
    ok: true,
    command: 'approve',
    title,
    channel,
    moved: { from: folder.dir, to: destination },
    manifest: saved.file,
    note: 'Moved the folder to published/. Nothing was posted or sent.',
  })
}

function commandPaths(vault, title) {
  const reads = [
    'CLAUDE.md',
    'raw/me/voice.md',
    'raw/me/proof.md',
    'raw/me/offer.md',
    'wiki/index.md',
    'wiki/content-os.md',
    'wiki/log.md',
  ]
  emit({
    ok: true,
    command: 'paths',
    title: title || null,
    vault,
    vaultExists: fs.existsSync(vault),
    read: Object.fromEntries(reads.map((rel) => [rel, {
      path: path.join(vault, rel),
      exists: fs.existsSync(path.join(vault, rel)),
    }])),
    channels: Object.fromEntries(CHANNELS.map((channel) => [channel, {
      drafts: path.join(vault, 'outputs', 'content', channel, 'drafts', title || '<title>'),
      published: path.join(vault, 'outputs', 'content', channel, 'published', title || '<title>'),
    }])),
    note: 'raw/ is read-only. This command does not copy files and does not post.',
  })
}

function help() {
  emit({
    ok: true,
    command: 'help',
    usage: [
      'status --title "<title>" [--write]',
      'next --title "<title>" [--channel <channel>] [--asset <id>]',
      'init --title "<title>"',
      'link --title "<title>" --channel <channel> --folder "<folder>"',
      'skip --title "<title>" --channel <channel> [--asset <id>] [--undo]',
      'approve --title "<title>" --channel <channel> --yes',
      'paths [--title "<title>"]',
      'self-test',
    ],
    order: CHANNELS,
    note: 'One shared waterfall. One asset at a time. Nothing is posted.',
  })
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function runCli(args, vault) {
  return spawnSync(process.execPath, [SCRIPT_PATH, ...args], {
    env: { ...process.env, VAULT_PATH: vault },
    encoding: 'utf8',
  })
}

function parseOut(result) {
  try {
    return JSON.parse(result.stdout)
  } catch {
    throw new Error(`Expected JSON.\nstdout: ${result.stdout}\nstderr: ${result.stderr}`)
  }
}

function selfTest() {
  const vault = fs.mkdtempSync(path.join(os.tmpdir(), 'waterfall-'))
  const title = 'How to design with AI'
  const newsletter = contentDir(vault, 'newsletter', 'drafts', title)
  fs.mkdirSync(newsletter, { recursive: true })
  const samyDraft = path.join(newsletter, 'How to design with AI.md')
  fs.writeFileSync(samyDraft, 'SAMY DRAFT\n')
  fs.mkdirSync(path.join(vault, 'raw', 'me'), { recursive: true })
  fs.writeFileSync(path.join(vault, 'raw', 'me', 'proof.md'), 'proof\n')

  const init = parseOut(runCli(['init', '--title', title], vault))
  assert(init.ok, 'init should succeed')
  assert(fs.readFileSync(samyDraft, 'utf8') === 'SAMY DRAFT\n', 'init must not change an existing draft')
  assert(fs.existsSync(path.join(newsletter, 'waterfall.json')), 'init should write waterfall.json')

  const manifest = readJson(path.join(newsletter, 'waterfall.json'))
  manifest.notes = 'keep this'
  fs.writeFileSync(path.join(newsletter, 'waterfall.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  const initAgain = parseOut(runCli(['init', '--title', title], vault))
  assert(initAgain.ok, 'second init should succeed')
  assert(readJson(path.join(newsletter, 'waterfall.json')).notes === 'keep this', 'notes must survive init')
  assert(fs.readFileSync(samyDraft, 'utf8') === 'SAMY DRAFT\n', 'second init must not change the draft')

  const status = parseOut(runCli(['status', '--title', title], vault))
  assert(status.channels.newsletter.assets.issue.status === 'present', 'existing markdown counts as the issue')
  assert(status.next.channel === 'youtube' && status.next.asset === 'script', 'default next is the YouTube script')

  const newsletterNext = parseOut(runCli(['next', '--title', title, '--channel', 'newsletter'], vault))
  assert(newsletterNext.next.asset === 'thumbnail', 'channel next continues with the thumbnail')

  const youtube = contentDir(vault, 'youtube', 'drafts', title)
  fs.mkdirSync(youtube, { recursive: true })
  fs.writeFileSync(path.join(youtube, 'Script.md'), 'script\n')
  const afterScript = parseOut(runCli(['next', '--title', title], vault))
  assert(afterScript.next.channel === 'youtube' && afterScript.next.asset === 'titles', 'script on disk advances to titles')

  fs.writeFileSync(path.join(youtube, 'titles.md'), 'titles\n')
  fs.writeFileSync(path.join(youtube, 'description.md'), 'description\n')
  const afterYoutube = parseOut(runCli(['next', '--title', title], vault))
  assert(afterYoutube.next.channel === 'linkedin' && afterYoutube.next.asset === 'post', 'finished YouTube required assets move to LinkedIn')

  const carousel = parseOut(runCli(['next', '--title', title, '--channel', 'linkedin', '--asset', 'carousel'], vault))
  assert(carousel.next.asset === 'carousel' && carousel.next.action === 'write', 'a named asset can be requested on its own')
  assert(!fs.existsSync(contentDir(vault, 'linkedin', 'drafts', title)), 'requesting an asset must not create the draft')

  const linkedin = contentDir(vault, 'linkedin', 'drafts', 'How to design with AI 1')
  fs.mkdirSync(linkedin, { recursive: true })
  fs.writeFileSync(path.join(linkedin, 'How to design with AI.md'), 'LINKEDIN\n')
  const link = parseOut(runCli(['link', '--title', title, '--channel', 'linkedin', '--folder', 'How to design with AI 1'], vault))
  assert(link.ok, 'link should succeed')
  assert(fs.readFileSync(path.join(linkedin, 'How to design with AI.md'), 'utf8') === 'LINKEDIN\n', 'link must not change the draft')
  const linked = parseOut(runCli(['status', '--title', title], vault))
  assert(linked.channels.linkedin.assets.post.status === 'present', 'linked folder counts')

  const skipped = parseOut(runCli(['skip', '--title', title, '--channel', 'x'], vault))
  assert(skipped.skipped.includes('x/article'), 'skip records the channel')
  const afterSkip = parseOut(runCli(['next', '--title', title], vault))
  assert(afterSkip.next === null, 'skipping the remaining required channel finishes the default queue')

  const refused = runCli(['approve', '--title', title, '--channel', 'newsletter'], vault)
  assert(refused.status === 1, 'approve without --yes must fail')
  assert(fs.existsSync(samyDraft), 'refused approve must leave the draft in place')

  const approved = parseOut(runCli(['approve', '--title', title, '--channel', 'newsletter', '--yes'], vault))
  assert(approved.ok && approved.moved.to.endsWith(path.join('published', title)), 'approve --yes moves the folder')
  assert(!fs.existsSync(newsletter), 'draft path is gone after the move')
  assert(fs.readFileSync(path.join(approved.moved.to, 'How to design with AI.md'), 'utf8') === 'SAMY DRAFT\n', 'moved draft text is intact')
  const reinit = parseOut(runCli(['init', '--title', title], vault))
  assert(reinit.ok, 'init after publish should succeed')
  assert(!fs.existsSync(newsletter), 'init after publish must not recreate the draft folder')
  const publishedStatus = parseOut(runCli(['status', '--title', title], vault))
  assert(publishedStatus.channels.newsletter.stage === 'published', 'published issue stays published')
  assert(publishedStatus.channels.newsletter.assets.issue.status === 'present', 'published issue still counts')

  fs.mkdirSync(contentDir(vault, 'youtube', 'published', title), { recursive: true })
  const clash = runCli(['approve', '--title', title, '--channel', 'youtube', '--yes'], vault)
  assert(clash.status === 1, 'approve must refuse to overwrite published/')
  assert(fs.existsSync(path.join(youtube, 'Script.md')), 'refused overwrite leaves the draft')

  const badTitle = runCli(['init', '--title', '../raw/me'], vault)
  assert(badTitle.status === 1, 'path titles are rejected')
  assert(fs.readFileSync(path.join(vault, 'raw', 'me', 'proof.md'), 'utf8') === 'proof\n', 'raw/ stays untouched')

  const missing = runCli(['status', '--title', title], path.join(vault, 'missing-vault'))
  assert(missing.status === 2, 'a missing vault is a distinct error')

  emit({ ok: true, command: 'self-test', vault })
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  const command = args._[0] || 'help'
  try {
    if (command === 'help') help()
    if (command === 'self-test') selfTest()
    const vault = resolveVaultPath()
    const title = command === 'paths' && !args.title ? null : command === 'paths' ? assertTitle(args.title) : assertTitle(args.title)
    if (command === 'paths') commandPaths(vault, title)
    if (command === 'status') commandStatus(vault, title, { write: Boolean(args.write) })
    if (command === 'next') commandNext(vault, title, args)
    if (command === 'init') commandInit(vault, title)
    if (command === 'link') {
      if (!args.channel || !args.folder) fail(1, 'link needs --channel and --folder.')
      commandLink(vault, title, args)
    }
    if (command === 'skip') {
      if (!args.channel) fail(1, 'skip needs --channel.')
      commandSkip(vault, title, args)
    }
    if (command === 'approve') commandApprove(vault, title, args)
    fail(1, `Unknown command "${command}".`)
  } catch (error) {
    fail(error.code === 2 ? 2 : 1, error.message)
  }
}

main()
