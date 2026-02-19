---
uri: klappy://writings/self-ese-and-the-stacking-test
title: "When Your AI Audits Its Own Work — And What the Speed Reveals"
subtitle: "A method for catching the gap between what you planned and what your AI actually produced — and why stacking speed is a diagnostic, not luck"
author: "Klappy"
type: essay
public: true
audience: public
exposure: nav
tier: 2
voice: conversational
stability: evolving
tags:
  - writings
  - essay
  - ese
  - self-audit
  - stacking
  - architecture
  - verification
  - bias-disclosure
  - progressive-disclosure
  - methods
epoch: E0005
date: 2026-02-19

# Discovery

hook: "AI built something. Did it build what you asked? Most checklists miss the gap. Self-ESE doesn't."
description: "Before evaluating AI output against your plan, have the AI describe what it actually produced. The delta between what it sees and what was asked for is the honest assessment that checklists skip — and how fast new capabilities absorb into your system reveals how sound your foundation actually is."
slug: self-ese-and-the-stacking-test

# Social graph

og_title: "When Your AI Audits Its Own Work — And What the Speed Reveals"
og_description: "Before evaluating AI output against your plan, have the AI describe what it actually produced. The delta between what it sees and what was asked for is the honest assessment that checklists skip."

# Relationships

derives_from: "canon/methods/epistemic-surface-extraction.md, canon/values/axioms.md, canon/constraints/guide-posture.md"
complements: "canon/methods/self-audit.md, canon/constraints/definition-of-done.md, canon/methods/using-ease-and-resistance-as-signals.md, docs/oddkit/positioning.md"
---

# When Your AI Audits Its Own Work — And What the Speed Reveals

> You asked AI to build something. It built it. But now you're staring at the output wondering: did it actually do what I asked, or did it do what was easiest? Most people eyeball it, check a few boxes, and move on. There's a better way — have the AI describe what it actually produced, compare that against what you originally specified, and name the gaps itself. This is Epistemic Surface Extraction applied as self-audit. And when you discover that adding this capability takes thirty minutes instead of three weeks, that speed isn't luck. It's a diagnostic. How fast new capabilities absorb into your system reveals how sound your foundation actually is.

-----

## Summary — The Checklist Lies, the Surface Doesn't

Everyone who works with AI hits the same wall. You give it a spec. It produces something. You compare the output against a checklist. The boxes get checked. Ship it.

Except the checklist was written before the output existed. It describes what you planned to produce, not what was actually produced. The checklist asks "did you do the thing?" but never asks "what is the thing you actually did?" Those are fundamentally different questions — and the gap between them is where most AI-assisted work silently fails.

The fix is disarmingly simple: before evaluating the output against your plan, have the AI describe what it actually sees in its own output. Not what it intended. Not what the spec says. What is literally there, right now, on the screen. Then compare that description against the original specifications. The delta between "what I see" and "what was asked for" is the honest assessment that checklists skip.

This is what Epistemic Surface Extraction looks like when turned inward. And the fact that building this self-audit loop took thirty minutes — not the weeks it would have taken a year ago — tells you something important about what happens when you get the foundation right.

-----

## The Wall — Your AI Built Something and You Can't Tell If It's Right

Here's the frustration. You've spent an hour refining requirements. You've described your UI, your workflow, your user. The AI produces mock-ups. They look reasonable. Professional, even.

But something nags at you. Did it actually include the filtering behavior you described in the third meeting? Is the navigation structure reflecting what the team agreed on, or what the AI inferred from partial context? You scroll through, spot-checking. Some things match. Some things you're not sure about. You don't have time to compare every element against every line of every meeting note.

So you do what everyone does: you check the obvious things, assume the rest is fine, and move forward.

This is the plan-versus-reality gap, and it's not a new problem. Software teams have dealt with it forever — the spec says one thing, the build does another, and nobody catches the drift until a user complains. What's new is that AI makes it possible to produce outputs so fast that the verification can't keep up. The bottleneck has shifted from "can we build it" to "can we tell if what we built is what we meant."

-----

## The Insight — Stop Checking Against the Plan, Start Describing the Output

The breakthrough came from a simple question: what if, instead of comparing the output to the plan, we first had the AI describe what it actually produced?

