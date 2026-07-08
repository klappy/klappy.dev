# DISPATCH.md — Dispatch Protocol for Flights in This Project

> Every dispatched flight — an assistant-orchestrated sub-agent, an autonomous-trigger runtime, or a fresh session boarding cold — passes the same hard preflight gate a maintainer session does. Dispatch does not lower the bar; it is the most common place the bar gets skipped, because a dispatched flight often arrives with a partial toolset and no one watching it board. This file is the takeoff clearance for anything dispatched here.

See `canon/methods/dispatch-paths.md` for the two dispatch classes (assistant-orchestrated vs. autonomous-trigger) and `canon/bootstrap/model-operating-contract.md` for the binding operating contract. The authoritative rule below is `klappy://canon/constraints/preflight-checklist-takeoff-gate`.

---

## The takeoff gate — no dispatched flight works without passing it

Before ANY work, every flight runs preflight and passes all five items. Each item is green only when **observed live this flight** — never from cache, memory, or inference.

1. **Clock** — `oddkit_time` succeeds and returns `server_time`.
2. **Canon reachable** — fetch `klappy://canon/bootstrap/model-operating-contract` via oddkit and confirm it resolves. **Unreachable → ABORT.** This is the failure that grounded the fleet all week: dispatched Code flights carried zero MCP connectors, could not reach canon, and flew anyway on recall.
3. **Tools present** — the specific connectors this task needs (GitAuth to push, Shopify for store work, the AMS wire to reach a peer, etc.) are actually available. Missing → abort, or narrow scope to what the present tools support and say so explicitly.
4. **Tier correct** — the running model matches the task's required tier.
5. **Boarded** — the role's boarding doc (`canon/bootstrap/boarding-pass` or `generic-boarding-pass`) and the memory-mirror are read this flight.

All five green → **cleared for takeoff.**

## Declare the result before you work

A cleared flight states its preflight result at the **top of its first substantive message**: which items passed and the observed evidence for the load-bearing ones (clock value, operating-contract content hash, connectors present, tier, boarding read). A flight that reports work without a passed, declared preflight is **invalid** — the work is unverified because the conditions to verify it were never confirmed.

## Abort behavior — report, do not simulate

Fail any item and the flight does not take off. Report the specific failure plainly — **"cannot reach `X` — aborting"** — and stop. Do not fall back to recalled governance and fly as if canon were read; do not fabricate a tool result; do not infer the date the clock did not give; do not silently narrow scope and report the full task as done. Aborting on a failed preflight is the gate working. Per axiom 3, an honest "I could not board, so I did not fly" costs far less than a confident "done" produced from memory.

## Two gates bound every flight

- **START gate:** this preflight, declared before work.
- **END gate:** recording-as-landing — the flight records itself as it lands (`scripts/validate-preflight-declaration.py` and the CI job in `.github/workflows/canon-quality.yml` check that flight artifacts carry the declaration).

A flight missing either bound is incomplete: it took off without clearance, or it landed without logging. Both gates are hard.
