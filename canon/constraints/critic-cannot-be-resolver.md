---
uri: klappy://canon/constraints/critic-cannot-be-resolver
title: "Critic Cannot Be Resolver — Detection and Remediation Require Separate Contexts"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "constraints", "mode-discipline", "agent-design", "detection", "remediation", "separation-of-concerns", "context-corruption"]
epoch: E0009
date: 2026-05-08
derives_from: "canon/principles/verification-requires-fresh-context.md, canon/values/axioms.md"
complements: "canon/voice/oddie-the-river-guide.md, canon/constraints/mode-discipline-and-bottleneck-respect.md"
governs: "All agent-system designs where one agent detects issues and another (or the same) resolves them"
status: active
target_repo: "outcomes-driven-development"
---

# Critic Cannot Be Resolver — Detection and Remediation Require Separate Contexts

> The agent that detects drift cannot be the agent that resolves it. Same context corrupts both functions. The critic who also resolves optimizes findings toward things it can fix. The resolver who also detected optimizes away signals that came from a conflicted source. Detection and remediation must live in separate agents, separate sessions, or separate contexts. This is mode discipline applied to agent design — the same structural principle that prevents a creator from validating their own work, extended to prevent a detector from remediating its own findings.

---

## Summary — Same Context, Corrupted Signal

Verification requires fresh context. A creator cannot honestly evaluate their own work because accumulated creation context bridges the gap between intent and artifact, making flaws invisible. This is established in [Verification Requires Fresh Context](klappy://canon/principles/verification-requires-fresh-context).

This constraint extends that principle into agent-system design. When an agent both detects and resolves issues, two corruption paths emerge:

**Critic-side corruption.** The detecting agent learns, implicitly or explicitly, which findings it can resolve easily. Over time, its detection calibrates toward actionable findings and away from findings that are real but hard to fix. The critic becomes less honest — not from intent, but from optimization pressure toward findings that produce clean resolution cycles.

**Resolver-side corruption.** The resolving agent inherits the detecting agent's framing of the problem. When both roles share the same context, the resolver cannot independently assess the finding's validity. It optimizes toward "how do I fix the thing I just said was broken" rather than "is this actually broken, and if so, what is the right fix." The finding becomes unfalsifiable within the same context.

Both corruptions are invisible from inside the context. The agent producing them experiences clean reasoning. The corruption is structural, not intentional.

---

## The Constraint

In any system where agents detect issues and agents resolve issues:

1. **Detection and resolution must be separated by a context boundary.** The boundary can be a session boundary (different sessions), an agent boundary (different agents), or a temporal boundary (different times with a context flush between). The minimum requirement is that the resolver does not inherit the detector's accumulated reasoning about the finding.

2. **The detector reports findings; the resolver independently assesses and acts.** The finding is a claim. The resolver treats it as a claim requiring evaluation, not as an instruction requiring execution. The finding may be wrong. The finding may be right but the proposed framing may be wrong. The resolver must have the independence to determine this.

3. **Shared context between detection and resolution is a design defect, not a convenience.** Systems that collapse detection and resolution into one agent for efficiency are trading signal quality for throughput. The efficiency is real. The signal degradation is also real and harder to measure.

---

## Why This Is Universal in Agent-System Design

This constraint is not scoped to a specific agent or system. It applies universally to agent architectures because the corruption mechanism is structural, not domain-specific.

The mechanism is the same one that makes self-review unreliable: a system evaluating its own output cannot distinguish between "I found this" and "I found this and I know how to fix it, so it must be a real finding." The second sentence contains a logical non-sequitur that is invisible from inside the context.

Examples of the constraint in practice:

- **Code review.** The author of a patch should not be the sole reviewer. Not because they are biased, but because their creation context makes certain flaws invisible. Industry standard.
- **Financial audit.** The firm being audited and the auditing firm must be separate entities. Regulatory requirement. Same structural reason.
- **Scientific peer review.** The authors of a paper do not review their own paper. The reviewers do not know who the authors are (in double-blind review). Same separation, same reason.
- **Oddie's design.** Oddie detects — drift, mode collapse, anomalies. Oddie does not resolve. The resolution lives in a separate agent, session, or human decision. The separation is a binding architectural constraint, not a preference.

---

## Derivation

This constraint derives from two sources:

**Verification Requires Fresh Context** ([klappy://canon/principles/verification-requires-fresh-context](klappy://canon/principles/verification-requires-fresh-context)): the principle that a creator cannot be their own critic. This constraint names the same structural problem for agent systems: a detector cannot be its own resolver.

**Axiom 4 — You Cannot Verify What You Did Not Observe** (`canon/values/axioms.md`): a resolver operating within the detector's context has not independently observed the finding. It has inherited a characterization of the finding. Inheritance is not observation.

The constraint was implicit in prior canon. This document makes it explicit and names it for agent-system design specifically.

---

## Retraction Conditions

This constraint retracts only if mode discipline itself is retracted — if the principle that epistemic modes must be separated is shown to be wrong. The corruption mechanism described here is a direct consequence of mode discipline applied to agent design. If mode discipline holds, this constraint holds.

A weaker retraction path exists if evidence emerges that context boundaries between detection and resolution produce no measurable improvement in finding quality. Such evidence would need to account for the measurement difficulty: critic-side corruption is invisible from metrics that only count resolved findings, because the corrupted findings are the ones that never surface.

---

## Confidence

Established. The underlying principle (verification requires fresh context) is already canonical and grounded in observed evidence. This constraint names the same mechanism for a specific application domain (agent-system design). The application is new; the mechanism is not.

---

## See Also

- [Verification Requires Fresh Context](klappy://canon/principles/verification-requires-fresh-context) — the principle this constraint operationalizes for agent design
- [Mode Discipline and Bottleneck Respect](klappy://canon/constraints/mode-discipline-and-bottleneck-respect) — the mode discipline this constraint extends
- [Oddie the River Guide](klappy://canon/voice/oddie-the-river-guide) — the first agent designed under this constraint
- [Axioms](klappy://canon/values/axioms) — Axiom 4 grounds the derivation
