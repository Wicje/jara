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
  muted: "text-smoke",
  error: "text-red-800",
  success: "text-green-800",
  accent: "text-violet",
};

const defaultTone: Record<Element, string> = {
  h1: "text-ink",
  h2: "text-ink",
  h3: "text-ink",
  h4: "text-ink",
  p: "text-ink/80",
  span: "text-ink/70",
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
