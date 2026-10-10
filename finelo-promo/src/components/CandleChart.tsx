import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, random } from "remotion";
import { C } from "../theme";
import { pop } from "../lib";

type Candle = { o: number; c: number; h: number; l: number };

/** Deterministic, mostly-rising candle series. */
export const makeSeries = (n: number, seed: string, trend = 0.35): Candle[] => {
  let v = 0;
  return Array.from({ length: n }, (_, i) => {
    const d = (random(`${seed}-${i}`) - 0.42) * 1.6 + trend;
    const o = v;
    const c = v + d;
    v = c;
    return {
      o,
      c,
      h: Math.max(o, c) + 0.15 + random(`${seed}-h${i}`) * 0.4,
      l: Math.min(o, c) - 0.15 - random(`${seed}-l${i}`) * 0.4,
    };
  });
};

/** Candlesticks that grow in one by one (spring on scaleY). */
export const CandleChart: React.FC<{
  width: number;
  height: number;
  count?: number;
  seed?: string;
  start?: number;
  stagger?: number;
  up?: string;
  down?: string;
  trend?: number;
  style?: React.CSSProperties;
}> = ({ width, height, count = 14, seed = "c", start = 0, stagger = 3, up = C.green, down = C.white, trend, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const data = useMemo(() => makeSeries(count, seed, trend), [count, seed, trend]);
  const lo = Math.min(...data.map((d) => d.l));
  const hi = Math.max(...data.map((d) => d.h));
  const y = (v: number) => height - ((v - lo) / (hi - lo)) * height;
  const step = width / count;
  const bw = step * 0.56;
  return (
    <svg width={width} height={height} style={{ overflow: "visible", ...style }}>
      {data.map((d, i) => {
        const k = pop(frame, fps, start + i * stagger, { damping: 10 });
        const cx = step * (i + 0.5);
        const top = y(Math.max(d.o, d.c));
        const bot = y(Math.min(d.o, d.c));
        const mid = (top + bot) / 2;
        const col = d.c >= d.o ? up : down;
        return (
          <g key={i} transform={`translate(0 ${mid}) scale(1 ${Math.max(0, k)}) translate(0 ${-mid})`} opacity={Math.min(1, k * 2)}>
            <line x1={cx} x2={cx} y1={y(d.h)} y2={y(d.l)} stroke={col} strokeWidth={Math.max(2, bw * 0.16)} strokeLinecap="round" />
            <rect x={cx - bw / 2} y={top} width={bw} height={Math.max(4, bot - top)} rx={bw * 0.22} fill={col} />
          </g>
        );
      })}
    </svg>
  );
};
