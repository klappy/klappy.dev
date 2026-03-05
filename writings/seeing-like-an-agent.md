---
uri: klappy://writings/seeing-like-an-agent
title: "Seeing Like an Agent"
subtitle: "A year inside the machine and fifteen years outside it led to the same place"
author: "Klappy"
type: essay
public: true
audience: public
exposure: public
tier: 2
voice: first_person
stability: draft
tags:
  - writings
  - essay
  - epistemics
  - agent-design
  - progressive-disclosure
  - tool-design
  - convergence
  - claude-code
  - 5B
epoch: E0005
date: 2026-02-28

# Discovery
hook: "The Claude Code team spent a year learning to see like an agent. I spent fifteen years learning to see like someone guiding teams through Bible translation. We arrived at the same operating principles — and that means we can maximize the work not done."
description: "Thariq's lessons from building Claude Code and the Epistemic OS converge on the same structural insights from radically different starting points. This essay maps the parallel journeys and argues for sharing the lessons rather than rebuilding them."
slug: seeing-like-an-agent

# Social graph
og_title: "Seeing Like an Agent"
og_description: "A year inside the machine and fifteen years outside it led to the same place. That's the kind of convergence you share, not compete on."
og_type: article
og_image: /images/seeing-like-an-agent-og.png
twitter_card: summary_large_image
twitter_title: "Seeing Like an Agent"
twitter_description: "A year inside the machine and fifteen years outside it led to the same place."
twitter_image: /images/seeing-like-an-agent-og.png

# Relationships
derives_from:
  - canon/values/axioms.md
  - canon/values/orientation.md
  - docs/architecture/epistemic-os-layers.md
related:
  - uri: klappy://writings/the-harness-and-the-operating-system
    label: "The Harness and the Operating System"
    relationship: companion
  - uri: klappy://writings/the-most-expensive-problem
    label: "The Most Expensive Problem"
    relationship: companion
complements: "writings/the-harness-and-the-operating-system.md, canon/resonance/seeing-like-an-agent.md, canon/methods/progressive-disclosure.md, canon/methods/borrow-bend-break-beget-build.md"
start_here: false
---

# Seeing Like an Agent

### A year inside the machine and fifteen years outside it led to the same place

> The Claude Code team spent a year learning to see like an agent. I spent fifteen years learning to see like someone guiding teams through Bible translation. We arrived at the same operating principles — and that means we can maximize the work not done.

---

Thariq from the Claude Code team at Anthropic published a thread this week called "Lessons from Building Claude Code: Seeing Like an Agent." It's a practitioner account of what his team learned by paying attention to how Claude actually uses tools — not how they imagined it would, how it actually does.

I read it and something clicked. Not just recognition — excitement. Because the lessons they extracted from a year of building an agent harness are the same lessons I extracted from fifteen years of guiding development teams through Bible translation projects and then, in a frenzy of iteration over the past six weeks, encoded into an Epistemic OS.

This is the second time in two weeks this has happened. Ben Shoemaker's AI Coding Toolkit showed the same structural patterns from the developer side. Now the team that builds the agent itself is describing the same principles from the inside. Three entry points. Same destination.

That's not coincidence. And more importantly, it's not competition. It's an invitation to share.

---

## Two parallel paths

Let me lay my cards on the table about how I got here, because the parallel to Thariq's journey is what makes this interesting.

I spent years guiding software development teams — not as a coder primarily, but as someone responsible for making sure the right things got built and that knowledge transferred across people, tools, and sessions. Most of that work happened in Bible translation — guiding teams across organizations, languages, and cultures. The patterns I internalized there weren't about code. They were about trust, verification, community validation, and the brutal reality that knowledge evaporates when it doesn't travel with the work.

Then agentic coding started becoming viable last year. I didn't just watch — I dove in. I rotated through every toolkit I could get my hands on: VS Code extensions, Cursor, Windsurf, Codex, Claude Code, Lovable, and more. Too many to count. Each had its strengths. Each had similar gaps. The leapfrogging was continuous — one tool would ship a breakthrough feature, another would catch up a week later, a third would take a different approach entirely.

