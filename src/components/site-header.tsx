"use client";

import Link from "next/link";
import { ShoppingBag } from "@phosphor-icons/react";
import { useCart } from "./cart-provider";

const TICKER = "Same-day delivery in Lagos. New drops weekly. Real prices in naira.";

function Ticker() {
  const items = [0, 1, 2, 3];
  return (
    <div className="overflow-hidden bg-ink py-1.5" aria-hidden="true">
      <div className="animate-marquee flex w-max gap-12">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 gap-12">
            {items.map((item) => (
              <span key={item} className="font-sans text-[11px] font-bold tracking-[0.18em] whitespace-nowrap text-paper uppercase">
                {TICKER}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const { count } = useCart();
  return (
    <>
      <Ticker />
      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Link href="/" aria-label="Jara home" className="font-display text-2xl tracking-wide text-ink">
            JARA
          </Link>
          <nav aria-label="Primary" className="flex flex-1 items-center gap-4 overflow-x-auto font-sans text-sm font-semibold text-ink/70 sm:gap-6">
            <Link href="/catalog" className="shrink-0 hover:text-ink">
              Catalog
            </Link>
            <Link href="/catalog?occasion=owambe" className="shrink-0 hover:text-ink">
              Owambe
            </Link>
            <Link href="/catalog?occasion=church" className="hidden shrink-0 hover:text-ink sm:inline">
              Church
            </Link>
            <Link href="/catalog?occasion=street" className="hidden shrink-0 hover:text-ink sm:inline">
              Street
            </Link>
            <Link href="/store" className="shrink-0 hover:text-ink">
              Dera&apos;s store
            </Link>
          </nav>
          <Link
            href="/cart"
            aria-label={`Cart, ${count} items`}
            className="relative inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full bg-palm px-3 font-sans text-sm font-semibold text-white transition-all hover:bg-palm-deep active:scale-[0.97]"
          >
            <ShoppingBag size={18} weight="bold" aria-hidden="true" />
            {count > 0 && (
              <span aria-hidden="true" className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </header>
    </>
  );
}
