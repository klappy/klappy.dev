---
uri: klappy://canon/resonance/proton-ai-engineering-manifesto
title: "AI @ Proton, Engineering Manifesto — The Memo Names the Substrate It Cannot Ship"
audience: canon
tier: 3
voice: neutral
stability: evolving
tags: ["canon", "resonance", "proton", "engineering-manifesto", "theory-of-constraints", "bottleneck", "debrief", "canon-loop", "review", "autonomy", "6B", "borrow"]
relevance: background
execution_posture: exploratory
exposure: draft
epoch: E0012
date: 2026-11-01
derives_from: "canon/values/axioms.md, canon/values/trust-kernel.md, canon/methods/borrow-bend-break-beget-build.md, canon/constraints/borrow-evaluation-before-implementation.md, canon/constraints/mode-discipline-and-bottleneck-respect.md"
complements: "canon/resonance/agentic-engineering.md, canon/resonance/ai-coding-toolkit.md, canon/principles/antifragile-failures-grow-canon.md, canon/principles/verification-requires-fresh-context.md, canon/constraints/critic-cannot-be-resolver.md, canon/methods/toc-ooda-sprints.md, writings/shifting-bottlenecks-climbing-ladders.md, writings/crew-not-clone.md"
status: proposed
---

# AI @ Proton, Engineering Manifesto (Resonance)

> Internal memo to Proton engineering, signed "Bart"; surfaced publicly as three screenshots in an X post by @mstockton, observed 2026-11-01. The memo's thesis: programming is dead, engineering is not; every engineer is now a team lead whose reports are models; the organization has been stuck at "phase 1" (LLMs speeding up existing tasks) and must enter "phase 2" (rework the whole lifecycle around the bottleneck that moves); and this is a collective-action problem the company must now resource. The resonance is strong and mechanical — Theory of Constraints, failures-become-fixes, autonomy with less babysitting, expertise relocates rather than dies. The divergence is the one every resonance of this family has shown: the memo is an exhortation to a culture; ODD is the substrate the memo says it needs and does not describe. Two claims the memo makes, ODD refuses: that most human code review will end, and that the model is a direct report. Draft pending captain review: `exposure` flips to `nav` and `status` to `active` on approval; provenance is held in the Bide row. Sibling pages: [Agentic Engineering (Karpathy)](klappy://canon/resonance/agentic-engineering), [AI Coding Toolkit](klappy://canon/resonance/ai-coding-toolkit).

---

## Summary — An Engineering Leader Writes the Problem Statement; ODD Is Already the Answer Shape

The memo — attributed to Proton engineering leadership only as far as a signature in a screenshot can attribute anything; see Bide — is unusually honest for its genre. It does not say "use AI more." It says the organization has been doing that already and productivity has not increased dramatically, and then names three reasons: engineer mentality has not shifted from writing code to managing the thing that writes code; the company optimized one step (code writing) inside an unchanged lifecycle, so the bottleneck simply moved to CI, review, approvals and specification; and retooling a whole organization is a collective-action problem no individual can solve alone — and the company has not yet invested in the tools to even see where its bottlenecks are.

Every one of those three is a load-bearing ODD structure, documented from local pain before this memo was read: attention as the bottleneck under Theory of Constraints, the moving bottleneck as a law rather than a surprise, the debrief→canon loop that turns one engineer's lesson into every seat's rule, and canon as the shared substrate that dissolves the collective-action problem by making the retooling a fetch rather than a per-person habit.

The divergence is where the memo stops. It asks engineers to build repository context files, shared skills and prompts, and a habit that repeated failures trigger an investigation and a fix — and leaves every one of those as a thing each engineer does. It predicts most human code review will end. It calls the model a direct report. ODD ships the first as infrastructure, relocates the second rather than ending it, and rejects the third as the wrong contract.

## How This Was Found — Sunday Morning, Third Party, Screenshots

