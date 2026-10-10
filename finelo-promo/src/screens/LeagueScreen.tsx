import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { C } from "../theme";
import { Screen } from "./StatusBar";
import { Trophy } from "../illustrations/Trophy";
import { Avatar } from "../illustrations/Avatar";
import { pop, clamp } from "../lib";

const OTHERS = [
  { name: "Mark", xp: 30, skin: "#8D5A3B", hair: "#2B1A10" },
  { name: "Elizabeth", xp: 20, skin: "#F2C9A8", hair: "#C0392B", long: true },
  { name: "Robert", xp: 10, skin: "#F0C3A0", hair: "#2B1A10" },
  { name: "Elijah", xp: 10, skin: "#7A4A2E", hair: "#1A1A1A" },
  { name: "Lola", xp: 5, skin: "#F5CFB0", hair: "#5A3A22", long: true },
];
const ROW = 62;

/** Smart Money League: trophies pop, "You" climbs from #4 to #2 while XP counts up. */
export const LeagueScreen: React.FC<{ start?: number }> = ({ start = 0 }) => {
  const f = useCurrentFrame() - start;
  const { fps } = useVideoConfig();
  const climb = interpolate(f, [30, 60], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const youPos = 3 - 2 * climb; // index 3 (#4) -> index 1 (#2)
  const xp = Math.round(interpolate(f, [30, 60], [9, 27], clamp));
  // the others: Mark stays #1; Elizabeth & Robert get pushed down one slot as You passes them
  const slotOf = (i: number) => {
    if (i === 0) return 0;
    if (i === 1) return 1 + interpolate(climb, [0.5, 1], [0, 1], clamp);
    if (i === 2) return 2 + interpolate(climb, [0, 0.5], [0, 1], clamp);
    return i + 1;
  };
  const rank = Math.round(youPos) + 1;
  return (
    <Screen bg="#fff">
      <div style={{ textAlign: "center", fontSize: 21, fontWeight: 800, marginTop: 14 }}>Smart Money League</div>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end", background: C.gray, margin: "16px 0 0", padding: "16px 10px 12px" }}>
        {[
          { c: "#7CC4F5", d: "#2F7FC0", s: 84, l: false },
          { c: "#F3A8D6", d: "#C25596", s: 116, l: false },
          { c: "#D7DBEA", d: "#9BA1BD", s: 84, l: true },
        ].map((t, i) => {
          const k = pop(f, fps, 6 + i * 5, { damping: 8 });
          return (
            <div key={i} style={{ transform: `scale(${k}) translateY(${Math.sin((f + i * 20) / 14) * 3}px)` }}>
              <Trophy size={t.s} color={t.c} dark={t.d} locked={t.l} />
            </div>
          );
        })}
      </div>
      <div style={{ position: "relative", height: ROW * 6 + 20, marginTop: 8 }}>
        {OTHERS.map((o, i) => {
          const slot = slotOf(i);
          return (
            <div key={o.name} style={{ position: "absolute", left: 0, right: 0, top: slot * ROW + 6, height: ROW, display: "flex", alignItems: "center", padding: "0 26px", gap: 14, color: "#B5B6C9", fontWeight: 700, fontSize: 16 }}>
              <span style={{ width: 22, textAlign: "center", color: i === 0 ? C.gold : "#B5B6C9" }}>{i === 0 ? "♛" : Math.round(slot) + 1}</span>
              <Avatar size={40} skin={o.skin} hair={o.hair} long={o.long} />
              <span style={{ flex: 1 }}>{o.name}</span>
              <span>{o.xp} XP</span>
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: youPos * ROW + 6,
            height: ROW,
            display: "flex",
            alignItems: "center",
            padding: "0 26px",
            gap: 14,
            background: "#E9E8FE",
            color: C.violet,
            fontWeight: 800,
            fontSize: 17,
            boxShadow: climb > 0 && climb < 1 ? "0 10px 24px rgba(90,85,246,.25)" : "none",
            transform: `scale(${1 + Math.sin(climb * Math.PI) * 0.04})`,
          }}
        >
          <span style={{ width: 22, height: 22, borderRadius: 11, background: "#C6C8D8", color: "#fff", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>{rank}</span>
          <Avatar size={40} skin="#F2C9A8" hair="#1F1D4A" bg={C.violet} />
          <span style={{ flex: 1 }}>You</span>
          <span style={{ fontVariantNumeric: "tabular-nums" }}>{xp} XP</span>
        </div>
      </div>
    </Screen>
  );
};
