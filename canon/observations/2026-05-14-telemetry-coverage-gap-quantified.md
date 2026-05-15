---
uri: klappy://canon/observations/2026-05-14-telemetry-coverage-gap-quantified
title: "Observation — Telemetry Coverage Gap Quantified (27%, Heavy-Response Bias)"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["canon", "observation", "diagnostic", "telemetry", "coverage", "instrumentation-gap", "reproducible-analysis", "epoch-8"]
epoch: E0008
date: 2026-05-14
status: active
derives_from: "workers/src/index.ts, workers/src/telemetry.ts, workers/src/tokenize.ts"
complements: "odd/handoffs/2026-05-14-telemetry-coverage-completeness.md, canon/decisions/DR-20260514-0001-telemetry-wrapper-pattern.md"
governs: "Diagnostic baseline for telemetry coverage; cutover boundary marker"
---

# Observation — Telemetry Coverage Gap Quantified (27%, Heavy-Response Bias)

> Diagnostic record for the telemetry coverage gap that motivated PR 1 (canon) and PR 2 (code) under Phase 1 of the paid-tier observability work. 27% of `event_type='tool_call'` rows over the past 30 days carry zero shape (`bytes_in`, `bytes_out`, `tokens_in`, `tokens_out` all zero). Three confirmed root causes in `workers/src/index.ts:1000-1071` and `workers/src/telemetry.ts:269-275`. This observation is the receipts behind the decision recorded in `DR-20260514-0001-telemetry-wrapper-pattern`. It also marks the cutover date as a data-accuracy boundary for anyone running historical analysis.

---

## Summary — What the Data Said When Queried Directly

A user-facing question about token usage per consumer surfaced an instrumentation gap that prior session memory had recorded as roughly 5% missing coverage. Direct query against `oddkit_telemetry` showed the actual gap is 27%: 7,106 of 26,228 `tool_call` rows over a 30-day window carry zero `bytes_in`, zero `bytes_out`, zero `tokens_in`, and zero `tokens_out`. The four shape columns are perfectly correlated: when one is zero, all four are zero. This rules out per-direction tokenizer failure and points to the recording path itself either being skipped entirely or running with empty inputs on both sides. The gap is biased toward heavy-response tools — `oddkit_challenge` is 79% missing, `oddkit_gate` 75%, `oddkit_encode` 73%, `telemetry_policy` 93%, while `telemetry_public` is only 1.5% missing. The heaviest tools are the most invisible, which is the opposite of what billable observability requires. Three root causes were verified against the worker source: a streaming-response race in `ctx.waitUntil`, dispatcher-bypass for two inline tool handlers, and a documented batch-attribution fiction in the recording function. This observation records the data, the queries that produced it, and the code lines that explain it, so the analysis is reproducible by any reader.

---

## The Numbers (Past 30 Days)

**Aggregate coverage.**

| Metric | Value |
|--------|------:|
| Total `tool_call` rows | 26,228 |
| Rows with non-zero `bytes_in` | 19,122 |
| Rows with non-zero `tokens_in` | 19,122 |
| Rows with non-zero `bytes_out` | 19,016 |
| Rows with non-zero `tokens_out` | 19,016 |
| Coverage rate (non-zero shape) | 73% |
| Missing rate (zero shape) | **27%** |

The `bytes_in`/`tokens_in` numerator (19,122) is identical, and the `bytes_out`/`tokens_out` numerator (19,016) is identical. The small difference between in and out (106 rows) is the only direction-specific signal — it represents rows where the request body was measured but the response body was not. The dominant pattern is correlated-zero: 7,106 rows where all four columns are zero.

**Per-tool distribution.**

| Tool | Total | With `bytes_in` | Missing | Missing % |
|------|------:|----------------:|--------:|----------:|
| oddkit_challenge | 2,379 | 495 | 1,884 | **79%** |
| oddkit_gate | 1,101 | 276 | 825 | **75%** |
| oddkit_encode | 976 | 264 | 712 | **73%** |
| oddkit (router) | 3,182 | 2,186 | 996 | 31% |
| oddkit_search | 3,309 | 2,601 | 708 | 21% |
| oddkit_catalog | 2,685 | 2,218 | 467 | 17% |
| oddkit_time | 1,428 | 983 | 445 | 31% |
| telemetry_policy | 250 | 17 | 233 | **93%** |
| oddkit_get | 1,290 | 1,073 | 217 | 17% |
| oddkit_validate | 381 | 170 | 211 | 55% |
| telemetry_public | 8,160 | 8,035 | 125 | **1.5%** |
| oddkit_orient | 282 | 158 | 124 | 44% |
| oddkit_version | 98 | 61 | 37 | 38% |
| oddkit_preflight | 112 | 85 | 27 | 24% |

The pattern: streaming-response-heavy tools (`oddkit_challenge`, `oddkit_gate`, `oddkit_encode`) lose the most. SQL-result-shaped responses (`telemetry_public`) lose almost none. This is consistent with the SSE streaming-response race hypothesis below.

---

## Reproducible Queries

Run these against `oddkit_telemetry` via the `telemetry_public` tool. They are the same queries used to produce the tables above.

