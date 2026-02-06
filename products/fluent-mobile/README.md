---
uri: klappy://products/fluent-mobile
title: "Fluent Mobile Lane"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["products", "fluent-mobile", "lane", "poc", "obt", "mobile"]
---

# Fluent Mobile Lane

> Mobile-first OBT companion app — Proof of Concept.

## Description

The fluent-mobile lane explores whether a mobile-first companion app is viable for Oral Bible Translation (OBT) field workflows. This is a learning-focused PoC, not a production delivery. The primary goal is to test hypotheses about mobile viability, performance, usability, and cultural fit before committing to a larger build.

## Outline

- Contents
- Lane Status
- Key Constraints
- Starting an Attempt
- What Success Looks Like

---

## Contents

| File | Purpose |
|------|---------|
| [`PRD.md`](PRD.md) | Active PRD (authoritative requirements) |
| [`HISTORY.md`](HISTORY.md) | PRD version history and learnings links |
| [`AGENT_RULES.md`](AGENT_RULES.md) | Non-negotiable agent constraints |
| [`KICKOFF.md`](KICKOFF.md) | Full attempt instructions (PoC-specific) |
| [`INSTRUCTIONS.md`](INSTRUCTIONS.md) | Field testing and hypothesis validation guide |
| [`ATTEMPT_KICKOFF.md`](ATTEMPT_KICKOFF.md) | Copy/paste prompt to start an attempt |
| `attempts/` | Attempt artifacts by version |
| `src/` | Implementation source (when applicable) |

---

## Lane Status

| Field | Value |
|-------|-------|
| **PRD Version** | See [PRD.md](PRD.md) |
| **Stage** | Proof of Concept / Exploration |
| **Status** | Active |
| **Confidence** | Intentionally low (learning-focused) |

---

## Key Constraints

- This is a **shared mental model test**, not a feature test
- Performance is treated as a **foundational feature**
- Must be quick to test, easy to discard, fast to iterate
- **Failure with fast learning is a win**
- Must NOT imply production readiness
- Must NOT block or slow web app progress

---

## What Success Looks Like

### Minimum Success

- Clear understanding of why the PoC failed or struggled
- Field feedback that directly informs next iteration

### Aspirational Success

- Two teams complete at least one chapter draft on mobile
- Users express willingness to use it again

---

## Starting an Attempt

1. Read [`PRD.md`](PRD.md) — current requirements
2. Read [`KICKOFF.md`](KICKOFF.md) — sandbox rules, attempt structure, PoC mindset
3. Read [`INSTRUCTIONS.md`](INSTRUCTIONS.md) — hypothesis testing guide, user context, field testing protocol
4. Read [`AGENT_RULES.md`](AGENT_RULES.md) — non-negotiable verification rules
5. Create attempt folder at `attempts/v{VERSION}/attempt-NNN/`
6. Copy frozen PRD snapshot to `attempts/v{VERSION}/PRD.md` if not exists
7. Test hypotheses — don't build features
8. Document learnings regardless of outcome

---

## Exit Criteria

This PoC should be **easy to abandon**.

If learning slows, confidence drops, or it begins to resemble a production commitment → stop.

---

## See Also

- [PRD](PRD.md) — Current requirements
- [HISTORY](HISTORY.md) — Version evolution and learnings
- [Product Lanes](/docs/appendices/product-lanes.md) — Lane architecture
- [Attempt Lifecycle](/docs/appendices/attempt-lifecycle.md) — How attempts work
- [Verification & Evidence](/canon/constraints/verification-and-evidence.md) — Evidence requirements
