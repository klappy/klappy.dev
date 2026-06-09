---
uri: klappy://odd/handoffs/2026-05-14-telemetry-coverage-completeness
kind: odd
title: "Handoff — Telemetry Coverage Completeness (Phase 1)"
audience: odd
exposure: nav
tier: 2
voice: terse
stability: draft
tags: ["handoff", "session", "telemetry", "observability", "billing-prerequisite", "epoch-8", "execution-contract"]
epoch: E0008
date: 2026-05-14
status: draft-for-gate
derives_from: "canon/constraints/telemetry-governance.md, canon/principles/vodka-architecture.md, canon/principles/maintainability-one-person-indefinitely.md, canon/constraints/release-validation-gate.md, docs/oddkit/release-notes/2026-05-12-epoch-9-substrate-becomes-the-wire.md"
governs: "workers/src/index.ts, workers/src/telemetry.ts, workers/src/tokenize.ts"
---

# Handoff — Telemetry Coverage Completeness (Phase 1)

> Close the 27% byte/token instrumentation gap so paid-tier pricing can be derived from data that doesn't lie. Move payload measurement from the HTTP wire edge (where a streaming-response race zeros out the shape on heavy-payload tools) to a thin wrapper around every `server.tool()` handler (where args and result are in-memory objects). Single pattern, every tool path, no schema change, no policy change.

---

## Summary

A paid-tier pricing model requires obs data that is trustworthy across every surface, every tool, every transport. The current `/mcp` wire-edge instrumentation, added in E0008 Phase 2, tokenizes the cloned HTTP request and response bodies inside `ctx.waitUntil`. Three classes of failure produce a measured 27% rate of zero-byte/zero-token tool_call rows over the past 30 days (19,122 of 26,228 calls carry shape data): a streaming-response race in which `responseClone.text()` resolves empty against MCP SSE bodies; tools whose handlers bypass `handleUnifiedAction` (notably `telemetry_public` and `telemetry_policy`); and request-body clone failures that propagate to both ingress and egress zeros in a single row. The gap correlates with response heaviness — `oddkit_challenge` is 79% missing, `oddkit_gate` 75%, `oddkit_encode` 73% — which is the opposite of what billable observability needs: the heaviest tools are the most invisible.

The fix is one architectural change with no public-surface impact. A `withTelemetry(handler)` wrapper at every `server.tool()` registration site measures the `args` object on entry and the returned `{content: [...]}` envelope on exit, both as in-memory objects, before any SSE framing or stream serialization. The wrapper writes the AE data point directly using `env` captured from `createServer`'s closure. The wire-edge `ctx.waitUntil` block is deleted. Vodka-shaped: one chokepoint, no domain opinion, deletes more code than it adds. Coverage gate: every registered tool ≥95% non-zero shape on `bytes_in`/`bytes_out`/`tokens_in`/`tokens_out` over a 1-hour post-deploy window and a 24-hour prod soak, verified by a dispatched Sonnet 4.6 validator agent rather than operator-run SQL (per E9 `substrate-becomes-the-wire`).

This plan is scoped to Phase 1 (obs completeness). Phase 1.5 (identity cohorting), Phase 2 (pricing analysis), and Phase 3 (billing meter) are noted but separately gated. Phase 1 unblocks Phase 2 by making the data trustworthy enough to analyze; it does not enable billing.

---

## Problem — Verified Against Code and Data

**Symptom.** Of 26,228 `event_type='tool_call'` rows in oddkit_telemetry over the past 30 days, 19,122 (73%) carry non-zero `bytes_in`/`tokens_in`/`bytes_out`/`tokens_out`. The remaining 7,106 (27%) record zero shape. The four shape columns are perfectly correlated — when one is zero, all four are zero — which rules out per-direction tokenizer failure and points to the recording path itself being skipped or zeroed.

**Gap distribution is biased toward heavy responses:**

| Tool | Total | With shape | Missing % |
|------|------:|-----------:|----------:|
| oddkit_challenge | 2,379 | 495 | 79% |
| oddkit_gate | 1,101 | 276 | 75% |
| oddkit_encode | 976 | 264 | 73% |
| oddkit_search | 3,309 | 2,601 | 21% |
| oddkit_catalog | 2,685 | 2,218 | 17% |
| telemetry_policy | 250 | 17 | 93% |
| telemetry_public | 8,160 | 8,035 | 1.5% |

