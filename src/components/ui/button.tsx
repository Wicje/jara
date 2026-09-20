"use client";

import type { ReactNode } from "react";
import { Button as UntitledButton } from "@/components/base/buttons/button";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const colors = {
  primary: "primary",
  secondary: "secondary",
  outline: "secondary",
  ghost: "tertiary",
  danger: "primary-destructive",
} as const;

export interface ButtonProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
  ariaLabel?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  type = "button",
  onClick,
  className,
  children,
  ariaLabel,
}: ButtonProps) {
  return (
    <UntitledButton
      color={colors[variant]}
      size={size}
      isLoading={loading}
      isDisabled={disabled || loading}
      type={type}
      aria-label={ariaLabel}
      onPress={onClick}
      className={className}
    >
      {children}
    </UntitledButton>
  );
}
