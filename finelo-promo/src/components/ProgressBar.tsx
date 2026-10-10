import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { clamp } from "../lib";

/** Rounded bar that fills to `value` (0..1) over [start, start+dur]. */
export const ProgressBar: React.FC<{
  value: number;
  start: number;
  dur?: number;
  width: number | string;
  height: number;
  color: string;
  track?: string;
}> = ({ value, start, dur = 20, width, height, color, track = "#E9EAF2" }) => {
  const frame = useCurrentFrame();
  const k = interpolate(frame, [start, start + dur], [0, value], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <div style={{ width, height, borderRadius: height, background: track, overflow: "hidden" }}>
      <div style={{ width: `${k * 100}%`, height: "100%", borderRadius: height, background: color }} />
    </div>
  );
};
