---
uri: klappy://odd/ledger/2026-05-14-telemetry-coverage-planning-session
title: "Session Journal — Telemetry Coverage Completeness Planning"
audience: odd
exposure: nav
tier: 3
voice: terse
stability: stable
tags: ["journal", "ledger", "dolcheo", "session", "telemetry", "observability", "planning", "epoch-8", "phase-1"]
epoch: E0008
date: 2026-05-14
status: complete
derives_from: "odd/handoffs/2026-05-14-telemetry-coverage-completeness.md, canon/constraints/telemetry-governance.md"
complements: "canon/decisions/DR-20260514-0001-telemetry-wrapper-pattern.md, canon/observations/2026-05-14-telemetry-coverage-gap-quantified.md"
---

# Session Journal — Telemetry Coverage Completeness Planning

> Planning session that produced the Phase 1 handoff for closing the 27% telemetry coverage gap. Started from a token-usage query, converged through one challenge cycle and one revision cycle into a locked architecture (per-`server.tool` `withTelemetry` wrapper) and a two-PR sequence (canon first, code second). This journal records the decisions, observations, learnings, and constraints captured during the session. Saved as the milestone artifact before opening PR 1.

---

## [D] Decisions

**D1. Per-`server.tool` `withTelemetry` wrapper.** Adopt as the canonical telemetry emission point. Measures `args` on entry and the returned content array on exit as in-memory objects, eliminating the streaming-response race and per-batch attribution fiction simultaneously. Rejects two alternatives:
- (A) Wire-edge race fix — addresses only one of three confirmed root causes; leaves dispatcher bypass and batch attribution intact.
- (B) `handleUnifiedAction` instrumentation — misses inline tool handlers (`telemetry_policy` at 93% missing, `telemetry_public` inline as well).

**D2. Two-PR sequence — canon first.** PR 1 lands in `klappy/klappy.dev` with the handoff, DR, telemetry-governance update, observation, internals doc, this journal, and two tool-doc refreshes. PR 2 in `klappy/oddkit` opens only after PR 1 merges. Per `canon-first-absolute`.

**D3. Demote `measure-in-memory-not-wire-edge`.** Originally proposed as a tier-2 canon principle. Demoted to a working learning in the observation doc, tagged for graduation to a canon principle when a second case appears. Per the third-recurrence rule.

**D4. DoD coverage gate is per-tool 95% floor, not aggregate 99%.** Aggregate coverage masks per-tool failures. Per-tool floor catches the case where one tool regresses to zero shape while everything else stays high.

**D5. Validator agent dispatch for coverage verification.** Sonnet 4.6 read-only Managed Agent runs the post-deploy and 24-hour soak coverage queries against `oddkit_telemetry`. Operator does not run SQL by hand. Per E9 `substrate-becomes-the-wire` and `release-validation-gate`.

---

## [O] Observations

**O1. Telemetry coverage gap quantified.** 27% of `tool_call` rows over the past 30 days carry zero `bytes_in`/`bytes_out`/`tokens_in`/`tokens_out` — 7,106 of 26,228. The four shape columns are perfectly correlated-zero: when one is zero, all four are zero, which rules out per-direction tokenizer failure and points to the recording path itself being skipped. Gap distribution biased toward heavy-response tools:

| Tool | Total | With shape | Missing % |
|------|------:|-----------:|----------:|
| oddkit_challenge | 2,379 | 495 | 79% |
| oddkit_gate | 1,101 | 276 | 75% |
| oddkit_encode | 976 | 264 | 73% |
| oddkit_search | 3,309 | 2,601 | 21% |
| oddkit_catalog | 2,685 | 2,218 | 17% |
| telemetry_policy | 250 | 17 | 93% |
| telemetry_public | 8,160 | 8,035 | 1.5% |

