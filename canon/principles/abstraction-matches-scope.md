---
uri: klappy://canon/principles/abstraction-matches-scope
title: "Abstraction Matches Scope — A Document's Generality Must Equal Its Blast Radius"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "principle", "scope", "abstraction", "placement", "governance", "falsifiability", "portability"]
epoch: E0010
date: 2026-07-17
derives_from: "odd/decisions/D0001-three-tier-conceptual-hierarchy.md, canon/principles/scope-over-folders.md, docs/repo-bifurcation-and-target-repo-routing.md"
complements: "canon/principles/scope-over-folders.md, odd/decisions/D0001-three-tier-conceptual-hierarchy.md, canon/constraints/governance-change-discipline.md"
governs: "Where a governing document belongs on the abstraction ladder — universal canon versus repo- or stack-specific implementation — and when a mis-filed document must be relocated to the scope whose change would falsify it."
target_repo: "outcomes-driven-development"
status: proposed
---

# Abstraction Matches Scope — A Document's Generality Must Equal Its Blast Radius

> A governing document's level of abstraction must match the breadth of what it actually governs. Universal canon holds only what ripples everywhere when it changes — principles, constraints, and broad methods, stated abstractly. Anything whose truth depends on a single repository or a single technology stack is implementation detail and belongs with that implementation, however principled it sounds. The placement test is falsifiability: if a change confined to one repo or one stack would falsify a document, that document is repo-scoped, not universal. A universal document should be falsifiable only by something that genuinely reaches everything downstream. When a document filed as universal turns out to be one stack's implementation wearing a principle's clothes, it is mis-filed and moves down to that stack.

---

## Summary

Abstraction level and scope are the same axis viewed from two ends. A document's abstraction is how generally it is stated; its scope is how far its authority actually reaches. When the two diverge — a narrow rule stated as though it were universal, or a universal truth buried inside one stack's docs — the knowledge base lies about where authority lives. Readers inherit the wrong blast radius: they either over-apply a local rule or fail to find a rule that should have governed them.

