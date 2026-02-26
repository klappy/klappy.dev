---
uri: klappy://writings/the-planning-queue
title: "The Planning Queue — Your AI Builds What You Spec'd, Not What You Remember"
subtitle: "How implementation-ready specs eliminate the most expensive handoff in AI-assisted development"
author: "Klappy"
type: essay
public: true
audience: public
exposure: public
tier: 1
voice: first_person
stability: evolving
tags:
  - writings
  - essay
  - planning
  - queue
  - handoff
  - knowledge-base
  - oddkit
  - multi-tool
  - coordination
  - use-only-what-hurts
epoch: E0005
date: 2026-02-18

# Discovery

hook: "You just spent an hour thinking through a feature with AI. Now close the chat and try to build it."
description: "The planning queue stores implementation-ready specs that any AI tool can pick up cold — so your best thinking survives the session that produced it."
slug: the-planning-queue

# Social graph

og_title: "The Planning Queue — Your AI Builds What You Spec'd, Not What You Remember"
og_description: "The planning queue stores implementation-ready specs that any AI tool can pick up cold — so your best thinking survives the session that produced it."

# Relationships

derives_from: "canon/constraints/guide-posture.md, canon/methods/planning-queue.md, canon/constraints/humans-are-variable-inputs.md, odd/constraint/use-only-what-hurts.md, canon/principles/ritual-is-a-smell.md"
complements: "writings/the-drift-queue.md, writings/the-most-expensive-problem.md, writings/the-project-journal.md, writings/from-bible-translation-to-epistemic-os.md, docs/planning/automated-changelog.md, docs/planning/oddkit-write-access.md"
start_here: true
start_here_order: 12
start_here_label: "The Planning Queue — Specs That Wait Until They Hurt"
---

# The Planning Queue — Your AI Builds What You Spec'd, Not What You Remember

> You just had the best AI conversation of your week. You explored a problem, made decisions, identified constraints, sketched a phased implementation plan. Now you need to actually build it — in a different tool, a different session, maybe tomorrow. How much of that thinking survives the handoff? The planning queue stores implementation-ready specs in the same knowledge base your AI tools already search. When it's time to build, any tool picks up the spec cold. No re-explanation. No "as we discussed." No human carrying files between sessions. The spec is the handoff.

-----

## Summary — Stop Carrying Context Between Your AI Tools

If you use AI for both thinking and building, you've felt this moment. The thinking tool — a chat, a voice agent, a brainstorming session — produces something good. Real decisions. Specific constraints. A phased plan that accounts for what could go wrong. Then you switch to the building tool — a coding agent, a document generator, an automation pipeline — and you have to re-explain everything you just decided.

You are the bus. You carry context from where it was produced to where it's consumed. And every time you carry it, you lose some. The constraints you discussed but forgot to mention. The phased approach that becomes "just build the whole thing." The edge case you identified but didn't re-state because it seemed obvious.

The planning queue eliminates the bus. You write the spec once, in the same system your tools already search. When it's time to build, the building tool finds the spec itself. Your best thinking survives intact — not because you remembered to carry it, but because the system carried it for you.

-----

## The Moment I Knew This Was a Problem

I was working on a feature for my knowledge base system. I'd spent a solid session with an AI chat exploring the architecture: what needed to change, why, what constraints applied, what the phased rollout should look like. Good session. Real thinking. Specific decisions.

Then I opened my coding tool to build it. And I found myself typing: "So, we need to add a new action that…" — re-explaining everything. The context from the thinking session was in my head and nowhere else. If I forgot a constraint, it was gone. If I simplified the phased plan because I was tired of typing, the simplification became the spec.

I was the single point of failure in my own workflow. And I was doing this multiple times a day.

The worst version is when you don't even notice the loss. You re-explain the feature, the coding tool builds something close to what you discussed, and you ship it. Weeks later, you hit the edge case you identified in the original session but dropped during the handoff. Now the fix is ten times more expensive because it's in production.

-----

## What a Planning Doc Actually Is

