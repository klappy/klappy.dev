---
uri: klappy://canon/principles/skills-are-procedure-not-judgment
title: "Skills Are Procedure, Not Judgment — What odd/canon/oddkit Carry That a Skill Never Can"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["canon", "principle", "skills", "procedure", "judgment", "discernment", "vodka-architecture", "prompt-over-code", "E0010"]
epoch: E0010
date: 2026-06-18
derives_from: "canon/constraints/audit-gates-are-spawned-agent-sessions.md, canon/principles/prompt-over-code.md, canon/principles/verification-requires-fresh-context.md, canon/definitions/validation-as-epistemic-mode.md, canon/principles/discernment-layer.md"
complements: "writings/when-skills-arent-enough.md, canon/principles/ritual-is-a-smell.md, writings/crew-not-clone.md"
governs: "How responsibility is divided between a skill (a fixed, relevance-loaded procedure) and the judgment layer (odd/canon/oddkit). Determines what may be encoded into a skill and what must be left to a judging agent operating under canon."
status: active
target_repo: "outcomes-driven-development"
---

# Skills Are Procedure, Not Judgment — What odd/canon/oddkit Carry That a Skill Never Can

> A skill encodes a procedure and repeats it the same way every time; that is its strength and its ceiling. It cannot render a judgment — decide whether a claim is verified, whether a generated artifact meets a definition-of-done that has no compiler to grade it, whether the moment warrants reverting modes, what canon actually says about the case in hand. The dividing line is not repeatable versus not-repeatable, because plenty of judgment recurs; the line is procedure versus judgment. odd/canon/oddkit are the judgment layer. A skill can host a playbook the judgment layer runs, but it can never be the judgment, and that is structural rather than a gap a better-written skill closes: a mechanical step cannot be an audit gate, cannot validate its own output from fresh context, and cannot be the enforcer that also gets to script the law. The rule that keeps the two honest: encode the procedure, never the verdict.

---

## Summary — Procedure Repeats; Judgment Discerns, and Only One of Them Is Encodable

A skill is a fixed recipe: a bundle of instructions loaded by relevance and executed the same way each time. Consistency is what it is good at. It follows steps; it does not weigh evidence.

Judgment is the other thing. It is discernment applied in context — deciding whether a claim has been verified, whether an artifact meets a definition-of-done with no oracle to grade it, whether the situation warrants reverting modes, what the canon actually says about the case in hand. None of those is a step to follow. Each is a call to make.

The tempting misread is that the boundary runs between work that repeats and work that does not. It does not. A judgment call can recur daily and still be a judgment call every time, because each instance weighs its own evidence. The boundary that actually holds is procedure versus judgment, and a skill lives entirely on the procedure side.

This is not a maturity gap. A better-written skill does not eventually become a judge, because three structural facts already named in canon stand in the way. An audit gate that requires reading prose, code, and history together must be a spawned agent session, not a pattern matcher. Validation requires a context break, so a creator cannot grade its own work. And governance is law applied by an enforcer, not a script hardcoded into the runtime — the judging is not scriptable. A skill is a mechanical, same-context, scripted procedure. By each of those facts it is disqualified from being the judgment.

So the division of labor is clean. The skill is the repeatable procedure: the playbook, the recipe, the steps of a pass and where the outputs land. The substrate — odd/canon/oddkit — is the judgment: does this claim hold, does this pass the definition-of-done, should we revert, what does canon say. The rule that keeps the two from blurring is one line: encode the procedure, never the verdict.

---

## The Line Runs Between Procedure and Judgment, Not Between Repeatable and Not

It is easy to assume the useful distinction is between tasks that repeat and tasks that are one-of-a-kind, and to file skills under the first and judgment under the second. That filing is wrong, and the error is expensive, because it licenses encoding a recurring judgment into a skill on the theory that recurrence makes it mechanical.

