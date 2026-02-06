---
uri: klappy://odd/terminology
slug: odd-terminology
version: 0.1
status: evolving
audience: odd
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["odd", "terminology", "disambiguation", "boundary", "definition", "outcomes-driven-development", "glossary"]
relevance: supporting
execution_posture: operational
---

# 📖 ODD Terminology & Disambiguation

This document defines the constrained vocabulary of Outcomes-Driven Development. It governs how language is used **before** elevation to Canon — ensuring precision at the point of origin, not retroactive clarification.

---

## Why This Exists

Language drifts. Terms get overloaded. Meanings blur under repetition.

In ODD, ambiguous language creates:
- misaligned expectations
- false confidence in shared understanding
- governance that sounds rigorous but isn't

This document exists to:
- **constrain vocabulary** — fewer terms, tighter meanings
- **disambiguate collisions** — clarify where everyday usage differs from ODD usage
- **establish boundaries** — define what terms do NOT mean

---

## Namespace Ontology

### ODD vs Canon

| Namespace | Role | Contains |
|-----------|------|----------|
| `odd/` | Discipline, operating system, rules of motion | How thinking and work happen |
| `canon/` | Elevated truths distilled from experience | What survived that process |

**Key relationships:**
- ODD feeds Canon, but does not live inside it
- Canon may reference ODD
- ODD is not canon, and not subordinate to it
- Language governance (this document) belongs to ODD — it constrains canon formation

**Why this matters:**
If terminology lived under `canon/`, language would appear post hoc. ODD would look like a justification layer. By keeping it under `odd/`, we're saying: "This discipline governs how meaning is formed — before truth is elevated."

---

## Core Terms

### ODD (Outcomes-Driven Development)

**ODD meaning:** Outcomes-Driven Development — an approach to building software that prioritizes real-world results over artifacts. In an AI-accelerated environment, the limiting factor is no longer production speed; it is clarity of intent, quality of verification, and the ability to choose among outcomes. ODD makes those constraints explicit.

**Not:** A framework, a fixed workflow, or a claim that outcomes can be fully predicted.

**Core thesis:** The primary job of development is not writing code. It is defining outcomes, enforcing constraints, and verifying reality. AI accelerates execution; governance preserves trust.

**Test:** Are decisions governed by verifiable outcomes, or by artifacts and activity?

**See:** [/odd/README.md](/odd/README.md) for the public introduction, [/odd/manifesto.md](/odd/manifesto.md) for the extended operational framework.

---

### Outcome

**ODD meaning:** A verifiable state of reality that can be demonstrated, not just described.

**Not:** A deliverable, artifact, feature, or checkbox.

**Test:** Can you show it working? If explanation is required to prove it exists, it's not an outcome yet.

---

### Evidence

**ODD meaning:** Observable proof that an outcome occurred. Must be reproducible or recorded.

**Not:** Explanation, confidence, or expert assertion.

**Test:** Could a skeptic verify this independently?

---

### Artifact

**ODD meaning:** A byproduct of work — code, documents, diagrams. Ephemeral by default.

**Not:** The goal. Not proof of value.

**Test:** If this disappeared, would the outcome still be demonstrable?

---

### Elevation

**ODD meaning:** The deliberate act of promoting a verified truth from working memory to Canon.

**Not:** Filing, archiving, or organizing.

**Requirements:**
- Evidence exists
- The insight has survived stress
- The statement is stable enough to govern future decisions

---

### Canon

**ODD meaning:** The curated body of truths that have earned permanence through verification and survival.

**Not:** A knowledge base, wiki, or documentation dump.

**Test:** Does this statement constrain future decisions? If not, it's reference material, not canon.

---

### Attempt

**ODD meaning:** A bounded execution against a defined goal. Has a start, an end, and produces evidence.

**Not:** A try, experiment, or vague effort.

**Requirements:**
- Explicit goal
- Bounded scope
- Evidence captured (success or failure)

---

### Lane

**ODD meaning:** A parallel track of work with its own lifecycle, evidence, and maturity state.

**Not:** A branch, feature, or workstream in the general sense.

**Key property:** Lanes can evolve independently while sharing governance.

---

### Maturity

**ODD meaning:** The phase of a project that determines appropriate rigor level.

**Phases:**
- **PoC (Proof of Concept)** — Learning, speed, disposable artifacts
- **Pilot** — Proof, repeatability, early governance
- **Production** — Trust, durability, handoff readiness

**Not:** Quality, completeness, or age.

---

## Disambiguation Table

| Common Term | ODD Meaning | Common Misuse |
|-------------|-------------|---------------|
| "Done" | Evidence exists proving outcome | Code merged, ticket closed |
| "Works" | Verified under realistic conditions | Passed tests, "looks right" |
| "Documented" | Captured for future governance | Written down somewhere |
| "Tested" | Stress-tested against failure modes | Happy path confirmed |
| "Shipped" | Outcome delivered and verifiable | Artifact deployed |

---

## Anti-Patterns in Language

### Confidence as Evidence
"I'm confident this works" is not evidence. Confidence is a feeling. Evidence is observable.

### Explanation as Proof
"Let me explain why this is correct" is not proof. Explanations can be fluent and wrong. Demonstrations are harder to fake.

### Activity as Progress
"I worked on this for hours" is not progress. Time spent is input. Outcomes are output.

### Artifact as Outcome
"The code is written" is not an outcome. Code is an artifact. The outcome is what the code enables when verified.

---

## Boundary Conditions

### What This Document Does NOT Define

- **Domain-specific terms** — Each product/project may extend vocabulary within its scope
- **Implementation details** — How tools or systems work internally
- **Opinions** — This is constraint, not preference

### When to Extend

New terms may be proposed when:
- Existing vocabulary cannot express a necessary distinction
- The term has been used consistently across multiple attempts
- Ambiguity has caused actual confusion or failure

Extensions follow the same elevation process as any canon candidate.

---

## Usage Guidelines

### For Authors

- Use terms as defined here, not as commonly understood
- When a term might be ambiguous, link back to this document
- If you need a word not defined here, check if an existing term suffices first

### For Reviewers

- Flag terminology drift — when ODD terms are used with non-ODD meanings
- Distinguish between "this word is wrong" and "this concept needs a new word"

### For Canon Documents

- Canon documents should link here when term precision matters
- Do not duplicate definitions — reference, don't repeat

---

## Evolution Process

This document evolves through:

1. **Observation** — A term collision or ambiguity causes friction
2. **Proposal** — A clarification or new term is suggested
3. **Stress test** — The proposal is used in practice
4. **Elevation** — If it survives, it enters this document

Changes require evidence of the problem being solved.

---

> Language is not neutral. The words we use shape what we can think.
> ODD constrains vocabulary not to limit expression, but to increase precision where it matters.
