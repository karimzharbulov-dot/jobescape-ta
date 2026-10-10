import React from "react";
import { AbsoluteFill, interpolate, Easing, useCurrentFrame } from "remotion";
import { Background } from "./Background";
import { useLayout } from "../layout";
import { OVERLAP } from "../timeline";
import { clamp } from "../lib";

export type Enter = "none" | "circle" | "whip" | "zoom";
export type Exit = "none" | "whip" | "zoom";

type Props = {
  /** scene length in frames (its storyboard slot); the scene keeps rendering OVERLAP frames past it */
  dur: number;
  /** global frame this scene starts at, keeps the background drift continuous across cuts */
  from: number;
  enter?: Enter;
  exit?: Exit;
  /** point (in px) the camera flies into on a zoom exit, usually the phone screen centre */
  zoomOrigin?: [number, number];
  children: React.ReactNode;
};

const T = OVERLAP;
const inOut = Easing.inOut(Easing.cubic);

/** Wraps a scene with its background and the enter/exit transition. */
export const SceneFrame: React.FC<Props> = ({ dur, from, enter = "none", exit = "none", zoomOrigin, children }) => {
  const f = useCurrentFrame();
  const { W, H } = useLayout();
  const kin = interpolate(f, [0, T], [0, 1], { ...clamp, easing: inOut });
  const kout = interpolate(f, [dur, dur + T], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const id = `whip-${from}`;

  let transform = "";
  let opacity = 1;
  let clipPath: string | undefined;
  let blur = 0;

  if (enter === "circle" && kin < 1) {
    const r = Math.hypot(W, H) / 2;
    clipPath = `circle(${kin * r}px at 50% 50%)`;
  }
  if (enter === "whip" && kin < 1) {
    transform += `translateX(${(1 - kin) * W}px) `;
    blur += Math.sin(kin * Math.PI) * 70;
  }
  if (enter === "zoom" && kin < 1) {
    transform += `scale(${0.55 + 0.45 * kin}) `;
    opacity = interpolate(kin, [0, 0.5], [0, 1], clamp);
  }
  if (exit === "whip" && kout > 0) {
    transform += `translateX(${-kout * W}px) `;
    blur += Math.sin(kout * Math.PI) * 70 + kout * 30;
  }
  const origin = zoomOrigin ? `${zoomOrigin[0]}px ${zoomOrigin[1]}px` : "50% 50%";
  if (exit === "zoom" && kout > 0) {
    transform += `scale(${1 + kout * kout * 7}) `;
  }

  return (
    <AbsoluteFill style={{ clipPath, opacity }}>
      {blur > 0.5 && (
        <svg width={0} height={0} style={{ position: "absolute" }}>
          <filter id={id} x="-10%" y="0" width="120%" height="100%">
            <feGaussianBlur stdDeviation={`${blur.toFixed(1)} 0`} />
          </filter>
        </svg>
      )}
      <AbsoluteFill
        style={{
          transform: transform || undefined,
          transformOrigin: origin,
          filter: blur > 0.5 ? `url(#${id})` : undefined,
        }}
      >
        <Background offset={from} />
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
