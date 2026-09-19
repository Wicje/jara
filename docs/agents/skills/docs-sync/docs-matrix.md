# docs-matrix.md — which code change updates which doc (load on demand)

> Read only when the diff touches a trigger below. Update mapped docs with
> the smallest true-again edit. Docs not listed here MUST NOT be touched.

| Code change (trigger) | Docs to update | Notes |
|---|---|---|
| New/renamed route or page section | `docs/spec.md` stories + footprint Current state | Only if human agreed the scope; else scope-creep ticket |
| New/changed component props | footprint Changed line; `docs/spec.md` seam if it is a testing seam | No file paths in spec |
| New domain term or rename | `docs/CONTEXT.md` (term + Avoid) | Use the term in code too |
| Hard-to-reverse + surprising + tradeoff | footprint Decisions table (append row) | ADR only if all three hold; else inline |
| New/changed env var | `.env.example` (key + placeholder) + project `README.md` table/section if it documents setup | Never real values |
| New/removed npm script or dep | project `README.md` command + `docs/checklist.md`? No — checklist is factory-owned, do not edit. Footprint Notes only | Keep README commands runnable |
| Changed dev/run/deploy steps | project `README.md` quick-start | Verify by reading, not by running deploys |
| New ticket finished | footprint TODOs (check off, add next) + `.scratch/` ticket state | One owner, frontier first |
| Test seam added/changed | `docs/spec.md` Testing decisions (interface, not path) | tdd owns the test itself |
| Design/copy change | footprint Notes (`visual baseline updated: intentional`) | Baseline update only when intentional |

## Never touch

- `docs/checklist.md`, `docs/coding-rules*.md`, `docs/token-rules*.md`
  (factory-owned — propagate via `./factory.sh update`)
- `docs/factory-backup-*` (read-only history)
- Old footprint log entries (append-only; fix with a new entry)
- Secrets: tokens, DSNs, keys — placeholders only, always
