---
uri: klappy://canon/meta/constraint-driven-audits
title: "Constraint-Driven Audits — Every Constraint Is an Auditable Compliance Surface"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["canon", "meta", "constraints", "audit", "oddkit", "architecture", "compliance"]
epoch: E0005
date: 2026-02-17
derives_from: "canon/values/axioms.md (Axiom 2 — A Claim Is a Debt), canon/meta/writing-canon.md, canon/constraints/guide-posture.md"
complements: "docs/oddkit/IMPL-writing-canon-gate.md, docs/oddkit/IMPL-guide-posture-gate.md, canon/constraints/definition-of-done.md"
governs: "All constraint documents in canon/ and odd/constraint/. Defines the architectural contract that makes constraints machine-auditable."
---

# Constraint-Driven Audits — Every Constraint Is an Auditable Compliance Surface

> A constraint that cannot be audited against its governed documents is advice, not enforcement. Every constraint document declares a governance scope (what it governs), a set of tests (pass/fail criteria), and a remediation vocabulary (what to do when something fails). oddkit's audit capability uses these three elements to run any constraint against its governed documents and return a structured compliance report — populating a non-blocking drift queue, not a blocking backlog. This eliminates manual audit backlogs and makes epistemic drift visible and workable without preventing forward movement. The architecture is generic: Writing Canon, Guide Posture, and every future constraint plug into the same infrastructure.

-----

## Summary — Constraints That Can't Audit Themselves Generate Manual Backlogs That Block Work

The Guide Posture constraint revealed a structural problem. After writing the constraint and running a manual audit of 15 homepage documents, the result was 13 work items — a backlog that didn't exist before the constraint was written. Worse, that backlog created pressure to resolve findings before moving forward, which would have blocked the very work that produced the constraint.

The root cause is twofold. First, constraints currently define *what* to check but provide no machine-readable way to *run those checks* against the documents they govern. Every new constraint multiplies the audit burden. Second, audit findings were treated as implicit task lists rather than observable drift — creating urgency where visibility was the actual need.

The solution is architectural: every constraint document carries enough structure for oddkit to resolve its governance scope, extract its tests, and run them automatically. Findings populate a non-blocking drift queue that agents analyze for impact and work through when capacity allows. Drift is entropy, not failure. The system's job is to make it observable and workable, not to prevent it or block on it. This is epistemic drift hygiene — a methodology for maintaining corpus integrity without stopping forward movement.

-----

## The Three Elements of an Auditable Constraint

Every constraint that wants to be machine-auditable must declare three things:

### 1. Governance Scope — What Documents Does This Constraint Apply To?

The scope must be resolvable to a concrete set of documents using metadata. This is already partially supported — constraints have a `governs` field in frontmatter. But the field currently contains prose descriptions ("All public-facing content") rather than machine-resolvable queries.

An auditable governance scope uses metadata filters: audience, exposure, tags, directory paths, or combinations. Examples:

Writing Canon governs: `audience IN [canon, odd, docs]` — all documents in the three core directories.

Guide Posture governs: `audience = public OR exposure = nav` — all documents a user could encounter on the public site.

Future constraints might govern: `tags CONTAINS 'agent'` or `tier <= 2` or `path STARTS WITH odd/constraint/`.

### 2. Tests — What Does Pass/Fail Look Like?

Each constraint defines named tests with clear pass/fail criteria. These can range from structural checks (does a blockquote exist?) to semantic checks (does the opening paragraph name a user problem?).

Structural tests are automatable today: blockquote presence, summary section presence, header scan patterns, metadata completeness. These are grep-level operations.

Semantic tests require agent judgment: does this blockquote contain a compressed argument (not just a topic sentence)? Does the opening lead with user pain or system description? These need an LLM to evaluate, but oddkit already has agent access through challenge and validate.

The constraint document should separate structural tests (automatable) from semantic tests (require judgment) so the audit can run the cheap checks first and escalate to agent evaluation only when needed.

### 3. Remediation Vocabulary — What Action Does Failure Require?

Different constraints produce different remediation actions. Writing Canon failures need the document itself fixed (add a blockquote, rewrite headers). Guide Posture failures fall into three categories: pass, reframe (fix the public doc in place), or guide-layer (create a new public entry point in front of an internal doc).

The remediation vocabulary is constraint-specific. The audit infrastructure doesn't need to understand what "guide-layer" means — it just needs to report the category so the human or agent doing the work knows what kind of fix is needed.

-----

## How oddkit Audit Works

### Input

A constraint URI and optionally a scope override.

`oddkit audit klappy://canon/constraints/guide-posture` — audit all documents in guide posture's governance scope.

`oddkit audit klappy://canon/meta/writing-canon --scope "start_here: true"` — audit only start_here documents against Writing Canon.

### Process

