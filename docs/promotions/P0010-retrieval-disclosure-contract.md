---
uri: klappy://docs/promotions/P0010-retrieval-disclosure-contract
title: "P0010: Retrieval Disclosure Contract — A Canonical Shape for All Document Retrieval Actions"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["promotions", "proposed", "retrieval", "disclosure", "catalog", "search", "get", "preflight", "resolve", "progressive-disclosure", "frontmatter", "structural-filters", "vodka-architecture", "telemetry"]
promotion_status: proposed
---

# P0010: Retrieval Disclosure Contract — A Canonical Shape for All Document Retrieval Actions

> The writing canon requires every document to be actionable at multiple disclosure tiers (URI/title, blockquote, metadata, summary, full body). The five oddkit retrieval actions (`search`, `catalog`, `get`, `preflight`, `resolve`) MUST share a single canonical disclosure contract — URI + title is the floor every action returns, the `disclosure` array (`blockquote`, `metadata`, `summary`, `body`) is additive on top, and each action declares its own default `disclosure` set in its MCP schema (query/list actions default to `[]`; URI-shaped `get`/`resolve` default to `["body"]`). Same per-flag limit caps, same structural filter axes (`audience`, `exposure`, `tier`, `public`, `start_here`, `path_prefix`, `include`, `exclude`) where filters apply. Document-kind primacy is captured by `include`/`exclude` over a short canonical enumeration (`canon`, `docs`, `journals`, `essays`, `apocrypha`); the default excludes `journals` and `apocrypha` so primary documents do not drown in operational chatter, while explicit opt-in keeps journals first-class for the callers that need them. `body` is permitted only on `get` (and `resolve`), never on `search`, `catalog`, or `preflight`, so bulk-archival flows through one-document-at-a-time `get` calls as a structural safeguard. The caller declares filters and disclosure flags; the action honors both. Fragmented per-action shapes are replaced by one shape with action-specific declared defaults.

## Observed Pattern

`oddkit_catalog` returns one of two fat shapes today, neither of which respects the per-document progressive disclosure the writing canon already requires:

1. **Default response** (no `sort_by`): returns the flat union of every tag in the corpus (~600 strings as of 2026-05-23) plus a `start_here` list plus a category-rollup summary. The taxonomy itself is the payload.
2. **`sort_by` response**: returns up to `limit` (default 10, max 500) document entries with full frontmatter inlined per entry. A `sort_by=path` call with the implicit "give me everything" intent returns ~80–144K tokens per response.

Neither shape is progressive disclosure. Both are eager serializations of the entire index keyed differently.

The pathology is observable in production telemetry over the seven days ending 2026-05-23:

- `oddkit_catalog` was called 699 times, producing 77.0M tokens out of a 78.7M total across all tools.
- The single consumer `klappy.dev-doc-listing` accounted for 686 of those calls (4 per hour, sustained) at an average of 111,733 tokens per response (min 54,738; max 144,118; ~430KB average body).
- The same consumer's `tokens_in` averaged ~12 tokens per call — confirming the bloat is entirely on the response side, not from a chatty request.
- All 686 calls were on prod worker version `0.28.1` with full cache-hot pathing (avg 25ms duration), so the cost is purely serialization size, not generation.

The proximate cause is that `klappy.dev-doc-listing` is asking the catalog for "everything renderable on the site," but the catalog has no mechanism to express that intent. The site is forced to pull the whole corpus and filter client-side, paying the full serialization cost on every page render.

The deeper cause is that **the five oddkit retrieval actions (`search`, `catalog`, `get`, `preflight`, `resolve`) each return documents with a different disclosure shape**, even though they are all serving the same job from the caller's perspective: "give me documents matching some intent, at a depth I choose." `oddkit_search` accepts an `include_metadata` boolean. `oddkit_catalog` accepts a `sort_by` parameter that determines whether you get a tag-rollup or a doc-list. `oddkit_get` returns the full document with no depth control. `oddkit_preflight` returns an opinionated bundle of "relevant docs + constraints + DoD" with no caller control over what's inlined. `oddkit_resolve` returns the resolved document at an unspecified depth. The contracts diverge silently, and the catalog's particular failure mode is the most expensive instance of the divergence — but every retrieval action has the same shape mismatch.

The frontmatter schema (`canon/meta/frontmatter-schema.md`) already declares the structural axes that segment the corpus: every document carries `audience`, `exposure`, `tier`, and (for public essays) `public`. The catalog has no mechanism to filter on those axes, and search/preflight/resolve each have their own ad-hoc filter or none at all.

