---
uri: klappy://canon/values/drift
title: "Drift — Evidence of a System That's Still Learning"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["canon", "values", "drift", "learning", "coherence", "growth", "audit"]
epoch: E0005
date: 2026-02-15
derives_from: "canon/values/axioms.md"
complements: "canon/methods/weighted-relevance-and-arbitration.md, canon/methods/self-audit.md, odd/ledger/epistemic-ledger.md"
constraint: "Drift is expected in any living system. Its presence must never be treated as failure."
---

# Drift — Evidence of a System That's Still Learning

> Drift is the natural tension between what was written and what is now understood. Its presence is proof of a growing system. Its absence is the warning sign — it means the system stopped learning. This document hangs from the value of Always Learning — drift is the observable evidence that the value is real. A drift audit surfaces tensions between existing documents and new understanding, then for each tension decides: amend, acknowledge, or investigate. Drift is not a bug to eliminate. It is evidence of growth to manage deliberately. Forcing premature resolution produces false coherence. Leaving it unmanaged produces confusion. The method is the middle path — surface it, name it, decide what to do with it.

-----

## Summary — If Nothing Drifted, Nothing Was Learned

Every system that learns will produce drift. A decision made six months ago reflected what was understood six months ago. New experience, new evidence, new failures — these change understanding. The old document didn't become wrong. The system grew past it.

This is true of canon documents, codebases, organizational policies, relationships, theology, and understanding itself. Drift is a property of any living system. A system with no drift has achieved either perfection or stagnation, and it's almost never perfection.

The drift audit is not a cleanup task. It is a health check. When new documents are written, they may create tension with existing ones. That tension is information. It tells you where the system's understanding has shifted, where old assumptions no longer hold, and where language that once meant one thing now means something different.

The response to drift is not always amendment. Sometimes the old document needs updating. Sometimes the tension needs to be acknowledged and left standing — the system hasn't resolved it yet and forcing resolution would produce false coherence. Sometimes the drift reveals something that needs investigation — a deeper question the system hasn't answered. Amend, acknowledge, or investigate. Those are the three responses.

-----

## What Drift Looks Like

**Terminological drift** — a term used one way in an early document now means something different in practice. The word didn't change. The understanding did.

**Structural drift** — a document assumes a system architecture that has since evolved. The document's claims are internally consistent but no longer match reality.

**Emphasis drift** — an early document treats something as secondary that later experience revealed as foundational. The trust principle existed implicitly in the axioms but was only articulated as the kernel days later — in a system evolving this fast, drift happens in hours and days, not months.

**Scope drift** — a document was written for one context but is now being applied more broadly than intended. Or more narrowly than it should be.

**Value drift** — the rarest and most important. A principle that was once held has been superseded by deeper understanding. This requires the most careful handling — not quiet replacement, but explicit acknowledgment of what changed and why.

-----

## The Drift Audit

When a new document enters the system, the drift audit asks:

**What existing documents does this create tension with?** Not just documents it references — documents whose claims, terminology, structure, or emphasis are now in tension with the new understanding.

**For each tension, what is the appropriate response?**

*Amend* — the old document should be updated to reflect current understanding. The drift is resolved. Use this when the old document is simply out of date and the new understanding is clearly stronger.

*Acknowledge* — the tension is real but resolution is premature. Document the drift as a ledger observation — which by its nature names the conflict and the documents in tension — and let it sit. Watch the pain of confusion surface in practice before preoptimizing. Sometimes the drift resolves itself as understanding matures. Sometimes the confusion never surfaces because the tension doesn't matter in practice. Sometimes the pain arrives quickly and loudly, telling you exactly when and how to act. This is "Use Only What Hurts" applied to drift — don't fix the tension until the tension hurts.

*Investigate* — the drift reveals something the system doesn't understand yet. The tension isn't between an old view and a new view — it's between two views that are both partially right. Use this when forcing either direction would lose something important.

**Is the absence of drift itself a signal?** If a new document enters and creates no tension anywhere, ask whether the document is genuinely novel or whether it's restating what already exists. Zero drift on a new document is not automatically a good sign.

-----

## Drift and the Ledger

Drift audit results are ledger entries. When drift is surfaced, the observation goes into the ledger — what documents are in tension, what the nature of the tension is, and what response was chosen. This makes drift visible and trackable over time.

