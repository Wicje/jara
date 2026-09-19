---
name: diagnosing-bugs
description: "Diagnose broken, slow, or flaky behavior. Use when something fails, errors, or regresses."
version: 1
---

# diagnosing-bugs — gated 6-phase loop

Use when a test fails, the page errors, or behavior regresses.

## Phase 1 gate (do not skip)

- One named command MUST already be run and MUST be red-capable
  (can fail), deterministic, fast, and agent-runnable
  (e.g. `npm run test:unit`, `npm run build`, `npx playwright test <file>`).
- No loop, no Phase 2 until the gate passes. If flaky, pin it first
  (seed, retry=0, single worker) until deterministic.

## Phases

1. **Tight red loop** — smallest repro command, runnable in <60s.
2. **Reproduce + minimise** — strip to the load-bearing repro. Delete
   everything that does not change red->green.
3. **Hypotheses** — 3-5 falsifiable candidates, ranked. Show to human.
4. **Instrument** — tagged logs `[DEBUG-xxxx]`, one hypothesis at a time.
   Remove all tags in cleanup.
5. **Fix + regression test** — Call the Skill tool with "tdd": regression
   test at the seam first (if seam exists), then smallest fix.
6. **Cleanup** — remove debug tags, re-run gate + full suite once, update
   footprint (Changed / Reason / Checks / Notes).

## Enforcement

- MUST minimise before theorising. MUST NOT shotgun-fix.
- MUST show ranked hypotheses before instrumenting.
- MUST clean `[DEBUG-xxxx]` tags before finishing.
