---
uri: klappy://docs/decisions/D0019
title: "D0019: Merge Attribution v1 — Attribution Wins"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["docs", "decisions", "branch", "merge", "attribution", "stewardship"]
---

# D0019 — Merge Attribution v1: Attribution Wins

> When landing a squash-merge, prefer the captain's authored commit identity over the GitHub merge-API's clean "Merged" badge.

## Description

The GitHub squash-merge API re-attributes the squash commit to the app bot identity (`git-repo-auth[bot]`), erasing the captain's authorship on the landed commit. This decision rules that authorship on the commit matters more than the purple "Merged" badge on the PR. Crew squash-merge locally (commit authored by klappy), push, then close the PR with a comment pointing at the commit. The accepted cost: the PR shows "Closed," not "Merged."

## Outline

- Decision
- Status
- Context
- Consequences
- Implementation
- Evidence
- Pattern Recognition

---

## Decision

When landing a squash-merge, prefer the captain's authored commit identity
(`118073+klappy@users.noreply.github.com`) over the GitHub merge-API's clean
"Merged" badge.

Because the GitHub squash-merge API re-attributes the squash commit to
`git-repo-auth[bot]`, crew **squash-merge locally and push** (commit authored by
klappy), then **close the PR with a comment pointing at the commit**.

Cost accepted: the PR shows "Closed," not the purple "Merged" badge.

## Status

**Active** — v1 ("attribution is fine for now; iterate and improve later").

## Context

Landing a PR through the GitHub squash-merge API produces a clean "Merged"
badge, but the squash commit is authored by the app bot, not the captain. The
captain's authorship — and the contribution-graph credit that follows the
author email — is load-bearing: the work is the captain's, and the ledger
should say so. Between a clean badge and honest authorship, authorship wins.

This is the v1 rule. It was raised, weighed, and ruled by the captain on
2026-07-09.

## Consequences

- OK: The landed commit is authored by the captain, not the bot
- OK: Contribution-graph credit follows the captain's no-reply author email
- OK: Provenance on `main` reads honestly: klappy authored the change
- Cost: The PR shows "Closed," not the purple "Merged" badge
- Cost: Landing is a local squash + push + close, not a one-click API merge

## Implementation

Crew procedure for landing a squash-merge:

1. Squash-merge the PR branch **locally** so the resulting commit is authored by
   `118073+klappy@users.noreply.github.com` (author **and** committer).
2. Push the squash commit to `main` with the minted write token.
3. **Close** the PR (do not use the merge API) with a comment that links to the
   landed commit SHA.

Assign the captain to the PR for visibility; do **not** request review unless
the captain asks.

## Evidence

- Captain ruled 2026-07-09.
- Observed behavior: the GitHub squash-merge API re-attributes the squash commit
  to `git-repo-auth[bot]`, overriding the captain's authorship.

## Pattern Recognition

- **Anti-pattern identified:** trading honest authorship for a cosmetic badge —
  a false-clean signal that misattributes whose work landed.
- **Revisit trigger:** replace this rule if/when a cleaner path preserves the
  author — e.g. a GitHub App token or merge path that keeps the commit author as
  the captain while still producing the "Merged" badge.
- **Recurrence check:** related to the bot-identity attribution tradeoffs in
  `docs/planning/pat-transcendence-github-app.md` (the `oddkit-steward[bot]` /
  git-repo-auth seat provenance discussion).
