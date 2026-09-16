/**
 * interpolateColors — animate between two BRAND TOKENS, never two literals.
 *
 *   const bg = useInterpolateColors(frame, [0, 30], ['--theme-accent-1', '--theme-color-primary'])
 *
 * Why token names: you cannot numerically interpolate `var(--theme-accent-1)`,
 * and resolving it to a hex literal inside `components/` makes `pnpm verify`
 * fail (token lint, exit 1). So both endpoints stay as CSS custom-property
 * NAMES and are resolved at runtime with `getComputedStyle`. No chroma ever
 * appears in source, so rebranding keeps working.
 *
 * Interpolation happens in OKLab, which is perceptually even — mixing two brand
 * colors through sRGB drags the midpoint through grey.
 *
 * The hook resolves computed styles in a `useLayoutEffect`, NOT `useEffect`:
 * in the frozen export path the value must be resolved before the screenshot,
 * or frame 0 captures an unstyled element.
 */
import { useLayoutEffect, useState } from "react";
import { interpolate, Easing } from "./interpolate.js";

/* ── parsing ─────────────────────────────────────────────────────────────── */

function parseColor(raw) {
  const value = String(raw || "").trim();
  if (!value) return null;

  const hex = value.match(/^#([0-9a-f]{3,8})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3 || h.length === 4)
      h = h
        .split("")
        .map((c) => c + c)
        .join("");
    const n = (i) => parseInt(h.slice(i * 2, i * 2 + 2), 16) / 255;
    return { r: n(0), g: n(1), b: n(2), a: h.length === 8 ? n(3) : 1 };
  }

  const fn = value.match(/^rgba?\s*\(([^)]+)\)$/i);
  if (fn) {
    const parts = fn[1]
      .split(/[,/\s]+/)
      .filter(Boolean)
      .map(Number);
    if (parts.length < 3 || parts.some((p) => !Number.isFinite(p))) return null;
    return {
      r: parts[0] / 255,
      g: parts[1] / 255,
      b: parts[2] / 255,
      a: parts.length > 3 ? parts[3] : 1,
    };
  }

  return null;
}

/* ── sRGB ↔ OKLab ────────────────────────────────────────────────────────── */

const toLinear = (c) =>
  c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
const toSrgb = (c) =>
  c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055;

function rgbToOklab({ r, g, b, a }) {
  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);

  const l = Math.cbrt(
    0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb,
  );
  const m = Math.cbrt(
    0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb,
  );
  const s = Math.cbrt(
    0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb,
  );

  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    A: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    B: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
    a,
  };
}

function oklabToRgb({ L, A, B, a }) {
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;

  const lr = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  const clamp = (c) => Math.max(0, Math.min(255, Math.round(toSrgb(c) * 255)));
  return { r: clamp(lr), g: clamp(lg), b: clamp(lb), a };
}

/* ── resolution ──────────────────────────────────────────────────────────── */

/**
 * Read a CSS custom property off an element (or the document root).
 * Accepts `--token`, `var(--token)` and a plain color string alike, so a caller
 * can pass whatever it has without branching.
 */
export function resolveToken(name, element) {
  if (typeof window === "undefined") return null;
  const raw = String(name || "").trim();
  const varName = raw.startsWith("var(")
    ? raw.slice(4, -1).split(",")[0].trim()
    : raw;
  if (!varName.startsWith("--")) return parseColor(raw);
  const el = element || document.documentElement;
  try {
    return parseColor(window.getComputedStyle(el).getPropertyValue(varName));
  } catch {
    return null;
  }
}

/**
 * Non-hook form: interpolate between already-resolved endpoints.
 * Exported mainly so the hook stays thin and testable.
 */
export function mixResolvedColors(t, colors) {
  const [from, to] = colors;
  if (!from) return null;
  if (!to)
    return `rgba(${Math.round(from.r * 255)}, ${Math.round(from.g * 255)}, ${Math.round(from.b * 255)}, ${from.a})`;

  const a = rgbToOklab(from);
  const b = rgbToOklab(to);
  const mix = (x, y) => x + (y - x) * t;
  const out = oklabToRgb({
    L: mix(a.L, b.L),
    A: mix(a.A, b.A),
    B: mix(a.B, b.B),
    a: mix(a.a, b.a),
  });
  return `rgba(${out.r}, ${out.g}, ${out.b}, ${Number(out.a.toFixed(3))})`;
}

/**
 * The hook design files use.
 *
 * @param {number} frame        current frame
 * @param {number[]} inputRange e.g. [0, 30]
 * @param {string[]} tokens     CSS custom-property NAMES, e.g.
 *                              ['--theme-accent-1', '--theme-color-primary']
 * @param {object} options      { easing, element } — `element` is a ref-held
 *                              node to resolve against; defaults to :root.
 * @returns {string|null}       an `rgba(...)` string, or null before resolution
 */
export function useInterpolateColors(frame, inputRange, tokens, options = {}) {
  const { easing = Easing.linear, element } = options;
  const [resolved, setResolved] = useState(null);

  const key = tokens.join("|");

  // useLayoutEffect, not useEffect: in the frozen export path this must run
  // before the screenshot or frame 0 captures an unresolved color.
  useLayoutEffect(() => {
    const node = element && "current" in element ? element.current : element;
    setResolved(tokens.map((name) => resolveToken(name, node)));
    // `key` stands in for the token array identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, element]);

  if (!resolved || resolved.some((c) => !c)) return null;

  const t = interpolate(
    frame,
    inputRange,
    resolved.map((_, i) => i / (resolved.length - 1)),
    {
      easing,
    },
  );

  // Pick the pair `t` falls between, then mix locally within it.
  const segments = resolved.length - 1;
  const scaled = Math.max(0, Math.min(segments, t * segments));
  const index = Math.min(segments - 1, Math.floor(scaled));
  return mixResolvedColors(scaled - index, [
    resolved[index],
    resolved[index + 1],
  ]);
}

export default useInterpolateColors;
