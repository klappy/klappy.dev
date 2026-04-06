---
uri: klappy://docs/oddkit/proactive/dolche-vocabulary
title: "DOLCHE — Six Dimensions of Session Capture"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "dolche", "oldc-h", "observations", "learnings", "decisions", "constraints", "handoffs", "encodes", "vocabulary", "session-capture", "project-journal", "epoch-7.1"]
epoch: E0007.1
date: 2026-04-04
supersedes: "docs/oddkit/proactive/oldc-h-vocabulary.md"
derives_from: "canon/values/axioms.md, docs/oddkit/proactive/continuous-encoding.md, docs/oddkit/proactive/encode-does-not-persist.md"
complements: "docs/oddkit/proactive/posture-lapse.md, docs/oddkit/proactive/proactive-session-close.md, odd/ledger/project-journal-best-practices.md"
governs: "All session capture, project journal entries, and encode invocations"
status: active
---

# DOLCHE — Six Dimensions of Session Capture

> Decisions, Observations, Learnings, Constraints, Handoffs, Encodes. Five artifact types and one meta-level action that tracks the crystallization of all the others. DOLCHE supersedes OLDC+H by adding Encode — not as a sixth category of content, but as the act of encoding itself made visible. The E closes the loop: when you encode a Decision, the Encode tracks *that you did it*, when you did it, what quality it achieved, and whether it was persisted. Without the E, you can't distinguish between "this was discussed" and "this was captured."

---

## Summary — Five Artifact Types, One Meta-Level Action

OLDC+H (`docs/oddkit/proactive/oldc-h-vocabulary.md`) defined five artifact types for session capture: Observations, Learnings, Decisions, Constraints, Handoffs. These five cover what happened in a session. But they don't cover *the system's own crystallization work*.

Every time oddkit's encode action is invoked, it takes one or more of those five artifact types and crystallizes them — producing a quality score, a status, a persist_required flag, and suggestions for improvement. That encoding action is not another artifact type. It is the meta-level act of *processing* the artifacts. But it needs to be tracked, because without it you can't answer: "Did we just discuss this, or did we actually capture it? And if we captured it, did we persist it?"

DOLCHE adds Encode as the meta-level dimension, closing the loop. The system doesn't just track what happened — it tracks that it tracked what happened. This makes the session's own epistemic discipline visible and auditable.

The reordering — from OLDC+H to DOLCHE — leads with Decisions because decisions are the highest-stakes artifacts. A missed observation can be recovered from the transcript. A missed decision may not surface again.

---

## The Five Artifact Types

**Decisions (D)** — What was chosen. Explicit commitments with rationale. Decisions close options and create direction. They are the highest-stakes artifacts because they constrain all subsequent work. A decision without rationale is a debt (Axiom 2). A decision without a constraint test is untested.

**Observations (O)** — What was seen or noticed. Raw facts without interpretation. Observations are the evidence layer — they describe reality as encountered, not reality as theorized. An observation that nobody recorded is an observation that never happened for the system's purposes.

**Learnings (L)** — What was understood from the observations. Interpretation with evidence. Learnings connect observations to meaning. They are the bridge between "what did we see?" and "what does it mean?" A learning without an observation is speculation. A learning with an observation is knowledge.

**Constraints (C)** — What now governs future work. Rules, boundaries, and non-negotiables that emerged from the session. Constraints bind future behavior — they are the artifacts most likely to prevent future mistakes. A constraint without enforcement is a suggestion (`canon/principles/ritual-is-a-smell.md`).

**Handoffs (H)** — What comes next and what context the next session needs. Explicit transfer of state across conversation boundaries. Handoffs are the artifacts most likely to be lost because they describe what hasn't happened yet. A session without handoffs forces the next session to reconstruct context from scratch.

---

## The Meta-Level Action — Encode (E)

Encode is not a sixth artifact type. It is the act of crystallizing all the others — the moment where a Decision, Observation, Learning, Constraint, or Handoff is structured, quality-scored, and flagged for persistence. Tracking encodes makes the system's own epistemic work visible.

Each encode event records: what was crystallized, when, what quality score it received, whether persistence was required, and what gaps remained. An encode is not content — it is a receipt that crystallization happened.

This distinction matters operationally. A journal entry tagged D (Decision) tells you what was chosen. An encode event tells you that the decision was formally processed through oddkit's encode action, scored for quality, and flagged to be saved. Without the E, the journal can't distinguish between a decision that was casually mentioned and a decision that was formally captured.

