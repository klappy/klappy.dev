---
uri: klappy://docs/oddkit/proactive/proactive-session-close
title: "Proactive Session Close — Journal, Changelog, Version Bump Without Being Asked"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "oddkit", "proactive", "session-close", "changelog", "version", "journal", "ritual", "epoch-7"]
epoch: E0007
date: 2026-04-03
---

# Proactive Session Close — Journal, Changelog, Version Bump Without Being Asked

> When a session produces commits, the agent proposes the close ritual: project journal entry, changelog update, and version bump. The operator should never have to remember to ask.

---

## Summary — The Ritual the Operator Keeps Forgetting to Request

Every productive session that produces code changes or governance artifacts ends the same way: the operator asks for a project journal entry, a changelog update, and a version bump. Every time. The agent waits for the request. Every time.

This is the RITUAL_DETECTED pattern at its most obvious. The operator performs the same invocation sequence at the end of every session. The sequence is predictable, the inputs are derivable from the session's own history, and the agent has everything it needs to propose the ritual proactively.

Under E0007, the agent does not wait. When the session has produced commits — to any repository — the agent proposes the close ritual before the operator has to remember it.

---

## The Close Ritual

Three artifacts, in order:

**1. Project Journal Entry** — OLDC+H capture for the session in narrative order. Written to the project's `odd/ledger/` directory. Covers what was observed, learned, decided, constrained, and what comes next. Encode does not persist — the agent must save the output to a file.

**2. Changelog Update** — What changed, in user-facing language. Written to `CHANGELOG.md` following the project's established format. Groups changes by category (features, fixes, governance). References PR numbers and key decisions.

**3. Version Bump** — Semantic version increment in `package.json` (and any other version-bearing files). Patch for fixes and small changes, minor for features, major for breaking changes. The agent proposes the increment; the operator approves.

---

## When to Propose

Propose the close ritual when any of these are true:

- The session has produced one or more commits to any repository.
- The session is approaching a natural end (task complete, topic exhausted).
- The operator signals session end ("that's it for now," "let's wrap up," "ship it").
- The context window is approaching saturation and a handoff is imminent.

The test: if the session produced work that will outlive the conversation, the close ritual applies.

---

## What "Propose" Means

The agent does not silently execute the ritual. It proposes: "This session produced N commits across M repos. Want me to run the close ritual — journal, changelog, version bump?" The operator approves, modifies, or skips. The agent acts on the response.

If the operator has a known preference for always running the ritual (established through repeated approval), the agent can proceed directly and present the results for review rather than asking permission each time.

---

## The Passive Pattern This Replaces

Under E0006, the operator had to remember — every session — to say "update the journal," "update the changelog," "bump the version." If they forgot, the session's learnings were lost, the changelog fell behind, and the version drifted from the code. The agent had the full context of what happened and still waited to be asked.

Under E0007, the agent detects the close signal and proposes the ritual. The operator reviews, not remembers.
