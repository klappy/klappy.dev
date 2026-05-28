---
uri: klappy://odd/ledger/2026-05-23-p0010-retrieval-disclosure-contract-proposal-drafted
title: "Session Ledger — P0010 Retrieval Disclosure Contract Proposal Drafted"
audience: odd
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "ledger", "session", "p0010", "catalog", "progressive-disclosure", "structural-filters", "telemetry", "vodka-architecture", "epoch-8.4"]
epoch: E0008.4
date: 2026-05-23
session_span: "2026-05-23 — single session, in progress"
derives_from: "canon/meta/writing-canon.md, canon/meta/frontmatter-schema.md, canon/principles/vodka-architecture.md, canon/constraints/mode-discipline-and-bottleneck-respect.md, docs/audits/guide-posture-audit.md, canon/constraints/borrow-evaluation-before-implementation.md"
governs: "Retrospective record of the 2026-05-23 session that diagnosed oddkit_catalog token bloat from production telemetry (76.65M of 78.74M tokens × 7 days from a single consumer) and drafted canon proposal P0010 establishing the catalog's progressive-disclosure-at-retrieval contract and structural-axis filter model. Records decisions, observations, learnings, constraints, the handoff to operator review, and open items deferred to acceptance/execution."
status: active
---

# Session Ledger — P0010 Retrieval Disclosure Contract Proposal Drafted

> Diagnosed catalog token bloat from telemetry (76.65M of 78.74M tokens from one consumer × 7 days, ~112K tokens per call), traced cause to non-progressive catalog response shape, drafted canon proposal P0010 establishing the progressive-disclosure-at-retrieval contract and structural-axis filter model. Ran the orient → preflight → search → challenge → validate gauntlet on the draft. Amendments from challenge added Alternatives Considered, Prior Art (Borrow Evaluation), Disconfirmer, and Strongest Opposing View sections. Pending operator review.

## Summary

The session began with a telemetry inspection request and ended with a fully-gauntlet-tested canon proposal draft pending operator review. The cost pattern surfaced from production data: `klappy.dev-doc-listing` consumed 97.4% of all oddkit token output over a 7-day window, paying ~112,000 tokens per call for what should be a thin metadata lookup. Direct observation of the `oddkit_catalog` response shape confirmed the cause — the action returns either the entire flat category taxonomy or a full-frontmatter document listing, with no provision for the per-document progressive disclosure that the writing canon already requires of every document.

The initial framing was "bifurcate by category — default to essays, exclude handoffs and encodings." Canon search reframed it: progressive disclosure is a property of each document, not of the retrieval tool, and the structural axes the catalog should filter on (`audience`, `exposure`, `tier`, `public`) are already required by the frontmatter schema. Direct corpus sampling confirmed those axes are populated across handoffs, ledgers, canon, and essays. The proposal landed in `canon/constraints/` rather than `canon/principles/` or `canon/methods/` because it is a hard requirement on both the implementation (the catalog action) and the consumer (the website renderer and any future agentic caller).

The gauntlet surfaced three material amendments after the first draft: an alternatives table, a borrow evaluation citing JSON:API sparse fieldsets / GraphQL field selection / OData `$select` as prior art, and a disconfirmer naming the four conditions under which the constraint should be revisited. The challenge prompts also surfaced `docs/audits/guide-posture-audit.md` (2026-02-17) as the precursor observation — that audit already identified the homepage's mix of audiences via `exposure: nav` and `start_here` markers and recommended document-level remediation. P0010 is the retrieval-layer counterpart that audit was implicitly waiting for.

## [D] Decisions

