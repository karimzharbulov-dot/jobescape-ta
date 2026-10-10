import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { C, FONT } from "../theme";
import { pop, clamp } from "../lib";
import { PillWord } from "./PillWord";

export type Word = string | { pill: string };

type Props = {
  /** One array per line. `{pill: "AI bots"}` puts that keyword in a white pill. */
  lines: Word[][];
  delay?: number;
  stagger?: number;
  size: number;
  align?: "center" | "left";
  color?: string;
  style?: React.CSSProperties;
};

/** Kinetic headline: each word springs up and in, one after another. */
export const Headline: React.FC<Props> = ({
  lines,
  delay = 0,
  stagger = 4,
  size,
  align = "center",
  color = C.white,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  let i = 0;
  return (
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1.12,
        letterSpacing: "-0.03em",
        color,
        textAlign: align,
        ...style,
      }}
    >
      {lines.map((line, li) => (
        <div
          key={li}
          style={{
            display: "flex",
            justifyContent: align === "center" ? "center" : "flex-start",
            flexWrap: "nowrap",
            gap: size * 0.26,
            whiteSpace: "nowrap",
            marginTop: li ? size * 0.06 : 0,
          }}
        >
          {line.map((w, wi) => {
            const d = delay + i++ * stagger;
            if (typeof w !== "string") {
              return <PillWord key={wi} text={w.pill} delay={d} size={size} />;
            }
            const s = pop(frame, fps, d);
            const o = interpolate(frame - d, [0, 4], [0, 1], clamp);
            return (
              <span
                key={wi}
                style={{
                  display: "inline-block",
                  opacity: o,
                  transform: `translateY(${(1 - s) * size * 0.7}px) scale(${0.6 + 0.4 * s})`,
                  transformOrigin: "50% 80%",
                }}
              >
                {w}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};
