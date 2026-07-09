---
uri: klappy://canon/constraints/per-environment-worker-projects
title: "Per-Environment Worker Projects — Stateful Bindings Get Separate Dev/Staging/Prod Workers, Not Preview Deploys"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "constraint", "cloudflare", "workers", "durable-objects", "deployment", "environments", "staging", "preview", "e0010"]
epoch: E0010
date: 2026-07-09
derives_from: "canon/constraints/verification-and-evidence.md, docs/appendices/online-evidence.md, docs/appendices/deploy-evidence.md, docs/appendices/epoch-10.md"
complements: "canon/constraints/reviewability-standard.md"
governs: "Deployment topology for any Cloudflare Workers project whose stateful bindings (Durable Objects and the like) prevent clean preview deploys"
status: active
target_repo: "outcomes-driven-development"
---

# Per-Environment Worker Projects — Stateful Bindings Get Separate Dev/Staging/Prod Workers, Not Preview Deploys

> When a Durable Object — or any other stateful binding — prevents clean Cloudflare *preview* deploys, the project MUST run as separate Cloudflare Workers projects per environment: **dev, staging, and production**. Preview deploys are not a substitute for a real environment when the binding they would carry cannot be previewed cleanly. Separate per-environment projects have proven resilient: they let crew test in dev and staging before anything can touch production users. Captain's ruling, 2026-07-09, born from the ARS launch, where a Durable-Object-backed worker had no clean preview path.

## Description

Cloudflare's preview-deploy mechanism assumes a worker can be spun up in an ephemeral, throwaway context. Stateful bindings break that assumption. A Durable Object is a named, addressable, persistent actor; a preview deploy either cannot bind it cleanly or ends up sharing state with a real environment, which is worse than having no preview at all. The failure mode is silent: the preview looks like an isolated surface but is entangled with production state, so testing on it is testing against production without saying so.

This constraint removes the ambiguity by replacing the preview path with real, named environments. Each environment is its own Worker project with its own bindings, its own Durable Object namespace, and its own URL. Dev is where crew builds and breaks things. Staging is the reviewable, production-shaped surface where the captain and crew verify before promotion. Production is what users touch, and nothing reaches it that has not first been observed working in staging.

This is an instantiation of the evidence-over-assertion family (`canon/constraints/verification-and-evidence.md`, `docs/appendices/online-evidence.md`, `docs/appendices/deploy-evidence.md`) for the specific case of stateful edge workers, and it is the deployment substrate that makes the companion `canon/constraints/reviewability-standard.md` physically possible: the staging worker is where the reviewable URL comes from.

## Operating Constraints

- MUST use separate Cloudflare Workers projects — dev, staging, production — for any project where a Durable Object or other stateful binding prevents a clean preview deploy
- MUST NOT rely on Cloudflare preview deploys as the pre-production test surface for such projects
- MUST give each environment its own bindings and its own persistent-state namespace; no cross-environment state sharing
- MUST verify in dev and then staging before any change reaches production
- MUST treat the staging worker as the source of the reviewable surface owed under the reviewability standard

## Defaults

- Assume a stateful binding cannot be previewed cleanly until proven otherwise; reach for per-environment projects first
- Prefer three real environments over one environment plus a preview that entangles state
- Promote forward only (dev to staging to production), never sideways into production from a preview
- When a project is genuinely stateless, preview deploys remain acceptable and this constraint does not force the three-project split

## Failure Modes

- **Preview-as-Production**: A preview deploy that silently shares Durable Object or other state with a real environment, so "testing on preview" is testing against production
- **Phantom Isolation**: Assuming a preview is isolated because it has its own URL, when its stateful binding is not
- **Skipped Staging**: Shipping dev straight to production because standing up a staging worker felt like overhead
- **State Bleed**: Two environments pointed at the same namespace, so a dev test mutates production state

## Verification

- The project has three distinct Cloudflare Workers projects with three distinct URLs: dev, staging, production
- Each environment binds its own Durable Object namespace / stateful resources; none are shared
- The change was observed working in staging before promotion to production
- The staging URL is available to hand to review (see reviewability standard)

## When This Does Not Apply

- Stateless workers with no binding that blocks clean preview deploys — preview deploys are fine
- Throwaway spikes explicitly scoped as disposable and never promoted to real users
- Local-only development that never deploys

## Why This Is Necessary

The ARS launch is the origin. The DO-backed worker had no clean preview path, which meant every attempt to review a change either had no isolated surface to review on, or reviewed against production state. That is both an evidence failure (you cannot verify a change without a contextualized, isolated surface) and a reviewability failure (you cannot ask someone to review what has no safe place to be seen). The fix that proved resilient was structural, not procedural: give every environment its own project. Dev and staging absorb the risk so production never becomes the test rig.

## See Also

- [Reviewability Standard](/canon/constraints/reviewability-standard.md) — the companion this constraint supplies the surface for
- [Verification & Evidence](/canon/constraints/verification-and-evidence.md)
- [Online Evidence Requirement](/docs/appendices/online-evidence.md)
- [Deploy Evidence](/docs/appendices/deploy-evidence.md)
- [Epoch 10 — Flight Crew](/docs/appendices/epoch-10.md)
- [Constraints](/canon/constraints/README.md)
