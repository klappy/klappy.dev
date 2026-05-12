---
uri: klappy://canon/constraints/audit-gates-are-spawned-agent-sessions
title: "Audit Gates Are Spawned Agent Sessions, Not Pattern Matchers"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "constraint", "governance", "validation", "audit", "spawned-agent-sessions", "vodka-architecture", "anti-pattern", "ci", "drift", "sync"]
epoch: E0009
date: 2026-05-07
derives_from: "canon/methods/governance-validation-via-agents.md, canon/methods/reference-integrity-audit.md, canon/constraints/canon-integration-audit.md, canon/principles/vodka-architecture.md, canon/values/axioms.md"
complements: "canon/constraints/borrow-evaluation-before-implementation.md, canon/constraints/no-irreversible-action-without-epistemic-justification.md, canon/methods/spawned-agent-session-substrate-options.md"
governs: "Any merge-blocking validator that audits canon, documentation, code-vs-canon sync, cross-reference integrity, or any other governance surface where the check requires LLM-grade judgment. Mechanical scripts (regex, AST walkers, lint rules) MAY run as triggers, schedules, or pre-flight hints but MUST NOT serve as the gate. The gate is a spawned agent session that fetches canon at runtime and produces structured findings."
status: active
---

# Audit Gates Are Spawned Agent Sessions, Not Pattern Matchers

> When canon defines what to check and the check requires reading prose, code, and history together to render a judgment, the gate is a spawned agent session — not a regex, not a lint rule, not a hand-rolled script. A spawned agent session is a fresh, isolated LLM-with-tools run dispatched per audit cycle that fetches canon at runtime, observes the artifact directly, and emits structured findings; the substrate that hosts it (Anthropic Managed Agents, Cloudflare Sandboxes with a Claude Code or OpenCode harness, future entrants) is implementation, not governance. Mechanical mechanisms may trigger the session or surface hints; they may not block merge on their own findings. This is Vodka Architecture applied to validation: governance fetched, judgment delegated, false confidence forbidden.

---

## Summary — Pattern Matchers Cannot Replace Judgment

`klappy://canon/methods/governance-validation-via-agents` already establishes that *"Canon defines what to check. Agents do the checking."* This constraint makes the next step explicit: **mechanical alternatives to that pattern are forbidden as gates**, even when they look cheaper or faster.

A pattern matcher (regex over markdown, AST walker over code, hand-rolled drift checker) can detect literal anomalies — a path that doesn't exist, a frontmatter field that fails a type check, a forbidden phrase. It cannot detect:

- A canon document that describes a deployment topology that no longer matches reality, when the words used don't include any specific path token.
- A handoff that recommends an implementation approach that has been superseded by a better option named in adjacent canon.
- A cross-canon coherence violation — claims that are individually correct but contradict each other.
- The drift modes in `klappy://canon/methods/reference-integrity-audit` that require *"oddkit search by title or key terms from the dead URI before classifying as DEAD"* — i.e., the LLM-grade act of recognizing that two surfaces describe the same thing under different names.

Putting a pattern matcher at the gate creates a worse problem than no gate at all: **false confidence**. Authors and reviewers see green CI and assume the audit ran. The drifts the matcher cannot see propagate untouched, with the green check as cover.

The substrate that runs the agent session is a separate concern from the constraint's binding. Anthropic Managed Agents was the first commercially-available substrate that fit this shape; Cloudflare Sandboxes (GA April 2026) is another; more will follow. Canon names the abstract requirement; `klappy://canon/methods/spawned-agent-session-substrate-options` catalogues the implementation choices.

---

## What "Spawned Agent Session" Means

The proper noun avoids vendor lock; the load-bearing properties are concrete and substrate-agnostic.

- **Spawned** — created per audit cycle, not a persistent service. One audit, one session, terminated on verdict emission.
- **Clean** — fresh context, no carryover from caller, no shared state with the dispatcher. This aligns with `klappy://canon/principles/verification-requires-fresh-context`.
- **Agent** — an LLM with tool access running a multi-turn loop, distinguished from a single-call completion or a deterministic script. The agent decides which tools to call and in what order.
- **Session** — a bounded lifecycle: spawn, work, terminate, return structured verdict. State that needs to persist across audits lives outside the session, not inside it.

