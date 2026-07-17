---
uri: klappy://docs/oddkit/release-notes/2026-07-17-sandbox-hygiene-per-flight-scratch
title: "Release Notes — Sandbox Hygiene: Per-Flight Owned Scratch (2026-07-17)"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: semi_stable
tags: ["release-notes", "sandbox", "hygiene", "temp-files", "flight"]
date: 2026-07-17
complements: "canon/constraints/sandbox-hygiene-per-flight-scratch.md"
target_repo: "outcomes-driven-development"
---

# Release Notes — Sandbox Hygiene: Per-Flight Owned Scratch (2026-07-17)

## What changed for you

If you run flights (agent sessions) in the shared local sandbox, working state no longer leaks between them. The failure this fixes was concrete and repeated: a flight wrote its PR body to `/tmp/pr_body.md`; the next flight inherited the previous body (or a git lock it couldn't take) and opened a PR with the wrong content before anyone caught it.

From now on, every flight mints its own uniquely-named, self-owned scratch directory, does all temp/clone/PR-body work inside it, and removes it on exit. Fixed shared temp names — `/tmp/pr_body.md` chief among them — are prohibited.

## Why it matters

State residue is indistinguishable from signal. A dirty sandbox invalidates the work drawn from it, exactly as a dirty repository does (`repo-truth`, `D0004`). This extends that law from the repo to the sandbox and pairs it with a mechanical enforcer so it holds without anyone remembering to be careful.

## What you need to do

- **Repo side (delivered):** flights source the shared helper `agent-role-service/scripts/flight-scratch.sh` (preflight + scratch-mint + teardown). See its PR.
- **Operator side (action required):** enable per-flight `TMPDIR` isolation in the Cowork launch configuration so scratch isolation does not depend on flight discipline alone. This is a launch-config setting and cannot be delivered by PR.

## Status

Draft — opened for review alongside the constraint and the helper PR. No epoch bump; reinforces E0010 flight-crew posture.
