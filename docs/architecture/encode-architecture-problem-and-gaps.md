---
uri: klappy://docs/architecture/encode-architecture-problem-and-gaps
title: "Encode Architecture: Problem, Gaps, and Alternatives Analysis"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "encode", "architecture", "vodka-architecture", "prompt-over-code", "alternative-d", "dolche", "dolcheo", "tsv", "governance", "design-brief", "epoch-8.4"]
epoch: E0008.4
date: 2026-04-30
derives_from: "canon/definitions/dolcheo-vocabulary.md, canon/principles/prompt-over-code.md, odd/encoding-types/how-to-write-encoding-types.md, odd/encoding-types/serialization-format.md"
complements: "odd/encoding-types/decision.md, odd/encoding-types/observation.md, odd/encoding-types/learning.md, odd/encoding-types/constraint.md, odd/encoding-types/handoff.md, odd/encoding-types/open.md, odd/encoding-types/encode.md"
governs: "Implementation brief for the oddkit_encode vodka refactor (Phase 2 of E0008.4). Names the problem, evaluates alternatives, recommends Alternative D — Governance-defined field schemas with format-agnostic serialization."
provenance: "Originated in klappy/truthkit-kb at docs/architecture/encode-architecture-problem-and-gaps.md (commit prior to 2026-04-16). Migrated verbatim to klappy.dev as the implementation brief for the oddkit encode refactor, with frontmatter added for canon discoverability. The TruthKit-KB origin is preserved in repo history; this doc is now the oddkit-canonical version."
status: superseded
superseded_by: "docs/architecture/encode-current-state-2026-04-30.md"
supersession_addendum_at: 2026-04-30
supersession_reason: "Audit 2026-04-30 — described code state that PR #96 retired on 2026-04-16; failed canon/principles/code-claims-require-code-observation"
---

> **STATUS — SUPERSEDED BY AUDIT 2026-04-30.** This document was published in PR #157 (E0008.4 Phase 1, merged 2026-04-30T05:08:53Z) but described code state that PR #96 in `klappy/oddkit` had retired on 2026-04-16T02:14:13Z. The architectural problem this document analyzes was already resolved before this document was published. See `klappy://canon/principles/code-claims-require-code-observation` for the principle this failure earned, and `klappy://docs/architecture/encode-current-state-2026-04-30` for what the worker actually does today. This document is preserved for postmortem value, not removed.

**What was wrong:** This brief diagnoses six gaps in the encode parser. As of 2026-04-30 (the day this brief was migrated into klappy.dev canon), five of those six gaps were already resolved in `klappy/oddkit@workers/src/orchestrate.ts` by PR #96 — which had merged two weeks prior, on the same day this brief was authored in `klappy/truthkit-kb`. The brief became stale on arrival and was cited authoritatively across multiple subsequent canon documents and a user-memory entry without any reader verifying against current code state. The audit on 2026-04-30 (afternoon) caught the propagation chain and shipped this supersession.

**What's still true:** Gap 1's framing ("the parser hardcodes four English keywords against a vocabulary of seven dimensions") is accurate for the Node CLI surface (`klappy/oddkit src/tasks/encode.js`). The CLI is queued for deprecation per `klappy://odd/handoffs/2026-04-30-cli-encode-deprecation` rather than backport.

**What you should read instead:** `klappy://docs/architecture/encode-current-state-2026-04-30` is the accurate current-state description. `klappy://odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d-revised` scopes the actual remaining Phase 2 work.

---


# Encode Architecture: Problem, Gaps, and Alternatives Analysis

> The encode tool's parser and the governance it claims to serve are completely disconnected. The parser recognizes four English keywords via hardcoded regex. The governance defines six extensible dimensions via canon articles. The model does all the categorization work — and the parser throws it away. The fix must make governance the source of truth for encoding behavior: the server searches canon at encode time, dynamically builds extraction patterns from what it finds, teaches the calling model how to structure input, and supports ad-hoc types that any knowledge base can define without server changes.

