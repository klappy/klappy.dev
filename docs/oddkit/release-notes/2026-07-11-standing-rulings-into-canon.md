---
uri: klappy://docs/oddkit/release-notes/2026-07-11-standing-rulings-into-canon
title: "Release Notes — Standing Rulings Promoted to Canon (2026-07-11): Four Rules Move from Otto's Memory to Policy"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["docs", "oddkit", "release-notes", "otto", "operating-card", "model-ladder", "reasoning-effort", "self-merge", "intent", "canon-promotion"]
epoch: E0010
date: 2026-07-11
derives_from: "canon/bootstrap/otto-operating-card.md, canon/constraints/governance-change-discipline.md"
governs: "How the dispatch seat and its flights orient to the four promoted rulings after this merges"
target_repo: "undecided"
---

# Release Notes — Standing Rulings Promoted to Canon (2026-07-11)

## What this changes

Four standing rulings the captain issued in-session now live in canon instead of Otto's per-session memory, and the Otto Operating Card — fetched live and injected every turn — points to each. Session memory is lossy by design; the per-turn card is not. Rules belong in policy, not memory.

## The four rulings

1. **Fable is the ceiling; Opus is never the escalation** (`klappy://canon/defaults/model-ladder-fable-ceiling`). Hard/high-stakes work stays on Fable. From Fable, delegate *down* to cheaper models for well-scoped execution under a rulebook — never up to Opus.
2. **Reasoning effort defaults LOW; escalate on importance** (`klappy://canon/defaults/reasoning-effort-low-default`). Effort is a deliberate dial, not a residue. The entry also records an owed harness request: Cowork dispatch tools expose per-flight `model` but no per-flight `effort` (project-wide settings.json/env only today).
3. **Clear intent-aligned fixes proceed without gating on the captain** (`klappy://canon/constraints/intent-aligned-fixes-proceed`). Obvious + aligned + low-risk → act. Confirm-first is reserved for real forks, irreversibles, and authorial voice.
4. **PRs are hygiene, not a hold** (`klappy://canon/constraints/prs-are-hygiene-not-a-hold`). Crew opens and self-merges green PRs; a green PR never parks on the captain's desk. Red or confirm-first-class changes still escalate.

## What Otto does after this lands

Nothing to remember — that is the point. The operating card (`klappy://canon/bootstrap/otto-operating-card`) now carries rules 6–9 as one-line pointers, so every turn re-surfaces them at the freshest context position. The card restates nothing; the full law lives in the four entries above.

## The honest limit

Ruling 2 is settable but not steerable: until the harness exposes per-flight effort, the low default applies project-wide and escalation happens by briefing the flight or routing to a higher-configured session. The owed harness request is recorded in the canon entry itself.
