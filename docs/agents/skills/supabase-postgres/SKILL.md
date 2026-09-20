---
name: supabase-postgres
description: "Vendor (on-demand): Postgres best practices maintained by Supabase, for Postgres running anywhere. Load this skill BEFORE writing or changing anything that lives in a Postgres database: creating or altering tables and columns (including choosing column types), schema design, migrations and declarative schema files, RLS policies and the tests that verify them, indexes, triggers, database functions, queues and scheduled jobs (pg_cron, pgmq), vector/semantic search (pgvector), and restoring dumps (pg_restore) or importing data. Also load it when diagnosing slow queries, high CPU, timeouts, EXPLAIN plans, connection exhaustion, locking, bloat, or rows visible to the wrong user or tenant. This is not just a performance guide — schema, migration, security, and SQL authoring tasks need these rules too, even for a one-column change or a single query. Use for: Postgres schema, RLS and migration reviews."
---

# supabase-postgres (vendor skill, on-demand)

> Upstream install name: `supabase-postgres-best-practices` (https://github.com/supabase/agent-skills.git, pinned 8331f91).
> Full reference is `FULL.md` in this folder — read it ONLY when the brief
> matches (Postgres schema, RLS and migration reviews). Otherwise ignore this skill entirely.

1. State a one-line design read first (page kind + audience + vibe).
2. Read `FULL.md` only on a match; apply its dials/rules to the task.
3. Never inject `FULL.md` into always-loaded context.

Update: `./factory.sh skills update supabase-postgres && ./factory.sh skills sync <project>`.
