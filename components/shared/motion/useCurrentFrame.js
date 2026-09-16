/**
 * useCurrentFrame / useVideoConfig — the frame-as-input model.
 *
 * Every animated style in a design file is a pure function of the integer
 * returned here. Nothing animates as a side-effect (no CSS keyframes, no
 * transitions), because the GIF exporter screenshots one frozen frame at a
 * time: a running CSS animation would be captured at whatever frame the
 * compositor happened to be on, and the GIF would jitter.
 *
 * Signatures match Remotion's so design files port over verbatim if this repo
 * ever adopts it. The implementation is local (Remotion bundles with
 * webpack/Rspack; this repo is Vite).
 */
import { useMotionContext } from "./MotionContext.jsx";

/** The current frame, 0-indexed integer. */
export function useCurrentFrame() {
  return useMotionContext().frame;
}

/** `{ fps, durationInFrames, width, height }` for the active design. */
export function useVideoConfig() {
  const { fps, durationInFrames, width, height } = useMotionContext();
  return { fps, durationInFrames, width, height };
}
