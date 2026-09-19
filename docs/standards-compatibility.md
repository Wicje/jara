# Standards compatibility — which packs combine

> Adopted from agent-rules-books `COMPATIBILITY.md`. One primary always-on;
> rest on-demand or scoped. Verdicts: complementary (load together),
> overlap (pick one), conflicting (do not load as equals).

## Factory packs

| A | B | Verdict | Rule |
|---|---|---|---|
| `coding-rules.mini` | `token-rules.md` | complementary | Always load together. Different layers (shape vs budget). |
| `coding-rules.mini` | `coding-rules.nano` | overlap | Pick one. Nano = eco substitute, never stack both. |
| `coding-rules.full` | `coding-rules.mini` | overlap | Full is RAG-only reference. Never inject both. |
| `landing` template | `dashboard` template | conflicting | One template per project. Mixing grids/sidebars diverges layout. |
| `tdd` skill | `diagnosing-bugs` skill | complementary | Bugs: diagnose first, then tdd regression at seam. |
| `to-spec` | `to-tickets` | complementary | Spec is target, tickets are sequencing. Use in order. |
| `code-review` | `implement` | complementary | Implement builds, review gates the commit. |
| `prototype` | `to-spec` | complementary | Prototype settles dispute, spec records the decision (trimmed snippet max). |
| `wayfinder` | `implement` | conflicting | Wayfinder plans, never builds. Merge via to-spec, not straight to implement. |
| `clean-arch` style (deep modules) | `rapid-prototype` (flat) | conflicting | DDD-rich primary constrains the other to infra only. Pick per ticket. |

## Loading decision

- Always-on (per project): `AGENTS.md` (<=50 lines) + ONE `coding-rules`
  tier (mini default, nano eco) + `token-rules` tier. Total Always <= ~8KB.
- On-demand (skill call): `code-review`, `diagnosing-bugs`, `research`,
  `prototype`, `wayfinder`, `handoff`, full rules as `reference.md`.
- Scoped (per dir): e.g. `app/(dashboard)/**` gets dashboard slice;
  `payments/**` gets payments rules. Prefer scoped over global stacking.

## Evidence rule

Any combine/override decision MUST cite line ranges
(e.g. `coding-rules.full.md D13 vs mini M7`). Update this file when packs change.
