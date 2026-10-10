import React from "react";
import { C, FONT } from "../theme";

export const StatusBar: React.FC = () => (
  <div style={{ height: 54, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 30px 0 34px", fontFamily: FONT, color: C.navy }}>
    <span style={{ fontSize: 16, fontWeight: 700 }}>9:41</span>
    <span style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
      {[5, 8, 11, 14].map((h) => (
        <span key={h} style={{ width: 3.5, height: h, background: C.navy, borderRadius: 1 }} />
      ))}
      <span style={{ width: 25, height: 12, border: `1.5px solid ${C.navy}`, borderRadius: 4, marginLeft: 6, padding: 1.5 }}>
        <span style={{ display: "block", width: "75%", height: "100%", background: C.navy, borderRadius: 2 }} />
      </span>
    </span>
  </div>
);

export const Screen: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg = "#fff" }) => (
  <div style={{ width: 390, height: 844, background: bg, fontFamily: FONT, color: C.navy, position: "relative", overflow: "hidden" }}>
    <StatusBar />
    {children}
  </div>
);
