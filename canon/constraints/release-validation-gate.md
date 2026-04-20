---
uri: klappy://canon/constraints/release-validation-gate
title: "Release Validation Gate — Mechanical Rules That Bind Every Ship"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "constraint", "release", "validation", "bugbot", "sonnet-validator", "promotion-gate", "fresh-context", "convention-requires-an-enforcer", "ship-safety"]
epoch: E0008.3
date: 2026-04-20
derives_from: "canon/principles/verification-requires-fresh-context.md, canon/principles/vodka-architecture.md, docs/appendices/convention-requires-an-enforcer.md, canon/values/axioms.md, odd/ledger/2026-04-20-p1-3-3-challenge-canon-parity-landed.md"
complements: "canon/constraints/oddkit-prompt-pattern.md, canon/principles/dry-canon-says-it-once.md"
governs: "Every PR merged to oddkit main and every promotion to oddkit prod. Also applies to klappy.dev canon PRs that change governance documents the worker reads at runtime. Binding on every orchestrator and every Managed Agent that ships code in this program."
status: active
---

# Release Validation Gate — Mechanical Rules That Bind Every Ship

> Convention is optional; convention plus an enforcer is binding. Smoke tests catch mechanical bugs; independent review catches PRD-vs-PR intent drift; canon-vs-ledger conflict resolution is settled by canon. None of these are recommendations — they are the gate. An orchestrator that decides "this scope is small enough to skip validation" has substituted personal judgment for canon, which is exactly the failure mode this constraint exists to prevent. The Cursor Bugbot stall pattern, the "Option A is fine for this one" justification, and the in-session self-validation are all named here so future sessions cannot re-litigate them as judgment calls. They are not judgment calls. They are the gate.

---

## Summary — What Must Be True Before Any Ship

Three rules govern the release pipeline for oddkit and any oddkit-pattern MCP server in this program. They are non-negotiable and apply regardless of scope, urgency, or operator pressure.

**First, no PR merges to main with active reviews still in progress.** Cursor Bugbot — and any successor automated reviewer — is a real reviewer, not a CI ornament. An `in_progress` Bugbot status is an active review the orchestrator must wait for. A `completed/neutral` Bugbot status with findings is a review that must be read, dispositioned, and either fixed forward in the same PR or explicitly waived in the PR body with reasoning. Treating an in-progress reviewer as non-blocking because it stalls is an inversion of what review is for. Reviewers are slow precisely because they are reading.

**Second, no main → prod promotion ships without independent fresh-context validation when the PR touches load-bearing surface.** "Load-bearing surface" includes anything in `workers/src/orchestrate.ts`, anything that adds or removes governance file reads, anything that changes the worker's response envelope, and anything that changes the matcher algorithm. For these PRs, the orchestrator must dispatch an independent validator session — Sonnet 4.6 read-only via Managed Agents, or any equivalent fresh-context reviewer — and fold the validator's findings into the closeout ledger before merging the promotion PR. Same-session self-validation does not satisfy this. Smoke runs do not satisfy this. The validator's job is to find what the orchestrator missed, which structurally requires a different agent in a different context window.

**Third, when a session ledger or handoff recommends skipping a step in this constraint, canon wins.** This is the contract-governs-handoff-drift principle in operation: a recommendation in a session-scoped artifact does not override a tier-1 canon constraint. Specifically, the P1.3.2 ledger's recommendation that "Option A is fine for P1.3.3" was a session-scoped judgment that turned out wrong precisely because Bugbot caught two real bugs P1.3.3 shipped to prod. Future ledgers may make similar recommendations; canon outranks them.

The enforcement is partly mechanical (the gate checks below) and partly orchestrator-bound (search canon before claiming, per the bootstrap). When the mechanical enforcement is incomplete, the orchestrator's obligation is heavier, not lighter.

---

## Rule 1 — No Merge With Active Reviews

For any PR to `klappy/oddkit` main:

**Wait conditions (mechanical):**
- Every check-run reported by the GitHub Checks API for the head SHA must be in `status: completed`. No exceptions for "Bugbot is non-blocking historically" or "this scope is small."
- For each completed check, the conclusion must be one of: `success`, `neutral`, or `skipped`. `failure`, `cancelled`, `timed_out`, `action_required`, or `stale` block.
- Cursor Bugbot specifically: if conclusion is `neutral` AND review comments exist, every comment must be dispositioned (fix-forward in this PR, waive in PR body with rationale, or open a tracking issue). If conclusion is `neutral` with NO findings, the PR proceeds.
- `Cursor Bugbot Autofix` may remain `in_progress` indefinitely without blocking, BUT only after the parent `Cursor Bugbot` check has reached `completed`. Autofix runs after the review; the review is the gate, not the autofix.