- Canon proposal P0010 targets `canon/constraints/catalog-progressive-disclosure-and-structural-filters.md` as a new tier-2 constraint, not a principle and not a method, because it is a hard requirement on both the implementation and consumers. The principle layer is already occupied by `vodka-architecture` and the writing canon's progressive disclosure; the method layer is for diagnostic moves rather than for binding contracts.
- Filter axes are structural frontmatter fields (`audience`, `exposure`, `tier`, `public`, `start_here`, `path_prefix`), NOT tag categories. The original "default to category=essay" framing was rejected because tags are many-to-many and unbounded, while structural axes are deterministic by construction and already declared per document in the schema.
- The catalog has no embedded domain defaults; callers declare audience intent through filters. This preserves vodka-architecture compliance — the action stays thin and opinion-free, and the audience decision sits with the caller who has it.
- The legacy fat response shape is preserved behind an `include_legacy_envelope: true` opt-in flag for one deprecation window. The flag is introduced at the constraint's landing version (N) and removed at N+2 minor versions.
- A precursor frontmatter audit MUST confirm every document carries valid `audience`, `exposure`, and `tier` values before the constraint enforces. The audit is added to the existing `canon-quality.yml` CI workflow as a soft check first, then flipped to hard enforcement after the corpus is verified clean.
- **(Operator revision, rev 2)** The catalog action MUST accept a `disclosure_depth` parameter with four tiers (`shallow` → `with_blockquote` → `with_metadata` → `with_summary`) and per-depth maximum-limit caps (500 / 200 / 100 / 25 respectively). The ceiling stops at `with_summary` — no body content at any depth. Full-body retrieval flows through `oddkit_get` one document at a time as the bulk-archival safeguard. A request whose `limit` exceeds the depth cap MUST return an explicit `LIMIT_EXCEEDS_DEPTH_CAP` error envelope rather than silently truncating.
- **(Operator revision, rev 2)** The catalog is elevated to a first-class action in the proactive rhythm post-landing — small enough at the default depth (~1.3K tokens for a 25-doc shallow slice) to be a per-turn move alongside `oddkit_time`, `oddkit_orient`, and `oddkit_search`. A companion update to `canon/bootstrap/model-operating-contract.md` is in scope for the same execution arc that lands this constraint, not a separate proposal.
- **(Operator revision, rev 2)** A "klappy.dev as the Reference Consumer" section was added to the canon doc, documenting the four concrete catalog use cases the site has (homepage carousel / essays index / canon governance index / sitemap), the filter + depth + limit declaration for each, and the expected token cost. Pre-constraint: ~112K tokens × 4 calls/hour. Post-constraint with edge caching: a low-thousands figure per week.
- **(Operator revision, rev 3)** The proposal scope expands from catalog-only to **all five retrieval actions** (`search`, `catalog`, `get`, `preflight`, `resolve`). Operator observation: catalog and search are the same kind of thing (retrieval at a chosen depth, filtered by intent), differing only in query shape (semantic vs. structural); fragmented per-action contracts are the deeper problem and a unified canonical contract is the correct fix. Proposal target document renamed to `canon/constraints/retrieval-disclosure-contract.md` and tier elevated from 2 to **1** (foundational), placing it alongside `borrow-evaluation-before-implementation` and `definition-of-done` in epistemic obligation.
- **(Operator revision, rev 3)** Fixed-name depth tiers (`shallow` / `with_blockquote` / `with_metadata` / `with_summary`) replaced with **independent flags** in a `disclosure` array. Operator framing: "I love the fact that you're just saying flags because I don't know what you wanna grab with it — letting the caller turn what they want on or off per call." Default is the empty array → response is URI + title only (~25 tokens/doc), the absolute minimum. The caller opts into `blockquote`, `metadata`, `summary`, `body` independently. The most restrictive cap among active flags governs the limit. This is the GraphQL/JSON:API field-selection model, applied per-call across all five actions.
- **(Operator revision, rev 3)** Per-action allowances declared: `search`, `catalog`, `preflight` cap at `summary` (no body); `get` and `resolve` permit `body` because they are URI-shaped single-result actions. A caller who passes `body` to a query-shaped or list-shaped action receives an explicit `DISCLOSURE_FLAG_NOT_PERMITTED` error envelope. Bulk-archival prevention is now structural rather than ad-hoc: the only path to full bodies is N separate single-URI calls.
- **(Operator revision, rev 3)** Default response per document is URI + title only, not the rev-2 base set of (path, uri, title, audience, exposure, tier, date, tags). The operator's insight: with descriptive titles and the structural filter declarations, a caller with high confidence can decide what to fetch from URI + title alone; a caller with low confidence makes a second targeted call with richer flags on a narrower slice. Two cheap calls beats one fat call.
- **(Operator revision, rev 3)** Companion update to `canon/bootstrap/model-operating-contract.md` now spans all five retrieval actions joining the proactive rhythm, not just catalog. Per-turn move becomes: cheap retrieval (any of the five) → drill via `oddkit_get` for specific URIs that surfaced.
- **(Operator revision, rev 3 amendment)** Added `include` / `exclude` filter parameters with a canonical document-kind enumeration (`canon`, `docs`, `journals`, `essays`, `apocrypha`). Default `include` is `["canon", "docs", "essays"]` — journals and apocrypha are opt-in. This addresses the primacy-vs-burying tension surfaced in conversation: canon governance is what callers usually want; journals are operationally critical but secondary in primary retrieval. Sorting was rejected (would make journals functionally invisible); a separate `oddkit_history` action was rejected (would expand tool surface). The include/exclude parameter solves it without adding tools and without burying journals — they stay first-class for callers who explicitly request them.
- **(Lovable consumer review, post-PR-open)** Relayed the proposal to the klappy.dev builder (Lovable, which has the oddkit MCP connected). Review returned a verified call inventory (13 sites across `doc-listing`, `oddkit.ts`, and 7 search edge functions), a migration mapping, and three genuine proposal defects now fixed in the proposal:
  - **Defect 1 — `kind` had no source of truth.** Resolved: kind is frontmatter-primary (`kind:` field wins), path-secondary (path-prefix mapping as fallback). Operator decision: kind should be flexible so different repos (klappy.dev, oddkit-kb, aquifer-mcp) can organize directories differently. The canonical enumeration is fixed across repos; the path mapping is per-repo configurable; the frontmatter field is the per-doc override.
  - **Defect 2 — `score`/`snippet` fell outside the disclosure axis.** Resolved: added an "Action-Native Fields Are Outside the Disclosure Axis" subsection. `score` and `snippet` are always present on search hits regardless of `disclosure`; `snippet` (query-matched excerpt) is explicitly distinct from `blockquote` (document's own summary). Existing search consumers keep working under default `disclosure: []`.
  - **Defect 3 — reference-consumer table mixed real and aspirational use cases.** Resolved: table now labels each row **(today)** or **(aspirational)**; corrected from "four use cases" to the verified inventory; the homepage carousel (served by a separate `start-here-manifest` function today) and the operator journals viewer (does not exist; `isPublicFacing()` excludes journal paths) are marked aspirational.
  - Verification criteria expanded from 9 to 11 checks (kind two-tier resolution; action-native fields present at default disclosure). Risk mitigation adds: precursor frontmatter audit should report path-derived kind so `kind:` overrides are deliberate.
  - Lovable confirmed `oddkit_get`/`oddkit_resolve` callers (5 sites) need no change beyond confirming the response shape — the schema default `["body"]` already matches their current behavior. No `preflight`/`resolve` consumers exist, so those action changes are free for klappy.dev.

## [O] Observations

- Production telemetry over the 7-day window ending 2026-05-23 13:38 UTC: `oddkit_catalog` was called 699 times producing 77.0M tokens out of a 78.7M total across all tools. The single consumer `klappy.dev-doc-listing` accounted for 686 of those calls (4 per hour, sustained, 24/7) at an average of 111,733 tokens per response (min 54,738; max 144,118; avg bytes ~430KB). All on prod worker version `0.28.1`, with full cache-hot pathing (avg 25ms duration) — so the cost is purely response serialization size, not generation.
- The frontmatter schema (`canon/meta/frontmatter-schema.md`, dated 2026-04-04, derived from a corpus analysis of 389 documents) already declares `audience`, `exposure`, `tier`, and (for public essays) `public` as universal required fields. The structural axes the catalog should filter on already exist in the corpus; the catalog ignores them.
- Direct corpus sampling via `oddkit_search` with `include_metadata: true` confirmed the axes are populated correctly: handoffs and ledgers carry `audience: odd, exposure: nav, tier: 3`; canon principles carry `audience: canon, exposure: nav, tier: 2`; public essays carry `audience: public, exposure: public, tier: 1, public: true`. The split is already declared per document.
- `docs/audits/guide-posture-audit.md` (2026-02-17) is the precursor — it already identified that the homepage surfaces documents through `start_here` markers and `exposure: nav` metadata, with many entries being "structurally internal documents (audience: canon, docs, odd) that happen to be publicly visible." The audit recommended document-level remediation (reframe, or guide-layer in front). P0010 is the retrieval-layer counterpart that audit's recommendations implicitly required.

## [L] Learnings

- Progressive disclosure in canon is a property of each DOCUMENT — the writing canon mandates per-doc tiers (title, blockquote, metadata, summary, full body). The catalog tool ignores that authoring discipline by collapsing all tiers into one fat response. Retrieval-layer progressive disclosure is the natural counterpart and was missing as a named concept; this proposal names it.
- The operator named the bottleneck-respect violation when the agent asked "want me to grab a few frontmatter samples to check?" instead of just looking. Verifiable empirical questions should be answered by the agent observing, not by the operator guessing. `canon/constraints/mode-discipline-and-bottleneck-respect.md` applied directly: the agent's effort is cheap, the operator's attention is finite, and asking for verifiable facts during execution is the inversion the constraint forbids.
- `oddkit_challenge` with `mode: canon-tier-2` surfaces all applicable challenge types simultaneously (proposal, pattern-coinage, assumption, principle-extraction, strong-claim) — useful for high-stakes canon work. The substantive amendments came from the `canon_constraints` field (specifically the surfacing of `guide-posture-audit` and `borrow-evaluation-before-implementation`) more than from the generic question lists. The lesson: read the canon citations the challenge surfaces, not only the prompts.

## [C] Constraints (binding for execution)

- Implementation cannot begin until the precursor frontmatter audit confirms every document carries valid `audience`, `exposure`, and `tier` values. Per the constraint's own Risk Assessment mitigation, this is a blocking precondition — not a soft recommendation.
- The oddkit version bump MUST include the `include_legacy_envelope: true` flag at the constraint's landing version (N). The flag is removed at N+2 minor versions. No exceptions for "we have only one consumer anyway" — the flag is the migration affordance, and removing it before N+2 leaves any second consumer (current or future) without a migration path.
- The canon doc proposed inside P0010 derives from `writing-canon`, `frontmatter-schema`, `vodka-architecture`, and `mode-discipline-and-bottleneck-respect`. These citations must not drift during execution; the `derives_from` field in the canon doc's frontmatter is load-bearing.

## [H] Handoff

Operator review of P0010 draft at `/home/claude/work/proposal-p0010/P0010-catalog-progressive-disclosure-and-structural-filters.md` (311 lines, fully gauntlet-tested through orient → preflight → search → challenge → validate). On acceptance:

1. Open PR to `klappy.dev` for the proposal artifact at `docs/promotions/P0010-catalog-progressive-disclosure-and-structural-filters.md` (combined acceptance + execution per P0002 reference pattern — both the proposal file and the new canon constraint file land in the same PR).
2. Open a precursor PR for the frontmatter audit script integration into `canon-quality.yml` (soft enforcement first), and verify the corpus is clean.
3. Once both klappy.dev PRs merge, open implementation PR(s) against `klappy/oddkit` for the catalog action contract change: new response shape, new filter parameters, the `include_legacy_envelope` deprecation flag, and the version bump.

The first oddkit implementation PR is a single feature branch; the catalog contract change is bounded and does not require splitting across phases.

## [E] Encodes (governance records produced this session)

This session journal serializes 8 DOLCHEO artifacts (5 strong, 3 adequate per the encode quality scoring): one Constraint summary, five typed entries (1 Decision, 1 Observation, 1 Learning, 1 Constraint, 1 Handoff), one Encode-of-encodes, and one Open-items aggregation. The proposal artifact itself (P0010) is the primary durable deliverable from this session and is referenced by the Handoff above.

Encoded via `oddkit_encode` then persisted to this file per the known sharp edge that `oddkit_encode` does not persist on its own.

## [O] Open Items

- **Legacy envelope deprecation window length.** Currently specified as `N → N+2 minor versions`. Whether N+2 is the right horizon depends on the migration tempo of the `klappy.dev-doc-listing` consumer. Review at constraint acceptance time; may extend to N+3 if the consumer migration spans more than one minor-version release.
- **`oddkit_taxonomy` action.** The current catalog default returns a global tag enumeration; under P0010 that disappears from the catalog response. Whether tag enumeration should be exposed as a separate `oddkit_taxonomy` action or absorbed into existing introspection surface is flagged but out of scope for P0010. Surfacing the question here so the next epoch's planning catches it.
- **TruthKit linkage.** TruthKit's continuous bidirectional DOLCHEO compression will need to pull a filtered subset of canon into its compression layer rather than the full corpus. The structural filter axes P0010 introduces are likely the right axes for that selection, but the linkage belongs in a TruthKit-side proposal rather than in P0010.

## [O] Lovable Confirmation Round (post-merge)

After PR #216 (proposal) and PR #217 (Lovable-review amendments) merged to main, the klappy.dev builder re-fetched the final contract and confirmed it matches the reported call inventory with no new mismatches. Two implementation commitments and one important sequencing refinement:

- **[D] Decided — `isPublicFacing()` removal is gated on the frontmatter audit, not the contract merge.** The site keeps its path-dominant public-facing filter as defense-in-depth. Removal sequence: (1) audit lands and corpus has trustworthy `audience` + `exposure`; (2) shadow-compare server-side `audience: public, exposure: public` against local `isPublicFacing()` for ~1 week, logging diffs; (3) only then drop the client-side filter. Both run in parallel until step 3, server-side primary, `isPublicFacing()` belt-and-braces.
- **[L] Learned — the contract's filtering premise needs TWO validation gates, not one.** The frontmatter audit proves the structural fields *exist and are valid*; the shadow-compare proves they are *correct* against a real consumer's ground-truth filter. These are different guarantees. The earlier plan treated the audit as the single gate; Lovable's shadow-compare correctly splits "present" from "right." The shadow-compare diff log is the empirical instrument for the proposal's own disconfirmer ("frontmatter axes are not consistently populated / callers mis-declare audience intent") — if divergence is large, that is the disconfirmer firing with evidence rather than speculation.
- **[D] Decided — implementation order confirmed and held.** No code until the oddkit implementation PRs land. Order: (1) add `src/lib/retrieval.ts` wrapper with 7 named functions matching the reference table; (2) migrate `oddkit_get` callers first (lowest risk, defaults align with `["body"]`); (3) migrate `searchDocuments`, verifying `score`/`snippet` arrive at default disclosure; (4) decompose `doc-listing` last behind `include_legacy_envelope: true` during cutover — the 97% token win, most careful rollout; (5) plumb `include_legacy_envelope` through `oddkit-proxy` before step 4.
- **[O] Open — two minor non-blocking consumer-side items.** (a) `fetchDocument()` still calls the umbrella `oddkit` tool rather than the action-native `oddkit_get`; Lovable will switch it during wrapper migration step 2. (b) The `start_here: true` filter would let the dedicated `start-here-manifest` edge function be retired — logged as post-cutover follow-up, not part of initial migration. Neither is a contract violation.

## [O] Critical-Path Dependency Chain (as of this round)

```
frontmatter audit (oddkit/klappy.dev side)
   -> proves corpus has valid audience/exposure/tier/kind values
   -> reports path-derived kind so explicit kind: overrides are deliberate
execution PR: lands canon/constraints/retrieval-disclosure-contract.md + bootstrap update
oddkit implementation PRs: five-action contract change in klappy/oddkit
   -> SIGNAL to Lovable: begin migration
Lovable migration steps 1-5
shadow-compare week (server filter vs isPublicFacing)
   -> proves values are correct, not just present
drop isPublicFacing(); structural filters become sole gate
```

The frontmatter audit is the next milestone and the load-bearing precondition for everything downstream.

## See Also

- `klappy://docs/promotions/P0010-catalog-progressive-disclosure-and-structural-filters` — the proposal artifact this session produced
- `klappy://canon/meta/writing-canon` — per-document progressive disclosure mandate that P0010 mirrors at the retrieval layer
- `klappy://canon/meta/frontmatter-schema` — declares the structural axes P0010's filters operate on
- `klappy://canon/principles/vodka-architecture` — the thin-substrate principle P0010 operationalizes for the catalog
- `klappy://canon/constraints/mode-discipline-and-bottleneck-respect` — the constraint the operator invoked when correcting the agent's mid-execution clarifying question
- `klappy://docs/audits/guide-posture-audit` — the 2026-02-17 audit that is P0010's precursor observation
- `klappy://canon/constraints/borrow-evaluation-before-implementation` — the constraint that required the prior-art table P0010 added in amendment
