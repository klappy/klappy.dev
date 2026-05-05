---
uri: klappy://canon/methods/borrow-bend-break-beget-build
title: "Method: Borrow, Bend, Break, Beget, Bide, Build"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["canon", "methods", "6B", "5B", "borrow", "bend", "break", "beget", "bide", "build", "leverage", "delegation", "strategic-patience", "reversibility"]
epoch: E0008.5
date: 2026-05-05
derives_from:
  - odd/constraint/use-only-what-hurts.md
  - canon/values/trust-kernel.md
complements: "canon/methods/self-audit.md, canon/methods/weighted-relevance-and-arbitration.md, canon/constraints/borrow-evaluation-before-implementation.md"
supersedes_concept: "5B (Borrow, Bend, Break, Beget, Build) — Bide added as the sixth B per klappy://docs/promotions/P0002-borrow-evaluation-before-implementation; URI and filename retained for backward reference"
---

# Method: Borrow, Bend, Break, Beget, Bide, Build

> The canonical sequence for maximizing work not done. Before building anything yourself, attempt to borrow what exists, bend it to your context, and let the breaks reveal what's missing. When something is missing, beget it — offload it to others who can own that piece and build it in parallel, even imperfectly. When the field is visibly converging toward a substrate that doesn't exist yet but probably will, **bide** — wait for it to surface, with a tripwire and an inspection step. Only build yourself what nobody else can carry and what waiting cannot resolve. The epistemic ledger is what makes this sequence compound — without it, each step starts from zero.

-----

## Summary — Six Steps That Progressively Narrow What You Must Build Yourself

Most premature building happens because people skip straight from idea to construction. They don't inventory what exists, don't test whether existing tools can be repurposed, don't let friction reveal what's genuinely missing, don't consider whether someone else could own the missing piece, and don't consider whether *waiting* — strategic patience with an inspection step — would let the field deliver what's missing without further investment.

This sequence forces progressive narrowing. Each step reduces the surface area of what you must build yourself. The result is maximum leverage with minimum original work — which directly serves the agile principle of maximizing the amount of work not done.

The sequence depends on the epistemic ledger. Decisions and constraints from earlier steps must persist into later steps without relying on human memory or conversation history. Without the ledger, the sequence collapses to "just build."

The sixth step — Bide — is the operationalization of *strategic patience with inspection*. It is not "do nothing." It carries its own discipline: a tripwire that forces re-evaluation, and an inspection step against named criteria when the wait completes. A Bide that is skipped silently is not a Bide; it is a Build masquerading as a sequence step. See `klappy://canon/constraints/borrow-evaluation-before-implementation` for the agent-binding planning-mode form of this method.

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

If nobody can carry the piece, you move to Bide. If waiting is not an option, you move to Build. But beget first. Always.

### Bide — Wait for the Field to Build It For You, Then Inspect What Surfaces

When the missing piece is something the field is visibly converging toward — a category of tooling that multiple parties are converging on, a standardized protocol with reference implementations in flight, a substrate that the underlying ecosystem will likely supply within a knowable window — bide. Deliberately wait. Do not build, do not beget, do not silently drop the requirement; declare a Bide with the discipline that distinguishes patience from forgetting.

A Bide MUST carry three things:

- **A reason the wait is acceptable.** Urgency, scope, or the existence of a manual fallback during the wait. Without a reason, this is not a Bide; it is dropped scope.
- **A tripwire.** A date, a milestone, or a condition that triggers re-evaluation. Bide-without-tripwire is dropped scope wearing a costume.
- **An inspection step when the wait completes.** What surfaced is evaluated against named criteria, not adopted reflexively.

A Bide resolves to one of three terminal paths:

- **`waiting`** — the tripwire has not fired; the bide is active; a fallback is in place during the wait.
- **`inspected-and-adopted`** — the tripwire fired, what surfaced was inspected, the inspection passed; adopt and exit the sequence with `Build = none`.
- **`inspected-and-rejected`** — the tripwire fired, what surfaced was inspected, the inspection failed against at least one named criterion. The Bide is closed; proceed to Build, with the rejection's named criteria as the justification for `Build = minimal`.

The inspection criteria — any one of which justifies `inspected-and-rejected` — are:

- **Vision conflict.** What surfaced makes architectural choices that conflict with the project's vision or foundational needs.
- **Foundational gap.** What surfaced sits above the layer where the foundational need lives, leaving the underlying problem unaddressed.
- **Gross overcomplication.** What surfaced solves a much larger problem than the one at hand and brings the cost of that scope along.
- **Opinionated stack imposition.** What surfaced requires adopting a particular runtime, framework, language, or topology that forces decisions outside the framework's proper scope.
- **Improper authority.** What surfaced makes architectural or product decisions that are not its place to make — decisions that belong to the operator or to the layer above.
- **Persistent gap after multiple field iterations.** What surfaced addresses adjacent problems but consistently fails to close the specific gap; further waiting has diminishing returns.

A bare "didn't fit" is not a verdict; it is an aesthetic skip. The named criterion plus what specifically was inspected (named libraries, repos, versions) is the minimum bar.

A Bide that resolves to `inspected-and-rejected` justifies Build by exclusion. A Bide that is skipped does not. Both `inspected-and-adopted` and `inspected-and-rejected → Build = minimal` are correct outcomes of the same disciplined fork; treating one as the "main" path and the other as a "fallback" misframes the rule. Build after a documented rejection is the rule's correct answer for that case.

If the wait is too costly, fallback unavailable, or the tripwire has fired without anything surfacing to inspect, you move to Build with the bide's outcome on record.

### Build — Only What Nobody Else Can Carry and What Waiting Cannot Resolve

Now build. But only what genuinely could not be borrowed, bent, begotten, or bidden. The build should be minimal — the smallest thing that relieves the observed constraint and that no one else was able to take on and that waiting was not going to resolve.

If you find yourself building more than what the breaks demanded and the beget step couldn't cover, you're doing too much.

After building, the cycle may restart. The new thing you built becomes something the next project borrows.

-----

## Constraints — What This Method Requires

You may not build before you have attempted to borrow, bend, beget, and bide. The sequence is not optional — it prevents premature construction and solo heroics. A Bide that resolves to `inspected-and-rejected` justifies Build by exclusion; a Bide that is skipped does not.

What you build must trace to a specific break that was observed, not imagined, that could not be offloaded to someone else, and that waiting was not going to resolve.

The ledger must travel with the work. Without it, continuity is lost across the sequence and each step starts from zero.

**Reversibility is a planning-time criterion that the method requires consideration of.** The cost of swapping out of the chosen path later, in either direction — adopt-then-leave or wait-then-build — must be surfaced at the planning layer. High forward cost (Build is sticky once chosen, especially for substrate-class artifacts) argues for more Bide patience and tighter `Build = minimal` discipline. High backward cost (Bide creates lock-in to a manual fallback that would be hard to undo) argues for shorter Bide tripwires and earlier Build with a clean interface. Reversibility cost is asymmetric and per-application; it is surfaced as a one-line Reversibility Note alongside the 6B Evaluation table per `klappy://canon/constraints/borrow-evaluation-before-implementation`.

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
