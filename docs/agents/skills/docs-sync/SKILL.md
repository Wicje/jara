---
name: docs-sync
description: "Sync project docs with code changes at the end of a task. Use after edits, before review."
version: 1
---

# docs-sync — docs never drift from code

Use at the end of every task that changes code, after edits are done and
before `code-review`. Detail in `docs-matrix.md` (read only when the diff
touches a listed trigger: routes, env, deps, terms, setup steps).

## Procedure

1. Inspect the diff: `git status --short` + `git diff --stat`. Classify
   each change (route, component, env var, dep, domain term, setup step).
2. Look up `docs-matrix.md`. Update every doc it maps to — and only those.
   Smallest doc edit that makes docs true again. No rewrites, no essays.
3. Never edit history: footprint log is append-only, backups are read-only,
   `checklist.md` is factory-owned (do not edit).
4. Record docs touched in the footprint Change log entry
   (e.g. `Docs: README env table + .env.example`).

## Enforcement

- MUST run before `code-review`, so review checks the synced docs.
- MUST NOT silently change scope: `brief.md`/`spec.md` acceptance changes
  only when the human agreed them. Otherwise flag as scope creep and
  propose a follow-up ticket.
- MUST NOT copy secrets/tokens/DSNs into any doc. `.env.example` keeps
  keys with placeholder values only.
- Stale doc found but task did not cause it? Fix it only if <5 lines;
  otherwise log a TODO. No drive-by rewrites.
