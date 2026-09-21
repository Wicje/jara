import { describe, it, expect } from "vitest";
import {
  AGENT_MODEL,
  AGENT_TOOLS,
  buildAgentMessages,
  parseToolCalls,
} from "@/lib/agent-protocol";

describe("agent protocol", () => {
  it("pins a cheap model and exactly three tools", () => {
    expect(AGENT_MODEL).toBe("gpt-4o-mini");
    expect(AGENT_TOOLS.map((t) => t.function.name).sort()).toEqual([
      "check_order_status",
      "get_details",
      "search_listings",
    ]);
  });

  it("builds system-first messages with bounded history", () => {
    const history = Array.from({ length: 15 }, (_, i) => ({
      role: (i % 2 === 0 ? "user" : "assistant") as "user" | "assistant",
      text: `m${i}`,
    }));
    const messages = buildAgentMessages(history, "hello");
    expect(messages[0].role).toBe("system");
    expect(messages[messages.length - 1]).toMatchObject({ role: "user", content: "hello" });
    // System + last 10 + current user message.
    expect(messages).toHaveLength(12);
  });

  it("parses tool calls and survives malformed arguments", () => {
    const parsed = parseToolCalls({
      message: {
        tool_calls: [
          { id: "a", function: { name: "search_listings", arguments: '{"size":"M"}' } },
          { id: "b", function: { name: "broken", arguments: "not-json{{{" } },
          { id: "c" },
        ],
      },
    });
    expect(parsed).toEqual([
      { id: "a", name: "search_listings", args: { size: "M" } },
      { id: "b", name: "broken", args: {} },
    ]);
  });

  it("returns no calls when the model answers directly", () => {
    expect(parseToolCalls({ message: { tool_calls: null } })).toEqual([]);
    expect(parseToolCalls({})).toEqual([]);
  });
});
