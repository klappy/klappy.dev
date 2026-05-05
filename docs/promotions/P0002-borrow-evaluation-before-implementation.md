---
uri: klappy://docs/promotions/P0002-borrow-evaluation-before-implementation
title: "P0002: Promote a Planning-Mode Borrow Evaluation as Agent-Binding Governance, Add Bide as the Sixth B, and Surface Reversibility"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["promotions", "proposed", "6B", "borrow", "bide", "build", "preflight", "planning", "agent-execution", "theory-of-constraints", "ai-collaboration", "vision-fit", "reversibility"]
promotion_status: proposed
---

# P0002: Promote a Planning-Mode Borrow Evaluation as Agent-Binding Governance, Add Bide as the Sixth B, and Surface Reversibility

> The 5B method (`canon/methods/borrow-bend-break-beget-build`) is meta and operator-facing — it describes *how to think* about not building things. It is repeatedly skipped at the agent's execution layer, where handrolling sneaks in turn by turn. The method also lacks an explicit step for *strategic patience with inspection* — deliberately waiting for the field to ship a free alternative, then evaluating what surfaces against the vision rather than adopting reflexively — and lacks any explicit treatment of *reversibility* as a planning-time consideration. This promotion does three coordinated things: (1) adds **Bide** as the sixth B with three resolution paths (waiting / inspected-and-adopted / inspected-and-rejected) and surfaces reversibility as a load-bearing criterion, (2) creates a new tier-1 constraint that operationalizes the 6B method as a falsifiable evaluation table the agent must produce in planning before any implementation execution, and (3) adds a single line to the bootstrap so the rule loads on first turn.

## Observed Pattern

When asked to build a server, transport, parser, or integration that has a maintained upstream implementation (SDK, library, reference impl), the agent defaults to writing it from scratch — even though the 5B method is canon, even though Borrow before Build is conceptually agreed.

Five independent MCP server projects exhibit the failure mode: every one of them bypassed `@modelcontextprotocol/sdk` for a custom JSON-RPC handroll, with no Borrow evaluation, no Bide, no inspection, no reversibility consideration — just Build, immediately. The operator has had this corrective conversation five times across five repos.

Two other projects — oddkit's write layer and agent-messaging-service — are worked counter-examples that demonstrate what the method looks like when applied correctly. They are not failures. They are the proof cases for the two success outcomes of the Bide fork: `inspected-and-adopted` (oddkit) and `inspected-and-rejected → Build = minimal` (AMS). Both succeeded by following the same disciplined process to different correct conclusions.

The pattern of recurring failure is not a missing principle. It is a missing **operational binding**, missing **steps in the method itself**, and a missing **planning-time vocabulary** for the asymmetric cost of swapping directions later:

- The 5B doc is a method written for the operator's strategic decisions; it is not surfaced at the moment the agent is about to write the wrong code.
- Mode discipline says "ask in planning"; it does not specify *what to ask*.
- Preflight returns constraints and DoD; it does not require a Borrow inventory.
- The 5B method has no explicit step for *not building because the field will solve it soon — and then inspecting what the field actually surfaces against the vision*. Both halves of that move are operator intuition today.
- The 5B method has no explicit treatment of *reversibility* — the cost of swapping out of whichever path is chosen, in either direction. Reversibility is the most application-specific Bide criterion and the most frequently underweighted.

This promotion canonizes all of the above so the agent's evaluation can reproduce the operator's existing discipline instead of leaving every call as solo operator judgment.

## Evidence

### Failure cases (the rule would have prevented these)