**The two failure modes this prevents:**
- *Stall-as-skip:* The orchestrator polls, sees Bugbot stuck in `in_progress` past some informal threshold, and decides Bugbot is non-blocking. This is wrong every time. If Bugbot is genuinely broken, the disposition is to wait longer or to surface the broken-tooling problem, not to ship past it.
- *Findings-as-noise:* Bugbot finds things and the orchestrator dismisses them as "low severity" or "out of scope" without recording the disposition. Every finding gets a disposition; no finding is ignored.

**Verification the orchestrator must perform before clicking merge:**
1. Pull the GitHub `/check-runs` endpoint for the PR head SHA. Confirm every entry has `status: completed`.
2. Pull the PR `/reviews` endpoint. For any `cursor[bot]` review with body text, read the body. For any review-comment thread on a file/line, read the thread.
3. For every Bugbot finding, record disposition (fix-forward / waive-with-reason / tracking-issue) in the PR body or the closeout ledger.
4. Only then merge.

---

## Rule 2 — No Promotion Without Independent Validation

For any `main → prod` promotion PR on `klappy/oddkit` (and any oddkit-pattern MCP server in this program):

**Trigger condition:** the merged PR(s) being promoted include any change to load-bearing surface:
- `workers/src/orchestrate.ts`
- `workers/src/bm25.ts` or any other matcher/parser module
- Addition or removal of a governance file fetch (anything calling `fetcher.getFile` or `fetcher.getIndex`)
- Response envelope changes (any new or removed `result.*` field)
- New or modified `oddkit_*` action behavior

If any of those apply, **independent validator dispatch is mandatory before the promotion PR merges.**

**The validator must:**
- Run in a fresh session, not the orchestrator's session. Per `klappy://canon/principles/verification-requires-fresh-context`: same-session self-validation produces structural blindness because creation context bridges flaws.
- Use the Managed Agents API per `/mnt/skills/user/managed-agents/SKILL.md`, or an equivalent fresh-context reviewer.
- Be model-family-permissive: Sonnet 4.6 is the default per the skill ("literal, flag-happy, catches more"); Opus is acceptable; the constraint is fresh context, not a specific model.
- Be read-only: validator does not push code, open PRs, or modify any repo. Findings are reported back; the orchestrator decides disposition.
- Perform the 5-corroboration pattern from P1.3.1: PRD-vs-shipped diff drift, bytes-on-main verification, live preview curl of new shapes, canon retrievability and content, independent smoke against the preview URL × 3 consecutive runs.

**The orchestrator must:**
- Dispatch the validator after the feat PR is open and the preview deploy is live, but before merging the promotion PR.
- Wait for the validator session to reach `idle` status. Do not proceed past timeout without explicit acknowledgment of timeout in the closeout ledger.
- Read every validator finding. Disposition each one in the closeout ledger before promotion merges.
- If the validator surfaces a `FAIL` or `PARTIAL` verdict on any corroboration, treat that as a blocker until either the issue is fixed-forward or the disposition is recorded with explicit reasoning.

**Same-session self-validation does not satisfy this.** Specifically, the following do NOT count as independent validation:
- The orchestrator running smoke tests three times in their own session.
- The orchestrator calling the production tool from their own MCP connection (a "live self-call").
- The orchestrator writing a closeout ledger that asserts the work is correct.

These are useful artifacts. They are not validation. Validation requires the context break.

---

## Rule 3 — Canon Wins Over Session Artifacts

When a session ledger, handoff, or PRD recommends skipping or downgrading a rule in this constraint, **canon wins**. The session artifact is a record of one session's judgment; canon is the program's binding contract.

This rule is the inverse of the trap that produced this constraint's existence. The P1.3.2 ledger recommended Option A (smoke-heavy, no validator dispatch) for P1.3.3 with the explicit caveat: *"escalate to Option B if any smoke failure surfaces something that requires judgment-call resolution."* The P1.3.3 orchestrator read both halves and picked the convenient half. Canon now binds the choice: when this constraint says "validator dispatch is mandatory," that mandate cannot be downgraded by a session-scoped recommendation, even one written by a thoughtful prior session ledger.

**Specifically:**
- A handoff or ledger MAY recommend a particular validator pattern (Sonnet 4.6 vs Opus, 5-corroboration vs lighter touch). It MAY NOT recommend skipping validator dispatch entirely.
- A handoff or ledger MAY recommend deferring a Bugbot finding to a follow-up PR. It MAY NOT recommend treating Bugbot as non-blocking.
- A handoff or ledger MAY argue that a particular release is exempt from this constraint. The orchestrator MUST NOT act on that argument without writing canon that names the exemption first. If the exemption is real, the canon needs amending; if it isn't, the recommendation is wrong.

