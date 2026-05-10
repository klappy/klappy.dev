---
uri: klappy://canon/definitions/software-virtues-vocabulary
title: "Software Virtues Vocabulary — Ten Quality Attributes That Compete for Priority"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["canon", "definitions", "software-virtues", "quality-attributes", "ilities", "prioritization", "tradeoffs"]
epoch: E0008.4
date: 2026-05-10
derives_from: "https://medium.com/@klappy/what-are-software-virtues-and-how-to-prioritize-them-f0b583741afe (2018-09-09 — origin article)"
complements: "canon/principles/quality-attributes-are-in-tension.md, canon/observations/quality-attribute-tension-matrix.md, odd/maturity.md"
governs: "Vocabulary used across canon when discussing tradeoffs between competing software properties. 'Virtues' is the rhetorical/historical name; 'quality attributes' or 'ilities' is the operational synonym. Both are first-class."
status: active
---

# Software Virtues Vocabulary — Ten Quality Attributes That Compete for Priority

> Ten properties every software project optimizes for, in tension with each other: usability, originality, stability, urgency, efficiency, maintainability, versatility, interoperability, affordability, and reality. Each is a virtue (a thing worth pursuing) and a quality attribute (an "-ility" the engineering literature already names). Each stands in tension with others. Priority among them shifts by team, by project, and by lifecycle phase. The vocabulary is from a 2018 article that has stayed load-bearing for nearly a decade; this entry canonizes it for ODD. The ten are a canonical worked example, not an exhaustive set — the universe of quality attributes is far larger, and the principle holds across all of it.

---

## Summary — A Stable Naming for the Tradeoff Space

Software has no single objective function. Every project optimizes for a bundle of competing properties, and every choice that advances one property tends to retreat from at least one other. The engineering literature names many of these properties — usually with the suffix "-ility" — and treats them as orthogonal axes. The 2018 source article reframed them as **virtues**: things worth pursuing, with intrinsic moral weight, that nevertheless conflict.

This document defines the ten virtues that have proven generative across nearly a decade of use. The name "virtue" is preserved because the moral framing is load-bearing — these are not just metrics, they are values a team holds. The phrase "quality attribute" (or "-ility") is the operational synonym that integrates with industry vocabulary and ODD's existing language. Both names refer to the same set; canon documents may use either depending on register.

The tensions among these virtues — which optimize against which, and under what conditions — are mapped at `canon/observations/quality-attribute-tension-matrix.md`. The principle that the tensions are real and irreducible is at `canon/principles/quality-attributes-are-in-tension.md`. The phase-by-phase shift in which virtues take priority is grounded in `odd/maturity.md`.

---

## The Ten Virtues

Each virtue is named with its primary form first, followed by its companion synonym in the original article. The definition states what the virtue measures or rewards; the operational note states how it is observed in practice.

### 1. Usability / Simplicity

**Definition.** The degree to which the user can accomplish their intended task without unnecessary friction, training, or guesswork. Includes learnability (how quickly a new user becomes effective) and intuitiveness (how much the interface aligns with prior expectations).

**Operational note.** Observed through user testing, time-to-task, error rates, and the volume of support requests asking how to do basic things. A product whose documentation is required to use it is failing on usability before the manual is opened.

### 2. Originality / Innovation

**Definition.** The degree to which the project does something not already done — a new approach, a new combination, a new affordance. Differentiation from existing alternatives; intrinsic novel value.

**Operational note.** Observed through the question "what would have to be true elsewhere for this to be unnecessary?" If the honest answer is "nothing — there are five products that already do this," the project is not original.

### 3. Stability / Reliability