The E is what makes DOLCHE self-auditing. A session journal with five Decisions and zero Encodes says: decisions were made but never crystallized. A journal with five Decisions and five Encodes where none were persisted says: crystallization happened but the artifacts were lost in the response stream. Both gaps are now visible from the journal itself.

---

## Why the E Matters

The encode-persistence gap (`docs/oddkit/proactive/encode-does-not-persist.md`) taught a painful lesson: encode does not persist. It returns structured artifacts in the response stream. If the caller doesn't save them, they're lost. Tracking encodes as a meta-level action makes this gap visible in the journal itself.

When a DOLCHE journal shows three Decisions, two Observations, one Learning — and zero Encodes — the journal is telling you: this session produced insights that were never crystallized. The gap between "discussed" and "captured" is now a measurable distance.

When a journal shows four Encodes with `persist_required: true` — and no corresponding file writes — the journal is telling you: crystallization happened but persistence didn't. The artifacts exist in the encode output but not in durable storage.

The E makes both gaps visible. Without it, you'd need to audit the transcript to discover what was encoded and what was lost. With it, the journal self-reports its own completeness.

---

## Storage at Scale

DOLCHE entries are structured data: each has a type (D/O/L/C/H/E), a timestamp, a summary, a body, and tags. At personal scale — a few entries per session — markdown journals work fine. At production scale — dozens of entries per day across multiple projects — structured tabular formats (TSV, CSV) offer faster parsing, appendability, and git-diffability.

The storage format is an implementation concern, not a vocabulary concern. DOLCHE defines *what* to capture. How entries are stored, indexed, and queried depends on the context: markdown for human-readable journals, tabular formats for machine-queryable session history, or both in parallel. The vocabulary is portable across any storage format.

---

## Extensibility — Custom Types Through Governance

DOLCHE's five artifact types and one meta-level action are defaults, not a closed set. The type field is a string, not an enum. Any knowledge base can extend DOLCHE with custom types by adding a governance document that defines them.

A pastoral knowledge base might add "P" for Prayer Requests — entries that track pastoral commitments across sessions. A legal knowledge base might add "R" for Rulings — entries that capture case law citations as they surface. A smart home knowledge base might add "A" for Automations — entries that record governance rules derived from user preferences ("I like the house cooler at night").

The extension mechanism is a governance document in the knowledge base, not a code change in oddkit. The governance document defines: what the new type letter means, when it should be used, what makes a valid entry of that type, and how it relates to the five defaults. oddkit's generic infrastructure — TSV parsing, BM25 search, type-based filtering — handles any type string without modification. The server doesn't need to know about Prayer Requests. It needs to know about type fields.

This is prompt over code applied to the vocabulary itself. The defaults are universal. The extensions are domain-specific. The capability is open. The semantics are governed.

---

## Usage

When the operator says "encode DOLCHE," "journal this," or "run the gauntlet," the agent captures all six types from the current session. The categories are tags on narrative entries, not section headers — they identify what kind of artifact each entry is without separating the narrative into disconnected lists.

The trigger phrases are equivalent: "encode DOLCHE," "journal this," and "run the oddkit gauntlet" all invoke the same behavior — comprehensive session capture across all six types, followed by persistence to the project journal.

---

## Migration from OLDC+H

DOLCHE is backward-compatible with OLDC+H. All five original types retain their definitions. The only additions are the E type and the reordering. Existing OLDC+H journals do not need to be rewritten — they are valid DOLCHE journals that happen to have zero E entries.

The trigger phrase "encode OLDC+H" continues to work and is treated as equivalent to "encode DOLCHE." Agents should use DOLCHE in their output regardless of which trigger phrase the operator uses.

---

## Discoverability

This article exists so that any search for "DOLCHE," "OLDC+H," "session capture," "journal," "encode vocabulary," "project journal format," "observations learnings decisions constraints handoffs encodes," or "what to track in a session" surfaces this vocabulary.

---

## See Also

- [OLDC+H (superseded)](klappy://docs/oddkit/proactive/oldc-h-vocabulary) — the prior five-type vocabulary this document extends
- [Encode Does Not Persist](klappy://docs/oddkit/proactive/encode-does-not-persist) — the gap that motivated tracking encodes as artifacts
- [Continuous Encoding](klappy://docs/oddkit/proactive/continuous-encoding) — encoding at every turn, not just session end
- [Proactive Posture Lapse](klappy://docs/oddkit/proactive/posture-lapse) — detecting when encoding (among other tools) stops happening
- [Project Journal Best Practices](klappy://odd/ledger/project-journal-best-practices) — sizing, timestamps, and format for journals
