---
title: "MCP Tool Surface Ceiling — Three Tools by Default, Four at Most"
kind: canon
tier: 1
status: proposed
date: 2026-09-02
audience: [builders, agents]
tags: [mcp, constraints, tool-surface, vodka-architecture]
see_also:
  - klappy://canon/methods/reframe-before-trimming
  - klappy://canon/patterns/docs-proxy-canon-as-tool
  - klappy://docs/promotions/P0006-vodka-boundary-enumeration-as-spec-convention
  - klappy://canon/principles/mcp-as-universal-interface
---

# MCP Tool Surface Ceiling — Three Tools by Default, Four at Most

> An MCP server exposes at most four tools, and by default three: `docs` (the
> server explains itself and its domain, live), `execute` (one verb that routes
> to the capability underneath — an API, a CLI, a schema), and `telemetry` (the
> same numbers the maintainer sees). A fourth tool needs a written reason. A
> fifth is a frame error, not a feature.

## WHAT — The Rule, Precisely

1. **Default surface is three.** `docs`, `execute`, `telemetry`. Names may vary
   by domain; roles may not.
2. **Ceiling is four.** The fourth tool is admitted only when a written reason
   in the server's spec says why `execute` cannot carry it.
3. **The underlying capability's breadth lives in `execute`'s parameters and
   in `docs`, never in the tool list.** A 300-endpoint API is one `execute`
   tool with a `path`, a `method`, and a `body` — and a `docs` tool that serves
   the live reference so the caller can find the path.
4. **`docs` serves live documentation**, fetched at call time from the source
   of truth (the upstream API's own reference, the sibling canon), never a
   bundled snapshot that can rot.

## WHY — Rationale and the Motivating Failure

Tool lists are the agent's first read of a server. Every tool is a decision the
caller has to make before doing anything, and a decision the model has to hold
in context for the whole session. Servers that mirror an upstream API's
endpoint list one-tool-per-endpoint push the upstream's whole shape into the
model's working set — seventeen domain-leaking tools where six clean ones did
the same work (`klappy://writings/reverse-engineer-the-future`). The failure is
not the count; it is the frame the count implies
(`klappy://canon/methods/reframe-before-trimming`). Fixing the frame to
"explain, act, observe" makes the trim mechanical.

## ENFORCEMENT — The Named Enforcer, Honestly Graded

Spec review. A server spec that lists more than four tools is returned with
this constraint cited. Grade: **advisory at PR time**, because nothing
mechanical counts tools yet. Promotion to a mechanical gate is queued, not
promised.

## SCOPE — The Governed Surface

Every MCP server published under a klappy.dev namespace or built under
vodka-architecture. Adopters outside this house are invited, not bound.

## VERIFICATION — How Compliance Is Proven

`tools/list` on the deployed server returns ≤ 4 entries. The spec's vodka
boundary sections ("knows / does not know / is NOT") exist and are consistent
with the tool list.

## Failure Modes

- **Endpoint mirroring.** One tool per upstream route. Response: collapse into
  `execute` + `docs`.
- **Docs as a bundle.** A `docs` tool serving a snapshot copied at build time.
  Response: fetch live; cache with a TTL you can name.
- **Fourth tool without a reason.** Response: the reason goes in the spec or
  the tool goes into `execute`.

## When This Does Not Apply

A server whose upstream has no coherent "execute" verb — pure event streams,
pure storage — may argue for a different trio. The argument is still written.

## See Also

`klappy://canon/methods/reframe-before-trimming` ·
`klappy://canon/patterns/docs-proxy-canon-as-tool` ·
`klappy://canon/principles/mcp-as-universal-interface` ·
`klappy://docs/promotions/P0006-vodka-boundary-enumeration-as-spec-convention`
