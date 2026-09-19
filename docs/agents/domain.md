# Domain — how to use CONTEXT.md + ADRs

- Read `docs/CONTEXT.md` before naming anything. Use glossary terms in code,
  specs, tickets, and footprint. `_Avoid_` column terms MUST NOT appear in
  new code without a logged reason.
- When a term is fuzzy, challenge it: propose a sharper def, scenario-test
  ("does X count as Y when ...?"), update `docs/CONTEXT.md` inline.
- ADR (Architecture Decision Record) only when ALL three hold:
  hard-to-reverse + surprising + real tradeoff. Otherwise decide inline and
  log in footprint Decisions table. Never ADR for style nits.
