import React from "react";

/** Hexagonal league trophy on a pedestal. */
export const Trophy: React.FC<{ size: number; color: string; dark: string; locked?: boolean }> = ({ size, color, dark, locked }) => (
  <svg width={size} height={size * 1.15} viewBox="0 0 100 115">
    <ellipse cx={50} cy={104} rx={26} ry={8} fill="#C9D6E8" />
    <ellipse cx={50} cy={98} rx={20} ry={6} fill={dark} opacity={0.7} />
    <rect x={46} y={78} width={8} height={20} fill={dark} />
    <path d="M50 6 L86 20 L86 58 L50 82 L14 58 L14 20 Z" fill={color} stroke={dark} strokeWidth={4} strokeLinejoin="round" />
    <path d="M50 14 L78 25 L78 55 L50 74 Z" fill="#fff" opacity={0.22} />
    {locked ? (
      <g fill={dark}>
        <circle cx={50} cy={38} r={9} />
        <rect x={44} y={42} width={12} height={16} rx={3} />
      </g>
    ) : (
      <>
        <path d="M18 54 Q50 34 84 28" stroke={dark} strokeWidth={7} fill="none" strokeLinecap="round" />
        <path d="M76 22 L90 26 L80 36 Z" fill={dark} />
        <path d="M34 28 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" fill="#fff" opacity={0.85} />
      </>
    )}
  </svg>
);
