---
uri: klappy://canon/methods/supersession
title: "Method: Supersession — How Governance Evolves Without Erasing Its History"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["canon", "methods", "supersession", "drift", "graduation", "governance", "evolution", "replace", "regenerate", "tolerate"]
epoch: E0006
date: 2026-03-21
derives_from:
  - "canon/values/axioms.md (Axiom 3 — Integrity Is Non-Negotiable Efficiency)"
  - "canon/values/drift.md"
  - "canon/methods/weighted-relevance-and-arbitration.md"
  - "odd/constraint/anti-cache-lying.md"
complements: "canon/methods/self-audit.md, canon/methods/planning-queue.md, writings/the-drift-queue.md, odd/ledger/epistemic-ledger.md, docs/appendices/compiled-memory.md"
governs: "All documents in canon/, odd/, and docs/ directories when understanding evolves past what a document encodes"
constraint: "Superseded documents must remain discoverable as historical evidence. Hiding evolution is a shortcut on truth — and shortcuts on truth always cost more than honest unknowns (Axiom 3)."
---

# Method: Supersession — How Governance Evolves Without Erasing Its History

> Drift has five responses, not one. Tolerate it when the cost of fixing exceeds the cost of leaving. Observe it when the tension is real but action is premature — record it, defer, wait for pain. Graduate it when governance has evolved past what the document encodes — supersede the old to historical evidence with bidirectional pointers, keeping it visible but deprioritized. Replace derived documents that must reflect current truth and have no provenance to preserve. Regenerate projections from canonical sources with content-hash keying — anything whose content is a deterministic function of other documents must not be hardcoded, because a committed projection is a cached lie (per Anti-Cache Lying). This last point is the highest-priority constraint: an entire class of drift — stale indexes, outdated READMEs, broken navigational surfaces — is eliminated by refusing to store projections as source. This hangs from Axiom 3 (Integrity Is Non-Negotiable Efficiency) and Axiom 1 (Reality Is Sovereign): hiding where the system was is a shortcut on truth, and serving a past observation as current truth is a violation. Drift operates across layers — governance, format, preference, style, shape, interface — and each layer has different responses. Format and shape drift can trigger graduation when the incompatibility is in content, not just presentation. Drift is celebrated, not hidden. The old way is evidence of growth. The new way governs.

-----

## Summary — Five Responses to Drift, Not One

Every growing system produces documents that were correct when written but no longer reflect current understanding. The drift value (`canon/values/drift.md`) established that drift is evidence of growth and defined three responses: amend, acknowledge, or investigate. Experience has shown this taxonomy is incomplete. The real question when facing drift is not "should I fix this?" but "what kind of thing drifted, and what is the right response for that kind of thing?"

The foundation is Axiom 3: Integrity Is Non-Negotiable Efficiency. Overwriting a document's history to make the system look coherent is a shortcut on truth. But so is leaving a broken index that points agents to the wrong place. The right response depends on what the document is — an authored source of governance, or a derived artifact that serves a navigational function — and on whether the drift is causing real pain or just visible tension.

The five responses form a spectrum from least to most action: tolerate, observe, graduate, replace, regenerate. Each has a place. None is universally correct. Applying graduation where replacement is needed produces ceremony without value. Applying replacement where graduation is needed destroys provenance. The taxonomy exists so the response matches the situation.

Every drift response produces OLDC artifacts (observations, learnings, decisions, constraints) that belong in the epistemic ledger — not in conversation history that evaporates between sessions.

-----

## The Five Responses to Drift

### 1. Tolerate

The drift exists. Someone noticed it. The deliberate response is: leave it alone.

This is the right response when the drift causes no confusion in practice — no agent misbehavior, no reader misunderstanding, no wrong decisions. The cost of addressing it exceeds the cost of its presence. Tolerance is not neglect. Neglect means nobody noticed. Tolerance means someone noticed, evaluated, and chose inaction as the correct response.

