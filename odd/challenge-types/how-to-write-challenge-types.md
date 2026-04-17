---
uri: klappy://odd/challenge-types/how-to-write-challenge-types
title: "How to Write a Challenge Type Governance Article"
audience: docs
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "challenge", "challenge-type-meta", "governance", "meta", "prompt-over-code", "template"]
epoch: E0008
date: 2026-04-16
derives_from: "canon/principles/prompt-over-code.md, canon/principles/vodka-architecture.md, canon/constraints/epistemic-challenge.md, odd/encoding-types/how-to-write-encoding-types.md"
complements: "odd/challenge-types/strong-claim.md, odd/challenge-types/proposal.md, odd/challenge-types/assumption.md, odd/challenge-types/observation.md, odd/challenge/base-prerequisites.md, odd/challenge/normative-vocabulary.md, odd/challenge/stakes-calibration.md"
governs: "All challenge-type governance articles, server parsing of challenge-type docs, custom challenge type creation, multi-type matching semantics, base-plus-overlay prerequisite resolution"
status: active
---

# How to Write a Challenge Type Governance Article

> Every challenge type in oddkit — default or custom — is defined by a governance article, not by server code. The server discovers these articles at challenge time and extracts detectors, question banks, prerequisite overlays, and reframings from what it finds. A single input may match multiple types at once; each match contributes. Universal prerequisites live in a base article that applies to every claim; type articles add overlays. Normative vocabulary and stakes calibration are governed by separate articles, not per type. Oddkit ships with a set of software-engineering defaults; every other domain — thought leadership from books, comparative architectural writing, translation consultancy, pastoral ministry — is expected to override with its own taxonomy. Write the articles well and the server handles the rest. No deployment. No code change. Prompt over code, applied to the vocabulary of challenge itself.

---

## Summary — Four Article Kinds, Machine-Extractable Structure, Multi-Match Semantics

Challenge governance is not a single document. It is a small set of coordinated articles, each with an explicit extraction contract:

1. **Challenge-type articles** — one per type, discovered by the tag `challenge-type`. Each defines detection, questions, per-type prerequisite overlays, and reframings.
2. **Base prerequisites article** — one doc at `odd/challenge/base-prerequisites.md` defining universal checks applied to every claim regardless of type.
3. **Normative vocabulary article** — one doc at `odd/challenge/normative-vocabulary.md` defining the words whose presence in a retrieved canon quote signals a tension-bearing directive.
4. **Stakes calibration article** — one doc at `odd/challenge/stakes-calibration.md` defining how epistemic mode (`exploration` / `planning` / `execution`) maps to challenge depth.

A challenge can match multiple types. Each matched type contributes questions, overlay prerequisites, and reframings. The server dedupes across contributions. Base prerequisites always apply. Stakes calibration trims the aggregated output.

Missing sections and missing articles degrade gracefully. A type without a `## Detection Patterns` block still works if invoked explicitly. An absent stakes calibration article falls back to surfacing everything. An absent base prerequisites article means every check must live in a type article. A fully structured governance set produces the richest challenge.

---

## Recommended File Layout

```
odd/challenge-types/strong-claim.md
odd/challenge-types/proposal.md
odd/challenge-types/assumption.md
odd/challenge-types/observation.md
odd/challenge-types/theological-claim.md    (custom example)

odd/challenge/base-prerequisites.md
odd/challenge/normative-vocabulary.md
odd/challenge/stakes-calibration.md
```

Challenge-type articles live under `odd/challenge-types/`. Supporting articles live under `odd/challenge/` because they are not per-type.

---

## Recommended Frontmatter for Challenge-Type Articles

Standard oddkit frontmatter with these conventions for best results:

| Field | Convention |
|---|---|
| uri | `klappy://odd/challenge-types/{slug}` |
| tags | Must include `challenge-type` — this is the discovery tag |
| governs | Should reference `oddkit_challenge behavior for type {slug}` |
| derives_from | Should include `canon/constraints/epistemic-challenge.md` |
| fallback | Optional boolean — see Fallback Behavior |

The `challenge-type` tag is the discovery mechanism. The server searches for articles tagged `challenge-type` at challenge time. Without this tag, the server will not discover the type — but nothing else breaks.

---

## Recommended Sections for Challenge-Type Articles

The server extracts from these section headers when present. Including them produces the best detection, question surfacing, and prerequisite checking. Missing sections degrade gracefully — the server uses what it finds.

### Section: Blockquote (opening)