**Aggregate coverage:**

```sql
SELECT
  SUM(_sample_interval) AS total_calls,
  SUM(IF(bytes_in > 0, _sample_interval, 0)) AS calls_with_bytes_in,
  SUM(IF(tokens_in > 0, _sample_interval, 0)) AS calls_with_tokens_in,
  SUM(IF(bytes_out > 0, _sample_interval, 0)) AS calls_with_bytes_out,
  SUM(IF(tokens_out > 0, _sample_interval, 0)) AS calls_with_tokens_out
FROM oddkit_telemetry
WHERE timestamp > NOW() - INTERVAL '30' DAY
  AND event_type = 'tool_call'
```

**Per-tool coverage:**

```sql
SELECT
  method,
  tool_name,
  SUM(_sample_interval) AS total,
  SUM(IF(bytes_in > 0, _sample_interval, 0)) AS instrumented,
  SUM(IF(bytes_in = 0, _sample_interval, 0)) AS missing
FROM oddkit_telemetry
WHERE timestamp > NOW() - INTERVAL '30' DAY
  AND event_type = 'tool_call'
GROUP BY method, tool_name
ORDER BY missing DESC
LIMIT 15
```

---

## Three Confirmed Root Causes

### Cause 1 — Streaming-Response Race (`workers/src/index.ts:1042-1066`)

The wire-edge handler clones the response synchronously and reads `responseClone.text()` inside `ctx.waitUntil`. The MCP handler returns Streamable HTTP (SSE), and `await handler(...)` resolves with the Response object before the tool handler closure has finished writing the body. The fix attempt in PR #138 added `ctx.waitUntil` to wait for body drain, but the race re-surfaces when:

- The SSE stream errors mid-body.
- The worker context unwinds before the body fully drains.
- The response body uses keep-alive frames that error on text decoding.

When any of these happens, `responseText` is `""`, the swallowed `catch` at line 1067 silently writes shape zeros, and `bytes_in`/`bytes_out`/`tokens_in`/`tokens_out` all record zero. The heavier the response, the more likely. This is why `oddkit_challenge` (79% missing) is the worst — it returns the largest SSE bodies in the corpus.

### Cause 2 — Dispatcher Bypass (`workers/src/index.ts:469-573` and `575+`)

`telemetry_public` and `telemetry_policy` register their handlers inline in `createServer` and build their response envelopes directly. They do not route through `handleUnifiedAction`. The wire-edge instrumentation block still fires for them, so they get the same race exposure as everything else — `telemetry_policy` is 93% missing because its short responses are most often empty by the time `responseClone.text()` reads. Any fix that instruments only `handleUnifiedAction` (one of the alternatives considered in the DR) would leave these two tools permanently un-instrumented.

### Cause 3 — Batch Attribution Fiction (`workers/src/telemetry.ts:269-275`)

The `recordTelemetry` function explicitly attributes the full HTTP payload shape to every JSON-RPC message in a batch. The code comment is direct: *"for batches we attribute the full payload shape to each message rather than fabricating a split."* For obs this is imprecise. For billing this is unacceptable — a customer who sends a five-message batch is billed five times the actual payload. Per-tool-call accuracy is impossible from the wire edge because the wire edge sees only HTTP-level shape.

---

## Working Learning — Tagged for Graduation

**Measure HTTP-level metrics on in-memory objects, not wire-edge streams.** When a metric can be computed either at the wire edge (on serialized streams) or one layer in (on in-memory objects), prefer the in-memory path. The wire edge is subject to streaming races, per-request rather than per-operation accuracy, and batch attribution fiction. The in-memory path is exact, race-free, per-operation.

This is recorded here as a working learning, not a canon principle, per the third-recurrence rule. One case (this telemetry gap) is not enough to canonize a principle. Tag for graduation when a second case appears in any context — telemetry, tracing, audit logging, billing meter, anywhere the same wire-edge-vs-in-memory choice presents itself.

---

## Cutover Boundary — Data-Accuracy Notice

When PR 2 lands (the code change implementing the `withTelemetry` wrapper), the emission semantics change:

- **Before cutover.** One AE row per JSON-RPC message in a batch. Each row carries the full HTTP-level payload shape attributed identically to every message. Shape columns are zero on ~27% of rows due to the wire-edge race.
- **After cutover.** One AE row per `tools/call`. Each row carries that call's `args` shape on ingress and its `content` shape on egress. Shape columns are non-zero by gate (≥95% per-tool floor). Aggregate ≥99% expected.

Anyone running historical analysis across the cutover date must treat it as a data-accuracy boundary. Trend lines computed across the boundary mix two different units of measurement. The cutover date will be recorded at the top of this document once PR 2 promotes to prod. Analytics Engine retention is 3 months, so the discontinuity ages out naturally — by August 2026, all queryable data uses the post-cutover semantics.

---

## See Also

- `klappy://odd/handoffs/2026-05-14-telemetry-coverage-completeness` — The handoff this observation supports
- `klappy://canon/decisions/DR-20260514-0001-telemetry-wrapper-pattern` — The decision this observation justifies
- `klappy://canon/constraints/telemetry-governance` — The governance constraint that documents the emission contract
