import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { CandleChart } from "../components/CandleChart";
import { Headline } from "../components/Headline";
import { useLayout } from "../layout";
import { pop, clamp } from "../lib";
import { FONT, C } from "../theme";
import { SceneProps } from "./types";

/** Words slam in from big to normal size with a little camera shake. */
const Slam: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, children, style }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(f, fps, at, { damping: 14, mass: 0.5, stiffness: 160 });
  const shake = f >= at + 3 && f < at + 10 ? Math.sin(f * 2.7) * (at + 10 - f) * 1.6 : 0;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        transform: `translate(${shake}px, ${shake * 0.6}px) scale(${interpolate(s, [0, 1], [2.6, 1])})`,
        opacity: interpolate(f - at, [0, 2], [0, 1], clamp),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Hook: React.FC<SceneProps> = ({ dur, from }) => {
  const f = useCurrentFrame();
  const { v, W, H } = useLayout();
  const black = interpolate(f, [0, 3], [1, 0], clamp);
  const flash = interpolate(f, [3, 5, 12], [0, 0.9, 0], clamp);
  const lift = interpolate(f, [42, 50], [0, 1], { ...clamp });
  const size = v ? 128 : 120;
  const midY = v ? 760 : 380;
  return (
    <SceneFrame dur={dur} from={from}>
      <CandleChart
        width={W * 1.05}
        height={v ? 620 : 420}
        count={v ? 14 : 22}
        seed="hook"
        start={8}
        stagger={2}
        down="rgba(255,255,255,.6)"
        style={{ position: "absolute", left: -W * 0.025, top: v ? H - 760 : H - 470, opacity: 0.45 }}
      />
      <Slam at={6} style={{ top: midY - lift * (v ? 230 : 160) }}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: size,
            letterSpacing: "-0.035em",
            color: C.white,
            textAlign: "center",
            lineHeight: 1.05,
            transform: `scale(${1 - lift * 0.35})`,
            opacity: 1 - lift * 0.35,
          }}
        >
          {v ? (
            <>
              New to
              <br />
              trading?
            </>
          ) : (
            "New to trading?"
          )}
        </div>
      </Slam>
      <div style={{ position: "absolute", left: 0, right: 0, top: v ? midY + 60 : midY + 40 }}>
        <Headline lines={[["Start", "by"], [{ pill: "understanding" }], ["it."]]} delay={46} stagger={4} size={v ? 112 : 92} />
      </div>
      <AbsoluteFill style={{ background: "#000", opacity: black }} />
      <AbsoluteFill style={{ background: "#fff", opacity: flash }} />
    </SceneFrame>
  );
};
