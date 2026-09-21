"use client";

import type { ReactNode } from "react";

type Color = "violet" | "blush" | "ink" | "success";

const colors: Record<Color, string> = {
  violet: "bg-violet/10 text-violet-deep ring-violet/25",
  blush: "bg-blush/40 text-violet-deep ring-violet/20",
  ink: "bg-ink/5 text-ink ring-ink/15",
  success: "bg-green-100 text-green-900 ring-green-700/20",
};

export interface BadgeProps {
  color?: Color;
  children: ReactNode;
  className?: string;
}

export function Badge({ color = "ink", children, className }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-sans text-xs font-semibold ring-1 ring-inset ${colors[color]} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
