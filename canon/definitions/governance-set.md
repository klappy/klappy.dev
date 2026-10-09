---
uri: klappy://canon/definitions/governance-set
title: "The Governance Set — Policy Is a Member, Not the Umbrella"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["canon", "definitions", "vocabulary", "governance", "policy", "principle", "constraint", "method", "requirement", "contract", "schema", "lens", "loop", "E0011"]
epoch: E0011
date: 2026-10-09
derives_from: "canon/meta/policies-vs-requirements.md, canon/meta/enforceable-policy-anatomy.md, canon/definitions/dolcheo-vocabulary.md, canon/architecture/two-loop-operating-model.md, canon/constraints/policy-precedes-build.md"
complements: "canon/methods/README.md, canon/definitions/cooking-taxonomy.md, canon/principles/skills-are-procedure-not-judgment.md, canon/constraints/constraint-driven-audits.md, docs/appendices/epoch-11.md"
governs: "What the artifacts that shape model and human behaviour in this program are called, how they relate, and which one the loop treats as the unit at each beat"
status: active
---

# The Governance Set — Policy Is a Member, Not the Umbrella

> For two months the program called everything that shaped behaviour a "policy," and before that "a canon article." A colleague's correction on 2026-07-15 named the blend: a principle is a *why* that needs context to apply; a policy states *what is*, context-free; they are not one thing. The set has since grown more members than either word holds — principles, constraints, methods, definitions, policies, requirements, contracts, schemas, lenses, hygiene, charters, skills — and the ledger that feeds them. This document names the set, defines each member by the question it answers and the speed at which it changes, and fixes the relations the loop depends on: requirements are ingredients, policies are ratified governing statements, contracts and schemas are the interfaces between lanes, and the ledger is the record that turns friction into any of the above. The umbrella is called **the governance set** until the captain rules otherwise; "policy set" is retired as the umbrella.

---

## Simple Rules

- **Use when:** Use when naming, filing, citing or classifying any artifact that shapes what a model or human may do, must do, or how — and when a document, essay or ticket reaches for "policy" as a catch-all.
- **Skip when:** Skip for the content of any one member (its own doc governs that), and for the ledger's internal shape (`dolcheo-vocabulary`).
- **Stop when:** Stop when every artifact in scope can be placed in exactly one row of The Members with its question, speed and home named.
- **Keep going when:** Keep going while an artifact fits two rows, or "policy" is being used for something that is not a ratified governing statement.
- **Where:** Any repo that carries governance — klappy.dev canon, project cookbooks, the kitchen's hygiene, boarding manifests.
- **Who:** Whoever files, cites or reviews a governance artifact; Terry adjudicates disputes of kind.
- **Why:** The loop ratifies, audits and gates by kind; a misfiled kind is skipped by the gate built for it (`klappy://canon/meta/policies-vs-requirements`).
- **What:** One umbrella, twelve member kinds, one feeding record, and the relations in The Relations.
- **How:** Classify by the question the artifact answers (The Members), then place it in the loop by its beat (The Loop Uses Each Kind at a Different Beat).

---

## Summary — Twelve Kinds, One Record, One Name for the Whole

The governance set is everything that constrains, directs or shapes behaviour in a program and outlives the session that wrote it. Its members differ on two axes that matter to the loop: the **question each answers** (why, what must hold, how, what is being built, what shape crosses a boundary, through which eyes to review) and the **speed each changes** (principles in epochs; constraints as a live list; methods per scope; requirements per build). Collapsing members with different speeds under one word is how the ARS monolith freeze happened — a build "had a policy" that was in fact a requirement nobody had ratified (`klappy://canon/meta/policies-vs-requirements`, `klappy://docs/appendices/epoch-11`).

The ledger is not a member. It is the record — decisions, observations, learnings, constraints-as-found, handoffs, opens, tensions — that the loop converts into members at a breakpoint (`klappy://canon/definitions/dolcheo-vocabulary`). Skills are procedure, not governance; they consume the set and never judge against it (`klappy://canon/principles/skills-are-procedure-not-judgment`).

"Policy" keeps one precise meaning: a ratified governing statement for something about to be built, with WHAT · WHY · ENFORCEMENT · SCOPE · VERIFICATION (`klappy://canon/meta/enforceable-policy-anatomy`). It is the member the gate reads first. It is no longer the name of the whole.

---

## The Members — Each Defined by Its Question and Its Speed

