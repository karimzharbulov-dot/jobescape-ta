import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { C } from "../theme";
import { pop, clamp } from "../lib";

/** White rounded pill that grows sideways from its centre, then the violet word pops in. */
export const PillWord: React.FC<{ text: string; delay: number; size: number }> = ({ text, delay, size }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const open = interpolate(frame - delay, [0, 9], [50, 0], { ...clamp, easing: Easing.out(Easing.back(1.4)) });
  const word = pop(frame, fps, delay + 6, { damping: 10 });
  const r = size * 0.22;
  return (
    <span
      style={{
        display: "inline-block",
        position: "relative",
        padding: `${size * 0.02}px ${size * 0.2}px ${size * 0.06}px`,
        margin: `0 ${-size * 0.04}px`,
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: C.white,
          borderRadius: r,
          clipPath: `inset(0 ${Math.max(0, open)}% 0 ${Math.max(0, open)}% round ${r}px)`,
          boxShadow: "0 18px 40px -18px rgba(20,16,110,.6)",
        }}
      />
      <span
        style={{
          position: "relative",
          display: "inline-block",
          color: C.violet,
          opacity: interpolate(word, [0, 0.3], [0, 1], clamp),
          transform: `scale(${0.4 + 0.6 * word})`,
        }}
      >
        {text}
      </span>
    </span>
  );
};
