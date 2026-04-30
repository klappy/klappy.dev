---
uri: klappy://canon/methods/fresh-session-over-context-carry
title: "Method — Fresh Session Over Context Carry (When the Next Step Reads Canon, Read It Fresh)"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["canon", "methods", "session-discipline", "context-management", "mode-discipline", "epistemic-hygiene", "code-observation", "audit-2026-04-30", "epoch-8.4"]
epoch: E0008.4
date: 2026-04-30
derives_from: "canon/principles/code-claims-require-code-observation.md, canon/principles/dry-canon-says-it-once.md, canon/observations/time-blindness-axiom-violation.md"
complements: "canon/constraints/release-validation-gate.md, canon/principles/contract-governs-handoff-drift.md, odd/ledger/2026-04-30-audit-cleanup-encode-artifacts-landed.md"
governs: "Method for deciding whether a multi-phase workflow should continue in the current session or open a fresh one. Applies to any moment where the next phase's contract lives in canon (handoff, ledger, architecture doc) and the operator asks 'continue or fresh session?'"
status: active
---

# Method — Fresh Session Over Context Carry

> When the next phase of work has its contract in canon — a handoff, a ledger, an architecture doc — and the question is whether to continue in the current session or open a fresh one, the answer is almost always fresh. Context staleness compounds; canon does not. A fresh session reads the merged contract from canon at start-of-session and inherits no in-context drift from the session that authored it. This method names that default and the three conditions where it holds.

---

## Summary — When and Why to Open a Fresh Session

This method applies at the boundary between two phases of work where:

1. The next phase has its contract in canon (handoff, ledger, current-state doc, principle).
2. The current session authored or revised that contract.
3. The operator explicitly asks whether to continue or break.

In that situation, three forces favor a fresh session:

**Context budget is the limiting factor, not work-in-progress momentum.** Multi-phase canon work accumulates: code reads, canon fetches, intermediate analyses, supersession addendums. By the time the next phase begins, the in-context state is large and partially stale (because the canon it references has been updated within the session). Opening fresh trades zero work-in-progress for a clean read from current canon.

**Mode hygiene is harder to maintain across phase boundaries than within a phase.** A session that just finished planning-and-canon-revision work has different reflexes than a session about to do code execution. Continuing risks mode collapse — execution-mode work picking up planning-mode habits like asking clarifying questions during execution. A fresh session declares the new mode at start, with the canon contract as its anchor.

**The contract should be canon-resident, not in-context-resident.** This is the deepest reason and the one most aligned with `klappy://canon/principles/code-claims-require-code-observation`. If the next phase's contract sits in canon, the next session should read it from canon — not inherit the session-author's in-memory snapshot. The same principle that prevents stale code claims also prevents stale contract claims: don't substitute in-context recall for direct canon observation.

---

## When This Method Does NOT Apply

The default is fresh, but three conditions argue for continuing:

**The next phase is a small same-domain finish.** A typo fix, a single-file rename, a missing cross-reference — work that doesn't have its own contract because it doesn't need one. Continuing is cheaper than opening fresh and reading canon to do five lines of cleanup.

**The contract isn't yet merged.** If the handoff for the next phase is sitting in an open PR awaiting merge, starting the next phase before merge means working against a moving contract. Either merge first and then open fresh (clean), or finish the small cleanup that allows the merge (smaller scope, current session). Both are valid; what's invalid is starting execution against an unmerged contract while also continuing to revise it.

**The current session's context contains direct observations the next session would have to redo.** If the current session ran a code clone, observed live tool behavior, and the next phase needs that observation as ground truth, opening fresh costs a re-observation. Usually this is fine — observation is cheap — but if the observation was expensive (long agent run, multi-step verification) and is naturally captured in canon, continuing may be cheaper. Capture the observation in canon so the next session can read it; then either continue or open fresh based on the other two factors.

---

## The Operating Heuristic

When the operator asks "continue or fresh session?" and you're at a phase boundary:

1. Is the next phase's contract in canon and merged? → Fresh.
2. Is the next phase's contract in canon but unmerged? → Either merge first then fresh, OR finish the small in-session cleanup that enables merge.
3. Is the next phase a small same-domain finish without its own contract? → Continue.
4. Are direct observations from this session load-bearing for the next phase and not yet in canon? → Capture in canon now (small commit), then fresh.

Default to fresh when in doubt. The cost of a fresh session is a few minutes of re-orientation; the cost of a stale-context execution session is whatever the next staleness chain costs to clean up.

---

## How This Method Was Earned

Audit 2026-04-30 (afternoon) closed Phase 1 of E0008.4 with a cleanup PR (#158) that supersedes three stale artifacts and graduates `code-claims-require-code-observation`. At session end the operator asked "Continue with phase 2, or do we need a fresh handoff session?" The answer surfaced this method: the revised Phase 2 handoff was already in canon (in the cleanup PR), the next phase is execution against a different repo with a different validation gate, and continuing risked carrying canon-doc-revision reflexes into code execution. Fresh was clearly right; recognizing the reasoning was clear enough to graduate the method.

This is itself a worked example of the method: the conversation that produced this document is exactly the conversation that should not continue into Phase 2 execution. Phase 2 will open a fresh session, read this method's sibling artifacts (the Phase 2 revised handoff, the encode current-state doc, the dedup bug observation, the code-claims-require-code-observation principle) from canon at start-of-session, and execute against them.

---

## Anti-Patterns This Method Forbids

- "Let me just continue here since we're already in flow" — flow is a property of focused work within a phase, not a license to skip the phase boundary.
- "I have all the context loaded, why re-fetch?" — because context-loaded is not the same as canon-current; the in-context snapshot is from when it was loaded, not from now.
- "It's faster to continue" — usually true for the next ten minutes, usually false for the rest of the day. Fresh sessions front-load a few minutes of orientation in exchange for not re-paying staleness debt later.

---

## Anti-Patterns This Method Permits

- "Let me finish this small cleanup before we break" — yes, when the cleanup is genuinely small and bounded and prevents a half-state.
- "Capture this observation in canon first, then fresh" — yes, this is the right hand-off when in-session observations are load-bearing for the next phase.
- "Continue because the next step is a typo fix, not a new phase" — yes, phase-boundary triggers don't apply to within-phase finishing work.

---

## See Also

- [Code Claims Require Code Observation](klappy://canon/principles/code-claims-require-code-observation) — the same epistemic discipline applied to code state
- [Audit 2026-04-30 Cleanup Ledger](klappy://odd/ledger/2026-04-30-audit-cleanup-encode-artifacts-landed) — the cleanup that earned this method
- [DRY: Canon Says It Once](klappy://canon/principles/dry-canon-says-it-once) — the principle that canon, not context, is the single source of truth for stable claims
- [Mode Discipline and Bottleneck Respect](klappy://canon/constraints/mode-discipline-and-bottleneck-respect) — the constraint that fresh sessions help maintain across phase boundaries
