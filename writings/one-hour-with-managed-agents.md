---
uri: klappy://writings/one-hour-with-managed-agents
title: "One Hour with Claude Managed Agents"
subtitle: "From 'what is this' to an autonomous PR — and what it revealed about epistemic infrastructure"
slug: one-hour-with-managed-agents
author: Klappy
type: essay
audience: public
public: false
date: 2026-04-09
epoch: E0007
description: "What happens when you wire an epistemic guidance system into Anthropic's new agent infrastructure? A systems architect discovers the answer in sixty minutes."
hook: "An autonomous agent searched before claiming, admitted what it didn't know, refused to guess — and then filed a PR fixing the bug we discovered together."
og_title: "One Hour with Claude Managed Agents"
og_description: "From announcement to autonomous PR in sixty minutes. What happens when epistemic discipline meets managed infrastructure."
twitter_card: summary_large_image
twitter_title: "One Hour with Claude Managed Agents"
twitter_description: "An agent searched before claiming, refused to guess, and filed a PR fixing its own search bug. Here's what happened."
tags: [managed-agents, oddkit, epistemic-infrastructure, MCP, proof-of-concept, vodka-architecture]
derives_from: "canon/values/axioms.md, canon/principles/vodka-architecture.md"
complements: "writings/when-skills-arent-enough.md"
---

# One Hour with Claude Managed Agents

> An autonomous agent searched before claiming, admitted what it didn't know, refused to guess — and then filed a PR fixing the bug we discovered together. All in sixty minutes from first seeing the announcement.

## Summary

On April 8, 2026, Anthropic launched Claude Managed Agents — hosted infrastructure for running autonomous AI agents. The next morning, within one hour of seeing the announcement, I had an oddkit-powered agent running on their platform, proving that epistemic discipline survives managed infrastructure. The agent didn't just work. It revealed a real search bug in oddkit's own codebase, and a second agent autonomously fixed it and filed the PR. This essay documents what happened, what it means, and why the interesting part isn't the speed.

---

## The Morning After Launch Day

My colleague Jesse had dropped a link in our group chat the night before. Anthropic had launched something called Claude Managed Agents — a hosted service for running long-horizon AI agents with built-in infrastructure: containers, tool execution, state management, and streaming. I saw it the next morning over coffee.

I'd been building oddkit — an open-source epistemic guidance system that runs as an MCP server — for months. The whole premise is that AI agents need more than tools. They need *epistemic discipline*: the ability to verify before claiming, search before asserting, and admit ignorance when they haven't checked.

So when I saw that Managed Agents natively supported MCP servers in agent configurations, the question was immediate: does the epistemic posture survive someone else's harness?

## The First Spike — Does Proactive Posture Survive?

I didn't theorize. I read the docs, then built.

The agent configuration was minimal: a system prompt containing the Identity of Proactive Integrity — four axioms that govern how oddkit-powered agents behave — plus oddkit wired in as an MCP server. Fifteen minutes of doc-reading, three API calls (create agent, create environment, start session), and the agent was live.

The test was deliberate. I asked the agent about ODD's foundational axioms and the "Vodka Architecture" pattern — topics that exist only in oddkit's knowledge canon. If the agent guessed instead of searching, I'd see it immediately.

The event log told the story: eight proactive oddkit calls before generating a single word of response. Two searches, five document fetches, one catalog query. No prompting to use the tools. The system prompt was enough.

And then the response arrived — and this is the part that matters more than speed.

The agent found the four axioms in canon and presented them accurately. But it *didn't* find "Vodka Architecture." Instead of guessing, it said so explicitly: "After searching the full 411-document index, there is no pattern called 'Vodka Architecture' in the ODD canon." It asked me for a source before it would make any connection.

My colleague Birch captured the significance better than I could: "It admitted what it didn't find and it refused to guess. Very cool."

That's not a feature. That's a value system working.

## The Bug in the Honest Answer

But the honest answer was also wrong — or at least incomplete. Vodka Architecture *does* exist in the canon. A document was committed weeks ago at `canon/principles/vodka-architecture.md`. So why didn't the agent find it?

I dug in. Two bugs, both real.

