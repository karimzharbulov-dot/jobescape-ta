import { interpolate, spring, Easing } from "remotion";
import { SPRING } from "./theme";

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0..1 linear progress of `frame` across [a, b]. */
export const prog = (frame: number, a: number, b: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(frame, [a, b], [0, 1], { ...clamp, easing: ease });

/** House spring starting at `delay`. */
export const pop = (frame: number, fps: number, delay = 0, config: Partial<typeof SPRING> = {}) =>
  spring({ frame: frame - delay, fps, config: { ...SPRING, ...config } });

/** Gentle sine bob, in px. */
export const bob = (frame: number, amp = 8, period = 60, phase = 0) =>
  Math.sin(((frame + phase) / period) * Math.PI * 2) * amp;

/** Pulse that peaks on every beat (0..1). */
export const beatPulse = (frame: number, beat = 15, offset = 0) => {
  const t = (((frame - offset) % beat) + beat) % beat;
  return Math.exp(-t / 3.5);
};

export const fmt = (n: number, decimals = 0) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
