import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { C, FONT } from "../theme";
import { prog } from "../lib";

/** Lighter supporting line(s) under a headline. */
export const SubText: React.FC<{
  children: React.ReactNode;
  delay: number;
  size: number;
  align?: "center" | "left";
  style?: React.CSSProperties;
}> = ({ children, delay, size, align = "center", style }) => {
  const frame = useCurrentFrame();
  const k = prog(frame, delay, delay + 12);
  return (
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 500,
        fontSize: size,
        lineHeight: 1.35,
        color: C.white,
        textAlign: align,
        opacity: interpolate(k, [0, 1], [0, 0.92]),
        transform: `translateY(${(1 - k) * 30}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
