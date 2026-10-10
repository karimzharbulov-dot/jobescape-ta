import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { SCENES, OVERLAP, TOTAL_FRAMES, SceneKey } from "./timeline";
import { SceneProps } from "./scenes/types";
import { hasStatic } from "./assets";
import { Hook } from "./scenes/Hook";
import { Brand } from "./scenes/Brand";
import { Scan } from "./scenes/Scan";
import { Bots } from "./scenes/Bots";
import { Simulator } from "./scenes/Simulator";
import { Learning } from "./scenes/Learning";
import { League } from "./scenes/League";
import { Proof } from "./scenes/Proof";
import { Cta } from "./scenes/Cta";

const ORDER: [SceneKey, React.FC<SceneProps>][] = [
  ["hook", Hook],
  ["brand", Brand],
  ["scan", Scan],
  ["bots", Bots],
  ["simulator", Simulator],
  ["learning", Learning],
  ["league", League],
  ["proof", Proof],
  ["cta", Cta],
];

/** The whole spot. Shared by the 9:16 and 16:9 compositions; scenes adapt via useLayout(). */
export const Main: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    {ORDER.map(([key, Scene]) => {
      const { from, dur } = SCENES[key];
      // each scene stays mounted OVERLAP frames past its slot so the next one can transition over it
      const len = Math.min(dur + OVERLAP, TOTAL_FRAMES - from);
      return (
        <Sequence key={key} name={key} from={from} durationInFrames={len}>
          <Scene dur={dur} from={from} />
        </Sequence>
      );
    })}
    {/* Music slot: drop a track at public/music.mp3 and it plays automatically. */}
    {hasStatic("music.mp3") && <Audio src={staticFile("music.mp3")} volume={(f) => Math.min(1, f / 15, (TOTAL_FRAMES - f) / 30)} />}
  </AbsoluteFill>
);
