---
uri: klappy://canon/methods/dispatch-paths
title: "Dispatch Paths for Spawned Agent Sessions — Assistant-Orchestrated vs Autonomous-Trigger"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: draft
tags: ["canon", "methods", "spawned-agent-sessions", "dispatch", "assistant-orchestrated", "autonomous-trigger", "agent-runtime", "vodka-architecture"]
epoch: E0009
date: 2026-05-11
derives_from: "canon/methods/spawned-agent-session-runtime-contract.md, canon/methods/persona-shaped-agent-runtime.md, canon/methods/trigger-source-taxonomy.md, canon/principles/agents-need-their-own-wire.md, canon/constraints/mode-discipline-and-bottleneck-respect.md"
complements: "canon/methods/trigger-source-taxonomy.md, canon/methods/spawned-agent-session-substrate-options.md"
governs: "How any consumer chooses between dispatching a runtime via an assistant in a chat session versus wiring an autonomous trigger that invokes the runtime with no assistant in the loop. Substrate-neutral. Pairs with trigger-source-taxonomy: this doc names the two dispatch classes; trigger-source-taxonomy names the input edges that wake the autonomous-trigger class."
status: proposed
---

# Dispatch Paths for Spawned Agent Sessions — Assistant-Orchestrated vs Autonomous-Trigger

> Every spawned-agent-session invocation arrives via one of two paths. **Assistant-orchestrated** — an assistant (Claude, OpenCode, etc.) in a chat session dispatches a runtime invocation, waits for the result, and consumes it on behalf of an operator who is watching. **Autonomous-trigger** — an external event (webhook, queue message, alarm, object-store notification, AMS frame) wakes the runtime with no assistant in the loop; the runtime processes and emits to a configured target. The two paths differ on a single binary axis: **is there an assistant receiving the result inline?** If yes, assistant-orchestrated. If no, autonomous-trigger. The path determines what the runtime can assume about clarification, error surfacing, and downstream consumption. Use cases that look like a third path (sub-agent RPC, chained workflows, scheduled re-validation) decompose into multiple invocations, each falling cleanly into one of the two paths.

---

## Summary — Two Paths, One Axis

Every consumer of a spawned-agent-session runtime chooses a path before any code is written. The choice is binary and binding: the runtime's invocation contract is the same either way (`runtime.invoke(persona, mode, role, surface, engagement, task)` per `canon/methods/persona-shaped-agent-runtime.md`), but the *deployment shape* and what the runtime can assume about its caller diverge sharply.

**Assistant-orchestrated** is the path the `managed-agents` skill at `skills/managed-agents/SKILL.md` implements. Claude in a chat session uses a tool to dispatch a Managed Agent (or any runtime); the dispatch is synchronous-ish polled; results return to the chat session; the operator reads them through the assistant. Clarifying questions can be surfaced back to the operator inline. Errors get explained in chat. The assistant is the consumer of record.

**Autonomous-trigger** is the path the AMS audit gate (forthcoming), Oddie-on-TinCan, and every "X happens → persona processes" workflow takes. An external event wakes the runtime. There is no chat session, no inline operator, no inline assistant. Clarifying questions are incoherent — there is no listener. Errors must emit to a configured channel (PR comment, Slack message, journal entry), not to a void. The runtime is its own consumer.

**The single decision rule.** Pick the path by asking: *when the runtime returns, who reads the result first?* If a human via a chat assistant — assistant-orchestrated. If anything else (a webhook responder, a PR comment, a downstream worker, an AMS subscriber, a database write, an email) — autonomous-trigger. The two paths are not interchangeable. Wiring autonomous-trigger but treating it like assistant-orchestrated (e.g., a persona emitting clarifying questions into a Slack webhook that no one is watching) is the most common failure mode this doc exists to prevent.

---

## What Each Path Demands

### Assistant-Orchestrated

The runtime can assume an assistant is downstream. That assistant can:

- **Receive clarifying questions inline.** The persona profile's `engagement=assistant` setting (per `canon/methods/persona-shaped-agent-runtime.md`) is valid here. The persona may pause and ask.
- **Interpret errors.** A runtime failure surfaces as a tool error in the assistant's tool-call list; the assistant explains it to the operator and proposes next steps.
- **Compose multi-step work.** The assistant can dispatch, inspect, re-dispatch with different parameters, then summarize. The runtime sees independent invocations; the assistant holds the thread.

Deployment shape: typically synchronous polling (dispatch → wait → result), bounded session lifetime, the assistant's chat session is the orchestrator. Substrate fit per `canon/methods/spawned-agent-session-substrate-options.md`: any substrate that supports one-shot dispatch — Anthropic Managed Agents, Cloudflare Sandboxes, self-hosted loops. Project Think and Durable Objects work but are over-engineered for this path.

### Autonomous-Trigger

The runtime cannot assume any downstream listener for clarifications. Everything the runtime emits must land in a configured channel known at deployment time. That means:

