---
uri: klappy://docs/oddkit/proactive/proactive-session-close
title: "Proactive Artifact Provenance — Capture What Happened Before Finalizing"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "oddkit", "proactive", "provenance", "journal", "changelog", "version", "ritual", "epoch-7"]
epoch: E0007
date: 2026-04-03
---

# Proactive Artifact Provenance — Capture What Happened Before Finalizing

> When work produces durable artifacts, the agent captures what happened (journal), what changed (summary), and what version — at every milestone, before every review, and before finalizing. The trigger is the artifact, not the end of the conversation.

---

## Summary — Provenance Is Not a Session-End Ritual

Every productive session ends with the same gap: the operator asks for a journal entry, a change summary, and a version update — if they remember. The agent has the full context of what happened and waits to be asked. This is a RITUAL_DETECTED pattern.

Under E0007, the agent captures provenance at the points where it matters — not at session end. The trigger is not "wrapping up." The trigger is the work itself: when durable artifacts are produced, when work is ready for review, and when work is finalized.

This applies regardless of domain. In code, provenance means commits, changelogs, and version bumps. In writing, it means revision notes and draft tracking. In planning, it means decision records and handoff documents. In any domain, it means OLDC+H capture — what was observed, learned, decided, constrained, and what comes next.

---

## The Three Provenance Artifacts

**Session capture** — OLDC+H in narrative order. What was observed, learned, decided, constrained, and what comes next. The reasoning layer that makes the artifacts' history legible. Written to the project's journal or ledger.

**Change summary** — What changed and why, in language appropriate for the audience who will review or consume the work. In code, this is a changelog. In writing, this is revision notes. In planning, this is an updated decision record.

**Version or revision tracking** — An identifier that distinguishes this state from the previous one. In code, this is a semantic version bump. In writing, this is a draft number or date stamp. In any domain, it is whatever convention the project uses to mark "this is different from what came before."

---

## The Three Trigger Points

### At Every Milestone

When work reaches a natural breakpoint — a completed task, a significant decision, a phase transition — the session capture should be current. OLDC+H is tracked continuously (per `docs/oddkit/proactive/continuous-encoding.md`), and each milestone is a natural persist point.

### Before Every Review

When work is presented for review — by a collaborator, a stakeholder, or even the operator reviewing their own work — the change summary must be current. The reviewer needs to understand what changed and why without reconstructing it from the artifacts themselves.

### Before Finalizing — Most Critical

When work becomes durable — merged to main, published, submitted, delivered, or shared beyond the current session — all three provenance artifacts must be present. Finalization without provenance means the next person (or next session) starts without context. This is a gate, not a suggestion.

---

## The Passive Pattern This Replaces

Under E0006, provenance artifacts were produced when the operator remembered to ask — typically at session end. The agent had the full context of every decision, every change, every artifact produced. It waited. Work was finalized without journal entries. Changes were made without summaries. Versions drifted from the work.

Under E0007, the work itself is the trigger. The agent does not need to be told that artifacts were produced — it produced them. Provenance is captured at milestones, before reviews, and before finalization. The operator reviews what was captured, not remembers to request it.