**Three confirmed root causes (verified against `workers/src/index.ts` and `workers/src/orchestrate.ts`):**

1. **Streaming-response race.** `index.ts:1042-1066` clones the response synchronously, then reads `responseClone.text()` inside `ctx.waitUntil`. The MCP handler returns Streamable HTTP (SSE). When the SSE stream errors, closes early, or the worker context unwinds before the body fully drains, `responseText` is `""` and the swallowed catch at line 1067 (`// Telemetry must never break MCP requests`) writes shape zeros. The heavier the response, the more likely.

2. **Dispatcher bypass.** `telemetry_public` (`index.ts:469-573`) and `telemetry_policy` (`index.ts:575+`) build envelopes inline without routing through `handleUnifiedAction`. They still get wire-edge measurement, but their failure rates (93% missing on `telemetry_policy`, 1.5% on `telemetry_public`) suggest a different streaming pattern — likely the shorter response paths complete before the clone race resolves, while the larger SQL result responses succeed. Either way, the dispatcher is not the chokepoint it appears to be.

3. **Batch attribution fiction.** `telemetry.ts:269-275` explicitly attributes the full HTTP payload shape to every JSON-RPC message in a batch (`"for batches we attribute the full payload shape to each message rather than fabricating a split"`). For pricing this is unacceptable: a customer who sends a five-message batch is billed 5x the actual payload.

**Why each of these is incompatible with paid-tier billing.** Pricing requires per-tool-call accuracy. Wire-edge measurement gives per-HTTP-request accuracy, which then gets multiplied across batches. A customer's bill computed from this data would be wrong by an arbitrary multiplier any time a client batches calls (which the MCP SDK does opportunistically). The race makes the wrong number a soft floor — heavy tools just disappear. Combined, you have a billing system that systematically under-bills heavy users and over-bills batch users.

---

## Design — The `withTelemetry` Wrapper

**Single pattern, applied at every `server.tool()` registration site:**

```ts
server.tool(
  name,
  description,
  schema,
  annotations,
  withTelemetry(name, async (args) => {
    // existing handler body
  })
);
```

**What `withTelemetry(toolName, handler)` does:**

