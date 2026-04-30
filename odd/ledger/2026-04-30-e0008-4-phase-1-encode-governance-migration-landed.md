---
uri: klappy://odd/ledger/2026-04-30-e0008-4-phase-1-encode-governance-migration-landed
title: "E0008.4 Phase 1 Closeout — Encode Governance Migration from TruthKit-KB (Canon-Only Ship, Phase 2 Handoff Laid)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "ledger", "session", "epoch-8.4", "phase-1", "encode", "vodka-architecture", "alternative-d", "truthkit-kb", "governance-migration", "canon-only", "release-validation-gate", "dolcheo"]
epoch: E0008.4
date: 2026-04-30
derives_from: "docs/architecture/encode-architecture-problem-and-gaps.md, odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d.md, odd/ledger/2026-04-20-p1-3-4-encode-canon-parity-landed.md, canon/definitions/dolcheo-vocabulary.md, canon/constraints/release-validation-gate.md"
complements: "odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d.md, odd/encoding-types/decision.md, odd/encoding-types/observation.md, odd/encoding-types/learning.md, odd/encoding-types/constraint.md, odd/encoding-types/handoff.md, odd/encoding-types/open.md"
governs: "Closeout for Phase 1 of E0008.4 (encode governance migration from truthkit-kb into oddkit canon). Records the canon-only ship that prepares Phase 2 (parser refactor in klappy/oddkit). PR klappy/klappy.dev#157."
status: active
---

# E0008.4 Phase 1 Closeout — Encode Governance Migration from TruthKit-KB

