import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { pop, bob } from "../lib";
import { hasStatic } from "../assets";

/** Logical size screens are designed at (iPhone points). */
export const SCREEN_W = 390;
export const SCREEN_H = 844;
export const PHONE_RATIO = 2.06;

type Props = {
  x: number;
  y: number;
  /** device width in px; height follows the iPhone ratio */
  w: number;
  delay?: number;
  tilt?: number;
  /** screenshot in /public, e.g. "screens/ai-bots.png". Used when the file exists, otherwise `children` render. */
  src?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

/** iPhone frame. Slides up on a spring, then rests at a slight tilt and floats. */
export const PhoneMockup: React.FC<Props> = ({ x, y, w, delay = 0, tilt = -2.5, src, children, style }) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const s = pop(frame, fps, delay, { damping: 14, mass: 0.8 });
  const h = w * PHONE_RATIO;
  const bezel = w * 0.032;
  const sw = w - bezel * 2;
  const scale = sw / SCREEN_W;
  const radius = w * 0.15;
  const useImage = src !== undefined && hasStatic(src);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        transform: `translateY(${(1 - s) * (height - y + 80) + bob(frame, 8, 75)}px) rotate(${tilt * s}deg)`,
        transformOrigin: "50% 30%",
        ...style,
      }}
    >
      {/* side buttons */}
      {[0.2, 0.29, 0.38].map((t, i) => (
        <div key={i} style={{ position: "absolute", left: -w * 0.012, top: h * t, width: w * 0.016, height: h * (i ? 0.065 : 0.035), background: "#1b1b22", borderRadius: 4 }} />
      ))}
      <div style={{ position: "absolute", right: -w * 0.012, top: h * 0.28, width: w * 0.016, height: h * 0.1, background: "#1b1b22", borderRadius: 4 }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          background: "#16161c",
          boxShadow: "0 60px 90px -30px rgba(15,10,90,.65), inset 0 0 0 3px #3a3a44",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: bezel,
          top: bezel,
          width: sw,
          height: h - bezel * 2,
          borderRadius: radius - bezel,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {useImage ? (
          <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
        ) : (
          <div style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${scale})`, transformOrigin: "0 0" }}>{children}</div>
        )}
        {/* dynamic island */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 11 * scale,
            width: 120 * scale,
            height: 35 * scale,
            marginLeft: -60 * scale,
            borderRadius: 20 * scale,
            background: "#0b0b10",
          }}
        />
      </div>
    </div>
  );
};