The opening blockquote defines the type in one to three sentences. This is surfaced to the model as the type's description and appears in the challenge response alongside every other matching type's description. Keep it concise — it will appear next to every sibling's blockquote.

### Section: `## Type Identity`

A markdown table with exactly these rows:

```markdown
## Type Identity

| Field | Value |
|---|---|
| Slug | {kebab-case identifier, matches filename} |
| Name | {human-readable type name} |
| Priority | {relative priority — affects display order only, not exclusivity} |
```

The server extracts `Slug` and `Name`. `Slug` is the stable identifier used in responses and multi-match dedup keys. Challenge types have no single-letter code — they do not serialize into TSV.

### Section: `## Detection Patterns`

A code block of comma-separated trigger words and phrases that identify this claim type in input text:

````markdown
## Detection Patterns

When an input matches any of these patterns, the claim is tagged as {Name}:

```
must, always, never, guaranteed, impossible, certain, definitely, obviously, clearly
```
````

The server compiles these into a case-insensitive word-boundary regex. Multiple types may match a single input — this is the intended design. A claim stating "We must always use X" may match both `strong-claim` (for "must") and a hypothetical `prescription` type (if one exists). Each matched type contributes its questions and overlays.

### Section: `## Challenge Questions`

A markdown table of questions this type surfaces when matched. Each row: a question and the stakes tier at which it applies.

```markdown
## Challenge Questions

| Question | Stakes tier |
|---|---|
| What evidence would disprove this? | baseline |
| Under what conditions does this NOT hold? | baseline |
| Who or what would disagree with this, and why? | elevated |
```

The server extracts questions and tiers. Stakes calibration (governed separately) determines which tiers are surfaced for a given mode. Without a `Stakes tier` column, all questions surface at every mode.

Tier names are not fixed by this article. They are defined by the stakes calibration article. A KB may use `baseline / elevated / rigorous`, or `low / medium / high`, or any scheme — as long as the tiers used in type articles match the tiers defined in the calibration article.

### Section: `## Prerequisite Overlays`

A markdown table of prerequisites the server checks *in addition to* the base prerequisites. Each row: a check name, the test, and an actionable gap message.

```markdown
## Prerequisite Overlays

| Prerequisite | Check | Gap message if missing |
|---|---|---|
| alternatives-considered | input contains "alternative", "instead", "option", or "rejected" | "No alternatives mentioned — single-option {name} lacks rigor" |
| risk-acknowledged | input contains "risk", "cost", "downside", or "tradeoff" | "No risks or costs acknowledged" |
```

Checks should be mechanically testable (substring, keyword presence, simple regex). Gap messages should be actionable — `"Add why this was chosen"` is better than `"rationale missing"`. The `{name}` placeholder is substituted with the type's Name at runtime.

Overlays add to base prerequisites; they do not replace them. An input missing both `evidence-cited` (a base check) and `alternatives-considered` (a proposal overlay) receives both gap messages.

### Section: `## Suggested Reframings`

A bulleted list of reframings the server may surface when this type matches. These are literal strings the model can offer back to the claimant.

```markdown
## Suggested Reframings

- Reframe as hypothesis: "We believe X because Y, and would reconsider if Z"
- Add optionality: "We're choosing X over Y because Z, reversible until W"
```

---

## Fallback Behavior — What Happens When No Type's Detection Matches

When an input matches no type's detection patterns, the server uses a fallback type. The fallback is determined by governance, not hardcoded.

A type declares itself the fallback via frontmatter:

```yaml
---
uri: klappy://odd/challenge-types/observation
fallback: true
---
```

Resolution order:

1. If exactly one type has `fallback: true`, that type is the fallback.
2. If multiple types declare `fallback: true`, the first discovered alphabetically by filename wins.
3. If no type declares `fallback: true`, the server uses the first type discovered alphabetically.

The recommended convention is to mark **observation** as the fallback. An unclassified input is a statement without a strong directive — semantically, that is what an observation is. This convention aligns with the encode fallback for Observation (O).

---

## Multi-Match Semantics — One Claim, Many Types

Challenge types are **explicitly multi-match by design**. A single input can and often should match several types — this is different from encoding, where single-type matches are the common case.

When multiple types match, the server:

1. Runs every type's detection regex against the input. Order does not affect correctness.
2. Aggregates questions across all matched types.
3. Aggregates prerequisite overlays across all matched types on top of base prerequisites.
4. Aggregates reframings across all matched types.
5. Dedupes by string equality within each category.
6. Surfaces the matched-type names in the response so the operator can see which types contributed.

The `Priority` field in `## Type Identity` affects display order in the response, not whether a type participates. Every matched type participates.

