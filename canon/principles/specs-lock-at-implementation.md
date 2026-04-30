---
uri: klappy://canon/principles/specs-lock-at-implementation
title: "Specs Lock at Implementation — A Spec Is a Contract; Don't Change It Mid-Build"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: working
tags: ["canon", "principle", "spec", "contract", "implementation", "versioning", "drift", "lock", "vodka-architecture", "governance-discipline", "spec-lifecycle"]
epoch: E0008.6
date: 2026-04-30
derives_from: "canon/principles/contract-governs-handoff-drift.md, canon/principles/verification-requires-fresh-context.md, canon/constraints/governance-change-discipline.md, klappy/ptxprint-mcp/canon/encodings/telemetry-feature-planning-ledger.md (H-T3 resolution, 2026-04-30)"
complements: "canon/methods/planning-queue.md, canon/principles/maintainability-one-person-indefinitely.md"
governs: "All spec-document edits after implementation has begun — applies to API specs, protocol specs, schema specs, version specs, and any document an implementer (human or agent) is building against"
status: active
---

# Specs Lock at Implementation — A Spec Is a Contract; Don't Change It Mid-Build

> A spec is a contract between the spec author and the implementer. Once implementation begins — once the spec has been handed to a coding agent, an autonomous run, or a human picking up the contract — the spec is locked. Forward-looking changes ship as a new versioned spec (vN+1), not as edits to the locked spec. The locked spec describes what was built; the new spec describes what's being built. This preserves an auditable spec-to-code mapping and protects the implementer's reasoning from being invalidated mid-build. The spec-lock principle is the contract-level analog of the gate-lock that mode discipline applies inside a single execution turn.

---

## Summary — Implementation Closes the Contract

A spec exists to coordinate two parties: the author, who has decided what the system should do, and the implementer, who is building it. Between them sits the spec — a fixed reference point both can read, both can verify against, both can hold each other to.

That coordination only works while the reference is stable. The moment the spec mutates after the implementer has started building — even with edits the author thinks are innocuous, even fixes for inaccuracies the spec already had — the contract has been changed unilaterally. The implementer's mental model of what's being built no longer matches the document. The author's confidence that "the spec describes what we shipped" no longer holds. Any future reader trying to reconstruct what was actually built has to choose: trust the spec or trust the code, with no clean way to know which is right at any given moment.

The fix is one rule: **once implementation begins, the spec is locked.** Forward-looking changes ship as `vN+1` — a new spec that supersedes the locked one, opens with a "What changed from vN" preamble, and gives the implementer a fresh stable reference to build against. The old spec stays exactly as it was at the lock point. It now reads as a historical artifact: what was specified, what was built. The new spec reads as a living contract: what's being added.

This is the spec-level expression of the gate-lock pattern from mode discipline (`canon/principles/contract-governs-handoff-drift.md`). At turn scale: when the operator says "go," the scope is locked for the duration of the execution mode. At spec scale: when implementation begins, the contract is locked for the duration of that version. Both protect the same thing — the implementer's reasoning — at different time horizons.

---

## When Does a Spec Lock?

The lock happens at one of these moments, whichever comes first:

| Signal | Description |
|---|---|
| **Code is written against the spec** | Even one file (a Worker route handler, a function signature, a Dockerfile, a wrangler config) committed to the repo with the spec as its reference is implementation-started. |
| **An autonomous coding run is kicked off** | A managed agent, autonomous coding session, or background build task that has the spec in its working context. The spec is locked from the moment the run starts, even if the run hasn't finished. |
| **The spec is handed to a human implementer** | A teammate picks up the spec to build against, says "I'm on it," and starts work. The spec is locked from the handoff moment. |
| **The spec ships in a release artifact** | Even if no code yet implements it, if the spec is included in a published canon pack, documentation site, or external-facing release, downstream consumers may now be reading and reasoning against it. |

The signal is consequential reading by an implementer, not author-side certainty about completeness. If anyone is building against it, it's locked. If you're not sure whether anyone has started, check before editing.

---

## Why Specs Drift Quietly

Three pressures push toward post-implementation spec edits, all of them feel reasonable in the moment, all of them violate the principle:

1. **The "small fix" pressure.** A typo, a stale tool count, an outdated URL. The fix is trivial. Surely it doesn't count as a spec change. But it does. The implementer who reads the spec tomorrow sees a different document than the one yesterday. If the fix was actually wrong (the typo was load-bearing, the tool count reflected a different scope, the URL change broke a link), the change has corrupted the contract.

2. **The "keep it current" pressure.** Something was added in a later session — a new tool, a new dependency, a new constraint — and the spec doesn't mention it. The temptation is to update the spec to reflect what's actually built. This collapses the historical record into a moving present. The spec was supposed to describe what shipped at version N; once it's been edited to describe present state, it can't do either job cleanly.

3. **The "no one will notice" pressure.** The spec is internal. Only one person is implementing. The implementer doesn't re-read the spec mid-build. So why not just update it? Because the principle's value isn't only in the immediate read — it's in the auditable record. Six months later, when something is broken and the question is "what was the v1.2 contract?", a quietly-edited spec gives the wrong answer with no warning that it's wrong.

In each case the pressure is real, the cost feels invisible, and the violation compounds silently. That's exactly the failure mode the principle exists to prevent.

---

## What "Forward-Looking" Looks Like in Practice

The pattern is well-established in versioned-spec families:

```
canon/specs/
├── v1.0-spec.md         (locked at implementation start; describes what shipped as v1.0)
├── v1.1-spec.md         (supersedes v1.0; "What changed from v1.0" preamble)
├── v1.2-spec.md         (supersedes v1.1; locked at implementation; describes what shipped as v1.2)
└── v1.3-spec.md         (supersedes v1.2; "What changed from v1.2" preamble; current build target)
```

Each spec is a full standalone re-spec, not a delta document. The "What changed" preamble at the top is for orientation; the body restates the full contract so an implementer reading vN+1 doesn't have to context-switch through prior versions to understand what they're building.

`supersedes:` is a frontmatter field. The locked spec gains no special status marker — it just stops being the build target. `status: active` becomes `status: superseded` once vN+1 is the canonical reference.

The implementer reads the spec marked "current build target" and ignores everything else. The auditor reads whichever version corresponds to the build they're investigating. Future readers can see exactly what was specified at each point and exactly what changed between them.

---

## Edge Cases

### Pre-implementation changes are fine (and encouraged)

Before any implementer has started reading the spec, edit freely. Planning mode is exploration; the spec is a working document; iteration is the point. The lock applies at the implementation-start signal, not at spec-authored signal.

### Cross-cutting current-state docs follow different rules

`README.md`, `ARCHITECTURE.md`, project landing pages — these describe what the project is **right now**, not what was specified at a particular version. They reflect current state and should be updated as state changes. They are not specs; they are descriptions. Don't apply the spec-lock principle to them.

The boundary test: does the document include a `version:` field, a `supersedes:` field, or a "Specification" in its title? Then it's a spec. Does it answer "what does this project do today?" without versioning? Then it's a current-state doc.

### Errata and bug-fix typos are gray — prefer vN+1 with an errata note

If the locked spec has an actually-wrong claim (a typo that misrepresents an enum value, a stale fact that contradicts shipping behavior), the impulse is to fix it in place. Resist the impulse. The cleaner pattern is to ship vN+1 with an "Errata from vN" section listing the corrections. This preserves the historical record (the spec did say X; we corrected it to Y) and updates the contract (the new build target is the corrected document).

If correcting the locked spec really is the only reasonable option (e.g., the error is so misleading it actively damages anyone who reads vN), document the in-place edit in the canon CHANGELOG and add an `erratum_at:` field to the spec frontmatter pointing at the changelog entry. This makes the violation observable rather than silent.

### Implementation-time discoveries that affect the spec

Sometimes implementation reveals that the spec is wrong, ambiguous, or impossible. The implementer can't proceed. Three options:

1. **Stop and re-spec.** Lock vN as it was, ship vN+1 with the corrections, restart implementation against vN+1. This is the cleanest path when the discovery affects the contract substantially.
2. **Defer and document.** Implement what the spec says works, defer the impossible/ambiguous parts to vN+1, document the gap in a handoff or session ledger. Use this when the discovery is non-blocking.
3. **Inline clarification.** If the discovery is genuinely just "the spec was unclear about X but the intent was obvious" — and the implementer's interpretation has been operator-confirmed — proceed and document the clarification in a session ledger. The spec stays locked.

