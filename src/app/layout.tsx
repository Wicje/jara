import type { Metadata } from "next";
import { EB_Garamond, Montserrat } from "next/font/google";
import { Providers } from "./providers";
import { CartProvider } from "@/components/cart-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const display = EB_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
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
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
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
