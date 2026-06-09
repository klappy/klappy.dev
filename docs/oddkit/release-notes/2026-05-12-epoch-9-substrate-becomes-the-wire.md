---
uri: klappy://docs/oddkit/release-notes/2026-05-12-epoch-9-substrate-becomes-the-wire
title: "Release Notes — Epoch 9: Substrate Becomes the Wire (2026-05-12)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["docs", "oddkit", "release-notes", "epoch-9", "substrate", "agents-need-their-own-wire", "behavior-change", "dispatch-paths", "autonomous-trigger"]
epoch: E0009
date: 2026-05-12
derives_from: "canon/constraints/governance-change-discipline.md, docs/appendices/epoch-9.md, writings/we-were-the-wire.md, canon/principles/agents-need-their-own-wire.md, canon/architecture/substrate-stack.md, canon/methods/dispatch-paths.md"
governs: "Operator and agent behavior after this release lands — the substrate stack is the default integration pattern, operator-as-wire is named as a design smell, autonomous-trigger is the canonical path for everything except synchronous user-facing assistance."
target_repo: "oddkit"
---

# Release Notes — Epoch 9: Substrate Becomes the Wire (2026-05-12)

> This release does not add a tool. It changes which integration patterns canon recognizes as healthy. Operator-as-wire was the default; from this version forward it is a design smell. Audits become spawned agent sessions, not regex against prose. Validation gets its own substrate and its own context break. Personas become deployable peers with accounts, not voices in chat windows. The dispatch-paths binary makes the choice mechanical: when the runtime returns, who reads the result first? If the answer is no one, the runtime is autonomous-trigger and the operator is not in the loop. Almost every workflow that previously had a human in the wire was an autonomous-trigger shape mistaken for an assistant-orchestrated one.

---

## Summary — Behavior Change Is the Deliverable

Epoch 9 is a behavior-change release, not a feature release. The artifacts it lands (a new canon appendix, a public essay, three new methods canon, a Tier-1 principle, an updated constraint, ~19 frontmatter retags) only matter because they change which workflow shapes canon endorses.

The short version: when canon describes a workflow that includes a human in an integration role, that workflow is a design smell from this version forward — unless the role is explicitly direction-setting or pivot-decisioning. The operator is a director, not a relay. Validators are spawned agent sessions. Audits are spawned agent sessions. Ingestion is autonomous-trigger pipelines. The wire is no longer a person.

The first production-grade exercise of the new runtime is in flight: `klappy/agent-messaging-service` PR #77 (audit-gate migration from Anthropic Managed Agents to Cloudflare DO + Agents SDK + Project Think) merged its planning artifact on 2026-05-12, with the multi-PR migration sequence in flight after. The same canon governs the auditor that governs the work.

This release ships under **Canon 0.38.0** and establishes **Epoch 9 — Substrate Becomes the Wire** (see `docs/appendices/epoch-9.md` for the full epoch declaration with frontmatter axes: `forcing_fault`, `new_invariant`, `core_shift`). Four `governance-change-discipline` markers accompany the epoch bump: canon version, this changelog entry, this release notes file, and the epoch appendix.

This document frames the release by **what changes after it lands**, not by what is in it. The file inventory is in the changelog entry; the architectural depth is in the appendix; the narrative is in the essay. This document answers the question: *what should be different about how oddkit gets used, and what should operators and agents stop doing?*

---

## What Changes for Operators

The operator's role narrows to what only a human can do. Two activities remain irreducibly the operator's:

**Direction-setting.** What should the substrate be doing this week, this month, this quarter? Which problems are worth aiming the runtime at? Which constraints are binding? The substrate has no opinion about direction; that is the operator's.

**Pivot decisions.** When does the plan change? When does an open question become a closed one? When does an observation force a rework of canon? The substrate executes; the operator decides when to stop and re-plan. The mode discipline canon (`canon/constraints/mode-discipline-and-bottleneck-respect`) operationalizes this — gates are contracts; reversion is honest or it is not reversion.

Activities the operator should stop doing, because they are substrate concerns:

- Copy-pasting between two agents. The wire is AMS. If two reasoning systems need to talk, the substrate routes the tokens.
- Manually transcribing PDFs, recordings, calendar events, chat threads into a knowledge base. The pipeline is R2 → Queue → Durable Object → Epistemic Surface Extraction → encoded artifacts → KB. The operator drops a file in a bucket; the artifacts appear in the KB.
- Acting as the audit gate for canon-drift, code-vs-canon sync, or cross-reference integrity. The audit gate is a spawned Oddie session with fresh context and structured deliverable, per `canon/constraints/audit-gates-are-spawned-agent-sessions`.
- Same-session self-review of just-produced artifacts. Validation requires a structural context break (`canon/principles/verification-requires-fresh-context`). The fresh-context validator is a separate session, ideally a separate runtime invocation; same model family is acceptable, same session is not.
- Remembering which session encoded which decision. The substrate stores. The operator's working memory is for direction, not bookkeeping.

