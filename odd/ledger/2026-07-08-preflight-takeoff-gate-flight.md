---
uri: klappy://odd/ledger/2026-07-08-preflight-takeoff-gate-flight
kind: journals
title: "Flight Record — Codifying the Preflight Takeoff Gate (2026-07-08)"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "ledger", "flight-record", "preflight", "takeoff-gate", "recording-as-landing", "E0010"]
epoch: E0010
date: 2026-07-08
derives_from: "canon/constraints/preflight-checklist-takeoff-gate.md, canon/bootstrap/model-operating-contract.md"
---

<!-- flight-artifact -->

# Flight Record — Codifying the Preflight Takeoff Gate

> A dispatched first-officer flight (CDO seat, via Otto) to codify the preflight checklist as a hard, enforced takeoff gate. Recorded as its own first artifact under the gate it created — the START-gate declaration below is exactly what the new CI check verifies, and this landing is the END gate closing on the same flight.

## Preflight declaration — cleared for takeoff

Run before any work; each item observed live this flight, not from cache or memory.

- **Clock** — `oddkit_time` succeeded; `server_time` 2026-07-08T17:22:27Z (UTC). Civil date 2026-07-08 (America/New_York).
- **Canon** — `klappy://canon/bootstrap/model-operating-contract` fetched via oddkit and resolved; content hash `ntc39x`.
- **Tools** — oddkit (time/get/orient/search/challenge/gate) and GitAuth present; GitAuth minted a live write+workflows token despite zero quota counters (observed, not assumed).
- **Tier** — dispatched Opus flight; matches the tier for a canon-governance change.
- **Boarded** — read `boarding-pass`, `generic-boarding-pass`, `flight-deck-model`, and the operating contract this flight.

Result: all five green → **cleared for takeoff**.

## What flew

Codified the five-item preflight as a hard, fail-closed takeoff gate: authoritative tier-1 constraint (`canon/constraints/preflight-checklist-takeoff-gate.md`), a binding section in the operating contract, the gate written into both boarding passes (project + account text), a root `DISPATCH.md` for dispatched flights, a soft mechanical CI check (`scripts/validate-preflight-declaration.py` + `preflight-declaration` job) as the START-gate mirror of recording-as-landing, and governance markers (CHANGELOG 0.40.0 + release note).

## Cross-check / debrief

- The dispatch named a `BOARDING.md` tier-check and an existing `recording-as-landing` rule/CI as grounding; neither exists in `main`. Challenged rather than fabricated: grounded the work in the canon that does exist and flagged the naming gap in the PR for reconciliation. (Axiom 1: reality is sovereign; a claim is a debt.)
- `oddkit_challenge` (execution) surfaced generic prompts; addressed in the artifact (evidence, comparison to the end gate, retraction conditions) rather than handed back. `oddkit_gate` PASS 2/2 (dod_met, artifacts_present).
- Landing: PR #267, assigned klappy, no review requested.

## Landing

Recorded as landing. START gate declared above; END gate is this record plus the merged/open PR. Both bounds present → valid flight.
