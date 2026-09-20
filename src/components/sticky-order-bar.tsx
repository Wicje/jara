"use client";

import { formatNgnShort } from "./format";

interface StickyOrderBarProps {
  title: string;
  priceNgn: number;
  onContinue: () => void;
}

export function StickyOrderBar({ title, priceNgn, onContinue }: StickyOrderBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-neutral-900">{title}</p>
          <p className="text-sm font-bold text-amber-800">{formatNgnShort(priceNgn)}</p>
        </div>
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md bg-amber-800 px-5 text-sm font-medium text-white transition-colors hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
