---
title: "Infra Config Is Seat Work — Deploy Is Push, Dashboard Is Not a HUMAN-ONLY Class"
kind: canon
tier: 1
status: ratified
date: 2026-09-02
audience: [agents, builders]
tags: [constraints, human-only, deploy, cloudflare, infra, recurring-miss]
see_also:
  - klappy://canon/constraints/dispatcher-dispatches-never-executes
  - klappy://canon/meta/enforceable-policy-anatomy
  - klappy://canon/constraints/policy-precedes-build
  - klappy://canon/values/trust-kernel
---

# Infra Config Is Seat Work — Deploy Is Push, Dashboard Is Not a HUMAN-ONLY Class

> A seat with an infrastructure API in reach configures that infrastructure
> itself. "Set it up in the dashboard" is never a handoff to the captain,
> because the dashboard is a view of an API the seat already holds. Deploy is
> a `git push`; no seat runs a deploy command against production. HUMAN-ONLY
> has four classes — secret · voice · irreversible · approval — and "I don't
> know the API" is not one of them.

## WHAT — The Rule, Precisely

1. **Deploy is push.** Production runtimes deploy from git on merge to the
   default branch; every other branch deploys a preview. No seat, and no
   human, runs `wrangler deploy` (or its equivalent) by hand. The first-ever
   deploy that bootstraps a runtime is the sole named exception and is recorded
   when it happens.
2. **Wiring is API from the seat.** Repo-to-build connections, triggers,
   custom domains, routes, KV/D1/R2 bindings, secrets, and variables are set by
   the seat through the provider's API (in this house: the Cloudflare MCP), in
   the same turn the need appears. The captain does not open a dashboard.
3. **HUMAN-ONLY is closed-class.** A handoff to the captain names one of:
   `secret` (a credential only the captain can mint — e.g. a third-party OAuth
   app with no API for registration), `voice` (captain-authored text),
   `irreversible` (destruction without a spec), `approval` (a gate). A claim
   of HUMAN-ONLY that names none of these, or names "dashboard", "manual",
   "needs a CF token", or "connect the repo", is a seat miss.
4. **Observe the house wire before describing it.** Before a seat writes any
   sentence about how something deploys or is configured, it reads the
   provider's live config for a sibling service (or the repo's `docs/ci-cd.md`
   / health-code) and copies the observed law — not a sibling's stale values.

## WHY — The Failure This Closes

The same correction was issued by the captain at least seven times in seven
months, and every fix stayed inside one repo:

| Date | Repo | Captain / seat text | Local fix |
|---|---|---|---|
| 2026-02-05 | oddkit | "secrets via dashboard" | decision row (never retracted) |
| 2026-05-02 | agent-messaging-service | "We use githook based deployment with branch deploys. Wrangler deploys aren't scalable and a ritual smell… fix the docs so I don't have to answer this again." | SPEC v1.1.1 |
| 2026-05-05 | agent-messaging-service | PR branch deployed to prod; nonprod MUST be `versions upload` | journal constraint |
| 2026-06 | appbuilder-mcp | "WE DO NOT DEPLOY. We setup Githooks." | canon encoding |
| 2026-06-15 | bee-ai-auth-mcp | seat: "Recurring crew failure: re-deriving manual wrangler deploy / needs CF token from general knowledge" | `docs/ci-cd.md` READ FIRST |
| 2026-07-14 | chief-delegation-officer | "worker secrets are captain-only"; `wrangler secret put` tagged HUMAN-ONLY(secret) | none |
| 2026-09-02 | kitchen (CoS door) | "connect the repo in the dashboard — HUMAN-ONLY" | health-code §10 |

Four repo-local fixes did not stop the fifth, sixth, or seventh recurrence,
because a fresh seat in a fresh repo reads none of them and re-derives the
answer from general knowledge. The class definition existed at L1
(`dispatcher-dispatches-never-executes`); the sentence "dashboard is not a
class" did not. This constraint is that sentence.

The cost is not the config step; it is the captain re-teaching a settled
ruling, which spends exactly the attention the stack exists to protect
(`trust-kernel`: expectations kept auditable).

## ENFORCEMENT

- **Health-code carries the wire.** Each house has a working-convention
  section with the exact API calls (klappy stack: `klappy/kitchen`
  `health-code/mcp-server-build-convention.md` §10). L1 does not restate it.
- **Boarding shims cite this URI** in any line that touches deploy or
  provisioning.
- **A PR body or ticket that tags HUMAN-ONLY without one of the four class
  names is returned unread.** The dispatch-guard's `human_only_class_named`
  prerequisite (`odd/gate/prerequisites.md`) already checks this; the miss was
  seats choosing a class that does not exist.

## SCOPE

Applies to every seat that holds a provider API (Cloudflare, GitHub App, DNS).
Does not apply where the provider has no API for the step — that step is
`HUMAN-ONLY(secret)` and is named as such with the provider and the missing
endpoint (e.g. Gitea/DCS OAuth-app redirect URIs, 2026-09-02).

## VERIFICATION

A seat is conformant when, over a session that touches infra, zero HUMAN-ONLY
tags lack a class name and zero sentences describe a manual deploy. Observable
in the PR bodies and the journal.

## Retraction Condition

Retract if a provider in active house use removes API access for a
configuration step that this constraint says the seat performs, and no
replacement path exists.
