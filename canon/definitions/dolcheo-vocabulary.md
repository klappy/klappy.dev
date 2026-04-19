---
uri: klappy://canon/definitions/dolcheo-vocabulary
title: "DOLCHEO — Seven Dimensions of Session Capture"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["canon", "definitions", "dolcheo", "dolche", "oldc-h", "vocabulary", "session-capture", "project-journal", "open-items", "priority-bands", "epoch-8.3"]
epoch: E0008.3
date: 2026-04-19
derives_from: "canon/values/axioms.md, canon/definitions/epistemic-modes.md, docs/oddkit/proactive/dolche-vocabulary.md, docs/oddkit/proactive/oldc-h-vocabulary.md, odd/ledger/2026-04-19-agent-team-pilot.md"
complements: "canon/meta/writing-canon.md, docs/oddkit/proactive/continuous-encoding.md, docs/oddkit/proactive/encode-does-not-persist.md, odd/ledger/project-journal-best-practices.md"
governs: "All session capture, project journals, and encode invocations in oddkit-powered projects"
status: active
supersedes: "docs/oddkit/proactive/dolche-vocabulary.md"
---

# DOLCHEO — Seven Dimensions of Session Capture

> Decisions, Observations (closed), Learnings, Constraints, Handoffs, Encodes, Opens. Six artifact types and one meta-level action, with Open added as the seventh letter: the forward-pointing thread that stays with the current owner. DOLCHE tracked what happened but had no home for what remained unresolved. Open items fill that gap. Unfinished work, unanswered questions, and live threads get captured as first-class artifacts with priority bands, separate from Handoffs (which transfer work to another owner). Both Os retain the single letter `O`; section placement disambiguates closed Observation from Open item. A DOLCHE journal tells you what was done; a DOLCHEO journal also tells you what is still alive.

---

## Summary — The Seventh Letter Closes the Loop DOLCHE Left Open

DOLCHE (`docs/oddkit/proactive/dolche-vocabulary.md`) defined six dimensions of session capture: five artifact types for what happened (Decisions, Observations, Learnings, Constraints, Handoffs) and one meta-level action that tracks the crystallization itself (Encodes). Across many sessions DOLCHE worked well for retrospective tracking — it answered "what did we do, see, learn, and choose?" But it could not answer "what is still open?"

Unresolved threads had no home. Work that was started but not finished, questions raised but not answered, decisions pending further evidence — these either got buried inside narrative entries, forced into Handoffs they did not fit, or quietly dropped. Handoff is the wrong container for a live thread: a Handoff transfers work to another owner. An unresolved item that stays with the current owner, waiting for the next loop, is something else.

DOLCHEO adds **Open** as that something else. The second `O` joins the letter set — Decision, Observation (closed), Learning, Constraint, Handoff, Encode, Open. Both Os remain a single character; context in the journal makes clear which is which. Open items are typically listed under a dedicated section with priority bands (P1, P2, P3…) so the operator can see at a glance what is live and in what order. The agent-team-pilot ledger (`odd/ledger/2026-04-19-agent-team-pilot.md`) is the first ledger written against DOLCHEO and is the working example this document points to.

DOLCHEO is backward compatible with DOLCHE. Every DOLCHE journal is a valid DOLCHEO journal with zero Open items. Migration is additive: start capturing Open items, nothing else changes.

---

## The Seven Letters

**Decisions (D)** — What was chosen. Explicit commitments with rationale. Decisions close options and create direction. They are the highest-stakes artifacts because they constrain all subsequent work. A decision without rationale is a debt (Axiom 2). A decision without a constraint test is untested.

**Observations (O, closed)** — What was seen or noticed, as a finished fact. Raw evidence without interpretation. Observations describe reality as encountered. A closed Observation is something that happened and is now history: a tool call completed, a test ran, a remote repository was in a particular state at a particular timestamp. An observation that nobody recorded is an observation that never happened for the system's purposes.

**Learnings (L)** — What was understood from the observations. Interpretation grounded in evidence. Learnings connect observations to meaning. They are the bridge between "what did we see?" and "what does it mean?" A learning without an observation is speculation. A learning with an observation is knowledge.

**Constraints (C)** — What now governs future work. Rules, boundaries, and non-negotiables that emerged from the session. Constraints bind future behavior, which makes them the artifacts most likely to prevent future mistakes. A constraint without enforcement is a suggestion.

