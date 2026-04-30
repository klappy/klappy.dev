---
uri: klappy://odd/ledger/2026-04-30-audit-cleanup-encode-artifacts-landed
title: "Audit 2026-04-30 Cleanup Closeout — Three Stale Artifacts Superseded, Code-Observation Principle Earned, CLI Deprecation Queued"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "ledger", "session", "epoch-8.4", "audit-2026-04-30", "supersession", "code-observation-principle", "cli-deprecation", "encode", "post-mortem", "structural-fix"]
epoch: E0008.4
date: 2026-04-30
describes_state_at: "klappy/oddkit@1a1f093 (main) and klappy/klappy.dev@125cf8d1 (main, post-PR-#157, pre-cleanup-PR)"
derives_from: "canon/principles/code-claims-require-code-observation.md, docs/architecture/encode-current-state-2026-04-30.md, odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d-revised.md, odd/handoffs/2026-04-30-cli-encode-deprecation.md, odd/ledger/2026-04-30-e0008-4-phase-1-encode-governance-migration-landed.md"
complements: "odd/ledger/2026-04-20-p1-3-4-encode-canon-parity-landed.md"
governs: "Closeout for the Audit 2026-04-30 cleanup PR. Records what the audit found, what was superseded, what was added, and what structural changes prevent the same failure mode from recurring."
status: active
---

# Audit 2026-04-30 Cleanup Closeout

> Audit found that three artifacts shipped in PR #157 (Phase 1) described code state that PR #96 in `klappy/oddkit` had retired two weeks earlier. Cleanup PR supersedes the three artifacts in place (preserved for postmortem), publishes a current-state architecture doc and a revised Phase 2 handoff scoped against actual remaining work, queues CLI deprecation per operator decision, and graduates a new tier-1 principle — `code-claims-require-code-observation` — that names the failure mode so it cannot recur silently. The audit also surfaced a previously undetected production bug: `discoverEncodingTypes` dedupes by letter alone, silently dropping Open's quality criteria when both Observation and Open register letter `O`. Bug fix is queued in the revised Phase 2 handoff.

---

## Summary — Why This Cleanup Was Necessary

