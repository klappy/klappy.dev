---
uri: klappy://docs/promotions/P0004-docs-proxy-canon-as-tool
title: "P0004: Docs Proxy — Canon-as-Tool So Consumers Wire One MCP, Not Two"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["promotions", "proposed", "mcp-server", "docs-proxy", "canon", "vodka-architecture", "consumer-experience"]
promotion_status: proposed
---

# P0004: Docs Proxy — Canon-as-Tool So Consumers Wire One MCP, Not Two

> An MCP server that depends on a sibling canon repo for its domain knowledge SHOULD expose a `docs(query, ...)` tool that proxies the canon-server (oddkit), parameterized to its own repo. Consumers get both action tools and canon retrieval through one MCP wiring.

## Observed Pattern

Multiple MCP servers in this program depend on a sibling canon repo for governance and domain knowledge. Without intervention, every consumer of those servers must wire two MCPs to get the full surface: the action server, and the canon server (oddkit) configured with the action server's repo as `knowledge_base_url`.

The wire-two-MCPs tax is paid by every consumer, every time. Some consumers pay it; many do not. Those who do not pay it lose access to live canon at exactly the moment they need it most — mid-task, in-flow — and either abandon the canon-as-living-context value proposition or fall back to opening the canon repo's GitHub web UI.

The pattern observed is that one server-side decision — exposing a thin `docs` proxy tool that POSTs to the canon-server with the action server's repo URL — eliminates the tax for every current and future consumer.

- Affects: every consumer of every MCP server with a sibling canon repo
- Outcome without the tool: per-consumer onboarding friction; reduced canon-in-the-loop usage; canon drifts from living context to web-search-of-last-resort
- Outcome with the tool: one MCP wired, both surfaces accessible, canon stays in-flow

## Evidence

| Validation Session | Date | Outcome | Notes |
| --- | --- | --- | --- |
| `klappy/PTXprint-MCP` v1.0 D-004 | 2026-Q1 | "No retrieval in MCP server" — original decision | Server boundary kept thin; consumers expected to wire oddkit separately |
| `klappy/PTXprint-MCP` v1.2 session 13 | 2026-04-29 | Decision reversed; `docs(query, audience?, depth?)` added as 4th tool | Reversal rationale recorded in v1.2 spec: downstream agents (e.g., BT Servant) want one MCP, not two; vodka boundary preserved (the proxy holds zero domain semantics) |
| `klappy/agent-messaging-service` hosted /mcp planning | 2026-05-03 | Same gap re-identified | A Claude Desktop user wiring AMS-MCP today must also wire oddkit-MCP with `knowledge_base_url=agent-messaging-service` to get `ams://canon/...` retrieval. An `ams_docs` tool would absorb the tax once, server-side |

**Total observations**: 3 across 2 independent server projects
**Independent occurrences**: 2 distinct repositories, with the second project re-encountering the question without prior knowledge of the first project's resolution
**Affected workflows**: every consumer onboarding path for every oddkit-pattern MCP server in this program

## Current Handling

- **Detection today**: per-consumer friction is silent — operators notice it when they themselves try to onboard a new agent and discover they need to wire two MCPs
- **Workaround today**: consumers either accept the two-MCP tax or skip canon-in-flow entirely
- **Closest existing canon**: `canon/principles/consistency-same-pattern-every-time.md` says "the server behaves identically regardless of what knowledge base it serves" — that is the *same-server-many-knowledge-bases* axis. This promotion addresses the orthogonal axis: *many-servers-one-knowledge-base, single consumer wiring*. Both axes deserve coverage

## Proposed Promotion

### Target Document

`canon/patterns/docs-proxy-canon-as-tool.md` (new)

### Section

Whole document; new file.

### Proposed Language

```markdown
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
```

### Rationale

The pattern's content has been independently re-derived in two server projects within ~6 weeks of each other. The cost of writing it once into canon is small; the cost of letting every future server's session re-derive it is paid every time. This is the `dry-canon-says-it-once` shape — say it once at canon, every future server reads it at preflight.

The placement under `canon/patterns/` rather than `canon/principles/` is deliberate. This is a concrete server-implementation pattern (specific tool shape, specific call mechanics), not a structural claim. `canon/patterns/` does not currently exist as a directory in the canon tree; this would establish it. If reviewers prefer to keep the directory namespace tighter, the document can land under `canon/methods/` instead with no content change.

## Risk Assessment

| Risk Level | Description |
| --- | --- |
| **Low** | **Clarifies existing rule, no scope change** |
| Medium | Adds new requirement, may affect workflows |
| High | Changes existing behavior, requires migration |

**Risk level**: Low

**Mitigation**: The pattern is opt-in for each server. Servers that do not depend on a sibling canon repo (none today, but hypothetical) need not adopt it. Adoption is per-server, gradual, additive.

## Status

`proposed`

## Review Notes

(To be filled during review)

- **Reviewer**:
- **Decision**:
- **Date**:
- **Notes**:

## Execution Record

(To be filled after acceptance)

- **Commit**:
- **Canon doc updated**: `canon/patterns/docs-proxy-canon-as-tool.md` (or `canon/methods/...` if directory placement is reconsidered)
- **Backlink added**: Yes / No
