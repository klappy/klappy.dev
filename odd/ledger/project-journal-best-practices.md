---
uri: klappy://odd/ledger/project-journal-best-practices
title: "Project Journal Best Practices — Sizing, Timestamps, and Tradeoffs"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "oddkit", "journal", "ledger", "best-practices", "project-journal", "epoch-7"]
epoch: E0007
date: 2026-04-03
---

# Project Journal Best Practices — Sizing, Timestamps, and Tradeoffs

> Common failure modes, proven solutions, and the major tradeoff warning: don't separate entries by type — it erases narrative.

---

## Summary — The Journal That Works Is the One You Can Read

A project journal captures OLDC+H from work sessions. The format is simple. The failure modes are predictable. This article documents what works, what doesn't, and the one tradeoff that looks like an improvement but isn't.

---

## Sizing

**One journal file per PRD or per project.** Not one per session — that fragments context. Not one for everything — that creates a file too large to be useful. The natural boundary is the project: a journal tracks one coherent effort from start to completion.

**Time-bounded alternatives.** For long-running projects, consider one journal per month or per milestone. The test: can the agent read the full journal file in a single context window? If not, it's too large.

---

## Timestamps

Include timestamps on every entry. ISO 8601 format. Timestamps enable chronological ordering when entries are added across multiple sessions. They also enable correlation with git commits and external events.

**Format:** `## 2026-04-03T14:30Z — [brief topic]`

---

## The Narrative Tradeoff

The temptation is to organize journal entries by OLDC+H type: all observations together, all decisions together, all constraints together. This looks cleaner. It is worse.

Separating by type destroys the causal chain. The observation that led to the learning that informed the decision that created the constraint — that sequence is the journal's value. Without it, each item is an isolated fact. With it, each item has context.

**Keep entries in chronological narrative order. Tag them with their type. Do not sort by type.**

---

## Common Failure Modes

**Append-only bloat.** The journal grows indefinitely without pruning. Solution: archive completed projects. Start a fresh journal for the next phase.

**Reconstruction instead of capture.** The agent waits until session end and reconstructs from memory. Details are lost. Solution: continuous encoding (see `docs/oddkit/proactive/continuous-encoding.md`).

**Encoding without persisting.** The agent calls encode but doesn't save the output. Solution: always save encode output to the journal file immediately (see `docs/oddkit/proactive/encode-does-not-persist.md`).

**Over-encoding.** Every minor exchange gets a journal entry. The journal becomes noise. Solution: encode selectively. Track continuously, encode substantively, persist at breakpoints.