---

## The Problem in One Sentence

The encode tool's type detection is hardcoded in TypeScript while the governance it should implement lives in markdown — a direct violation of prompt over code.

---

## Current State — What the Code Actually Does

`detectEncodeType()` in `orchestrate.ts` (lines 256–266):

```typescript
function detectEncodeType(input: string): string {
  if (/\b(decided|decision|chose|choosing|selected|committed to|going with)\b/i.test(input))
    return "decision";
  if (/\b(learned|insight|realized|discovered|found that|turns out)\b/i.test(input))
    return "insight";
  if (/\b(boundary|limit|constraint|rule|prohibition|must not|never)\b/i.test(input))
    return "boundary";
  if (/\b(override|exception|despite|even though|notwithstanding)\b/i.test(input))
    return "override";
  return "decision";
}
```

The entire encode handler then produces **one artifact** with: one type, one title, one quality score, one rationale extraction, one set of constraints. Everything the model sends — regardless of how many DOLCHE dimensions it contains — collapses into a single blob typed as "decision," "insight," "boundary," or "override."

---

## Gap 1 — Parser Vocabulary ≠ Governance Vocabulary

The parser knows four types: `decision`, `insight`, `boundary`, `override`.

The DOLCHE vocabulary doc (`docs/oddkit/proactive/dolche-vocabulary.md`) defines six dimensions: **D**ecisions, **O**bservations, **L**earnings, **C**onstraints, **H**andoffs, **E**ncodes. The vocabulary doc explicitly states: "The type field is a string, not an enum. Any knowledge base can extend DOLCHE with custom types by adding a governance document."

These two systems share zero coordination:

| Governance says | Parser recognizes | Alignment |
|---|---|---|
| Decision (D) | "decision" | Partial — different trigger words |
| Observation (O) | — | **Missing entirely** |
| Learning (L) | "insight" | Renamed — "insight" ≠ "learning" |
| Constraint (C) | "boundary" | Renamed — "boundary" ≠ "constraint" |
| Handoff (H) | — | **Missing entirely** |
| Encode (E) | — | Meta-level, not a content type |
| Custom (any) | — | **No extension mechanism** |
| — | "override" | **Not in DOLCHE at all** |

The parser invented "override" (not in DOLCHE) and renamed two types ("insight" for Learning, "boundary" for Constraint). Two DOLCHE types (Observation, Handoff) have no parser representation at all. The governance vocabulary and the server vocabulary diverged silently — and no mechanism detects or prevents the drift.

## Gap 2 — Single Blob Output for Multi-Dimensional Input

When a model calls encode with a full DOLCHE session capture — say, 5 decisions, 3 observations, 2 learnings, 4 constraints, 3 handoffs — the handler produces **one artifact**. One title (extracted from the first sentence). One type (the first regex match). One quality score (computed against the entire input string).

The DOLCHE from the last session (attached to this conversation) contained 20+ categorized items across 6 types. The encode parser would have collapsed all of it into a single "decision" artifact scored against the entire blob. The model did all the extraction work. The server discarded it.

This isn't just wasteful — it's architecturally backwards. The model has the intelligence to categorize. The server has the structure to store per-type artifacts. But the interface between them is a single unstructured string, parsed by regex that doesn't match the vocabulary, producing one output where many are needed.

## Gap 3 — No Discovery Mechanism for Governance

The encode handler never searches canon. It never fetches the DOLCHE vocabulary doc. It never looks for custom type definitions. The governance articles exist and are thoroughly written — but the server code that should implement them doesn't know they exist and has no mechanism to find them.

This is the prompt-over-code violation in its purest form. The canon says the vocabulary is extensible via governance documents. The server says the vocabulary is four hardcoded regex patterns. When the governance changes — as it already did when OLDC+H became DOLCHE — the server doesn't know and can't adapt.

## Gap 4 — The Model Can't Learn From the Governance

