// All timings in frames @ 30fps. One beat at ~120 BPM = 15 frames.
export const FPS = 30;
export const BEAT = 15;
export const b = (beats: number) => Math.round(beats * BEAT);

// Frames each scene keeps rendering after its slot ends, while the next scene transitions in on top.
export const OVERLAP = 12;

export type SceneKey =
  | "hook"
  | "brand"
  | "scan"
  | "bots"
  | "simulator"
  | "learning"
  | "league"
  | "proof"
  | "cta";

// Storyboard. Change `from` / `dur` here to retime; scenes read their own duration from this table.
export const SCENES: Record<SceneKey, { from: number; dur: number }> = {
  hook: { from: 0, dur: 90 },
  brand: { from: 90, dur: 90 },
  scan: { from: 180, dur: 150 },
  bots: { from: 330, dur: 180 },
  simulator: { from: 510, dur: 150 },
  learning: { from: 660, dur: 150 },
  league: { from: 810, dur: 150 },
  proof: { from: 960, dur: 120 },
  cta: { from: 1080, dur: 120 },
};

export const TOTAL_FRAMES = 1200;
