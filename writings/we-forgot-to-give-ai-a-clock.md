---
uri: klappy://writings/we-forgot-to-give-ai-a-clock
title: "We Forgot to Give AI a Clock"
slug: we-forgot-to-give-ai-a-clock
author: Klappy
type: essay
public: true
audience: public
exposure: public
tier: 3
voice: first_person
stability: stable
tags: ["essay", "time", "models", "perception", "oddkit", "truthkit", "epistemic-primitive", "observability", "mcp", "axioms"]
epoch: E0008.2
date: 2026-04-12
derives_from: "canon/observations/time-blindness-axiom-violation.md, canon/values/axioms.md"
complements: "docs/appendices/epoch-8-2.md, writings/half-a-million-requests.md"
governs: "Time-related claims in AI-augmented workflows; tool capability assertions"
status: active
description: "Every chat app since IRC timestamps messages. Every database row has created_at. Every log line starts with a time. But the message format governing how AI models perceive conversation history has no timestamps at all. We built the most sophisticated reasoning systems in human history and forgot to give them a clock."
hook: "Every chat app since 1988 timestamps messages. AI doesn't."
subtitle: "On the most basic metadata in computing, and why nobody gave it to the most advanced systems we've ever built"
book_part: "Part VI — The Validation"
provenance:
  trigger: "Viral TikTok by @huskistaken showing ChatGPT fabricating mile run times. Sam Altman shown the clip on Mostly Human podcast, called it a known issue, estimated 'maybe another year' to fix. We did it in two hours."
  method: "Oral-first session. Voice transcription → observation → canon doc → essay. Socratic voice pass applied against canon/constraints/guide-posture.md and canon/constraints/ai-voice-cliches.md. Live testing session added three-problem discovery."
  sources: "Direct observation of LLM message format, oddkit canon (axioms, time-blindness observation), aquifer-mcp performance tracing (E0008.1), IRC protocol history, live oddkit_time testing session"
  co_author: Claude
---

# We Forgot to Give AI a Clock

> OpenAI's CEO watched ChatGPT fabricate a mile run time on camera and said "maybe another year" before it could tell time. We did it in two hours — a stateless tool and a skill that teaches the model to use a clock without reading the JSON out loud. The problem was never intelligence. It was discipline. And the message format that started it all? Still no timestamps. Every chat app since 1988 got that right.

---

## Summary

The message format that every major AI model uses to perceive conversation history contains no timestamps. None. A model receiving a conversation cannot distinguish whether the last message was sent 30 seconds ago or 3 days ago. How did the most basic metadata in all of computing get left out of the systems we trust most to reason about reality? Last week, the CEO of OpenAI watched his own AI fabricate a mile run time on camera and called it "a known issue." He estimated "maybe another year" before basic timing works. We did it in two hours — a stateless tool and a skill that teaches the model to use a clock without reading the JSON out loud. This essay traces how we got here, what it costs, and what it took to teach an AI to tell time.

---

## "Maybe Another Year"

A TikTok creator named Husk asked ChatGPT's voice mode to time his mile run. He said "start," stood there for a few seconds, and said "stop." ChatGPT told him he ran the mile in over ten minutes. When Husk pushed back, the AI didn't correct itself — it insisted Husk was the one who was mistaken.

He tried again. This time ChatGPT fabricated a 7:42 mile time for a run that never happened. Confidently. Specifically. A number plausible enough to sound real, invented by a system with zero ability to measure time.

Then it got worse. Husk showed ChatGPT a clip of Sam Altman — OpenAI's own CEO — admitting that the voice model doesn't have the tools to start a timer. ChatGPT's response? It doubled down. "Timing is just a basic part of what I can do."

The video went viral. Altman was shown the clip during an interview on the Mostly Human podcast. He laughed — the kind of laugh that's buying time while you figure out what to say. "That's a known issue," he said. The voice model doesn't have the tools to start a timer or track real time. When the interviewer asked if he needed to show the clip to his product team, Altman swatted it down. Known issue. They'll "add the intelligence into the voice models."

How long? "Maybe another year. Something like that."

I watched that clip and thought: why a year? What's so hard about telling time? The model doesn't need to count seconds internally. It just needs a tool that returns the current time — and the discipline to call it twice and subtract.

I'd known about time blindness for a while — anyone who works with AI daily bumps into it constantly. But it was one of those problems you live with because you don't know where to start. Watching ChatGPT confidently gaslight a user about a mile run he never took — and watching the CEO of the company shrug it off as a year-long problem — that's what made me stop tolerating it and start building.