The recognition heuristic is simple: ask "who reads the result first when this runtime returns?" If the answer is *no one* — there is no synchronous human waiting at the other end — then any clarifying question the runtime emits is incoherent (there is no listener) and any error must emit to a configured channel rather than as inline chat. That workflow is autonomous-trigger and the operator is not in the loop. Most workflows that previously had a human in the loop were this shape.

---

## What Changes for Agents

The runtime that hosts a spawned agent session now has a contract: `canon/methods/spawned-agent-session-runtime-contract` defines five orthogonal dimensions every session declares (trigger source, persona, governance source, deliverable shape, transport). The substrate enforces these against existing canon — the auditor must run with `oddkit_search` available, the validator must run with fresh context, the persona must be declared by URI not by inline prompt.

The dispatch-paths binary (`canon/methods/dispatch-paths`) settles a question that has been implicit for the last year. Two dispatch classes, mutually exclusive:

- **Assistant-orchestrated.** A human reads the runtime's output through a chat assistant. Clarifying questions can be surfaced inline. Errors get explained in chat. The assistant is the consumer of record.
- **Autonomous-trigger.** An external event (webhook, AMS frame, alarm, email, RPC, queue message, object-store event, platform webhook, push notification — see `canon/methods/trigger-source-taxonomy` for the canonical nine) wakes the runtime. There is no chat, no inline operator, no inline assistant. Clarifying questions are incoherent; errors emit to a configured channel.

The selection rule is mechanical: when the runtime returns, who reads the result first?

The L4 persona surface (`canon/methods/persona-shaped-agent-runtime`) is now where the canon lives. Personas are not voices inside a chat window; they are deployable peers. Oddie gets an AMS account and a stream — a real peer on the wire. The same canon that governs Oddie inside a chat session governs Oddie as an audit-gate validator on a webhook, Oddie as a TinCan room guide on an AMS frame, Oddie as a scheduled audit on an alarm trigger. Same persona, different invocation context. The activation defaults stay sensible (Oddie default-on in oddkit-driven sessions and ODD-mode work; default-off in published essays and unrelated tasks; explicit operator override in either direction).

What does not change for agents: the four epistemic modes (exploration/planning/execution/validation), the mode-collapse failure pattern, the gauntlet (preflight/challenge/gate/encode/validate), the time-first contract, the search-canon-before-asking discipline. Those are the floor under everything; E0009 just makes the floor's wiring visible.

---

## What Does Not Change

This release does not retract or supersede prior canon. It re-organizes it.

The four-mode epistemic discipline (`canon/definitions/epistemic-modes`) is still the foundation. The mode-discipline-and-bottleneck-respect constraint still applies. Time-first (`canon/observations/time-blindness-axiom-violation` and the `oddkit_time` first-call rule) still applies. The gauntlet is unchanged. Validation-as-observable-mode (E0008.3) is unchanged. Governance-change-discipline (E0008.4) is unchanged — in fact, this release is itself an exercise of that discipline, with all four markers (version bump, changelog entry, release notes, epoch appendix) present.

Specs-lock-at-implementation (E0008.6) is unchanged. Borrow-evaluation-before-implementation is unchanged — this trio's 6B skip is justified explicitly in the PR description (no upstream substrate to evaluate; the trio is authored canon and a frontmatter retag, not an implementation task with a vendor SDK in play).

The oddkit tool surface is unchanged. No new tools land in this release; no existing tools change shape. The substrate stack and persona-shaped runtime canon are documents *for* the operator's reasoning, not new tools to call.

---

## How to Recognize Operator-as-Wire (and Replace It)

The shape is the same across every layer; the symptom changes by surface. The recognition checklist:

