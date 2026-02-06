---
uri: oddkit://why
title: "Why oddkit Exists"
audience: human
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["orientation", "oddkit", "agents", "epistemic-hygiene"]
---

# Why oddkit Exists

> **ODD** = **Outcomes-Driven Development** — see [/odd/README.md](/odd/README.md) for the full philosophy.

oddkit is not an AI agent.

oddkit is a **librarian and validator** that other AI agents use to manage knowledge, restart cleanly, and prove claims with evidence. It is the reference tooling for **ODD (Outcomes-Driven Development)**.

It exists because agentic systems fail in predictable ways:

- They forget why decisions were made
- They confidently answer without citing sources
- They claim work is "done" without proof
- They drift across long sessions or between agents
- They restart with fresh context and re-learn the same lessons

oddkit addresses this by separating **knowledge stewardship** from **task execution**.

---

## What oddkit Is (and Is Not)

**oddkit is:**

- A truth retrieval system with citations
- A validation layer that challenges completion claims
- A memory mechanism for promoting lessons learned
- A portable tool that works across repositories

**oddkit is not:**

- A chatbot
- A one-off agent
- A replacement for reasoning or creativity
- A place to store conversation history

> oddkit helps agents verify truth — not remember conversations.

---

## When oddkit Is Used

oddkit is used by agents at specific moments:

- When they need to **look up rules, definitions, or constraints**
- When they need to **prove that work is complete**
- When repeated failures suggest a **new governing principle**
- When restarting work in a fresh context without misalignment

Humans usually encounter oddkit indirectly — through agents that:

- cite sources instead of hallucinating
- refuse to mark work "done" without evidence
- explain _why_ a rule exists and where it came from

---

## Why This Is Different

Most agent systems optimize for helpfulness.

oddkit optimizes for **epistemic hygiene**:

- Truth over confidence
- Evidence over explanation
- Learning over repetition

This makes agent systems slower at first — and dramatically more reliable over time.

---

## How to Learn More

- To **understand ODD philosophy**: see [/odd/README.md](/odd/README.md)
- To **run oddkit**: see `docs/orchestrator/QUICKSTART.md`
- To **understand validation**: see `docs/agents/validation/README.md`
- To **understand retrieval**: see `docs/agents/librarian/README.md`
- To **understand when Canon changes**: see `docs/promotions/README.md`

If you are an agent using oddkit and feel blocked or confused, run:

```
oddkit explain –last
```

That command exists so the system can explain itself when humans forget.
