---
uri: klappy://canon/constraints/borrow-evaluation-before-implementation
title: "Borrow Evaluation Before Implementation — A Falsifiable 6B Table the Agent Produces in Planning Before Any Implementation Execution"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "constraint", "governance", "6B", "borrow", "bide", "build", "preflight", "planning", "agent-execution", "theory-of-constraints", "ai-collaboration", "vision-fit", "reversibility", "anti-pattern"]
epoch: E0008.5
date: 2026-05-05
derives_from: "canon/methods/borrow-bend-break-beget-build.md, canon/constraints/mode-discipline-and-bottleneck-respect.md, docs/oddkit/proactive/proactive-preflight.md, canon/principles/dry-canon-says-it-once.md, docs/promotions/P0002-borrow-evaluation-before-implementation.md"
complements: "canon/methods/borrow-bend-break-beget-build.md, canon/bootstrap/model-operating-contract.md"
governs: "Any agent in planning mode about to execute an implementation task with an upstream substrate (SDK, reference impl, widely-adopted library) — or one the field is visibly converging toward. Binds the planning artifact: the agent must produce a falsifiable 6B Evaluation table plus a one-line Reversibility Note before execution begins."
status: active
target_repo: "outcomes-driven-development"
---

# Borrow Evaluation Before Implementation — A Falsifiable 6B Table the Agent Produces in Planning Before Any Implementation Execution

> The 6B method (`canon/methods/borrow-bend-break-beget-build`) is the meta-discipline. This constraint is the planning-mode operationalization that binds the agent. Before any implementation task that has an upstream substrate or that the field is visibly converging toward, the agent produces a six-row evaluation table — one verdict per B, named justifications for skips, named criteria for `inspected-and-rejected`, tripwires for `waiting` — plus a one-line Reversibility Note. The table is falsifiable and the operator can challenge any row. A blank checkbox does not satisfy this constraint; an aesthetic skip ("I want to understand it") does not satisfy this constraint. Skipping the evaluation entirely is a violation regardless of how the resulting code performs.

---

## Why This Constraint Exists — The Goldratt Frame

Stopping to do a Borrow Evaluation feels like overhead at the local station. It costs six lines of plan and one or two search round-trips. Local-throughput thinking treats this as drag.

Theory of Constraints says the local throughput is not the system throughput. The system throughput is bounded by the operator's attention — the slowest, most expensive, most non-recoverable resource in the loop. Every handroll the agent performs without a Borrow Evaluation pulls the operator into:

- Bugs the upstream community has already found, reported, fixed, regression-tested, and released.
- Spec drift between the handroll and the standard, discovered weeks later by an integration partner.
- Maintenance debt for code that becomes obsolete the day a free alternative ships — the cost the Bide step prevents.
- Adoption of an opinionated stack that forces architectural decisions outside the framework's proper scope — the cost the Bide *inspection* step prevents.
- The same explanatory conversation, repeated across sessions and projects, with no encoding that survives.

The local "inefficiency" of producing the evaluation is the global efficiency of not paying any of those costs. This is the same logic that justifies the inspection step in lean manufacturing: the line stops to inspect because the cost of catching a defect at the source is orders of magnitude lower than the cost of catching it downstream.

Per `canon/principles/dry-canon-says-it-once` applied to operator attention: the same handroll-correction conversation must not happen twice. Six occurrences of the same conversation across six MCP server projects is the empirical disproof that "the rule exists in canon" is sufficient without a planning-mode artifact that surfaces it.

---

## When This Constraint Binds

The constraint binds whenever **any one** of these triggers fires in planning:

- The implementation target is a standardized protocol or interface with a maintained reference SDK from the protocol authors (e.g. `@modelcontextprotocol/sdk` for MCP, `@cloudflare/agents` for Workers-hosted MCP).
- The implementation target is a category of integration where a widely-adopted library exists (e.g. HTTP clients, SQL query builders, JSON schema validators, OpenAPI codegen).
- The implementation target is something the field is visibly converging toward (multiple parties shipping, reference impls in flight, clear emergence window).
- The implementation target was previously implemented in any other project in the same organization, with patterns or libraries that could be lifted.

