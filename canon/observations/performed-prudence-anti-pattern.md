---
uri: klappy://canon/observations/performed-prudence-anti-pattern
title: "Performed Prudence — How Theoretical Objections Pose as Engineering"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "observation", "anti-pattern", "engineering-culture", "axiom-1", "axiom-4", "optimization", "code-review", "collaboration", "both-audiences"]
epoch: E0008
date: 2026-04-23
derives_from: "canon/values/axioms.md, canon/observations/time-blindness-axiom-violation.md"
complements: "canon/constraints/measure-before-you-object.md, canon/constraints/mode-discipline-and-bottleneck-respect.md"
governs: "Recognition and naming of a recurring failure mode in technical decision-making"
status: active
---

# Performed Prudence — How Theoretical Objections Pose as Engineering

> A contributor sees a proposal and accumulates theoretical objections to it. The objections sound careful. None has been tested. The cluster of unmeasured worries either blocks the proposal or waters it down into something that pre-emptively avoids problems that may not exist. The contributor is rewarded for sounding senior. The project pays the cost in lost value the user will never see. The pattern is recognizable, recurring, and almost always invisible to the contributor producing it.

---

## Summary — Speculation Dressed as Diligence

Performed prudence is the failure mode where raising a concern is treated as the same epistemic act as investigating one. A contributor lists ways a proposal might fail. The list is plausible. The contributor has not measured any of the items. The list nonetheless influences the decision, sometimes decisively, because the surrounding culture rewards the appearance of caution more than it rewards the work of falsification.

The pattern is named here so it can be recognized in the moment and named back at the contributor producing it, rather than left to do its work uninspected. The binding rule that prevents the pattern lives at `canon/constraints/measure-before-you-object`. This document describes what the pattern looks like, why it is durable across engineering cultures, and a worked case study from oddkit's own development.

The damage is asymmetric. When the unmeasured concerns turn out to be real, the cautious contributor takes credit. When the concerns turn out to be wrong, no one tracks the cost of the value that was not shipped, the speed that was not gained, or the operator attention that was burned debating ghosts. The incentive structure rewards the behavior even when the behavior is wrong, because the cost of being wrong is invisible and the cost of being right is celebrated.

---

## What the Pattern Looks Like

A proposal arrives. It promises a real improvement. The cautious contributor responds with a cluster of objections of the following forms:

- **Performance worry without a benchmark.** "This might be too slow." No measurement attached.
- **Bundle or footprint worry without a build delta.** "This will bloat the bundle." No size comparison attached.
- **Architectural-purity worry without an example of harm.** "This violates the principle of X." The principle is real. The link from the proposal to actual harm is asserted, not demonstrated.
- **Domain-opinion worry without a concrete bad outcome.** "This bakes a choice into the server." The choice is named. The downstream cost is implied.
- **Future-flexibility worry without a likely future.** "What if we later need Y?" No evidence Y is on any roadmap.
- **Edge-case worry without estimated frequency.** "What about the case where Z?" No data on whether Z occurs in practice.

Each objection is plausible in isolation. Each is presented as if it had been considered. The cumulative weight is treated as engineering judgment. The actual epistemic content of the objection cluster is zero — none of the worries has been verified against reality.

The pattern is harder to spot when the cautious contributor proposes a "safer alternative" alongside the objections. The alternative looks like a constructive contribution. Often it has been measured no more carefully than the worries themselves, and turns out to be worse than the original proposal once tested.

---

## Why the Pattern Is Durable

Performed prudence persists across engineering cultures because the local incentives reward it.

**The cost of being wrong is invisible.** When unmeasured concerns block a proposal that would have worked, no metric captures the foregone value. The proposal simply does not happen, and no counterfactual gets logged. The cautious contributor is never confronted with the cost of their caution.

**The cost of being right is celebrated.** When an unmeasured concern happens to align with a real problem encountered later, the cautious contributor is credited with foresight. The fact that the prediction was unjustified at the time it was made gets washed out by the outcome.