The encode tool description currently says: "Standard artifact types: Observations (O), Learnings (L), Decisions (D), Constraints (C), Handoffs (H) — OLDC+H."

This is a static string. It was written by a human, committed to the server codebase, and will drift from the governance vocabulary the moment the governance changes. It already has — it says OLDC+H while the governance says DOLCHE. It doesn't mention custom types. It doesn't teach the model how to structure input for optimal extraction. It doesn't know about extensions a specific knowledge base might define.

The model reads this description once and improvises from there. The result: every encode call is a negotiation between what the model guesses the tool wants and what the regex actually matches. The governance has the answers — type definitions, trigger phrases, structural guidance — but the model never sees them.

## Gap 5 — Quality Scoring Is Monolithic

The quality scorer checks for: word count ≥ 10, rationale present, constraints present, alternatives mentioned, reversibility noted. This produces one score (0–5) for the entire input.

But a DOLCHE capture has per-type quality criteria. A Decision without rationale is weak. An Observation without evidence is speculation. A Handoff without next-actions is incomplete. A Constraint without enforcement is a suggestion. These are different quality dimensions that require different scoring criteria — criteria that the governance docs already define but the scorer doesn't read.

## Gap 6 — Ad-Hoc Types Are Governance Fiction

The DOLCHE vocabulary doc says: "A pastoral knowledge base might add 'P' for Prayer Requests." This is currently a governance aspiration with zero server support. There is no mechanism for:

1. The server to discover that a KB defines custom types
2. The parser to recognize input that matches custom type patterns
3. The model to learn about custom types from the KB's governance
4. Quality scoring to apply custom criteria to custom types

The extensibility promise is real in the governance layer and fictional in the server layer.

---

## Alternatives Analysis

### Alternative A: Expand the Hardcoded Regex

Add regex patterns for Observation, Learning, Constraint, Handoff, and Encode to `detectEncodeType()`. Map them to DOLCHE letters.

**Pros:** Minimal code change. Ships today.

**Cons:** Still violates prompt over code — every vocabulary change requires a server deployment. Still produces single-blob output. Still can't handle custom types. Still doesn't teach the model. The regex grows but the architecture doesn't improve. This is the fix that works for DOLCHE and breaks for every extension.

**Verdict:** Solves today's naming mismatch. Creates tomorrow's maintenance burden. Scales linearly with vocabulary size.

### Alternative B: Let the Model Do All the Work via Tool Description

Make the tool description extremely detailed — include all type definitions, trigger words, structural guidance, quality criteria. Tell the model to produce structured JSON with per-type artifacts. The server becomes a passthrough that validates and returns whatever the model sends.

**Pros:** Zero server changes. Pure prompt-over-code. The model is the intelligence layer.

**Cons:** Tool descriptions have token limits. Stuffing the entire DOLCHE vocabulary + quality criteria + custom type definitions into a tool description is fragile and bloats every MCP handshake. The description becomes stale the moment governance changes. Different MCP platforms truncate descriptions at different lengths. The model still has to guess what custom types exist.

**Verdict:** Right direction, wrong layer. The intelligence should be in the model, but the governance should be surfaced dynamically — not embedded statically.

### Alternative C: Encode Calls Search Internally

At encode time, the server searches its own canon for governance documents tagged with encoding vocabulary. It finds the DOLCHE vocabulary doc, any custom type definitions, and any quality criteria docs. It includes these in the encode response, teaching the calling model how to structure a re-invocation or how to structure future encode calls.

**Pros:** Dynamic — governance changes propagate automatically. Extensible — custom types surface from KB governance, not server code. The server stays thin (search is already a capability). Mirrors how `telemetry_policy` works — governance fetched from canon at runtime.

**Cons:** Adds latency to encode (one search round-trip). First encode call in a session won't benefit from the teaching unless the model re-invokes. Doesn't solve the single-blob problem on its own — the response format still needs to support multiple artifacts.

**Verdict:** Strong for discovery and teaching. Insufficient alone for extraction.

