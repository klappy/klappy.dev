---
uri: klappy://canon/principles/policy-first-self-building-self-documenting
title: "Policy-First — Policies First Ensures All Code Is Self-Building and Self-Documenting"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: draft
tags: ["canon", "principle", "policy-first", "prompt-over-code", "self-building", "self-documenting", "enforcement", "traceability", "ars"]
epoch: E0010
date: 2026-07-17
derives_from: "canon/principles/prompt-over-code.md, docs/appendices/convention-requires-an-enforcer.md, canon/constraints/ratified-model-requires-reconciliation-and-enforcer.md, canon/values/axioms.md"
complements: "canon/meta/enforceable-policy-anatomy.md, canon/meta/constraint-driven-audits.md, canon/constraints/ars-bounded-storage.md"
governs: "The authoring order of every buildable capability in this program: the governing policy is written before the code, precisely enough that the code can be derived from it, and the code cites the policy back. Binding on any seat that ships an implementation of a ruled model."
status: draft
---

# Policy-First — Policies First Ensures All Code Is Self-Building and Self-Documenting

> **Posture:** DRAFT — a principle authored for ratification, filed 2026-07-17 as the framing for the ARS
> storage policy set (`canon/constraints/ars-bounded-storage`) and the enforceable-policy
> template (`canon/meta/enforceable-policy-anatomy`). Authored for ratification;
> do not merge until reviewed and ratified.

> Policies first ensures all code is self-building and self-documenting. When the governing
> policy is written before the code and precisely enough to build from, two properties fall
> out for free. **Self-building:** the implementation can be *derived* from the policy — the
> policy is the buildable spec, so code follows from it rather than being invented alongside
> it. **Self-documenting:** the code *traces back* to the policy — every enforcement, gate,
> and invariant cites its governing policy URI, so reading the code reveals the policy and
> reading the policy reveals what the code must do. A policy that is not precise enough to
> build from is a wish; code that does not cite its policy is an orphan.

---

## Summary — Why Order Is the Whole Game

Prompt-over-code (`klappy://canon/principles/prompt-over-code`) already rules that when code
and policy disagree, the policy wins and the code is the owed build item. This principle names
the *consequence for authoring order*: write the policy first, and write it as a spec, not a
sentiment.

Two things become true when the policy is authored first and authored precisely:

**Self-building.** A policy precise enough to build from is a specification. The build flight
does not reinvent the design at implementation time — it *derives* the schema, the write
paths, the gates, and the invariants from the policy text. The policy carries the WHAT (the
rule), and the code is the mechanical projection of that rule. This is why the ARS storage
redesign (ADR-0001) could be ruled in policy before a single line of the new store existed:
the DDL, the offload rule, the retention bounds, and the mirror cadence are all *readable out
of the policy*. The code is downstream of the text.

**Self-documenting.** Because every enforcement point in the code cites the policy URI it
implements, the code explains itself. A reviewer reading a CI gate, a runtime assertion, or a
schema invariant can follow the citation to the governing policy and see *why* the check
exists and *what* it must guarantee. Conversely, a reader of the policy can find every place
the code enforces it. The two directions close a loop: policy → code (derive), code → policy
(cite). Neither drifts silently because each points at the other.

The failure this prevents is the one that produced the ARS write-freeze: a model ruled in
`docs/policy/` while the code kept a contradicting shape, with nothing connecting the two. The
monolithic blob was neither derived from the ruled flat-records model nor did it cite any
policy — it was an orphan, and orphaned code drifts until it breaks. Policy-first, precisely
authored and cited, makes that orphaning structurally impossible.

---

## The Two Obligations

### 1. The policy must be buildable (self-building)

A policy is buildable when a competent seat, given only the policy, could produce a conformant
implementation without re-deriving the design. Concretely, the policy states the rule with
enough precision that the schema, the thresholds, the write paths, and the invariants follow
from the text. Vague policies ("keep rows small") are not buildable; precise policies ("no row
may approach the 2 MB DO row cap; known-huge fields are always stored in R2, everything else
over a 64 KB backstop is offloaded") are. The `enforceable-policy-anatomy` template's WHAT and
ENFORCEMENT parts exist to force this precision.

### 2. The code must cite its policy (self-documenting)

Every enforcement, gate, invariant, or assertion that a policy demands must, in code, carry a
reference to the governing policy URI — in a comment, a check name, a test description, or an
error message. The citation is not decoration: it is the back-edge that makes the code
self-documenting and makes drift auditable. A grep for the policy URI across the codebase
returns every place the policy is enforced; a code path that enforces a rule without citing a
policy is a finding.

---

## How This Binds the Policy Set

- The **enforceable-policy-anatomy template** (`klappy://canon/meta/enforceable-policy-anatomy`)
  encodes both obligations: its WHAT part forces buildable precision, and its VERIFICATION part
  requires that *code references its governing policy* and that *the policy is precise enough to
  build from*.
- The **ARS bounded-storage constraint** (`klappy://canon/constraints/ars-bounded-storage`) is
  the first conformant instance: six policies each precise enough to build from, each naming the
  code citation the build flight owes.
- **The build flight is briefed accordingly:** implement the policies, and cite them in code.
  The build is not "write a store and then check it against the policy" — it is "derive the
  store from the policy, and leave the citation trail that proves it." Reconciliation
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
exploratory rather than build-against-a-ruling; or if code-cites-policy citations become
box-ticking noise that no audit consumes. A principle that cannot be falsified is a preference; the
retraction condition is what makes this one a principle.

---

## Related Canon

- **[Prompt Over Code](klappy://canon/principles/prompt-over-code)** — the parent rule: policy is intent, code conforms. This principle adds the authoring order that makes conformance derivable and auditable.
- **[Anatomy of an Enforceable Policy](klappy://canon/meta/enforceable-policy-anatomy)** — the template that operationalizes both obligations.
- **[Ratified Model Requires Reconciliation and an Enforcer](klappy://canon/constraints/ratified-model-requires-reconciliation-and-enforcer)** — the same discipline from the reconciliation side.
- **[Convention Requires an Enforcer](klappy://docs/appendices/convention-requires-an-enforcer)** — why the citation-and-gate trail must be mechanical, not a habit.
- **[Constraint-Driven Audits](klappy://canon/meta/constraint-driven-audits)** — the audit surface that consumes the citation trail this principle requires.
