"use client";

import type { LabelHTMLAttributes } from "react";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, ...props }: LabelProps) {
  return <label className={`text-sm font-medium text-neutral-900 ${className ?? ""}`} {...props} />;
}