A run that lacks any of these properties is not a spawned agent session and does not satisfy this constraint.

---

## When This Constraint Binds

This constraint binds when **all three** are true:

1. **There is canon that defines what to check.** A constraint, a method, a checklist, a schema. If there is no canon definition, the audit is not a governance audit and this constraint does not apply.
2. **The check requires LLM-grade judgment to apply.** The matcher would have to read prose meaning, recognize equivalence under renaming, follow supersession chains, or cross-reference adjacent canon to render a true verdict. Pure structural checks (does this YAML field exist; does this enum value match a fixed list) do not require LLM-grade judgment and are out of scope.
3. **The mechanism is gating something** — a PR merge, a release tag, a publication. If the mechanism only reports (does not block), it is a hint surface, not a gate, and is governed by the lighter-weight rules in §What Mechanical Mechanisms May Do.

When all three bind, the gate MUST be a spawned agent session following the workflow in `klappy://canon/methods/governance-validation-via-agents`.

---

## What the Gate Must Be

The gate is a spawned agent session dispatched per audit cycle that:

- **Fetches canon at runtime** via `oddkit_get` / `oddkit_search`. Canon paths and URIs are not hardcoded in the launcher. New canon added between cycles is picked up automatically.
- **Reads the artifact under review** — the PR diff, the file under change, the deployed state — using bash, file ops, or HTTP fetch as needed. Direct observation, per Axiom 4.
- **Compares the artifact against canon** using LLM judgment. Recognizes equivalence under renaming, follows supersession, cross-references adjacent canon. The comparison shape is the agent's discovery via canon, not the launcher's instruction.
- **Produces structured findings** — a list of (location, claim, evidence, classification, suggested fix) tuples that a human or follow-up agent can act on. `oddkit_encode` is the recommended structuring tool; the output is saved by the caller per the encode-does-not-persist contract.
- **Blocks the gate on substantive findings.** Cosmetic findings may pass with annotation; substantive findings (drift between canon and reality, contradictions between canon docs, broken supersession chains) block until resolved or explicitly waived with a recorded reason.

The session's system prompt MUST include the foundation per the operating contract (Identity of Proactive Integrity, Foundational Axioms, oddkit posture). Task-specific role appended per cycle. Model choice per `klappy://canon/methods/governance-validation-via-agents` (Sonnet for review-shaped tasks, Opus for fix-shaped tasks).

The substrate that hosts the session — Anthropic Managed Agents, Cloudflare Sandboxes with Claude Code or OpenCode, a self-hosted equivalent, or any other implementation that satisfies the four properties in §What "Spawned Agent Session" Means — is a project-level choice. Cost shape, vendor lock surface, and security properties differ across substrates; `klappy://canon/methods/spawned-agent-session-substrate-options` catalogues the current options.

---

## What Mechanical Mechanisms May Do

Mechanical mechanisms (regex, AST walkers, lint scripts, GitHub Actions workflows) MAY:

- **Trigger** the audit. A workflow that fires on `pull_request: paths: ['canon/**', 'docs/**']` and dispatches a spawned agent session is the canonical shape. The trigger is mechanical; the gate is the session.
- **Pre-filter** the input set. A script that lists changed files, extracts the diff, or assembles a context bundle for the session is fine. The script reduces context size; it does not render verdicts.
- **Provide hints** — non-blocking annotations the session reads as input. A hint that says "this file references a path that grep cannot find" is useful context for the session. It is not a verdict.
- **Run structural checks** that genuinely do not need LLM judgment — JSON schema validation, frontmatter required-field presence, file-size limits. These are out of this constraint's scope and may run as gates of their own when the check is purely structural.

Mechanical mechanisms MUST NOT:

- **Block merge based on their own findings** when the underlying check requires LLM judgment. A regex that thinks it found drift but cannot read the surrounding prose has not found drift; it has found a pattern. Patterns are not verdicts.
- **Force authors to write canon in CI-friendly formats** to be auditable. Canon's shape is governed by `klappy://canon/meta/writing-canon`, not by the regex's parser. If a hint surface needs structured input, write a separate machine-readable index (schema-validated YAML, oddkit-resolved frontmatter); do not constrain canon prose.
- **Be cited as the authority for a constraint.** A canon constraint that says "the check is this regex" has hardcoded the check into the script's lifetime. When the regex misses something, the constraint becomes a liability that has to be either bypassed or rewritten — both expensive. Canon defines what; agents discover how.

