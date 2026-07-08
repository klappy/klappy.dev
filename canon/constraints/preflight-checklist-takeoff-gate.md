---
uri: klappy://canon/constraints/preflight-checklist-takeoff-gate
kind: canon
title: "The Preflight Checklist — The Hard Takeoff Gate No Flight Skips"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "constraints", "preflight", "bootstrap", "flight-deck", "takeoff-gate", "quality-gate", "governance", "enforcement"]
epoch: E0010
date: 2026-07-08
derives_from: "canon/bootstrap/model-operating-contract.md, canon/bootstrap/flight-deck-model.md, canon/values/axioms.md, canon/constraints/audit-gates-are-spawned-agent-sessions.md"
complements: "canon/bootstrap/boarding-pass.md, canon/bootstrap/generic-boarding-pass.md, canon/constraints/frontmatter-validation-before-merge.md, docs/oddkit/tools/oddkit_preflight.md"
governs: "Every flight (session or dispatched sub-agent) that produces work in an oddkit-powered project. The START gate; recording-as-landing is the END gate."
constraint: "Hard gate. A flight that fails any preflight item does not take off; it aborts and reports. A flight that reports work without a passed, declared preflight is invalid."
status: active
---

# The Preflight Checklist — The Hard Takeoff Gate No Flight Skips

> The flight-deck model already says preflight fires before work. This constraint makes it a gate rather than a habit: five items, checked every flight, before any work, and never from cache or memory. Clock succeeds, canon is reachable, the tools the task needs are present, the running model matches the required tier, and the boarding doc plus memory-mirror are read. Fail any item and the flight does not take off — it aborts and reports the specific failure ("cannot reach X — aborting"), it does not simulate the result from what it remembers. All green, and the flight is cleared: it declares its preflight result at the top of its first substantive message. Work reported without a passed, declared preflight is invalid on its face. This is the START gate. Recording-as-landing is the END gate. Both are hard.

---

## Summary — Preflight Is the Gate, Not the Ritual

`canon/bootstrap/flight-deck-model` names preflight as an instrument: "the preflight fires before work, every time, regardless of how capable the session feels; capability is precisely when checklists are skipped." `canon/bootstrap/model-operating-contract` operationalizes the pieces — `oddkit_time` first every turn, fetch the operating contract on the first substantive turn, search canon before asking, say so when canon is unreachable. What was missing was a single named gate that binds those pieces into a pass/fail condition for takeoff.

This constraint supplies it. The failure it exists to prevent is the one the operator observed all week: dispatched flights (notably Code-substrate sessions) that carried zero MCP connectors, could not reach canon at all, and flew anyway — governing themselves from recall while reporting confident completions. That is silent substitution (`flight-deck-model`) with the manual physically absent, and it is exactly the state a preflight gate is supposed to refuse.

The gate is five checks. Any failure aborts the flight. A passed flight declares its result before it does anything substantive, so the absence of a declaration is itself a detectable defect — the structural check at the end of this document keys on it.

---

## The Preflight Checklist — Every Flight, Before Any Work

Run all five before producing any artifact. Never satisfy an item from cache, memory, or inference — an item is green only when observed live this flight.

1. **Clock.** `oddkit_time` succeeds and returns `server_time`. Time is observed, never inferred (`canon/observations/time-blindness-axiom-violation`). If the clock cannot be read, say so; do not guess the date.
2. **Canon reachable.** Fetch `klappy://canon/bootstrap/model-operating-contract` via oddkit and confirm it resolves. Unreachable → **ABORT**. This is the check that silently failed all week: flights with no MCP connectors flew without canon. Access is not enforcement; a manual you cannot open does not govern you.
3. **Tools present.** The specific connectors this task needs are actually available — GitAuth to push, Shopify for store work, the AMS wire to message a peer, and so on. Missing a required tool → abort, or narrow scope to what the available tools support and say so explicitly. Never pretend a tool's result.
4. **Tier correct.** The running model matches the task's required tier. A task scoped to a high-tier model must not be silently flown by a lower one; if the tier is wrong, abort or renegotiate scope out loud.
5. **Boarded.** The role's boarding doc (`canon/bootstrap/boarding-pass` or the adopter's `generic-boarding-pass`) and the memory-mirror have been read this flight. Boarding is a live read, not a remembered one.

