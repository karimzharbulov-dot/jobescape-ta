import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { clamp } from "../lib";

/** A fingertip that glides in, presses at `at`, and leaves a ripple. */
export const Tap: React.FC<{ x: number; y: number; at: number; size?: number }> = ({ x, y, at, size = 90 }) => {
  const f = useCurrentFrame();
  const appear = interpolate(f, [at - 14, at - 4], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const press = interpolate(f, [at - 3, at, at + 5], [1, 0.82, 1], clamp);
  const leave = interpolate(f, [at + 14, at + 22], [1, 0], clamp);
  const ripple = interpolate(f, [at, at + 14], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x - size,
          top: y - size,
          width: size * 2,
          height: size * 2,
          borderRadius: "50%",
          border: `${6 * (1 - ripple)}px solid rgba(255,255,255,.9)`,
          transform: `scale(${0.3 + ripple})`,
          opacity: f >= at ? 1 - ripple : 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x - size / 2,
          top: y - size / 2,
          width: size,
          height: size,
          borderRadius: "50%",
          background: "rgba(255,255,255,.88)",
          border: "4px solid rgba(28,26,74,.25)",
          boxShadow: "0 14px 30px rgba(20,16,90,.4)",
          opacity: appear * leave,
          transform: `translate(${(1 - appear) * 80}px, ${(1 - appear) * 120}px) scale(${press})`,
        }}
      />
    </>
  );
};
