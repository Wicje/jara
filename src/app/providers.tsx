"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";
import { useMemo } from "react";

const url = process.env.NEXT_PUBLIC_CONVEX_URL;

const client = url ? new ConvexReactClient(url) : null;

export function Providers({ children }: { children: ReactNode }) {
  const value = useMemo(() => client, []);
  if (value === null) return <>{children}</>;
  return <ConvexProvider client={value}>{children}</ConvexProvider>;
}

export function isConvexConfigured(): boolean {
  return url !== undefined && url !== "";
}
