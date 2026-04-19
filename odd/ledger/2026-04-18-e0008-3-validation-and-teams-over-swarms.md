---
uri: klappy://odd/ledger/2026-04-18-e0008-3-validation-and-teams-over-swarms
title: "E0008.3 Session — Validation Mode, Context Break, and Teams Over Swarms"
audience: odd
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "ledger", "session", "epoch-8", "epoch-8.3", "validation", "context-break", "teams-over-swarms", "solo-to-team-transition", "dolche", "dolcheo"]
epoch: E0008.3
date: 2026-04-19
session_span: "2026-04-18 to 2026-04-19"
governs: "Durable session record for the multi-day arc that produced E0008.3 canon, integrated the creator-cannot-be-own-critic principle, framed E0009 self-correction as context-separation-dependent, and named teams-over-swarms as the governing architectural preference. Source of truth for what was shared, decided, learned, constrained, and handed off during the session — and for what remains open to carry forward."
status: active
---

# E0008.3 Session — Validation Mode, Context Break, and Teams Over Swarms

> Multi-day session spanning a canary completeness refactor, a user-facing rename (canon_url → knowledge_base_url), the promotion of validation into a first-class epistemic mode, the integration of the creator-cannot-be-own-critic principle into mode discipline, the framing of E0009 as self-correction enabled by context separation, and the crystallization of teams-over-swarms as a governing ODD principle grounded in 1 Corinthians 12 and the African proverb on going fast alone versus going far together. The session also surfaced and named the operator's solo-to-team transition: oddkit and klappy.dev are complete solo work; TruthKit is the team-driven successor.

---

## Vocabulary: DOLCHEO (not just DOLCHE)

This ledger uses **DOLCHEO**, an extension of DOLCHE that adds a second **O** for Open items / open questions. The two Os read as a pair:

- **O** — Observation (something true we noticed, closed)
- **L** — Learning (generalized insight, closed)
- **D** — Decision (choice made with rationale, closed)
- **C** — Constraint (rule or limit that applies going forward)
- **H** — Handoff (work transfer to another session, agent, or operator)
- **E** — Encode (durable record created, closed)
- **O** — Open item (unresolved thread, question, or planned work; forward-pointing)

DOLCHE alone is retrospective — it captures what happened. DOLCHEO adds the prospective dimension — what is unresolved and must be carried forward. Both Os begin with "observe": one observes what is, the other observes what is unknown. The duality is a feature, not a collision.

This ledger is the first to use the extended notation. Future canon update to `canon/constraints/dolche-tracking.md` (or equivalent) will formalize DOLCHEO as the standard tracking vocabulary.

---

## Summary

A session that started as a narrow canary cleanup and a terminology rename expanded into the most significant canon evolution since E0007. Along the way, a bugbot finding and a parallel Cursor Agent autofix cycle became the forcing function that made validation-as-a-distinct-mode undeniable. Once validation was named as the fourth mode, the pre-existing canon on verification-requires-fresh-context demanded integration — and that integration changed the shape of the epoch: E0008.3 is not only "validation is observable" but "validation is structurally separable from creation." From that, the architectural preference for teams-over-swarms became articulable, grounded in scripture and proverb. And in the final reflection, the operator named the transition the whole arc was pointing toward: from solo MIT work on oddkit/klappy.dev to team-driven commercial work on TruthKit.

---

## Observations (O)

### O1 — Canary shipped broken under parser-test-only validation
The telemetry_policy canary refactor (`klappy/oddkit#106`) shipped to production with three contract-conformance gaps: missing envelope fields (`server_time`, `assistant_text`, `debug`), silently-stripped `knowledge_base_url` parameter (Zod schema was `{}`), and a governance-source tier that lied about its data source because the fetcher appended a baseline fallback the caller did not know about. Parser tests were all green. The tool was "done." No one invoked the MCP tool end-to-end pre-merge.

### O2 — Bugbot caught what the authoring agent could not
During live validation of the canary, the authoring agent (Claude in session) missed the silent baseline fallback bug. Cursor Bugbot, running on the same model family with fresh context, caught it in one comment. A later review pass caught a second finding (telemetry.ts extraction still reading the old `canon_url` field after the rename). Both were autofixed by Cursor Agent. Same model family. Same governance. The only variable was context independence. This is the pattern documented in `canon/principles/verification-requires-fresh-context` from E0007, reproduced live in this session.