---

## What This Forbids

The following patterns are recorded violations of this constraint:

- **Hand-rolled CI scripts that audit canon prose against repo state and block merge on their own findings.** Including drift checkers, path-integrity validators, "documentation linters" that try to validate facts. The category is forbidden regardless of how clever the heuristics are.
- **Canon constraints that prescribe a specific regex/pattern as the audit mechanism.** Constraints describe what to check; they do not name the script that does the checking. A constraint that reads *"validate paths via `scripts/check-canon-drift.py`"* has hardcoded a tool into governance — exactly the failure mode `klappy://canon/principles/vodka-architecture` forbids.
- **Author-format requirements driven by audit tooling.** A constraint that requires canon to use `**NEW** \`path\``-style markers to be auditable is the audit shaping canon. The correct direction is the opposite: canon shapes the audit.
- **"Aggressive on the principle that false positives are cheap."** False positives are not cheap. They train authors to bypass the gate, write in CI-friendly formats, or disable the check entirely when convenient. Once authors have learned to bypass once, the gate is no longer a gate. The principle is: gates run by mechanisms that produce real verdicts; mechanisms that produce false verdicts cannot be gates.
- **"Layer 2 — bot prompt as advisory" while a mechanical Layer 1 is the actual gate.** Inverting this is the correct architecture: the agent session is the gate, mechanical signals are inputs. A repo that ships both with the session advisory and the script gating has the architecture backwards.
- **Naming a specific vendor product as the required substrate.** "The gate must run on [vendor]'s managed-agent service" hardcodes vendor lock into governance. Canon names the abstract requirement (spawned agent session); substrate choice is a project decision and may evolve. An earlier version of this constraint named "Managed Agents" throughout, treating the proper noun as the requirement; that was a vendor-lock smell that took a follow-up review to surface.

---

## What This Does Not Forbid

- **Mechanical CI checks for genuinely structural concerns** — schema validation, type checks, build success, test pass. These do not require LLM judgment and are not governed by this constraint.
- **Pre-flight hint scripts** that surface candidates for the session to review. Useful, encouraged, not gates.
- **Local developer tooling** — a script someone runs on their own machine to find suspicious patterns is fine. The constraint binds when the mechanism gates merge.
- **Existing low-LLM-judgment audits** — frontmatter schema validation per `klappy://canon/constraints/frontmatter-validation-before-merge` is structural and may continue to run as a mechanical gate. The line is judgment, not mechanism.
- **Choosing a specific vendor substrate for a specific project's audit.** What's forbidden is canon naming the substrate as the requirement. A project picking Anthropic Managed Agents (or Cloudflare Sandboxes, or anything else) as its audit substrate is a project decision and is fine; that decision belongs in a project D-decision or operating note, not in canon.

---

## How to Migrate Existing Mechanical Gates

When a project has shipped a mechanical gate that this constraint forbids:

1. **Demote the script to a hint.** Continue running it; remove the merge-blocking behavior. Findings post as a non-blocking comment or annotation.
2. **Stand up a spawned agent session** per `klappy://canon/methods/governance-validation-via-agents`. The session's task references the relevant canon constraints; the launcher does not encode the audit logic. Substrate choice per `klappy://canon/methods/spawned-agent-session-substrate-options`.
3. **Re-route the trigger.** The CI workflow that ran the script now dispatches the agent session, optionally passing the script's findings as hint input.
4. **Retire the prescriptive constraint** that codified the mechanical approach. Replace with a thin pointer to this constraint and to `governance-validation-via-agents`.
5. **Record the supersession.** Add `supersedes: <old-uri>` to the new constraint or pointer; add `superseded_by: klappy://canon/constraints/audit-gates-are-spawned-agent-sessions` to the retired one.

The migration is two-way reversible until the script is deleted. Keeping the script as a hint while the agent session runs as the gate is fine — that is the correct end state for many projects.

---

## Worked Anti-Pattern (Recorded 2026-05-07)

A project shipped a "canon drift detection" PR that:

