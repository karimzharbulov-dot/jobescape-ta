import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Headline } from "../components/Headline";
import { SubText } from "../components/SubText";
import { PhoneMockup } from "../components/PhoneMockup";
import { Sparkle } from "../components/Sparkle";
import { Tap } from "../components/Tap";
import { SimulatorScreen } from "../screens/SimulatorScreen";
import { useLayout } from "../layout";
import { SCREENS } from "../assets";
import { C, FONT } from "../theme";
import { pop, clamp } from "../lib";
import { SceneProps } from "./types";

const TAP_AT = 100;

const Squiggle: React.FC<{ up: boolean; w: number }> = ({ up, w }) => (
  <svg width={w} height={w * 0.45} viewBox="0 0 120 54">
    {up ? (
      <path d="M6 46 L26 28 L40 38 L60 16 L74 30 L96 8 M86 8 H98 V20" stroke={C.green} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M6 10 L24 26 L40 14 L58 34 L74 22 L96 44 M86 44 H98 V32" stroke={C.red} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    )}
  </svg>
);

/** DOWN / UP panel that overhangs the phone, plus the +4.04% burst after the tap. */
const TradePanel: React.FC<{ x: number; y: number; w: number }> = ({ x, y, w }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = pop(f, fps, 60, { damping: 13 });
  const press = interpolate(f, [TAP_AT - 3, TAP_AT, TAP_AT + 6], [1, 0.9, 1], clamp);
  const hit = f >= TAP_AT;
  const burst = interpolate(f, [TAP_AT, TAP_AT + 18], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const label = pop(f, fps, TAP_AT + 2, { damping: 8 });
  const S = w / 900;
  const btn = (up: boolean) => (
    <div
      style={{
        flex: 1,
        height: 250 * S,
        borderRadius: 30 * S,
        background: up && hit ? "#E6F5DA" : C.gray,
        border: up && hit ? `4px solid ${C.green}` : "4px solid transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20 * S,
        transform: up ? `scale(${press})` : undefined,
      }}
    >
      <Squiggle up={up} w={160 * S} />
      <div style={{ fontSize: 50 * S, fontWeight: 800, letterSpacing: "0.04em", color: C.navy }}>{up ? "UP" : "DOWN"}</div>
    </div>
  );
  const upCx = x + w * 0.75;
  const upCy = y + 30 * S + 125 * S;
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: w,
          padding: 30 * S,
          borderRadius: 40 * S,
          background: C.white,
          display: "flex",
          gap: 24 * S,
          fontFamily: FONT,
          boxShadow: "0 40px 80px -30px rgba(15,10,90,.6)",
          transform: `translateY(${(1 - k) * 260}px)`,
          opacity: interpolate(k, [0, 0.3], [0, 1], clamp),
        }}
      >
        {btn(false)}
        {btn(true)}
      </div>
      {hit &&
        Array.from({ length: 14 }, (_, i) => {
          const a = (i / 14) * Math.PI * 2;
          const r = 60 + burst * 230 * S * 1.6;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: upCx + Math.cos(a) * r - 9,
                top: upCy + Math.sin(a) * r - 9,
                width: 18,
                height: 18,
                borderRadius: i % 2 ? 4 : 9,
                background: i % 3 ? C.green : C.gold,
                opacity: 1 - burst,
                transform: `scale(${1 - burst * 0.5}) rotate(${burst * 180}deg)`,
              }}
            />
          );
        })}
      <div
        style={{
          position: "absolute",
          left: upCx - 170,
          top: y - 150 * S - 70,
          width: 340,
          height: 120,
          borderRadius: 60,
          background: C.green,
          color: C.white,
          fontFamily: FONT,
          fontSize: 66,
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${hit ? label : 0}) translateY(${-burst * 30}px)`,
          boxShadow: "0 20px 40px -12px rgba(30,80,10,.5)",
        }}
      >
        +4.04%
      </div>
      <Tap x={upCx} y={upCy} at={TAP_AT} />
    </>
  );
};

export const Simulator: React.FC<SceneProps> = ({ dur, from }) => {
  const L = useLayout();
  const { v } = L;
  const panelW = v ? 900 : 700;
  const panelX = v ? (L.W - panelW) / 2 : L.phoneX + L.phoneW / 2 - panelW / 2;
  const panelY = v ? 1560 : 790;
  return (
    <SceneFrame dur={dur} from={from} enter="circle" exit="whip">
      <div style={{ position: "absolute", left: L.textX, width: L.textW, top: v ? 170 : 330 }}>
        <Headline lines={[[{ pill: "Trade" }, "in", "our"], ["Simulator"]]} delay={6} size={L.headSize} align={L.align} />
        <SubText delay={22} size={L.subSize} align={L.align} style={{ marginTop: 26 }}>
          Real market data. Virtual funds.
          <br />
          <b style={{ fontWeight: 800 }}>Zero risk.</b>
        </SubText>
      </div>
      <PhoneMockup x={L.phoneX} y={L.phoneY} w={L.phoneW} delay={14} src={SCREENS.simulator}>
        <SimulatorScreen start={24} />
      </PhoneMockup>
      <Sparkle x={v ? 960 : 1180} y={v ? 700 : 150} size={80} delay={30} />
      <Sparkle x={v ? 1000 : 1150} y={v ? 790 : 230} size={34} delay={36} phase={12} />
      <TradePanel x={panelX} y={panelY} w={panelW} />
    </SceneFrame>
  );
};
