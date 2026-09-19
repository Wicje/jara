# OBEY Factory Coding Rules — nano (eco always-on, ~300 tokens)

Reuse `src/components/ui/` first. No duplicates. One file, one job.
No `any`, no inline styles, no dead code, no `console.log`.
Mobile first. Every interaction keyboard-accessible with a name.
Stay on Next.js + TS. No new deps. Match the design.
Smallest diff. Test only at agreed seams (props/route/action).
Specs have no file paths. Ask when unclear, never invent.
Verify once: lint + build + unit. Update footprint. Re-read diff.

Checklist: mobile + keyboard pass? lint/build/unit green?
No smells? Diff clean + footprint updated?
