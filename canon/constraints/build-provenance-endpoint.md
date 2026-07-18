---
uri: klappy://canon/constraints/build-provenance-endpoint
title: "Build Provenance Endpoint — Every Build/Deploy Carries a Verifiable Provenance Claim"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: draft
tags: ["canon", "constraints", "provenance", "build", "deploy", "attestation", "verification"]
epoch: E0010
date: 2026-07-18
derives_from: "canon/constraints/definition-of-done.md, docs/decisions/D0002-attempt-provenance-required.md"
complements: "docs/decisions/D0019-merge-attribution-v1.md, canon/constraints/reviewability-standard.md"
governs: "Any deployed build or release artifact of klappy.dev; the runtime surface that discloses its own provenance"
status: draft
target_repo: "klappy.dev"
---

# Build Provenance Endpoint — Every Build/Deploy Carries a Verifiable Provenance Claim

> **Posture:** DRAFT — proposed for captain review, not yet ratified. **Do not merge until reviewed.**

> A running build is itself a claim ("this is what's live"), and Axiom 2 — A Claim Is a Debt — means that claim needs evidence a reader can check without trusting the deploy pipeline's word for it. This constraint proposes that every deployed build expose a machine-readable provenance endpoint answering: who built it, from what commit, built/deployed when, and attested how — the same discipline D0002 already requires for attempts, extended to what's actually running in production.

---

## Summary — The Deploy Is a Claim; the Endpoint Is Its Evidence

`docs/decisions/D0002-attempt-provenance-required.md` already mandates that every *attempt* capture provenance (agent, model, tool, git HEAD, timestamp) at registration. That closes the loop for attempts, but a *deployed build* — the thing a visitor or reviewer actually hits — makes no equivalent claim about itself. Without it, "what's live matches what was reviewed" is asserted, not verifiable.

This constraint proposes a small, standard surface: a build-provenance endpoint (e.g. `/api/provenance` or `/.well-known/provenance`) that every klappy.dev deploy serves, returning at minimum:

- `commit` — the git SHA the build was produced from
- `built_by` — identity (human or agent) that triggered the build
- `built_at` — build timestamp
- `attestation` — how the claim is backed (CI run URL, signed manifest, or equivalent verifiable pointer)

This is the definition-of-done evidence requirement (`canon/constraints/definition-of-done.md`) applied to the deploy itself, not just the PR that produced it: a claim ("this build is X") paired with evidence a reader can fetch and check, not a description to be trusted.

---

## Operating Constraints (proposed)

- MUST expose a stable, documented path returning `commit`, `built_by`, `built_at`, and `attestation` for the currently live build
- MUST source these fields from the build/deploy pipeline itself, not from hand-edited config — the endpoint's value is that it can't drift from what actually shipped
- MUST NOT block or replace D0002's attempt-level provenance; this is a distinct, later checkpoint (attempt → merge → build → live), not a substitute
- SHOULD degrade the same way D0002 does: if a field is unknown, say so explicitly rather than omitting it silently

---

## Open Questions for Captain Ratification

- Exact route and response shape (new surface vs. extending an existing `/health`-style endpoint)
- What "attested how" means concretely on this stack (CI run link is the cheap default; signed manifest is the stronger version)
- Whether this belongs in `klappy.dev` only or generalizes to `target_repo: "oddkit"` as a reusable pattern

---

## Relationship

- Extends `klappy://docs/decisions/D0002-attempt-provenance-required` from attempt-time provenance to deploy-time provenance — same evidence discipline, later checkpoint in the same pipeline.
- Is a specific application of `klappy://canon/constraints/definition-of-done` — the deploy is a claim, the endpoint is the evidence that lets a reader check it instead of trusting the pipeline's say-so.