- **Engagement MUST be `agent`** per `canon/constraints/mode-discipline-and-bottleneck-respect.md`. The persona makes calls and proceeds; clarifying questions emitted to a void are incoherent.
- **Errors emit to a configured target.** A failure mode that would have been an explanation-to-the-operator becomes a structured emission (PR review-comment, Slack alert, journal entry, AMS frame on an error topic). The deployment names the target; the runtime emits.
- **No multi-step assistant orchestration.** Multi-step workflows decompose into chained autonomous-trigger invocations (one runtime's emission triggers the next), or into a durable workflow primitive (`canon/methods/spawned-agent-session-substrate-options.md#cloudflare-dynamic-workflows`), or into a sub-agent typed RPC from one persona to another. The assistant is not in the chain.

Deployment shape: event-driven, often long-lived hibernation between events. Substrate fit: Durable Objects + Agents SDK are the natural fit (native trigger-surface diversity, free hibernation). Sandboxes and Managed Agents struggle — neither hibernates well and neither has native multi-trigger surfaces.

The trigger source itself is from `canon/methods/trigger-source-taxonomy.md` — that doc enumerates nine sources (HTTP webhook, WebSocket message, scheduled alarm, sub-agent typed RPC, queue consumer message, object-store event, inbound email, platform webhook, push notification) and the three-method dispatch-routing trichotomy that maps payloads to invocation tuples. This doc names which dispatch class those triggers belong to; trigger-source-taxonomy names how the routing function resolves the tuple.

---

## Prior Art

The distinction is not novel as a category. Messaging architecture names "request-reply" (synchronous caller-knows-callee) versus "publish-subscribe" (asynchronous many-to-many). Serverless platforms distinguish "synchronous invocation" (caller waits) from "event-driven invocation" (caller fire-and-forget). The contribution of this doc is the specific binding to the persona-shaped runtime's `engagement` dimension: assistant-orchestrated permits `engagement=assistant`; autonomous-trigger forbids it. Naming the canonical pairing prevents teams from re-deriving the rule per deployment.

`canon/principles/agents-need-their-own-wire.md` is the principle this doc operationalizes for the dispatch layer. That principle names the cost of human-as-relay across agents; autonomous-trigger is the path that *removes* the human from the relay. Assistant-orchestrated is the path that *retains* the human as relay deliberately, because the operator wants oversight for that particular invocation.

---

## Decision Tree

The choice flows from the consumer's question, not the runtime's:

1. **Is an operator actively waiting for this result, watching their chat session?** → Assistant-orchestrated. The runtime's job is to return useful output for the assistant to summarize.
2. **Will the result be consumed by code, a webhook responder, a PR comment, a database, or another runtime invocation?** → Autonomous-trigger. The runtime emits to the configured target; nobody is waiting inline.
3. **Both** (the operator wants to be notified *eventually* but is not watching) → Autonomous-trigger with notification emission. Operator notification is one of the runtime's configured outputs, not a return value.
4. **Mixed** (some operators watch via assistant, others receive notifications) → Two separate deployments wiring the same persona to the two different dispatch paths. The runtime is the same; the dispatch wiring differs.

There is no fourth case. A use case that resists this decomposition usually has an unstated multi-step workflow inside it; surface the workflow, then each step picks a path.

---

## Confidence and Retraction

**Working belief, two implementations.** The two-path framing is consistent with the deployed `managed-agents` skill (assistant-orchestrated) and the in-design AMS audit gate (autonomous-trigger). It has not been pressure-tested against a third deployment.

**Retraction conditions.** The two-path framing is retracted as canonical if:

- A deployment surfaces a use case that resists decomposition into one of the two paths (e.g., a hybrid where the assistant is in the loop for some emissions and absent for others, in a way that cannot be modeled as multiple invocations).
- The persona-shaped-agent-runtime's `engagement` dimension grows a third valid value that does not map to either path.
- An implementation discovers that the binary distinction collapses in practice — e.g., assistant-orchestrated invocations that emit to configured channels behave identically to autonomous-trigger invocations that surface clarifications via a back-channel.

The first two non-AMS consumers to wire the runtime will produce signal on whether the two paths hold or need a third.

---

## See Also

- [Spawned Agent Session Runtime Contract](klappy://canon/methods/spawned-agent-session-runtime-contract) — the five-dimension contract both paths invoke
- [Persona-Shaped Agent Runtime](klappy://canon/methods/persona-shaped-agent-runtime) — the runtime layer that owns the `engagement` dimension this doc constrains
- [Trigger-Source Taxonomy](klappy://canon/methods/trigger-source-taxonomy) — companion doc that enumerates the input edges for the autonomous-trigger path
- [Agents Need Their Own Wire](klappy://canon/principles/agents-need-their-own-wire) — the principle that autonomous-trigger operationalizes (no human-as-relay)
- [Mode Discipline and Bottleneck Respect](klappy://canon/constraints/mode-discipline-and-bottleneck-respect) — the constraint making `engagement=agent` mandatory for autonomous-trigger
- [Substrate Options](klappy://canon/methods/spawned-agent-session-substrate-options) — substrate fit notes per path
