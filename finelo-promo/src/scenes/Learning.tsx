import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Headline } from "../components/Headline";
import { PhoneMockup } from "../components/PhoneMockup";
import { Sparkle } from "../components/Sparkle";
import { LearningScreen } from "../screens/LearningScreen";
import { useLayout } from "../layout";
import { SCREENS } from "../assets";
import { C, FONT } from "../theme";
import { pop, clamp, bob } from "../lib";
import { SceneProps } from "./types";

const CHIPS = [
  { icon: "📚", text: "300+ bite-sized lessons", at: 60 },
  { icon: "⏱", text: "~3 min each", at: 75 },
  { icon: "🌍", text: "10 languages", at: 90 },
];

const Chip: React.FC<{ x: number; y: number; at: number; text: string; icon: string; size: number; i: number }> = ({ x, y, at, text, icon, size, i }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = pop(f, fps, at, { damping: 9 });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + bob(f, 5, 50, i * 17),
        display: "flex",
        alignItems: "center",
        gap: size * 0.4,
        padding: `${size * 0.42}px ${size * 0.8}px ${size * 0.42}px ${size * 0.45}px`,
        borderRadius: size * 2,
        background: C.white,
        color: C.navy,
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: size,
        whiteSpace: "nowrap",
        boxShadow: "0 24px 50px -18px rgba(15,10,90,.55)",
        transform: `scale(${k}) rotate(${(i % 2 ? 2 : -2) * k}deg)`,
        transformOrigin: "20% 50%",
        opacity: interpolate(k, [0, 0.3], [0, 1], clamp),
      }}
    >
      <span
        style={{
          width: size * 1.7,
          height: size * 1.7,
          borderRadius: size,
          background: i === 1 ? "#ECEBFE" : i === 2 ? "#E6F5DA" : "#FFF3D0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.95,
        }}
      >
        {icon}
      </span>
      {text}
    </div>
  );
};

export const Learning: React.FC<SceneProps> = ({ dur, from }) => {
  const L = useLayout();
  const { v } = L;
  const chipSize = v ? 46 : 40;
  const chipPos = v
    ? [
        [40, 1210],
        [560, 1690],
        [70, 1800],
      ]
    : [
        [L.textX, 560],
        [L.textX + 60, 690],
        [L.textX, 820],
      ];
  return (
    <SceneFrame dur={dur} from={from} enter="whip" exit="zoom" zoomOrigin={[L.phoneX + L.phoneW / 2, L.phoneY + (v ? 560 : 420)]}>
      <div style={{ position: "absolute", left: L.textX, width: L.textW, top: v ? 210 : 230 }}>
        <Headline lines={[[{ pill: "Challenge" }], ["yourself"]]} delay={6} size={v ? 124 : L.headSize} align={L.align} />
      </div>
      <PhoneMockup x={L.phoneX} y={L.phoneY} w={L.phoneW} delay={14} tilt={2.5} src={SCREENS.learning}>
        <LearningScreen start={22} />
      </PhoneMockup>
      <Sparkle x={v ? 130 : 1170} y={v ? 760 : 160} size={70} delay={26} />
      <Sparkle x={v ? 950 : 1820} y={v ? 680 : 120} size={60} delay={30} phase={22} />
      <Sparkle x={v ? 985 : 1860} y={v ? 760 : 190} size={28} delay={34} phase={8} />
      {CHIPS.map((c, i) => (
        <Chip key={c.text} {...c} x={chipPos[i][0]} y={chipPos[i][1]} size={chipSize} i={i} />
      ))}
    </SceneFrame>
  );
};