- Added a 289-line Python script with regex patterns for `**NEW** \`path\``, `**EDIT** \`path\``, etc., plus prose forms.
- Added a GitHub Actions workflow that ran the script on every PR touching canon directories and blocked merge on findings.
- Added a Tier-2 constraint that codified the script as the authoritative validation mechanism, including the rule *"Authors MUST NOT override drift findings to merge."*
- Added a "Layer 2 — bot prompt" markdown file as advisory for *"semantic drift the script can't catch."*
- Defended the architecture as *"aggressive on the principle that false positives are cheap."*

The PR was canon-conformant in the letter (it cited prior decisions, included reversibility notes, used the constraint frontmatter shape). It was forbidden in spirit by the canon already at `klappy://canon/methods/governance-validation-via-agents` (*"governance fetched, never hardcoded"*), and would have systematically failed at the kind of drift it was supposed to catch — including the drifts in the same repo that motivated it (a topology claim that didn't reference any path token; a handoff doc that recommended a stale fetch mechanism whose words contained no `**NEW**` marker).

The same architectural mistake had been recorded earlier in `klappy://canon/constraints/canon-integration-audit §Summary` Gap 3: a same-session Python frontmatter validator passed all four PR files as compliant; an independent agent session dispatched per `release-validation-gate` refuted the claim and caught a `derives_from` shape violation the local script's enum-and-presence checks had missed. Local mechanical validators producing false-clean results while a spawned agent session finds the real violations is not an exotic failure mode — it is the predictable failure mode of mechanical-as-gate. That earlier incident is the direct precedent for this constraint; the 2026-05-07 PR is the same lesson surfacing a second time at higher stakes.

The fix in both cases is identical: retire the script-as-gate, demote it to a hint surface (or delete it entirely), dispatch a spawned agent session per existing canon methods for the actual audit, and retire the constraint that prescribed the script.

---

## Failure Modes and Mitigations

- **"But the agent session is too slow / too expensive."** Cost per audit cycle is real but bounded; sessions take 1–5 minutes for typical audits. False-confidence drift is unbounded. The cost comparison is asymmetric in the session's favor unless the project has zero canon-judgment surface — in which case this constraint does not bind. Cost shape varies by substrate; see `klappy://canon/methods/spawned-agent-session-substrate-options` for current options and their billing dimensions.
- **"But sometimes the session gets it wrong."** Agreed; this constraint requires the gate to be an LLM, not to be infallible. The mitigation is the same as for any LLM-as-judge surface: structured output, recorded reasoning, human override path, and a feedback loop to canon. A wrong session verdict is corrected by editing canon (or the artifact); a wrong regex is corrected by editing the regex, which then has to be re-audited indefinitely.
- **"But there is no upstream canon for what to check."** Then write canon first. The session is downstream of canon. If there is no canon, there is nothing to validate against, and this constraint does not bind.
- **"But the trigger is a useful gate by itself."** Triggers are gates only for purely structural concerns. If the trigger blocks merge based on a pattern verdict (not a structural check), it is a gate masquerading as a trigger, and this constraint binds.

---

## Retraction Conditions

This constraint should be retracted or narrowed if any of the following becomes true:

- **A mechanical mechanism is demonstrated to render LLM-grade verdicts reliably.** If a future static analyzer can read prose, recognize equivalence under renaming, follow supersession chains, and cross-reference adjacent canon as well as a spawned agent session does — and at lower cost — the gate-must-be-an-agent rule loses its grounding. The constraint becomes "the gate must be the highest-judgment mechanism available," and the agent session is no longer privileged.
- **No spawned-agent-session substrate is available across vendors at viable cost.** If every commercially-available substrate is deprecated, priced beyond the cost of false-confidence drift for typical projects, or otherwise unavailable, the constraint binds different mechanisms by default and this version retires. Single-vendor unavailability is not sufficient to trigger retraction; this constraint is explicitly substrate-agnostic.
- **Empirical evidence shows agent sessions miss the same drifts the script catches and add their own miss class.** If a project runs both the agent-session gate and a hint script for six months and the session's miss rate exceeds the script's miss rate on a meaningful sample, the gate-vs-trigger architecture is wrong and this constraint retracts.

Absent these conditions, the constraint holds.

## Prior Art and Why a New Name

The pattern this constraint codifies has analogs in adjacent literature:

- **"Smart endpoints, dumb pipes"** (Fowler, microservices) — the same shape applied to message routing. Here applied to validation: judgment lives at the agent endpoint; the pipe (CI workflow, hook script) carries the trigger.
- **"Policy as code" vs "policy as data"** (OPA, governance literature) — this constraint is closer to "policy as canon, judgment as agent" — neither code nor data, but prose definitions consumed by an LLM at runtime.
- **Linters as advisory, type checkers as gates** (general SE practice) — the type checker is gating because its verdict is sound; the linter is advisory because its verdict requires judgment to apply. This constraint generalizes that distinction beyond compilation: any check requiring judgment lives in the judging mechanism, not the rule-encoding one.

The constraint earns its own name because none of these prior-art frames captures the specific governance-fetched-at-runtime shape that `klappy://canon/principles/vodka-architecture` enables. The agent session fetching canon at runtime is what makes the gate evolve as governance evolves without any launcher edits — that property is the load-bearing one, and it doesn't appear in the prior art under any single name.

## Reversibility of This Constraint

Two-way door. Retiring this constraint requires:
1. Marking `status: superseded` and adding `superseded_by: <new-uri>`.
2. Updating downstream constraints and adoption pointers to reference the successor.
3. No code change is required by retraction — the agent sessions already in service continue running; they simply stop being mandatory.

The cost of being wrong is bounded: projects that adopt this constraint and find it doesn't fit their workload demote their agent-session gate to a hint and retire the adoption pointer. No data is lost. No surface goes dark.

---

## Naming History

This constraint was originally drafted under the name "Audit Gates Are Managed Agents, Not Pattern Matchers" and shipped in PR #177 on 2026-05-07. The name treated Anthropic's Managed Agents product (the first commercially-available substrate to fit this shape) as if it were the abstract requirement. Follow-up review on 2026-05-09 surfaced the vendor-lock smell: the load-bearing properties are spawn-per-cycle, clean context, agentic loop, canon-fetched-at-runtime, and structured findings — none of which depend on which vendor hosts the session. Cloudflare Sandboxes (GA April 2026) made the multi-substrate landscape concrete enough to force the abstraction.

The rename is not a supersession of a stable constraint; it is a delayed correction to the original review, with the substantive arguments unchanged.

---

## Relationship to Other Canon

- `klappy://canon/methods/governance-validation-via-agents` — the prescriptive method this constraint references. Defines how the agent session is configured and dispatched. (Sibling vendor-naming follow-up: this method's title still reads "Governance Validation via Managed Agents" and its body uses the proper noun in places; a parallel rename is anticipated.)
- `klappy://canon/methods/spawned-agent-session-substrate-options` — the catalog of substrate implementations (Anthropic Managed Agents, Cloudflare Sandboxes with various harnesses, future entrants) with cost shapes, vendor lock surfaces, and security properties.
- `klappy://canon/methods/reference-integrity-audit` — the sibling method for cross-reference audits. Same architecture; different scope.
- `klappy://canon/constraints/canon-integration-audit` — the prior incident at smaller scale (local Python frontmatter validator gave false-clean; spawned agent session caught real violations). Direct precedent for this constraint.
- `klappy://canon/principles/vodka-architecture` — the principle this constraint operationalizes. Governance fetched, not hardcoded.
- `klappy://canon/principles/verification-requires-fresh-context` — the principle the "clean" property in §What "Spawned Agent Session" Means derives from.
- `klappy://canon/constraints/borrow-evaluation-before-implementation` — the analogous constraint for code: handrolling against an upstream substrate is forbidden when borrow is available. This constraint is the audit-mechanism equivalent.
- `klappy://canon/values/axioms` — Axiom 4 ("You Cannot Verify What You Did Not Observe") is what makes pattern matchers insufficient as gates. A pattern is not an observation; it is a guess at what an observation would say.

---

## See Also

- `klappy://canon/methods/governance-validation-via-agents` — how the gate is configured
- `klappy://canon/methods/spawned-agent-session-substrate-options` — substrate landscape and cost shapes
- `klappy://canon/methods/reference-integrity-audit` — sibling method, scoped to cross-references
- `klappy://canon/constraints/canon-integration-audit` — the prior incident this constraint generalizes
- `klappy://canon/principles/vodka-architecture` — the principle this enforces
- `klappy://canon/constraints/borrow-evaluation-before-implementation` — the code-side analog