Not summarize. Not evaluate. Describe. What is literally on this screen? What elements are present? What interactions are implied? What's the information hierarchy? What's missing compared to common patterns?

This is the core of Epistemic Surface Extraction — a method originally designed to make non-text evidence (screenshots, recordings, PDFs) legible to AI agents. ESE doesn't ask "is this good?" It asks "what is this?" The evaluation comes after, but only after the surface has been honestly described.

When you point this method inward — when the same AI that produced the output now describes what it produced — something interesting happens. The description becomes a mirror. And mirrors show things that checklists don't.

-----

## The Story — How Dreaming Out Loud Became a Real Method

I was working on mock-ups for a product called Fluent. The team had weeks of meeting notes, design documents, and evolving requirements scattered across Google Drive. I'd uploaded everything into a Claude project and had it generate mock-ups based on the accumulated specifications.

The mock-ups looked good. But I'd been through enough cycles to know that "looks good" is the most expensive phrase in product development. So I tried something I'd only been thinking about abstractly.

I asked Claude to perform an Epistemic Surface Extraction on its own mock-ups.

Now, Claude didn't know what that meant — I'd coined the term. But because my knowledge base was connected through an MCP server, Claude searched for the definition, found the method documentation, and learned what an ESE requires: you need a subject (the mock-ups), and you need a set of lenses — a frame through which to observe and describe what you see.

Here's what I didn't ask for: Claude independently decided to use a previous designer's Figma mock-ups as the comparative lens. It found Leo's earlier work in the project documentation and chose to contrast the new mock-ups against the old ones, using the original specifications as the rubric.

The result was an honest inventory. Here's what the new mock-ups contain. Here's what they don't. Here's where they diverge from what Leo produced. Here's where they diverge from the specifications. Here's what the specifications themselves left ambiguous.

And then Claude added a line I'd forgotten I'd ever taught it:

*Bias disclosure: this is a self-ESE. The same agent that built the mock-ups is evaluating them. That is an epistemic limitation worth naming.*

That line stopped me cold. A month earlier, I'd written about how AI has a bias when evaluating its own work — it tends to find what it was looking for, not what's actually there. I'd encoded that observation into my knowledge base as a principle. And now, without being asked, the system applied that principle to its own output and flagged the limitation.

The checklist would have said "mock-ups complete." The self-ESE said "mock-ups complete, with these gaps, these ambiguities, and by the way, I'm the one who built these, so take my assessment with that grain of salt."

That's the difference between verifying against a plan and verifying against reality.

-----

## The Approach — How Anyone Can Do This Without Special Tooling

You don't need an MCP server or a knowledge base to apply this pattern. The core move is three steps that work in any AI conversation:

First, produce the output — whatever it is. A document, a mock-up, a plan, a piece of code.

Second, before evaluating it, ask the AI to describe what it actually produced. Not what it intended. Not what you asked for. What is literally there. Prompt it to be specific: what elements are present, what's the structure, what information is conveyed, what's implied, what's absent. If it's visual, have it narrate what it sees. If it's text, have it characterize the argument structure, not just the topic.

Third, now compare that description against your original requirements. The AI has given you an honest inventory. You can see the delta without having to hold the entire spec in your head while visually scanning the output.

The key insight is the sequencing. Most people go straight from output to evaluation: "did it do what I asked?" That question invites confirmation bias — both yours and the AI's. By inserting a description step, you create a mirror that reflects reality before judgment enters.

If you want to go further, ask the AI to name its own limitations in the assessment. Did it produce the thing it's now evaluating? If so, that's a conflict of interest worth acknowledging. Is it evaluating a visual artifact through text description? That's a lossy translation worth noting. The more honest the disclosure, the more useful the assessment.

-----

## The Automation — How oddkit Makes This Structural

The manual version works. But it depends on you remembering to do it every time, which means it won't happen when you're tired, rushed, or confident.

This is where the knowledge base earns its keep. In my system, the ESE method is documented as a canon method — a durable, searchable artifact that any AI session can retrieve on demand. When I say "let's do an ESE," the AI doesn't need me to explain the process. It searches the knowledge base, finds the method definition, and applies the full protocol: describe the surface, select appropriate lenses, compare against specifications, and disclose biases.

