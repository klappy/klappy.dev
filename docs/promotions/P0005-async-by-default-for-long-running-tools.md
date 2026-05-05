---
uri: klappy://docs/promotions/P0005-async-by-default-for-long-running-tools
title: "P0005: Async by Default — Long-Running MCP Tools Return an Identifier, Never Block"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["promotions", "accepted", "mcp-server", "async", "long-running", "job-id", "polling", "latency"]
promotion_status: accepted
---

# P0005: Async by Default — Long-Running MCP Tools Return an Identifier, Never Block

> Any MCP tool whose work could exceed ~5 seconds wall-clock returns an identifier within that budget and places the long-running work behind a separate read tool. No tool blocks for the duration of work.

## Observed Pattern

MCP servers in this program ship tools that wrap potentially-long-running work — typesetting jobs (30+ minutes worst case), large message sends, fanout retrieval. Without an explicit async convention, every server reasons through the same problem from scratch — platform timeouts (Workers `ctx.waitUntil`, Container `sleepAfter`), polling cadence, cancellation semantics — and arrives at the same three-tool shape: `<verb>` returns an id; `get_<verb>_status` polls; `cancel_<verb>` requests cancellation.

The pattern observed is that this is not project-specific reasoning. It is the canonical async shape for MCP work. Codifying it once means future servers read it at preflight rather than re-deriving it under time pressure.

- Affects: any MCP server with action tools whose work could exceed ~5 seconds
- Outcome without the convention: each server arrives at the same shape independently, sometimes with subtle inconsistencies (different field names, different cancellation semantics)
- Outcome with the convention: consistent shape across servers; consumers can pattern-match across any compliant server

## Evidence

| Validation Session | Date | Outcome | Notes |
| --- | --- | --- | --- |
| `klappy/PTXprint-MCP` v1.2 typesetting | 2026-Q2 | Three-tool shape adopted | `submit_typeset` returns `job_id` within seconds via `ctx.waitUntil(fetch(...))`; `get_job_status` polls; `cancel_job` flips a Durable Object flag the worker polls |
| `klappy/agent-messaging-service` hosted /mcp planning | 2026-05-03 | Same shape arrived at independently | `ams_send` returns when the wire accepts the frame, not when peers receive; `ams_recv` is the explicit poll path with a 5–10s long-poll cap per `ams://canon/constraints/mcp-wrapper-conformance-for-conversational-ai` latency budget |

**Total observations**: 2 across 2 independent server projects
**Independent occurrences**: 2 distinct repositories, with no cross-pollination of decision rationale at the time of arrival
**Affected workflows**: every long-running MCP tool implementation

## Current Handling

- **Detection today**: each server's author/agent reasons through platform constraints and arrives at the shape independently
- **Closest existing canon**: `canon/principles/partial-data-with-transparency-and-background-warm.md` (2026-04-24) covers the user-blocking-path-must-not-block-on-corpus-scan case for *read* operations. Three load-bearing properties: bounded blocking path, background warm, structured disclosure. That principle does not address long-running *action* tools (jobs that produce side effects, jobs the consumer wants to cancel mid-flight)
- **Gap**: no canon doc says "if it could take >5s, the answer is always job_id+poll+cancel, and here's why"

## Proposed Promotion

### Target Document

`canon/principles/async-by-default-for-long-running-tools.md` (new)

### Section

Whole document; new file.

### Proposed Language

