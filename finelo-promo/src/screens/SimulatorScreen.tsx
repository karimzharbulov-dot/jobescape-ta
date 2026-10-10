import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { evolvePath } from "@remotion/paths";
import { C } from "../theme";
import { Screen } from "./StatusBar";
import { CountUp } from "../components/CountUp";
import { clamp } from "../lib";

const LINE = "M0 230 L40 230 C70 230 80 150 120 150 L160 150 C190 150 190 190 220 190 C250 190 260 120 300 120 L330 120 C360 120 360 70 390 70";
const AREA = `${LINE} L390 300 L0 300 Z`;

/** AAPL simulator: price counts up while the chart draws on. */
export const SimulatorScreen: React.FC<{ start?: number }> = ({ start = 0 }) => {
  const f = useCurrentFrame() - start;
  const draw = interpolate(f, [6, 44], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const { strokeDasharray, strokeDashoffset } = evolvePath(draw, LINE);
  return (
    <Screen>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 24px", fontSize: 24, color: C.navy }}>
        <span>‹</span>
        <span style={{ fontSize: 20 }}>⇪</span>
      </div>
      <div style={{ padding: "8px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: 700 }}>
          <span style={{ width: 24, height: 24, borderRadius: 12, background: "#111", display: "inline-block" }} />
          Apple <span style={{ color: C.muted, fontWeight: 500, fontSize: 15 }}>• AAPL</span>
        </div>
        <div style={{ fontSize: 40, fontWeight: 800, marginTop: 6, letterSpacing: "-0.02em" }}>
          <CountUp from={180} to={212.54} start={start + 4} dur={40} decimals={2} prefix="$" />
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.green, marginTop: 4 }}>
          ↗ <CountUp to={13.05} start={start + 4} dur={40} decimals={2} prefix="$" /> • <CountUp to={4.04} start={start + 4} dur={40} decimals={2} suffix="%" />
          <span style={{ color: "#B5B6C9", fontWeight: 500, marginLeft: 8 }}>Past month</span>
        </div>
      </div>
      <svg width={390} height={300} style={{ marginTop: 30 }}>
        <defs>
          <linearGradient id="simfill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={C.green} stopOpacity={0.28} />
            <stop offset="1" stopColor={C.green} stopOpacity={0} />
          </linearGradient>
          <clipPath id="simclip">
            <rect x={0} y={0} width={390 * draw} height={300} />
          </clipPath>
        </defs>
        <path d={AREA} fill="url(#simfill)" clipPath="url(#simclip)" />
        <path d={LINE} fill="none" stroke={C.green} strokeWidth={3.5} strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} strokeLinecap="round" />
      </svg>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", fontSize: 14, fontWeight: 700, color: "#A3A4BA", marginTop: 6 }}>
        <span>1D</span>
        <span style={{ color: C.violet, background: "#ECEBFE", borderRadius: 8, padding: "6px 12px" }}>1W</span>
        <span>1M</span>
        <span>3M</span>
        <span>⚙</span>
      </div>
    </Screen>
  );
};
