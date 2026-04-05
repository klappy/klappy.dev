---
uri: klappy://docs/oddkit/proactive/dolche-vocabulary
title: "DOLCHE — The Six Standard Artifact Types for Session Capture"
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

# DOLCHE — The Six Standard Artifact Types for Session Capture

> Decisions, Observations, Learnings, Constraints, Handoffs, Encodes. Six categories that capture everything significant in a session — what was chosen, what was seen, what was understood, what now governs, what comes next, and the act of crystallization itself. DOLCHE supersedes OLDC+H by adding the sixth type (Encode) and reordering to lead with Decisions. The E closes the loop: the act of encoding is itself a trackable artifact, making the system's own crystallization visible and auditable.

---

## Summary — The E Closes the Loop

OLDC+H (`docs/oddkit/proactive/oldc-h-vocabulary.md`) defined five artifact types for session capture: Observations, Learnings, Decisions, Constraints, Handoffs. These five cover what happened in a session. But they don't cover *what the system did about it*.

Every time oddkit's encode action is invoked, it produces a structured artifact — a quality score, a status, a persist_required flag, and suggestions for improvement. That encoding action is itself significant. It tells you: this insight was crystallized. This decision was formalized. This constraint was recorded. Without tracking the encoding itself, you can't distinguish between "this was discussed" and "this was captured."

DOLCHE adds Encode as the sixth type, closing the loop. The system doesn't just track what happened — it tracks that it tracked what happened. This makes the session's own epistemic discipline visible and auditable.

The reordering — from OLDC+H to DOLCHE — leads with Decisions because decisions are the highest-stakes artifacts. A missed observation can be recovered from the transcript. A missed decision may not surface again.

---

## The Six Types

**Decisions (D)** — What was chosen. Explicit commitments with rationale. Decisions close options and create direction. They are the highest-stakes artifacts because they constrain all subsequent work. A decision without rationale is a debt (Axiom 2). A decision without a constraint test is untested.

**Observations (O)** — What was seen or noticed. Raw facts without interpretation. Observations are the evidence layer — they describe reality as encountered, not reality as theorized. An observation that nobody recorded is an observation that never happened for the system's purposes.

**Learnings (L)** — What was understood from the observations. Interpretation with evidence. Learnings connect observations to meaning. They are the bridge between "what did we see?" and "what does it mean?" A learning without an observation is speculation. A learning with an observation is knowledge.

**Constraints (C)** — What now governs future work. Rules, boundaries, and non-negotiables that emerged from the session. Constraints bind future behavior — they are the artifacts most likely to prevent future mistakes. A constraint without enforcement is a suggestion (`canon/principles/ritual-is-a-smell.md`).

**Handoffs (H)** — What comes next and what context the next session needs. Explicit transfer of state across conversation boundaries. Handoffs are the artifacts most likely to be lost because they describe what hasn't happened yet. A session without handoffs forces the next session to reconstruct context from scratch.

**Encodes (E)** — What was crystallized and when. The encode action itself as a trackable event. Each encode records that the system attempted to formalize an insight, what quality score it received, whether persistence was required, and what gaps remained. Encodes make the system's own epistemic discipline visible. A session with many observations but no encodes produced raw material that was never refined. A session with encodes that were never persisted produced crystallized artifacts that were then lost.

---

## Why the E Matters

The encode-persistence gap (`docs/oddkit/proactive/encode-does-not-persist.md`) taught a painful lesson: encode does not persist. It returns structured artifacts in the response stream. If the caller doesn't save them, they're lost. Tracking encodes as a first-class artifact type makes this gap visible in the journal itself.

When a DOLCHE journal shows three Decisions, two Observations, one Learning — and zero Encodes — the journal is telling you: this session produced insights that were never crystallized. The gap between "discussed" and "captured" is now a measurable distance.

When a journal shows four Encodes with `persist_required: true` — and no corresponding file writes — the journal is telling you: crystallization happened but persistence didn't. The artifacts exist in the encode output but not in durable storage.

The E makes both gaps visible. Without it, you'd need to audit the transcript to discover what was encoded and what was lost. With it, the journal self-reports its own completeness.

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