**Handoffs (H)** — Transfer of work and context across an owner boundary. Another session, another agent, or another person picks up the artifact. The current owner is letting go. Handoffs describe what the receiver needs to resume productive work without reading the full prior transcript.

**Encodes (E)** — The meta-level action of crystallizing a D, O, L, C, H, or open O through oddkit's encode action. Each encode event records what was crystallized, what quality score it received, whether persistence was required, and what gaps remained. An Encode is a receipt, not content; it proves that crystallization happened. The E is what makes DOLCHEO self-auditing: a journal with five Decisions and zero Encodes is telling you the decisions were mentioned but never captured.

**Opens (O, forward-pointing)** — Unresolved threads that stay with the current owner. Work begun and awaiting next action, questions raised and awaiting answer, decisions pending further evidence, items deferred to the next pass. Open items carry a priority band (P1, P2, P3…) so the list is scannable. They close by becoming Decisions (resolved), Handoffs (transferred), or Observations (completed and now history).

---

## Both Os Remain O — The Collision Is Intentional

Observation and Open share the letter `O`. This is deliberate. Introducing a separate letter for Open items (say, `P` for Pending or `U` for Unresolved) would have required retraining every downstream consumer — the encode tool, journal templates, search tags, existing literature, the agents already in the loop. DOLCHEO chose backward compatibility over letter-purity.

Disambiguation works by section placement, not by letter. Closed Observations appear in narrative flow alongside D, L, C, H, E entries describing what happened. Open items appear under a dedicated heading, typically titled `## Open items` or `### Open items (forward-pointing)`, with priority bands. A reader scanning the ledger never has to guess which O is which: the section header tells them.

Markdown syntax for inline tagging follows the same principle. A closed Observation reads `[O]`. An Open item reads `[O-open P1]` or `[O-open P2.1]` — the `-open` suffix marks it as forward-pointing, and the band makes the priority explicit. Encode tooling that accepts type-prefixed input treats `O` as closed Observation by default and accepts `O-open` as the explicit forward-pointing variant.

The letter collision is a feature of the vocabulary's evolution, not a flaw. DOLCHE was written, shipped, used. Adding a new dimension without breaking the existing vocabulary was worth a small disambiguation rule.

---

## Open vs Handoff — The Distinguishing Question

The question that separates Open from Handoff is ownership: does the thread still belong to the current owner, or has it transferred?

**Handoff** means the current owner is letting go. The receiver now carries the context, the decision, the next action. The handoff document names who receives the work and what they need to know to continue. A handoff marks a boundary: on this side, the current session; on the other side, whoever picks it up next.

**Open** means the current owner still holds the thread. It is unresolved, not transferred. The same person or agent will return to it, either in this session or the next. Open items accumulate across a session as the work unfolds and get resolved, deferred, or (eventually) converted to Handoffs when a boundary is actually crossed.

Worked examples:

- "Next session needs to merge main→prod PR before touching new work" is a Handoff if the current session is ending and a fresh session will do the merge. It is Open if the current session is continuing and will do the merge after lunch.
- "Encode batch-mode feature is blocked on DOLCHEO canon landing" is Open if the operator intends to keep working on both in the same session. It is a Handoff if the session is ending and the next session owner picks up the encode work.
- "Tim and Ian need to review the swarm harness decision" is always a Handoff. The review is owned by someone other than the current session.
- "Not sure yet whether the encode response envelope should declare `governance_source` at the top level or inside a debug block; will see what the canary shape suggests" is Open. The decision stays with the current owner, pending evidence from the implementation.

A useful test: if the item is worded as "next session should…" or "Tim should…," it is a Handoff. If it is worded as "I need to…" or "we haven't yet decided…," it is an Open item.

---

## Priority Bands for Open Items

Open items carry a priority band so the list is scannable without reading each entry. Bands are ordered P1, P2, P3… by descending priority — P1 is the next thing to do, P6 is the tenth-most-important. The number of bands is not fixed; most ledgers use P1–P3, larger arcs extend to P4–P6. The agent-team-pilot ledger ran from P1 to P5.

Sub-bands are allowed when a band has internal ordering: P1.1 runs before P1.2, both inside the P1 tier. The handoff that spawned this document used P1.1 (DOLCHEO canon doc) and P1.2 (encode batch-mode + canary refactor) to express "these are both the priority for the next session, in this order."

