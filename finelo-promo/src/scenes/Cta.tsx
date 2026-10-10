import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { FineloLogo } from "../components/FineloLogo";
import { Headline } from "../components/Headline";
import { Sparkle } from "../components/Sparkle";
import { useLayout } from "../layout";
import { C, FONT } from "../theme";
import { pop, clamp, beatPulse } from "../lib";
import { SceneProps } from "./types";

export const Cta: React.FC<SceneProps> = ({ dur, from }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { v, W, H } = useLayout();
  const logoH = v ? 120 : 96;
  const logoW = logoH * (1152 / 250);
  const btnIn = pop(f, fps, 40, { damping: 10 });
  const pulse = f > 50 ? beatPulse(f, 15) : 0;
  const url = interpolate(f, [55, 65], [0, 1], clamp);
  const foot = interpolate(f, [60, 72], [0, 0.6], clamp);
  return (
    <SceneFrame dur={dur} from={from} enter="whip">
      <div style={{ position: "absolute", left: (W - logoW) / 2, top: v ? 300 : 110 }}>
        <FineloLogo height={logoH} delay={4} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: v ? 560 : 300 }}>
        <Headline
          lines={v ? [["Learn,", "Trade,"], ["Succeed", "with"], [{ pill: "Finelo" }]] : [["Learn,", "Trade,", "Succeed"], ["with", { pill: "Finelo" }]]}
          delay={14}
          stagger={4}
          size={v ? 120 : 100}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: v ? 1180 : 640,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: v ? "38px 70px" : "30px 60px",
            borderRadius: 999,
            background: C.white,
            color: C.violet,
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: v ? 54 : 46,
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            transform: `scale(${btnIn * (1 + pulse * 0.05)})`,
            boxShadow: `0 30px 60px -20px rgba(15,10,90,.6), 0 0 0 ${pulse * 18}px rgba(255,255,255,${0.25 * pulse})`,
          }}
        >
          Take the 1-minute quiz →
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: v ? 1380 : 800,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: v ? 52 : 44,
          color: C.white,
          opacity: url,
          transform: `translateY(${(1 - url) * 20}px)`,
        }}
      >
        finelo.com
      </div>
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: H - (v ? 150 : 80),
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 500,
          fontSize: v ? 28 : 24,
          lineHeight: 1.4,
          color: C.white,
          opacity: foot,
        }}
      >
        Educational platform only. Not financial advice. Investing involves risk.
      </div>
      <Sparkle x={v ? 150 : 520} y={v ? 260 : 100} size={70} delay={10} />
      <Sparkle x={v ? 940 : 1420} y={v ? 450 : 200} size={50} delay={16} phase={20} />
      <Sparkle x={v ? 900 : 1500} y={v ? 1150 : 640} size={40} delay={46} phase={8} />
    </SceneFrame>
  );
};