If no type's detection matches, the single fallback type runs alone.

---

## Base Prerequisites — Applied to Every Claim

The base prerequisites article at `odd/challenge/base-prerequisites.md` defines universal checks that run regardless of which types matched. It uses the same `## Prerequisite Overlays` table structure as type articles, but its contents apply to every challenge call.

Example:

```markdown
## Prerequisite Overlays

| Prerequisite | Check | Gap message if missing |
|---|---|---|
| evidence-cited | input contains "evidence", "data", "measured", or "observed" | "No evidence cited — claims without evidence are assumptions" |
| source-named | input contains a citation marker (URL, quoted phrase, "per X") | "No source named — verifiability is unclear" |
```

If the base prerequisites article is absent, only type-overlay prerequisites run. The server logs a warning but does not fail.

---

## Normative Vocabulary — Governed Separately

The normative vocabulary article at `odd/challenge/normative-vocabulary.md` defines the words whose presence in a retrieved canon quote signals a tension-bearing directive. This replaces the hardcoded `normativePatterns` array in the current implementation.

Structure:

```markdown
## Normative Vocabulary

| Word | Directive type |
|---|---|
| MUST | requirement |
| MUST NOT | prohibition |
| SHOULD | recommendation |
| SHOULD NOT | discouragement |
| NEVER | prohibition |
| ALWAYS | requirement |
```

The server compiles these into tension-detection regexes applied to retrieved canon quotes. Adding domain-specific normative language (`SHALL` for a formal-contracts KB, `PROHIBITED` for compliance, `ANATHEMA` for a theological KB) becomes a canon edit, not a deploy.

If this article is absent, the server uses a minimal built-in fallback of `MUST` / `MUST NOT` / `SHOULD` / `SHOULD NOT` only — degraded but functional.

---

## Stakes Calibration — How Mode Maps to Challenge Depth

The stakes calibration article at `odd/challenge/stakes-calibration.md` defines how the `mode` parameter maps to challenge depth. This is the single largest behavioral lever currently unavailable to the runtime — the `mode` parameter exists today but only biases retrieval scoring, not what is surfaced.

Structure:

```markdown
## Stakes Calibration

| Mode | Question tiers surfaced | Prerequisite strictness | Reframings surfaced |
|---|---|---|---|
| exploration | baseline | optional (warn only) | first 1 |
| planning | baseline, elevated | required (gap messages) | all |
| execution | baseline, elevated, rigorous | required + source-named | all, plus block-until-addressed |
```

The server reads the row matching the caller's `mode` and filters the aggregated output accordingly. Without a mode parameter, the server defaults to `planning` with low confidence — matching current behavior.

If this article is absent, every question, prerequisite, and reframing is surfaced regardless of mode — degraded but functional. Challenge without calibration is still challenge; it is just uniformly loud.

---

## Domain Adaptation — The Defaults Are Software-Flavored On Purpose

Oddkit ships with a default set of challenge-type articles (`strong-claim`, `proposal`, `assumption`, `observation`) and supporting articles (`base-prerequisites`, `normative-vocabulary`, `stakes-calibration`) calibrated for software-engineering work. This is deliberate, not neutral. A generic "universal human-language" default would serve every domain equally badly; a domain-specific default at least serves one domain well and signals to the others that adaptation is expected.

A KB in another domain is expected to override some or all of these articles. The override mechanism is simple: write articles with the same extraction contract under the KB's own `odd/challenge-types/` and `odd/challenge/` paths. When oddkit is pointed at that KB via `canon_url`, the KB's articles are what gets discovered.

What follows are three worked patterns. The point is not that these are the only three. The point is that the framework holds across all three, and a fourth domain's steward can build its taxonomy by identifying its own analogs.

### Pattern A: Software Engineering (Oddkit's Defaults)

**Claim types:** strong-claim, proposal, assumption, observation.

**Normative vocabulary:** RFC 2119 — `MUST`, `SHALL`, `SHOULD`, `MUST NOT`, `REQUIRED`, `PROHIBITED`.

**Stakes modes:** `exploration`, `planning`, `execution` — the canon epistemic modes.

**Reviewer discipline simulated:** an experienced engineer reviewing a design doc. "What alternatives were considered? What's the cost of being wrong? Is this reversible?"

**Failure mode without this discipline:** shipping irreversible architectural decisions without examining alternatives; proposals that are actually assumptions dressed up as plans.

### Pattern B: Thought Leadership from Books

