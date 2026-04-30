---
uri: klappy://docs/architecture/encode-current-state-2026-04-30
title: "Encode Current State (2026-04-30) — Governance-Driven Worker, Stale CLI, Five Remaining Items"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "encode", "architecture", "current-state", "vodka-architecture", "governance-driven", "code-observation", "audit-2026-04-30", "epoch-8.4"]
epoch: E0008.4
date: 2026-04-30
describes_state_at: "klappy/oddkit@1a1f093 (main, 2026-04-29) and klappy/klappy.dev@125cf8d1 (main, 2026-04-30, post-PR-#157)"
derives_from: "canon/principles/code-claims-require-code-observation.md, docs/architecture/encode-architecture-problem-and-gaps.md"
complements: "odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d-revised.md, odd/handoffs/2026-04-30-cli-encode-deprecation.md"
supersedes: "docs/architecture/encode-architecture-problem-and-gaps.md"
governs: "Authoritative current-state description of the encode tool surface across both the Cloudflare Workers MCP server and the Node CLI MCP server. Replaces the predecessor architecture brief, which described a pre-PR-#96 state retired on 2026-04-16."
status: active
---

# Encode Current State (2026-04-30)

> The Cloudflare Workers MCP encode handler is governance-driven and has been since PR #96 merged on 2026-04-16T02:14:13Z. It discovers encoding types from canon at runtime, parses three input shapes (DOLCHEO-prefixed batches, TSV, unstructured prose), scores per-type quality from canon-defined criteria, and emits per-artifact markdown. Five small items remain (envelope plural alignment, dedup-by-letter bug, fallback baseline gap, self-teaching surface, schema-driven check evaluation). The Node CLI surface (`src/tasks/encode.js`) still uses the pre-#96 four-keyword regex and is queued for deprecation. This document supersedes the predecessor architecture brief, which described pre-#96 state as if it were current.

---

## Summary — What Is True Today, Verified by Reading the Code

This document was written by reading `klappy/oddkit` HEAD on 2026-04-30. Specifically: `workers/src/orchestrate.ts` lines 434–560 (governance discovery), 1150–1330 (parsers + quality scorer), 3235–3340 (action handler); and `src/tasks/encode.js` (legacy CLI). Every claim of code behavior in this document corresponds to a specific function or line range that was directly observed at the cited commits.

This is the discipline named in `klappy://canon/principles/code-claims-require-code-observation`, the principle that ships in the same PR as this document. The predecessor brief did not follow that discipline; this one does.

---

## What the Worker Encode Handler Actually Does

`runEncodeAction` in `workers/src/orchestrate.ts:3235` orchestrates four phases: discover encoding types from canon, choose a parser based on input shape, score each parsed artifact, emit per-artifact markdown.

**Phase 1 — Governance discovery (`discoverEncodingTypes`, line 434).** The function reads the canon index, filters for entries tagged `encoding-type` whose path includes `encoding-types/`, fetches each article, parses the Letter and Name from the Type Identity table, parses trigger words from the Trigger Words section's code block, parses quality criteria from the Quality Criteria table, and stems each trigger word into ordered token sequences for runtime matching. Falls back to a six-letter inline baseline (D, O, L, C, H, E) when canon is unreachable, declaring `governance_source: "minimal"` honestly. **One known bug:** the function dedupes by letter alone (line 512), so when both `observation.md` and `open.md` register letter `O`, `open.md`'s quality criteria are silently dropped — Open is registered in name only, scored against Observation's criteria.

**Phase 2 — Parser cascade (line 3253).** Three parsers, selected in order: `parsePrefixedBatchInput` (DOLCHEO `[D]/[O]/[L]/[C]/[H]/[E]/[O-open]` tags, line 1150), `parseStructuredInput` (TSV, line 1213), `parseUnstructuredInput` (prose, line 1225). The unstructured parser stems each paragraph once, then for each type checks whether the type's stemmed phrase set intersects the paragraph's stemmed token set. Multi-typing is intentional — a paragraph matching multiple types is emitted as multiple artifacts, mirroring what an LLM would do with separate TSV rows. Stop-word filtering is disabled on both sides per the P1.3.3 lesson.

