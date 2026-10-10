import React from "react";

/** One side of a laurel wreath; mirror with `flip`. `grow` 0..1 reveals leaves bottom-up. */
export const Laurel: React.FC<{ height: number; flip?: boolean; grow?: number; color?: string }> = ({ height, flip, grow = 1, color = "#fff" }) => {
  const leaves = 7;
  return (
    <svg width={height * 0.55} height={height} viewBox="0 0 55 100" style={{ transform: flip ? "scaleX(-1)" : undefined }}>
      <path d="M44 96 Q10 70 22 6" stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" opacity={grow > 0 ? 1 : 0} />
      {Array.from({ length: leaves }, (_, i) => {
        const t = i / (leaves - 1);
        const k = Math.max(0, Math.min(1, grow * leaves - i));
        const y = 88 - t * 78;
        const x = 36 - Math.sin(t * Math.PI * 0.9) * 18 - t * 4;
        return (
          <g key={i} transform={`translate(${x} ${y}) scale(${k})`}>
            <ellipse cx={-8} cy={-2} rx={9} ry={4} transform="rotate(-35)" fill={color} />
            <ellipse cx={7} cy={-6} rx={9} ry={4} transform="rotate(-70)" fill={color} />
          </g>
        );
      })}
    </svg>
  );
};
