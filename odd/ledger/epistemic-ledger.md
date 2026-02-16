---
uri: klappy://odd/ledger/epistemic-ledger
title: "The Epistemic Ledger — Durable Artifacts That Survive Ephemeral Conversations"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["odd", "ledger", "persistence", "handoffs", "decisions", "observations", "learnings", "infrastructure"]
epoch: E0005
date: 2026-02-15
derives_from: "canon/values/axioms.md"
complements: "canon/methods/weighted-relevance-and-arbitration.md, canon/values/trust-kernel.md"
---

# The Epistemic Ledger — Durable Artifacts That Survive Ephemeral Conversations

> The epistemic ledger is the collection of durable artifacts that survive past ephemeral conversations. It is where observations, learnings, decisions, constraints, handoffs, and other project-defined artifact types persist so that collaboration has memory across sessions, tools, and agents. Entries are scoped — later decisions and explicit overrides apply within the scope they were intended, and conflicts between entries are resolved by weighted relevance, not timestamps. Any project using oddkit needs a documented storage mechanism for the ledger — the specific format and location are the project's choice, but the existence of persistent storage is required. Without it, every session starts from zero.

-----

## Summary — Sharpened Memory That Maximizes Focus and Minimizes Context

LLM memory is broken everywhere because people treat it like a journal — append everything, hope relevance emerges. The epistemic ledger is the opposite. It contains only what survived: what was observed, challenged, and encoded. Everything else was ephemeral by design.

This is why the ledger maximizes focus and minimizes context. You're not compressing conversations into memory. You're discarding conversations entirely and keeping only the durable artifacts they produced. The sharpening already happened during the collaboration. The ledger is the result.

The ledger serves three functions: decisions persist via encoding, action persists via handoffs, and results persist via validation. Observations and learnings accumulate as the connective tissue between them. Entries are scoped and later decisions can override earlier ones within their intended scope — conflicts are resolved by weighted relevance, not by assuming the newest entry wins. Together these complete the collaboration lifecycle across any number of sessions, tools, and agents.

-----

## Ephemeral vs. Durable

**Ephemeral** — conversations, drafts, takes, explorations. They happen, they produce value, they don't persist. A conversation is a workspace, not an archive.

**Durable** — observations, learnings, decisions, constraints, principles, handoffs. They survive challenge, get encoded into the ledger, and become the context for future work. A ledger entry earned its place.

The distinction is not about importance. An ephemeral conversation can be the most important session of the project. But its value lives in the durable artifacts it produced, not in the transcript.

-----

## What the Ledger Contains

Observations — things noticed during work that may inform future decisions.

Learnings — insights gained from experience that change how future work is approached.

Decisions — choices made, with rationale, constraints, and alternatives considered.

Constraints — boundaries discovered through experience that govern future work.

Handoffs — actionable transition documents emitted when work crosses a verb boundary.

The ledger does not contain conversation transcripts, brainstorming notes, or raw exploration. Those are ephemeral. The ledger contains only what was encoded — deliberately, with structure, after surviving challenge.

This list is not exclusive. Projects can define additional artifact types through conversation with their agent using oddkit. For example, oddkit projects regularly define PRDs (Product Requirements Documents) as a type used in handoffs — not a core ledger type, but one that emerged from the work and was encoded for reuse. New types and their schemas are defined dynamically as needs emerge, then encoded for durability and reuse within the project's scope. The ledger grows with the work, not ahead of it.

-----

## Handoff Artifacts — How Action Persists Across Tools

A handoff artifact is emitted when work crosses a verb boundary — from deciding to building, from writing to deploying, from exploring to testing. It bridges the gap between tools that don't share context.

A handoff contains: what was decided (references to ledger entries), what's been tried if relevant, the specific next action, the definition of done for that action, and active constraints. An agent reading a handoff cold should be able to act without the conversation that produced it.

An action queue is a collection of pending handoffs, some sequential, some parallel. Results from the receiving tool write back to the ledger, closing the loop.

The handoff format must be tool-agnostic. Any agent that can read the ledger can read the handoff.

Handoffs are not limited to a fixed format. Projects can define their own handoff artifact types as needs emerge — for example, oddkit projects regularly define PRDs (Product Requirements Documents) as a handoff type, not because the system prescribes it but because the work demanded it. New handoff types and their schemas are defined dynamically through conversation with the agent, then encoded for durability and reuse within the project's scope.

-----

## Storage Requirement — Mechanism Is the Project's Choice

Any project using oddkit needs persistent storage for the ledger. The specific mechanism is not prescribed — it could be a folder in the repo, a database, a key-value store, or any other durable storage. What matters is that it exists and is documented so any agent knows where to read and write.

The storage must support: creating new entries, reading existing entries, and discovering what entries exist. Beyond that, the project decides.

-----

## Constraints — What the Ledger Requires

Ledger entries are scoped. A decision made for a specific project, phase, or domain applies within that scope. Later learnings and decisions may override earlier ones. Explicit overrides to default behavior apply in the scope they were intended — not globally unless promoted globally. When entries conflict, the system does not assume the newest wins. Arbitration between competing truths is handled by weighted relevance, not simple timestamps. See `canon/methods/weighted-relevance-and-arbitration.md` for how the system manages conflict between competing entries.

Ledger entries are durable artifacts only — never conversation transcripts. The sharpening happens during collaboration; the ledger stores the result.

The storage location must be documented and discoverable by any agent working on the project.

Handoffs are emitted at verb transitions, not at arbitrary points. The verb change is the signal.

Handoffs must be self-contained. An agent reading one cold must be able to act without the prior conversation.

Results from downstream tools write back to the ledger, closing the loop.

-----

## Why This Matters

Without the ledger, collaboration has no memory. Every session starts from zero. The human becomes the only bridge between sessions, carrying context in their head. The most expensive problem — knowledge transfer failure — reasserts itself inside every project.

With the ledger, the collaboration compounds. Each session builds on what survived. Agents orient against encoded decisions, not stale memories. The human directs instead of translating. Trust is built because expectations are visible, persistent, and verifiable.
