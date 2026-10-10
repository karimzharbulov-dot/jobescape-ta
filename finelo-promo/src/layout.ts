import { useVideoConfig } from "remotion";

/**
 * Scenes are shared between the 9:16 and 16:9 compositions.
 * `v` is true for vertical. In landscape, copy sits in a left column and the phone on the right.
 */
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const v = height > width;
  return {
    v,
    W: width,
    H: height,
    // headline column
    textX: v ? 0 : 110,
    textW: v ? width : 860,
    align: (v ? "center" : "left") as "center" | "left",
    // phone placement (top-left corner of the device) and size
    phoneW: v ? 700 : 500,
    phoneX: v ? (width - 700) / 2 : 1240,
    phoneY: v ? 800 : 130,
    headSize: v ? 112 : 116,
    subSize: v ? 50 : 42,
  };
};
