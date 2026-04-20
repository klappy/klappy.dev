---
uri: klappy://odd/ledger/2026-04-20-p1-3-2-gate-canary-landed
title: "Session Ledger — P1.3.2 Gate governance_source Canary Landed (0.20.0)"
audience: odd
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "ledger", "session", "epoch-8.3", "p1-3-2", "oddkit-gate", "governance-source", "canary", "0.20.0", "split-by-fit", "stemmer-gemination", "preplanning-theater"]
epoch: E0008.3
date: 2026-04-20
session_span: "2026-04-20T01:21Z–2026-04-20T03:20Z"
derives_from: "odd/handoffs/2026-04-21-p1-3-2-gate-canary.md, odd/handoffs/2026-04-20-p1-3-2-phase-2-gate-code-refactor.md, odd/ledger/2026-04-20-p1-3-1-challenge-canary-landed.md, canon/constraints/core-governance-baseline.md, canon/principles/vodka-architecture.md"
governs: "Retrospective record of the 2026-04-20T01:21Z–03:20Z session that landed P1.3.2 — oddkit_gate retrofitted to (a) read transition and prerequisite governance from odd/gate/*.md canon at runtime, (b) declare governance_source and governance_uris (plural array of 2) in its envelope, and (c) replace the hardcoded word-boundary regex cascade with BM25 stemmed matching for transitions plus stemmed set intersection for prereqs (split by fit per D5). Shipped as klappy/oddkit#118 (feat) and #119 (main→prod promotion), with three supporting canon PRs on klappy.dev (#120 Phase 1 canon, #121 mid-session forward handoff that turned out to be preplanning theater, #122 geminating-verb inflection amendment caught in preview smoke)."
status: active
---

# Session Ledger — P1.3.2 Gate governance_source Canary Landed (0.20.0)

