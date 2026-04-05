---
uri: klappy://canon/principles/kiss-simplicity-is-the-ceiling
title: "KISS — Simplicity Is the Ceiling, Not the Floor"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["canon", "principle", "KISS", "simplicity", "design", "composability", "vodka-architecture", "design-smell"]
epoch: E0007.1
date: 2026-04-04
derives_from: "canon/principles/vodka-architecture.md, canon/values/axioms.md"
complements: "canon/principles/ritual-is-a-smell.md, canon/principles/maintainability-one-person-indefinitely.md"
governs: "All MCP servers, tools, and orchestration layers in this program"
status: active
---

# KISS — Simplicity Is the Ceiling, Not the Floor

> Every action, endpoint, or abstraction in an epistemic server must justify its existence against the alternative of not existing. oddkit has ten composable actions — not twenty, not fifty — because every action beyond the minimum is complexity the server carries forever. Prefer fewer tools that compose well over many tools that each handle a narrow case. If the server requires explanation, it has already failed.

---

## Summary — Simplicity Is Structural, Not Aspirational

Keep It Simple is not a preference. In vodka architecture (`canon/principles/vodka-architecture.md`), it is a structural constraint: the server's behavior must be obvious from its surface area. The proof is oddkit itself: the same ten actions serve a 400+-document software architecture canon and a 26-document oral theology corpus without modification. No action was added for theology. No action was removed for software.

The ceiling metaphor matters. Simplicity is not the floor you start from and leave behind as the system matures. It is the ceiling you must not exceed. Growth happens in the knowledge base, not the server. When a new capability is needed, the first question is always: can this be composed from existing actions?

---

## Smell Test — How to Detect a KISS Violation

- **"We need a new action for X"** when X can be accomplished by composing existing actions. orient + search + challenge already covers "evaluate this proposal" — a dedicated `evaluate` action would duplicate their composition.
- **Agent confusion about which tool to use.** When an agent hesitates between two similar actions, the surface area has grown ambiguous. Ten actions is clear. Twenty creates selection paralysis.
- **Documentation growing faster than the knowledge base.** If explaining the server takes more words than explaining the canon it serves, the server has become the product instead of the infrastructure.
- **"Let me explain how this works."** If a new user or agent needs a tutorial to use the server, the server is too complex. oddkit's ten actions are self-describing from their names.

---

## Failure Modes — What Breaks When KISS Is Violated

**Action sprawl.** Each new action adds documentation, testing surface, edge cases, and cognitive load for every agent that uses the server. The cost is not the action itself — it's the combinatorial complexity of N actions that might interact.

**Composition death.** When specialized actions exist, agents stop composing. They reach for the specific tool instead of thinking about what sequence of primitives would work. The system loses flexibility because specialized actions are narrower than the compositions they replaced.

**Maintenance drag.** Every action is a maintenance surface the single maintainer carries indefinitely. Complexity that enters the server never leaves voluntarily — it must be actively removed, which is harder than not adding it.

---

## What Does NOT Count as a KISS Violation

- **A knowledge base growing to thousands of documents.** That's growth in the right layer — the canon, not the server.
- **Complex governance rules in the canon.** Governance complexity belongs in documents, not server code. A 50-rule gate checklist is not a server complexity problem.
- **Genuinely irreducible new capability.** If composition truly cannot serve a need and the need is grounded in epistemic discipline (not domain convenience), a new action is justified. The burden of proof is on the proposer.

---

## Required Response When Detected

1. **Attempt composition first.** Document the composition that serves the need using existing actions.
2. **If composition fails, document why.** The failure must be structural ("these actions cannot be sequenced to produce X") not preferential ("it would be easier with a dedicated action").
3. **If justified, apply the removal test.** Can the server still function without it? If yes, it's convenience, not necessity.
4. **Audit existing actions.** A new action proposal is an opportunity to check whether existing actions have drifted beyond their original scope.

---

## See Also

- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — the parent design pattern
- [Ritual Is a Smell](klappy://canon/principles/ritual-is-a-smell) — complexity often compensates for missing simplicity
- [Maintainability — One Person, Indefinitely](klappy://canon/principles/maintainability-one-person-indefinitely) — every action added is maintenance carried forever