1. On entry: serialize `args` (`JSON.stringify(args)`), measure bytes via TextEncoder and tokens via `countTokensSafe` from `tokenize.ts`. This is the per-tool-call ingress shape — more accurate than today's per-HTTP-request shape divided naively across batches.
2. Call the wrapped handler, capture the returned `{ content: [...] }`.
3. On exit: serialize the content array, measure bytes and tokens the same way. This is the per-tool-call egress shape — measured on the in-memory object before any SSE framing, eliminating the streaming-response race entirely.
4. Compute `duration_ms` from a closure-scoped `startTime`.
5. Resolve `consumerLabel` and `consumerSource` from `request` (passed through `createServer`'s closure — see signature change below).
6. Write one AE data point via `env.ODDKIT_TELEMETRY.writeDataPoint({...})` with `event_type='tool_call'`, the measured shape, and existing blob/double slot mappings. Reuses `recordTelemetry`'s data-point shape; does not add new slots.
7. Return the handler's return value unchanged.

**Closure scope change.** `createServer(env, tracer, consumerSource)` becomes `createServer(env, request, tracer)`. `consumerSource` is re-derived inside `withTelemetry` per-call (cheap; the resolution is structural). `request` is needed so the wrapper can read headers and URL params for consumer-label resolution. No other signature changes.

**Wire-edge code deleted.** `index.ts:1029-1071` (the `if (telemetryClone)` block and its `ctx.waitUntil` callback) is removed entirely. The wire edge keeps only its existing job of routing the request and returning the response. Envelope-level `mcp_request` events (non-tool-call JSON-RPC traffic like `initialize`, `tools/list`) are no longer auto-emitted; if any are needed for diagnostics, they get an explicit per-method wrapper on the MCP handler (deferred — current data shows essentially all useful telemetry is at the tool_call level).

**Tokenizer unchanged.** Still `cl100k_base` from `gpt-tokenizer`. Drift versus Claude tokenizer is acceptable shape noise for obs. Billing-grade tokenizer selection is a Phase 3 canon decision, not this plan.

**Vodka compliance check (the three questions from `canon/principles/vodka-architecture`):**

1. *Server thicker?* No. Net code delta is negative: deletes ~45 lines of wire-edge instrumentation, adds ~30 lines of wrapper. Same number of telemetry call sites (one), now correctly placed.
2. *New domain opinion?* No. The wrapper is structural — it measures and records, it does not interpret. Tool names, args, and results pass through unchanged.
3. *Removable without consequence?* No more than before. Telemetry is already load-bearing per the governance constraint. The change improves correctness, not coupling.

### Alternatives Rejected

**(A) Keep wire-edge measurement, fix the streaming-response race.** Use `new Response(await response.arrayBuffer(), {...})` to fully buffer the response before returning it, eliminating the SSE clone race. Rejected: solves only the race (root cause #1) and leaves dispatcher bypass (root cause #2) and batch attribution fiction (root cause #3) intact. Per-tool-call accuracy is still impossible because the wire edge sees only HTTP-level shape.

**(B) Instrument inside `handleUnifiedAction`.** Move tokenization to the dispatcher's return point, where every routed action passes through one switch statement. Rejected: `telemetry_public` and `telemetry_policy` build envelopes inline in `createServer` and never reach the dispatcher — they would remain uninstrumented. The data confirms this matters: `telemetry_policy` is currently 93% missing, the worst per-tool gap in the dataset. Any fix that doesn't cover these two tools is incomplete.

**(C) Per-`server.tool` wrapper.** Chosen. Single chokepoint, every registered tool, no dispatcher dependency, in-memory measurement eliminates the race, per-call shape eliminates batch attribution fiction.

---

## Touch List

### Code (workers/src in `klappy/oddkit`)

| File | Change | LOC delta |
|------|--------|----------:|
| `workers/src/telemetry.ts` | Export new `withTelemetry(toolName, handler, env, request)` wrapper. Keep `recordTelemetry` as a lower-level helper the wrapper calls. | +30 |
| `workers/src/index.ts` | Update `createServer` signature (add `request`, remove `consumerSource` from outer scope — derive per-call). Wrap every `server.tool()` registration. Delete `if (telemetryClone)` block at lines 1000-1071. | −45/+25 |
| `workers/src/tokenize.ts` | No change. `measurePayloadShape` is still useful; new wrapper calls `countTokensSafe` directly with per-direction strings. | 0 |
| `workers/test/telemetry.test.mjs` | Add wrapper coverage tests: ingress measured, egress measured, both non-zero on synchronous handlers, both non-zero on streaming-response handlers, errors swallowed without breaking the handler return. | +80 |
| `workers/test/integration.test.mjs` | Add end-to-end test: invoke each registered tool through the MCP handler, assert telemetry row has non-zero shape. | +60 |

**Net code delta:** approximately −30 lines of wire-edge instrumentation, +95 lines of wrapper + tests. Reduces total instrumentation surface area while increasing coverage.

### Canon (in `klappy/klappy.dev`)

| Path | Change | Purpose |
|------|--------|---------|
| `canon/decisions/DR-20260514-0001-telemetry-wrapper-pattern.md` | **New.** Tier 2. Locks the wrapper pattern as the canonical telemetry emission point. Alternatives considered: (A) keep wire-edge, fix the race — rejected, doesn't solve dispatcher bypass; (B) instrument inside `handleUnifiedAction` — rejected, misses telemetry tools; (C) per-tool wrapper — chosen. Records the verified 27% gap as the trigger, the four shape columns being correlated-zero as the diagnostic, and the per-tool-call accuracy gain as the consequence. Notes prior art: per-handler middleware/decorator is the conventional pattern in Express, Fastify, OpenTelemetry SDKs; the novelty here is only its application to MCP `server.tool` registrations. | Decision lock for the architecture. |
| `canon/constraints/telemetry-governance.md` | **Update.** Two changes: (1) The "Structural Dimensions (Blobs)" and "Numeric Values (Doubles)" tables predate E0008 Phase 2 — add `bytes_in`, `bytes_out`, `tokens_in`, `tokens_out`, `cache_hits`, `cache_lookups`. (2) New section `## Emission Contract — Per-Tool Wrapper at Registration Site` describing the load-bearing rule: every `server.tool` registration goes through `withTelemetry`; measurement is per tool call on in-memory args and result objects, never on wire-edge streams; one AE data point per `tools/call`, never per HTTP request; batches produce one row per message. This is the section future tools, TruthKit additions, and future maintainers read to know how to emit telemetry correctly. | Schema parity AND emission governance — the canon describing how it works now. |

### Observations (in `klappy/klappy.dev`)

| Path | Change | Purpose |
|------|--------|---------|
| `canon/observations/2026-05-14-telemetry-coverage-gap-quantified.md` | **New.** Tier 2. Records the diagnostic: 27% rate, four-column-zero correlation, distribution biased toward heavy responses, the three confirmed root causes with code-line citations. Cites the queries used so the analysis is reproducible. Records the cutover date as a "data-accuracy boundary" — pre-cutover rows attribute per-HTTP-request shape across batches; post-cutover rows are per-tool-call. Includes a working learning: *measure in-memory objects, not wire-edge streams* — tagged for graduation to a canon principle on the second case. | Diagnostic record — the receipts for the decision. |

### Session ledger (in `klappy/klappy.dev`)

| Path | Change | Purpose |
|------|--------|---------|
| `odd/ledger/2026-05-14-telemetry-coverage-planning-session.md` | **New.** Tier 3. DOLCHEO session journal capturing decisions, observations, learnings, constraints, handoffs, encodes, and open threads from this planning conversation. Saved as the milestone artifact before opening PR 1. | Session record of the planning that produced the DR and handoff. |

**Note on this document.** This handoff itself is the execution contract for the code work. It lives at `odd/handoffs/2026-05-14-telemetry-coverage-completeness.md` and is merged in the canon PR before the code PR opens. No separate handoff file is created.

### Docs (in `klappy/klappy.dev`) — DEFERRED TO PR 2

These doc updates describe how telemetry behaves *after* the wrapper lands. They cannot ship in PR 1 without describing future behavior as if it were current. They move to PR 2 alongside the code change.

| Path | Change | Purpose | PR |
|------|--------|---------|----|
| `docs/oddkit/tools/telemetry_public.md` | **Update.** Refresh the "0 for SSE streams" language in the schema. Add a cutover-boundary note referencing the new observation. Add cross-link to the new internals doc. | Doc-truth parity. | PR 2 |
| `docs/oddkit/tools/telemetry_policy.md` | **Update.** Reference the new principle doc and the updated governance constraint. | Cross-link freshening. | PR 2 |
| `docs/oddkit/internals/telemetry-architecture.md` | **New.** Internals doc describing the wrapper pattern, the closure-scope contract, the deleted wire-edge block, and the data-point shape. Audience: future maintainer. One-screen doc, no narrative. | Architecture record for future grep. | PR 2 |

---

## Definition of Done

**PR sequencing — canon-first-absolute applies:**

- **PR 1 (canon, `klappy/klappy.dev`)** — five files: this handoff, the session journal, the DR, the telemetry-governance update (adding the Emission Contract section), and the observation. Merges first. No code, no doc-of-current-tool-behavior changes.
- **PR 2 (code + implementation docs, `klappy/oddkit` + `klappy/klappy.dev`)** — wrapper + tests + wire-edge delete in `klappy/oddkit`. Internals doc, telemetry_public.md schema refresh, and telemetry_policy.md cross-link refresh in `klappy/klappy.dev`. Opens only after PR 1 merges. Promotion gated by per-tool ≥95% coverage verified via dispatched validator agent.

**Completion criteria:**

1. **PR 1 merged** to `klappy/klappy.dev:main` with all canon and doc changes, passing canon-quality CI.
2. **PR 2 merged** to `klappy/oddkit:main` with all five code changes and both test suites green.
3. Wrangler deploy to main preview (`main-oddkit.klappy.workers.dev`) confirms the worker boots and serves a smoke call through every registered tool.
4. **Validator agent dispatched** (per E9 `substrate-becomes-the-wire` and `release-validation-gate` canon) — Sonnet 4.6 read-only Managed Agent runs the post-deploy coverage query against `oddkit_telemetry` over the prior 1 hour and reports per-tool aggregates. Agent runs three consecutive warm-cache queries to filter resolver-cache transients (per known bug #149). Operator does not run SQL by hand.
5. **Per-tool coverage gate.** Promotion is blocked unless every registered tool shows ≥95% non-zero `bytes_in`/`bytes_out`/`tokens_in`/`tokens_out` in the validator's report. Aggregate ≥99% is informational, not gating — it masks per-tool failures. If any tool falls below 95%, halt promotion, add a new diagnostic observation identifying the unfound root cause, and reopen planning.
6. Promotion PR `main → prod` in `klappy/oddkit`, squash merge after Cursor Bugbot reaches `completed`.
7. **24-hour soak dispatched as a second validator agent session** — separate Managed Agent, same query, against prod. Coverage holds per the same per-tool gate. Operator receives the agent's final report; does not poll AE directly.

---

## Out of Scope (Stated for Boundary Clarity)

- **Phase 1.5 — Identity cohorting.** Optional `client_id` JSON-RPC param, cohort view over consumer_label patterns, `?consumer=` URL-param disambiguation between human/agent/CI. Separate PR, separate decision record. This plan does not improve the question "who is the customer" — only "how many tokens did this call cost."
- **Phase 2 — Pricing analysis.** Cohort × tool × time-window analysis. Determination of natural tier breaks. Cost-side reconciliation against Cloudflare Workers, R2, AE costs. Maintainer's analytic work, no code.
- **Phase 3 — Billing meter.** Authenticated `account_id`, non-sampled storage (D1 or R2), idempotency on JSON-RPC id, Claude tokenizer (not cl100k), dispute trail. Requires its own canon decision records before any code.
- **Tokenizer choice for billing.** This plan keeps cl100k. The ~3–4% drift versus Claude tokenizer is acceptable for obs and unacceptable for billing; the decision lives in Phase 3.

---

## Risks and Tradeoffs

**R1 — Lost framing bytes.** Per-tool-call args measurement excludes JSON-RPC envelope overhead. *Mitigation:* this is the correct primitive for billing. Framing overhead is platform cost, captured separately if needed via wire-edge `mcp_request` events on a separate, cheaper path.

**R2 — Closure-scope change breaks tests.** Adding `request` to `createServer` is a signature change touching every call site. *Mitigation:* there is one call site (`index.ts:1006`). Single-point change.

**R3 — Wrapper failure pattern equals current swallowed-catch pattern.** If `withTelemetry` throws, the tool result is lost. *Mitigation:* wrap the measurement in try/catch — if measurement fails, log nothing and return the handler result. Same swallow contract as today, applied per-call rather than per-request.

**R4 — Cursor Bugbot may flag the dead-code removal.** Deleting the wire-edge block is a large diff. *Mitigation:* preserve in git history; rollback recipe is `git revert`.

**R5 — Batch attribution change creates a data-accuracy boundary on the cutover date.** Anyone querying `bytes_in` historically gets per-HTTP-request shape attributed to N messages; after the change, per-message shape. *Mitigation:* document the cutover date in the observation doc. Pre-cutover trend analysis treats the boundary explicitly. AE retention is 3 months so the discontinuity ages out naturally.

---

## Open Questions Before Gate

These should be resolved in this planning conversation, not surfaced during execution:

1. **Do we want envelope-level `mcp_request` rows preserved?** Current wire-edge block emits them for `initialize`, `tools/list`, etc. Proposed delete kills them. Recommendation: kill them — the data shows essentially zero analysis depends on them.
2. **Should `withTelemetry` write directly or return a shape for centralized recording?** Recommendation: write directly. Centralized recording reintroduces the closure-scope coupling problem.
3. **Coverage gate threshold — 99% strict, or 95% per-tool minimum with no max-floor?** Recommendation: 95% per-tool minimum. The 99% aggregate masks per-tool failures.

---

## See Also

- `klappy://canon/constraints/telemetry-governance` — Authority for what is tracked and why
- `klappy://canon/constraints/release-validation-gate` — Validator-agent dispatch contract used in DoD
- `klappy://canon/principles/vodka-architecture` — Design pattern this change must respect
- `klappy://canon/principles/maintainability-one-person-indefinitely` — Principle telemetry serves
- `klappy://canon/principles/cache-fetches-and-parses` — Same family of "measure where the data lives" reasoning
- `klappy://docs/oddkit/release-notes/2026-05-12-epoch-9-substrate-becomes-the-wire` — Substrate shift driving the validator-agent DoD
- `klappy://canon/decisions/decision-record-standard` — Format for the new DR
