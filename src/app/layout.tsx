import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { CartProvider } from "@/components/cart-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jara: AI fashion market for Lagos",
  description:
    "Jara means extra value. Chat your occasion, budget, and size. AI matches you with real pieces from Lagos boutiques. Same-day delivery in Lagos.",
  openGraph: {
    title: "Jara: chat your style, own the owambe",
    description:
      "Real pieces, real prices in naira from Lagos boutiques. Order in one tap. The vendor confirms by email.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Jara. Chat your style. Own the owambe." }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <CartProvider>
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
