import { loadFont as loadGoogleFont } from "@remotion/google-fonts/Inter";
import { loadFont as loadLocalFont } from "@remotion/fonts";
import { staticFile } from "remotion";

const WEIGHTS = ["500", "700", "800", "900"] as const;

/**
 * Inter comes from Google Fonts by default.
 * Set REMOTION_LOCAL_FONTS=1 to use the identical copy in public/fonts instead
 * (for offline renders, or machines that can't reach fonts.gstatic.com).
 */
const loadInter = (): string => {
  if (process.env.REMOTION_LOCAL_FONTS === "1") {
    for (const weight of WEIGHTS) {
      loadLocalFont({ family: "Inter", url: staticFile("fonts/Inter-latin-var.woff2"), weight, format: "woff2" });
    }
    return "Inter";
  }
  return loadGoogleFont("normal", { weights: [...WEIGHTS], subsets: ["latin"] }).fontFamily;
};

export const FONT = loadInter();

export const C = {
  violet: "#5A55F6",
  violetDeep: "#3F3AD9",
  white: "#FFFFFF",
  navy: "#1C1A4A",
  gray: "#F2F3F8",
  green: "#7AC143",
  gold: "#FFC21A",
  red: "#F04E4E",
  cyan: "#1FC8E3",
  // derived
  muted: "#8A89A8",
  line: "#E4E5EE",
} as const;

// Spring used for all kinetic type: a quick settle with a little overshoot.
export const SPRING: { damping: number; mass: number; stiffness: number } = { damping: 12, mass: 0.6, stiffness: 100 };