**Phase 3 — Quality scoring (`scoreArtifactQuality`, line 1259).** Each artifact is scored against its type's quality criteria. The scorer interprets each criterion's `check` string by hardcoded keyword matching (`check.includes("non-empty")`, `check.includes("10")`, `check.includes("number")`, etc.). This is the one place where canon governance is read but interpreted opinionatedly by the server — a vodka-architecture imperfection that works correctly for the current criteria but constrains how new criteria can be authored. When `context` is provided, criteria evaluate against `body + context` so background information counts toward quality without becoming separate artifacts.

**Phase 4 — Markdown emission and envelope.** Per-artifact sections with type, name, quality level, body, gaps, and suggestions. Envelope declares `governance_source` (`"knowledge_base"` or `"minimal"`) and `governance_uri` (singular, `"klappy://canon/definitions/dolcheo-vocabulary"`). State updated to track encoded artifact tags.

---

## What the Predecessor Brief Got Right and Wrong

The predecessor brief at `klappy://docs/architecture/encode-architecture-problem-and-gaps` was authored against a pre-PR-#96 state of the worker. PR #96 (`feat: governance-driven encode architecture`) merged on 2026-04-16T02:14:13Z and resolved most of the brief's six gaps before the brief was migrated into klappy.dev canon on 2026-04-30. Mapping the brief's six gaps against current reality:

**Gap 1 (parser knows 4 types, hardcoded regex):** Resolved in the worker by `discoverEncodingTypes`. Still true in the CLI (`src/tasks/encode.js:22`), which is queued for deprecation per `klappy://odd/handoffs/2026-04-30-cli-encode-deprecation`.

**Gap 2 (single-blob output):** Resolved. Three parsers emit per-row/per-paragraph artifacts.

**Gap 3 (no discovery mechanism):** Resolved. `discoverEncodingTypes` is the discovery mechanism, indexed by the `encoding-type` frontmatter tag.

