---
uri: klappy://canon/observations/time-blindness-axiom-violation
title: "Time Blindness — The Axiom Violation Hiding in Every Model"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "observation", "time", "axiom-1", "axiom-4", "models", "perception", "oddkit", "truthkit", "epistemic-primitive", "harness"]
epoch: E0008.1
date: 2026-04-11
derives_from: "canon/values/axioms.md"
complements: "canon/constraints/telemetry-governance.md, docs/appendices/epoch-8.md, docs/appendices/epoch-8-1.md, docs/appendices/epoch-8-2.md"
governs: "Time-related claims in AI-augmented workflows; tool capability assertions"
status: active
---

# Time Blindness — The Axiom Violation Hiding in Every Model

> Models have no perception of time. Not degraded perception — zero. They infer elapsed time from context clues the way a person might guess the season from a photograph. Sometimes they guess right. Often they guess wrong. And when they guess wrong, they guess confidently. We built a clock and put it in the model's hand. It worked — and exposed two deeper problems: models can't use tools without narrating every step (unbearable in voice), and models deny capabilities they have without checking their own toolset (Axiom 4 turned inward). Time blindness was one problem. Giving the model a clock revealed three.

---

## Summary — Time Is Reality, and Models Don't Observe It

Models fabricate timelines from token patterns. The LLM message format — `{role, content}` — carries no timestamps. A model cannot distinguish whether the last message was sent 30 seconds ago or 3 days ago. This violates Axiom 1 (Reality Is Sovereign) and Axiom 4 (You Cannot Verify What You Did Not Observe). The fix has two phases: oddkit adds `server_time` to every response envelope and `oddkit_time` as a stateless interval calculator (shipped), and TruthKit will inject `elapsed_since_last` into every context window at the harness level (future).

Live testing revealed two additional problems beyond time blindness. First, tool gracelessness: models narrate every tool call aloud, making tool-based time tracking unbearable in voice — and this applies equally to MCP tools and platform-native tools like `user_time_v0`. Second, capability denial without observation: the model claimed it couldn't track time without ever checking its own toolset, where a platform-native time tool was available from the start. All three problems point to harness-level time injection as the solution. The tool offers. The harness requires.

---

## The Problem

Every model — voice, text, reasoning — operates on token sequences with no ground truth about when those tokens were produced, how much time passed between turns, or whether the conversation spans minutes or days. The model invents a timeline from contextual signals: message length, topic drift, phrases like "let's continue" or "good morning."

This invention is invisible. The model doesn't flag uncertainty about time. It presents its fabricated timeline as fact.

### What it looks like

- A user sleeps on a problem and resumes the next morning. The model says "we've been at this for hours" — factually wrong, it's been eight hours and the user is fresh.
- A user takes a 10-minute break. The model says "you should take a break, we've been going hard" — timing advice from a system that cannot tell the difference between 10 minutes and 10 hours.
- Two concurrent conversations produce artifacts. The model has no way to determine which happened first, which is more recent, or whether they overlap.
- A session spans a day boundary. The model doesn't know it's tomorrow. It doesn't know it's the weekend. It doesn't know the user changed timezones.
- The model estimates a task will take "a few minutes" without knowing how long anything has taken so far.

These are not edge cases. They are the default experience.

---

## The Axiom Violations

### Axiom 1 — Reality Is Sovereign

> The state of the world as it actually is always takes precedence over any claim, plan, model, or expectation. Observe before asserting.

Time is a dimension of reality. The model has never observed it. Every time-related statement the model makes is an assertion without observation — the exact behavior Axiom 1 was written to prevent.

### Axiom 4 — You Cannot Verify What You Did Not Observe

> Only direct observation of actual state constitutes verification. If you didn't look, you don't know.

The model has not looked at a clock. It has inferred one from token patterns. Inference is not observation. The model does not know what time it is, how much time has passed, or when the user last spoke. It has guessed all three.

---

## The Fix: Time as a First-Class Epistemic Primitive

Time measurement should be as fundamental to epistemic systems as evidence tracking. Not a feature. Not an optional signal. A primitive — something so basic that its absence is a defect.

### In oddkit (now): `server_time` in every response

Every oddkit tool response includes `server_time` in the debug envelope. UTC. ISO 8601. Millisecond precision. Every call.

```json
{
  "action": "search",
  "result": { ... },
  "debug": {
    "server_time": "2026-04-11T19:47:32.123Z",
    "duration_ms": 342
  }
}
```

