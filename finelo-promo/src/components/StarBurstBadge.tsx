import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../theme";
import { pop } from "../lib";

const burstPath = (spikes: number, rOut: number, rIn: number) => {
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 ? rIn : rOut;
    const a = (Math.PI * i) / spikes - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
};

/** Green starburst sticker: bounces in, then rotates slowly. Content stays upright-ish via `tilt`. */
export const StarBurstBadge: React.FC<{
  x: number;
  y: number;
  size: number;
  delay?: number;
  tilt?: number;
  ring?: boolean;
  children: React.ReactNode;
}> = ({ x, y, size, delay = 0, tilt = -12, ring = true, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(frame, fps, delay, { damping: 7, mass: 0.7 });
  const spin = (frame - delay) * 0.35;
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        transform: `scale(${s}) rotate(${tilt + (1 - s) * -40}deg)`,
        filter: "drop-shadow(0 18px 24px rgba(20,16,110,.35))",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, transform: `rotate(${spin}deg)` }}>
        <polygon points={burstPath(16, 50, 43)} fill={C.green} strokeLinejoin="round" stroke={C.green} strokeWidth={2} />
        {ring && <circle cx={50} cy={50} r={36} fill="none" stroke="#9BD46A" strokeWidth={1.6} />}
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT,
          color: C.white,
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
};
