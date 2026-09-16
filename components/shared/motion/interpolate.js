/**
 * interpolate + Easing — Remotion-compatible signatures.
 *
 *   interpolate(frame, [0, 20], [0, 1], {
 *     extrapolateLeft: 'clamp',
 *     extrapolateRight: 'clamp',
 *     easing: Easing.out(Easing.cubic),
 *   })
 *
 * Both extrapolations default to 'clamp'. Unclamped values (opacity 1.4, a
 * negative scale) are the single biggest source of broken-looking frames, so
 * you have to ask for 'extend' explicitly.
 */

const bezierish = {
  linear: (t) => t,
  quad: (t) => t * t,
  cubic: (t) => t * t * t,
};

function makeEase(fn) {
  const eased = (t) => fn(t);
  return eased;
}

export const Easing = {
  linear: makeEase(bezierish.linear),
  quad: makeEase(bezierish.quad),
  cubic: makeEase(bezierish.cubic),
  /** Runs the easing forwards — slow start, fast finish. */
  in: (easing = Easing.cubic) => makeEase((t) => easing(t)),
  /** Mirrored — fast start, slow settle. The default feel for entrances. */
  out: (easing = Easing.cubic) => makeEase((t) => 1 - easing(1 - t)),
  /** Eased at both ends. */
  inOut: (easing = Easing.cubic) =>
    makeEase((t) =>
      t < 0.5 ? easing(t * 2) / 2 : 1 - easing((1 - t) * 2) / 2,
    ),
};

function applyExtrapolation(value, mode) {
  if (mode === "extend") return value;
  if (mode === "identity") return value;
  return null; // 'clamp' — handled by the caller, which knows the bound
}

/**
 * Map `input` from one range to another, piecewise across any number of stops.
 *
 * @param {number} input          usually the current frame
 * @param {number[]} inputRange   ascending, length ≥ 2
 * @param {number[]} outputRange  same length as inputRange
 */
export function interpolate(input, inputRange, outputRange, options = {}) {
  const {
    extrapolateLeft = "clamp",
    extrapolateRight = "clamp",
    easing = Easing.linear,
  } = options;

  if (!Array.isArray(inputRange) || !Array.isArray(outputRange)) {
    throw new Error("interpolate: inputRange and outputRange must be arrays");
  }
  if (inputRange.length !== outputRange.length || inputRange.length < 2) {
    throw new Error(
      "interpolate: ranges must be the same length and hold at least 2 stops",
    );
  }

  const first = inputRange[0];
  const last = inputRange[inputRange.length - 1];

  if (input <= first && extrapolateLeft === "clamp") return outputRange[0];
  if (input >= last && extrapolateRight === "clamp")
    return outputRange[outputRange.length - 1];

  // Find the segment holding `input`, falling back to the nearest edge segment
  // when extrapolating.
  let i = 0;
  while (i < inputRange.length - 2 && input >= inputRange[i + 1]) i += 1;

  const inMin = inputRange[i];
  const inMax = inputRange[i + 1];
  const outMin = outputRange[i];
  const outMax = outputRange[i + 1];

  if (inMax === inMin) return outMax;

  const progress = (input - inMin) / (inMax - inMin);
  // Easing is only meaningful inside the segment; extrapolated values stay
  // linear so 'extend' keeps its straight-line meaning.
  const shaped = progress >= 0 && progress <= 1 ? easing(progress) : progress;
  const value = outMin + shaped * (outMax - outMin);

  if (input < first) applyExtrapolation(value, extrapolateLeft);
  if (input > last) applyExtrapolation(value, extrapolateRight);
  return value;
}