### Alternative D: Governance-Defined Field Schemas with Format-Agnostic Serialization (Proposed)

The server searches canon at encode time for governance documents that define encoding types. Each type's governance doc defines field semantics: type letter, type name, field schema, quality criteria, trigger words (for fallback). A separate serialization format governance doc defines how fields are serialized (default: TSV). The model outputs structured rows — one per artifact, typed by the first field. The server parses mechanically using the serialization format. For unstructured input, the server falls back to paragraph splitting and dynamic regex classification. The encode response surfaces the governance, teaching the model for subsequent calls. Type definitions and serialization format evolve independently.

**Architecture:**

1. **At encode time:** Server searches canon for docs tagged as encoding-type governance, plus serialization format governance.
2. **From each type doc:** Extract type letter, field schema, quality criteria, trigger words.
3. **Parse structured input:** Using the serialization format, split into rows and fields. First field is the type letter. Remaining fields defined per-type by governance.
4. **Fallback:** If input isn't structured, split by paragraph, classify against governance-derived regex from trigger words.
5. **Score per-type:** Apply governance-defined quality criteria to the fields of each typed row.
6. **Return per-type artifacts:** Multiple artifacts in markdown stream, each with its own type, title, quality score, and gaps.
7. **Teach the model:** Response includes governance definitions — type letters, field schemas, quality criteria, serialization format, custom types. Model learns.

**Pros:**
- **Pure prompt over code:** Adding a type means writing a governance doc, not changing server code. Changing the format means updating one format doc, not every type doc.
- **Self-teaching:** The model learns the vocabulary and format from governance docs surfaced in the response.
- **Extensible:** Custom types work identically to default types — governance doc in, parsing out.
- **Per-type quality:** Each type has its own field schema and quality criteria from its own governance doc.
- **Mechanical parsing:** Serialization parsing is string splitting. No regex on the primary path. Near-zero compute.
- **Minimizes model capacity requirements:** The model is already restructuring content for encode. Adding field structure is trivial for any LLM.
- **Server stays thin:** Search + format parsing is generic infrastructure. The server doesn't know what DOLCHE means — it knows how to read governance docs and parse typed rows.
- **Graceful degradation:** Unstructured input falls back to paragraph + regex classification. The response teaches the format. The model converges.
- **Independent axes:** Type semantics and serialization format are governed by separate docs. Either changes without affecting the other.

