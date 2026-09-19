"use client";

import type { HTMLAttributes } from "react";

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className ?? ""}`} {...props} />;
}