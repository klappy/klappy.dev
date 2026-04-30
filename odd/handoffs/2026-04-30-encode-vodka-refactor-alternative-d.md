---
uri: klappy://odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d
title: "Handoff — oddkit_encode Vodka Refactor (Alternative D, Governance-Driven Parser, E0008.4 Phase 2)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "handoff", "session", "epoch-8.4", "p2-encode-vodka", "oddkit-encode", "alternative-d", "governance-driven", "tsv", "vodka-architecture", "prompt-over-code", "release-validation-gate", "managed-agent-validation"]
epoch: E0008.4
date: 2026-04-30
derives_from: "docs/architecture/encode-architecture-problem-and-gaps.md, odd/encoding-types/decision.md, odd/encoding-types/observation.md, odd/encoding-types/learning.md, odd/encoding-types/constraint.md, odd/encoding-types/handoff.md, odd/encoding-types/open.md, odd/encoding-types/serialization-format.md, odd/encoding-types/how-to-write-encoding-types.md, canon/definitions/dolcheo-vocabulary.md, canon/constraints/release-validation-gate.md, canon/constraints/core-governance-baseline.md, odd/ledger/2026-04-20-p1-3-4-encode-canon-parity-landed.md"
complements: "odd/handoffs/2026-04-21-p1-3-2-gate-canary.md, odd/handoffs/2026-04-20-p1-3-4-encode-canon-parity.md"
governs: "Phase 2 implementation gate for the oddkit_encode vodka refactor: the parser must read encoding-type and serialization-format governance from canon at runtime, parse TSV input against governance-defined field schemas, score per-type quality from governance criteria, return per-type artifacts in a markdown stream, and declare governance_source + governance_uris in the response envelope."
status: active
---

# Handoff — oddkit_encode Vodka Refactor (Alternative D, Governance-Driven Parser, E0008.4 Phase 2)

> Phase 1 landed governance into canon. The seven encoding-type articles (D, O, L, C, H, E, Open) and the serialization-format article now carry field schemas, quality criteria, trigger words, and serialization rules — everything the parser needs to be governance-driven. The architecture brief at `klappy://docs/architecture/encode-architecture-problem-and-gaps` recommends Alternative D and resolves the design questions. Phase 2 is the parser refactor that makes the canon the source of truth.

---

## Summary — Why Phase 2 Exists Even Though P1.3.4 "Closed the Sweep"

The P1.3.4 closeout (`klappy://odd/ledger/2026-04-20-p1-3-4-encode-canon-parity-landed`) brought encode's trigger-word matcher to canon-parity with challenge and gate. That sweep was real progress, but it left the deeper architectural gap that H-01 of that ledger explicitly named: the encode parser still hardcodes recognition of four English keywords (`decision`, `insight`, `boundary`, `override`) via TypeScript regex, while the DOLCHEO governance defines seven dimensions (D, O, L, C, H, E, Open) plus an extension mechanism. The matcher was synchronized; the parser remained a regex against a private four-type vocabulary that does not match the canon at all. Two of the seven types — Observation and Handoff — have no parser representation. One name in the parser (`override`) does not exist in the canon at all. The model does the categorization work; the server discards it; the artifact collapses to a single blob.

Phase 1 of E0008.4 (this PR) populated canon with the per-type field schemas and quality criteria the architecture needs. Phase 2 of E0008.4 (this handoff) refactors the parser to read that canon at encode time. The sweep didn't fail — it cleaned the matcher. The parser is the next layer down.

---

## Scope — What Phase 2 Ships

**Implementation contract:** Alternative D from the architecture brief. The server reads encoding-type governance and serialization-format governance from canon at encode time. It parses structured TSV input mechanically against governance-defined field schemas. It falls back to paragraph-split + dynamic regex (built from governance-defined trigger words) for unstructured input. It scores per-type quality against governance-defined criteria. It returns per-type artifacts in a markdown stream. It surfaces the governance in the response so the model learns the format for subsequent calls.

**Specifically in scope:**

1. Replace `detectEncodeType()` in `orchestrate.ts` with a governance-driven classifier that reads the seven encoding-type docs and the serialization-format doc at runtime (cached identically to all other canon reads).
2. Parse TSV input mechanically: first field is the type letter, remaining fields are defined per-type by the article's Field Schema table. No regex on the primary path.
3. Implement the unstructured-input fallback: paragraph-split, dynamic regex from governance-defined trigger words, classify per paragraph.
4. Implement per-type quality scoring from each article's Quality Criteria table (criterion checks + gap messages, score levels).
5. Return per-type artifacts in markdown stream — one section per row, with title, type, quality score, gaps, and suggestions.
6. Declare `governance_source` (`"knowledge_base"` | `"minimal"`) and `governance_uris` (alphabetical-by-path array of the canon docs consulted) in the response envelope, matching the pattern challenge (P1.3.1) and gate (P1.3.2) established.
7. Update the encode tool description to teach the model the TSV format, name the seven types, and reference the governance for extension.
8. Bundle the seven encoding-type articles + serialization-format + how-to-write-encoding-types into the worker's minimal governance baseline per `canon/constraints/core-governance-baseline`, so the tool works when canon is unreachable but degrades to `governance_source: "minimal"` honestly.

