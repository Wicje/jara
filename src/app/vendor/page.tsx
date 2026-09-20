import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";
import { ImporterCard } from "@/components/importer-card";

export default function VendorPage() {
  return (
    <main>
      <Container className="py-10">
      <Text as="h1">Sell on Jara</Text>
      <Text className="mt-2">
        Paste your store link and Firecrawl turns it into draft listings — approve them and shoppers can order by email.
      </Text>
      <ImporterCard />
      <Text className="mt-6">
        <Link href="/" className="underline">← Back to the market</Link>
      </Text>
      </Container>
    </main>
  );
}
