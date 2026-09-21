"use client";

// Shape system (from vendor styleguide): 32px pill actions, 8px cards,
// flat surfaces, violet accent on white.
import { motion } from "framer-motion";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "accent";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[32px] font-sans font-semibold whitespace-normal text-center transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-violet text-white shadow-[0_8px_20px_-8px_rgba(114,14,236,0.55)] hover:bg-violet/85 hover:shadow-[0_8px_24px_-6px_rgba(114,14,236,0.6)] hover:backdrop-blur-sm hover:ring-1 hover:ring-inset hover:ring-white/40",
  secondary: "bg-white text-ink ring-1 ring-ink/20 ring-inset hover:bg-mist",
  outline: "bg-transparent text-ink ring-1 ring-ink/25 ring-inset hover:bg-mist",
  ghost: "text-ink hover:bg-mist",
  danger: "bg-red-800 text-white hover:bg-red-900",
  accent:
    "bg-blush text-violet-deep hover:bg-blush/70 hover:backdrop-blur-sm hover:ring-1 hover:ring-inset hover:ring-white/50",
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

export interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
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
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
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
    </motion.button>
  );
});
