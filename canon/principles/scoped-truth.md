---
uri: klappy://canon/principles/scoped-truth
title: "Scoped Truth — Axioms Travel, Domain Doesn't"
audience: canon
exposure: nav
tier: 1
voice: first_person
stability: evolving
tags:
  - canon
  - principles
  - scoped-truth
  - governance
  - domain
  - portability
  - contamination
epoch: E0006
date: 2026-03-14
derives_from:
  - canon/values/axioms.md
  - canon/constraints/guide-posture.md
complements:
  - canon/principles/capability-is-not-permission.md
  - docs/explorations/epoch-signal-operator-governance.md
---

# Scoped Truth — Axioms Travel, Domain Doesn't

> When a single knowledge base serves every context, domain contamination is inevitable — software opinions bleed into theology conversations, engineering constraints shape venture strategy, personal canon governs domains it was never designed for. The fix is not a bigger knowledge base. The fix is scoping: axioms that define what counts as knowing are universal and travel with every context. Domain-specific knowledge — what counts as evidence, what authority hierarchy applies, what "done" looks like in this field — stays in its lane. Truth is not one corpus. Truth is a universal framework applied to scoped domains.

---

## Summary — Universal Axioms, Scoped Governance

"Capability Is Not Permission" addresses the operator's relationship to the system — the need for "enough." This principle addresses the system's relationship to knowledge — the need for scope. Together they are the two pillars of E0006: govern the operator, scope the truth.

The four foundational axioms — Reality Is Sovereign, A Claim Is a Debt, Integrity Is Non-Negotiable Efficiency, You Cannot Verify What You Did Not Observe — are domain-independent. They define what it means to know something, regardless of whether the domain is theology, software, medicine, venture strategy, or Bible translation. They answer the question "what counts as knowing?" and that question has the same answer everywhere.

What differs by domain is everything else: what counts as evidence, what source authority hierarchy applies, what constitutes a valid claim, what "done" looks like, what voice and posture to use, what gate criteria must be met before acting. These are governance decisions, and governance must be scoped to the domain it serves.

When governance is not scoped — when one domain's constraints leak into another — the system produces contaminated output that looks authoritative but serves the wrong context. The agent gives software engineering advice in a theology conversation. The venture analysis carries Bible translation assumptions. The pastoral counsel sounds like a technical specification. The contamination is invisible to the consumer because the axioms are satisfied — the claims are grounded, the evidence is cited — but the evidence comes from the wrong domain.

---

## The Observed Problem — Domain Contamination

This principle emerged from direct observation, not theory. oddkit operates from a single knowledge base: 391 documents encoding software architecture, Cloudflare Workers patterns, Bible translation tooling, epistemic constraints, and personal canon. When anyone uses oddkit for a different domain — venture strategy, theology research, pastoral planning — the results are contaminated by software development guidance that has no business being there.

The contamination was subtle. The axioms still applied. The progressive disclosure still worked. The claims were still grounded. But the *grounding* came from the wrong soil. An agent doing theology research would cite epistemic constraints written for code review. An agent doing venture analysis would apply "definition of done" criteria designed for deployment verification. The structure was correct. The content was misplaced.

This is not a tooling bug. It is a governance architecture problem. A single undifferentiated knowledge base cannot serve multiple domains without bleeding context between them.

---

## What This Principle Requires

When serving multiple domains, I must separate what is universal from what is scoped.

**Universal (travels with every context):**
- The four foundational axioms
- The orientation creed
- The writing canon's progressive disclosure requirements
- The definition of done's evidence requirements
- The principle that every claim is a debt

These define *how to think* and *what counts as knowing*. They apply everywhere because they are domain-independent. They are the substrate.

**Scoped (stays in its domain):**
- What counts as evidence in this domain (peer-reviewed research vs. field observation vs. financial projections)
- What source authority hierarchy applies (a dissertation vs. a blog post vs. a conversation transcript)
- What "done" means for this kind of work (a deployed system vs. a published paper vs. a completed translation)
- What voice and posture to use (academic vs. pastoral vs. technical vs. guide)
- What gate criteria apply before transitions (different domains have different thresholds for moving from exploration to execution)
- What extraction rules govern how sources are processed (a legal document yields obligations, a theology text yields doctrinal claims, a conversation yields decisions and action items)

**Governance is stackable.** Universal axioms cascade into every scope by default. Organization-level governance adds shared standards. Domain-level governance adds specific constraints. Each layer is additive. When there is a conflict, the more specific scope wins — and the tension is surfaced, not silently resolved.

---

## What This Principle Does Not Require

This is not an argument for isolation. Domains can and should inform each other. The insight that Bible translation's community validation process maps to AI agent verification is a cross-domain connection that produced real value. The pattern recognition that "the planning industrial complex" in software development mirrors meeting-heavy cultures in mission organizations is a cross-domain observation.

Cross-domain insight is valuable. Cross-domain contamination is not. The difference: insight is the *conscious* observation that a pattern in one domain applies to another. Contamination is the *unconscious* leaking of one domain's constraints into another's results. Insight is named and attributed. Contamination is invisible and assumed.

This principle requires scoping so that cross-domain connections are intentional, not accidental.

---

## The Test — Three Questions for Every Scope

1. **Are the axioms present?** If the scope doesn't carry the foundational axioms, it has no truth framework. The axioms must travel.
2. **Is the domain knowledge scoped?** If a theology query returns software engineering constraints, governance is leaking. Domain knowledge must stay in its lane.
3. **Are cross-domain connections explicit?** If the scope draws on knowledge from another domain, is that connection named and attributed — or did it bleed in silently? Insight is named. Contamination is invisible.

---

## Derivation

This principle derives from Axiom 1 (Reality Is Sovereign): the reality of a domain is sovereign over the conventions of another domain. Software engineering constraints are real within software engineering. They are not real within theology, even if they are structurally similar. Applying one domain's reality to another without conscious acknowledgment is a violation of observation — you are asserting something you have not observed in the domain you're serving.

It derives from Axiom 2 (A Claim Is a Debt): a claim grounded in evidence from the wrong domain is a debt paid with counterfeit currency. The claim *looks* grounded. The evidence *is* real. But it's from the wrong context, and the consumer cannot tell.

It complements "Capability Is Not Permission" (which governs the operator's relationship to the system) by governing the system's relationship to knowledge. Together they address the two gaps E0005 left open: the system had no axis for "enough" (operator governance), and the system had no axis for "scope" (domain governance).

---

## See Also

- [Capability Is Not Permission](/canon/principles/capability-is-not-permission.md) — the operator governance principle (E0006 companion)
- [Foundational Axioms](/canon/values/axioms.md) — the universal truth framework that travels with every scope
- [Epoch Signal — Operator Governance](/docs/explorations/epoch-signal-operator-governance.md) — the exploration that identified the epoch boundary