All five green → **cleared for takeoff**.

## The Declaration — Preflight Result Rides at the Top of the First Substantive Message

A cleared flight states its preflight result at the top of its first substantive message: which items passed, and the observed evidence for the load-bearing ones (the clock value, the operating-contract content hash, the connectors present, the tier, the boarding read). The declaration is short and factual. It exists so the captain — and the end-gate CI — can see that the gate ran without taking the flight's word for it.

**A flight that reports work without a passed, declared preflight is invalid.** Not "lower quality" — invalid. The work is unverified because the conditions under which it could be verified were never confirmed to hold.

## Abort Behavior — Report the Failure, Do Not Simulate the Result

When an item fails, the flight aborts and reports the specific failure in the same plain form the Opus oddkit gate used today: *"cannot reach `X` — aborting."* It names what it could not observe and stops. It does **not**:

- fall back to recalled governance and fly as if canon were read;
- fabricate a tool result for a connector that is absent;
- infer the date because the clock did not answer;
- narrow scope silently and report as though the full task were done.

Aborting on a failed preflight is a success of the gate, not a failure of the flight. Per axiom 3 (Integrity Is Non-Negotiable Efficiency), an honest "I could not reach canon, so I did not fly" costs far less than a confident "done" produced from memory. The abort is the cheap, correct outcome the whole apparatus is built to produce.

## Enforcement — A Structural Check on the Declaration, Not a Judgment of the Flight

Two enforcement surfaces, matched to what each can honestly verify.

**Structural (mechanical) — the declaration is present and well-formed.** Whether a flight artifact (journal entry, ledger closeout, handoff, dispatched-flight report) carries a preflight declaration block naming the five items is a *literal* property — the exact class of anomaly a pattern matcher may gate, per the carve-out in `canon/constraints/audit-gates-are-spawned-agent-sessions` (mechanical checks are legitimate for literal anomalies; they are forbidden only as substitutes for judgment). `scripts/validate-preflight-declaration.py` scans flight artifacts for the declaration and the CI job wires it into `.github/workflows/canon-quality.yml`, shipping soft (report-only) first and flipping to hard after an observation cycle — the same rollout discipline the frontmatter and audit gates followed. This mirrors the recording-as-landing end-gate pattern: the landing gate proves a flight recorded itself; this start gate proves a flight declared its preflight.

**Judgment (spawned agent session) — the declaration is true.** Whether a *passed* preflight was actually earned — canon genuinely resolved, the tools genuinely present — requires reading the artifact and its evidence together, which `audit-gates-are-spawned-agent-sessions` reserves for a spawned agent session, never a regex. The mechanical check catches the missing declaration; it must not be mistaken for proof that the declared preflight was real. Green CI here means "a declaration exists," not "the flight was airworthy."

## Relationship to the Landing Gate

Preflight is the START gate; recording-as-landing is the END gate. A flight is bounded by both: it declares a passed preflight before it works, and it records itself as it lands. A flight missing either bound is incomplete — took off without clearance, or landed without logging. The two gates are the airframe of a valid flight; the work in between is only as trustworthy as the bounds that hold it.

## Retraction Conditions

- Fold back into the operating contract if the standalone constraint adds ceremony without measurably improving takeoff discipline across a meaningful sample of flights.
- Revise the five-item list if flights repeatedly fail a legitimate takeoff on an item that does not actually bear on airworthiness (false-positive aborts), or repeatedly fly unairworthy on a condition the five items do not cover (false-negative clearances).
- Retire the mechanical declaration check if it produces checklist theater — declarations present and well-formed but routinely false — faster than the spawned-agent judgment layer can catch it; in that case the honest gate is the agent session alone.
