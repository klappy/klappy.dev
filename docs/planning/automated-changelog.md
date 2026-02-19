---
uri: klappy://docs/planning/automated-changelog
title: "Planning: The Changelog Is an Epistemic Ledger"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["planning", "changelog", "epistemic-ledger", "automation", "ritual-smell", "oddkit", "git", "diff", "sync", "progressive-disclosure"]
epoch: E0005
date: 2026-02-18
derives_from: "canon/principles/ritual-is-a-smell.md, canon/constraints/humans-are-variable-inputs.md, odd/constraint/anti-cache-lying.md, odd/ledger/epistemic-ledger.md"
complements: "canon/CHANGELOG.md, docs/oddkit/IMPL-content-addressed-caching.md"
---

# Planning: The Changelog Is an Epistemic Ledger

> The changelog is not a changelog. It is the epistemic ledger for the repository itself. Every commit records an observation (files changed), a learning (why — the commit message), and a decision (to commit). Git is the storage mechanism. CHANGELOG.md is a progressive disclosure surface — a curated projection of the ledger at version-boundary resolution. The manual ritual of maintaining it has already failed. The fix is not better discipline. The fix is recognizing that the ledger already exists in git and generating the projection from it. The broader primitive — "given where I was, show me what moved" — serves changelogs, offline sync, agent context staleness, and human re-entry as a single universal query.

-----

## Summary — Git Is the Ledger, CHANGELOG.md Is a Projection

The epistemic ledger concept defines durable artifacts that survive ephemeral conversations. Git is that ledger for any repository — every commit records what changed (observation), why (learning), and the decision to ship. The CHANGELOG.md has been a hand-maintained copy of information that already exists in structured, queryable form. It is a lossy transcription that depends on human memory — the exact failure mode the system exists to prevent. The fix: generate the changelog from git history and frontmatter. The version bump becomes a human decision to name a milestone — identified by the commit that last touched CHANGELOG.md, not by tags. The entries accumulate automatically. The broader primitive — "given where I was, show me what moved" — serves changelogs, offline sync, agent staleness detection, and human re-entry as one universal query.

-----

## The Insight — Hidden in Plain Sight

The epistemic ledger concept (`odd/ledger/epistemic-ledger.md`) defines durable artifacts that survive ephemeral conversations: observations, learnings, decisions, constraints, handoffs. The ledger's storage mechanism is the project's choice — "it could be a folder in the repo, a database, a key-value store, or any other durable storage."

Git is that storage. Every commit is a ledger entry:

- **Observation**: files added, modified, or removed — what changed in the system's state
- **Learning**: the commit message and PR description — why it changed
- **Decision**: the act of committing — this change was reviewed and accepted
- **Constraint**: the frontmatter on each file — tier, stability, scope, derivation
- **Handoff**: the PR itself — a transition from one state to another, reviewed at the boundary

The CHANGELOG.md has been a hand-maintained copy of information that already exists in structured, queryable form. It is a lossy transcription of the ledger — the exact "humans as lossy inputs" failure mode the system exists to solve.

The version bump is not a ritual. It is a **decision** — the human names a milestone when the ledger has accumulated enough entries to warrant one. The entries themselves do not wait for the decision. They exist the moment they're committed.

-----

## The Enforcement Problem — And Why It Dissolves

Three enforcement failures converge:

- **Commit hooks exist** but Claude Code doesn't run them — the enforcement mechanism is dead on arrival
- **Version bumps are manual** — nobody is forced to bump, so they happen at random intervals
- **Changelog updates are manual** — they depend on the same human who forgot to bump

The instinct is to add more enforcement: CI checks, merge gates, required fields. But the epistemic ledger reframes this. You don't enforce journal entries. You make the journal derived from the source of truth that already exists. The enforcement question dissolves because the entries generate themselves from commits.

What remains is the human decision to name milestones (version bumps) and add narrative (the summary paragraph). Those are genuine human contributions, not rituals. Everything else — the file list, the tier classification, the risk assessment, the commit references — is generated.

-----

