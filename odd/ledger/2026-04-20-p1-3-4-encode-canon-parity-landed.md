---
uri: klappy://odd/ledger/2026-04-20-p1-3-4-encode-canon-parity-landed
title: "P1.3.4 Closeout — Encode Canon-Parity (D5 + D9), the First Clean Application of Release-Validation-Gate, and the Sweep That Closed"
audience: ledger
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["ledger", "p1-3-4", "encode", "canon-parity", "stemmed-matcher", "phrase-subset", "cache-removal", "cache-fetches-and-parses", "release-validation-gate", "first-clean-application", "bugbot-fix-forward", "version-collision", "epoch-E0008.3", "sweep-closed"]
epoch: E0008.3
date: 2026-04-20
derives_from: "odd/handoffs/2026-04-20-p1-3-4-encode-canon-parity.md, odd/ledger/2026-04-20-p1-3-3-challenge-canon-parity-landed.md, canon/constraints/release-validation-gate.md, canon/principles/cache-fetches-and-parses.md, canon/principles/vodka-architecture.md, canon/principles/contract-governs-handoff-drift.md"
complements: "canon/bootstrap/model-operating-contract.md"
governs: "Closeout record for P1.3.4 of the canon-parity sweep (oddkit_encode). Closes the sweep — all three tools (encode, challenge, gate) now use stemmed matching and have in-process derivation caches removed per cache-fetches-and-parses. First application of release-validation-gate where no rule was violated at any point — the canon written during P1.3.3 worked exactly as designed on the very next sweep step."
status: active
supersedes: "odd/handoffs/2026-04-20-p1-3-4-encode-canon-parity.md"
---

# P1.3.4 Closeout — Encode Canon-Parity (D5 + D9), the First Clean Application of Release-Validation-Gate, and the Sweep That Closed

> P1.3.4 migrated `oddkit_encode`'s trigger-word classifier from regex alternation to stemmed phrase-subset matching (D5) and removed the `cachedEncodingTypes` module-level cache (D9), shipping as oddkit 0.23.0 to prod at 2026-04-20T14:45Z. This closes the canon-parity sweep — all three tools (encode, challenge, gate) now share the same matcher family and have their in-process derivation caches removed per `cache-fetches-and-parses`. P1.3.4 is also the first application of `klappy://canon/constraints/release-validation-gate` where no rule was violated at any point. Rule 1 (Bugbot completed) caught a high-severity multi-word-vocab-flattening bug on the first-cut implementation and fix-forwarded it inside the same PR before any merge. Rule 2 (fresh-context validator) ran twice — once on the feat branch, once on the promotion PR — both returning PASS on all 5 corroborations; the promotion validator's prod-baseline cross-check proved D5 is a genuine behavior fix, not just a rewrite. Rule 3 (canon outranks session artifacts) resolved a 0.22.0 version collision cleanly: parallel envelope-conformance work claimed 0.22.0 while this branch was in validator dispatch, and the canon-aligned response was a forward-bump to 0.23.0, not a renegotiation. The canon written during P1.3.3 worked on the next sweep step without drift.

---

## Summary — What Shipped, What the Canon Caught, What Closed

P1.3.4 scoped two items per `klappy://odd/handoffs/2026-04-20-p1-3-4-encode-canon-parity`: **D5** — migrate encode's trigger-word classifier from `triggerRegex: RegExp | null` to stemmed matching (mirroring the challenge D5 of P1.3.3 and the gate D5 of P1.3.2), adapted for encode's phrasal vocabulary (`committed to`, `going with`, `must not`, `next step`, etc.); and **D9** — remove the `cachedEncodingTypes` module-level in-process cache plus its `cleanup_storage` reset, per `klappy://canon/principles/cache-fetches-and-parses`. Both items landed in oddkit 0.23.0 via klappy/oddkit#126 (squash-merged as `7542cbb`) and klappy/oddkit#130 (merged to prod as `ea185a9`). This closes the canon-parity sweep that began with P1.3.1 (challenge canary, gate canary) and continued through P1.3.2 (gate D5+D9+cache-fetches-and-parses graduation) and P1.3.3 (challenge D5+D9+the canon that made the release-validation-gate bind).

The first-cut implementation (commit `259170a`) built the matcher around a flat `stemmedTokens: Set<string>` — each canon trigger word tokenized and its stems added as individual Set entries. Cursor Bugbot caught this as a high-severity finding within 15 minutes of the push: canon vocab includes phrasal entries like `committed to`, `going with`, `next step`, `blocked by`. Under the flat-Set design, the stop-word-adjacent constituents of these phrases (`to`, `with`, `by`, `up`, `out`) became standalone match triggers, which — because the P1.3.3 precedent required stop-words disabled on tokenize() for canon-vocab matching — would have fired Decision, Handoff, and other types on virtually every English paragraph. Bugbot's autofix (`113ba11`) replaced `stemmedTokens` with `stemmedPhrases: string[][]`, changing the match semantic from intersection-any to phrase-subset: a type matches when ALL stems of at least one canon phrase co-occur in the input stem set. Single-stem phrases degenerate to set membership (inflection matching for `deciding` → `decid` singleton → matches `decided` → `decid` singleton), multi-stem phrases like `[go, with]` require both stems present. A second Bugbot finding (low severity) caught the now-unused `intersectsStems` helper left over from the flat-Set design; autofix `e404fe0` removed it. Both findings were fix-forwarded in the same PR before any merge — Rule 1 satisfied.

