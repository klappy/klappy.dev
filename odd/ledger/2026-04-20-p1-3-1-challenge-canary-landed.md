---
uri: klappy://odd/ledger/2026-04-20-p1-3-1-challenge-canary-landed
title: "Session Ledger — P1.3.1 Challenge governance_source Canary Landed (0.19.0)"
audience: odd
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "ledger", "session", "epoch-8.3", "p1-3-1", "oddkit-challenge", "governance-source", "canary", "0.19.0", "sonnet-validator"]
epoch: E0008.3
date: 2026-04-20
session_span: "2026-04-19T21:21Z–2026-04-20T00:59Z"
derives_from: "odd/handoffs/2026-04-20-p1-3-challenge-canary.md, odd/ledger/2026-04-19-p1-2-encode-dolcheo-landed.md, canon/constraints/core-governance-baseline.md, canon/principles/agent-self-report-under-stress.md"
governs: "Retrospective record of the 2026-04-19T21:21Z–2026-04-20T00:59Z session that landed P1.3.1 — oddkit_challenge retrofitted to declare governance_source and governance_uris (plural peer array) in its envelope. Shipped as klappy/oddkit#116 (feat) and #117 (main→prod promotion). First canary in the post-encode sweep to apply the contract-grounded, code-first discipline the P1.2 ledger called for."
status: active
---

# Session Ledger — P1.3.1 Challenge governance_source Canary Landed (0.19.0)

> P1.3.1 shipped clean to prod. `oddkit_challenge` now declares `governance_source` (`"knowledge_base"` | `"minimal"`) and `governance_uris` (plural array of four peer canon URIs, alphabetical by path-tail) on both return paths (`SUPPRESSED` and `CHALLENGED`), and echoes `debug.knowledge_base_url` on overrides. Four governance helpers return `{<domainNoun>, source}` tuples; `runChallengeAction` aggregates strictly. Sonnet 4.6 validator VERIFIED 5/5 with external corroboration — zero blockers, zero advisories, a rare clean pass that signals the PRD-first discipline front-loaded the review. Prod smoke 126/126 × 5 consecutive runs. The session's more interesting artifact is the D4 decision pivot: the PRD initially proposed single-string `governance_uri` for shape parity with encode; the operator pushed back that challenge's four governance files are peers with no hierarchy, and a single anchor would misrepresent where the other three live. Accurate representation outranks envelope-shape parity.

---

## Summary — What Shipped and What the Session Proved

P1.3.1 delivered the challenge canary completion described in the prior session's handoff: envelope contract compliance (`governance_source`), four peer canon URIs (`governance_uris`), and `debug.knowledge_base_url` echo. Two PRs on klappy/oddkit — #116 (squash-merged at `71ee6ed`), #117 (main→prod merge at `1b4fce8`). Prod at 0.19.0 (`https://oddkit.klappy.dev/health` confirmed). Smoke 126/126 × 5 consecutive on prod after 40s CF warmup; main-preview required two isolate-warmup flakes before settling (the pattern the P1.2 handoff named).

Three patterns deserve naming — each one a test of whether the P1.2 ledger's hard-won lessons actually propagate.

