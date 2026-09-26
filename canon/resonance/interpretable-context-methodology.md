---
uri: klappy://canon/resonance/interpretable-context-methodology
title: "Interpretable Context Methodology (Van Clief & McDermott) — Discipline Inside the Ceiling It Names"
audience: canon
tier: 2
voice: neutral
stability: evolving
tags: ["resonance", "interpretable-context-methodology", "icm", "van-clief", "mcdermott", "folder-structure", "context-engineering", "scale-boundary", "model-agnostic", "6B", "bide"]
exposure: nav
epoch: E0010
date: 2026-08-04
derives_from: "canon/methods/borrow-bend-break-beget-build.md, canon/constraints/borrow-evaluation-before-implementation.md, canon/methods/persona-shaped-agent-runtime.md"
complements: "canon/resonance/agentic-engineering.md, canon/constraints/dispatcher-spawns-its-own-coordinators.md, canon/bootstrap/flight-deck-model.md, canon/constraints/retrieval-disclosure-contract.md, canon/principles/prompt-over-code.md"
---

# Interpretable Context Methodology (Van Clief & McDermott) — Discipline Inside the Ceiling It Names (Resonance)

> Jake Van Clief & David McDermott, "Interpretable Context Methodology: Folder Structure as Agentic Architecture" (arXiv:2603.16021, v2, March 2026). The paper proposes Interpretable Context Methodology (ICM): numbered folders as workflow stages, one orchestrating agent reading different context at each stage, a five-layer context hierarchy, plain markdown and JSON as the hand-off between stages, local scripts for mechanical work, and a human review gate at every stage boundary. Its own limitations name its ceiling — a single model family tested, sequential by design, local-first and not built for concurrent users, no automated branching, and an informal sample drawn from a 52-member practitioner community. A public webinar by Van Clief on 2026-08-06 corroborated the method, announced a hosted multi-user platform launched that day, and described the method's layers differently from the paper (see Open Items). ODD's divergence begins where the paper's named ceiling ends, and sharpens where the new platform places shared state.

## ODD Principle: Discipline Inside a Workspace and Trust Across Workspaces Are Different Problems

ODD treats "how one flight organizes its own working context" and "how many flights, many clients, and work that outlives any single session come to trust each other" as two separate engineering layers, not one layer scaled up. The first is served by structured, disclosure-tiered context inside a workspace; the second requires a dedicated trust substrate — gated hand-offs, fresh-context validation, an append-only record — that folder discipline scoped to one workspace was never built to carry. Sharing the folders does not by itself supply the second layer.

---

## Convergent Quotes (Non-Authoritative)

> "But for sequential workflows, these frameworks solve a coordination problem that may not need to exist."
> — Van Clief & McDermott, *Interpretable Context Methodology* (arXiv:2603.16021), §2.2 — on LangChain, AutoGen, CrewAI and similar frameworks

> "Configure the factory, not the product."
> — Van Clief & McDermott, *Interpretable Context Methodology* (arXiv:2603.16021), §3.1 — the fifth of ICM's design principles

> "Your folders and files should encode your version of best."
> — Jake Van Clief, public webinar, 2026-08-06

---

## Where ODD Aligns

- **Plain text as the interface.** ICM's stages communicate through markdown and JSON files, with "no database connections, no proprietary serialization" (§3.1). This is the same commitment as `prompt-over-code`: governance and hand-off state live in documents a human can open and edit directly, not in an opaque runtime.
- **Stage contracts.** Each ICM stage's CONTEXT.md defines what it reads, what it does, and what it writes (§3.3), and the paper calls this Layer 2 contract "the control point of the entire system" (§3.2). That is the same shape as an ODD dispatch charter's `MODE:` plus required-output line (`klappy://ars/policy/mode-output-contract`): each stage names, before it starts, what it consumes and what it must hand off.
- **Layered, on-demand context loading.** ICM's five-layer hierarchy (Layer 0 workspace identity through Layer 4 per-run working artifacts, §3.2, Fig. 1) is justified by Liu et al.'s "lost in the middle" finding, and the paper reports 2,000–8,000 tokens delivered per stage against a monolithic prompt exceeding 40,000 in its example workspace (§3.2, Fig. 3). This is structurally the same move as ODD's retrieval-disclosure contract — tiered disclosure (URI/title, then blockquote, metadata, summary, body) that loads only what the current step needs.
- **Mechanical work vs. judgment work.** ICM has "local scripts handle the mechanical work that does not need AI" (§7). In the webinar, Van Clief described the same split as a moving boundary: a small deterministic script handles what the AI does not do reliably, and when a later model update absorbs that process, "you just delete that folder." This matches the boundary ODD draws between glue-layer mechanical tooling and the judgment a flight is dispatched to exercise, and it resonates with `prompt-over-code`'s preference for the lighter artifact once the model can carry the work.
- **Interpretable artifacts as an edit surface.** Every ICM stage output is "a file a human can open, read, edit, and save before the next stage runs" (§3.1), and the paper calls observability "a side effect" of the architecture (§5.3). This parallels ODD's log-as-truth posture: the flight recorder's append-only record and a stage's markdown output are both artifacts a human can read and correct without decoding a runtime.
- **Model-agnosticism and versioning.** The paper says ICM "is designed to be model-agnostic" while testing only one model family and scoping cross-model evaluation as future work (§4.1, §4.6, §5.4). In the webinar, Van Clief went further: he said the same folder could be handed to Gemini CLI, Kimi, or Hermes and would "do pretty much the same thing every time," and that when newer models shipped, his folders "stayed the same" while the model read them better. This matches the model-operating-contract posture — a boarding pass written to be honored by whichever model takes the seat. The webinar's cross-model claim is a demonstration, not the controlled evaluation the paper names as missing.

