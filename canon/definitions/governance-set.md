---
uri: klappy://canon/definitions/governance-set
title: "The Governance Set — Policy Is a Member, Not the Umbrella"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["canon", "definitions", "vocabulary", "governance", "policy", "principle", "constraint", "requirement", "contract", "schema", "lens"]
epoch: E0010
date: 2026-10-09
derives_from: "canon/README.md, canon/meta/policies-vs-requirements.md, canon/meta/enforceable-policy-anatomy.md, canon/definitions/dolcheo-vocabulary.md, canon/principles/dry-canon-says-it-once.md"
complements: "canon/methods/README.md, canon/definitions/cooking-taxonomy.md, canon/principles/skills-are-procedure-not-judgment.md, canon/meta/constraint-driven-audits.md, canon/architecture/two-loop-operating-model.md, canon/constraints/policy-precedes-build.md, docs/appendices/epoch-11.md"
governs: "What the artifacts that shape model and human behaviour in this program are called, which of them are governance and which consume it, and the one open ruling on what 'policy' means"
status: active
---

# The Governance Set — Policy Is a Member, Not the Umbrella

> From July to October the program used one word, "policy," for the whole of what shapes behaviour, and before that "canon article." The word failed in the mouth before it failed on paper: a colleague's correction on 2026-07-15 (the captain's recollection; Bee transcript, paraphrased) separated the *why* that needs context from the *what* that does not, and the captain's own log three days later accepted that not everything is a policy. This definition names the set by the question each member answers and the speed it changes; separates the seven **governance kinds** canon already files (values, principles, constraints, definitions, decisions, policies, requirements) from the **interfaces and surfaces** that consume them (methods, contracts, schemas, lenses, hygiene, charters, skills); and names the ledger as the record that feeds the set. "Policy set" is retired as the umbrella. Two rulings are left to the captain and stated as open: what the whole is called, and which of two ratified canon docs defines "policy."

---

## Simple Rules

- **Use when:** Use when naming, filing, citing or classifying any artifact that shapes what a model or human may do, must do, or how, and when a document, essay or ticket reaches for "policy" as a catch-all.
- **Skip when:** Skip for the content of any one kind (its own doc governs that) and for the ledger's internal shape (`klappy://canon/definitions/dolcheo-vocabulary`).
- **Stop when:** Stop when every artifact in scope sits in exactly one row of the two tables below with its question, speed and home named.
- **Keep going when:** Keep going while an artifact fits two rows, or "policy" is used for something that is neither a durable governing statement nor a ratified per-build one (see The Open Ruling on "Policy").
- **Where:** Any repo that carries governance: klappy.dev canon, project cookbooks, the kitchen's hygiene, boarding manifests.
- **Who:** Whoever files, cites or reviews a governance artifact; the law seat adjudicates disputes of kind.
- **Why:** Gates check by kind; a misfiled kind is skipped by the gate built for it (`klappy://canon/meta/policies-vs-requirements`).
- **What:** Seven governance kinds, seven consumers, one feeding record, one retired umbrella, two open rulings.
- **How:** Classify by the question answered (The Governance Kinds, The Consumers), then route the open rulings to the captain.

---

## Summary — Seven Kinds Govern, Seven Consume, One Record Feeds

The governance set is everything that constrains, directs or shapes behaviour in a program and outlives the session that wrote it. Canon's README already calls these "governance artifacts" and files them in `values/`, `principles/`, `constraints/`, `definitions/`, `decisions/` and `methods/`, with `/canon/**` internal and `/odd/` public (`klappy://canon/README`). This definition adds the two axes that classification turns on: the **question an artifact answers** and the **speed at which it changes**. Collapsing kinds of different speed under one word is a suspected root cause of steering failures (`klappy://canon/meta/policies-vs-requirements`), and the ARS monolith freeze of 2026-07-16 is the recorded instance: code ran ahead of policy, and no enforcer could measure the drift (`klappy://docs/appendices/epoch-11`).

Not everything that touches governance *is* governance. Methods apply it and are explicitly not a place to smuggle authority (`klappy://canon/methods`). Contracts and schemas are the interfaces two lanes share. Lenses, hygiene and charters are review and operating surfaces. Skills are procedure (`klappy://canon/principles/skills-are-procedure-not-judgment`). The ledger is the record whose entries are promoted into kinds at a breakpoint (`klappy://canon/definitions/dolcheo-vocabulary`). Keeping those apart is most of the work this definition does.

Confidence: a working definition, drawn from one program's three months of usage, held until a case breaks a row.

---

## The Governance Kinds — Defined by Question and Speed

| Kind | Question it answers | Changes | Canon home |
|---|---|---|---|
| **Values / axioms** | what we will not trade away | almost never | `values/` |
| **Principles** | *why*; a stance that needs context to apply | per epoch | `principles/` |
| **Constraints** | what must or must not hold now, auditable | live list; added when pain is paid | `constraints/` |
| **Definitions** | what a word means here | by ruling | `definitions/` |
| **Decisions** | what was chosen and why, at canon level | per ruling | `decisions/` |
| **Policies** | a governing statement, enforceable and scoped — *see the open ruling* | see the open ruling | `constraints/` or a cookbook, by scope |
| **Requirements** | the specific functional needs of one build; the ingredients | per build; fast | PRD, ticket, cookbook recipe (`klappy://canon/definitions/cooking-taxonomy`) |

Precedence among these is canon's own ladder — manifesto, maturity, constraints, decision rules, evidence policies — and apparent conflicts are usually explained by maturity context rather than by rank (`klappy://canon/README`). Speed is a classification axis here, not a precedence rule.

