---
uri: klappy://odd/ledger/2026-04-20-post-4-7-proactive-loop-experience
title: "Observation — Six Sessions of Proactive Loop Since Opus 4.7: Trust Gained, Verbosity Cost, Checkpoint Shape Revealed"
date: 2026-04-20
tags:
  - odd
  - ledger
  - observation
  - opus-4-7
  - proactive-loop
  - tool-ceiling
  - verbosity
  - ai-augmented-workflow
  - bottleneck-inversion
tier: 2
public: true
epoch: E0008.4
---

# Observation — Six Sessions of Proactive Loop Since Opus 4.7

> Six sessions into the proactive loop on Opus 4.7, the workflow is consistent, rule-following, trustworthy, and expensive. Turn-level verbosity is unreadable on mobile; running the full oddkit gauntlet every turn exhausts the tool-call ceiling and turns every turn into a fifteen-minute wait-then-tap cycle. The unexpected signal: the forced ceiling-checkpoints had exactly the right shape — done, next, continue — which suggests the fix is not less proactivity but better checkpoint discipline and phase-aligned tool spending. Separately, a fresh exploration session with no PR context found three real issues that both diff-scoped validators (Bugbot + Sonnet validator) had cleared, confirming that proactivity needs non-diff surfaces to reach full coverage.

## Summary

The workflow that emerged across six sessions following the 4.7 release article settled into a clean shape: handoff → read the journal → orient with oddkit → switch into planning → write the PRD → run the challenge gauntlet → switch into execution → execute directly or dispatch a managed agent → validate with a fresh Sonnet-class agent running the oddkit gauntlet against the PR → wait for Bugbot → merge. It ships. It follows the rules. I trust the output. I am happy with the work.

The costs showed up in two places I didn't predict. First, the verbosity — every turn contained so much narrated reasoning that I had to stop and read for too long before responding. On mobile this is the end of flow. Second, the tool-call ceiling — running the full oddkit gauntlet on every turn exhausted the per-turn budget, producing roughly fifteen-minute turns each ending in "tap continue." The bottleneck moved from my judgment to my thumb.

The interesting part is what the ceiling produced. Each forced cutoff ended with a clean, compressed paragraph: what was done, what is next, blocker or none. All I had to do was say continue. That shape is the shape every turn should have had from the start. The ceiling accidentally taught the right discipline. The fix is not to abandon proactivity; it is to adopt the checkpoint shape voluntarily and spend the tool budget in phase-aligned clumps instead of sprinkling it across every micro-decision.

Separately: during this stretch a fresh session, given no PR context and asked only to poke at oddkit for things that looked off, found three real issues. Both Bugbot and the Sonnet validator had cleared the changes those issues lived in. Diff-scoped review asks "is this change correct?" Non-diff exploration asks "is the system correct?" The two questions catch different defect classes.

## What Settled: The Six-Session Loop

The loop that consolidated post-4.7, consistently, across every session:

- Take the handoff. Read the full journal from the prior session.
- Orient with oddkit. Ask any genuine questions now, not later.
- Declare planning mode out loud.
- Review the plan together. Write the PRD.
- Run the oddkit challenge gauntlet against the PRD explicitly. No implicit gauntlets.
- Declare execution mode out loud. Scope is locked at the gate.
- Execute — either directly as the orchestrator or by dispatching a managed execution agent on Opus 4.7.
- Validate with a fresh Sonnet-class managed agent running the oddkit gauntlet against the PR.
- Wait for Bugbot to review the PR.
- Merge.

It is consistent across the sessions. It produces merges I trust without re-reading. That part worked.

## What Was Good: Trust, Consistency, Rule-Following

The proactive loop delivered the thing I built oddkit for. The model declared modes. It searched canon before claiming. It ran the gauntlet before encoding consequential decisions. It validated before declaring done. When it did not know something, it said so instead of inventing. The rules held across sessions. That was never reliably true before.