Two independent Sonnet 4.6 read-only validator sessions ran against the branch. The feat-validator (`sesn_011CaF5vqjgzN7Mw8s84qvK9`) ran against `eaa1234` during the period PR #124 (telemetry_public envelope) and PR #125 (catalog `generated_at`) landed on main and were released as 0.22.0 via PR #128, then promoted via PR #129. That version collision was resolved per Rule 3: my feat-branch rebased forward to 0.23.0 (commit `d2acf91` + CHANGELOG resolution), not renegotiated. The promotion validator (`sesn_011CaF9tx18Af3z1Fy9trwz8`) ran against the squash-merged promotion head `7542cbb` and additionally cross-checked prod 0.22.0 with the same smoke file — prod showed 222 passed, 1 failed, with the single failure being the new assertion (12) (`"I'm deciding to..."` → `[D]`). This cross-check proved D5 is not just a rewrite but a genuine capability addition: the regex-era matcher does NOT match `deciding` against canon vocab `decided`, the stem-era matcher does. Both validators returned PASS on all 5 corroborations.

Test CF Preview flaked once during the promotion PR cycle (check-run reported `failure` on `7542cbb` at 14:06Z then recovered to `success` before merge). The fresh-context promotion validator ran 223/0 smoke × 3 consecutive against main-preview during the same window when CI showed the failure, providing independent counter-evidence that the failure was CI-side transient (preview warm-up or rate limit), not a content regression. The incident is canon-note candidate material: Rule 1 blocks on `failure` conclusion, but the validator's independent smoke provides counter-evidence that enables informed disposition without forced re-run.

The full sequence took roughly two and a half hours from P1.3.4 session start to this closeout ledger. No prod regression window — the canon held at every checkpoint. The sweep is closed.

---

## Decisions

**[D-01] Land D5 as stemmed phrase-subset match over flat stemmed set intersection — fit-to-problem-matcher, shaped for encode's phrasal vocabulary.** Encode's canon vocab (`odd/encoding-types/*.md` `## Trigger Words` blocks) is majority phrasal: `committed to`, `going with`, `must not`, `turns out`, `found that`, `next step`, `blocked by`, `waiting on`, `follow up`. The challenge and gate matchers used single-word vocabularies where flat `Set<string>` intersection works cleanly. Encode's phrases require conjunction — both stems of `committed to` must be in the input, not either one. The shipped design stores each canon phrase as an ordered stem array (`string[][]`) and declares a type match on the first phrase whose stems are all present in the input set. Single-stem phrases degenerate to set membership (identical to the prior single-token behavior for inflection matching), multi-stem phrases require co-occurrence. Simpler than the consecutive-subsequence alternative the orchestrator initially proposed; stronger than the flat-Set design Bugbot caught. Implementation: `workers/src/orchestrate.ts` — `EncodingTypeDef.stemmedPhrases: string[][]` field, `matchesStemmedPhrases(phrases, input)` helper, two call sites (parsePrefixedBatchInput first-match path with `break`, parseUnstructuredInput no-break path), with `tokenize(word, new Set())` on both parse-time and runtime per the P1.3.3 C-04 stop-word precedent.

**[D-02] Accept Cursor Bugbot autofix design over orchestrator in-session design when both fix the finding and the autofix is simpler.** The orchestrator's initial first-cut (commit `259170a`) used flat `stemmedTokens: Set<string>` which Bugbot caught as high-severity (multi-word vocab flattening produces universal function-word triggers). The orchestrator was mid-drafting a stricter consecutive-subsequence phrase-match variant when Bugbot pushed autofix `113ba11` implementing phrase-subset match (all-stems-any-order). Three reasons the autofix was preferred: (1) simpler one uniform structure — single-stem phrases degenerate cleanly to set membership, no special-case branching; (2) better alignment with encode's multi-type tolerance philosophy — the load-bearing L1161–1164 no-break DESIGN comment explicitly accepts over-classification as a design property; (3) Bugbot is the fresh-context reviewer — overriding its autofix with a force-push would invert the canonical Rule 1 disposition pattern. The orchestrator contributed CHANGELOG narrative, Bugbot disposition record, and the regression-anchor smoke assertion (16); Bugbot contributed the shipped matcher.

**[D-03] Rebase forward to 0.23.0 per Rule 3, not renegotiate via the handoff's 0.22.0 recommendation.** While this branch was in feat-validator dispatch (~13:16Z–13:47Z), PR #124 (telemetry_public envelope server_time) and PR #125 (catalog debug.generated_at) landed on main. PR #128 backfilled `[0.22.0]` CHANGELOG for those fixes and bumped the version. PR #129 promoted 0.22.0 to prod at 13:46:20Z. Main-reality at the end of validator dispatch: version-already-0.22.0, different content. Per `klappy://canon/constraints/release-validation-gate` Rule 3 ("canon outranks any session-scoped recommendation") and SemVer discipline, the response was a forward-bump: merge main into the feat branch, resolve CHANGELOG by placing the encode work under a new `[0.23.0]` above the existing `[0.22.0]`, bump `package.json` / `workers/package.json` / lockfiles from 0.22.0 to 0.23.0, push. The handoff's "ship as 0.22.0" recommendation was session-scoped guidance authored when the branch point was the version canon; main-reality displaced it.

**[D-04] Dispatch two fresh-context Sonnet 4.6 validators (feat + promotion), not one.** Rule 2 binds on "the main→prod promotion PR," not the feat PR. Dispatching only the promotion validator would have been canon-compliant. Two validators ran because: (a) the feat PR's scope and load-bearing surface justified fresh-context verification before merge to main, providing early catch of any Bugbot-missed defect, and (b) the promotion PR's content is the squash-merged feat PR plus a merge-commit and a one-line comment fix — the promotion validator's job is then narrower (verify squashed final state carries the validated behavior, plus confirm prod baseline cross-check). This two-stage pattern caught nothing new at the promotion stage (both validators returned identical PASS on identical evidence), but the promotion validator's prod-baseline cross-check produced the highest-value finding of the sweep: assertion (12) passes on 0.23.0 preview and fails on 0.22.0 prod, proving D5 is a genuine behavior fix.