---

## The Consumers — Interfaces and Surfaces That Read the Set

| Consumer | What it does with the set | Defining doc |
|---|---|---|
| **Methods** | apply principles under constraints, repeatably; carry no authority of their own | `klappy://canon/methods` |
| **Contracts** | state what two lanes or layers promise each other, defined before either builds | `klappy://canon/architecture/two-loop-operating-model` |
| **Schemas** | fix the shape data takes across a boundary | `klappy://canon/meta/frontmatter-schema` (for docs) |
| **Lenses** | say through whose eyes a thing is reviewed before it moves; never rule | `canon/methods/lens`, drafted in PR #320, unmerged as of 2026-10-09 |
| **Hygiene** | the kitchen's operating rules, PR-gated | kitchen `HYGIENE.md` (pointer only) |
| **Charter** | what a seat may decide alone and what must come back | no canon doc; boarding manifests only — debt named |
| **Skills** | the fixed procedure of a pass, checked against the set | `klappy://canon/principles/skills-are-procedure-not-judgment` |

The ledger (decisions, observations, learnings, constraints-as-found, handoffs, opens, tensions) feeds the set and is fed by nothing in it. How the beats of the loop consume each kind is the two-loop operating model's to say, not this document's.

---

## The Open Ruling on "Policy" — Two Ratified Docs Disagree

Canon holds two definitions, both active as of 2026-10-09:

| Doc | "Policy" means | Speed | Lineage |
|---|---|---|---|
| `klappy://canon/meta/policies-vs-requirements` (landed 2026-07-20, #305) | durable, slow-changing, principle-shaped guidance, as against fast build-specific requirements | slow | the captain's log of 2026-07-18 |
| `klappy://canon/meta/enforceable-policy-anatomy` (ratified 2026-10-09) | a governing statement for something about to be built, with WHAT · WHY · ENFORCEMENT · SCOPE · VERIFICATION | per build, before code | the ARS storage policy set, 2026-07-17 |

They were written two days apart from the same incident and point in opposite directions on speed. Each is internally coherent; the tension is between them. Options for the captain, in the order the law seat leans:

1. **Anatomy wins; P0011 amended.** "Policy" = the enforceable per-build statement. Durable guidance is simply "principles." P0011's split becomes principles vs requirements.
2. **P0011 wins; anatomy renamed.** "Policy" = durable guidance. The five-part per-build artifact gets its own name (a "mandate," a "build policy," the captain's word).
3. **Both, scoped.** "Policy" alone is forbidden; every use says which: *canon policy* (durable) or *build policy* (anatomy-conformant).

Until ruled, this definition does not fix the policy row's speed or home, and any new doc using the bare word is flagged for the ledger.

---

## The Name of the Whole — Second Open Ruling

| Name | What it has meant | Standing |
|---|---|---|
| **governance artifacts** | canon README's own phrase for `/canon/**` | the law seat's lean: no new coinage |
| **governance set** | the whole collection across repos, the captain's phrase 2026-10-09 | this document's working title |
| **canon** | the durable, universal members | keeps that meaning; a subset |
| **cookbook** | a project's scoped governance plus recipes | keeps that meaning; a scope |
| **ontology stack** | the whole set across repos, named 2026-09-16 as a bridge | alias until ruled |
| **policy set** | the whole set, July usage; also the ARS bundle's proper name | **retired as umbrella**; kept for an anatomy-conformant bundle |

Closest prior art outside the program: "policy hierarchy" and "governance framework" in enterprise architecture; both name tiers of authority rather than kinds by question and speed, which is the distinction this document keeps.

---

## Evidence

- 2026-07-15, uW office: the correction that a principle needs context to apply and a policy does not; recorded only in the captain's Bee transcripts (conv 9248646, paraphrased; attribution is the captain's). 2026-07-18 log (conv 9312909): accepts that not everything is a policy and splits requirements out.
- 2026-07-16: ARS monolith freeze. In epoch-11's words, a correctly boarded seat built a thing no policy ever authorized, because code ran ahead of policy and no enforcer could measure the drift.
- 2026-07-17 → 2026-07-20: `enforceable-policy-anatomy`, `policy-precedes-build` and `policies-vs-requirements` filed; the first two ratified 2026-10-09, the third landed 2026-07-20.
- 2026-08-04 → 2026-10-07: captain's logs enumerate policies, requirements, constraints, principles, observations, schemas, contracts, lenses, charters as distinct; "ontology stack" appears 2026-09-16; no umbrella settled.

---

## Constraints — What This Definition Requires and Prohibits

- No document, essay or ticket uses "policy set" or "policies" for the whole; use the umbrella the captain rules, or the specific kind.
- A bare "policy" is flagged for the ledger until the open ruling lands; say which doc's meaning is intended.
- Methods, contracts, schemas, lenses, hygiene, charters and skills are filed as consumers, never as governance kinds.
- A kind that fits two rows is a tension for the ledger, not a reason to add a row.

Cost of adopting this: every existing "policy" in cookbooks and canon needs its kind named once. Reversible: it is a definition; retracting it costs a doc, not a migration. Disconfirmer: a governance artifact that two careful readers classify differently by the question-and-speed test, and that no row amendment resolves.

---

## The Test

Hand a reviewer any governance artifact with its title covered. If they can name its kind from the question it answers and the speed it changes at, and that kind matches where it is filed, the definition holds. If they reach for "it's a policy, sort of," it does not.