## The Problem — A Ritual That Predicted Its Own Failure

The canon CHANGELOG.md is currently maintained by hand. A human must remember what changed, search conversations, cross-reference oddkit, and reconstruct the timeline. This process:

- Violates **Humans Are Variable Inputs** — it depends on a person remembering to update a file after every meaningful change
- Triggers **RITUAL_DETECTED** — correctness depends on repeated human memory of a procedure
- Failed observably — the 0.32.0 → 0.33.0 gap required manual reconstruction across conversation histories, oddkit searches, and git archaeology spanning multiple sessions
- Creates invisible drift — constraints, values, and methods were committed to canon but invisible to anyone reading the changelog

The ritual failed exactly as predicted by the system's own principles. The fix is not "be more disciplined about updating the changelog." The fix is recognizing that git history already IS the changelog.

-----

## The Evidence — 0.33.0 Was Generated, Not Remembered

The 0.33.0 changelog was produced from three git commands and frontmatter parsing:

1. `git log --oneline -- canon/CHANGELOG.md | head -1` — found the version boundary (commit `ecd32a7`)
2. `git diff --name-status ecd32a7..HEAD` — returned every file added, modified, or removed (16 added, 16 modified)
3. `git show HEAD:{file} | grep frontmatter` — extracted title, tier, and stability from each file
4. `git diff --stat` — measured change magnitude per file
5. `git log --format` — retrieved commit messages and PR references

Total execution: under 30 seconds. No memory required. No conversations searched. No reconstruction.

-----

## The Primitive — "Given Where I Was, Show Me What Moved"

The changelog is one consumer of a broader primitive. The universal query is:

```
diff(since: <reference_point>, scope?: <path_prefix>) → structured_changes
```

Where `reference_point` is a SHA, a datetime, or a version string that resolves to a SHA.

This serves every consumer that needs to know what changed:

| Consumer | Reference Point | Scope | Question |
|----------|----------------|-------|----------|
| **Version bump author** | Last CHANGELOG commit | everything | "What landed since 0.32.0?" |
| **Human returning Monday** | Friday datetime | everything | "What happened last week?" |
| **Offline app reconnecting** | Last synced SHA | everything | "Worth updating? What changed?" |
| **Agent starting session** | Baseline SHA in context | canon/ | "Is my context stale?" |
| **PR reviewer** | Branch base | everything | "What does this PR actually touch?" |
| **New team member** | 30 days ago | canon/ | "What's been active recently?" |

These are all the same query with different inputs.

-----

## The Output — Structured Changes With Risk Assessment

The diff returns more than a file list. Because frontmatter already carries tier and stability metadata, the output includes a risk signal:

**High risk** (recommend updating before proceeding):
- Tier 1 stable document changed — foundational obligation shifted
- ODD axiom or constraint modified — behavioral layer affected
- ODD contract version bumped — system-level change

**Medium risk** (update when convenient):
- Tier 2 document changed — shared obligation evolved
- New Tier 1 document added — new foundational content to internalize
- Method or diagnostic changed — operational guidance shifted

**Low risk** (informational):
- Tier 3 document changed — reference material updated
- New writing added — no operational impact
- README or index updated — navigation improved

This is the anti-cache-lying constraint applied to human consumption: instead of pretending your cached understanding is current, the system explicitly says "here's your reference point, here's reality, here's the delta, here's the risk of staying where you are."

-----

## Design Decisions — CHANGELOG Commits as Version Boundaries, Dates Resolve to SHAs

### The CHANGELOG.md file as version boundary marker

No tagging required. The commit that last touched `canon/CHANGELOG.md` IS the version boundary. This works because:

- The CHANGELOG is already edited at every version bump
- The file path is stable and unambiguous
- `git log -- canon/CHANGELOG.md` returns the boundary commit directly
- No new convention needed — uses existing behavior

This avoids the multi-namespace tagging problem. Canon versions, oddkit versions, ODD contract versions, and epoch boundaries are all different version spaces. A git tag like `v0.32.0` is ambiguous — which version? The CHANGELOG file is unambiguous — it belongs to canon.