Recurrence does not make a thing mechanical. Deciding whether a draft meets its definition-of-done is a judgment whether it happens once or four hundred times; the four-hundredth instance still has to read the artifact actually produced and weigh it against a standard no compiler enforces. The repetition is in the *occasion*, not in the *call*.

A skill is a fixed recipe: instructions loaded by relevance and run the same way each time. Its strength is exactly that it does not vary. Judgment is discernment applied in context, and its whole job is to vary with the evidence in front of it. The first is valuable because it is invariant. The second is valuable because it is not. Sorting by "does this recur" puts invariant and variable work in the same bin and loses the only distinction that matters.

## Why a Skill Cannot Cross the Line — Three Structural Reasons, Not One Maturity Gap

The claim is not that today's skills are immature and tomorrow's will judge. The claim is that a skill is the wrong kind of thing to judge, and canon already says so in three places.

### A Mechanical Step Cannot Be an Audit Gate

When canon defines what to check and the check requires reading prose, code, and history together to render a judgment, `canon/constraints/audit-gates-are-spawned-agent-sessions` requires the gate to be a spawned, fresh-context agent session. Mechanical alternatives are forbidden as gates — not discouraged, forbidden — because they manufacture false confidence: a green check sitting over a drift the matcher cannot see. A skill is a mechanical procedure. Putting it at a judgment gate produces the worse-than-nothing outcome that constraint exists to prevent.

### A Creator Cannot Validate Its Own Output

`canon/principles/verification-requires-fresh-context` establishes that the lenses used to create an artifact are the same lenses used to evaluate it, so a creator's accumulated context bridges the gap between intent and artifact and hides the flaws. Validation is therefore a distinct mode that requires a context break — a fresh session, a different reviewer, a real handoff (`canon/definitions/validation-as-epistemic-mode`). A static skill loaded into the same context, running over the same state that produced the work, is exactly the self-review those documents forbid. It can describe a checklist; it cannot be the independent eyes the checklist needs.

### The Enforcer Does Not Get to Script the Law

`canon/principles/prompt-over-code` keeps governance in documents and the server generic: the canon is the law, the server is the enforcer, and the enforcer surfaces whatever the law says without hardcoding the rules. A skill that tried to *be* the judgment would be hardcoding a verdict into the runtime — the exact move prompt-over-code forbids. The law is programmable by writing a document. The act of judging against it is not a script; it is a reading, made fresh each time against the case in hand.

## What a Skill Can and Cannot Do — A Decision Tree Is Still Procedure

The strongest objection is that skills are not really fixed: a skill can branch, carry conditionals, encode a decision tree, even call a model. Does branching not amount to judgment?

It does not. A decision tree selects a branch by matching inputs against conditions its author wrote in advance. That is procedure with forks, and forks are still steps. What it never does is weigh novel evidence against a standard that has no oracle, notice that the case in hand is one its author never anticipated, or decide that the rule itself should be suspended here. The moment a branch encounters a situation outside its predefined conditions, it either fails closed or guesses — and a guess wearing a green checkmark is the false confidence the audit-gate constraint names.

So the capability test is not "can it choose." It is "can it weigh evidence it was not pre-told how to weigh, from a context fresh enough to see its own blind spots, and produce a verdict no compiler could have produced for it." A skill answers no to that test by construction. That is the whole of what it cannot do, and naming it precisely is what keeps the principle from overreaching: a skill can do everything procedural, including elaborate branching, and nothing that requires the three structural capacities above.

## The Division of Labor — The Skill Hosts the Playbook, the Substrate Renders the Verdict

Set the two side by side and the responsibilities sort themselves.

A skill is the repeatable procedure — the playbook, the recipe, the ordered steps of a pass and where its outputs land. A skill is the right home for "here is how the projection pass runs," "here are the steps to assemble the artifact," "here is the shape the output takes."

