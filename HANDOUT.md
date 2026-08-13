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

### 2.1b Postgres CHECK constraints the schema file does not mention

Four columns are constrained in the database and nowhere in `schema.prisma`, so
an invalid value fails as a **500 at query time** rather than at validation:

```
new row for relation "visits" violates check constraint "visits_status_check"
```

| Column | Allowed |
|---|---|
| `visits.status` | requested, approved, accepted, declined, completed, cancelled |
| `properties.status` | pending, approved, rejected, sold, rented |
| `properties.listing_type` | rent, sale |
| `properties.property_type` | apartment, house, villa, commercial, land |
| `reports.status` | open, reviewing, resolved |

`accepted` and `declined` were added to the visits list by
`prisma/add-visit-statuses.ts`; the other four are as the database was seeded.

**`properties.property_type` is the one to watch.** The enrichment brief asks for
Studios, Offices and Penthouses as browse categories. Adding them to the publish
form without widening this constraint first would make every such submission
500. Check the constraint before adding a value to any of these lists:

```sql
SELECT conname, pg_get_constraintdef(oid) FROM pg_constraint
WHERE conrelid = 'public.properties'::regclass AND contype = 'c';
```

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
betterauth-session-<user-uuid>-<issuedAtMs>-<hmac>
```

The trailing 128-bit HMAC-SHA256 covers `<uuid>-<issuedAtMs>` and is keyed by
**`SESSION_SECRET`**, which must be set in the API environment — locally and on
Vercel. There is no fallback value; without it the API cannot issue or verify a
session and answers 500, deliberately, because a default signing key is a
published one. Generate with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

`src/common/session-token.ts` owns minting and verification. `SessionAuthGuard`
(`src/common/guards/session-auth.guard.ts`) verifies the signature *before*
touching the database, loads the user, rejects expired (>30 days) and suspended
accounts, and sets `request.user = { id, email, role, status }`. `RolesGuard`
reads `user.role`.

### Sessions issued before signing are rejected — and that used to be a trap

Signing tokens invalidated every session that existed beforehand, which is
correct. What was not handled is what the browser does next: the old token stays
in `localStorage`, `useSession` keeps reporting a signed-in user, and every
authenticated request answers **401 forever** with nothing in the interface to
explain it. The symptom is a wall of console errors and dead favourites and
notifications on an account that looks signed in:

```
/api/v1/notifications/unread-count  401
/api/v1/favorites/ids               401
```

`authedFetch` in `product-website/lib/api-client.ts` now carries every
authenticated call, and a 401 clears the stored session and fires
`delala_auth_change`, so the app drops to signed-out and says
"Your session has ended. Please sign in again." **Route new authenticated calls
through `authedFetch`, not bare `fetch`** — a call that bypasses it reintroduces
the trap for that one endpoint.

The same thing happens naturally to any session older than thirty days, so this
is not only a migration artefact.

Anything that needs the user id from a header must go through
`verifySessionToken`. `properties.controller.ts` used to re-parse the token with
its own regex, which meant listing ownership could be asserted by anyone able to
type a uuid.

Before this guard existed **nothing populated `request.user`**, so `RolesGuard`
always returned false and every guarded route answered 403 regardless of
credentials. If a guarded route mysteriously 403s, check the guard order:
`@UseGuards(SessionAuthGuard, RolesGuard)` — session first.

Grant staff access:

```bash
cd services/api
npm run make-admin -- someone@example.com   # no arg lists accounts + roles
```

### There is no email anywhere in this system

This is the single most confusing thing about the auth setup, so it is worth
stating plainly:

**Delala does not use Supabase Auth.** It writes rows into `auth.users` —
Supabase's own table — but rolls its own authentication in `auth.service.ts`.
`auth.users.encrypted_password` is empty for every row, and GoTrue's entire
recovery machinery (`recovery_token`, `confirmation_sent_at`, the Authentication
tab in the Supabase dashboard) is unused. That is why nothing about these
accounts appears in Supabase and why no recovery email is ever sent by it.

**There is also no mailer of any kind** — no SMTP, no Resend, no SendGrid, no
provider configured anywhere in `services/api`. Nothing in this system can send
an email to anybody.

**The reset flow is fully built and switches itself on the moment SMTP exists.**
`src/common/mailer.service.ts` reads its configuration from the environment and
disables itself cleanly when it is absent, so `POST /auth/forgot-password`
returns `{ delivered: false }` and says so rather than pretending. Set these and
it starts sending, with no code change:

```bash
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASSWORD=...
MAIL_FROM="Delala <no-reply@yourdomain.et>"
APP_URL=https://your-marketplace-domain     # used to build the reset link
```

Any SMTP provider works — Resend, Postmark, SES, or Gmail with an app password.
Reset tokens are 256-bit, stored **hashed** like passwords, single use, and
expire after an hour.

**There is deliberately no way for an administrator to set someone else's
password.** A password belongs to the person who chose it. That endpoint existed
briefly and was removed: recovery is the emailed link, and for the handful of
accounts predating password storage entirely, `npm run set-password` is the
operator tool — run against the database by someone with shell access, not
exposed as a button in a web UI.

The response never says whether an email has an account. Reporting "no such
account" would turn the endpoint into a way to enumerate who has one, so a
stranger's address and a real one produce the same answer.

### Passwords

Stored as a scrypt digest in `profiles.password_hash`, via
`src/common/password.ts`. Node's own `crypto.scrypt`, not bcrypt — no native
module to resolve differently in Vercel's build than it did locally. The digest
string carries its own cost parameters, so the work factor can be raised later
without invalidating existing passwords.

`profiles.password_hash` is **globally omitted in `PrismaService`**, because a
dozen services return `include: { profile: true }` straight to the client and an
opt-out list only has to be forgotten once. Login selects it explicitly, which
overrides the omit. Keep it that way.

`AuthService.login()` answers the same "Email or password is incorrect." for an
unknown email as for a wrong password, and hashes against a decoy digest when the
email does not exist so the two cost the same — otherwise the response time
re-introduces the account enumeration the shared message exists to prevent.

**Accounts created before this have a NULL digest and cannot sign in.** That is
deliberate; a NULL digest reads as "wrong password", never as "no password
required". There is no self-service reset, so the only way to give an existing
account a password is:

```bash
cd services/api
npm run set-password -- someone@example.com "a real password"   # no args lists who is locked out
```

#### What this replaced

`login()` used to look the user up by email and issue a token **without
consulting the password at all**, auto-registering unknown emails, and no
password hash was stored anywhere. Tokens were unsigned, so a session could be
assembled from a user id alone — and ids are public, returned as `brokerId` on
every property, so `GET /properties` was enough to take over any account. The
guards and role checks were real but sat on top of that.

Exposing `brokerId` is now harmless and stays, since the public poster profile
("other homes by this owner") is built on it. It is the signature, not the
secrecy of the id, that makes it safe.

#### Still open

- **No password reset flow.** `product-website/lib/auth-client.ts` calls
  `/auth/forgot-password` and `/auth/reset-password`; neither endpoint exists,
  and the client swallows the failure and reports success either way. A real one
  needs email delivery. `set-password` is the manual stand-in.
- Registration accepts any password of 6+ characters. No strength rules, no rate
  limiting on `/auth/login`.

---

## 3b. Data integrity — read before adding any trust feature

The marketplace used to invent every trust signal it displayed, in three layers
at once. This has been removed; the point of writing it down is that it was not
obvious from reading any single file, and it is easy to reintroduce.

What was fabricated, and where:

| Where | What it claimed |
|---|---|
| `properties.service.ts` `mapPropertyResponse()` | `generator/waterTank/parking/furnished/securityGuard/balcony` hardcoded `true` for every property |
| same | `broker.verified: true`, `rating: 4.9`, `reviewsCount: 12`, `responseTime: "Under 15 mins"` |
| same | `propertyType` defaulted to `"Villa"`; missing photos replaced with two stock interiors; nameless posters called `"Verified Owner"` |
| `properties.service.ts` `create()` | inserted two stock images when the poster uploaded none |
| `product-website/lib/api-client.ts` | invented *again* on top: `fieldAgentNotes: "Physically verified by Delala field inspector."`, `reviewsCount: 14`, `activeListingsCount: 8`, `languages`, `availableDate: "Immediate"` |
| `product-website/app/publish/page.tsx` | `DEFAULT_AMENITIES` sent `generator/waterTank/parking: true` on every submission, never shown to the poster |

None of those columns existed. The publish form collected amenity answers the
DTO declared, `create()` discarded them for want of columns, and the read path
asserted `true` regardless.

**The rules now:**

- Amenity columns are **nullable on purpose**. `null` = the poster was never
  asked (every listing predating this), `false` = asked and said no, `true` =
  yes. Render only `true`. Filters must test `=== true`, not truthiness, or an
  unknown becomes a yes.
- `profiles.phone_verified / identity_verified / business_verified` default
  **false**. Nobody is verified until a human verifies them. There is no admin UI
  for granting these yet — that is the next piece of the trust work.
- A listing's `approved` flag (from `status === "approved"`) is real, but it is a
  statement about the **listing** passing moderation, not about the poster. It is
  surfaced as "Reviewed", never "Verified". The frontend field was renamed
  `verified` → `approved` to stop the two ideas sharing a word.
- Poster rating and review count come from `GET /users/:id/public`, aggregated
  from real reviews, and are **null when there are none** — never 0, never 4.9.
- Listings with no photographs return `images: []` and render
  `components/property-photo.tsx`, which draws the absence honestly.

## 3c. Where the product stands against the enrichment brief

Audited against the marketplace enrichment brief. Backed by real data today:
properties, locations (Country → City → Sub-city → Neighborhood, with
coordinates), favorites, notifications, visits, moderation, amenities,
poster verification flags.

`Review` and `Report` now have public endpoints: `GET /reviews?propertyId=` or
`?posterId=`, `POST /reviews` (session required, cannot review your own listing,
one per property per person), and `POST /reports` (session required). Reports
join the structured reason and the free text into the single `reason` column the
admin queue already reads.

No model at all, in brief priority order: saved searches, guides/articles,
messaging, recently-viewed (localStorage is the right home — do not add
tracking), property view counts, market insights.

### Still to build from the enrichment brief

Done: data integrity, the query API, facets, reviews/reports endpoints, shared
loading/error/empty components, the homepage discovery sequence, Explore with
server-side filtering and paging, the safety centre, and report-a-listing.

Not started, in the brief's own priority order:

- **§4 navigation** — the header still predates the new sections; Explore, Buy,
  Rent, Locations and Guides are not in it, and there is no mobile nav to match.
- **§9 poster profiles** — `/profile/[id]` exists but does not yet show
  verification badges, the review list or poster statistics, all of which now
  have endpoints behind them.
- **§7 property detail** — gallery is single-image with thumbnails; no
  fullscreen viewer, no image count.
- **§10/§11 location pages** — `/cities/[city]` and `/neighborhoods/[slug]`
  work but are thin, and `Neighborhood` in `lib/types.ts` still declares
  invented fields (`securityScore`, `generatorPenetration`, `waterReliability`,
  `lifestyleTags`) with no columns behind them. **Do not start rendering those.**
- **§14 compare**, **§15 saved searches**, **§13 recently viewed**,
  **§18 guides**, **§19 market insights**, **§16 messaging**.
**Guides** (`/guides`, `/guides/[slug]`) are six long-form articles in
`product-website/lib/guides.ts`. A guide is `{ meta, sections[] }` and a section
is a heading plus typed blocks (paragraph, list, checklist, callout), which is
deliberate: moving the content into the database and the admin dashboard is then
a change of source, not a rewrite of the rendering. Add a guide by adding an
object — `generateStaticParams` prerenders whatever is in the array.

The writing is cautious about anything legal or numeric on purpose. Where a
figure varies by area or landlord it is described as a range people report
rather than stated as fact. **Do not add specific prices, deposit amounts or
legal requirements to these guides without a source** — an invented figure here
is the same failure as the 4.9 ratings this codebase was cleared of.

Note also: the footer used to link `propertyType=Studio` and `Penthouse`, which
the `properties_property_type_check` constraint makes impossible, so both always
landed on an empty result; and it advertised "100% Field Audited Homes", which
nobody does. Both are gone.

### Granting verification

The **Users** screen of the admin dashboard is the only thing in the entire
system that can set `phone_verified`, `identity_verified` or
`business_verified`. Nothing grants a badge automatically, deliberately — a
badge software awards itself is not evidence of anything. Each grant and each
revocation writes its own audit line.

Everything downstream is already wired to it: the badges on a poster profile,
the `broker.verification` block on every property payload, and the "posters who
have verified themselves" section of the homepage, which hides itself entirely
while nobody is verified. As of this writing **nobody is**, and that is the
correct state rather than a bug.

Only tick a box when you have actually seen the evidence. The labels on the
marketplace say precisely what each one claims.

Still missing, in priority order:

- **Writing a review has no UI.** `POST /reviews` works and both the property
  page and the poster profile render the list, but there is no form anywhere
  that calls it, so every review list is empty in practice. This is the smallest
  remaining gap with the largest effect on the trust surfaces.
- **§16 messaging** — no model, no endpoints, nothing. Contact is by phone.
- **§19 market insights** — nothing measures rents by area over time.
- **§34/§35 admin** — no single-property moderation view and no per-poster
  management screen; both currently mean moving between several tables.
- **§27 illustration system** — empty states use icons, not a coherent
  illustration language.
- `/neighborhoods/[slug]` is still thin, and `Neighborhood` in `lib/types.ts`
  still declares `securityScore`, `generatorPenetration`, `waterReliability` and
  `lifestyleTags` with no columns behind them. **Do not start rendering those.**

### Device-local features

Compare, recently viewed and saved searches live entirely in `localStorage` via
`lib/use-local-collection.ts`. That is deliberate for recently-viewed — §13 asks
for it without invasive tracking, and the honest way to honour that is for the
history never to reach the server.

Saved searches deliberately offer **no notifications**. There is no scheduled job
to re-run a search and no email delivery, so a toggle would be wired to nothing.

`GET /properties` now filters, sorts and pages **in Postgres**, and returns
`{ data, total, page, pageSize, totalPages }` rather than a bare array. The
client accepts both shapes, so a stale deployment of either side keeps working —
but new code should assume the page object.

Understood query params: `q` (free text over title, description, address and
location names), `city` / `subCity` / `neighborhood` / `locationId`,
`propertyType`, `listingType`, `minPrice` / `maxPrice`, `minArea` / `maxArea`,
`minBedrooms` / `minBathrooms`, the seven amenity flags, `verifiedOnly`,
`status`, `ownerId`, `sort` (`newest` | `oldest` | `price-asc` | `price-desc`),
`page`, `pageSize` (capped at 60).

Amenity filters only narrow when **true**. A false or absent flag must never
exclude a listing whose answer is null.

`GET /properties/facets` returns real counts by property type, listing type and
city. The homepage's "browse by type" and city ordering are built from it, so
neither advertises a category or an area with nothing in it.

`product-website/DESIGN.md` is a **scraped Airbnb style reference**, not Delala's
design system, and it contradicts the real tokens. The source of truth is the
`@theme` block in `app/globals.css` — it already carries the burgundy/sage/bronze
palette and the Manrope + Inter pairing. Do not follow DESIGN.md.

## 3d. Photography

There are two rules and one pipeline.

**Nothing is served at source resolution.** The master photographs live in
`/new-images` (gitignored, ~36 MB, 14 files). `product-website/scripts/build-images.mjs`
turns them into WebP derivatives at the widths each slot is actually rendered
at, and **those are committed** — the site builds and deploys without the
masters present. Adding a photograph means adding it to that script and to
`lib/imagery.ts`, then re-running:

```bash
cd product-website && node scripts/build-images.mjs
```

`next.config.ts` sets `images: { unoptimized: true }`, so Next resizes nothing
at request time. If you drop a raw 6000px JPEG into `public/`, that is exactly
what every visitor downloads. 36 MB of originals currently ship as 6.5 MB of
derivatives, and no single page loads more than a few hundred KB of it.

**Every photograph has a reason.** `lib/imagery.ts` maps a named slot — a job
on a page — to a file, alt text and a photographer credit. Components call
`<Photo slot="…" sizes="…" />`; `sizes` is a required prop precisely so nobody
forgets it and ships the 2400px file to a phone.

### Location cards carry no photography, deliberately

`components/city-card.tsx` is typographic and must stay that way. It previously
fronted each city with a generated image of itself. A photograph on a location
card is a claim about what that place looks like, and an invented one is a false
claim about a real city — Bole and Yeka are not interchangeable, and a stock
skyline standing in for either is worse than no picture at all. The card carries
the name, the hierarchy and the live listing count instead.

Deleted with them: `hero_property.png`, `hero_home_away.jpg` and `hero-img.jpg`,
which were **byte-identical to each other** — one photograph under three names,
two of them `.png` extensions on JPEG data.

### What the cities API used to invent

`cities.controller.ts` carried a hardcoded `startingRentETB` per city (35,000
for Addis Ababa, 22,000 for Hawassa …) and a `propertiesCount` that fell back to
24 / 12 / 9 whenever the real count came back empty — so a city with nothing in
it advertised two dozen listings. The count was empty most of the time because
it only counted properties attached *directly* to the city, and properties hang
off sub-cities and neighbourhoods.

Both are real now: the count rolls up the whole location subtree, and
`startingRentETB` is the genuine minimum price among those listings, or **null**
when there is nothing to measure. Never zero — that reads as "free".

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

Tokens can no longer be hand-assembled — get one by signing in:

```bash
curl -s -X POST $API/auth/login -H 'Content-Type: application/json' \
  -d '{"email":"someone@example.com","password":"..."}' | jq -r .token
