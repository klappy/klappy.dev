---
title: "MCP Tool Surface Ceiling — The Shape Scales by Risk Class; Read-Only Servers Stay at Three"
kind: canon
tier: 1
status: proposed
date: 2026-09-02
amended: 2026-09-24
audience: [builders, agents]
tags: [mcp, constraints, tool-surface, vodka-architecture]
see_also:
  - klappy://canon/methods/reframe-before-trimming
  - klappy://canon/patterns/docs-proxy-canon-as-tool
  - klappy://docs/promotions/P0006-vodka-boundary-enumeration-as-spec-convention
  - klappy://canon/principles/mcp-as-universal-interface
  - klappy://canon/meta/enforceable-policy-anatomy
  - klappy://canon/constraints/policy-precedes-build
---

# MCP Tool Surface Ceiling — The Shape Scales by Risk Class; Read-Only Servers Stay at Three

> An MCP server exposes one tool per risk class it actually has, drawn from one
> expanded shape: `docs` (the server explains itself, live) · `read` · `write`
> (reversible) · `danger` (irreversible or external, human-gated) · `telemetry`
> (the same numbers the maintainer sees). A read-only server stays at three —
> `docs`, `read`, `telemetry`. The ceiling is four: a server that needs both
> `write` and `danger` folds `telemetry` into `docs`. A fifth is a frame error.

## Amendment 2026-09-24 — risk-class shape (draft)

Source shape: 3D Review's four-tool contract, `docs` / `read` / `write` /
`danger`, each taking `{ capability, params }`, a wrong-class call answering
`WRONG_TOOL_FOR_CLASS` with the right tool named, and `danger` answering a
dry-run impact plus `confirm_token` before it executes; telemetry there is a
`docs` topic
([klappy/3d-review-cookbook@fd30520 `persona-testing/preplan-7481aa4/05-NLX-AGENT-USAGE.md`](https://github.com/klappy/3d-review-cookbook/blob/fd30520/persona-testing/preplan-7481aa4/05-NLX-AGENT-USAGE.md)).
The earlier `execute` is read as "whichever action tools the server's risk
classes need"; a single `execute` that mixes classes is the drift this amends.

Why split by risk and not by count: approval policy maps 1:1 to tools. `read`
is safe to auto-approve, so runners stop pausing; `write` carries a revert path
(an undo receipt); `danger` keeps the human gate. A server's tool list then
tells the caller its risk surface before any call.

**Telemetry folds** only when a server needs `write` and `danger` both: it
becomes `docs { topic: "telemetry" }` (the 3D Review precedent) so the list
stays at four. Everywhere else it stays its own tool. (Captain ruling pending
in kitchen `toolset-shape-audit` ASK R1; this draft states option 1.)

| server has | tools |
|---|---|
| reads only | `docs` · `read` · `telemetry` |
| reads + reversible writes | `docs` · `read` · `write` · `telemetry` |
| reads + dangerous actions | `docs` · `read` · `danger` · `telemetry` |
| all three classes | `docs` · `read` · `write` · `danger` (telemetry in `docs`) |

## WHAT — The Rule, Precisely

1. **Default surface is three.** `docs`, `read`, `telemetry` for a read-only
   server. Names may vary by domain; roles may not.
2. **One action tool per risk class present.** `write` is admitted when the
   server has reversible writes (each returns its undo); `danger` when it has
   irreversible, destructive or external effects (dry-run, then confirm).
   A capability called through the wrong class's tool is refused with the
   right tool named.
3. **Ceiling is four.** With both `write` and `danger`, `telemetry` folds into
   `docs`. Any other fourth tool needs a written reason.
4. **The underlying capability's breadth lives in the action tools'
   parameters and in `docs`, never in the tool list.** A 300-endpoint read API
   is one `read` tool with a `capability` (or `path`) and its params — and a
   `docs` tool that serves the live reference so the caller can find it.
5. **`docs` serves live documentation**, fetched at call time from the source
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
"explain, act, observe" makes the trim mechanical; splitting "act" by risk
class makes the approval policy mechanical too.

## ENFORCEMENT — The Named Enforcer, Honestly Graded

Spec review. A server spec that lists more than four tools is returned with
this constraint cited. Grade: **advisory at PR time**, because nothing
mechanical counts tools yet. Promotion to a mechanical gate is queued, not
promised.

## SCOPE — The Governed Surface

Every MCP server published under a klappy.dev namespace or built under
vodka-architecture. Adopters outside this house are invited, not bound.

## VERIFICATION — How Compliance Is Proven

`tools/list` on the deployed server returns ≤ 4 entries, one per risk class
present plus `docs` (and `telemetry` unless folded); a read-only server
returns 3. The spec's vodka
boundary sections ("knows / does not know / is NOT") exist and are consistent
with the tool list. The server's `docs()` boarding pass cites this constraint's
URI — code points back at the policy that governs it, closing the policy-first
loop (`policy-precedes-build`).

## Retraction Condition

Retract or raise the ceiling if two servers built under it each need a fifth
tool for a reason their specs document and the risk-class tools demonstrably
cannot absorb.
One such case is a spec exception; two is evidence the frame is wrong.

## Failure Modes

- **Endpoint mirroring.** One tool per upstream route. Response: collapse into
  the risk-class tools + `docs`.
- **Mixed-class door.** One `execute` that both reads and deletes. Response:
  split by class so approval can follow the tool.
- **Docs as a bundle.** A `docs` tool serving a snapshot copied at build time.
  Response: fetch live; cache with a TTL you can name.
- **Fourth tool without a reason.** Response: the reason goes in the spec or
  the tool goes into `execute`.

## When This Does Not Apply

A server whose upstream has no coherent action verb — pure event streams,
pure storage — may argue for a different trio. The argument is still written.

## See Also

Lineage: this constraint is written to the anatomy in `canon/meta/enforceable-policy-anatomy`
(klappy.dev#289) and is the kind of governing policy `canon/constraints/policy-precedes-build`
(klappy.dev#290) requires before a build opens.

`klappy://canon/methods/reframe-before-trimming` ·
`klappy://canon/patterns/docs-proxy-canon-as-tool` ·
`klappy://canon/principles/mcp-as-universal-interface` ·
`klappy://docs/promotions/P0006-vodka-boundary-enumeration-as-spec-convention`
