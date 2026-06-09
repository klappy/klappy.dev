---
uri: klappy://canon/principles/bulldoze-blueprint
title: "Bulldoze the App, Keep the Blueprint"
subtitle: "When code stops being the scarce resource"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags:
relevance: supporting
execution_posture: operational
  - ai-development
  - regeneration
  - restartability
  - evidence
  - cost-models
  - bt-tools
target_repo: "outcomes-driven-development"
---

# Bulldoze the App, Keep the Blueprint

> **When code stops being the scarce resource**

---

Imagine spending three hard months building a custom house.

You hire the contractors. You pour the foundation. You frame the walls. The paint dries. You stand back and think: *okay, I can imagine living the rest of my life here.*

Then the architect walks in, looks around, nods, and says:

> "Great. Bulldoze it."

In the physical world, that's absurd.  
You don't bulldoze a perfectly good house. You sue someone.

But then the architect adds:

> "The house wasn't the point. The blueprint was. Now that we have it, we can build the real one in about ten minutes."

That idea sounds irresponsible when applied to buildings.

It sounds less crazy once you've felt the ground shift under software development in the last year—especially if you're building tools where being wrong has real consequences.

Because AI didn't just make coding faster.

It changed what's scarce.

Code generation is no longer the primary bottleneck.  
**Intent is. Trust is. Evidence is.**

So here's the framing question, grounded in real Bible translation (BT) tool work:

> **What changes when the asset stops being the code—and becomes the blueprint that makes regeneration safe?**

By *blueprint*, this does **not** mean diagrams for their own sake.

It means the durable artifacts that survive deletion:

- intent (what we are trying to accomplish)
- constraints (what must be true, and what must never happen)
- decisions (why one path was chosen over another)
- evidence (what proves outcomes match reality)

This is not a universal claim about all software.

But in BT tooling—offline constraints, high trust requirements, messy field realities, and shifting assumptions—this framing keeps reasserting itself.

> **This is the class of learning the ETEN Innovation Lab exists to surface: not finished products, but reusable, durable patterns.**

---

## A Concrete Example: The AAG Risk Dashboard

Late last year, Peter and I worked with **All Access Goals (AAG)** data sourced from multiple systems (Progress.Bible, Rev79, and others).

Peter's initial work was done the right way:
- careful manual analysis
- spreadsheets
- explicit assumptions
- human judgment applied where the data was messy

That work was not "pre-dashboard."

It *was* the truth source.

My responsibility wasn't "build a dashboard."

It was:

> **Make the analysis repeatable.**

So that new exports could regenerate the *same conclusions* without redoing the reasoning by hand.

That shift—from one-time result to repeatable pipeline—is where AI-era pressure shows up.

If a system cannot regenerate reliably, it is not a tool.

It is a report with confidence attached.

---

## When Code Stopped Being the Asset

For most of my career, code *felt* like the asset.

You protect it.  
You polish it.  
You carry it forward like an investment.

AI broke that mental model by collapsing the scarcity underneath it.

When generation becomes cheap:
- variation explodes
- maintenance becomes a permanent tax
- understanding legacy output can cost more than regeneration

At some point, a statement emerges that feels offensive until tested:

> **If it costs less to regenerate the code than to understand it, delete it.**

Not because deletion is virtuous.

Because economics does not care about attachment.

But this raises a real problem:

If code is disposable, what stays?

Answer: what makes regeneration safe.

- testable requirements
- verifiable constraints
- evidence tied to observable outcomes

In other words: **the blueprint.**

---

## Evidence Beats Explanation

In BT tooling, "close enough" is not a harmless failure mode.

Bad software doesn't just annoy users.  
It wastes time.  
It misleads decision-making.  
It quietly erodes trust.

AI worsens this in a specific way:

> **Explanations are cheap. Confidence is cheap.**

So "it works" becomes meaningless without proof.

For the AAG dashboard, the impressive part wasn't chart rendering.

It was verification.

Raw exports—hundreds of thousands of records—were loaded, filtered, and queried until outputs matched Peter's original spreadsheets **verbatim**:
- row-for-row
- aggregate-for-aggregate
- against an explicit Definition of Done

Then came the next constraint: performance.

The first implementation took minutes.  
That was unacceptable.

Not because of impatience—but because batch jobs are not instruments.

After optimization, the same computations ran in under **two seconds**, in-browser.

The repeatable pattern:

1. Prove correctness against a trusted baseline  
2. Tighten "done" until it is auditable  
3. Harden performance until truth becomes interactive  

That is what *evidence beats explanation* looks like operationally.

---

## Restartability Is Not Waste

In AI-assisted work, the final 10% often costs more than the first 90%.

The problem is rarely bugs.

It is under-specified intent:
- an unstated constraint
- an implied assumption
- a fuzzy Definition of Done

There is also a quieter failure mode: **context drift**.

Long AI conversations decay.
Earlier constraints blur.
The model confidently solves the wrong problem.

Restarting fixes this.

So attempts are treated as controlled experiments:

- preserve what was learned
- start fresh with a tighter spec
- compare outcomes against reality

> **Restartability is not about throwing work away.**  
> It is about preserving clarity and bounding the cost of learning.

After doing this a few times, the bulldozer metaphor stops sounding nihilistic.

It starts sounding like instrumentation.

---

## What Changes If This Is Right?

If code is no longer the scarce resource, priorities flip.

### Optimize for repeatability, not heroics
A one-time success is not the goal.  
A regeneratable pipeline is.

### Define "done" in observable terms
"Works on my machine" is not evidence.  
Matching baselines, reproducibility, and performance are.

### Protect the blueprint more than the build
Because builds are cheap.

Blueprints prevent confident nonsense.

And in BT tooling, confident nonsense is worse than failure.

---

## Scope and Limits

This is not a claim that code never matters.

Some domains demand continuity for regulatory, security, or verification reasons.

This is a claim about a growing class of AI-assisted systems where:

- generation got cheaper
- verification got harder
- maintenance got more expensive
- drift got more dangerous

The question that remains:

> **What would change if we stopped protecting what we can regenerate—and started protecting what makes regeneration trustworthy?**