- Affects: every retrieval action and every consumer (the website's listing endpoint dominantly via catalog; LLM operators and curl-driven sessions across all five actions)
- Outcome without the change: catalog cost scales with canon size, not with caller intent; per-action disclosure shapes drift independently; bulk archival is structurally possible through any action that doesn't enforce the body safeguard; the website's `klappy.dev-doc-listing` consumer pays ~76M tokens/week for a metadata lookup
- Outcome with the change: one canonical disclosure contract across all five retrieval actions; the default response shape is URI + title only (~25 tokens/doc); the caller opts into richer disclosure (`blockquote`, `metadata`, `summary`) and structural filters on a per-call basis; `body` is allowed only on actions where body retrieval is the action's purpose (`get`, `resolve`); the website drops from ~112K tokens per call to ~1.8K–25K depending on the specific use case; LLM consumers can call any retrieval action without exhausting their context window

## Evidence

| Validation Session | Date | Outcome | Notes |
| --- | --- | --- | --- |
| Telemetry inspection — 7-day window | 2026-05-23 | OBSERVED | `klappy.dev-doc-listing` accounts for 97.4% of all oddkit token traffic (76.65M of 78.74M); 686 calls × avg 111,733 tokens out |
| Per-doc progressive disclosure already required | n/a (canon) | CITED | `canon/meta/writing-canon.md` mandates every doc be actionable at title → blockquote → metadata → summary → full; the five retrieval actions ignore this and each return a different fixed shape |
| Frontmatter schema declares structural axes | 2026-04-04 | CITED | `canon/meta/frontmatter-schema.md` requires every doc to carry `audience`, `exposure`, `tier`, and (for public essays) `public` — these are the filter axes catalog (and search) should use, not tags |
| Direct corpus sample (handoffs, ledgers, canon, essays) | 2026-05-23 | OBSERVED | All sampled docs carry `exposure: nav` (working artifacts) or `exposure: public` (published essays); the split is already declared per-document |
| Per-action contract inspection | 2026-05-23 | OBSERVED | `oddkit_search` accepts `include_metadata: bool`; `oddkit_catalog` accepts `sort_by`; `oddkit_get` has no depth control; `oddkit_preflight` returns an opinionated bundle; `oddkit_resolve` returns the resolved doc at unspecified depth. Five actions, five disclosure shapes, none consistent with each other |

**Total observations**: 4 independent confirmations across telemetry, canon, schema, and corpus
**Independent occurrences**: 1 production consumer responsible for 97.4% of token traffic; the pattern would recur for any future site-renderer consumer
**Affected workflows**: `klappy.dev-doc-listing` (production), any future site/agent renderer consuming the catalog, LLM operators reading the catalog into a session context window

## Current Handling

- **Detection today**: there is no automated detection. The pattern surfaced through manual telemetry inspection on 2026-05-23 in response to an unrelated review of consumer/tool token shares.
- **Closest existing canon**:
  - `canon/meta/writing-canon.md` — requires per-document progressive disclosure but does not constrain the retrieval layer that serves those documents.
  - `canon/principles/vodka-architecture.md` — requires thin, non-opinionated surfaces; the current catalog default (returning a category rollup the caller never asked for) is a vodka violation, but no constraint operationalizes that for the catalog specifically.
  - `canon/meta/frontmatter-schema.md` — declares `audience`, `exposure`, `tier`, `public` as universal required fields, but no constraint requires the catalog to filter on those axes rather than on tag categories.
- **Guidance**: there is no documented contract for what `oddkit_catalog` returns by default, what filter axes it accepts, or what callers are responsible for declaring. The behavior is implicit in the code.

This promotion fills the contract gap: catalog has no canon governing its retrieval shape, and consumers have no canon telling them which axes to filter on.

`docs/audits/guide-posture-audit.md` (2026-02-17) is the precursor observation: it already identified that the homepage surfaces documents through `start_here` markers and `exposure: nav` metadata, with many entries being "structurally internal documents (audience: canon, docs, odd) that happen to be publicly visible." The audit recommended remediation at the document level (reframe, or guide-layer in front). This proposal is the retrieval-layer counterpart: the structural filters the catalog must support are exactly the axes the audit was already reasoning about.

## Alternatives Considered

| Alternative | Verdict | Reason |
| --- | --- | --- |
| Scope the constraint to `oddkit_catalog` only; leave search/get/preflight/resolve untouched | Rejected | The five retrieval actions are doing the same job (return documents at chosen depth, filtered by intent) with five different contracts. A catalog-only fix patches the worst symptom but leaves the structural divergence in place, guaranteeing the same fragmentation will appear in the next consumer-side surprise. Unifying the contract once is cheaper than fixing it five times. |
| Use fixed named depth tiers (`shallow` / `with_blockquote` / `with_metadata` / `with_summary`) instead of independent flags | Rejected | Named tiers force callers into discrete predetermined slots and prevent legitimate combinations (e.g. "just blockquote, no metadata, no summary" or "metadata but not blockquote"). Independent flags let the caller declare exactly what they need; the per-call response is shaped by the caller, not by a designer who pre-decided which combinations are reasonable. JSON:API sparse fieldsets and GraphQL field selection landed on independent selectability for the same reason. |
| Add a `category=essay` default filter to the catalog | Rejected | Tags are many-to-many and unbounded; a single essay tagged `essay` may also be tagged `handoff` (retrospective on a handoff). Requires forever curation of which tags are "in." Structural axes (`audience`, `exposure`) are deterministic by construction. |
| Add a new `oddkit_essays_listing` (or `_publish_listing`) action | Rejected | Tool-surface bloat. `vodka-architecture` requires thin substrates. The catalog already exists; the problem is its contract, not its presence. New actions for each audience class would multiply by audience count. |
| Cache the catalog response at `klappy.dev`'s edge layer with a 5-minute TTL | Accepted as complementary | Independently valuable (cuts 76M → ~600K with zero oddkit changes by amortizing the cost across requests) but does not address the LLM-consumer case where each session pays the full response cost into its context window, and does not address the per-action divergence across the other four retrieval actions. The two fixes compose. The constraint addresses the structural problem; edge caching is the deployment-side amortization. |
| Embed audience-aware opinionated defaults (e.g. "if caller looks like a browser, default to `exposure: public`") | Rejected | `vodka-architecture` violation. Once the catalog has heuristic opinions about caller intent, those opinions drift and consumers depend on them silently. The caller declares; the action honors. |
| Make the response shape configurable at server boot rather than per-call | Rejected | Couples deployment to audience model. The same oddkit instance serves website and LLM consumers; per-call declaration is the only shape that respects the multi-consumer reality. |
| Wait until E0009 (or a future epoch) and ship as part of a larger surface redesign | Rejected | Telemetry shows the cost is being paid continuously at production scale (4 calls/hour, 24/7, 76M tokens/week). The structural fix is independently complete and does not require any other epoch-level work. Deferral is paying the cost for no countervailing benefit. |
| Allow `body` as a disclosure flag on `search`, `catalog`, or `preflight` (with a low limit cap) | Rejected | A list-shaped or query-shaped action that returns body content — even at low limits — is a one-pass corpus exfiltration vector. `body` is permitted only on `get` (and `resolve`, which is a single-URI shape). Bulk body retrieval requires N separate `get` calls, which is observable in telemetry and rate-limitable per worker version. The N-call requirement is the friction by design. |
| Sort journals to the bottom of unfiltered retrieval responses (primacy via ordering) | Rejected | Secondary documents that always sort to page two become functionally invisible. Operators lose the ability to find them; LLM sessions stop incorporating them as working context. The cost of "out of sight, out of mind" is higher than the cost of mixing primaries and secondaries in unfiltered results. The `include`/`exclude` parameter achieves primacy at the filter boundary without the burial side effect. |
| Add a separate `oddkit_history` or `oddkit_journal` retrieval action | Rejected | Adds tool surface to a project that is actively trying to reduce surface area. Journals are a different *role* of document, not a different *kind of query*; the same retrieval semantics (filter, paginate, choose disclosure depth) apply. A parameter on the existing actions captures the distinction with no new tool. |
| Make `audience: odd` the primacy axis (exclude `audience: odd` by default) | Rejected | `audience` declares intended-reader, not document-role. A canon principle authored to be read by canon contributors is `audience: canon`; a session ledger written for project operators is `audience: odd`. Overloading `audience` with primacy semantics conflates two distinct concepts and forces document authors to choose between declaring the reader they had in mind and declaring the primacy role the document plays. The kinds enumeration (`canon`/`docs`/`journals`/`essays`/`apocrypha`) is a separate, smaller, more stable axis. |

## Prior Art — Borrow Evaluation

This constraint is the application of well-established API patterns to the five oddkit retrieval actions. Naming the prior art explicitly to satisfy `canon/constraints/borrow-evaluation-before-implementation.md`:

| Pattern | Source | What We Borrow | Distinction |
| --- | --- | --- | --- |
| Sparse fieldsets | JSON:API spec (jsonapi.org) §"Sparse Fieldsets" | The pattern of returning the minimum by default and letting callers opt in to richer fields via explicit per-call selection | JSON:API uses `?fields[type]=field1,field2`; we use named boolean-style flags in a `disclosure` array because our payload tiers are coarser-grained (URI/title, blockquote, metadata, summary, body) and map directly to the writing canon's per-document tiers |
| Field selection (`SELECT`-style query) | GraphQL, REST `$select` (OData / Microsoft Graph) | The principle that the client declares the selection set per-call and the server returns only the requested fields | GraphQL allows arbitrary field selection per resource type; our selection set is a fixed enumeration (`blockquote`, `metadata`, `summary`, `body`) tied to the writing canon's tiers, which keeps the surface predictable and the per-flag cost legible |
| Universal selection across multiple query shapes | GraphQL (one schema, multiple query/mutation entry points; same selection-set syntax on all) | The unification: the same disclosure declaration works on every retrieval action; the action determines what the query semantics mean, but the response shape contract is shared | We apply this across five action shapes (`search`, `catalog`, `get`, `preflight`, `resolve`) rather than across resources within one schema |
| Resource filtering on structural attributes | REST query parameters, JSON:API filters | Filtering on declared resource attributes rather than tags | Our axes are exactly the universal frontmatter fields the schema already requires, which makes the filter contract enforceable by frontmatter-validation rather than by code |
| Pagination with `limit`/`offset` and a `total` count | REST convention, JSON:API spec | The shape of the pagination envelope (`limit`, `offset`, `total`) | Standard convention; no novelty claimed |

We are not coining a new pattern. We are applying a well-known REST/JSON:API/GraphQL pattern to a tool surface that currently does not use it — and unifying that pattern across five actions that currently each diverge. The pattern coinage in this constraint's title ("Retrieval Disclosure Contract") is the localized name for the unification — it names the link to the writing canon's per-document progressive disclosure, which is the local concept the field's existing patterns do not name.

## Proposed Promotion

### Target Document

`canon/constraints/retrieval-disclosure-contract.md` (new)

Constraint, not principle. The principle layer is occupied: `vodka-architecture` describes the discipline, and the writing canon's progressive disclosure describes the document-level tiering. This document operationalizes both at the retrieval boundary, across all five retrieval actions — it is the rule that `search`, `catalog`, `get`, `preflight`, `resolve` and every consumer of them MUST follow.

This is a **tier-1** constraint because it defines a canonical shape that other documents (per-action specs, future retrieval actions) inherit. Tier-1 places it alongside `borrow-evaluation-before-implementation` and `definition-of-done` in epistemic obligation level.

### Section

Whole document; new file.

### Proposed Language

````markdown
---
uri: klappy://canon/constraints/retrieval-disclosure-contract
title: "Retrieval Disclosure Contract — A Canonical Shape for All Document Retrieval Actions"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["canon", "constraint", "retrieval", "disclosure", "progressive-disclosure", "catalog", "search", "get", "preflight", "resolve", "frontmatter", "structural-filters", "vodka-architecture", "oddkit"]
epoch: E0008.4
date: 2026-05-23
derives_from: "canon/meta/writing-canon.md, canon/meta/frontmatter-schema.md, canon/principles/vodka-architecture.md, canon/constraints/mode-discipline-and-bottleneck-respect.md, canon/constraints/borrow-evaluation-before-implementation.md"
complements: "canon/constraints/oddkit-prompt-pattern.md, canon/constraints/oddkit-action-registration-completeness.md"
governs: "The response shape and accepted disclosure declarations for every oddkit retrieval action (oddkit_search, oddkit_catalog, oddkit_get, oddkit_preflight, oddkit_resolve), and the contract every consumer of those actions must honor"
status: active
---

# Retrieval Disclosure Contract — A Canonical Shape for All Document Retrieval Actions

> The writing canon requires every document to be actionable at multiple disclosure tiers — URI/title, blockquote, metadata, summary, full body. The five oddkit retrieval actions (`oddkit_search`, `oddkit_catalog`, `oddkit_get`, `oddkit_preflight`, `oddkit_resolve`) MUST share a single canonical disclosure contract: URI + title is the floor every action returns, and the caller adds fields via independent flags (`blockquote`, `metadata`, `summary`, `body`) on a per-call basis. Each action declares its own default `disclosure` set in its MCP schema — the query-shaped and list-shaped actions (`search`, `catalog`, `preflight`) default to `[]` (URI + title only); the URI-shaped single-result actions (`get`, `resolve`) default to `["body"]` because a single-URI fetch is unambiguously a content request. `body` is permitted only on `get` and `resolve`; the list-shaped and query-shaped actions cap at `summary` so bulk-archival flows through one-document-at-a-time `oddkit_get` calls as a structural safeguard. Filtering MUST operate on the structural axes every document declares in its frontmatter (`audience`, `exposure`, `tier`, `public`, `start_here`, `path_prefix`) plus the document-kind primacy axes (`include`, `exclude`) over a canonical kind enumeration (`canon`, `docs`, `journals`, `essays`, `apocrypha`); the default `include` set is `["canon", "docs", "essays"]` so primary documents do not drown in operational journals, while explicit opt-in keeps journals first-class for callers that need them. Per-flag limit caps prevent oversized responses regardless of action. The caller declares filters and flags; the action honors both.

## Summary — One Contract, Five Actions

The writing canon (`canon/meta/writing-canon.md`) requires every document in the knowledge base to be progressively disclosed: a reader (human or agent) extracts value from the title alone, from the title plus the one-paragraph blockquote, from the title plus blockquote plus frontmatter metadata, from the explicit Summary section, or from the full body — and the document is designed so each tier is independently actionable. The frontmatter schema (`canon/meta/frontmatter-schema.md`) declares the structural axes that segment the corpus.

Before this constraint, the five oddkit retrieval actions each returned documents at a different fixed shape: `oddkit_catalog` returned full frontmatter inline, `oddkit_search` returned excerpt snippets with optional metadata, `oddkit_get` returned the full document with no depth control, `oddkit_preflight` returned an opinionated bundle, `oddkit_resolve` returned the resolved doc at unspecified depth. Five contracts; five drift surfaces.

This constraint replaces all five with one. Every retrieval action returns URI + title as its floor — small enough that the caller can browse the entire corpus cheaply — and accepts a `disclosure` array declaring which additional tiers to include. Each action declares its own default `disclosure` set in its MCP schema: the query-shaped and list-shaped actions default to the floor alone (`[]`), while the URI-shaped single-result actions (`get`, `resolve`) default to `["body"]` because fetching one named document is unambiguously a content request. The action determines what the query semantics mean (semantic search vs. structural browse vs. direct URI fetch); the response shape contract is shared. `body` is allowed only on actions where body retrieval is the action's purpose. The caller controls disclosure; the contract controls the safeguards.

## The Disclosure Contract — Universal Across Retrieval Actions

Every retrieval action MUST accept a `disclosure` parameter: an array of zero or more flag values selected from the canonical enumeration below. URI + title is the **floor** every action returns regardless of flags; the `disclosure` array is strictly additive on top of that floor. Each action declares its own **default** `disclosure` set in its MCP `inputSchema`, and that schema is the single source of truth that both LLM-driven and programmatic callers resolve against. The query-shaped and list-shaped actions (`search`, `catalog`, `preflight`) declare `default: []` — URI + title only. The URI-shaped single-result actions (`get`, `resolve`) declare `default: ["body"]`, because a single-URI fetch is unambiguously a request for that document's content. The default is never a hidden convention; it is always a declared schema field.

| Flag | Adds to per-doc response | Approx tokens/doc added | Per-flag max limit |
| --- | --- | ---: | ---: |
| (none — default) | `uri`, `title` only | ~25 | 500 |
| `blockquote` | + the one-paragraph blockquote directly under the H1 | +100 | 200 |
| `metadata` | + the full parsed frontmatter (all fields, not just universal) | +100 | 100 |
| `summary` | + the `## Summary` section body | +250 | 25 |
| `body` | + the full document body | +variable, often 1000+ | 1 |

When the caller passes multiple flags (`disclosure: ["blockquote", "metadata"]`), the action MUST return the union of the requested fields and apply the **most restrictive limit cap** in play. A request with `disclosure: ["blockquote", "summary"]` honors the `summary` cap of 25, not the `blockquote` cap of 200.

The base shape (URI + title) MUST always be present in every response, regardless of which flags are passed. The flags are additive; they do not replace the base.

The caps are not arbitrary. They are designed so that any single response, at any combination of flags, stays well under 30K tokens — small enough to consume responsibly inside a single LLM context window. A caller who needs a larger slice at richer disclosure MUST paginate. The friction is the design; the request boundary makes the cost legible.

### Action-Native Fields Are Outside the Disclosure Axis

Some fields are intrinsic to what an action *does* and are not document-disclosure tiers. These are always present in the relevant action's response and are NOT governed by the `disclosure` parameter:

| Field | Action(s) | Why it is action-native |
| --- | --- | --- |
| `score` | `search` | The relevance ranking is the search result, not a disclosure tier of the document. A search hit without its score is not a search hit. |
| `snippet` | `search` | The query-matched excerpt is computed from the query against the document; it is a property of the *match*, not of the *document*. It is distinct from `blockquote` (which is the document's own summary, independent of any query). Both may appear together: `snippet` shows why the doc matched, `blockquote` shows what the doc is about. |
| `total` | `search`, `catalog`, `preflight` | The post-filter result count is a property of the query, not of any document. |
| ordering position | `catalog` | The position under the active `sort_by` is a property of the listing, not of the document. |

`snippet` is NOT a substitute for `blockquote` and `blockquote` is NOT a substitute for `snippet`. A caller that renders search results with a "why this matched" excerpt reads `snippet` (always present on search hits); a caller that wants the document's own summary adds `disclosure: ["blockquote"]`. Existing search consumers that depend on `score` and `snippet` therefore continue to work under the default `disclosure: []` for search, because those fields live outside the disclosure axis entirely.

## Per-Action Allowances — Which Flags Each Action Supports

Each retrieval action declares which `disclosure` flags it permits. The contract is universal; the allowances are action-specific because the actions' semantics differ.

| Action | Allowed flags | Body allowed? | Notes |
| --- | --- | --- | --- |
| `oddkit_search` | `blockquote`, `metadata`, `summary` | No | Query-shaped: returns ranked hits at the requested disclosure. Body retrieval would make search a bulk-extraction vector. |
| `oddkit_catalog` | `blockquote`, `metadata`, `summary` | No | List-shaped: returns documents matching the filter slice at the requested disclosure. Same bulk-extraction reasoning as search. |
| `oddkit_preflight` | `blockquote`, `metadata`, `summary` | No | Task-shaped: returns relevant docs + constraints + DoD at the requested disclosure. Caller no longer receives an opinionated bundle; they declare what shape they want. |
| `oddkit_resolve` | `blockquote`, `metadata`, `summary`, `body` | Yes | URI-shaped (single result): returns the resolved canonical document at the requested disclosure. Schema declares `default: ["body"]` for parity with `get`; body is permitted because resolve is single-result by construction; the limit cap is 1. |
| `oddkit_get` | `blockquote`, `metadata`, `summary`, `body` | Yes | URI-shaped (single result): returns the requested document at the requested disclosure. Schema declares `default: ["body"]` because single-URI fetch is unambiguously a content request; a caller wanting less passes a narrower `disclosure` (e.g. `["metadata"]`). |

The actions where `body` is forbidden (`search`, `catalog`, `preflight`) MUST return an error envelope if `body` is passed in the `disclosure` array — the error is the contract enforcement, not silent omission.

The actions where `body` is allowed (`get`, `resolve`) are single-result actions by construction. A caller cannot use them to bulk-extract the corpus in one call; each body retrieval is a separate action invocation. N bodies require N calls, observable in telemetry and rate-limitable per worker version.

## Structural Filters — For Query-Shaped Actions

The query-shaped actions (`oddkit_search`, `oddkit_catalog`, `oddkit_preflight`) MUST accept filtering parameters that operate on the universal frontmatter fields declared by `canon/meta/frontmatter-schema.md`:

| Filter | Type | Values |
| --- | --- | --- |
| `audience` | string or array of strings | `canon` `docs` `public` `odd` `operators` `apocrypha` |
| `exposure` | string or array of strings | `nav` `public` `draft` `hidden` `internal` |
| `tier` | integer or array of integers | `1` `2` `3` `4` |
| `public` | boolean | `true` `false` |
| `start_here` | boolean | `true` `false` |
| `path_prefix` | string or array of strings | e.g. `"writings/"`, `"canon/"`, `"odd/handoffs/"` |
| `include` | string or array of strings | `canon` `docs` `journals` `essays` `apocrypha` — see "Document Kinds" below |
| `exclude` | string or array of strings | same enumeration as `include` — see "Document Kinds" below |

## Document Kinds — Primacy Without Burying

Beyond the universal frontmatter axes, the query-shaped retrieval actions MUST accept `include` and `exclude` parameters that operate on a small canonical enumeration of **document kinds**. Kinds capture what role a document plays, not who its intended reader is — and they let callers express primacy intent without forcing the catalog into opinionated sorting that would silently bury secondary documents.

The canonical kind enumeration:

| Kind | Default path mapping | Examples |
| --- | --- | --- |
| `canon` | `canon/` path prefix | principles, constraints, methods, meta-canon |
| `docs` | `docs/` path prefix | operational documentation, audits, promotions |
| `journals` | `odd/` path prefix | handoffs, session ledgers, encodings, working notes |
| `essays` | `writings/` path prefix | public essays, articles, published prose |
| `apocrypha` | `apocrypha/` path prefix | explicitly out-of-canon material |

**How `kind` is resolved**: a document's kind is determined by a two-tier rule, frontmatter-primary and path-secondary:

1. **Frontmatter is authoritative.** If a document declares a `kind:` field in its frontmatter, that value wins. The value MUST be one of the canonical enumeration members.
2. **Path is the fallback.** If a document does not declare `kind:`, the action derives it from the document's path prefix using the default path mapping above.

Frontmatter wins on conflict — a document at `writings/foo.md` that declares `kind: journals` is a journal, regardless of where it lives. This two-tier rule is deliberate: it lets different repositories that oddkit serves (klappy.dev, oddkit-kb, aquifer-mcp, and future repos) organize their directories however suits them while still resolving to a consistent kind vocabulary. The path mapping is the convention; the frontmatter field is the override for repos whose layout diverges from it.

The default path mapping is per-repo configurable (oddkit may carry a different prefix→kind table for a repo whose top-level layout differs), but the canonical kind *enumeration* is fixed across all repos — a repo cannot invent a sixth kind. The enumeration is the shared vocabulary; the path mapping and the frontmatter override are the per-repo resolution mechanics.

**Default behavior**: when neither `include` nor `exclude` is passed, the action returns documents of kind `canon`, `docs`, and `essays`. Documents of kind `journals` and `apocrypha` are excluded by default. This is the only opinionated default in the disclosure contract, and it is justified by the primacy distinction: when a caller asks "what does the project say about X," the answer is governance documents and published essays, not the chronological record of how that governance came to be. Journals are operationally critical but secondary in primary retrieval.

**Resolution order**: `include` resolves first as an allowlist; `exclude` is then applied as a denylist over the included set. A caller who passes both has the union narrowed by the difference. Resolution order is fixed and documented at the contract boundary so callers can reason about it without reading the implementation.

**Semantic distinction from `audience`**: `audience` declares who a document is *for* (its intended reader); `include`/`exclude` declares what *role* a document plays in the project (its document kind). A canon principle has `audience: canon` AND `kind: canon`. A session ledger has `audience: odd` AND `kind: journals`. The two axes are related but not synonyms — `audience` answers "who reads this?" and `include` answers "what kind of thing is this?". When a caller asks for `include: ["canon"]`, they want the project's binding governance, regardless of which audience subgroup the docs were authored for.

**Why this is the right place for primacy intent**: the alternative shapes considered and rejected were (a) default sort ordering that floats canon to the top and journals to the bottom — rejected because secondary documents become functionally invisible when sorted to page two of every response, (b) a separate `oddkit_history` or `oddkit_journal` retrieval action — rejected because adding tools violates the discipline of reducing surface area, and (c) leaving primacy entirely to the caller via `path_prefix` filters — rejected because it makes primacy a discoverability problem (callers who don't already know the path layout never find journals). The `include`/`exclude` enumeration is short (five values), stable (kinds match path-prefix structure that already exists), and discoverable (the parameter name itself prompts the caller to declare intent).

The kind enumeration MUST stay short. Adding a sixth kind is a canon amendment, not an implementation decision. Sub-categorization within a kind (e.g. handoffs vs. ledgers vs. encodings, all inside `journals`) MUST happen through `path_prefix` or other structural filters, never by expanding the enumeration.

## Structural Filters — For Query-Shaped Actions (continued)

These are the structural axes. Filtering on them is mechanical — a single comparison against frontmatter that every document is required to declare. The `include` and `exclude` parameters resolve against the document kind (derived from path prefix), not against frontmatter directly, but the resolution is equally mechanical.

The URI-shaped actions (`oddkit_get`, `oddkit_resolve`) take a URI as their primary input and do not accept structural filters — the URI itself is the selector.

The query-shaped actions MUST NOT accept a `category` or `tag` filter as a substitute for structural axes. Tags are many-to-many and unbounded; a document tagged `essay` may also be tagged `handoff`. Filtering on a tag value never produces a clean slice and forever requires curating which tags are "in" the default set. Structural filters produce a deterministic slice by construction.

Query-shaped actions MAY accept a `tags` parameter as an additional filter within a structural slice (e.g., "all `exposure: public` docs tagged `oddkit`"), but tags MUST NOT be used as a substitute for structural filters.

## Default Response Shape

The "default response" of an action is what it returns when the caller passes no `disclosure` array and lets the action's schema default apply. For the query-shaped and list-shaped actions (`search`, `catalog`, `preflight`), the schema default is `[]`, so the default response is the base shape (URI + title); for the URI-shaped actions (`get`, `resolve`), the schema default is `["body"]`, so the default response includes the full document body. In all cases the response MUST:

- Return at minimum the base shape per document: `uri`, `title`, and the minimum fields needed for the action's contract (e.g., `score` for search hits, ordering position for catalog), plus whatever the active `disclosure` set (caller-supplied or schema-default) adds on top
- Include the action's filter and disclosure echoes for caller-side audit (`filters_applied`, `disclosure_applied`) — `disclosure_applied` reflects the resolved set, whether it came from the caller or the schema default
- Report a `total` count where the action returns multiple documents (search hits, catalog entries, preflight results)
- Paginate query-shaped actions by explicit `limit` (default 25; max per active flag cap) and `offset`
- Exclude all opt-in fields unless their flag is in the active `disclosure` set
- Default `include` to `["canon", "docs", "essays"]` on query-shaped actions — `journals` and `apocrypha` are opt-in, per the Document Kinds section. The default `include` is echoed in `filters_applied.include` so callers see what was applied without explicitly setting it
- Exclude global taxonomy rollups, category enumerations, and curated lists (these are not retrieval — they belong to separate introspection endpoints if they belong anywhere)
- Honor the caller's filter and disclosure declarations; the only embedded defaults are the documented per-action schema `disclosure` default and the `include` default, both of which are echoed in the response

No retrieval action MUST change its default response shape based on caller identity, user-agent string, or other heuristic signals. The caller's declarations and the action's declared schema defaults are the only inputs that change the response.

## Caller Responsibilities

A consumer of any retrieval action MUST declare both filter intent (for query-shaped actions) and disclosure intent (for all actions):

- **Public-facing renderers** (a website's docs listing, a public homepage carousel, an external site index) MUST pass `exposure: public` or `audience: public` (or an equivalent structural filter), so the response excludes working artifacts that carry `exposure: nav`. They SHOULD pass `disclosure: ["blockquote"]` when their rendering target needs teaser text, and SHOULD NOT pass `metadata` or `summary` unless those fields are actually rendered.
- **Agentic callers operating in an oddkit session** (an LLM acting as the operator's epistemic harness, a fluent_cw-style agent following the discipline pattern) MAY pass no filters and no disclosure flags when their actual intent is "browse the corpus at minimum cost," then make a follow-up call with narrower filters and richer disclosure on the specific slice they care about. The two-call pattern (cheap browse, then targeted dive) is the default agentic rhythm. When the actual intent is to read project history (handoffs, ledgers, encodings), the caller MUST pass `include: ["journals"]` (or include journals alongside other kinds) — journals are excluded from the default `include` set and require explicit opt-in.
- **Telemetry and observability callers** MUST pass `path_prefix: "odd/"` or an explicit operator-facing filter when their intent is to inspect working artifacts, not to enumerate the published corpus.

Every caller has an audience and SHOULD declare it. When a caller's audience is unclear or cross-cutting, the appropriate move is to pass an explicit `audience` array (`["canon", "public"]`) rather than to call without filters and hope the default matches intent.

## klappy.dev as the Reference Consumer

The `klappy.dev` site is the largest catalog consumer (97.4% of pre-constraint token volume) and the reference implementation for the post-constraint contract. The use cases below were verified against the site's actual call inventory (a Lovable-side review of `supabase/functions/doc-listing/`, `src/lib/oddkit.ts`, and the search edge functions, 2026-05). Rows marked **(today)** map to call sites that exist now; rows marked **(aspirational)** describe intended shapes the site does not yet implement.

| Use case | Status | Action | Filter | Disclosure | Limit | Approx tokens |
| --- | --- | --- | --- | --- | ---: | ---: |
| Full essays/articles index | today | `catalog` | `audience: public, exposure: public` | `["blockquote"]` | 100 | ~15K |
| Canon governance index | today | `catalog` | `audience: canon, tier: [1, 2]` | `["metadata"]` | 100 | ~25K |
| Notebook (single path-prefix view) | today | `catalog` | `path_prefix: <notebook prefix>` | `["blockquote"]` | 100 | ~8K |
| Sitemap / SEO crawl manifest | today | `catalog` | (no filter) | (no flags) | 500 (paginated) | ~25K per page |
| Global search (⌘K, related, auto-link) | today | `search` | (no filter) | `["blockquote", "metadata"]` + native `score`/`snippet` | 25 | ~8K |
| Individual essay page (server-rendered) | today | `get` | (URI) | `["body"]` (schema default) | 1 | ~3K–25K |
| Homepage start-here carousel | aspirational | `catalog` | `start_here: true, exposure: public` | `["blockquote"]` | 12 | ~1.8K |
| Session history viewer (operator-facing) | aspirational | `catalog` | `include: ["journals"], path_prefix: "odd/handoffs/"` | `["blockquote"]` | 25 | ~3.8K |

The two aspirational rows reflect known gaps the Lovable review surfaced. The homepage start-here carousel is today served by a dedicated `start-here-manifest` edge function rather than by a `start_here: true` catalog filter; adopting the filter is optional and would let the dedicated function be retired. The session history viewer does not exist — the site's `isPublicFacing()` filter actively excludes `odd/handoffs/`, `odd/ledger/`, and journal paths — so the operator-facing journals view is a future build, not a current consumer. Neither aspirational row blocks the constraint; they document intended adoption, not current behavior.

Pre-constraint, the site pulled all 566 documents at full frontmatter on every page render (~112K tokens × 4 calls/hour = 76M tokens/week) through a single `doc-listing` edge function whose output was filtered client-side into several of the use cases above. Post-constraint, that single fat call decomposes into the per-use-case calls in the table, the heaviest of which (canon governance index, ~25K tokens) is called on-demand rather than on every render.

The site SHOULD additionally cache catalog responses at its edge layer with a TTL appropriate to canon's update tempo (canon updates on the order of days; a 5-minute TTL amortizes cost across hundreds of requests per minute). Edge caching compounds with the constraint: the constraint reduces per-call cost; edge caching reduces call volume. With both stacked, the site's catalog token cost drops from 76.65M/week to a low-thousands figure.

The site implementation MAY introduce a thin server-side abstraction (`getEssaysIndex()`, `getCanonGovernanceIndex()`, etc.) that wraps each use case with its standardized filter+disclosure+limit declaration. That abstraction is consumer-side scaffolding, not part of this constraint; the constraint binds the action's response shape and the structural-filter contract, not the consumer's internal helpers.

## Retrieval in the Proactive Rhythm

Before this constraint lands, the retrieval actions are too expensive to call per-turn — a single `oddkit_catalog` invocation can consume 110K tokens of the session's context window, and `oddkit_preflight` and `oddkit_search` each have their own context-cost surprises. The proactive posture (`canon/bootstrap/model-operating-contract.md`) treats retrieval as a periodic discovery move rather than a per-turn rhythm action.

After this constraint lands, retrieval at the default shape costs ~1.3K tokens for a 25-doc browse — small enough to be a per-turn move. The retrieval actions join the proactive rhythm as first-class actions alongside `oddkit_time`, `oddkit_orient`, and `oddkit_encode`:

- **Per-turn**: `oddkit_time` first, `oddkit_orient` on context shifts, a cheap `oddkit_catalog` or `oddkit_search` with the current task's relevant filters to slice the corpus down, then `oddkit_get` to drill into specific documents the slice surfaced
- **Per-milestone**: `oddkit_preflight`, `oddkit_challenge`, `oddkit_validate`, `oddkit_encode`
- **Per-session**: bootstrap from `model-operating-contract`, save encodes to ledger files

The retrieval surface's elevation to per-turn cadence is a side effect of this constraint, not its primary goal — but the elevation is significant enough that the bootstrap document SHOULD be amended in the same execution arc that lands this constraint. A companion update to `canon/bootstrap/model-operating-contract.md` is in scope for the execution PR, not for this proposal.

## Failure Modes This Constraint Prevents

- **Token-cost externalization via any retrieval action.** A renderer that pulls the full corpus on every render externalizes the action's serialization cost across the entire request volume of its endpoint. Forcing the audience-intent declaration at the action boundary keeps the cost proportional to the slice the caller actually needs, across all five retrieval actions.
- **Category-soup drift.** An action that surfaces tag enumerations conditions consumers to filter on tags. Tags are many-to-many and grow unboundedly as canon evolves; consumer code that filters on tags requires forever curation. Structural filters do not drift.
- **LLM context exhaustion on a metadata call.** A 110K-token catalog response can consume the majority of a model's available context for what should be a directory lookup. Defaulting to the base shape (URI + title) and requiring the caller to opt in to richer disclosure keeps every retrieval action usable by every model size.
- **Per-action shape drift.** When five actions each have their own ad-hoc disclosure contract, each contract drifts independently as features accrete. Consumer code becomes a mosaic of per-action quirks. A canonical contract removes the surface where drift occurs.
- **Bulk archival via a single tool call.** A query-shaped or list-shaped action that returns body content — even paginated — is a one-pass corpus exfiltration vector. The `body` flag is permitted only on the URI-shaped actions (`get`, `resolve`), which are single-result by construction. Full-corpus archival requires N separate `oddkit_get` calls, which is observable in telemetry and rate-limitable per worker version. The N-call requirement is the friction by design.
- **Primary-versus-secondary confusion at the retrieval boundary.** Without document-kind filtering, an unfiltered retrieval call mixes canon governance (the binding contract) with project journals (the chronological record) in equal weight. A caller asking "what does the project say about X" gets handoff entries alongside the principles that govern X — the primary signal drowns in operational chatter. The `include`/`exclude` enumeration with a journals-opt-in default solves this without burying journals through sort order (which would make them functionally invisible) and without adding new tools (which would expand the surface). Journals stay first-class for callers who declare intent; they stop appearing in primacy-shaped queries that did not ask for them.

## Implementation Notes — What Each Retrieval Action Returns

Every retrieval action's response envelope MUST contain:

- `data[]` (for multi-result actions: `search`, `catalog`, `preflight`) or `data` (for single-result actions: `get`, `resolve`) — the document entries at the requested `disclosure`, ordered by the action's native ordering (search ranking, catalog `sort_by`, preflight relevance)
- `total` (multi-result actions only) — the count of documents matching the caller's filter slice before pagination
- `limit` and `offset` (multi-result actions only) — echo the active values
- `disclosure_applied` — array echo of the active `disclosure` flags
- `filters_applied` (query-shaped actions only) — object echo of the caller's filter declarations

The response envelope MUST NOT contain:

- A `categories` array (global tag rollup)
- A `start_here` array (carousel content — callers who want this pass `start_here: true` as a filter and get matching docs in `data[]`)
- A `baseline` / `overlay` doc count (these belong to introspection endpoints, not to retrieval actions)
- Body content for any document, on `search`, `catalog`, or `preflight`, regardless of `disclosure` flags passed

When a caller passes a `disclosure` flag the action does not allow, the action MUST return an error envelope rather than silently dropping the flag:

```yaml
status: ERROR
error_code: DISCLOSURE_FLAG_NOT_PERMITTED
error_message: "disclosure flag 'body' is not permitted on action 'catalog'. Use oddkit_get with a URI for full-body retrieval. Permitted flags on catalog: blockquote, metadata, summary."
requested_flag: body
permitted_flags: [blockquote, metadata, summary]
action: catalog
```

When a caller's `limit` exceeds the maximum permitted for the most restrictive active flag, the action MUST return an error envelope rather than silently truncating:

```yaml
status: ERROR
error_code: LIMIT_EXCEEDS_FLAG_CAP
error_message: "limit 100 exceeds the maximum 25 for disclosure flag 'summary'. Paginate with offset, or remove the 'summary' flag."
max_limit_for_active_flags: 25
limiting_flag: summary
requested_limit: 100
```

These explicit errors keep the contract legible at the boundary instead of producing surprising response shapes downstream.

Existing callers that depend on the legacy response shapes MUST be migrated explicitly, on a deprecation timeline, with the legacy fields surfaced behind an opt-in `include_legacy_envelope: true` flag during the transition window. The default behavior MUST be the new shape from the day this constraint lands.

## Verification

A retrieval action's response complies with this constraint when:

1. The response shape contains only the base fields (`uri`, `title`, action-native fields) plus the additional fields permitted by the requested `disclosure` flags
2. The response respects all filter declarations and applies no domain defaults except the documented `include` default (`["canon", "docs", "essays"]`)
3. The response's `total` count (multi-result actions) is the post-filter, pre-pagination count
4. The response excludes category rollups, taxonomy enumerations, and curated lists
5. The response excludes body content for `search`, `catalog`, and `preflight` regardless of `disclosure` flags passed
6. A request whose `disclosure` includes a flag the action does not allow returns `DISCLOSURE_FLAG_NOT_PERMITTED`
7. A request whose `limit` exceeds the most restrictive active flag's cap returns `LIMIT_EXCEEDS_FLAG_CAP`
8. Unfiltered query-shaped responses do NOT contain documents of kind `journals` or `apocrypha` (the default `include` set excludes them); journals appear in responses only when the caller passes `include: ["journals"]` or an equivalent explicit declaration
9. A document's resolved kind respects the two-tier rule: frontmatter `kind:` when present, path-prefix mapping otherwise; a document whose frontmatter `kind:` conflicts with its path resolves to the frontmatter value
10. Action-native fields (`score` and `snippet` on search; `total` and ordering on listings) are present independent of `disclosure`; a search response at default `disclosure: []` still carries `score` and `snippet`
11. The aggregate token cost across a representative sample of caller workloads decreases by an order of magnitude relative to the pre-constraint baseline

Production telemetry SHOULD confirm the order-of-magnitude reduction within thirty days of the constraint landing. If the reduction is not observed, the implementation is non-compliant or a major caller is bypassing the contract; both are bugs.

## Relationship to Adjacent Canon

This constraint is the retrieval-layer operational complement to `canon/meta/writing-canon.md` (which defines progressive disclosure at the document level) and to `canon/meta/frontmatter-schema.md` (which defines the structural axes). The writing canon mandates that every document be tiered; this constraint mandates that every retrieval action surface those tiers as a shared contract.

This constraint operationalizes `canon/principles/vodka-architecture.md` for the retrieval surface: every action stays thin (no domain opinion, no embedded defaults), and the caller carries the audience-and-disclosure decision (where it belongs).

This constraint complements `canon/constraints/mode-discipline-and-bottleneck-respect.md` by removing a class of cost that previously externalized onto the caller's attention and context budget. A retrieval call that returns the base shape of 25 documents costs ~600 tokens; a call that returns full frontmatter for 500 documents costs ~140K tokens. The difference is the operator's working memory and the agent's context budget.

This constraint applies the prior-art patterns named in `canon/constraints/borrow-evaluation-before-implementation.md` (JSON:API sparse fieldsets, GraphQL field selection, OData/Graph `$select`) to the oddkit retrieval surface.

This constraint is governed by `canon/constraints/oddkit-prompt-pattern.md` (which requires every oddkit action to declare a response envelope and accept declarative parameters) and `canon/constraints/oddkit-action-registration-completeness.md` (which requires action surface area to be fully documented). Per-action documentation in `docs/oddkit/` MUST be updated to reflect the new contract.
````

### Rationale

The constraint goes into `canon/constraints/` rather than `canon/principles/` because it is a hard requirement on both the implementation and the consumer, not a structural truth claim. The principle layer is occupied: `vodka-architecture` describes the discipline, and the writing canon's progressive disclosure describes the document-level tiering. This constraint operationalizes both at the retrieval boundary — it is the rule that the catalog action and every catalog consumer MUST follow.

Placing the rules in one document (the catalog's response shape AND the caller's filter responsibilities) rather than splitting them into two preserves the contract framing: a catalog response shape is meaningful only in relation to what the caller declared, and a caller's filter declaration is meaningful only in relation to what the catalog will honor. Splitting them invites drift between the two halves of the same contract.

The filename `catalog-progressive-disclosure-and-structural-filters.md` is long but precise; it names the two distinct components (progressive disclosure at the response layer, structural filters at the request layer) and signals the constraint's reach to both implementation and consumer. Shorter alternatives (`catalog-retrieval-contract.md`, `catalog-thin-default.md`) lose one of the two components in the name.

## Risk Assessment

| Risk Level | Description |
| --- | --- |
| Low | Clarifies existing rule, no scope change |
| Medium | Adds new requirement, may affect workflows |
| **High** | **Changes existing behavior, requires migration of an active production consumer** |

**Risk level**: High

**Mitigation**:

- The current response shapes (per action) stay available behind an opt-in `include_legacy_envelope: true` flag through one deprecation window (recommend two minor versions of oddkit — flag introduced at the constraint's landing in version N, removed at N+2)
- The active consumer `klappy.dev-doc-listing` is migrated in the same PR series that lands the constraint, so the production token-cost reduction is observable within the same deployment
- The frontmatter axes the constraint relies on (`audience`, `exposure`, `tier`, `public`) are already required by `canon/meta/frontmatter-schema.md`; before the constraint lands, an audit script MUST verify every document in the corpus carries valid values for these fields, and any drift MUST be repaired in a precursor PR
- The audit script SHOULD be added to the existing `canon-quality.yml` CI workflow as a soft check first, and flipped to hard enforcement after the constraint lands and the corpus is verified clean
- The `body` flag is permitted only on the URI-shaped actions (`get`, `resolve`), never on the query-shaped or list-shaped actions (`search`, `catalog`, `preflight`) — this is a deliberate archival safeguard, not an arbitrary restriction. Full-body retrieval flows through `oddkit_get` one document at a time, making bulk extraction observable in telemetry as N separate get calls and rate-limitable per worker version
- The five retrieval actions are migrated in coordinated PRs but the contract is the same across all of them — there is no per-action drift to manage, by design. Documentation for each action lives in `docs/oddkit/` and is updated in the same execution arc
- Per `canon/constraints/oddkit-action-registration-completeness.md`, each action's contract change MUST update both the dispatch switch AND the `VALID_ACTIONS` registry in oddkit. The execution PR's checklist MUST verify both updates for all five actions; partial registration ships an action the validator rejects before runtime
- The precursor frontmatter audit SHOULD additionally report each document's path-derived kind, so any document whose path mapping produces a surprising kind can be given an explicit `kind:` frontmatter override before the constraint enforces. Kind resolution is frontmatter-primary, path-secondary; the audit makes the path-derived fallback visible so overrides are a deliberate choice, not a silent surprise

The migration is broader than a catalog-only fix but is structurally bounded: one production consumer to migrate (`klappy.dev-doc-listing`), one CI script to add, one oddkit minor version to ship, one frontmatter audit to confirm clean, and five action surfaces to bring onto the new contract in lockstep. The lockstep is itself the safeguard against drift.

## Disconfirmer — What Would Retract This Constraint

This constraint should be revisited or retracted if any of the following is observed after landing:

- **Frontmatter axes are not consistently populated.** The constraint depends on every document carrying valid `audience`, `exposure`, and `tier`. If the precursor audit reveals widespread missing or invalid values and they cannot be repaired without re-litigating the schema, the constraint's filter contract cannot be honored and a different filter axis (likely `path_prefix` only) must be substituted.
- **Per-action semantics diverge enough that the unified contract becomes a leaky abstraction.** If `search`, `catalog`, `get`, `preflight`, and `resolve` turn out to require disclosure semantics that materially differ (e.g. preflight needs a sixth flag for "expand inlined references" that no other action could meaningfully support), the canonical contract may need to fragment back into per-action contracts. The constraint as written assumes the five actions share enough that one contract serves them all; if that assumption fails, the failure is observable as accumulated per-action exceptions in the implementation.
- **Callers consistently mis-declare audience intent.** If telemetry post-landing shows that consumers are passing the wrong filters or no flags when they have a clear audience target, the contract is failing at the consumer boundary. The remediation is consumer-side education and tooling, not retracting the constraint — but the claim that "callers can declare audience intent reliably" would be the part to revisit.
- **The token cost reduction does not materialize.** The thirty-day post-landing target is an order-of-magnitude reduction in aggregate retrieval-action token output (across all five, not just catalog). If the reduction is not observed despite consumer migration, the diagnosis is wrong: the bottleneck is elsewhere, the constraint did not address it, and a new audit is required.
- **LLM consumers come to dominate over the website renderer.** The current consumer mix is 686 site calls vs. ~13 oddkit-session calls per week. If that inverts and LLM operators routinely need richer disclosure by default, the base-shape-only-default rule becomes the wrong default — at which point either the default expands (with a new opt-out flag for renderers) or the LLM consumers' contract expectations are reshaped through documentation and tool descriptions rather than through the action response shapes.

If none of these triggers fire within ninety days of landing, the constraint should be promoted from `evolving` to `semi_stable` and the disconfirmer section should be retained as historical context.

## Strongest Opposing View

The strongest case against this constraint is: *"keep the per-action contracts as they are today — fix the catalog token bloat at the consumer layer (klappy.dev edge caching + client-side filtering) and leave the other four actions alone."* That position is internally consistent and would reduce token costs by a factor of ~100 with no canon change. It is rejected here for three reasons. First, it concedes the per-action divergence indefinitely — five contracts that drift independently are five surfaces for future surprise, and each new consumer pays the cost of learning all five. Second, it concedes the vodka violation: each action continues to return opinionated bundled shapes, which constrains every future caller. Third, it does not address the LLM-consumer case, which is small in volume but large per-invocation across all five actions: when an oddkit session pulls a 110K-token catalog response or an opinionated preflight bundle into its context, a metadata-shaped lookup consumes the majority of available context. The constraint addresses all five actions and both consumer classes at the structural layer; the opposing view addresses only the high-volume class on one action at the deployment layer.

## Status

`proposed` (2026-05-23)

## Review Notes

(To be filled during review)

- **Reviewer**: klappy (operator)
- **Decision**:
- **Date**:
- **Notes**:

## Execution Record

(To be filled after acceptance)

- **Commit**:
- **Canon doc updated**: `canon/constraints/retrieval-disclosure-contract.md`
- **Backlink added**: Yes / No
