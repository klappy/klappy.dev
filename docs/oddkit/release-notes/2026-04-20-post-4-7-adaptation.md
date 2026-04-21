---
uri: klappy://docs/oddkit/release-notes/2026-04-20-post-4-7-adaptation
title: "Release Notes — Post-4.7 Adaptation Suite (2026-04-20): What Changes For Operators After This Lands"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["docs", "oddkit", "release-notes", "post-4.7-adaptation", "ritual-is-a-smell", "proactive-frequency", "non-diff-review", "usage-impact"]
epoch: E0008.4
date: 2026-04-20
derives_from: "canon/principles/ritual-is-a-smell.md, writings/copy-paste.md, odd/ledger/2026-04-20-post-4-7-proactive-loop-experience.md"
governs: "Operator and agent behavior after PR #133 merges"
related_pr: "https://github.com/klappy/klappy.dev/pull/133"
---

# Release Notes — Post-4.7 Adaptation Suite (2026-04-20)

> This release does not add features to oddkit. It changes how oddkit gets used by operators, and how operators recognize when oddkit usage has degenerated into ritual. The behavior change is the deliverable. The artifacts are the means. Per-turn tool counts should drop from roughly ten to roughly two or three on most turns, with phase-entry turns spending more. Continue-tap rhythms should be flagged as smells before they become workdays. Non-diff review surfaces enter the roadmap. The public-facing essays reframe the demand funnel toward operators ready to write the curriculum their agents need.

---

## Summary — Behavior Change Is the Deliverable, Artifacts Are the Means

The post-4.7-adaptation suite is eight artifacts shipped together because they only make sense together. They were authored from one observation: six sessions on Opus 4.7 with the proactive posture in full effect produced trustworthy work *and* a new bottleneck nobody had named yet. Every artifact in this release exists to either change behavior, set new direction, or capture lineage so the change does not get unwound later.

This release ships under **Canon 0.35.0** and establishes **Epoch 8.4 — Operator-Attention Calibration** (see `docs/appendices/epoch-8-4.md`). The version and epoch bumps were almost missed; the discipline that catches that miss in future PRs is itself part of this release (`canon/constraints/governance-change-discipline.md`).

This document frames the release by **what changes after it lands**, not by what is in it. A file inventory is in the PR description and the commit history. This document answers the question: *why ship these together, and what should be different about how oddkit gets used afterward?*

The short version: oddkit gets called *less per turn but more deliberately*. The continue-tap rhythm gets flagged as a smell instead of accepted as workflow. Operators get a public-facing trilogy they can point colleagues at when explaining why a written curriculum is the work, not the tool. And the validation surface count grows from two (Bugbot, Sonnet validator) to three (with a standing exploration agent), with a roadmap toward five. Future behavior-affecting governance changes must carry version bumps, changelog entries, release notes, and epoch annotations — the discipline that this release establishes for itself.

---

## The One-Sentence Frame for Each Artifact's Impact

For operators trying to decide whether to read the release notes carefully or just merge and move on, here is the impact in one sentence per file:

### One-sentence impact per artifact

- **`canon/constraints/proactive-frequency-calibration.md`** — Agents will run the gauntlet at mode boundaries instead of every turn. Per-turn tool counts drop. Continue-tap rhythms get diagnosed as ritual smells.
- **`canon/constraints/governance-change-discipline.md`** — Future behavior-affecting changes must carry four markers: version bump, changelog entry, release notes framed by impact, epoch bump when posture shifts. Self-governance for governance changes.
- **`writings/shifting-bottlenecks-climbing-ladders.md`** — Public framing for why operators write the curriculum. Reshapes the demand funnel toward operators ready to climb the management ladder.
- **`writings/the-rhythm-emerged.md`** — Case study showing the harness rules that earned their place across sessions 2–6. Lowers activation energy for skeptical adopters.
- **`docs/oddkit/architecture/non-diff-review-surfaces.md`** — Roadmap for adding system-scoped review alongside the diff-scoped surfaces. Phase 1 (standing exploration agent) is the immediate next build.
- **`docs/appendices/epoch-8-4.md`** — Names E0008.4 (Operator-Attention Calibration) as the active sub-epoch. Forcing fault: adaptation beats detection when friction is small enough. New invariant: sustained micro-rhythms get flagged before adaptation.
- **`odd/ledger/2026-04-20-post-4-7-proactive-loop-experience.md`** — Source-of-truth ledger so future drift on these decisions can be traced and reverted.
- **`odd/backlog/wish-came-true-essay-stub.md`** — Queued celebration essay capturing the *Copy. Paste.* lineage and the trilogy framing for whenever it gets written.

The rest of this document elaborates on each impact and names the success and failure conditions worth watching after merge.