**Claim types:** attribution, synthesis, application, interpretation, extension, critique. A thought leader working from books rarely makes proposals in the software-engineering sense. They attribute ideas to authors, synthesize across works, apply frameworks from one domain to another, interpret passages, extend arguments, and critique. The default software taxonomy barely touches these moves.

**Normative vocabulary:** not RFC 2119. Instead: the author's own emphasized terms, phrases like "the central point is," "the key move is," "consider carefully that" — the markers of load-bearing claims in prose. Also directive language from the source material itself, when the domain has sacred or authoritative texts: `commanded`, `forbidden`, `instructed`, `admonished`.

**Stakes modes:** likely not `exploration / planning / execution` at all. Closer to the lifecycle of reading-and-writing — `note-taking`, `drafting`, `teaching-material`, `publication-ready`. A pressure-test appropriate for raw reading notes is not appropriate for a published teaching.

**Reviewer discipline simulated:** a careful peer reviewer or developmental editor. "Is this your reading or the author's own claim? Does the passage actually support the paraphrase? Have you engaged the strongest version of the argument? Whose interpretive tradition does your reading fit within?"

**Failure mode without this discipline:** quote-mining, paraphrase overreach, strawmanning, convenient interpretation. These are the failure modes that distinguish serious thought leadership from glorified note-passing.

**Example articles a thought leadership KB would write:**
- `odd/challenge-types/attribution.md` — detection on `"X argues,"`, `"according to X,"`, `"as X writes"`; prerequisites on direct-quote vs paraphrase, page-or-chapter reference, passage context
- `odd/challenge-types/application.md` — detection on `"applying X to Y,"`, `"this framework helps us see,"`, `"if we take X's approach"`; prerequisites on original-domain-named, cross-domain-fit-argued
- `odd/challenge-types/interpretation.md` — detection on `"what this means is,"`, `"the deeper point,"`, `"really saying"`; prerequisites on context-of-passage, interpretive-tradition-named

### Pattern C: Comparative Architectural Writing

**Claim types:** pattern-coinage, comparative-positioning, principle-extraction, retroactive-sense-making, predictive-architectural-claim. Architectural writing in the tech/systems domain makes a third distinct set of moves. It names patterns ("Vodka Architecture"), positions work against a landscape (viral repos, published papers, adjacent products), extracts principles from experience ("Use Only What Hurts"), retroactively makes sense of one's own trajectory ("what we built is E0007 realized"), and predicts where things are going ("TruthKit is where oddkit is going").

**Normative vocabulary:** architectural load-bearing terms — `invariant`, `forcing function`, `non-negotiable`, `always`, `never`, `the test is`, `the unlock is`, `only`, `pure`. These are exactly the terms where a writer locks a position and therefore where a careful reviewer should pressure-test.

**Stakes modes:** not exploration/planning/execution. Closer to the writing lifecycle — `voice-dump`, `drafting`, `peer-review-ready`, `canon-tier-2`, `canon-tier-1`, `published-essay`. A voice-dump deserves almost no pressure. A canon-tier-1 claim deserves maximum pressure because it becomes load-bearing for future work. A published essay deserves hostile-reader simulation.

**Reviewer discipline simulated:** a rigorous systems-thinking peer reviewer. "Is the coinage novel, or does the literature already name this? Is the comparison target fairly represented or strawmanned? Is the principle derived from one case or several? Does the retroactive sense-making fit the actual timeline? Has this survived a hostile reader?"

**Failure mode without this discipline:** reinventing named patterns, strawmanning the comparison, overreaching from single cases, post-hoc rationalization of happy accidents, self-citation loops where every source shares a URL root.

**Example articles a comparative-architectural-writing KB would write:**
- `odd/challenge-types/pattern-coinage.md` — detection on introducing a novel named pattern; prerequisites on prior-art-searched, novelty-argued, term-defined-precisely
- `odd/challenge-types/comparative-positioning.md` — detection on `"like X but,"`, `"unlike X,"`, `"existing approaches"`, `"the difference is"`; prerequisites on comparison-target-accurately-characterized, freshness-of-comparison-verified, strongest-version-engaged
- `odd/challenge-types/principle-extraction.md` — detection on quoted aphorisms, principle-naming language; prerequisites on derived-from-multiple-cases, counter-examples-considered, scope-named

### How a KB Steward Builds Their Own Taxonomy

A domain steward does not need to invent a taxonomy from scratch with a blank template. The fastest path is:

