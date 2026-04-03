---
uri: klappy://docs/oddkit/proactive/proactive-session-close
title: "Proactive Commit Hygiene — Journal, Changelog, Version Bump at Every Git Lifecycle Event"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "oddkit", "proactive", "commit", "changelog", "version", "journal", "ritual", "git", "epoch-7"]
epoch: E0007
date: 2026-04-03
---

# Proactive Commit Hygiene — Journal, Changelog, Version Bump at Every Git Lifecycle Event

> The trigger is not "end of session." The trigger is git lifecycle events: every commit, before every PR, and — most critically — before every merge. The agent does not wait to be reminded.

---

## Summary — Tied to Git, Not to Conversation

The journal, changelog, and version bump are not session-end rituals. They are git lifecycle obligations. A commit without a journal entry loses context. A PR without a changelog makes review harder. A merge without a version bump makes the release unreliable. These are not nice-to-haves — they are the provenance layer that makes the code's history legible.

The operator should never have to say "update the journal" or "bump the version." The git events themselves are the signal. The agent sees the commit, sees the PR, sees the merge — and acts.

---

## The Three Trigger Points

### At Every Commit

The project journal tracks what happened and why. Every commit changes the codebase — the journal should reflect what the commit contains and the reasoning behind it. OLDC+H capture happens continuously (per `docs/oddkit/proactive/continuous-encoding.md`), and each commit is a natural persist point.

What the agent does: ensures the current journal entry is up to date with the work that produced the commit. If OLDC+H has been tracked continuously, this is a save — not a reconstruction.

### Before Every PR

A PR is a review artifact. The reviewer needs to understand what changed and why. The changelog and journal must be current before the PR is created — not after, not as a follow-up.

What the agent does: before creating or pushing a PR, verifies that the changelog reflects all changes on the branch, the version is bumped appropriately, and the journal captures the session's decisions and rationale. If any are missing, the agent produces them and includes them in the PR.

### Before Every Merge — Most Critical

Merge is irreversible in practice. Once code hits main, it's the new baseline. A merge without a changelog entry means the release history has a gap. A merge without a version bump means consumers can't tell what changed. A merge without a journal entry means the next person (or next session) starts without context.

What the agent does: before approving or executing a merge, validates that changelog, version, and journal are all present and current. This is a gate — not a suggestion.

---

## The Three Artifacts

**Project Journal** — OLDC+H in narrative order, written to `odd/ledger/`. Captures what was observed, learned, decided, constrained, and what comes next. The provenance layer for human reasoning.

**Changelog** — User-facing description of what changed, written to `CHANGELOG.md`. Grouped by category (features, fixes, governance). References PR numbers. The provenance layer for code changes.

**Version Bump** — Semantic version increment in `package.json` and any other version-bearing files. Patch for fixes, minor for features, major for breaking changes. The provenance layer for release identity.

---

## The Passive Pattern This Replaces

Under E0006, all three artifacts were produced at "session end" — if the operator remembered to ask. The agent had the full context of every commit, every decision, every change — and waited. PRs were created without changelogs. Merges happened without version bumps. The operator caught it later and requested a fix-up, or the gap persisted.

Under E0007, the git lifecycle IS the trigger. Commits, PRs, and merges are observable events. The agent does not need to be told they happened — it produced them. The ritual is not "remind me at the end." The ritual is built into the workflow at the points where it matters.
