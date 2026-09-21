import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";
import { ImporterCard } from "@/components/importer-card";

export default function VendorPage() {
  return (
    <main>
      <Container className="pt-8 pb-4 sm:pt-10">
        <p className="font-sans text-xs font-bold tracking-[0.2em] text-gold uppercase">For sellers</p>
        <h1 className="mt-2 font-display text-4xl tracking-wide text-ink uppercase sm:text-5xl">Sell on Jara</h1>
        <Text className="mt-3 max-w-xl">
          Paste your store link and Firecrawl turns it into draft listings. Approve them and shoppers can order by email.
        </Text>
        <ImporterCard />
        <Text className="mt-6">
          <Link href="/" className="underline">Back to the market</Link>
        </Text>
      </Container>
    </main>
  );
}
