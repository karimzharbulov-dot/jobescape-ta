import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, random } from "remotion";
import { C } from "../theme";
import { useLayout } from "../layout";

/** Soft violet radial gradient with faint candlesticks drifting upward (8% opacity). */
export const Background: React.FC<{ offset?: number }> = ({ offset = 0 }) => {
  const frame = useCurrentFrame() + offset;
  const { W, H } = useLayout();
  const candles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        x: random(`bx${i}`) * W,
        y: random(`by${i}`) * H,
        h: 60 + random(`bh${i}`) * 160,
        w: 18 + random(`bw${i}`) * 16,
        speed: 0.4 + random(`bs${i}`) * 0.9,
      })),
    [W, H],
  );
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 75% at 50% 30%, ${C.violet} 0%, ${C.violet} 45%, ${C.violetDeep} 100%)`,
      }}
    >
      <svg width={W} height={H} style={{ position: "absolute", inset: 0, opacity: 0.08 }}>
        {candles.map((c, i) => {
          const span = H + 400;
          const y = ((((c.y - frame * c.speed) % span) + span) % span) - 200;
          return (
            <g key={i}>
              <line x1={c.x} x2={c.x} y1={y - 30} y2={y + c.h + 30} stroke="#fff" strokeWidth={4} strokeLinecap="round" />
              <rect x={c.x - c.w / 2} y={y} width={c.w} height={c.h} rx={5} fill="#fff" />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