If oddkit gets its own CHANGELOG in the oddkit repo, the same mechanism works there with its own version boundaries. Each repo's CHANGELOG is its own timeline.

### Date-based queries resolve to SHA-based queries

When a human asks "what changed since Friday," the system:

1. Finds the latest commit before Friday: `git log --before="2026-02-14T23:59:59" -1 --format=%H`
2. Runs the same SHA-based diff from that commit to HEAD

Date is a convenience input. SHA is the actual primitive. This preserves precision without requiring users to know commit hashes.

### Path classification is derived from directory structure

The changelog categories are not manually assigned. They derive from the path:

| Path prefix | Category |
|------------|----------|
| `canon/constraints/` | Constraints |
| `canon/values/` | Values |
| `canon/methods/` | Methods |
| `canon/principles/` | Principles |
| `canon/diagnostics/` | Diagnostics |
| `canon/meta/` | Meta |
| `canon/decisions/` | Decisions |
| `canon/resonance/` | Resonance |
| `odd/` | ODD |
| `odd/constraint/` | ODD Constraints |
| `odd/ledger/` | Ledger |
| `docs/` | Docs |
| `docs/audits/` | Audits |
| `docs/evidence/` | Evidence |
| `docs/oddkit/` | OddKit Docs |
| `writings/` | Writings |

This is not "meaning depends on path" (which the canon prohibits). The path classification is a display convenience for the changelog, not an epistemic claim. The document's actual scope is in its frontmatter. The path just determines which section of the changelog it appears in.

### Human-written summary remains human-written

The generated output is a structured draft. The one-paragraph summary at the top of each changelog version ("This release introduces...") remains human-authored. The system generates the evidence; the human provides the narrative.

-----

## Implementation Options — oddkit Action First, Then Website and CI

### The Projection Model

CHANGELOG.md becomes a generated projection of the git ledger, not a source document. The projection has progressive disclosure built in:

**Level 1 — Version summary** (what a scanning reader sees): version number, date, one-paragraph narrative, count of changes by category. This is the only human-written part — the summary paragraph.

**Level 2 — Categorized changes** (what someone evaluating an update sees): files grouped by path prefix (Constraints, Values, Methods, Writings, etc.), each with title from frontmatter, tier, and stability. Added/Modified/Removed status. Risk assessment derived from tier + change type.

**Level 3 — Commit history** (what someone reconstructing the timeline sees): SHA, PR number, PR title, date. Full traceability to the git ledger.

The website can render all three levels dynamically. The CHANGELOG.md file in the repo can be generated at any level, or replaced entirely by an oddkit query.

### Option A: oddkit action (`oddkit_diff`)

Add a new action to the oddkit MCP server:

```
oddkit_diff(since: "0.32.0" | "2026-02-14" | "abc123", scope?: "canon/")
```

Internally:
1. Resolve `since` to a SHA (version string → find CHANGELOG commit; datetime → find latest commit before; SHA → use directly)
2. GitHub Compare API: `GET /repos/{owner}/{repo}/compare/{base}...{head}`
3. Filter out derived paths (`public/`, `_compiled/`, `node_modules/`)
4. For each file, fetch frontmatter (title, tier, stability) from the head revision
5. Classify by path prefix
6. Compute risk assessment from tier + stability + change type (add/modify/delete)
7. Return structured result at the requested disclosure level

This serves every consumer: changelog generation, offline sync decisions, agent staleness detection, human re-entry after absence. The changelog is just one projection of the result.

Pros: Available everywhere oddkit runs. Fits the existing tool pattern. Uses the GitHub API oddkit already depends on. Serves the universal primitive, not just changelogs.

Cons: Adds a new action. GitHub API rate limits apply (5000/hour with auth — more than sufficient).

### Option B: Dynamic website view

The odd.klappy.dev website renders the changelog dynamically from git history, the same way it already renders canon documents dynamically from the repo. No CHANGELOG.md file needed — the website IS the projection.

Pros: No file to maintain at all. Progressive disclosure is native to the web interface. Always current.