**[D-05] Treat Test CF Preview `completed/failure` on `7542cbb` as disposition-eligible via validator counter-evidence, not a forced re-run.** At 14:06Z, CI reported `Test CF Preview: completed/failure` on the promotion PR's head. The Rule 1 gate script correctly flagged `all conclusions acceptable: False`. The fresh-context promotion validator (dispatched at 14:08Z, separate egress path) independently ran 223/0 smoke × 3 consecutive against main-preview during the same window, verdict PASS. The validator's evidence is stronger than the CI's — CI was asking "does the preview respond," the validator was asking "does the preview behave correctly, repeatedly, after I deploy fresh-context test cases against it." By 14:30Z the Test CF Preview re-ran on its own and recovered to `success`. The lesson, captured as a canon-note candidate: when Rule 1 reports `failure` but an independent fresh-context validator returns PASS on overlapping evidence, the disposition is "wait for CI to re-run naturally or force a re-run," not "override Rule 1." The validator is counter-evidence, not a bypass. The canon held.

**[D-06] Close the canon-parity sweep after P1.3.4 promotion, not chase P13.** Both validators flagged an informational item (not blocker): the `parseUnstructuredInput` fallback-to-`types[0]` behavior — when no canon vocab intersects with the input's stem set, the function emits one artifact of the first alphabetical type (= Constraint). Pre-existing since 0.18.0, visible in assertion (16)'s `"I need to wait until tomorrow for the review"` → `[C]`. The assertion only requires `!D && !H`, which holds. But the fallback is surprising if you assume "no match" means "no artifact." This is P13, carried forward, explicitly outside P1.3.4 scope. The sweep scope was D5 + D9 on encode, which is done. Scope creep to fix P13 would have required its own handoff, PRD, tests, and release. P1.3.4 closes the sweep; P13 becomes a future minor.

---

## Observations

**[O-01] The release-validation-gate canon written in P1.3.3 caught three real findings across the P1.3.4 ship.** All three were Bugbot findings that would have shipped silently under the pre-canon process: (1) high-severity multi-word-vocab-flattening on `259170a` (would have produced universal function-word match triggers on every English paragraph), (2) low-severity dead-code on `113ba11` (unused `intersectsStems` helper left over from the flat-Set design), (3) low-severity stale-version-comment on `d2acf91` (inline `// cachedEncodingTypes removed in 0.22.0` after the version bumped to 0.23.0). All three fix-forwarded in the same PR before any merge to main. Rule 1 worked exactly as designed — the same orchestrator under the same wall-clock pressure that produced the P1.3.3 failure now respected Bugbot's state at every push, and the findings caught bugs that the orchestrator's self-review had missed. The canon held on its second application, by its original author, the session after it was written.

**[O-02] Both Sonnet 4.6 validator sessions converged on PASS independently with overlapping evidence.** Feat-validator against `eaa1234` (before the merge-to-main + version-bump commits), agent `agent_011CaF5vo8B5UpqtfZAmSeui`, session `sesn_011CaF5vqjgzN7Mw8s84qvK9` — 5/5 corroborations PASS, 214/214 smoke. Promotion validator against `7542cbb` (post-squash-merge, 0.23.0), agent `agent_011CaF9tvJgRXQ6F96MtN4iu`, session `sesn_011CaF9tx18Af3z1Fy9trwz8` — 5/5 corroborations PASS, 223/223 smoke. The smoke assertion-count difference (214 → 223) is additive-only from the telemetry_public + catalog envelope assertions that landed via PR #124/#125 between the two validator runs; no encode assertions regressed. Convergence of two independent fresh-context validators on the same PASS verdict with overlapping but non-identical evidence is strong signal.

**[O-03] The promotion validator's C5 prod-baseline cross-check produced the highest-value finding of the sweep.** The standard C5 corroboration is "independent smoke × 3 against the target branch." The promotion validator additionally ran the same smoke file against `https://oddkit.klappy.dev` (serving 0.22.0 prod at that moment), returning **222 passed, 1 failed** — with the single failure being assertion (12): `"I'm deciding to ship the two-tier cascade"` classifies as Decision on 0.23.0 preview but not on 0.22.0 prod. This is the empirical proof that D5 is a genuine behavior fix, not a rewrite that preserves all existing semantics. On the regex-era matcher, `\bdecided\b` does NOT match `deciding`. On the stem-era matcher, `deciding` → `decid` singleton matches `decided` → `decid` singleton. Assertion (12) is now the canary for the matcher-family migration: it will pass on any version that has D5 and fail on any version that doesn't. The cross-check pattern should become standard for matcher-family changes in future sweeps.

**[O-04] Test CF Preview flake-and-recover happened during the promotion PR review window without orchestrator intervention.** 14:06Z: `Test CF Preview: completed/failure` posted. 14:30Z (approximately): same check-run recovered to `completed/success` — the GitHub Action job either re-ran on schedule or a retry policy fired. The orchestrator did not manually re-trigger. During the failure window (14:06Z–~14:30Z), the promotion validator was actively running 223/0 × 3 smoke against main-preview — independent counter-evidence that the branch itself was behaviorally correct. The pattern is canon-note candidate: when CI reports `failure` and an independent fresh-context validator returns PASS on overlapping evidence, the disposition is to wait for CI to self-correct (if idempotent) or to request a manual re-run with the validator's report as the cited basis, not to override Rule 1. The canon held; the CI's transient flake was not a signal.

**[O-05] The sandbox egress limitation made Rule 2 non-optional.** The orchestrator's execution environment returned "DNS cache overflow" on every `*.workers.dev` HTTPS probe for the entire P1.3.4 session, disabling in-session preview smoke. The fresh-context Managed Agents validator has different egress and ran all live-curl + smoke corroborations unimpeded. This is the canonical case Rule 2's fresh-context requirement was designed for: the orchestrator literally could not observe what the validator needed to observe. Under the pre-canon process this would have produced either (a) the orchestrator shipping without live verification or (b) a brittle manual probe via a proxy. Under Rule 2 the disposition was clean: dispatch the validator, trust its smoke, fold its evidence into the closeout. The validator's 15 live curls × 3 runs × 5 inputs, plus 223/223 smoke × 3 consecutive, replaced the single self-call the orchestrator would have made pre-canon.

