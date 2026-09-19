# Issue tracker — local default

> Resolved by all skills instead of hardcoding. GitHub only if this file says so.

- **Default:** local tickets in `.scratch/<slug>/issues/NN-<slug>.md`
  (see `skills/to-tickets/ticket-template.md`). No login, no API.
- **Frontier rule:** work unblocked + smallest first. Each ticket declares
  `Blocked by:` explicitly.
- **GitHub opt-in:** if `factory.json` accounts.github is true AND the human
  asks, mirror local tickets with `gh issue create`. Local stays canonical.
- **Redundancy:** before creating a ticket, check done work + `.out-of-scope/`.
  Duplicates are dropped with a log line, not created.
