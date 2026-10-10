import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { clamp, fmt } from "../lib";

/** Number that counts from `from` to `to` over [start, start+dur]. */
export const CountUp: React.FC<{
  from?: number;
  to: number;
  start: number;
  dur: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
}> = ({ from = 0, to, start, dur, decimals = 0, prefix = "", suffix = "", style }) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [start, start + dur], [from, to], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <span style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {prefix}
      {fmt(v, decimals)}
      {suffix}
    </span>
  );
};
