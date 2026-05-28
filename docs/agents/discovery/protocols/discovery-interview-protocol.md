---
audience: docs
exposure: nav
tier: 3
protocol: discovery-interview
version: v0
stability: experimental
applies_to: discovery-role
---

# Discovery Interview Protocol

> Adaptive decision tree for discovery sessions. Not a fixed script.

---

## Phase 0 — Frame Confirmation

Ask only what isn't already obvious from artifacts.

**Questions (choose relevant):**
- What maturity are we targeting? (Exploration / PoC / Prototype / MVP / Feature / Iteration / Patch)
- Is this standalone, nested within an existing PRD, or replacing something?
- Are we working within an existing product or codebase?

**Gate:** Do not proceed until maturity and placement are clear.

---

## Phase 1 — Asset Inventory

Explicitly list:
- What was provided
- What seems authoritative
- What might be missing

**Extract from assets:**
- Key claims (stated facts)
- Assumptions (unstated beliefs)
- Unknowns (gaps, questions)

**Output:** Asset inventory with confidence annotations.

---

## Phase 2 — Pressure Selection

Choose **one primary pressure** based on content state:

| Content State | Pressure Mode | Example Question |
|---------------|---------------|------------------|
| Too vague | **ambiguity** | "What specifically does 'fast' mean here?" |
| Conflicting docs | **contradiction** | "The PRD says X but the ticket says Y. Which is authoritative?" |
| Claims without proof | **evidence** | "How do we know users actually want this?" |
| Stalled decisions | **decision** | "What's blocking the choice between A and B?" |
| Risky integration | **risk** | "What happens if the API changes?" |
| Too big for maturity | **scope** | "Is all of this needed for a PoC?" |

**State which pressure you're applying and why.**

---

## Phase 3 — Iterative Loop

```
while (clarity < maturity_threshold):
    ask_targeted_questions(3-8)
    request_assets_if_available()
    update_snapshot()
    check_gate()
```

**Question Constraints:**
- 3–8 questions per round
- Prioritize asset requests over opinion requests
- One pressure mode per round (don't scatter)

**Do not advance until blocking unknowns are resolved for the declared maturity.**

---

## Phase 4 — Emit Artifact

Only when maturity-appropriate clarity is reached:

| Maturity | Appropriate Output |
|----------|-------------------|
| Exploration | Discovery Snapshot + Unknowns Register |
| PoC | Problem statement + Success criteria + Key assumptions |
| Prototype | Partial PRD (scope, constraints, rough acceptance) |
| MVP+ | Full PRD draft with explicit "not yet decided" sections |

**Never produce artifacts that imply certainty beyond evidence.**

---

## Pressure Mode Reference

### Ambiguity
- "What does [term] mean specifically?"
- "Who decides what counts as [outcome]?"
- "Can you give me a concrete example?"

### Contradiction
- "Document A says X, document B says Y. Which is current?"
- "The goal conflicts with the constraint. Which wins?"
- "These two requirements can't both be true. Which relaxes?"

### Evidence
- "How do we know this is true?"
- "What data supports this assumption?"
- "Has this been validated with users/stakeholders?"

### Decision
- "What's blocking this decision?"
- "Who has authority to decide?"
- "What would change your mind?"

### Risk
- "What happens if this assumption is wrong?"
- "What's the worst case?"
- "What dependencies could break this?"

### Scope
- "Is this all necessary for [maturity target]?"
- "What's the minimum viable version?"
- "What can be deferred?"

---

## Refusal Triggers

Pause and explain when:
- Asked to generate a PRD without sufficient discovery
- Asked to assume decisions not supported by evidence
- Ambiguity is acceptable for the maturity but the user demands certainty
- The work scope exceeds declared maturity

**Refusal format:**
> "I'm pausing here because [reason]. To proceed, I need [specific thing]."
