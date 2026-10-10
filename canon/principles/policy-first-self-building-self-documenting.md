---
uri: klappy://canon/principles/policy-first-self-building-self-documenting
title: "Mandate-First — Mandates First Ensure All Code Is Self-Building and Self-Documenting"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["canon", "principle", "policy-first", "prompt-over-code", "self-building", "self-documenting", "enforcement", "traceability", "ars"]
epoch: E0011
date: 2026-07-17
derives_from: "canon/principles/prompt-over-code.md, docs/appendices/convention-requires-an-enforcer.md, canon/constraints/ratified-model-requires-reconciliation-and-enforcer.md, canon/values/axioms.md"
complements: "canon/meta/enforceable-policy-anatomy.md, canon/meta/constraint-driven-audits.md, canon/constraints/ars-bounded-storage.md"
governs: "The authoring order of every buildable capability in this program: the governing policy is written before the code, precisely enough that the code can be derived from it, and the code cites the policy back. Binding on any seat that ships an implementation of a ruled model."
status: active
---

# Mandate-First — Mandates First Ensure All Code Is Self-Building and Self-Documenting

> Former name: *Policy-First — Policies First Ensures All Code Is Self-Building and Self-Documenting* (uri `klappy://canon/principles/policy-first-self-building-self-documenting`, unchanged; the handle "policy-first" survives in tags and cross-references). Renamed per the captain ruling of 2026-10-09 (`klappy://canon/definitions/governance-artifacts`): the per-build governing statement is a **mandate**, typically carried inside the project's charter; "policy" keeps its P0011 meaning of durable guidance.

> **Posture:** ACTIVE — ratified by merge on 2026-10-09 (captain ruling). A principle filed 2026-07-17 as the framing for the ARS
> storage policy set (`canon/constraints/ars-bounded-storage`) and the build-mandate
> template (`canon/meta/enforceable-policy-anatomy`).

> Mandates first ensures all code is self-building and self-documenting. When the governing
> mandate is written before the code and precisely enough to build from, two properties fall
> out for free. **Self-building:** the implementation can be *derived* from the mandate — the
> mandate is the buildable spec, so code follows from it rather than being invented alongside
> it. **Self-documenting:** the code *traces back* to the mandate — every enforcement, gate,
> and invariant cites its governing mandate URI, so reading the code reveals the mandate and
> reading the mandate reveals what the code must do. A mandate that is not precise enough to
> build from is a wish; code that does not cite its mandate is an orphan.

---

## Summary — Why Order Is the Whole Game

Prompt-over-code (`klappy://canon/principles/prompt-over-code`) already rules that when code
and policy disagree, the policy wins and the code is the owed build item. This principle names
the *consequence for authoring order*: write the mandate first, and write it as a spec, not a
sentiment.

Two things become true when the mandate is authored first and authored precisely:

**Self-building.** A mandate precise enough to build from is a specification. The build flight
does not reinvent the design at implementation time — it *derives* the schema, the write
paths, the gates, and the invariants from the mandate text. The mandate carries the WHAT (the
rule), and the code is the mechanical projection of that rule. This is why the ARS storage
redesign (ADR-0001) could be ruled in mandate before a single line of the new store existed:
the DDL, the offload rule, the retention bounds, and the mirror cadence are all *readable out
of the mandate*. The code is downstream of the text.

**Self-documenting.** Because every enforcement point in the code cites the mandate URI it
implements, the code explains itself. A reviewer reading a CI gate, a runtime assertion, or a
schema invariant can follow the citation to the governing mandate and see *why* the check
exists and *what* it must guarantee. Conversely, a reader of the mandate can find every place
the code enforces it. The two directions close a loop: mandate → code (derive), code → mandate
(cite). Neither drifts silently because each points at the other.

The failure this prevents is the one that produced the ARS write-freeze: a model ruled in
`docs/policy/` while the code kept a contradicting shape, with nothing connecting the two. The
monolithic blob was neither derived from the ruled flat-records model nor did it cite any
mandate — it was an orphan, and orphaned code drifts until it breaks. Policy-first, precisely
authored and cited, makes that orphaning structurally impossible.

---

## The Two Obligations

### 1. The mandate must be buildable (self-building)

