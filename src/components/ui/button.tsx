"use client";

// Shape system (from vendor styleguide): 32px pill actions, 8px cards,
// flat surfaces, violet accent on white.
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "accent" | "black";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[32px] font-sans font-semibold whitespace-normal text-center transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-black",
  secondary: "bg-white text-ink ring-1 ring-ink/20 ring-inset hover:bg-mist",
  outline: "bg-transparent text-ink ring-1 ring-ink/25 ring-inset hover:bg-mist",
  ghost: "text-ink hover:bg-mist",
  danger: "bg-red-800 text-white hover:bg-red-900",
  accent: "bg-violet text-white hover:bg-violet-deep",
  black: "bg-black text-white hover:bg-neutral-900",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-4 text-sm",
  md: "min-h-[42px] px-5 text-sm",
  lg: "min-h-[52px] px-7 text-base",
};

export interface ButtonClassOptions {
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function buttonClasses({ variant = "primary", size = "md", className }: ButtonClassOptions = {}): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${className ?? ""}`;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", loading = false, disabled, children, className, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  );
});
