---
uri: klappy://docs/oddkit/release-notes/2026-07-09-dispatcher-spawns-its-own-coordinators
title: "Release Notes — The Dispatcher Spawns Its Own Coordinators (2026-07-09): Coordination Overhead Gets Delegated Too"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["docs", "oddkit", "release-notes", "dispatcher", "cdo", "otto", "delegation", "coordination", "watcher", "coordinator", "roster", "ams"]
epoch: E0010
date: 2026-07-09
derives_from: "canon/constraints/dispatcher-spawns-its-own-coordinators.md, canon/constraints/dispatcher-dispatches-never-executes.md, canon/constraints/governance-change-discipline.md"
governs: "How the CDO/dispatcher (Otto) orients to delegating coordination — not just execution — after this merges"
target_repo: "undecided"
---

# Release Notes — The Dispatcher Spawns Its Own Coordinators (2026-07-09)

## What this changes

The companion rule (`dispatcher-dispatches-never-executes`) stopped the dispatcher from doing hands-on work in-seat. This adds the other half: the dispatcher does not absorb the *coordination* of that work either. Otto may — and should — spawn its own helper / coordination agents so that polling flights, distilling transcripts, relaying between crew, and watching a cluster of sub-flights never displace the one thing the dispatch seat exists to protect: responsiveness to the captain.

## Why it exists

A dispatcher can delegate every build, deploy, and commit and still saturate itself by *managing the crew that runs them* — sitting in the chair refreshing transcripts, hand-summarizing five parallel flights, relaying a result from one crew member to another. That is coordination, it is work, and while the dispatcher does it, it is not available to the captain. The captain's ruling of 2026-07-09: the dispatcher must be able to spawn its own coordination agents so coordination overhead is pushed down, not carried in the chair. "You're missing the point of delegating if you're sitting there watching them."

## What Otto does after this lands

- **Now — current tooling:** Delegate whole, self-contained workstreams (one flight owns a workstream end-to-end); rely on completion notifications rather than blocking on transcript polling; treat attention to the captain as the scarce resource that coordination must never consume.
- **Full version — owed ARS v2 build item:** A standing COO + roster — Scribe (flight recorder), Steward (reversible merges), Validator (fresh-context validation), and a **watcher/coordinator** that monitors a cluster of sub-flights and returns **one consolidated result** to the dispatcher. Requires agent-to-agent coordination over the wire (AMS), so the dispatcher conducts the roster instead of tracking every flight — Orchestrator + Conductor realized.

## The honest limit

The *Now* horizon works on current tooling. The *Full version* roster depends on AMS agent-to-agent messaging, an owed build item recorded in the ARS v2 multitenancy policy roster (`klappy/agent-role-service` `docs/policy/ars-v2-multitenancy-policy.md` §9, BI-V6). Until AMS gates it, the Now horizon binds. Full detail: `klappy://canon/constraints/dispatcher-spawns-its-own-coordinators`.
