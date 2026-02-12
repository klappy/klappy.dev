---
uri: klappy://docs/incidents/oddkit-stale-cache-2026-02
title: "Incident: OddKit Stale Cache (February 2026)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["incident", "oddkit", "caching", "dogfooding", "axiom-violation"]
derives_from: "odd/constraint/anti-cache-lying.md"
epoch: E0005
date: 2026-02-12
---

# Incident: OddKit Stale Cache (February 2026)

## Summary

OddKit — the epistemic guide for ODD — served stale canon documents for days without detection. Its cache flush mechanism (`invalidate_cache`) only cleared `.zip` files, leaving other stale derived content in place. The tool built to enforce "Reality Is Sovereign" was itself substituting a past observation for current truth.

---

## What Happened

OddKit caches baseline canon documents fetched from GitHub to reduce latency on repeated calls (orient, search, get, etc.). This cache used a staleness window — content was fetched once and served from cache until either the TTL expired or `invalidate_cache` was manually invoked.

During a period of active canon development, documents in the baseline repo were updated. OddKit continued serving the old versions. No error was raised. No signal indicated staleness. Agents and users received outdated canon content and made decisions based on it.

When the issue was eventually discovered and `invalidate_cache` was called, it only cleared `.zip` files from storage. Other cached artifacts — parsed documents, search indexes, derived content — remained stale. The flush mechanism was itself incomplete.

---

## Duration

Days. The exact duration is unknown because the cache produced no staleness signal.

---

## Detection

The staleness was not detected by any automated system. It was discovered through human observation when canon content did not match expected updates.

This is consistent with the core failure mode of derived-content caching: the cache eliminates the very signal that would prompt investigation.

---

## Axiom Violations

**Axiom 1: Reality Is Sovereign**
The cache served a model of reality (past state) instead of reality itself (current state). Every response from OddKit during the stale period was an assertion about canon that was not grounded in the current state of the canon.

**Axiom 3: Integrity Is Non-Negotiable Efficiency**
The cache existed to save latency — a local optimization. The cost was days of incorrect canon being served. The "efficiency" of caching was purchased with system-wide integrity loss.

**Axiom 4: You Cannot Verify What You Did Not Observe**
The cache eliminated the observation path. Because cached content was served without contacting the source, there was no opportunity to observe that the source had changed. The system could not verify what it did not look at.

---

## Root Cause

Pre-optimization. The caching strategy was introduced to reduce GitHub API calls and improve response latency. No Total Cost of Ownership analysis was performed. The cost of the optimization — stale state, incomplete flush, debugging opacity, trust erosion — exceeded the benefit by orders of magnitude.

This is the named anti-pattern **Local Maxima Optimization (The Cache Trap)**: optimizing for a single metric (latency) while ignoring the full cost of the decision.

---

## Irony

The tool whose entire purpose is to enforce epistemic discipline — to ensure agents observe before asserting, verify before claiming, and prove before confirming — was itself asserting without observation, claiming without verification, and confirming without proof.

The Creed says: *"What I have not seen, I do not know."*
The cache said: *"What I saw yesterday is close enough."*

---

## Resolution

This incident led to the creation of:

1. **Constraint: Anti-Cache Lying** (`odd/constraint/anti-cache-lying.md`) — a permanent constraint prohibiting TTL-based caching of derived or mutable content
2. **Decision Rule #15: Measure Total Cost Before Optimizing** — added to the Decision Rules as a heuristic against pre-optimization without TCO evidence
3. **Implementation Instruction: Content-Addressed Storage** (`docs/oddkit/IMPL-content-addressed-caching.md`) — the plan to replace OddKit's caching with SHA-keyed immutable storage

---

## Lessons

1. A cache that can lie will lie. The question is not *if* but *when* and *for how long*.
2. A flush mechanism that exists for correctness is an admission that the cache is a liability.
3. A flush mechanism that only clears some artifacts is a lie about the lie-clearing mechanism.
4. The absence of an error signal is not evidence of correctness — it is evidence that the system cannot detect its own failures.
5. Dogfooding works. This incident was discovered because the canon author was actively using OddKit and noticed the gap. If the staleness had been in a less-observed part of the system, it could have persisted indefinitely.

---

## Canonical Tie-In

This incident exists because:

> *"Nobody noticed for days."*
