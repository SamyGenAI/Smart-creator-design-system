/**
 * spring — a damped-harmonic value in [0, 1] (usually) for natural entrances.
 *
 *   const s = spring({ frame: frame - 10, fps, config: { damping: 200 } })
 *
 * Remotion-compatible signature. The default config is close to critically
 * damped: it settles without an obvious bounce, which is what most shape
 * appearances want. Lower `damping` to get overshoot.
 */

const DEFAULT_CONFIG = {
  damping: 26,
  stiffness: 170,
  mass: 1,
};

export function spring({
  frame = 0,
  fps = 30,
  from = 0,
  to = 1,
  config = {},
  durationInFrames,
} = {}) {
  const { damping, stiffness, mass } = { ...DEFAULT_CONFIG, ...config };
  if (frame <= 0) return from;

  // A requested duration is expressed as a time scale on the physics, so the
  // same config settles in however many frames the caller asked for.
  const scale = durationInFrames
    ? naturalSettleFrames(fps, { damping, stiffness, mass }) / durationInFrames
    : 1;
  const t = (frame / fps) * scale;

  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));

  let progress;
  if (zeta < 1) {
    const wd = w0 * Math.sqrt(1 - zeta * zeta);
    progress =
      1 -
      Math.exp(-zeta * w0 * t) *
        (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t));
  } else {
    // Critically damped (and, near enough, overdamped).
    progress = 1 - Math.exp(-w0 * t) * (1 + w0 * t);
  }

  return from + (to - from) * progress;
}

/** Frames this config needs to settle within 0.1% — used to honour a duration. */
function naturalSettleFrames(fps, config) {
  const w0 = Math.sqrt(config.stiffness / config.mass);
  const zeta = config.damping / (2 * Math.sqrt(config.stiffness * config.mass));
  const seconds = Math.min(10, 7 / (Math.max(0.05, Math.min(1, zeta)) * w0));
  return Math.max(1, Math.round(seconds * fps));
}