The tradeoff I accepted was speed. Proactive was slower than reactive. I was willing to wait periodically because the output was predictable and the rules held. That is the deal I wanted.

## What Cost: Verbosity and the Tool Ceiling

Two costs came in that I had not priced in.

**Verbosity.** Every turn narrated its own reasoning. On desktop this is acceptable: skim, move on. On mobile it is not. Long blocks of reasoning interleaved with the actual decision forced me to stop, read, think about what was being said, and respond. The cognitive cost of reading the turn often exceeded the cognitive cost of the decision being surfaced. That is the wrong ratio.

**The tool ceiling.** Every turn ran the full proactive rhythm. `oddkit_time`, `oddkit_orient`, multiple `oddkit_search` calls, `oddkit_preflight`, `oddkit_gate`, `oddkit_challenge`, often `oddkit_encode`. Combined with whatever actual work the turn was doing, the per-turn tool-call budget hit its ceiling continuously. Every turn became fifteen minutes of watching, then tapping "continue."

Both of these are proactivity costs. The proactive loop is what made the work trustworthy; the proactive loop is also what made every turn expensive. Neither is separable from the benefit they produce by default — and that is the reason this observation exists. A naive "do less oddkit" answer would cost the trust. The shape of the fix has to preserve the trust.

## The Accidental Signal: Ceiling-Checkpoints Had the Right Shape

The part I did not expect: the forced cutoffs were well-shaped.

Each time the ceiling hit, the model produced a compressed paragraph — what was done so far, what was next, any blocker — and then stopped and waited for "continue." That exact shape — done, next, continue — is what every turn should look like. It is readable on a phone. It is resumable without re-orienting. It puts the operator back in the loop at the right cadence.

The ceiling was not the problem. The problem was that the model only produced the clean checkpoint shape when forced to. A voluntary checkpoint shape on every turn, paired with tool-budget spending in phase-aligned clumps instead of per-decision sprinkling, plausibly keeps all of the trust and drops most of the cost.

That is the candidate fix to work out in governance next.

## The Validation Blind Spot: Diff-Scoped Review Misses System-Level Issues

A second observation from the same stretch. A fresh session — no PR context, no handoff, no specific change under review — was asked only to look at the oddkit MCP server for things that seemed off. It found three issues. All three were inside code paths that Bugbot and the Sonnet validator had already signed off on in the PRs that introduced them.

Bugbot and the Sonnet validator are both diff-scoped. They answer "is this change correct?" The fresh exploration session answered "is the system correct?" Different question, different failure class. Integration rot, envelope drift, canon-code parity gaps — these do not show up in a diff because nothing in the diff is wrong. They show up when someone reads the whole thing with a critical eye and no prior.

The conclusion: the two diff-scoped surfaces stay. They earn their keep. A non-diff surface belongs alongside them. Exactly what shape it takes is for the next session to work out.

## What This Means For The Next Round

Three things fall out of this observation, to be worked through next:

1. **The operating contract needs a proactivity-frequency amendment.** "Every turn" is not sustainable. Mode boundaries plus checkpoint shape plus phase-clumped tool spending is the candidate.
2. **The turn format itself needs a contract.** Status bar, not monologue. Done / next / continue on every turn, regardless of whether the ceiling forced it.
3. **The review surface set needs a non-diff entry.** At minimum a standing exploration-agent charter; possibly also tool-contract probes, cross-tool behavior probes, a canon↔code parity agent, and handoff replay.

Each of those is its own scoped piece of work. This observation is the input to all of them, not the specification for any of them.

## Epoch Context

Written during E0008 (Observability), with sub-epochs E0008.1 (x-ray tracing + KV elimination) and E0008.2 (time awareness) already shipped and the agent-team pilot (epoch-adjacent) running during this same stretch. The proactive loop was the workflow substrate on top of which those ships happened. None of the costs described here invalidate the ships; they describe the substrate, not the output.