1. **Point oddkit at the target KB** via `canon_url`.
2. **Read the meta governance doc** (this document) via `oddkit_get`.
3. **Gather three to five examples of the KB's own best work** — essays, papers, notes, decisions, whatever the KB produces.
4. **Ask an LLM (with oddkit access) to study the examples and name the claim patterns** the work actually makes and the failure modes a good reviewer would pressure-test.
5. **Draft type articles from the named patterns**, using this document as the extraction-contract template. The LLM can produce first drafts; the steward reviews and corrects the vocabulary.
6. **Iterate.** A question that lands wrong is a canon edit, not a code change. A new claim pattern noticed in later work is a new article.

Two or three working sessions produce a taxonomy calibrated to the KB's actual practice. Every session after is content addition, type refinement, or lifecycle evolution.

---

## Writing a Custom Challenge Type

Custom types follow the identical extraction contract. A Bible translation KB adding a `translation-claim` type writes:

```
odd/challenge-types/translation-claim.md
```

With:

- frontmatter tag `challenge-type`
- a `## Type Identity` table with `Slug: translation-claim`
- detection patterns (`"the Greek says", "the Hebrew means", "this renders", "consensus translations"`)
- challenge questions (`"What do consultant translators render?"`, `"What does the community check group say?"`, `"What does the back-translation reveal?"`)
- prerequisite overlays (`original-language-cited`, `community-checked`, `consultant-reviewed`)
- reframings (`"Reframe as exegetical claim: 'The text in context Y appears to teach X, consistent with translations A and B'"`)

The server discovers the new type on the next challenge call and includes its contributions whenever its detection patterns match. No server change. No deploy.

**Conventions for custom types:**

- Slug should be kebab-case, unique within the KB
- Detection patterns should be specific enough not to false-match generic types
- Prerequisite overlays should be mechanically checkable
- Custom types are scoped to the KB that defines them — they do not affect other KBs

---

## The Server's Extraction Contract

At challenge time, the server:

1. Searches for articles tagged `challenge-type`. Caches results keyed by `canonUrl`, matching the encode pattern from PR #96.
2. For each challenge-type article, extracts when present:
   - Slug and Name from `## Type Identity`
   - Trigger patterns from `## Detection Patterns`, compiled into regex
   - Question/tier pairs from `## Challenge Questions`
   - Overlay prerequisites from `## Prerequisite Overlays`
   - Reframings from `## Suggested Reframings`
   - Fallback flag from frontmatter
3. Fetches `odd/challenge/base-prerequisites.md` (if present) and extracts base prerequisites.
4. Fetches `odd/challenge/normative-vocabulary.md` (if present) and compiles tension-detection regex.
5. Fetches `odd/challenge/stakes-calibration.md` (if present) and builds the mode-to-filter table.
6. Runs every type's detection regex against the input; collects all matches.
7. Retrieves canon quotes for the input (existing BM25 retrieval path) and scans them against the compiled normative regex for tensions.
8. Aggregates questions, prerequisites, and reframings across matches and base; dedupes.
9. Filters by stakes calibration for the caller's mode.
10. Returns the response with matched-type names, aggregated questions, prerequisites with gap messages, reframings, retrieved canon tensions, and the extracted type definitions — teaching the model what governs the behavior.

Missing sections and missing supporting articles degrade gracefully. A type without detection patterns can still be invoked explicitly. An absent stakes calibration article surfaces everything. An absent base prerequisites article means per-type overlays stand alone. Richer governance means richer challenge.

---

## Cache Invalidation

Per-canon caches — mirroring the encode fix in PR #96 — must be cleared in `runCleanupStorage`:

- `cachedChallengeTypes` keyed by `canonUrl`
- `cachedBasePrerequisites` keyed by `canonUrl`
- `cachedNormativeVocabulary` keyed by `canonUrl`
- `cachedStakesCalibration` keyed by `canonUrl`

Without this, governance doc edits require worker isolate recycle to take effect. That failure mode was identified and fixed during the encode refactor and must not be repeated.

---

## Discoverability

This article exists so that any search for "how to write challenge type," "custom challenge type," "add new challenge type," "challenge governance template," "challenge extension format," or "extend oddkit_challenge" surfaces this guide.

---

## See Also

- [How to Write an Encoding Type Governance Article](klappy://odd/encoding-types/how-to-write-encoding-types) — the parallel structure for encode; this article mirrors it and borrows its graceful-degradation semantics
- [Epistemic Challenge](klappy://canon/epistemic-challenge) — the operating constraints this tool operationalizes
- [Prompt Over Code](klappy://canon/principles/prompt-over-code) — the principle this entire mechanism implements
- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — why the server stays thin
- [oddkit_challenge tool](oddkit://tools/challenge) — the tool this governance shapes
