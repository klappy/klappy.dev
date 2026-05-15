---
uri: klappy://canon/decisions/DR-20260514-0001-telemetry-wrapper-pattern
title: "DR-20260514-0001 — Telemetry Emission Moves to a Per-`server.tool` Wrapper"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["canon", "decision", "adr", "telemetry", "instrumentation", "wrapper-pattern", "vodka-architecture", "billing-prerequisite", "epoch-8"]
epoch: E0008
date: 2026-05-14
status: active
derives_from: "canon/constraints/telemetry-governance.md, canon/principles/vodka-architecture.md, canon/principles/maintainability-one-person-indefinitely.md, canon/observations/2026-05-14-telemetry-coverage-gap-quantified.md"
complements: "odd/handoffs/2026-05-14-telemetry-coverage-completeness.md, docs/oddkit/internals/telemetry-architecture.md"
governs: "All telemetry emission in workers/src — every server.tool() registration must go through withTelemetry"
---

# DR-20260514-0001 — Telemetry Emission Moves to a Per-`server.tool` Wrapper

> Locks the architectural choice that closes the verified 27% telemetry coverage gap. Every `server.tool()` registration in `workers/src/index.ts` is wrapped with `withTelemetry(toolName, handler)`. The wrapper measures the `args` object on entry and the returned `{content: [...]}` envelope on exit — both as in-memory objects, before any SSE framing. The wire-edge instrumentation block at `index.ts:1029-1071` is deleted. This decision is the load-bearing fix for the gap recorded in `canon/observations/2026-05-14-telemetry-coverage-gap-quantified` and the prerequisite for any paid-tier observability that follows.

---

## Status

Active. Adopted 2026-05-14. Implementation in `klappy/oddkit` PR 2, scheduled to open after canon PR 1 merges.

---

## Context

The telemetry instrumentation added in E0008 Phase 2 tokenizes the cloned HTTP request and response bodies inside a wire-edge `ctx.waitUntil` block. A verified diagnostic (`canon/observations/2026-05-14-telemetry-coverage-gap-quantified`) shows that 27% of `event_type='tool_call'` rows over the past 30 days carry zero shape (`bytes_in`, `bytes_out`, `tokens_in`, `tokens_out` all zero). The gap distribution is biased toward heavy-response tools — `oddkit_challenge` is 79% missing, `oddkit_gate` 75%, `oddkit_encode` 73%, `telemetry_policy` 93%. Three root causes are confirmed in code: a streaming-response race against SSE, dispatcher-bypass for the two inline telemetry tools, and an acknowledged batch-attribution fiction where the full HTTP payload shape is attributed to every JSON-RPC message in a batch.

The proximate motivation is a paid-tier observability requirement: pricing models cannot be derived from data that is missing the heaviest workloads. The deeper motivation is correctness — the existing telemetry is lying about coverage in a way that compounds over time.

---

## Decision

Adopt a `withTelemetry(toolName, handler)` wrapper applied at every `server.tool()` registration site. The wrapper:

1. Serializes `args` via `JSON.stringify` on entry. Measures bytes via `TextEncoder` and tokens via `countTokensSafe`. This is the per-tool-call ingress shape.
2. Calls the wrapped handler. Captures the returned `{ content: [...] }` envelope.
3. Serializes the content array on exit. Measures bytes and tokens the same way. This is the per-tool-call egress shape — measured on the in-memory object before any SSE framing, eliminating the streaming-response race.
4. Computes `duration_ms` from a closure-scoped `startTime`.
5. Resolves `consumerLabel` and `consumerSource` per call from the `request` object (passed through `createServer`'s closure).
6. Writes one AE data point via `env.ODDKIT_TELEMETRY.writeDataPoint({...})` with `event_type='tool_call'`, reusing existing blob/double slot mappings. No schema change.
7. Returns the handler's return value unchanged.

The wire-edge `ctx.waitUntil` instrumentation block at `workers/src/index.ts:1029-1071` is deleted. Envelope-level `mcp_request` events (for `initialize`, `tools/list`, etc.) are no longer auto-emitted. Re-adding them later is a separate change if needed; current data shows essentially zero analysis depends on them.

The `createServer` signature changes from `createServer(env, tracer, consumerSource?)` to `createServer(env, request, tracer?)`. `consumerSource` is derived per call inside the wrapper because the underlying parse is cheap and structural.

Tokenizer remains `cl100k_base` from `gpt-tokenizer`. Drift versus Claude tokenizer is acceptable shape noise for obs. Billing-grade tokenizer selection is a Phase 3 decision and out of scope here.

The pattern follows the conventional middleware/decorator shape used in Express, Fastify, and OpenTelemetry SDKs. There is no novelty in the pattern itself; the novelty is only its application to MCP `server.tool` registrations.

---

## Alternatives Considered

### (A) Keep wire-edge measurement, fix the streaming-response race

Buffer the response fully before returning (`new Response(await response.arrayBuffer(), {...})`) to eliminate the SSE clone race. Single localized change; preserves the current architecture.

**Rejected because** the race is only one of three root causes. The dispatcher bypass (`telemetry_public`, `telemetry_policy`) and batch attribution fiction would remain. Per-tool-call accuracy is impossible from the wire edge regardless of race fixes — the wire edge sees only HTTP-level shape. For paid-tier observability, per-tool-call accuracy is non-negotiable.

### (B) Instrument inside `handleUnifiedAction`

Move tokenization to the dispatcher return point in `orchestrate.ts:handleUnifiedAction`, where every routed action passes through one `switch` statement. In-memory measurement, per-call accuracy, no race.

**Rejected because** `telemetry_public` and `telemetry_policy` build envelopes inline in `createServer` and never reach the dispatcher. The data confirms this matters — `telemetry_policy` is currently 93% missing, the worst per-tool gap. Any fix that doesn't cover the two inline telemetry tools is incomplete. A dispatcher-only fix would also create asymmetric handling (some tools measured at dispatch, others at the wire edge) which is a maintenance liability.

### (C) Per-`server.tool` wrapper — chosen

Single chokepoint at the tool-registration site. Every registered tool covered, including the two inline telemetry tools. In-memory measurement eliminates the race. Per-call shape eliminates batch attribution fiction. The pattern is conventional; reviewers and future maintainers recognize it immediately.

---

## Consequences

**Positive.**

- **Coverage gate.** With the wrapper in place, every registered tool is measured at the same point in its lifecycle. The gap reduces to whatever residual edge cases remain (cancelled requests, OOM, isolate restarts). DoD targets ≥95% per-tool coverage on every registered tool, ≥99% aggregate.
- **Per-tool-call accuracy.** Each AE row reflects exactly one `tools/call`'s ingress and egress. Batches produce one row per message with each row carrying only that message's shape. This is the correct primitive for billing.
- **Vodka compliance.** Net code delta is negative — deletes ~45 lines of wire-edge instrumentation, adds ~30 lines of wrapper. Same number of telemetry call sites (one), now correctly placed. The wrapper is structural; it adds no domain opinion.
- **Test surface.** Wrapper logic is testable in isolation in `workers/test/telemetry.test.mjs`. Coverage assertions are per-tool, not per-batch.

**Negative.**

- **Lost framing bytes.** Per-tool-call args measurement excludes JSON-RPC envelope overhead. Acceptable — framing overhead is platform cost, captured separately if needed.
- **Closure-scope change.** `createServer` signature changes. Single call site (`index.ts:1006`), single-point change, but it is a public-ish signature of the file.
- **Cutover boundary.** Historical AE rows use per-HTTP-request shape attributed across batches. Post-cutover rows use per-tool-call shape. Anyone running trend analysis across the cutover date must treat it as a data-accuracy boundary. AE retention is 3 months, so the discontinuity ages out naturally.
- **Loss of `mcp_request` rows.** Envelope-level events for non-`tools/call` JSON-RPC methods are no longer emitted. If reintroduced later, that is a separate change.

**Neutral.**

- **Wrapper failure pattern matches current behavior.** Today's swallowed `catch` in `ctx.waitUntil` silently drops telemetry on error. The wrapper preserves the same contract — if measurement fails, log nothing and return the handler result. The tool result is never affected by telemetry failure.

---

## Reversibility

Reversible. The wire-edge code path is preserved in git history at the commit immediately before its deletion. Rollback recipe is `git revert` on PR 2's merge commit. Canon (this DR, the governance update, the observation) does not need to revert — it accurately describes both the intended architecture and the failure modes that motivated it.

The decision becomes harder to reverse only once Phase 3 (billing meter) starts emitting from the wrapper. At that point, billing records depend on the per-tool-call accuracy. But Phase 3 is gated separately and out of scope here.

---

## Validation

DoD per `odd/handoffs/2026-05-14-telemetry-coverage-completeness`:

- Per-tool coverage ≥95% on every registered tool, measured via dispatched Sonnet 4.6 read-only Managed Agent over the prior 1 hour, three consecutive warm-cache queries to filter resolver-cache transients.
- Aggregate coverage ≥99% (informational, not gating).
- 24-hour soak on prod confirms coverage holds.

If any tool falls below 95%, promotion halts. A new diagnostic observation is added identifying the unfound root cause, and planning reopens.

---

## See Also

- `klappy://canon/observations/2026-05-14-telemetry-coverage-gap-quantified` — The diagnostic this decision responds to
- `klappy://odd/handoffs/2026-05-14-telemetry-coverage-completeness` — The execution handoff implementing this decision
- `klappy://canon/constraints/telemetry-governance` — Updated to describe the emission contract this decision establishes
- `klappy://canon/principles/vodka-architecture` — Design constraint this decision respects
- `klappy://canon/principles/maintainability-one-person-indefinitely` — Principle the telemetry system serves
- `klappy://canon/decisions/decision-record-standard` — Format for this DR