**Definition.** Two related properties often treated as one: stability (the system does not freeze, crash, or corrupt state) and reliability (when something goes wrong, the system recovers without losing the user's work). Either may dominate depending on the use case.

**Operational note.** Observed through error rates, mean time between failures, recovery times, and the question "if a user trusts this with their work, will the trust be repaid?"

### 4. Urgency / Timeliness

**Definition.** The degree to which the project ships in time to serve its purpose. Urgency is not speed for its own sake; it is the temporal fit between the delivery and the window in which delivery still matters. Late software solving a no-longer-urgent problem has failed on this virtue.

**Operational note.** Observed through schedule fit, market timing, and the question "if we ship six months from now, do users still need this?"

### 5. Efficiency / Scalability

**Definition.** The degree to which the system performs its work without wasted resources — CPU, memory, hardware, latency, energy, dollars. Scalability is the time-shape of efficiency: does the system stay efficient as load grows?

**Operational note.** Observed through profiling, cost-per-request, throughput under load, and the question "what does it cost to serve the next user, and is that cost sustainable?"

### 6. Maintainability / Manageability

**Definition.** The degree to which the project can be continued by people who did not write it. Includes understandability (how readable the code is to a new contributor), modularity (whether parts can be changed independently), testability (whether changes can be verified before shipping), and hire-ability (whether the technologies and patterns chosen permit finding qualified maintainers).

**Operational note.** Observed through onboarding time for new contributors, the rate at which untouched code becomes feared code, and the question "if the original team disappeared tomorrow, could the project continue?"

### 7. Versatility / Adaptability

**Definition.** The breadth of use cases the project can serve without modification. The degree to which the project handles related tasks beyond its primary one. The opposite of single-purpose narrowness.

**Operational note.** Observed through the variety of users finding value in the project and the rate at which feature requests are answered with "actually, you can already do that." Watch for the failure mode: versatility chased prematurely produces software that does many things badly instead of one thing well.

### 8. Interoperability

**Definition.** The degree to which the project can exchange data and behavior with adjacent systems. Includes import/export of data formats, adherence to standards, API surface area, and the absence of artificial lock-in.

**Operational note.** Observed through the friction a user experiences when bringing data in or taking data out, and the question "does this project make the user's larger workflow easier or harder?"

### 9. Affordability / Sustainability

**Definition.** Two coupled properties: affordability (the price the user pays is appropriate to the value received) and sustainability (the cost of building and operating the project is sustainable for the team that produces it). The intersection is whether the project's economic model survives contact with reality.

**Operational note.** Observed through unit economics, retention, runway, and the question "can the team that built this afford to keep building it?" Affordability has cost gravity over every other virtue: each virtue is purchased with effort or money.

### 10. Reality

**Definition.** The meta-virtue that grounds all other virtues against the world as it is, rather than the world as planned. Reality includes:

- **Costs** — effort and resources actually required
- **Benefits** — advantages of success, weighted by probability
- **Risks** — probability of failure and its consequences
- **Dependencies** — what must be true for this to work
- **Penalties** — consequences of not delivering
- **Compliance** — regulatory and contractual constraints

**Operational note.** Observed through the gap between stated plans and observed outcomes. Reality is the virtue that keeps the other nine honest. When teams optimize for usability without testing with real users, for originality without checking what already exists, or for urgency without checking what users actually need, reality has been demoted below where it belongs.

---

## "Virtues" and "Quality Attributes" Are the Same Set

The 2018 source article called these virtues. The engineering literature calls them quality attributes, non-functional requirements, or "-ilities" (a suffix that fits most of them awkwardly). Both vocabularies refer to the same ten properties.

Canon uses both names depending on register:

- **Virtue** — moral, rhetorical, used when emphasizing that these are values a team chooses to pursue
- **Quality attribute / "-ility"** — operational, technical, used when integrating with industry frameworks (ISO/IEC 25010, ATAM, etc.) or when discussing measurement and tradeoff analysis

Neither vocabulary is preferred. A canon document discussing prioritization may use "virtues" for the framing and "quality attributes" for the worked detail without contradiction.

---

## What This Document Does Not Define

Three things deliberately left to other canon documents:

- **Which virtues take priority when** — see `odd/maturity.md` for phase-weighting and `canon/observations/quality-attribute-tension-matrix.md` for pair-by-pair detail across the canonical ten.
- **How to elicit team priorities** — the 2018 article suggested MoSCoW voting and the Hundred Dollar Method. Both are surfaced as starting points, not endorsed as load-bearing. ODD's mature answer to elicitation lives elsewhere.
- **The full universe of quality attributes** — there are dozens more. Auditability, securability, debugability, deployability, recoverability, observability, portability, accessibility, localizability, and many others are real. The ten here are the canonical worked example used as a reference corpus; the principle at `canon/principles/quality-attributes-are-in-tension.md` holds across the broader set, and project-specific tension graphs are generated against the principle rather than restricted to this list.

---

## Lineage

The vocabulary is from "Software Virtues — How to Prioritize" by Chris Klapp, published on Medium in September 2018. The article seeded `odd/maturity.md` (phase-weighting) and is now the source of this definition. The companion canon — the in-tension principle and the worked-example tension matrix — completes the systematic build the original article only sketched.