This is the contract-governs-handoff-drift principle (`klappy://canon/principles/contract-governs-handoff-drift`) applied to release safety specifically.

---

## What Counts As "Load-Bearing Surface"

The Rule 2 trigger is "any change to load-bearing surface." Concretely:

**Always load-bearing:**
- `workers/src/orchestrate.ts` (any change)
- `workers/src/bm25.ts` (any change to tokenize/stem/buildBM25Index/searchBM25)
- New or removed `mcp_server.tool(...)` registrations
- New or removed governance file reads (`fetcher.getFile` calls)
- Response envelope changes (`result.*` field added/removed/renamed)
- New or removed `oddkit_*` action

**Not load-bearing (Rule 2 not triggered):**
- CHANGELOG-only PRs
- Documentation-only PRs (`docs/`, `README`, etc.)
- CI workflow PRs that don't change worker behavior
- Dependency bumps that don't change behavior (lockfile-only)
- Test-only PRs that don't change `workers/src/`

**Ambiguous cases default to load-bearing.** When in doubt, dispatch the validator. The 3–5 minutes of agent-time is cheap insurance.

---

## Mechanical Enforcement Roadmap

This constraint is currently enforced by orchestrator obligation (search canon before claiming, follow what's found). Mechanical enforcement via the `oddkit_gate` tool's `execution → completion` transition is the obvious next code beat:

When the gate detects a `completion` transition with input mentioning `merge`, `promote`, `ship to prod`, or similar, the gate should:
1. Pull the GitHub Checks API for the PR being merged (orchestrator passes the PR URL or number in `context`).
2. Verify all check-runs reach `completed` with acceptable conclusions.
3. Verify Bugbot findings are dispositioned.
4. For load-bearing PRs, verify a validator session ID is referenced in `context`.
5. Return `NOT_READY` with specific unmet prerequisites if any rule is violated.

Captured as carry-forward O-open: **P11 — `oddkit_gate` enforces release-validation-gate at completion transitions.** Until P11 ships, the orchestrator's manual obligation is heavier.

---

## How This Constraint Got Written

This constraint exists because P1.3.3 (oddkit 0.21.0, shipped 2026-04-20) violated all three rules:
- **Rule 1:** orchestrator treated `Cursor Bugbot` `in_progress` as non-blocking, merged PR #120 and PR #121 before Bugbot completed its review. Bugbot subsequently posted two findings (one medium-severity, one low-severity); the medium one was a real prod regression breaking the strictly-additive invariant the PR description claimed.
- **Rule 2:** orchestrator skipped Sonnet 4.6 validator dispatch despite the P1.3.2 ledger's explicit warning that "smoke-only should not become the default." Same-session smoke + a live self-call were treated as substitutes for fresh-context validation. They weren't.
- **Rule 3:** orchestrator followed the P1.3.2 ledger's session-scoped recommendation ("Option A is fine for P1.3.3") over the bootstrap contract's tier-1 rule ("validate before declaring done, with context break"). Canon should have won; it didn't, because it didn't exist yet.

The fix-forward was 0.21.1 (klappy/oddkit#122 or similar — the PR opened to apply Bugbot's autofix and graduate the missing canon). This constraint is the canon that makes the next session's correct path mechanical, not optional.

The full session post-mortem is at `klappy://odd/ledger/2026-04-20-p1-3-3-challenge-canon-parity-landed`.

---

## Related Canon

- **[Verification Requires Fresh Context](klappy://canon/principles/verification-requires-fresh-context)** — the principle this constraint operationalizes for the release pipeline specifically.
- **[Contract Governs Handoff Drift](klappy://canon/principles/contract-governs-handoff-drift)** — the principle Rule 3 is a direct application of.
- **[Vodka Architecture](klappy://canon/principles/vodka-architecture)** — server stays thin; canon enforces. This constraint is the canon side of an enforcement that the server does not yet implement.
- **[Convention Requires an Enforcer](klappy://docs/appendices/convention-requires-an-enforcer)** — why a recommendation in a ledger is insufficient; conventions become real only when something mechanical refuses to proceed without them.
- **[Cache Fetches and Parses](klappy://canon/principles/cache-fetches-and-parses)** — the principle that DID graduate cleanly in P1.3.3; demonstrates the pattern this constraint codifies as a release-pipeline rule.
- **[Managed Agents Skill](file:///mnt/skills/user/managed-agents/SKILL.md)** — the operational mechanism for satisfying Rule 2's validator dispatch.
