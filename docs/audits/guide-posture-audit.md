---
uri: klappy://docs/audits/guide-posture-audit
title: "Guide Posture Audit — Public-Facing Documents on the Homepage"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: evolving
tags: ["audit", "guide-posture", "public", "homepage", "positioning"]
epoch: E0005
date: 2026-02-17
derives_from: "canon/constraints/guide-posture.md"
complements: "docs/oddkit/IMPL-guide-posture-gate.md"
---

# Guide Posture Audit — Public-Facing Documents on the Homepage

> The homepage surfaces documents through `start_here` markers and `exposure: nav` metadata. Many of these are structurally internal documents (audience: canon, docs, odd) that happen to be publicly visible. This audit classifies each by guide posture compliance and recommends one of three actions: pass (already guide-posture compliant), reframe (public-audience doc that leads with system instead of pain), or guide-layer (internal doc that needs a public-facing guide version to sit in front of it). Internal docs should not be rewritten — they should stay rigorous and system-voiced. The public layer enters the user's story and hands them off to the depth when they're ready.

-----

## Summary — Two Problems, Two Solutions

The homepage currently mixes two kinds of documents: public-audience content written for external readers, and internal-audience content exposed publicly through navigation metadata. Guide posture doesn't require rewriting internal docs to be user-friendly. It requires that the *entry point* a user encounters follows guide posture — opening with their pain and revealing the system as a plan. Internal docs are the depth behind that entry point.

This means two different remediation patterns. Public-audience docs that break guide posture need reframing in place — they're already meant for external readers but lead with the system. Internal-audience docs that are publicly visible need a new public-facing guide document placed in front of them — a document that empathizes with a problem and guides users to the existing internal doc when they're ready to go deeper.

-----

## Audit Results — start_here Documents

These are the documents marked `start_here: true`, ordered by `start_here_order`. They form the homepage reading path.

### Order 1: "The Most Expensive Problem" — writings/

**Audience:** public | **Posture: PASS**

Opens with the creed ("Before I speak, I observe…") which is a statement of values, not a system pitch. The title names a problem the user recognizes. This is guide posture — it leads with pain (knowledge transfer is expensive) and positions the system as a response.

No action needed.

### Order 2: "From Bible Translation to Epistemic OS" — writings/

**Audience:** public | **Posture: REFRAME CANDIDATE**

Title leads with *our* origin story, not the user's problem. "From Bible Translation to Epistemic OS" is hero framing — it centers where *we* came from. A guide-posture version might lead with "Why your AI keeps forgetting what you told it" and reveal the Bible translation connection as the surprising source of the solution.

Recommendation: Reframe title and opening to lead with user pain. The origin story content is valuable but should be positioned as "here's why we understand your problem" not "here's our history."

### Order 2: "The Parallel Architecture" — writings/

**Audience:** public | **Posture: REFRAME CANDIDATE**

Title names an internal concept ("parallel architecture") that means nothing to someone who hasn't already bought in. Opens without a blockquote, which is also a Writing Canon issue.

Recommendation: Reframe with a user-facing title that names the insight in terms of their experience. Something like "Why the Same Principles That Make Bible Translation Work Also Fix AI Collaboration" — the parallel is the hook, but it needs to be a hook the user recognizes.

### Order 3: "Shared Values as a Trust Proxy" — canon/values/

**Audience:** canon | **Posture: GUIDE-LAYER NEEDED**

This is a canon-grade internal doc. Its blockquote opens with "Trust between agents, humans, and mixed teams cannot be assumed" — which is actually close to guide posture (it names a problem). But it's written for system operators and canon readers, not for someone arriving at the homepage.

Recommendation: Create a public guide document that opens with the user's experience of trust breakdown in AI collaboration and guides them to this canon doc when they want the rigorous treatment. Title candidate: "Why Your AI Team Keeps Breaking Trust — And How Shared Values Fix It."

### Order 4: "How the System Works" — docs/architecture/

