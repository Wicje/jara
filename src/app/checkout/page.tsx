"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { DERA_VENDOR } from "@/data/dera";
import { CONFIRMATION_SLA, DELIVERY_OPTIONS } from "@/data/delivery";
import { isConvexConfigured } from "../providers";
import { useCart } from "@/components/cart-provider";
import { formatNgn } from "@/components/format";
import { getBuyer, saveBuyer, saveReceipt } from "@/lib/shopper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";

const STEPS = ["Cart", "Details", "Sent"];

function Checkout() {
  const { items, totalNgn, clear } = useCart();
  const [buyerName, setBuyerName] = useState(() => getBuyer().name);
  const [buyerPhone, setBuyerPhone] = useState(() => getBuyer().phone);
  const [website, setWebsite] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [orderError, setOrderError] = useState("");
  const [placing, setPlacing] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyNote, setVerifyNote] = useState("");
  const [verifying, setVerifying] = useState(false);
  const place = useMutation(api.orders.place);
  const requestCode = useMutation(api.verify.requestCode);
  const confirmCode = useMutation(api.verify.verifyCode);
  const router = useRouter();

  async function submitCheckout() {
    setOrderError("");
    setPlacing(true);
    try {
      const groupId = crypto.randomUUID();
      for (const item of items) {
        await place({
          listingId: item.listingId as Id<"listings">,
          size: item.size,
          buyerName: buyerName.trim(),
          buyerPhone: buyerPhone.trim(),
          groupId,
          checkoutStartedAt: startedAt,
          website,
        });
      }
      saveBuyer({ name: buyerName.trim(), phone: buyerPhone.trim() });
      saveReceipt({
        groupId,
        totalNgn,
        itemCount: items.length,
        items: items.map((item) => ({
          listingId: item.listingId,
          title: item.title,
          priceNgn: item.priceNgn,
          photoUrl: item.photoUrl,
          size: item.size,
        })),
        createdAt: Date.now(),
      });
      clear();
      router.push(`/order?group=${groupId}`);
    } catch (err) {
      if (err instanceof Error && err.message.includes("NEEDS_VERIFICATION")) {
        setNeedsVerification(true);
        setOrderError("");
      } else {
        setOrderError(err instanceof Error ? err.message : "Checkout failed. Nothing was charged.");
      }
    } finally {
      setPlacing(false);
    }
  }

  async function sendCode() {
    setVerifyNote("");
    setVerifying(true);
    try {
      const res = await requestCode({ phone: buyerPhone.trim(), email: verifyEmail.trim() });
      setVerifyNote(
        res.sent
          ? "Code sent. Check your email."
          : "Code requested. Email delivery needs the AgentMail key — Dera will confirm your order on WhatsApp instead.",
      );
    } catch (err) {
      setVerifyNote(err instanceof Error ? err.message : "Could not request a code.");
    } finally {
      setVerifying(false);
    }
  }

  async function confirmVerification() {
    setVerifyNote("");
    setVerifying(true);
    try {
      await confirmCode({ phone: buyerPhone.trim(), code: verifyCode.trim() });
      setNeedsVerification(false);
      setVerifyNote("");
      await submitCheckout();
    } catch (err) {
      setVerifyNote(err instanceof Error ? err.message : "Verification failed.");
    } finally {
      setVerifying(false);
    }
  }

  if (items.length === 0) {
    return (
      <Card variant="panel" className="mt-6">
        <CardHeader>
          <CardTitle>Nothing to check out</CardTitle>
          <CardDescription>Your cart is empty. Add a piece first.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => router.push("/catalog")}>Browse catalog</Button>
        </CardFooter>
      </Card>
    );
  }

  const ready = buyerName.trim() !== "" && buyerPhone.trim() !== "";

  return (
    <>
      <ol className="mt-4 flex gap-2 font-sans text-xs font-bold tracking-[0.14em] uppercase" aria-label="Checkout steps">
        {STEPS.map((step, index) => (
          <li
            key={step}
            aria-current={index === 1 ? "step" : undefined}
            className={`rounded-full px-3 py-1 ${index <= 1 ? "bg-ink text-white" : "bg-mist text-smoke"}`}
          >
            {index + 1}. {step}
          </li>
        ))}
      </ol>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="grid content-start gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Order summary</CardTitle>
              <CardDescription>
                {items.length} {items.length === 1 ? "piece" : "pieces"} from {DERA_VENDOR.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                {items.map((item) => (
                  <li key={`${item.listingId}-${item.size}`} className="flex items-baseline justify-between gap-3 font-sans text-sm">
                    <span className="min-w-0 truncate text-ink/80">
                      {item.title} <span className="text-smoke">(Size {item.size})</span>
                    </span>
                    <span className="shrink-0 font-semibold text-ink tabular-nums">{formatNgn(item.priceNgn)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-line pt-3 font-display text-2xl tracking-wide text-violet-deep tabular-nums">
                Total {formatNgn(totalNgn)}
              </p>
              <p className="mt-2 font-sans text-sm text-smoke">
                Pay on confirmation. Dera confirms by WhatsApp, then you transfer or pay on pickup.
              </p>
            </CardContent>
          </Card>

          <Card variant="panel">
            <CardHeader>
              <CardTitle>Delivery fees</CardTitle>
              <CardDescription>No surprises. Delivery is added on confirmation.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                {DELIVERY_OPTIONS.map((option) => (
                  <li key={option.label} className="flex items-baseline justify-between gap-3 font-sans text-sm">
                    <span className="text-ink/80">
                      <span className="font-semibold text-ink">{option.label}.</span> {option.detail}
                    </span>
                    <span className="shrink-0 font-semibold text-ink tabular-nums">{option.priceNote}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card variant="panel" className="h-fit lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle>Your details</CardTitle>
            <CardDescription>{CONFIRMATION_SLA} No chat needed — track everything on your receipt page.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="buyerName">Your name</Label>
                <Input id="buyerName" name="buyerName" autoComplete="name" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} placeholder="Adaeze" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="buyerPhone">Phone / WhatsApp</Label>
                <Input id="buyerPhone" name="buyerPhone" autoComplete="tel" value={buyerPhone} onChange={(e) => setBuyerPhone(e.target.value)} placeholder="0803..." />
                <p className="font-sans text-xs text-smoke">Texts only, for delivery confirmation. Dera never calls.</p>
              </div>
              <div className="hidden" aria-hidden="true">
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" autoComplete="off" tabIndex={-1} value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>
              {needsVerification && (
                <div className="grid gap-2 rounded-lg border border-line bg-white p-3" role="group" aria-label="Verify your number">
                  <p className="font-sans text-sm font-semibold text-ink">Quick check: verify it&apos;s really you</p>
                  <div className="grid gap-1.5">
                    <Label htmlFor="verifyEmail">Email for your code</Label>
                    <Input id="verifyEmail" name="verifyEmail" autoComplete="email" value={verifyEmail} onChange={(e) => setVerifyEmail(e.target.value)} placeholder="you@example.com" />
                  </div>
                  <Button variant="outline" loading={verifying} onClick={() => void sendCode()}>
                    Send me a code
                  </Button>
                  <div className="grid gap-1.5">
                    <Label htmlFor="verifyCode">6-digit code</Label>
                    <Input id="verifyCode" name="verifyCode" inputMode="numeric" autoComplete="one-time-code" value={verifyCode} onChange={(e) => setVerifyCode(e.target.value)} placeholder="123456" />
                  </div>
                  <Button variant="secondary" loading={verifying} onClick={() => void confirmVerification()}>
                    Verify and send order
                  </Button>
                  {verifyNote !== "" && (
                    <p className="font-sans text-sm text-smoke" role="status">
                      {verifyNote}
                    </p>
                  )}
                </div>
              )}
              {orderError !== "" && (
                <Text tone="error" role="alert">
                  {orderError}
                </Text>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" disabled={!ready} loading={placing} onClick={() => void submitCheckout()}>
              Send order to Dera
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <main>
      <Container className="pt-8 pb-4 sm:pt-10">
        <p className="font-sans text-xs font-bold tracking-[0.2em] text-violet uppercase">Almost yours</p>
        <h1 className="mt-2 font-display text-4xl tracking-wide text-ink uppercase sm:text-5xl">Checkout</h1>
        {isConvexConfigured() ? (
          <Checkout />
        ) : (
          <Text className="mt-6">Connect the Convex backend to check out.</Text>
        )}
      </Container>
    </main>
  );
}