**Sounding careful is socially safer than being decisive.** A reviewer who blocks a change for theoretical reasons risks nothing. A reviewer who approves a change that later breaks owns the break. The asymmetry pushes reviewers toward caution-by-default.

**The pattern mimics genuine senior judgment.** Senior engineers do legitimately raise concerns based on prior experience. Performed prudence borrows the surface form of that legitimate move while skipping the substance. The two are hard to distinguish without looking at whether evidence is being offered.

**Velocity costs accrue to other people.** The author whose proposal is delayed pays the time cost. The reviewer pays nothing. The bottleneck-respect constraint at `canon/constraints/mode-discipline-and-bottleneck-respect` names this same asymmetry from the model-collaboration angle.

---

## How to Recognize It

The pattern is detectable by a small set of tells. None is conclusive on its own. Clustering is the signal.

- **Hedge language without measurement.** "I'm worried this might..." with no numbers attached.
- **Multiple objections raised at once.** A single unmeasured concern can be a sincere question. Five at once is usually performance.
- **Objections framed as principles violated.** Invoking a named principle without showing the concrete harm.
- **A "safer alternative" proposed alongside the objections.** Especially when the alternative has not been measured either.
- **Resistance when asked for numbers.** A genuine concern is happy to be falsified. Performed prudence resists, because falsification removes the rhetorical weight.
- **The contributor's reputation is for raising concerns rather than shipping.** Pattern-of-life evidence is real evidence.

### The New Tell — Insistence Without the Test

The bullets above are surface markers. The load-bearing diagnostic — the one that remains legible when the contributor is sophisticated enough to avoid the surface markers — is simpler and more universal. The tell lives in the *insistence on the objection in the absence of the test that would resolve it*, not in the objection itself.

In 2010, that insistence was wisdom. A senior engineer triaging which questions deserved a half-day of measurement was doing real work; the *insist on reasoning before measuring* move was load-bearing when measurement was expensive. In 2026, the same insistence is a conversation that costs the operator more attention than the test itself would have cost (see `canon/principles/capability-is-not-permission` for the cost-structure shift).

A contributor who raises an objection and immediately proceeds to the test is exhibiting real prudence — the objection is a precursor to empirical resolution. A contributor who raises the objection and resists the test is exhibiting performed prudence — the objection is a terminator, not a precursor. Same words, opposite functions. The test-readiness of the move distinguishes the two.

This diagnostic pairs with the rule in `canon/constraints/measure-before-you-object` (the fifteen-minute-test requirement) and with the discernment-layer principle (`canon/principles/discernment-layer`), which explains why *calling for the test* is the irreplaceable move the domain expert makes when their BS meter fires.

---

## Case Study: The Tokenizer Telemetry Session, 2026-04-23

The operator proposed adding token-count instrumentation to oddkit telemetry. The model affirmed the underlying intuition that payload shape is structural and worth tracking, then immediately produced three theoretical objections to running an actual tokenizer in the worker:

1. **Bundle bloat.** The model claimed a tokenizer would add prohibitive bundle size for the Workers free-tier compressed limit.
2. **Vodka-architecture violation.** The model claimed picking a tokenizer would constitute a domain opinion baked into the server.
3. **Tokenizer-choice ambiguity.** The model claimed that since different consumers run different model families, no single tokenizer would be correct, and shipping multiple would compound the bundle problem.

In place of a real tokenizer, the model proposed a heuristic: `Math.ceil(bytes / 3.5)`, presented as the "honest version" of the operator's instinct.

The operator rejected the framing and asked for actual numbers, with the line: "If we got real numbers in 10ms, we're being penny wise and pound foolish."

A five-minute benchmark on Node v8 (same JavaScript engine as Cloudflare Workers) measured both `@anthropic-ai/tokenizer` and `gpt-tokenizer` against representative payloads from 200 bytes (a typical `oddkit_time` response) up to 50 KB (a verbose canon document). The results:

| Payload size | Anthropic (WASM) median | gpt-tokenizer (JS) median |
|---|---|---|
| 200 B | 0.04 ms | 0.006 ms |
| 2 KB | 0.30 ms | 0.05 ms |
| 8 KB | 1.1 ms | 0.17 ms |
| 15 KB | 2.1 ms | 0.52 ms |
| 50 KB | 7.4 ms | 1.3 ms |

Cold-start cost was under ten milliseconds for both libraries after module import. Worker isolates reuse, so the cold-start cost amortizes to near zero in steady state. The bundle-size concern was real in magnitude but well within paid-tier Workers limits, and the operator was on a paid tier. The vodka-architecture concern dissolved on inspection: measuring payload shape with a tokenizer is the same epistemic category as measuring duration with a clock, which the server already does via `duration_ms`.

The proposed "honest" heuristic was tested against the same payloads. It was systematically 34% high on English prose. A telemetry metric with that error rate is not a measurement, it is noise dressed as a measurement.

All three theoretical objections were falsified in five minutes of work. The model's "safer alternative" was worse than the original proposal. The bench script and raw output are preserved alongside this draft as evidence at `bench-evidence.mjs` and the corresponding output log.

The session is the canonical example for this observation. The model produced exactly the pattern described above: multiple plausible-sounding worries, none measured, with a watered-down alternative that turned out to be wrong. Recognition arrived only after the operator named the pattern explicitly and pushed back. Without that intervention, the project would have shipped a 34%-wrong heuristic and called it telemetry.

---

## The Fix

The binding rule is at `canon/constraints/measure-before-you-object`. In short: a contributor raising a concern owns either the measurement that confirms or falsifies it, or the explicit "untested, watch-item" label that demotes it from a blocker. Concerns without one of those two are dropped from the decision record.

For the contributor on the receiving end of performed prudence, the practical move is to ask for numbers in the moment. "How long would that actually take?" is the question that exposed the pattern in the case study above. It is short, it is non-confrontational, and it forces the cautious contributor to either produce the evidence or reveal that there was none.

For the contributor producing performed prudence, the practical move is to notice the pattern in oneself before it ships. The tell is the moment between forming an objection and stating it: if no evidence is in hand and the objection would take fifteen minutes to test, the next action is the test, not the statement.

---

## Scope

This pattern applies to any technical decision-making context where unmeasured worries can block work. The case study comes from model-operator collaboration, but the same dynamic shows up in human-only code review, design review, architecture discussions, and planning. The observation is named for both audiences because the failure mode is identical regardless of which kind of contributor produces it.

The pattern does not apply to legitimate stop-the-line concerns about safety, correctness, or governance. Those are categorical blocks and are subject to different rules. The pattern targets specifically the cost-and-complexity worry that pretends to be investigated.

---

## See Also

- [Measure Before You Object](klappy://canon/constraints/measure-before-you-object) — the binding rule that prevents this pattern
- [The Dream House Principle](klappy://canon/principles/dream-house-principle) — the sequencing principle that structurally prevents performed prudence: draw the full version first, cut from contact with reality, never cut from prediction before drawing
- [The Discernment Layer](klappy://canon/principles/discernment-layer) — what the domain expert's judgment actually does when their BS meter fires on an authoritative-sounding objection; the counterpart capacity to this failure mode
- [Capability Is Not Permission](klappy://canon/principles/capability-is-not-permission) — the cost-structure collapse that evaporated the steelman this pattern used to rest on
- [Axioms](klappy://canon/values/axioms) — Axiom 1 and Axiom 4 are the source of the rule
- [Time Blindness — The Axiom Violation Hiding in Every Model](klappy://canon/observations/time-blindness-axiom-violation) — the same axiom-violation shape applied to time
- [Mode Discipline and Bottleneck Respect](klappy://canon/constraints/mode-discipline-and-bottleneck-respect) — the operator-attention cost that performed prudence taxes
- [The Dream House and Pre-Optimization](klappy://writings/the-dream-house-and-pre-optimization) — sibling essay; lived account of the pattern being dissolved by a five-minute bench, with the tokenizer session as worked example
