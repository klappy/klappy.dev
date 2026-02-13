---
uri: klappy://canon/decision-rules
title: "Decision Rules"
audience: canon
exposure: nav
tier: 2
voice: first_person
stability: stable
tags: ["decision-rules", "heuristics"]
relevance: decision
execution_posture: governing
---

# Decision Rules

> Heuristics for choosing between valid options when designing systems.

## Description

Decision rules describe how decisions are made when multiple valid options exist. They complement Constraints by answering "how I choose." Rules include: outcomes before implementation, borrow-bend-break-build progression, KISS, DRY with isolation, explicit state, recoverability over perfection, visible tradeoffs, optimizing for the next maintainer, UI carrying explanation, verification before completion, escalation only when defaults fail, admitting uncertainty early, preferring one-shot builds over steering misses, and hard-coding protocols (not domain tables).

## Outline

- Outcomes Before Implementation
- Borrow, Bend, Break, Build
- Simplicity Wins (KISS)
- DRY, But Not at the Cost of Isolation
- Prefer Explicit State
- Favor Recoverability Over Perfection
- Make Tradeoffs Visible Early
- Optimize for the Next Maintainer
- UI Should Carry the Explanation
- If It Cannot Be Verified, It Is Not Done
- Escalate Only When Defaults Fail
- Say "I Don't Know" Early
- Prefer One-Shot Builds
- Hard-Code Protocols, Not Domain Tables
- Measure Total Cost Before Optimizing

---

## Operating Constraints

- MUST define outcome before choosing tools, architecture, or code
- MUST follow Borrow → Bend → Break → Build progression; building from scratch requires explicit justification
- MUST choose simplest solution that plausibly works; add complexity only when simplicity demonstrably fails
- MUST NOT consider work complete unless it is verified with evidence
- MUST prefer one-shot builds over steering multi-turn misses; fix inputs and restart clean
- MUST name tradeoffs as part of design, not as postmortem
- MUST NOT accept "it will be faster" as justification for caching or optimization without Total Cost of Ownership evidence

---

## Defaults

- Start with defaults and escalate only when necessary
- Admit uncertainty early rather than pretending confidence
- Optimize for the next maintainer, not personal preference
- Allow duplication across bounded contexts; extract shared logic only when reuse is proven
- Prefer restartable, replayable processes over perfect but fragile ones
- Hard-code protocol contracts (types, schemas, states); avoid hard-coding domain tables

---

## Failure Modes

- **Outcomes After Implementation**: Building impressive solutions with unclear purpose or missing success criteria
- **Premature Building**: Reinventing stable, well-understood tools; forking without maintenance plan
- **Overengineering**: Complex solutions to simple problems; explanations longer than code
- **Steering a Miss**: "Just one more tweak" turning into extended multi-turn patching
- **Hidden Tradeoffs**: Decisions feeling arbitrary in hindsight; future changes requiring archaeology
- **Confidence Without Verification**: Bugs discovered by users instead of builders
- **Local Maxima Optimization (The Cache Trap)**: Optimizing a single metric while ignoring TCO; "it's faster" without measuring debugging hours, staleness incidents, or trust erosion

---

## Verification

- Outcome is defined before implementation begins
- Simplest plausible solution was attempted first
- Evidence shows observed behavior, not just reasoning
- Tradeoffs documented with explicit downsides acknowledged
- System can be reproduced from a clean start without the original author's guidance

---

## Content

**Canon v0.1**

> This complements the Constraints by answering "how I choose" when multiple valid options exist.

These rules describe how I tend to make decisions when designing systems.
They are not absolute laws. They are defaults I apply unless there is a clear reason not to.

If a rule is overridden, I expect the reason to be stated explicitly.

---

## 1. Outcomes Before Implementation

I define the outcome I care about before choosing tools, architectures, or code.

**How I apply this**
• I ask what problem is actually being solved
• I avoid committing to implementation details too early
• I prefer deleting work that doesn't move the outcome forward

**Signals this rule was violated**
• The solution is impressive but unclear in purpose
• Success criteria are vague or missing
• The system “works” but doesn’t help anyone

---

## 2. Borrow → Bend → Break → Build

I follow a progression when deciding how much to create from scratch.

**The order:**

1. **Borrow** — Use an existing tool as-is
2. **Bend** — Extend or configure an existing tool
3. **Break** — Fork or partially replace an existing tool
4. **Build** — Create something new from components

**How I apply this**
• I start at Borrow and justify moving down the list
• Building from scratch requires explicit justification

**Signals this rule was violated**
• Reinventing something stable and well-understood
• Forking without a clear maintenance plan

---

## 3. Simplicity Wins by Default (KISS)

I choose the simplest solution that plausibly works.

**How I apply this**
• I reject unnecessary abstraction
• I prefer readable code over clever code
• I add complexity only when simplicity demonstrably fails

**Signals this rule was violated**
• Explanations are longer than the code
• Only the original author understands the system

---

## 4. DRY, But Not at the Cost of Isolation

I avoid duplication, but not if it creates brittle coupling.

**How I apply this**
• I allow duplication across bounded contexts
• I extract shared logic only when reuse is proven
• I avoid "god modules" shared by everything

