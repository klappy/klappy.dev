---
uri: klappy://canon/meta/enforceable-policy-anatomy
title: "Anatomy of a Build Mandate — The Five Parts a Governing Statement Needs Before a Line of Code"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["canon", "meta", "mandate", "policy", "template", "enforcement", "convention-requires-an-enforcer", "policy-first", "drift", "governance"]
epoch: E0011
date: 2026-07-17
derives_from: "canon/principles/policy-first-self-building-self-documenting.md, docs/appendices/convention-requires-an-enforcer.md, canon/meta/constraint-driven-audits.md, canon/constraints/release-validation-gate.md, canon/constraints/ratified-model-requires-reconciliation-and-enforcer.md, canon/values/axioms.md"
complements: "canon/constraints/ars-bounded-storage.md"
governs: "Every build mandate — the governing statement for something about to be built that a machine, review gate, or runtime invariant is expected to enforce. Defines the five parts (WHAT · WHY · ENFORCEMENT · SCOPE · VERIFICATION) a mandate must declare and the conformance bar for each."
status: active
---

# Anatomy of a Build Mandate — The Five Parts a Governing Statement Needs Before a Line of Code

> **Posture:** ACTIVE — ratified by merge on 2026-10-09 (captain ruling). A meta-template filed 2026-07-17 alongside the ARS storage
> policy set. Former name: *Anatomy of an Enforceable Policy* (`enforceable-policy-anatomy`); the uri is unchanged. Renamed per the captain ruling of 2026-10-09 recorded in `klappy://canon/definitions/governance-artifacts`: the five-part per-build artifact is a **mandate**; "policy" keeps its P0011 meaning (durable guidance). A mandate is typically carried inside the project's charter (klappy://canon/definitions/governance-artifacts).

> An enforceable mandate is not prose about a good idea. It is five declared parts, and a mandate
> missing any of them is advice, not enforcement. **WHAT** states the rule precisely enough to
> build from. **WHY** gives the rationale and names the motivating failure the rule exists to
> prevent. **ENFORCEMENT** names the concrete enforcer — a CI gate, a runtime assertion or
> invariant, or a review gate — by name, because a rule no mechanism checks is a convention, and
> conventions decay. **SCOPE** resolves to the exact surface the rule governs. **VERIFICATION**
> states how compliance is proven, including that the code cites its governing mandate and that
> the mandate is precise enough to build from. Five parts, every time.

---

## Summary — Why a Template At All

Canon already holds the pieces of this rule scattered across three documents. `Convention
Requires an Enforcer` says a rule without a mechanical enforcer decays. `Constraint-Driven
Audits` says every constraint must declare a machine-resolvable governance scope, named tests,
and a remediation vocabulary. `Ratified Model Requires Reconciliation and an Enforcer` says a
ruled model creates a reconciliation debt and demands an enforcer. `Release Validation Gate` is
the worked example of a tier-1 constraint whose rules are mechanical, not optional.

What was missing is the single rubric a mandate author fills in so that all of those obligations
are satisfied by construction. This template is that rubric. It does not replace the audit
architecture of `constraint-driven-audits` — it *feeds* it: a mandate written to this anatomy
already declares the scope and tests the audit needs. It does not replace `prompt-over-code` —
it *operationalizes* `policy-first-self-building-self-documenting`, the principle that the
mandate is authored first, precisely enough to build from, and cited back by the code.

Use this template for any mandate — a governing statement a machine, a review gate, or a runtime invariant is expected to
enforce. A durable policy that governs only human judgment (a value, a disposition) does not need all
five parts — but a statement that expects code or a gate to obey it is a mandate and needs every one.

---

## The Five Required Parts

### 1. WHAT — The Rule, Precisely

State the rule as a specification, not a sentiment. The bar is **self-building**: a competent
seat given only this text could derive a conformant implementation without re-deriving the
design. Name the exact thresholds, shapes, prohibitions, and invariants. "Keep storage small"
fails; "no row may approach the 2 MB row cap; known-huge fields are always offloaded to R2;
everything else over a 64 KB backstop is offloaded" passes. Precision here is what makes the
code derivable downstream.

### 2. WHY — Rationale and the Motivating Failure