**When to use:** Stylistic inconsistencies between epochs. Preference drift in author voice. Minor terminological variants that readers resolve from context. Format differences between early and late documents that reflect the system's age without misleading.

**What to record:** Nothing, or a brief ledger note that drift was noticed and tolerated. The absence of a record is acceptable for trivial drift. For drift that someone might later flag as a problem, a tolerance note prevents re-evaluation.

### 2. Observe

The drift is real. The tension is real. But action is premature — the system hasn't resolved the underlying question yet, or the pain hasn't surfaced in practice.

This maps to the drift value's "acknowledge" response and to the OLDC model's observation entry. The observation names the tension, classifies the drift type, identifies the documents in conflict, and sits in the ledger. It waits. When the pain arrives — when an agent follows the wrong document, when a reader gets confused, when the tension blocks progress — the observation already exists and the decision about what to do next starts from documented ground, not from re-discovery.

**When to use:** Two documents with overlapping governance surface but no clear winner. An emphasis shift that might reverse as understanding matures. A tension between E0005 and E0006 concepts where forcing resolution would lose something important.

**What to record:** OLDC ledger entry: what drifted, what type (terminological, structural, emphasis, scope, value), which documents are in tension, why action is deferred.

### 3. Graduate

Understanding has evolved past what the document encodes. The old version's governance framing — not just its terminology, but its conceptual model — has been superseded by a new one. Amending in place would rewrite the document so thoroughly that it would lose the record of where the system was. That's forced coherence, and forced coherence violates Axiom 3.

Graduation retires the document from active governance to historical evidence. The document stays in the corpus. Its frontmatter declares it superseded and points to its successor. The successor points back. oddkit surfaces it at reduced priority — discoverable for research and context, but not governing for execution.

**When to use:** Governance drift where the amendment would fundamentally rewrite the document's framing. Epoch transitions that introduce new governance concepts replacing the previous epoch's approach. New documents that cover the same governance surface with clearer, more accurate treatment.

**What to record:** Full OLDC ledger entry plus bidirectional frontmatter pointers (`stability: superseded`, `superseded_by`, `supersedes`) and a `supersession_reason` field on the successor. See "Graduation Mechanics" below.

### 4. Replace

Some documents must be updated in place and the old version must go away. These are derived documents — indexes, READMEs, navigational tables of contents, generated summaries. They serve a directory function. They point agents and readers to where things are *now*. An index that says "Lane Self-Containment" when the concept was renamed to "Work Unit Self-Containment" is not a historical artifact — it's a broken signpost.

The distinction: **source documents** are authored artifacts with provenance. They encode understanding at a point in time. Their history has value. **Derived documents** are navigational artifacts that reflect current state. Their history has no independent value — their value comes from being accurate right now.

Replacing a derived document is not forced coherence. It's maintenance of a living directory. The Canon README is a router, not a record. The Constraints outline is a table of contents, not a treatise.

**When to use:** Index files (READMEs that list contents). Outlines and navigational summaries. Metadata aggregations. Any document whose sole purpose is to point to other documents or reflect their current state.

**What to record:** Minimal — the git commit that made the change is the record. No OLDC entry needed unless the replacement reveals a systemic issue.

### 5. Regenerate — The Default for Projections

Some documents should never drift because they should never have been stored as source. Indexes, content tables, navigational summaries, outlines — these are *projections* of system state, not authored content. They are the documentation equivalent of a TTL cache: a snapshot of a past observation committed as though it were durable truth. When the source changes and the projection doesn't, the projection lies.

Anti-Cache Lying (`odd/constraint/anti-cache-lying.md`) already prohibits this pattern for data caching. The same prohibition extends to documentation. A hardcoded README that lists files is no different from a cached API response that lists records — both serve a past observation as current truth, both go stale silently, and both cause production issues when they do.

