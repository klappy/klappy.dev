---
uri: klappy://canon/constraints/telemetry-validation-gate
title: "Telemetry Validation Gate — Smoke Every Tool, Verify Every Number"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["canon", "constraint", "telemetry", "validation", "smoke-test", "wrapper-correctness", "release-pipeline", "analytics-engine"]
epoch: E0008
date: 2026-05-15
derives_from: "canon/constraints/telemetry-governance.md, canon/constraints/release-validation-gate.md, canon/observations/performed-prudence-anti-pattern.md"
complements: "canon/decisions/DR-20260514-0001-telemetry-wrapper-pattern.md, canon/observations/2026-05-14-telemetry-coverage-gap-quantified.md"
governs: "Every release that touches the telemetry Emission Contract surface in oddkit and TruthKit"
status: active
---

# Telemetry Validation Gate — Smoke Every Tool, Verify Every Number

> The Emission Contract requires every registered tool to emit accurate metered usage on every call. Verifying it is one smoke pass per surface: hit every tool, compare the emitted `bytes_in`, `bytes_out`, `tokens_in`, `tokens_out` against the request and response that were actually sent. If the numbers match expectations within tokenizer noise (3–4% for `cl100k_base`), the wrapper is working. There is no soak period, no organic-load threshold, no statistical sample bar. Synthetic traffic is the only traffic; the wrapper is deterministic; one call per tool is sufficient.

---

## Summary — Stop Pretending Sample Size Buys Confidence

oddkit's hosted service does not see enterprise-scale organic traffic. Real consumers number in the low single digits at any given moment, and most of those are the maintainer themselves. A validation model built around "wait for 24 hours of organic load and check per-tool coverage at 95%" is performed prudence — it inflates statistical ceremony around a question that does not need statistics to answer.

The actual question is: does the per-tool wrapper emit the correct metered values when a known payload passes through it? That question is deterministic. The wrapper is code. Either it reads the JSON-stringified args and envelope, runs `cl100k_base` over them, and writes the result to Analytics Engine — or it doesn't. One call with a known input and known output answers the question completely.

The gate is therefore: drive a synthetic smoke pass across every registered tool on every active deployment surface (main preview and prod after promotion). For each call, compare the emitted numeric fields against what the smoke driver actually sent and received. Tokenizer noise of 3–4% for English-prose payloads is the only legitimate variance; anything else is a bug.

Sample size is one per tool per surface. Increase it for operator margin if desired, but the canon bar is one. There is no time bound. There is no organic-load requirement. If the smoke pass shows accurate numbers across every tool, the wrapper is verified.

---

## The Gate

**When:** After any PR touching `withTelemetry`, tool registration, or the emission envelope is deployed to a surface — main preview after merge to `main`, or prod after the `main → prod` promotion. Run the gate against each surface the change reaches, before declaring that surface verified.

**Question it answers:** Does the wrapper emit accurate `bytes_in`, `bytes_out`, `tokens_in`, `tokens_out` for every registered tool?

**Procedure:**

1. Enumerate every `server.tool()` registration in `workers/src/index.ts`. This is the smoke target list.
2. Drive one synthetic call per tool through the surface's `/mcp` endpoint. Record the exact `args` object sent (the JSON-RPC `params.arguments` payload) and the exact `{ content: [...] }` envelope returned by the handler — not the full HTTP request/response bodies, which include JSON-RPC framing the wrapper does not see.
3. For each call, compute the expected values locally against the same in-memory values the wrapper measures per `klappy://canon/constraints/telemetry-governance` Rule 2: `bytes_in = utf8_byte_length(JSON.stringify(args))`, `bytes_out = utf8_byte_length(JSON.stringify(content_envelope))`, `tokens_in = cl100k_count(JSON.stringify(args))`, `tokens_out = cl100k_count(JSON.stringify(content_envelope))`. For SSE-streamed responses, expected `bytes_out = 0` and `tokens_out = 0` per the Emission Contract.
4. Query `oddkit_telemetry` with `event_type = 'tool_call'`, `worker_version = <surface-version>`, and a timestamp window covering the smoke run.
5. Match each emitted row to the corresponding smoke call (by tool name and timing). Compare emitted versus expected on all four fields.

**Pass:** Every registered tool appears in the telemetry dataset, and every emitted numeric field is within tokenizer noise (±5%) of the expected value computed locally.

**Fail (missing tool):** Any registered tool is absent from the dataset after smoke. The wrapper is not attached to that registration. Block downstream work on this surface; fix forward.