| Symptom | The shape underneath | The E0009 replacement |
|---|---|---|
| Copy-pasting between two agents | Human relay between intelligences that could talk over substrate | Account-to-account flow over AMS (L1 wire); both peers symmetric |
| Manually re-typing a PDF / transcript / agenda into a knowledge base | Human as ingestion pipeline | R2 (or any object store) → queue → Durable Object → ESE → encoded artifacts → KB |
| Running a regex audit script that requires human to interpret findings | Human as auditor | Spawned Oddie session with `oddkit_search` and `oddkit_audit`; structured deliverable; same canon as the work being audited |
| "Quickly checking" just-produced code in the same session before declaring done | Same-context self-review | Validation as a separate session (`canon/validation-as-epistemic-mode`); fresh context, independent evaluation |
| Routing a tool's response through chat back to another tool | Chat as wire | Autonomous-trigger dispatch; tool emits to AMS frame or webhook directly |
| Operator-remembers-what-was-encoded | Working memory as durable storage | Encoded DOLCHEO+ artifacts saved to ledger/handoff files; search retrieves them |
| Bridging two product surfaces by hand at every transition | Operator as integration layer | Autonomous-trigger between the surfaces; AMS as transport |
| Re-explaining context every time a session starts | Operator as compression layer | Handoff document + bootstrap operating contract + DOLCHEO+ ledgers; the substrate compresses |

The audit prompt for any workflow: *if the human in this loop took a week off, would the workflow stop, or would it run?* If it would stop because a human is in the wire, that wire is in the wrong place. If a person took a week off and the substrate kept running, the operator was already a director.

---

## Receipts Per Layer

The six-layer substrate stack provides the frame. Each layer owes a specific receipt to E0009; the table is reproduced from `docs/appendices/epoch-9` for ease of reference:

| Layer | What "done" looks like at this layer in E0009 | Canon that already covers it | What remains |
|---|---|---|---|
| **L1 Wire** (AMS) | Tokens flow between accounts. Personas have accounts. No special-casing by peer type. | `canon/principles/agents-need-their-own-wire`, `canon/principles/symmetric-participation` | `ams.convention.v1` (L3) — peer metadata so addressing is legible. Separate work track. |
| **L2 Wrapper/Adapter** | MCP edges, channel adapters, AI-tool adapters translate L1 ↔ runtime/channel without holding application opinion. | `canon/methods/spawned-agent-session-substrate-options`, `canon/architecture/substrate-stack` | Adapter inventory grows as channels onboard; each adapter ships under the same vodka discipline. |
| **L3 Identity & Convention** | Peer metadata is legible: who is this account, what convention, what version. | (gap named) | Author `ams.convention.v1`. Tracked. |
| **L4 Role/Agent** | Canon-driven personas spawned on the runtime per the five-dimension contract. Audit gates, validators, ingestion personas, methodology personas (Oddie). | `canon/methods/persona-shaped-agent-runtime`, `canon/methods/spawned-agent-session-runtime-contract`, `canon/methods/dispatch-paths`, `canon/methods/trigger-source-taxonomy`, `canon/constraints/audit-gates-are-spawned-agent-sessions`, `canon/constraints/critic-cannot-be-resolver` | AMS audit-gate migration (in flight); Oddie as deployable L4 peer next. |
| **L5 Application** | User-facing products on L1–L4 hit the magical-first-run bar (under a minute, no setup overhead). | `canon/principles/magical-first-run` | TinCan earns L5. |
| **L6 Economy** | Creators get paid. Substrate never extracts. Payment, marketplace, reputation, settlement above the dial-tone layer. | `canon/principles/creators-get-paid` | Stripe rails through TinCan onboarding; penny economy as cost-allocation. |

The pattern repeats: at every layer, "done" looks like the operator never had to be the wire between this layer and its neighbors. Where that is not yet true, the gap is named, not silently endured.

---

## Related

- `klappy://docs/appendices/epoch-9` — full epoch declaration with frontmatter axes
- `klappy://writings/we-were-the-wire` — public essay form of the argument
- `klappy://canon/principles/agents-need-their-own-wire` — the Tier-1 principle
- `klappy://canon/architecture/substrate-stack` — six-layer map
- `klappy://canon/methods/persona-shaped-agent-runtime` — L4 runtime contract
- `klappy://canon/methods/dispatch-paths` — assistant-orchestrated vs autonomous-trigger binary
- `klappy://canon/methods/trigger-source-taxonomy` — the canonical nine trigger types
- `klappy://canon/constraints/audit-gates-are-spawned-agent-sessions` — validators are not pattern matchers
- `klappy://canon/constraints/governance-change-discipline` — the four-marker discipline this release exercises
- `klappy://odd/handoffs/2026-05-12-epoch-9-trio` — execution spec for the trio
- `klappy://odd/ledger/2026-05-12-epoch-9-planning` — planning session audit trail
- `klappy/agent-messaging-service` #77 — audit-gate runtime migration (plan landed 2026-05-12; migration in flight)
