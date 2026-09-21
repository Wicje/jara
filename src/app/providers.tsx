"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { useMemo } from "react";

const url = process.env.NEXT_PUBLIC_CONVEX_URL;

const client = url ? new ConvexReactClient(url) : null;

export function Providers({ children }: { children: ReactNode }) {
  const value = useMemo(() => client, []);
  const motion = <MotionConfig reducedMotion="user">{children}</MotionConfig>;
  if (value === null) return <>{motion}</>;
  return <ConvexProvider client={value}>{motion}</ConvexProvider>;
}

export function isConvexConfigured(): boolean {
  return url !== undefined && url !== "";
}