Option 3 is the temptation that erodes the principle. Most "obvious clarifications" are actually content changes that would benefit from vN+1's explicit treatment. Default to option 1 or 2.

---

## Failure Modes — What Goes Wrong When This Is Violated

**Ghost contracts.** The spec describes a system the implementer never built. The code does something the spec never described. Both are deployed. Reviewers can't tell which is the source of truth.

**Auditable-mapping erosion.** Six months later, an incident requires understanding what was contracted at v1.2. The spec has been silently amended five times. There's no way to reconstruct what the implementer was actually building against. The auditor falls back to git archaeology — slow, error-prone, and dependent on commit messages being honest.

**Re-validation churn.** The implementer (or a fresh-context reviewer) discovers the spec has changed since they last read it. Now they have to re-read, re-validate every assumption, re-check every test against the new contract. The principle exists in part to make these re-reads unnecessary.

**Forward-looking changes lose their venue.** When the spec gets edited freely, there's no pressure to ship vN+1. The version-progression habit weakens. Eventually the project has a single "living spec" that has accumulated years of changes, none of them clearly attributable to a particular release. This is the failure mode that motivates the principle existing at all.

---

## Companion Patterns at Other Scales

The spec-lock principle is one of a family of contract-stability patterns operating at different time horizons:

| Time horizon | Pattern | What's locked |
|---|---|---|
| Within a single execution turn | Mode discipline (`canon/principles/contract-governs-handoff-drift.md`) | The scope of the current execution |
| Across one spec lifecycle | **Spec lock at implementation (this principle)** | The contract for one version of the system |
| Across many sessions | Canon authority over session artifacts (`canon/principles/contract-governs-handoff-drift.md`) | The program-level rules vs. session-level recommendations |
| Across program epochs | Canon versioning + epoch bumps (`canon/constraints/governance-change-discipline.md`) | The visible structural markers that make change auditable |

Each operates by the same logic: define a contract, hand it to a consumer, lock it for the duration of the consumer's reliance on it, ship updates as new versioned contracts. The implementations differ; the principle is the same.

---

## Origin

This principle was articulated by the operator during the `klappy/ptxprint-mcp` telemetry-feature planning conversation on 2026-04-30. The deciding-argument case was H-T3 of `klappy://canon/encodings/telemetry-feature-planning-ledger`: the operator was asked whether to amend the v1.2 spec to add two new tools (telemetry_public, telemetry_policy) or to ship a new v1.3 spec. The answer was unambiguous: *"Specs shouldn't be changed after implementation. V1.3 is the right call."* v1.2 was already implemented (Worker, Container, four tools live); amending its spec would have changed the contract under a working build.

A retroactive realization in the same session: an earlier commit (`ae4e60c` on `klappy/ptxprint-mcp`) had edited the v1.2 spec to add references to the not-yet-built telemetry tools. Per the principle, that was a violation. The operator confirmed the revert. The principle was already governing the next decision before it was named.

Two reverts followed:
1. `klappy/ptxprint-mcp` PR #28 — restoring v1.2 spec to its pre-amendment state
2. `klappy/ptxprint-mcp` PR #27 — shipping v1.3 spec as the forward-looking home for the telemetry surface

The principle qualifies as canon by exhibiting a single deciding-argument graduation case (H-T3) plus immediate retroactive application (the H-T4 revert). Future deciding-argument cases will further harden it; for now it ships as `stability: working` and `epoch: E0008.6`.

---

## See Also

- `canon/principles/contract-governs-handoff-drift.md` — canon vs. session-artifact authority; the more general contract-stability principle
- `canon/principles/verification-requires-fresh-context.md` — why a spec author cannot also validate their own implementation against the spec
- `canon/constraints/governance-change-discipline.md` — the four structural markers (canon version, changelog entry, release notes, epoch bump) that make canon changes visible
- `canon/methods/planning-queue.md` — the inverse pattern: implementation-ready specs that wait until they hurt before being built; lives upstream of the lock point
- `canon/principles/maintainability-one-person-indefinitely.md` — the principle whose long-tail cost makes auditable mapping load-bearing for single-maintainer systems