Bands are a communication tool, not a scheduling system. They say "if I only had time for one thing, which one?" — and answer by ordering. When a band is completed, its items move out of Open (into D, O-closed, or H as appropriate) and the remaining bands shift up or stay where they are at the author's discretion. Bands are not recomputed on every write.

---

## Example Ledger Structure

A DOLCHEO-compliant session ledger looks roughly like this:

```markdown
# Session Ledger — [date] [topic]

**Session opened:** [ISO 8601 timestamp]
**Mode at open:** [exploration | planning | execution | validation]
**Derives from:** [prior ledger / handoff URIs]

---

## Priority bands

- **P1** — [the primary objective]
- **P2** — [contingent objective if P1 converges cleanly]
- **P3** — [nice-to-have]

---

## DOLCHEO log

### [Phase name — e.g. "Session open"]

- **[D]** [Decision made, with rationale]
- **[O]** [Closed observation — a fact now in the record]
- **[L]** [Learning grounded in observations]
- **[C]** [Constraint that now governs future work]

### [Next phase]

- **[E]** [Encode event — what was crystallized, quality, persistence status]
- **[H]** [Handoff — work transferred to another owner]

---

## Open items (forward-pointing)

- **[O-open P1]** [Next thing to do; stays with current owner]
- **[O-open P2.1]** [Sub-banded item; runs before P2.2]
- **[O-open P2.2]** [Second sub-item in P2]
- **[O-open P3]** [Lower-priority thread still live]
```

The `odd/ledger/2026-04-19-agent-team-pilot.md` ledger is the first DOLCHEO-native ledger in the canon; read it as a working reference.

---

## Tool-Level Implication — oddkit_encode Must Accept All Seven

The `oddkit_encode` tool currently recognizes four hardcoded artifact types and collapses batched input into a single typed blob. DOLCHEO expands the recognized set to seven and requires per-artifact output.

Concrete requirements that follow from this vocabulary:

1. The tool must accept prefix-tagged input for all seven letters: `[D]`, `[O]`, `[L]`, `[C]`, `[H]`, `[E]`, and the Open variant (`[O-open]` or equivalent, with an optional priority band like `[O-open P1]`).
2. Batched input with multiple prefixes must return a per-artifact array, not a single collapsed blob. Each artifact gets its own quality score and persistence flag.
3. Single-artifact input without a prefix must still work — the existing heuristic that infers type from content remains as fallback.
4. The vocabulary itself must be read from this document at runtime, not hardcoded in the tool. That is the prompt-over-code pattern applied to encode — canon defines the vocabulary, code reads it, the three-tier resolution stack (live canon → bundled baseline → fail-loud) governs fallback.

The implementation PR for these requirements is tracked separately from this canon doc; this document is the governance contract the tool must satisfy.

---

## Storage at Scale

DOLCHEO entries are structured data: each has a type (one of D / O / L / C / H / E / O-open), a timestamp, a summary, a body, tags, and — for Open items — a priority band. At personal scale, a few entries per session, markdown journals work well. At production scale, dozens per day across multiple projects, tabular formats like TSV or CSV offer faster parsing, easier appending, and cleaner git diffs.

Storage format is an implementation concern, not a vocabulary concern. DOLCHEO defines what to capture. How entries are stored, indexed, and queried depends on the deployment context: markdown for human-readable journals, tabular formats for machine-queryable session history, or both in parallel. The vocabulary travels across any format that can carry the seven-letter type field.

---

## Extensibility — Custom Types Through Governance

DOLCHEO's seven letters are defaults, not a closed set. Any knowledge base can extend the vocabulary by adding a governance document that defines a new type letter, describes when it should be used, gives examples of valid entries, and explains how it relates to the existing seven.

A pastoral knowledge base might add `P` for Prayer Requests. A legal knowledge base might add `R` for Rulings. A smart-home knowledge base might add `A` for Automations. The extension mechanism is governance, not code: the server infrastructure treats the type field as a string and searches, filters, and counts entries without needing to know what each letter means.

Prompt-over-code applies to the vocabulary itself. The defaults are universal. The extensions are domain-specific. The capability is open. The semantics are governed.

---

## Migration from DOLCHE

DOLCHEO is backward compatible with DOLCHE. All six original dimensions retain their definitions. The only additions are:

- The seventh letter, Open, as the forward-pointing counterpart to closed Observation.
- A convention for priority bands (P1, P2, P3…) on Open items.
- A disambiguation rule for the two Os (section placement, optional `-open` suffix for inline tags).

