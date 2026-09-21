"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={`h-12 w-full rounded-md border border-ink/20 bg-white px-4 font-sans text-base text-ink placeholder:text-smoke/70 focus:border-palm focus:outline-none focus:ring-2 focus:ring-palm/40 disabled:opacity-50 ${className ?? ""}`}
      {...props}
    />
  );
});
