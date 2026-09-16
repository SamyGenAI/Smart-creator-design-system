# Build plan — Animated infographics + GIF export

> Hand this to a fresh Claude Code session. Scope: **infographics only**
> (1080×1350). Carousels, thumbnails and slide decks are untouched.
> Stack: **Vite only** — no webpack, no Remotion, no new runtime dependencies.

---

## 0. Context a cold session needs

### The core constraint (this decides the whole design)

CSS keyframe animations are **not deterministically seekable** from Playwright.
Screenshotting a running CSS animation captures whatever frame the compositor
happened to be on — the resulting GIF jitters and is not reproducible.

So animation must be **frame-as-input**, never frame-as-side-effect. Every
animated style is a pure function of an integer frame number. This is the
`useCurrentFrame()` model from Remotion; we implement that API locally (~80 lines)
rather than adopting Remotion, because Remotion bundles with webpack/Rspack and
this repo is Vite. Matching Remotion's API signatures anyway means design files
would port over nearly verbatim if that ever changes.

### What already exists and must be reused

| Thing | Where | Why it matters |
|---|---|---|
| Export server | `exportPlugin()` in `vite.config.js` | Already launches Playwright, loads `/?mode=…&export=1&texture=…`, waits for `document.fonts.ready` + images, screenshots the canvas. A GIF is this plus a frame loop. |
| Canvas locator | `vite.config.js` | Finds the design by inline size: `div[style*="width: 1080px"][style*="height: 1350px"]`. Reuse verbatim. |
| URL-param → context pattern | `components/shared/textures/TextureContext.jsx` | The proven way preview state reaches the headless export. **Copy this file's shape exactly** for motion. |
| Provider mount | `src/App.jsx:398` | `<TextureProvider>` wraps `<ActiveDesign />`. `<MotionProvider>` goes right alongside it. |
| Export dispatch | `handleExport()` / `exportLabel()` in `src/App.jsx` (~L146, ~L259) | Already switches on `entry.type`. Add the GIF branch here. |
| Mode registry | `src/modes.js` + `COMPONENTS` in `src/App.jsx` | Designs register in **both**. Never in `vite.config.js`. |
| Token lint | `scripts/lint-infographic-tokens.mjs` | **Blocks** (exit 1) any hex/rgb/hsl literal under `components/`. Governs the color-animation design below. |

### Verified facts (already tested — do not re-litigate)

`sharp` 0.34.5 is installed and encodes animated GIFs. **No new dependency is
needed.** Its API is fragile in two specific ways that were hit and ruled out:

- ✅ **Correct:** `pageHeight` goes **inside** the `raw` object.
  ```js
  sharp(Buffer.concat(rawFrames), {
    raw: { width: W, height: H * N, channels: 3, pageHeight: H },
  }).gif({ delay: [...], loop: 0 }).toBuffer()
  ```
  Confirmed: 5 pages, per-frame delays `[100,100,100,100,600]`, `loop: 0`.
- ❌ `pageHeight` outside the `raw` object → silently produces a **1-frame** GIF.
- ❌ `sharp(pngBuffers, { join: { animated: true } })` → **drops every per-frame
  delay after frame 1** (`[120, 0, 0, 0, 0]`).

---

## 1. Motion primitives — `components/shared/motion/`

New folder. Remotion-compatible API, local implementation.

### `MotionContext.jsx`

Model it directly on `TextureContext.jsx` — same resolution order, same
defensive `try/catch` around URL/storage access, same "works with no provider"
guarantee.

Resolution order: **explicit provider value → `?frame=` URL param → default**.

Three behaviours, and the third is what keeps every existing export working:

1. **Preview, playing** — a `requestAnimationFrame` loop advances `frame` at the
   design's `fps`, looping at `durationInFrames`. Exposes
   `{ frame, setFrame, playing, setPlaying, durationInFrames, fps }`.
2. **Export** — when `?frame=N` is present, the value is **frozen**: no rAF, no
   CSS transitions. This is what makes frames reproducible.
3. **No provider at all** — `useCurrentFrame()` returns `durationInFrames - 1`
   (the **final/settled** frame).

> Behaviour 3 is load-bearing. It means an animated design file still renders
> correctly as a static PNG, in the existing `/api/export/png` path, and in a
> Figma push — with zero changes to any of those code paths. Every animation must
> therefore be authored so the **last frame is the finished design**.

### `useCurrentFrame.js`

