---
uri: klappy://canon/patterns/docs-proxy-canon-as-tool
title: "Docs Proxy — Canon-as-Tool So Consumers Wire One MCP"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["canon", "pattern", "mcp-server", "docs-proxy", "consumer-experience", "vodka-architecture"]
derives_from:
  - klappy://canon/principles/vodka-architecture
  - klappy://canon/principles/consistency-same-pattern-every-time
  - klappy://canon/principles/dry-canon-says-it-once
complements:
  - klappy://canon/principles/doing-less-enables-more
status: active
---

# Docs Proxy — Canon-as-Tool

> An MCP server whose action surface depends on a sibling canon repo for domain semantics SHOULD expose a `docs(query, audience?, depth?)` tool that proxies the canon-server (oddkit), parameterized to its own repo. Consumers get both surfaces through one MCP wiring.

## The Pattern

The action MCP server adds one tool — typically named `docs` or `<server>_docs` — whose entire job is to forward queries to the canon-server with the action server's own repo URL pinned as the `knowledge_base_url` parameter.

- **Inputs**: `query` (required), `audience` (optional, server-defined enum), `depth` (optional `1|2|3` — snippet, full top doc, top + next two)
- **Returns**: `{ answer, sources[], deeper[], governance_source }`
- **Failure**: graceful degradation when the canon-server is unreachable — `{ answer: null, sources: [], governance_source: "minimal", error }` rather than a hard error that blocks consumer flow

## Vodka Check the Tool Must Pass

The proxy tool knows exactly two URLs: this server's canon repo and the canon-server's MCP endpoint. It holds zero domain semantics. It does not parse, rank, filter, score, or reframe results. It is a pinned forwarding layer.

If the proxy ever grows a domain-flavored taxonomy or a scoring tweak, that taxonomy moves into governance documents in the canon repo (which the canon-server retrieves through the same proxy), not into the tool's implementation. Domain logic in the proxy is a vodka-boundary leak.

## Why the Pattern Exists

Without the pattern, every consumer pays a wire-two-MCPs tax: one MCP for actions, a second MCP for canon retrieval, configured with the action server's repo as `knowledge_base_url`. Consumers who do not pay the tax lose canon-in-flow access at the moment they need it most. The pattern absorbs the tax once, server-side, for every present and future consumer.

This pattern is orthogonal to `canon/principles/consistency-same-pattern-every-time`, which covers the *same-server-many-knowledge-bases* axis. This pattern covers *many-servers-one-knowledge-base*. Both are real; both deserve canon coverage.

## Failure Mode

Without this pattern: per-consumer onboarding friction; canon drifts from living context to web-search-of-last-resort; the canon-as-living-context value proposition silently degrades because consumers never wire it.

With the pattern: one MCP wired, both surfaces accessible; canon stays in-flow as designed.

## Receipts

- **PTXprint-MCP v1.2 §3 `docs` tool.** Added in session 13 (2026-04-29), reversing v1.0's "no retrieval in MCP server" decision with explicit rationale: downstream agents like BT Servant want one MCP wiring. Vodka boundary preserved.
- *(Future receipts: each server adopting the pattern adds one row — server, tool name, date adopted, link to spec section.)*
