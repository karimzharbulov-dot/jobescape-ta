import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "../theme";
import { pop } from "../lib";

/** Gold 4-point sparkle that pops in, then twinkles (scale + rotate). */
export const Sparkle: React.FC<{ x: number; y: number; size: number; delay?: number; color?: string; phase?: number }> = ({
  x,
  y,
  size,
  delay = 0,
  color = C.gold,
  phase = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(frame, fps, delay, { damping: 9 });
  const tw = 0.82 + 0.18 * Math.sin((frame + phase) / 7);
  const rot = Math.sin((frame + phase) / 22) * 18;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        transform: `scale(${s * tw}) rotate(${rot}deg)`,
        filter: "drop-shadow(0 6px 10px rgba(30,20,120,.35))",
      }}
    >
      <path
        d="M50 0 C54 30 70 46 100 50 C70 54 54 70 50 100 C46 70 30 54 0 50 C30 46 46 30 50 0 Z"
        fill={color}
        stroke={color}
        strokeWidth={6}
        strokeLinejoin="round"
      />
    </svg>
  );
};