Existing DOLCHE journals do not need to be rewritten — they are valid DOLCHEO journals that happen to have zero Open entries. The trigger phrases "encode DOLCHE," "journal this," and "run the gauntlet" continue to work and invoke capture across all seven types; agents should use DOLCHEO in output regardless of which trigger phrase the operator uses.

Agents that were previously taught DOLCHE have one concrete behavior change: at session end, before writing the Handoff section, scan the session for unresolved threads and record them as Open items with priority bands. If there are genuinely none, note that explicitly. An absent Open section is different from an empty one; the former suggests the agent forgot, the latter confirms the agent checked.

---

## Scope, Prior Art, and Retraction Conditions

DOLCHEO is a working vocabulary for session capture inside oddkit-powered knowledge bases, as of 2026-04-19. It is not presented as a universal claim about how teams should track work.

**Where DOLCHEO applies:** session journals and project ledgers maintained by an agent (or agent + operator pair) working inside an oddkit-powered project. The seven letters capture the epistemic state of one or more working sessions against a shared knowledge base.

**Where DOLCHEO does not apply:** product roadmaps, sprint backlogs, issue trackers, customer support queues, meeting minutes for multi-party decisions, and any system where the unit of tracking is a ticket owned by a team rather than a thread owned by a session. These systems have their own vocabularies and lifecycles and DOLCHEO neither replaces nor competes with them.

**Prior art the Open letter relates to.** The Open/Handoff distinction has relatives in several established systems: Getting Things Done separates Next Actions (owner is self) from Waiting For (owner is someone else), which is a close analogue of the Open/Handoff split. Kanban boards distinguish in-progress work from done work, but do not separate forward-pointing threads with the current owner from transferred work. Issue trackers track tickets with status fields, but a ticket is a heavier unit of work than a session-scope Open item. DOLCHEO's contribution is not the distinction itself but its compact letter-based notation inside a session journal, alongside the six other DOLCHE dimensions, with a single-letter disambiguation rule that preserves backward compatibility.

**Retraction conditions.** DOLCHEO should be retracted, revised, or replaced if any of the following hold after sustained use:

- Open items in practice convert almost entirely to Handoffs at session end, with near-zero in-session closure. If that pattern holds, the Open dimension is not earning its place and can be collapsed back into Handoff.
- The letter collision between closed Observation and Open (both `O`) causes operators or agents to consistently confuse the two despite the section-placement convention. If disambiguation fails in practice, either the collision should be resolved by using a distinct letter (e.g., `U` for Unresolved), or the convention should be strengthened.
- Priority bands are used inconsistently to the point where they provide no scanning value. If bands become noise, drop them and accept flat Open lists.
- A more general session-capture framework emerges in the broader AI-augmented-workflow literature that DOLCHEO does not add value beyond. If prior art catches up, adopt it.

These conditions will be evaluated against live ledgers over the coming weeks. The first ledger written against DOLCHEO, `odd/ledger/2026-04-19-agent-team-pilot.md`, is the initial data point.

---

## Discoverability

This article exists so that any search for "DOLCHEO," "DOLCHE," "OLDC+H," "session capture," "journal vocabulary," "project journal format," "open items," "priority bands," "forward-pointing threads," "decisions observations learnings constraints handoffs encodes opens," or "what to track in a session" surfaces this vocabulary.

---

## See Also

- [DOLCHE (superseded)](klappy://docs/oddkit/proactive/dolche-vocabulary) — the prior six-dimension vocabulary this document extends
- [OLDC+H (superseded)](klappy://docs/oddkit/proactive/oldc-h-vocabulary) — the original five-type vocabulary
- [Encode Does Not Persist](klappy://docs/oddkit/proactive/encode-does-not-persist) — the gap that motivated tracking Encodes as first-class artifacts
- [Continuous Encoding](klappy://docs/oddkit/proactive/continuous-encoding) — encoding at every turn, not just session end
- [Project Journal Best Practices](klappy://odd/ledger/project-journal-best-practices) — sizing, timestamps, and format for journals
- [Agent-Team Pilot Ledger](klappy://odd/ledger/2026-04-19-agent-team-pilot) — the first DOLCHEO-native ledger, used as a working reference
- [Epistemic Modes](klappy://canon/epistemic-modes) — the four modes that govern when capture happens
- [Writing Canon](klappy://canon/meta/writing-canon) — the checklist every canon document must pass
