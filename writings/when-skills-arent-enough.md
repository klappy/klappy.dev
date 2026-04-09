---
uri: klappy://writings/when-skills-arent-enough
title: "When Skills Aren't Enough"
author: Klappy
type: essay
public: true
audience: public
exposure: nav
tier: 2
voice: first_person
stability: stable
tags:
  - writings
  - oddkit
  - skills
  - progressive-disclosure
  - mcp
  - knowledge-management
  - system-prompts
  - agents
  - orchestration
  - subagents
  - vodka-architecture
relevance: primary
epoch: E0007
date: 2026-03-05
revised: 2026-04-09
hook: "You don't outgrow skills because they're bad. You outgrow them because your knowledge shifts from instructions to judgment — and the recipe box can't hold that."
description: "Every solution to system prompt bloat becomes the next rabbit hole — subagents, orchestration, skills. Three pressures every agent builder hits, and the pattern that emerged from facing them simultaneously."
slug: when-skills-arent-enough
og_description: "Every solution to system prompt bloat becomes the next rabbit hole. Three pressures, one result."
twitter_description: "Every solution to system prompt bloat becomes the next rabbit hole. Three pressures, one result."
derives_from: "canon/values/axioms.md, docs/oddkit/positioning.md, canon/principles/vodka-architecture.md"
complements: "writings/from-passive-to-proactive.md, writings/getting-started-with-odd-and-oddkit.md, writings/the-harness-and-the-operating-system.md"

# Provenance

provenance:
  original_draft: "Mar 5-6, 2026 — drafted alongside Agent Skills Resonance during a comparison session"
  revision_1: "Mar 28, 2026 — 'Every Solution' section strengthened with guide posture; 'every solution introduces problems you couldn't see before' thesis named"
  lost_to_handoff: "Mar 6 - Apr 9, 2026 — article completed, validated, handoff file created. Never committed. The write path was the bottleneck — proving the essay's own thesis."
  revision_2: "Apr 9, 2026 — recovered from conversation history. Updated against current canon: Vodka Architecture named, E0007 proactive posture realized, Getting Started published, Socratic voice pass applied."
  concepts_matured_since_original: "Vodka Architecture, E0007 proactive posture, Revision Lens Sequence, six design principles, dual-context writing, TruthKit vision"
---

# When Skills Aren't Enough

> You don't outgrow skills because they're bad. You outgrow them because your knowledge shifts from instructions to judgment — and the recipe box can't hold that.

-----

## Summary — Three Pressures, One Result

Builders hit three pressures simultaneously when scaling AI-augmented workflows: system prompts bloat with knowledge that has nowhere else to go, skills can't manage hundreds of interconnected documents about abstract thinking, and there's no persistent focus layer between what the model knows from training and what the project needs right now. Each pressure produces an obvious next step — subagents for the bloat, skills for the subagent sprawl, better organization for the skills — and each next step genuinely solves what came before while surfacing emergent problems that weren't visible until the last solution changed the landscape. oddkit emerged from facing all three at once — a stateless MCP server that searches an evolving knowledge base, keeping system prompts thin, scaling beyond keyword triggers, and giving any model focused, accumulated, project-specific judgment on demand.

-----

## The Creeping Wall

You're building agents. You started with one system prompt. It grew. So you split the work across subagents, each with their own prompt. That got complex, so you learned about skills — procedural instructions that load on demand instead of living in the prompt. Things work for a while.

Then you hit a wall. Not a crash — a creeping feeling that you're spending more time managing the system than using it. You've been here before. The system prompt was the problem, so subagents were the answer. Subagent orchestration was the problem, so skills were the answer. Now the skills folder is getting unwieldy and you're wondering what the next answer is — and whether it'll just be another rabbit hole.

Three pressures. Usually felt at the same time.

-----

## Every Solution Introduces Problems You Couldn't See Before

Every innovation solves the problems you can see. Then it surfaces emergent problems you couldn't have foreseen — not because the solution was bad, but because it changed the landscape enough to reveal what was hidden behind the last wall. This isn't a flaw in any particular tool. It's how solutions work.

You start with one agent and one system prompt. Requirements, constraints, coding standards, edge cases, testing expectations — it all goes in the prompt. The prompt becomes a monolith. Every message pays the context tax. Small edits have unpredictable consequences. The industry has a name for this: the God Prompt. The problems are visible: bloat, fragility, context waste.

