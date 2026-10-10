import React from "react";

type Variant = "guard" | "balanced" | "momentum";

/** Friendly AI robot head on a little hover base. */
export const Robot: React.FC<{ color: string; variant: Variant; size: number; blink?: number }> = ({ color, variant, size, blink = 1 }) => {
  const eyeH = 14 * blink + 1;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <ellipse cx={60} cy={108} rx={20} ry={5} fill="#C9CBE0" />
      <ellipse cx={60} cy={100} rx={14} ry={4} fill="#DADCEC" />
      <path d="M60 92 L48 74 L72 74 Z" fill={color} opacity={0.25} />
      {variant === "guard" && <circle cx={60} cy={16} r={7} fill={color} />}
      {variant === "balanced" && <rect x={53} y={8} width={14} height={14} rx={3} transform="rotate(45 60 15)" fill={color} />}
      {variant === "momentum" && <path d="M60 4 L68 18 L60 15 L56 24 L52 14 L60 14 Z" fill={color} />}
      <line x1={60} y1={18} x2={60} y2={28} stroke={color} strokeWidth={4} />
      {variant === "momentum" ? (
        <path d="M22 44 L38 28 H82 L98 44 V64 L82 80 H38 L22 64 Z" fill={color} />
      ) : (
        <rect x={20} y={26} width={80} height={56} rx={variant === "guard" ? 28 : 18} fill={color} />
      )}
      <rect x={30} y={38} width={60} height={32} rx={16} fill="#1F2133" />
      {variant === "guard" ? (
        <>
          <path d={`M42 ${58 - eyeH / 3} q6 -10 12 0`} stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" />
          <path d={`M66 ${58 - eyeH / 3} q6 -10 12 0`} stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" />
        </>
      ) : variant === "balanced" ? (
        <>
          <rect x={42} y={54 - eyeH / 2} width={9} height={eyeH} rx={4} fill="#fff" />
          <rect x={69} y={54 - eyeH / 2} width={9} height={eyeH} rx={4} fill="#fff" />
        </>
      ) : (
        <>
          <path d={`M40 ${50} L54 ${54} L54 ${54 + eyeH / 3} L40 ${54 + eyeH / 3} Z`} fill="#fff" />
          <path d={`M80 ${50} L66 ${54} L66 ${54 + eyeH / 3} L80 ${54 + eyeH / 3} Z`} fill="#fff" />
        </>
      )}
    </svg>
  );
};