**Audience:** docs | **Posture: GUIDE-LAYER NEEDED**

Title is pure hero posture — "How the System Works" assumes the user already cares about the system. Blockquote opens with "The system operates as four separable layers" which is architecture documentation, not empathy.

Recommendation: This should not be a homepage entry point without a guide layer. Create a public doc that opens with "You keep losing context between AI sessions — here's why, and here's the architecture that prevents it." Link through to the layers doc for depth.

### Order 5: "Cognitive Saturation Threshold" — odd/appendices/

**Audience:** odd | **Posture: GUIDE-LAYER NEEDED**

Title names an internal concept. Blockquote opens with "In collaborative work — particularly product meetings — there is a point where verbal exchange stops producing knowledge" — which is actually empathetic and pain-adjacent. But the doc is written for ODD practitioners, not public readers.

Recommendation: This concept has strong guide-posture potential because it names a universal experience (meetings where words stop working). A public guide version could open with that pain directly: "You know that moment in a meeting where everyone's talking but nothing's landing? There's a name for that." Guide to the ODD appendix for the full treatment.

### Order 6: "Claude's Testimony" — docs/evidence/

**Audience:** docs | **Posture: GUIDE-LAYER NEEDED**

Title leads with the system's experience, not the user's. "A Day the System Proved Itself" is hero posture — the system is the protagonist.

Recommendation: A public guide version might frame this as a case study from the user's perspective: "What happens when you stop babysitting your AI and let epistemic discipline do the work — a real day, five documents, zero hallucinations." The testimony becomes evidence the guide offers, not a system bragging about itself.

### Order 8: "The Project Journal" — writings/

**Audience:** public | **Posture: PASS**

Title and subtitle ("Your AI Collaboration's Memory") are user-facing. Blockquote opens with "Every project generates knowledge. Most of it evaporates between sessions." This is guide posture — names the user's pain, then reveals the project journal as the plan.

No action needed.

### Order 8: "oddkit — A Protocol, Not a Platform" — docs/oddkit/

**Audience:** public | **Posture: REFRAME CANDIDATE**

Title leads with the system name and a positioning claim. Blockquote opens with "oddkit is not a platform to adopt. It is a protocol…" — this is system-first language. The content is excellent but the entry point is hero posture.

Recommendation: Reframe the public-facing version to lead with the user's pain. "You shouldn't have to switch tools to think clearly. oddkit adds epistemic discipline to whatever you're already using." The "protocol not platform" insight is the plan revealed, not the opening.

### Order 9: "The Epistemic OS — The Frame" — canon/

**Audience:** canon | **Posture: GUIDE-LAYER NEEDED**

Title names an internal concept. Blockquote opens with "The Epistemic OS is infrastructure for managing expectations in AI-human collaboration" — system-first.

Recommendation: Create a public guide doc. Open with the user's experience: "Every time you start a new AI session, you lose everything from the last one. The Epistemic OS is why that doesn't have to happen." Guide to the Frame doc for the architecture.

### Order 10: "Trust Is Built by Managing Expectations" — canon/values/

**Audience:** canon | **Posture: GUIDE-LAYER NEEDED**

Title is actually pain-adjacent — it names a principle the user can recognize. But it's a canon values doc written for system internals. The blockquote is excellent and empathetic.

Recommendation: This one is close. A thin public guide layer could open with "You've felt it — the moment an AI confidently tells you something wrong and you realize you can't trust it. Every trust failure is an expectations failure." Link to the trust kernel for the full treatment.

### Order 10: "What is ODD?" — odd/README.md

**Audience:** public | **Posture: REFRAME CANDIDATE**

Title asks a question about the system, not about the user's problem. Blockquote: "ODD is about preserving intent without freezing execution" — this is pithy but system-first.

Recommendation: Reframe to lead with the user's experience. "You know what you want your AI to help you build. But somewhere between session one and session five, the intent gets lost." Then reveal ODD as the system that preserves it.

### Order 11: "Foundational Axioms" — canon/values/

