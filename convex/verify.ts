import { internalAction, internalQuery, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

export const CODE_TTL_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function makeCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function normalizePhone(phone: string): string {
  return phone.replace(/[\s()-]/g, "");
}

// Starts email verification for a phone number. The code goes out through
// AgentMail when keys are set, otherwise it is queued honestly like orders.
export const requestCode = mutation({
  args: { phone: v.string(), email: v.string() },
  handler: async (ctx, args): Promise<{ sent: boolean; note: string }> => {
    const phone = normalizePhone(args.phone);
    const email = args.email.trim();
    if (phone === "" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      throw new Error("Enter a valid phone number and email");
    }
    const code = makeCode();
    const existing = await ctx.db
      .query("verifications")
      .withIndex("by_phone", (q) => q.eq("phone", phone))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, {
        email,
        code,
        expiresAt: Date.now() + CODE_TTL_MS,
        verifiedAt: undefined,
        attempts: 0,
      });
    } else {
      await ctx.db.insert("verifications", {
        phone,
        email,
        code,
        expiresAt: Date.now() + CODE_TTL_MS,
        attempts: 0,
      });
    }
    await ctx.scheduler.runAfter(0, internal.verify.sendCode, { phone });
    return { sent: false, note: "code requested" };
  },
});

export const sendCode = internalAction({
  args: { phone: v.string() },
  handler: async (ctx, args): Promise<{ sent: boolean; note: string }> => {
    const record: {
      email: string;
      code: string;
      expiresAt: number;
    } | null = await ctx.runQuery(internal.verify.codeDetails, { phone: args.phone });
    if (record === null) throw new Error("Verification not found");

    const apiKey = process.env.AGENTMAIL_API_KEY;
    const inboxId = process.env.AGENTMAIL_INBOX_ID;
    if (!apiKey || !inboxId) {
      return { sent: false, note: "queued. Set AGENTMAIL_API_KEY to send codes for real" };
    }
    const res = await fetch("https://api.agentmail.to/v0/messages/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        inbox_id: inboxId,
        to: record.email,
        subject: "Your Jara verification code",
        text:
          `Your Jara code is ${record.code}. It expires in 10 minutes. ` +
          `Enter it at checkout to confirm your order.`,
        labels: ["jara-verify"],
      }),
    });
    if (!res.ok) throw new Error(`AgentMail send failed: ${res.status}`);
    return { sent: true, note: "code sent via AgentMail" };
  },
});

export const codeDetails = internalQuery({
  args: { phone: v.string() },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("verifications")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();
    if (record === null) return null;
    return { email: record.email, code: record.code, expiresAt: record.expiresAt };
  },
});

export const verifyCode = mutation({
  args: { phone: v.string(), code: v.string() },
  handler: async (ctx, args): Promise<{ verified: boolean }> => {
    const phone = normalizePhone(args.phone);
    const record = await ctx.db
      .query("verifications")
      .withIndex("by_phone", (q) => q.eq("phone", phone))
      .first();
    if (record === null) throw new Error("No code requested for this number");
    if (record.attempts >= MAX_ATTEMPTS) throw new Error("Too many attempts. Request a new code");
    if (Date.now() > record.expiresAt) throw new Error("Code expired. Request a new one");
    if (record.code !== args.code.trim()) {
      await ctx.db.patch(record._id, { attempts: record.attempts + 1 });
      throw new Error("Wrong code. Try again");
    }
    await ctx.db.patch(record._id, { verifiedAt: Date.now() });
    return { verified: true };
  },
});

export const isVerified = query({
  args: { phone: v.string() },
  handler: async (ctx, args): Promise<boolean> => {
    const record = await ctx.db
      .query("verifications")
      .withIndex("by_phone", (q) => q.eq("phone", normalizePhone(args.phone)))
      .first();
    return record?.verifiedAt !== undefined;
  },
});
