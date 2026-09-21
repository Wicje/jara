"use client";

import type { LabelHTMLAttributes } from "react";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, ...props }: LabelProps) {
  return <label className={`font-sans text-sm font-semibold text-ink ${className ?? ""}`} {...props} />;
}