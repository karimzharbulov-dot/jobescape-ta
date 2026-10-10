import React from "react";

/** Simple flat avatar face. */
export const Avatar: React.FC<{ size: number; skin: string; hair: string; bg?: string; long?: boolean }> = ({ size, skin, hair, bg = "#E8E9F5", long }) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <circle cx={20} cy={20} r={20} fill={bg} />
    {long && <path d="M8 22 Q8 6 20 6 Q32 6 32 22 L32 32 L8 32 Z" fill={hair} />}
    <path d="M10 40 Q20 28 30 40 Z" fill="#E86A3A" />
    <ellipse cx={20} cy={20} rx={9} ry={10} fill={skin} />
    <path d="M10.5 18 Q12 7 20 8 Q29 7 29.5 17 Q24 12 18 14 Q13 15 10.5 18 Z" fill={hair} />
    <circle cx={16.5} cy={21} r={1.3} fill="#222" />
    <circle cx={23.5} cy={21} r={1.3} fill="#222" />
    <path d="M17 25 Q20 27.5 23 25" stroke="#B4413A" strokeWidth={1.4} fill="none" strokeLinecap="round" />
  </svg>
);
