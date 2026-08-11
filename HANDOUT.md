# Delala — handover notes

Written for whoever picks this up next. It assumes you can read the code; what
follows is the context that is **not** obvious from reading it, including several
things that cost real debugging time to discover.

---

## 1. Layout

```
Delala
├── client/            Marketing site      (Next 16, static)
├── product-website/   Marketplace         (Next 16, the main product)
├── admin-dashboard/   Staff dashboard     (Next 16, auth-gated)
├── services/api/      NestJS + Prisma + Supabase Postgres + Cloudflare R2
└── docs/              API_CONTRACT, ARCHITECTURE, DATABASE_SCHEMA, MARKETPLACE_SPEC
```

The **API is the single source of truth**. No frontend talks to Supabase
directly, and none should start.

Deployed API: `https://delala-server.vercel.app/api/v1`

---

## 2. Things that will bite you

### 2.1 Prisma has no migrations folder

Schema changes are applied by hand-written idempotent scripts in
`services/api/prisma/add-*.ts`, chained together:

```bash
cd services/api
npm run prisma:migrate     # safe to re-run; every script uses IF NOT EXISTS
```

**Run the migration before or with the deploy, never after.** Prisma selects a
column the moment the field exists in `schema.prisma`, so deploying code first
guarantees an outage. This has already happened once: adding `latitude` took
`/properties` and `/cities` down with 500s while `/users` stayed healthy — the
signature of "the code has a column the database doesn't".

Full reasoning lives in `services/api/prisma/README.md`.

### 2.2 Use `DIRECT_URL` for scripts, not `DATABASE_URL`

`DATABASE_URL` is Supabase's **transaction pooler** (port 6543). It is right for
the serverless API but drops long runs of sequential statements, which shows up
as:

```
Can't reach database server at aws-0-....pooler.supabase.com:6543
```

Any maintenance script must use `DIRECT_URL` (5432):

```ts
new PrismaClient({ datasources: { db: { url: process.env.DIRECT_URL || process.env.DATABASE_URL } } });
```

`seed.ts` and every `add-*.ts` already do this. The seed is **not** transactional,
so a dropped run can apply partly — use `--dry-run` first if one fails midway.

### 2.3 `services/api/dist/` is committed and is what Vercel deploys

After changing anything in `services/api/src`, run `npm run build` **and commit
`dist/`**. Forgetting this means the source changes but the deploy does not.

Entry point is `dist/src/main.js`, not `dist/main` — `npm start` in package.json
is wrong.

### 2.4 Both frontends set `images: { unoptimized: true }`

So `next/image` provides no optimisation and would additionally need
`remotePatterns` configured for the R2 host. **Use plain `<img>`** — that is the
convention throughout all three apps.

### 2.5 R2 must be configured on Vercel

`R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`
(`tommy`), `R2_PUBLIC_URL` (`https://pub-d79460f82f404504aadbc7bb90bc0a06.r2.dev`).

These were once missing in production. When R2 is unconfigured the service used
to inline uploads as base64 `data:` URLs, which made the profile PATCH body
several megabytes and **silently broke the entire profile save** — phone, bio and
role all failed with it. It now refuses anything over 256 KB and says which env
vars are missing.

---

## 3. Auth

Tokens are issued as:

```
betterauth-session-<user-uuid>-<issuedAtMs>
```

`SessionAuthGuard` (`src/common/guards/session-auth.guard.ts`) parses that,
loads the user, rejects expired (>30 days) and suspended accounts, and sets
`request.user = { id, email, role, status }`. `RolesGuard` reads `user.role`.

Before this guard existed **nothing populated `request.user`**, so `RolesGuard`
always returned false and every guarded route answered 403 regardless of
credentials. If a guarded route mysteriously 403s, check the guard order:
`@UseGuards(SessionAuthGuard, RolesGuard)` — session first.

Grant staff access:

```bash
cd services/api
npm run make-admin -- someone@example.com   # no arg lists accounts + roles
```

### ⚠️ Open security issue — passwords are never verified

`AuthService.login()` looks the user up by email and issues a token **without
checking the password at all**, and auto-registers unknown emails. There is no
password hash stored anywhere. In effect:

- any password works for any existing email
- anyone who knows an admin's email can sign into the admin dashboard

The route guards, role checks and ownership fixes are all real, but they sit on
top of this. **Fix this before any public launch.** It was raised with the owner
and consciously deferred, not overlooked.

---

## 4. Product behaviour worth knowing

**New listings are `pending`, not `approved`.** `properties.service.create()`
used to hardcode `approved`, which is why the admin approvals queue could never
have anything in it. Pending listings still appear in the marketplace but are not
marked verified. `/properties?status=approved` exists if you ever want to hide
them entirely.

**Listing ownership comes from the session token**, falling back to `brokerId`,
falling back to the first user in the table. That last fallback is why all eight
original listings ended up owned by the same account.

**Favorites requires a bearer token.** `POST /favorites` used to take `userId`
from the request body, so anyone could write to anyone's wishlist. Reading
another account's list is 403; `"me"` is accepted as the self alias.

