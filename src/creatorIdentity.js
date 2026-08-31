// Single source of truth for creator identity.
//
// This file is TRACKED and must stay neutral — it ships with the template.
// To use your real name locally without committing it, create:
//
//   src/creatorIdentity.local.js
//     export const CREATOR_FIRST_NAME = 'Ada'
//     export const CREATOR_LAST_NAME  = 'Lovelace'
//
// That file is gitignored. If it is absent (fresh clone, CI), the neutral
// placeholder below is used and everything still builds.
//
// Never hardcode a creator name in design/**/*.jsx — import from here instead.

const FALLBACK_FIRST_NAME = 'Your'
const FALLBACK_LAST_NAME = 'Name'

// import.meta.glob is compile-time Vite syntax, not a runtime function, so the
// call must stay unconditional and statically analyzable. Vite replaces it with
// the override's exports, or with an empty object when the file is absent — so a
// fresh clone falls back to the placeholder instead of failing to resolve.
// Under plain node (standalone .mjs decks) it is left untouched and throws, which
// the catch turns back into the placeholder; those use creatorIdentity.node.mjs.
let localOverride = {}
try {
  localOverride = Object.values(
    import.meta.glob('./creatorIdentity.local.js', { eager: true }),
  )[0] ?? {}
} catch {
  localOverride = {}
}

export const CREATOR_FIRST_NAME = localOverride.CREATOR_FIRST_NAME || FALLBACK_FIRST_NAME
export const CREATOR_LAST_NAME = localOverride.CREATOR_LAST_NAME || FALLBACK_LAST_NAME
export const CREATOR_DISPLAY_NAME = `${CREATOR_FIRST_NAME} ${CREATOR_LAST_NAME}`.trim()

// Avatar. The real headshot at CREATOR_AVATAR_SRC is gitignored, so a fresh
// clone falls back to the tracked neutral placeholder instead of a broken image.
// Consumers should render <img src={CREATOR_AVATAR_SRC} onError={avatarFallback} />.
export const CREATOR_AVATAR_SRC = '/assets/avatar/avatar-profile.png'
export const CREATOR_AVATAR_PLACEHOLDER_SRC = '/assets/avatar/avatar-placeholder.png'

/** onError handler: swap to the placeholder once, without an infinite loop. */
export function avatarFallback(event) {
  const img = event.currentTarget
  if (img.dataset.fallbackApplied) return
  img.dataset.fallbackApplied = 'true'
  img.src = CREATOR_AVATAR_PLACEHOLDER_SRC
}
