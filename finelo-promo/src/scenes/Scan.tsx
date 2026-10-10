import React from "react";
import { SceneFrame } from "../components/SceneFrame";
import { Headline } from "../components/Headline";
import { SubText } from "../components/SubText";
import { PhoneMockup, PHONE_RATIO } from "../components/PhoneMockup";
import { StarBurstBadge } from "../components/StarBurstBadge";
import { Sparkle } from "../components/Sparkle";
import { ScanScreen } from "../screens/ScanScreen";
import { useLayout } from "../layout";
import { SCREENS } from "../assets";
import { FONT } from "../theme";
import { SceneProps } from "./types";

export const Scan: React.FC<SceneProps> = ({ dur, from }) => {
  const L = useLayout();
  const { v } = L;
  const ph = L.phoneW * PHONE_RATIO;
  const badge = v ? 320 : 250;
  return (
    <SceneFrame dur={dur} from={from} enter="whip" exit="zoom" zoomOrigin={[L.phoneX + L.phoneW / 2, L.phoneY + (v ? 520 : 420)]}>
      <div style={{ position: "absolute", left: L.textX, width: L.textW, top: v ? 200 : 330 }}>
        <Headline lines={v ? [["Master", "Trading"], ["with", "AI"]] : [["Master"], ["Trading"], ["with", "AI"]]} delay={6} size={L.headSize} align={L.align} />
        <SubText delay={22} size={L.subSize} align={L.align} style={{ marginTop: 26 }}>
          Improve your trading strategy
        </SubText>
      </div>
      <PhoneMockup x={L.phoneX} y={L.phoneY} w={L.phoneW} delay={16} src={SCREENS.scan}>
        <ScanScreen start={24} />
      </PhoneMockup>
      <Sparkle x={v ? 900 : 1810} y={v ? 760 : 170} size={80} delay={30} />
      <Sparkle x={v ? 960 : 1860} y={v ? 840 : 240} size={36} delay={34} phase={15} />
      <Sparkle x={v ? 110 : 90} y={v ? 160 : 240} size={50} delay={26} phase={30} />
      <StarBurstBadge x={v ? L.phoneX + 20 : L.phoneX - 10} y={v ? L.phoneY + ph * 0.36 : L.phoneY + 620} size={badge} delay={60} tilt={-14}>
        <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: badge * 0.075, letterSpacing: "0.08em" }}>THE</div>
        <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: badge * 0.3, letterSpacing: "-0.04em", fontStyle: "italic" }}>#1</div>
        <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: badge * 0.07, letterSpacing: "0.06em", marginTop: badge * 0.01 }}>
          APP FOR
          <br />
          TRADERS
        </div>
      </StarBurstBadge>
    </SceneFrame>
  );
};
