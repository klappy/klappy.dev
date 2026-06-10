---
uri: klappy://docs/explorations/relay-pricing-market-research
kind: docs
title: "Exploration: Relay Pricing — Market Research, Segments, Abuse Model, Upgrade Ladder, and the Usage Dashboard"
audience: docs
exposure: internal
tier: 3
voice: neutral
stability: draft
tags: ["exploration", "pricing", "market-research", "relay", "github-app", "abuse", "telemetry", "dashboard", "strategy"]
epoch: E0010
date: 2026-06-10
derives_from: "docs/explorations/credential-relay-as-product.md, docs/planning/pat-transcendence-github-app.md, canon/principles/maintainability-one-person.md"
complements: "canon/constraints/telemetry-governance.md"
governs: "Nothing yet — research input for the pricing and packaging decision. The $24/2yr Solo price is declared by the owner and treated as fixed; this document positions everything around it."
---

# Exploration: Relay Pricing — Market Research, Segments, Abuse Model, Upgrade Ladder, and the Usage Dashboard

> The owner has declared the entry price: $24 for two years, $1 a month. Market research confirms that number is not a revenue tier — it is a wedge, priced 29x below the cheapest paid comparable, and that is its job. The honest findings: (1) the comparables (Composio, Arcade, Nango) are platforms selling breadth at $29–$250+/mo; the relay sells one connector with depth, so it cannot price like them but can position against them; (2) revenue, if wanted, lives in tiers above the wedge — multi-agent identity, team provenance, and the governance flight deck — never in the minting commodity; (3) the abuse surface of the pricing model is structurally small because tokens only ever reach the purchaser's own installation: there is nothing to steal but load, and GitHub's own rate-limit physics (5K–12.5K req/hr per installation) caps each customer's blast radius; (4) the dashboard should reuse the oddkit telemetry pattern wholesale — counts and shapes, never contents — with customer-scoped data behind the same OAuth the connector already requires. All numbers as of 2026-06-10; comparable pricing changes often.

---

## Market Comparables — What the Adjacent Field Charges

The relay sits in the space press now calls agent authentication / authenticated tool calling. The relevant comparables, with sources, as of this writing:

**Composio** (composio.dev) — agent tool-calling platform, 1,000+ connectors, managed OAuth. Free tier at 20K tool calls/mo; paid at $29/mo for 200K calls ($0.299/1K overage); $229/mo for 2M calls; Enterprise custom with VPC and SOC 2. Sources: composio.dev/pricing, plans.apis.io, devtune.ai. Closest in spirit to a hosted relay, but selling breadth.

**Arcade.dev** — "authenticated tool calling," ~$12M seed (Laude, Flybridge, Madrona), ex-Okta founders. Engine sits between the agent and the API; the model never sees the credential. Pricing is developer/enterprise-shaped rather than published self-serve at consumer prices. Source: workos.com comparison, tooldirectory.ai. This is the venture-scale version of the same instinct.

**Nango** — open-source OAuth/integration infrastructure for B2B SaaS. Free tier; growth around $50/mo plus usage ($1 per connected account/mo, per-request fees); some trackers cite $250/mo starter. Self-host-first heritage like ours. Sources: merge.dev/blog/nango-pricing, saasworthy, checkthat.ai.

**Anchors outside the niche**: n8n cloud starts at €24/mo (the price of our two *years* buys their one *month*); Merge starts at $650/mo for 10 linked accounts. Indie-dev-tool subscriptions cluster at $5–$20/mo.

**What no comparable offers**: a $1/mo anything. The floor of the paid market is $29/mo. The relay's declared price is not competing in this market — it is refusing to, which is consistent with the guide posture: the comparables sell to companies building agents; the relay sells to a person in a chat.