1. **Resolve scope.** Read the constraint's `governs` field. Resolve it to a concrete list of documents using metadata queries against the baseline index.
1. **Extract tests.** Parse the constraint document for its named tests. Separate structural (automatable) from semantic (judgment-required).
1. **Run structural tests.** For each document in scope, run the automatable checks. These are fast and deterministic.
1. **Run semantic tests.** For documents that pass structural checks (or for all documents if structural checks aren't applicable), use agent evaluation to assess semantic compliance. This is the expensive step — it requires reading each document and applying judgment.
1. **Classify results.** For each document, report: pass, or fail with the constraint's remediation vocabulary (reframe, guide-layer, fix-in-place, etc.).

### Output

A structured report: document path, constraint URI, test results, remediation action, and optionally a one-line explanation of why it failed.

-----

## What This Requires of Constraint Authors

Writing a new constraint now carries a structural obligation: if the constraint governs documents, it must include:

A `governs` field in frontmatter that can be resolved to a metadata query (not just prose).

A section with named tests that have clear pass/fail criteria.

A remediation vocabulary that names what kinds of fixes are needed when tests fail.

This is not a new burden — it's making explicit what was already implicit. Every constraint already *has* a governance scope, tests, and remediation patterns. The requirement is to write them in a form the system can use, not just humans.

-----

## Existing Constraints — Retrofit Path

The two existing constraints with explicit test suites are candidates for immediate retrofit:

**Writing Canon** — governance scope: `audience IN [canon, odd, docs]`. Seven named tests (title, blockquote, metadata, summary, header scan, no buried claims, axiom space). Remediation: fix-in-place. Structural tests (blockquote existence, summary section existence, header patterns) are automatable today.

**Guide Posture** — governance scope: `audience = public OR exposure = nav`. Three named tests (hero, pain-first, plan-reveal). Remediation vocabulary: pass, reframe, guide-layer. All three tests are semantic (require judgment).

Other existing constraints (offline-first, AI as accelerator, evidence over assertion) are currently written as design principles, not document-level checks. They may not need document-level auditing — they govern *system behavior*, not *document content*. The audit capability is for constraints that govern documents.

-----

## Constraints on the Audit Capability Itself

The audit must not block forward movement. A constraint audit produces a drift queue, not a blocking backlog. The work that surfaced the constraint — or any other work in progress — must never be gated on resolving audit findings. Drift is entropy, not failure. Making it visible is the win; resolving it is done when capacity allows.

The audit must not create false urgency. A report showing 13 failures is information for prioritization, not a sprint. The output feeds a queue that agents analyze for impact, not a task list that demands immediate action.

The audit must be runnable incrementally. Auditing the full corpus is useful for baseline assessment. Auditing a single document against all applicable constraints is useful at commit time. Both modes must work.

The audit must separate structural from semantic checks. Structural checks are cheap and deterministic. Semantic checks cost agent time and tokens. Running semantic evaluation on 355 documents is expensive — the system should support filtering, sampling, and incremental runs.

The audit must not modify documents. It reports. Humans and agents decide what to fix and when.

-----

## The Drift Queue — Epistemic Drift Hygiene

Constraint audits don't produce task lists. They populate a drift queue — a persistent, prioritized record of where the corpus has drifted from its governing constraints.

### Why Drift Is Not Failure

Constraints evolve. New ones get written (Guide Posture didn't exist yesterday). Old documents don't retroactively comply. New documents ship under time pressure without full validation. This is normal entropy, not negligence. The system's job is to make drift observable and workable, not to prevent it.

### How the Queue Works

Audit results populate the queue with structured items: document path, constraint URI, which test failed, remediation type, and a timestamp. Items accumulate. Nothing blocks.

Agents analyze the queue for impact when there is capacity. Impact factors include: how many users encounter this document (homepage vs. deep internal), whether the drift compounds (a guide-posture failure on the homepage is higher impact than one on an internal doc), and whether the item is already being touched for other work (opportunistic fixing).

### Working the Queue

The queue is worked in three modes:

**Opportunistic.** When a document is being edited for other reasons, the agent checks the drift queue for that document and resolves any items as part of the existing work. This is the cheapest path — no dedicated audit sprint needed.

**Impact-driven.** When there is capacity for dedicated hygiene work, agents pull the highest-impact items first. Impact is assessed by: user exposure (homepage > nav > internal), constraint severity (tier 1 constraints > tier 2), and age (older drift items have had more time to compound).

**Triggered.** When a new constraint is added, the audit runs against its governance scope and populates the queue with baseline findings. This is what happened with Guide Posture — the manual audit was the first triggered run. Future triggered runs should be automated.

### The Guide Posture Audit as First Example

The manual guide posture audit (`docs/audits/guide-posture-audit.md`) is the first instance of this pattern. Its 13 findings (5 reframe, 7 guide-layer, 1 full treatment) are the initial queue population. These items don't block the guide posture constraint from being active — the constraint governs new work immediately. The existing drift gets worked over time.
