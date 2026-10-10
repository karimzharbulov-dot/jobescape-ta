import React from "react";
import { C } from "../theme";
import { Screen } from "./StatusBar";
import { BotCard } from "../components/BotCard";

export const BOTS = [
  {
    name: "AI Capital Guard",
    color: C.green,
    variant: "guard" as const,
    rows: [
      { label: "Bot Activity", value: "Low", pct: 0.2 },
      { label: "Risk Profile", value: "Conservative", pct: 0.22 },
      { label: "Volatility Exposure", value: "Low", pct: 0.18 },
    ],
  },
  {
    name: "AI Balanced Alpha",
    color: C.cyan,
    variant: "balanced" as const,
    rows: [
      { label: "Bot Activity", value: "Moderate", pct: 0.5 },
      { label: "Risk Profile", value: "Balanced", pct: 0.5 },
      { label: "Volatility Exposure", value: "Moderate", pct: 0.5 },
    ],
  },
  {
    name: "AI Momentum Max",
    color: C.red,
    variant: "momentum" as const,
    rows: [
      { label: "Bot Activity", value: "High", pct: 0.85 },
      { label: "Risk Profile", value: "Aggressive", pct: 0.85 },
      { label: "Volatility Exposure", value: "High", pct: 0.8 },
    ],
  },
];

/** "AI Bots": three bot cards slide in staggered and their bars fill. */
export const BotsScreen: React.FC<{ start?: number }> = ({ start = 0 }) => (
  <Screen>
    <div style={{ padding: "22px 20px 0" }}>
      <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" }}>AI Bots</div>
      <div style={{ fontSize: 15, color: C.muted, fontWeight: 500, margin: "8px 0 18px" }}>Choose a bot you want to trade with</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {BOTS.map((b, i) => (
          <BotCard key={b.name} {...b} delay={start + i * 8} />
        ))}
      </div>
    </div>
  </Screen>
);