**Cons:**
- Governance docs need a structured format for field schemas and quality criteria (adds a writing convention).
- First encode in a session may be unstructured (model hasn't learned yet). Fallback handles this.

**Verdict:** This is the architecture that makes governance the single source of truth for encoding behavior. It scales to any vocabulary size, supports ad-hoc types without server changes, teaches the model from the canon, and keeps the server thinner than the current hardcoded approach.

### Alternative E: LLM-in-the-Loop Encoding

Add LLM inference to the encode handler. The server sends the input + governance docs to a model, which produces structured per-type artifacts. The server validates and returns them.

**Pros:** Highest extraction quality. The model understands nuance, context, and ambiguity.

**Cons:** Adds inference latency (seconds, not milliseconds). Adds cost per encode call. Breaks the 0ms encode characteristic. Creates a dependency on model availability. Violates the Vodka Architecture principle of thin, stateless servers. The server becomes an inference orchestrator.

**Verdict:** Right for TruthKit (where the harness governs LLM invocation). Wrong for oddkit (where the server must stay thin and stateless). This is the graduation path, not the current path.

---

## Recommendation

**Alternative D — Governance-defined field schemas with format-agnostic serialization** — is the proposal that beats all others. The model is already restructuring content when it calls encode. Encoding-type governance docs define field semantics per type. A separate serialization format doc defines how fields are serialized (default: TSV). The server parses mechanically. No regex on the primary path. Dynamic regex from governance-defined trigger words handles unstructured fallback. The response teaches the model both the vocabulary and the format. The model converges.

The key insight: the server doesn't need to understand DOLCHE. It needs to understand *how to read governance docs that define encoding types and parse typed rows against their field schemas*. Two independent governance layers — type semantics and serialization format — give maximum flexibility with minimum coupling. The server is the enforcer. The canon is the law.

---

## Resolved Design Questions

1. **Governance doc format:** Separate docs per type — antifragile and easier to find via BM25. The DOLCHE vocabulary doc remains as narrative reference linking to them. Each type governance doc defines: type letter, type name, field schema, quality criteria. Serialization format (TSV default) is governed by a separate doc so types and format evolve independently.

2. **Input format:** Governed by a separate serialization format doc (default: TSV). The model is already restructuring raw conversation into encode input — it's already doing the categorization work. The serialization format is independent of the type definitions so either can change without affecting the other.

3. **Collision handling:** A single encode call can contain multiple rows of different types. Each row is independently typed. Multi-typing happens at the row level — the model decides a concept warrants both a D and a C row by emitting two rows. The model uses judgment; the server parses mechanically.

4. **Response shape:** Markdown stream with per-type sections, each with quality score, gaps, and suggestions. Governance definitions included in the response to teach the model.

5. **Caching:** Module memory cache is already 0ms for cached articles. Governance docs for encoding types are cached identically to all other canon files. No special caching strategy needed — solved infrastructure.

6. **Backward compatibility:** Non-issue. Consumers are LLMs. Dynamic MCP tool usage is expected to change between sessions. Models re-read tool descriptions and response shapes every invocation.

---

## Refined Architecture — Governance-Defined Field Schemas with Format-Agnostic Serialization

The model is already restructuring content when it calls encode. Two independent governance layers define the behavior: encoding-type docs define field schemas (what fields exist per type, quality criteria), and a serialization format doc defines how those fields are serialized (default: TSV). Either layer can change independently.

**Flow:**

1. **At encode time:** Server searches canon for docs tagged as encoding-type governance (or retrieves from 0ms module cache after first fetch). Also reads serialization format governance.
2. **From each encoding-type doc:** Extract type letter, field schema, quality criteria.
3. **Parse structured input:** Using the serialization format, split input into rows and fields. First field is the type letter. Remaining fields are defined per-type by governance.
4. **Per-type quality scoring:** Each type's governance doc defines its own quality criteria applied to its own fields. A Decision without rationale is weak. An Observation without evidence is speculation. A Handoff without next-actions is incomplete. Different types, different fields, different standards.
5. **Teach the model:** Encode response includes the governance definitions — type letters, field schemas, quality criteria, serialization format, and any custom types. The model learns from the canon, not from the tool description.
6. **Per-type artifacts in markdown stream:** Response contains per-type sections, each with its own title, quality score, gaps, and suggestions.
7. **Custom types work identically:** A KB adds a governance doc for "P — Prayer Requests" with its own field schema and quality criteria. Next encode call discovers it, parses P-typed rows against that schema, scores accordingly. No server change.

**Fallback for unstructured input:** If the input isn't in the expected serialization format (models that haven't learned it yet), fall back to paragraph splitting + dynamic regex classification from governance-defined trigger words. The response teaches the format. The model converges on subsequent calls.

**The self-teaching loop:**

First encode call → may be unstructured → server classifies via fallback, surfaces governance with field schemas and serialization format → model learns → subsequent calls are well-structured → server parses mechanically → per-type quality feedback → extraction quality improves within the session.

**What the server does NOT do:**

- LLM inference
- Domain-specific logic
- Type definition (that's encoding-type governance)
- Field schema definition (that's encoding-type governance)
- Quality criteria definition (that's encoding-type governance)
- Serialization format definition (that's format governance)

**What the server DOES do:**

- Search canon for encoding-type governance docs and serialization format governance
- Parse input against governance-defined field schemas using governance-defined format
- Fall back to paragraph split + dynamic regex for unstructured input
- Score per-type quality against governance-defined criteria
- Surface governance in the response to teach the model
- Return per-type artifacts in markdown stream
