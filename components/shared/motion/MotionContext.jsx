/**
 * MotionContext — carries the current animation frame down to every design.
 *
 * Modelled on `TextureContext.jsx`: the same resolution order (explicit
 * provider value → URL param → default), the same defensive access to
 * `window`, and the same "works with no provider" guarantee.
 *
 * Three behaviours:
 *
 *   1. Preview, playing — a requestAnimationFrame loop advances `frame` at the
 *      design's fps and loops at `durationInFrames`.
 *   2. Export — `?frame=N` freezes the value. No rAF, no transitions, so each
 *      screenshot is reproducible. The provider also publishes
 *      `window.__setMotionFrame` when `?export=1` is present, which lets the
 *      GIF endpoint sweep frames in one page instead of reloading per frame.
 *   3. No provider at all — `useCurrentFrame()` returns `durationInFrames - 1`,
 *      the FINAL/SETTLED frame.
 *
 * Behaviour 3 is load-bearing: it is what keeps an animated design file
 * rendering correctly as a static PNG, through `/api/export/png`, and in a
 * Figma push, with zero changes to any of those paths. Every animation must
 * therefore be authored so the last frame IS the finished design.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const MotionContext = createContext(null);

export const DEFAULT_FPS = 30;
export const DEFAULT_DURATION_IN_FRAMES = 90;

/** Canvas size the motion primitives report; infographics are the only format. */
export const DEFAULT_MOTION_WIDTH = 1080;
export const DEFAULT_MOTION_HEIGHT = 1350;

/** `?frame=N`, or null when absent/invalid. Export freezes on this value. */
export function readFrameFromUrl() {
  if (typeof window === "undefined") return null;
  try {
    const raw = new URLSearchParams(window.location.search).get("frame");
    if (raw == null || raw === "") return null;
    const value = Number(raw);
    if (!Number.isFinite(value)) return null;
    return Math.max(0, Math.round(value));
  } catch {
    /* no URL access — fall through */
  }
  return null;
}

/** True when the page is loaded by the headless exporter (`?export=1`). */
export function isExportMode() {
  if (typeof window === "undefined") return false;
  try {
    return new URLSearchParams(window.location.search).get("export") === "1";
  } catch {
    return false;
  }
}

export function MotionProvider({
  durationInFrames = DEFAULT_DURATION_IN_FRAMES,
  fps = DEFAULT_FPS,
  width = DEFAULT_MOTION_WIDTH,
  height = DEFAULT_MOTION_HEIGHT,
  /** false for non-animated modes: the design renders on its settled frame. */
  animated = true,
  children,
}) {
  const total = Math.max(1, Math.round(durationInFrames));
  const rate = Math.max(1, Math.round(fps));

  const frozenFrame = readFrameFromUrl();
  const exporting = isExportMode();
  const isFrozen = frozenFrame != null;

  // A non-animated mode, or one with no frame to play, sits on its last frame —
  // the finished design.
  const settled = total - 1;
  // Export never plays. A headless screenshot of a running animation captures
  // whichever frame the compositor happened to be on, so `?export=1` with no
  // `frame` (the PNG and Figma paths) must land on the settled final frame —
  // the finished design — not at frame 0 with the timeline running.
  const initialFrame = isFrozen
    ? Math.min(frozenFrame, settled)
    : animated && !exporting
      ? 0
      : settled;

  const [frame, setFrame] = useState(initialFrame);
  const [playing, setPlaying] = useState(
    animated && !isFrozen && !exporting,
  );

  // Switching design resets the timeline rather than carrying the old position.
  const configKey = `${total}:${rate}:${animated}`;
  const lastConfig = useRef(configKey);
  useEffect(() => {
    if (lastConfig.current === configKey) return;
    lastConfig.current = configKey;
    setFrame(
      isFrozen
        ? Math.min(frozenFrame, total - 1)
        : animated && !exporting
          ? 0
          : total - 1,
    );
    setPlaying(animated && !isFrozen && !exporting);
  }, [configKey, animated, isFrozen, frozenFrame, total, exporting]);

  /**
   * Export hook: the GIF endpoint drives frames through this instead of
   * reloading the page per frame (which turns a ~5s export into ~60s).
   */
  useEffect(() => {
    if (!exporting || typeof window === "undefined") return undefined;
    window.__setMotionFrame = (next) => {
      const value = Number(next);
      if (Number.isFinite(value))
        setFrame(Math.max(0, Math.min(total - 1, Math.round(value))));
    };
    return () => {
      delete window.__setMotionFrame;
    };
  }, [exporting, total]);

  const frameRef = useRef(frame);
  frameRef.current = frame;

  // Preview playback. Frame is derived from elapsed time so playback runs at
  // the design's fps regardless of the monitor's refresh rate.
  useEffect(() => {
    if (isFrozen || !animated || !playing) return undefined;
    if (typeof window === "undefined") return undefined;
    let raf = 0;
    let startTime = null;
    let startFrame = frameRef.current;
    const tick = (now) => {
      if (startTime == null) startTime = now;
      const elapsed = (now - startTime) / 1000;
      setFrame((startFrame + Math.floor(elapsed * rate)) % total);
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
    // frameRef (not frame) is read so restarting the loop resumes where it was
    // without re-subscribing on every single frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFrozen, animated, playing, rate, total]);

  const seek = useCallback(
    (next) => {
      const value = Number(next);
      if (!Number.isFinite(value)) return;
      setFrame(Math.max(0, Math.min(total - 1, Math.round(value))));
    },
    [total],
  );

  const value = useMemo(
    () => ({
      frame: Math.max(0, Math.min(total - 1, frame)),
      setFrame: seek,
      playing: playing && animated && !isFrozen,
      setPlaying,
      durationInFrames: total,
      fps: rate,
      width,
      height,
      animated,
      frozen: isFrozen,
    }),
    [frame, seek, playing, animated, isFrozen, total, rate, width, height],
  );

  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}

/**
 * The active motion state. Outside a provider this reports the settled final
 * frame, which is what makes an animated design render correctly as a static
 * PNG with no code changes anywhere else.
 */
export function useMotionContext() {
  const ctx = useContext(MotionContext);
  if (ctx) return ctx;
  const frozen = readFrameFromUrl();
  const total = DEFAULT_DURATION_IN_FRAMES;
  return {
    frame: frozen != null ? Math.min(frozen, total - 1) : total - 1,
    setFrame: () => {},
    playing: false,
    setPlaying: () => {},
    durationInFrames: total,
    fps: DEFAULT_FPS,
    width: DEFAULT_MOTION_WIDTH,
    height: DEFAULT_MOTION_HEIGHT,
    animated: false,
    frozen: frozen != null,
  };
}

/** Transport controls for the preview toolbar. */
export function useMotionTransport() {
  return useMotionContext();
}
