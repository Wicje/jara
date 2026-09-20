import { action, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

export const orderSummary = internalQuery({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.db.get("orders", args.orderId);
    if (order === null) return { order: null, listing: null };
    const listing = await ctx.db.get("listings", order.listingId);
    if (listing === null) return { order: null, listing: null };
    return {
      order: { status: order.status, buyerName: order.buyerName, buyerPhone: order.buyerPhone, size: order.size },
      listing: { title: listing.title, priceNgn: listing.priceNgn },
    };
  },
});

// Sends the order to the vendor via AgentMail. Without AGENTMAIL_API_KEY
// set on the deployment, records a queued event so the demo still works.
export const notifyVendor = action({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args): Promise<{ sent: boolean; note: string }> => {
    const data: {
      order: { status: string; buyerName: string; buyerPhone: string; size: string } | null;
      listing: { title: string; priceNgn: number } | null;
    } = await ctx.runQuery(internal.email.orderSummary, { orderId: args.orderId });
    if (data.order === null || data.listing === null) throw new Error("Order not found");

    const apiKey = process.env.AGENTMAIL_API_KEY;
    const inboxId = process.env.AGENTMAIL_INBOX_ID;
    const body =
      `${data.order.buyerName} (${data.order.buyerPhone}) ordered ` +
      `${data.listing.title} size ${data.order.size} for ` +
      `₦${data.listing.priceNgn.toLocaleString("en-NG")}. ` +
      `Reply to this email to confirm.`;

    if (!apiKey || !inboxId) {
      await ctx.runMutation(internal.inbox.record, {
        orderId: args.orderId,
        direction: "out",
        subject: `Queued for vendor: ${data.listing.title}`,
        body: `${body} (AgentMail key not set. Connect AGENTMAIL_API_KEY to send for real.)`,
      });
      return { sent: false, note: "queued. Set AGENTMAIL_API_KEY to send" };
    }

    const res = await fetch("https://api.agentmail.to/v0/messages/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        inbox_id: inboxId,
        to: data.order.buyerPhone,
        subject: `New Jara order: ${data.listing.title} (${data.order.size})`,
        text: body,
        labels: ["jara-order"],
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      await ctx.runMutation(internal.inbox.record, {
        orderId: args.orderId,
        direction: "out",
        subject: `Send failed: ${data.listing.title}`,
        body: `AgentMail error ${res.status}: ${text.slice(0, 500)}`,
      });
      throw new Error(`AgentMail send failed: ${res.status}`);
    }
    await ctx.runMutation(internal.inbox.record, {
      orderId: args.orderId,
      direction: "out",
      subject: `Sent to vendor: ${data.listing.title}`,
      body,
      status: "sent_to_vendor",
    });
    return { sent: true, note: "sent via AgentMail" };
  },
});
