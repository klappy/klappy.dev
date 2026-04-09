---
uri: klappy://docs/agent-architecture/sub-agents
title: "Sub-Agents"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["agents", "tools", "mcp", "implementation"]
---

# Sub-Agents

> How klappy.dev applies cognitive partitioning to tool-heavy agent systems.

## Description

In klappy.dev, adding tools or MCP servers directly to a single "main" agent can
increase decision paralysis and degrade reliability.

Sub-agents are used to isolate tool usage behind narrowly scoped reasoning
contexts that already know how to use a specific tool correctly.

This document is the reference implementation layer: concrete guidance for this
repo, not a universal principle.

## Outline

- When to introduce a sub-agent
- Tools vs sub-agents (the pairing rule)
- Scope contract (what a sub-agent is allowed to do)
- Outputs and promotion
- Common failure modes

---

## When to Introduce a Sub-Agent

Introduce a sub-agent when:
- a tool is powerful but brittle
- tool choice dominates reasoning time
- repeated misuse happens despite prompt constraints
- the "main" agent succeeds in isolation but fails during integration

---

## Tools vs Sub-Agents (Pairing Rule)

Tools increase capability.
Sub-agents reduce choice.

**Rule of thumb:**
If adding a tool increases decision complexity more than it reduces execution cost,
pair it with a specialist sub-agent that uses that tool and emits bounded outputs.

This is "Unix philosophy," but applied to agents: small specialists with explicit
inputs/outputs.

---

## Scope Contract

A sub-agent:
- owns one responsibility (one tool or one narrow workflow)
- returns explicit outputs (no hidden state assumptions)
- does not expand its own scope without evidence

---

## Outputs and Promotion

Sub-agent outputs should be:
- explicit (named, structured, and quotable)
- promotable (eligible to become decisions/patterns later)
- attributable (easy to trace back to the run/attempt)

---

## Common Failure Modes

- Premature sub-agents (created before real pressure exists)
- Sub-agents accreting responsibilities ("just one more thing")
- Treating sub-agents as personas instead of constraints
- Adding tools without narrowing decision surfaces

---

## See Also

- [Cognitive Partitioning](/odd/cognitive-partitioning.md) — Universal concept
- [Tool Specialization](/canon/methods/tool-specialization.md) — General pattern
