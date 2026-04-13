---
uri: klappy://writings/the-feature-i-never-shipped
title: "The Feature I Never Shipped — And Why It's the Best Thing I've Built"
subtitle: "How strategic patience became the 6th B"
author: Klappy
type: essay
audience: public
exposure: public
public: true
tier: 3
voice: first_person
stability: stable
tags: ["writings", "essay", "5B", "bypass", "write-path", "oddkit", "use-only-what-hurts", "strategic-patience", "ai-augmented-workflows"]
epoch: E0007.1
date: 2026-04-04
derives_from: "canon/methods/borrow-bend-break-beget-build.md, odd/constraint/use-only-what-hurts.md"
complements: "writings/learning-in-the-open.md, canon/principles/vodka-architecture.md"
status: active
hook: "I spent months planning a feature. Four sessions. Twenty-five decisions. Two branches. None shipped. Then the problem dissolved on its own."
description: "The story of oddkit's write path — the most planned feature that never shipped — and why strategic patience is sometimes the best engineering. Introduces Bypass as the 6th B in the 5B method."
slug: the-feature-i-never-shipped
og_title: "The Feature I Never Shipped — And Why It's the Best Thing I've Built"
og_description: "I spent months planning a feature. Four sessions. Twenty-five decisions. Two branches. None shipped. Then the problem dissolved on its own."
---

# The Feature I Never Shipped — And Why It's the Best Thing I've Built

> I spent months planning a write path for oddkit — four planning sessions, twenty-five encoded decisions, two feature branches, two pull requests, an implementation spec, a decision record, and an epoch definition. None of it shipped. Then the problem dissolved on its own. The 6th B isn't Build. It's Bypass — the discipline of recognizing that the friction might not be yours to solve.

---

## Summary — Sometimes the Best Engineering Is Strategic Patience

If you've ever stared at a feature branch that's been open for weeks, knowing it's important but knowing it doesn't feel right — this is for you. The instinct to build is strong. The discipline to wait is stronger. This essay tells the story of oddkit's write path: the most planned, most documented, most debated feature in the system's history. It never shipped. And the system is better for it.

---

## The Pain Was Real

Here's what my workflow looked like for months: I'd have a conversation with Claude. We'd produce something worth keeping — a decision, an article, a governance document. Then came the ritual. Copy the content. Open Claude Code. Paste a handoff document. Watch Claude Code try to write files. Watch it time out. Try again. Watch it time out again. Give up. Open my editor. Create the file manually. Copy-paste the content. Commit. Push.

Every session. Every artifact. The same ritual.

Some days were worse than others. I'd be on my phone — the only device available — and Claude Code's mobile client would time out seven times in a row on a single file. Not a complex file. A 287-line markdown document. Seven attempts. Seven failures. The content was right there, fully formed, ready to go. The last mile — getting it from the conversation into the repository — was broken.

I started keeping a mental list of articles I'd written that never made it to the repo. Governance documents that existed only in conversation transcripts. Decisions that were encoded but never persisted. The system was producing valuable work and then losing it in the gap between "I made this" and "it's in the repo."

The frustration built. If you've been in that place — watching good work evaporate because the tooling can't close the loop — you know the feeling. It's not anger at any one tool. It's the accumulated weight of a friction that never gets fixed.

---

## The Obvious Solution: Build It

So I did what any engineer would do. I planned the feature.

I planned it thoroughly. Four full sessions. Twenty-five encoded decisions. An epoch definition — E0005.2, "The Write Path: One Action, Progressive Protection." A decision record. An implementation spec with tiered rollout. Visual diagrams. Team workflow mapping. Two user journey articles.

The design was elegant: one action, `oddkit_write`, that would accept file content and write it to a GitHub repository through the API. Tier 1 would use the simple Contents API for single files. Tier 2 would add atomic multi-file commits through the Git Data API. Tier 3 would add branch creation and pull request support. Tier 4 would add context detection and recommendations.

I even had a constraint for orphan prevention — the write action would track existing branches and update them rather than spawning new ones for every write attempt.

Then I tried to build it.

The first implementation landed on a feature branch: `feature/oddkit-write`. Pull request #56. It had structural gaps. The model that generated it didn't fully understand the spec. The validation logic was incomplete. The API integration had edge cases.

So I commissioned a second attempt. A clean branch: `feature/oddkit-write-v2`. A fresh implementation from a stronger model, with the spec fully loaded and the first attempt available for comparison.

Neither branch ever merged.

---

## Why It Never Felt Right

I kept punting. Week after week. The branches sat there, growing stale. I'd look at the PRs and think: this is important. This solves a real problem. This has been thoroughly planned. Why can't I merge it?

The honest answer took months to arrive: it didn't feel right because it was solving the problem in the wrong layer.

oddkit is a stateless MCP server. Its job is epistemic discipline — retrieval, gating, encoding, validation. It reads the canon and enforces governance. That's it. That's the entire architecture. We'd later name this Vodka Architecture: infrastructure so thin it disappears into whatever it carries.

Adding a GitHub API integration — OAuth flows, content encoding, branch management, conflict resolution, retry logic — would have made oddkit thick. The server would have grown from "epistemic discipline" to "epistemic discipline plus deployment infrastructure." It would have acquired opinions about git workflows that had nothing to do with its core purpose.

Every time I looked at the implementation, I could feel the Vodka Architecture principle pushing back — even before it had a name. The server would have worked. The feature would have been useful. But the architecture would have been wrong. The glass would have gotten heavier than the drink.