Subagents solve those visible problems. One agent for coding, one for review, one for deployment. Each gets a focused prompt. The bloat is gone. But now you can see what was hidden behind it: orchestration complexity. The subagents drift semantically. They make inconsistent assumptions. Coordinating them creates overhead that offsets the gains. These aren't problems you could have anticipated from inside the God Prompt — they only became visible once you solved it. If you're here right now, deep in subagent orchestration and feeling like things are getting harder instead of easier, this is why. The wall you're heading toward isn't more orchestration complexity. It's the realization that the knowledge your agents need — judgment, constraints, decision-making principles — can't be distributed across subagent prompts no matter how well you coordinate them.

Skills solve the visible problems of subagent sprawl. Write the instructions once, trigger them on demand, and the prompt stays clean. It's a real improvement — cleaner than orchestration, more modular than monolithic prompts. But skills are self-contained procedural units discovered by keyword matching. They work beautifully for "how to format a docx." The emergent problem you'll discover at scale: they work less well for "how to think about whether this task should be done at all." The knowledge shifts from instructions to judgment, and the recipe box can't hold that.

Each step genuinely solves what came before. None of them are wrong. But each one changes the landscape enough to reveal the next problem — and that next problem is always the same shape: the knowledge that needs to travel with your agent outgrows the container you put it in. Subagents are a bigger container than one prompt. Skills are a cleaner container than subagent prompts. But containers aren't the problem. The problem is that judgment doesn't fit in containers — it's interconnected, continuously relevant, and accumulates over time.

-----

## Your System Prompt Is Still Doing Too Much

Skills handle procedural knowledge well — how to format a document, how to deploy, how to structure a table. But what about judgment? Constraints? The principle that says "don't transition from planning to execution until prerequisites are met"?

That kind of knowledge doesn't fit in a skill. Skills activate on keyword match and deactivate when done. Judgment applies continuously — it's not scoped to one task, it governs all of them. So it ends up back in the system prompt, even after you've externalized the procedural stuff into skills. You've cleaned the prompt of recipes, but the prompt is still bloated — now with the abstract thinking that has nowhere else to go.

If you're running subagents, this compounds. Each subagent needs the same judgment constraints, but you're copy-pasting them across prompts or hoping the orchestration layer carries them through. Semantic drift between subagents isn't a coordination failure — it's a symptom of judgment that can't be externalized into the tools you have.

What if the system prompt only carried posture and axioms — the handful of principles that should genuinely be present on every message? And everything else was retrieved on demand, only when relevant?

That's what a searchable knowledge base behind the prompt does. The prompt stays thin. The knowledge base carries the depth. The same knowledge serves every agent and subagent without copy-paste, without orchestration overhead, without drift.

-----

## Skills Don't Scale Into Knowledge Management

How many skills do you have right now? Twenty? That's manageable. The keyword triggers work. The folder is navigable. You know what's in there.

Now imagine two hundred interconnected documents — not just procedures, but constraints, methods, principles, decisions, and governance that evolves as your project matures. That's what a mature AI-augmented workflow actually produces. Is that still a skills folder? Or has it become something else — something that needs search, not triggers?

Here's the question that exposes the gap: what happens when the relevant knowledge is abstract? When multiple documents inform a single task? When the connection between what you're doing and what the system knows requires inference rather than keyword overlap? A skill titled "how to format a docx" fires when you mention documents. But what fires when you need "the principle we decided three weeks ago about not transitioning to execution without prerequisites"?

What if you didn't have to guess which file was relevant? What if you described what you were trying to do and the system found what applied — including documents you didn't know existed, connections you didn't anticipate, and constraints you would have missed?

-----

## The Focus Gap Between Training and Conversation

Where does your project live?

Not in model training — the model knows programming languages and writing styles, but it doesn't know your team's decisions from last Tuesday. Not in the conversation — you can explain your current task, but when the session ends, the context evaporates. Next session, you're explaining the same constraints again. Or worse: the model makes assumptions because it doesn't know what it doesn't know.

So where do your accumulated decisions go? Your evolving constraints? Your specific judgment about what matters and what doesn't — the kind of knowledge that took three months of real work to develop?