The Phase 1 ship (PR #157, merged 2026-04-30T05:08:53Z) brought three documents into klappy.dev canon that described a problem state already resolved in `klappy/oddkit`. Within an hour of merge, the operator asked the model to verify the framing against current code. Direct code observation revealed that the architecture brief, the Phase 2 handoff, and the closeout ledger were all written against a snapshot of `workers/src/orchestrate.ts` that had been retired by PR #96 on 2026-04-16T02:14:13Z — the same day the architecture brief was authored in `klappy/truthkit-kb`.

The brief was correct on the day it was written. It became stale within hours. It was cited as authoritative across multiple subsequent canon documents and a user-memory entry over a two-week period. No reader in the citation chain stopped to verify against current code — each one trusted the prior link. By the time PR #157 published the brief into klappy.dev canon, the chain was six links from any actual code observation. The model that authored Phase 1 (in this session) was the seventh link. Three published canon artifacts are the receipt.

This cleanup PR is the corrective. It does three things at the document layer (supersede the three stale artifacts in place; ship accurate replacements) and one thing at the structural layer (graduate the `code-claims-require-code-observation` principle to tier-1 canon, so the next time anyone — model or human — is about to make a code-state claim sourced from another document, the principle catches it).

---

## Decisions

**[D-01] Supersede the three stale artifacts in place rather than delete them.** Each gets a `status: superseded` flip, a `superseded_by` frontmatter field pointing to its replacement, a `supersession_reason` field naming the audit, and an addendum block prepended to the body that names what was wrong, what's still true, and what to read instead. Original bodies preserved verbatim below the addendum. Rationale: the artifacts are valuable as postmortem evidence — the failure mode is more legible when the failing documents are still readable.

**[D-02] Ship a fresh `encode-current-state-2026-04-30` architecture document with `describes_state_at` frontmatter naming the exact commits read.** Not a patch of the predecessor brief; a fresh document. Reason: the predecessor document's structure was a problem-and-alternatives analysis; the replacement needs a current-state structure. Different shapes, different documents.

**[D-03] Ship a revised Phase 2 handoff (`-revised` slug) scoping the actual five remaining worker items plus the Open dedup bug surfaced by the audit.** Predecessor handoff stays superseded; revised handoff supersedes it explicitly via `supersedes:` frontmatter. Rationale: handoff scope changes warrant new documents, not in-place edits, because handoff scope is contractual.

**[D-04] Graduate `code-claims-require-code-observation` to tier-1 canon.** Tier-1 because it is load-bearing — every model conversation in this project will exercise it, and violating it caused the failure cascade that necessitated this entire cleanup. Naming convention follows existing tier-1 principles (`klappy://canon/principles/...`). Includes anti-pattern catalogue, anti-pattern-permitted catalogue, and explicit relationship to existing axioms.

**[D-05] Queue CLI encode deprecation rather than backport governance-driven parsing.** Operator decision. Separate handoff at `klappy://odd/handoffs/2026-04-30-cli-encode-deprecation`. Telemetry-gated removal target: 0.30.0 or later, pending zero-consumer confirmation.

**[D-06] Adopt `describes_state_at` frontmatter field as a soft convention (not yet a constraint).** Documents that describe code state should cite the commit they were written against. Not yet enforced by tooling; surfaces stale claims to careful readers and to a future `oddkit_audit` extension if one ships.

---

## Observations

**[O-01]** The architecture brief in `klappy/truthkit-kb` and PR #96 in `klappy/oddkit` were authored on the same day (2026-04-16). The brief described a problem; the PR shipped its resolution. Neither cross-referenced the other; the brief became stale within hours.

**[O-02]** The citation chain that propagated the staleness: TruthKit-KB architecture brief (2026-04-16) → P1.3.4 closeout ledger H-01 in klappy.dev (2026-04-20) → user memory entry #14 (cumulative, last touched in this session) → model planning conversation (2026-04-30 morning) → PR #157 architecture brief migration + Phase 2 handoff + Phase 1 ledger (2026-04-30 04:51 UTC). Six links. No code observation at any link. The seventh link — this audit (2026-04-30 05:13 UTC) — was the first reader to clone the repo and read the actual code.

**[O-03]** The audit surfaced a previously undetected production bug in `workers/src/orchestrate.ts:discoverEncodingTypes` (line 512). The function dedupes encoding types by letter alone. When both `observation.md` (registered letter `O`, no facet) and `open.md` (registered letter `O`, facet `open`) are discovered, alphabetical iteration keeps Observation first and silently drops Open's quality criteria. Verified by live `oddkit_encode` call against the production worker after PR #157's Open enrichment landed: an `[O-open P1]` artifact returned `quality.maxScore: 4` (Observation's max) instead of `5` (Open's max). The Phase 1 ship is functionally less effective than its closeout ledger claimed; the revised Phase 2 handoff (Item 2) names the fix.

**[O-04]** Worker telemetry shows `governance_source: "knowledge_base"` for the audit's verification call, with all eight encoding-type articles fetched (constraint, decision, encode, handoff, learning, observation, open, serialization-format). Cache hits all around. The governance discovery infrastructure works correctly; the bug is in the dedup step downstream of discovery.

**[O-05]** PR #157 was technically correct in its scope as defined. The five Phase 1 actions (replace D/O/L/C/H, enrich O-open, sync serialization-format tag, copy architecture brief verbatim, write Phase 2 handoff, write Phase 1 closeout ledger) all completed. The framing of WHY was wrong, not the WHAT. The work landed; the explanation was fiction.

---

## Learnings

**[L-01] Canon governs intent, constraint, definition, plan, and decision. Canon does not govern code behavior.** Two different epistemic categories. A canon document that describes "what the code does" is making a claim of a different kind than a canon document that describes "what the code should do." The former requires direct code observation and is stale within commits; the latter requires reasoning and is stable across commits. Failing to distinguish them is the root cause of the audit failure. Graduated to canon as `klappy://canon/principles/code-claims-require-code-observation` (tier 1, this PR).

**[L-02] Document staleness propagates through citation faster than direct observation can correct it.** Six links of citation in two weeks; one link of observation in fifteen minutes corrected all six. The asymmetry is structural — citing is cheap, observing is slightly less cheap, but citation compounds while observation does not. The structural fix is to refuse to ratify code-state claims sourced from documents — which the new principle now does.

**[L-03] User memory entries are themselves a citation surface and inherit staleness from their sources.** Entry #14 carried the stale framing for two weeks. The fix in this session (memory replace) was downstream of the observation; the structural fix is the same principle — memory entries describing code state should be re-verified before being acted on, not treated as ground truth.

**[L-04] Operator catches what model misses, but only when the model produces enough surface to be questioned.** The "Why wasn't the journal included?" question opened the audit because the missing ledger was a visible surface that prompted scrutiny of the surrounding context. If the model had silently shipped Phase 1 without the operator's question, the staleness might have persisted through Phase 2 implementation and surfaced as a much more expensive failure (a Phase 2 PR rebuilding work that didn't need rebuilding). The lesson is not "always rely on the operator to catch you" — the lesson is "produce the surfaces that allow operator scrutiny to work, and don't hide behind succinctness."

**[L-05] In-place supersession with addendum-on-top preserves the failure mode for postmortem while clearly signaling current state.** The pattern: flip status, add `superseded_by` and `supersession_reason` frontmatter, prepend an addendum that names what was wrong, what's still true, and what to read instead. The original body remains intact below. Future readers see the supersession immediately; future archaeologists can still read the failed document as-shipped. Better than deletion (which loses the evidence) and better than rewrite-in-place (which obscures the failure).

---

## Constraints

**[C-01] (NEW, GRADUATED THIS PR) Code claims require code observation.** Any assertion of the form "the X currently does Y" must be backed by direct code observation against current HEAD, not citation of another document that made the claim previously. See `klappy://canon/principles/code-claims-require-code-observation` for the full principle, anti-patterns, and verification path.