Not a studied work and not a primary source. The captain opened an X post on a Sunday morning (2026-11-01, America/New_York) carrying three screenshots of an internal Proton memo titled "AI @ Proton, Engineering Manifesto," signed "-Bart," and asked the door to board and write this page. Source post: https://x.com/mstockton/status/2116548727473148203 (the three screenshot images are the evidence; the post text itself was not captured). The post showed 153 replies, 686 reposts and 3.7K likes when the screenshots were taken (device clock 10:13 America/New_York, 2026-11-01; ≈15:13Z); the counts are mutable and are recorded only as that snapshot. The memo's own date is not visible; the screenshots appear complete (title through signature) but a leaked internal document cannot be verified complete from the outside. Nothing in the memo was adopted before this reading; the ODD structures it maps onto predate it in canon by months (see Related Canon dates). Recognition preceded comparison, as with the Karpathy and Shoemaker pages.

---

## ODD Principle — The Bottleneck Moves; the Substrate Is What You Build So the Lesson Doesn't

Under Theory of Constraints there is always exactly one bottleneck, relieving it reveals the next, and optimizing anything else produces no throughput. ODD treats this as the operating law of AI-augmented work and treats the operator's attention as the current constraint. What ODD adds is the compounding half: every relieved bottleneck leaves a lesson, and a lesson held in a person's head decays while a lesson filed as canon is fetched live by the next session, the next model and the next seat. Discipline must be structural, not held in the head.

---

## Convergent Quotes (Non-Authoritative)

> "Your job is to help the LLM write better code faster."
> — "Bart," *AI @ Proton, Engineering Manifesto* (internal memo, undated; observed via screenshot 2026-11-01)

Two further convergent claims, paraphrased rather than quoted (one quotation per source):

- When one bottleneck is eliminated another takes its place — CI capacity, design, approvals, specification, review — and only looking at every process holistically, and being willing to rework them rather than optimize them, reaches the full potential. (Memo, "phase 2" paragraph.)
- The engineer's job is to find the problems the model cannot solve alone and fix them so they stay fixed for everyone: repository-level context files, shared skills and prompts, and the habit that a repeated failure triggers an investigation and a fix. (Memo, first-reason paragraph.)

*Provenance note: the single quotation is transcribed from a screenshot; the bolding in the original is the author's. Verify against a primary copy before any public-facing citation. See Bide.*

---

## Where ODD Aligns — Four Mechanisms, Each Already in Canon

- **The moving bottleneck is the law, not a finding.** The memo's "phase 2" paragraph is Theory of Constraints stated from the inside of a company that just lived it. ODD's form: attention is the bottleneck (`canon/constraints/mode-discipline-and-bottleneck-respect`), the bottleneck swings between operator and agent and climbs a ladder of delegation maturity (`writings/shifting-bottlenecks-climbing-ladders`), and the working rhythm is name-the-one-constraint, look again every thirty minutes (`canon/methods/toc-ooda-sprints`). Same mechanism, different scale: a company's CI queue and a captain's thumb on a phone are the same constraint class.
- **Repeated failures trigger an investigation and a fix — for everyone.** The memo's three asks (context files, shared skills and prompts, failure→fix habit) are ODD's three artifacts: canon fetched at the moment of use, skills as procedure (`canon/principles/skills-are-procedure-not-judgment`), and the debrief loop where a governance failure's fix is a document, not a feature (`canon/principles/antifragile-failures-grow-canon`; `canon/methods/triple-loop-debrief-review`). The house phrasing is the boarding pass's: failures go to the debrief and become canon — no blame, no repeat.
- **Autonomy with less babysitting; a team where no one works when the lead is in a meeting is not a team.** ODD's form is the rail and the runners: work rides tickets, not chat; seats continue to completion without a ping; the door never goes quiet and never holds (private adapter: `klappy/kitchens` `STACK.md` § Two Journals, Door Is Not the Queue; the public rule it applies is `canon/constraints/dispatcher-dispatches-never-executes`). The memo names the goal; the rail is the mechanism.
- **Not the death of expertise — expertise relocates.** The memo's human carries a lifetime of judgment, is less prone to hallucination and bad inputs, and is accountable in a way a model cannot be. ODD's captain/first-officer division says the same thing structurally: judgment stays with the operator, procedure goes to the seat, and the two are kept honest by fetched checklists rather than by presence (`writings/crew-not-clone`). "Programming is dead, engineering is not" is the procedure/judgment line drawn at the industry's scale.
- **Best practices move when costs move.** The memo's tests example — when writing and maintaining tests becomes cheap, the line on how many to write moves — is cost-recalibration as a principle. ODD's forms: measure a cost before it counts as engineering (`canon/constraints/measure-before-you-object`) and ship the edge early because contact with reality is where the real cost lives (`canon/principles/progress-over-perfection`).
- **The collective-action problem is real and it is the organization's to solve.** ODD agrees and names what the solution is made of: a shared, versioned, URI-addressed substrate that every session boards from, so the retooling is done once and fetched everywhere — every session boards from it and canon is the authority fetched at the moment of use (`canon/bootstrap/model-operating-contract`, `canon/bootstrap/generic-boarding-pass`); the layer map that places that substrate is `canon/architecture/substrate-stack`. The memo asks for organization and resourcing; the substrate is what the resourcing buys.

