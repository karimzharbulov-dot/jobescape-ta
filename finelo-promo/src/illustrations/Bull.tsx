import React from "react";
import { C } from "../theme";

/** Flat bull mascot with a medal, flexing next to rising candles. `flex` 0..1 raises the arm. */
export const Bull: React.FC<{ size: number; flex?: number }> = ({ size, flex = 1 }) => {
  const arm = -30 * flex;
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 300 180">
      {/* phone platform */}
      <path d="M40 160 L150 120 L280 150 L170 178 Z" fill="#E7E8FB" stroke="#B9BBF0" strokeWidth={3} />
      {/* candles */}
      {[
        [200, 70, 70],
        [228, 50, 90],
        [252, 30, 110],
      ].map(([x, y, h], i) => (
        <g key={i}>
          <line x1={x} x2={x} y1={y - 12} y2={y + h + 8} stroke={C.green} strokeWidth={4} />
          <rect x={x - 8} y={y} width={16} height={h} rx={4} fill={C.green} />
        </g>
      ))}
      {/* body */}
      <ellipse cx={130} cy={110} rx={46} ry={40} fill="#5B59E8" />
      <ellipse cx={130} cy={118} rx={30} ry={24} fill={C.green} />
      <circle cx={130} cy={112} r={10} fill={C.gold} />
      <path d="M118 80 L130 108 L142 80" stroke="#E05A2B" strokeWidth={5} fill="none" />
      {/* legs */}
      <rect x={104} y={140} width={18} height={22} rx={8} fill="#4846D0" />
      <rect x={138} y={140} width={18} height={22} rx={8} fill="#4846D0" />
      {/* arms */}
      <g transform={`rotate(${arm} 170 96)`}>
        <rect x={166} y={86} width={44} height={20} rx={10} fill="#5B59E8" />
        <circle cx={212} cy={92} r={14} fill="#6E6CF0" />
      </g>
      <rect x={70} y={92} width={30} height={20} rx={10} fill="#5B59E8" transform="rotate(25 85 100)" />
      {/* head */}
      <path d="M96 34 Q82 20 70 26 Q84 30 92 44 Z" fill="#F4E9C8" />
      <path d="M164 34 Q178 20 190 26 Q176 30 168 44 Z" fill="#F4E9C8" />
      <ellipse cx={130} cy={52} rx={40} ry={32} fill="#6E6CF0" />
      <ellipse cx={130} cy={66} rx={24} ry={14} fill="#A9A8F7" />
      <circle cx={122} cy={66} r={3} fill="#3B3AA8" />
      <circle cx={138} cy={66} r={3} fill="#3B3AA8" />
      <circle cx={116} cy={46} r={8} fill="#fff" />
      <circle cx={144} cy={46} r={8} fill="#fff" />
      <circle cx={118} cy={47} r={4} fill={C.navy} />
      <circle cx={142} cy={47} r={4} fill={C.navy} />
    </svg>
  );
};