First: Cloudflare KV, where oddkit caches its search index, is eventually consistent. Two requests seconds apart can hit different edge caches. The agent's session hit a stale 411-document index; a search from my own session thirty seconds later hit the fresh 455-document index that included the Vodka Architecture doc.

Second: BM25 — the search algorithm — has no phrase awareness. The agent searched for "Vodka Architecture pattern." BM25 tokenizes those three words independently. "Pattern" appears in dozens of documents (Prompt Architecture, History Folder Pattern, ADR patterns...), diluting the signal from the rare, precise term "Vodka." The exact document titled "Vodka Architecture" got buried under noise.

The epistemic honesty that impressed my colleague was *correct behavior given bad search results*. The agent didn't hallucinate — but it also didn't find what was there. That's a different kind of failure, and a useful one.

## The Second Agent Files a PR

So I spun up a second Managed Agent — this one configured as a coding agent with oddkit and GitHub access — and described the two bugs.

The agent cloned the repo, read the pre-work checklist from AGENTS.md, called `oddkit_orient` to assess the task, called `oddkit_preflight` to check constraints, read the calling code in three files to understand context, made surgical edits to the BM25 implementation (both the Worker TypeScript and the Node.js version), added index freshness verification to the cache layer, committed, pushed, and created PR #72.

Before claiming done, it called `oddkit_validate`. The validator flagged that it hadn't provided visual proof or bumped the index version. The agent addressed both honestly — explaining that backend-only changes have no UI to screenshot, and that the BM25 changes don't affect the persisted index schema. Then it encoded its DOLCHE session journal and persisted it to the project ledger.

168 events. 5 MCP calls. 32 tool calls. Three files changed, +80/-4 lines. I didn't touch it.

## What This Actually Means

It's tempting to focus on speed. One hour from announcement to working proof-of-concept to autonomous PR. But speed isn't the insight.

The insight is about *layers*.

Anthropic built infrastructure: containers, state management, tool execution, scaling. That's Layer 1. The market will eventually compete on Layer 4 — vertical applications for specific industries. But between infrastructure and product, there's a gap. Agents need to know not just *what tools they have*, but *how to reason about when to use them, what counts as evidence, and when to admit they don't know*.

That's the epistemic layer. The protocol (oddkit) is open. The infrastructure (Managed Agents) is Anthropic's. The gap between them is where the interesting work begins.

The agent that searched before claiming, admitted what it didn't find, and refused to guess didn't do those things because of infrastructure. It did them because of values — four axioms loaded into a system prompt, backed by a knowledge canon accessible through an MCP server. The infrastructure made it *possible*. The epistemic discipline made it *trustworthy*.

## What I Learned

Building something real in someone else's brand-new infrastructure, on launch day, taught me a few things I wouldn't have learned by reading docs:

**MCP servers in Managed Agents are first-class.** They're declared at agent creation and available to every session. Permission policies can auto-approve trusted servers. MCP tool calls appear as `agent.mcp_tool_use` events in the session trace — fully observable and auditable.

**Model selection is agent design, not a global default.** All three agents in this session ran on Sonnet 4.6 — deliberately chosen to prove the pattern cheaply before spending Opus tokens. But there's a cost to that choice: in practice, Sonnet-authored code produces more issues for review agents to catch than Opus-authored code does. The right pairing is Opus for authoring, Sonnet for review. Sonnet is literal and flag-happy — exactly what you want in a reviewer, not necessarily what you want writing the code. Model selection per agent role, not one size fits all.

**The system prompt is sufficient for proactive behavior — today.** The agent called oddkit tools without being asked, purely from system prompt instructions. Whether that holds under adversarial conditions or at scale is an open question, but for a proof of concept, it works.

**Honest failures are more valuable than plausible successes.** The Vodka Architecture miss led directly to discovering two real bugs. A hallucinated answer would have looked correct and taught me nothing.

**Infrastructure you don't build is infrastructure you don't maintain.** Managed Agents handles containers, state, error recovery, and scaling. That's months of work I didn't have to do and won't have to maintain. The Vodka Architecture principle — "thin, clean, stateless over stateful" — applies to the whole stack, not just my code.

---

*The agent configuration, event logs, and PR are all public. If you want to see what an oddkit-powered Managed Agent looks like in practice: [PR #72](https://github.com/klappy/oddkit/pull/72).*