---

## Where ODD Diverges (Explicit) — The Memo Exhorts; ODD Enforces

- **Exhortation vs. runtime.** The memo is a culture document. Its mechanisms — context files, shared skills, the failure→fix habit — are named as things engineers should now do, which means each engineer does them differently, forgets them under deadline, and leaves when they leave. ODD's equivalents are not habits. They are fetched live from canon at boarding, hash-addressed, and enforced at gates (`canon/constraints/dispatcher-dispatches-never-executes` is explicit that a promise in session memory evaporates and a rule in canon does not). The memo names the substrate it needs and does not describe it; this is the same gap the Karpathy page found.
- **"Most human code review will end" vs. review relocates.** ODD refuses this one. Review does not end; it moves seats and changes object. The producing agent cannot verify its own work (`canon/principles/verification-requires-fresh-context`); the critic cannot be the resolver (`canon/constraints/critic-cannot-be-resolver`); a fresh-context validator grades every plate against a definition of done written before the work (`canon/constraints/definition-of-done`). The human's review narrows to what only a human can hold — a secret, a voice, an irreversible — and the pen on law stays with the captain (kitchen HYGIENE 27). Less human review of code; not less review. The memo's prediction, taken literally, removes the one structure that makes the memo's own "less babysitting" safe.
- **"Direct reports" vs. seats under contract.** The manager/report metaphor imports a relationship that does not transfer: a report has memory, motivation, standing and accountability; a model session has none of these and starts blank every time. ODD's contract is crew, not clone — a seat boards by a fetched manifest, operates under a written model-operating contract, and is judged by receipts, not by rapport (`writings/crew-not-clone`; `canon/constraints/humans-are-variable-inputs` for the matching rule about people). Managing a model like a person produces exactly the babysitting the memo wants to end.
- **Accountability asserted vs. accountability evidenced.** The memo says the human is accountable in a way a model never can be. ODD agrees on where accountability rests and adds the half the memo omits: a claim is a debt, and a model's claims are made auditable by receipts, journal rows and custody fields (`canon/values/axioms`; `canon/values/trust-kernel`). Human accountability over unverified model output is a feeling, not a control.
- **Code-centric scope.** "Help the LLM write better code faster" is the right job for a coding org and the wrong ceiling for the method. ODD's modes, axioms and validation govern any knowledge work unchanged — law, theology, a decision tray — and the memo's own best insight (the bottleneck moves off code) argues for the wider scope.
- **Urgency as the motivator.** "Existential threat," "the time to act is now." ODD does not dispute the stakes and declines the lever: fear-driven adoption is the failure mode the axioms exist to prevent (the Karpathy page's "adoption-by-celebrity," here "adoption-by-alarm"). The memo itself supplies the correction one paragraph later — the company does not know where its bottlenecks are because it has not built the tools to see them — which is ODD's rule in the memo's own voice: measure before you object, observe before you act.

---

## Why the Divergence Matters — The Memo Will Be Read Once; the Rule Is Fetched Every Session

A manifesto changes a Monday. Engineers read it, agree, build a CLAUDE.md, add a skill, fix a flaky prompt — and in three months the context files have drifted, the skills live in six forks, the failure that was fixed has recurred in a repo the fixer never touched, and the review that "ended" is the reason a quiet regression reached production. None of that is a failure of the memo's analysis; the analysis is right. It is the failure the memo cannot address because it is a document addressed to people, and people are variable inputs.

ODD's bet is that every mechanism the memo asks for has to be a thing a session fetches, not a thing a person remembers: the context file is canon with a URI and a hash; the shared skill is a versioned procedure a seat loads at the moment of use; the failure→fix habit is a debrief that lands as a rule; and the review that ends is replaced by a validator that never had the author's context. The memo's "phase 2" is the right name for the moment. The substrate is what phase 2 is made of, and the memo is the strongest external evidence yet that a serious engineering organization has arrived at the need without yet having the shape.

---

## 6B Operationalization — Borrow the Diagnosis, Bend Two Formulations, Break Two Claims, Beget Before Bide

- **Borrow** — The three-reason diagnosis (mentality, phase-1 stall, collective action) as a framing for explaining ODD to an engineering organization. It is the problem statement ODD answers, written by a buyer. The phase-1/phase-2 vocabulary is market-tested and compatible.
- **Bend** — Two formulations are crisper than canon's current wording and are candidates with attribution, subject to `canon/constraints/borrow-evaluation-before-implementation`: (a) *a repeated failure triggers an investigation and a fix* — a candidate Simple Rule for the debrief loop, shorter than anything in `antifragile-failures-grow-canon`; (b) *when a cost drops, redraw the line that cost justified* — the tests example generalized into a named principle of cost recalibration, which canon implies but does not state.
- **Break** — The "most human code review will end" prediction and the "direct reports" metaphor. Neither is a defect to fix in the memo; both mark where exhortation stops being safe without a substrate. Also not adopted: urgency as the adoption lever.
- **Beget** — Let Proton and its engineering leadership carry the argument that the retooling is an organizational commitment, not an individual hobby. A privacy-first company with a mission to defend saying this to its own engineers reaches an audience canon cannot, and says it with a credibility canon does not need to manufacture.
- **Bide** — Waiting, with tripwires: the memo's authenticity, author identity ("Bart" is consistent with Proton's CTO per prior knowledge; unverified here), date, and completeness are all unconfirmed — the source is screenshots in a third party's post. Tripwire: if Proton publishes the memo, the quote and attribution are re-verified against it, `stability` moves from `evolving` to `stable` and `status` from `proposed` to `active`; if Proton disavows or materially corrects it, the Convergent Quotes section is revised and the page is re-evaluated against the litmus test.
- **Build** — Only what the memo names and cannot ship: canon as the shared context layer, the rail as the autonomy layer, the fresh-context validator as the review that does not end, the debrief loop that makes a fix everyone's. Same conclusion as the sibling pages, now from an engineering organization's internal memo rather than a thought leader's thread: build the substrate; the field will keep writing the manifesto.

