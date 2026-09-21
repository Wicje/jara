"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Globe, InstagramLogo, Sparkle, WhatsappLogo } from "@phosphor-icons/react";
import { DERA_VENDOR } from "@/data/dera";
import { DELIVERY_OPTIONS } from "@/data/delivery";

/** Reveal once when scrolled into view; visible immediately without JS motion. */
function useRevealOnce() {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const id = window.requestAnimationFrame(() => setShown(true));
      return () => window.cancelAnimationFrame(id);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, shown };
}

function ConciergeTeaser() {
  return (
    <Link
      href="/chat"
      aria-label="Try the concierge — chat with Jara"
      className="group block overflow-hidden rounded-lg border border-white/20 bg-white/10 shadow-[inset_0_4px_20px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush active:scale-[0.99]"
    >
      <div className="flex flex-col gap-2 p-5 sm:p-6">
        <p className="font-sans text-sm font-semibold leading-snug text-white sm:text-[15px]">
          Q. Owambe dress under ₦100k, size M?
        </p>
        <p className="flex items-center gap-1.5 font-sans text-xs text-white/60">
          <Sparkle size={13} aria-hidden="true" />
          concierge matched real pieces…
        </p>
        <p className="font-sans text-sm leading-6 text-white/90">
          From Style in Lagos, matched to your budget and size. Pay on confirmation, delivered
          same-day in Lagos.
        </p>
        <div className="mt-1 flex flex-wrap gap-1.5" aria-hidden="true">
          {["98 real pieces", "Same-day Lagos"].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/15 bg-black/10 px-2.5 py-[3px] font-sans text-[11px] font-medium text-white/85"
            >
              {chip}
            </span>
          ))}
        </div>
        <span className="mt-2 inline-flex items-center gap-1 font-sans text-sm font-semibold text-blush">
          Try it now
          <ArrowRight size={15} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function WhatsappIcon() {
  return <WhatsappLogo size={22} weight="fill" aria-hidden="true" />;
}

function InstagramIcon() {
  return <InstagramLogo size={22} aria-hidden="true" />;
}

function WebsiteIcon() {
  return <Globe size={20} aria-hidden="true" />;
}

const SOCIALS = [
  { label: `WhatsApp ${DERA_VENDOR.whatsapp}`, href: DERA_VENDOR.whatsappLink, Icon: WhatsappIcon },
  { label: "Instagram @styleinlagosss", href: DERA_VENDOR.instagramUrl, Icon: InstagramIcon },
  { label: "styleinlagos.ng", href: DERA_VENDOR.website, Icon: WebsiteIcon },
];

const SHOP_LINKS = [
  { label: "Browse everything", href: "/catalog" },
  { label: "Owambe", href: "/catalog?occasion=owambe" },
  { label: "Church", href: "/catalog?occasion=church" },
  { label: "Street", href: "/catalog?occasion=street" },
  { label: "Your cart", href: "/cart" },
  { label: "Your wishlist", href: "/wishlist" },
];

const VENDOR_LINKS = [
  { label: "Sell on Jara", href: "/vendor" },
  { label: "Dera's store page", href: "/store" },
  { label: "Vendor sign-in", href: "/vendor" },
];

export function SiteFooter() {
  const { ref, shown } = useRevealOnce();
  const rise = (delay: string) => (shown ? `animate-rise ${delay}` : "opacity-0");

  return (
    <footer ref={ref} role="contentinfo" aria-label="Site footer" className="mt-20 bg-paper px-4 pb-5 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <section
          aria-label="Get started with Jara"
          className={`relative overflow-hidden rounded-[30px] bg-ink text-white ${rise("[animation-delay:0ms]")}`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(30rem_20rem_at_90%_10%,rgba(244,190,198,0.22),transparent_62%),radial-gradient(26rem_22rem_at_5%_95%,rgba(114,14,236,0.35),transparent_68%)]"
          />
          <div className="relative grid gap-6 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-sans text-xs font-bold tracking-[0.2em] text-blush uppercase">
                Shoppers · Vendors
              </p>
              <h2 className="mt-3 font-display text-4xl tracking-wide uppercase sm:text-5xl">
                Own every owambe.
              </h2>
              <p className="mt-3 max-w-md font-sans text-base leading-7 text-white/80">
                Real pieces from Lagos boutiques, ordered in one tap — or sell yours to thousands
                of shoppers.
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/catalog"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-[32px] bg-white px-5 font-sans text-sm font-semibold text-ink transition-all hover:bg-blush-soft active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush"
                >
                  Browse everything
                </Link>
                <Link
                  href="/vendor"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-[32px] px-5 font-sans text-sm font-semibold text-white ring-1 ring-white/40 ring-inset transition-all hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush"
                >
                  Sell on Jara
                </Link>
              </div>
            </div>
            <ConciergeTeaser />
          </div>
        </section>

        <div
          className={`relative mt-5 overflow-hidden rounded-[30px] border border-line bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ${rise("[animation-delay:120ms]")}`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[140%] -translate-x-1/2 bg-[linear-gradient(to_right,rgba(244,190,198,0.5),rgba(114,14,236,0.28))] blur-[100px]"
          />
          <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div>
              <Link
                href="/"
                aria-label="Jara home"
                className="inline-block font-display text-3xl tracking-wide text-ink transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
              >
                JARA
              </Link>
              <p className="mt-3 max-w-xs font-sans text-base leading-7 text-ink/60">
                Jara means extra value. Real pieces from Lagos boutiques, ordered in one tap.
              </p>
              <ul className="mt-4 grid gap-2 font-sans text-sm text-ink/60" aria-label="Delivery snapshot">
                {DELIVERY_OPTIONS.map((option) => (
                  <li key={option.label}>
                    {option.label} · {option.priceNote}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <nav aria-label="Shop">
                <p className="font-sans text-sm font-semibold text-ink">Shop</p>
                <ul className="mt-3 grid gap-2.5">
                  {SHOP_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="rounded-xs font-sans text-sm text-ink/60 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav aria-label="Vendor">
                <p className="font-sans text-sm font-semibold text-ink">Vendor</p>
                <ul className="mt-3 grid gap-2.5">
                  {VENDOR_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="rounded-xs font-sans text-sm text-ink/60 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div>
                <p className="font-sans text-sm font-semibold text-ink">Follow the boutique</p>
                <div className="mt-3 flex items-center gap-2.5">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.label}
                      aria-label={social.label}
                      className="inline-flex size-[45px] shrink-0 items-center justify-center rounded-[15px] bg-[linear-gradient(135deg,rgba(253,240,243,0.9),rgba(244,190,198,0.65))] text-violet-deep shadow-[inset_0_0_0_1px_rgba(114,14,236,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet hover:text-white hover:shadow-[0_8px_16px_-4px_rgba(114,14,236,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet active:translate-y-0 active:scale-[0.96]"
                    >
                      <social.Icon />
                    </a>
                  ))}
                </div>
                <p className="mt-3 font-sans text-sm leading-6 text-ink/60">
                  Need an exchange? Message Dera on WhatsApp and she will sort you out.
                </p>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col items-center px-6 pt-6 pb-4 sm:pt-10">
            <p
              aria-hidden="true"
              className="w-full bg-gradient-to-b from-ink via-ink/5 to-transparent bg-clip-text text-center font-display text-[22vw] leading-none tracking-wide text-transparent select-none sm:text-[18vw] lg:text-[220px]"
            >
              JARA
            </p>
            <p className="mt-2 font-sans text-xs text-smoke sm:text-sm">
              Jara. Extra value, delivered. © 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
