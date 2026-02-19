---
uri: klappy://docs/oddkit/impl-oddkit-diff
title: "Implementation: oddkit_diff — The Universal 'What Moved' Primitive"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
status: planned
tags: ["oddkit", "implementation", "diff", "changelog", "epistemic-ledger", "github-api", "planning-queue"]
epoch: E0005
date: 2026-02-18
derives_from: "docs/planning/automated-changelog.md, docs/planning/oddkit-write-access.md, odd/ledger/epistemic-ledger.md, canon/principles/ritual-is-a-smell.md, odd/constraint/anti-cache-lying.md"
complements: "docs/oddkit/IMPL-content-addressed-caching.md, canon/CHANGELOG.md, canon/methods/planning-queue.md"
governs: "oddkit MCP server diff action, changelog generation pipeline"
---

# Implementation: oddkit_diff — The Universal "What Moved" Primitive

> oddkit_diff answers the question every returning participant asks: "given where I was, show me what moved." It takes a reference point (version string, datetime, or SHA), resolves it to a commit, compares against HEAD using the GitHub Compare API, and returns categorized changes with tier-derived risk assessment and frontmatter metadata. The changelog is one projection of this output — offline sync, agent staleness detection, human re-entry, and PR review are others. This is Phase 1 of oddkit write access: read-only infrastructure that proves the GitHub API integration pattern without any write risk, eliminates the manual changelog ritual, and delivers the foundational primitive that Phases 2-4 build on.

-----

## Summary — One Primitive, Every Consumer

The manual changelog ritual failed during 0.32.0 → 0.33.0: reconstruction required git archaeology across multiple sessions. The 0.33.0 changelog was then generated from five git commands in under 30 seconds — proving the approach. oddkit_diff formalizes this into a reusable MCP action.

The primitive is `diff(since, scope?) → structured_changes`. "Since" accepts three input types that all resolve to the same thing — a base SHA:

- **Version string** (e.g. `"0.32.0"`) → finds the commit that last touched `canon/CHANGELOG.md` at or before that version
- **Datetime** (e.g. `"2026-02-14"`) → finds the latest commit before that timestamp
- **SHA** (e.g. `"ecd32a7"`) → uses directly

Every consumer asks the same question with different inputs: the version bump author wants changes since last release, the returning human wants changes since Friday, the reconnecting app wants changes since last sync, the agent wants to know if its context is stale. One primitive serves all of them.

-----

## Phase 1 Deliverables

### 1. oddkit_diff MCP Action

**Action name:** `diff`

**Parameters:**

|Parameter|Required|Description                                                 |
|---------|--------|------------------------------------------------------------|
|`input`  |Yes     |Reference point: version string, ISO datetime, or commit SHA|
|`context`|No      |Path prefix scope filter (e.g. `"canon/"`, `"odd/"`)        |

**Tool definition for MCP:**

```json
{
  "name": "oddkit_diff",
  "description": "Show what changed since a reference point. Accepts a version string (e.g. '0.32.0'), datetime (e.g. '2026-02-14'), or commit SHA. Returns categorized changes with risk assessment derived from document tier and stability. Use for changelog generation, staleness detection, context refresh, and human re-entry.",
  "parameters": {
    "action": "diff",
    "input": "Reference point — version string, ISO datetime, or SHA",
    "context": "Optional path scope (e.g. 'canon/' to see only canon changes)"
  }
}
```

**Response structure:**

```json
{
  "action": "diff",
  "result": {
    "status": "CHANGES_FOUND",
    "base": {
      "sha": "ecd32a7...",
      "resolved_from": "0.32.0",
      "resolution_method": "changelog_commit"
    },
    "head": {
      "sha": "abc1234..."
    },
    "summary": {
      "total_changes": 32,
      "added": 16,
      "modified": 16,
      "removed": 0,
      "high_risk": 2,
      "medium_risk": 8,
      "low_risk": 22
    },
    "categories": [
      {
        "name": "Constraints",
        "path_prefix": "canon/constraints/",
        "changes": [
          {
            "path": "canon/constraints/example.md",
            "status": "added",
            "title": "Example Constraint",
            "tier": 1,
            "stability": "stable",
            "risk": "high",
            "risk_reason": "New Tier 1 document — foundational obligation"
          }
        ]
      }
    ],
    "risk_assessment": {
      "high": ["Tier 1 stable document changed — foundational obligation shifted"],
      "medium": ["New Tier 2 documents added — shared obligations evolved"],
      "low": ["New writings added — no operational impact"]
    }
  },
  "debug": {
    "duration_ms": 1200,
    "api_calls": 3,
    "generated_at": "2026-02-19T..."
  }
}
```

-----

## Internal Implementation Steps

### Step 1: Resolve Reference Point to Base SHA

Three resolution paths, one output:

**Version string** (e.g. `"0.32.0"`):