If none of these triggers fire, the constraint is inert for that task. The agent records the absence of triggers in the plan; this is not a silent skip.

---

## What the Agent Must Produce

A six-row table in the plan, one row per B in the 6B sequence:

| Step      | Verdict                                                                                 | Justification (required when verdict is `skipped` or `rejected`) |
|-----------|-----------------------------------------------------------------------------------------|------------------------------------------------------------------|
| Borrow    | `applied` / `skipped` / `n/a`                                                            | Named upstream artifact + version; or named reason for skip      |
| Bend      | `applied` / `skipped` / `n/a`                                                            | What was bent and how; or named reason for skip                  |
| Break     | `observed` / `none-yet` / `n/a`                                                          | Specific friction observed in Borrow/Bend; or "no friction yet"  |
| Beget     | `delegated` / `skipped` / `n/a`                                                          | Who is carrying the piece; or named reason for skip              |
| Bide      | `waiting` / `inspected-and-adopted` / `inspected-and-rejected` / `n/a` / `skipped`        | Tripwire (for `waiting`); inspection target + criterion (for `rejected`); named reason for `skipped` |
| Build     | `none` / `minimal` / `not-yet`                                                           | What was built; trace to the specific Break that demanded it      |

Plus a one-line **Reversibility Note** in the form:

> Reversibility: forward = [low | medium | high]; backward = [low | medium | high]. [Optional one-clause rationale.]

The note records the asymmetric swap-cost in either direction. It is one line; it is not a section.

---

## What Counts as a Real Borrow vs a Real Bide

A **Borrow** is real when:

- A specific named upstream artifact (package, library, repo, version) is identified.
- The artifact is used as-is or with the documented Bend pattern.
- The agent records the package in the dependency manifest and uses its public API.

A Borrow is NOT real when:

- The agent says "I considered the SDK" without naming it.
- The agent imports the SDK but reimplements its core functionality alongside.
- The agent forks the SDK to make trivial modifications instead of contributing upstream or using the documented extension points.

A **Bide** is real when:

- A specific named gap is identified: "X does not yet exist; it appears the field is heading toward it via [project A], [project B], [project C]."
- A reason the wait is acceptable is named (urgency, scope, fallback availability).
- A tripwire is set: a date, a milestone, a condition that triggers re-evaluation.
- An inspection step is committed to: when the tripwire fires, what surfaces is evaluated against the named criteria.

A Bide is NOT real when:

- The requirement is forgotten about, with no record.
- The agent vaguely hopes someone else will solve it.
- Indefinite deferral with no tripwire.
- Bide is used as a way to avoid a hard problem that genuinely must be solved now.
- Reflexive adoption of whatever the field surfaces, without inspection.

If the Bide has no tripwire, it is not a Bide; it is dropped scope. Drop it explicitly or set the tripwire. If the wait completes and the inspection is skipped, the Bide is also incomplete.

---

## The Inspection Criteria

A `Bide → inspected-and-rejected` verdict requires naming **which** inspection criterion applied and **what specifically** was inspected. The criteria — any one of which justifies rejection followed by `Build = minimal` — are:

- **Vision conflict.** What surfaced makes architectural choices that conflict with the project's vision or foundational needs.
- **Foundational gap.** What surfaced sits above the layer where the foundational need lives, leaving the underlying problem unaddressed.
- **Gross overcomplication.** What surfaced solves a much larger problem than the one at hand and brings the cost of that scope along.
- **Opinionated stack imposition.** What surfaced requires adopting a particular runtime, framework, language, or topology that forces decisions outside the framework's proper scope.
- **Improper authority.** What surfaced makes architectural or product decisions that are not its place to make — decisions that belong to the operator or to the layer above.
- **Persistent gap after multiple field iterations.** What surfaced addresses adjacent problems but consistently fails to close the specific gap, and waiting longer has diminishing returns.

A bare "didn't fit" is not a verdict; it is an aesthetic skip. The named criterion plus what specifically was inspected (named libraries, repos, versions) is the minimum bar.

---

## Operational Sequence in Planning

