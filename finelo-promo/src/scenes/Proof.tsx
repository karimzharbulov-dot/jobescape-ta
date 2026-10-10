import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { CountUp } from "../components/CountUp";
import { Laurel } from "../illustrations/Laurel";
import { Sparkle } from "../components/Sparkle";
import { useLayout } from "../layout";
import { C, FONT } from "../theme";
import { pop, clamp, prog } from "../lib";
import { SceneProps } from "./types";

const STATS = [
  { to: 1500000, suffix: "+", label: "learners", at: 10, decimals: 0 },
  { to: 8800000, suffix: "+", label: "lessons completed", at: 25, decimals: 0 },
  { to: 4.5, suffix: "", label: "average rating", at: 40, decimals: 1, star: true },
];

const Star: React.FC<{ size: number; k: number }> = ({ size, k }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ transform: `scale(${k}) rotate(${(1 - k) * -90}deg)` }}>
    <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z" fill={C.gold} stroke={C.gold} strokeWidth={1.5} strokeLinejoin="round" />
  </svg>
);

export const Proof: React.FC<SceneProps> = ({ dur, from }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { v, W } = useLayout();
  const grow = prog(f, 2, 22);
  const wreathH = v ? 300 : 230;
  const wreathY = v ? 170 : 70;
  const numSize = v ? 128 : 96;
  const lineAt = 60;
  const line = pop(f, fps, lineAt);
  return (
    <SceneFrame dur={dur} from={from} enter="circle" exit="whip">
      {/* wreath + stars */}
      <div style={{ position: "absolute", left: 0, right: 0, top: wreathY, display: "flex", justifyContent: "center", alignItems: "center", gap: v ? 60 : 40 }}>
        <Laurel height={wreathH} grow={grow} />
        <div style={{ display: "flex", gap: 6 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} size={v ? 64 : 52} k={pop(f, fps, 6 + i * 3, { damping: 8 })} />
          ))}
        </div>
        <Laurel height={wreathH} grow={grow} flip />
      </div>
      {/* stat stack */}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: W,
          top: v ? 560 : 360,
          display: "flex",
          flexDirection: v ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          gap: v ? 56 : 80,
          fontFamily: FONT,
          color: C.white,
          textAlign: "center",
        }}
      >
        {STATS.map((s) => {
          const k = pop(f, fps, s.at, { damping: 11 });
          return (
            <div key={s.label} style={{ opacity: interpolate(k, [0, 0.3], [0, 1], clamp), transform: `translateY(${(1 - k) * 80}px) scale(${0.8 + 0.2 * k})` }}>
              <div style={{ fontSize: numSize, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>
                <CountUp to={s.to} start={s.at} dur={26} decimals={s.decimals} suffix={s.suffix} />
                {s.star && <span style={{ color: C.gold, marginLeft: 10 }}>★</span>}
              </div>
              <div style={{ fontSize: v ? 46 : 38, fontWeight: 700, opacity: 0.85, marginTop: 10 }}>{s.label}</div>
            </div>
          );
        })}
      </div>
      {/* award line */}
      <div
        style={{
          position: "absolute",
          left: v ? 60 : 0,
          right: v ? 60 : 0,
          top: v ? 1560 : 760,
          textAlign: "center",
          fontFamily: FONT,
          color: C.white,
          opacity: interpolate(line, [0, 0.3], [0, 1], clamp),
          transform: `translateY(${(1 - line) * 40}px)`,
        }}
      >
        <div style={{ display: "inline-block", padding: v ? "26px 44px" : "20px 40px", borderRadius: 999, background: "rgba(255,255,255,.14)", border: "2px solid rgba(255,255,255,.35)" }}>
          <div style={{ fontSize: v ? 44 : 40, fontWeight: 800 }}>🏆 America’s Best Online Platform 2025</div>
          <div style={{ fontSize: v ? 34 : 30, fontWeight: 500, opacity: 0.85, marginTop: 6 }}>Newsweek &amp; Statista</div>
        </div>
      </div>
      <Sparkle x={v ? 120 : 360} y={v ? 120 : 90} size={56} delay={14} />
      <Sparkle x={v ? 960 : 1560} y={v ? 470 : 300} size={44} delay={18} phase={16} />
    </SceneFrame>
  );
};
