---
uri: klappy://canon/principles/progress-over-perfection
title: "Progress Over Perfection"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: evolving
tags: ["principles", "progress", "increments", "sprints", "delivery", "feedback", "antifragile"]
target_repo: "outcomes-driven-development"
---

# Progress Over Perfection

> No system survives contact with reality intact. The sooner the contact, the cheaper the edges.

---

## Principle

Perfection is a prediction about a future nobody has observed. Progress is a state change someone can check now.

This holds for humans and agents alike. The failure pattern is the same in both: wait to wrap your head around the whole problem before showing anything, or plan until the ground moves and then plan again. Either way the work stays private while its assumptions compound — and the world keeps changing underneath it.

No matter how well a system is shaped in advance, it comes apart the moment it gains traction or friction with real use. Then the shaping starts over. Nothing is perfect; everything has rough edges or sharp edges that get sanded by contact. So the lever is not more shaping. It is a shorter distance between a change and the moment reality — a real use case, a fresh reviewer, a live page — can push back on it.

ODD therefore treats the *size of the step* as the lever and the *verifiability of the step* as the floor. Deliver the smallest increment a fresh context can validate, let what reality says re-choose the constraint, and take the next step from what was verified, not from what was predicted.

---

## Simple Rules

- **Use when:** a unit of work could be cut smaller and still end in something a fresh context can verify.
- **Skip when:** the step is irreversible — the captain's voice, a secret, revenue, a published claim — or a single call with nothing to ship.
- **Stop when:** the increment is live, validated by someone who did not create it, and rowed; or the timebox closes and the slot is rowed as missed.
- **Keep going when:** improvement is still observable inside the window; stop polishing the moment it flattens.
- **Where:** every reversible unit of work — tickets, sprints, PRs, drafts, canon at `evolving`.
- **Who:** every seat, human or agent; the door when it timeboxes its own work.
- **Why:** no system survives contact with reality intact; the sooner the contact, the cheaper the edges (§ Grounds).
- **What:** the smallest validated increment, then the next one from what was verified.
- **How:** fixed timebox, frozen scope, fresh-context validation, one row per increment (`klappy://canon/methods/toc-ooda-sprints`).

---

## Grounds

The captain, 2026-10-10, in the door (cleaned for fluency with his review; the verbatim is in kitchen `journal/2026-10-10/cos-door-pop-1048.tsv`):

> This is true for humans and AI agents alike. I've watched the same thing stall good people, myself included: either we need to wrap our heads around the whole problem before we start and show progress, or we plan for so long that things change underneath us. Instead of staying nimble as the world moves — shipping early and often, failing fast, adapting, building something antifragile from what the failures teach — we wait until things stabilize, until we find the perfect shape, until we know exactly what would make a perfect system.
>
> But from what I've observed, no matter how perfect the system is, it falls apart as soon as it gains any traction or friction with reality. Then the process repeats. Nothing is perfect. Everything has rough edges or sharp edges that need to be sanded away, and the sooner we gain contact with reality — with real use cases — the better. Ideas and predictions are not the thing. We need progress over perfection.

Observed instances: the kitchen's own v1→v2 reform (`klappy/kitchen` `FOUNDING.md` — ceremony that filled the graveyard while the cheap paths shipped), the 3D Review v3 push and FIA alpha v2 (two thirty-minute sprints per fire), and the 2026-09-17 ship-small order whose verdict found every lesson already written and none of it findable.

---

## What This Means in Practice