```js
export function useCurrentFrame()  // → integer, 0-indexed
export function useVideoConfig()   // → { fps, durationInFrames, width, height }
```

Integer frames (not seconds) keep the exporter's sweep exact — no float rounding
deciding whether frame 17 is 0.5666s or 0.5667s.

### `interpolate.js`

Remotion's exact signature:

```js
interpolate(frame, [0, 20], [0, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',   // default to 'clamp' — unclamped values
                                // (opacity 1.4, negative scale) are the #1
                                // source of broken-looking frames
  easing: Easing.out(Easing.cubic),
})
```

Ship a small `Easing` object (`linear`, `in/out/inOut`, `cubic`, `quad`).

### `spring.js`

`spring({ frame, fps, config: { damping, stiffness, mass } })` → number, for
natural shape appearances. A standard critically-damped default is fine.

### `Sequence.jsx`

`<Sequence from={30} durationInFrames={60}>` — offsets the frame its children
see (a child at timeline frame 40 inside `from={30}` sees frame 10) and returns
`null` outside its window. Same semantics as Remotion. This is the clean way to
express staggered step lists.

### `interpolateColors.js` — the one genuinely custom piece

**The problem:** you cannot numerically interpolate `var(--theme-accent-1)`, and
resolving it to a hex literal inside `components/` makes `pnpm verify` **fail**
(token lint, exit 1).

**The solution:** take **token names**, never literals. Resolve both endpoints
with `getComputedStyle(el).getPropertyValue(name)` at runtime, parse, interpolate
in **OKLab** (perceptually even — sRGB interpolation muddies brand colors through
grey), and write the result as an inline style.

```js
const bg = interpolateColors(frame, [0, 30], ['--theme-accent-1', '--theme-color-primary'])
```

No chroma ever appears in source → token lint stays green → rebranding still
works. Needs a ref to the element (or `document.documentElement`) to read from.

**Exception to note:** `interpolateColors` returns a resolved color at runtime,
so it needs `useState`/`useLayoutEffect` to read computed styles after mount. In
the frozen export path this must resolve **synchronously before the screenshot** —
use `useLayoutEffect`, not `useEffect`, or frame 0 will screenshot un-styled.

### `index.js`

Re-export everything so design files import from one path.

---

## 2. Registry + preview toolbar

### `src/modes.js`

Add two optional fields, infographic-only:

```js
'my-design': {
  label: 'My Design',
  type: 'infographic',
  exportName: 'my-design',
  animated: true,
  motion: { durationInFrames: 90, fps: 30 },   // 3s
},
```

Absent/`false` → today's behaviour exactly.

### `src/App.jsx`

1. Import and mount `<MotionProvider>` next to `<TextureProvider>` (~L398),
   configured from `entry.motion`. Non-animated modes still render inside it
   with a static final frame — simpler than conditional mounting.
2. **`exportLabel()`** (~L146): when `entry.animated`, the infographic case
   offers **PNG and GIF**. A small split button or a dropdown on the existing
   primary button; keep non-animated modes visually identical.
3. **`handleExport()`** (~L259): add a `'gif'` branch calling
   `exportFromServer('gif')`. `exportFromServer` already forwards `texture` and
   `textureOpacity` — extend it to also send `fps`, `durationInFrames`, `scale`.
   Note its `ext` ternary currently only handles png/pptx/pdf; add `gif`.
4. **Transport row** (sub-bar, near the zoom group, only when `entry.animated`):
   play/pause toggle, a frame scrubber (`range`, 0…`durationInFrames-1`), and a
   `frame / total` readout. Scrubbing sets `playing = false`.

---

## 3. GIF export endpoint — `vite.config.js`

Add `/api/export/gif` beside the existing PNG/PDF branches inside
`exportPlugin()`. Guard: **infographics only** — any other `mode.type` returns
400, mirroring how PDF already rejects non-carousels.

Params: `mode`, `fps`, `durationInFrames`, `scale`, `texture`, `textureOpacity`.