A planning doc is not a ticket. It's not a bullet list of requirements. It's a full document — the same kind of document your knowledge base already manages — with everything a building tool needs to execute cold.

**The problem it solves.** Not hypothetical pain. Observed pain. "This ritual failed during the 0.32.0 release" — not "it would be nice if we automated this."

**The current state.** What happens today without the feature. The specific friction, the manual steps, the failure modes. A building tool that reads this understands what it's replacing.

**The target state.** What changes when the feature exists. Before and after. A building tool that reads this knows what "done" looks like.

**The system changes.** Which systems need modification, with enough specificity to start coding. If an API endpoint needs to be added, name it and describe its inputs and outputs. If multiple systems are involved, separate the handoffs per system.

**Phased implementation.** Ordered phases that deliver incrementally. Each phase is independently valuable. This is the part that gets lost most often in handoffs — the careful sequencing collapses into "build the whole thing."

**Constraints.** What the feature must not do. Safety boundaries, irreversibility gates, performance limits. These are the guardrails the building tool needs to respect — and the first thing that gets dropped when a human re-explains from memory.

**Open questions.** What remains unresolved. These are honest admissions, not blockers. The building tool knows which decisions are settled and which still need input.

**Derivation.** Why this feature exists. Which principles, incidents, or prior decisions justify it. A building tool that reads this understands not just what to build but why — which means it can make better judgment calls on ambiguous implementation details.

-----

## The Part That Surprised Me

I wrote two planning docs and committed them to my knowledge base. Standard practice — I write docs all the time. But then I ran an experiment: I opened a fresh AI chat session, connected it to my knowledge base, and said "let's see if you can find your own instructions in the planning queue."

No hints. No file paths. No "go look at this document." Just: can you find it?

The AI searched the knowledge base, found the planning queue convention, then found both planning docs. It summarized the full four-phase roadmap, identified the constraints, noted the open questions, and was ready to execute. Against 365 documents, the planning specs scored in the top 1% for relevance.

Any tool connected to the same knowledge base would find the same specs. The chat that produced them, the coding tool that builds them, the voice agent that discusses them — they all search the same index. The spec travels with the system, not with the human.

