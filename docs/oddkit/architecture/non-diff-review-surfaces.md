---
uri: klappy://docs/oddkit/architecture/non-diff-review-surfaces
title: "Non-Diff Review Surfaces — Catching System-Level Issues Diff-Scoped Validators Miss"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["docs", "oddkit", "architecture", "review", "validation", "non-diff", "system-scoped", "exploration-agent", "tool-contract", "canon-parity"]
epoch: E0008.4
date: 2026-04-20
derives_from: "odd/ledger/2026-04-20-post-4-7-proactive-loop-experience.md, odd/ledger/2026-04-19-validator-closeout-and-0.17.0.md, odd/ledger/journal/2026-04-17-pr100-rage-quit-handoff.md"
complements: "canon/methods/self-audit.md, canon/constraints/release-validation-gate.md"
governs: "Review-surface architecture for oddkit and klappy.dev releases"
---

# Non-Diff Review Surfaces — Catching System-Level Issues Diff-Scoped Validators Miss

> Cursor Bugbot and the Sonnet validator agent are both diff-scoped: they answer "is this change correct?" Neither answers "is the system correct?" A fresh exploration session asked only to look at oddkit for things that seemed off found three real issues both diff-scoped surfaces had cleared. Different question, different defect class. The fix is not to replace the diff-scoped surfaces but to add system-scoped surfaces alongside them. Five candidates ranked by cost and confidence: standing exploration agent (cheapest, already proven), tool-contract probes, cross-tool behavior probes, canon↔code parity agent, handoff replay.

---

## Summary — Two Questions, Two Surface Classes

The current oddkit release validation stack has two surfaces:

- **Cursor Bugbot** runs against every PR. Catches code-level defects in the diff.
- **Managed Sonnet validator agent** runs the oddkit gauntlet against every PR. Catches governance-level defects in the diff.

Both are diff-scoped. Both ask: *is this change correct?*

A fresh session asked only to explore the oddkit MCP server for things that looked off found three real issues. All three lived in code paths the diff-scoped surfaces had cleared. The fresh session asked a different question: *is the system correct?*

This document specifies five candidate non-diff review surfaces, ranked by setup cost and confidence in payoff. The recommendation is to start with the cheapest (standing exploration agent), which has already proven itself in an ad-hoc run, and add the others as patterns of missed-defect-class accumulate.

---

## Why Diff-Scoped Surfaces Are Insufficient

Diff-scoped review answers a narrow, important question: *given this change, is anything in the change wrong?* Both Bugbot (line-level) and the Sonnet validator (governance-level) excel at this question.

They are structurally blind to a different class of defect:

- **Integration rot.** Two changes that each individually pass review but interact incorrectly when combined. Neither diff sees both changes.
- **Envelope drift.** A response shape that quietly changes across releases. Each individual release looks right because the change is small; the cumulative drift is invisible to any single PR review.
- **Canon↔code parity gaps.** Code that hardcodes interpretation canon was supposed to define. The PR that added the hardcode passed because nothing in the diff was wrong; the system became wrong.
- **Tool-contract violations.** Required envelope fields silently dropped. Each call still returns a value; the contract no longer holds. A diff review that doesn't compare envelopes against a contract spec sees no defect.
- **Handoff replay failures.** A handoff URI that worked when written silently breaks because something downstream changed. No PR introduced the break; many small changes accumulated to it.

These defects do not show up in a diff because nothing in any individual diff is wrong. They show up when someone reads the system as a whole with a critical eye and no prior commitment to any specific change.

---

## The Five Candidate Surfaces

Ranked by setup cost (low to high) and by confidence in payoff (high to low based on the available evidence).

### Surface 1 — Standing Exploration Agent

**Setup cost:** Lowest. A prompt + a schedule. No code.

**Confidence in payoff:** Highest. This pattern has already produced three real findings in a single ad-hoc run.

**Charter:** Spin up a fresh Claude (Opus 4.7-class) session with no PR context, no handoff, no specific change to review. Give it the full canon, the oddkit production URL, and a single instruction: *look at the oddkit MCP server. Find things that seem off.* Let it run. Encode findings to a session ledger. Triage in the next working session.

**Cadence:** Weekly to start. Increase or decrease based on finding rate.

**Failure modes to watch:**
- Agent re-finds the same issue every run. Solution: encode dismissed findings to a "known and accepted" list the next agent can read first.
- Agent drifts into diff-scoped behavior because the canon habituates it. Solution: explicit instruction in the charter to avoid recent PRs and look at older / unchanged code paths.

**Implementation outline:**
1. Author `docs/oddkit/review/standing-exploration-charter.md` with the agent's full instructions.
2. Use the existing managed-agents infrastructure (`/mnt/skills/user/managed-agents/SKILL.md`) to dispatch.
3. Findings encode to `odd/ledger/exploration-runs/YYYY-MM-DD.md`.
4. Review at the next session.

### Surface 2 — Tool-Contract Probes

**Setup cost:** Medium. Test harness, contract spec, CI integration.

**Confidence in payoff:** High. Catches envelope drift and silent contract violations that no human review surfaces because the diffs are line-correct.

**Charter:** For every release, call every oddkit tool with a small set of canonical inputs. Assert envelope shape against a contract spec: `server_time` present, `governance_source` declared where required, `action` / `result` / `assistant_text` present, error paths return actionable text rather than null or empty.