Cons: Only available on the website. Doesn't serve agents, offline apps, or CLI users.

### Option C: CI-generated CHANGELOG.md

A GitHub Action generates CHANGELOG.md on every push or PR merge. The human reviews and adds the summary paragraph via PR.

Pros: The file exists for consumers that need it. Enforcement is automatic — no hooks, no human memory.

Cons: Adds CI complexity. The generated file can still drift if the generation logic has bugs.

### Recommendation: Option A first, then B and C naturally follow

The oddkit action is the primitive. Once `oddkit_diff` exists, the website can call it for dynamic rendering (Option B) and CI can call it for file generation (Option C). Build the primitive, the projections follow.

-----

## What Remains Human

The **summary paragraph** at the top of each version entry — the narrative that says "this release is about X." This is a genuine human contribution: naming the shape of the change. The system generates the evidence; the human provides the meaning.

The **version number** — the human decides when accumulated entries warrant a named milestone. This is a decision, not a ritual. It happens when it happens.

The **philosophy section** — observations about the system that emerge from the work. These are learnings in the epistemic ledger sense. They're optional and human-authored.

Everything else — file lists, tier classifications, risk assessments, commit references, change magnitudes — is generated from the ledger that git already maintains.

-----

## Open Questions

1. **Should the diff include actual content changes or just file-level metadata?** File-level (added/modified/removed + frontmatter) is sufficient for changelogs. Content-level diffs might be useful for "what specifically changed in the axioms" but significantly increases output size and complexity.

2. **Should the risk assessment be part of the diff output or a separate query?** Keeping it together is simpler. Separating it allows different consumers to use the diff without the risk layer.

3. **How should multi-repo projects work?** If oddkit and klappy.dev are separate repos with separate CHANGELOGs, the diff action needs to know which repo to query. Currently oddkit already knows its baseline URL. The action would naturally scope to whichever repo oddkit is pointed at.

4. **Should the CHANGELOG.md eventually become fully generated?** The human summary adds value. But the file lists, tier classifications, and commit references could be entirely generated, with only the summary and philosophy sections remaining human-authored.

-----

## Derivation

This planning document derives from:

- **The Epistemic Ledger** (`odd/ledger/epistemic-ledger.md`) — the core reframe. The changelog is not a separate artifact; it is the ledger for the repository. Git is the storage mechanism. CHANGELOG.md is a projection.
- **Ritual Is a Smell** (`canon/principles/ritual-is-a-smell.md`) — the manual changelog is a compensating control that depends on human memory
- **Humans Are Variable Inputs** (`canon/constraints/humans-are-variable-inputs.md`) — the ritual fails when the human forgets, is busy, or loses track of what changed
- **Anti-Cache Lying** (`odd/constraint/anti-cache-lying.md`) — a stale CHANGELOG is a polite lie about system state; a dynamically generated projection cannot lie because it reads from source
- **RITUAL_DETECTED diagnostic** (`canon/diagnostics/ritual-detected.md`) — this is an instance of the canonical smell
- **OddKit Stale Cache Incident** (`docs/incidents/oddkit-stale-cache-2026-02.md`) — prior art for staleness detection failure; content-addressed caching solved the same problem for document retrieval
- **D0003: PRD Version Auto-Detection** (`docs/decisions/D0003-prd-version-auto-detection.md`) — established the pattern of parsing from source at runtime rather than hardcoding

-----

## Next Steps

1. Include this document in the 0.33.0 handoff as a new planning doc (`docs/planning/automated-changelog.md`)
2. The 0.33.0 CHANGELOG entry was already generated from git — this is proof-of-concept evidence
3. After 0.33.0 lands, implement `oddkit_diff` as the universal "what moved" primitive
4. Use `oddkit_diff` to generate the 0.34.0 changelog entry, validating the approach end-to-end
5. Once validated, decide whether CHANGELOG.md becomes fully generated (with human summary) or whether the website renders the ledger dynamically and the file is retired
6. Encode the insight as a method in canon: "Changelogs Are Ledger Projections, Not Maintained Documents"