**Audience:** canon | **Posture: GUIDE-LAYER NEEDED**

Pure internal doc. Excellent content but written for canon consumption.

Recommendation: A public guide version could open with: "Four questions that change how you work with AI: Did you observe it? Can you prove it? Did you skip a step? Did you actually check?" Guide to the axioms doc for the rigorous treatment.

### Order 12: "The Manifesto" — odd/

**Audience:** canon | **Posture: GUIDE-LAYER NEEDED**

Blockquote opens with "A governance framework for human-AI collaboration" — system-first.

Recommendation: Guide layer needed. The manifesto is for practitioners who've already bought in. The public entry point should be about the user's frustration, not a governance framework.

-----

## Audit Results — Other Public-Facing Documents

### about/home.md

**Audience:** public | **Posture: AUDIT NEEDED**

No blockquote. This is the literal homepage. Highest priority for guide posture compliance — this is the first thing a user sees.

Recommendation: Must open with user pain. This is the #1 candidate for guide-posture reframing.

### about/why-this-exists.md

**Audience:** public | **Posture: REFRAME CANDIDATE**

Blockquote opens with "If the repository is dirty, conclusions drawn from it are invalid" — this is an internal-facing statement about repo hygiene. Not guide posture.

Recommendation: Reframe to open with the user's version of this problem: "You've wasted hours on AI work that turned out to be based on wrong assumptions. Here's why that keeps happening."

### about/faq.md, about/bio.md, about/credibility.md, about/README.md

**Audience:** public | **Posture: LIKELY OK**

These are standard about-section documents. Guide posture is less critical here — users navigating to "About" have already chosen to learn about us. Quick audit for opening language but lower priority.

-----

## Priority Ranking

### Immediate (highest user impact)

1. **about/home.md** — literal first impression, no blockquote, needs full guide-posture treatment
1. **odd/README.md** ("What is ODD?") — primary explainer, currently system-first
1. **docs/oddkit/positioning.md** — public-audience but system-first opening

### High (start_here documents users encounter early)

1. **writings/from-bible-translation-to-epistemic-os.md** — origin story in hero posture
1. **writings/the-parallel-architecture.md** — internal concept as title, no blockquote
1. **about/why-this-exists.md** — repo-hygiene framing instead of user pain

### Medium (internal docs needing guide layers)

1. **docs/architecture/epistemic-os-layers.md** — "How the System Works" as homepage entry
1. **canon/the-frame.md** — system-first framing
1. **docs/evidence/testimony-2026-02-13.md** — system-as-hero case study
1. **odd/appendices/cognitive-saturation-threshold.md** — high guide-posture potential, universal pain

### Lower (canon docs — guide layers are valuable but less urgent)

1. **canon/values/trust-kernel.md** — already close to guide posture
1. **canon/values/shared-values-as-trust-proxy.md** — close to guide posture
1. **canon/values/axioms.md** — needs guide layer for public entry
1. **odd/manifesto.md** — practitioner doc, guide layer for public entry

-----

## Action Types Summary

**PASS (2):** The Most Expensive Problem, The Project Journal — already guide-posture compliant.

**REFRAME (5):** From Bible Translation, The Parallel Architecture, oddkit Positioning, What is ODD?, Why This Exists — public-audience docs that need their opening reframed to lead with user pain.

**GUIDE-LAYER (7):** Shared Values, Epistemic OS Layers, Cognitive Saturation, Claude's Testimony, The Frame, Axioms, Manifesto — internal docs that need a new public-facing guide document placed in front of them.

**FULL TREATMENT (1):** home.md — the homepage itself, highest priority.

-----

## Constraint — Internal Docs Stay Internal-Voiced

This audit does not recommend rewriting any canon, odd, or docs-audience documents. Those documents serve their audience correctly. The recommendation is to create a public empathy layer that guides users *into* the existing depth, not to flatten the depth into marketing copy. The canon stays rigorous. The guide layer enters the user's story.
