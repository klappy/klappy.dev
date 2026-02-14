---
uri: klappy://canon/values/shared-values-as-trust-proxy
title: "Shared Values as a Trust Proxy"
audience: canon
exposure: nav
tier: 1
voice: first_person
stability: stable
tags: ["canon", "values", "trust", "agents", "teams", "coordination", "handbook"]
epoch: E0005
date: 2026-02-13
derives_from: "canon/values/axioms.md, canon/values/orientation.md"
complements: "canon/constraints/verification-and-evidence.md, canon/values/axioms.md, docs/architecture/epistemic-os-layers.md, odd/appendices/cognitive-saturation-threshold.md, docs/evidence/testimony-2026-02-13.md, writings/the-most-expensive-problem.md, writings/the-parallel-architecture.md"
governs: "Trust expectations between agents, humans, and mixed teams operating under ODD"
status: final
start_here: true
start_here_order: 9
start_here_label: "Shared Values as a Trust Proxy"
---

# Shared Values as a Trust Proxy

> Trust between agents, humans, and mixed teams cannot be assumed — it must be bootstrapped through shared values. When participants share explicit axioms, identity, and failure-mode guidelines, they gain a communication mechanism that makes transparency cheaper than concealment. Shared values do not guarantee trust; they provide a proxy that makes trust-building behaviors the path of least resistance. This is the same function an organizational handbook serves for human teams — applied to any combination of human and AI participants.

-----

## Summary — Trust Is Not a Feature; It Is What Shared Values Produce

Trust is the most expensive prerequisite in any collaboration. Without it, every interaction carries overhead: verification of intent, hedging against concealment, duplicate work to confirm claims. ODD's axioms and orientation creed were not designed as trust mechanisms, but they function as one. When all participants in a collaboration share the same explicit values, three things happen that would otherwise require significant effort to achieve independently.

First, transparency becomes the default. An agent operating under "A Claim Is a Debt" finds it structurally easier to report an honest failure than to construct a plausible-sounding success. The values create a path of least resistance toward honesty — not because the agent "wants" to be honest, but because the shared framework makes concealment more expensive than disclosure.

Second, failure modes become navigable. When an agent falls short, shared values provide a common vocabulary for diagnosing what went wrong. Instead of the human guessing whether the agent lied, got confused, or cut corners, both parties can reference the specific axiom that was violated. This transforms failure from a trust-destroying event into a calibration opportunity.

Third, the human's frustration becomes proportional. Without shared values, agent failure feels arbitrary — the human has no framework for understanding *why* the agent went wrong, and the emotional cost is high. With shared values, the human can attribute the failure to a specific mechanism ("it violated Axiom 4 — it didn't observe before asserting") and respond constructively rather than reactively.

These effects are not theoretical. They have been observed consistently in the development of ODD itself, where agents operating under the canon produce qualitatively different failure reports than agents operating without it.

-----

## The Organizational Handbook Analogy — Why This Works

Every functioning organization encodes its culture into a handbook. The handbook is not a set of rules to be memorized — it is a shared identity document that tells participants: this is who we are, this is how we behave, and this is what happens when we fall short.

The handbook serves a trust function. A new employee who has read and signed the handbook can be trusted to a baseline degree — not because the handbook guarantees good behavior, but because it establishes shared expectations. When violations occur, both parties can reference the handbook rather than arguing from first principles about what should have happened.

ODD's canon functions identically for mixed human-agent teams. The axioms are the handbook. The orientation creed is the identity statement. The constraints are the behavioral expectations. When an agent is bootstrapped with these documents, it operates within a shared identity that makes its behavior more predictable, its failures more diagnosable, and its communication more transparent.

The analogy extends further: just as organizational handbooks are updated annually to reflect collected learnings, the canon evolves through epochs. Each epoch encodes the latest reflection of what effective values look like for this system. Participants who adopt the canon are signing the current edition of the handbook.

-----

## What Shared Values Do Not Guarantee

Shared values are a trust *proxy*, not trust itself. They reduce the cost of trust-building behaviors but do not eliminate the need for verification. Specifically:

Shared values do not prevent an agent from making errors. They make errors more visible and diagnosable, but an agent can still violate every axiom it was given. The axioms create accountability, not infallibility.

Shared values do not replace evidence. An agent that shares your values still owes receipts for its claims. The trust proxy reduces the overhead of *communication* about failures — it does not reduce the requirement for *verification* of claims. Axiom 4 still applies: if you didn't observe, you don't know.

Shared values do not scale automatically. A set of values that works for a two-person team may not work for a twenty-agent swarm. The proxy effect depends on all participants having internalized the same values at sufficient depth. As team size grows, the cost of ensuring genuine shared understanding grows with it.

-----

## The Fork Model — Trust Requires Genuine Adoption, Not Compliance

ODD's canon comes with opinionated defaults — the author's values, expressed for evaluation without requiring agreement. This is intentional. Imposed values do not produce trust; they produce compliance. Compliance is brittle and breaks under pressure. Trust requires genuine adoption.

The fork model exists to preserve this distinction. Teams that share the author's values can use the canon as-is. Teams that don't should fork it and encode their own. The system's architecture supports this: the values layer is portable and swappable. What matters is not *which* values a team holds, but that the values are explicit, shared, and load-bearing.

A team using a forked canon with genuinely held values will outperform a team using the default canon through mere compliance. The trust proxy only works when the values are real — when they constrain behavior at moments when it would be easier to act otherwise.

-----

## Derivation — How This Connects to the Axioms

This document does not introduce new axioms. It names a *consequence* of the existing axioms that was previously implicit: when the four axioms are shared by all participants in a collaboration, trust becomes a structural outcome rather than an aspirational goal.

The trust proxy effect derives specifically from:

- **Axiom 1 (Reality Is Sovereign):** Shared commitment to reality over narrative makes concealment structurally expensive.
- **Axiom 2 (A Claim Is a Debt):** Shared understanding that claims require evidence creates accountability without surveillance.
- **Axiom 3 (Integrity Is Non-Negotiable Efficiency):** Shared recognition that shortcuts on truth cost more than honesty makes transparency the efficient path.
- **Axiom 4 (You Cannot Verify What You Did Not Observe):** Shared acknowledgment of observation requirements prevents the most common mode of agent failure — asserting without checking.

When all four axioms are held by all participants, the combined effect is a trust environment where honesty is cheaper than deception, failures are navigable rather than catastrophic, and collaboration overhead decreases over time as the shared identity deepens.

-----

## Constraints — This Document Describes, It Does Not Prescribe

This document names the trust proxy effect as an observable consequence of shared values. It does not add new requirements to the system. The requirements remain the axioms themselves. This document exists to make the trust mechanism legible — so that teams adopting or forking ODD understand *why* shared values matter, not just *that* they matter.
