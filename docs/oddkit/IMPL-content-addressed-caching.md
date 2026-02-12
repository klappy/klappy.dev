---
uri: klappy://docs/oddkit/impl-content-addressed-caching
title: "Implementation: Replace TTL Caching with Content-Addressed Storage"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "implementation", "caching", "content-addressed", "anti-cache-lying"]
derives_from: "odd/constraint/anti-cache-lying.md"
---

# Implementation Instruction Set: Content-Addressed Storage for OddKit

## Replace TTL-based baseline caching with SHA-keyed immutable storage

---

## Intent

Eliminate the possibility of serving stale canon or baseline content.

OddKit's current caching strategy caches baseline documents with a staleness window and provides an `invalidate_cache` action as a manual correctness tool. This violates the Anti-Cache Lying constraint and was proven harmful by the stale-cache incident (days of stale content served without detection, incomplete flush that only cleared `.zip` files).

The goal is to make it impossible for OddKit to lie about the state of the canon.

---

## Background: The Incident

OddKit cached its baseline canon documents. For days, it served stale content. Nobody noticed because the cache made everything look like it was working. When `invalidate_cache` was invoked, it only cleared `.zip` files — other stale derived content continued to be served.

The tool whose purpose is epistemic integrity was itself violating Axiom 1 (Reality Is Sovereign).

---

## Required Changes

### 1. Replace TTL-based cache with commit-SHA-keyed storage

**Current behavior:** Fetch baseline content, cache it, serve from cache until TTL expires or `invalidate_cache` is called.

**Target behavior:**
- On first request in a session, fetch the current commit SHA for the baseline branch (one lightweight GitHub API call or HTTP HEAD with ETag)
- Use that SHA as the storage namespace key
- If content for this exact SHA exists in storage, serve it — this is a truthful assertion
- If the SHA has changed or no content exists, fetch fresh from GitHub and store keyed to the new SHA
- No TTL. No staleness window. No manual flush for correctness.

### 2. Redefine `invalidate_cache` as orphan cleanup

**Current behavior:** `invalidate_cache` attempts to realign cached content with reality by clearing stored files (incompletely — only `.zip` files).

**Target behavior:**
- `invalidate_cache` becomes `cleanup_storage` or equivalent
- Its purpose is garbage collection of orphaned SHA-keyed storage (old commit SHAs that are no longer current)
- It MUST NOT be required for correctness — the system MUST serve correct content regardless of whether cleanup has been run
- It is a storage hygiene operation, not a truth-recovery operation

### 3. Ensure ALL cached/stored artifacts are SHA-keyed

**Current gap:** The previous `invalidate_cache` only cleared `.zip` files. Other derived artifacts (search indexes, parsed document caches, etc.) were not cleared.

**Target behavior:**
- Every stored artifact MUST be keyed to the commit SHA it was derived from
- When the SHA changes, ALL derived artifacts are either re-derived or the old SHA namespace is ignored entirely
- No partial flush. No "we cleared the zips but not the indexes."

### 4. Remove the need for a correctness-oriented flush action from the MCP tool interface

**Current behavior:** `invalidate_cache` is exposed as an MCP tool action, implying it is sometimes necessary for correct operation.

**Target behavior:**
- If a storage cleanup action exists, it is clearly labeled as hygiene, not correctness
- The system description and documentation make clear that cleanup is never required for accurate results
- Agents should never need to call a flush action to get truthful responses

---

## Acceptance Criteria

- [ ] OddKit serves content keyed to the current commit SHA of the baseline branch
- [ ] Changing a canon document in the baseline repo results in OddKit serving the updated content on the next request — without any manual intervention
- [ ] No TTL-based expiration exists in the caching/storage layer
- [ ] The `invalidate_cache` action is either removed or renamed and redefined as storage cleanup with no correctness implications
- [ ] ALL stored artifacts (not just `.zip`) are keyed to their source commit SHA
- [ ] Documentation reflects the new strategy and explains why TTL caching was removed

---

## Explicit Non-Goals

- ❌ Not optimizing for minimal GitHub API calls at the cost of truthfulness
- ❌ Not introducing a "smart" TTL that "probably" stays fresh long enough
- ❌ Not adding cache warming, pre-fetching, or speculative caching of derived content
- ❌ Not trading correctness for latency under any circumstance

---

## Depends On

- **Constraint: Anti-Cache Lying** (`odd/constraint/anti-cache-lying.md`) — the governing constraint
- **Foundational Axioms** (`canon/values/axioms.md`) — the axiomatic basis
- **Decision Rule #15** — Measure Total Cost Before Optimizing

---

## Decision Record: Why This Change

| Factor | TTL Cache (Current) | Content-Addressed (Target) |
|--------|---------------------|---------------------------|
| Correctness guarantee | None — staleness window | Complete — SHA is proof |
| Flush required for truth | Yes | Never |
| Partial flush risk | Yes (proven: .zip only) | Impossible — namespace is atomic |
| Silent staleness | Yes (proven: days) | Impossible — SHA mismatch = fresh fetch |
| Debugging clarity | "Did you clear the cache?" | "What SHA are we on?" |
| TCO | Unbounded (debugging, incidents, trust erosion) | Bounded (one SHA check per session) |

---

## Next

After this is implemented and validated:
1. Update OddKit documentation to reflect the new storage model
2. Remove or rename `invalidate_cache` in the MCP tool interface
3. Add the stale-cache incident as a test case — simulate a baseline change and verify OddKit serves fresh content without intervention