**Specifically out of scope (do not let scope drift into these):**

- LLM-in-the-loop encoding (Alternative E in the brief — that's TruthKit territory, not oddkit).
- Schema enforcement that rejects unknown fields. The server should be permissive: extra fields are surfaced as warnings, not errors.
- Auto-supersession of the older shorter encoding-type articles. Phase 1 of this PR replaced them in place; no `superseded_by` chain is needed because the URIs are stable.
- P11 (gate mechanical enforcement of release-validation-gate) — that's a separate next-epoch capability per the P1.3.4 closeout.

**Target version:** oddkit 0.23.0 (canon-driven minor bump per the canary precedent). Coordinate version with the parallel-release lesson from P1.3.4 — confirm 0.23.0 isn't taken before opening the PR.

---

## Acceptance Criteria

A clean Phase 2 ship demonstrates all of the following:

1. `oddkit_encode` called with structured TSV input parses mechanically — no regex on the primary path.
2. `oddkit_encode` called with unstructured prose falls back to paragraph-split + dynamic regex from governance trigger words; classifications per paragraph reflect the governance vocabulary (seven types), not a hardcoded four.
3. Multi-row inputs return multi-artifact markdown streams. The DOLCHE-style "5 decisions, 3 observations, 2 learnings, 4 constraints, 3 handoffs" test from the architecture brief returns 17 typed artifacts, not one blob.
4. Each artifact carries a per-type quality score derived from its governance article's criteria, with explicit gap messages for missing fields.
5. Response envelope includes `governance_source` and `governance_uris` (alphabetical by path).
6. With canon reachable: `governance_source: "knowledge_base"`. With canon unreachable (simulated 403): `governance_source: "minimal"`, baseline behavior preserved, no silent substitution.
7. Tool description teaches the seven types and the TSV format. Description does not enumerate trigger words — those live in canon.
8. Smoke 126/126 × 5 consecutive runs at the preview URL before promotion (matching the gate canary precedent).
9. Bundled minimal baseline (the eight files: seven encoding-types + serialization-format + how-to-write-encoding-types, total nine files) shipped with the worker.

---

## Release Validation Gate — Mandatory, Not Optional

This refactor touches `orchestrate.ts`, the matcher implementation, governance reads, the response envelope, and action behavior. Per `klappy://canon/constraints/release-validation-gate` (tier 1), all three rules apply:

1. **Cursor Bugbot must reach `completed` before promotion merge.** `in_progress` is not non-blocking. If Bugbot is still running when the feature PR is otherwise green, wait.
2. **Independent Sonnet 4.6 read-only validator agent must be dispatched via Managed Agents before promotion merge.** This is not optional for a PR that touches all five trigger surfaces. Same-session smoke and self-calls do not satisfy this. Fresh-context validation per `klappy://canon/principles/verification-requires-fresh-context`.
3. **Canon outranks session-scoped recommendations.** If the session ledger ends up suggesting a shortcut on either of the above, surface the conflict and follow canon. Propose amendment to canon if session judgment was actually right.

The P1.3.3 process failure (skipped Bugbot, skipped validator, broke prod twice) is the cautionary tale. The P1.3.4 closeout was the second clean application of the gate. This will be the third — make it mechanical.

---

## Pitfalls Observed in the Sweep

These are not theoretical — they bit during P1.3.1 through P1.3.4. Carry them forward.

- **Stop-word filters silently destroy short trigger words.** Tokenize with stop-words disabled on both sides of the matcher when the vocabulary contains words like "to," "in," "of." See P1.3.3 prod-break post-mortem.
- **Module-memory caches that derive structure on first request lie about cache hits.** Canon reads cache; derived parses do not. Don't introduce new derivation caches; rebuild per request from cached canon. The `D9 cachedEncodingTypes` removal in P1.3.4 was for this exact reason.
- **Set-intersection is the canon-parity matcher, not regex.** Stem both sides, take the intersection of token sets, threshold. Don't reach for regex on the primary path. Regex is the unstructured fallback only.
- **Bugbot autofix design over orchestrator design.** When Bugbot proposes an autofix, prefer it unless canon names a reason for divergence. L-08 from P1.3.4 is the candidate principle graduation here.
- **Parallel-release version collisions.** Confirm the next minor isn't already cut on prod. P1.3.4 hit this; the version bump was a coordination artifact, not a content concern.

---

## Phase 1 Inventory — What Already Landed in This PR

For the validator agent and any future archaeologist:

- `odd/encoding-types/decision.md` — replaced (1.1KB → 5.1KB) with field schema (6 fields), TSV example, expanded trigger words (13), per-type quality criteria (5 checks).
- `odd/encoding-types/observation.md` — replaced with same upgrade pattern.
- `odd/encoding-types/learning.md` — replaced with same upgrade pattern.
- `odd/encoding-types/constraint.md` — replaced with same upgrade pattern.
- `odd/encoding-types/handoff.md` — replaced with same upgrade pattern.
- `odd/encoding-types/open.md` — enriched in place: kept oddkit's Open framing (DOLCHEO seventh letter, post-2026-04-19), added field schema with `facet`/`priority` columns, added quality criteria (5 checks), added narrative "What Makes a Good Open Encoding."
- `odd/encoding-types/serialization-format.md` — synced one missing tag (`encoding-type`); body unchanged.
- `odd/encoding-types/encode.md` — unchanged; encode is the meta-action, not a row class.
- `odd/encoding-types/how-to-write-encoding-types.md` — unchanged; oddkit's version already carries the Open/Observation `O`-letter collision note.
- `docs/architecture/encode-architecture-problem-and-gaps.md` — new in oddkit canon, body verbatim from `klappy/truthkit-kb`, klappy.dev frontmatter added with `provenance` field documenting the migration.

The TruthKit-KB articles dropped (not migrated): `question.md` — superseded by oddkit's `open.md` framing on 2026-04-19 when DOLCHEO promoted Open to the seventh letter. The TruthKit-KB origin remains in that repo's history; the field-schema and quality-criteria pattern from `question.md` was ported into `open.md`.

---

## What the Validator Should Confirm

When the Sonnet 4.6 read-only validator runs against the Phase 2 PR, it should answer these specifically:

1. Does `detectEncodeType()` (or its successor) read encoding-type governance at runtime, with no regex on the primary TSV path?
2. Are the trigger words in the fallback path sourced from each encoding-type article's `## Trigger Words` section, not from a TypeScript constant?
3. Are quality criteria sourced from each encoding-type article's `## Quality Criteria` table, not from a TypeScript constant?
4. Does the response envelope declare `governance_source` and `governance_uris`?
5. Does the bundled minimal baseline include the nine files named above?
6. With canon unreachable (test it), does `governance_source` flip to `"minimal"` and does behavior degrade gracefully?
7. Does the tool description teach the model the seven types and the TSV format without enumerating trigger words inline?
8. Is multi-row TSV input returned as multi-artifact markdown stream, one section per row, each with type-specific quality feedback?

A Phase 2 PR that fails any of the above is not done.

---

## Successor / Closeout Pattern

When Phase 2 ships clean to prod:

1. Open a closeout ledger at `odd/ledger/2026-MM-DD-encode-vodka-refactor-landed.md` mirroring the structure of `odd/ledger/2026-04-20-p1-3-4-encode-canon-parity-landed.md`.
2. Flip this handoff's frontmatter to `status: superseded`, `superseded_by: <ledger path>`.
3. Update the encode tool description in the README/docs site to reflect the new behavior.
4. Encode the L-08 graduation candidate (Bugbot autofix preference) as a tier-2 principle if this is the fourth occurrence of the autofix-vs-orchestrator-design tension.
5. Close E0008.4 as the encode-architecture-finally-right epoch. Confirm E0008.5 (or the next epoch) carries P11 (gate mechanical enforcement).

---

## Open Items (carried forward to next session)

| Tag | Description | Priority |
|---|---|---|
| O-open | Confirm 0.23.0 is the right minor version before opening the Phase 2 PR (parallel-release check). | P1 |
| O-open | Decide whether the bundled minimal baseline includes the architecture brief or only the eight per-type + format docs. The architecture brief is human-facing; the minimal baseline should probably stay machine-facing. | P2 |
| O-open | Decide whether `oddkit_encode` should accept a `format` hint param (e.g., `format: "tsv"` vs `format: "prose"`) or always auto-detect. Auto-detect is simpler; explicit hint is more honest. | P2 |
| O-open | TruthKit-KB next: replace its older D/O/L/C/H/Q articles with the now-canonical oddkit versions, or maintain divergence intentionally. Likely a one-direction sync — TruthKit reads from oddkit baseline + adds harness-specific overlay. | P3 |

---

## See Also

- [Encode Architecture: Problem, Gaps, and Alternatives Analysis](klappy://docs/architecture/encode-architecture-problem-and-gaps) — the implementation brief
- [P1.3.4 Closeout — Encode Canon-Parity](klappy://odd/ledger/2026-04-20-p1-3-4-encode-canon-parity-landed) — the prior ship and the H-01 that motivated this work
- [Core Governance Baseline](klappy://canon/constraints/core-governance-baseline) — the minimal-baseline contract
- [Release Validation Gate](klappy://canon/constraints/release-validation-gate) — the three rules for shipping
- [DOLCHEO Vocabulary](klappy://canon/definitions/dolcheo-vocabulary) — the seven-dimension umbrella
