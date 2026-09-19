---
name: to-spec
description: "Turn a grilled brief into a durable spec. Use after grill-brief, before tickets."
version: 1
disable-model-invocation: true
---

# to-spec — brief to durable spec

Use when `docs/brief.md` is sharp and the work needs >1 session or >3 files.
Output: `docs/spec.md` following `spec-template.md`. No interview here —
synthesize, propose seams, confirm once, then write.

## Steps

1. Read `docs/brief.md`, `docs/footprint.md`, `docs/coding-rules.md` (mini).
2. Propose seams: what are the public interfaces (routes, component props,
   server actions)? Confirm with human. No file paths in the spec.
3. Write `docs/spec.md` from `spec-template.md` (Problem / Solution / User
   stories / Implementation + Testing decisions / Out-of-scope).
4. Label readiness in footprint TODOs (`ready-for-tickets` or needs-grill).

## Enforcement

- Spec MUST NOT contain file paths, line numbers, or code (one trimmed
  prototype snippet max, only if it settles a dispute).
- One vertical tracer-bullet slice MUST be identified first (smallest demoable).
- Horizontal slices (all-UI-no-logic) are rejected — re-slice vertically.
