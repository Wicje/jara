import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  vendors: defineTable({
    name: v.string(),
    area: v.string(),
    instagramUrl: v.string(),
    whatsapp: v.optional(v.string()),
    email: v.optional(v.string()),
    inboxId: v.optional(v.string()),
  }),
  listings: defineTable({
    vendorId: v.id("vendors"),
    title: v.string(),
    priceNgn: v.number(),
    compareAtNgn: v.optional(v.number()),
    stock: v.optional(v.number()),
    sizes: v.array(v.string()),
    fabric: v.string(),
    occasion: v.string(),
    photoUrl: v.string(),
    sourceUrl: v.optional(v.string()),
    status: v.string(),
  })
    .index("by_vendor", ["vendorId"])
    .index("by_occasion", ["occasion"])
    .index("by_status", ["status"]),
  threads: defineTable({
    query: v.string(),
    budgetNgn: v.optional(v.number()),
    size: v.optional(v.string()),
    occasion: v.optional(v.string()),
    recommendedIds: v.array(v.id("listings")),
    messages: v.optional(
      v.array(
        v.object({
          role: v.string(),
          text: v.string(),
          createdAt: v.number(),
        }),
      ),
    ),
  }),
  orders: defineTable({
    listingId: v.id("listings"),
    vendorId: v.id("vendors"),
    size: v.string(),
    buyerName: v.string(),
    buyerPhone: v.string(),
    status: v.string(),
    threadId: v.optional(v.string()),
    groupId: v.optional(v.string()),
  })
    .index("by_vendor", ["vendorId"])
    .index("by_listing", ["listingId"])
    .index("by_group", ["groupId"])
    .index("by_phone", ["buyerPhone"]),
  verifications: defineTable({
    phone: v.string(),
    email: v.string(),
    code: v.string(),
    expiresAt: v.number(),
    verifiedAt: v.optional(v.number()),
    attempts: v.number(),
  }).index("by_phone", ["phone"]),
  inboxEvents: defineTable({
    orderId: v.id("orders"),
    direction: v.string(),
    subject: v.optional(v.string()),
    body: v.string(),
    status: v.optional(v.string()),
  }).index("by_order", ["orderId"]),
  reviews: defineTable({
    listingId: v.id("listings"),
    name: v.string(),
    rating: v.number(),
    text: v.string(),
  }).index("by_listing", ["listingId"]),
});
