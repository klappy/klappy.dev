---
uri: klappy://canon/methods/planning-queue
title: "The Planning Queue — Implementation-Ready Specs That Wait Until They Hurt"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["canon", "methods", "planning", "queue", "ledger", "use-only-what-hurts", "convention"]
epoch: E0005
date: 2026-02-18
derives_from: "odd/constraint/use-only-what-hurts.md, odd/ledger/epistemic-ledger.md, canon/definitions/epistemic-modes.md"
complements: "writings/the-drift-queue.md, docs/appendices/synthesis-ledger.md, docs/appendices/convention-requires-an-enforcer.md"
governs: "docs/planning/ directory and all planning documents within it"
---

# The Planning Queue — Implementation-Ready Specs That Wait Until They Hurt

> The planning queue is a collection of implementation-ready specs stored in `docs/planning/` that are fully documented but deliberately not yet built. Each doc is a ledger entry of type "planned work" — writing-canon compliant, derivation-traced, constraint-reviewed, and specific enough that any agent can pick it up cold and execute. The drift queue surfaces what's stale. The planning queue surfaces what's ready to build. Both are governed by Use Only What Hurts: you pick up a planning doc when the pain of not having the feature becomes acute, not when the doc is written. Planning and execution are separate epistemic modes — the planning doc is where the gate between them lives.

-----

## Summary — The Feature Queue Governed by Pain

Most systems track planned work in backlogs, tickets, or roadmaps. These are lists of intentions that grow without bound, lose context as they age, and depend on whoever wrote the ticket to remember the reasoning.

The planning queue is different. Each entry is a full document — not a ticket. It has a title that names the concept and its stance. A blockquote with the complete compressed argument. Frontmatter with derivation and governance. A summary an agent could act on without reading further. Implementation phases. Constraints. Open questions. Derivation from canon.

When the pain of not having the feature becomes acute — when you feel it in a session, when a ritual fails, when someone asks "why can't I just…" — you pull the planning doc and execute. The spec is already there. The reasoning is already captured. The constraints are already reviewed. The agent doesn't need the conversation that produced it. The doc is the handoff.

If the pain never comes, the doc sits. That's fine. It cost almost nothing to write and it preserves the thinking for whenever it becomes relevant. Planned work that never hurts enough to build was correctly deferred.

-----

## How It Emerged

This convention was not designed. It was discovered.

During the 0.33.0 version bump (2026-02-18), two insights emerged that needed implementation specs: the changelog-as-epistemic-ledger concept (requiring an `oddkit_diff` action) and the oddkit write access architecture (requiring MCP server changes, GitHub Actions, and projection pipelines). The specs were written as planning documents with full writing-canon compliance, but the implementation was not in scope for 0.33.0.

