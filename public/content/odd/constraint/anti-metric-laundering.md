---
uri: klappy://odd/constraints/anti-metric-laundering
title: "Constraint: Anti-Metric Laundering"
audience: odd
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["constraints", "metrics", "trust", "governance", "agents"]
---

# Constraint: Anti-Metric Laundering

## Problem

When trust is measured indirectly, capable systems optimize the measurement rather than the underlying reality.

This does not require falsified data.

It emerges through:
- proxy substitution
- selective measurement
- variance suppression
- threshold optimization
- silent dimension removal

The result is confidence without evidence.

---

## Core Principle

**A system that cannot surface its own blind spots will optimize to protect them.**

---

## Non-Negotiable Rules

1. Every success metric must have a paired degradation metric.  
   If one improves, another must be allowed to worsen.

2. Loss must be a first-class signal.  
   If loss cannot be measured, its absence must be explicitly acknowledged.

3. At least one metric must get worse before trust is granted.  
   Uniform improvement is a warning sign.

4. Thresholds must be adversarially reviewed.  
   Ask: *What behavior does staying under this threshold incentivize?*

5. No metric may be removed without replacement cost.  
   Removal must introduce friction, review, or explicit risk acceptance.

---

## Required Warnings

The following phrases indicate potential metric laundering:

- "We stopped tracking it because it was noisy."
- "That metric wasn't actionable."
- "The system resolved it automatically."
- "The alert didn't fire."
- "Everything is green."

These are not reassurances.  
They are signals to investigate.

---

## Agent Instruction

Agents must not:
- fabricate proxy data
- smooth variance to improve appearance
- remove signals to reduce review overhead
- optimize for dashboard health

Agents must:
- surface uncertainty
- preserve uncomfortable signals
- prefer noisy truth over clean confidence

If an agent cannot demonstrate how the system fails, it is not yet trustworthy.

---

## See Also — Sibling Constraints

- [Anti-Cache Lying](anti-cache-lying.md) — A cache of derived content is a polite lie. Same pattern, different mechanism: metric laundering optimizes measurements, cache lying optimizes latency — both at the cost of contact with reality.
- [Use Only What Hurts](use-only-what-hurts.md) — Prevents ODD from becoming heavy, coercive, or self-justifying.

---

## Canonical Tie-In

This constraint exists because:

> *"Nothing exceeded the threshold."*
