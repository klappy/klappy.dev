---
uri: klappy://writings/the-project-journal
title: "The Project Journal — Your AI Collaboration's Memory"
subtitle: "A practical guide to keeping your AI collaboration honest and cumulative"
author: "Klappy"
type: article
public: true
audience: public
exposure: public
tier: 1
voice: first_person
stability: stable
tags:
  - writings
  - article
  - project-journal
  - epistemic-ledger
  - drift
  - oddkit
  - knowledge-transfer
  - getting-started
epoch: E0005
date: 2026-02-17

# Discovery
hook: "Stop repeating yourself to AI. A project journal makes every session build on the last."
description: "A project journal captures what you observed, learned, decided, and constrained — so your next AI conversation picks up where the last one left off."
slug: the-project-journal

# Social graph
og_title: "The Project Journal — Your AI Collaboration's Memory"
og_description: "Stop repeating yourself to AI. A project journal makes every session build on the last."
og_type: article
og_image: /images/the-project-journal-og.png
twitter_card: summary_large_image
twitter_title: "The Project Journal — Your AI Collaboration's Memory"
twitter_description: "Stop repeating yourself to AI. A project journal makes every session build on the last."
twitter_image: /images/the-project-journal-og.png

# Relationships
derives_from:
  - canon/values/axioms.md
related:
  - uri: klappy://writings/the-most-expensive-problem
    label: "The Most Expensive Problem (parent essay)"
    relationship: companion
  - uri: klappy://odd/ledger/epistemic-ledger
    label: "The Epistemic Ledger (technical definition)"
    relationship: defines
complements: "writings/the-most-expensive-problem.md, odd/ledger/epistemic-ledger.md, docs/appendices/compiled-memory.md, odd/appendices/cognitive-saturation-threshold.md, writings/from-bible-translation-to-epistemic-os.md, odd/constraint/use-only-what-hurts.md"
start_here: true
start_here_order: 8
start_here_label: "The Project Journal — Getting Started"
---

# The Project Journal — Your AI Collaboration's Memory

> Every project generates knowledge. Most of it evaporates between sessions. A project journal is the running record of what you've learned, decided, and observed — so your next conversation picks up where the last one left off instead of starting from scratch.

---

## Summary — Stop Repeating Yourself to AI

If you've ever spent the first ten minutes of an AI conversation re-explaining what you already decided last time, you've felt the problem a project journal solves.

I was recently talking with a colleague who does deep linguistic research with AI. She described the frustration perfectly: the AI seems to understand the problem well at the start, but the longer the conversation goes, the less it understands. By the end, the quality has plummeted and you're more confused than when you began.

The thing is, it's not just the AI that drifts. She admitted it freely — "I drift too." We both do. Humans lose the thread in long, complex work just like AI does. The project journal exists for both of you.

A project journal captures four things as you work: what you observed, what you learned, what you decided, and what constraints you're operating under. When you start a new session, the journal gives your AI collaborator the context it needs to be useful immediately — no warm-up lap required. The difference between this and regular notes is that every entry has a status — observed, inferred, or decided — so both you and your AI can tell solid ground from thin ice.

---

## What Goes in a Project Journal

Think of four buckets:

**Observations** are things you actually saw happen. "The deploy failed with a timeout error." "Three out of five users clicked the wrong button." "The model started rewriting my definitions without telling me." These are facts — they happened, you witnessed them.

**Learnings** are conclusions drawn from observations. "The timeout happens because the database query isn't indexed." "Users expect the primary action to be on the right." These connect dots, and they're only as strong as the observations they rest on.

**Decisions** are choices you made and why. "We're adding an index instead of caching because the data changes frequently." Capturing the *why* is critical — future-you (or your AI) will need it when circumstances change.

**Constraints** are boundaries you can't or won't cross. "The API rate limit is 100 requests per minute." "We ship by Friday regardless." "This system must work for languages without a writing system." These prevent both you and your AI from proposing solutions that won't survive contact with reality.

---

## What It Looks Like in Practice

Say you're working through a hard theoretical problem — the kind where you're building a little universe of definitions, premises, and examples. Without a journal, the AI starts "helping" by silently rewriting that universe. You don't notice until twenty minutes in, when the answers stop making sense. By then, you've lost the thread and the AI has lost the plot.

With a project journal, every few turns you pause and update the record: here are the terms we defined, here's the thesis we're testing, here are the examples we agreed on and what they're supposed to prove. Then when the conversation starts to slide, you don't have to guess what went wrong. You compare the current state against the journal. Any change has to be explicit — everything else is drift.