Alignment above is mechanical — shared structural moves, not shared philosophy.

### Webinar Corroboration (Speaker Claims, Not Paper Findings)

The 2026-08-06 webinar used figures that do not appear in the paper. They are recorded here as the speaker's claims, with sources he did not name:

- "Ninety-five percent of AI projects show no measurable return across most enterprise deployments," described as a figure from the prior year.
- Agentic-project cancellations described as rising from seventeen percent to "forty two percent" a year later.
- Folder structure described as able to "handle 90% of what you need to do."
- One community member's team API spend described as dropping from about $10,000 a month to about $400 after adopting the structure.
- A practitioner community of "over forty-three thousand people," distinct from the 52-member invite-only community the paper draws its observations from (§4.5).

None of these is verified against a primary study here. They show how the method is pitched, not what it has been shown to do.

---

## Where ODD Diverges (Explicit)

- **Scale boundary, not disagreement.** The paper's own limitations name its ceiling: one model family tested (§4.6), sequential by design, local-first, not built for concurrent users, and awkward with automated branching (§5.2), with observations drawn from an informal, self-selected practitioner sample (§4.5–4.6). Inside that ceiling — one project, one operator, one sequential workflow — the numbered-folder structure works cleanly, and ODD has no quarrel with it there. ODD's own problem starts past that ceiling: many projects, many clients, multitenancy, and work that has to outlive any single session.
- **Trust machinery vs. shared state.** In the webinar, Van Clief answered the multi-user question by saying that folders "already scale": the team needs "to work on the same folders, just like a SharePoint, just like Google Drive," and the platform launched that day (described as alpha) lets a team "deploy a zip file" with a master copy and shared workbenches — "multiplayer AI." That answers who can see and edit the same state. ODD's cross-workspace question is a different one: why a second flight, a second client, or a later session should trust state it did not produce. ODD answers with trust machinery — gated hand-offs, fresh-context validation, an append-only record — not with a shared copy of the folders.
- **Gates and validation vs. sync.** ICM's trust mechanism is a human reviewer at every stage boundary (§3.3, Fig. 4), and the platform adds synchronized access to the same workspace. ODD moves the human from an inline reviewer toward a direction-setter and tower: once direction is set, gates function as prior approval rather than a re-ask; a fresh-context session does the validation a human would otherwise perform by re-reading; an append-only log carries the audit trail a human would otherwise hold in memory. Syncing a workspace keeps everyone looking at the same files; it does not by itself establish that the files are right. The runtime this page maps against (`klappy://canon/methods/persona-shaped-agent-runtime`) is a still-experimental attempt to relieve the per-stage human bottleneck while keeping human direction and oversight intact. This page makes no claim that it out-performs inline review — only that it is a different bet on the same trust problem.
- **Customer sovereignty vs. platform custody.** The paper's workspace is a folder the practitioner owns: it "can be copied to another machine, committed to Git, emailed as a zip file," with "no server to configure" (§3.4), and practitioners get "a folder they own and control" (§4.4). The webinar's multi-user answer moves the shared master copy onto the vendor's hosted platform. ODD keeps the durable record — canon, journal, the flight recorder — in stores the operator holds, with any platform acting as a lens over them rather than their custodian.
- **Single flight vs. sessions that outlive any one runtime.** ICM binds a workspace run to one orchestrating agent walking its stages in order, delegating sub-tasks within a stage (§4.1–4.2). ODD's mode-bound roles are designed to be picked up by a fresh session at every gate, by a different model if needed, and to persist findings past whichever session produced them — a requirement the paper's sequential-only and no-automated-branching boundaries (§5.2) leave outside its scope.

