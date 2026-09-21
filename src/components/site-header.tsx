"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, ShoppingBag, WhatsappLogo } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DERA_VENDOR } from "@/data/dera";
import { useCart } from "./cart-provider";

const TICKER = "Same-day delivery in Lagos. New drops weekly. Real prices in naira.";

const NAV_LINKS = [
  { label: "Shop", href: "/catalog", exact: true },
] as const;

const MENU_LINKS = [
  { label: "Owambe", href: "/catalog?occasion=owambe" },
  { label: "Church", href: "/catalog?occasion=church" },
  { label: "Street", href: "/catalog?occasion=street" },
  { label: "Dera's store", href: "/store" },
  { label: "Your wishlist", href: "/wishlist" },
  { label: "Ask Jara", href: "/chat" },
  { label: "Sell on Jara", href: "/vendor" },
] as const;

function Ticker() {
  const items = [0, 1, 2, 3];
  return (
    <div className="overflow-hidden bg-violet-deep py-1.5" aria-hidden="true">
      <div className="animate-marquee flex w-max gap-12 hover:[animation-play-state:paused]">
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

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function SiteHeader() {
  const { count } = useCart();
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node | null;
      if (target && !menuRef.current?.contains(target)) setMenuOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <Ticker />
      <header
        className={`sticky top-0 z-40 border-b bg-paper/80 backdrop-blur-xl transition-all duration-300 ${
          scrolled ? "border-line shadow-[0_12px_32px_-16px_rgba(51,51,51,0.25)]" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-1.5 px-3 sm:gap-3 sm:px-6">
          <Link
            href="/"
            aria-label="Jara home"
            className="shrink-0 rounded-[12px] px-1 font-display text-xl tracking-[0.08em] text-ink outline-none transition-colors hover:text-violet-deep focus-visible:ring-2 focus-visible:ring-violet sm:text-2xl"
          >
            JARA
          </Link>
          <nav aria-label="Primary" className="flex flex-1 items-center gap-1 font-sans text-sm font-semibold">
            <a
              href={DERA_VENDOR.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-ink/70 transition-all outline-none hover:bg-mist hover:text-ink focus-visible:ring-2 focus-visible:ring-violet"
            >
              <WhatsappLogo size={16} weight="bold" aria-hidden="true" />
              <span className="hidden min-[400px]:inline">Contact us</span>
            </a>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`shrink-0 rounded-full px-3 py-1.5 whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-violet ${
                  pathname === link.href
                    ? "bg-violet/10 text-violet-deep"
                    : "text-ink/70 hover:bg-mist hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div ref={menuRef} className="relative shrink-0">
            <button
              ref={menuButtonRef}
              type="button"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="Open menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex min-h-[42px] min-w-[42px] items-center justify-center gap-1.5 rounded-[32px] px-2 font-sans text-sm font-semibold text-ink transition-all outline-none hover:bg-mist focus-visible:ring-2 focus-visible:ring-violet sm:px-3"
            >
              <List size={19} weight="bold" aria-hidden="true" />
              <span className="hidden sm:inline">Menu</span>
            </button>
            <AnimatePresence>
              {menuOpen ? (
                <motion.nav
                  aria-label="Menu"
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  className="absolute top-full right-0 z-50 mt-2 w-56 origin-top-right rounded-[20px] border border-line bg-white p-1.5 shadow-[0_24px_48px_rgba(15,23,42,0.12)]"
                >
                  <ul className="grid gap-0.5">
                    {MENU_LINKS.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="flex h-10 w-full items-center rounded-[12px] px-2.5 font-sans text-[13.5px] font-medium text-ink transition-colors outline-none hover:bg-mist focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-inset"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.nav>
              ) : null}
            </AnimatePresence>
          </div>
          <Link
            href="/cart"
            aria-label={`Cart, ${count} items`}
            className="relative inline-flex min-h-[42px] min-w-[42px] shrink-0 items-center justify-center rounded-[32px] bg-violet px-3 font-sans text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(114,14,236,0.55)] ring-1 ring-violet-deep/20 ring-inset transition-all hover:bg-violet-deep hover:shadow-[0_10px_24px_-8px_rgba(114,14,236,0.7)] active:scale-[0.97]"
          >
            <ShoppingBag size={18} weight="bold" aria-hidden="true" />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                aria-hidden="true"
                className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-violet-deep ring-1 ring-violet/30"
              >
                {count}
              </motion.span>
            )}
          </Link>
        </div>
      </header>
    </>
  );
}
