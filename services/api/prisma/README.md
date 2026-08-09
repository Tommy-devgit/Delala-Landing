# Database schema changes

This service uses Prisma **without** a `prisma/migrations/` folder. Schema changes
are applied by the hand-written, idempotent scripts in this directory.

## Bring a database up to the current schema

```bash
npm run prisma:migrate
```

Runs every column script in order. All of them use `ADD COLUMN IF NOT EXISTS`
(or an `ALTER COLUMN TYPE` that is a no-op when already applied), so the command
is safe to re-run against any database at any time.

## Adding a field to `schema.prisma`

> **Run the migration before or with the deploy — never after.**

Prisma generates its client from `schema.prisma`, so the moment a field is added
there, every query for that model selects the new column:

```sql
SELECT ..., "public"."properties"."latitude" ...
```

If the column does not exist yet, Postgres rejects the query and **every endpoint
touching that model returns HTTP 500** while unrelated endpoints keep working.
Deploying the code first and migrating afterwards guarantees an outage in
between. This is what happened on 2026-08-09: adding coordinates took
`/api/v1/properties` and `/api/v1/cities` down while `/api/v1/users` stayed up.

The steps, in order:

1. Add the field to `schema.prisma`.
2. Add an idempotent `prisma/add-<field>.ts` script for it.
3. Append that script to the `prisma:migrate` chain in `package.json`.
4. Run `npm run prisma:migrate` against the target database.
5. Rebuild (`npm run build`) — `dist/` is committed and is what Vercel deploys.
6. Deploy.

## Seed data

```bash
npm run prisma:seed
```

Unlike the migration scripts this **writes rows** — Ethiopian cities, sub-cities
and neighborhoods, and it backfills location coordinates onto records created
before the map release. It is safe to re-run (existing rows are skipped or
backfilled, never duplicated), but it is a data change, not a schema change.
