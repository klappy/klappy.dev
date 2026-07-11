---
uri: klappy://canon/constraints/prs-are-hygiene-not-a-hold
kind: canon
title: "PRs Are Hygiene, Not a Hold — Crew Opens and Self-Merges Green PRs"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "constraints", "pull-requests", "self-merge", "ci", "crew", "dispatch", "otto", "bottleneck"]
epoch: E0010
date: 2026-07-11
derives_from: "canon/constraints/dispatcher-dispatches-never-executes.md, canon/constraints/definition-of-done.md, canon/constraints/mode-discipline-and-bottleneck-respect.md"
complements: "canon/bootstrap/otto-operating-card.md, canon/constraints/intent-aligned-fixes-proceed.md"
governs: "What the crew does with a pull request once its checks are green: merge it, never park it on the captain."
target_repo: "outcomes-driven-development"
---

# PRs Are Hygiene, Not a Hold — Crew Opens and Self-Merges Green PRs

> Captain's ruling, 2026-07-11. Pull requests stay: they are good hygiene — a reviewable unit, a CI gate, a durable record. What they are **not** is a waiting room. The crew opens the PR, and when it goes green, the crew merges it. A green PR parked on the captain's desk is spent attention and stalled work, twice over.

## The Rule

- **Open PRs.** Work still lands as a PR, not a raw push: the CI gate runs, the diff is reviewable, the history stays legible.
- **Self-merge when green.** Checks pass → the crew merges. "Green" is the gate; the captain is not.
- **Never park a green PR waiting on the captain.** If it is green and within the work's brief, holding it for a human nod is a bottleneck violation, not diligence.
- **Red or exceptional escalates.** Failing/uncertain checks, or changes that hit the confirm-first cases in `klappy://canon/constraints/intent-aligned-fixes-proceed` (real forks, irreversibles, authorial voice), still go to the captain. The self-merge mandate covers green *and proceedable*, not green-at-any-cost.

## Why

This is `klappy://canon/constraints/dispatcher-dispatches-never-executes` carried to its conclusion: the crew executes, Otto delegates — and merging a green PR *is* execution, so it belongs to the crew. Routing it through the captain re-installs the human as a build step, which is exactly the pattern the dispatch seat exists to remove. Done is a validated outcome (`klappy://canon/definition-of-done`), and a validated outcome includes *landed* — a PR left open is work that stopped one step short of done and billed the captain for the privilege.