Right now, for most builders, the honest answer is: nowhere. It lives in your head. You carry it between sessions manually. You re-explain it when it matters and hope you remember the parts that don't seem urgent until they're violated.

That's the focus gap. Not what the model knows from training. Not what you tell it in conversation. The layer between them — where your project's living, evolving, searchable knowledge should be accessible to every session, every agent, every tool. Without you manually injecting it each time.

-----

## What Survived All Three

oddkit emerged not from solving one of these pressures but from facing all three simultaneously. The constraints were clear: the system prompt must stay thin, the knowledge must be searchable beyond keywords, and the focus layer must persist across sessions and tools.

What survived those constraints is a stateless MCP server that reads from a git-backed knowledge base. We ended up calling this Vodka Architecture — infrastructure so thin it disappears into whatever it carries. The server has no domain opinion. All the substance comes from the knowledge base. Remove the server and the knowledge base is just files. Add domain logic to the server and you've created the coupling you were trying to escape.

The knowledge base is yours — markdown files in a git repo. You decide what goes in. The server provides the epistemic discipline: search, retrieval, gating, encoding, validation. It enforces *how* knowledge is accessed and governed, never *what* the knowledge contains.

Not because the model is learning, but because the knowledge base is growing and the model can search it.

-----

## Posture, Not Just Activation

Here's where the pattern breaks from everything that came before: oddkit's tools aren't on-demand utilities. They're a cognitive rhythm.

The early version worked like any tool — you invoked it when you remembered to, and it sat quietly when you didn't. That was deliberate. When you're building an epistemic system, you don't start by having it impose itself. You let the operator choose when to engage. You prove the tools work before asking anyone to trust them to act independently.

But "waiting respectfully" became permanent. The system never graduated from "prove yourself" to "participate." And the person who built it — that's me — became the integration layer between the system and its own features. I was the scheduler, the rememberer, the one who typed the invocations from memory because the tools wouldn't propose them on their own.

What if the tools didn't wait? What if searching the knowledge base before making a claim was as automatic as checking your mirrors before changing lanes? Not because someone told you to — because not checking feels wrong?

That's the shift. Orient when context changes. Search before claiming. Challenge before encoding a decision. Gate before transitioning from planning to execution. Validate before declaring done. Not as commands. As posture — the default stance from which all work begins.

A skill activates on a keyword and goes silent when it's done. An epistemic guide maintains continuous awareness of what the project knows, what hasn't been verified, and what deserves to be challenged — whether or not anyone asks.

-----

## If This Sounds Like Your Wall

I wrote this essay in March 2026. It was drafted, validated, and handed off for publication. It didn't ship. The handoff file sat in a conversation workspace that disappeared when the session ended. A month later, I went looking for it and found the handoff note I'd written to myself: "This handoff file exists because oddkit doesn't have write access yet. The write path is the bottleneck."

The essay arguing that handoff friction kills knowledge work was itself killed by handoff friction.

By the time I recovered it, the concepts had matured. Vodka Architecture had been named. The proactive posture had been declared and implemented. New essays had been published that this one should reference. The article needed a revision pass — not because the thesis was wrong, but because the system had grown past what the original draft described.

That's the pattern this essay is about. Every solution surfaces the next problem. The original draft was right about the wall. It just couldn't see past the wall it was standing behind.

If you recognize these pressures — the bloating prompt, the skills that don't scale into judgment, the context that evaporates between sessions — oddkit is open source and free. It's an MCP server. You add it to whatever you're already using. It takes thirty seconds.

The [getting started guide](klappy://writings/getting-started-with-odd-and-oddkit) walks you through setup, bootstrap, and your first session. The [deeper journey](klappy://writings/the-journey-from-ai-tasks-to-ai-augmented-workflows) maps the four stages from AI-as-task-tool to AI-augmented workflows.

The knowledge base is yours. The judgment is yours. The model just finally has a way to access it.

-----

*See also: [From Passive to Proactive](klappy://writings/from-passive-to-proactive) — the story of how oddkit graduated from tools-on-demand to cognitive rhythm. [The Harness and the Operating System](klappy://writings/the-harness-and-the-operating-system) — why your AI needs an operating system, not just a bigger prompt.*
