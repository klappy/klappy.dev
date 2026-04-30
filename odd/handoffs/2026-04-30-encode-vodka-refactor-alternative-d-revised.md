---
uri: klappy://odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d-revised
title: "Handoff (Revised) — oddkit_encode Phase 2 (Five Worker Items + Open Dedup Bug, Scoped Against Real Code State)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "handoff", "session", "epoch-8.4", "p2-encode-vodka", "oddkit-encode", "alternative-d", "governance-driven", "release-validation-gate", "managed-agent-validation", "audit-2026-04-30", "revised"]
epoch: E0008.4
date: 2026-04-30
describes_state_at: "klappy/oddkit@1a1f093 (main, 2026-04-29) and klappy/klappy.dev@125cf8d1 (main, 2026-04-30, post-PR-#157)"
derives_from: "docs/architecture/encode-current-state-2026-04-30.md, canon/principles/code-claims-require-code-observation.md, canon/constraints/release-validation-gate.md, canon/constraints/core-governance-baseline.md"
complements: "docs/architecture/encode-current-state-2026-04-30.md, odd/handoffs/2026-04-30-cli-encode-deprecation.md"
supersedes: "odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d.md"
superseded_by: "odd/ledger/2026-04-30-encode-vodka-refactor-phase-2-landed.md"
governs: "Phase 2 implementation gate for the oddkit_encode worker — the five small remaining items (envelope plural alignment, dedup-by-letter bug, fallback baseline gap, self-teaching surface, schema-driven check evaluator) plus the dedup bug surfaced by Audit 2026-04-30. CLI deprecation is out of scope per separate handoff. Replaces the predecessor handoff, which scoped against pre-PR-#96 state."
status: superseded
---

# Handoff (Revised) — oddkit_encode Phase 2

> The Worker encode handler has been governance-driven since PR #96 merged on 2026-04-16. The predecessor handoff scoped a refactor of work that was already done. This revised handoff scopes the actual remaining surface — five small worker items plus one bug surfaced by Audit 2026-04-30 (Open's quality criteria silently dropped by dedup-by-letter). CLI deprecation is queued in a separate handoff per operator decision. Target version: 0.28.0.

---

## Summary — What's Actually Left

Read `klappy://docs/architecture/encode-current-state-2026-04-30` first. It describes what the worker actually does at HEAD, mapped against the predecessor brief's six gaps. Five are resolved; one (Gap 4, model self-teaching) is partially resolved; the predecessor handoff missed an additional bug (Open dedup) that the audit caught.

Five items, in priority order, all small. Items 1–3 are mandatory for Phase 2; item 4 is the principled close on Gap 4; item 5 (the schema-driven evaluator) is the largest and may slide to 0.29.0 if Phase 2 is otherwise ready to ship.

---

## Items

### Item 1 — `governance_uris` plural array (envelope alignment)

The challenge action (P1.3.1) and gate action (P1.3.2) declare `governance_uris: string[]`, an alphabetical-by-path array of every peer governance document consulted at runtime. Encode declares only `governance_uri: "klappy://canon/definitions/dolcheo-vocabulary"` (singular, single static value).

**Fix:** In `runEncodeAction`, build an alphabetical array of every encoding-type article URI actually fetched plus `klappy://odd/encoding-types/serialization-format` plus `klappy://odd/encoding-types/how-to-write-encoding-types`. Emit as `governance_uris`. Retain `governance_uri` as a deprecation alias for one minor (0.28.0 ships both; 0.29.0 removes the singular).

**Acceptance:** Smoke encode call returns `governance_uris` containing the eight or nine actual files consulted, alphabetical. Cursor Bugbot diff against the challenge/gate envelope shape passes structural parity.

### Item 2 — Dedup-by-letter bug drops Open's quality criteria

`discoverEncodingTypes` at `workers/src/orchestrate.ts:512` dedupes by letter alone. When both `observation.md` and `open.md` register letter `O`, alphabetical iteration keeps `observation.md`'s criteria (4) and silently drops `open.md`'s (5). Open is registered in name only.

**Verification of the bug:** A live `oddkit_encode` call with input `[O-open P1] <body>` returns `quality.score: 4, maxScore: 4` — Observation's max, not Open's 5. Direct evidence the bug is shipping in production today.