| Validation Session                | Date (approx) | Outcome                       | Notes                                                                |
| --------------------------------- | ------------- | ----------------------------- | -------------------------------------------------------------------- |
| Project: translation-helps-MCP    | 2025          | FAIL (handrolled transport)   | Custom JSON-RPC; `@modelcontextprotocol/sdk` not used; no Bide; no inspection; no reversibility note |
| Project: oddkit (MCP transport)   | 2025          | FAIL (handrolled transport)   | Custom transport rebuilt across CLI + Worker variants                |
| Project: aquifer-mcp              | 2026          | FAIL (handrolled transport)   | Custom server framing reinvented                                     |
| Project: ptxprint-mcp             | 2026          | FAIL (handrolled transport)   | Same pattern recurred                                                |
| Project: app-builder-mcp          | 2026          | FAIL (handrolled transport)   | Same pattern recurred                                                |
| Project: agent-messaging-service — hosted `/mcp` wrapper (PR #33, D0023) | 2026-05-04 | FAIL (handrolled transport)   | `worker/src/mcp.ts` shipped 1003 lines of hand-implemented Streamable HTTP + JSON-RPC dispatch + initialize handshake + tools/list / tools/call dispatch + notifications, with zero MCP SDK dependencies. Direct contradiction of the binding journal Constraint row at `journal/2026-05-03-day3-mcp-sdk-migration.tsv` which named Cloudflare `agents/mcp` McpAgent for this exact endpoint. Distinct altitude from the AMS-wire success case below — same project, different layer. |

**Total failure observations**: 6
**Independent occurrences**: 6 (distinct repositories OR distinct layers within a repository, distinct sessions, distinct project goals)

**Recurrence note (added 2026-05-05):** The sixth failure landed three days after this promotion artifact was opened, while the three coordinated canon edits this artifact proposes remained `proposed` and unexecuted. The next session's preflight did not surface the rule because the rule does not yet exist in canon — only in this proposal. The recurrence is itself evidence for accelerating the canon-execution step that this promotion's `Edit 1` / `Edit 2` / `Edit 3` describe; an AMS-local manifestation of the constraint has been landed at `ams://canon/constraints/mcp-build-side-governance` to bind future MCP wrapper work in that one repository pending upstream canon execution.

### Success cases — both outcomes of the Bide fork

| Project                          | Period        | 6B Resolution Path                    | Notes                                                                                                |
| -------------------------------- | ------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| oddkit (write layer)             | Jan–Feb 2026  | `Bide → inspected-and-adopted`        | Specific bet: connector-style integrations would mature into native connectors across major AI tools (GitHub MCP server). Manual fallback: humans as the wire/bus during the wait. Field caught up; adopted; Build = `none` |
| agent-messaging-service — wire layer | 2026          | `Borrow → Bend → Break → Bide → inspected-and-rejected → Build = minimal` | Used connectors (Borrow); bent them; observed gaps (Break); waited for those specific gaps to close; inspection found persistent gaps + opinionated stack imposition + improper authority + foundational gap; Build was correct by exclusion. Note: scoped to the AMS *wire* (the dumb-pipe broker substrate). The AMS *wrapper* layer failed the rule independently — see failure row #6 above. The pattern recurs at finer altitudes; the wire's correct Bide outcome did not propagate to the wrapper above it. |

**Total success cases**: 2
**Significance:** The success cases are not edge cases or fallback paths. They are the existing operator discipline that this promotion is canonizing. Both `inspected-and-adopted` (oddkit) and `inspected-and-rejected → Build` (AMS) are success outcomes of the same disciplined Bide fork, resolved correctly to different answers based on what the field actually produced and how it inspected against the vision. Treating one as the "main" path and the other as a "fallback" misframes the rule.

### Affected workflows

All implementation tasks where a maintained upstream substrate exists, OR where the field is converging toward one. Most acutely MCP servers; generalizable to any standardized protocol or widely-adopted tooling category.

### Operator cost

Six explanatory conversations for the failure cases (the sixth on 2026-05-05, escalating during the recurrence inside agent-messaging-service itself), plus the unmeasured but real cost of carrying the discernment work alone for the success cases (the Bide inspection criteria and reversibility considerations currently live only in operator judgment).

## Current Handling

There is no operational guard. Canon already covers the principle:

- `klappy://canon/methods/borrow-bend-break-beget-build` — Borrow before Build is canonical (current 5B, proposed 6B with Bide)
- `klappy://canon/constraints/mode-discipline-and-bottleneck-respect` — locates planning questions in planning mode
- `klappy://docs/oddkit/proactive/proactive-preflight` — preflight before any execution that produces an artifact
- `klappy://canon/principles/dry-canon-says-it-once` — applied to operator attention, the same conversation must not happen twice

But none of these get *operationally surfaced* at the planning step where the agent decides what to implement. The 5B method is meta — read once at the strategic layer and not re-evaluated per task. Preflight returns constraints but does not require a Borrow inventory. Mode discipline frames *where* questions belong but not *which* questions are mandatory. Bide — including its inspection criteria — is not in the method at all. Reversibility is not in canon at all.

The result: the rule is honored on principle and violated in execution, while the inspection discipline and reversibility reasoning that distinguishes legitimate Build (AMS-wire) from sloppy Build (the six MCP server / wrapper handrolls) live only in operator judgment. The 2026-05-04 recurrence inside AMS itself — at the wrapper layer, three days after this promotion landed and one day after the day-3 journal Constraint row named the SDK explicitly — is the strongest evidence that proposal-without-execution does not bind a fresh agent session. The proposal must reach `executed` status for the rule to do its job.

## Proposed Promotion

This promotion is a coordinated unit of three edits that should land together. They depend on each other for coherence. Per `AGENTS.md`, canon is read-only to agents — these edits are executed by the operator after acceptance, not by automation.

### Edit 1 — Add Bide as the Sixth B to the Existing Method Doc

**Target:** `canon/methods/borrow-bend-break-beget-build.md`

**Changes:**

- **Title** stays as currently rendered or updates to "Method: Borrow, Bend, Break, Beget, Bide, Build" (operator's choice).
- **Tags:** add `"6B"`, `"bide"`, `"reversibility"`. Keep `"5B"` for backward-reference.
- **The Sequence section:** insert a new subsection `### Bide — Wait for the Field to Build It For You, Then Inspect What Surfaces` between `### Beget` and `### Build`.
- **The Constraints section:** add reversibility as a planning-time criterion that the method requires consideration of.

Full proposed text for both edits is staged at `canon/methods/borrow-bend-break-beget-build.diff.md` (working draft delivered alongside this promotion).

### Edit 2 — Create a New Tier-1 Constraint Doc

**Target:** `canon/constraints/borrow-evaluation-before-implementation.md` (new file)

**Shape:** A tier-1 constraint that binds the agent in planning mode to produce a falsifiable 6B Evaluation table plus a one-line Reversibility Note before execution begins. The table has six rows (one per B), verdict-per-row including the new Bide verdicts (`waiting` / `inspected-and-adopted` / `inspected-and-rejected` / `n/a` / `skipped`), and required justifications/criteria for skips and rejections. Includes the Goldratt local-maxima rationale, trigger conditions, definitions of what counts as a real Borrow vs. a real Bide, the inspection criteria that distinguish a legitimate `inspected-and-rejected` from an aesthetic skip, the Reversibility section with format and guidance, failure-mode table, and worked examples drawn from oddkit (success: adopted) and agent-messaging-service (success: rejected, justifying Build) — explicitly framed as both being correct outcomes of the same fork.

Full proposed text is staged at `canon/constraints/borrow-evaluation-before-implementation.md` (working draft delivered alongside this promotion).

### Edit 3 — Add One Bullet to the Bootstrap

**Target:** `canon/bootstrap/model-operating-contract.md`

Add to "Working Principles":

```text
- **Borrow before Build, evaluated in planning, with reversibility surfaced.** Any
  implementation task with an upstream substrate (SDK, reference impl, widely-
  adopted library) — or one the field is visibly converging toward — requires a
  6B Borrow Evaluation in the plan before execution begins. Six rows, one verdict
  each, named justifications for skips, named criteria for `inspected-and-rejected`,
  tripwires for `waiting`, plus a one-line Reversibility Note. Reference:
  `klappy://canon/constraints/borrow-evaluation-before-implementation`.
```

Full proposed text is staged at `canon/bootstrap/model-operating-contract.diff.md` (working draft delivered alongside this promotion).

### Rationale

- **Three edits, one decision unit.** Splitting them creates ordering hazards: the constraint references 6B before the method canonizes the sixth; the bootstrap references the constraint before the constraint exists. Land together (same operator session, sequenced: method → constraint → bootstrap).
- **Bide is not new behavior.** The operator already practices it (oddkit write layer adopted, AMS rejected after inspection); this canonizes existing discipline rather than introducing a new burden. The agent gains access to the operator's discernment vocabulary instead of leaving every Bide call as solo operator judgment.
- **Both fork outcomes are framed as success.** Treating `inspected-and-rejected → Build` as a "fallback" rather than as a correct resolution would reintroduce the same bias that made the agent skip Borrow in the first place — the implicit belief that Build is shameful. It isn't. Build after a documented rejection is the rule's correct answer for that case.
- **Reversibility is load-bearing.** Without it, the rule degrades into "always Bide" or "always Build minimal" depending on the agent's mood. The Reversibility Note forces the asymmetric swap-cost into the planning conversation where it belongs.
- **The inspection step is load-bearing.** Without it, the rule degrades into "always wait" — which would have produced wrong outcomes for AMS. The `inspected-and-rejected` verdict with named criteria is what makes the rule durable across the success and failure cases.
- **Falsifiable, not ritual.** The evaluation is six lines plus a reversibility note with verdicts the operator can challenge. It is not a checkbox.
- **Names the actual failure mode.** "I want to understand it" is the real reason handrolling happens. Naming it inside the rule is the only way to short-circuit it.
- **Forces the cost into planning, not execution.** Aligns with `klappy://canon/constraints/mode-discipline-and-bottleneck-respect` — planning is where questions are cheap.
- **Frames the cost in Goldratt terms.** The agent's local "efficiency" is not the goal; the operator's throughput at the bottleneck is. This argument is durable; it survives changes in tooling and model behavior.
- **Bide criteria are explicitly judgment-based for now.** The constraint says so. When patterns emerge from observed Bide outcomes, they get canonized later. No premature formalization. Reversibility joins the criteria list as the most application-specific.
- **Bootstrap line ensures it loads on first turn.** Canon-only changes are insufficient if the rule isn't in the contract that gets fetched at session start.

## Risk Assessment

| Risk Level | Description                                                                              |
| ---------- | ---------------------------------------------------------------------------------------- |
| Medium     | Adds a step to a stable canonical method AND adds a tier-1 constraint binding all agent implementation work AND introduces reversibility as a new planning-time consideration |

**Risk level**: Medium

**Mitigation:**

- *Risk that Bide becomes an excuse to defer everything.* Mitigated by the tripwire requirement on `waiting` and the requirement to inspect at tripwire time. No tripwire = not a Bide = dropped scope.
- *Risk that `inspected-and-rejected` becomes "I didn't like it."* Mitigated by the requirement to name which inspection criterion applied and what specifically was inspected (named libraries, repos, versions). A bare "didn't fit" does not satisfy the verdict.
- *Risk that the rule blocks legitimate handrolls (like AMS).* Explicitly addressed: the `Bide → inspected-and-rejected → Build = minimal` path is the canonical way to get to a justified handroll. The rule does not forbid handrolling; it forbids handrolling that skipped the upstream evaluation. Both fork outcomes are framed as success.
- *Risk that the SDK is genuinely worse than a handroll.* Mitigated by the Break verdict and the Bide rejection criteria. Handrolling is allowed through either Break (tried it, broke it) or Bide rejection (waited, inspected, didn't fit) — it is not allowed when both are silent.
- *Risk of scope creep into "always use someone else's code."* Mitigated by the trigger-conditions list AND by the explicit rejection criteria (vision conflict, foundational gap, gross overcomplication, opinionated stack imposition, improper authority, persistent gap). The rule explicitly defends the operator's authority over architectural choices.
- *Risk that the Reversibility Note becomes ritual.* Mitigated by the per-application asymmetric format ("forward | backward") that forces specifics. A symmetric "moderate | moderate" without reasoning is challengeable.
- *Risk of breaking existing references to 5B.* Mitigated by keeping the `"5B"` tag on the method doc as a backward reference and noting the rename. Existing canon docs that cite 5B do not become incorrect — 6B is a superset.
- *Risk that "Bide" is the wrong name.* Mitigated by treating the name as the operator's call. The position, semantics, three resolution paths, inspection criteria, and reversibility consideration are what matter; the label is one find-and-replace away.

## Status

`proposed`

## Review Notes

(To be filled during review)

- **Reviewer**:
- **Decision**:
- **Date**:
- **Notes**:
- **Naming decision (Bide / other)**:
- **Inspection criteria — additions or refinements**:
- **Reversibility format — keep "forward | backward" or refine**:

## Execution Record

(To be filled after acceptance, executed by operator per `AGENTS.md` canon-read-only rule)

- **Commit**:
- **Method doc updated (Edit 1)**: `canon/methods/borrow-bend-break-beget-build.md` (consider rename to `borrow-bend-break-beget-bide-build`)
- **Constraint doc created (Edit 2)**: `canon/constraints/borrow-evaluation-before-implementation.md`
- **Bootstrap doc updated (Edit 3)**: `canon/bootstrap/model-operating-contract.md`
- **Backlinks added**:

---

## Operator Note

This artifact exists because the operator surfaced the recurrence of the handroll failure on the fifth occurrence (escalated during the sixth project, agent-messaging-service), framed the rationale in *The Goal* / theory-of-constraints terms, named the missing step (Bide) by describing the oddkit-write-layer proof case (with its specific bet on connector-pattern maturity and humans as the manual wire/bus during the wait), corrected the framing of agent-messaging-service from "sixth failure" to "worked example of the `Borrow → Bend → Break → Bide → inspected-and-rejected → Build = minimal` path", surfaced the inspection criteria (vision conflict, foundational gap, gross overcomplication, opinionated stack imposition, improper authority), and introduced reversibility as a load-bearing planning-time criterion that varies per application.

By the rules of `klappy://docs/promotions` § "Promotion Review Triggers," this satisfies *Repeated validation failures* (≥2) by a wide margin (now 6, with the AMS hosted `/mcp` wrapper added 2026-05-05 as the sixth) and *Rules require explanation* (the 5B method exists but isn't operationally crisp at the agent's planning-to-execution boundary, lacks the Bide step entirely, has no vocabulary for the inspection criteria the operator already applies in practice, and has no treatment of reversibility cost).

**Recurrence update — 2026-05-05.** The original artifact framed agent-messaging-service as "worked example of the `Borrow → Bend → Break → Bide → inspected-and-rejected → Build = minimal` path" — and that framing remains correct *for the AMS wire layer*. However, on 2026-05-04 the same project shipped its hosted `/mcp` wrapper (PR #33, D0023) at the layer above the wire, and that wrapper is 1003 lines of handrolled JSON-RPC dispatch with no MCP SDK dependency — directly contradicting the binding journal Constraint row dated 2026-05-03 that named Cloudflare `agents/mcp` McpAgent for this exact endpoint. The pattern recurred at finer altitude inside a project that had correctly applied the rule at coarser altitude. This is the sharpest possible evidence that proposal-without-execution does not bind a fresh agent session: P0002 was on disk three days, the day-3 journal Constraint row was on disk one day, the highest-altitude SPEC §11 still defaulted the next agent to handroll, and the next agent followed SPEC. An AMS-local manifestation of the rule has been landed at `ams://canon/constraints/mcp-build-side-governance` (and the contradicting SPEC §11 line patched) to bind the next AMS MCP wrapper session pending upstream canon execution. The upstream canon execution — Edits 1, 2, 3 of this promotion — remains the load-bearing prevention for the next *new* MCP server project.

Per `docs/promotions/README.md` and `AGENTS.md`, agents propose; humans decide; canon is read-only to agents. This is a proposal. The drafted constraint doc and diff documents for the method and bootstrap are delivered alongside this promotion as working drafts so review has the actual proposed text — not just descriptions — and so execution after acceptance is a copy/paste operation, not a re-derivation.