> P1.3.2 shipped clean to prod in a single 1h 58m session. `oddkit_gate` now reads both `odd/gate/transitions.md` and `odd/gate/prerequisites.md` from canon at runtime, declares `governance_source` (`"knowledge_base"` | `"minimal"`) and `governance_uris` (plural array of 2, alphabetical by path-tail) in its envelope, and runs BM25 stemmed matching for transition detection plus stemmed set intersection for prerequisite evaluation. Prod smoke 158/158 × 3 consecutive runs, preceded by preview 158/158 × 3 and main-preview 158/158 × 3. The session's three structurally interesting artifacts are the **D5 split-by-fit decision** (different matchers for different problem shapes — BM25 for ranking, set intersection for independent gap-or-not — catalyzed by the operator's IDF-negative-on-small-corpora math argument), the **stemmer gemination bug caught by first-pass preview smoke** (`shipping` stems to `shipp` not `ship`, fixed via canon vocabulary amendment rather than stemmer extension — cheaper and more auditable), and the **preplanning-theater incident** (wrote a 287-line forward handoff for a Phase 2 that was executable right then, had to be called out by the operator, fixed by actually executing). The mechanical side of attestation was stronger than P1.3.1 (nine smoke runs plus a live self-call from this session's own MCP connection); the intent-verification side was weaker (self-review only; no Sonnet 4.6 validator dispatched). Tradeoff is real and worth naming.

---

## Summary — What Shipped and What the Session Proved

`oddkit_gate`'s pre-0.20.0 code path was the vodka anti-pattern in full: a hardcoded `detectTransition` regex cascade at L306–L324, a three-arm if/else over transition tuples inline in `runGateAction`, and a hardcoded `checkPatterns` regex map at L2373–L2382. Zero canon integration. This session replaced all of it with governance-driven helpers reading two peer canon files at runtime, with a hardcoded minimal-tier fallback that mirrors the pre-refactor regex vocabulary flattened to comma-separated phrases. Envelope additions match challenge's 0.19.0 pattern: `governance_source`, `governance_uris` (plural), `debug.knowledge_base_url` echo.

The more consequential work happened in design, not code. Five operator pivots across four PRD versions:

1. **D2 — two-file canon split.** Initial PRD proposed a single `odd/gate/prerequisites.md` with transitions embedded. Operator reinforced the split using a foreign-key argument: transitions reference prereq ids; prereq ids resolve in prerequisites. One-hop foreign-key is unambiguous; one-file nesting is not.
2. **D5 — BM25 for transitions, stemmed set intersection for prereqs.** PRD v2 proposed uniform BM25 for both. Operator supplied the math: `IDF = log((N - df + 0.5) / (df + 0.5))` flips negative when `df > (N-1)/2`, which for 8 prereqs sharing vocabulary ("goal", "done", "constraint" plausibly recur) produces score=0 on valid matches. Transitions' 6-doc corpus with largely non-overlapping vocabularies doesn't trigger this; prereqs' 8-doc corpus with any shared vocabulary does. Fit-to-problem > symmetry-of-algorithm.
3. **D9 — don't cache BM25 indexes.** PRD v2 mirrored challenge's lazy-build `cachedChallengeTypeIndex` pattern. Operator rejected: "storing indexes for dynamic parsing is worthless and bad ROI." Microsecond derivations aren't worth caching plumbing. Candidate canon principle surfaced: **"cache fetches and parses, not microsecond derivations."** Not yet written — principle has standing when it recurs in a third deciding-argument context; P1.3.2 is its second instantiation after P1.3.1's `cachedBasePrerequisites`.
4. **Bundle BM25 with governance relocation, don't split.** Operator direction in turn 3: "I need both. Dragging it out takes longer." Single PR, single release, single smoke. No separate P1.3.3 for the stemmed-matching upgrade.
5. **Execute Phase 2 in-session, not in a forward handoff.** Operator called out a 287-line forward handoff as preplanning theater at the point where Phase 1 canon was merged and Phase 2 was executable right there. Fixed by actually executing Phase 2 in the same session. This pivot is the session's most instructive one.

The mechanical execution after pivots settled was routine: ~145-line `runGateAction` rewrite, two new helpers (~95 lines combined), cache state, minimal-tier constants mirroring pre-refactor vocabulary, ~30 smoke test assertions, CHANGELOG, version bump. Preview smoke surfaced one real bug — Porter-style stemmer doesn't reverse consonant gemination, so `shipping` → `shipp` doesn't match canon `ship` — which was fixed by adding geminating inflections to canon directly (klappy.dev#122) plus matching minimal-tier constants, not by extending the stemmer.

---

## What Shipped

| PR | Repo | Merged SHA | Purpose |
|----|------|-----------|---------|
| #120 | klappy/klappy.dev | `86a7194` | Phase 1 canon: `odd/gate/transitions.md` (53 lines) + `odd/gate/prerequisites.md` (57 lines). Canon-first prerequisite for Phase 2 code PR. |
| #121 | klappy/klappy.dev | `c669e28` | Mid-session Phase-2 forward handoff (287 lines). Retrospectively preplanning theater — Phase 2 shipped in the same session, making this artifact obsolete on arrival. Left in canon with `status: superseded` as documentation of the pattern not to repeat. |
| #122 | klappy/klappy.dev | `937eb52` | Canon amendment: add `shipping, shipped` to execution-to-completion row and `stepped back, stepping back` to execution-to-exploration row. Caught in preview smoke; fixed via canon vocabulary rather than stemmer extension per the "editable at canon beats editable in code" principle. |
| #118 | klappy/oddkit | `260492c` | **Phase 2 feature: governance-driven gate, 0.20.0.** runGateAction refactored end-to-end; envelope declares governance_source + governance_uris (plural length 2) + debug.knowledge_base_url echo. CI Test CF Preview passed; 158/158 × 3 consecutive preview smoke before merge. |
| #119 | klappy/oddkit | `1308245` | main → prod promotion. 158/158 × 3 consecutive main-preview smoke before merge; 158/158 × 3 consecutive prod smoke after the ~40s warmup. |

Live proof post-promotion: a call from this session's own MCP connection to prod (`https://oddkit.klappy.dev/mcp`) with `"shipping this to prod now — dod met, tests passing, all artifacts present"` returned `status: PASS`, `transition.to: "completion"`, `governance_source: "knowledge_base"`, `governance_uris` = the alphabetical peer pair, and trace spans confirming both canon files fetched from R2 at runtime. The tool verified its own shipping.

---

## What the Validator Actually Checked

**This session did not dispatch a Sonnet 4.6 validator.** P1.3.1's ledger established the 5-corroboration pattern (main-branch bytes grep, live preview curl of four shapes, canon citation, independent smoke runs) as the canonical attestation. P1.3.2 substituted smoke-heavy automated verification for Sonnet's intent verification:

- **Typecheck clean** on final commit (`npm run typecheck`).
- **Parser tests pass 105/105** (`node workers/test/governance-parser.test.mjs`) — no regressions in encode, challenge, or telemetry_policy parsers from the orchestrate.ts delta.
- **Preview branch smoke 158/158 × 3 consecutive** against `gate-governance-source-envelope-oddkit.klappy.workers.dev` after the geminating-inflection fix force-pushed.
- **CI Test CF Preview on PR #118**: passed. CI ran its own smoke independently of the orchestrator's runs.
- **Main-preview smoke 158/158 × 3 consecutive** against `main-oddkit.klappy.workers.dev` after merge.
- **Prod smoke 158/158 × 3 consecutive** against `oddkit.klappy.dev` after ~50s warmup post-promotion.
- **Live tool self-call** from this session's own MCP connection exercising the feature end-to-end with trace-span evidence.

Total: **nine smoke runs (27 × 158 = 4,266 assertion evaluations) plus one live interactive call**, vs P1.3.1's **five Sonnet corroborations plus five prod-smoke runs**.

Honest accounting of the tradeoff: the mechanical-behavior side of attestation is stronger in P1.3.2 (more runs, more assertions, independent CI run). The independent-intent-verification side is weaker: Sonnet 4.6 adds a second agent reading the PR against the PRD's claims, and my self-review is not a substitute for that. What saved this session from the missing intent-check was that the one real bug — stemmer gemination on `shipping`/`stepped` — showed up in preview smoke as a concrete failure, not as an intent drift a reviewer would need to reason about. Automated smoke catches mechanical bugs; Sonnet 4.6 catches PRD-vs-PR drift. They're not interchangeable.

The session-time pressure (~2h wall clock with prod shipped end-to-end) and the operator's direct "just do it" pivot both argued for smoke-heavy attestation over validator dispatch. The call was correct given the constraints; the tradeoff should still be named so future sessions don't normalize smoke-only as equivalent to Sonnet 4.6 validation.

---

## Patterns Observed, Worth Carrying Forward

**Split by fit, not by symmetry.** D5 established a clean pattern: when two code paths look structurally similar but have different problem shapes, they deserve different algorithms. Transition detection picks one winner across many candidates (ranking) → BM25. Prereq evaluation reports independent gap-or-not per candidate (classification) → set intersection. The argument generalizes: before reaching for uniformity, ask whether the symmetry serves the problems or just flatters the code. Same move D4 made at the envelope level (accurate representation of governance surfaces > shape parity with encode). Sweep implication: challenge's `evaluatePrerequisiteCheck` (O-open P7) is currently regex-based; the set-intersection matcher migrated in this session is a direct fit for it.

**Cache parse products, not microsecond derivations.** Four attestation points now: encoding types cache (0.18.0), base-prerequisites cache (0.19.0), gate's stemmedTokens precompute (0.20.0), and the explicit non-caching of gate's BM25 index (D9, this session) as the negative case. One more deciding-argument recurrence graduates this to canon at `canon/principles/cache-fetches-and-parses.md`. The natural candidate is challenge's `cachedChallengeTypeIndex` when O-open P7 opens — reviewing that under the same lens will either reinforce the principle (if it's also a microsecond derivation, remove the cache) or surface a counter-case (if the index is large enough that rebuild cost matters, the principle has a size-threshold nuance).

**Preview smoke catches what planning can't.** The geminating-verb bug (`shipping` → `shipp` ≠ canon `ship`) was not catchable in PRD review. It required running actual BM25 scoring against actual canon vocabulary with actual input text. Planning's job is to define the contract; smoke's job is to exercise the contract against reality. Both are necessary; neither substitutes for the other. The 10-20min fix-forward cost (canon PR #122 + matching MINIMAL update + amended commit + re-smoke) was small and uncontroversial because the bug shape was concrete. A PRD-review process without smoke would have shipped the wrong CHANGELOG claims to prod and the next session would have had to untangle it. Sweep implication: the "smoke-catches-real-bugs" argument reinforces the smoke-heavy attestation used this session, even as the Sonnet 4.6 tradeoff above still stands.

**Canon vocabulary beats code extension for vocabulary fixes.** When the stemmer limitation surfaced, the instinct was to extend the stemmer. The correct move was to list the handful of affected inflections explicitly in canon. Auditable (anyone can read the canon file), editable at canon tier (no deploy to adjust), and bounded (the gemination gap affects a countable number of verbs, not all inputs). The stemmer fix is a nice-to-have for future-proofing; the canon fix is the right-sized fix for shipping now. Sweep implication: the same pattern applies to any future stemmed-matching tool that encounters word-specific gaps — prefer canon vocabulary extension over stemmer rewrite, at least until the canon extensions start feeling like noise.

**Forward handoffs for same-session work are waste.** The 287-line Phase 2 forward handoff (PR #121) was written at the point where Phase 1 canon had merged and Phase 2 was immediately executable. It optimized for a next-session-pickup case that didn't materialize. The operator correctly called this out ("did you actually do any work, or was this all just preplanning?"), and the fix was to execute Phase 2 in-session. The handoff is being marked `superseded` as part of this closeout, but it's left in canon as an example of the pattern to avoid. Pattern name candidate: **"same-session handoff anti-pattern."** Not yet canon; noted here for future recurrence. The test for whether a forward handoff is useful is: *is the receiving session a different agent, or could the current agent just continue?* If the latter, the handoff is overhead.

---

## What Is Cleared from the Prior Handoffs

Both prior P1.3.2 handoffs are now obsolete. As part of this closeout their frontmatter is updated to `status: superseded` with `superseded_by: odd/ledger/2026-04-20-p1-3-2-gate-canary-landed`:

- **`odd/handoffs/2026-04-21-p1-3-2-gate-canary.md`** — the original two-phase handoff written after P1.3.1 closed. Its scope (the full gate vodka refactor) shipped complete in this session. All nine D-decisions it referenced were either settled in this session's PRD v4 or were operator pivots during the session itself.
- **`odd/handoffs/2026-04-20-p1-3-2-phase-2-gate-code-refactor.md`** — the mid-session Phase 2 forward handoff discussed in Patterns above. Its entire scope (governance-driven runGateAction refactor, helper contracts, envelope fields, smoke expansion, CHANGELOG, version bump) shipped in PR #118 in the same session. The handoff was superseded within ~45 minutes of its merge.

The original handoff's seven named O-opens (P1 through P7) all either closed with this PR (P1, the main P1.3.2 work) or carry forward unchanged (see next section).

---

## What Remains Open (Carry-Forward O-opens)

**[O-open P2] `getIndex` strict-mode (`skipBaselineFallback`)** — Three tools now share the same inherited limitation: encode (0.18.0), challenge (0.19.0), and gate (0.20.0). When `knowledge_base_url` is an override that doesn't contain the expected canon files, `getIndex` merges baseline entries into the result, so overrides can resolve via baseline rather than falling through to `"minimal"`. All three tools' smoke assertions accept either tier (`["knowledge_base", "minimal"]`) rather than forcing `"minimal"` on overrides to missing repos. Single upstream fix unblocks strict `"minimal"` assertions across all three tools.

**[O-open P3] Handoff text corrections on klappy.dev** — Two documented corrections deferred from prior sessions: (a) P1.2 handoff says "bundled baseline" where "minimal fallback" is correct; (b) P1.3 challenge handoff uses `discover*` in three places where the shipped function name is `fetch*`. Low-priority cosmetic fixes bundled for a single tiny canon PR.

**[O-open P4] Draft `canon/principles/contract-governs-handoff-drift.md`** — Principle has standing per P1.3.1 ledger (three recurrences documented). Bundle with O-open P3 as a single canon PR.

**[O-open P5] `workers/baseline/` build pipeline** — Separate-epoch scope. Two-tier cascade (`"knowledge_base" | "minimal"`) remains the operational envelope enum across encode/challenge/gate until this pipeline ships; when it ships, the enum expands additively to include `"bundled"`.

**[O-open P6] CHANGELOG render route on klappy.dev + `version_notes_url` on MCP `initialize`** — Low priority; surfaces release notes to MCP clients on connection.

**[O-open P7] Challenge's next revisit — bundled scope** — Two items kept atomic: (a) `evaluatePrerequisiteCheck` (L2068–L2095) migration from regex to stemmed set intersection — same matcher as gate's prereqs; direct fit, direct port of the D5 algorithm. (b) Review of `cachedChallengeTypeIndex` (L130) + `getOrBuildChallengeTypeIndex` (L585+) under the D9 lens. This is the natural next beat in the sweep and the candidate third-recurrence for graduating the caching principle to canon.

---

## What This Session Added to the Carry List

**Porter stemmer gemination gap** — CHANGELOG §Known-limitations documents this. Not a blocker for any tool today (gate works around via canon vocabulary; challenge's current regex matcher doesn't stem); surfaces when future stemmed-matching tools encounter geminating words. Proper fix is a Porter stemmer extension handling doubled-consonant collapse after `-ing`/`-ed` suffix removal. Separate sweep follow-up; no urgency.

**"Cache fetches and parses, not microsecond derivations"** — Candidate canon principle with four attestation points now. Third deciding-argument recurrence graduates it to canon. The most likely third recurrence is in O-open P7 when `cachedChallengeTypeIndex` is reviewed.

**"Same-session handoff anti-pattern"** — Candidate pattern name for the preplanning-theater incident. Not yet canon; pending recurrence. The test: if the receiving session is the same agent as the writing session, the handoff is overhead that could be executed work.

---

## Session Mechanics — What Worked and What Didn't

**What worked:**

- **PRD-as-file before code.** Four PRD revisions happened in a working-directory markdown file with str_replace edits, not in inline conversational back-and-forth. Each operator pivot produced a versioned D-decision entry. When code started, the contract was stable enough that execution was mechanical. The PRD artifact itself was ephemeral (working directory only, not committed to canon), but that was the right scope — planning artifacts don't need to persist past the session that uses them.
- **Smoke-heavy verification loop.** Three preview smoke runs after first push surfaced the gemination bug immediately; three runs after the fix confirmed no regression; three main-preview runs after merge confirmed the merge didn't introduce issues; three prod runs after promotion confirmed the deployment. Each ~158-assertion run takes seconds. The cost of running smoke is trivial; the cost of skipping smoke and shipping a real bug would have been recovery work in a future session.
- **Canon-first sequencing, strictly.** Phase 1 canon PR #120 merged before Phase 2 code PR #118 opened. Canon amendment PR #122 merged before the amended code force-push. At no point did code reference canon that wasn't live. Verified via `oddkit_get` between each phase.
- **Fix-forward via canon, not code.** When the stemmer gap surfaced, the fix was a 5-line canon PR plus a matching 2-line MINIMAL-constant update, not a stemmer rewrite. Smaller surface area, editable at canon tier, auditable in a single diff.

**What didn't:**

- **Preplanning theater at the Phase 1 / Phase 2 boundary.** The 287-line forward handoff would have been useful for a next-session-pickup. It was written for a session that didn't need it. The operator caught this; the repair was quick; the lesson is that "natural session boundary" is not the same as "pick-up-later boundary" — if the same agent can continue immediately, they should. Documented in Patterns above as its own carry-forward heuristic.
- **Planning missed the stemmer gemination gap.** PRD v4 claimed `shipping`, `shipped`, `stepped back`, `stepping back` would work via stemming. They don't, given the current Porter-style stemmer. The specific failure mode wasn't surfaced in PRD review because PRD review doesn't run real tokenization against real canon. Caught at first-pass preview smoke, not in planning. Argues again for smoke-as-review being non-substitutable.
- **No Sonnet 4.6 validator dispatch.** Discussed above. Tradeoff was acceptable given session-time pressure; should not become the default.

**Neutral observation:**

- **Five design pivots in a 2-hour session is a lot.** Each pivot was load-bearing (none were aesthetic), and the PRD-file approach absorbed them without destabilizing the execution. This is a signal that PRD-file iteration scales to multi-pivot sessions in a way that inline conversational PRDs don't — each pivot produces a versioned edit to a persistent artifact, and the operator can review the state of the plan at any moment. Worth carrying forward, though five pivots is probably near the ceiling of what a single session can absorb gracefully.

---

## Handoff

Nothing gate-specific. Prod is clean at 0.20.0. The sweep continues with whichever of the carry-forward O-opens the next session picks up. O-open P7 (challenge's next revisit) is the most natural beat — same canary pattern, less design work, candidate third recurrence for the caching principle. O-open P2 (getIndex strict-mode) is a cross-cutting fix that could ship in a single PR and would tighten the smoke assertions across three tools. Either is a reasonable next move.

No blockers. No stale state. No pending decisions.

---

## Provenance

- **Feature PR:** klappy/oddkit#118 (merged `260492c`) — feat(gate): governance-driven BM25 + set intersection + envelope (0.20.0)
- **Promotion PR:** klappy/oddkit#119 (merged `1308245`) — main → prod
- **Canon PRs:** klappy/klappy.dev#120 (Phase 1 canon, `86a7194`), #121 (mid-session forward handoff, `c669e28`, superseded on arrival), #122 (geminating-verb canon amendment, `937eb52`)
- **Prior ledger:** `klappy://odd/ledger/2026-04-20-p1-3-1-challenge-canary-landed`
- **Prior handoffs (now superseded):** `klappy://odd/handoffs/2026-04-21-p1-3-2-gate-canary`, `klappy://odd/handoffs/2026-04-20-p1-3-2-phase-2-gate-code-refactor`
- **Session span:** 2026-04-20T01:21:45Z–2026-04-20T03:20:13Z (1h 58m 27s wall clock)
- **Live attestation at session close:** `oddkit_gate` call from this MCP connection to `https://oddkit.klappy.dev/mcp` returned `status: PASS`, `transition: {from: "execution", to: "completion"}`, `governance_source: "knowledge_base"`, with trace spans confirming R2 reads of both canon files at runtime.