**Fix:** Dedup by `(letter, facet)` pair. Read `facet` from frontmatter on each encoding-type article. Keep Observation as `(O, undefined)` or `(O, "closed")`; keep Open as `(O, "open")`. Scorer selects criteria by full pair, matching the `facet` field set by the prefix parser on each parsed artifact.

**Acceptance:** Same `oddkit_encode` call with `[O-open P1]` input now returns `maxScore: 5` and applies Open's five criteria (Substance, Priority assigned, Closure path, Specificity, Owner clarity). Observation calls (`[O]` prefix or unstructured) continue to apply Observation's four. Regression test added against the canon URIs that surfaced the bug.

### Item 3 — Inline fallback baseline missing seventh entry

`discoverEncodingTypes` fallback (the `defaults` array at line ~538) registers only D, O, L, C, H, E. Open is missing. When canon is unreachable, the tool drops to six types instead of seven, and the prefix parser's `[O-open]` tag falls through to the Observation handler.

**Fix:** Add a seventh entry to the `defaults` array with `letter: "O"`, `facet: "open"`, `name: "Open"`, and Open's trigger words from canon. Requires Item 2's dedup-by-pair to be in place first or the new entry will be dropped by the existing dedup.

**Acceptance:** Worker booted with canon unreachable (test by pointing `knowledge_base_url` at a 404 endpoint) returns seven types in `governance` envelope, including Open with its facet.

### Item 4 — Self-teaching surface (close Gap 4)

Currently `governance` envelope returns only `[{ letter, name }]` per type. Field schemas, quality criteria, and serialization format are not surfaced, so the model learns the registry but not the input format or the scoring rubric. Forces the model to make separate `oddkit_get` calls per article to learn how to write good encodings.

**Fix:** Add an optional response field `governance_extended: { types: [{ letter, facet, name, fieldSchema, qualityCriteria, triggerWords }], serializationFormatUri, howToWriteUri }`. Gated by a request param `include_governance_details: boolean` (default false) to avoid token bloat for callers who already know the format. When true, the response includes the parsed schemas and criteria from canon directly.

**Acceptance:** `oddkit_encode` called with `include_governance_details: true` returns the full self-teaching payload. Same call without the flag returns the existing minimal envelope. Token-count regression smoke confirms no bloat for default callers.

### Item 5 — Schema-driven `check` evaluator (defer-eligible)

`scoreArtifactQuality` at line 1259 interprets criterion `check` strings by hardcoded keyword matching: `check.includes("non-empty")`, `check.includes("10")`, `check.includes("number")`, `check.includes("interpretation")`, `check.includes("prohibition")`. Works for current criteria; constrains how new criteria can be authored.

**Fix:** Define a small evaluator vocabulary of primitives — `field_X_non_empty`, `body_words_gte_N`, `body_matches_pattern_Y`, `body_does_not_contain_Z`, `field_X_matches_pattern_Y`, `priority_band_present`. Update existing canon Quality Criteria tables to use this structured form alongside the human-readable text (machine-readable column added). Evaluator becomes a pure function of `(criterion, artifact)` with no hardcoded keyword interpretation.

**Defer condition:** If Items 1–4 land cleanly and the schema-driven evaluator becomes a substantial implementation in its own right, ship Phase 2 as 0.28.0 with Items 1–4 only and queue Item 5 as Phase 3 / 0.29.0. Operator decides at the gate.

**Acceptance (when shipped):** `scoreArtifactQuality` contains zero `check.includes(...)` calls. All criteria evaluation flows through the primitive vocabulary. Canon migration of existing Quality Criteria tables ships in the same PR (in klappy.dev) so the old `check` strings don't sit in canon as dead syntax.

---

## Release Validation Gate — Mandatory

This refactor touches `orchestrate.ts`, the matcher implementation (Item 2), governance reads (Item 1, Item 4), the response envelope (Items 1, 4), and action behavior (all five items). Per `klappy://canon/constraints/release-validation-gate` (tier 1):

1. **Cursor Bugbot must reach `completed` before promotion merge.** `in_progress` is not non-blocking.
2. **Independent Sonnet 4.6 read-only validator agent must be dispatched via Managed Agents before promotion merge.** Same-session smoke and self-calls do not satisfy. Fresh-context validation per `klappy://canon/principles/verification-requires-fresh-context`.
3. **Canon outranks session-scoped recommendations.** If the session ledger ends up suggesting a shortcut on either of the above, surface the conflict and follow canon.

