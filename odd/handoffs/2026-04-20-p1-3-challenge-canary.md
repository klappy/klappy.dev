---
uri: klappy://odd/handoffs/2026-04-20-p1-3-challenge-canary
title: "Handoff — P1.3.1 oddkit_challenge governance_source Retrofit"
audience: odd
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "handoff", "session", "epoch-8.3", "p1-3", "oddkit-challenge", "governance-source", "canary", "sweep"]
epoch: E0008.3
date: 2026-04-20
session_span: "2026-04-19 closed"
derives_from: "odd/ledger/2026-04-19-p1-2-encode-dolcheo-landed.md, odd/handoffs/2026-04-20-post-closeout.md, odd/handoffs/2026-04-20-p1-2-encode-canary.md, canon/constraints/core-governance-baseline.md"
governs: "Fresh-session continuation after P1.2 landed. Points the next session at P1.3.1 — retrofit oddkit_challenge to declare governance_source in its envelope, mirroring the encode + telemetry_policy canary shape. First PR in the post-encode sweep."
status: active
supersedes: "odd/handoffs/2026-04-20-post-closeout.md"
---

# Handoff — P1.3.1 oddkit_challenge governance_source Retrofit

> P1.2 shipped. oddkit 0.18.0 is in prod (`oddkit.klappy.dev`, health confirms). Encode's envelope now declares `governance_source` + `governance_uri`, DOLCHEO paragraph-prefix batch input works, Open facet + priority bands are surfaced, six-letter DOLCHEO minimal fallback in place, letter dedup in discovery. Sonnet 4.6 validator VERIFIED 11/11 with external corroboration. **Next work unit is P1.3.1** — retrofit `oddkit_challenge` to declare `governance_source` in its envelope. Same canary shape as encode, smaller delta (challenge already reads canon at runtime via four discovery helpers). Estimate 45–90 min including validator. The P1.2 ledger at `klappy://odd/ledger/2026-04-19-p1-2-encode-dolcheo-landed` has the full closeout.

---

## What shipped since the prior handoff

| PR | Repo | Merged SHA | Purpose |
|----|------|-----------|---------|
| #114 | klappy/oddkit | `290dde5` | **feat(encode):** DOLCHEO batch prefix + `governance_source` envelope (0.18.0). Squash-merged to main. |
| #115 | klappy/oddkit | `e6dbba5` | main → prod promotion for 0.18.0. Merge commit. |

**Production state:** `https://oddkit.klappy.dev/health` returns `{"version":"0.18.0"}`. Envelope smoke 61/61 pass × 3 consecutive runs against `https://oddkit.klappy.dev/mcp`. No regressions.

**Validator record:** `agent_011CaDj46VwmidBz5g3wMhdJ` / `sesn_011CaDj48ax5VEXyMfxrDves`. Disposition: **VERIFIED**, 11/11, 3 non-blocking advisories. Corroboration method: the validator pulled main's `orchestrate.ts` bytes to confirm zero `governance_source` references, cited `core-governance-baseline §Canon-Only` to confirm two-tier cascade, verified letter dedup from a live response. External-evidence pattern worked and should be the default for subsequent validator dispatches.

## What is cleared from the prior handoff

- **[O-open P1.2]** Encode batch-mode + canary refactor — closed by #114/#115.
- **[O-open P3]** Version bump to 0.18.0 — closed by #114 (bundled in feature PR).

## What remains open

- **[O-open P1]** **P1.3.1 — challenge `governance_source` retrofit.** See scope section below. This is the next atomic unit.
- **[O-open P2]** **Encode index-layer strict-mode.** `getIndex` lacks `skipBaselineFallback`; encode's `knowledge_base_url` override doesn't strict-fall to `"minimal"` when the target repo lacks encoding-type docs. Documented in 0.18.0 CHANGELOG Known Limitations. Natural to bundle with P1.3.1 if challenge exercises the same code path; otherwise separate PR.
- **[O-open P3]** Handoff-text correction on `klappy://odd/handoffs/2026-04-20-p1-2-encode-canary` — rename "bundled baseline" → "minimal fallback" to align with the contract's enum. Tiny follow-up PR on klappy.dev. Low priority.
- **[O-open P4]** Candidate canon principle on contract-governs-handoff-drift. Watch for one more recurrence before committing to the doc.
- **[O-open P5]** CHANGELOG render route on klappy.dev + `version_notes_url` on MCP `initialize`. Low priority; slot into a tool-envelope PR window.

---

## P1.3.1 scope — retrofit `oddkit_challenge` envelope

### The delta

Challenge already reads governance from canon at runtime — four discovery helpers in `workers/src/orchestrate.ts`:

- `discoverChallengeTypes(fetcher, knowledgeBaseUrl)` — challenge-type docs under `odd/challenge-types/`
- `discoverBasePrerequisites(fetcher, knowledgeBaseUrl)` — gate/challenge base prereqs
- `discoverNormativeVocabulary(fetcher, knowledgeBaseUrl)` — must/must-not/never vocabulary
- `discoverStakesCalibration(fetcher, knowledgeBaseUrl)` — 9-mode stakes calibration

The gap: `runChallengeAction` does NOT declare `governance_source` in its envelope. Prod `orchestrate.ts` contains zero `governance_source` references (validator-verified for P1.2 with bytes-level evidence).

### Work to ship

1. **Aggregate tier signal from the four discovery helpers.** Each helper's canon fetch can succeed (some challenge-types parsed) or fall through to minimal (hardcoded defaults). The aggregate governance_source for a challenge response is:
   - `"knowledge_base"` if all four helpers resolved from canon
   - `"minimal"` if one or more fell through to hardcoded defaults
   - Consider whether a middle state (partial knowledge_base) is useful, or whether the strict aggregate is cleaner. Bias toward the strict aggregate; it matches the two-tier pattern P1.2 established.
2. **Refactor the four helpers to return `{ data, source }`** tuples (pattern from P1.2's `discoverEncodingTypes` return shape). Update the single caller (`runChallengeAction`) to aggregate.
3. **Declare `governance_source` + `governance_uri` in the challenge response envelope.** `governance_uri` candidates: `"klappy://canon/constraints/challenge"` or per-dimension URIs. Check what canon path best represents the challenge vocabulary contract — `odd/challenge/stakes-calibration.md` is a strong candidate for the primary governance anchor (it's the 9-mode contract that was the PR #100 root cause).
4. **Smoke test extensions.** Mirror the encode assertions from `workers/test/canon-tool-envelope.smoke.mjs`:
   - Envelope shape on challenge responses
   - `governance_source` present and valid
   - Default KB returns `knowledge_base`
   - `knowledge_base_url` override threaded (debug echo at minimum; note the same strict-mode limitation if it applies to challenge's index reads)
5. **Tool description update.** Reference the four discovery sources (challenge-types, prereqs, normative vocabulary, stakes calibration) and the two-tier envelope signal.
6. **CHANGELOG entry under `[Unreleased]` OR a 0.18.1 PATCH / 0.19.0 MINOR bump.** Decision deferred to planning in the next session. PATCH is defensible (additive envelope field, no input/output shape change for callers not reading the new field). MINOR is defensible by precedent (encode's addition shipped as MINOR). Pick one, name it in the PR body.

### Known subtleties

- **PR #100 history.** Challenge's stakes-calibration parser was the cause of the 1h 39m prod breakage under the PR #100/#102/#103/#104 arc. The four discovery helpers in orchestrate.ts now handle all 9 modes. Smoke should assert all 9 modes still parse cleanly — pattern from `workers/test/governance-parser.test.mjs` Test 7.
- **Per-mode governance vs global governance.** Challenge's behavior varies by mode (exploration/planning/execution/voice-dump/drafting/peer-review-ready/canon-tier-2/canon-tier-1/published-essay). The `governance_source` signal applies to the overall vocabulary fetch, not per-mode. Don't overcomplicate.
- **The PR #100 lesson is load-bearing.** `canon/constraints/core-governance-baseline` was written partly in response to this failure. Re-read it during planning — especially §Build-Time Invariants and §Runtime Invariants.

### Out of scope (deferred)

- Index-layer strict-mode for `getIndex`. Only pull into this PR if challenge's code path exercises it AND the fix is trivial. Otherwise separate PR.
- Gate / preflight / validate / orient / search / catalog / cleanup / version refactors — subsequent P1.3.x PRs, one per tool per session.
- Any canon-doc edits (new principles, handoff rewording) — separate klappy.dev PRs.

### Path 3 workflow

Same as P1.2:

1. Clone klappy/oddkit into `/home/claude/work/oddkit`, cut branch `challenge/governance-source-envelope` off main.
2. Apply edits locally. Run `npm run typecheck` in `workers/`. Run `node workers/test/governance-parser.test.mjs` — must stay at 105/105.
3. Commit (githook enforces package.json version sync if bumping).
4. Push branch. CF auto-deploys to `https://<slug>-oddkit.klappy.workers.dev/mcp`. Wait ~25s. Smoke the preview URL with the updated smoke script.
5. Open PR via `urllib.request` + `json.dumps`. Path 3 constraint: no shell heredoc JSON.
6. Dispatch Sonnet 4.6 read-only validator. Template at `/home/claude/work/dispatch-validator.sh` (env-var exports fix from P1.2). Required external corroborations:
   - Main branch's `orchestrate.ts` bytes grep for pre-refactor state
   - Live curl against preview URL for envelope shape + `governance_source` value
   - `oddkit_get core-governance-baseline` citation on the tier enum
7. Accept VERIFIED or iterate. Do not trust terminal self-report alone (`canon/principles/agent-self-report-under-stress`).
8. Squash-merge on VERIFIED. Main-preview smoke. Open main → prod promotion PR. Merge. Prod smoke until 3 consecutive clean runs (isolate-warmup pattern confirmed in P1.2).

Estimate: 45–90 min including validator. Smaller than P1.2 because discovery helpers are already canon-governed.

---

## Standing rules (carried from prior handoffs, unchanged)

- **Call `oddkit_time` first every turn.** Pass the prior `server_time` as `reference`. No inferred timestamps.
- **Declare epistemic mode out loud.** Planning until PRD is written and contract decisions are named; execution after the gate; validation via Sonnet 4.6 (context-break required, same-session self-review is not validation).
- **Search canon before asking.** Especially before claiming anything about challenge's current state or the core-governance-baseline contract.
- **Ground framing in code + canon, not in the latest handoff.** The P1.2 session hit recency-as-authority three times. The fix is always: read target code, cross-reference the governing contract, then frame scope as a delta. Explicitly: if a handoff's word choice disagrees with a contract's enum, the contract wins.
- **PRD before code.** Write the plan as a file before touching source. Articulation is the deliverable during planning, not prose in the chat window.
- **During execution, produce artifacts, not questions.** Reversion requires one sentence naming the specific unknown.
- **No force-push without `git fetch` first.** Remote state may have diverged.
- **GitHub API: `urllib.request` + `json.dumps`, never bash heredoc.** The PAT-in-command footgun and JSON-escaping pitfalls are documented; use the proven path.
- **`$HOME=/root` in the managed-agent cloud container** (not `/home/user` as the skill doc historically suggested).
- **Do NOT dispatch Opus 4.7 execution agents to klappy/oddkit.** Safety-layer false-positive blocks them. Sonnet 4.6 read-only validation is fine; orchestrator-applies for writes.
- **Do NOT run `wrangler deploy` manually.** Githooks + CF auto-deploy handle the pipeline.
- **Branch preview slug rule:** slashes AND dots → hyphens. `challenge/governance-source-envelope` → `challenge-governance-source-envelope`.
- **Prod deploy warmup pattern:** first smoke run immediately after prod flip can flake as isolates serve mixed versions. Accept 3 consecutive clean runs as the "prod clean" gate.

---

## Reference material — read this at session start

Priority order for fresh-session reading:

1. This doc.
2. `klappy://canon/bootstrap/model-operating-contract` — the evolving operating contract.
3. `klappy://odd/ledger/2026-04-19-p1-2-encode-dolcheo-landed` — full closeout for P1.2, including the recency-as-authority failure pattern and how it was resolved.
4. `klappy://canon/constraints/core-governance-baseline` — the governing contract (§Canon-Only lists challenge-types? encoding-types are there; check whether challenge's governance docs are similarly classified).
5. `klappy://canon/principles/agent-self-report-under-stress` — for the validator dispatch.
6. `klappy://canon/meta/frontmatter-schema` — native YAML types only if touching docs.
7. `klappy://canon/constraints/ai-voice-cliches` — if touching any writing.

Reference PRs for canary pattern (same-shape):

- `klappy/oddkit#108` / `#109` — telemetry_policy canary (reference envelope).
- `klappy/oddkit#114` — encode canary completion (most recent example, P1.2).

---

## Thin prompt for the next session

```
Resume P1.3.1 per klappy://odd/handoffs/2026-04-20-p1-3-challenge-canary.

Current state: 0.18.0 in prod (oddkit.klappy.dev), encode envelope
now declares governance_source, DOLCHEO batch-prefix input works,
letter dedup in place. P1.2 formally closed at
klappy://odd/ledger/2026-04-19-p1-2-encode-dolcheo-landed.

Read the handoff, run the gauntlet on the challenge code path and the
core-governance-baseline contract, write the PRD as a file before
touching source, then apply the challenge envelope refactor locally
(orchestrator applies, Sonnet 4.6 validates — path 3, no Opus 4.7
execution agents to oddkit).

Credentials in project instructions. Don't over-scope — P1.3.1 alone
is one session's work.
```

---

## Provenance

- **Prior post-closeout handoff:** `odd/handoffs/2026-04-20-post-closeout.md` — superseded by this document.
- **Session ledger:** `odd/ledger/2026-04-19-p1-2-encode-dolcheo-landed.md` — full retrospective for the P1.2 arc.
- **Merged PRs:** `klappy/oddkit#114` (feat), `klappy/oddkit#115` (promotion).
- **Validator session:** `sesn_011CaDj48ax5VEXyMfxrDves` under agent `agent_011CaDj46VwmidBz5g3wMhdJ`. Event log ephemeral to the orchestrator's container; the VERIFIED 11/11 disposition is summarized in the ledger linked above.
