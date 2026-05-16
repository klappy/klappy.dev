---
uri: klappy://canon/observations/2026-05-16-telemetry-wrapper-intermittent-emit-loss
title: "Telemetry Wrapper Drops writeDataPoint on a Variable Subset of Calls"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["canon", "observation", "telemetry", "wrapper", "emit-loss", "cloudflare-workers", "waituntil", "follow-up"]
epoch: E0008
date: 2026-05-16
derives_from: "canon/constraints/telemetry-governance.md, canon/constraints/telemetry-validation-gate.md"
complements: "canon/decisions/DR-20260514-0001-telemetry-wrapper-pattern.md, canon/observations/2026-05-14-telemetry-coverage-gap-quantified.md"
governs: "Diagnostic record motivating a follow-up fix to the withTelemetry wrapper"
status: open
---

# Telemetry Wrapper Drops writeDataPoint on a Variable Subset of Calls

> Two consecutive smoke passes against `worker_version 0.28.0` (main preview and prod) each emitted only 14 of 17 tool_call rows despite all 17 tool handlers returning successfully. The set of dropped tools differs between runs — `oddkit_get` and `oddkit_validate` on main preview, `oddkit_validate` and `oddkit_preflight` on prod — ruling out per-tool wrapper attachment as the cause. Re-firing dropped calls produces emissions. The pattern matches a `writeDataPoint` flush race tied to Cloudflare Workers isolate lifecycle, where the AE enqueue is lost when the SSE response closes the isolate before the asynchronous flush completes. The fix is wrapping the wrapper's emit in `ctx.waitUntil`.

---

## Summary — Same Wrapper, Same Handlers, Variable Emission Loss

The per-tool `withTelemetry` wrapper introduced in `klappy/oddkit#157` closed the 27% wire-edge coverage gap quantified in `klappy://canon/observations/2026-05-14-telemetry-coverage-gap-quantified`. Smoke verification against the new wrapper (per `klappy://canon/constraints/telemetry-validation-gate`) confirms two facts at once:

The wrapper measures accurately. Every emitted `bytes_in` matches the no-space JSON of the smoke driver's args object byte-for-byte. Token counts are non-zero and consistent with `cl100k_base` shape (roughly bytes/4 for English/JSON-shaped content). `bytes_out` on SSE-framed responses is non-zero — the in-memory measurement defeats the wire-edge SSE race that motivated the wrapper.

The wrapper also drops rows non-deterministically. Two independent smoke passes against the same wrapper code at version 0.28.0 each produced telemetry rows for only 14 of 17 tools that returned successful responses. The dropped tools differed between runs. Re-firing the dropped calls produced emissions on retry. The handlers themselves completed correctly in every case (verified via `debug.trace` spans in the response envelopes).

The most parsimonious explanation: `env.ODDKIT_TELEMETRY.writeDataPoint()` is non-blocking and flushes asynchronously, and the Cloudflare Workers isolate is recycled or the response stream is closed before the flush completes for the affected calls. SSE responses extend the connection lifecycle in ways that can interact unpredictably with the AE write queue.

The fix is wrapping the emit in `ctx.waitUntil()`. The wrapper already swallows emit failures per the Emission Contract Rule 4; `ctx.waitUntil` only changes the lifecycle, not the error semantics.

---

## Smoke Evidence

Both passes used the same 17-tool harness against `https://main-oddkit.klappy.workers.dev/mcp` and `https://oddkit.klappy.dev/mcp` respectively, identifying as consumer `oddkit-smoke`.

### Main preview pass — 2026-05-16 00:30Z

Successful handlers (200 OK with valid SSE response): 16.
Emitted telemetry rows: 14.
Dropped: `oddkit_get`, `oddkit_validate`. Both re-emitted as `oddkit-smoke-retry` when called again.
Hung handler (no emission expected): `oddkit_cleanup_storage`.

### Prod pass — 2026-05-16 01:12Z

Successful handlers: 16.
Emitted telemetry rows: 14.
Dropped: `oddkit_validate`, `oddkit_preflight`.
Hung handler: `oddkit_cleanup_storage`.

### What this rules out

The dropped sets do not align with any wrapper-attachment hypothesis. `oddkit_get` dropped on main preview but emitted on prod. `oddkit_preflight` emitted on main preview but dropped on prod. `oddkit_validate` dropped on both. All three tools are registered through the same `individualTools` loop in `workers/src/index.ts` that wraps every entry identically with `withTelemetry(tool.name, async (args) => {...})`. If the wrapper were missing for any of these, it would miss on both surfaces and on retries. It does not.

The dropped sets also rule out tokenizer failure as a cause, since `countTokensSafe` returns `null` on failure and the wrapper emits zero in that case rather than dropping the entire row. The rows simply do not exist.

---

## Suggested Fix

In `workers/src/telemetry.ts`, the `withTelemetry` wrapper's emission call is currently:

```typescript
try {
  await emitWrapperTelemetry({...});
} catch {
  // Swallow per Emission Contract Rule 4
}
```

The proposed change is to extend the isolate lifecycle for the duration of the flush:

```typescript
ctx.waitUntil(
  emitWrapperTelemetry({...}).catch(() => { /* swallow per Rule 4 */ })
);
```

This requires plumbing `ExecutionContext` through `makeToolWrapper` alongside the existing `env`, `request`, and `capturedClientInfo` parameters. The MCP request handler in `workers/src/index.ts` already has access to `ctx` at the worker-edge fetch handler scope.

The change is structurally small. It is not a wrapper-architecture rework — the in-memory measurement, registration-site wrapping, per-call granularity, and failure-swallow semantics all remain unchanged.

---

## Not a Promotion Blocker

PR `klappy/oddkit#157` (wrapper introduction) and `klappy/oddkit#162` (`main → prod` promotion) are already shipped to production. The wrapper works on most calls and the residual drop rate is strictly better than the pre-wrapper 27% wire-edge gap that motivated the redesign. Per `klappy://canon/constraints/telemetry-validation-gate`, the smoke gate's primary purpose was satisfied: wrapper attached on every registration, numbers accurate when emitted.

This observation exists to document the residual gap and motivate the follow-up fix, not to block any shipped work.

---

## See Also

- `klappy://canon/constraints/telemetry-validation-gate` — the gate this observation closes a Wait verdict on
- `klappy://canon/constraints/telemetry-governance` §Emission Contract Rule 4 — failure-swallow semantics
- `klappy://canon/observations/2026-05-14-telemetry-coverage-gap-quantified` — the original wire-edge coverage gap the wrapper closed
- `klappy://canon/decisions/DR-20260514-0001-telemetry-wrapper-pattern` — the wrapper-pattern decision record
