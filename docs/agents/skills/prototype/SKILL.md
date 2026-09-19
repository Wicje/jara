---
name: prototype
description: "Build a throwaway to settle a logic or UI dispute. Use when paper discussion stalls."
version: 1
---

# prototype — throwaway to answer one question

Use when "hard to settle on paper". Pick ONE branch, answer, capture, delete.

## Branches (read sibling only for your branch)

- **logic** (`LOGIC.md`): single HTML file or single route proving the
  algorithm/flow. No persistence, no tests, one-command run.
- **UI** (`UI.md`): N variants on one route via `?variant=1..N`, same data,
  screenshots compared. No backend, no polish.

## Enforcement

- MUST be marked throwaway (`prototype/<name>` branch or `.scratch/prototype/`).
- MUST answer exactly one question, with one-command run + capture
  (screenshot, output log, or trimmed snippet into spec).
- MUST NOT persist, add tests, or merge as-is. Spec records the decision;
  implement rebuilds it cleanly via tdd.
