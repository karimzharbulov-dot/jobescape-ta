import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { Headline } from "../components/Headline";
import { SubText } from "../components/SubText";
import { PhoneMockup } from "../components/PhoneMockup";
import { StarBurstBadge } from "../components/StarBurstBadge";
import { Sparkle } from "../components/Sparkle";
import { Tap } from "../components/Tap";
import { BotsScreen } from "../screens/BotsScreen";
import { useLayout } from "../layout";
import { SCREENS } from "../assets";
import { C, FONT } from "../theme";
import { pop, clamp } from "../lib";
import { SceneProps } from "./types";

const STEPS = ["Bot scans", "You review", "You approve"];
const STEP_AT = [90, 105, 120];
const APPROVE_AT = 130;
const TAP_AT = 150;

/** "Bot scans -> You review -> You approve" strip with an Approve button that gets tapped. */
const StepStrip: React.FC<{ x: number; y: number; w: number; scale: number }> = ({ x, y, w, scale }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = pop(f, fps, STEP_AT[0] - 4, { damping: 14 });
  const btn = pop(f, fps, APPROVE_AT, { damping: 10 });
  const done = f >= TAP_AT;
  const press = interpolate(f, [TAP_AT - 3, TAP_AT, TAP_AT + 5], [1, 0.92, 1], clamp);
  const check = pop(f, fps, TAP_AT, { damping: 8 });
  const S = scale;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        padding: 34 * S,
        borderRadius: 44 * S,
        background: C.white,
        boxShadow: "0 40px 80px -30px rgba(15,10,90,.6)",
        fontFamily: FONT,
        transform: `translateY(${(1 - card) * 200}px) scale(${0.85 + 0.15 * card})`,
        opacity: interpolate(card, [0, 0.3], [0, 1], clamp),
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {STEPS.map((s, i) => {
          const k = pop(f, fps, STEP_AT[i], { damping: 10 });
          return (
            <React.Fragment key={s}>
              {i > 0 && (
                <div style={{ fontSize: 44 * S, fontWeight: 900, color: C.violet, opacity: k, transform: `translateX(${(1 - k) * -20}px)` }}>→</div>
              )}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 * S, transform: `scale(${k})` }}>
                <div
                  style={{
                    width: 92 * S,
                    height: 92 * S,
                    borderRadius: 28 * S,
                    background: i === 2 && done ? C.green : "#ECEBFE",
                    color: i === 2 && done ? C.white : C.violet,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 46 * S,
                    fontWeight: 900,
                  }}
                >
                  {i === 2 && done ? "✓" : i + 1}
                </div>
                <div style={{ fontSize: 34 * S, fontWeight: 800, color: C.navy, whiteSpace: "nowrap" }}>{s}</div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 30 * S,
          height: 110 * S,
          borderRadius: 55 * S,
          background: done ? C.green : C.violet,
          color: C.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16 * S,
          fontSize: 44 * S,
          fontWeight: 800,
          transform: `scale(${btn * press})`,
        }}
      >
        {done ? (
          <>
            Approved <span style={{ display: "inline-block", transform: `scale(${check})` }}>✓</span>
          </>
        ) : (
          "Approve ✓"
        )}
      </div>
    </div>
  );
};

export const Bots: React.FC<SceneProps> = ({ dur, from }) => {
  const L = useLayout();
  const { v } = L;
  const stripW = v ? 940 : 820;
  const stripX = v ? (L.W - stripW) / 2 : L.textX;
  const stripY = v ? 1390 : 640;
  const stripS = v ? 1 : 0.86;
  // centre of the Approve button, for the tap
  const tapX = stripX + stripW / 2;
  const tapY = stripY + (34 + 92 + 12 + 42 + 30 + 55) * stripS + 8;
  return (
    <SceneFrame dur={dur} from={from} enter="zoom" exit="none">
      <div style={{ position: "absolute", left: L.textX, width: L.textW, top: v ? 170 : 150 }}>
        <Headline lines={[["Practice", "with"], [{ pill: "AI bots" }]]} delay={6} size={L.headSize} align={L.align} />
        <SubText delay={22} size={L.subSize} align={L.align} style={{ marginTop: 26 }}>
          Watch real strategies play out
          <br />
          in real time
        </SubText>
      </div>
      <PhoneMockup x={L.phoneX} y={L.phoneY} w={L.phoneW} delay={14} src={SCREENS.bots}>
        <BotsScreen start={26} />
      </PhoneMockup>
      <StarBurstBadge x={L.phoneX + L.phoneW - 30} y={L.phoneY + (v ? 470 : 330)} size={v ? 230 : 180} delay={50} tilt={-18} ring={false}>
        <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: v ? 64 : 50, letterSpacing: "-0.02em" }}>NEW</div>
      </StarBurstBadge>
      <Sparkle x={v ? 120 : 1180} y={v ? 820 : 200} size={74} delay={28} />
      <Sparkle x={v ? 960 : 1830} y={v ? 120 : 860} size={54} delay={34} phase={20} />
      <StepStrip x={stripX} y={stripY} w={stripW} scale={stripS} />
      <Tap x={tapX} y={tapY} at={TAP_AT} />
    </SceneFrame>
  );
};