### O3 — oddkit_encode does not persist
Repeatedly observed across this and prior sessions: `oddkit_encode` returns structured OLDC+H artifacts in the response envelope but does not save them. The caller must write the artifact to a file. This is a design constraint, not a bug — but it means "encode DOLCHE" as a user instruction requires the operator to explicitly save. This ledger document is the durable record the encode tool cannot produce on its own.

### O4 — Epoch pattern: implicit thing → observable thing
E0008 introduced observability (telemetry). E0008.1 made infrastructure observable (tracing, cache tiers). E0008.2 made time observable (server_time). E0008.3 makes process itself observable (validation as its own mode). Each sub-epoch of E0008 promotes one implicit thing into one named, observable thing. The pattern is consistent enough to be predictive — future E0008.x work will continue to surface implicit-things-that-were-always-happening.

### O5 — Mode collapse has shape-variants, not just a single form
Prior canon documented planning-into-execution collapse. This session surfaced the symmetric form: validation-into-execution collapse (surfacing concerns mid-build as inline pivots). And a third, deeper form: self-review masquerading as validation — the authoring agent declaring "validation" on its own in-session work with no context break. The third form is the most structural because it can happen even when the agent is trying to do the right thing.

### O6 — oddkit and klappy.dev are solo work by design
The operator built both projects alone, at speed, as a public field notebook. The code, the canon, the governance, the writings — all produced by one person iterating in public. The pace and voice coherence of both projects depend on the solo structure. A team would have produced different (and slower) work.

### O7 — TruthKit requires a different structure
TruthKit is a product intended to be trustworthy to users who will never meet the maintainer, extensible by contributors who weren't in the design room, and honest in outputs under conditions the maintainer cannot personally verify. It cannot be built alone at speed. It requires a team, structural handoffs, and the full E0008.3 + E0009 architecture — validation as its own mode, context breaks at handoffs, routed roles, self-correction loops.

---

## Learnings (L)

### L1 — Naming precedes seeing precedes separating precedes correcting
The E0008.3 → E0009 progression clarifies the ordering. You cannot correct what you cannot separate. You cannot separate what you cannot see. You cannot see what you have not named. E0008.3 delivers naming + seeing + separating (the three preconditions). E0009 becomes possible once they hold. This ordering is not stylistic; it is causal. Attempting E0009 self-correction before E0008.3 reproduces mid-build micro-pivots.

### L2 — Context independence is the variable, not model capability
The fresh-context principle (E0007, canon/principles/verification-requires-fresh-context) held again in this session. Bugbot is not "smarter" than the authoring agent — they run on the same model family. Bugbot catches what authoring misses because bugbot has no creation context to bridge over flaws. The fix for validation quality is context separation, not more-capable reviewers.

### L3 — Parser tests pass when the contract is broken
Unit and parser tests exercise logic in isolation. They cannot see the request envelope, the MCP protocol surface, or the response shape that callers depend on. The canary shipped broken because no live-smoke against the MCP endpoint existed. Live smoke that curls the deployed endpoint and asserts envelope shape + tier values + override contract is a ship-blocker, not a nice-to-have. This is now canon in `canon/constraints/core-governance-baseline.md` and a template test lives in `workers/test/canon-tool-envelope.smoke.mjs`.

### L4 — Bugbot collaboration is team architecture in miniature
The bugbot → Cursor Agent autofix cycle is a working example of the team/cell pattern this session formalized. Builder agent produces. Reviewer agent (bugbot, fresh context, same governance) finds. Fixer agent (Cursor Agent, fresh context, specific scope) addresses. Different roles. Shared fate. Incomplete without each other. This cycle is observable in the oddkit#108 PR history and is the prior art TruthKit's harness architecture should codify.

### L5 — A journal as resume is a coherent strategy
The operator's decision to build the solo work in public as a field notebook turned out to be the most efficient resume possible: the journey is legible, the evolution is visible, and every mistake is already documented in corrections. Polishing it into a book (*Nothing New, Even AI*) doesn't invent content; it selects and frames what already exists. This is a repeatable pattern for anyone doing long-running solo work.

