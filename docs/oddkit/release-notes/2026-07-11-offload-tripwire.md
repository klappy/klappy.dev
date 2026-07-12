---
uri: klappy://docs/oddkit/release-notes/2026-07-11-offload-tripwire
title: "Release Notes — The Offload Trip-Wire (2026-07-11): Delegating Up Is Still Executing, and Now a Mechanism Says So"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["docs", "oddkit", "release-notes", "dispatcher", "cdo", "otto", "delegation", "offload", "tripwire", "enforcement", "dispatch-guard", "gate", "human-only"]
epoch: E0010
date: 2026-07-11
derives_from: "canon/constraints/dispatcher-dispatches-never-executes.md, canon/bootstrap/otto-operating-card.md, odd/gate/transitions.md, odd/gate/prerequisites.md"
governs: "How the dispatch seat orients to the offload-to-captain trip-wire and its enforcement layers after this merges"
target_repo: "undecided"
---

# Release Notes — The Offload Trip-Wire (2026-07-11)

## What this changes

The dispatcher rule grew its second face and its first mechanism. The seat had learned not to execute in-seat — and started routing operational work to the captain instead ("you launch it / you commit / you push"). This release names that move a violation of the same rule, gives the seat decision-moment triggers instead of an abstract principle, and — per the captain's ruling that **access is not enforcement** — ships enforcement that fires whether or not the seat remembered the rule.

## The three layers

1. **Dispatch-guard hook** (`klappy/agent-role-service` `templates/role-repo/hooks/dispatch-guard.mjs`, landed 5829f31): `PreToolUse` denies in-seat hands-on tools and captain-facing messages that assign the captain operational work; `Stop` blocks turn-end when the final message carries an offload ask, so it gets rewritten as a dispatch before the captain sees it. 47 tests.
2. **Gate rule** (`klappy://odd/gate/transitions`, this repo): new `dispatch-to-captain-handoff` transition detects offload phrasings and demands `delegation_attempted` + `human_only_class_named` before any operational ask may reach the captain.
3. **Canon triggers** (`klappy://canon/constraints/dispatcher-dispatches-never-executes` § The Offload Trip-Wire): the exact phrasings and moments, boarded at session start.

## What the seat does after this lands

- About to type "you run / you push / over to you" or paste a command for the captain → **STOP, delegate to a subagent**; subagents hold full read/write/push/PR/deploy rights by intent.
- A subagent reports "blocked" → that is a misconfigured hook to fix (dispatch a fix-flight), never a reason to route the task to the captain.
- A genuinely human-only ask → tag it: `HUMAN-ONLY(secret|voice|irreversible|approval)`. The class must be named; a bare tag does not pass.

## The honest limit

The guard's offload scan is lexical — a novel phrasing slips once, then the debrief adds it to the phrasebook with a test. The hook binds only where wired into the seat's harness settings; until the CDO seat carries it, that seat runs on layers 2–3. Full detail: `klappy://canon/constraints/dispatcher-dispatches-never-executes` § Enforcement.