Then something even better happened. I committed the implementation spec to the repo. A separate tool — a bug-finding bot — picked up the spec through the same knowledge base, found a gap in the risk assessment logic (deleted foundational documents weren't classified as high risk), and filed a fix. A third tool improved a spec that a first tool wrote, through a shared knowledge base, without any human carrying anything between them.

-----

## Why Not Just Use a Ticket System?

Fair question. GitHub Issues, Jira, Linear — they all track planned work. Why build a parallel system?

Because a ticket system is a second brain. It has its own search, its own syntax, its own staleness model. The moment your planned work lives in a ticket system *and* your knowledge base, you have split-brain: two systems that both claim to know what needs building. When they disagree — and they will, because one gets updated and the other doesn't — you're back to the human resolving the conflict.

The planning queue works because it's the same system. Same search. Same structure. Same metadata. When your AI tool searches for relevant context, the planning spec shows up alongside the principles, constraints, and prior decisions that govern it. There's no "go check the ticket tracker too." Everything is in one place.

If you already have a ticket system your team relies on, the planning doc can be the spec the ticket links to. The ticket handles coordination — who's doing it, when, what priority. The planning doc handles the knowledge — what to build, why, and how. But the knowledge lives in the knowledge base, not the ticket.

-----

## Use Only What Hurts

Here's the part that makes the planning queue different from a backlog: you don't build things because they're in the queue. You build them because they hurt.

A planning doc can sit for months without being picked up. That's not a failure — it's correct behavior. The pain of not having the feature never exceeded the cost of building it. The spec cost almost nothing to write. It preserved the thinking for whenever it becomes relevant. If that's never, the only cost was the ten minutes spent writing it.

But when the pain does arrive — when a ritual fails, when you lose context in a handoff, when someone asks "why can't I just…" — the spec is already there. You don't need to reconstruct the thinking. You don't need to re-explore the constraints. You don't need another brainstorming session. You pull the planning doc and build.

I felt this firsthand the night I tested the planning queue. During the session, I used my system's encode function to record an insight — a decision with evidence, context, and constraints. Good practice. But the encode function doesn't persist yet. That capability is in the planning queue as Phase 2. The insight existed only in the current conversation. When the session ended, it would vanish.

The pain of not having persistent encode was theoretical an hour earlier. In that moment, it was acute. And the planning doc for that exact feature was already written, with phased implementation, constraints, open questions, and API design. The moment I'm ready to build it, the spec is waiting. I don't need to remember why I wanted it or how I planned to build it. The system remembers for me.

-----

## How to Start

You don't need my specific system. The pattern works anywhere you can store searchable documents alongside your working knowledge.

**Write the spec when the thinking is fresh.** The best time to write a planning doc is right after the exploration session that produced the insight. The constraints are in your head, the edge cases are fresh, the phased approach hasn't been simplified by memory loss. Even if you're not going to build it today, capture the thinking now.

**Put it where your tools already search.** The whole point is that your building tools find the spec without you carrying it to them. If your AI tools search a knowledge base, put the planning doc in the knowledge base. If they search a repo, put it in the repo. The format matters less than the location.

**Include the "why" alongside the "what."** The building tool needs to know not just what to build but why — which constraints apply, which edge cases were considered, which phased approach was chosen and why. This is the context that gets lost in handoffs. This is the context that makes the building tool's judgment calls better.

**Don't build until it hurts.** Resist the urge to build everything you spec. The planning queue is not a sprint backlog. It's a shelf of ready-to-build specs that wait for the right moment. Some will wait weeks. Some will wait months. Some will never be built, and that's fine — the pain never justified the cost.

**Let the system carry the context.** When you do pull a planning doc for execution, hand it to the building tool and let it read the spec. Don't re-explain. Don't summarize from memory. The spec is the handoff. If the building tool has questions, the answers should be in the doc — and if they're not, that's a signal the doc needs updating, not that you need to fill the gap verbally.

-----

## What This Makes Possible

The planning queue is infrastructure for a future that's closer than it looks: AI tools that coordinate through shared knowledge rather than through you.

Today, you carry context between tools. Tomorrow, the tools read from the same knowledge base and hand off to each other. A thinking tool writes a planning spec. A building tool picks it up and executes. A review tool validates the output against the spec's constraints. A maintenance tool monitors for drift over time. You direct which tool acts next, but you don't carry anything between them.

The prerequisite is that the knowledge base is the single source of truth — not one source among many, not a supplement to the ticket tracker, not a reference that might be stale. The source. When every tool reads from the same place, coordination is free. When tools read from different places, coordination is your job.

The planning queue is one piece of that infrastructure. [The drift queue](klappy://writings/the-drift-queue) is another — it keeps the knowledge base honest over time. [The project journal](klappy://writings/the-project-journal) is another — it captures what you learn as you work. Together, they form a system where your knowledge base isn't just a reference library. It's the coordination layer that lets your tools work together.

The most expensive problem in knowledge work is [transferring context](klappy://writings/the-most-expensive-problem) — getting what one person (or tool) knows into the hands of another without losing the nuance. The planning queue doesn't solve that problem completely. But it solves the version of it that hits hardest in AI-assisted work: the handoff from thinking to building.

Write the spec. Let it sit. Build when it hurts. Let the tools find it themselves.

-----

*Companion essays: [The Most Expensive Problem](klappy://writings/the-most-expensive-problem) — why knowledge transfer breakdown is the costliest failure mode in organizations. [The Drift Queue](klappy://writings/the-drift-queue) — how your knowledge base cleans itself over time. [The Project Journal](klappy://writings/the-project-journal) — how to capture what you learn as you work so it survives the session. [From Bible Translation to Epistemic OS](klappy://writings/from-bible-translation-to-epistemic-os) — where these patterns originally came from.*
