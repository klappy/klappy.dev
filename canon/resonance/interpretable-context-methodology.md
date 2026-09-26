---
uri: klappy://canon/resonance/interpretable-context-methodology
title: "Interpretable Context Methodology (Van Clief & McDermott) — Discipline Inside the Ceiling It Names"
audience: canon
tier: 2
voice: neutral
stability: evolving
tags: ["resonance", "interpretable-context-methodology", "van-clief", "mcdermott", "mwp", "model-workspace-protocol", "folder-structure", "context-engineering", "scale-boundary", "6B", "bide"]
exposure: nav
epoch: E0010
date: 2026-08-04
derives_from: "canon/methods/borrow-bend-break-beget-build.md, canon/constraints/borrow-evaluation-before-implementation.md, canon/methods/persona-shaped-agent-runtime.md"
complements: "canon/resonance/agentic-engineering.md, canon/constraints/dispatcher-spawns-its-own-coordinators.md, canon/bootstrap/flight-deck-model.md, canon/constraints/retrieval-disclosure-contract.md"
---

# Interpretable Context Methodology (Van Clief & McDermott) — Discipline Inside the Ceiling It Names (Resonance)

> Jake Van Clief & David McDermott, "Interpretable Context Methodology: Folder Structure as Agentic Architecture" (arXiv:2603.16021, March 2026); also taught to a community of roughly 43,000 practitioners as Clief Notes. The paper proposes the Model Workspace Protocol (MWP): numbered folders as workflow stages, a single agent walking those stages in sequence, a five-layer context hierarchy, and state passed folder-to-folder as markdown and JSON with a human review gate between every stage. The paper's own limitations section names its ceiling — single model family tested, sequential-only, not built for concurrent users, local-first, an informal 52-practitioner sample. ODD's divergence begins where that named ceiling ends, not where the paper's claims fail on their own terms. Quotes and figures below are dispatcher seat-fetched notes, not primary-source reads — see the Bide row.

## ODD Principle: Discipline Inside a Workspace and Trust Across Workspaces Are Different Problems

ODD treats "how one flight organizes its own working context" and "how many flights, many clients, and work that outlives any single session come to trust each other" as two separate engineering layers, not one layer scaled up. The first is served by structured, disclosure-tiered context inside a workspace; the second requires a dedicated trust substrate — gated hand-offs, fresh-context validation, an append-only record — that folder discipline scoped to one workspace was never built to carry.

---

## Convergent Quotes (Non-Authoritative)

> "These frameworks solve a coordination problem that may not need to exist."
> — Jake Van Clief & David McDermott, *Interpretable Context Methodology* (arXiv:2603.16021, 2026) — on CrewAI, LangChain, and AutoGen

> "Configure the factory, not the product."
> — stated MWP principle, per Clief Notes community codification (paraphrase; wording not yet verified verbatim)

*Provenance note: both quotes were captured via dispatcher seat-fetched notes on 2026-08-04; arxiv.org and skool.com are unreachable from this sandbox, so neither has been read against the primary source directly. Verify exact wording against arXiv:2603.16021 before any public-facing or captain-voice citation — see the Bide entry below.*

---

## Where ODD Aligns

- **Plain text as the interface.** MWP passes state folder-to-folder as markdown and JSON with no database or serialization layer — the same commitment as `prompt-over-code`: governance and hand-off state live in documents a human can open and edit directly, not in an opaque runtime.
- **Stage contracts.** MWP's per-stage input/process/output contract (its L2 layer) is the same shape as an ODD dispatch charter's `MODE:` plus required-output line (`klappy://ars/policy/mode-output-contract`) — each stage names, before it starts, what it consumes and what it must hand off.
- **Layered, on-demand context loading.** MWP's five-layer hierarchy (L0 workspace identity through L4 per-run working artifacts), justified by citing Liu et al.'s "lost in the middle" finding, is structurally the same move as ODD's retrieval-disclosure contract — tiered disclosure (URI/title, then blockquote, metadata, summary, body) that loads only what the current step needs instead of front-loading the corpus.
- **Mechanical work vs. judgment work.** MWP's "local scripts do mechanical work, AI does judgment work" draws the same boundary ODD draws between its glue-layer mechanical tooling (build, deploy, merge) and the judgment a flight is dispatched to exercise.
- **Interpretable artifacts as an edit surface.** Every MWP stage output being a human-editable markdown or JSON file parallels ODD's log-as-truth posture: the flight recorder's append-only record and a stage's markdown output are both artifacts a human can read and correct without decoding a runtime.
- **Model-agnosticism.** MWP's refusal to couple the workflow to one model family matches the model-operating-contract posture — a boarding pass of creed, axioms, and a pointer to the contract, written to be fetched and honored by whichever model takes the seat, not authored for one vendor's assistant.

Alignment above is mechanical — shared structural moves, not shared philosophy.

---

## Where ODD Diverges (Explicit)

