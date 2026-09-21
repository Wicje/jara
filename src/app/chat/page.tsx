"use client";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { isConvexConfigured } from "../providers";
import { conciergeReply, type ChatAction, type ChatChip, type ChatToolId } from "@/lib/concierge-chat";
import { getReceipts } from "@/lib/shopper";
import { AiComposer } from "@/components/ai-composer";
import { Container } from "@/components/ui/container";
import { ProductCard, type ProductCardItem } from "@/components/product-card";
import { Text } from "@/components/ui/text";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  items?: ProductCardItem[];
  chips?: ChatChip[];
  actions?: ChatAction[];
}

function toBrainListings(
  live: Array<{
    _id: string;
    title: string;
    priceNgn: number;
    compareAtNgn?: number;
    stock?: number;
    occasion: string;
    photoUrl: string;
    photoUrls?: string[];
    sizes: string[];
  }>,
) {
  return live.map((l) => ({
    _id: l._id,
    title: l.title,
    priceNgn: l.priceNgn,
    compareAtNgn: l.compareAtNgn,
    stock: l.stock,
    occasion: l.occasion,
    photoUrl: l.photoUrl,
    photoUrls: l.photoUrls,
    sizes: l.sizes,
  }));
}

function Chat() {
  const params = useSearchParams();
  const router = useRouter();
  const initialId = params.get("id");
  const initialQuery = params.get("q") ?? "";
  const [threadId, setThreadId] = useState<string | null>(initialId);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const startedRef = useRef(false);
  const live = useQuery(api.listings.list, {});
  const agent = useQuery(api.agent.status, {});
  const savedThread = useQuery(
    api.threads.getThread,
    threadId ? { threadId: threadId as Id<"threads"> } : "skip",
  );
  const createThread = useMutation(api.threads.createThread);
  const appendMessage = useMutation(api.threads.appendMessage);
  const saveRecommendations = useMutation(api.threads.saveRecommendations);
  const agentReply = useAction(api.agent.reply);

  const sendMessage = useCallback(
    async (text: string, tool: ChatToolId, listings: ReturnType<typeof toBrainListings>) => {
      let id = threadId;
      if (!id) {
        id = await createThread({ query: text });
        setThreadId(id);
        router.replace(`/chat?id=${id}`);
      }
      // The LLM agent persists its own messages. Without a model key the
      // deterministic brain answers and this client persists the thread.
      if (agent?.configured) {
        try {
          const res = await agentReply({ threadId: id as Id<"threads">, text });
          if (res.mode === "ai") {
            const items = listings.filter((l) => res.recommendedIds.includes(l._id));
            setMessages((current) => [
              ...current,
              { id: `u-${Date.now()}`, role: "user", text },
              {
                id: `a-${Date.now()}`,
                role: "assistant",
                text: res.text,
                items: items.map((l) => ({
                  id: l._id,
                  title: l.title,
                  priceNgn: l.priceNgn,
                  compareAtNgn: l.compareAtNgn,
                  stock: l.stock,
                  occasion: l.occasion,
                  photoUrl: l.photoUrl,
                  photoUrls: l.photoUrls,
                })),
                chips: [],
                actions:
                  items.length > 0
                    ? [{ label: `View all in catalog`, href: "/catalog" }]
                    : [],
              },
            ]);
            return;
          }
        } catch {
          // Fall through to the deterministic brain below.
        }
      }
      const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", text };
      setMessages((current) => [...current, userMsg]);
      await appendMessage({ threadId: id as Id<"threads">, role: "user", text });
      const reply = conciergeReply(text, tool, listings, getReceipts());
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        text: reply.text,
        items: reply.items,
        chips: reply.chips,
        actions: reply.actions,
      };
      setMessages((current) => [...current, assistantMsg]);
      await appendMessage({ threadId: id as Id<"threads">, role: "assistant", text: reply.text });
      if (reply.items.length > 0) {
        const parsed = new URLSearchParams(reply.actions[0]?.href.split("?")[1] ?? "");
        await saveRecommendations({
          threadId: id as Id<"threads">,
          recommendedIds: reply.items.map((item) => item.id as Id<"listings">),
          occasion: parsed.get("occasion") ?? undefined,
          budgetNgn: parsed.get("budget") ? Number(parsed.get("budget")) : undefined,
          size: parsed.get("size") ?? undefined,
        });
      }
    },
    [threadId, createThread, appendMessage, saveRecommendations, agentReply, agent, router],
  );

  // Seed history once, then auto-send an incoming ?q= exactly once.
  // A missing ?id= means "no thread yet", not "still loading".
  // The started flag arms only when data is actually ready, so slow
  // queries and StrictMode remounts cannot deadlock the first send.
  const threadReady = threadId === null || savedThread !== undefined;
  useEffect(() => {
    if (!threadReady || startedRef.current) return;
    if (savedThread === undefined && threadId !== null) return;
    if (initialQuery && live === undefined) return;
    startedRef.current = true;
    void (async () => {
      if (savedThread && savedThread.messages.length > 0) {
        setMessages(
          savedThread.messages.map((m, index) => ({
            id: `h-${index}`,
            role: m.role === "user" ? "user" : "assistant",
            text: m.text,
          })),
        );
      }
      if (initialQuery && live !== undefined) {
        setSending(true);
        try {
          await sendMessage(initialQuery, "search", toBrainListings(live));
        } finally {
          setSending(false);
        }
      }
    })();
  }, [threadReady, savedThread, threadId, initialQuery, live, sendMessage]);

  async function submit(text: string, tool: ChatToolId) {
    if (live === undefined || sending) return;
    setSending(true);
    try {
      await sendMessage(text, tool, toBrainListings(live));
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <div className="mt-6 grid gap-3" aria-live="polite" aria-label="Conversation">
        {messages.length === 0 && live !== undefined && (
          <div className="rounded-lg border border-line bg-white p-4 sm:p-5">
            <p className="font-sans text-sm leading-6 text-ink/80">
              Tell me the occasion, your budget, and your size — I will search the live catalog
              and show my top picks. Try “owambe dress under 100k, size M”.
            </p>
          </div>
        )}
        {messages.map((message) => {
          if (message.role === "user") {
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="flex justify-end"
              >
                <p className="max-w-[85%] rounded-[20px] bg-violet px-4 py-2.5 font-sans text-sm leading-6 text-white">
                  {message.text}
                </p>
              </motion.div>
            );
          }
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="grid gap-2"
            >
              <div className="max-w-[95%] rounded-[20px] rounded-tl-[8px] border border-line bg-white px-4 py-3">
                <p className="font-sans text-sm leading-6 text-ink/90">{message.text}</p>
                {message.actions && message.actions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.actions.map((action) =>
                      action.href.startsWith("http") ? (
                        <a
                          key={action.href}
                          href={action.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-sans text-sm font-semibold text-violet-deep underline"
                        >
                          {action.label}
                        </a>
                      ) : (
                        <Link
                          key={action.href}
                          href={action.href}
                          className="font-sans text-sm font-semibold text-violet-deep underline"
                        >
                          {action.label}
                        </Link>
                      ),
                    )}
                  </div>
                )}
              </div>
              {message.items && message.items.length > 0 && (
                <ul className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3" aria-label="Recommended pieces">
                  {message.items.map((item) => (
                    <ProductCard key={item.id} item={item} />
                  ))}
                </ul>
              )}
              {message.chips && message.chips.length > 0 && (
                <div className="flex flex-wrap gap-2" aria-label="Suggested follow-ups">
                  {message.chips.map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      disabled={sending || live === undefined}
                      onClick={() => void submit(chip.query, "search")}
                      className="min-h-[42px] rounded-[32px] bg-white px-4 font-sans text-sm font-semibold text-ink ring-1 ring-ink/20 ring-inset transition-all hover:bg-mist active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet disabled:opacity-50"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
        {sending && (
          <p className="font-sans text-sm text-smoke" role="status">
            Concierge is searching…
          </p>
        )}
      </div>
      <div className="sticky bottom-4 mt-4 grid gap-1.5">
        <p className="font-sans text-xs text-smoke" role="status">
          {agent?.configured ? "AI concierge is on — I reason over the live catalog." : "Quick matcher is on — connect a model key for the full AI concierge."}
        </p>
        <AiComposer
          autoFocus
          placeholder="Owambe dress under 100k, size M"
          onSubmit={(text, tool) => void submit(text, tool)}
        />
      </div>
    </>
  );
}

export default function ChatPage() {
  return (
    <main>
      <Container className="pt-8 pb-4 sm:pt-10">
        <p className="font-sans text-xs font-bold tracking-[0.2em] text-violet uppercase">Concierge chat</p>
        <h1 className="mt-2 font-display text-4xl tracking-wide text-ink uppercase sm:text-5xl">
          Ask Jara
        </h1>
        {isConvexConfigured() ? (
          <Suspense fallback={<Text className="mt-6">Loading the concierge…</Text>}>
            <Chat />
          </Suspense>
        ) : (
          <Text className="mt-6">Connect the Convex backend to chat with the concierge.</Text>
        )}
      </Container>
    </main>
  );
}