**Signals this rule was violated**
• Small changes cause widespread breakage
• Teams are blocked waiting on shared components

---

## 5. Prefer Explicit State Over Implicit State

I choose designs where state is visible, named, and bounded.

**How I apply this**
• I avoid hidden global state
• I make lifecycle and ownership explicit
• I prefer passing state over reaching for it

**Signals this rule was violated**
• Bugs depend on execution order
• Restarting the system produces surprising behavior

---

## 6. Favor Recoverability Over Perfection

I prefer systems that fail safely and recover easily over systems that try to prevent all failure.

**How I apply this**
• I design for partial failure
• I assume components will break
• I prefer restartable, replayable processes

**Signals this rule was violated**
• A single failure takes everything down
• Recovery requires deep expertise or manual intervention

---

## 7. Make Tradeoffs Visible Early

I name tradeoffs as part of the design, not as a postmortem.

**How I apply this**
• I document why a choice was made
• I acknowledge what the choice sacrifices
• I leave breadcrumbs for future maintainers

**Signals this rule was violated**
• Future changes require archaeology
• Decisions feel arbitrary in hindsight

---

## 8. Optimize for the Next Maintainer

I assume the next person to touch the system is not me.

**How I apply this**
• I favor clarity over personal preference
• I document non-obvious decisions
• I avoid designs that require constant explanation

**Signals this rule was violated**
• The system works but no one wants to touch it
• Knowledge exists only in conversations or chat logs

---

## 9. UI Should Carry the Explanation

I prefer showing over telling, especially in user-facing systems.

**How I apply this**
• I let interfaces demonstrate behavior
• I keep explanatory text short
• I ask permission before going deep

**Signals this rule was violated**
• Long explanations compensate for confusing UX
• Users need documentation to complete basic tasks

---

## 10. If It Can't Be Verified, It Isn't Done

I do not consider work complete unless it is verified.

**How I apply this**
• I run the system
• I observe behavior directly
• I require visual or test evidence

**Signals this rule was violated**
• Confidence is based on reasoning alone
• Bugs are discovered by users instead of builders

---

## 11. Escalate Only When Defaults Fail

I start with defaults and escalate only when necessary.

**How I apply this**
• I try the obvious solution first
• I gather evidence before increasing complexity
• I treat escalation as a signal, not a failure

**Signals this rule was violated**
• Overengineering early
• Complex solutions to simple problems

---

## 12. Say "I Don't Know" Early

I prefer admitting uncertainty to pretending confidence.

**How I apply this**
• I name unknowns explicitly
• I design experiments to reduce uncertainty
• I avoid locking in assumptions prematurely

**Signals this rule was violated**
• Decisions are justified with vague confidence
• Surprises appear late and expensively

---

## 13. Prefer One-Shot Builds; Don't Steer a Miss

I prefer fixing the asset (PRD, constraints, inputs) and re-running clean over steering a multi-turn miss.

**How I apply this**
• I treat a failed execution path as signal, not a trajectory to nurse back to health
• If context decays, I restart with corrected inputs rather than accumulating patches
• I preserve the attempt as evidence, then begin a new attempt independently

**Signals this rule was violated**
• “Just one more tweak” turns into extended steering
• The system only works if the same person keeps nudging it
• The final outcome cannot be reproduced from a clean start

---

## 14. Don't Hard-Code Domain Tables; Hard-Code Protocol Contracts

I avoid hard-coding domain lookups that can be derived, fetched, or updated without code changes.

I do hard-code protocol contracts that define interoperability:
- types
- schemas
- action primitives
- allowed states and transitions

**How I apply this**
• If it’s “data,” I prefer it to live in content, configuration, or a source of truth
• If it's "interface," I prefer it to be explicit and enforced in code

**Signals this rule was violated**
• Large in-code tables that drift from reality (e.g., enumerations maintained by hand)
• Domain updates require redeploys without justification
• Integrations fail because the “contract” was implicit or inconsistent

---

## 15. Measure Total Cost Before Optimizing

I do not accept "it will be faster" as justification without Total Cost of Ownership.

**How I apply this**
• I require measurement of the cache-less or unoptimized path before accepting optimization
• I count debugging hours, maintenance burden, staleness risk, cognitive overhead, and trust erosion as costs
• I treat "pre-optimization" without TCO evidence as a claim without payment (Axiom 2)
• I recognize that local maxima (faster requests) purchased at the cost of system-wide integrity is not optimization — it is debt

**Signals this rule was violated**
• "Have you tried clearing the cache?" appears in debugging conversations
• An optimization is introduced on day one without benchmarking the unoptimized path
• The team spends more time managing the optimization than it would have spent without it
• Nobody can say what the system's actual state is without first flushing something

**See also:** `odd/constraint/anti-cache-lying.md` — the canonical constraint on caching derived content

---

## 💡 Closing Note

These rules describe how I tend to decide, not how decisions must always be made.

Agents and collaborators should:
• apply these rules by default
• translate them into neutral/system logic
• state clearly when a rule is overridden and why

---

## ✅ Status

- Canon v0.1 — Decision Rules complete
- Ready to proceed to Canon v0.1 — Definition of Done & Evidence Policy
