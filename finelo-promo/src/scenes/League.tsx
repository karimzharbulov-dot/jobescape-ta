import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Headline } from "../components/Headline";
import { PhoneMockup } from "../components/PhoneMockup";
import { Sparkle } from "../components/Sparkle";
import { CountUp } from "../components/CountUp";
import { LeagueScreen } from "../screens/LeagueScreen";
import { Flame } from "../illustrations/Flame";
import { useLayout } from "../layout";
import { SCREENS } from "../assets";
import { C, FONT } from "../theme";
import { pop, clamp } from "../lib";
import { SceneProps } from "./types";

const StatCard: React.FC<{ x: number; y: number; w: number; at: number; icon: React.ReactNode; children: React.ReactNode; label: string; S: number }> = ({
  x,
  y,
  w,
  at,
  icon,
  children,
  label,
  S,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = pop(f, fps, at, { damping: 10 });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        padding: `${28 * S}px ${30 * S}px`,
        borderRadius: 40 * S,
        background: C.white,
        display: "flex",
        alignItems: "center",
        gap: 20 * S,
        fontFamily: FONT,
        boxShadow: "0 30px 60px -24px rgba(15,10,90,.6)",
        transform: `translateY(${(1 - k) * 120}px) scale(${0.7 + 0.3 * k})`,
        opacity: interpolate(k, [0, 0.3], [0, 1], clamp),
      }}
    >
      {icon}
      <div>
        <div style={{ fontSize: 76 * S, fontWeight: 900, color: C.navy, letterSpacing: "-0.03em", lineHeight: 1 }}>{children}</div>
        <div style={{ fontSize: 30 * S, fontWeight: 700, color: C.muted, marginTop: 6 * S }}>{label}</div>
      </div>
    </div>
  );
};

export const League: React.FC<SceneProps> = ({ dur, from }) => {
  const f = useCurrentFrame();
  const L = useLayout();
  const { v } = L;
  const S = v ? 1 : 0.9;
  const cardW = v ? 450 : 400;
  const cards = v
    ? [
        [60, 1560],
        [570, 1560],
      ]
    : [
        [L.textX, 640],
        [L.textX + 430, 640],
      ];
  return (
    <SceneFrame dur={dur} from={from} enter="zoom" exit="none">
      <div style={{ position: "absolute", left: L.textX, width: L.textW, top: v ? 170 : 260 }}>
        <Headline lines={[[{ pill: "Show" }, "your"], ["progression"]]} delay={6} size={L.headSize} align={L.align} />
      </div>
      <PhoneMockup x={L.phoneX} y={v ? 640 : L.phoneY} w={L.phoneW} delay={12} src={SCREENS.league}>
        <LeagueScreen start={20} />
      </PhoneMockup>
      <Sparkle x={v ? 110 : 1180} y={v ? 600 : 180} size={70} delay={24} />
      <Sparkle x={v ? 960 : 1840} y={v ? 560 : 140} size={50} delay={30} phase={18} />
      <StatCard x={cards[0][0]} y={cards[0][1]} w={cardW} at={90} S={S} label="day streak" icon={<Flame size={100 * S} flicker={Math.sin(f / 3)} />}>
        <CountUp to={184} start={92} dur={30} />
      </StatCard>
      <StatCard
        x={cards[1][0]}
        y={cards[1][1]}
        w={cardW}
        at={105}
        S={S}
        label="lessons finished"
        icon={
          <div style={{ width: 96 * S, height: 96 * S, borderRadius: 28 * S, background: "#E6F5DA", color: C.green, fontSize: 56 * S, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>
            ✓
          </div>
        }
      >
        <CountUp to={27} start={107} dur={26} />
      </StatCard>
    </SceneFrame>
  );
};
