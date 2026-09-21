"use client";

import Link from "next/link";
import { InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";
import { DERA_VENDOR } from "@/data/dera";
import { DELIVERY_OPTIONS } from "@/data/delivery";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-mist">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:grid-cols-4 sm:px-6">
        <div>
          <p className="font-display text-3xl tracking-wide text-ink">JARA</p>
          <p className="mt-3 font-sans text-sm leading-6 text-ink/70">
            Jara means extra value. Real pieces from Lagos boutiques, ordered in one tap.
          </p>
        </div>
        <nav aria-label="Shop">
          <p className="font-sans text-xs font-bold tracking-[0.14em] text-smoke uppercase">Shop</p>
          <ul className="mt-3 grid gap-2.5 font-sans text-sm font-medium text-ink/80">
            <li><Link href="/catalog" className="hover:text-ink">Browse everything</Link></li>
            <li><Link href="/catalog?occasion=owambe" className="hover:text-ink">Owambe</Link></li>
            <li><Link href="/catalog?occasion=church" className="hover:text-ink">Church</Link></li>
            <li><Link href="/catalog?occasion=street" className="hover:text-ink">Street</Link></li>
            <li><Link href="/cart" className="hover:text-ink">Your cart</Link></li>
            <li><Link href="/wishlist" className="hover:text-ink">Your wishlist</Link></li>
          </ul>
        </nav>
        <div>
          <p className="font-sans text-xs font-bold tracking-[0.14em] text-smoke uppercase">Delivery and exchanges</p>
          <ul className="mt-3 grid gap-2.5 font-sans text-sm text-ink/80">
            {DELIVERY_OPTIONS.map((option) => (
              <li key={option.label}>
                {option.label} · {option.priceNote}. {option.detail}
              </li>
            ))}
            <li>Need an exchange? Message Dera on WhatsApp and she will sort you out.</li>
          </ul>
        </div>
        <div>
          <p className="font-sans text-xs font-bold tracking-[0.14em] text-smoke uppercase">Reach Dera</p>
          <ul className="mt-3 grid gap-2.5 font-sans text-sm font-medium text-ink/80">
            <li>
              <a href={DERA_VENDOR.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink">
                <WhatsappLogo size={15} weight="bold" aria-hidden="true" /> {DERA_VENDOR.whatsapp}
              </a>
            </li>
            <li>
              <a href={DERA_VENDOR.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink">
                <InstagramLogo size={15} aria-hidden="true" /> @styleinlagosss
              </a>
            </li>
            <li>
              <a href={DERA_VENDOR.website} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                styleinlagos.ng
              </a>
            </li>
            <li><Link href="/store" className="hover:text-ink">Dera&apos;s store page</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 font-sans text-xs text-smoke sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>Jara. Extra value, delivered.</span>
          <Link href="/vendor" className="underline hover:text-ink">Sell on Jara</Link>
        </div>
      </div>
    </footer>
  );
}
