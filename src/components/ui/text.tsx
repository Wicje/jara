"use client";

import { createElement, type HTMLAttributes, type ReactNode } from "react";

type Element = "h1" | "h2" | "h3" | "h4" | "p" | "span";
type Tone = "default" | "muted" | "error" | "success" | "accent";

const styles: Record<Element, string> = {
  h1: "text-4xl font-bold tracking-tight sm:text-5xl",
  h2: "text-3xl font-semibold tracking-tight sm:text-4xl",
  h3: "text-2xl font-semibold",
  h4: "text-lg font-medium",
  p: "text-base leading-7",
  span: "text-sm",
};

const tones: Record<Tone, string> = {
  default: "",
  muted: "text-neutral-500",
  error: "text-red-700",
  success: "text-green-700",
  accent: "text-amber-800",
};

const defaultTone: Record<Element, string> = {
  h1: "text-neutral-900",
  h2: "text-neutral-900",
  h3: "text-neutral-900",
  h4: "text-neutral-900",
  p: "text-neutral-600",
  span: "text-neutral-600",
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: Element;
  tone?: Tone;
  children: ReactNode;
}

export function Text({ as = "p", tone = "default", className, ...props }: TextProps) {
  const color = tone === "default" ? defaultTone[as] : tones[tone];
  return createElement(as, { className: `${styles[as]} ${color} ${className ?? ""}`, ...props });
}