**[O-06] The Klappy-identity commit `8a0636be` landed on the feat branch between the orchestrator's validated head `eaa1234` and the merge resolution `d2acf91`.** A one-line comment fix on `workers/src/orchestrate.ts:1586` updated the stale `// cachedEncodingTypes removed in 0.22.0` comment to `// removed in 0.23.0` after the version bump. Author: `Klappy <klappy@users.noreply.github.com>` — the same identity used by the orchestrator's commits in this session, indicating either the operator pushed manually or a parallel Cursor agent detected the stale reference. No functional change; no test impact; both validators ran against post-fix heads so neither was affected. Surfaced here because the commit's authorship pattern is worth noting: the orchestrator and the operator may produce Klappy-authored commits concurrently on the same branch, and both identities need to be accepted as legitimate fix-forward under Rule 1.

**[O-07] The version collision produced by parallel work illustrates that main is the canonical version space, not the handoff.** Four near-simultaneous PRs claimed version 0.22.0: the P1.3.4 handoff (authored at P1.3.3 closeout, recommended 0.22.0), my feat branch (bumped to 0.22.0 in commit `259170a`), PR #128 (`chore: release 0.22.0` backfill for telemetry + catalog envelope fixes), and PR #129 (promote-to-prod of PR #128's 0.22.0). PR #128 and PR #129 merged to main while my branch was in validator dispatch. The canon-aligned response is not "who had 0.22.0 first" (rights-based framing) but "what does main currently say" (reality-based framing). Main said 0.22.0 was for the envelope fixes; my work forward-bumped to 0.23.0. The principle generalizes: version numbers are a main-branch property, not a handoff property, and collision is resolved by forward-bump, not by rollback or litigation.

---

## Learnings

**[L-01] When two Bugbot findings on the same PR hit the same bug class, the class itself is the real finding.** P1.3.4's two findings on `259170a` (multi-word vocab flattening high-sev) and `113ba11` (unused `intersectsStems` helper low-sev) both stem from the same mental model: the orchestrator's first-cut design assumed the matcher vocabulary had a single uniform shape (flat `Set<string>`), and the phrase-subset semantics Bugbot surfaced required a different shape (`string[][]` with conjunction). The dead-code finding is the shape-change's residue; the flattening finding is the shape-change's cause. Under Rule 1, both got caught. Under the pre-canon process, both would have shipped. The sweep's three Bugbot findings (P1.3.3 bug #1 `from`-stop-word, P1.3.3 bug #2 DRY-in-DRY-refactor, P1.3.4 multi-word-vocab-flattening) all fit the pattern **silent matcher-semantics bugs that only fresh-context read can detect** — not detectable by `tsc`, unit tests authored by the same mind that wrote the bug, or same-session smoke. The regression-anchor pattern (numbered assertion named after the bug it prevents) is now standard and self-documenting: (10)/(11) prevent the P1.3.3 stop-word regression, (16) prevents the P1.3.4 flat-Set regression. Future matcher-family changes should ship with a numbered regression anchor for any bug class caught during development.

**[L-02] Version collisions from parallel work resolve as forward-bumps, not renegotiations.** When the P1.3.4 handoff recommended shipping as 0.22.0 and parallel envelope-conformance PRs claimed 0.22.0 first on main, the instinct to "hold 0.22.0 for the scope it was planned for and ship envelope fixes as 0.22.1" is wrong — it treats the handoff as authoritative version-space. The handoff is session-scoped guidance about what work to do; main is the authoritative version-space. Once 0.22.0 shipped with envelope fixes, 0.22.0 IS envelope fixes. The encode work forward-bumped to 0.23.0 without drama. Candidate new canon learning: **`canon/learnings/handoff-version-vs-main-reality.md`** (or similar slug). Text sketch: "When a handoff recommends a version number and parallel work claims it first on main, the canon-aligned response is a forward-bump to the next minor, not a renegotiation, merge conflict, or wait-for-space. The handoff's version-specifics are session-scoped guidance; main's version-state is reality. Rule 3 of release-validation-gate names this for releases; the learning generalizes to any claim where handoff-specifics conflict with main-state."

**[L-03] When orchestrator and autofix both fix the finding, prefer autofix when its design aligns with the tool's philosophy.** P1.3.4's Bugbot autofix for multi-word vocab flattening shipped `stemmedPhrases: string[][]` with phrase-subset match (all-stems-any-order co-occurrence). The orchestrator was mid-drafting a stricter consecutive-subsequence variant. Both would have fixed the Bugbot finding. Autofix was chosen because: (a) encode's load-bearing multi-type no-break design comment at L1161–1164 explicitly tolerates over-classification as a design property; (b) single-stem phrases degenerate cleanly to set membership under subset-match, special-casing isn't required; (c) Bugbot is the fresh-context reviewer per Rule 1, and overriding its autofix with an orchestrator-authored alternative inverts the canonical disposition pattern. The generalization: when orchestrator design diverges from autofix design and both resolve the finding, prefer autofix unless the orchestrator can name why canon requires the divergence. Candidate canon note. Worth surfacing to reviewers via PR-description convention: "Bugbot autofix accepted over orchestrator alternative because [aligned-with-tool-philosophy / simpler / Rule-1-default]."

**[L-04] Rule 2's fresh-context-validator pattern is not a box-checking exercise; it produces findings the orchestrator cannot produce.** The feat-branch validator's C3 live-curl matrix ran 15 curls (5 inputs × 3 runs) that the orchestrator's sandbox could not make due to DNS cache overflow on `*.workers.dev`. The promotion validator's C5 prod-baseline cross-check produced assertion-(12)-fails-on-0.22.0 evidence that the orchestrator could not produce from within a single session that ran only against preview. Both findings are load-bearing for trust in the ship, and both required the validator's distinct execution context. The validator's "boringness" in happy-path cases is the signal that Rule 2 is working; the orchestrator's inability-to-reproduce is what makes the validator's PASS non-trivial. The P1.3.3 ledger's L-01 stated this as "Same-session anything is not validation." P1.3.4 confirmed it concretely: not because the orchestrator was negligent, but because the orchestrator literally could not observe the state the validator observed. The validator is the required alternate observer, not the optional second opinion.