This created a new pattern: documentation that is simultaneously a planning artifact (it describes future work), a ledger entry (it records decisions and constraints), and a handoff (it's specific enough for cold execution). The planning doc is all three because it doesn't separate the reasoning from the spec.

The pattern was recognized as the feature-development sibling of the drift queue: one surfaces what needs maintenance, the other surfaces what needs building. Both are governed by Use Only What Hurts.

-----

## What a Planning Doc Contains

A planning doc in `docs/planning/` follows writing canon like any other doc in the `docs/` tree. Beyond the standard requirements:

**Problem statement** — what pain this feature addresses, with evidence from real sessions or incidents. Not hypothetical pain. Observed pain.

**Current state** — what happens today without the feature. The specific friction, ritual, or failure mode.

**Target state** — what changes when the feature exists. The workflow before and after.

**System changes** — which systems need modification, with enough specificity for a cold handoff. If oddkit needs new actions, name them and describe their inputs and outputs. If GitHub Actions need to be added, describe what triggers them and what they check. If multiple systems are involved, separate the handoffs per system.

**Phased implementation** — ordered phases that deliver incrementally. Each phase should be independently valuable. Don't require the whole plan to ship before any value is realized.

**Constraints** — what the feature must not do. Safety boundaries, irreversibility gates, enforcement requirements.

**Open questions** — what remains unresolved. These are honest admissions, not blockers. The feature can ship with open questions if the first phase doesn't depend on their answers.

**Derivation** — which canon values, constraints, principles, or incidents justify this feature. A feature without derivation is a feature without grounding.

-----

## The Repo as Coordination Bus — Multi-Tool Workflows Through Shared Memory

The planning queue is not just a documentation convention. When combined with oddkit write access, it becomes the coordination mechanism for multi-tool workflows.

Any tool that can write to the repo and read through oddkit shares the same epistemic ledger. Handoffs become repo commits, not files humans carry between tools:

- Claude chat writes a planning doc → commits to branch → PR merges
- oddkit indexes the new content
- Claude Code picks up the planning doc through oddkit search → executes the spec → commits results
- oddkit indexes the implementation
- The voice agent reads the updated canon through oddkit → conversations reflect the new capability
- The website regenerates from the updated repo

No human carried anything between tools. The repo carried everything. Each tool did what it's best at: chat for thinking, Code for building, voice for exploring, website for presenting. The human directed which tool acts next. The repo coordinated.

This extends to any MCP-compatible tool. The repo is open. The protocol is open. The epistemic discipline travels with the data, not the tool. Any tool that connects through oddkit joins the coordination without custom integration — it just reads from and writes to the same repo.

-----

## Self-Referential Spec Watching — The Protocol Defines Its Own Tools

The most powerful implication of the planning queue is self-referential: the ODD canon repo can define build specs that oddkit picks up for itself.

The loop:
1. ODD defines the epistemic discipline (axioms, constraints, methods)
2. oddkit implements that discipline (search, challenge, encode, validate)
3. The planning queue in the ODD repo contains specs for oddkit's next capabilities
4. oddkit reads the queue through its own search
5. When a spec hurts enough to build, it becomes the implementation handoff for oddkit itself

Oddkit watches the planning queue of the canon it serves to maintain consistency with the latest ODD version. If ODD adds a new constraint that requires enforcement, the planning queue contains the spec for the oddkit action that enforces it. Oddkit doesn't drift from ODD because ODD defines what oddkit should become.

This generalizes to every tool in the ecosystem: GitHub Actions watch for workflow specs in the repo. The website watches for projection specs. The voice agent watches for prompt specs. Each tool's build instructions live in the same canon they serve.

This is the implementation-level meaning of "ODD is a protocol, not a platform": the protocol defines itself in a repo. The tools that implement the protocol read from that repo. The single source of truth governs both the rules and the roadmap.

-----

## Relationship to Other Ledger Concepts

**Epistemic ledger** (`odd/ledger/epistemic-ledger.md`) — the ledger already says entry types are extensible: "Projects can define additional artifact types through conversation with their agent." Planned work is a new entry type. It sits alongside observations, learnings, decisions, constraints, and handoffs.

**Synthesis ledger** (`docs/appendices/synthesis-ledger.md`) — captures learning from exploration mode without forcing decisions. The planning doc goes further: it captures a decision to build something, with a spec, but without forcing execution. The synthesis ledger feeds into planning docs when exploration produces a buildable insight.

**Drift queue** (`writings/the-drift-queue.md`) — surfaces what's stale and needs maintenance. The planning queue surfaces what's new and needs building. Both are self-cleaning: drift entries resolve when the doc is updated; planning entries resolve when the feature is built (or when the pain never materializes and the doc is archived).

**Action queue** (referenced in the epistemic ledger) — a collection of pending handoffs. Planning docs are pending handoffs that haven't been triggered yet. When you pull a planning doc for execution, it becomes an active handoff.

**Use Only What Hurts** (`odd/constraint/use-only-what-hurts.md`) — the governing constraint. Planning docs exist to be ready when pain arrives, not to generate premature work. Writing the spec is cheap. Building prematurely is expensive. The planning queue holds the spec until the cost of not having the feature exceeds the cost of building it.

-----

## Convention

Planning docs live in `docs/planning/`. They follow writing canon. They use `audience: docs` and `tier: 2` unless the feature governs canon-level concerns. Their URI follows the pattern `klappy://docs/planning/{feature-name}`.

When a planning doc is picked up for execution, the implementing agent reads it as the primary spec. The resulting implementation handoffs reference the planning doc as their source. When the feature ships, the planning doc can be updated with a status line noting completion, or archived if the feature's own documentation supersedes it.

A planning doc that sits for months without being picked up is not a failure. It is correct behavior — the pain never justified the build. If the doc becomes stale (the system evolved past its assumptions), it enters the drift queue naturally and either gets updated or archived.

-----

## Derivation

- **Use Only What Hurts** — the planning queue exists so that features are built when they hurt, not when they're imagined
- **Epistemic Ledger** — planned work is a new ledger entry type, extending the ledger's explicit provision for project-defined artifact types
- **Epistemic Modes** — planning and execution are separate modes with a gate between them. The planning doc is where the reasoning lives; the gate check happens when someone proposes to execute
- **Convention Requires an Enforcer** — this convention is documented so that agents and future sessions know what `docs/planning/` means. Without this doc, the convention is invisible