```
1. Launch chromium ONCE. deviceScaleFactor = scale.
2. page.goto('/?mode=…&export=1&texture=…&frame=0', { waitUntil: 'networkidle' })
3. await document.fonts.ready + all images loaded   ← reuse the existing
                                                       page.evaluate block verbatim
4. for (frame = 0; frame < durationInFrames; frame++):
     - set the frame via page.evaluate (see below) — DO NOT page.goto per frame
     - await page.evaluate(() => new Promise(requestAnimationFrame))  // let React commit
     - png = await locator.first().screenshot({ type: 'png', scale: 'device' })
     - raw = await sharp(png).removeAlpha().raw().toBuffer()   // RGB, 3 channels
5. Concat raws → sharp({ raw: { width, height: H*N, channels: 3, pageHeight: H } })
     .gif({ delay, loop: 0, dither: 1.0 })
6. Respond with Content-Disposition attachment, `${exportName}.gif`
```

**Reloading the page per frame turns a ~5s export into ~60s.** Drive the frame
in-page instead: have `MotionProvider` expose a setter on `window` when
`export=1` (e.g. `window.__setMotionFrame`), then
`page.evaluate((f) => window.__setMotionFrame(f), frame)`.

**Delays:** `delay` is an array of ms per frame. Use `Math.round(1000 / fps)` for
all frames, but **hold the final frame ~1000ms** so the loop reads as a finished
design rather than a flicker. (Verified working.)

**Size:** default **`scale: 0.5`** → 540×675. At full 1080×1350 a ~36-frame GIF
lands multi-MB, above what LinkedIn autoplays comfortably. Surface the choice in
the toolbar.

**Expect banding.** GIF is 256 colors; glass/shadow/gradient surfaces *will*
band. `dither` mitigates it. If quality disappoints, the same frame-capture layer
feeds an MP4 encoder later with no rework (MP4 needs `ffmpeg`, deliberately out
of scope here).

---

## 4. Reference implementation

Convert **`design/infographics/SocialListeningInfographic.jsx`** — its 4-step
`PrimaryGlassSection` list is the natural stagger demo.

- Wrap each step in `<Sequence from={i * 8}>` with a fade + `slideY` via
  `interpolate`.
- Animate the flow arrows with `spring()`.
- Register `animated: true, motion: { durationInFrames: 90, fps: 30 }` in
  `src/modes.js`.
- **Verify the final frame is pixel-identical to today's static design** — that
  is the contract that keeps PNG export and Figma push working.

Keep `design/infographics/GtmSystemInfographic.jsx` un-animated as the control.

---

## 5. Documentation — so the design agent can emit animated JSX

Animation must be **opt-in from the user's prompt**. Default stays static.

1. **`skills/infographics-designer/SKILL.md`** — a "Motion" section: the
   primitives, the import path, the *last frame must be the finished design*
   rule, and a worked stagger example.
2. **`.claude/agents/infographic-design-agent.md`** — in the brief step, ask
   whether the infographic should be animated **only if the user's prompt
   suggests it** (mentions animation/GIF/motion). If yes, the brief names which
   elements animate and in what order. Add the motion skill section to its
   required reading.
3. **`CLAUDE.md`** — short "Animation (infographics only)" block: frame-based
   model, GIF export, `animated` flag in `src/modes.js`, and the rule that
   **motion is infographic-only**.

---

## 6. Verify

```
pnpm verify        # design:validate + tokens:lint + templates:check
```

Token lint **must** stay green — it is the check that catches a resolved color
literal leaking into `components/`.

Then **stop**. Per `CLAUDE.md` rule 8, do not render previews, do not call
`/api/export/*` to "check" the result. The user runs `pnpm dev` and inspects.

---

## Build order

1. `components/shared/motion/` (context, `useCurrentFrame`, `interpolate`,
   `spring`, `Sequence`, `interpolateColors`, `index.js`)
2. `src/modes.js` flags + `<MotionProvider>` mount + transport row in `src/App.jsx`
3. `/api/export/gif` in `vite.config.js`
4. Convert `SocialListeningInfographic` as reference
5. Docs: infographics skill, infographic agent, `CLAUDE.md`
6. `pnpm verify`

Steps 1–3 are the feature; 4 proves it; 5 makes it repeatable by the agent.

---

## Invariants — do not break

- **No chroma in `design/**/*.jsx` or `components/`.** Token names only; the lint
  blocks literals.
- **Animation is infographics-only.** The GIF endpoint 400s on other types.
- **Every animated design's final frame is the finished static design** — PNG
  export, Figma push, and no-provider rendering all depend on it.
- **One Chromium, one page, N screenshots.** Never reload per frame.
- **Register designs in `src/modes.js` + `COMPONENTS` in `src/App.jsx`.**
- **`sharp`: `pageHeight` inside the `raw` object.** Anything else silently
  yields a 1-frame GIF.