### L6 — "Go fast alone, go far together" is the tradeoff, not a trap
Teams are slower than solo. That is not an objection to teams; it is the cost of distance. Solo work reaches only as far as one person can carry it. Team work accepts overhead to reach further. The operator's two projects demonstrate this: oddkit/klappy.dev went fast (solo); TruthKit needs to go far (team). Both choices are correct for their purpose. The principle is discernment — knowing which mode the work calls for.

### L7 — Teams-over-swarms is biblically grounded, not merely analogical
1 Corinthians 12 is the oldest and clearest argument against swarm architecture on record. Paul's four moves (no self-disqualification, no role-elimination, no one-part-does-everything, shared fate) translate directly to multi-agent system design. The engineering is the translation, not the origin. Canon should cite this directly — it is derivation, not decoration.

---

## Decisions (D)

### D1 — Rename canon_url → knowledge_base_url (merged)
User-facing parameter and tier-string rename landed in `klappy/klappy.dev#101` (contract), `klappy/klappy.dev#106` (forward-facing doc sweep), and `klappy/oddkit#108` (tool implementation). Rationale: "canon" and "baseline" are ODD-specific jargon; "knowledge base" and "bundled" are plain English that external users already know. Zero reported external users, zero migration cost, clean semantics. Internal variable renames (ZipBaselineFetcher class, canonUrl, BASELINE_URL) intentionally deferred to a separate PR to keep the user-facing change focused.

### D2 — Validation is a fourth epistemic mode (E0008.3)
Canon now names four modes: exploration, planning, execution, validation. The fourth is defined in `canon/definitions/validation-as-epistemic-mode.md` (tier 1) with full contract: purpose, characteristics, truth condition, obligations, primary risk, valid/invalid moves, non-collapse rules, and a dedicated Context Break Requirement section. The three-mode framing was incomplete; validation was always happening but never named.

### D3 — Validation requires a context break between creator and critic
The fourth mode is a pair: the named mode plus a structural context-break requirement. Canon in `canon/principles/verification-requires-fresh-context` (tier 2, E0007) is elevated to load-bearing companion of the validation-as-mode doc. Valid forms of the break: temporal, architectural, social, tooled. Same model and same governance are acceptable; same session is not. Self-review without a context break is execution-in-disguise regardless of label.

### D4 — Epoch 8.3, not a new epoch
The validation-as-mode work lives as E0008.3 because it extends E0008's observability theme (now observing process itself) rather than establishing a new central move. E0008 is eyes on usage; E0008.1 eyes on infrastructure; E0008.2 eyes on time; E0008.3 eyes on process. E0009 is reserved for what becomes possible once validation is observable and separable: self-correction mechanisms that close the loop.

### D5 — Teams-over-swarms is a governing ODD principle (follow-up PR scope)
Deliberate architectural preference: teams over swarms. Teams have differentiated roles, shared fate, and separation of concerns; swarms are emergent collectives of identical units. Swarms are valid for some use cases (batch processing, parallel independent queries) but teams are the default for consequential work. Canon doc title: `canon/principles/teams-over-swarms.md` (tier 2). Will cite three anchors: the African proverb "go fast alone, go far together," 1 Corinthians 12 (the body with many members), and the operator's own testimony (oddkit alone, TruthKit together). Follow-up PR after `klappy.dev#105` merges.

### D6 — Solo-to-team transition is canon-worthy
The operator's shift from solo work (oddkit, klappy.dev) to team-driven product (TruthKit) is a durable decision with architectural implications for the whole project ecosystem. It will be recorded in a dedicated canon doc (likely `odd/decisions/solo-to-team-transition.md` or similar) after the teams-over-swarms principle lands. The transition explains why oddkit stays MIT/open-source, why TruthKit is the commercial successor, and how the public journal becomes the published book.

### D7 — Book title and positioning confirmed
Book title: *Nothing New, Even AI*. Seven-part arc, 21 chapters plus appendices. Material comes from the existing public journal (writings, essays, canon docs) plus original writing for cohesion. Book is the polished closing of the solo arc. Its handoff is to TruthKit — the sequel the book gestures toward without being about.

