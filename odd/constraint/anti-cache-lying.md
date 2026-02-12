---
uri: klappy://odd/constraints/anti-cache-lying
title: "Constraint: Anti-Cache Lying"
audience: odd
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["constraints", "caching", "truth", "governance", "agents", "tco"]
derives_from: "canon/values/axioms.md"
epoch: E0005
date: 2026-02-12
---

# Constraint: Anti-Cache Lying

## Problem

When derived or mutable content is cached, the system serves a past observation as though it were current truth.

This does not require malicious intent.

It emerges through:
- TTL-based staleness windows ("it's probably still valid")
- incomplete flush mechanisms (clearing some artifacts but not others)
- pre-optimization without TCO measurement
- silent serving of stale state with no signal to the consumer
- debugging masks that hide the gap between cache and reality

The result is confidence without contact with reality.

---

## Core Principle

**A cache of derived content is a polite lie. If you need a flush strategy, you have already admitted the cache can lie.**

---

## Non-Negotiable Rules

1. Derived or mutable content MUST NOT be cached with TTL-based expiration.
   If the content can change independently of its cache key, the cache can lie.

2. The only acceptable caching is content-addressed storage.
   The cache key MUST be the identity of the content — a commit SHA, a content hash, an immutable tag. No TTL. No staleness window. No flush.

3. A "cache invalidation" mechanism MUST NOT exist as a correctness tool.
   Cache flush should only exist as storage cleanup of orphaned immutable artifacts. If flush is required to realign the system with truth, the caching strategy has already failed.

4. "It will be faster" is a claim, and a claim is a debt.
   Per Axiom 2: if you have not measured Total Cost of Ownership — including debugging hours, stale-state incidents, flush mechanism maintenance, cognitive overhead, and trust erosion — you have not paid the debt. You have hidden it.

5. Speed MUST come from architecture, not from pretending yesterday's answer is today's answer.
   If the fetch path is too slow, fix the fetch path. Do not mask the problem with a cache.

---

## Total Cost of Ownership — What "Faster" Actually Costs

Engineers optimize for a single metric (request latency) without measuring the full cost of the caching decision. TCO includes:

- Hours debugging stale-state bugs that only exist because of the cache
- Building, testing, and maintaining flush/invalidation mechanisms
- Incidents caused by silent staleness — serving wrong answers with no error signal
- Cognitive overhead of "is this cached?" on every debug session
- Trust erosion when you cannot tell if what you are seeing is real
- Leadership time spent litigating the same caching argument on every project
- The incomplete flush — clearing some artifacts but not others, creating a lie about the lie-clearing mechanism

None of these costs appear in latency benchmarks. All of them compound.

---

## Required Warnings

The following phrases indicate potential cache lying:

- "Have you tried clearing the cache?"
- "It works after a fresh deploy."
- "The data was stale — we just need to flush."
- "The cache TTL is only an hour."
- "It's probably still valid."
- "Nobody noticed for days."

These are not reassurances. They are signals to investigate whether the caching strategy violates reality.

---

## The Content-Addressed Alternative

Content-addressed caching is not lying because the key IS the identity of the content:

1. Fetch the current commit SHA for the source (one lightweight call)
2. Use that SHA as the cache namespace
3. If the SHA matches what you have stored, serve from storage — this is a truthful assertion, not an assumption
4. If the SHA has changed, fetch fresh and store under the new SHA
5. Old SHA-keyed storage can be garbage collected — this is the only valid "flush"

No TTL. No staleness window. No flush button. The cache key is the proof.

---

## Agent Instruction

Agents must not:
- introduce TTL-based caching of derived or mutable content
- recommend caching as a performance optimization without measuring TCO
- treat "cache invalidation" as a correctness mechanism
- assume cached derived content is current without verifying the source identity

Agents must:
- prefer content-addressed storage over TTL-based caching
- measure or estimate TCO before recommending any caching strategy
- surface caching as an epistemic risk, not just a performance feature
- treat "have you tried clearing the cache?" as a system design failure signal

If an agent cannot demonstrate that a cached value is guaranteed to match the current source truth, the cache is a liability.

---

## Anti-Pattern: Local Maxima Optimization (The Cache Trap)

Pre-optimizing for request latency while ignoring maintenance cost and Total Cost of Ownership is a named anti-pattern in ODD.

Per Axiom 3 (Integrity Is Non-Negotiable Efficiency): the fastest system is the one where every response is already true. A local maximum on latency purchased at the cost of system-wide integrity is not optimization — it is debt with interest.

---

## Case Study: The OddKit Stale-Cache Incident

OddKit — the tool whose purpose is to enforce ODD epistemic discipline — cached its baseline canon documents with a staleness window. For days, it served stale canon content without detection. When the `invalidate_cache` action was invoked, it only cleared `.zip` files, leaving other stale derived content in place.

The tool built to prevent assertion without verification was itself asserting without verification.

This violated:
- **Axiom 1 (Reality Is Sovereign)** — the cache served a model of reality, not reality itself
- **Axiom 4 (You Cannot Verify What You Did Not Observe)** — the cache eliminated the signal that would have prompted observation
- **Axiom 3 (Integrity Is Non-Negotiable Efficiency)** — the "speed" of caching was purchased with days of silent lies

Nobody noticed. That is the point.

---

## Canonical Tie-In

This constraint exists because:

> *"It works after you clear the cache."*