The fix is not to "update" projections when they drift. The fix is to stop committing them as source files. Generate them JIT, store them with content-hash keying, and regenerate when source content changes. This eliminates an entire class of drift — the class that is currently the most painful, because stale indexes and READMEs block production with errors that don't matter and shouldn't exist.

Two subtypes:

**Explicit regeneration** — the projection declares what it's derived from (`derived_from: [source URIs]`). A CI/CD pipeline detects source changes and triggers regeneration. The artifact is always fresh because staleness is structurally impossible.

**Implicit regeneration** — an agent encountering a stale projection recognizes it as derived (from its frontmatter or nature) and regenerates it on the fly from current system state. JIT maintenance — the document is rewritten at the moment it's needed.

**When to use:** Any document whose content is a deterministic function of other canonical sources. Indexes, READMEs that list contents, outlines, navigational summaries, compiled context packs, metadata aggregations.

**What to record:** The regeneration template or derivation function. The content hash of the source at generation time. The pipeline or trigger mechanism.

-----

## Drift Operates Across Layers

The drift value defines five content drift types: terminological, structural, emphasis, scope, and value. These describe what's drifting *within a document*. Drift also operates across system layers, and the right response depends on which layer is affected.

### Governance Drift

Drift in axioms, values, principles, constraints, methods, decisions. When governance drifts, agents get conflicting instructions. **Primary responses: graduate, observe.** The 12 findings from the March 2026 drift audit (terminological lane→work-unit, structural precedence hierarchy, emphasis E0006 absence) are governance drift.

### Format Drift

Drift in progressive disclosure structure, frontmatter schema, metadata conventions, URI scheme. The writing canon evolves; every document written before a format change is technically non-compliant. **Primary response: tolerate.** New standards govern new documents. Historical documents keep their format as temporal markers. Retroactive reformatting destroys provenance.

### Preference Drift

Drift in author voice, tone, Socratic questioning depth, domain example balance. These evolve with the author's confidence and clarity. **Primary response: tolerate.** This is the human evidence of a learning system, not a defect to standardize.

### Style Drift

Drift in document length norms, header conventions, code formatting, YAML ordering. Adjacent to format drift but finer-grained. **Primary response: tolerate.** Evolving standards govern new work.

### Shape Drift

Drift in system topology — directory organization, URI scheme expectations, document relationships. **Primary response: replace** (at the navigational level — update indexes and paths) **+ observe** (at the convention level — decision records capture what changed).

### Interface Drift

Drift in how oddkit exposes documents, what the website renders, what API consumers see. **Primary response: replace or regenerate.** This is a tooling concern resolved by updating the interface, not by superseding the content.

### The Format/Shape Exception — When Presentation Becomes Content

Format, style, and shape drift normally warrant toleration — old documents keep their format as temporal markers. But there is an exception: **when the format itself communicates something false**.

If an old document's structure encodes governance assumptions that are no longer true — not just "doesn't match the current template" but "the structure actively misleads agents into wrong decisions" — then the incompatibility is in content, not presentation. The format is a governance claim wearing a structural disguise.

**The test:** Does the format mismatch cause agents to make wrong decisions, or does it just look dated? If dated: tolerate. If misleading: the response is graduation or replacement, depending on whether the document is authored (graduate) or derived (replace).

Example: A constraints README whose outline still lists "Lane Self-Containment" as a section header is format drift that communicates false governance — agents searching for lane-related constraints will find and follow instructions that were superseded by D0016. This is not a stylistic inconsistency. It's a broken signpost. Response: replace (it's an index).

-----

## Graduation Mechanics

Graduation is the most structured of the five responses. It applies only to authored governance documents where amending in place would produce forced coherence.

### The Frontmatter Convention

**On the superseded document (predecessor):**

```yaml
stability: superseded
superseded_by: "klappy://canon/methods/successor-document"
```

**On the successor document:**

```yaml
supersedes: "klappy://canon/methods/predecessor-document"
supersession_reason: "E0006 introduced operator governance; predecessor assumed system-only governance"
```