**O2. Three confirmed root causes in `workers/src/index.ts:1029-1071`:**
1. Streaming-response race — `responseClone.text()` resolves empty on SSE bodies when the worker context unwinds before the body fully drains.
2. Dispatcher bypass — `telemetry_public` (lines 469-573) and `telemetry_policy` (lines 575+) build envelopes inline in `createServer` and never reach `handleUnifiedAction`.
3. Batch attribution fiction — `telemetry.ts:269-275` attributes the full HTTP payload shape to every JSON-RPC message in a batch (the code comment acknowledges this).

---

## [L] Learnings

**L1. Measure HTTP-level metrics on in-memory objects, not wire-edge streams.** When a metric can be computed either at the wire edge (on serialized streams) or one layer in (on in-memory objects), prefer in-memory. The wire edge is subject to streaming races, per-request rather than per-operation accuracy, and batch attribution fiction. The in-memory path is exact, race-free, per-operation. One case so far — graduate to canon principle when a second case appears.

**L2. `oddkit_challenge` stacks claim types.** A plan that combines proposal + principle-extraction + pattern-coinage + comparative-positioning + observation + assumption surfaces six matched types. Use the `matched_types` list to triage which prerequisite gaps are real (sample size, alternatives, irreversibility, validation tests) versus generic.

**L3. Stale memory must yield to live data.** The "5% coverage" figure carried from prior session memory was wrong by 5x. Live telemetry query found 27%. When the question is verifiable, memory is not authoritative — query and cite the query with the analysis.

---

## [C] Constraints

**C1. `canon-first-absolute`.** Canon doc changes merge before any code PR opens. PR 2 (workers/src wrapper) must not open until PR 1 (canon) merges.

**C2. `release-validation-gate`.** Cursor Bugbot must reach `completed` before merge. Load-bearing surface changes require a dispatched read-only Sonnet 4.6 validator before promotion. Encoded into PR 1's DoD steps 4, 5, and 7.

**C3. E9 `substrate-becomes-the-wire`.** Operator-as-wire is a design smell. Coverage verification dispatched as Managed Agent sessions, not operator-run SQL.

---

## [H] Handoffs

**H1. PR 1 execution starts after this journal saves.** Five files into `klappy/klappy.dev`:
- This journal: `odd/ledger/2026-05-14-telemetry-coverage-planning-session.md`
- Handoff: `odd/handoffs/2026-05-14-telemetry-coverage-completeness.md`
- DR: `canon/decisions/DR-20260514-0001-telemetry-wrapper-pattern.md`
- Telemetry-governance update: `canon/constraints/telemetry-governance.md`
- Observation: `canon/observations/2026-05-14-telemetry-coverage-gap-quantified.md`

PR 2 (in `klappy/oddkit` plus follow-up updates in `klappy/klappy.dev`) carries the wrapper code, the internals doc, and the schema-refresh updates to `docs/oddkit/tools/telemetry_public.md` and `docs/oddkit/tools/telemetry_policy.md`. After PR 1 merges, re-plan PR 2 against the final canon text and gate planning → execution again.

---

## [E] Encodes

**E1.** This journal is encoded at `klappy://odd/journals/2026-05-14-telemetry-coverage-planning-session` per the DOLCHEO vocabulary at `klappy://canon/definitions/dolcheo-vocabulary`. Encoded as the milestone artifact before opening PR 1, per the operating contract's session-journal capture rule.

---

## [O-open] Open Threads

**P1. PR 2 (code) scope.** Pending PR 1 merge. Wrapper signature: `withTelemetry(toolName, handler, env, request)`. `createServer` signature change: add `request`, derive `consumerSource` per call. Wire-edge `ctx.waitUntil` block at `index.ts:1029-1071` deleted. Tests: unit coverage for ingress/egress measurement; integration coverage for every registered tool. Cutover date recorded as data-accuracy boundary in the observation.

**P2. Later phases.** Phase 1.5 — identity cohorting (voluntary `client_id` JSON-RPC param plus cohort categorization). Phase 2 — pricing analysis (cohort × tool × time-window analysis, reconciled against Cloudflare cost data). Phase 3 — billing meter (separate canon decision records required for unit of charge, authoritative tokenizer, identity binding, free-tier definition, drift contract).