---

## Behavior Change 1 — Tool-Call Frequency Recalibrated

**Source:** `canon/constraints/proactive-frequency-calibration.md`

**What changed:** The proactive posture (E0007) is preserved. The cadence at which it fires is recalibrated. Five rules now apply:

1. Mode boundaries trigger the gauntlet, not turns.
2. Every turn ends in checkpoint format (done, next, blocker or none).
3. Tool budget spends in phase-aligned clumps.
4. Straight-line work proceeds without asking.
5. Continued continue-tapping is a smell, not a workflow.

**What operators should observe after merge:**

- Per-turn tool counts drop from roughly ten to roughly two or three on most turns. Phase-entry turns (planning → execution, execution → validation) will spend more.
- Turn narratives become shorter and end in a recognizable checkpoint shape.
- Agents stop asking permission for forks they should call themselves.
- Sustained continue-tap rhythms across hours get flagged as smells worth redesigning the workflow around, not optimizing.

**Success indicators:**

- Operators report less babysitting between mode boundaries.
- The trust and rule-following from E0007 persist.
- Continue-taps occur at genuine ceiling hits or genuine ambiguity, not as a sustained heartbeat.

**Failure indicators:**

- Trust degrades (output becomes inconsistent or skips canon checks).
- Agents over-correct into asking permission for every fork.
- Mode discipline collapses (boundary checks get skipped).
- Operators report a sustained continue-tap rhythm positively, as part of a "smooth workflow."

**Lineage:** This constraint is an application of the existing `canon/principles/ritual-is-a-smell.md` to the specific case of continue-tap rhythms. The principle has now been instanced twice in public writing in roughly the time between the two essays. The pattern repeats faster than expected; this constraint exists so the next instance gets caught earlier.

---

## Behavior Change 2 — Demand Funnel Reshaped

**Source:** `writings/shifting-bottlenecks-climbing-ladders.md`

**What changed:** The essay is the public-facing positioning for *why operators write the curriculum*. It walks readers through the pendulum (operator vs. agent), the assistant ladder (hands → thumbs → attention), the agentic management ladder (do-it-yourself → orchestrating delegation), and lands the *Write First, Build Second* method. It explicitly cites *Copy. Paste.* as parent and *ritual-is-a-smell* as canon.

**What operators reading the essay should walk away with:**

- The bottleneck moves between operator and agent. The game is choosing where it lives.
- The operator side has rungs. Each rung up is a delegation skill the operator must earn.
- The model gets you to the rung. Trust, harness, and management maturity decide whether you can stand on it.
- Micro-rituals so small they don't register as friction are the most dangerous bottleneck class.
- The work is in writing the curriculum the agent learns from. Code comes second.

**What this changes about how oddkit gets requested:**

- Operators stop showing up asking *what does oddkit do?* They show up asking *how do I write the rules my agents need to follow?*
- That is a different funnel, and it is the funnel that matches what oddkit actually is.
- Operators looking for a magic tool that improves AI without operator effort will self-deselect earlier. That is desirable.

**Success indicators:**

- New operator inquiries reference the essay or its frames (pendulum, ladder, write-first-build-second).
- Conversations start at "how do I write the curriculum" rather than "what tools should I use."

**Failure indicators:**

- The essay gets read as motivational content rather than methodology. Reframe by adding worked examples in follow-up writing.
- The pendulum or ladder framings become catchphrases that operators repeat without applying. Add diagnostic content if this happens.

---

## Behavior Change 3 — Activation Energy Lowered

**Source:** `writings/the-rhythm-emerged.md`

**What changed:** The companion field report walks through the practical adaptation arc across sessions 2–6 of Opus 4.7. Three rules earned their place: question gating by mode, checkpoint format every turn, honest accounting of trust deferred. Two patterns failed: pre-emptive long preflight checks, and treating continue as a feature.

**What operators reading the field report should walk away with:**

- Specific rules that were tried and held, with the friction each one addressed.
- Specific rules that were tried and failed, so they don't have to be re-tried.
- The operator's own observation that micro-rituals are the smell, named directly so future readers don't have to discover it the hard way.

**What this changes about how oddkit gets adopted:**

- Skeptical operators get a worked example instead of a manifesto. The "is this just theory" objection loses force.
- Operators considering writing their own canon get a template for the rule-cycle: notice the friction, write the rule, watch whether it holds across multiple sessions.

**Success indicators:**

- New operator stories surface using the same rule-cycle structure.
- The four-mode question protocol or the checkpoint format gets adopted in other harnesses.

**Failure indicators:**

- The field report gets cited as a rulebook to copy verbatim instead of as a method to adapt. Push back when this happens.

---

