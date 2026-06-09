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
target_repo: "oddkit"
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
