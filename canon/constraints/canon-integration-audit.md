---
uri: klappy://canon/constraints/canon-integration-audit
title: "Canon-Integration Audit — Three Checks Between Authoring and Merge"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["canon", "constraint", "governance", "integration", "cross-reference", "concept-audit", "validator", "workflow", "merge-gate", "both-audiences"]
epoch: E0008
date: 2026-04-23
derives_from: "canon/values/axioms.md, canon/meta/frontmatter-schema.md, canon/principles/dry-canon-says-it-once.md, canon/constraints/definition-of-done.md, canon/constraints/release-validation-gate.md"
complements: "canon/methods/revision-lens-sequence.md, canon/constraints/frontmatter-validation-before-merge.md, canon/principles/dream-house-principle.md, canon/principles/discernment-layer.md"
governs: "Any doc-producing workflow that produces content intended to be merged into the knowledge base — essays, canon docs, observations, constraints, methods, principles"
status: active
---

# Canon-Integration Audit — Three Checks Between Authoring and Merge

> A doc can be well-written and still fail to integrate with the knowledge base. The existing gauntlets check intrinsic quality (voice, structure, frontmatter, claims). They do not check extrinsic integration: whether the document's named concepts have canon homes, whether its load-bearing claims cite all matching existing canon, whether its validators exercise the full schema. The canon-integration audit is three checks that must pass between authoring and merge. Without them, every new document silently adds drift surface: a concept coined but not canonized, a claim defended without citing its precedent, a type violation that slipped past a partial validator.

---

## Summary — What the Existing Gauntlets Don't Catch

The repository has mature gauntlets for authoring: the revision-lens-sequence method governs essay writing, the frontmatter schema governs YAML metadata, the release-validation-gate governs tier-1 code changes, the definition-of-done governs completion claims. Each of these checks *intrinsic document quality* — is this document well-formed on its own terms?

None of them check *extrinsic knowledge-base integration* — does this document fit the rest of what exists, cite what it should cite, and pass a validator that exercises the full schema?

Three gaps, visible by incident:

- **Gap 1 — Concept audit.** An essay coined "The Dream House Principle" and "The Discernment Layer" as load-bearing named concepts across 20 revisions. No pass in the gauntlet asked *does this named concept have a canon home?* The concepts stayed essay-only until the author surfaced the question in natural language. Both concepts ended up canonized in a follow-on commit as `canon/principles/dream-house-principle` and `canon/principles/discernment-layer`, but they could have been canonized from rev 5 if the audit had run.
- **Gap 2 — Adjacent-canon audit.** The same essay's `derives_from` field cited two canon docs the session had just written. It did not cite `canon/principles/capability-is-not-permission` (which already names the cost-collapse economic shift the essay's thesis rests on) or `canon/constraints/mode-discipline-and-bottleneck-respect` (which already names the operator-attention claim). Both existed on main. The omissions were repaired in a follow-on commit, but only after the author flagged the integration gap in natural language.
- **Gap 3 — Validator-completeness audit.** A same-session python frontmatter validator passed all four PR files as "compliant." An independent Managed Agent validator, dispatched as the release-validation-gate requires, refuted the claim: `derives_from` was a YAML list, but the schema specifies a quoted comma-separated string. The local validator had checked field presence and enum values; it had not checked that `derives_from` parsed to `str` vs `list`. The rev-21 fix matched the MA's exact prescription and closed the violation.

All three gaps share a root cause: the existing gauntlets optimize for *is this document well-written?* and not for *does this document integrate with the rest of the knowledge base?* The canon-integration audit codifies three checks that close the gap, with defined trigger points so they fire proactively rather than at the author's invocation.

---

## The Three Audits at a Glance

| Audit | What it checks | Fires at | Closes |
|---|---|---|---|
| **Concept audit** | Every named concept in the doc has a canon home, or an explicit essay-only decision is recorded | `oddkit_gate` on the `drafting → peer-review-ready` transition | Gap 1 |
| **Adjacent-canon audit** | Every load-bearing claim references all matching existing canon via `derives_from` or inline citation | `oddkit_preflight` before `derives_from` is finalized | Gap 2 |
| **Validator-completeness audit** | The validator used to certify frontmatter schema compliance exercises type-discipline for every field the schema specifies types for — not just presence | `oddkit_validate` before the merge-gate approval is claimed | Gap 3 |

The audits are named for the check they perform, not for the tool that fires them. The canon doc is the content. The tool call is the trigger. Both pieces are needed; neither alone is sufficient.

---

## Audit 1 — Concept Audit

The concept audit asks, for every named concept in the document being authored: *does this concept have a canon home?*

