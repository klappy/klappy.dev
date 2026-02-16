---
uri: klappy://canon/methods/borrow-bend-break-beget-build
title: "Method: Borrow, Bend, Break, Beget, Build"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["canon", "methods", "5B", "borrow", "bend", "break", "beget", "build", "leverage", "delegation"]
epoch: E0005
date: 2026-02-15
derives_from:
  - odd/constraint/use-only-what-hurts.md
  - canon/values/trust-kernel.md
complements: "canon/methods/self-audit.md, canon/methods/weighted-relevance-and-arbitration.md"
---

# Method: Borrow, Bend, Break, Beget, Build

> The canonical sequence for maximizing work not done. Before building anything yourself, attempt to borrow what exists, bend it to your context, and let the breaks reveal what's missing. When something is missing, beget it — offload it to others who can own that piece and build it in parallel, even imperfectly. Only build yourself what nobody else can carry. The epistemic ledger is what makes this sequence compound — without it, each step starts from zero.

-----

## Summary — Five Steps That Progressively Narrow What You Must Build Yourself

Most premature building happens because people skip straight from idea to construction. They don't inventory what exists, don't test whether existing tools can be repurposed, don't let friction reveal what's genuinely missing, and don't consider whether someone else could own the missing piece.

This sequence forces progressive narrowing. Each step reduces the surface area of what you must build yourself. The result is maximum leverage with minimum original work — which directly serves the agile principle of maximizing the amount of work not done.

The sequence depends on the epistemic ledger. Decisions and constraints from earlier steps must persist into later steps without relying on human memory or conversation history. Without the ledger, the sequence collapses to "just build."

-----

## The Sequence

### Borrow — Use What Exists Without Modification

Before creating anything, inventory what already exists that addresses your need. Tools, libraries, services, frameworks, existing documents, prior art. Use them as-is. Don't customize. Don't fork. Just use.

The goal is contact with reality at the lowest possible cost. Borrowing something and trying it tells you more than planning ever will.

### Bend — Compose or Repurpose for Your Context

When a borrowed tool doesn't fit perfectly, bend it — compose it with other tools, use it in a way the authors didn't intend, repurpose it for your context. The tool doesn't change. How it's applied does.

Most needs can be met by bending what exists. The temptation to build usually comes from not trying hard enough to bend.

### Break — Identify Where Borrowed and Bent Tools Fail

Pay attention to where things don't work. Not hypothetically — actually. Use the borrowed and bent tools until they produce friction, failure, or dead ends. These breaks are information. They tell you exactly where the existing world stops being sufficient.

The breaks are the most valuable output of the sequence. They are observed constraints, not imagined ones.

### Beget — Offload to Others to Build in Parallel

When you've identified what's missing, your first instinct should not be to build it yourself. Instead, find someone else who can own that piece and build it in parallel to what you're doing.

This is a deliberate act of delegation and trust. The output may not be exactly how you would have done it. That's acceptable. You can borrow and bend their output just like you would any other existing tool. The goal is to keep your own momentum while the missing piece gets built alongside you, not sequentially after you.

This is risky. You're depending on someone else's execution and timeline. You have to mitigate that risk — stay aware of whether the dependency is on track, have a fallback if it stalls, and accept imperfection in exchange for parallel progress. But in an AI-augmented world, this kind of collaboration is more plausible than it used to be. The cost of parallel work has dropped dramatically. The old pains of coordination that made it easier to just do it yourself are less prohibitive than they were.

If nobody can carry the piece, you move to Build. But beget first. Always.

### Build — Only What Nobody Else Can Carry

Now build. But only what genuinely could not be borrowed, bent, or begotten. The build should be minimal — the smallest thing that relieves the observed constraint and that no one else was able to take on.

If you find yourself building more than what the breaks demanded and the beget step couldn't cover, you're doing too much.

After building, the cycle may restart. The new thing you built becomes something the next project borrows.

-----

## Constraints — What This Method Requires

You may not build before you have attempted to borrow, bend, and beget. The sequence is not optional — it prevents premature construction and solo heroics.

What you build must trace to a specific break that was observed, not imagined, and that could not be offloaded to someone else.

The ledger must travel with the work. Without it, continuity is lost across the sequence and each step starts from zero.

This method is domain-agnostic. It applies to writing, development, product creation, translation, and any collaborative work governed by ODD.

-----

## Relationship to Other Methods

"Use Only What Hurts" governs *whether* to act. The Theory of Constraints governs *where* to focus. This method governs *how* to approach the work. Together they form the complete prioritization-to-execution chain.

-----

## Alternatives Considered

Standard agile "maximize work not done" — correct principle but provides no operational sequence. Build-first prototyping — fast but produces throwaway work that doesn't compound. Research-first approaches — thorough but delay contact with reality. Solo-build-everything — common instinct but doesn't leverage parallel effort. The borrow-first, beget-before-build approach gets to reality fastest with the least original work.

-----

## Worked Example — ODD Itself Followed This Sequence

ODD's own architecture is a product of this method.

The problem was making AI collaboration trustworthy. The options included building trustworthy models from scratch, fine-tuning existing open source models, or creating entirely new AI tooling and interfaces. Each of those paths would cost hundreds of millions of dollars per year and require building and maintaining foundational infrastructure.

Instead, ODD targeted the augmentation layer — the space between the human and the model that already exists.

**Borrow** — existing AI models (Claude, GPT, open source LLMs), existing interfaces (Claude.ai, Cursor, VS Code, Claude Code), existing agent frameworks, existing standards like MCP.

**Bend** — use MCP not as intended for generic tool integration, but specifically as an epistemic discipline layer. Repurpose tool-calling infrastructure to deliver orient, challenge, gate, encode, validate.

**Break** — existing models hallucinate, lose context between sessions, and have no mechanism for durable decisions. Existing interfaces don't persist what was decided. No standard carries epistemic state across tools.

**Beget** — the models, the interfaces, the agent frameworks, the MCP standard — these are all being built and improved by others in parallel. Let them carry that. Don't rebuild what Anthropic, OpenAI, Cursor, and the MCP community are already investing billions in.

**Build** — only oddkit. The epistemic protocol. The canon structure. The ledger. The smallest possible layer that makes existing tools trustworthy without replacing them.

No AI models had to be trained. No UIs had to be created. No strict repository structure is required. No hundreds of millions of dollars per year in retraining foundational models. The entire system runs on what already exists, bent to serve epistemic discipline. Maximum impact with minimal original work.