The validator agent should specifically confirm:

- `governance_uris` is an alphabetical array of actually-consulted articles (Item 1).
- `[O-open P1]` input scores against Open's 5 criteria, not Observation's 4 (Item 2).
- Worker with unreachable canon returns 7 types including Open (Item 3).
- `include_governance_details: true` returns parsed field schemas and criteria; absence returns minimal envelope (Item 4).
- If Item 5 shipped: zero `check.includes(...)` calls in `scoreArtifactQuality`.

---

## Out of Scope

- **CLI deprecation.** Separate handoff at `klappy://odd/handoffs/2026-04-30-cli-encode-deprecation`. Operator decision is deprecation, not parity.
- **LLM-in-the-loop encoding.** Alternative E in the predecessor brief; TruthKit territory, not oddkit.
- **Schema enforcement that rejects unknown fields.** Server should be permissive; extra fields surface as warnings, not errors.
- **Removal of `governance_uri` (singular).** 0.28.0 retains it as a deprecation alias; 0.29.0 removes.
- **Phase 1 supersession of older articles.** Already handled in PR #157 by in-place replacement; no chain needed.
- **P11 (gate mechanical enforcement of release-validation-gate).** Separate next-epoch capability.

---

## Pitfalls Carried Forward from the Sweep

These bit during P1.3.1 through P1.3.4 and remain live for any orchestrate.ts change:

- **Stop-word filters silently destroy short trigger words.** Tokenize with stop-words disabled on both sides when vocabulary contains words like "to," "in," "of." See P1.3.3 prod-break.
- **Module-memory caches that derive structure on first request lie about cache hits.** Don't introduce new derivation caches; rebuild per request from cached canon.
- **Set-intersection is the canon-parity matcher, not regex.** Stem both sides, take the intersection of token sets, threshold. Regex is the unstructured fallback only.
- **Bugbot autofix design over orchestrator design.** When Bugbot proposes an autofix, prefer it unless canon names a reason for divergence.
- **Parallel-release version collisions.** Confirm 0.28.0 isn't already cut on prod before opening the PR.

---

## Successor Pattern

When Phase 2 ships clean to prod:

1. Open closeout ledger at `odd/ledger/2026-MM-DD-encode-vodka-refactor-phase-2-landed.md` mirroring `klappy://odd/ledger/2026-04-20-p1-3-4-encode-canon-parity-landed`.
2. Flip this handoff's frontmatter to `status: superseded`, `superseded_by: <ledger path>`.
3. Update `oddkit_encode` tool description to reflect new envelope (`governance_uris` plural, `include_governance_details` param).
4. Update `klappy://docs/architecture/encode-current-state-2026-04-30` to reflect the new state, OR supersede with a fresh current-state doc dated to the merge.
5. If CLI deprecation hasn't shipped yet, decide whether Phase 2 unblocks or accelerates the deprecation timeline.

---

## Open Items (carried forward to next session)

| Tag | Description | Priority |
|---|---|---|
| O-open | Confirm 0.28.0 is the right minor version before opening the PR (parallel-release check). | P1 |
| O-open | Decide at the gate whether Item 5 ships in 0.28.0 or defers to 0.29.0. Depends on Items 1–4 implementation cost. | P1 |
| O-open | After Phase 2 lands: TruthKit-KB sync — replace its older D/O/L/C/H/Q articles with the now-canonical oddkit versions, or maintain divergence intentionally. | P3 |

---

## See Also

- [Encode Current State (2026-04-30)](klappy://docs/architecture/encode-current-state-2026-04-30) — what the worker actually does today
- [Code Claims Require Code Observation](klappy://canon/principles/code-claims-require-code-observation) — the principle that prevents the next stale-handoff cycle
- [Audit 2026-04-30 Cleanup Ledger](klappy://odd/ledger/2026-04-30-audit-cleanup-encode-artifacts-landed) — the cleanup that surfaced the dedup bug and the staleness chain
- [CLI Encode Deprecation Handoff](klappy://odd/handoffs/2026-04-30-cli-encode-deprecation) — the parallel CLI retirement path
- [P1.3.4 Closeout — Encode Canon-Parity](klappy://odd/ledger/2026-04-20-p1-3-4-encode-canon-parity-landed) — prior ship in the encode arc
- [Release Validation Gate](klappy://canon/constraints/release-validation-gate) — gate mandatory for this refactor