This principle names the divergence and gives a mechanical test for placement. It does not invent the tiers — [D0001, the Three-Tier Conceptual Hierarchy](klappy://odd/decisions/D0001), already separates universal principles from program constraints from implementation detail, and gives a litmus for tier placement. This principle sharpens that litmus with a falsifiability lens and adds the corollary D0001 leaves implicit: a document discovered in the wrong tier is relocated, not left where it landed.

---

## What — the principle

Match a document's abstraction to its blast radius.

- If changing one repository or one technology stack would, by itself, make a document false or moot, the document's real scope is that repo or that stack. State it there, at that level of specificity.
- If a document can only be falsified by something that reaches every downstream consumer — a change to the shared method of working, not to any one implementation of it — its scope is universal. State it abstractly, in universal canon, stripped of the stack vocabulary that would falsely narrow it.
- The level of abstraction is not a stylistic choice. It is a claim about scope, and like every claim it can be wrong. A rule written abstractly asserts universal reach; if its reach is not universal, the abstraction is a false claim about scope.

Universal canon is therefore reserved for what genuinely ripples everywhere: principles, cross-cutting constraints, and broad methods. Repo- and stack-specific detail — however hard-won, however much it reads like doctrine — lives with the implementation it governs.

---

## Why — the failure it prevents

A knowledge base's tiers are load-bearing only if placement is honest. Two failures follow directly from placement drift:

- **A local rule stated universally** teaches every downstream reader to obey a constraint that only ever applied to one stack. When that stack changes, the rule is silently false everywhere it was over-applied, and nothing flags it, because it was filed above the layer whose change would have caught it.
- **A universal truth filed as implementation detail** hides from the readers it should govern. It is discoverable only by whoever happens to open that stack's docs, and it decays at the fast rate of implementation docs when it deserved the slow decay of a principle.

Both failures share one root: the abstraction level was set by how principled the writing *sounded*, not by how far the claim actually *reached*.

### Motivating case — the sandbox-hygiene constraint

The `sandbox-hygiene-per-flight-scratch` constraint is, as of this writing, filed in portable canon (`canon/constraints/`, `target_repo: outcomes-driven-development`) and stated at tier 1. Running the falsifiability test on it exposes a mixed scope. Its underlying law — *state residue is indistinguishable from signal, so a dirty sandbox invalidates the work drawn from it* — is universal; no single stack's change could falsify it. But the mechanism it prescribes — per-flight, uniquely-named, self-owned scratch directories and the prohibition on fixed shared temp names like `/tmp/pr_body.md` — is a property of one execution substrate. A change confined to that substrate (a different isolation model, or a sandbox that guarantees clean per-session scratch by construction) would moot the mechanism while leaving the law untouched.

That is precisely the mixed-scope split this principle calls for: the universal law stays in universal canon; the substrate-specific mechanism belongs with the stack that implements it. The operator has ruled that the implementation detail move down to the agent-role-service stack. The constraint's content does not change; only the honesty of its placement does. (At the time this principle was drafted, that relocation is a directed decision, not yet reflected in the repository — the constraint still sits whole in portable canon on its own branch. This principle is the rule that decision instantiates, and the split above is how the test says to carry it out.)

---

## How it is applied and verified — the falsifiability placement test

Placement is decided by one question, asked of the document, not of the author's intent:

> **Imagine a change confined to a single repository or a single technology stack. Could that change alone make this document false, moot, or inapplicable?**
>
> - **Yes** → the document is repo- or stack-scoped. It belongs with that implementation, stated at that level of specificity.
> - **No — the only things that could falsify it reach every downstream consumer** → the document is universal. It belongs in universal canon, stated abstractly.

The test is falsifiability because falsifiability tracks scope precisely: a claim's scope *is* the set of worlds that would refute it. A universal claim is refuted only by universal change. If a local change refutes it, its scope was local all along, whatever tier it was filed in.

This document must pass its own test, and does: no change confined to one repository or one stack would falsify "abstraction must match scope." Only a change to the shared discipline of how a multi-scope knowledge base assigns authority could — which is exactly what "reaches everything downstream" means. The principle is therefore correctly stated abstractly, in universal canon.

### The relocation corollary

When the test reveals a document is filed above its true scope, the response is relocation, not annotation. Move the document down to the scope whose change would falsify it. Placement is corrected at the structural level — where the document lives and at what abstraction it is stated — not patched with a caveat that says "this is actually only about X." A caveat leaves the false scope claim standing; relocation retracts it.

Relocation is a governance change and carries the same discipline as any other: it is proposed, reviewed, and — where it shifts what downstream consumers must obey — tracked under [Governance Change Discipline](klappy://canon/constraints/governance-change-discipline).

---

## What counts / what does not

**Satisfying this principle:**

- A stack-specific constraint lives in that stack's docs and reads as specific to it.
- A universal principle is stated without stack vocabulary, so no reader mistakes its reach.
- When a document's real scope is discovered to differ from its filed scope, it is moved to match.

**Violating this principle:**

- A rule that only one stack's behavior could falsify is filed in universal canon.
- A truth that governs all downstream work is buried in one implementation's docs.
- Abstraction level is chosen for tone or gravitas rather than as an honest claim about reach.
- A mis-file is discovered and papered over with a scoping caveat instead of relocated.

---

## Relationship to existing canon

This principle sits among three neighbors and is distinct from each:

- **[D0001 — Three-Tier Conceptual Hierarchy](klappy://odd/decisions/D0001)** establishes the tiers (universal principles / program constraints / implementation detail), their differing decay rates, and a placement litmus built on *temporal reach and breadth* ("would this be true in ten years?" / "should all products obey it?"). This principle is the sharper instrument for the same decision: it replaces "would this be true in ten years" with "what change would falsify this," which is decidable now without forecasting, and it makes explicit the relocation corollary D0001 implies but does not state.
- **[Scope Over Folders](klappy://canon/principles/scope-over-folders)** governs a different axis: it says storage *location* is not authoritative — scope is a declared attribute of a claim, never inferred from a file's path. That principle forbids reading meaning *out of* location. This principle governs the complementary question: given that scope is a real attribute of a claim, what *level of abstraction* must the claim be stated at, and what happens when abstraction and scope diverge. Scope-over-folders keeps you from faking scope with folders; abstraction-matches-scope keeps you from faking scope with generality.
- **[Repo Bifurcation and target_repo Routing](klappy://docs/repo-bifurcation-and-target-repo-routing)** is this principle applied to one concrete extraction: its "domain-applicability test" (portable only if it works for any AI-assisted work, not only software) is the falsifiability test wearing the klappy.dev→outcomes-driven-development clothes. That doc is the stack-specific instance; this is the universal principle it instantiates — which is itself an example of the placement this principle demands.

---

## Limits, prior art, and where the test needs care

- **Prior art.** The instinct is old: separation of concerns, the single-responsibility principle, DRY's "one authoritative source," and the rule of least power all press content toward the layer that owns it. This principle earns its own name because it targets a decision those do not make crisply — where a *governing document* sits on the *abstraction ladder* — and supplies a decidable test (falsifiability) rather than a taste ("keep concerns separate"). It is the placement rule for a knowledge base, not a code-organization heuristic.
- **Mixed-scope documents.** A document can be falsifiable by both a confined change and a universal one because it fuses two claims. The confined-falsifiability half dominates the placement decision: split the document, send the universal claim up and the stack-specific claim down. A document that resists clean splitting is itself the smell — two claims at two scopes have been welded into one.
- **Claims, not pure values.** The falsifiability test governs documents that assert something about the world — principles, constraints, methods — which is nearly all governing content. Pure values and commitments (aphorisms that cannot be false, only kept or abandoned) are not placed by falsifiability; for those, fall back to D0001's breadth litmus. The two tests agree wherever both apply.
- **Confidence and retraction.** This principle is offered as an operator-ruled working invariant, not a proven theorem. Its disconfirmer is explicit: it is retracted if a class of documents proves to hold genuinely universal authority *while* being falsifiable by a single stack's change — that is, if scope and the falsifiability-set are shown to come apart in practice. Until such a case is observed, placement follows the test.

---

## Required response when violated

When a document's filed abstraction does not match its real scope:

1. Run the falsifiability test to determine the document's true scope.
2. Relocate the document to that scope, restating it at the matching level of abstraction — down to the stack if a confined change would falsify it, up to universal canon if only universal change could.
3. Record the move as a governance change; if it alters what downstream consumers must obey, track it under Governance Change Discipline.
4. Leave no scoping caveat in place of the move. A caveat preserves the false scope claim; relocation retracts it.

---

## One-liner

If one repo's change can prove it wrong, it was never universal — no matter how principled it sounds, or which folder it sits in.
