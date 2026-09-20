"use client";

import type { ReactNode } from "react";
import { Badge as UntitledBadge } from "@/components/base/badges/badges";

type Color = "gray" | "brand" | "success" | "warning" | "error" | "blue";

export interface BadgeProps {
  color?: Color;
  children: ReactNode;
  className?: string;
}

export function Badge({ color = "gray", children, className }: BadgeProps) {
  return (
    <UntitledBadge type="pill-color" size="md" color={color} className={className}>
      {children}
    </UntitledBadge>
  );
}