**[L-05] Prod-baseline cross-check is the C5 variant that matters most for matcher-family changes.** The standard C5 is "independent smoke × 3 against the target branch" — proves behavioral consistency on the new code. The cross-check variant runs the same smoke file against current prod — proves the new code changes real observable behavior, not just implementation. For matcher-family migrations (regex → stemmed, full-text → BM25, etc.), the cross-check is what turns "refactor with tests" into "empirically-proven capability change." Assertion (12) on 0.23.0 preview passes and on 0.22.0 prod fails — that single data point is stronger evidence for D5 being a genuine fix than 100 same-side smoke runs. The cross-check pattern should become standard for any refactor that claims to change behavior. It also doubles as a forward-compatibility check: if assertion (12) ever fails on a later version, the migration regressed.

**[L-06] CI transient failures during a Rule 1 gate require patience, not override.** Test CF Preview flaked on `7542cbb` at 14:06Z then self-recovered to success by ~14:30Z without orchestrator intervention. The orchestrator's instinct during the failure window was "override Rule 1 because validator already PASSed." The correct disposition per Rule 1 is: wait. If CI eventually recovers, Rule 1 is satisfied. If it doesn't, re-trigger the job with the validator's evidence as justification in the re-trigger comment. Never: declare "Rule 1 failure was spurious, merging anyway" without a canon-aligned disposition trail. The 24-minute wall-clock wait on the Test CF Preview flake was small relative to the promotion-trust it produced. Canon-note candidate: specify that Rule 1's `failure` conclusion blocks merge until (a) the check-run recovers to acceptable conclusion, OR (b) the orchestrator documents an explicit flake-and-rerun disposition with an independent fresh-context validator's overlapping-evidence PASS verdict as the basis.

**[L-07] Closing a sweep is a real milestone that deserves explicit marker-setting, not just "P1.3.4 done."** The canon-parity sweep spanned four sub-epochs (P1.3.1 challenge canary, P1.3.2 gate D5+D9+cache-fetches-and-parses, P1.3.3 challenge D5+D9+release-validation-gate-canon, P1.3.4 encode D5+D9). All three tools (encode, challenge, gate) now use stemmed matching and have their in-process derivation caches removed. The sweep's intent — "all three tools use the same matcher family, respect the same cache principle, and are discovered via the same canon-first pattern" — is complete. This ledger marks closure. Future sweeps should name their scope as a sequence of P-numbered handoffs from the start (as this one did implicitly via the P1.3.1 → P1.3.4 naming convention) and close with a ledger that names the sweep's completion. Adjacent future work (e.g., P11 `oddkit_gate` mechanical enforcement of release-validation-gate) belongs in a new sweep, not as a P1.3.5.

---

## Constraints

**[C-01] No PR merge to oddkit main with Cursor Bugbot `in_progress`, and no promotion to prod without independent fresh-context validator dispatch, when the PR touches load-bearing surface.** Per `klappy://canon/constraints/release-validation-gate` Rules 1–2. Load-bearing surface for P1.3.4 encompassed `workers/src/orchestrate.ts` (matcher module, action behavior), smoke file, CHANGELOG, version files. Both rules satisfied at every PR: feat PR #126 merged with Bugbot completed/success on final head `8a0636be`; promotion PR #130 merged with Bugbot completed/success on head `7542cbb` plus two independent Sonnet 4.6 validator sessions returning PASS. The canon held for both merges.

**[C-02] When parallel work on main claims the version number specified in a handoff, forward-bump, not renegotiate.** Per Rule 3 and L-02 above. P1.3.4's handoff said "ship as 0.22.0"; main shipped PR #128 as 0.22.0 at 13:32Z; my branch forward-bumped to 0.23.0 via merge-commit `d2acf91` at 13:49Z. The handoff was superseded by main-reality; the canon-aligned resolution was immediate, not contested.

**[C-03] Bugbot autofix commits are Rule-1-disposition-eligible by default; override the autofix only when canon-aligned rationale is explicit.** Per L-03 above. P1.3.4's Bugbot autofix `113ba11` (phrase-subset match) was accepted without orchestrator force-push because encode's multi-type no-break design philosophy aligns with subset-match's permissive semantics. Override would have required an explicit statement in the PR description naming which canon required the divergence; no such rationale existed. Forward-default to autofix; document rationale on override.

**[C-04] Test CF Preview `completed/failure` does not automatically block merge when an independent fresh-context validator has returned PASS with overlapping evidence, but the disposition MUST be explicit in the closeout.** Per L-06 above. P1.3.4's Test CF Preview flake on `7542cbb` at 14:06Z recovered to success by ~14:30Z without orchestrator intervention; the promotion validator's 223/0 × 3 smoke ran during the failure window. Merge proceeded after CI recovered, not over the failure. If the flake had persisted, the canon-aligned response would have been a manual re-trigger with the validator's evidence cited in the re-trigger basis, not an override. Future similar cases should follow the same pattern.

---

## Handoffs

**[H-01] The P1.3.4 handoff at `klappy://odd/handoffs/2026-04-20-p1-3-4-encode-canon-parity` is hereby superseded by this ledger.** Frontmatter being flipped to `status: superseded` and `superseded_by: odd/ledger/2026-04-20-p1-3-4-encode-canon-parity-landed.md` in this same commit. Future readers of that handoff should be redirected here.