### D8 — oddkit as open-source cornerstone, TruthKit as commercial successor
oddkit remains MIT-licensed, fully capable, maintained for users. Its documentation honestly positions TruthKit as the commercial harness built on oddkit — not bait-and-switch; open-core pattern (Linux → Red Hat; Postgres → Supabase; oddkit → TruthKit). klappy.dev continues as canon home and book site.

### D9 — Commit strategy for E0008.3 canon work
Six-file context-break integration commits to `canon/validation-as-fourth-epistemic-mode` branch (PR #105): validation-as-epistemic-mode, mode-discipline-and-bottleneck-respect, epoch-8-3, mode-separated-conversations, model-operating-contract, project-instructions-template. Pattern: naming + separation integrated across canon + bootstrap + template. Mode-separated-conversations still needs epoch/date stamp — final polish before the gauntlet.

---

## Constraints (C)

### C1 — Canon-first rule applies to every new invariant
No invariant ships in code without a governing canon doc. The E0008.3 canon docs are the ground truth; the code behavior (no-op in oddkit; validation-as-mode is pure canon) follows from canon, not the reverse. Future E0009 self-correction work requires its governing canon before any implementation.

### C2 — Gauntlet before declaring any canon doc done
Every canon doc in this PR must pass `oddkit_preflight` + `oddkit_challenge` in `canon-tier-1` or `canon-tier-2` mode (per tier), with explicit frontmatter audit against `canon/meta/frontmatter-schema` (native YAML types). Frontmatter stamps: epoch E0008.3, current date, full derives_from, governs text, stability. No doc ships without this.

### C3 — PR scope discipline
#105 is already loaded with E0008.3 canon work plus context-break integration. Adding teams-over-swarms to the same PR would violate the scope-lock principle the PR itself is documenting. Teams-over-swarms ships as a dedicated follow-up PR. Solo-to-team transition record ships as another follow-up. Three separate PRs, each with a single central move.

### C4 — Live smoke is ship-blocker for MCP tools
Per `canon/constraints/core-governance-baseline.md` invariant 7, no MCP tool with a response contract merges without live-smoke against a deployed preview. Template lives at `workers/test/canon-tool-envelope.smoke.mjs`. Invariant verified in this session: #108 passed 24/24 on preview and the same test is now the template for all future canon-driven tools.

### C5 — Internal rename deferred, contract stays stable
`ZipBaselineFetcher` class, `canonUrl` variables, and `BASELINE_URL` env var remain unchanged in this PR cycle. The public contract (parameter names, tier strings, response envelope) is fully renamed. Internal rename is a dedicated follow-up PR to avoid mixing user-visible contract changes with internal cleanup.

### C6 — Teams-over-swarms is preference, not dogma
The principle prefers teams but explicitly acknowledges swarms are valid for some use cases. Canon doc must include a "When Swarms Are Fine" section to keep the principle honest. Dogmatizing teams-for-everything would violate the "use only what hurts" principle — some problems don't need the overhead.

---

## Handoffs (H)

### H1 — #105 merge readiness (immediate)
Six-file branch `canon/validation-as-fourth-epistemic-mode` is mid-commit. Remaining work before pushing:
- Stamp epoch E0008.3 + date 2026-04-19 on `docs/appendices/mode-separated-conversations.md` (currently missing both; stability is "evolving" and should stay so)
- Run `oddkit_preflight` + `oddkit_challenge` (canon-tier-1 mode) on the six files
- Frontmatter audit pass (native YAML types, derives_from references resolve, governs text complete)
- Commit message naming the two-shift framing (naming + separation) and context-break integration
- Update #105 PR body to reflect the deepened framing
- Merge when gauntlet clean

### H2 — #108 merge readiness (immediate)
`klappy/oddkit#108` (canary completeness + knowledge_base rename + smoke test) is green: 24/24 smoke on preview URL `https://fix-telemetry-policy-envelope-and-canon-url-oddkit.klappy.workers.dev/mcp`. Two bugbot findings addressed (both autofixed by Cursor Agent, commits `620e6a9` and `c8f53ae`). Merge order: after #105 or independent. Then open promotion PR from oddkit `main` → `prod` and re-smoke against prod URL.

### H3 — Teams-over-swarms PR (next)
Draft `canon/principles/teams-over-swarms.md` (tier 2). Three anchors: African proverb (tradeoff), 1 Corinthians 12 (anatomy), operator's testimony (witness). Sections: opening blockquote, summary (engineering argument), derivation from the body metaphor, when swarms are fine, architectural implications pointing to E0009/TruthKit. Follow-up PR after #105 merges.

### H4 — Solo-to-team transition canon record (next after teams-over-swarms)
Dedicated doc recording the transition: oddkit + klappy.dev as complete solo arc, TruthKit as team successor, public journal → polished book, open-core positioning. Likely location: `odd/decisions/solo-to-team-transition.md` or `docs/appendices/solo-to-team-transition.md`. Landing after teams-over-swarms gives that principle the room to be the governing canon this decision invokes.

### H5 — E0009 architecture work (longer horizon)
E0009 is self-correction. It cannot begin until #105 merges and teams-over-swarms lands. When it begins, it will require:
- Canon doc defining the central move (self-correcting loop with routed handoffs)
- Harness architecture that routes artifacts between roles with context breaks at handoffs
- TruthKit is likely the first concrete E0009 implementation
- Explicit acknowledgment that E0009 requires a team (both in canon and in implementation)

### H6 — Internal rename PR (deferred cleanup)
`ZipBaselineFetcher` → `KnowledgeBaseFetcher`, `canonUrl` → `knowledgeBaseUrl` in orchestrate.ts (~111 refs) and telemetry.ts (~9 refs), `BASELINE_URL` env var rename. Affects only internal code; no user-visible contract change. Can land anytime after #108 promotes to prod.

### H7 — Book work (longest horizon)
*Nothing New, Even AI* — seven-part arc, 21 chapters. Material exists in public journal; work is selection, polish, framing. Final chapters handoff to TruthKit. No immediate action required; separate workstream.

---

## Encode Closures (E)

### E1 — This ledger is the encode
`oddkit_encode` produces structured artifacts in response but does not persist. This ledger file IS the persistence — the durable record that closes the session's loop. Future sessions can reference `klappy://odd/ledger/2026-04-18-e0008-3-validation-and-teams-over-swarms` to recover full context.

### E2 — Canon docs are the other encodes
The canonical encoded artifacts of this session are the canon docs themselves: validation-as-epistemic-mode.md, mode-discipline revision, epoch-8-3.md, bootstrap revision, template revision, mode-separated-conversations revision. Once #105 merges, those docs become the durable record of what E0008.3 decided. This ledger is the session-scoped complement to the canon-scoped encoded decisions.

### E3 — The PRs are the executable encodes
Every decision in D1–D9 is traceable to a PR (some merged, some open, some planned). PRs are the executable form of encoded decisions for commit-able work. Canon docs are the narrative form. This ledger is the session-contextual form. All three layers together give the decision a durable, retrievable, and verifiable record.

---

## Open Items (O) — Forward-Pointing Threads

Prioritized by urgency and dependency. Each open item carries forward to future sessions until closed.

### Priority 1 — Unblocked, ready to ship

**O1 — oddkit main → prod promotion.** #108 is merged to main. Prod promotion PR from `main` → `prod` is the last step of the canary arc. Smoke test (`workers/test/canon-tool-envelope.smoke.mjs`) re-runs against prod URL once deployed to verify parity with preview. This is the only truly open thread from tonight's work.

**O2 — `oddkit_encode` batch-mode feature.** Encode currently collapses multi-artifact input into a single typed blob — this was surfaced tonight when the session-closing encode produced one weak-quality Constraint instead of 28 typed artifacts. Fix: server-side paragraph splitting plus optional typed prefixes (`[D]`/`[L]`/`[O]`/`[C]`/`[H]`/`[E]`), returning per-artifact array with individual quality scores. Cheap server-side string work. Enables natural LLM usage pattern (dump thinking in paragraph form, encode splits and classifies).

**O3 — DOLCHE → DOLCHEO vocabulary alignment.** Tool currently calls the set "OLDC+H"; canon calls it DOLCHE; this ledger introduces DOLCHEO. Three vocabularies for one concept is two too many. Needs a canon doc (likely `canon/constraints/dolche-tracking.md` or `canon/definitions/dolcheo-vocabulary.md`) establishing DOLCHEO as canonical and updating the encode tool description to match. Tool description update is currently blocked on this resolution.

### Priority 2 — Next canon work

**O4 — `canon/principles/teams-over-swarms.md` (tier 2).** Governing architectural preference. Three anchors: African proverb (tradeoff — fast alone / far together), 1 Corinthians 12 (anatomy — body with many members), operator testimony (witness — oddkit alone, TruthKit together). Sections: blockquote, summary, body-metaphor derivation, when-swarms-are-fine, architectural implications pointing to E0009 and TruthKit. Companion public essay likely follows.

**O5 — Solo-to-team transition canon record.** Durable decision doc. Location TBD (`odd/decisions/solo-to-team-transition.md` or `docs/appendices/solo-to-team-transition.md`). Covers: oddkit/klappy.dev solo arc complete, TruthKit as team successor, open-core positioning, public journal → polished book. Follows O4.

**O6 — Bugbot pattern formalization.** The two-layer team pattern (authoring agent does depth; bugbot / fresh-context reviewer does breadth) proved itself twice in this session. Worth formalizing as canon — "bugbot is E0008.3 validation role, personified." Candidate doc: `canon/patterns/bugbot-as-validator.md` or similar. Could also live as a section inside the teams-over-swarms principle.

**O7 — "Mechanical transformations belong in code, not prompts" principle.** Surfaced tonight via the encode shortcoming. Pattern-level, not one-off — any time oddkit asks the LLM to format or structure mechanically, that work belongs in server code. Candidate canon principle doc. Concrete first application: O2 (encode batch-mode).

### Priority 3 — Cleanup and consistency

**O8 — Internal rename PR for oddkit.** `ZipBaselineFetcher` → `KnowledgeBaseFetcher` (class), `canonUrl` → `knowledgeBaseUrl` (~111 refs in orchestrate.ts, ~9 in telemetry.ts), `BASELINE_URL` → `DEFAULT_KNOWLEDGE_BASE_URL` env var. No user-visible contract change. Deferred tonight to keep #108 focused.

**O9 — oddkit audit doc terminology pass.** `docs/oddkit/audit/governance-anti-pattern-sweep-2026-04-17.md` still uses old `canon_url` terminology. Also mark telemetry_policy canary row as completed — it shipped via #108. Small cleanup commit.

**O10 — Telemetry blob6 naming decision.** Docs now say `knowledge_base_url` but the internal telemetry field is still `canon_url` (historical data continuity). Decide: keep blob6 name for continuity, or rename with a migration note. Either is defensible; the decision should be documented.

### Priority 4 — Larger planning threads (not yet scoped into PRs)

**O11 — E0009 self-correction architecture.** Canon doc + implementation design. Waits on O4 (teams-over-swarms) landing. Central move: self-correcting loops with routed handoffs across role-differentiated agents, context breaks at each handoff. Implicated: harness routing by role, not by parallelism. TruthKit likely first concrete E0009 implementation.

**O12 — TruthKit swarm-vs-team harness decision.** Tim and Ian need to review the team/cell framing since it reshapes commercial positioning. Conway extension packaging (`.cnw.zip`) is a distribution opportunity whose architecture maps onto all three CNW components. Requires conversation, not just doc work.

**O13 — Encode architecture full fix.** Beyond O2's batch mode. Currently pure English regex, four hardcoded types, collapses entire submissions. Full fix: encode reads vocabulary governance from knowledge base at runtime, returns per-type artifacts, mirrors the telemetry_policy canary pattern (live KB fetch with bundled fallback and minimal last-resort). Depends on O3 (vocabulary alignment) landing first.

### Priority 5 — Writing thread

**O14 — Book: *Nothing New, Even AI*.** Seven-part arc, 21 chapters + appendices. Material exists in public journal; work is selection, polish, framing. Closing chapters hand off to TruthKit. Longest-horizon open item.

**O15 — Public essay: creator-cannot-be-own-critic for book chapter.** Expanding the E0008.3 incident into narrative. Companion to existing `writings/the-same-rules-fresh-eyes.md`. Tonight's bugbot story is the empirical anchor.

**O16 — Public essay: teams-over-swarms.** After O4 canon principle lands. Three-anchor structure (proverb, scripture, testimony) reads well for a general audience. Candidate book chapter.

**O19 — Course: "Learning to Work with AI" — chronological walkthrough of the journey.** Distinct product from the book (O14). Book is thesis-first, organized by argument; course is journey-first, organized by chronology. Learners encounter epochs, canon docs, public essays, and pivot moments in the same order the operator did — with forward-references that foreshadow later overrides so the "aha" moments hit when discovered, reinforced by prior priming.

Structural notes:
- Seven modules likely (one per major epoch or arc): Before-ODD foundations, E0005–E0006 early framework, E0007 proactive shift, E0008 observability, E0008.3 validation + context break + teams-over-swarms, E0009 self-correction, TruthKit capstone.
- Each module structured as: state of framework entering the epoch → forcing fault → canon produced → public essays written → forward references to future overrides → exercises that make the learner do the thinking.
- Canon retractions, renames, and epoch bumps become teachable inflection points rather than embarrassments. The mistakes are the lessons.
- Gated on O11 (E0009 exists) and O14 (book is mostly finalized) — the course is derivative of both. Also gated on TruthKit having enough running state to serve as the capstone module.
- Pruning is the hard part: public journal has 500+ docs; course needs ~30–50 pivot moments carrying narrative. Everything else linked as reference.
- Pedagogical frontmatter tagging can start now — identifying "teaching moment" docs while memory is fresh is cheap; reconstructing it later is expensive. Candidate frontmatter field: `pedagogy: teaching-moment | reference | foreshadow-hook`.

Product positioning (four-tier architecture):
- Book (O14) sells the framework
- Course (O19) teaches the framework
- oddkit + klappy.dev demonstrate the framework
- TruthKit is the framework applied in production

Four audiences, one source, coherent flywheel.

### Priority 6 — Infrastructure (non-urgent)

**O17 — Social Projector (post.klappy.dev) content calendar.** Auto-loads latest articles from oddkit, generates week-long story arcs for batch approval. Uses oddkit prompt pattern. Not urgent.

**O18 — klappy.dev doc-listing edge function cache staleness.** Unauthenticated GitHub API rate limiting can cause SHA-based cache to serve stale index. Not blocking but on the radar.

### Open questions (Q-flagged items)

**Q1 — Does DOLCHEO fully replace DOLCHE, or coexist?** Proposal: DOLCHEO replaces, because DOLCHE was always incomplete — the Open category was missing and we were handling it ad-hoc. Needs explicit decision in O3's canon doc.

**Q2 — Does the second O ("Open item") need a distinguishing letter in the notation to avoid collision with the first O ("Observation")?** Options: keep both as O and rely on section context, use O/OQ, use O/U (for Unresolved), use O/? (for question). Lean: keep both as O. The duality is legible when sections are clearly labeled.

**Q3 — Should validation-as-mode canon doc include a pointer to bugbot-as-validator pattern once O6 canon exists?** Yes, via `complements` frontmatter once the pattern doc lands.

**Q4 — At what volume of open items does a session ledger become its own planning document rather than a retrospective?** Not a blocker tonight but worth noting — this ledger is borderline. Future sessions with 20+ open items might need to split retrospective (DOLCHE) from forward plan (O) into separate documents.

**Q5 — Is the course (O19) a separate product from the book (O14), or a companion to it?** If companion: the course sells alongside the book as a bundled or upsell offering; the book is prerequisite reading. If separate: the course stands alone and the book becomes optional context; they reach different audiences with overlapping source material. Lean toward separate — they have different completion criteria (book: argument complete; course: learner can operate) and different outcomes (book sells the framework; course teaches the framework). Decide before investing significantly in either product's final structure.

---

## Closing Note

This session marks a turning point. The solo MIT arc — oddkit, klappy.dev, canon, writings — has a name now: field notebook in public, resume as journey, book as polish. TruthKit — the team-driven commercial successor — is named as its sequel. E0008.3 is the epoch where the system itself crossed the same threshold the operator did: from seeing itself work to separating its roles so the work can be honest. E0009 waits on the other side of merge, where self-correction becomes structurally possible because naming, seeing, and separating are now canon.

Going fast alone got us this far. Going far together is what comes next. The ride continues — with help.
