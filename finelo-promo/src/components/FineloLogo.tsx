import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { C } from "../theme";
import { pop, clamp } from "../lib";

/** Finelo "F" mark: white F with the green square. Builds square -> stem -> bar from `delay`. */
export const FineloIcon: React.FC<{ size: number; delay?: number; animate?: boolean }> = ({ size, delay = 0, animate = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sq = animate ? pop(frame, fps, delay, { damping: 8 }) : 1;
  const ease = Easing.out(Easing.poly(5));
  const stem = animate ? interpolate(frame, [delay + 4, delay + 14], [0, 1], { ...clamp, easing: ease }) : 1;
  const bar = animate ? interpolate(frame, [delay + 9, delay + 19], [0, 1], { ...clamp, easing: ease }) : 1;
  return (
    <svg width={size} height={size} viewBox="0 0 218 218" style={{ overflow: "visible" }}>
      <g transform={`translate(0 218) scale(1 ${stem}) translate(0 -218)`}>
        <rect x={0} y={0} width={97} height={218} rx={14} fill={C.white} />
      </g>
      <g transform={`scale(${bar} 1)`} opacity={bar > 0 ? 1 : 0}>
        <rect x={0} y={0} width={218} height={97} rx={14} fill={C.white} />
        <path d="M97 97 h14 a14 14 0 0 0 -14 14 z" fill={C.white} />
      </g>
      <g transform={`translate(157.5 160.5) scale(${sq}) translate(-157.5 -160.5)`}>
        <rect x={125} y={128} width={65} height={65} rx={12} fill="#62C234" />
      </g>
    </svg>
  );
};

/** Full lockup: icon + wordmark (wordmark reveals left-to-right after the icon builds). */
export const FineloLogo: React.FC<{ height: number; delay?: number; animate?: boolean }> = ({ height, delay = 0, animate = true }) => {
  const frame = useCurrentFrame();
  // original lockup proportions: icon 218, gap 82, wordmark 852x250
  const k = height / 250;
  const reveal = animate ? interpolate(frame, [delay + 14, delay + 30], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) }) : 1;
  return (
    <div style={{ position: "relative", width: 1152 * k, height: 250 * k }}>
      <div style={{ position: "absolute", left: 0, top: 16 * k }}>
        <FineloIcon size={218 * k} delay={delay} animate={animate} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 300 * k,
          top: 0,
          width: 852 * k,
          height: 250 * k,
          clipPath: `inset(-10% ${(1 - reveal) * 100}% -10% 0)`,
          transform: `translateX(${(1 - reveal) * -40 * k}px)`,
          opacity: interpolate(reveal, [0, 0.2], [0, 1], clamp),
        }}
      >
        <Img src={staticFile("brand/finelo-wordmark.png")} style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
};
