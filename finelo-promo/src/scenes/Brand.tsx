import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { FineloLogo } from "../components/FineloLogo";
import { Sparkle } from "../components/Sparkle";
import { useLayout } from "../layout";
import { pop, clamp } from "../lib";
import { FONT, C } from "../theme";
import { SceneProps } from "./types";

const LINES: [string, string][] = [
  ["Learn", "AI trading."],
  ["Grow", "your skills."],
  ["Build", "your confidence."],
];

export const Brand: React.FC<SceneProps> = ({ dur, from }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { v, W } = useLayout();
  const logoH = v ? 160 : 150;
  const logoW = logoH * (1152 / 250);
  const logoY = v ? 640 : 300;
  const s = pop(f, fps, 2, { damping: 11 });
  const cx = W / 2;
  return (
    <SceneFrame dur={dur} from={from} enter="circle" exit="whip">
      <div style={{ position: "absolute", left: cx - logoW / 2, top: logoY, transform: `scale(${0.6 + 0.4 * s})`, transformOrigin: "50% 50%" }}>
        <FineloLogo height={logoH} delay={4} />
      </div>
      <Sparkle x={cx - logoW / 2 - 40} y={logoY - 40} size={90} delay={14} />
      <Sparkle x={cx + logoW / 2 + 30} y={logoY - 10} size={60} delay={18} phase={20} />
      <Sparkle x={cx + logoW / 2 - 60} y={logoY + logoH + 50} size={44} delay={22} phase={40} />
      <Sparkle x={cx - logoW / 2 + 40} y={logoY + logoH + 70} size={32} delay={26} phase={10} color={C.white} />
      <div style={{ position: "absolute", left: 0, right: 0, top: logoY + logoH + (v ? 170 : 110), fontFamily: FONT, textAlign: "center" }}>
        {LINES.map(([a, rest], i) => {
          const at = 30 + i * 15;
          const k = pop(f, fps, at);
          return (
            <div
              key={a}
              style={{
                fontSize: v ? 68 : 56,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.35,
                color: C.white,
                opacity: interpolate(f - at, [0, 4], [0, 1], clamp),
                transform: `translateY(${(1 - k) * 50}px)`,
              }}
            >
              <span style={{ color: C.green }}>{a}</span> {rest}
            </div>
          );
        })}
      </div>
    </SceneFrame>
  );
};