The substrate (odd/canon/oddkit) is the judgment. Does this claim hold its evidence. Does this artifact meet the definition-of-done. Should this work revert to planning. What does canon actually say about the case in hand. The substrate is also where the human's irreplaceable contribution lands when the execution layer is a model at all: `canon/principles/discernment-layer` names discernment as the load-bearing human capacity once production is cheap. This principle is the machine-side companion to that one. Among the non-human layers, judgment lives in the substrate, never in the skill. The public essay `When Skills Aren't Enough` reaches the same edge from the practitioner's side: you outgrow the recipe box when your knowledge shifts from instructions to judgment. This principle says why the recipe box could never have held the judgment in the first place.

A skill can host a playbook that the judgment layer invokes. It can never be the judgment that decides whether the playbook's output was any good.

## The Rule — Encode the Procedure, Never the Verdict

One line keeps the division honest: **encode the procedure, never the verdict.**

A procedure is safe to encode because it is meant to be invariant — running it the same way every time is the point. A verdict is not, because a verdict is the output of weighing this evidence, in this context, against this standard, and the next case is different. Encoding a verdict freezes a reading that was only ever true for one case and replays it as though it were a rule. That is how a mechanical gate ends up green over a drift it cannot see; it is replaying yesterday's verdict on today's evidence.

The rule also explains why the verdict resists encoding in the first place. A verdict is not state you write down once and reuse without drift — `canon/principles/dry-canon-says-it-once` warns that a rule duplicated into two homes diverges silently, and a verdict baked into a skill is precisely that: the judging duplicated out of the judgment layer and into a procedure, where it will diverge from what canon now says the moment canon moves. Keep the law in the canon, keep the judging in a fresh-context reading of it, and let the skill carry only the steps.

## When This Would Be Wrong — The Retraction Condition

A principle that cannot be falsified is a preference. This one has a falsifier: if a thing called a "skill" ever rendered context-dependent verdicts — weighing evidence it was not pre-told how to weigh, from a context fresh enough to catch its own blind spots, with no oracle behind it — then the boundary would be wrong. But that thing would no longer be a skill in the sense this principle uses; it would have become a judging agent, which is the substrate under a different name. The boundary is definitional, and that is its strength: it holds not because skills happen to be weak today but because "fixed, relevance-loaded procedure" and "fresh-context judgment with no oracle" are different kinds of thing. Retract this principle if and only if those two collapse into one; at that point the vocabulary, not just the claim, needs rewriting.

## A Separate Concern, Parked — Persona Is Not This Principle

There is a parallel axis that is easy to confuse with this one: whether a model should wear an imposed persona or costume, or operate as crew under shared values. That question is real and it is already treated elsewhere — `Crew, Not Clone` is its home. It is not this principle. This document is strictly about procedure versus judgment, the division between what a skill carries and what the substrate carries. Identity, voice, and costume are a different cut of the same material and belong to their own essay. Conflating the two would blur both; they are kept separate on purpose.

## See Also

- [Audit Gates Are Spawned Agent Sessions](klappy://canon/constraints/audit-gates-are-spawned-agent-sessions) — why a mechanical matcher cannot be a judgment gate
- [Verification Requires Fresh Context](klappy://canon/principles/verification-requires-fresh-context) — why a creator cannot validate its own work
- [Validation as Epistemic Mode](klappy://canon/validation-as-epistemic-mode) — validation as a distinct mode requiring a context break
- [Prompt Over Code](klappy://canon/principles/prompt-over-code) — the enforcer is generic; the law lives in documents, not the runtime
- [The Discernment Layer](klappy://canon/principles/discernment-layer) — the human-side companion: discernment is the load-bearing capacity once production is cheap
- [DRY — The Canon Says It Once](klappy://canon/principles/dry-canon-says-it-once) — why a verdict duplicated into a skill diverges from canon
- [Ritual Is a Smell](klappy://canon/principles/ritual-is-a-smell) — a mechanical procedure standing in for missing judgment is a compensating control
- [When Skills Aren't Enough](klappy://writings/when-skills-arent-enough) — the practitioner-side account of outgrowing the recipe box
- [Crew, Not Clone](klappy://writings/crew-not-clone) — the parked persona/identity axis, treated in full
