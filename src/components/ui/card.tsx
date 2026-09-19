"use client";

import type { HTMLAttributes } from "react";

type Variant = "default" | "subtle" | "feature";

const variants: Record<Variant, string> = {
  default: "rounded-xl border border-neutral-200 bg-white p-6",
  subtle: "rounded-xl border border-neutral-100 bg-neutral-50 p-6",
  feature: "rounded-xl border border-neutral-200 bg-white p-8 shadow-sm",
};

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
}

export function Card({ variant = "default", className, ...props }: CardProps) {
  return <div className={`${variants[variant]} ${className ?? ""}`} {...props} />;
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`mb-4 ${className ?? ""}`} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={`text-lg font-semibold ${className ?? ""}`} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`mt-1 text-sm text-neutral-500 ${className ?? ""}`} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={className ?? ""} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`mt-6 flex items-center gap-3 ${className ?? ""}`} {...props} />;
}