- **Scale boundary, not disagreement.** Read literally, the paper's own limitations section names its ceiling: one model family tested, sequential-only, not built for concurrent users, local-first, a 52-practitioner informal sample. Inside that ceiling — one project, one operator, one sequential workflow — the numbered-folder structure works cleanly, and ODD has no quarrel with it there. ODD's own problem starts past that same ceiling: many projects, many clients, multitenancy, and work that has to outlive any single session. The two are not competing answers to the same question; MWP answers the question up to its stated boundary, and ODD's substrate exists for the part the paper's own limitations decline to answer.
- **Where the human sits.** MWP's trust mechanism is a human reviewer gating every stage transition inline — present at each hand-off, reading each output before the next stage runs. ODD moves the human from an inline reviewer toward a direction-setter and tower: once direction is set, gates function as prior approval rather than a re-ask; a fresh-context session does validation a human would otherwise perform by re-reading; an append-only log carries the audit trail a human would otherwise hold in memory. Both are solving the same trust problem — keep an autonomous agent's output honest — from opposite ends of where the human's attention goes. The runtime this page's alignment section maps against (`klappy://canon/methods/persona-shaped-agent-runtime`) is a still-experimental attempt to relieve that per-stage human bottleneck while keeping human direction and orchestration oversight intact. The experiment is not settled, and this page makes no claim that it out-performs inline review — only that it is a different bet on the same trust problem.
- **Single flight vs. sessions that outlive any one runtime.** MWP binds a workspace to a single agent walking its folders in order. ODD's mode-bound roles are designed to be picked up by a fresh session at every gate, by a different model if needed, and to persist findings past whichever session produced them — a requirement the paper's own "no automated branching" and "sequential-only" limitations name as untested, not as a shortcoming it claims to meet.

If this section felt uncomfortable to write, that would be the signal the citation doesn't belong — it does not: the alignment above is real, and so is the boundary.

---

## Why the Divergence Matters

A folder-and-gate discipline built for one operator, one sequential flow, and inline review does not silently fail when a second client, a second concurrent flight, or a session that must survive past today shows up — it was never asked to carry that weight, and the paper says so in its own limitations. The risk sits with anyone who borrows the folder discipline expecting it to also solve multitenancy, concurrency, or durability across sessions, none of which the numbered-stage model was built to hold. ODD's answer to that gap is not a rejection of MWP's discipline; it is a glue layer that exists specifically for the part of the problem the paper's own ceiling excludes — an append-only record that outlives any one flight, gates that convert into approval rather than repeated review, and validation from a fresh context rather than the same reviewer re-reading their own prior sign-off.

---

## Operationalization in ODD — Borrow, Bend, Break, Beget, Bide, Build

- **Borrow** — the five-layer hierarchy's naming discipline (workspace identity, task routing, stage contracts, stable reference, per-run working artifacts) as vocabulary for describing what ODD's retrieval-disclosure tiers already do inside a single workspace; usable as-is.
- **Bend (candidate, not yet ratified)** — MWP-shaped discipline *inside* each flight's own workspace: numbered stages, an explicit per-stage input/process/output contract, and plain-markdown outputs treated as an edit surface. Composes cleanly with the glue layer *between* flights: within-workspace structure borrowed from MWP, across-workspace trust supplied by ODD's own substrate. Subject to the 6B evaluation (`klappy://canon/constraints/borrow-evaluation-before-implementation`) before any canon change.
- **Break** — the numbered-folder model has no answer for two clients on the same substrate at once, no session that survives past the agent walking its stages, and no mechanism to relieve an inline human reviewer as the bottleneck at every gate. These are not defects in MWP — they are exactly what its own limitations section names as untested. They mark where ODD's glue-layer build begins, not where MWP fails at the job it set for itself.
- **Beget** — let Van Clief, McDermott, and the Clief Notes community continue refining the within-workspace pattern; ODD does not need to build a competing folder taxonomy while a practitioner community of that size is already iterating on one in the open.
- **Bide** — primary-source verification of every quote, figure, and mechanic named on this page is deferred, not skipped. arxiv.org and skool.com are unreachable from this sandbox, so the mechanics above (the five-layer names, the ~43k community-size figure, both quotes) are seat-fetched notes, not primary-source reads. **Tripwire:** before this page is cited on any public-facing or captain-voice surface, every quote and factual claim above must be re-verified directly against arXiv:2603.16021 and the primary Clief Notes materials; if re-verification surfaces a material mismatch, this page's `stability` should be revisited before further reuse.
- **Build** — only what the paper's own limitations name as outside its scope and that a single practitioner's folder workspace cannot carry: coordination across many concurrent flights, trust that survives past any one session, and an audit trail that does not depend on a human's memory of what happened at each gate.

---

## Related Canon

- [Method: Borrow, Bend, Break, Beget, Bide, Build](/canon/methods/borrow-bend-break-beget-build.md) — the method operationalized above
- [Borrow Evaluation Before Implementation](/canon/constraints/borrow-evaluation-before-implementation.md) — governs any adoption of the Bend candidate
- [Persona-Shaped Agent Runtime](/canon/methods/persona-shaped-agent-runtime.md) — the glue layer between flights this page's divergence points to
- [The Dispatcher Spawns Its Own Coordinators](/canon/constraints/dispatcher-spawns-its-own-coordinators.md) — the append-only flight recorder this page's log-as-truth alignment refers to
- [The Flight Deck Model](/canon/bootstrap/flight-deck-model.md) — gates as approval, the black-box journal, the human as tower rather than inline reviewer
- [Retrieval Disclosure Contract](/canon/constraints/retrieval-disclosure-contract.md) — ODD's layered, on-demand context loading
- [Prompt Over Code](/canon/principles/prompt-over-code.md) — markdown and documents as the interface, not code
- [Agentic Engineering (Karpathy) — Convergent Advice, Divergent Infrastructure](/canon/resonance/agentic-engineering.md) — sibling resonance page; same Bend/Bide discipline applied to a different convergent, living work
- [Resonance Index](/canon/resonance/README.md)
