---
uri: klappy://docs/oddkit/release-notes/2026-07-08-preflight-takeoff-gate
kind: docs
title: "Release Notes — Preflight Becomes a Hard Takeoff Gate (2026-07-08)"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["release-notes", "preflight", "takeoff-gate", "E0010", "flight-crew", "governance", "enforcement"]
date: 2026-07-08
derives_from: "canon/constraints/preflight-checklist-takeoff-gate.md, canon/bootstrap/model-operating-contract.md, canon/constraints/governance-change-discipline.md"
---

# Release Notes — Preflight Becomes a Hard Takeoff Gate

> Canon 0.40.0. E0010 named preflight as an instrument that fires before work; this release makes it a gate that a flight must pass to take off. Five items, checked live every flight, fail-closed with an honest abort. The START-gate counterpart to recording-as-landing.

## What changed

- **Preflight is now a pass/fail gate, not a habit.** Five items — clock, canon reachable, tools present, tier correct, boarded — are checked before any work, every flight, each green only when observed live this flight. Never from cache, memory, or inference.
- **Fail-closed with an honest abort.** Any failed item aborts the flight, which reports the specific failure ("cannot reach `X` — aborting") and stops, rather than falling back to recalled governance and flying as if canon were read.
- **Declaration is mandatory.** A cleared flight declares its preflight result at the top of its first substantive message. Work reported without a passed, declared preflight is invalid.
- **Two enforcement surfaces.** A mechanical CI check confirms the declaration is present and well-formed on flight artifacts (permitted for literal checks per `audit-gates-are-spawned-agent-sessions`); whether the declared preflight was *true* remains a spawned-agent judgment.

## Why this exists

The operator observed the failure across the fleet all week: dispatched flights — Code-substrate sessions in particular — carried zero MCP connectors, could not reach canon, and flew anyway, governing themselves from recall while reporting confident completions. That is silent substitution (`canon/bootstrap/flight-deck-model`) with the manual physically absent. A takeoff gate refuses that state instead of tolerating it.

## Where it lands

- Authoritative rule: `canon/constraints/preflight-checklist-takeoff-gate.md`
- Binding procedure: `canon/bootstrap/model-operating-contract.md` ("The Preflight — The Hard Takeoff Gate")
- Instructions: `canon/bootstrap/generic-boarding-pass.md`, `canon/bootstrap/boarding-pass.md`
- Dispatch protocol: `DISPATCH.md`
- CI: `scripts/validate-preflight-declaration.py` + the `preflight-declaration` job in `.github/workflows/canon-quality.yml`

## Governance

Per `canon/constraints/governance-change-discipline.md`: version bump (0.40.0), changelog entry, and this release note. A behavior-affecting posture recalibration within E0010 — no epoch bump, since who-initiates is unchanged and the change hardens an existing posture rather than shifting the relationship frame.
