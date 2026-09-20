---
name: next-dev-loop
description: "Vendor (on-demand): Verify Next.js runtime behavior after editing app code. Use this skill to confirm a change actually works in a running app — not just that it compiles or type-checks. Combines /_next/mcp (Next.js's view) with agent-browser (the browser's view). Requires a running `next dev`. Use for: verifying a Next.js change works at runtime in next dev (not just compiles)."
---

# next-dev-loop (vendor skill, on-demand)

> Upstream install name: `next-dev-loop` (https://github.com/vercel/next.js.git, pinned 34433fd).
> Full reference is `FULL.md` in this folder — read it ONLY when the brief
> matches (verifying a Next.js change works at runtime in next dev (not just compiles)). Otherwise ignore this skill entirely.

1. State a one-line design read first (page kind + audience + vibe).
2. Read `FULL.md` only on a match; apply its dials/rules to the task.
3. Never inject `FULL.md` into always-loaded context.

Update: `./factory.sh skills update next-dev-loop && ./factory.sh skills sync <project>`.
