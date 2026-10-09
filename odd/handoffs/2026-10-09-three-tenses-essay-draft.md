# Handoff — Fresh Session: Draft the "Three Tenses" Essay in the Captain's Voice

Date: 2026-10-09 ~11:00 ET (America/New_York). From: first officer, FIA session (Claude, session `018r26yoGPoF5GTGY9N4JD2K`). To: a fresh session. Owner after draft: captain (exact-text ruling); then a fresh-context reviewer before merge.

## Status at handoff

- **Was** (09:47 ET): the principle existed only as a chat proposal.
- **Is** (11:00 ET, observed): klappy.dev **PR #346** open, draft, 4 files, frontmatter OK, fresh review YES after five rounds; **not merged**, awaiting the captain's text read. Branch `canon/status-carries-three-tenses`.
- **Will be**: the captain ruled **4** at 10:55 ET — draft the essay now, in his voice, as a **separate PR**; #346 merges on his yes, independently. Then the session returns to FIA (top-band HOLD from 23:09 ET on 2026-10-08).

## What to produce

One essay, `writings/<slug>.md`, author Klappy, `voice: first_person`, `type: essay`, `public: true`, following the frontmatter shape of `writings/the-same-rules-fresh-eyes.md` (hook, description, og_*, derives_from, complements, provenance). Open as a **draft PR** on klappy.dev; nothing in the captain's voice merges without his review of the exact text. Run `python3 scripts/validate-frontmatter.py <file>`; apply `canon/meta/writing-canon` (five extraction tiers) and `canon/constraints/ai-voice-cliches`.

Working title (his words, not yet ruled): the fourth dimension of software; what was, what is, what will be. Pick a title that names the stance; offer two alternates in the PR body.

## Read in this order

1. `klappy://canon/values/trust-kernel` — the essay hangs on this and points to it, never restates it.
2. PR #346's `canon/principles/status-carries-three-tenses.md` — the principle the essay popularizes: three tenses, each with observed time; three independent axes (confidence · proximity · relevance); each tense a timeline cut at natural snapshots; not the modes, not a version scheme, not a skill. The essay must not contradict it and should not repeat its tables.
3. PR #346's `canon/principles/data-carries-observed-time.md` — the data sibling; one paragraph in the essay at most.
4. `klappy://canon/observations/time-blindness-axiom-violation` — the model-clock precedent the captain says unlocked a lot; the essay is its human-side twin.
5. `writings/the-same-rules-fresh-eyes.md` and `writings/your-context-window-needs-a-sabbath.md` — his register: first person, one incident up front, concrete, no AI gloss.
6. Bee conversation **11113442** (2026-10-09, 118 utterances, "Building Trust Through Temporal Clarity") — his brain dump. Read it in full via the Bee relay (`/v1/conversations/11113442`, page with `since`). **Transcripts are lossy (D0018): paraphrase, never quote.**

## The material, in his words (paraphrased from the dump and the session)

- The common thread across every team he has worked on — customers, users, funders, developers to managers to the C-suite — and now across AI agents: conflating past, present and future without attributing which is which.
- Sales and leadership selling what will be as if it already is; he, as lead dev / architect / CTO / sales engineer, backfilling to make it true before anyone buys. Some call that how startups work; he holds that you can build a track record of bold promises kept *without lying*, and that conflating the timeline *is* the lie.
- He has done it himself — made claims because he could see the vision. The hard part is the discernment between the vision and what is now. Casting vision is required; losing the gray area between vision and present is the failure.
- Not three states: three axes — confidence, relevance, proximity — mirrored for past and future. A feature or a button can have twelve past states; show the relevant snapshots (before this session, last release, the one before), not every pixel tweak.
- Not the modes (explore/plan/build/validate are linear); tenses apply inside any of them.
- Semantic versioning is a cross-section: strong anchor for was/is, loose for the future because with AI the cycle is minutes to days and we ship when ready rather than pre-numbering.
- Applies to agent-to-agent contracts and schemas between layers, not only to humans.
- Not a skill; a principle/lens applied across skills. Simple rules and failure modes so we know when to apply it.
- The root: building and maintaining trust — honesty, transparency, observability across the product lifecycle. Foundational to a cookbook because drift is certain.
- A colleague's label "fourth-dimensional thinking" resonated with him; he sees it as a repackaging of discernment he has always practiced. **The captain has not ruled whether to name the colleague or use the label. Leave both out unless he says otherwise.**
- The morning's own incident, usable as the opening or the turn: a seat asked him a yes/no he had answered the night before, and reported a gate red that had been green for three and a half hours; every sentence had once been true, none carried its time. His reaction: unclear was/is/will-be is grounds to declare bankruptcy on a collaboration however good the work; the fourth dimension is the cornerstone of trust in the product lifecycle.

## Rubric the reviewer will grade against

A. **Voice.** Reads as Klappy: first person, incident first, plain words, no AI cliché list hits.
B. **Fidelity.** Every claim traceable to the dump, the session, or the two principles; no invented anecdotes, numbers, or names; people by role.
C. **DRY.** Points to trust-kernel and the principle; restates neither.
D. **Tiers.** Title, blockquote/hook, description, headers each stand alone (writing-canon).
E. **Tenses.** The essay obeys its own rule: every state claim in it is placed in time.

## Hold / wake

Hold: nothing. Wake: the captain's text ruling on the essay PR and on #346, carried as a comment on each PR.
