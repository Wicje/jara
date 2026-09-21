"use client";

import { useState } from "react";
import { Check, ShareNetwork } from "@phosphor-icons/react";
import { shareListing } from "@/lib/share";

export function ShareButton({ title, priceNgn, listingId }: { title: string; priceNgn: number; listingId: string }) {
  const [state, setState] = useState<"idle" | "done" | "error">("idle");

  async function share() {
    setState("idle");
    try {
      const url = `${window.location.origin}/product?id=${listingId}`;
      await shareListing(url, title, priceNgn);
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <button
      type="button"
      onClick={() => void share()}
      aria-label={state === "done" ? "Link ready to share" : `Share ${title}`}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-smoke transition-colors hover:bg-mist hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet"
    >
      {state === "done" ? (
        <Check size={17} aria-hidden="true" />
      ) : (
        <ShareNetwork size={17} aria-hidden="true" />
      )}
    </button>
  );
}
