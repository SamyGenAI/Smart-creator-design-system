/**
 * Motion primitives — one import path for design files.
 *
 *   import { useCurrentFrame, interpolate, Easing, Sequence, spring }
 *     from '../../components/shared/motion/index.js'
 *
 * Animation is INFOGRAPHICS ONLY, and every animated design must be authored so
 * its LAST FRAME is the finished static design — PNG export, Figma push and
 * no-provider rendering all fall back to that frame.
 */
export {
  MotionProvider,
  MotionContext,
  useMotionContext,
  useMotionTransport,
  readFrameFromUrl,
  isExportMode,
  DEFAULT_FPS,
  DEFAULT_DURATION_IN_FRAMES,
} from "./MotionContext.jsx";
export { useCurrentFrame, useVideoConfig } from "./useCurrentFrame.js";
export { interpolate, Easing } from "./interpolate.js";
export { spring } from "./spring.js";
export { default as Sequence } from "./Sequence.jsx";
export {
  useInterpolateColors,
  resolveToken,
  mixResolvedColors,
} from "./interpolateColors.js";
