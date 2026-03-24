---
uri: klappy://docs/planning/oddkit-full-frontmatter-and-drift-audit
title: "Planning: Stop Filtering Frontmatter — Full Metadata Indexing and Automated Drift Detection"
audience: internal
exposure: internal
tier: 2
voice: neutral
stability: evolving
tags: ["planning", "oddkit", "frontmatter", "drift", "audit", "projection", "anti-cache-lying", "infrastructure"]
epoch: E0006
date: 2026-03-21
derives_from:
  - "odd/constraint/anti-cache-lying.md"
  - "canon/values/axioms.md (Axiom 1 — Reality Is Sovereign)"
  - "canon/methods/supersession.md (projection constraint)"
  - "canon/meta/constraint-driven-audits.md"
complements: "docs/oddkit/IMPL-oddkit-diff.md, docs/planning/automated-changelog.md"
forcing_fault: "March 21 2026 drift audit: 12 governance findings identified manually across 3 documents in ~90 minutes. 7 of 12 findings were stale projections — files whose content is derived from other documents but committed as source. The Worker's frontmatter parser cherry-picks 6 fields, which means every new field the system needs requires a code change. This is a hardcoded projection of 'what metadata matters' — the same pattern the supersession method constrains against."
---

# Planning: Stop Filtering Frontmatter — Full Metadata Indexing and Automated Drift Detection

> The oddkit Worker cherry-picks 6 frontmatter fields and discards the rest. Every time the system evolves to need a new field, someone must add another regex to the parser. This is a hardcoded projection — a cached assumption about what matters, violating the same Anti-Cache Lying principle the system enforces for data. The fix: parse and store all frontmatter. The index becomes a mirror of what documents actually declare, not a filtered subset. With full metadata available, oddkit can automate drift detection — terminological drift, dead references, epoch gaps, projection staleness — turning a 90-minute manual audit into a tool call. Three phases: (1) store all frontmatter in the index, (2) build oddkit_audit to detect drift from indexed metadata, (3) tag projections and detect staleness. Phase 1 eliminates future friction permanently. Phase 2 automates the audit we did manually today. Phase 3 eliminates the most painful class of drift.

-----

## Summary — The Index Should Reflect Reality, Not Someone's Past Guess About It

The oddkit Cloudflare Worker's frontmatter parser (`zip-baseline-fetcher.ts`) currently extracts 6 fields using targeted regex patterns: title, intent, authority_band, uri, tags, exposure. Everything else in the YAML frontmatter block is discarded.

The Node CLI (`buildIndex.js`) does better — it uses `gray-matter` (a real YAML parser) and stores the full frontmatter object alongside cherry-picked fields. But the Worker — which is what runs at `oddkit.klappy.dev` and serves every MCP consumer — doesn't.

This means the production search index is blind to: stability, superseded_by, supersedes, epoch, derives_from, complements, derived_from, type, date, constraint, governs, and every other frontmatter field that governance, drift detection, and the supersession method need.

The cost of this gap was measured on March 21, 2026: a manual drift audit took ~90 minutes to do what an automated check against indexed metadata could do in seconds. Seven of twelve findings were stale projections that could have been detected automatically if the index knew about `derived_from` relationships.

The Worker's field filter is itself a hardcoded projection — a snapshot of "what metadata mattered when this code was written," committed as source, going stale every time the system evolves. It violates Anti-Cache Lying applied to documentation infrastructure.

-----

## Phase 1 — Store All Frontmatter (No Filtering)

### What Changes

Replace the 6 targeted regex extractions in `zip-baseline-fetcher.ts` with a generic frontmatter parser that extracts all `key: value` pairs from the YAML block and stores them as a single object on each indexed document.

### Current Implementation (Worker)

```typescript
// zip-baseline-fetcher.ts — current pattern (repeated 6 times)
const titleMatch = yaml.match(/^title:\s*["']?(.+?)["']?\s*$/m);
if (titleMatch) result.title = titleMatch[1];
```

### Proposed Implementation

```typescript
// Parse all frontmatter as generic key-value pairs
function parseAllFrontmatter(yaml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const line of yaml.split('\n')) {
    const match = line.match(/^(\w[\w_-]*):\s*(.+)$/);
    if (match) {
      const [, key, rawValue] = match;
      const value = rawValue.trim().replace(/^["']|["']$/g, '');
      // Handle arrays: [item1, item2]
      if (value.startsWith('[') && value.endsWith(']')) {
        result[key] = value.slice(1, -1).split(',')
          .map(t => t.trim().replace(/["']/g, ''));
      } else if (value === 'true') {
        result[key] = true;
      } else if (value === 'false') {
        result[key] = false;
      } else if (!isNaN(Number(value)) && value !== '') {
        result[key] = Number(value);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}
```

### Scoring Impact

The scoring function in `orchestrate.ts` currently reads typed top-level fields:

```typescript
if (entry.authority_band === "governing") score += 5;
if (entry.intent === "promoted") score += 3;
```

After the change, these read from the generic frontmatter object:

```typescript
if (entry.frontmatter?.authority_band === "governing") score += 5;
if (entry.frontmatter?.intent === "promoted") score += 3;
// NEW: supersession penalty
if (entry.frontmatter?.stability === "superseded") score *= 0.3;
```

### Size Impact

Total frontmatter across 428 files: ~958KB. Current index already holds titles, tags, excerpts, content previews. Adding full frontmatter approximately doubles metadata per document. Well within Cloudflare Worker memory limits (128MB standard) and KV value size limits (25MB).

### Index Version

Bump `INDEX_VERSION` to trigger full rebuild on next request.

### Definition of Done