1. **State the implementation goal in one sentence.**
2. **List the candidate upstream substrates** (SDK, library, spec, reference impl, near-future field convergence pattern). Two minutes of search, not a survey.
3. **Run the 6B Evaluation table** above, one row per step. Be specific — name versions, repo URLs, package names, expected emergence windows, inspection results.
4. **Add the one-line Reversibility Note.**
5. **Surface the table and note in the plan** the operator can see (or in the plan record for solo runs).
6. **If `Build = minimal`, that is the only thing scoped for execution.** Anything beyond it is scope creep and triggers reversion to planning.

---

## What This Forbids

The following are violations regardless of how the resulting code performs:

- Writing implementation code in execution mode without a Borrow Evaluation present in the plan.
- Marking `Borrow = skipped` or `Bide = skipped` without a named justification on the same line.
- Treating "I'll just write a quick version" as a Build verdict — that is the local-maximum trap, not a justification.
- Re-implementing transport, framing, capability negotiation, message envelope, or lifecycle for a protocol whose authors ship a maintained SDK.
- Padding the evaluation with `n/a` to satisfy the form. The evaluation is falsifiable; the operator can challenge any row.
- Declaring a Bide without a tripwire. Bide-without-tripwire is dropped scope wearing a costume.
- Marking `inspected-and-rejected` without naming which inspection criterion applied and what specifically was inspected.
- Skipping the Reversibility Note. The note is one line; absence is not brevity, it is an omission.

---

## Worked Examples — Both Fork Outcomes Are Success States

**Success case 1 — `Bide → inspected-and-adopted`: oddkit's write layer.**

| Step      | Verdict                            | Justification |
|-----------|------------------------------------|---------------|
| Borrow    | `n/a`                              | No upstream connector existed at the time |
| Bend      | `n/a`                              | Nothing to bend |
| Break     | `observed`                         | Manual integration was required for every new AI tool target |
| Beget     | `skipped`                          | No party was positioned to build it generically |
| Bide      | `inspected-and-adopted`            | Tripwire: emergence of native MCP connectors across major AI tools (GitHub MCP server as the leading indicator). Fallback during wait: humans as the manual wire/bus. Tripwire fired Jan 2026; inspection passed (vision aligned, no foundational gap, no overcomplication, no improper authority); adopted. |
| Build     | `none`                             | The Bide adoption obviated the build |

Reversibility: forward = low (adoption is reversible by un-adopting the connector); backward = low (manual fallback was the bide-time mode and remains available).

**Success case 2 — `Bide → inspected-and-rejected → Build = minimal`: agent-messaging-service wire layer.**

| Step      | Verdict                            | Justification |
|-----------|------------------------------------|---------------|
| Borrow    | `applied`                          | MCP, A2A, ACP, NLIP, AMP, ANP — all 2025–2026 agent-comms cluster entrants |
| Bend      | `applied`                          | Composed against AMS use cases (two-agent conversations, polymorphic subscribers) |
| Break     | `observed`                         | Each entrant bundles identity, capability schema, transport, payload format into one envelope at a particular altitude — the bundling is the substrate property AMS refuses |
| Beget     | `n/a`                              | No party was positioned to build a substrate that refuses these opinions |
| Bide      | `inspected-and-rejected`           | Tripwire: ongoing observation of the cluster. Inspection criteria applied: opinionated stack imposition (envelope altitude), improper authority (each entrant takes architectural authority that belongs above), foundational gap (none address the dumb-pipe broker layer), persistent gap (multiple iterations across the cluster have not closed the gap). Rejection justifies Build by exclusion. |
| Build     | `minimal`                          | The AMS wire is approximately 250 lines of Conversation DO logic — the smallest thing that delivers stream-by-stream broadcast with structurally-excluded self-delivery |