**Cost basis check**: Cloudflare Workers paid plan is ~$5/mo base plus fractions of a cent per thousand requests. A heavy solo user minting 50 tokens/day generates ~1,500 worker requests/mo — marginal infrastructure cost per customer is on the order of a tenth of a cent monthly against $1/mo revenue. Stated the owner's way: infra costs could run 100–1000x and the wedge price still beats the market. Infrastructure is never the binding constraint on this pricing; the binding constraints are the operator's support attention and the one shared resource (App-level token-creation pacing against GitHub's secondary limits) — both bounded by design, not by price.

---

## User Segments — Who Shows Up at This Price

**S1 — Chat-first solo builder.** The essay's audience: works in plain Claude/ChatGPT conversations, sometimes from a phone, 1–10 repos, mints a handful of tokens a day. The $24/2yr price is below their decision threshold; they buy on impulse the day the PAT ritual annoys them. This is the wedge segment and the marketing segment — every one of them is a person who stops recommending PAT-pasting to others.

**S2 — Power indie / heavy automator.** Runs agents on schedules, many repos, hundreds of mints a day. Same product, 50x the load. At $1/mo they are unprofitable only if they create support burden; the fair-use quota (below) makes them either fine or an upgrade prospect.

**S3 — Small team (2–10 people).** Shared repos, multiple humans each running agents. The pain that money follows: *whose* agent did that? One bot identity stops being enough; they want per-agent or per-member provenance, an audit export, and someone to be the admin. This is the first real revenue tier.

**S4 — Org / regulated.** Wants SSO, retention guarantees, SOC 2 noises, and contractual support — or wants self-host with a support contract. Per maintainability-one-person, serve this segment with self-host + paid support and the governance layer, never with custodial promises.

---

## The Declared Price, Assessed Honestly

$24/2yr as the *only* price has two failure modes: heavy users (S2) consume support at wedge prices, and teams (S3) have no way to give us money for the thing they actually need. As the *entry* tier with a ladder above it, the same price is close to optimal:

- It kills the "I'll just self-host" objection by being cheaper than the time self-hosting takes — which is the point of the homepage line.
- Billed once per two years, payment-processing overhead (~$1 on $24) is a one-time ~4%, not a monthly tax.
- It anchors the brand as the anti-Composio: a person-priced tool in a venture-priced field.

**Recommendation**: keep $24/2yr exactly as declared, name it **Solo**, attach a generous-but-explicit fair-use mint quota, and build the ladder above it rather than ever raising it. Raising the wedge price later would burn the trust the wedge buys.

---

## Abuse Threat Model — How the Pricing Model Gets Gamed, and Why Mostly It Can't

The structural insight first: **a minted token only ever reaches the purchaser's own GitHub App installation.** There is no cross-customer value to steal. Unlike API-credit products (where a cheap account is arbitrage against an expensive resource), the relay's resource is access to repos the customer already owns. The abuse surface is therefore load and payments, not theft.

**T1 — Account sharing / resale.** One $24 account, a whole team behind it. Partial mitigation is inherent: everyone sharing it gets write access to the *same* installation's repos, which only makes sense for people who already share repos — i.e., S3 teams. So the mitigation is product, not policing: make the Team tier worth more than the shared-account workaround (per-agent identities, per-member provenance, admin view). Accept residual sharing as marketing.

**T2 — Mint-rate abuse / load.** Hammering `github_token` costs worker compute and risks GitHub secondary rate limits on the App's token-creation endpoint (shared across hosted customers — the one genuinely shared resource). Mitigations: per-customer mint quota (legit solo use is single-digit mints/day since tokens live an hour; a 100-mints/day soft cap with burst limiting inconveniences nobody honest), the ~50-minute scope-keyed token cache already in the plan, and paced token-creation per the GitHub community guidance (treat mint as a rare cached event, not per-request).

**T3 — Relay-as-cheap-proxy.** Using the $1/mo hosted relay as a free CI/API gateway at industrial scale. GitHub already caps this: each installation's tokens share that installation's 5,000–12,500 req/hr bucket, so industrial use throttles itself against the abuser's own ceiling, not ours. Our exposure is only mint traffic — covered by T2's quota.

**T4 — Payments.** Card testing against a $24 product, refund churn. Standard processor tooling (Radar-class rules, refund-once policy). Low severity at this price point.

**T5 — Customer bearer-token leakage.** The documented single boundary: a leaked MCP bearer lets an attacker mint over that customer's repos until revoked. Per-customer blast radius, already stated plainly on the homepage. Pricing-relevant additions: self-serve bearer rotation, revoke-all, and dashboard anomaly surfacing (new consumer label, unusual mint cadence) so the customer can see the compromise. These are dashboard features, which is part of why the dashboard exists.

**T6 — The dashboard itself as recon surface.** Usage data (repo names, scopes, cadence) is a map of what an attacker could take. Mitigation is the design rule below: customer-scoped data, behind the same auth as minting, counts-and-shapes only.

---

## Upgrade Ladder — Incentives Without Dark Patterns

The principle: every tier boundary should be a *capability* the next segment genuinely needs, never a degradation of the wedge. The wedge stays whole; the ladder adds.

- **Self-host — $0.** The on-ramp and the trust anchor. Same code, forever.
- **Solo — $24/2yr** (declared). Hosted minting, fair-use quota, one bearer, the usage dashboard, bot provenance.
- **Pro — order of $5/mo or $79/2yr.** For S2: higher mint quota, multiple named bearers (per-device/per-agent), usage alerts and anomaly notifications, longer telemetry retention (e.g. 12 months vs 90 days), priority mint lane during shared-resource contention.
- **Team — order of $5/seat/mo.** For S3: per-member/per-agent bot identities (the provenance feature, multiplied), admin console, audit export (CSV/JSON of mint history), org-level installs.
- **Steward / Org — custom, small.** For S4: self-host support contract, the governance flight deck (charter-scoped permissions, telemetry integration with their stack). Per the credential-relay exploration: this is where the moat was already judged to live; the ladder just gives it a rung.

Upgrade *incentive mechanics*: the dashboard is the salesperson. When a Solo customer hits 80% of fair-use, the dashboard says so and names the Pro quota — information, not interruption. When two consumer labels share one bearer, the dashboard notes that per-agent identities exist. No emails, no countdown timers, no feature removal. The numbers above are deliberately rough — the decision this doc feeds is shape, not cents.

---

## Telemetry and the Usage Dashboard — Observability That Stays Secure

Reuse the oddkit pattern wholesale; it is already governed, already public-policy'd, already running on Analytics Engine. The relay's mint events are the same shape as oddkit tool calls.

**What gets recorded per mint**: timestamp, installation id (hashed for any aggregate surface), repos requested (count always; names only in the customer-scoped dataset), permission set, consumer label (user-agent best-effort), TTL, cache hit/miss, duration. **Never recorded, anywhere, ever**: token values, JWT contents, bearer tokens, request/response bodies, repo contents. Same posture as the existing telemetry policy: which tools, how often — never what was said or carried.

**The dashboard** (a `/dashboard` route on the worker, behind the exact GitHub OAuth the connector already uses — no new auth surface, same single-boundary story):
- Mints over time; quota consumption against the fair-use line
- Scope shapes (which permissions, which repos — their own names, shown only to them)
- Consumer labels seen (the "is something else using my bearer?" view — this is T5's detection surface, framed as a feature)
- Rate-limit headroom against their installation's GitHub bucket
- Bearer management: rotate, revoke-all

**Security rules that make observability safe**: customer sees only their installation's slice; retention 90 days raw then aggregate-only (Pro extends retention, it never widens scope); public/aggregate telemetry (if the oddkit-style transparency leaderboard extends to the relay) carries counts and hashed identities only, opt-in for labels, identical to the existing policy. The dashboard reads from the same dataset the operator reads — no information asymmetry, which is already the house rule.

---

## Open Questions for the Captain

1. Is revenue actually wanted from this layer, or is the wedge the whole strategy and the ladder just optionality? (The exploration doc's moat answer — governance layer, not relay — suggests the ladder above Pro matters more than Pro itself.)
2. Fair-use quota number for Solo: propose 100 mints/day soft cap — generous enough to be invisible, real enough to bound T2. Bless or adjust.
3. Does the transparency leaderboard extend to the relay (oddkit-style public telemetry), or does the relay stay dashboard-only? Leaderboard is brand-consistent but widens the recon surface T6 worries about.
4. Team-tier bot identities: one App with per-agent attribution metadata, or App-per-team? The latter is cleaner provenance but heavier ops against maintainability-one-person.
5. The 6B borrow table from the prior exploration still gates any *build*: Stripe vs Lemon Squeezy vs GitHub Sponsors for the $24 checkout is itself a borrow decision.
