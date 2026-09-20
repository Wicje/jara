"use client";

interface ChipGroupProps {
  label: string;
  options: Array<{ value: string; label: string }>;
  current: string;
  onSelect: (value: string) => void;
}

export function ChipGroup({ label, options, current, onSelect }: ChipGroupProps) {
  return (
    <div className="grid gap-1.5">
      <span id={`${label}-label`} className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
        {label}
      </span>
      <div className="flex flex-wrap gap-2" role="group" aria-labelledby={`${label}-label`}>
        {options.map((option) => {
          const selected = current.toLowerCase() === option.value.toLowerCase();
          return (
            <button
              key={option.value || "any"}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(option.value)}
              className={`min-h-11 rounded-full px-4 text-sm font-medium transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800 ${
                selected
                  ? "bg-amber-800 text-white"
                  : "border border-neutral-300 bg-white text-neutral-800 active:bg-neutral-100"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const OCCASION_OPTIONS = [
  { value: "", label: "Any" },
  { value: "owambe", label: "Owambe" },
  { value: "church", label: "Church" },
  { value: "street", label: "Street" },
];

export const SIZE_OPTIONS = [
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
];

export const BUDGET_OPTIONS = [
  { value: "50000", label: "≤ ₦50k" },
  { value: "100000", label: "≤ ₦100k" },
  { value: "150000", label: "≤ ₦150k" },
  { value: "", label: "Any" },
];
