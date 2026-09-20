"use client";

import Link from "next/link";
import { ShoppingBag } from "@phosphor-icons/react";
import { useCart } from "./cart-provider";

export function SiteHeader() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Jara home" className="text-xl font-extrabold tracking-tight text-neutral-900">
          Jara
        </Link>
        <nav aria-label="Primary" className="flex flex-1 items-center gap-4 text-sm font-medium text-neutral-700 sm:gap-6">
          <Link href="/catalog" className="hover:text-neutral-900">
            Catalog
          </Link>
          <Link href="/store" className="hover:text-neutral-900">
            Dera&apos;s store
          </Link>
          <Link href="/vendor" className="hidden hover:text-neutral-900 sm:inline">
            Sell on Jara
          </Link>
        </nav>
        <Link
          href="/cart"
          aria-label={`Cart, ${count} items`}
          className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-neutral-300 px-3 text-sm font-medium transition-colors hover:bg-neutral-50"
        >
          <ShoppingBag size={18} weight="bold" aria-hidden="true" />
          {count > 0 && (
            <span aria-hidden="true" className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-800 px-1 text-[11px] font-bold text-white">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
