---
uri: oddkit://tools/cleanup_storage
title: "oddkit_cleanup_storage"
audience: operators
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "tool", "maintenance", "storage", "cleanup", "cache"]
---

# oddkit_cleanup_storage

> Storage hygiene — clears orphaned cached data from old commit SHAs. Never required for correctness.

## Description

`oddkit_cleanup_storage` removes orphaned storage namespaces keyed to commit SHAs that are no longer current. It is a garbage collection operation, not a correctness operation. The system serves correct content regardless of whether cleanup has run, because content-addressed storage ensures that a SHA mismatch always triggers a fresh fetch.

This tool exists because OddKit's storage model keys all cached artifacts to the commit SHA of the baseline branch (see `docs/oddkit/IMPL-content-addressed-caching.md`). Over time, old SHA-keyed namespaces accumulate as the baseline advances. Cleanup removes these orphans to reclaim storage space. It does not affect what content is served — that is determined solely by the current SHA.

This tool evolved from the former `invalidate_cache` action, which was a correctness tool that attempted to flush stale content. The content-addressed storage redesign made correctness-oriented flushing unnecessary. Unlike `invalidate_cache`, `cleanup_storage` is never needed for correct operation. See `docs/oddkit/IMPL-content-addressed-caching.md` for the full design rationale and the incident that motivated the change.

## When to Use

- When storage is growing large and orphaned SHA namespaces should be reclaimed
- As periodic maintenance (not urgent — accumulation is bounded and harmless)
- Never for correctness — if results seem stale, the issue is elsewhere (check the current SHA, not the cache)

## Tool Definition

**Name:** `oddkit_cleanup_storage`

**Description:** Storage hygiene — clears orphaned cached data from old commit SHAs. NOT required for correctness. Content-addressed caching ensures fresh content is served automatically when the baseline changes. This is a garbage collection operation that removes storage namespaces keyed to SHAs that are no longer current. Safe to skip entirely. May take time for large caches.

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "canon_url": {
      "type": "string",
      "description": "Optional. GitHub repo URL for canon override. If not provided, uses the default configured canon repository."
    }
  },
  "required": []
}
```

### Response Shape

```json
{
  "action": "cleanup_storage",
  "result": {
    "status": "cleaned | nothing_to_clean",
    "removed_items": "number — count of orphaned storage namespaces removed"
  }
}
```

> **Note:** This response shape is approximate. The tool timed out during testing on a large cache. The structure is documented based on the tool's described purpose from the MCP server and the content-addressed caching implementation document.

## Behavioral Rules

1. **Does NOT affect correctness.** The system serves correct content based on the current commit SHA regardless of whether cleanup has run. If results seem stale, do not call cleanup — investigate the SHA resolution instead.
2. **May take time for large caches.** Cleanup iterates over stored namespaces and compares them to the current SHA. Large accumulated caches may cause the operation to take significant time or time out.
3. **Safe to skip entirely.** This is a hygiene operation. Skipping it indefinitely has no effect on the truthfulness or accuracy of served content. Storage space is the only cost of not running it.
4. **Cleans orphaned SHA-keyed namespaces.** Only removes storage keyed to commit SHAs that are no longer the current baseline SHA. The current SHA's storage is never touched.
5. **Not a correctness recovery tool.** Unlike the former `invalidate_cache`, this tool cannot and should not be used to "fix" stale results. Content-addressed storage makes stale results structurally impossible when the SHA resolution is correct.
6. **No partial cleanup risk.** Because all artifacts are keyed to the same SHA namespace, cleanup removes entire namespaces atomically — there is no risk of clearing some artifacts while leaving others stale (the failure mode of the former `invalidate_cache`).

## Canon References

- `klappy://odd/constraint/anti-cache-lying` — The constraint that drove the content-addressed storage redesign
- `klappy://docs/oddkit/impl-content-addressed-caching` — Full design rationale, incident background, and acceptance criteria
- `klappy://canon/values/axioms` — Axiom 1 (Reality Is Sovereign) — the system must not serve stale content as truth
