---
uri: klappy://writings/the-drift-queue
title: "The Drift Queue — Your Knowledge Base Cleans Itself"
subtitle: "How one person manages a growing knowledge base without drowning in maintenance"
author: "Klappy"
type: essay
public: true
audience: public
exposure: public
tier: 1
voice: first_person
stability: stable
tags:
  - writings
  - essay
  - drift
  - audit
  - constraints
  - knowledge-base
  - epistemic-drift
  - hygiene
  - oddkit
  - scaling
epoch: E0005
date: 2026-02-17

# Discovery

hook: "Your knowledge base is drifting right now. You just can't see it."
description: "Every growing knowledge base accumulates invisible inconsistencies. The drift queue makes them visible and workable without blocking the work that matters."
slug: the-drift-queue

# Social graph

og_title: "The Drift Queue — Your Knowledge Base Cleans Itself"
og_description: "Every growing knowledge base accumulates invisible inconsistencies. The drift queue makes them visible and workable without blocking the work that matters."

# Relationships

derives_from: "canon/meta/constraint-driven-audits.md, canon/constraints/guide-posture.md"
complements: "writings/the-project-journal.md, writings/the-most-expensive-problem.md, writings/from-bible-translation-to-epistemic-os.md"
start_here: true
start_here_order: 11
start_here_label: "The Drift Queue — Knowledge Base Hygiene"
---

# The Drift Queue — Your Knowledge Base Cleans Itself

> Every growing knowledge base accumulates invisible inconsistencies. New standards get written, old documents don't match. New content ships under pressure without full review. This isn't failure — it's entropy. The drift queue makes that entropy visible and workable without blocking forward movement. Your agent surfaces suggested fixes when you're already editing a drifted file, so maintenance rides on work you're already doing instead of becoming its own project.

-----

## Summary — Stop Choosing Between Moving Forward and Cleaning Up

If you manage any kind of knowledge base — documentation, a wiki, a content library, internal standards — you've felt this tension. You write something new that raises the bar. Now everything written before it looks wrong. You have two bad options: stop what you're doing and fix everything, or ignore the inconsistency and let it compound.

Most people choose option two. The inconsistencies pile up invisibly until someone asks a question and gets a contradictory answer depending on which document they found first. By then, the cleanup is a project unto itself — one that never quite makes it to the top of the priority list because there's always new work to do.

The drift queue is a third option: let the inconsistencies become visible without letting them become blocking. When you write a new standard, the system audits existing documents against it and adds findings to a queue. The queue doesn't demand your attention. It waits. And when you're already editing one of those documents for your own reasons, the system says: "While you're in here — this doc drifted from the new standard. Here's what needs fixing."

Maintenance rides on the work you're already doing. No dedicated cleanup sprint. No choice between forward and backward.

-----

## How I Discovered This

I was writing a positioning constraint for my knowledge base — a rule about how public-facing content should be structured. The rule was simple: lead with the reader's problem, not with a description of your system.

After writing the rule, I audited the 15 documents on my homepage against it. Thirteen of them failed. Suddenly I had 13 new tasks that didn't exist five minutes earlier. The constraint was right, but the backlog it created felt paralyzing. Do I stop everything and fix 13 documents? Do I ignore them and keep shipping content that the 13 old documents contradict?

Neither answer was good. So I asked a different question: what if the system tracked this drift and surfaced it *when I was already touching those files*?

That reframe changed everything. The audit became a one-time baseline, not a sprint. The findings went into a queue. And the next time I opened one of those 13 documents to edit it for any reason, the system would remind me of the drift and suggest the fix. Some documents I might not touch for months. That's fine. The drift is visible, tracked, and waiting for the right moment — not blocking the work that actually matters.

-----

## What Drift Actually Is

Drift isn't a mistake. It's what happens when a living system grows.

You write a style guide. Six months later, you realize the guide should also cover tone. You update it. Now every document written before the update technically violates the new standard. That's not because anyone did anything wrong — it's because the standard evolved.

The same thing happens with any kind of standard, policy, or best practice: API documentation that doesn't match the new versioning convention, onboarding docs that don't reflect the updated process, product descriptions that use the old positioning. Each one is small. Collectively, they erode trust — a reader encounters two documents that say different things and doesn't know which one to believe. This is a quieter version of [the most expensive problem](klappy://writings/the-most-expensive-problem) — knowledge that exists but can't be trusted is worse than knowledge that doesn't exist at all.

The traditional fix is periodic audits: someone locks themselves in a room for a week and reviews everything. This works exactly once. Then the knowledge base grows, the team changes, and no one has a week to spare. The drift goes back to being invisible.

-----

## How the Drift Queue Works

The system needs three things from every standard or constraint you write:

**What it governs.** Which documents should this standard apply to? Maybe it's all public-facing content. Maybe it's all API documentation. Maybe it's everything written before a certain date. The scope is defined once, when you write the standard.

**What pass and fail look like.** What are the specific tests? "Does the document open with a user problem?" "Does the API doc include a versioning header?" "Is there a summary section?" Some of these are structural — a machine can check for them automatically. Others require judgment — an AI agent reads the document and evaluates it.

**What to do when something fails.** Not every failure needs the same fix. Some documents need minor edits in place. Others need a completely new document written to sit in front of them. The remediation vocabulary is specific to the standard.

With those three elements, the audit runs itself. A new standard is written, the system resolves its scope, checks each document, and populates the queue. From there, the queue works in three modes.

-----

## Three Ways the Queue Gets Worked

**Opportunistic — while you're already there.** This is the highest-leverage mode. You open a file to make an unrelated edit. The system checks the drift queue and finds that this file has two outstanding items — one from a writing standard, one from the positioning constraint. It surfaces them: "While you're in here, the summary section is missing a descriptive subtitle, and the opening paragraph leads with the system instead of the user's problem." You fix both as part of the edit you were already making. Cost: nearly zero. The context was already loaded.

**Impact-driven — dedicated hygiene time.** When you have capacity, you ask the system for the highest-impact drift items. Impact is assessed by how many people see the document, how severe the constraint is, and how long the drift has been accumulating. The homepage is higher priority than an internal appendix. A tier-one constraint violation is more urgent than a stylistic preference. The system doesn't just give you a list — it gives you a ranked list with reasoning.

**Triggered — when a new standard lands.** This is the baseline audit. You write a new constraint, the system runs it against everything in its governance scope, and the queue populates with initial findings. This is informational, not urgent. You now have visibility into how the existing corpus relates to the new standard. Some items will get fixed opportunistically. Some will wait for impact-driven sessions. Some might wait months. That's fine — visible drift is manageable drift.

-----

## Why This Matters for One-Person Operations

If you're a team of fifty, you can assign someone to do quarterly documentation audits. If you're one person — or a small team where everyone is building — that's not an option. The work that keeps the lights on always wins over the work that keeps the docs consistent.

The drift queue changes the math. Maintenance stops being a separate project that competes with production. It becomes a thin layer on top of the work you're already doing. The result is that a single person can manage a knowledge base that would normally require a dedicated documentation team — not by working harder, but by letting the system carry the hygiene.

I manage a knowledge base of over 350 documents. It has a canon of values and constraints, implementation specs, public-facing essays, architecture documentation, and agent instructions. New constraints and standards get added regularly. Without the drift queue, every new standard would create a manual audit backlog that I'd never get to. With it, the drift becomes visible the moment it's created, and it gets resolved the moment I happen to be in the neighborhood. If you're wondering how the knowledge gets into the base in the first place — that's [the project journal](klappy://writings/the-project-journal). The journal captures what you learn as you work. The drift queue keeps what you've captured honest over time.

-----

## Getting Started

You don't need a sophisticated system to start. The pattern works at any scale.

**Step one: when you write a standard, write down what it governs and how to test it.** This is the part most people skip. They write "all public docs should lead with the user's problem" but don't write down which documents that applies to or what failure looks like. Without those two things, the standard is advice — well-intentioned, quickly forgotten.

**Step two: run the audit once and save the results.** Go through the governed documents, check each one against the tests, and write down what you find. This is the baseline. It might be painful — my first audit turned up 13 failures in 15 documents. But now you can see the drift.

**Step three: work it opportunistically.** The next time you open a failed document for any reason, fix the drift item. Keep a simple checklist or use a tool that surfaces queue items when you open a file. The key discipline is: don't make a special trip for it, and don't let it block your actual work.

If you're using an AI agent with access to your knowledge base — like [oddkit](klappy://docs/oddkit/positioning) plugged into your editor or chat — the agent can handle steps one through three automatically. It reads the constraint, resolves the scope, runs the checks, and surfaces findings when you're editing a relevant file. You just work. The hygiene happens around you.

-----

## The Deeper Principle

The drift queue works because it respects a simple truth: you can't maintain everything at once, and you shouldn't have to. Growth creates drift. Drift is entropy, not failure. The only question is whether the drift is visible or invisible.

Invisible drift compounds until it breaks trust — someone gets contradictory information and stops believing any of it. Visible drift stays manageable because it can be prioritized, worked incrementally, and resolved at the moment of least cost.

This is the same principle behind every good maintenance system. You don't tear apart the engine on a schedule — you track wear, surface what needs attention, and fix things when you're already under the hood. Your knowledge base deserves the same respect.
