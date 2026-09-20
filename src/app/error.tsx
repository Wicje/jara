"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-16">
      <Text as="h2">Jara is dressing up</Text>
      <Text className="mt-2">Something hiccuped{error.digest ? ` (${error.digest})` : ""}. Your picks are safe. Try again.</Text>
      <Button className="mt-6" onClick={() => reset()}>
        Try again
      </Button>
    </Container>
  );
}