All other frontmatter on the predecessor remains unchanged. Epoch, tags, derivation chain, and content stay intact as historical record.

### Partial Supersession

Not all supersession is total. When a document is superseded in one section but authoritative in others, the document's stability remains `evolving` (not `superseded`) and the specific section is marked with an inline note:

```markdown
> ⚠️ **Superseded:** This section was superseded by [Successor Title](klappy://path/to/successor) as of E0006.
> The content below reflects understanding at E0005.
```

Full-document supersession uses frontmatter. Partial supersession uses inline markers. A document with `stability: superseded` is fully superseded.

### How oddkit Surfaces Graduated Documents

Implementation is layered. Each layer adds value independently.

**Layer 1 — Convention only (no code change).** The frontmatter convention is immediately useful. Agents using `oddkit get` will see `stability: superseded` and `superseded_by` in the frontmatter and can respect it. Works today.

**Layer 2 — Worker extraction (small code change).** Add `stability` and `superseded_by` to the frontmatter parser in the Cloudflare Worker. When `oddkit get` retrieves a superseded document, prepend: "⚠️ This document was superseded by [successor] as of [epoch]. The content below reflects understanding at [original epoch]."

**Layer 3 — Scoring adjustment (deferred).** Reduce superseded documents' relevance score by a factor (proposed: 0.3×). Deferred until Layer 1 + Layer 2 pain is proven insufficient. Per Use Only What Hurts.

-----

## Automation Paths

### Replace Automation

Derived documents (indexes, READMEs, navigational surfaces) can be audited by CI/CD. A pipeline that reads the current canon state and compares it against the derived document's content can flag or auto-fix stale references. The git commit is the audit trail.

### Regeneration Automation

Documents with `derived_from` frontmatter can be regenerated when source content changes. Content-hash keying (per anti-cache-lying) ensures the derived artifact is never staler than its source. Two mechanisms:

- **CI/CD trigger:** Source commit → hash comparison → regenerate if changed → commit derived artifact with new hash.
- **JIT agent regeneration:** Agent encounters stale derived artifact → recognizes derivation → regenerates from current source → serves fresh content. The stale artifact is updated or flagged for commit.

### Observation Automation

oddkit's drift audit can run on new document entry, comparing against existing documents for terminological, structural, and scope conflicts. Findings go to the ledger automatically. Human decides the response. This is the drift queue pattern (`writings/the-drift-queue.md`) operationalized.

-----

## The Supersession Record — OLDC for the Epistemic Ledger

Every graduation creates a record. This is not optional — it is the evidence that the system grew. Per the epistemic ledger model (`odd/ledger/epistemic-ledger.md`), the record follows OLDC structure:

**Observation:** What drifted? Name the specific tension. Classify the drift type and layer.

**Learning:** Why did understanding change? What epoch, incident, or experience produced the new understanding?

**Decision:** To graduate rather than tolerate, observe, replace, or regenerate. Why would amending in place produce forced coherence? Why is observation insufficient?

**Constraint:** What must the successor honor that the predecessor did not? What new invariant does the supersession introduce?

The compressed version lives in the successor's `supersession_reason` frontmatter field. The full OLDC record lives in the epistemic ledger. The frontmatter is the pointer; the ledger is the substance.

Replace and regenerate responses produce minimal records — the git commit for replacements, the derivation function and content hash for regenerations. Tolerate and observe responses produce ledger entries proportional to the significance of the drift.

-----

## Relationship to Existing Governance

**Drift value** (`canon/values/drift.md`) — Established drift as evidence of growth and defined amend/acknowledge/investigate. This method expands the response taxonomy to five responses (tolerate/observe/graduate/replace/regenerate) and adds the source-vs-derived document distinction. The drift value governs detection and classification; this method governs response.