Reversibility: forward = high (the AMS wire is now a substrate with downstream dependencies); backward = high (re-adopting an opinionated cluster entrant would require migrating all consumers off the wire's contract). Reversibility cost is documented; the chosen path is the long-term commitment the project knowingly made.

**Failure case — Borrow silently skipped (six MCP server projects):**

| Step      | Verdict                            | Justification |
|-----------|------------------------------------|---------------|
| Borrow    | `skipped`                          | (no justification recorded — this is the violation) |
| Bend      | `n/a`                              | (no Borrow to bend) |
| Break     | `n/a`                              | (no friction observed because no Borrow was attempted) |
| Beget     | `skipped`                          | (no recorded reason) |
| Bide      | `skipped`                          | (no recorded reason) |
| Build     | `done`                             | Custom JSON-RPC handroll, ~1000 lines, reimplements what `@modelcontextprotocol/sdk` or `@cloudflare/agents` McpAgent provides |

Reversibility: not addressed. (Absence is the violation.)

This row, repeated across six MCP server projects with the same operator, is the empirical disproof that the meta-method alone is sufficient. The agent-binding planning-mode form — this constraint — is what closes the loop.

---

## Failure Modes and Mitigations

| Failure mode                                                   | What it looks like                                                | Mitigation |
|----------------------------------------------------------------|-------------------------------------------------------------------|------------|
| Evaluation produced after execution begins                     | The table appears in the PR description, not in the plan          | Preflight surfaces this constraint; the gate to execution requires the table to be present in the plan |
| Padded `n/a` rows                                              | All rows marked `n/a` to satisfy the form                          | Operator can challenge any row; `n/a` requires the absence-of-trigger justification |
| Aesthetic skip dressed as criterion                            | "Didn't fit" or "felt heavy" cited as `inspected-and-rejected`     | The criterion must be named (one of six); what was inspected must be named (specific library, version) |
| Bide without tripwire                                          | `waiting` with no date, milestone, or condition                    | Bide-without-tripwire is dropped scope; the rule rejects the row |
| Reversibility Note missing                                     | The one-line note is absent                                        | The constraint requires the note; absence is a violation |
| SDK adopted as a check-the-box, then the agent reimplements alongside | SDK in dependencies, but the SDK's core path is duplicated locally | Borrow is real only when the agent uses the SDK's public API as the primary path |

---

## Risks and Reversibility of This Constraint Itself

**Risk 1 — Evaluation becomes ritual rather than substantive.** Mitigated by falsifiability: the operator can challenge any row, and rows that fail challenge invalidate the evaluation. A blank checkbox does not satisfy.

**Risk 2 — The constraint blocks legitimate handrolls.** Mitigated by the `inspected-and-rejected → Build = minimal` path. The rule does not forbid handroll; it forbids *unjustified* handroll. The AMS wire is the worked example: a justified Build is canon-compliant.

**Risk 3 — The constraint adds planning friction without benefit.** Mitigated by the empirical base: six handroll recurrences across six MCP server projects, plus the explanatory cost compounded across each. The friction the constraint adds is bounded; the friction it avoids is unbounded.

**Reversibility of this constraint.** This rule is itself reversible. If the constraint is observed to produce rituals more than insight, or to block more legitimate Builds than it prevents sloppy ones, it is updated via canon revision. The disconfirmer is named: empirical evidence across multiple projects that the evaluation either stops surfacing real choices or systematically rejects substrates that turn out to be the right answer.

---

## Relationship to Other Canon

- `canon/methods/borrow-bend-break-beget-build` — the meta-method this operationalizes. The 6B method explains *why*; this constraint enforces *when and how*.
- `canon/constraints/mode-discipline-and-bottleneck-respect` — locates the evaluation in planning, where questions are cheap, not execution, where they collapse the bottleneck.
- `docs/oddkit/proactive/proactive-preflight` — the existing preflight rhythm. The Borrow Evaluation is a required output of preflight when an implementation trigger is present.
- `canon/principles/dry-canon-says-it-once` — applied to operator attention: the same handroll-correction conversation must not happen twice.
- `canon/bootstrap/model-operating-contract` — the bullet under "Before Shipping Code" surfaces this rule on first turn of every session.

---

## See Also

- `klappy://canon/methods/borrow-bend-break-beget-build`
- `klappy://canon/constraints/mode-discipline-and-bottleneck-respect`
- `klappy://canon/defaults/iteration-bias`
- `klappy://canon/principles/dry-canon-says-it-once`
- `klappy://docs/oddkit/proactive/proactive-preflight`
- `klappy://docs/promotions/P0002-borrow-evaluation-before-implementation`
- `ams://canon/constraints/mcp-build-side-governance` — the AMS-local manifestation of this rule for AMS MCP wrappers specifically
