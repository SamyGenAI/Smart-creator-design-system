/**
 * Sequence — offsets the frame its children see, and hides them outside its
 * window. Same semantics as Remotion's.
 *
 *   <Sequence from={30} durationInFrames={60}>
 *
 * A child at timeline frame 40 inside `from={30}` sees frame 10. This is the
 * clean way to express a staggered step list: each step gets the same local
 * animation and only its `from` differs.
 *
 * `layout="none"` (the default) renders children directly with no wrapper
 * element, so a Sequence can sit inside a flex column without disturbing it.
 */
import { useMemo } from "react";
import { MotionContext, useMotionContext } from "./MotionContext.jsx";

export default function Sequence({
  from = 0,
  durationInFrames = Infinity,
  /** 'none' → no DOM wrapper. 'absolute-fill' → a positioned layer. */
  layout = "none",
  style,
  children,
}) {
  const parent = useMotionContext();
  const local = parent.frame - from;

  const value = useMemo(
    () => ({ ...parent, frame: Math.max(0, local) }),
    [parent, local],
  );

  const visible = local >= 0 && local < durationInFrames;
  if (!visible) return null;

  const content =
    layout === "absolute-fill" ? (
      <div style={{ position: "absolute", inset: 0, ...style }}>{children}</div>
    ) : (
      children
    );

  return (
    <MotionContext.Provider value={value}>{content}</MotionContext.Provider>
  );
}
