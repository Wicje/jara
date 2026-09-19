---
name: to-tickets
description: "Split a spec into vertical tracer-bullet tickets. Use when spec is ready-for-tickets."
version: 1
disable-model-invocation: true
---

# to-tickets — spec to frontier tickets

Use when `docs/spec.md` exists and is `ready-for-tickets`.
Output: `.scratch/<slug>/issues/NN-<slug>.md` from `ticket-template.md`
(local default; GitHub issues only if `docs/agents/issue-tracker.md` says so).

## Steps

1. Read `docs/spec.md` + footprint. Derive 3-7 vertical slices (each spans
   layers and is demoable alone). Tracer bullet first (NN=01).
2. For each ticket: goal, acceptance (observable), seam under test,
   explicit `Blocked by:` edges. Quiz the human on granularity + edges.
3. Publish tickets. Work the frontier (unblocked, smallest first).
4. Record map in footprint TODOs (`ticket 01 in progress`, etc.).

## Enforcement

- Each ticket MUST be vertical (UI + logic + test at its seam in one window).
- Each ticket MUST declare `Blocked by:` (or `Blocked by: none`).
- Tickets MUST NOT contain file paths — seams and behavior only.
- Redundancy check: if a ticket duplicates done work or an `.out-of-scope/`
  entry, drop it and log why.