Give the reason the rule exists, and name the concrete failure that motivates it. A mandate whose
WHY is only abstract ("good hygiene") is weak; a mandate whose WHY cites a real incident ("the
2026-07-16 `SQLITE_TOOBIG` monolith write-freeze, when the whole-state blob crossed 2 MB and
every write failed") is load-bearing. The motivating failure is what lets a future reader judge
whether an exception is safe: they can ask "does this reintroduce the failure?" The WHY is also
where the mandate earns its tier — a rule that prevents a whole *class* of failure is tier-1.

### 3. ENFORCEMENT — The Named Enforcer

Name the concrete mechanism that makes the rule binding. It must be one or more of:

- **CI gate** — a build/test check that fails when the rule is violated (a grep/AST check, a
  schema lint, an integration test). Name the check.
- **Runtime assertion / invariant** — a guard in the running code that refuses the violating
  operation (a size assertion, a write-path boundary, a partial unique index). Name the invariant.
- **Review gate** — a rule every PR review checks the diff against (a tool↔verb map, an anti-verb
  list, a required index row). Name the gate.

"It should be enforced" is not an enforcer. The enforcer has a name and a location. Per
`convention-requires-an-enforcer`, a rule no mechanism checks is a convention with a deadline.
If mechanical enforcement does not exist yet, the mandate says so explicitly and names the
interim obligation — the enforcement roadmap is part of the mandate, not an excuse for its
absence.

### 4. SCOPE — The Governed Surface

Resolve the rule to the exact surface it governs — repos, paths, tables, tool handlers, or a
metadata query. Per `constraint-driven-audits`, the scope should be resolvable to a concrete set
of artifacts, not a prose gesture ("all the important code"). Negative scope (where the rule must
*not* fire) is stated when it prevents false positives. The scope is what the audit and the CI
gate iterate over.

### 5. VERIFICATION — How Compliance Is Proven

State the observable proof that the rule holds. This is the definition-of-done for the mandate's
enforcement. It must include, at minimum:

- The **positive proof** — the test, benchmark, or observation that demonstrates the rule is
  satisfied (e.g., "an idempotent write succeeds where it fails today"; "restore-from-R2-alone
  rebuilds the store with row-count + sha parity").
- **Code references its governing mandate** — every enforcement point named in ENFORCEMENT cites
  this mandate's URI in code (comment, check name, test description, or error message), so a grep
  for the URI returns every place the mandate is enforced. This is the self-documenting back-edge.
- **Mandate is precise enough to build from** — the implementation was *derived* from the WHAT,
  not invented alongside it. The proof is that the schema/thresholds/invariants in the code match
  the mandate text without a design gap the code had to fill on its own authority.

The last two items are the `policy-first-self-building-self-documenting` obligations made
checkable: derive the code from the mandate (self-building), and cite the mandate in the code
(self-documenting).

---

## Conformance — What This Template Requires of a Mandate Author

1. **All five parts present.** A mandate expecting mechanical or review enforcement declares WHAT,
   WHY, ENFORCEMENT, SCOPE, and VERIFICATION. A missing part is a drafting defect.
2. **Frontmatter mirrors a tier-1 sibling.** `uri`, `title`, `audience: canon`, `exposure`,
   `tier`, `voice`, `stability`, `tags`, `epoch`, `date`, `derives_from`, `complements`,
   `governs`, `status`, and `target_repo` where a specific repo is bound — modeled on
   `canon/constraints/release-validation-gate`.
3. **The WHY names a real failure** where one exists. Abstract-only rationale is a weaker mandate
   and should be marked as such.
4. **The ENFORCEMENT names the enforcer** by kind and location. No unnamed "should be enforced."
5. **The VERIFICATION closes the policy-first loop** — code cites the mandate, and the mandate is
   buildable. Both are required, not aspirational.
6. **The mandate bounds its own claim.** Adversarial validation (`oddkit_challenge`) of a tier-1
   mandate will press six things every author should pre-empt: (a) *signal confidence* — separate
   observed fact (the WHY/failure) from proposed-but-unbuilt design (the ENFORCEMENT); (b) *bound
   the claim* — state the scope and the falsifier ("if X still happens after the enforcer is green,
   the mandate is wrong"); (c) *name the alternatives* that were considered and why the ruled option
   won; (d) *name the costs and residual risks*, not hide them; (e) *name the dependencies* — what
   else fails if a premise is false; (f) *state reversibility*. A mandate that pre-empts these is not
   weakened by challenge — it has already done the work challenge would demand.

A mandate conformant to this anatomy is, by construction, auditable per
`constraint-driven-audits` (it has a scope and named tests), reconcilable per
`ratified-model-requires-reconciliation-and-enforcer` (it has an enforcer), and policy-first per
`policy-first-self-building-self-documenting` (it is buildable and cited).

---

## Related Canon

- **[Policy-First — Self-Building and Self-Documenting](klappy://canon/principles/policy-first-self-building-self-documenting)** — the principle this template operationalizes.
- **[Constraint-Driven Audits](klappy://canon/meta/constraint-driven-audits)** — the audit architecture a template-conformant mandate feeds (scope + tests + remediation).
- **[Ratified Model Requires Reconciliation and an Enforcer](klappy://canon/constraints/ratified-model-requires-reconciliation-and-enforcer)** — the reconciliation obligation the ENFORCEMENT part discharges.
- **[Release Validation Gate](klappy://canon/constraints/release-validation-gate)** — the tier-1 sibling whose frontmatter and mechanical-rule shape this template generalizes.
- **[Convention Requires an Enforcer](klappy://docs/appendices/convention-requires-an-enforcer)** — why ENFORCEMENT must be named and mechanical.
- **[ARS Bounded Storage](klappy://canon/constraints/ars-bounded-storage)** — the first policy set authored to this anatomy.