## Roadmap Change 1 — Non-Diff Review Surfaces Enter the Build Queue

**Source:** `docs/oddkit/architecture/non-diff-review-surfaces.md`

**What changed:** The validation surface architecture is now explicit. The two existing surfaces (Cursor Bugbot, managed Sonnet validator agent) are both diff-scoped. They answer *is this change correct?* A third class of question (*is the system correct?*) needs its own surface. Five candidate surfaces are ranked by setup cost and confidence in payoff. Phase 1 (standing exploration agent) is the immediate recommendation.

**What this changes about what gets built next:**

- The standing exploration agent moves from "thing we did once and it worked" to "Phase 1 of a documented validation architecture." Charter, dispatch cadence, triage path all named.
- Tool-contract probes (Phase 2) move into the implementation queue with a defined entry condition.
- Future PRs touching oddkit's tool envelopes will be reviewed against a contract spec rather than only against the diff.

**What operators using oddkit should observe over time:**

- Defect classes that previously slipped past Bugbot and the Sonnet validator (envelope drift, integration rot, canon-code parity gaps) start getting caught.
- The release pipeline gains a probe runner once Phase 2 ships.
- Trust in oddkit's stability across releases increases, which indirectly increases willingness to delegate further.

**Success indicators:**

- At least one finding per quarter from a non-diff surface is real and actionable.
- The non-diff surfaces produce defect classes the diff-scoped surfaces never produced.
- False-positive triage stays under 20% of triage time.

**Failure indicators:**

- Non-diff findings dominated by issues already known and accepted.
- Operators stop trusting the diff-scoped surfaces because they assume non-diff catches everything (it does not; they are complementary).
- Probe maintenance becomes a tax exceeding the defect-class value.

---

## Lineage and Forward Reference

**Lineage:**

- `canon/principles/ritual-is-a-smell.md` — Parent principle. The continue-tap rhythm is a new instance.
- `writings/copy-paste.md` (March 2026) — Prior public-facing instance of the same pattern. Closed with: *I hope this essay ages poorly.* Largely came true in the workflows native containers reached.
- `writings/fourteen-hours-with-opus-4-7.md` (April 17, 2026) — First field report on Opus 4.7. Postscript predicted the *teach the model to present* problem this release operationalizes.
- `odd/ledger/2026-04-20-post-4-7-proactive-loop-experience.md` — Source ledger for this release.

**Forward reference:**

- `odd/backlog/wish-came-true-essay-stub.md` — The deferred celebration essay. When written, it will land the trilogy as a meta-pattern: catch a ritual in flight, watch it die on schedule, catch the successor before it ossifies.
- Phase 2 of the non-diff review architecture — Tool-contract probes. Implementation doc not yet written.
- Phase 3+ of the non-diff review architecture — Cross-tool behavior probes, canon-code parity agent, handoff replay. Build when the value is observed, not before.

---

## Why Ship These Eight Together

These artifacts are not separable.

- The observation ledger is the input the other seven derive from. Without it, future readers cannot trace why these decisions exist together.
- The framework essay and the field report are companions. The essay names the principle; the field report shows the practice. Either alone is weaker.
- The proactive-frequency canon constraint is the policy version of what the essays describe. Without it, the essays are observations without authority.
- The governance-change-discipline constraint is the meta-policy. Without it, the next behavior-affecting change ships unmarked, and the system trains itself to skip the four markers this release establishes.
- The architecture doc is the system design for the validation gap the observation named. Without it, the gap stays a known issue with no roadmap.
- The release notes frame the whole release by usage impact. Without them, the PR description carries the weight alone, and the framing fades from canon search after merge.
- The epoch appendix names what posture shifted. Without it, the epoch number drifts in artifact frontmatter without a canonical reference.
- The backlog stub queues the deferred celebration piece so it does not get lost. Without it, the trilogy framing risks fading.

Splitting into eight PRs would obscure the dependency chain and make each piece harder to evaluate. Shipping them together makes the structure of the change visible.

---

## How To Read This Release

For operators time-constrained: read the **Summary** and the **One-Sentence Frame** section. That is enough to know what changes about how you use oddkit after merge.

For operators considering whether to adopt the new patterns themselves: read **Behavior Change 1** (the canon constraint) and **Behavior Change 3** (the field report).

For operators thinking about positioning oddkit to colleagues: read **Behavior Change 2** (the public essay) and the **Lineage** section.

For maintainers deciding what to build next: read **Roadmap Change 1** (the non-diff architecture) and the **Forward reference** section.

For everyone: notice that this release describes itself by behavior change, not by file inventory. That is the new framing this release is also intended to establish. *What changes after merge* is the question every release notes document in this repo should answer first.
