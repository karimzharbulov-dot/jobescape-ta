import React from "react";

export const Flame: React.FC<{ size: number; flicker?: number }> = ({ size, flicker = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: `scaleY(${1 + flicker * 0.06}) skewX(${flicker * 3}deg)`, transformOrigin: "50% 100%" }}>
    <path d="M50 4 C62 26 84 36 84 62 C84 82 68 96 50 96 C32 96 16 82 16 62 C16 46 26 38 32 30 C34 42 40 48 46 50 C42 32 44 18 50 4 Z" fill="#FF7A1A" />
    <path d="M50 40 C58 54 70 60 70 74 C70 86 61 94 50 94 C39 94 30 86 30 74 C30 64 38 58 42 52 C44 60 48 62 52 62 C50 54 48 48 50 40 Z" fill="#FFC21A" />
  </svg>
);