- Worker parses all frontmatter fields, not a hardcoded subset
- Scoring reads from generic frontmatter object
- Superseded documents (stability: superseded) receive score penalty
- Existing tests pass (search results, get behavior)
- Index version bumped

-----

## Phase 2 — oddkit_audit Action

### What It Does

New MCP action: `oddkit_audit`. Takes a scope (path prefix or "all"). Runs automated drift checks against indexed metadata. Returns structured findings classified by the five-response taxonomy (tolerate, observe, graduate, replace, regenerate).

### Checks

**Terminological drift:** Scan document content (titles, tags, headings) for terms that don't match any current document's vocabulary. Detect when a document references a concept by an outdated name. Example: "Lane Self-Containment" when no current document uses "lane."

**Dead references:** Check `derives_from`, `complements`, `supersedes`, `superseded_by` fields for URIs that don't resolve to any document in the index. Dead governance links.

**Epoch gap:** Flag documents whose `epoch` tag is more than one epoch behind the current epoch. Not automatically wrong — a stable axiom document from E0003 is fine — but a signal to examine governance documents that may have drifted.

**Projection staleness:** For documents with `type: projection` and `derived_from`, compare source document content hashes against the projection's last-known state. If sources changed and projection didn't, it's stale.

**Missing supersession pointers:** Detect when two documents in the same governance surface (same path prefix, overlapping tags) have no declared `supersedes`/`superseded_by` relationship. Surface as "potential silent supersession" for human classification.

### Response Shape

```json
{
  "action": "audit",
  "result": {
    "scope": "canon/",
    "findings": [
      {
        "type": "terminological",
        "document": "canon/constraints/README.md",
        "detail": "Outline references 'Lane Self-Containment' — no current document uses 'lane' in title",
        "suggested_response": "replace",
        "severity": "high",
        "related": ["docs/decisions/D0016-structure-agnostic-odd.md"]
      }
    ],
    "summary": {
      "total": 12,
      "by_type": { "terminological": 4, "dead_reference": 2, "epoch_gap": 3, "projection_stale": 2, "silent_supersession": 1 },
      "by_response": { "tolerate": 2, "observe": 3, "graduate": 2, "replace": 4, "regenerate": 1 }
    }
  }
}
```

### Dependencies

Requires Phase 1 (full frontmatter in index). Without `epoch`, `derives_from`, `derived_from`, and `stability` in the index, most checks can't run.

### Definition of Done

- `oddkit_audit` action accessible via MCP
- At minimum: terminological, dead reference, and projection staleness checks implemented
- Returns structured findings with classification suggestions
- Does NOT auto-fix — detection only, human classifies response

-----

## Phase 3 — Projection Tagging and Staleness Detection

### Content-Side (Parallel with Phase 1)

Tag the ~15 pure projections identified in the March 21 2026 projection inventory:

```yaml
type: projection
derived_from:
  - "klappy://writings/*"  # for writings/README.md
```

This is a batch of frontmatter-only edits. No content changes.

### Code-Side (After Phase 2)

The projection staleness check in `oddkit_audit` reads `derived_from`, fetches each source document's content hash from the index, and compares against a stored hash of the projection's last regeneration. If sources changed, the projection is flagged as stale.

**Storage for projection hashes:** Each projection's frontmatter could include `source_hash: "abc123"` recording the combined hash of its `derived_from` sources at last generation. When audit runs, it recomputes the hash and compares. Mismatch = stale.

### Future — Regeneration Automation (Deferred)

Once projections are tagged and staleness is detectable, the next step is auto-regeneration: `oddkit_generate` action or CI pipeline that takes a stale projection, reads its `derived_from` sources, and produces fresh content. Deferred per Use Only What Hurts — detection first, automation only if detection alone isn't sufficient.

-----

## Open Questions

1. **Generic YAML parsing in the Worker:** The proposed `parseAllFrontmatter` handles flat key-value pairs. Should it handle multi-line values (like `derives_from` as a YAML list)? The Node CLI uses `gray-matter` which handles this natively. The Worker could use a lightweight YAML parser (e.g., inlined subset) instead of regex.

2. **Audit frequency:** Should `oddkit_audit` run on every index rebuild (every request with cache miss)? On explicit invocation only? On a schedule via Cloudflare Cron Trigger?

3. **Finding persistence:** Where do audit findings go? Options: returned in response only (ephemeral), appended to a drift queue file in the repo (requires write path), stored in Durable Objects (requires Worker architecture change).

4. **Projection source granularity:** `derived_from: "klappy://writings/*"` is a glob. Does the hash check hash all writings/ files? Or does each projection declare specific source documents?

-----

## Evidence — Why This Hurts Now

- March 21 2026 drift audit: 90 minutes manual work, 12 findings, 7 were stale projections
- Worker doesn't extract `stability`, `epoch`, `derives_from`, `superseded_by` — the supersession method can't be operationalized without them
- Every new frontmatter field requires a code change to the Worker parser — compounding friction
- The system enforces Anti-Cache Lying for data caching but violates it for metadata filtering in its own indexer
- The constraint-driven audits design (`canon/meta/constraint-driven-audits.md`) already describes the architecture but has no implementation

-----

## Relationship to Other Planning Docs

- **oddkit_diff** (`docs/oddkit/IMPL-oddkit-diff.md`) — diff answers "what changed since X?" Audit answers "what's inconsistent right now?" They're complementary: diff detects change events, audit detects accumulated drift.
- **Automated changelog** (`docs/planning/automated-changelog.md`) — The changelog is the ledger of changes. The audit is the ledger of inconsistencies. Both feed the epistemic ledger.
- **Write path** (`docs/planning/E0005_2-epoch-definition.md`) — Audit findings need to go somewhere durable. Currently they'd be returned in the response and lost. The write path would let findings persist as drift queue entries.