If this section felt uncomfortable to write, that would be the signal the citation doesn't belong — it does not: the alignment above is real, and so is the boundary.

---

## Why the Divergence Matters

A folder-and-gate discipline built for one operator, one sequential flow, and inline review does not silently fail when a second client, a second concurrent flight, or a session that must survive past today shows up — it was never asked to carry that weight, and the paper says so in its own limitations. The hosted platform answers part of that gap by sharing the folders. The risk sits with anyone who reads shared access as solved trust: a synchronized master copy tells every collaborator what the state is, not whether it was validated, by whom, or against what. ODD's answer is not a rejection of ICM's discipline; it is a glue layer for the part of the problem the paper's ceiling excludes and the platform does not address — an append-only record that outlives any one flight, gates that convert into approval rather than repeated review, validation from a fresh context, and custody that stays with the operator.

---

## Operationalization in ODD — Borrow, Bend, Break, Beget, Bide, Build

- **Borrow** — the five-layer hierarchy's naming discipline (workspace identity, task routing, stage contracts, reference material, working artifacts; §3.2) as vocabulary for describing what ODD's retrieval-disclosure tiers already do inside a single workspace. Also the Layer 3 / Layer 4 split — reference material "internalized as constraints" versus working artifacts "processed as input" (§3.1, Table 2).
- **Bend (candidate, not yet ratified)** — ICM-shaped discipline *inside* each flight's own workspace: numbered stages, an explicit per-stage input/process/output contract, and plain-markdown outputs treated as an edit surface. Composes with the glue layer *between* flights: within-workspace structure borrowed from ICM, across-workspace trust supplied by ODD's own substrate. Subject to the 6B evaluation (`klappy://canon/constraints/borrow-evaluation-before-implementation`) before any canon change.
- **Break** — the numbered-folder model has no answer for two clients on the same substrate at once, no session that survives past the agent walking its stages, and no mechanism to relieve an inline human reviewer as the bottleneck at every gate. The hosted platform adds shared access but not validation or operator custody. These are not defects in ICM — they are what its own limitations name as out of scope, and they mark where ODD's glue-layer build begins.
- **Beget** — let Van Clief, McDermott, and their practitioner community continue refining the within-workspace pattern; ODD does not need to build a competing folder taxonomy while a community of that size iterates on one in the open. The paper's own future work — output provenance identifiers, cross-stage verification, and the edit-source principle (§6.2–6.3) — is worth watching as it converges on ODD's validation concerns from the inside.
- **Bide** — the two paper quotes and the paper-sourced mechanics on this page were verified against arXiv:2603.16021 v2 on 2026-09-26. The webinar figures remain speaker claims whose underlying studies were not named or checked. **Tripwire:** before any webinar figure is cited as fact on a public-facing or captain-voice surface, it must be traced to its primary study; if that fails, cite it only as the speaker's claim or drop it. Revisit `stability` if the paper is revised past v2 or the layer discrepancy below is resolved.
- **Build** — only what the paper's own limitations name as outside its scope and what a shared folder cannot carry: coordination across many concurrent flights, trust that survives past any one session, an audit trail that does not depend on a human's memory of each gate, and custody that stays with the operator.

---

## Open Items

- **Four layers or five (unresolved).** The paper specifies a five-layer context hierarchy, Layer 0 through Layer 4 (§3.2, Fig. 1). In the 2026-08-06 webinar, Van Clief described "four layers": a front desk; a catalog, which "might be an ICM little folder, a context packet"; an LLM wiki or second brain; and a request slip inside that second brain pointing to external software or databases. The two descriptions are not reconciled here. Whether the spoken four map onto the paper's five, describe a different architecture layer (knowledge-hub routing rather than per-stage context), or reflect a revision of the method is not established by either source. This page uses the paper's five layers as the reference until a primary source resolves the difference.
- **Platform identity.** The webinar announced a platform launched on 2026-08-06, in alpha, but the platform's name and custody terms are not recorded here. The custody divergence above rests only on the webinar's description ("deploy a zip file," a master copy, shared workbenches).

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