When I showed this approach to a colleague doing deep semantic research, we sketched out what a journal might look like for her work — a "theory card" with a short paragraph per section: key definitions, current thesis, minimal assumptions, and crucial examples. Same four buckets, just wearing a linguistics hat. The principle is the same whether you're debugging code, planning a product, or doing semantic analysis.

---

## Why Not Just Use Regular Notes?

You can. But regular notes don't distinguish between what you know and what you assume. That distinction is the whole game when collaborating with AI.

An AI reading "we should use PostgreSQL" doesn't know if that's a firm decision backed by benchmarking, a casual preference, or something you said once and forgot about. A project journal entry that says "Decision: PostgreSQL — benchmarked against SQLite, 10x faster for our concurrent read pattern" gives the AI something it can actually reason about.

This is what makes a project journal an *[epistemic ledger](klappy://odd/ledger/epistemic-ledger)* under the hood — it tracks not just what you know, but how you know it. Every claim shows its receipts. That sounds formal, but in practice it just means writing "I saw X" instead of "X is true" and "we chose Y because Z" instead of just "Y."

---

## Getting Started

You don't need special tooling. A markdown file in your project root works fine. Start with three sections — Observations, Decisions, Constraints — and add entries as you work. Date them. When you start an AI session, include the journal in your context.

Here's the simplest version of the workflow: every time you feel the quality of your AI conversation start to slide, pause. Ask the AI to produce a compact summary with four parts: what we're trying to accomplish, the key constraints, what we've already decided, and the open questions. Review it, correct anything that drifted, and paste it at the top of your next message. That one ritual stops the slow slide into nonsense. (This pattern is what we call [compiled memory](klappy://docs/appendices/compiled-memory) — a small, auditable artifact that keeps your collaboration anchored.)

You'll notice something shift almost immediately: your AI stops guessing and starts building on what you've already established. That's the journal doing its job — turning scattered conversations into cumulative progress.

---

## Automate It — Let Your Agent Do the Journaling

The manual approach works, but there's a better way. If your agent has access to the oddkit MCP server, you don't have to maintain the journal by hand. You just work — talk through problems, make decisions, notice things — and when something worth keeping surfaces, you tell your agent to encode it.

The `oddkit encode` tool extracts observations, learnings, decisions, constraints, and other artifact types directly from your conversation and writes them to your project's ledger. You don't need to stop and format entries. You don't need to copy and paste into a file. You say "encode that decision" or "document what we just observed," and the agent handles the rest — capturing the what, the why, and the evidence behind it.

What makes this different from AI-generated meeting notes is accountability. Each encoded entry has a type — was this an observation or an inference? A decision or a preference? A hard constraint or a soft one? The agent doesn't just summarize; it classifies, and you approve what gets committed. Nothing enters the journal without surviving that check.

The artifact types aren't fixed, either. Observations, learnings, decisions, and constraints are the core set, but you can define new types through conversation with your agent. If your domain needs "hypotheses" or "risks" or "open questions" as first-class entries, you define them once and they become part of your project's schema going forward.

The result: your project journal fills itself as a natural byproduct of working. When you start a new session, the agent reads the ledger and picks up where you left off. When you hand off to a different tool or teammate, the journal is already written. The knowledge doesn't evaporate — it was encoded the moment it mattered.

To get started with oddkit, add it as an [MCP server](klappy://odd/getting-started/agents-and-mcp) in your AI tool of choice and make sure your project has an `odd/ledger/` folder. That's where the durable artifacts live. The rest happens through conversation.

---

## The Deeper Pattern

The project journal is the simplest expression of a bigger idea: trust between you and your AI is built by managing expectations. When both sides know what's been observed, decided, and constrained, the conversation starts on solid ground instead of assumptions.

That's not a productivity hack. It's how knowledge actually works — in AI collaboration, in teams, in any context where what you know matters more than what you guess. The journal addresses what might be [the most expensive problem](klappy://writings/the-most-expensive-problem) in any collaboration: the failure of knowledge transfer. Every time context evaporates between sessions, you're paying that cost. The journal is how you stop paying it.

If you're reading this, you probably don't need the full system yet. You need the piece that addresses [what hurts right now](klappy://odd/constraint/use-only-what-hurts). Start with the journal. The rest of the system is there when the next pain point shows up.

*See also: [The Epistemic Ledger](klappy://odd/ledger/epistemic-ledger) for the full technical definition, [Cognitive Saturation Threshold](klappy://odd/appendices/cognitive-saturation-threshold) for why conversations degrade, and [From Bible Translation to Epistemic OS](klappy://writings/from-bible-translation-to-epistemic-os) for the origin story behind these ideas.*
