import { action, internalMutation, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";

const draftValidator = v.object({
  title: v.string(),
  priceNgn: v.number(),
  photoUrl: v.string(),
  sourceUrl: v.optional(v.string()),
});

export const resolveVendor = internalQuery({
  args: {},
  handler: async (ctx) => {
    const vendors = await ctx.db.query("vendors").order("asc").take(1);
    return vendors[0]?._id ?? null;
  },
});

export const saveDrafts = internalMutation({
  args: {
    vendorId: v.id("vendors"),
    sourceUrl: v.string(),
    drafts: v.array(draftValidator),
  },
  handler: async (ctx, args) => {
    const ids: Array<Id<"listings">> = [];
    for (const draft of args.drafts) {
      const id = await ctx.db.insert("listings", {
        vendorId: args.vendorId,
        title: draft.title,
        priceNgn: draft.priceNgn,
        sizes: ["S", "M", "L", "XL"],
        fabric: "imported",
        occasion: "street",
        photoUrl: draft.photoUrl,
        sourceUrl: draft.sourceUrl ?? args.sourceUrl,
        status: "draft",
        stock: 8,
      });
      ids.push(id);
    }
    return { imported: ids.length };
  },
});

// Crawls a store URL with Firecrawl and saves draft Listings.
// Without FIRECRAWL_API_KEY, returns a note so the demo still runs.
export const importStore = action({
  args: { url: v.string() },
  handler: async (ctx, args): Promise<{ imported: number; note: string }> => {
    let parsed: URL;
    try {
      parsed = new URL(args.url);
    } catch {
      throw new Error("Invalid URL");
    }
    const vendorId: Id<"vendors"> | null = await ctx.runQuery(internal.importer.resolveVendor, {});
    if (vendorId === null) throw new Error("No vendor to attach imports to");

    const apiKey = process.env.FIRECRAWL_API_KEY;
    if (!apiKey) {
      return { imported: 0, note: "dry run. Set FIRECRAWL_API_KEY to crawl for real" };
    }
    const res = await fetch("https://api.firecrawl.dev/v2/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        url: parsed.toString(),
        formats: ["markdown", "images"],
        onlyMainContent: true,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Firecrawl scrape failed: ${res.status} ${text.slice(0, 300)}`);
    }
    const raw: unknown = await res.json();
    const data = (raw as { data?: { markdown?: unknown; images?: unknown } }).data ?? {};
    const markdown = typeof data.markdown === "string" ? data.markdown : "";
    const images = Array.isArray(data.images)
      ? data.images.filter((u): u is string => typeof u === "string" && u.startsWith("http")).slice(0, 10)
      : [];

    const headings = markdown
      .split("\n")
      .map((line) => line.replace(/^#{1,4}\s*/, "").trim())
      .filter((line) => line.length > 3 && line.length < 80)
      .slice(0, 10);
    const money = [...markdown.matchAll(/(?:₦|NGN)\s*([\d,]+)/g)]
      .map((m) => Number(m[1].replace(/,/g, "")))
      .filter((n) => Number.isFinite(n) && n > 0);

    const titles = headings.length > 0 ? headings : [`Imported from ${parsed.hostname}`];
    const drafts = titles.slice(0, 10).map((title, i) => ({
      title,
      priceNgn: money[i] ?? money[0] ?? 0,
      photoUrl: images[i] ?? images[0] ?? "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      sourceUrl: parsed.toString(),
    }));
    const priced = drafts.filter((d) => d.priceNgn > 0);
    if (priced.length === 0) {
      return { imported: 0, note: "crawled but found no NGN prices to map" };
    }
    const result: { imported: number } = await ctx.runMutation(internal.importer.saveDrafts, {
      vendorId,
      sourceUrl: parsed.toString(),
      drafts: priced,
    });
    return { imported: result.imported, note: `crawled ${parsed.hostname}, saved ${result.imported} drafts` };
  },
});