**Cadence:** On every release. Failure blocks promotion.

**Implementation outline:**
1. Author the contract spec at `docs/oddkit/contracts/tool-envelope-spec.md`. One section per tool.
2. Build a probe runner (Python or Node script) at `scripts/contract-probes.ts`.
3. Wire into the release pipeline. Failure blocks the production promotion PR.
4. Every contract change requires updating both the spec and the probe.

### Surface 3 — Cross-Tool Behavior Probes

**Setup cost:** Medium-high. Requires modeling expected cross-tool interactions.

**Confidence in payoff:** Medium-high. Catches integration rot that neither single-tool contracts nor diff review can see.

**Charter:** Call combinations of tools and assert expected relationships. Examples:

- Encode an artifact, then search for it. Result must include the encoded artifact.
- Orient on a goal, then preflight on the same goal. Suggested constraints must overlap.
- Get a known-canon URI, then search for a phrase from that URI. Result must include the URI.
- Validate a completion claim, then encode the validation. Encoded artifact must reference the same claim.

**Cadence:** On every release.

**Implementation outline:**
1. Author `docs/oddkit/contracts/cross-tool-invariants.md` listing each invariant with its rationale.
2. Extend the probe runner from Surface 2 to handle multi-step probes.
3. Failure blocks promotion.

### Surface 4 — Canon↔Code Parity Agent

**Setup cost:** High. Requires the agent to read both canon and code and produce a structured drift report.

**Confidence in payoff:** Medium-high. The Vodka anti-pattern audit already proved one-shot value; standing this up means catching drift before the next post-mortem.

**Charter:** Periodically dispatch a managed agent with read-only access to the klappy.dev canon and the oddkit code. Charter: identify cases where code hardcodes interpretation that canon defines (or should define). Produce a drift report.

**Cadence:** Monthly to start. Increase if drift accumulates faster.

**Failure modes to watch:**
- False positives where canon and code legitimately diverge by design. Solution: maintain `docs/oddkit/architecture/canon-code-divergences-by-design.md` and have the agent read it first.
- Agent over-flags trivial drift. Solution: rank findings by tier of canon and load-bearing-ness of the code.

**Implementation outline:**
1. Author `docs/oddkit/review/canon-code-parity-charter.md`.
2. Dispatch via managed agents. Output to `odd/ledger/parity-runs/YYYY-MM-DD.md`.
3. Triage findings during the next session.

### Surface 5 — Handoff Replay

**Setup cost:** Highest. Requires capturing handoff state in a replayable form, then comparing replay results to expected outcomes.

**Confidence in payoff:** Lower confidence, but uniquely diagnostic when it fires. Catches semantic drift between sessions that no other surface can see.

**Charter:** Take a handoff from N sessions back. Replay its tool calls against current production. Diff results. Catches silent URI breakage, semantic drift in tool responses, and changes in canon-snippet ranking that affect what an agent learns from search.

**Cadence:** Quarterly, or on-demand when investigating a regression.

**Implementation outline:**
1. Define handoff replay format. Likely an extension to `odd/handoffs/` frontmatter.
2. Build replay runner.
3. Manual triage of diff output. This is unlikely to ever be fully automated triage.

---

## Recommended Phasing

**Phase 1 (immediate).** Surface 1 (standing exploration agent). Author the charter, dispatch one agent per week, triage findings in the next session. Confidence is highest, cost is lowest. Builds the muscle for non-diff review without infrastructure investment.

**Phase 2 (next epoch).** Surface 2 (tool-contract probes). Author the contract spec alongside any envelope change. Build the runner once the spec is established. Wire into release pipeline. This is the highest-leverage automation: catches the silent envelope drift that historically lives outside any single PR's scope.

**Phase 3 (when Phase 2 is mature).** Surface 3 (cross-tool behavior probes). Builds on the Phase 2 runner. Requires explicit modeling of cross-tool invariants, which is itself a useful design exercise.

**Phase 4 (as drift evidence accumulates).** Surface 4 (canon↔code parity agent). Standing version of the audit that has already proven one-shot value. Cadence determined by how fast drift actually accumulates in practice.

**Phase 5 (deferred).** Surface 5 (handoff replay). Lowest confidence, highest cost. Reserve for either (a) a specific regression investigation or (b) a future epoch focused on long-term semantic stability.

---

## What This Document Is Not

- Not a replacement for Bugbot or the Sonnet validator. Both stay. They earn their keep on diff-scoped defects.
- Not a fully-specified implementation plan for any of the five surfaces. Each gets its own implementation doc when prioritized.
- Not a claim that all five surfaces should be built. The minimum viable improvement is Surface 1 alone. Subsequent surfaces are additive based on observed value.

---

## Validation Criteria

This architecture is working when:

1. At least one finding per quarter from a non-diff surface is real and actionable.
2. The non-diff surfaces produce defect classes the diff-scoped surfaces never produced.
3. Time spent triaging false positives stays under 20% of triage time.
4. The release pipeline has not been slowed materially by probe runtime.

This architecture is failing when:

1. Non-diff findings are dominated by issues already known and accepted.
2. The diff-scoped surfaces stop being trusted because operators assume non-diff catches everything (it does not; they are complementary).
3. Probe maintenance becomes a tax that exceeds the defect-class value it provides.