**[C-02] (CARRIED FORWARD) Milestone ledgers ship in the same PR as the milestone work.** Graduated in the prior session (this PR's predecessor ledger, L-03 → C-03). Reaffirmed by this PR shipping its own ledger in-PR.

---

## Handoffs

**[H-01] Next session: Phase 2 implementation in `klappy/oddkit`.** Read `klappy://odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d-revised` as the implementation contract. Five worker items + Open dedup bug. Target 0.28.0. Full release-validation-gate (Bugbot completed + Sonnet 4.6 read-only validator via Managed Agents).

**[H-02] CLI deprecation track (parallel, lower priority).** Separate handoff at `klappy://odd/handoffs/2026-04-30-cli-encode-deprecation`. Operator decision is deprecation, not backport. Telemetry-gated.

**[H-03] L-05 graduation candidate.** "In-place supersession with addendum-on-top" is a candidate for graduation as a tier-2 method (`klappy://canon/methods/in-place-supersession-with-addendum`) if it reuses unprompted in two more sessions. Watch for future supersession work.

**[H-04] Soft-convention adoption: `describes_state_at` frontmatter on architecture/state docs.** Not enforced by tooling yet. If `oddkit_audit` graduates a stale-claim detector, this field becomes its primary input.

**[H-05] After Phase 2 ships: TruthKit-KB sync.** Replace TruthKit-KB's older D/O/L/C/H/Q articles with the now-canonical oddkit versions, OR maintain divergence intentionally. Likely one-direction sync (TruthKit reads oddkit baseline + adds harness-specific overlay). Decision deferred to post-Phase-2.

---

## Encodes

**[E-01]** Audit 2026-04-30 cleanup complete. PR (TBD-number) opened, mergeable, file count: 7 (3 supersession addendums + 4 new artifacts including this ledger + the new constraint principle + 2 new handoffs + 1 current-state architecture doc). New tier-1 canon principle graduated: `code-claims-require-code-observation`.

---

## Files in This PR

| Status | File | Purpose |
|---|---|---|
| modified | `docs/architecture/encode-architecture-problem-and-gaps.md` | Status flipped to superseded; addendum prepended |
| modified | `odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d.md` | Status flipped to superseded; addendum prepended |
| modified | `odd/ledger/2026-04-30-e0008-4-phase-1-encode-governance-migration-landed.md` | Status flipped to superseded; addendum prepended |
| added    | `canon/principles/code-claims-require-code-observation.md` | NEW tier-1 principle |
| added    | `docs/architecture/encode-current-state-2026-04-30.md` | Accurate current-state replacement for predecessor brief |
| added    | `odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d-revised.md` | Accurate Phase 2 scope |
| added    | `odd/handoffs/2026-04-30-cli-encode-deprecation.md` | CLI deprecation track |
| added    | `odd/ledger/2026-04-30-audit-cleanup-encode-artifacts-landed.md` | This ledger |

---

## Timeline (UTC)

| Time | Event |
|---|---|
| 04:14:50 | Session started (Phase 1 work) |
| 04:51:06 | PR #157 opened |
| 05:00:00 | Operator catches missing ledger; addendum added |
| 05:08:53 | PR #157 merged to main |
| 05:09:52 | Operator: "What's next?" — model proposes Phase 2 |
| 05:13:00 | Model dictates Phase 2 plan citing stale handoff claims |
| 05:13:53 | Operator confirms direction; model clones repo, reads code |
| 05:13–05:25 | Model verifies via direct code observation; staleness chain becomes visible |
| 05:26:21 | `oddkit_version` confirms prod state; live encode call confirms Open dedup bug |
| 05:26:00 | Audit findings presented to operator |
| 12:41:58 | Session resumed (7h 15m gap); operator gates one-PR cleanup with code-observation principle |
| (this PR) | Cleanup PR opened with seven file changes |

---

## References

- Cleanup PR: (TBD — added by branch creation step)
- Phase 1 PR (the cause): https://github.com/klappy/klappy.dev/pull/157
- Worker refactor that retired the brief's premise: `klappy/oddkit` PR #96, merged 2026-04-16T02:14:13Z
- New principle: `klappy://canon/principles/code-claims-require-code-observation`
- Current-state architecture: `klappy://docs/architecture/encode-current-state-2026-04-30`
- Revised Phase 2 handoff: `klappy://odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d-revised`
- CLI deprecation handoff: `klappy://odd/handoffs/2026-04-30-cli-encode-deprecation`
- Predecessor (superseded) ledger: `klappy://odd/ledger/2026-04-30-e0008-4-phase-1-encode-governance-migration-landed`
- Predecessor (superseded) handoff: `klappy://odd/handoffs/2026-04-30-encode-vodka-refactor-alternative-d`
- Predecessor (superseded) brief: `klappy://docs/architecture/encode-architecture-problem-and-gaps`
- Sibling ledger: `klappy://odd/ledger/2026-04-20-p1-3-4-encode-canon-parity-landed`
- Bootstrap: `klappy://canon/bootstrap/model-operating-contract`