**Fail (wrong number):** Any emitted field is off by more than the noise floor. The wrapper is attached but emission is inaccurate. Investigate; fix; re-smoke.

**Sample threshold:** One call per tool per surface is sufficient. The wrapper is deterministic; a second call with the same input emits the same output. Higher sample counts are operator discretion for cutover margin, not canon requirement.

---

## Why No Time Bound

oddkit's hosted service receives sparse, mostly maintainer-driven traffic. "Wait 24 hours and check organic coverage" is a pattern borrowed from systems where organic traffic actually fills the sample space. Here it does not. A 24-hour window after promotion produces a dataset dominated by maintainer test calls and a handful of synthetic probes — the same data the smoke pass produces immediately, just delayed.

Time bounds are appropriate for systems where the question is whether the wrapper behaves correctly under unforeseen load patterns the operator cannot manufacture — a real concern for services running thousands of QPS across heterogeneous clients. oddkit answers a smaller question: do the numbers come out right for the payloads we send? That is fully answered by deliberate exercise.

Removing the time bound also removes a class of failure mode: orchestrators waiting passively for a soak window to mature, mistaking elapsed time for validation work. The smoke pass is active verification with a definite endpoint.

---

## Why Synthetic Is Enough

The Emission Contract specifies in-memory measurement after Zod validation and before MCP transport framing. The wrapper does not care whether the call originated from a manufactured smoke probe or a real consumer; it sees the same `args` object and the same `{ content: [...] }` envelope. Synthetic and organic traffic produce identical telemetry rows when the payload sizes match.

Synthetic traffic has an additional advantage that organic does not: the smoke driver knows the exact request and response bytes locally. Organic traffic only produces emitted values in the dataset; the ground truth is not directly observable. Verification against organic load is necessarily a sanity check against expected ranges, not against known values. The smoke pass is the stricter test.

---

## Cross-Surface Coverage

The wrapper deploys to whichever surface receives the code. Currently that is two surfaces:

- **Main preview** at `https://main-oddkit.klappy.workers.dev/mcp` — auto-deployed by Cloudflare on every merge to `main` in `klappy/oddkit`.
- **Production** at `https://oddkit.klappy.dev/mcp` — deployed when the `main → prod` promotion PR merges.

Each surface must be smoke-verified independently. Verifying main preview does not verify prod; the surfaces run independent worker versions and could in principle diverge.

When the program adds TruthKit or any other oddkit-pattern MCP server, the same gate applies to each of those surfaces.

---

## Relationship to release-validation-gate Rule 2

`klappy://canon/constraints/release-validation-gate` Rule 2 requires fresh-context validator dispatch on promotion PRs that touch load-bearing surface. "Load-bearing surface" is defined there by response-envelope changes, new or removed tool registrations, governance file reads, matcher algorithm changes, and `workers/src/orchestrate.ts` modifications. The telemetry wrapper does not change any of these — callers observe identical responses; no tools are added or removed; no governance reads change.

A wrapper change is therefore arguably outside Rule 2's trigger. The orchestrator may smoke-verify directly per this gate without dispatching a fresh-context validator, provided the smoke pass shows accurate numbers across every tool on every surface.

If a future wrapper change *does* touch load-bearing surface (for example, exposing new envelope fields to callers), Rule 2 fires in addition to this gate, and both must be satisfied.

---

## Receipts

- `klappy://canon/observations/2026-05-14-telemetry-coverage-gap-quantified` — the diagnostic that motivated the Emission Contract and exposed how prior time-bound validation hid the actual coverage problem.
- `klappy://canon/decisions/DR-20260514-0001-telemetry-wrapper-pattern` — decision record for the wrapper architecture this gate verifies.
- `klappy://canon/observations/performed-prudence-anti-pattern` — the failure mode this gate is structured to avoid (statistical ceremony around a deterministic question).
- `klappy://odd/handoffs/2026-05-14-telemetry-coverage-completeness` — original handoff whose "24-hour soak" framing this canon supersedes.

---

## See Also

- `klappy://canon/constraints/telemetry-governance` — the Emission Contract this gate verifies.
- `klappy://canon/constraints/release-validation-gate` — separate constraint covering promotion-PR fresh-context review.
- `klappy://canon/constraints/measure-before-you-object` — the methodology that argues against theoretical objections to empirical answers; applies here against statistical-threshold arguments to deterministic questions.