```markdown
---
uri: klappy://canon/principles/async-by-default-for-long-running-tools
title: "Async by Default — Long-Running MCP Tools Return an Identifier, Never Block"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["canon", "principle", "mcp-server", "async", "long-running", "latency", "vodka-architecture"]
derives_from:
  - klappy://canon/principles/partial-data-with-transparency-and-background-warm
  - klappy://canon/principles/vodka-architecture
  - klappy://canon/values/axioms
complements:
  - klappy://canon/principles/partial-data-with-transparency-and-background-warm
status: active
---

# Async by Default — Long-Running MCP Tools Return an Identifier, Never Block

> Any MCP tool whose work could exceed ~5 seconds wall-clock returns an identifier within that budget and places the long-running work behind a separate read tool. No tool blocks for the duration of work.

## The Principle

Three minimum-viable tools result for any long-running action:

1. `<verb>(...)` — submit; returns identifier within ~5 seconds
2. `get_<verb>_status(id)` — poll; returns current state, progress, and result-when-complete
3. `cancel_<verb>(id)` — request cancellation; returns ack

Notification-style push (server-pushed events on supported transports) is additive. The polling tool remains the canonical floor so consumers on poll-only transports work too.

## Latency Budget Recommendation

- **Submission tool returns**: ≤ 1s median, ≤ 5s p99
- **Status read tool returns**: ≤ 1s median (state read, never reaches the worker that does the work)
- **Notification delivery (when present)**: ≤ 1s median, ≤ 5s p99
- **Long-poll fallback**: ≤ 5s p99 round-trip

## Failure Mode — Blocking the Consumer

A tool that blocks for 30 minutes ties up the consumer's MCP session, hides progress, breaks cancellation, and forces every consumer host to implement timeout/retry around it. Returning an identifier immediately keeps the wire predictable and the consumer in control of when to ask for results.

The shape also keeps the *server* in control of how long the work continues if the consumer disconnects. With a blocking tool, the work dies on disconnect; with the async shape, the work continues, the cache populates, and the next consumer's request finds the result without re-running the work.

## Relationship to Adjacent Canon

`canon/principles/partial-data-with-transparency-and-background-warm` is the read-side complement: the user-blocking *read* path must not block on a corpus scan; return what's already observed, schedule the rest in the background, disclose what's missing. This principle is the action-side: the user-blocking *action* path must not block for the duration of the work; return an identifier, expose poll+cancel, let the consumer drive their own attention.

Both principles share the underlying axiom: the consumer's blocking time is a budget the substrate must spend frugally.

## Receipts

- **PTXprint-MCP v1.2 typesetting.** `submit_typeset` / `get_job_status` / `cancel_job` triad. Worker → `ctx.waitUntil(fetch())` → Container → DO state. 30-minute jobs do not block the consumer's MCP session at any point.
- **AMS hosted /mcp.** `ams_send` returns on wire-accept, not peer-receive. `ams_recv` is the explicit poll path with a 5–10s long-poll cap. `ams_leave` is the cancellation path. Same shape.
- *(Future receipts: each compliant server adds one row — server, action tool, status tool, cancel tool, observed median submit latency.)*
```

### Rationale

The shape is the same in both server projects despite no cross-pollination. That convergence is the signal that this is the canonical pattern. Without canon, every future server's planning session re-derives it. With canon, preflight surfaces it.

The principle is distinct from `partial-data-with-transparency-and-background-warm`: that doc is about *read-side* corpus scans (return partial, warm in background); this doc is about *action-side* long-running work (return id, poll for completion). Both belong; they are complementary, not duplicative.

## Risk Assessment

| Risk Level | Description |
| --- | --- |
| **Low** | **Clarifies existing rule, no scope change** |
| Medium | Adds new requirement, may affect workflows |
| High | Changes existing behavior, requires migration |

**Risk level**: Low

**Mitigation**: The principle is implementation guidance, not enforcement. Existing tools that block ≤5s are unaffected. New tools that may exceed 5s gain a named pattern to follow. Adoption can be incremental.

## Status

`accepted` (2026-05-05)

## Review Notes

- **Reviewer**: klappy (operator)
- **Decision**: `accepted`
- **Date**: 2026-05-05
- **Notes**: Last of the 8-proposal sweep (P0001 + P0003–P0009 behind the just-merged P0002 chain). Created `canon/principles/async-by-default-for-long-running-tools.md` as a tier-2 principle doc. Action-side complement to `partial-data-with-transparency-and-background-warm` (which is the read-side rule). Codifies the three-tool triad (`<verb>`, `get_<verb>_status`, `cancel_<verb>`) and the four latency budgets. Receipts: PTXprint v1.2 typesetting + AMS hosted /mcp.

## Execution Record

(To be filled after acceptance)

- **Commit**:
- **Canon doc updated**: `canon/principles/async-by-default-for-long-running-tools.md`
- **Backlink added**: Yes / No