**The map pin is deliberately approximate.** Owners place a rough position; there
is no exact-address field, by design. Property coordinates fall back to the
nearest location in the hierarchy that has a complete pair — so two homes in the
same sub-city with no pin will stack on the same point.

**Notifications** are a real table now. Moderating a listing notifies its owner.
Everything is scoped to the session user.

---

## 5. Design system

Both frontends share semantic tokens declared in `@theme` in their `globals.css`:

```
primary / primary-hover / accent
canvas / surface / line
ink / body / muted
text-label / text-micro
radius-control / radius-card / radius-panel
```

Use these, not hex. There are **zero bracketed hex values** left in
`product-website` and `admin-dashboard`, and only two in `client` (a device-mock
bezel, intentionally not a brand colour).

`.font-mono-label` means "quiet supporting text". It used to apply
`text-transform: uppercase` with `0.14em` tracking to all ~155 usages, which is
what made the site read as AI-generated. **Do not reintroduce uppercase**; write
sentence case in the markup. `.label-caps` exists for the rare deliberate case.

Primitives live in `components/ui/` in both apps — `Button`, `Input`, `Select`,
`Textarea`, `Badge`, `Skeleton`, `Panel`, and in admin also `DataTable`,
`EmptyState`, `ErrorNotice`. Extend these rather than writing new class strings.

`components/avatar.tsx` (duplicated in both apps) attempts the image and falls
back to initials only on load failure, which handles broken R2 links and the
legacy placeholder path without special-casing URLs.

---

## 6. Conventions that keep lint clean

All three apps run `npm run lint` with **0 errors**. Two rules bite repeatedly:

**`react-hooks/set-state-in-effect`.** Never call `setState` synchronously in an
effect body. The pattern used throughout:

```ts
useEffect(() => {
  let cancelled = false;
  (async () => {
    await Promise.resolve();        // so the first write is not synchronous
    if (cancelled) return;
    setLoading(true);
    try { ... } finally { if (!cancelled) setLoading(false); }
  })();
  return () => { cancelled = true; };
}, [deps, nonce]);
```

Retry is a `nonce` counter incremented from an event handler.

**`react-hooks/refs`.** Don't assign `ref.current` during render; sync it in an
effect.

Remaining warnings are almost all `<img>` vs `next/image` — see §2.4, they are
intentional.

---

## 7. How to verify things locally

```bash
# API (note the entry path)
cd services/api && npm run build && PORT=4010 node dist/src/main.js

# point a frontend at it
echo "NEXT_PUBLIC_API_URL=http://localhost:4010/api/v1" > product-website/.env.local
```

Backgrounding with `&` from the shell tool does not persist; use PowerShell
`Start-Process`. The API takes ~20–30s to accept connections (Supabase connect),
so poll rather than sleeping once.

Useful checks:

```bash
# guards behave
curl -s -o /dev/null -w '%{http_code}' $API/admin/overview                      # 401
curl -s -o /dev/null -w '%{http_code}' -H "Authorization: Bearer $USER" ...     # 403
curl -s -o /dev/null -w '%{http_code}' -H "Authorization: Bearer $ADMIN" ...    # 200
```

A token can be forged locally for testing as
`betterauth-session-<real-user-uuid>-<epoch-ms>` — which is itself a reminder
about §3.

---

## 8. Known data issues (not blocking, worth cleaning)

- **6 property images are base64 `data:` URLs** stored during the R2 outage (up
  to 232 KB each). They will not render in `<img>` reliably and bloat responses.
  Re-upload them to R2 and repoint the rows.
- **Duplicate location names across levels** — Atlas, CMC, Kazanchis, Lideta,
  Piazza, Sarbet each exist as *both* a `sub_city` and a `neighborhood`, plus
  `Bole` vs `Bole Sub City` and `Nifas Silk` vs `Nifas Silk-Lafto`. Two seed
  generations layered on top of each other. Cosmetic; no property references the
  duplicates. Repoint references before merging any.
- **Only Addis Ababa is parented to the `Ethiopia` country row**; the other five
  cities sit at the root. Harmless — the cities controller filters by
  `type: "city"` — but inconsistent.

---

## 9. Git

- Conventional commits, one logical change each.
- **Never rewrite, squash, reset or delete existing commits.** (Standing
  instruction from the owner.)
- **No `Co-Authored-By` trailers.** (Also standing.)
- Watch `git add` scope — a couple of commits this session bundled more than
  their message describes because `git add <dir>` was too broad. Stage explicit
  paths.
- Never commit `.env`, R2 or Supabase credentials. `.env.example` is gitignored
  repo-wide, which is why it cannot be committed.

---

## 10. State at handover

Working tree clean. **5 commits unpushed.** Both the API and the frontends need
redeploying — the favorites, notifications, public-profile endpoints and the
pending-review policy are all server-side.

Verified at handover: all three apps build (17 / 17 / 14 routes), 0 lint errors,
**41 routes smoke-tested 200 against a live API with 0 server errors**, and every
form control in all three apps has an accessible name.

Not verified: anything requiring a real browser. There is no browser tooling in
this environment, so interaction — clicking a map marker, dragging the publish
pin, watching tiles load, the mobile list/map toggle — has never been observed,
only reasoned about and type/build-checked.
