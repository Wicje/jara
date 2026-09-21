"use client";

// Shape system: pills for actions and chips; panels and photography use soft small radii.
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "accent";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-sans font-semibold whitespace-normal text-center transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-palm text-white hover:bg-palm-deep",
  secondary: "bg-white text-ink ring-1 ring-ink/20 ring-inset hover:bg-cream",
  outline: "bg-transparent text-ink ring-1 ring-ink/25 ring-inset hover:bg-cream",
  ghost: "text-ink hover:bg-cream",
  danger: "bg-red-800 text-white hover:bg-red-900",
  accent: "bg-gold-soft text-palm-deep hover:bg-paper",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-4 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-13 px-7 text-base",
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