But across all of them, the same frustrations kept surfacing: context loss between sessions, AI confidently asserting things it hadn't checked, knowledge that existed in one conversation dying when the conversation ended. The tools kept getting better at generation. None of them were solving the knowledge transfer problem underneath.

By January 2026, the frustrations had become acute enough that I decided it was time to address the gaps in the tooling. Not theoretically — practically. I started building.

What happened next was intense. From January 15 to February 18 — thirty-four days — the system went through 51 versions across five epochs. Not planned iterations on a roadmap. Rapid, pain-driven cycles where each version addressed the most acute problem I could feel. The canon changelog tells the story: axioms formalized, progressive disclosure architecture built, drift detection added, community checking methods encoded, the oddkit MCP server shipped and iterated on daily.

I wasn't following a blueprint. I was following pain. And the patterns that emerged from following pain turned out to be the same patterns the Claude Code team arrived at by watching their agent for a year.

---

## The convergence that excites me

Thariq opens with a framework that I wish I'd said first: imagine being given a math problem. Paper is the minimum, a calculator is better, a computer is the most powerful — but each requires different skills. His conclusion: "You want to give it tools that are shaped to its own abilities."

Then the crucial follow-up: "But how do you know what those abilities are? You pay attention, read its outputs, experiment. You learn to see like an agent."

This is exactly how oddkit's tools got shaped. Orient doesn't ask the agent to simultaneously assess and plan. Challenge doesn't ask for solutions — it applies pressure to a single claim. Each tool does one thing that fits how the model actually reasons. Not because I designed it that way from theory. Because I watched what Claude did with earlier versions and adjusted.

Thariq's team did the same thing with the AskUserQuestion tool. Three attempts: first they added questions to the planning tool (confused Claude), then they tried structured markdown output (unreliable), then they built a dedicated tool with structured output and a blocking modal. The deciding factor wasn't theoretical elegance. It was: "Claude seemed to like calling this tool."

Three attempts to arrive at the right shape. I went through a similar sequence with oddkit's orient tool — different scope, same process. Watch, adjust, watch again.

---

## Progressive disclosure: same term, same pain, same solution

This is the convergence that borders on eerie.

When Claude Code launched, they used a RAG database to give Claude context. It worked but was fragile and required setup. More importantly — and this is the key insight — "Claude was given this context instead of finding the context itself."

So they gave Claude a Grep tool. Let it search. As models improved, Claude got better at building its own context. They formalized this as "progressive disclosure": agents incrementally discover relevant context through exploration. Skill files reference other files, Claude reads recursively, finds exactly what it needs.

Thariq writes: "Over the course of a year Claude went from not really being able to build its own context, to being able to do nested search across several layers of files to find the exact context it needed."

This is how oddkit works. The search tool finds relevant canon documents. Those documents reference other documents. The agent reads recursively. No pre-loaded system prompt bloat. Progressive discovery of exactly what's needed.

I arrived at this from Bible translation. In oral translation workflows, you don't hand someone a 1,200-page reference manual. You give them a passage, let them work, and make resources discoverable when they encounter a question. Context finds the need.

Thariq arrived at it from watching Claude choke on bloated system prompts. They even tried putting Claude Code documentation in the system prompt — it added what he calls "context rot" and interfered with the primary job.

Same problem. Same term. Same solution. Different worlds.

---

## When scaffolding becomes handcuffs

The lesson from Thariq's thread that hit hardest was the Todos → Tasks evolution.

Early Claude Code needed a TodoWrite tool to stay on track. They even inserted system reminders every five turns. It helped — until it didn't.

"Being sent reminders of the todo list made Claude think that it had to stick to the list instead of modifying it."

The scaffolding that prevented failure was now preventing adaptation. So they replaced TodoWrite with a Task Tool designed for multi-agent coordination — dependencies, shared updates, the ability to alter and delete mid-flight.

In ODD, I named this the camping risk pattern: detecting when iterative improvement on a current approach has passed the point of productive returns. The todo list was productive until it wasn't. The system reminders were helpful until they became constraints. The only way to know when that transition happens is to observe.

But here's where my experience adds something: the camping risk is invisible from the metrics. The todo completion rate might still look great — 100% checked off. But that doesn't tell you whether those were the right todos, or whether the model was avoiding necessary pivots to maintain a clean checklist.

