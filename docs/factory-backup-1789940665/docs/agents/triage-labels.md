# Triage labels — category + state roles

> Used by `to-tickets` redundancy check and any future `triage` flow.

## Category (what kind)

- `ready-for-tickets` — spec sliceable now
- `needs-grill` — brief/spec too vague, grill first
- `blocked` — has unresolved `Blocked by`
- `wontfix` — writes `.out-of-scope/<slug>.md` with reason, never silently dropped

## State (where)

- `frontier` — unblocked, workable now
- `in-progress` — claimed (one owner)
- `done` — acceptance checked + suite green

## Rules

- Every ticket has exactly one category + one state.
- `wontfix` MUST create `.out-of-scope/*.md` (what + why + date).
- Agent briefs are durable/behavioral: goals + acceptance + seams, no paths.