**Code-first discipline caught two handoff errors on first pass.** The P1.3 handoff described four discovery helpers all named `discover*` (recency-as-authority: pattern-matching encode's `discoverEncodingTypes` onto challenge). Direct grep of `workers/src/orchestrate.ts@290dde5` showed only one was `discover*`; the other three are `fetch*`. The PRD called this out in §3.1 and committed to preserving the names (minimizing diff, zero behavioral impact). Second catch: the handoff framed the `bundled` tier as contract aspiration but didn't explicitly note that `workers/baseline/` does not exist in the repo at all. `ls workers/baseline/` returned "NO BASELINE DIR". The two-tier cascade (`knowledge_base` | `minimal`) isn't a classification-specific call for challenge — it's the current reality for every knowledge-base-driven tool. The PRD named this in §3.2 and the risk register called out that the validator would need to see this explicitly, which is exactly what it did when corroborating against `core-governance-baseline`.

**Operator pivot on D4 was load-bearing.** The PRD's first draft proposed `governance_uri: "klappy://odd/challenge/stakes-calibration"` — single string, parity with encode's shape. The operator flagged this: challenge reads four peer governance files (`base-prerequisites`, `challenge-types/`, `normative-vocabulary`, `stakes-calibration`) and `stakes-calibration` doesn't govern or represent the other three. A single anchor pointing at it would mislead callers about where the vocabulary and prerequisite contracts live. Alternative: `governance_uris: [array of four]`, alphabetical. Shape divergence from encode is accepted because the underlying governance reality diverges. The PRD §7 envelope-after diagram was updated, D6 CHANGELOG language specifically named the divergence for consumers reading both tools, and the smoke test asserts `governance_uri` (singular) is NOT emitted on challenge. This decision was the most consequential of the session; every other decision fell in line.

**Validator external-corroboration pattern worked end-to-end.** Per `canon/principles/agent-self-report-under-stress`, terminal self-reports are not authoritative. The validator task explicitly required five external corroborations: main-branch bytes grep (pre-refactor state), live curl ×3 shapes (default, override, voice-dump SUPPRESSED), `oddkit_get` citation on `core-governance-baseline`, all 9 modes curl, and 3× independent smoke runs. Sonnet 4.6 pulled each piece independently — including cloning the repo itself to run the smoke test from its own session, not trusting the orchestrator's preview-smoke output. Disposition VERIFIED 5/5 with zero advisories. Zero advisories is unusual and worth marking — the PRD-first discipline (writing the plan as a file before touching code) appears to front-load the kind of review findings that would otherwise surface at validation time.

---

## What Shipped

| PR | Repo | Merged SHA | Purpose |
|----|------|-----------|---------|
| #116 | klappy/oddkit | `71ee6ed` | **feat(challenge):** governance_source envelope + peer governance_uris (0.19.0). Squash-merged. |
| #117 | klappy/oddkit | `1b4fce8` | main → prod promotion for 0.19.0. Merge commit. |

**Production state:** `https://oddkit.klappy.dev/health` returns `{"version":"0.19.0"}`. Smoke 126/126 × 5 consecutive on prod.

**Validator record:** `agent_011CaE62pg6jJ7yYpRj1o9Do` / `sesn_011CaE63LZhPUX1UAZPbiV7n`. Disposition: **VERIFIED**, 5/5, zero blockers, zero non-blocking advisories.

**Feature delta (files changed):** 6 files, +222 / -19 lines in the feat commit.

- `workers/src/orchestrate.ts` — four helpers retrofitted to `{<domainNoun>, source}` tuples (`discoverChallengeTypes`→`{types, source}`, `fetchBasePrerequisites`→`{prerequisites, source}`, `fetchNormativeVocabulary`→`{vocabulary, source}`, `fetchStakesCalibration`→`{calibration, source}`); `runChallengeAction` aggregates strictly and adds envelope fields on both SUPPRESSED and CHALLENGED paths; `cleanup_storage` extended to reset the three new `cachedXSource` fields
- `workers/src/index.ts` — `oddkit_challenge` tool description updated to name the four governance surfaces and the two-tier envelope signal
- `workers/test/canon-tool-envelope.smoke.mjs` — 47 new assertions: envelope shape on both paths, `governance_uris` array of exactly 4 with expected alphabetical ordering, `governance_uri` singular asserted absent, `knowledge_base_url` override behavior, 9-mode parse integrity loop (`voice-dump` asserts SUPPRESSED; others assert CHALLENGED)
- `CHANGELOG.md` — `[0.19.0]` entry with Added / Changed / Fixed / Known-limitations; divergence-from-encode called out explicitly in the governance_uris Added bullet
- `package.json` + `workers/package.json` — synced to `0.19.0` (pre-commit hook enforced)

---

## What the Validator Actually Checked

The five corroborations are worth enumerating because the pattern should be the default for subsequent canaries in the sweep.

1. **Main-branch bytes grep.** Validator cloned `klappy/oddkit`, checked out main, grepped `workers/src/orchestrate.ts` for `governance_source` references inside `runChallengeAction`. Confirmed zero hits — pre-refactor state matches the PR's "before" claim. The one match at line 2262 of main is inside `runEncodeAction` (P1.2), which the validator correctly disambiguated.
2. **Live preview curl, three shapes.** Default KB planning mode → `governance_source: "knowledge_base"`, `governance_uris` length 4, `governance_uri` undefined. Override to `torvalds/linux` → `debug.knowledge_base_url` echoed, `governance_source` within enum. Voice-dump mode → `status: "SUPPRESSED"` with governance fields still present on the early-return envelope (the PRD §10 risk register flagged this branch specifically; validator confirmed it landed).
3. **Canon citation on `core-governance-baseline`.** Validator used `oddkit_get` to fetch `§Runtime Invariants` and confirmed the three-tier enum is documented, plus fetched the `§What-Ships-in-Baseline` section to confirm `odd/challenge/stakes-calibration.md` is listed as required-in-baseline. Two-tier cascade today is coherent with the contract given `workers/baseline/` is not shipped.
4. **Nine-mode curl.** Validator iterated all nine modes from `odd/challenge/stakes-calibration` against the preview URL. Each returned a full envelope with valid `governance_source` and `governance_uris` length 4. `voice-dump` returned SUPPRESSED; the other eight returned CHALLENGED. PR #100 regression guard is live.
5. **Independent smoke runs.** Validator cloned its own copy of the branch and ran the smoke test three consecutive times against the preview URL — not trusting the orchestrator's own smoke output. 126/126 each run.

The disposition block: `VERIFIED / 5/5 / [] blockers / [] advisories`.

---

## Patterns Observed, Worth Carrying Forward

**"PRD as a file before touching source" is a review-cost reducer.** P1.2 landed with 3 non-blocking advisories. P1.3.1 landed with zero. The difference this session was the PRD: 296 lines including 8 explicit decisions (D1–D8) each with alternatives named, a risk register covering the SUPPRESSED early-return gotcha before the first line of code was written, and a §8 validator dispatch protocol naming five corroborations that the validator then faithfully executed. The hypothesis: review findings tend to come from (a) decisions the author didn't realize were decisions, and (b) edge cases the author didn't think about. Writing the PRD surfaces both before code, turning would-be review findings into planning-time clarifications.

**Operator pivot on a design decision is more productive than operator approval of all decisions.** D4 was the only pivot of eight decisions. The PRD's first-draft case for single-string was internally coherent — but the operator caught that it was optimizing for the wrong thing (envelope parity over accurate representation of governance reality). The change took one message, one PRD edit, and zero downstream rework. If the operator had approved D4 as drafted, the validator corroboration on the governance_uri field would have surfaced the same question at validation time, which is 10× more expensive to fix. The session confirms: review pivots during planning are the cheapest kind. "7 of 8 approved, D4 reconsider" is a high-value approval shape.

**Isolate-warmup pattern is real across tiers.** The P1.2 handoff established "3 consecutive clean as prod-ready gate" because CF isolates can serve mixed versions immediately after deploy. This session reproduced the pattern precisely on main-preview: two flakes, then three clean, then two more clean for confidence. Prod took 40s of warmup wait and then five clean in a row. The operational rule generalizes: trust the third-consecutive-clean, not the first.

**Handoff errors are structural, not exceptional.** The P1.2 ledger named recency-as-authority (three recurrences) and proposed a candidate canon principle on contract-governs-handoff-drift, pending one more recurrence before canonization. This session is that recurrence. The P1.3 handoff's claim of four `discover*` helpers was recency-as-authority in the forward-pointing doc itself — the author pattern-matched from the encode helper (`discoverEncodingTypes`) onto the challenge helpers without verifying against code. The fix worked: code-first discipline caught it in the PRD's §3.1 before any edits. Third instance confirmed; the canon principle now has standing.

---

## What Is Cleared from the Prior Handoff

- **[O-open P1]** P1.3.1 challenge `governance_source` retrofit — closed by #116/#117.

## What Remains Open (Carry-Forward O-opens)

- **[O-open P1]** **P1.3.2 — next tool in sweep.** Candidates: `gate`, `preflight`, `validate`, `orient`, `search`, `catalog`, `cleanup`, `version`. Priority to be decided in the next session's handoff. Audit doc at `docs/oddkit/audit/governance-anti-pattern-sweep-2026-04-17.md` has the ranking.
- **[O-open P2]** **`getIndex` strict-mode (`skipBaselineFallback`).** Inherited from encode 0.18.0; now affects challenge 0.19.0 as well. Same limitation, one fix — natural to pull into a later P1.3.x PR when a tool exercises the code path non-trivially, or as a standalone PR if the sweep doesn't naturally touch it.
- **[O-open P3]** **Handoff text corrections on klappy.dev.** Two corrections deferred from this session: (a) P1.2 handoff `klappy://odd/handoffs/2026-04-20-p1-2-encode-canary` rename "bundled baseline" → "minimal fallback" to align with the contract's enum; (b) P1.3 handoff `klappy://odd/handoffs/2026-04-20-p1-3-challenge-canary` rename the three `discover*` → `fetch*` for `fetchBasePrerequisites` / `fetchNormativeVocabulary` / `fetchStakesCalibration`. Low priority, archival; bundle both into a single tiny canon PR.
- **[O-open P4]** **Canon principle on contract-governs-handoff-drift.** P1.2 ledger called for one more recurrence before writing the principle. This session is recurrence #3 (P1.3 handoff's `discover*` naming error). The principle has standing. Draft location: `canon/principles/contract-governs-handoff-drift.md`. Core claim: "when a handoff's word choice disagrees with a governing contract's enum or a live code reality, the contract/code wins — the handoff is a bridging artifact, not a source of truth." Draft in a small canon PR when the next session opens a klappy.dev PR for any reason.
- **[O-open P5]** **`workers/baseline/` bundled-tier build pipeline.** The contract `§Build-Time-Invariants` describes the regeneration process (fetch canon at pinned SHA, extract required-baseline files, schema-check against canon, fail build on divergence). Nothing in the repo implements this today. Separate epoch's work — not a single-session unit. First step would be writing the MANIFEST.json and the regeneration script; second step would be the schema check; third step would be a `oddkit_baseline_check` probe. Deferred until the sweep surfaces concrete need or TruthKit's TruthKit-specific baseline needs force the question.
- **[O-open P6]** **CHANGELOG render route on klappy.dev + `version_notes_url` on MCP `initialize`.** Low priority, unchanged from prior handoffs. Slot into a tool-envelope PR window.

## What This Session Added to the Carry List

None beyond the above — the session stayed in scope. No new scope-creep O-opens.

---

## Canon Principle Now Standing: contract-governs-handoff-drift

Three recurrences justify the principle. Named explicitly:

> **When a handoff's word choice or described state disagrees with a governing contract's enum or the target code's live reality, the contract and code win. The handoff is a bridging artifact — useful for session continuity, but not authoritative over the governing documents or the repo state. The fix is always the same: before acting on a handoff's framing, grep the target code and re-fetch the governing contract. Recency is not authority.**

Three recurrences this principle addresses:
1. P1.2 session: handoff described three-tier cascade; contract's enum for encoding-types is two-tier (`knowledge_base` | `minimal`). Word collision, not design conflict.
2. P1.2 session: handoff's scope framing treated "bundled DOLCHEO minimum" as a tier name; contract calls that case `"minimal"`. Same pattern at scope-framing level.
3. P1.3.1 session (this one): handoff described four `discover*` helpers; code has one `discover*` and three `fetch*`. Pattern-matched from encode without verifying.

The principle should be drafted in the next klappy.dev PR (natural to bundle with the handoff text corrections in O-open P3). The candidate doc already has three attestation cases in the ledger — a stronger grounding than most canon principles get at draft time.

---

## Session Mechanics — What Worked and What Didn't

**What worked:**
- **PRD as a file before code.** 296 lines of planning produced an execution path the validator could corroborate exactly, zero advisories.
- **Time discipline via `oddkit_time` first each turn** with `server_time` reference. The session's elapsed-time claims in final reporting (3h 25m total wall clock) are observed, not inferred.
- **Two explicit gates (exploration→planning, planning→execution)** named the mode transitions out loud, even though the session started mid-plan. Cheap tool call; binds the scope lock that follows.
- **Strict aggregation rule (any helper minimal → aggregate minimal)** matched encode's single-helper precedent trivially and has no edge cases.
- **Per-helper domain-noun tuples** (`{types, source}`, `{prerequisites, source}`, etc.) read more cleanly at the call site than a generic `{data, source}` would have. Operator's style nit on D3 was right.

**What didn't work as well:**
- **Initial PRD draft on D4 optimized for parity over accuracy.** Single-string `governance_uri` would have been merged if the operator hadn't pushed back. The review caught it cheaply; the PRD-first discipline is not a substitute for operator design review on non-obvious tradeoffs.
- **Smoke output pipeline filtering** hid the pass/fail tallies on the first prod-smoke attempt. The fix was trivial (`tail -1` instead of a grep filter), but the lesson is that observability tooling around verification steps should itself be verified before trusting its output.
- **Two main-preview isolate flakes** before three clean. Not a defect — the P1.2 handoff predicted this — but a reminder that the 3-consecutive-clean gate is doing real work, not ritual.

---

## Handoff

Next session's atomic unit: **P1.3.2** — apply the canary pattern to the next tool in the sweep. Forward handoff at `klappy://odd/handoffs/2026-04-21-p1-3-2-next-tool-canary`. This ledger is `status: active`; a future closeout session will flip it to `status: superseded` with a pointer to that successor.

---

## Provenance

- **Source handoff:** `odd/handoffs/2026-04-20-p1-3-challenge-canary.md` — the instructions this session executed against.
- **Predecessor ledger:** `odd/ledger/2026-04-19-p1-2-encode-dolcheo-landed.md` — the P1.2 retrospective whose code-first and recency-as-authority observations this session tested.
- **Merged PRs:** `klappy/oddkit#116` (feat), `klappy/oddkit#117` (promotion).
- **Validator session:** `sesn_011CaE63LZhPUX1UAZPbiV7n` under agent `agent_011CaE62pg6jJ7yYpRj1o9Do`. Model: `claude-sonnet-4-5`. Event log ephemeral to the validator's container; the VERIFIED 5/5 disposition is summarized above and in the final disposition block retrieved from the session's terminal `agent.message` event.
- **PRD:** `/home/claude/work/prd-p1-3-1-challenge-canary.md` — local planning artifact in the orchestrator's working directory, not committed to any repo. Referenced in PR #116 commit message and inline orchestrate.ts comments.
