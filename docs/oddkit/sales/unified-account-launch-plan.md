---
uri: klappy://docs/oddkit/sales/unified-account-launch-plan
title: "Unified Account Launch Plan — Customer Surface, All Tiers, One Lovable Build"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: draft
tags: ["docs", "oddkit", "sales", "accounts", "billing", "stripe", "supabase", "lovable", "founding-ambassador", "mission-rate", "referrals", "build-spec", "execution-contract", "epoch-9"]
epoch: E0009
date: 2026-05-16
derives_from: "canon/constraints/borrow-evaluation-before-implementation.md, canon/constraints/guide-posture.md, canon/voice/oddie-the-river-guide.md, canon/constraints/ai-voice-cliches.md, canon/principles/use-only-what-hurts.md, canon/principles/vodka-architecture.md, canon/principles/methodology-personification.md"
complements: "odd/handoffs/2026-05-16-mcp-bearer-token-middleware.md, https://oddkit.dev/ (authoritative tier copy + pricing + design), workers/src/sales-page.ts (klappy/oddkit)"
governs: "Every artifact produced by the customer-surface build session — Supabase schema, Stripe products + prices, Lovable React app routes, application forms, admin queue, referral system, BYO Anthropic key field, ToS + privacy pages. Defines what ships, what does not, and what the build session is forbidden to invent."
status: active
---

# Unified Account Launch Plan — Customer Surface, All Tiers, One Lovable Build

> One Lovable build ships the entire customer surface in a single session: Supabase as identity provider and database, Stripe Checkout for the four paid tiers (Personal, Pro, Team, Team Pro × monthly/annual = 8 SKUs), application flows for Mission and Founding Ambassador, referral URLs with free-month coupons + bonus-token ledger, encrypted BYO Anthropic key field that stores dormant, and ToS + privacy pages at the payment surface. Tier copy and pricing are not duplicated here — the build reads them from `https://oddkit.dev/`. This doc binds *what is built* and *what is not built* (metering, MCP middleware, managed inference) so the session ships without scope creep.

---

## Summary

The customer surface is the recon Ian Lindsley named — infrastructure that compounds across every future Klappy and Covenynt Venture paid product. This plan collapses the previously-staged tier-launch sequence into one build: every tier ships tonight, with paying tiers wired to Stripe Checkout and application tiers wired to admin review. The substrate is borrowed (Supabase + Stripe + Lovable); the build column is minimal and traceable to specific gaps (see §6B). Metering does not exist; everyone is effectively unlimited; this is an internal commitment, never advertised. Grandfathering of current prices for current customers is permanent policy, also internal, also not page copy. The MCP-server-side authentication slice is intentionally out of scope here and lives in its own handoff: `klappy://odd/handoffs/2026-05-16-mcp-bearer-token-middleware`.

The build target is a Lovable project pointed at a single Supabase project (production tenant), wired to Stripe (Checkout + Customer Portal + Webhooks), served from `account.klappy.dev`. Cookies on `.klappy.dev` cover every klappy.dev subdomain; MCP servers across `oddkit.klappy.dev`, `aquifer.klappy.dev`, `oddkit.dev`, and future TruthKit endpoints validate the same Supabase-issued JWTs and PATs via the bearer-token middleware specified in the companion handoff.

---

## Goal

Ship the entire customer surface tonight: account creation, sign-in (email magic link + Google OAuth), tier selection, payment for buyable tiers, application for free or discounted tiers, referral mechanics, and admin review queue. After this build, anyone arriving at `https://oddkit.dev/` can:

- Create an account
- Pay for Personal, Pro, Team, or Team Pro (monthly or annual)
- Apply for Mission rate (50% off any tier, lifetime)
- Apply for Founding Ambassador (FA — free Personal now, free Pro for 3 years or until $10K MRR, 50% off Pro perpetual after the trapdoor)
- Share a referral URL that awards bonus tokens + free months on conversion
- Submit a BYO Anthropic API key that stores encrypted and dormant until metering is wired

The session that builds against this doc ships when the acceptance criteria below all pass. Anything beyond that is scope creep and triggers reversion.

---

## Stack