**[H-02] Carry-forward to next sweep: the canon-parity sweep is closed — don't scope sub-steps under P1.3.x anymore.** Next work should open a fresh handoff under a new sub-epoch. The natural next capability add is **P11** (carried from P1.3.3): `oddkit_gate` mechanical enforcement of `release-validation-gate` at execution → completion transitions. Gate detects completion-with-merge-or-promotion intent, pulls GitHub Checks API for the PR, refuses PASS until Bugbot is `completed` and (for load-bearing PRs) a validator session ID is referenced in `context`. Until P11 ships, the orchestrator's manual obligation under Rule 1/Rule 2 remains; P1.3.4 demonstrated that manual obligation is sufficient under discoverable canon but mechanical enforcement is the next rung.

**[H-03] Open O-open carry list updated:**

- **P2 (carried)** — `getIndex` strict-mode (`skipBaselineFallback`) across encode/challenge/gate
- **P3 (carried)** — Handoff text corrections (from P1.3.3 — reference `qualityCriteria` field-name context)
- **P5 (carried)** — `workers/baseline/` build pipeline
- **P6 (carried)** — CHANGELOG render route + `version_notes_url` on MCP `initialize`
- **P9 (carried)** — Global `cachedBM25Index` review under `cache-fetches-and-parses` (counter-case, 524+ docs)
- **P10 (carried, from P1.3.2)** — Gate classifier oscillation under retry
- **P11 (carried, from P1.3.3)** — `oddkit_gate` mechanical enforcement of `release-validation-gate` at execution → completion (promoted to next-sweep priority per H-02)
- **P12 (carried, from P1.3.3)** — `tokenize()` audit pass: any caller that passes canon vocabulary or canon-shaped input should explicitly pass a stop-word set (empty, default, or custom) so the choice is visible at the call site
- **P13 (NEW from P1.3.4)** — `parseUnstructuredInput` fallback-to-`types[0]` behavior. When no canon vocab intersects with the input's stem set, the function emits one artifact of the first alphabetical type (= Constraint). Pre-existing since 0.18.0, surfaced by both P1.3.4 validators via assertion (16)'s `[C]` result (the assertion only requires `!D && !H` which holds, but the `[C]` result is surprising). Outside P1.3.4 scope. Future design decision: return empty artifact list? Null-typed artifact? Emit fallback only for single-paragraph input? Configurable per-call? Likely minor surface; tie to a handoff when picked up.

**[H-04] Candidate new canon, carried as writing work for a future session:**

- **Canon learning candidate (L-02):** `canon/learnings/handoff-version-vs-main-reality.md` (or similar slug) — "When a handoff recommends a version number and parallel work claims it first on main, the canon-aligned response is a forward-bump to the next minor, not a renegotiation."
- **Canon note candidate (O-04, L-06, C-04):** CI transient-failure disposition pattern under Rule 1 — "When an independent fresh-context validator returns PASS with overlapping evidence during a CI `completed/failure` window, wait for CI to self-correct or force a manual re-run with the validator's evidence as the cited basis; never override Rule 1 without disposition trail."
- **Canon note candidate (L-03, C-03):** Bugbot-autofix-vs-orchestrator-design disposition default — "When both fix the finding, prefer autofix unless canon-aligned override rationale is explicit in the PR description."

---

## Encodes (DOLCHE summary)

| Type | Count | Persisted to |
|---|---|---|
| **D**ecisions | 6 | This ledger §Decisions |
| **O**bservations | 7 | This ledger §Observations |
| **L**earnings | 7 | This ledger §Learnings |
| **C**onstraints | 4 | This ledger §Constraints |
| **H**andoffs | 4 | This ledger §Handoffs; superseded predecessor handoff |
| **E**ncodes | 1 | `/home/claude/work/encodes/p1-3-4-closeout.md` (closeout DOLCHE captured after prod promotion) |

Mid-session encode artifact captured after PR #130 merged to prod, before this ledger was drafted. `oddkit_encode` tool output does not persist; the file save is the explicit persistence per standing rule. The DOLCHE artifact and this ledger are the durable records; everything else (chat transcripts, PR descriptions, validator session events) is retrievable-but-not-canonical.

---

## Validation Evidence

### Feat-branch validator (first Rule 2 dispatch)

Sonnet 4.6 read-only validator session, dispatched against `eaa1234` per `klappy://canon/constraints/release-validation-gate` Rule 2:

- **Agent:** `agent_011CaF5vo8B5UpqtfZAmSeui` (`claude-sonnet-4-6`)
- **Session:** `sesn_011CaF5vqjgzN7Mw8s84qvK9`
- **Task:** 5-corroboration validator pattern against P1.3.4 feat branch (PR #126, head `eaa1234`)
- **Verdict:** **PASS** on all 5 corroborations

| # | Corroboration | Verdict | Key Finding |
|---|---|---|---|
| 1 | PRD-vs-shipped drift | PASS | Scope matches handoff (D5 + D9 + smoke regression anchors); CHANGELOG describes phrase-subset match that was actually shipped (not the orchestrator's consecutive-subsequence alternative); no scope creep |
| 2 | Bytes-on-branch verification | PASS | Zero functional refs to `triggerRegex`/`cachedEncodingTypes`/`intersectsStems`; `EncodingTypeDef.stemmedPhrases: string[][]` confirmed; both classifier call sites use `matchesStemmedPhrases`; L1226–1229 no-break DESIGN comment preserved verbatim; all 4 tokenize() calls on encode path pass `new Set()` as second arg; version bumps at 0.22.0 (pre-merge-rebase) |
| 3 | Live curl matrix (5 inputs × 3 runs) | PASS | All 15 calls consistent — assertions (12) inflection match, (13) phrasal survival, (14) multi-type, (15) batch first-match, (16) phrase-subset regression all verified against feat preview |
| 4 | Canon retrievability | PASS | All 7 `odd/encoding-types/*.md` docs retrievable via `oddkit_get`; trigger-word vocabularies enumerated for orchestrator audit; zero klappy.dev modifications (oddkit-only PR) |
| 5 | Independent smoke × 3 | PASS | 214 passed, 0 failed, each of 3 consecutive runs against feat preview |

Non-blocking observations surfaced by feat validator: (a) Input E fallback-to-`types[0]` → captured as P13; (b) assertion count 214 vs handoff-projected 177 → additive from PR #124 telemetry_public envelope assertions.

### Promotion validator (second Rule 2 dispatch)

Sonnet 4.6 read-only validator session, dispatched against `7542cbb` (PR #130 main → prod promotion head):

- **Agent:** `agent_011CaF9tvJgRXQ6F96MtN4iu` (`claude-sonnet-4-6`)
- **Session:** `sesn_011CaF9tx18Af3z1Fy9trwz8`
- **Task:** 5-corroboration validator pattern against promotion PR delta (prod 0.22.0 → main 0.23.0)
- **Verdict:** **PASS — PROMOTION READY** on all 5 corroborations

| # | Corroboration | Verdict | Key Finding |
|---|---|---|---|
| 1 | PRD-vs-shipped drift | PASS | `git diff prod..7542cbb` is exactly the encode refactor; no telemetry/catalog bleed; CHANGELOG `[0.23.0]` above `[0.22.0]` with accurate version-note blockquote explaining the rebase-bump; challenge/gate code unchanged |
| 2 | Bytes-on-branch verification | PASS | Single `cachedEncodingTypes` hit at L1586 is a comment only (zero functional refs); all 4 tokenize-with-empty-stopwords call sites confirmed at L469/529/1176/1224; L1226–1229 no-break DESIGN comment preserved verbatim; zero writes to any `cachedEncodingTypes*` variable |
| 3 | Live curl matrix (5 inputs × 3 runs) | PASS | Preview reports 0.23.0; all 15 calls consistent — assertions (12)–(16) all verified; Input E returns `[C]` via pre-existing fallback (captured as P13, not a regression) |
| 4 | Canon retrievability | PASS | All 7 encoding-type URIs retrievable (one transient 502 on first `encode` type fetch, succeeded on retry — infrastructure flap, not content failure); oddkit-only PR confirmed |
| 5 | Independent smoke × 3 + prod baseline cross-check | PASS | 223 passed, 0 failed × 3 runs against main-preview; **prod 0.22.0 cross-check: 222 passed, 1 failed — the single failure is assertion (12), confirming D5 is a genuine fix** |

The prod-baseline cross-check at C5 produced the sweep's highest-value evidence: D5 is not just a refactor, it's a capability change that passes tests the prior matcher could not.

### Bugbot reviews dispositioned per Rule 1

| SHA | Content | Bugbot conclusion | Findings | Disposition |
|---|---|---|---|---|
| `259170a` | first-cut flat `stemmedTokens: Set<string>` | completed/neutral | 1 HIGH (multi-word vocab flattening) | Fix-forward `113ba11` (Cursor autofix) |
| `113ba11` | Cursor autofix `stemmedPhrases: string[][]` subset match | completed/neutral | 1 LOW (unused `intersectsStems`) | Fix-forward `e404fe0` (Cursor autofix) |
| `e404fe0` | remove `intersectsStems` dead code | completed/success | 0 | Clean |
| `eaa1234` | CHANGELOG + smoke assertion (16) port onto autofix | completed/success | 0 | Clean — validated by first Sonnet session |
| `d2acf91` | merge `origin/main`, rebase-bump to 0.23.0 | cancelled | n/a | Superseded by `8a0636be` before completion |
| `8a0636be` | stale-comment fix (0.22.0 → 0.23.0 in cleanup_storage comment) | completed/success | 0 | Clean — final feat head at merge |
| `7542cbb` | squash-merge on main (promotion PR head) | completed/success | 0 | Clean — validated by second Sonnet session |

All findings fix-forwarded in the same PR; all merges happened with Bugbot `completed/success` on the final head. Rule 1 satisfied for every merge.

### Independent prod self-call (post-promotion)

Post-merge, direct call to oddkit MCP at `https://oddkit.klappy.dev/mcp` from the orchestrator session (the MCP tool available in this session IS prod):

```
action: version
result.oddkit_version: "0.23.0"
# Prod serving 0.23.0 ✓

action: encode
input: "I'm deciding to ship the two-tier cascade"
result.artifacts: [{"type": "D", "typeName": "Decision"}]
# Assertion (12) passes on prod ✓ — D5 is live, stem matching works end-to-end
```

Same input on prod 0.22.0 (per promotion validator's cross-check) returned `[C]` via fallback, not `[D]`. The behavior change is observable at the prod boundary and is the intended D5 capability.

---

## Timeline (UTC)

| Time | Event |
|---|---|
| ~12:17Z | P1.3.4 session start; handoff fetched; feat branch cut; D5 + D9 first-cut pushed as `259170a` |
| 12:55Z | Bugbot posts HIGH-SEV finding on `259170a`: multi-word vocab flattening |
| 13:04Z | Cursor autofix `113ba11` pushed: `stemmedPhrases: string[][]` subset match |
| 13:09Z | Bugbot posts LOW-SEV finding on `113ba11`: unused `intersectsStems` helper |
| 13:14Z | Cursor autofix `e404fe0` pushed: dead-code removal |
| 13:16Z | Orchestrator commit `eaa1234`: CHANGELOG + smoke assertion (16) Bugbot regression anchor |
| 13:16Z | Feat-branch Sonnet 4.6 validator dispatched against `eaa1234` (`sesn_011CaF5vqjgzN7Mw8s84qvK9`) |
| ~13:25Z | PR #125 (catalog `generated_at`) merges to main on parallel track |
| 13:32Z | PR #128 (`chore: release 0.22.0`) merges to main — version collision begins |
| 13:46Z | PR #129 (promote 0.22.0 to prod) merges — prod now at 0.22.0 |
| 13:47Z | Feat-branch validator returns **PASS** (5/5 corroborations, 214/214 smoke × 3) |
| 13:49Z | Orchestrator merge-commit `d2acf91`: rebase onto main, CHANGELOG resolved as `[0.23.0]` above `[0.22.0]`, version files bumped to 0.23.0 |
| 13:54Z | Klappy-identity commit `8a0636be`: stale `0.22.0` comment on L1586 → `0.23.0` |
| 14:00Z | Bugbot completed/success on `8a0636be` (final feat head) |
| ~14:01Z | **Feat PR #126 squash-merged into main as `7542cbb`** |
| 14:02Z | Promotion PR #130 opened (main → prod, 0.22.0 → 0.23.0) |
| 14:06Z | Test CF Preview reports `completed/failure` on `7542cbb` (CI flake) |
| 14:08Z | Promotion Sonnet 4.6 validator dispatched against `7542cbb` (`sesn_011CaF9tx18Af3z1Fy9trwz8`) |
| ~14:30Z | Test CF Preview self-recovers to `completed/success` without orchestrator intervention |
| 14:39Z | Promotion validator returns **PASS — PROMOTION READY** (5/5 corroborations, 223/223 smoke × 3, prod 222/1 cross-check confirming D5 fix) |
| **14:45Z** | **PR #130 merged to prod — oddkit 0.23.0 LIVE at commit `ea185a958105e43f4be5615980322249254b357f`** |
| 14:52Z | Prod live self-call confirms 0.23.0 serving; `oddkit_encode("I'm deciding to ship...")` returns `[D]` — D5 end-to-end verified |
| ~14:55Z | This closeout ledger drafted |

**Total session elapsed:** ~2h 45m from session start to closeout ledger draft. Zero prod-regression window — the canon held at every checkpoint.

---

## Sweep Closure

The canon-parity sweep began with P1.3.1 (challenge canary + gate canary — D5/D9 smoke-tested on orientation tools) and closes here. The four sub-steps:

| Sub-step | Scope | Version | Ledger |
|---|---|---|---|
| P1.3.1 | Challenge canary + gate canary (D5 + D9 smoke-tested) | 0.19.0 | `klappy://odd/ledger/2026-04-20-p1-3-1-challenge-canary-landed` |
| P1.3.2 | Gate D5 + D9 shipped; `cache-fetches-and-parses` principle named for graduation | 0.20.0 | `klappy://odd/ledger/2026-04-20-p1-3-2-gate-canary-landed` |
| P1.3.3 | Challenge D5 + D9; `cache-fetches-and-parses` graduated; **release-validation-gate + contract-governs-handoff-drift written under process-failure pressure** | 0.21.0 → 0.21.1 fix-forward | `klappy://odd/ledger/2026-04-20-p1-3-3-challenge-canon-parity-landed` |
| P1.3.4 | Encode D5 + D9; **first clean application of release-validation-gate**; sweep closes | 0.22.0 (collision) → 0.23.0 | This ledger |

After P1.3.4 promotion, the three tools (`oddkit_encode`, `oddkit_challenge`, `oddkit_gate`) share:

- **Stemmed matcher family** (adapted per tool: gate's stemmed BM25 with per-check vocabulary, challenge's stemmed set intersection with four structural-test side-paths, encode's stemmed phrase-subset with conjunction for multi-word phrases)
- **No in-process derivation caches** — fetch tier (Module Memory → Cache API → R2 with 5-min TTL) handles canon file caching; derivation is sub-millisecond and runs per-call
- **Canon-first vocabulary** — all trigger/prereq/classifier vocabularies read from `odd/**/*.md` at runtime, not hardcoded

The sweep's original motivation — "code hardcoding what canon should define is the Vodka anti-pattern" — is resolved for all three tools. Next structural rung is P11 (mechanical enforcement of release-validation-gate via `oddkit_gate`), to be scoped under a new sweep handoff.

---

## Refs

- **Code shipped:** klappy/oddkit#126 squash-merged as `7542cbb`, klappy/oddkit#130 merged to prod as `ea185a958105e43f4be5615980322249254b357f` — oddkit 0.23.0
- **Handoff superseded:** `klappy://odd/handoffs/2026-04-20-p1-3-4-encode-canon-parity` (`status: superseded`, `superseded_by: odd/ledger/2026-04-20-p1-3-4-encode-canon-parity-landed.md` — parallel commit)
- **Canon applied (not modified):** `klappy://canon/constraints/release-validation-gate` (Rules 1, 2, 3 all satisfied), `klappy://canon/principles/cache-fetches-and-parses`, `klappy://canon/principles/vodka-architecture`, `klappy://canon/principles/contract-governs-handoff-drift`
- **Predecessor ledgers:** `klappy://odd/ledger/2026-04-20-p1-3-1-challenge-canary-landed`, `klappy://odd/ledger/2026-04-20-p1-3-2-gate-canary-landed`, `klappy://odd/ledger/2026-04-20-p1-3-3-challenge-canon-parity-landed`
- **Validator sessions:** Sonnet 4.6 feat-validator (`agent_011CaF5vo8B5UpqtfZAmSeui`, `sesn_011CaF5vqjgzN7Mw8s84qvK9`), Sonnet 4.6 promotion-validator (`agent_011CaF9tvJgRXQ6F96MtN4iu`, `sesn_011CaF9tx18Af3z1Fy9trwz8`). Validator reports archived inside validator sessions at `/home/user/ledger/p1-3-4-validator-findings.md` and `/home/user/ledger/p1-3-4-promotion-validator-findings.md`
- **Bugbot reviews:** `259170a` cursor[bot] 2026-04-20T12:55:03Z (HIGH-SEV), `113ba11` cursor[bot] 2026-04-20T13:09:48Z (LOW-SEV); both fix-forwarded in PR #126
- **Encoded artifact:** `/home/claude/work/encodes/p1-3-4-closeout.md` (explicit persistence of `oddkit_encode` output)
- **Parallel main-track PRs that produced the 0.22.0 version collision:** klappy/oddkit#124 (telemetry_public envelope), #125 (catalog generated_at), #128 (release 0.22.0 backfill), #129 (promote 0.22.0 to prod, merged 13:46Z)
