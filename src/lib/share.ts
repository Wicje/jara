export function buildShareText(title: string, priceNgn: number): string {
  return `${title} — ₦${priceNgn.toLocaleString("en-NG")} on Jara`;
}

export async function shareListing(url: string, title: string, priceNgn: number): Promise<"shared" | "copied"> {
  const text = buildShareText(title, priceNgn);
  const nav = navigator as Navigator & { share?: (data: ShareData) => Promise<void> };
  if (typeof navigator !== "undefined" && nav.share) {
    await nav.share({ title, text, url });
    return "shared";
  }
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    await navigator.clipboard.writeText(`${text} ${url}`);
    return "copied";
  }
  throw new Error("Sharing is not available on this device");
}
