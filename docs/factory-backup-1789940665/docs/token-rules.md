# Token rules - spend tokens like money

Tokens are the factory's budget. Every file read, tool call, and
re-run costs tokens. Follow these rules on every agent task.

## Context: fit more in, read less

- Read only what the task needs. Prefer `glob`/`grep` over `cat`.
- Read `docs/brief.md`, `docs/coding-rules.md`, `AGENTS.md` first —
  then stop scanning. Do NOT walk the whole repo "just in case".
- When a scope is given (`--scope src/app/page.tsx ...`), stay inside
  it. Do not open files outside the scope unless blocked.
- Read slices, not wholes: use offset/limit. Large files (>200 lines):
  search first, read the matching region only.
- Never `cat node_modules`, `.next`, `package-lock.json`, or binaries.
  Never print a full file back to the user — summarize or diff.

## Output: say less, change less

- Smallest diff that satisfies the brief. No gold plating, no drive-by
  refactors, no new dependencies unless asked.
- Batch independent tool calls in one block (parallel reads/searches).
- Terse output: no play-by-play, no repeated summaries. One short
  summary at the end: files changed + checks run + what needs review.
- Do not re-explain code the user can read in the diff.

## Verification: check once, at the end

- Default order: write code → `lint` → `build` → `unit` — once.
- Do NOT loop lint/build after every file. Fix all edits first,
  then verify once. Only re-run what failed.
- `--plan` mode: NO file writes, NO builds, NO tests. Output a
  numbered plan (max ~30 lines): files to touch + key edits + risks.
  Ask before implementing.
- `--eco` mode: same as normal, plus: skip `test:e2e`/`visual` unless
  the brief touches layout; keep summary under 15 lines.

## Quick reference

| Task size | Command | Why |
|---|---|---|
| Explore / "what if" | `agent <p> "..." --plan` | Zero code, ~10x cheaper |
| Small fix / copy change | `agent <p> "..." --eco --scope <paths>` | Minimal context + checks |
| Normal feature | `agent <p> "..." --eco` | Full build, terse output |
| Full quality | `agent <p> "..."` | Lint + build + unit |
| Before launching agent | `tokens <p>` | See context cost, pick scope |

Estimate: ~4 chars ≈ 1 token. `tokens <project>` shows the
breakdown per project so you can shrink scope before spending.
