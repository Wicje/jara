import Link from "next/link";
import { DERA_VENDOR } from "@/data/dera";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-4 sm:px-6">
        <div>
          <p className="text-lg font-extrabold tracking-tight text-neutral-900">Jara</p>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Jara means extra value. Real pieces from Lagos boutiques, ordered in one tap.
          </p>
        </div>
        <nav aria-label="Shop">
          <p className="text-sm font-semibold text-neutral-900">Shop</p>
          <ul className="mt-2 grid gap-2 text-sm text-neutral-600">
            <li><Link href="/catalog" className="hover:text-neutral-900">Browse catalog</Link></li>
            <li><Link href="/catalog?occasion=owambe" className="hover:text-neutral-900">Owambe</Link></li>
            <li><Link href="/catalog?occasion=church" className="hover:text-neutral-900">Church</Link></li>
            <li><Link href="/catalog?occasion=street" className="hover:text-neutral-900">Street</Link></li>
            <li><Link href="/cart" className="hover:text-neutral-900">Your cart</Link></li>
          </ul>
        </nav>
        <div>
          <p className="text-sm font-semibold text-neutral-900">Delivery and exchanges</p>
          <ul className="mt-2 grid gap-2 text-sm text-neutral-600">
            <li>Same-day delivery in Lagos.</li>
            <li>Nationwide and international delivery available.</li>
            <li>Need an exchange? Message Dera on WhatsApp and she will sort you out.</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900">Reach Dera</p>
          <ul className="mt-2 grid gap-2 text-sm text-neutral-600">
            <li>
              <a href={DERA_VENDOR.whatsappLink} target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-900">
                WhatsApp {DERA_VENDOR.whatsapp}
              </a>
            </li>
            <li>
              <a href={DERA_VENDOR.instagramUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-900">
                Instagram @styleinlagosss
              </a>
            </li>
            <li>
              <a href={DERA_VENDOR.website} target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-900">
                styleinlagos.ng
              </a>
            </li>
            <li><Link href="/store" className="underline hover:text-neutral-900">Dera&apos;s store page</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-200">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>Jara. Extra value, delivered.</span>
          <Link href="/vendor" className="underline hover:text-neutral-700">Sell on Jara</Link>
        </div>
      </div>
    </footer>
  );
}