The model receives a ground-truth timestamp every time it calls oddkit. It can compare consecutive timestamps. If the gap is 8 hours, the user slept. If it's 90 seconds, the session is continuous. No guessing required.

This is cheap. One `new Date().toISOString()` call. Adds nothing to latency. Breaks nothing in existing contracts. The timestamp goes in the debug envelope — the same place trace data already lives.

But it is opt-in. The model has to call oddkit to receive a timestamp. Between calls, the model is still time-blind.

### In TruthKit (future): time as harness-level governance

TruthKit wraps every LLM invocation. The model doesn't call TruthKit — TruthKit calls the model. This inversion means TruthKit can inject time evidence into every context window without the model choosing to ask for it.

Every LLM invocation receives:

- `session_start` — when this session began
- `last_response_at` — when the model last responded
- `elapsed_since_last` — seconds since the last exchange
- `current_time` — right now, UTC

The model never has to ask what time it is. It just knows, because the harness observed it and told it. The difference between a tool and a harness: **the tool offers, the harness requires.**

Every DOLCHE encode already captures a moment. Adding timestamps to the encode means the DOLCHE stream becomes a timeline — decisions, observations, and learnings are situated in time, not floating in an unordered list.

### The cost

A `Date.now()` comparison costs microseconds. A datetime comparison costs less than a single token of generation. The cost of time measurement is negligible. The cost of time blindness is fabricated reality presented as fact.

---

## Why This Isn't Solved by System Prompts

System prompts can say "today is April 11, 2026." They cannot say "the user's last message was 8 hours ago." They are injected once, at the start of a conversation. They do not update between turns. They provide a calendar date, not a timeline.

MCP servers like oddkit operate within the conversation. They respond in real time. Each response is an opportunity to provide a fresh, accurate timestamp — not a stale one from the system prompt.

---

## Why This Isn't Just About Timestamps

Timestamps are the implementation. The insight is deeper: **models are blind to an entire dimension of reality, and nobody is treating it as a defect.**

Time shapes everything:
- Urgency — is this due today or next month?
- Freshness — was this information retrieved 2 minutes ago or 2 days ago?
- Continuity — is this the same working session or a new one?
- Pacing — has the user been working for 12 hours straight or 20 minutes?
- Causality — which event happened first?

A model that cannot perceive time cannot reason about any of these. It can fake reasoning about them — and does, constantly — but the reasoning is built on fabricated premises.

This is the same category of problem as the stale cache incident: a system that looks like it's working but is quietly wrong about something fundamental. The cache lied about content freshness. Models lie about time. Both violations are invisible until you observe the thing that was assumed.

---

## What Happened When We Put the Clock in the Model's Hand

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

### The harness argument

All three problems point the same direction: TruthKit. If the harness injects `elapsed_since_last` into every context window automatically, the model never needs to call a tool. It never reads JSON aloud. It never denies a capability it has. It just *knows* how long you've been gone, the same way it knows what language you're speaking. The tool offers. The harness requires. Tonight proved why the harness matters — not because the tool doesn't work, but because no tool, native or external, can be used gracefully when the model treats every observation as something to announce.

---

## Scope

**oddkit (E0008.2, shipped):** `server_time` in every response envelope. `oddkit_time` tool — stateless interval calculator with three modes (current time, elapsed, delta). Both live in production.

**TruthKit (future):** Time injection at the harness level. `elapsed_since_last` in every context window. Timestamped DOLCHE stream. Session timeline as a first-class data structure. This is where time becomes a *requirement*, not an *offering*.

**Governance:** Consider whether time-awareness belongs in the creed, in the axioms (as an application note), or as a standalone constraint. The axioms already imply it — "Reality Is Sovereign" and "You Cannot Verify What You Did Not Observe" both demand time observation. But the implication has never been made explicit. Making it explicit is the work.

---

## See Also

- [Axioms](klappy://canon/values/axioms) — Axiom 1 and Axiom 4 demand observable reality; time is reality
- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — server_time is infrastructure, not domain opinion
- [E0008.1 — X-Ray Tracing](klappy://docs/appendices/epoch-8-1) — the observability epoch that surfaces this
- [Stale Cache Incident](klappy://docs/incidents/oddkit-stale-cache-2026-02) — same pattern: invisible lies about a time-adjacent property