---

## Related Canon

- [Agentic Engineering (Karpathy)](/canon/resonance/agentic-engineering.md) — Sibling resonance; the advice-vs-infrastructure divergence this page re-confirms from inside an organization
- [AI Coding Toolkit — Harness Engineering](/canon/resonance/ai-coding-toolkit.md) — Sibling resonance; the same layer boundary found from a practitioner toolkit
- [Mode Discipline and Bottleneck Respect](/canon/constraints/mode-discipline-and-bottleneck-respect.md) — Attention as the bottleneck; ODD's form of the memo's phase-2 argument
- [Shifting Bottlenecks, Climbing Ladders](/writings/shifting-bottlenecks-climbing-ladders.md) — The moving bottleneck at the scale of one operator
- [ToC OODA Sprints](/canon/methods/toc-ooda-sprints.md) — The working rhythm that keeps the constraint named
- [Antifragile: Failures Grow Canon](/canon/principles/antifragile-failures-grow-canon.md) — The failure→fix loop the memo asks for as a habit
- [Verification Requires Fresh Context](/canon/principles/verification-requires-fresh-context.md) — Why review relocates instead of ending
- [Critic Cannot Be Resolver](/canon/constraints/critic-cannot-be-resolver.md) — The seat split behind the relocated review
- [Crew, Not Clone](/writings/crew-not-clone.md) — The contract ODD offers in place of "direct reports"
- [Borrow, Bend, Break, Beget, Build](/canon/methods/borrow-bend-break-beget-build.md) — The method operationalized above
- [Borrow Evaluation Before Implementation](/canon/constraints/borrow-evaluation-before-implementation.md) — Governs adoption of the two Bend candidates
- [ODD Compared](/odd/odd-compared.md) — Where organizational AI manifestos sit among the methodologies