Work is cut into increments that end in something checkable: a merged slice, a live page, a row someone can read. The timebox is fixed (the kitchen's drum is thirty minutes); the scope bends to fit it, never the reverse. A slot that misses is written down as missed, and the next slot starts anyway — the baseline is not reset to hide the gap.

Scope freezes at the start of an increment. Discoveries made inside it go to the next one. Unrelated unfinished work never holds an accepted increment hostage.

Failure is priced honestly. A failed increment is a line of cause and a refire inside the remaining promise, not a hearing. The cost of a wrong small step is the step; the cost of a wrong large step is the forensics.

Learning compounds or it did not happen. Each increment leaves a durable row — what shipped, what was verified, what is next — so the following seat starts from evidence instead of re-deriving it.

---

## What This Does Not Mean

This is not "ship unvalidated fast." The increment is *validated small*: done still means live, checks finished, and read by a context that did not create it. Shrinking the step is what makes that validation affordable; it never replaces it.

This is not a license over irreversibles. The captain's voice, secrets, revenue, and anything that resists undo keep their gate — there, the exact text *is* the increment, and it is read before it moves. Progress over perfection governs the reversible middle, which is almost everything.

This is not skipping the full picture. Draw the dream house first; then cut the first room from contact with reality. Sequence, not substitution.

This is not waiting for stability. Stability is what contact produces, not what precedes it. A team that waits for the ground to settle before shipping has chosen the one order of operations in which the ground never does.

This is not momentum. Continuing to polish after improvement has flattened is camping, not progress. Progress is observable; polish past the plateau is a feeling.

---

## Failure Modes

| Name | What it looks like | Why it fails this principle | Pointer |
|---|---|---|---|
| **Wrapping the head** | No progress shown until the whole problem is understood | Understanding arrives *through* contact, not before it | § Grounds |
| **Planning past the ground** | The plan outlives the facts it was built on; re-plan, repeat | Every day unshipped is a day the assumptions compound unexamined | § Grounds |
| **Waiting for stability** | "We'll ship once things settle" | Stability is what contact produces; waiting is the one order in which it never arrives | § What This Does Not Mean |
| **Boiling the ocean** | One large step instead of the first small one that finds the shape | A wrong large step costs forensics; a wrong small step costs the step | `klappy/kitchen` `FOUNDING.md`; kitchen P7 |
| **Unvalidated fast** | "Ship early" read as "skip the gate" | Shrinking the step makes validation affordable; it never replaces it | kitchen P4; `klappy://canon/principles/verification-requires-fresh-context` |
| **Scope creep inside the window** | Discoveries pulled into the current increment | Accepted work waits on unrelated work | `klappy/3d-review-cookbook` HYGIENE §10 |
| **Camping** | Polishing after improvement has flattened | Momentum masquerading as progress | `klappy://canon/diagnostics/camping-risk`; `klappy://canon/principles/persistence-must-be-intentional` |
| **Amnesia** | Increments ship, nothing is rowed | Learning that does not compound is partial failure | `klappy://canon/resonance/lean-startup` § Where ODD Diverges; kitchen HYGIENE 13 |
| **Perfection where it belongs, skipped** | Fast-and-loose on an irreversible | Irreversibles keep their gate; the exact text *is* the increment | `klappy://canon/principles/irreversibility-is-the-real-cost`; kitchen H27 |

---

## Cross-References

- **Iteration Bias** (`canon/defaults/iteration-bias.md`) — The operational defaults under this principle: pivot early, accept discard cost, velocity of clarity over polish.
- **ToC OODA Sprints** (`canon/methods/toc-ooda-sprints.md`) — The method: a fixed thirty-minute sprint ending in a verifiable delivery.
- **Irreversibility Is the Real Cost** (`canon/principles/irreversibility-is-the-real-cost.md`) — Why small reversible steps are cheap and where the exception line sits.
- **Persistence Must Be Intentional** (`canon/principles/persistence-must-be-intentional.md`) and **Camping Risk** (`canon/diagnostics/camping-risk.md`) — The stop-polishing half.
- **The Dream House Principle** (`canon/principles/dream-house-principle.md`) — Full picture first; this principle governs what happens after.
- **Verification Requires Fresh Context** (`canon/principles/verification-requires-fresh-context.md`) — The floor an increment must clear.
- **Antifragile — Every Failure Grows the Canon** (`canon/principles/antifragile-failures-grow-canon.md`) — What the failures teach is kept, not just survived.
- **Lean Startup** (`canon/resonance/lean-startup.md`) and **Sprint** (`canon/resonance/sprint.md`) — Borrowed sources; ODD keeps their speed and rejects their amnesia.

### Example Applications

| Where | Instance |
|---|---|
| `klappy/kitchen` `health-code/PRINCIPLES.md` P7 | one dish per recipe; 86'd in a line and refired |
| `klappy/kitchen` `KITCHEN.md`, `FOUNDING.md` | "prices failure honestly: cheap, refired"; *faites simple* |
| `klappy/kitchens` `boarding/projects/TEMPLATE.md` § 4, `skills/kitchen-sprint` | two 30-minute sprints per fire; shipped or missed, rowed |
| `klappy/3d-review-cookbook` HYGIENE §10 | ship one accepted increment; freeze the release scope |
| `klappy/fia-app-cookbook` alpha v2 SPRINTS | parallel slices per sprint; usable outcome or honest partial |
