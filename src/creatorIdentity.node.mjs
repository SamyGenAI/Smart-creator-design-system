// Node-side resolver for the gitignored creator-identity override.
//
// The browser/Vite path lives in ./creatorIdentity.js and uses import.meta.glob.
// Standalone .mjs scripts (pptx export, preview sync) have no glob, so they call
// this helper instead. Returns the neutral placeholder when no override exists.
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import {
  CREATOR_FIRST_NAME as FALLBACK_FIRST_NAME,
  CREATOR_LAST_NAME as FALLBACK_LAST_NAME,
} from './creatorIdentity.js'

export async function resolveCreatorIdentity() {
  const overrideUrl = new URL('./creatorIdentity.local.js', import.meta.url)

  let first = FALLBACK_FIRST_NAME
  let last = FALLBACK_LAST_NAME

  if (existsSync(fileURLToPath(overrideUrl))) {
    const local = await import(overrideUrl.href)
    first = local.CREATOR_FIRST_NAME || first
    last = local.CREATOR_LAST_NAME || last
  }

  return {
    CREATOR_FIRST_NAME: first,
    CREATOR_LAST_NAME: last,
    CREATOR_DISPLAY_NAME: `${first} ${last}`.trim(),
  }
}