A *named concept* is a term the author intends the reader to adopt as vocabulary — a principle with a name, a methodology with a name, a diagnostic with a name, an anti-pattern with a name. Every such name is either already canonized, or it is not yet canonized and the author must make an explicit decision about what to do.

### The Check Procedure

Before a doc transitions from `drafting` to `peer-review-ready`, the author or agent lists every named concept introduced or sharpened in the doc. For each:

- **Search canon for the concept.** Use `oddkit_search` with multiple queries that cover the concept's distinctive language. A single query is insufficient — the concept may be canonized under a different phrasing.
- **If canon exists:** cite it in `derives_from` or in a body link. The concept is integrated.
- **If canon does not exist:** decide explicitly — either write the canon now (recommended when the concept is load-bearing across multiple domains) or record that it is essay-only (acceptable when the name is a rhetorical frame, not a principle the author wants others to adopt).

### Example — What Would Have Fired at Rev 5 of the Dream-House Essay

At rev 5, the working title became *Penny Wise and Pound Foolish — Why I Build the Dream House Before Cutting*. The concept "Dream House Principle" was now a named methodology intended for reader adoption. The audit would have asked: does this have a canon home?

`oddkit_search` with queries like *"dream house principle"*, *"draw before cut"*, *"cut from contact with reality"*, *"design-then-sacrifice methodology"* would have returned no matching canon. The audit would have forced the decision: write `canon/principles/dream-house-principle.md` now, or record that the principle is essay-only.

The right decision was to write the canon. Writing it at rev 5 instead of rev 23 would have avoided 18 rounds of sharpening in the essay without canonical cross-reference. The essay could have cited the canon from the beginning; the canon's Verification section could have informed the essay's prescriptions; the cross-reference graph could have been complete from rev 0.

### Passing Criterion

The audit passes when every named concept in the document is either cited to existing canon or explicitly recorded as essay-only. A concept that is neither cited nor explicitly declared essay-only is a failure — it silently extends the vocabulary of the knowledge base without integrating with it, and readers who encounter it cannot discover its full treatment because no canon home exists.

---

## Audit 2 — Adjacent-Canon Audit

The adjacent-canon audit asks, for every load-bearing claim in the document: *does the existing knowledge base already cover this, and if so is it cited?*

A *load-bearing claim* is an assertion the document relies on that is not self-evidently true — an economic observation, a causal mechanism, a principle being invoked, an empirical pattern. Every such claim either has prior canon (which must be cited) or is a new claim (which must be flagged as such).

### The Check Procedure

Before `derives_from` is finalized, the author or agent extracts the document's load-bearing claims and runs a search for each:

- **Search for the claim's substantive vocabulary.** Not the document's own phrasing — the underlying concept. If the doc says *"measurement has gotten an order of magnitude cheaper"*, the search query is not *"measurement order of magnitude cheaper"* but *"cost of creation collapse"*, *"friction removal AI tooling"*, *"capability cost structure"* — the underlying claim, stated multiple ways.
- **If canon exists:** add it to `derives_from` as a string citation, and surface it in `related[]` or inline if it is load-bearing to the argument.
- **If canon does not exist:** note the claim as novel-to-the-knowledge-base. This is acceptable — the claim may be the document's original contribution. But it should be noted explicitly, not left implicit.

### Example — What Would Have Fired at Rev 0 of the Dream-House Essay

The essay's economic thesis is that *measurement cost has collapsed by 50-100x*, and this inverts the economics of pre-optimization. The preflight audit would have searched for *"cost collapse creation"*, *"frictionless tool acceleration"*, *"cost of creation below cost of deliberation"*.

`canon/principles/capability-is-not-permission` would have surfaced on the first search. It literally names the cost-collapse shift the essay depends on. It would have been added to `derives_from` from rev 0. Similarly `canon/constraints/mode-discipline-and-bottleneck-respect` for the operator-attention-as-bottleneck claim, which was cited in the essay body without being linked in frontmatter.

The result: an essay that is integrated with its intellectual predecessors, with readers able to follow the lineage back to the economic observation that makes the dream-house methodology work at all. This integration happened at rev 23 instead of rev 0, but the work would have been the same — the question is whether it was done before the document was claimed ready.

### Passing Criterion

The audit passes when the document's `derives_from` citation list is *complete* — every piece of existing canon that the document's load-bearing claims depend on is cited, not just the canon the author happened to remember or just-wrote. A document with load-bearing claims whose canon homes are not cited is a document that silently re-derives what canon already established.

---

## Audit 3 — Validator-Completeness Audit

The validator-completeness audit asks, for any validator whose green verdict is being relied on as a merge-gate signal: *does this validator exercise the full schema, or only the parts the author thought to check?*