> Phase 1 of E0008.4 shipped as a canon-only PR (klappy/klappy.dev#157, 9 files, +814/-57). The seven encoding-type articles (D, O, L, C, H, E, Open) and the serialization-format article now carry field schemas, TSV serialization examples, expanded trigger words, per-type quality criteria, and narrative sections — exactly what Alternative D needs to be governance-driven. The architecture brief originally written in `klappy/truthkit-kb` is now oddkit canon at `klappy://docs/architecture/encode-architecture-problem-and-gaps`, copied verbatim with klappy.dev frontmatter and a `provenance` field documenting the migration. The Phase 2 implementation handoff is at `klappy://odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d`. No code changes; the parser refactor is Phase 2 in `klappy/oddkit`.

---

## Summary — What Shipped, What Held, What Held the Door for Phase 2

This was a coordination ship, not an authoring ship. The encode-architecture problem analysis and the per-type field-schema/quality-criteria patterns had been authored in `klappy/truthkit-kb` (private) but were unused by the consumer that needed them most: oddkit's `oddkit_encode` parser. The P1.3.4 closeout (`klappy://odd/ledger/2026-04-20-p1-3-4-encode-canon-parity-landed`) explicitly named this gap as H-01 — the matcher was canon-parity, but the parser still hardcoded recognition of four English keywords against a vocabulary of seven dimensions. Phase 1 puts the governance where the parser will read it. Phase 2 makes the parser read it.

The migration was mechanically simple — copy bodies verbatim, rewrite frontmatter to klappy.dev conventions (epoch tag, dates, derives_from cross-links, provenance field on the architecture doc). The intellectual work was already done; this PR is the wiring.

The decision worth naming: split the work across two repos and two PRs. Phase 1 is canon-only and triggers no release-validation-gate surfaces — no `orchestrate.ts`, no matcher, no governance reads at runtime, no envelope changes, no action behavior changes. Phase 2 will trigger all five surfaces and demands the full gate (Bugbot to completed, Sonnet 4.6 read-only validator via Managed Agents). Splitting prevents Phase 1 from being held hostage to Phase 2's validator dispatch.

A second observation worth recording: the session also surfaced a posture lapse. The first attempt to declare Phase 1 "done" did not include a session ledger in the same PR. The session journal had been generated and persisted to `/mnt/user-data/outputs/`, but that is download storage, not project storage. The operator caught it directly: "Why wasn't the journal included?" The fix is in the PR you are now reading. Lesson L-03 below.

---

## Decisions

**[D-01] Migrate TruthKit-KB encoding-type field schemas, quality criteria, and architecture brief into oddkit canon as the basis for the encode parser vodka refactor.** Per-type articles for D, O, L, C, H replaced verbatim from TruthKit-KB; `open.md` enriched in place to keep oddkit's DOLCHEO seventh-letter framing while gaining TruthKit's quality-criteria pattern; `question.md` NOT migrated (superseded by Open on 2026-04-19). Architecture brief copied verbatim with klappy.dev frontmatter and `provenance` field; epoch tagged E0008.4. Single PR (klappy.dev #157) for Phase 1 — canon-only, no code changes. Rationale: re-authoring would have wasted the work already done in TruthKit-KB; verbatim migration with framing reconciliation is the cheaper and more honest correction.

**[D-02] Split the encode vodka refactor into two PRs across two repos: Phase 1 (canon migration, klappy.dev #157, this session) and Phase 2 (parser refactor, klappy/oddkit, separate session).** Rationale: the canon migration triggers no release-validation-gate surfaces but the parser refactor triggers all of them. Splitting prevents Phase 1 review from being held hostage to Phase 2 validator dispatch and lets each PR carry the gate severity it actually requires.

**[D-03] Keep oddkit's `open.md` framing (DOLCHEO seventh letter, post-2026-04-19) rather than migrate TruthKit's `question.md`.** Port the field-schema and quality-criteria pattern from `question.md` into `open.md` instead. Rationale: TruthKit-KB was last updated 2026-04-16 — three days before DOLCHEO supersession introduced "Open" as the seventh letter. The architectural pattern was portable across the framing change; the framing itself was not. Maintaining oddkit's newer framing keeps the umbrella vocabulary doc (`canon/definitions/dolcheo-vocabulary`) coherent.

---

## Observations

**[O-01]** TruthKit-KB's per-type articles (D, O, L, C, H) are roughly 4× larger than oddkit canon's were because they carry the field schemas, TSV serialization examples, expanded trigger-word lists (10–13 each vs. 7), per-type quality criteria with check rules and gap messages, and "What Makes a Good X Encoding" narrative sections that Alternative D requires. The work was already done; the consumer that needed it didn't have it.

**[O-02]** TruthKit-KB was last updated 2026-04-16, three days before the DOLCHEO supersession (2026-04-19) introduced "Open" as the seventh letter. TruthKit's `question.md` is older framing; oddkit's `open.md` is newer framing. The architectural pattern (field schema + quality criteria) was portable across the framing change; the framing itself was not. This kind of asymmetric divergence between sibling repos is a recurring shape — the lesson is in L-01.

**[O-03]** The architecture brief recommends Alternative D — Governance-defined field schemas with format-agnostic serialization. Server reads encoding-type docs at runtime, parses TSV mechanically, falls back to dynamic regex from governance trigger words for unstructured input, scores per-type quality, returns per-type artifacts in markdown stream, declares `governance_source` + `governance_uris` envelope. Identical pattern to challenge (P1.3.1) and gate (P1.3.2) canaries — encode is the third application of the same canary architecture, not a novel one.

**[O-04]** The session's `oddkit_encode` call at the end (the one that produced this ledger's content) returned `governance_source: "knowledge_base"` from the action envelope. Encode was already reading the encoding-types directory from canon to drive its own classification — but its parser still hardcodes the four English keywords. The runtime read and the parser logic are decoupled in the current implementation; Phase 2 will close that decoupling.

---

## Learnings

**[L-01] When two related repos diverge in governance authoring, the cheapest correction is verbatim migration with framing reconciliation, not re-authoring.** TruthKit-KB was ahead of oddkit canon on encode design; instead of re-authoring in oddkit, the body was migrated wholesale and the `provenance` frontmatter field was used to preserve authorship and origin. Review burden becomes the frontmatter (correctness, conventions, cross-links), not the body (which has already been written, reviewed, and proven coherent in its origin repo). This pattern likely generalizes to other oddkit ↔ TruthKit-KB sync situations and is a candidate for graduation as a tier-2 principle if it surfaces three more times.

**[L-02] The release-validation-gate's three rules don't apply uniformly to all PRs.** Canon-only PRs (no `orchestrate.ts` / matcher / governance reads / envelope / action behavior changes) don't require Bugbot completion or Sonnet validator dispatch. The gate's trigger surface list is the operative classifier — fetch the canon and check before deciding gate severity. This Phase 1 PR is the worked example of correct gate-skip: canon-only, standard gauntlet only. Phase 2 will be the worked example of correct full-gate application.

**[L-03] Persist-to-project-storage means canon repo, not download storage.** The first attempt to declare Phase 1 "done" generated a session journal and saved it to `/mnt/user-data/outputs/` — which is download storage for the operator, not project storage. The operator caught this directly. The bootstrap doc says "persist to project storage at natural breakpoints"; "project storage" for an oddkit-pattern project is the canon repo, written via the same PR that contains the work the journal describes. A milestone ship without a same-PR ledger is incomplete by the same standard P1.3.x has been measured against. This ledger you are reading is the fix; the lesson is that the model must include the ledger in the same PR as the work, not as a separate post-hoc artifact, and not as a downloadable file.

**[L-04] TruthKit-KB → oddkit migrations preserve authorship via the `provenance` frontmatter field.** Verbatim body copy with klappy.dev frontmatter added and a `provenance:` line documenting the source repo and migration date is the lightweight authorship-preservation pattern. It avoids the overhead of formal supersession chains for content that was authored elsewhere and migrated cleanly.

---

## Constraints

**[C-01] Phase 2 (parser refactor in klappy/oddkit) MUST run the full release-validation-gate.** Bugbot to completed (not `in_progress`), Sonnet 4.6 read-only validator dispatched via Managed Agents before promotion merge. Same-session smoke does not satisfy. The handoff document at `klappy://odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d` names this explicitly. Authority: `klappy://canon/constraints/release-validation-gate` (tier 1).

**[C-02] Bundled minimal baseline for the worker MUST include the nine governance files** (seven encoding-types: decision, observation, learning, constraint, handoff, encode, open; plus serialization-format and how-to-write-encoding-types). Without canon reachable, the tool degrades to `governance_source: "minimal"` honestly — does not silently substitute. Authority: `klappy://canon/constraints/core-governance-baseline`.

**[C-03] Milestone ledgers ship in the same PR as the milestone work.** Generate-and-download is not persistence to project storage. Authority: bootstrap operating contract at `klappy://canon/bootstrap/model-operating-contract` § "For Durable Records." This constraint is graduated from L-03.

---

## Handoffs

**[H-01] Next session: Phase 2 implementation in klappy/oddkit.** Read `klappy://odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d` as the implementation contract. Confirm 0.23.0 is the right minor (parallel-release check per the P1.3.4 lesson). Implement Alternative D end-to-end. Run full release-validation-gate. Open closeout ledger when shipped. Successor pattern mirrors `klappy://odd/ledger/2026-04-20-p1-3-4-encode-canon-parity-landed`.

**[H-02] After Phase 2 lands: TruthKit-KB sync.** Replace its older D/O/L/C/H/Q articles with the now-canonical oddkit versions, or maintain divergence intentionally. Likely one-direction sync (TruthKit reads oddkit baseline + adds harness-specific overlay). Decision deferred to post-Phase-2.

**[H-03] L-04 graduation candidate.** "Verbatim migration with `provenance` frontmatter is the cross-repo authorship-preservation pattern" is a candidate for graduation as a tier-2 principle. Watch for the next two cross-repo migrations (any direction); if either reuses this pattern unprompted, graduate.

**[H-04] L-03 graduation candidate (urgent).** "Milestone ledgers ship in the same PR as the milestone work" was just promoted to a constraint (C-03) because it was load-bearing in this session. Watch for any future session-end where the ledger is omitted — that's the canary that the constraint isn't being internalized.

---

## Encodes

**[E-01]** Phase 1 of E0008.4 complete: PR klappy/klappy.dev#157 opened, 9 files changed (now 10 with this ledger), +814/-57 (now ~+1100 with this ledger), `mergeable=true`. Canon migration from TruthKit-KB to oddkit verbatim with frontmatter rewrite plus session ledger now included in same PR.

---

## Files Changed (PR #157, post-ledger-add)

| Status | File | Origin |
|---|---|---|
| modified | `odd/encoding-types/constraint.md`        | truthkit-kb (verbatim body) |
| modified | `odd/encoding-types/decision.md`          | truthkit-kb (verbatim body) |
| modified | `odd/encoding-types/handoff.md`           | truthkit-kb (verbatim body) |
| modified | `odd/encoding-types/learning.md`          | truthkit-kb (verbatim body) |
| modified | `odd/encoding-types/observation.md`       | truthkit-kb (verbatim body) |
| modified | `odd/encoding-types/open.md`              | enriched in place (truthkit pattern, oddkit framing) |
| modified | `odd/encoding-types/serialization-format.md` | one tag sync |
| added    | `docs/architecture/encode-architecture-problem-and-gaps.md` | truthkit-kb (verbatim body, klappy.dev frontmatter) |
| added    | `odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d.md` | new (Phase 2 contract) |
| added    | `odd/ledger/2026-04-30-e0008-4-phase-1-encode-governance-migration-landed.md` | new (this ledger — added after operator caught its omission) |

---

## Timeline (UTC)

| Time | Event |
|---|---|
| 04:14:50 | Session start; bootstrap fetched |
| 04:15:13 | Orient on E0008 observability refactor inventory |
| 04:34:22 | Operator gate: scope confirmed (encode H-01) and method (use truthkit-kb articles) |
| 04:43:50 | Operator gate: "both canon and handoff brief, dual purpose" → execution |
| 04:44:00 | Preflight against the canon migration scope |
| 04:46–04:50 | Build 9 files locally (5 replacements, 1 enrichment, 1 sync, 2 new) |
| 04:51:06 | Push branch + open PR #157 + encode session checkpoint to memory |
| 04:51:30 | Session journal saved to `/mnt/user-data/outputs/` (incorrect storage location) |
| 04:52:03 | Validate returned NEEDS_ARTIFACTS; classified as expected for text commits |
| 05:00:00 | Operator: "Why wasn't the journal included?" — caught the storage-location miss |
| 05:00:47 | Time call; fix executed |
| 05:0X:XX | Ledger added to PR #157 as `odd/ledger/2026-04-30-e0008-4-phase-1-encode-governance-migration-landed.md` |

---

## References

- PR: https://github.com/klappy/klappy.dev/pull/157
- Architecture brief: `klappy://docs/architecture/encode-architecture-problem-and-gaps`
- Phase 2 handoff: `klappy://odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d`
- Prior ledger (motivating H-01): `klappy://odd/ledger/2026-04-20-p1-3-4-encode-canon-parity-landed`
- Source repo (private): `klappy/truthkit-kb`
- Release validation gate: `klappy://canon/constraints/release-validation-gate`
- Core governance baseline: `klappy://canon/constraints/core-governance-baseline`
- DOLCHEO vocabulary: `klappy://canon/definitions/dolcheo-vocabulary`
- Bootstrap operating contract: `klappy://canon/bootstrap/model-operating-contract`