| Layer | Substrate | Role |
|---|---|---|
| Identity provider | Supabase Auth | Email magic link + Google OAuth; issues JWTs with custom claims; manages sessions and refresh tokens |
| Database | Supabase Postgres | Users, profiles, tier subscriptions, application queue, referral ledger, PAT hash table, encrypted Anthropic keys |
| Billing | Stripe (Checkout + Customer Portal + Webhooks) | Subscription lifecycle, coupon application, refund + cancel via Customer Portal |
| Frontend | Lovable (React + Tailwind, Supabase JS client, Stripe Elements) | Account dashboard, admin queue, application forms, signup pages |
| Email | Resend (called from Supabase edge functions) | Transactional: signup confirmation, application acknowledgment, FA approval, Mission approval, conversion-credit awards |
| Encryption at rest | Supabase Vault (or pgcrypto with server-side master key) | Anthropic API key storage |

**Domain:** `account.klappy.dev` (Lovable project, DNS pointer). The marketing site at `oddkit.dev` stays public/cookieless. MCP servers remain on their existing hosts; nothing about this build touches them.

---

## Data model

Authoritative schema. RLS policies sketched per table; Lovable + Supabase migrations are the implementation surface.

### `profiles` (extends `auth.users`)

```sql
CREATE TABLE profiles (
  user_id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name      TEXT,
  org_name          TEXT,
  org_type          TEXT CHECK (org_type IN (
                      'bible-translation','faith-based-mission',
                      'open-source-maintainer','theological-education',
                      'church-or-ministry-network','other'
                    )),
  heard_via         TEXT,
  referral_code     TEXT UNIQUE NOT NULL DEFAULT replace(replace(rtrim(encode(gen_random_bytes(6),'base64'),'='),'+','-'),'/','_'),
  referred_by       UUID REFERENCES auth.users(id),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**RLS:** users read/update own row; admins (role check) read all.

### `tier_interests`

The single table that absorbs both subscriptions and application state. One row per tier per user.

```sql
CREATE TABLE tier_interests (
  id                    BIGSERIAL PRIMARY KEY,
  user_id               UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier                  TEXT NOT NULL CHECK (tier IN (
                          'personal','pro','team','team-pro',
                          'mission','founding-ambassador','not-sure'
                        )),
  status                TEXT NOT NULL CHECK (status IN (
                          'waitlist','pending-review','active',
                          'invite-failed','declined','cancelled'
                        )),
  status_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  stripe_subscription_id TEXT,
  fa_state              TEXT CHECK (fa_state IN (
                          'pre-personal','personal-comped',
                          'pro-comped-countdown','pro-discounted-perpetual'
                        )),
  fa_trapdoor_at        TIMESTAMPTZ,
  fa_case_study_due_at  TIMESTAMPTZ,
  fa_case_study_url     TEXT,
  notes                 TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, tier)
);
CREATE INDEX idx_tier_interests_status ON tier_interests(tier, status);
```

**RLS:** users read own rows; admins read/update all; users cannot directly update `status`, `fa_state`, `fa_trapdoor_at`, or `stripe_subscription_id`.

### `fa_applications`

The narrative + commitment layer for Founding Ambassador applications. Joined to `tier_interests` via the user; one row per applicant.

```sql
CREATE TABLE fa_applications (
  id                    BIGSERIAL PRIMARY KEY,
  user_id               UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  why_you_why_now       TEXT NOT NULL CHECK (length(why_you_why_now) BETWEEN 50 AND 500),
  public_handle         TEXT,
  case_study_commitment BOOLEAN NOT NULL,
  reviewer_notes        TEXT,
  decision              TEXT CHECK (decision IN ('pending','approved','declined')) NOT NULL DEFAULT 'pending',
  decided_at            TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### `mission_applications`

```sql
CREATE TABLE mission_applications (
  id              BIGSERIAL PRIMARY KEY,
  user_id         UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  org_name        TEXT NOT NULL,
  org_type        TEXT NOT NULL,
  description     TEXT,
  reviewer_notes  TEXT,
  decision        TEXT CHECK (decision IN ('pending','approved','declined')) NOT NULL DEFAULT 'pending',
  decided_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### `pats` — Personal Access Tokens

```sql
CREATE TABLE pats (
  id            BIGSERIAL PRIMARY KEY,
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label         TEXT NOT NULL,
  hash          TEXT NOT NULL,
  prefix        TEXT NOT NULL,         -- first 16 chars of the token; used for indexed lookup before bcrypt verify, also shown for display ("oddkit_ab12cd34...")
  last_used_at  TIMESTAMPTZ,
  revoked_at    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_pats_prefix ON pats(prefix) WHERE revoked_at IS NULL;
```

Hashing uses `pgcrypto.crypt()` with a bcrypt salt. Comparison is constant-time. **Never store the plaintext.** Return plaintext once at creation; show prefix thereafter.

### `anthropic_keys` — BYO key vault

```sql
CREATE TABLE anthropic_keys (
  user_id       UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  key_encrypted BYTEA NOT NULL,        -- vault.encrypted_secrets or pgsodium
  key_last4     TEXT NOT NULL,         -- display only
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

Encrypt with Supabase Vault (preferred) or pgsodium with a project-wide encryption key. Stored dormant; consumed by future metering/managed-inference paths.

### `referrals`

```sql
CREATE TABLE referrals (
  id                BIGSERIAL PRIMARY KEY,
  referrer_user_id  UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_user_id  UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  converted_at      TIMESTAMPTZ,        -- when referred_user first paid
  bonus_tokens      BIGINT NOT NULL DEFAULT 0,  -- 1_000_000 or 2_000_000 (mission)
  free_months_credited INT NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (referred_user_id)
);
```

### `credit_ledger` — for bonus tokens awarded but not yet consumable

```sql
CREATE TABLE credit_ledger (
  id          BIGSERIAL PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind        TEXT NOT NULL CHECK (kind IN ('bonus_tokens','signup_bonus','adjustment')),
  amount      BIGINT NOT NULL,        -- positive = credit, negative = consumption
  source      TEXT NOT NULL,          -- 'referral:<id>', 'admin:<reason>', etc.
  consumed_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_credit_ledger_user ON credit_ledger(user_id, consumed_at);
```

Awarded tonight; consumption deferred until metering exists. Customers do not lose anything.

### Triggers

- **On Stripe webhook `customer.subscription.created` or `.updated`:** upsert `tier_interests` row to `status='active'`, set `stripe_subscription_id`, and write the entitlements list to `auth.users.raw_app_meta_data` via `auth.admin.updateUserById`. Stored shape: `{"entitlements": ["personal_active","pro_active","fa_personal_comped","mission_50pct"]}`. Supabase surfaces `raw_app_meta_data` in the issued JWT under the `app_metadata` claim, so consumers read it as `app_metadata.entitlements` (not as a top-level `entitlements` claim). Additive list; MCP servers ignore unknown entries today.
- **On Stripe webhook `customer.subscription.deleted`:** flip the row to `status='cancelled'`, remove the corresponding entitlement claim.
- **On `referrals.converted_at` set:** insert `credit_ledger` row for the referrer (+1M tokens, or +2M if referrer's profile has mission status); if this is the 2nd, 4th, 6th, etc. conversion for that referrer, also apply a Stripe coupon for 1 free month on their active subscription via Customer Portal API.

---

## Routes and pages

All routes are inside the Lovable React project at `account.klappy.dev`.

### Public

- `/signup?tier=<tier>&ref=<referral_code>` — account creation. Captures `tier` and `referred_by` from URL. Email magic link or Google OAuth. After confirmation, redirects to tier-specific next step.
- `/signin` — magic link / OAuth sign-in.
- `/privacy` — privacy policy (what we collect, retention, who sees it, deletion contact).
- `/terms` and `/terms/early-access` — full ToS plus an "Early Access Agreement" addendum covering the period before metering and managed-inference ship.
- `/apply/founding-ambassador` — application form, post-signup. Pre-fills if signed in; otherwise prompts signup first.
- `/apply/mission-rate` — application form, post-signup. Same signup-gate behavior.

### Authenticated (user)

- `/account` — dashboard: active subscriptions, application status, referral link + earned credits, Anthropic key field, Customer Portal link, sign-out.
- `/account/checkout/<tier>?cadence=monthly|annual` — initiates Stripe Checkout for the chosen tier. After success, returns to `/account` with the new `tier_interests` row active.
- `/account/apply/<tier>` — wraps the application forms with the signed-in user.

### Admin (Supabase Auth role `admin`)

- `/admin` — queue: pending FA applications, pending Mission applications, recent signups, active subscriptions. Filterable by tier, status, date.
- `/admin/fa/<id>` — review screen: applicant profile, narrative, public handle, case-study commitment, slot counter ("3 of 10 approved, 7 remaining"), approve/decline actions. Approve creates a Stripe customer + 100%-off subscription on Personal, schedules the Pro state machine, sets `fa_case_study_due_at = now() + 90 days`.
- `/admin/mission/<id>` — review screen: applicant profile, org details. Approve attaches a 50%-off-forever coupon to the user's Stripe customer; future Checkout flows apply it automatically.
- `/admin/users` — search by email, view subscriptions and credit history.

### Edge functions (Supabase)

- `POST /functions/v1/stripe-webhook` — verifies signature via `stripe.webhooks.constructEvent`, dispatches to the triggers above.
- `POST /functions/v1/create-pat` — issues a new PAT for the authenticated user, returns plaintext once, stores hash.
- `POST /functions/v1/anthropic-key` — encrypts and stores the user's Anthropic API key. Dormant.
- `POST /functions/v1/launch-tier` — admin-only. Transactional: snapshot waitlist cohort, send invite emails via Resend, flip statuses. Not needed at v1 since all tiers launch simultaneously; **stub it but do not wire it now.**

---

## Tier definitions and Stripe products

Tier copy, pricing, and feature lists live on `https://oddkit.dev/` and **must not be duplicated here.** The Lovable build fetches the live page (or the source at `klappy/oddkit:workers/src/sales-page.ts`) for marketing strings.

Stripe products (one per buyable tier, with monthly and annual prices each):

| Stripe Product | Tier | Monthly Price ID | Annual Price ID | Metadata `tier` | Metadata `cadence` |
|---|---|---|---|---|---|
| `oddkit_personal` | Personal | `$19.00/mo` | `$179.00/yr` | `personal` | `monthly` / `annual` |
| `oddkit_pro` | Pro | `$49.00/mo` | `$469.00/yr` | `pro` | `monthly` / `annual` |
| `oddkit_team` | Team | `$29.00/mo` (2-seat min) | `$279.00/yr` | `team` | `monthly` / `annual` |
| `oddkit_team_pro` | Team Pro | `$59.00/mo` (2-seat min) | `$569.00/yr` | `team-pro` | `monthly` / `annual` |

Stripe coupons used by the application tiers:

| Coupon ID | Use |
|---|---|
| `mission_50pct_forever` | Applied to any subscription for an approved Mission applicant. Forever, lifetime. |
| `fa_personal_100pct_forever` | Applied to Personal subscriptions for approved FA. |
| `fa_pro_100pct_3y` | Applied to Pro subscriptions for approved FA. 3-year duration. |
| `fa_pro_50pct_forever` | Replaces `fa_pro_100pct_3y` after trapdoor fires. |

**Trapdoor mechanic:** when Covenynt MRR (computed via Stripe API) crosses $10,000, a scheduled task (or admin trigger) swaps every FA in `fa_state='pro-comped-countdown'` to `fa_state='pro-discounted-perpetual'`, replacing `fa_pro_100pct_3y` with `fa_pro_50pct_forever` on their subscriptions. Same trigger fires automatically on the 3-year anniversary of each FA approval if MRR is still under $10K.

---

## Application flows

### Mission

Form fields: `org_name` (required), `org_type` (required enum), `description` (optional). Stores in `mission_applications`. Email confirmation to applicant via Resend. Admin reviews at `/admin/mission/<id>`. On approval: attach `mission_50pct_forever` coupon to the user's Stripe customer (creating the customer if absent); user can now check out at any tier and the coupon applies automatically.

### Founding Ambassador

Form fields:

- `org_name` (required) — for the one-per-org cap.
- `why_you_why_now` (required, 50–500 chars).
- `public_handle` (optional) — Twitter, GitHub, LinkedIn, personal site.
- `heard_via` (optional).
- `case_study_commitment` (required boolean) — "I commit to publishing a case study within 90 days of approval, including a logo and quote oddkit may use publicly."

Submission stores in `fa_applications`. Email confirmation via Resend. Admin reviews at `/admin/fa/<id>`. The admin UI shows "X of 10 slots approved, Y remaining" computed live; approval is **blocked at the UI and the database trigger level** if 10 are already approved.

On approval, the system:

1. Creates a Stripe customer for the user (if absent).
2. Inserts a `tier_interests` row: `tier='founding-ambassador'`, `status='active'`, `fa_state='personal-comped'`, `fa_case_study_due_at = now() + 90 days`.
3. Creates a Personal subscription with `fa_personal_100pct_forever` coupon, $0 due.
4. The Pro state-machine kicks in when Pro launches; until then, the FA holds Personal access.

Note that "Personal launches when Personal launches" is a future event in the original H1 contract, but in this build everything launches tonight — so FA approval immediately yields Personal access **and** (if Pro is also live) Pro access with the 3-year `fa_pro_100pct_3y` coupon. The state machine moves accordingly. Operator confirms the simultaneous-launch posture before approving the first FA application.

---

## Referrals

- Every authenticated user has a `referral_code` (8-char base64url, generated at profile creation).
- Sharable URL: `https://account.klappy.dev/signup?ref=<referral_code>` and `https://oddkit.dev/?ref=<referral_code>` (the marketing site pre-stuffs the `ref` query param into all CTA links).
- On signup with `?ref=<code>`, the new user's `profiles.referred_by` is set.
- On the new user's first paid subscription, a trigger:
  - Inserts a `referrals` row with `converted_at = now()`.
  - Awards `bonus_tokens`: 1,000,000 (or 2,000,000 if referrer is mission-rate approved).
  - Inserts a `credit_ledger` row for the referrer.
  - If this is the referrer's 2nd, 4th, 6th… conversion in a rolling year, applies a 1-month-free coupon to the referrer's active subscription via Stripe Customer Portal API.
- Cap: 12 free months per rolling year per referrer.
- Credits expire 6 months from issuance.

**Bonus tokens are awarded tonight but consumed nowhere.** When metering ships, the meter reads `credit_ledger` and decrements unconsumed credit before charging. This is documented in the ToS Early Access Addendum.

---

## BYO Anthropic key

The `oddkit.dev` page advertises BYO Anthropic key as required at Personal and Team and optional at Pro and Team Pro (managed alternative at cost+15%). The dashboard ships with a key-input field tonight; the key encrypts to `anthropic_keys` and sits dormant. No MCP server reads it yet. When metering and managed-inference paths ship, this is the existing storage layer they pick up.

UI: single password-style input ("sk-ant-…"), validation that the prefix matches Anthropic's expected format, masked display of last 4 chars after submission, "Replace key" action, "Remove key" action.

---

## ToS and privacy

Two pages, both required at the payment surface (Checkout cannot complete without a checkbox).

### `/terms`

Standard SaaS ToS. Lovable scaffolds; operator reviews. Reference points: subscription terms, refund window (Stripe Customer Portal handles), cancellation, acceptable use, governing law (FL, USA — per Covenynt registration in Saint Cloud, FL).

### `/terms/early-access`

Single-page addendum naming:

- What is included today: authenticated access to the existing oddkit MCP servers (`oddkit.klappy.dev`, `oddkit.dev/mcp`) plus future tier-specific features as they ship.
- What is coming: usage metering, managed-inference path, Oddie agent runtime for Pro+, workspace features for Team+, multi-org features for Team Pro.
- Founding pricing commitment: today's prices are locked for today's subscribers for the lifetime of their account. Internal commitment; appears in the agreement as a customer-facing promise.
- Refund policy: full refund within 30 days, no questions; pro-rated refund thereafter via Customer Portal.

### `/privacy`

What is collected (email, name, optional org info, optional Anthropic key encrypted, IP, user-agent, Stripe customer ID), how long (lifetime of account + 30 days), who sees it (Klappy, named admin staff under NDA), deletion contact (`hello@klappy.dev`), GDPR/CCPA acknowledgment (data export + deletion on request, response SLA 30 days).

---

## Out of scope — what the build session must not invent

- **Usage metering.** Does not exist today. Bonus tokens accumulate in `credit_ledger`; nothing reads them. **Do not build metering.**
- **Managed-inference path.** Stripe products exist, but the Anthropic-API-cost-pass-through code is not built. The `anthropic_keys` table stores keys dormant. **Do not build the managed-inference proxy.**
- **MCP-server-side bearer-token validation.** Lives in `klappy/oddkit`, `klappy/aquifer`, and future TruthKit Worker repos. Specified in `klappy://odd/handoffs/2026-05-16-mcp-bearer-token-middleware`. **Lovable does not touch this.**
- **Oddie agent runtime.** Pro feature, not built.
- **Workspace / team-member invitation flows.** Team and Team Pro purchase works, but the multi-member invitation UX is a follow-on. At v1, a Team purchase shows "Workspace seats: 1 of unlimited — invitations coming soon" in the dashboard.
- **`launch-tier` cohort-blast function.** Stubbed, not wired. All tiers launch simultaneously tonight, so no cohort sweep is needed.
- **Email metering / Loops integration.** Resend handles transactional only.

---

## Internal commitments (not page copy)

These bind the operator and the build, not customer-facing copy.

- **Metering is the first post-launch build priority.** Until it ships, every paying user has effectively unlimited usage. The platform is blind. Do not advertise this and do not panic about it.
- **Grandfathering is permanent policy.** Anyone paying tonight is never re-priced if rates change later. Stripe price changes apply only to new subscribers; existing subscribers stay on their original price IDs forever. The Early Access Agreement names this; canon binds it.
- **Apple 🦦 emoji, "Covenynt Venture" spelling, banned phrases ("vibe coder", "vibe coding")** carry over from the sales page. The Lovable scaffold inherits the brand by copying the design from the live page.

---

## 6B Evaluation — Customer surface (Table A)

This satisfies `klappy://canon/constraints/borrow-evaluation-before-implementation` for the customer-surface implementation task.

**Candidate substrates inventoried:** Supabase, Clerk, Auth0, WorkOS, Stytch, Firebase Auth, Cognito, NextAuth, Lucia (identity + DB); Stripe, Paddle, LemonSqueezy (billing); Lovable, Retool, Supabase Studio, Bolt.new, v0.dev, shadcn-ui templates (UI scaffold).

| Step | Verdict | Justification |
|---|---|---|
| Borrow | `applied` | `@supabase/supabase-js` (auth + Postgres + RLS + OAuth providers); `stripe` (Checkout + Customer Portal + Webhooks); Lovable as the React scaffold pointed at Supabase. Used via documented public APIs. |
| Bend | `applied` | Supabase `auth.users` extended via `profiles` and `tier_interests` per §Data model. Stripe Customer linked to Supabase `user_id` via metadata. Lovable theming over default scaffold to match `https://oddkit.dev/`. |
| Break | `none-yet` | Borrow not yet executed. Anticipated friction zones (real only when hit): custom-claims propagation latency on subscription change; Lovable regenerative editing fighting hand-written code as the app matures; Stripe webhook idempotency under CF Worker limits if webhook handler ever moves off Supabase edge functions. |
| Beget | `n/a` | No subcomponent delegated to an outside party. Supabase/Stripe/Lovable maintainers carrying their layers is Borrow, not Beget. |
| Bide | `inspected-and-adopted` | Field converged years ago on managed auth + db + billing. Inspection: vision-aligned (Postgres + JWT + RLS more durable than handroll); no foundational gap; no overcomplication; no improper authority (Supabase doesn't dictate runtime or frontend); no opinionated-stack imposition (works with CF Workers, Lovable React, and any future frontend). |
| Build | `minimal` | Four pieces, each tied to a named gap, each authored via Lovable prompts and operator review: (1) Stripe-webhook → Postgres trigger writing `entitlements` to `raw_app_meta_data` (~20 lines SQL); (2) PAT issuance UI + Supabase RPC for mint/hash (~50 lines); (3) FA state-machine triggers for the coupon transitions and trapdoor (~30 lines SQL); (4) Lovable theming + brand match (TBD). |

> Reversibility: forward = high (Supabase → `pg_dump` to any Postgres; Lovable → export React to GitHub; Stripe → data export keyed to `customer_id`; no proprietary lock-in beyond data schema); backward = high (handroll remains buildable later, but is the weeks-of-work cost we are knowingly *not* paying now).

---

## Acceptance criteria

The build session ships when every line passes:

1. New visitor to `https://account.klappy.dev/signup` can sign up via email magic link and via Google OAuth.
2. After signup, the user can purchase Personal monthly via Stripe Checkout; the resulting `tier_interests` row appears with `status='active'` and `stripe_subscription_id` set; the user's JWT carries the `entitlements` claim.
3. The same flow works for Pro, Team, Team Pro, both monthly and annual cadences — 8 SKUs verified.
4. The user dashboard at `/account` displays the active subscription, the referral URL, the BYO Anthropic key field, and a working Customer Portal link.
5. The Mission application at `/apply/mission-rate` accepts a submission, stores it in `mission_applications`, and emails the applicant a confirmation.
6. The FA application at `/apply/founding-ambassador` accepts a submission with the case-study checkbox required and the narrative length-bounded; stores it in `fa_applications`; emails confirmation.
7. The admin user can sign in at `/admin`, see the pending applications, and approve or decline each. Approval of a Mission application attaches the `mission_50pct_forever` coupon and confirms the discount applies at next Checkout. Approval of an FA application creates a $0 Personal subscription, sets `fa_state='personal-comped'`, and shows "N of 10 slots remaining" decrementing live.
8. A referral signup with `?ref=<code>` records the relationship; the first paid conversion awards a `credit_ledger` row; the second conversion applies a 1-month-free coupon to the referrer's active subscription.
9. The BYO Anthropic key field accepts a key, validates the format, encrypts to `anthropic_keys`, and displays the last 4 chars masked.
10. The ToS, Early Access Agreement, and Privacy pages render at `/terms`, `/terms/early-access`, `/privacy`. Stripe Checkout requires the ToS checkbox before completing.
11. All CTAs on `https://oddkit.dev/` and `https://oddkit.klappy.dev/` are rewritten to point at `https://account.klappy.dev/signup?tier=<tier>[&ref=<code>]` (this rewrite happens in `klappy/oddkit:workers/src/sales-page.ts` as a follow-on PR, not in the Lovable build).

---

## Design references

The brand is the live page. Lovable copies what is rendered there.

- **Authoritative visual surface:** `https://oddkit.dev/` — typography, color palette, spacing, component shapes, voice register all come from the rendered page. Lovable reads it (or its source at `klappy/oddkit:workers/src/sales-page.ts`) and matches.
- **Brand voice (when Oddie speaks):** `klappy://canon/voice/oddie-the-river-guide` — register, banned moves, signature moves. Oddie's voice is default-off in non-canon UI surfaces; the dashboard prose is plain and operational.
- **Guide posture (public-facing tone):** `klappy://canon/constraints/guide-posture` — the user is the hero, we are the guide. Applies to onboarding copy, confirmation states, error messages.
- **Anti-cliché constraint:** `klappy://canon/constraints/ai-voice-cliches` — patterns to avoid in any AI-assisted copy generation.
- **Brand identifiers:** Apple 🦦 (the otter emoji as rendered on Apple platforms, not line-art alternatives). Spelling: "Covenynt Venture" (not "Covenant Venture Studio"). Banned phrases: "vibe coder", "vibe coding".

---

## Lovable prompt — the actual one-liner to paste

```
Build the Covenynt customer surface per
klappy://docs/oddkit/sales/unified-account-launch-plan
(fetch via the oddkit MCP server in this Lovable session).

Match the visual style of https://oddkit.dev/ exactly —
typography, color palette, component shapes, voice.
Source for the marketing strings, tier copy, and pricing
is the live page; do not invent tier names, prices, or
benefit copy.

Stack is fixed: Supabase Auth + Postgres + RLS, Stripe
Checkout + Customer Portal + Webhooks, Resend for
transactional email, Supabase Vault for the encrypted
Anthropic key field.

For all cryptographically-sensitive code, use documented
patterns:
  - pgcrypto.crypt() for PAT hashing
  - stripe.webhooks.constructEvent() for webhook signature
  - Supabase Auth + RLS for session checks (no custom)
  - Supabase Vault or pgsodium for the Anthropic key

When in doubt, fetch the canon doc again and follow it.
Do not invent scope beyond the §Out of scope list.
```

---

## See also

- `klappy://odd/handoffs/2026-05-16-mcp-bearer-token-middleware` — the MCP-server-side companion (separate execution slice, separate repos)
- `klappy://canon/constraints/borrow-evaluation-before-implementation` — the 6B canon this doc satisfies
- `klappy://canon/constraints/guide-posture` — public-facing tone
- `klappy://canon/voice/oddie-the-river-guide` — brand voice
- `klappy://canon/constraints/ai-voice-cliches` — anti-patterns to avoid in copy
- `https://oddkit.dev/` — authoritative tier copy, pricing, and design
- `https://docs.stripe.com/checkout`, `https://supabase.com/docs/guides/auth`, `https://docs.lovable.dev/` — substrate documentation
