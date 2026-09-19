---
name: handoff
description: "Compact a conversation into portable notes for a fresh context. Use at phase boundaries."
version: 1
disable-model-invocation: true
---

# handoff — portable notes, temp dir only

Use when context is full, switching harness/dir/colleague, or forking mid-phase.
Otherwise prefer Continue -> /clear -> compact (see AGENTS.md phase limits).

## Enforcement

- Output MUST go to OS temp dir (`$TMPDIR/factory-handoff-<slug>.md`), NOT
  the workspace. Workspace memory is footprint; handoff is transit.
- MUST contain: goal, current state, decisions (why), open TODOs, suggested
  next skills, redacted secrets (never copy tokens/DSNs).
- MUST be re-pitchable: a fresh agent reading handoff + footprint + brief
  continues without re-asking. Max ~60 lines.