But the real power isn't the automation of the ESE itself. It's that the principles underlying the ESE — like "AI is biased when evaluating its own work" — are also encoded in the knowledge base. The system doesn't just follow the method. It applies the constraints that govern the method. The bias disclosure wasn't a feature I built. It was a consequence of a principle I'd written about in a different context, which the system found relevant and applied.

This is what happens when your documentation isn't just notes — it's a living knowledge base that AI agents can search, cross-reference, and apply. The principles inform the methods. The methods invoke the principles. And the whole thing compounds because each new insight gets encoded and becomes available to every future session.

The dreaming-out-loud moment — "what if the AI could audit its own mock-ups?" — took one conversation to articulate. The system encoded it, challenged it against existing principles, found the connection to bias disclosure, and produced a working method. Not because the system is magic, but because the foundation was already there. The new idea had something solid to land on.

-----

## The Stacking Test — Speed of Absorption Reveals Architectural Health

Here's what makes this story worth telling beyond the ESE itself.

After the self-ESE worked, I realized I wanted voice-synthesized podcasts for my articles — so people could listen instead of read. Using the same knowledge base, the same principles, the same tool infrastructure, I added voice podcast generation in thirty minutes. That includes training a voice model.

An hour after that, I made the podcasts conversational — an interactive voice agent that could discuss the articles, not just read them.

A year ago, each of those features would have been a multi-week project. Design the architecture, build the integration, test the edge cases, document the behavior. Now it's a conversation that takes less time than a meeting.

This speed isn't about the AI being faster. It's about the foundation being ready.

Think of it like building on bedrock versus building on sand. On sand, every new structure requires its own foundation. On bedrock, you bolt things down and they hold. The speed at which new capabilities absorb into your system — without breaking existing ones, without requiring redesign, without creating inconsistencies — is a direct measurement of how sound your architecture is.

I call this the stacking test. If adding a new capability takes weeks and introduces regressions, your foundation has gaps. If it takes minutes and the new capability immediately inherits the constraints, principles, and cross-references of everything that came before it, your foundation is doing its job.

A caveat worth naming: ease signals alignment, not correctness. A capability that stacks fast could still be wrong — it just means the architecture didn't resist it. Resistance is often a classification error, not a lack of insight. But ease is not validation. The stacking test tells you your foundation can absorb new capabilities. It doesn't tell you the capabilities are right. That's what the self-ESE is for. The two work together: stacking speed measures architectural health, self-audit measures output integrity. You need both.

The self-ESE stacked in an hour. Voice podcasts stacked in thirty minutes. Conversational AI stacked in another hour. SHA-based drift detection — where the system automatically flags when upstream content changes and derivative outputs need re-evaluation — stacked in a single conversation.

Each capability stacked fast because it didn't need its own foundation. The principles were already encoded. The cross-referencing was already in place. The progressive disclosure structure meant the new feature could be documented the same way everything else was documented. The trust layer — shared values, epistemic discipline, bias awareness — transferred automatically to the new capability because it lives in the knowledge base, not in any single feature's code.

-----

## The Diagnostic Question — How Fast Can You Stack?

If you're building with AI and want to know whether your approach is scaling, ask yourself: how long does it take to add a genuinely new capability?

Not a variation of something you've already built. A new thing. A different modality, a different audience, a different output format. Something that would have been its own project a year ago.

If the answer is "about the same as starting from scratch," your foundation isn't compounding. Each new thing stands alone, supported by its own scaffolding, inheriting nothing from what came before.

If the answer is "surprisingly fast, and it already knew the constraints," your foundation is earning its keep. The principles transfer. The methods apply. The cross-references connect. The new capability isn't just built — it's integrated, because the architecture was designed for integration from the start.

The stacking test isn't a vanity metric. It's the most honest measure of architectural health you have. Because when the foundation is right, new capabilities don't collide with existing ones — they compound.

And when you discover that your AI can audit its own work, disclose its own biases, and flag its own limitations — all because you encoded those principles once and the system found them relevant — that's not a feature. That's evidence that the foundation is sound enough to be trusted with more.