| Kind | Question it answers | Changes | Home | Defining doc |
|---|---|---|---|---|
| **Values / axioms** | what we will not trade away | almost never | `canon/values/` | `klappy://canon/values/axioms` |
| **Principles** | *why* — a stance that needs context to apply | per epoch | `canon/principles/` | `klappy://canon/principles` |
| **Constraints** | what must or must not hold, right now, auditable | live list; added when pain is paid | `canon/constraints/`, kitchen hygiene | `klappy://canon/meta/constraint-driven-audits` |
| **Methods** | *how* — a repeatable way to apply principles under constraints | per scope; often | `canon/methods/` | `klappy://canon/methods` |
| **Definitions** | what a word means here | rarely; by ruling | `canon/definitions/` | this document, `dolcheo-vocabulary`, `cooking-taxonomy` |
| **Policies** | the ratified governing statement for one build: what and why, with enforcement, scope and verification | per build; before code | project cookbook / canon when universal | `klappy://canon/meta/enforceable-policy-anatomy`, `klappy://canon/constraints/policy-precedes-build` |
| **Requirements** | the specific functional needs of one build — the ingredients | per build; fast | PRD / ticket / cookbook recipe | `klappy://canon/meta/policies-vs-requirements`, `klappy://canon/definitions/cooking-taxonomy` |
| **Contracts** | what two lanes or layers promise each other | when a boundary opens | interface docs beside the code | `klappy://canon/architecture/two-loop-operating-model` |
| **Schemas** | the shape data takes across a boundary | with the contract | beside the code; `frontmatter-schema` for docs | `klappy://canon/meta/frontmatter-schema` |
| **Lenses** | through whose eyes a thing is reviewed before it moves | per project registry | `lenses/INDEX.md` per project | `canon/methods/lens` — drafted in PR #320, unmerged as of 2026-10-09 |
| **Hygiene** | house rules for operating the kitchen | PR-gated; slow | kitchen `health-code/` | kitchen `HYGIENE.md` (pointer only) |
| **Charter** | what a seat may decide alone, and what must come back | by ruling | boarding manifests | `klappy://canon/constraints/dispatcher-dispatches-never-executes` |

Skills sit beside the set, not in it: a skill is the fixed procedure for a pass; the set is what the pass is checked against. Decisions and observations are ledger entries until the loop promotes them.

---

## The Relations — What Points at What

- **Everything points upstream to principles and constraints.** A policy cites the principles it applies and the constraints it honours; a requirement cites the policy it falls under; code cites the policy and requirement it derives from (`klappy://canon/principles/policy-first-self-building-self-documenting`).
- **Speed descends.** Values → principles → constraints → methods → policies → requirements → code. Nothing lower may silently amend something higher; the ledger carries the tension up and a ruling changes the higher doc.
- **Canon holds the universal; cookbooks hold the project-scoped.** A principle, constraint or method that would be true in another program lives in canon. A policy or requirement for one app lives in that app's cookbook and points up. Governance is fractal: scopes inherit and narrow, never override.
- **Contracts and schemas are the only members two lanes share.** Parallel work is possible exactly because the interface is defined before either side builds (two-loop operating model).
- **Lenses are contracts about review.** A lens says what a reviewer must look for; it does not rule.
- **The ledger feeds the set; the set never feeds the ledger.** Friction enters as an observation or tension, is promoted at a breakpoint into a constraint, method, policy or requirement, and is then audited against.

---

## The Loop Uses Each Kind at a Different Beat

Under E0011 a valid outcome descends from ratified governance through the gated loop. Each beat reads a different member:

| Beat | Reads | Produces |
|---|---|---|
| exploration | principles, prior-art (6B), ledger tensions | candidate policy |
| policy | principles, constraints, definitions | a ratified **policy** |
| PRD | the policy, cooking taxonomy | **requirements** (ingredients), **contracts/schemas** for the lanes |
| build | requirements, contracts, schemas, methods | code citing its policy and requirement |
| validate | the policy, the constraints, the registered **lens** | gate-passage receipt; ledger entries for the next turn |

A gate built for policies will wave through a requirement labelled "policy," because the requirement lacks ENFORCEMENT and VERIFICATION and the gate has nothing to check. That is the mechanical reason the umbrella word had to go.

---

## The Name of the Whole — One Ruling Still Open

Four names have been used for the aggregate since July, and three are still in daily use:

| Name | What it has meant | Standing |
|---|---|---|
| **governance set** | the whole collection of kinds above, in any repo | adopted here as the neutral umbrella |
| **canon** | the public, durable, universal members (values, principles, constraints, methods, definitions) | keeps that meaning; a *subset* |
| **cookbook** | a project's distilled, scoped governance plus its recipes | keeps that meaning; a *scope* |
| **ontology stack** | the whole set across repos, named 2026-09-16 as a bridge term | retained as an alias until ruled |
| **policy set** | the whole set, 2026-07 usage | **retired** as an umbrella; "policy" is a member |

The captain may rename the umbrella; the members and relations stand regardless.

---

## Evidence

- 2026-07-15, uW office: the correction that a principle needs context (wisdom) and a policy does not (knowledge); the program had been blending them. Captain's log 2026-07-18 accepts "not everything is a policy" and splits requirements out. (Bee conversations 9248646, 9312909, paraphrased; attribution of the correction is the captain's.)
- 2026-07-16: ARS monolith freeze — a correctly boarded seat built against an unratified "policy" that was a requirement (`klappy://docs/appendices/epoch-11`).
- 2026-07-17: `policies-vs-requirements` and `enforceable-policy-anatomy` filed; ratified by merge 2026-10-09.
- 2026-08-04 → 2026-10-07: captain's logs enumerate policies, requirements, constraints, principles, observations, schemas, contracts, lenses, charters as distinct; "ontology stack" appears 2026-09-16; no single umbrella settled.

---

## Constraints — What This Definition Requires and Prohibits

- "Policy" names a ratified governing statement with the five-part anatomy, or it is misfiled.
- No document, essay or ticket uses "policy set" or "policies" for the whole; use "the governance set" or the specific kind.
- Every governance artifact names its kind in frontmatter or its first line, and its home matches the table.
- A kind that fits two rows is a tension for the ledger, not a reason to invent a thirteenth row.

---

## The Test

Hand a reviewer any governance artifact with its title covered. If they can name its kind from the question it answers and the speed it changes at, and that kind matches where it is filed, the definition holds. If they reach for "it's a policy, sort of," it does not.
