# Traceability — standards tiers

> Never hand-edit `.mini.md` / `.nano.md` to add policy. Fix the `.full.md`
> canonical first, then re-derive. This file maps every mini/nano rule to
> its full source + intentionally-lost dispositions.

## coding-rules.mini.md -> coding-rules.full.md

| Mini | Full source | Notes |
|---|---|---|
| M1 reuse first, no duplicates | D1 | kept verbatim |
| M2 one file, delete dead | D2 + D4 | merged |
| M3 no any, clear names | D5 + D6 | merged; primitive-obsession detail lost (kept in full) |
| M4 mobile/keyboard/no-inline | D7 + D8 + D9 | merged |
| M5 stack lock | D11 | kept |
| M6 match design | D12 | kept |
| M7 smallest slice / tracer bullet | D13 | horizontal-slicing example lost (in full) |
| M8 seams, no internals | D14 | kept |
| M9 specs durable, no paths | D15 | kept |
| M10 vocabulary | Seam vocabulary | 7 terms -> 5; adapter/leverage detail in full |
| M11 verify + footprint | Final checklist + D4 (token full) | kept |
| M12 diff + commit | D4 + Final checklist | kept |
| M13 duplication/surgery trigger | T1 + T4 | merged |
| M14 split trigger | T2 + T3 | merged |
| Checklist (4) | Final checklist (5) | collapsed; spelling/copy in checklist.md |

Intentionally lost in mini: full smell catalog (12 names), T5 ask-gate
(kept in AGENTS.md instead), T6 scope-creep review (kept in code-review skill).

## coding-rules.nano.md -> full

Nano keeps D1 + D4 + D6 + D7 + D11 + D14 + T5 equivalent in 12 lines.
Drops: vocabulary, triggers detail, smell list, D3/D10/D12/D15 (in mini/full).

## token-rules.md (= mini) -> token-rules.full.md

`token-rules.md` covers D1-D11 + T1-T5. Full adds D12 phase boundaries +
budgets table + gate. Nano keeps D1-D5 + D9-D11 compressed.

## Budgets (wc -c /4)

Run `wc -c standards/*.md` after edits. Targets: nano <= 2800B,
mini 4000-7000B, full 13000-18000B. AGENTS.md + mini always-on <= ~8KB total.