The knowledge base has an authoritative frontmatter schema (`canon/meta/frontmatter-schema`) that specifies required fields, enum values, and — critically — type discipline. A validator that checks presence but not type discipline can return a false green and let a silent-failure-class violation merge.

### The Check Procedure

Before `oddkit_validate` is invoked to close the merge gate, the validator being relied on must be checked against the schema specification. The check is mechanical:

- **Every field the schema specifies a type for must be type-checked.** Booleans must be tested for `bool`, not presence. Integers must be tested for `int`, not string. Strings must be tested for `str` (not `list`, not `dict`). Arrays must be tested for `list` of the required element shape. Dates must be tested for native `date` or its ISO-8601 string form.
- **Enum values must be range-checked.** Fields with enumerated allowed values must be tested against the allowed set, not just for presence.
- **Structural fields must be shape-checked.** Object arrays (`related[]`) must verify every entry has the required keys.
- **URI/path consistency must be verified.** URIs must match file locations.

A validator missing any of these checks is incomplete. The audit requires the validator to be complete for its green verdict to count.

### Example — What Would Have Fired at the Rev-21 Validation Pass

At rev 21, a same-session python validator reported all four PR files as "compliant." The validator checked: universal-8 presence, enum values for exposure/voice/stability/type/audience, `tier` as int, `public` as bool, `slug` kebab-case, `related[]` object shape.

It did not check: `derives_from` as `str` (vs `list`), `complements` as `str` (vs `list`), `governs` as `str` (vs `list`).

The gap was invisible to the same-session author because `yaml.safe_load` silently accepted both YAML list and YAML string for `derives_from`. The validator returned green. The essay's `derives_from` was a list — a renderer-crash-class violation per the schema's Smell Test section.

An independent Managed Agent validator caught the issue, because its fresh context compared the parsed Python type against the schema-specified type rather than deferring to whatever the yaml parser accepted. The rev-22 fix matched the MA's prescription exactly.

The validator-completeness audit would have caught this at the same-session stage: the question *"does your validator type-check every field the schema specifies types for?"* would have surfaced the missing `str`-check on `derives_from`, prompting the validator to be extended before it was trusted.

### Passing Criterion

The audit passes when the validator used to close the merge gate implements type-discipline for every field the schema specifies a type for — not just field presence, not just enum values. A validator that checks less than the schema specifies is a partial validator; its green verdict must not be accepted as the merge-gate signal. Independent re-validation (per the release-validation-gate) remains required regardless, but a complete same-session validator reduces the cost of catching issues — it catches them before they reach the independent validator, reducing the number of round-trips.

---

## Trigger Points

The three audits fire at three different transition points in the doc-producing workflow:

- **Adjacent-canon audit → `oddkit_preflight`.** Preflight is the natural place for adjacent-canon search because it fires before the document starts accumulating citations. A preflight result that includes "canon matching your load-bearing claims: X, Y, Z" primes the author to cite correctly from rev 0.
- **Concept audit → `oddkit_gate`.** Gate is the natural place for concept audit because it fires at the `drafting → peer-review-ready` transition — the moment the document's named concepts solidify enough to matter. A gate check that surfaces "concept A has no canon home: write it or declare essay-only" forces the explicit decision before the document stabilizes.
- **Validator-completeness audit → `oddkit_validate`.** Validate is the natural place for the validator check because validate is the tool whose green verdict closes the merge gate. A validate call that reports "your validator implements 7 of 12 schema type-checks; consult this canon for the missing checks" prevents the false-green pattern that rev 21 exposed.

The doc defines *what* the audits check. The tool wiring is what makes the audits fire proactively. Canon defines the rule; oddkit enforces it.

### Tool-Wiring Dependency

The proactive-enforcement side of this constraint depends on the oddkit tools exposing the three audits at the transition points above. As of the date this doc is written, the tool-side enforcement is tracked as `P11 — mechanical enforcement of release-validation-gate in oddkit_gate at execution→completion transitions` in the klappy/oddkit repo's session ledgers, and the release-validation-gate is the precedent pattern.

Expanding P11's scope — from release-validation-gate enforcement alone to canon-integration-audit enforcement alongside — is the work that makes the audits fire proactively. Until that ships, this canon doc is passively discoverable (via `oddkit_search`) and citable from the existing workflow, but the audits do not fire without the author or agent invoking them.

This is an honest acknowledgment, not a hedge: defining the rule in canon is necessary but not sufficient. The rule becomes load-bearing only when the tool wiring exists. Both pieces are required for the proactive property.

---

## Application — The Session That Exposed All Three Gaps

The dream-house essay session (revs 0–23) is the case study that surfaced all three gaps. A compressed timeline:

- **Rev 5:** Working title "Penny Wise and Pound Foolish" solidifies. Concept audit would have fired here and surfaced the missing canon home for "Dream House Principle."
- **Rev 0 preflight:** `derives_from` was populated without searching for adjacent canon. Adjacent-canon audit would have fired here and surfaced `capability-is-not-permission` and `mode-discipline-and-bottleneck-respect`.
- **Rev 21 same-session validation:** Local python validator reported all four files compliant. Validator-completeness audit would have fired here and surfaced the missing `str`-check on `derives_from`.
- **Rev 22:** Managed Agent caught the `derives_from` list violation.
- **Rev 23:** Two new canon docs written, cross-reference graph closed, essay integration complete.

Without this audit, the gaps closed at rev 22 and rev 23 respectively. With this audit and its tool wiring, they would have closed at rev 0 and rev 5. Eighteen rounds of revision work would have operated against canonical cross-reference rather than accumulating integration debt.

The claim is not that every future session needs 23 revisions. The claim is that every future session has integration surfaces — concepts, claims, validators — and those surfaces are currently un-checked by the existing gauntlets. The canon-integration audit is the check.

---

## What This Constraint Does Not Require

This constraint does not require that every new document canonize every named term. It requires that every *named concept intended for reader adoption* be canonized or explicitly declared essay-only. Rhetorical frames ("penny wise and pound foolish" is a phrase, not a principle) do not need canon. Named principles, diagnostics, methodologies, and anti-patterns do.

This constraint does not require that every doc's `derives_from` be exhaustive. It requires that the *load-bearing claims* be traced to their canon homes. A doc may mention many things in passing; only the things the doc's argument depends on need to be citation-complete.

This constraint does not require that same-session validators be perfect. It requires that same-session validators be *audited for completeness before their green is trusted*. An incomplete validator is not forbidden — its verdict is simply not load-bearing. Independent re-validation (per the release-validation-gate) remains required for any load-bearing surface change regardless.

This constraint does not forbid merging with known integration debt. It requires that the debt be *explicit* — recorded, scoped, and traced to a follow-up. Silent integration debt is the failure mode. Named integration debt, with a clear path to closure, is acceptable.

---

## Verification

An author or agent applying this constraint can verify they are doing so by answering the following at the three transition points.

**Before finalizing `derives_from` (preflight):**
- Did I search for canon matching each load-bearing claim, with multiple query phrasings?
- Are all matching existing canon documents cited in `derives_from` or explicitly flagged as novel-to-the-knowledge-base?

**Before `drafting → peer-review-ready` (gate):**
- Did I list every named concept in this doc that I intend the reader to adopt?
- For each, does canon exist? If not, have I either written the canon or explicitly declared the concept essay-only?

**Before claiming validate green (validate):**
- Does my validator type-check every field the frontmatter schema specifies a type for — not just presence?
- Does my validator range-check enum values and shape-check structural fields?
- If the validator is incomplete, have I dispatched the independent MA validator to close the gap?

Honest yes answers at each checkpoint indicate the constraint is being honored. Any no at a checkpoint indicates integration debt that must be named before the transition proceeds.

---

## See Also

- [Definition of Done](klappy://canon/constraints/definition-of-done) — this audit extends DoD with three integration-layer checks
- [Frontmatter Schema](klappy://canon/meta/frontmatter-schema) — the authoritative source the validator-completeness audit validates against
- [Release-Validation-Gate](klappy://canon/constraints/release-validation-gate) — the precedent pattern: canon defines the rule, oddkit tool wiring enforces it at transitions; this constraint shares the same shape
- [DRY — The Canon Says It Once](klappy://canon/principles/dry-canon-says-it-once) — the adjacent principle that explains why adjacent-canon citation matters: a claim the canon has already made must not be silently re-derived
- [Revision Lens Sequence](klappy://canon/methods/revision-lens-sequence) — the existing essay workflow that this audit extends
- [Frontmatter Validation Before Merge](klappy://canon/constraints/frontmatter-validation-before-merge) — the narrower rule that the validator-completeness audit depends on
- [The Dream House Principle](klappy://canon/principles/dream-house-principle) — the canon doc whose absence during the dream-house essay drafting motivated the concept audit
- [The Discernment Layer](klappy://canon/principles/discernment-layer) — the canon doc whose absence motivated the concept audit, second instance
- [Axioms](klappy://canon/values/axioms) — Axiom 2 (A Claim Is a Debt) is the source: an unverified integration claim is a liability
- [The Dream House and Pre-Optimization](klappy://writings/the-dream-house-and-pre-optimization) — the session that exposed all three gaps