---

## The Problem Dissolved

Then, sometime in early 2026, Claude's web interface gained the ability to execute code, run bash commands, and access the network. Not Claude Code — the regular conversation interface. The one I was already using for everything else.

I didn't notice the implications immediately. But the first time I needed to commit a batch of files, I tried something different. Instead of copying content to Claude Code, I just... asked the conversation to push it.

Clone the repo. Create a branch. Copy the files. Commit. Push. Create a PR via the GitHub API. Plain git. Ninety seconds.

No `oddkit_write`. No GitHub Data API integration. No OAuth. No content encoding. No branch management logic. No retry handlers. No orphan prevention. Just git — the tool that already existed, running in an environment that already had network access, authenticated with a token I already had.

The months of planning around `oddkit_write` had been solving the wrong problem. The bottleneck was never "how do we build a write path." The bottleneck was "which environment has the right capabilities." The answer turned out to be: the one I was already sitting in. I just had to wait for it to grow the feature I needed.

---

## The 6th B

I have a method called 5B: Borrow, Bend, Break, Beget, Build. It's a sequence for maximizing the amount of work not done. Before building anything yourself, attempt to borrow what exists, bend it to your context, let the breaks reveal what's missing, offload what you can to others, and only build what nobody else can carry.

The write path story revealed a step the sequence was missing. A step that comes before Borrow — or maybe after Break and before Beget. A step I'd been practicing without naming:

**Bypass.**

Bypass is the discipline of recognizing that the friction you're experiencing might not be yours to solve. Not because it's unimportant — the write path pain was very real. Not because you can't solve it — the implementation spec was solid. But because the problem might dissolve if you give it time.

Bypass is not procrastination. Procrastination avoids the problem. Bypass watches it. You stay aware of the friction. You keep feeling the pain. You keep noting what breaks. But you don't build — because you've observed that the landscape is shifting and the thing you'd build today might be unnecessary tomorrow.

The signals that Bypass is appropriate:

The friction is in a layer you don't own. The write path bottleneck was in Claude's execution environment — a layer Anthropic controls. I could build around it, but I couldn't fix it. And Anthropic had every incentive to fix it themselves.

The problem is widely shared. I wasn't the only person who needed to get content from AI conversations into repositories. Every developer using AI tools had the same last-mile problem. When a problem is shared widely enough, someone will solve it — and their solution will be better than yours because they can solve it at the platform level.

Your workaround is sustainable. The copy-paste ritual was painful but not fatal. Sessions still produced value. Work still got committed — just with more friction than necessary. If the workaround had been truly unsustainable, building would have been justified. "Use Only What Hurts" cuts both ways — if the pain is survivable, the build can wait.

The architecture tells you not to. This is the one that took months to hear. oddkit's architecture was pushing back against the write path not because writing was unimportant, but because writing wasn't oddkit's job. The epistemic discipline layer shouldn't also be the deployment layer. The server should stay thin.

---

## What I Learned

The hardest part of Bypass isn't the waiting. It's the guilt. I had a thorough plan, a clean spec, and two implementations. Shipping would have felt productive. Not shipping felt like failure — like I was afraid to build, or couldn't execute, or was overthinking it.

But oddkit today has zero lines of write-path code and full write capability. The canon grew from zero to over four hundred documents in ten weeks — roughly forty-five per week. That production rate didn't change when the write path dissolved. The documents were always being produced that fast. What changed was where the bottleneck lived. Before, the bottleneck was the last mile — getting finished work from the conversation into the repository. After, that friction disappeared and the bottleneck shifted downstream to review, cross-referencing, and publication. Articles get committed in ninety seconds. Pull requests get created from conversations. The write path works — and I maintain none of it.

If I'd shipped `oddkit_write`, I'd be maintaining a GitHub API integration, handling OAuth token refresh, debugging content encoding edge cases, managing branch conflict resolution, and fielding bug reports every time GitHub changed their API. I'd be carrying infrastructure that has nothing to do with epistemic discipline.

Instead, I carry nothing. The platform caught up. The workaround became unnecessary. The feature I never shipped is the best thing I've built — because I didn't build it.

---

## The Updated Sequence

The 5B method is now 5B+1. The sequence is:

**Bypass** — recognize when the friction isn't yours to solve. Watch, don't build. Stay aware. Let the landscape shift.

**Borrow** — use what exists without modification.

**Bend** — compose or repurpose for your context.

**Break** — identify where borrowed and bent tools fail.

**Beget** — offload to others who can own that piece.

**Build** — only what nobody else can carry.

Bypass doesn't replace Borrow as the first step. It's the step before the sequence starts — the question you ask before entering the method at all: "Is this my problem to solve, or is the world about to solve it for me?"

Most of the time, the answer is: enter the sequence. Build what needs building. But sometimes — when the friction is in a layer you don't own, when the problem is widely shared, when your workaround is sustainable, and when your architecture is telling you not to — the answer is: wait. Not passively. Strategically. With your eyes open and your branches stale.

The best feature of oddkit is one I never committed. And two pull requests sit open to this day, monuments to the discipline of not building.

---

## See Also

- [Method: Borrow, Bend, Break, Beget, Build](klappy://canon/methods/borrow-bend-break-beget-build) — the 5B method this essay extends
- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — the design pattern that told me not to build
- [Use Only What Hurts](klappy://odd/constraint/use-only-what-hurts) — the constraint that governs whether to act
