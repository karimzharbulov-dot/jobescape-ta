import { getStaticFiles } from "@remotion/studio";

/** True when a file exists in /public (e.g. "screens/ai-bots.png", "music.mp3"). */
export const hasStatic = (path: string) => {
  try {
    return getStaticFiles().some((f) => f.name === path);
  } catch {
    return false;
  }
};

/** Real app screenshots. Drop these files into /public/screens/ and they replace the built-in recreations. */
export const SCREENS = {
  scan: "screens/scan-patterns.png",
  bots: "screens/ai-bots.png",
  simulator: "screens/simulator.png",
  learning: "screens/learning-paths.png",
  league: "screens/league.png",
  profile: "screens/profile.png",
} as const;
