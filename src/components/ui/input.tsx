"use client";

import { Input as UntitledInput } from "@/components/base/input/input";

export interface InputProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputMode?: "text" | "numeric" | "tel" | "search" | "email" | "url";
  autoComplete?: string;
  className?: string;
  ariaLabel?: string;
}

export function Input({
  id,
  name,
  value,
  onChange,
  placeholder,
  inputMode = "text",
  autoComplete,
  className,
  ariaLabel,
}: InputProps) {
  return (
    <UntitledInput
      id={id}
      name={name}
      value={value}
      onChange={(next) =>
        onChange({ target: { value: next } } as React.ChangeEvent<HTMLInputElement>)
      }
      placeholder={placeholder}
      inputMode={inputMode}
      autoComplete={autoComplete}
      aria-label={ariaLabel}
      inputClassName={className}
    />
  );
}