```

If that account has never had `set-password` run for it, this returns 401. If
every request 500s instead, `SESSION_SECRET` is unset — see §3.

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

Working tree clean. Both the API and the frontends need redeploying — the
favorites, notifications, public-profile endpoints and the pending-review policy
are all server-side.

**Before deploying the API, in this order:**

1. Set `SESSION_SECRET` on Vercel (32+ chars). Without it every request 500s.
2. `npm run set-password -- <your admin email> "..."` — every account predates
   password storage and is otherwise locked out, including the admin one.

`password_hash` has already been added to the live database, so `prisma:migrate`
is not blocking this deploy. Every existing session is invalidated by the switch
to signed tokens; users sign in again once.

Verified at handover: all three apps build (17 / 17 / 14 routes), 0 lint errors,
**41 routes smoke-tested 200 against a live API with 0 server errors**, and every
form control in all three apps has an accessible name.

The auth changes were exercised against a live API on port 4010 — 13 checks,
all passing: forged and tampered tokens rejected, wrong passwords rejected,
unknown emails neither admitted nor auto-registered, valid sessions accepted,
`/auth/me` resolving, and no digest present in any response body. The throwaway
accounts those tests created were deleted afterwards.

Not verified: anything requiring a real browser. There is no browser tooling in
this environment, so interaction — clicking a map marker, dragging the publish
pin, watching tiles load, the mobile list/map toggle — has never been observed,
only reasoned about and type/build-checked.
