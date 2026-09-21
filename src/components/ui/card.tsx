"use client";

import type { HTMLAttributes } from "react";

type Variant = "panel" | "outlined";

const variants: Record<Variant, string> = {
  panel: "rounded-lg bg-blush-soft",
  outlined: "rounded-lg border border-line bg-white",
};

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
}

export function Card({ variant = "outlined", className, ...props }: CardProps) {
  return <div className={`${variants[variant]} p-4 sm:p-6 ${className ?? ""}`} {...props} />;
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`mb-3 ${className ?? ""}`} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={`font-display text-xl tracking-wide text-ink uppercase ${className ?? ""}`} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`mt-1 font-sans text-sm text-smoke ${className ?? ""}`} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={className ?? ""} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`mt-5 flex items-center gap-3 ${className ?? ""}`} {...props} />;
}