Patterns in drift tell the system where it's growing. If the same area keeps producing drift, that's where understanding is actively evolving. If an area produces no drift for a long period, it's either stable or stale — and the distinction matters.

-----

## Drift and Weighted Relevance

When drift produces competing truths between documents, resolution follows the Weighted Relevance & Arbitration method (`canon/methods/weighted-relevance-and-arbitration.md`). Newer understanding doesn't automatically win. Relevance, scope, and evidence weight determine which truth governs in which context. Drift surfaces the tension. Arbitration resolves it — or deliberately declines to.

-----

## Failure Modes — What Happens When Drift Is Mismanaged

### Hidden Drift

Tensions exist but nobody surfaces them. Documents quietly contradict each other. Agents get different answers depending on which document they encounter first. The system appears coherent but isn't — and trust erodes without anyone understanding why. This is the most common failure mode because it requires no action to produce. Drift hides by default. Surfacing it requires deliberate effort.

### Forced Coherence

Every tension gets resolved immediately, always in favor of the newest understanding. Old documents get rewritten to match current thinking. The system loses the record of how it arrived at its current state. Nuance dies — earlier reasoning that was partially right gets overwritten instead of held in tension. The canon looks clean but has lost its history. This failure mode feels productive because things are getting "fixed," but the system is actually losing information.

### Drift Paralysis

Every tension gets flagged but nothing ever gets resolved. The acknowledge pile grows indefinitely. Documents are in documented tension with each other but nobody decides whether to amend, investigate, or let the tension stand. The system drowns in observed conflicts that produce no action. This failure mode feels responsible because tensions are being tracked, but tracking without response is just organized confusion.

### The Pattern Across All Three

Each failure mode is a breakdown in the amend-acknowledge-investigate cycle. Hidden drift skips surfacing entirely. Forced coherence skips acknowledge and investigate — everything becomes amend. Drift paralysis skips amend and investigate — everything becomes acknowledge. A healthy system uses all three responses in proportion to what each tension actually demands.

-----

## Drift by Design — A Deliberate Choice, Not a Universal Rule

Drift isn't just something that happens to a system. It can be embraced intentionally — but the choice to ship early and iterate versus wait and get it right is a deliberate tradeoff, not a default.

For some work, research and patience are exactly right. Some decisions require prayer, fasting, waiting on wisdom. Rushing those produces worse outcomes than waiting. The cost of getting it wrong exceeds the cost of delay.

For other work, the fastest path is to use the best language you have now, ship it, and let the confusion surface through use. The phrasing will evolve. The terms will sharpen. It's better to iterate through contact with reality than to halt for days or weeks building consensus on terminology before anything exists.

The danger is in the extremes. Too much research and too many approval gates turn a startup into an institution. Too little deliberation and you ship confusion that erodes trust. The choice between these is context-dependent and must be made deliberately, mitigating the risks between drastic tradeoffs.

This system was built closer to the ship-early end. The axioms were established one week. The trust principle was articulated days later. Terms that felt right in one conversation were refined in the next. The entire canon is a product of intentional drift — each version better than the last because it was tested against reality, not perfected in isolation. That was a deliberate choice for this context, not a prescription for all contexts.

The signal you're watching for: if confusion surfaces and causes real pain, iterate. If it doesn't surface, the imprecision didn't matter. Either way, you learn more from shipping than from waiting.

-----

## Constraints — What Drift Requires

Drift is expected in any living system. Its presence must never be treated as failure.

Drift must be surfaced, not hidden. Documenting drift inherently declares tension with existing work — the ledger entry names the conflict by its very nature. An undocumented tension is a liability. A documented tension is information, even if no action is taken.

Forced resolution of all drift produces false coherence. Some tensions must be held open until the system is ready to resolve them.

The absence of drift is itself a signal that warrants investigation.

Drift audits should be triggered when new documents enter the system, not run on arbitrary schedules.

-----

## The Test

If this method is working, the canon will contain documented tensions between documents — explicit acknowledgments of where understanding has shifted and where resolution is still pending. If the canon appears perfectly coherent with no acknowledged drift, either the system stopped growing or the drift is being hidden. Neither is acceptable.