**Weighted Relevance** (`canon/methods/weighted-relevance-and-arbitration.md`) — Declares supersession must be explicit. This method operationalizes that declaration with frontmatter fields and behavioral rules. Note: Weighted Relevance itself contains structural drift (Scope Similarity hierarchy references lanes, attempts, PRDs) and is a candidate for partial supersession.

**Anti-Cache Lying** (`odd/constraint/anti-cache-lying.md`) — Provides the content-addressed storage foundation for the regeneration response. A derived document with a TTL is a polite lie. A derived document with a content-hash key cannot be stale.

**Compiled Memory** (`docs/appendices/compiled-memory.md`) — The original "wipeable artifacts" model. Regeneration extends this concept from context packs to any derived document.

**Self-Audit** (`canon/methods/self-audit.md`) — Should include checking whether a deliverable supersedes existing documents, and if so, whether bidirectional pointers and OLDC records are in place.

**Writing Canon** (`canon/meta/writing-canon.md`) — Applies to successor documents. Superseded documents are not required to pass the current checklist retroactively — they are historical artifacts whose structure reflects their epoch's standards.

-----

## Failure Modes

### Silent Supersession

A new document covers the same ground as an existing one but nobody adds pointers. Both remain active. Agents get different answers depending on which they find first.

### Premature Graduation

A document is graduated before its successor is mature enough to govern. The governance gap confuses agents who can't rely on either version.

### Erasure Masquerading as Graduation

The old document is deleted or archived instead of graduated. The system loses historical evidence. This is forced coherence wearing a different label.

### Graduation Applied to Derived Documents

An index or README is graduated with full supersession ceremony instead of simply replaced. The ceremony produces no value — indexes have no provenance to preserve. This wastes effort and creates false historical significance.

### Replacement Applied to Authored Documents

A governance document with genuine historical provenance is updated in place without graduation. The system looks coherent but lost the record of how it arrived at its current state. This is forced coherence — the most common failure mode.

### Layer Confusion

All drift layers are treated as governance drift. Every format inconsistency triggers a formal supersession process. The system drowns in ceremony. The method becomes the overhead it was designed to prevent.

-----

## Constraints

- **Projections MUST NOT be stored as source.** Any document whose content is a deterministic function of other canonical sources (indexes, READMEs that list contents, outlines, navigational summaries, metadata aggregations) MUST be generated, not hardcoded. A committed projection is a cached derived artifact and violates Anti-Cache Lying (`odd/constraint/anti-cache-lying.md`). This is the highest-priority constraint in this document because it eliminates the most painful class of drift entirely.
- Superseded authored documents MUST remain in the corpus and search index. Removal is suppression, not graduation.
- Graduation MUST use explicit bidirectional frontmatter pointers. Implicit supersession — inferred from content similarity, recency, or scope — is prohibited per Weighted Relevance hard constraints.
- Authored documents MUST be graduated, not replaced. Derived documents MUST be replaced or regenerated, not graduated. Confusing these is the most common failure mode.
- Superseded documents are NOT required to pass the current Writing Canon checklist. They are historical artifacts.
- The `supersession_reason` field SHOULD be present on successor documents. Its absence degrades the evolution narrative.
- Format, style, and preference drift SHOULD be tolerated unless the format communicates false governance. The test: wrong decisions vs. dated appearance.
- Regeneratable documents MUST declare their sources in frontmatter (`derived_from: [source URIs]`) to enable automation and staleness detection.
- Every graduation MUST produce an OLDC ledger entry. Replace and regenerate produce minimal records (git commit, content hash).

-----

## The Test

If this method is working, the canon will show a living record of evolution: graduated documents with bidirectional pointers, replaced indexes that reflect current state, regenerated artifacts that are always fresh, and tolerated drift that sits acknowledged without triggering unnecessary ceremony. If every document appears current with no predecessors, the evolution is being hidden. If every minor inconsistency triggers a formal supersession process, the method has become the overhead it was designed to prevent. The balance is the signal.