- Use GitHub Commits API to find commits touching `canon/CHANGELOG.md`
- `GET /repos/{owner}/{repo}/commits?path=canon/CHANGELOG.md`
- Search commit messages or CHANGELOG content for the version string
- The commit that last touched CHANGELOG at that version IS the boundary

**Datetime** (e.g. `"2026-02-14"` or `"2026-02-14T23:59:59Z"`):

- `GET /repos/{owner}/{repo}/commits?until={datetime}&per_page=1`
- Returns the latest commit before that timestamp
- Use its SHA as the base

**SHA** (e.g. `"ecd32a7"`):

- Pass through directly
- Validate it exists via `GET /repos/{owner}/{repo}/commits/{sha}`

**Heuristic for input type detection:**

- Matches `/^\d+\.\d+\.\d+$/` → version string
- Matches `/^\d{4}-\d{2}-\d{2}/` → datetime
- Matches `/^[0-9a-f]{7,40}$/i` → SHA
- Otherwise → return error with guidance

### Step 2: Compare Base to HEAD

GitHub Compare API:

```
GET /repos/{owner}/{repo}/compare/{base}...{head}
```

This returns:

- `files[]` — array of changed files with `filename`, `status` (added/modified/removed/renamed), `patch`
- `commits[]` — array of commits between base and head
- `total_commits` — count

**Filter out derived/non-content paths:**

- `public/` — build output
- `node_modules/` — dependencies
- `.github/` — CI config (unless specifically scoped)
- `package.json`, `package-lock.json` — dependency metadata
- Any path starting with `.` — hidden files

**Apply scope filter:** If `context` parameter is provided (e.g. `"canon/"`), only include files whose path starts with that prefix.

### Step 3: Fetch Frontmatter for Each Changed File

For each file in the diff:

- Fetch the file content at HEAD: `GET /repos/{owner}/{repo}/contents/{path}?ref={head_sha}`
- Parse YAML frontmatter to extract: `title`, `tier`, `stability`, `tags`, `uri`
- For removed files, fetch at base SHA instead (the file doesn't exist at HEAD)

**Optimization:** The existing oddkit baseline fetch already downloads and caches all content at the current SHA. If the diff's HEAD matches the current baseline SHA (which it will in most cases), reuse the already-cached content instead of making per-file API calls. This means frontmatter extraction costs zero additional API calls for the common case.

### Step 4: Classify by Path Prefix

Use the path classification table from the planning doc:

|Path prefix           |Category       |
|----------------------|---------------|
|`canon/constraints/`  |Constraints    |
|`canon/values/`       |Values         |
|`canon/methods/`      |Methods        |
|`canon/principles/`   |Principles     |
|`canon/diagnostics/`  |Diagnostics    |
|`canon/meta/`         |Meta           |
|`canon/decisions/`    |Decisions      |
|`canon/resonance/`    |Resonance      |
|`canon/definitions/`  |Definitions    |
|`canon/apocrypha/`    |Apocrypha      |
|`odd/`                |ODD            |
|`odd/constraint/`     |ODD Constraints|
|`odd/ledger/`         |Ledger         |
|`odd/getting-started/`|Getting Started|
|`docs/`               |Docs           |
|`docs/audits/`        |Audits         |
|`docs/evidence/`      |Evidence       |
|`docs/oddkit/`        |OddKit Docs    |
|`docs/planning/`      |Planning       |
|`docs/incidents/`     |Incidents      |
|`writings/`           |Writings       |

Match longest prefix first (e.g. `canon/constraints/` before `canon/`). Unmatched paths go to an "Other" category.

### Step 5: Compute Risk Assessment

Risk derives from tier + stability + change type:

**High risk** — recommend reviewing before proceeding:

- Tier 1 + stable + modified → "Foundational obligation shifted"
- Tier 1 + any stability + added → "New foundational content to internalize"
- Tier 1 + any stability + removed → "Foundational document removed — loss of obligation"
- `odd/` path + modified → "Behavioral layer affected"

**Medium risk** — review when convenient:

- Tier 2 + any change → "Shared obligation evolved"
- Tier 1 + evolving + modified → "Foundational content still evolving"
- Method or diagnostic changed → "Operational guidance shifted"

**Low risk** — informational:

- Tier 3 + any change → "Reference material updated"
- `writings/` + any change → "No operational impact"
- README or index files → "Navigation improved"

Files without frontmatter (or without tier metadata) default to low risk.

### Step 6: Format and Return

Assemble the response structure shown above. Group changes by category, sort categories by risk (highest first), sort files within categories by risk then alphabetically.

-----

## Existing Infrastructure to Reuse

**GitHub API client:** oddkit already fetches baseline content via GitHub raw URLs. The Compare API and Commits API use the same authentication (if any) and base URL pattern. The `baseline_url` config already points to the correct repo.

**Content-addressed cache:** The SHA-keyed cache (`~/.oddkit/cache/{repo}/{sha}/`) already stores all baseline content. For diffs where HEAD = current baseline SHA, frontmatter extraction can read from cache with zero API calls.

**Frontmatter parser:** The BM25 search index already parses frontmatter from all 365+ documents. The same parser extracts title, tier, stability, tags. This is not new code.

**Search index:** The lazy-built in-memory index already has all document metadata. If the index is populated (which it is after any search call), the diff can read metadata from the index instead of fetching individual files.

-----

## API Rate Limits

GitHub API: 60 requests/hour unauthenticated, 5000/hour with token.

The diff action makes:

- 1 call for reference resolution (Commits API)
- 1 call for comparison (Compare API)
- 0-N calls for frontmatter (0 if cache hit, N if files need fetching)

For the common case (HEAD = cached baseline), total API calls = 2. Well within limits even without auth.

-----

## Edge Cases

**Empty diff:** Base and HEAD are the same SHA. Return `{ status: "NO_CHANGES", base, head }`.

**Invalid reference:** Version string not found, datetime before repo creation, SHA doesn't exist. Return `{ status: "INVALID_REFERENCE", error: "..." }` with guidance on valid inputs.

**Large diff:** GitHub Compare API has a limit of 300 files. If exceeded, the response includes `"files_truncated": true`. Return what we have with a warning.

**Renamed files:** GitHub reports these as `status: "renamed"` with `previous_filename`. Classify by new path, note the rename.

**Binary files / non-markdown:** Skip frontmatter extraction. Include in the diff with `"type": "binary"` or `"type": "non-markdown"`. Default to low risk.

-----

## Definition of Done

Per `canon/constraints/definition-of-done.md`:

1. **Change Description:** New `diff` action added to oddkit MCP server
1. **Verification Performed:** Run `oddkit_diff(since: "0.32.0")` against the klappy.dev repo
1. **Observed Behavior:** Output matches the manually-generated 0.33.0 changelog — same files, same categories, same tier classifications
1. **Evidence Produced:** Test output log showing the diff result compared against the known 0.33.0 changes
1. **Self-Audit:** Confirm the action handles all three input types (version, datetime, SHA), respects scope filtering, and correctly computes risk from tier metadata

**Acceptance test:** The output of `oddkit_diff(since: "0.32.0")` should list the same 16 added and 16 modified files that appear in the 0.33.0 CHANGELOG entry, with correct tier and category classifications.

-----

## What This Does NOT Include

- **No write access.** This is purely read-only. No branches, no PRs, no commits.
- **No CHANGELOG file generation.** The diff returns structured data. A separate consumer (CI Action, website, or future oddkit action) renders it as markdown. Build the primitive first.
- **No automatic version bumping.** The human decides when a version boundary exists. The diff just shows what's between two points.
- **No content-level diffs.** File-level metadata (added/modified/removed + frontmatter) only. Content diffs ("what specifically changed in axiom 2") are a future enhancement.

-----

## Implementation Plan

**Estimated scope:** One new action handler in the oddkit MCP server, following the same pattern as existing actions (orient, search, get, etc.). The GitHub API calls, frontmatter parsing, and path classification are all compositions of existing capabilities.

**Files to modify:**

- Action handler registry (add `diff` action)
- New diff handler module (reference resolution, comparison, classification, risk computation)
- Tool definition (MCP tool schema for the new action)

**Files to create:**

- Diff handler module
- Path classification config (the prefix→category table)
- Risk assessment logic

**Dependencies:**

- GitHub Compare API (REST, no new libraries needed — standard fetch/HTTP)
- Existing frontmatter parser
- Existing cache infrastructure

-----

## Derivation

- **Automated Changelog planning doc** (`docs/planning/automated-changelog.md`) — the primary spec. This IMPL is the execution handoff for Option A (oddkit action first).
- **oddkit Write Access planning doc** (`docs/planning/oddkit-write-access.md`) — Phase 1 of the four-phase roadmap. oddkit_diff proves the GitHub API integration pattern that Phases 2-4 extend.
- **Epistemic Ledger** (`odd/ledger/epistemic-ledger.md`) — git IS the ledger. oddkit_diff makes the ledger queryable.
- **Ritual Is a Smell** (`canon/principles/ritual-is-a-smell.md`) — the manual changelog is the ritual this eliminates.
- **Anti-Cache Lying** (`odd/constraint/anti-cache-lying.md`) — a generated diff cannot lie about what changed because it reads from source.
- **Content-Addressed Caching IMPL** (`docs/oddkit/IMPL-content-addressed-caching.md`) — established the SHA-keyed caching pattern this action reuses.
- **Planning Queue method** (`canon/methods/planning-queue.md`) — this doc is the first planning-queue item to be picked up for execution, validating the convention.
