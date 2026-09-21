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
      <span id={`${label}-label`} className="font-sans text-xs font-bold tracking-[0.14em] text-smoke uppercase">
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
              className={`min-h-11 rounded-full px-4 font-sans text-sm font-semibold transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                selected
                  ? "bg-palm text-white"
                  : "bg-white text-ink ring-1 ring-ink/20 ring-inset hover:bg-cream"
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
