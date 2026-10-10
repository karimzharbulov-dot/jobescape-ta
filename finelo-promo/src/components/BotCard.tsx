import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { C, FONT } from "../theme";
import { pop, clamp } from "../lib";
import { ProgressBar } from "./ProgressBar";
import { Robot } from "../illustrations/Robot";

export type BotRow = { label: string; value: string; pct: number };

/** AI bot card (designed at 390pt screen width): robot on the left, three metric bars on the right. */
export const BotCard: React.FC<{
  name: string;
  color: string;
  variant: "guard" | "balanced" | "momentum";
  rows: BotRow[];
  delay: number;
}> = ({ name, color, variant, rows, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(frame, fps, delay, { damping: 13 });
  const blink = interpolate((frame + delay * 3) % 70, [0, 3, 6], [1, 0.1, 1], clamp);
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: 10,
        borderRadius: 16,
        background: C.gray,
        fontFamily: FONT,
        opacity: interpolate(s, [0, 0.4], [0, 1], clamp),
        transform: `translateX(${(1 - s) * 360}px)`,
      }}
    >
      <div style={{ width: 104, height: 118, borderRadius: 12, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
        <Robot color={color} variant={variant} size={84} blink={blink} />
      </div>
      <div style={{ flex: 1, paddingTop: 2 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 6 }}>{name}</div>
        {rows.map((r, i) => (
          <div key={r.label} style={{ marginBottom: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9.5, color: C.muted, fontWeight: 500, marginBottom: 3 }}>
              <span>{r.label}</span>
              <span style={{ color: C.navy, fontWeight: 700 }}>{r.value}</span>
            </div>
            <ProgressBar value={r.pct} start={delay + 8 + i * 4} dur={18} width="100%" height={6} color={color} />
          </div>
        ))}
      </div>
    </div>
  );
};
