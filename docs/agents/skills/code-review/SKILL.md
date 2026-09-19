---
name: code-review
description: "Review a branch or diff against Standards and Spec. Use before every commit."
version: 1
---

# code-review — two-axis review before commit

Use when a ticket slice is implemented, before commit/push. Requires a
non-empty diff against a fixed point (`git rev-parse` + `git diff <fixed>...HEAD`).

## Procedure

1. Pin fixed point: `git rev-parse --show-toplevel`, ensure
   `git diff <fixed>...HEAD` is non-empty. Empty diff = reject review.
2. Run two axes (parallel subagents or two passes, <400 words brief each):
   - **Standards**: repo `coding-rules` (mini) + Fowler-12 baseline
     (Mysterious Name, Duplicated Code, Feature Envy, Data Clumps, Primitive
     Obsession, Repeated Switches, Shotgun Surgery, Divergent Change,
     Speculative Generality, Message Chains, Middle Man, Refused Bequest).
     Repo overrides win. Every hit is a judgement call.
   - **Spec**: missing / partial / scope creep / looks-wrong vs
     `docs/brief.md` + `docs/spec.md` (if exists). Quote the spec line.
3. Aggregate verbatim under `## Standards` / `## Spec`. No cross-axis
   re-ranking. Fix Standards-blocking + Spec-missing first; log the rest
   as follow-up tickets.

## Enforcement

- MUST re-read the full diff. MUST remove experiments and debug logs.
- Scope creep (behavior outside brief/spec) MUST be flagged, not silently kept.
- Doc drift (code true, docs stale) is a Standards miss. Assume `docs-sync`
  ran first; if it did not, flag the missing sync before approving.
- Commit message MUST describe behavior ("add pricing section"), not process.
