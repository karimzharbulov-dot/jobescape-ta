import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { C } from "../theme";
import { Screen } from "./StatusBar";
import { ProgressBar } from "../components/ProgressBar";
import { Bull } from "../illustrations/Bull";
import { CandleChart } from "../components/CandleChart";
import { clamp } from "../lib";

/** Learning paths: 28-Day AI Trader Challenge card fills to 14/28 days. */
export const LearningScreen: React.FC<{ start?: number }> = ({ start = 0 }) => {
  const f = useCurrentFrame() - start;
  const days = Math.round(interpolate(f, [20, 60], [0, 14], { ...clamp, easing: Easing.out(Easing.cubic) }));
  const flex = 0.5 + 0.5 * Math.sin(f / 6);
  return (
    <Screen bg="#F7F8FC">
      <div style={{ padding: "10px 22px 0" }}>
        <div style={{ fontSize: 26, color: C.navy }}>✕</div>
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", marginTop: 14 }}>Learning paths</div>
        <div style={{ display: "flex", gap: 22, fontSize: 17, fontWeight: 700, marginTop: 16 }}>
          <span style={{ color: C.violet, borderBottom: `3px solid ${C.violet}`, paddingBottom: 6 }}>Main paths</span>
          <span style={{ color: "#B5B6C9" }}>Mini courses</span>
        </div>
        <div style={{ background: "#fff", borderRadius: 18, padding: 14, marginTop: 20, boxShadow: "0 4px 16px rgba(28,26,74,.06)" }}>
          <div style={{ height: 170, borderRadius: 12, background: "linear-gradient(135deg,#D9DAFB,#C3C4F7)", display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
            <Bull size={290} flex={flex} />
          </div>
          <div style={{ fontSize: 19, fontWeight: 800, marginTop: 14 }}>28-Day AI Trader Challenge</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.muted, margin: "14px 0 8px", letterSpacing: "0.04em" }}>
            {days} / 28 DAYS
          </div>
          <ProgressBar value={0.5} start={start + 20} dur={40} width="100%" height={12} color={C.green} track="#EAF4E1" />
        </div>
        <div style={{ background: "#fff", borderRadius: 18, padding: 14, marginTop: 14 }}>
          <div style={{ height: 150, borderRadius: 12, background: "linear-gradient(135deg,#E3E4F3,#CDCFE8)", position: "relative", overflow: "hidden" }}>
            <CandleChart width={220} height={110} count={7} seed="lp2" start={start + 10} stagger={2} up="#9FA2D6" down="#C5C7E6" style={{ position: "absolute", left: 20, top: 26 }} />
          </div>
        </div>
      </div>
    </Screen>
  );
};