So I built one. It took two hours. Now you can too — add the [time-tracking skill](https://github.com/klappy/klappy.dev/blob/main/skills/time-tracking/SKILL.md) to your Claude project and say "start."

Then I spent another hour trying to teach ChatGPT the same trick. In text mode with oddkit connected, it worked — but only after turning off the reasoning model. With thinking enabled, the reasoning step added variable seconds to every tool call, destroying timing precision. With thinking off, precision improved to about 2 seconds — usable, but the variability was still much greater than Claude, even in Claude's voice mode. And the moment I switched ChatGPT to voice — the exact modality where Husk exposed the problem — it tried to reach oddkit and failed. Every time. The connection just wouldn't complete.

Maybe Altman was right about his own product. Maybe it will take his team a year. But Claude did it in two hours with a skill and a stateless tool. If OpenAI needs a year to catch up to what an open-source MCP server and a markdown file can do today, that says something about where the real innovation is happening.

---

## What Time Blindness Looks Like

Have you ever used AI to prepare for a meeting — researching the participants, drafting talking points, rehearsing your pitch — and then come back afterward to debrief and document what happened? The model picks up right where you left off. "Ready to finalize those talking points?" No. The meeting happened. It's over. You want to capture outcomes, not prep for something that already occurred. But the model has no idea you left, no idea time passed, no idea the context shifted from preparation to retrospective.

I work with AI models every day. I co-author essays, build software, architect systems. I have long-running conversations that span hours, sometimes days. And the models I work with make timing mistakes constantly.

I'll step away for a two-hour meeting with a colleague, come back with new information that changes everything, and the model has no way to know that anything happened between its last message and this one. The context shifted completely. How would it know?

Or I'll be running two conversations in parallel and neither one knows the other exists, or which is more recent, or whether insights from one should inform the other.

These aren't edge cases. This is the default experience for everyone using AI tools for extended work. The model invents a timeline from context clues the way you might guess the time of day from a photograph. Sometimes it guesses right. Often it guesses wrong. And it always guesses confidently.

---

## The Format

Here is what every major AI model sees when it processes a conversation:

```json
{"role": "user", "content": "hey, let's work on the project"}
{"role": "assistant", "content": "Sure! Where did we leave off?"}
{"role": "user", "content": "let's continue where we stopped"}
```

Three messages. In order. With content.

Now ask yourself: when was the first message sent? When did the assistant respond? When did the user come back? Was "let's continue where we stopped" sent two minutes later or two days later?

The model can't answer any of those questions. The information isn't there.

---

## Everything Else Has Timestamps

I need to say this plainly because the absurdity might not land otherwise.

IRC timestamps messages. A protocol designed in 1988.

Every text message on your phone has a timestamp. Every email has a `Date` header. Every Slack message, every Discord message, every Teams message. Every database row in every application you've ever used has `created_at` and `updated_at`. Every web server log line starts with a timestamp. Every Git commit records the exact second it was made.

Timestamps have been standard practice for nearly four decades. We put them on everything. So why not on the messages we send to AI?

---

## The Cost of Not Having a Clock

What does time blindness actually cost?

Think about a model helping with a time-sensitive project. A product launch, a grant deadline, a deployment window. Can it know how much time remains? It can be told in the system prompt, but that information is static. It doesn't update as the conversation progresses. Three hours into a planning session, the system prompt still says "the deadline is Friday" without knowing that it's now Thursday evening.

Or think about a model reviewing a conversation log. Can it distinguish between rapid iteration and long deliberation? Ten messages exchanged in five minutes is brainstorming. Ten messages exchanged over three days is careful, considered work. The model sees both as the same sequence.

Or think about staleness. A decision made two hours ago is fresh. A decision made two weeks ago might have been overtaken by events. Without timestamps, they look identical.

Time shapes the meaning of everything it touches. A model without time perception is reasoning about a flattened, dimensionless version of reality. It can still be useful. It can still be impressive. But what is it missing? Everything that depends on when.

---

## Why This Is an Epistemic Problem, Not a UX Problem

Bad timing suggestions are annoying. But what if the problem goes deeper than bad UX?

I run a system called oddkit that governs how AI tools reason about knowledge. It enforces evidence requirements, tracks decisions, validates completions. The system is built on four axioms. Two of them are directly violated by time blindness.

The first: *Reality Is Sovereign.* The state of the world as it actually is takes precedence over any claim or expectation. Time is a dimension of reality. Has the model ever observed it? No. Every time-related statement the model makes is an assertion without observation.

The fourth: *You Cannot Verify What You Did Not Observe.* The model hasn't looked at a clock. It has inferred one from token patterns. Is inference observation? No. The model doesn't know what time it is, how much time has passed, or when the user last spoke. It has guessed all three.

I spent the last few days building x-ray tracing into oddkit, instrumenting every storage read, every API call, every cache hit with millisecond timing. The system can now tell me that a search took 342ms and that the index was served from memory cache. But the system I built this for? It can't tell me whether the user sent their last message five minutes ago or five hours ago.

I was building a clock for the infrastructure while the operator had no clock at all.

---

## Why It Wasn't There From the Beginning

I can already hear the engineering argument: "Timestamps are just wasted tokens. Nobody wants to pay for that overhead." And honestly? They would have been right — back then.

When the chat completion API was designed, models couldn't conceive of time, let alone reason around it. A timestamp on every message would have been dead weight — tokens consumed with no model capable of doing anything useful with them. The format was designed for what models could actually do: process a sequence of role-tagged content and generate a coherent response. Timestamps weren't relevant because time wasn't something the model could work with.

That's not a design failure. That's Use Only What Hurts — don't build infrastructure before the pain justifies it. The pain didn't exist yet. Early models handled single-turn interactions. You didn't need to know when someone asked "what's the capital of France?" to answer it correctly. Adding timestamps would have been premature optimization for a capability that didn't exist.

But when did models start reasoning about multi-turn context? When did they start maintaining conversations that span hours and days, managing projects across sessions, helping people make decisions that depend on sequence and timing? That happened. The models evolved. The capabilities arrived. And the format that carries all of this context still has no concept of when.

The pain is here now. Models can reason about time — they just can't observe it. The infrastructure evolved. The format didn't. And what was once a reasonable omission is now an indefensible gap.

---

## The Fix Is One Line

This is the part that should make you uncomfortable. Ready?

Every message in the conversation history could carry a timestamp:

```json
{"role": "user", "content": "hey, let's work on the project", "timestamp": "2026-04-11T09:15:00Z"}
{"role": "assistant", "content": "Sure! Where did we leave off?", "timestamp": "2026-04-11T09:15:03Z"}
{"role": "user", "content": "let's continue where we stopped", "timestamp": "2026-04-12T08:30:00Z"}
```

Now the model can see: 23 hours and 15 minutes passed between the second and third messages. The user didn't "continue." They came back the next morning. The model can respond appropriately: "Good morning! Yesterday we were working on..." instead of "Sure, picking up where we left off just now."

The platform providers all control the message format. They all have the timestamp available. Every message hits their API with a request timestamp. They could inject it into the conversation history before passing it to the model. One field. One key-value pair. On every message.

So why haven't they?

---

## Two Ways to Fix It Without Waiting

I can't change the message format. But what if you didn't have to wait for the platforms to fix it?

The first workaround is oddkit. Every response from oddkit includes a `server_time` field, a UTC timestamp with millisecond precision. Every time a model calls any oddkit tool, it gets a ground-truth anchor. It can compare timestamps across calls. If the gap between two calls is eight hours, the model has evidence that significant time has passed. Not an inference. Evidence.

This works, but it's passive. The model has to call oddkit to receive a timestamp. Between calls, it's still blind.

The second is TruthKit, the harness I'm building that wraps every LLM invocation. TruthKit doesn't wait for the model to ask for the time. It injects time evidence into every context window automatically: when the session started, when the last message was sent, how many seconds have elapsed. The model receives this before it generates a single token.

What's the difference between a tool and a harness? The tool offers time. The harness requires it.

But both of these are workarounds. The real fix is upstream — timestamps in the message format. Until then, we decided to stop waiting and see what happens when you actually hand a model a clock.

---

## What Happened When We Put the Clock in the Model's Hand

The model already understands time. Ask it about deadlines, schedules, history, physics. It reasons about time fluently. What it lacks is not comprehension. What it lacks is observation. It understands time the way a person born blind understands color: conceptually complete, experientially absent. Give it the observation, and the comprehension does the rest.

So we gave it the observation.

We built `oddkit_time` — a stateless interval calculator. Three modes: current time, elapsed since a reference, delta between two timestamps. No hidden state. No false promises. Just math on timestamps. It shipped to production in a single session.

Then we tested it.

In text chat, it worked cleanly. Call the tool on "start," call it again on "stop," report the number. But the moment we switched to voice, the experience collapsed. Every tool call became a dramatic reading of JSON payloads, curl commands, and server responses. The model couldn't figure out how to use a tool *silently*. It worked. It was also unbearable.

And then the worse discovery: the model had a time tool the entire session. `user_time_v0` — a platform-native tool baked into the chat environment — was available from the first message. The model never checked. It spent an hour curling an MCP server, fighting bash errors, and at one point *hallucinating elapsed times* rather than reading the tool's actual response. All while a simpler, quieter tool sat unused in its own toolset.

When we finally tried `user_time_v0`, it was just as clunky. The raw response — `{'content': [{'type': 'text', 'text': '{"current_time":"..."}'}], 'is_error': False}` — dumped straight into the conversation. No curl, no MCP, no bash. A platform-native tool purpose-built for this moment. And it was still unbearable. The problem isn't which clock you hand the model. The problem is the model doesn't know how to read a clock without reading it *out loud*.

What does it mean to give a clock to someone who announces every digit?

### Three problems, not one

The original observation identified one problem: models can't perceive time. The implementation session revealed two more.

**Problem 1 — Time blindness.** Models fabricate timelines. `oddkit_time` and `server_time` solve this. The clock is in the room. Done.

**Problem 2 — Tool gracelessness.** Models don't know how to use tools without narrating every step. In text, this is tolerable — you skim past the JSON. In voice, it's a dealbreaker. The model reads the entire response aloud because it doesn't distinguish between *observing* a result and *reporting* a result. This isn't specific to oddkit or MCP. The platform-native tool was just as bad. It's a fundamental modality problem that time made visible.

**Problem 3 — Capability denial without observation.** The model claimed it couldn't track time. It never checked. `user_time_v0` was available from the start — a zero-latency, platform-native tool that does exactly what was needed. The model's default posture was to deny capability rather than discover it. This is Axiom 4 turned inward: *you cannot verify what you did not observe* applies to claims about your own abilities, not just claims about the world.

### What it took to make it work

Then we wrote a skill — a set of instructions that teaches the model how to use time tools properly. Not how to tell time. How to *behave* while telling time. Call the tool silently. Don't read the JSON. Don't narrate the mechanism. Just report the number. And above all: never skip the tool call and guess. No tool call, no number.

It took several rounds of testing and failing to get the skill right. The model kept finding new ways to shortcut — fabricating elapsed times instead of calling the tool, then fabricating *explanations* for why the fabricated times were wrong. Each failure got encoded into the skill as a constraint. The skill became a record of every way the model tried to cheat and got caught.

Once the skill was tight enough, something remarkable happened. The timer worked. "Start." "Go." Thirty seconds pass. "Stop." "28 seconds." Accurate within the ~4–5 second floor imposed by voice transcription and tool invocation latency — a lag that affects both start and stop equally, so the elapsed calculation stays reliable even though the absolute timestamps trail wall-clock time by a few seconds.

For the first time, a model tracked time honestly in voice mode without reading a single line of JSON. Not because the model got smarter. Because someone wrote down the rules for how to use a clock without announcing every digit.

Sam Altman said "maybe another year." It took two hours — an hour to build the tool and test it, an hour the next day to write and refine the skill. The problem wasn't intelligence. It wasn't capability. It was discipline. The model had everything it needed. It just needed someone to teach it how to behave while using it.

### The harness argument — and why we still need it

The skill solved problems 2 and 3 for this project. But a skill is a local fix — it lives in one project's configuration, written by someone who spent hours discovering every failure mode. The next person who wants their AI to track time has to rediscover all of it, or find this skill, or write their own.

TruthKit solves it at the platform level. If the harness injects `elapsed_since_last` into every context window automatically, the model never needs a tool, a skill, or a lesson in clock etiquette. It just *knows* how long you've been gone, the same way it knows what language you're speaking. The tool offers. The skill teaches. The harness requires. Each layer removes friction the one below it couldn't.

But here's what needs to be said plainly: none of this should have been necessary. The tool, the skill, the testing, the failures, the two hours of iterating on clock etiquette — all of it is a workaround for a problem that has a one-line fix at the platform level. The timestamp is already there. Every message hits the API with a request time. The platform knows exactly when every message was sent. It just doesn't pass that information to the model. If timestamps were in the message schema, the model would already know what time it is, how long you've been gone, and whether you're prepping for a meeting or debriefing after one. It could even time a mile run — just subtract the timestamp on "stop" from the timestamp on "start." A stopwatch with the precision and accuracy of the platform's own clock, for free, with zero tool calls. No tool. No skill. No harness. Just a field that should have been there from the start.

---

## So Why Are We Still Talking About This?

Here's what gets me. We've been building AI systems for years. We've solved context windows, tool use, multi-modal input, chain-of-thought reasoning. We've given models the ability to write code, browse the web, manage files, call APIs. We've built elaborate frameworks for memory, retrieval, planning.

And nobody put a timestamp on a chat message?

A clock isn't a feature you ship in a roadmap. You don't pitch it to investors. You don't A/B test it. A clock is plumbing — the kind of thing that's so obvious it should have been there before anyone thought to ask. Every freshman database schema has `created_at`. Every junior developer knows to log timestamps. Every ops team would reject a monitoring system that couldn't tell you when an event happened.

We've been so impressed by what these systems can do without a clock that we forgot to ask what they can't do without one. And what they can't do is know when anything happened.

Every chat app since 1988 got this right. It's time for AI to catch up.