I learned this pattern watching translation teams. A quality process that once caught real errors can become performative — everyone follows the checklist, but the checklist no longer catches what matters because the failure modes evolved. The tests pass, but they're not testing the right thing.

Thariq saw this in tool design. I saw it in team processes. Same structural failure.

---

## The Guide Agent is oddkit

Thariq's description of the Claude Code Guide Agent is where I genuinely laughed.

Problem: Claude didn't know enough about Claude Code itself. Users would ask about MCPs or slash commands and get nothing useful.

Option 1: Put all the docs in the system prompt. Rejected — context rot, interference with the primary job.

Option 2: Give Claude a link to docs and let it search. Better, but Claude loaded too many results trying to find the right answer.

Option 3: A subagent with extensive instructions on how to search docs well and what to return.

That's oddkit. Not metaphorically. Structurally. An MCP server that an agent calls when it needs epistemic context. Search, retrieval, and validation on demand. No system prompt bloat. The agent asks, oddkit finds the relevant canon, the agent gets exactly what it needs.

They built a subagent for one domain. I built an MCP server for any domain. Different scope, identical pattern.

---

## What excites me about this

Here's the thing: the Claude Code team has a year of hard-won lessons about how agents actually behave. I have fifteen years of hard-won lessons about how knowledge transfer actually fails — plus six weeks of intense iteration turning those lessons into operational tooling.

We don't need to rebuild each other's work. We need to share it.

The 5B method — Borrow, Bend, Break, Beget, Build — exists precisely for this moment. When someone else has already solved a layer of your problem, you don't duplicate their effort. You borrow what works, bend what almost works, break what doesn't fit to reveal the boundary, let them carry what they carry well (beget), and build only the irreducible minimum that nobody else can carry.

Thariq's lessons about tool design, progressive disclosure implementation, and capability evolution? That's a direct borrow. His team has better signal on agent behavior than anyone outside Anthropic. I don't need to rediscover those patterns.

What I carry that his thread doesn't address: what happens after the agent finds the right context? How do you know the context is verified? How do you detect when documentation has silently drifted from reality? How do you ensure that what gets encoded today is still trustworthy when a different agent in a different tool retrieves it next month?

The Claude Code team makes the tool surface excellent. ODD makes the knowledge that flows through those tools trustworthy. These aren't competing. They're complementary layers.

And the changelog proves the approach works. Fifty-one versions in thirty-four days wasn't a pre-planned sprint. It was pain-driven iteration — the same "use only what hurts" principle Thariq describes when he talks about building tools by watching what Claude actually does. The difference is timeframe: his team had a year of patient observation. I had a decade and a half of accumulated pattern recognition that compressed into weeks once the tooling caught up.

---

## The real lesson: see clearly, share freely

Thariq closes with: "Designing the tools for your models is as much an art as it is a science. Experiment often, read your outputs, try new things. See like an agent."

I'd add: and when you find that someone else has already seen what you're seeing, don't rebuild it. Share it. The most expensive work is work that didn't need to be done because someone else already carried it.

Three independent practitioners — Shoemaker, Thariq's team, and me — arrived at the same structural conclusions in 2026 from three different directions. A developer building a coding toolkit. A team building the agent harness itself. A systems thinker who spent fifteen years watching knowledge transfer fail across languages, organizations, and tools.

All three arrived at: context on demand beats context upfront. Tools must fit actual abilities, not theoretical plans. What helped yesterday may constrain you tomorrow. Verification must be structural. And the only way to know any of this is to watch — really watch — what's actually happening.

That's not just convergence. That's the shape of the problem becoming visible to anyone willing to look.

See like an agent. Verify like a translation team. Share like it matters — because the work not done is the most valuable work of all.

---

*This is the second in a series of convergence essays. The first — [The Harness and the Operating System](klappy://writings/the-harness-and-the-operating-system) — maps how Ben Shoemaker's AI Coding Toolkit independently arrived at the same patterns. If you want the deeper roots, [The Most Expensive Problem](klappy://writings/the-most-expensive-problem) is where the pattern first becomes visible.*

*Thariq's full thread: [@trq212 on X](https://x.com/trq212/status/2027463795355095314)*
