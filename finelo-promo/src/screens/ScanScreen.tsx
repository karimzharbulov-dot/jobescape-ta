import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { C } from "../theme";
import { Screen } from "./StatusBar";
import { CandleChart } from "../components/CandleChart";
import { beatPulse, clamp } from "../lib";

const Corner: React.FC<{ r: number; x: number; y: number }> = ({ r, x, y }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 28,
      height: 28,
      borderColor: C.violet,
      borderStyle: "solid",
      borderWidth: 0,
      transform: `rotate(${r}deg)`,
      borderTopWidth: 6,
      borderLeftWidth: 6,
      borderTopLeftRadius: 6,
    }}
  />
);

const Row: React.FC<{ title: string; sub: string; icon: React.ReactNode }> = ({ title, sub, icon }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, background: C.gray, borderRadius: 14, padding: "12px 14px", marginBottom: 10 }}>
    <div style={{ width: 52, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 15, fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 12, color: C.muted, fontWeight: 500, marginTop: 2 }}>{sub}</div>
    </div>
    <div style={{ fontSize: 20, color: C.navy }}>›</div>
  </div>
);

/** "Scan for Patterns": corner brackets breathe around the candles while a scan line sweeps. */
export const ScanScreen: React.FC<{ start?: number }> = ({ start = 0 }) => {
  const f = useCurrentFrame() - start;
  const squeeze = 6 * Math.sin(f / 9);
  const scan = interpolate((f % 45) / 45, [0, 1], [0, 150]);
  const pulse = beatPulse(f, 15);
  const reveal = interpolate(f, [8, 20], [0, 1], clamp);
  return (
    <Screen bg="#F7F8FC">
      <div style={{ position: "relative", height: 210, marginTop: 14 }}>
        <div style={{ position: "absolute", left: 110 - squeeze, top: 20 - squeeze, width: 170 + squeeze * 2, height: 170 + squeeze * 2 }}>
          <Corner r={0} x={0} y={0} />
          <Corner r={90} x={142 + squeeze * 2} y={0} />
          <Corner r={270} x={0} y={142 + squeeze * 2} />
          <Corner r={180} x={142 + squeeze * 2} y={142 + squeeze * 2} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 128,
            top: 38,
            width: 134,
            height: 134,
            backgroundImage: "linear-gradient(#E5E6F0 1px, transparent 1px), linear-gradient(90deg, #E5E6F0 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            opacity: reveal,
          }}
        />
        <CandleChart width={120} height={110} count={6} seed="scan" start={start + 6} stagger={3} down="#C9CBDD" style={{ position: "absolute", left: 135, top: 50 }} />
        <div style={{ position: "absolute", left: 128, top: 38 + scan, width: 134, height: 3, background: C.violet, borderRadius: 2, opacity: 0.85 * reveal, boxShadow: `0 0 14px ${C.violet}` }} />
      </div>
      <div style={{ textAlign: "center", fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", marginTop: 4 }}>Scan for Patterns</div>
      <div
        style={{
          margin: "18px 24px 0",
          height: 50,
          borderRadius: 14,
          background: C.violet,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 17,
          fontWeight: 700,
          transform: `scale(${1 + pulse * 0.045})`,
          boxShadow: `0 0 0 ${pulse * 10}px rgba(90,85,246,${0.25 * pulse})`,
        }}
      >
        Analyze Now
      </div>
      <div style={{ padding: "26px 24px 0" }}>
        <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 12 }}>Analyze Your Trades</div>
        <Row title="Pattern recognition" sub="Improve your trading strategy" icon={<CandleChart width={40} height={30} count={4} seed="r1" start={start} stagger={0} />} />
        <Row
          title="AI Scenario Scan"
          sub="Instantly detect trends"
          icon={<div style={{ width: 36, height: 28, border: `3px solid ${C.violet}`, borderRadius: 4, background: "linear-gradient(135deg,#7AC143 50%,#D7DAEA 50%)" }} />}
        />
        <div style={{ fontSize: 19, fontWeight: 800, margin: "18px 0 12px" }}>Practice investing</div>
        <Row title="AI mentor" sub="Let's analyze your financial plan" icon={<div style={{ width: 40, height: 40, borderRadius: 20, background: C.violet }} />} />
      </div>
    </Screen>
  );
};