**Gap 4 (model can't learn from governance):** Partially resolved. The result envelope returns letter and name for each governance type, which lets the model learn the registry. Field schemas, quality criteria, and serialization format are NOT returned, so the model has no self-teaching loop for input format or scoring rubric. This is one of the five remaining items.

**Gap 5 (monolithic quality scoring):** Resolved with a caveat. Per-type scoring works correctly. The hardcoded keyword interpretation of criterion `check` strings is a structural debt, not a behavioral defect.

**Gap 6 (ad-hoc types are fiction):** Resolved. Any new article tagged `encoding-type` is auto-discovered.

The brief's recommended Alternative D was effectively the implementation that PR #96 shipped. The brief was correct; it was just describing a problem that was already solved.

---

## The Five Remaining Worker-Side Items

Listed in priority order. All five are small. None individually justifies a major refactor; together they constitute Phase 2 of E0008.4.

**Item 1 — `governance_uris` plural array (envelope alignment).** The challenge action (P1.3.1) and the gate action (P1.3.2) declare `governance_uris: string[]`, an alphabetical-by-path array of every peer governance document consulted at runtime. The encode action declares only `governance_uri: "klappy://canon/definitions/dolcheo-vocabulary"` (singular, single value, not the dynamic list of files actually read). This is a contract inconsistency with the canary precedent. Fix: emit `governance_uris` as an alphabetical array of the eight to nine encoding-type articles + `serialization-format.md` actually consulted on the request, retain `governance_uri` for one minor as a deprecation alias.

**Item 2 — Dedup-by-letter bug drops Open's quality criteria.** `discoverEncodingTypes` keeps the first article per letter, so `observation.md` (alphabetically prior) wins over `open.md`. Open's five quality criteria are never applied; Open artifacts are scored against Observation's four. Fix: dedup by `(letter, facet)` pair instead of letter alone, with `facet` read from frontmatter. Keep Observation as letter `O` with no facet (or `facet: closed`), keep Open as letter `O` with `facet: open`. Scorer selects criteria by full pair.

**Item 3 — Inline fallback baseline missing seventh entry.** `discoverEncodingTypes` fallback registers only the original six letters (D, O, L, C, H, E). Open is not in the bundled fallback. When canon is unreachable, the tool reports six types instead of seven. Fix: add Open as a `(letter: "O", facet: "open", name: "Open", ...)` entry to the fallback array, with the dedup logic from Item 2 in place to keep both O entries.

**Item 4 — Self-teaching surface (Gap 4 finish).** Return field schemas, per-type quality criteria, and the serialization-format article URI in the encode result envelope so the model can learn the input format and scoring rubric from a single tool call rather than needing a separate `oddkit_get` per article. Format: `governance_extended: { types: [{ letter, facet, name, fieldSchema, qualityCriteria, triggerWords }, ...], serializationFormatUri }`. Optional response field; gated by a request param to avoid token bloat for callers who don't need it.

**Item 5 — Schema-driven `check` evaluator.** Replace the hardcoded `check.includes("...")` keyword matching in `scoreArtifactQuality` with a small evaluator that understands a defined vocabulary of primitives (`field_X_non_empty`, `body_words_gte_N`, `body_matches_pattern_Y`, `body_does_not_contain_Z`). Update existing canon Quality Criteria tables to use the structured form. Fully resolves the vodka-architecture imperfection — server stops opinionating on what `check` strings mean. This item is the largest of the five and is the principled close on Phase 2; can be deferred to 0.29.0 if Phase 2 is otherwise ready to ship.

---

## What the CLI Encode Path Actually Does

`src/tasks/encode.js:detectEncodeType` (line 22) is the original four-keyword regex — `decision`, `insight`, `boundary`, `override`. Wired via `src/mcp/orchestrate.js:22` and `src/core/actions.js:17`. Same MCP tool name as the worker; entirely different implementation. The CLI is the only surface where the predecessor brief's framing remains accurate, and it is queued for deprecation rather than backport per operator decision.

See `klappy://odd/handoffs/2026-04-30-cli-encode-deprecation` for the deprecation timeline.

---

## Provenance and Verification Path

This document was authored by directly reading the following files at the cited commits, in this order:

1. `klappy/oddkit@1a1f093:workers/src/orchestrate.ts` — confirmed `discoverEncodingTypes`, three parsers, scorer, action handler signatures and bodies.
2. `klappy/oddkit@1a1f093:src/tasks/encode.js` — confirmed CLI parser is unchanged from pre-#96 state.
3. `klappy/oddkit@1a1f093:CHANGELOG.md` — confirmed PR #96 merge timing (no entry; verified via GitHub API).
4. GitHub API — confirmed PR #96 merged 2026-04-16T02:14:13Z to klappy/oddkit main.
5. Live `oddkit_encode` call against the production worker — confirmed `governance_source: "knowledge_base"`, six letters returned, Open dedup bug observable.
6. `klappy/klappy.dev@125cf8d1:odd/encoding-types/open.md` — confirmed Open has 5 criteria (vs Observation's 4) so the dedup bug is detectable from output alone.

Anyone validating this document should re-walk steps 1, 2, and 5 against the then-current HEAD before treating its claims as load-bearing for future planning.

---

## See Also

- [Code Claims Require Code Observation](klappy://canon/principles/code-claims-require-code-observation) — the principle this document operationalizes
- [Encode Architecture Problem and Gaps (Superseded)](klappy://docs/architecture/encode-architecture-problem-and-gaps) — the predecessor brief, kept for postmortem value
- [Audit 2026-04-30 Cleanup Ledger](klappy://odd/ledger/2026-04-30-audit-cleanup-encode-artifacts-landed) — the cleanup PR this document ships within
- [Phase 2 Revised Handoff](klappy://odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d-revised) — the actual remaining work
- [CLI Encode Deprecation Handoff](klappy://odd/handoffs/2026-04-30-cli-encode-deprecation) — the CLI retirement path
- PR #96 (klappy/oddkit) — `feat: governance-driven encode architecture`, merged 2026-04-16T02:14:13Z
- PR #157 (klappy/klappy.dev) — E0008.4 Phase 1, merged 2026-04-30T05:08:53Z