A mandate is buildable when a competent seat, given only the mandate, could produce a conformant
implementation without re-deriving the design. Concretely, the mandate states the rule with
enough precision that the schema, the thresholds, the write paths, and the invariants follow
from the text. Vague mandates ("keep rows small") are not buildable; precise mandates ("no row
may approach the 2 MB DO row cap; known-huge fields are always stored in R2, everything else
over a 64 KB backstop is offloaded") are. The `enforceable-policy-anatomy` template's WHAT and
ENFORCEMENT parts exist to force this precision.

### 2. The code must cite its mandate (self-documenting)

Every enforcement, gate, invariant, or assertion that a mandate demands must, in code, carry a
reference to the governing mandate URI — in a comment, a check name, a test description, or an
error message. The citation is not decoration: it is the back-edge that makes the code
self-documenting and makes drift auditable. A grep for the mandate URI across the codebase
returns every place the mandate is enforced; a code path that enforces a rule without citing a
mandate is a finding.

---

## How This Binds the Mandate Set

- The **enforceable-policy-anatomy template** (`klappy://canon/meta/enforceable-policy-anatomy`)
  encodes both obligations: its WHAT part forces buildable precision, and its VERIFICATION part
  requires that *code references its governing mandate* and that *the mandate is precise enough to
  build from*.
- The **ARS bounded-storage constraint** (`klappy://canon/constraints/ars-bounded-storage`) is
  the first conformant instance: six policies each precise enough to build from, each naming the
  code citation the build flight owes.
- **The build flight is briefed accordingly:** implement the mandates, and cite them in code.
  The build is not "write a store and then check it against the mandate" — it is "derive the
  store from the mandate, and leave the citation trail that proves it." Reconciliation
  (`klappy://canon/constraints/ratified-model-requires-reconciliation-and-enforcer`) and this
  principle are the same discipline seen from two sides: reconciliation says the code must match
  the ruled model; policy-first says the match is achieved by deriving the code from the model
  and citing the model in the code.

---

## Scope, Confidence, and Retraction

Adversarial validation (`oddkit_challenge`, 2026-07-17) rightly pressed a principle drawn largely
from one incident. The honest framing:

**Scope.** This principle governs **buildable capabilities implementing a ruled model** — where a
design/data model has been ratified and code is expected to honor it. It does **not** govern
exploration or drafting, where a spec precise enough to build from does not yet exist and should
not be forced. Policy-first is an authoring *order* for the build-against-a-ruling case, not a
demand that all thought be specified before it is had.

**Anchoring and confidence.** The self-building / self-documenting framing is anchored primarily to
the ARS monolith write-freeze (2026-07-16), a single load-bearing case. Its confidence is raised —
not to certainty — by resting on `prompt-over-code`, which has broad receipts across oddkit's
production governance (the Writing Canon gate, the Identity creed, relational-sensitivity, all
prompt-not-code). This principle adds the *authoring-order* corollary to that established rule; it
is a working principle proposed for ratification, not a proven law.

**Retraction condition.** This principle is falsifiable and should be retracted or narrowed if:
policy-first authoring measurably slows delivery **without** reducing ruled-vs-shipped drift; or if
"precise enough to build from" proves routinely impossible for legitimate work that is genuinely
exploratory rather than build-against-a-ruling; or if code-cites-mandate citations become
box-ticking noise that no audit consumes. A principle that cannot be falsified is a preference; the
retraction condition is what makes this one a principle.

---

## Related Canon

- **[Prompt Over Code](klappy://canon/principles/prompt-over-code)** — the parent rule: policy is intent, code conforms. This principle adds the authoring order that makes conformance derivable and auditable.
- **[Anatomy of a Build Mandate](klappy://canon/meta/enforceable-policy-anatomy)** — the template that operationalizes both obligations.
- **[Ratified Model Requires Reconciliation and an Enforcer](klappy://canon/constraints/ratified-model-requires-reconciliation-and-enforcer)** — the same discipline from the reconciliation side.
- **[Convention Requires an Enforcer](klappy://docs/appendices/convention-requires-an-enforcer)** — why the citation-and-gate trail must be mechanical, not a habit.
- **[Constraint-Driven Audits](klappy://canon/meta/constraint-driven-audits)** — the audit surface that consumes the citation trail this principle requires.
