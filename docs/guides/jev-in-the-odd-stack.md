---
uri: klappy://docs/guides/jev-in-the-odd-stack
title: "Jev in the ODD Stack — When and How to Use a Typed Decision Layer"
audience: kitchen
tier: 3
stability: evolving
tags: ["guide", "jev", "boarding", "progressive-disclosure", "lattice", "telemetry", "calibration"]
date: 2026-09-21
derives_from: "canon/resonance/jev-system-one.md, canon/principles/vodka-architecture.md, docs/promotions/P0006-vodka-boundary-enumeration-as-spec-convention.md, canon/bootstrap/model-operating-contract.md, canon/constraints/retrieval-disclosure-contract.md, canon/constraints/telemetry-governance.md"
status: DRAFT — captain review required. Every constraint below is dated and sourced; every tripwire names what would change it.
---

# Jev in the ODD Stack

> **Seed, not ceiling.** This page is inspiration for exploration, not a limiting document. Nothing in it forbids trying Jev somewhere it does not list, and nothing in it guarantees a listed seam is worth building. The rule that binds is not the list; it is the grade. Every experiment gets honestly graded against the bake-off metrics and the vodka tests, and gets reversed — not defended — when it fails to add value or thickens the server. Exploration is welcome. Camping on a failed experiment is not.

The resonance page says *whether*. This page says *where, when, and how*, and — because every number here is days old — *what would make it wrong*.

---

## 1. The bet

In a bounded kitchen, most "thinking" is not writing. It is which tool, which doc, which section, which lines, which disclosure, whether to stop. Each is a Choice / Score / Noul over known state.

So: a **bootloader** boards the job onto contracts that already exist (Model Operating Contract, retrieval-disclosure, compiled memory, frontmatter axes, telemetry shapes) so work starts on the right floor. A **nested lattice** proposes the next layer of questions from the ontology, scores them in parallel, prunes in code, and feeds survivors forward as the next state. A generative model emits only the **splice** — constitution slice, kept lines cited, the typed question, nothing else.

The bootloader is not Jev. Jev answers the questions the bootloader is allowed to ask. The claim to test: 99% of the work never reaches the essay model.

**The pipeline, in one line: search → Jev → LLM.** Search is fast and wide — recall over the catalog, cheap, no judgment. Jev is fast and narrow — a typed verdict on each candidate the search returned: applies or not, worth the body or not, which bucket, halt. What survives is the most important, most effective, most efficient slice of context, scope, or answers, and only that slice reaches the generative model. The LLM never sorts a haystack; it works a pre-sorted tray. Each stage does the one thing the next stage cannot: search cannot rule applicability, Jev cannot write, the LLM cannot afford to read everything. Reverse the order and it breaks — an LLM sorting for Jev is the expensive step first; Jev without search is 255-capped over an unfiltered space.

The operational point is fat, not recall. Search routinely returns more than the context can use, and every surplus hit is paid for twice — once in tokens loaded, once in the model's attention sorting it. Measured: search averages ~4.5K tokens out and get ~5.6K, so one retrieve-then-read turn hands the LLM ~10K tokens of which a fraction mattered. With Jev between them: search stays wide and cheap (25 hits at floor disclosure ≈ 1.3K), Jev rules on all 25 in one sub-second call, and only the hits that apply reach the LLM, each at the disclosure it earned. So do not tune search narrower to save context; keep it wide for recall and let the trim happen where it costs a fraction of a cent. The metric is tokens loaded per useful line, and the bake-off in section 8 measures it.

**Alternatives considered.** (1) Search alone — cannot rule applicability; the governing rule rarely shares words with the task. (2) A small generative LLM as the classifier — ties Jev on decomposed tasks at ~27x the cost and 10x the latency; remains the right choice wherever a rationale is required. (3) Keep the lexical classifiers — the zero-shot-vs-keywords gap is ~19 points, but a two-line regex hit 91.8% on one set, so this stays a live contender in every bake-off. (4) A local logit scorer over a small open model — no vendor dependency, unmeasured; the Beget path if the price or the alias moves.

**Cost of being wrong.** Wrong router → an agent boards onto the wrong scope and either lacks the rule that applied or loads the firehose anyway. Bounded by the fail-open rule (static pass always available) and by the gates, which Jev never touches. Reversible: the questions are prose and a schema; removing Jev means pointing the same questions at another tier. Point of no return: none while every seam keeps its deterministic fallback.

**How the bet fails.** The 99% number does not survive measurement; latency floors stack past the boarding time they replace; or the gold set shows the kitchen's decisions are not as bounded as assumed. Section 8 measures all three.

---

## 2. The layer split (do not collapse)

| # | Layer | Owner | Jev's role |
| --- | --- | --- | --- |
| 1 | Reality / axioms | challenge, gate, validate | None. |
| 2 | Orientation | Model Operating Contract + orient | One Noul, "still in the declared mode?", as a hint. |
| 3 | Retrieval | retrieval-disclosure + compiled memory | Chooses next tool and disclosure flag from **telemetry shape**, never content. |
| 4 | Decision | Jev, or a local logit scorer | Owns this layer. Applicability of docs and lines from **content**. |
| 5 | Execution | code, MCP, recipes | Never executes. |
| 6 | Emission | generative LLM, only when text must be written | Never emits. |
| 7 | Validation | fresh-context break | None. Same-session self-review stays forbidden. |

Rule of thumb: Jev may **route, tag, score, trigger**. It may not **gate, validate, approve**.

---

## 3. Docs, then lines — two classifiers, never mixed

**Docs classifier (layer 3, structural).** Frontmatter axes first: audience, exposure, tier, kind, start_here, path. Then telemetry: what this tool at this disclosure cost last time. Journals only when the cheap shape lies — drift, a fat "summary," a catalog that should have been a search.

Measured shape, 30-day oddkit averages (sampled channel, 2026-09-21; ordering stable across two pulls):

| tool | ~in | ~out | reading |
| --- | --- | --- | --- |
| catalog | 27 | 8.4K | firehose — the reason the disclosure contract exists |
| get | 19 | 5.6K | body fetch is never the default |
| search | 20 | 4.5K | |
| challenge | 290 | 4.2K | |
| preflight | 105 | 3.8K | |
| encode | 220 | 2.6K | |
| orient | 50 | 1.6K | |
| gate | 46 | 620 | already decision-shaped |
| validate | 49 | 400 | |
| time | 4 | 130 | bootloader primitive |

Caveats: duration is I/O-bounded and reads 0 for CPU work; SSE rows often carry zero bytes; pre-wrapper rows ~27% zero-shape. Telemetry routes tool and disclosure; journals explain why a number lies. Do not scrape journals for token math.

```
state     = {tool, tokens_in, tokens_out, cache_hit_rate, disclosure_requested}
questions = {
  next_tool:     Choice[time, gate, orient, search_floor, get_summary, get_body, challenge, encode],
  payload_risk:  Score[cheap, moderate, fat, firehose],
  body_worth_it: Noul
}
```

**Lines classifier (layer 4, semantic).** Telemetry cannot see substance. Which sentences change the next decision; which are atmosphere. Compiled packs are the candidate lines; canon blockquotes are the criteria. Retrieve, then judge: search supplies recall, Jev rules applicability on the slice, code assembles. Neither replaces the other — search cannot say "applies / does not / stop," and the rule governing a task rarely shares words with the task.

---

## 4. The lattice — propose, score, prune

1. **Propose** a small set of next questions from the ontology, catalog, or compiled pack. Rules, a tiny generator, or a constrained model. Never free-form.
2. **Score** in parallel with Jev or a local logit scorer.
3. **Prune** in code. Below threshold dies; above becomes state for the next nest.
4. Repeat: tool → disclosure → URIs → lines → prompt shape → emit or halt.

The final prompt is an assembly, not a composition: constitution slice, kept lines cited, the typed question, nothing else. Prompt engineering becomes routing and splicing; context engineering becomes disclosure and line-prune.

---

## 5. Constraints — and the tripwires that move them

Every row is a measurement someone else made, days ago, on a model days old. The tripwire column is what would make the row stale.

| Constraint | Source (2026-09) | Design consequence | Tripwire that changes it |
| --- | --- | --- | --- |
| **Fixed latency floor per call, ~270–430 ms, flat with question count** | priorbench (~430 ms); DMB (264–276 ms) | Depth costs, width is free. Five floors ≈ 2 s before emission. Make each layer as wide as the ontology allows, as shallow as state permits. | Local or edge-hosted inference (open port, Workers AI cold-start data) measured below ~100 ms; or a batched multi-step endpoint. |
| **255-option ceiling per Choice, hard `400` above** | DMB | "Which URIs survive?" must be pre-filtered by frontmatter or split into buckets. | Vendor raises the cap; or a Score-then-Choice two-stage measured to lose <1 point. |
| **Calibration fails off-distribution; sign flips by type** (yes/no underconfident, Choice/Score overconfident, refit T≈3.3) | scienthoon; SamuelSacco | Never prune on the raw `confidence` field. Fit a per-question, per-type calibration map on a few hundred labelled cases. Treat output as a monotone score until then. | Local calibration on the ODD gold set measured within noise floor of in-domain; or vendor ships per-tenant calibration. |
| **It bluffs on unknowables** (49.7% admits vs 97–100% for LLMs; ECE 0.246) | DMB; scienthoon (44.7% right at 0.74) | Every Choice carries "none of these / does not apply." Anything the rule-in-policy-not-in-text shape touches routes to a tier that can write a rationale. | A "none" option measured to recover >90% of out-of-scope; or vendor abstention mode. |
| **Position bias: permuting options flips 13% of choices** | DMB | Sort candidates deterministically before scoring. A nondeterministic propose step makes a nondeterministic lattice. | Measured flip rate <2% on a future version. |
| **Wrong criteria text scores below chance; missing costs <1 point** | priorbench | Criteria are fetched live from canon blockquotes or omitted. Never pasted, never stale. The canon fetch is a correctness dependency. | None expected; this is structural. |
| **Asked one broad question it loses to a small LLM** (62.6% vs 81.3%); decomposed it ties at ~1/27 cost | anisselbd | One call, many narrow questions; code combines. Never chain calls for one verdict. | A single-question benchmark where Jev matches Haiku-class. |
| **A two-line regex scored 91.8% on the same phishing set** | anisselbd | Bake-off always includes the existing lexical classifier and a human. Jev must beat both by a margin that pays the dependency. | Standing rule; not a number. |
| **Zero-shot beats hand-written keywords by ~19 points** (95.9% vs 77.2%); keyword baseline 29.3% on 77-way intent | priorbench; DMB | The oddkit lexical seams (gate, encode, orient, challenge type detection) are the cheapest first upgrade after boarding. | Gold-set bake-off showing gate/encode already >90%. |
| **Fastest measured, but 1.2x a fast LLM, not 40–200x** | DMB | Do not design on the vendor's speed claim. Budget on ~300 ms per floor. | See latency row. |
| **Cheapest by ~10x** ($0.07 / 1K decisions vs $0.19 cheapest LLM); vendor cannot prove price is unsubsidized | DMB; TypeSafe | Every seam keeps a deterministic fallback so governance runs when the endpoint is down or repriced. | Price doubles, or a free local port reaches parity. |
| **`jev-latest` alias can move silently; no SLA** | Cloudflare docs; TypeSafe | Pin the version. Keep a replayable eval suite. Treat a silent move as a diff to catch. | Vendor publishes versioning + SLA. |
| **Domain bound** — the 99% claim is thinkable only inside one kitchen, one ontology, one set of surfaces | operator; all four calibration studies | Open-domain uses stay with generative models. | Off-distribution ECE measured near in-domain. |
| **Boarding must fail open to the static pass** | minimum independent operating layer | Jev is one more unreachable tool. The router is an optimisation over boarding, never a precondition. | None. Structural. |
| **Prompt caching needs a byte-identical prefix** | operator's 2026-09-19 dictation | Jev routes to a pre-compiled role/scope bundle; it never composes one. Task context lands after the cached prefix. | None. Structural. |

---

## 6. The most important use case: systems the kitchen builds

Sections 3–5 are about ODD's own plumbing. That is the smaller prize. The larger one is every product the kitchen ships for someone else — the MCP servers, the review apps, the pipelines — where a bounded decision is currently made by a regex, a keyword table, a human, or an LLM call that never needed a sentence.

The screen is not "is this Jev-shaped?" It is "is this Jev-shaped **and does it still pass the vodka constraint?**" Per klappy://canon/principles/vodka-architecture: the server stays thin, has no opinion about the domain, and if it can be removed without consequence the architecture has failed. Per klappy://canon/principles/doing-less-enables-more: every opinion the substrate adopts is a layer it must defend forever. Jev is an opinion. Where it lives decides whether it is a menu item or a thickening.

### The vodka tests, applied to Jev

| Test | Passes when | Fails when |
| --- | --- | --- |
| **Thin server** | Jev is a stateless call the server makes; the questions and criteria live in the product's own canon or config, fetched at call time. | The server accumulates hand-tuned thresholds, calibration tables, and per-tenant question sets it must maintain. That is state, and it is domain state. |
| **No domain opinion in the substrate** | The substrate exposes "here is state, here is a Choice, here is a result" and nothing else. The *product* above it owns the vocabulary. | The substrate ships default categories. A substrate that knows what "urgent" means has an opinion. |
| **Removable without breaking; not removable without consequence** | Pull Jev and the product degrades to its lexical fallback, measurably worse but running. | Pull Jev and the product stops (too coupled) — or nobody notices (it was never earning its place). |
| **Swappable substrate** | Same question schema works against TypeSafe, Vercel, Workers AI, or a local logit scorer. The product depends on the *shape*, not the vendor. | The product imports a vendor SDK, or depends on `jev-latest` behaviour that a local port cannot reproduce. |
| **Boundary enumerated** (P0006) | The spec's three sections say what the server knows (the schema), does not know (whether the label is true), and is not (a judge). | The spec calls Jev "the classifier" and stops. |

### Where the opportunity is, in the kitchen's own products

Candidates, not commitments. Each is a place a bounded decision already happens and the current mechanism is either brittle (lexical) or expensive (generative). Each must clear the table above before it becomes a ticket.

- **Door43 / Aquifer:** resource type, language, and scope routing over catalog metadata; "does this passage need the audio resource?" Currently lexical. Criteria are the catalog's own field definitions — already prose, already fetchable.
- **3D review app:** triage of community reports into grouped concerns; "duplicate of an existing concern?"; reversible-vs-irreversible for proposed edits; which of the four lanes a task belongs to. The community-curated roadmap dictated on 2026-09-19 is a sieve problem end to end — and every verdict is a hint to the humans who vote, never a ruling.
- **Cartographer:** "is this consult broad enough to warrant zoom?", "which continent?" — currently the reader's judgment in-session, paid in tokens every time.
- **Kirigami:** verdict and tier assignment for floor rows when no lens is supplied — today the caller must supply both; a Choice over the twelve-column floor's closed vocabulary is the textbook fit, and the row stays preserved either way.
- **AMS / inbox refinery:** the "post office" — sort dumped items by kind, urgency, and who should see them.
- **Any MCP server's per-turn feedback** (the 2026-09-10 dictation): "did the caller accomplish the goal?" scored from telemetry shape, not from reading the prompt.

### What disqualifies a candidate

- The decision is a **gate** in the product (approve a merge, publish a translation, release a review). Jev may flag; something that can write a rationale decides.
- The vocabulary is **not the product's own**. If the categories come from a policy document nobody can fetch at call time, Jev will bluff (the 44.7%-at-0.74 result). Fix the fetch first or skip.
- Removing Jev **breaks** the product rather than degrading it. Build the lexical fallback first; it is also the bake-off baseline.
- The option set exceeds **255** and cannot be structurally pre-filtered.
- Nobody can produce **a few hundred labelled examples**. Without them there is no calibration map and the confidence field is noise.

### The shape of a product ticket

State from the product's own data; questions from the product's own vocabulary; criteria fetched from the product's own docs; a deterministic fallback; a labelled set; a bake-off against the fallback, a small LLM, and a human; a spec with the three P0006 sections. Same as the boarding router, one product at a time. The lattice compiler in the 5B "Build" line is what makes the second product cheaper than the first.

---

## 7. Where to start inside ODD — seams, in order

Descriptions of current mechanisms below (BM25, trigger words, stemmed matching) come from the tools' own published descriptions as of 2026-09-21, not from observed code. Per the code-observation principle, a ticket must confirm against the repo before replacing anything — artifacts have described retired code before.

1. **Boarding router** (docs classifier + lines classifier on the boarding catalog). Biggest measured pain; the gold set is the operator's gym.
2. **`oddkit_gate` transition detection** — BM25 with hand-listed inflections today. Decision-shaped already.
3. **`oddkit_encode` unprefixed input** — trigger words into DOLCHEO types.
4. **`oddkit_orient` mode assessment; `oddkit_challenge` type detection.**
5. **Door triage and EA chores** — inbox "post office," "is this already answered?", reversible-vs-irreversible delegation (thresholded asymmetrically: doubt resolves to irreversible), whole-repo-slurp tripwire on proposed tool calls. All hints, never gates.

---

## 8. The bake-off (the gym)

Gold set: past tickets labelled with the documents the agent turned out to need; a few hundred items is the size the independent work suggests. Telemetry cannot supply it (oddkit records usage, never prompts); rail history has not yet been checked for these labels.

Contenders: search alone; Jev alone; search then Jev; the existing lexical classifier; a Haiku-class LLM; a human.

Metrics: recall of needed docs; tokens loaded; time to first useful action; **share of work that never reached the essay model** (the 99% claim, measured); accuracy against human labels; calibration (does 0.9 mean 90% here?).

Verdict issued by the bake-off, in a fresh context: `inspected-and-adopted` or `inspected-and-rejected`. Not before. Rejection is a clean outcome: the experiment, its numbers, and the reason it lost go to the debrief and become canon, so the next attempt starts from the record rather than from zero.

---

## 9. Design rules, collected

- Try it anywhere a bounded decision is made; grade it honestly; reverse it when it does not pay or it thickens the server. Reversal is a result, not a failure.

- Every Choice carries "none of these / does not apply."
- One call, many narrow questions; code combines; never chain for one verdict.
- Sort candidates deterministically before scoring.
- Calibrate per question and per type; never threshold on raw confidence; Noul near 0.99 or do not gate; prefer Noul when a number matters.
- Criteria fetched live from canon or omitted; never pasted.
- Pin the model version; keep a replayable eval suite.
- Deterministic fallback at every seam; fail open to the static pass.
- Route to a cached bundle; never compose a bespoke prefix.
- Below-threshold escalates to a tier that can write a rationale; the threshold comes from the local curve, not the vendor's.
- Jev stays in the kitchen; the diner sees a menu item, not the lattice.
- The Model Operating Contract stays the constitution; Jev may not rewrite modes.
- Do not prebuild branches; generate, score, prune.

---

## 10. Evidence status

| Item | Status |
| --- | --- |
| TypeSafe launch post; DataCamp write-up; Cloudflare Workers AI model page | Read in full |
| Nate B. Jones walkthrough | Bee machine transcript; visuals not seen; his paid guide and Substack unread |
| scienthoon/jev-ood-calibration | Read in full |
| priorbench/jev; anisselbd/jev-phishing-bench; SamuelSacco/jev-exploration; nibzard/decision-model-benchmark | READMEs read; full reports and raw data not opened; none reproduced |
| LangChain "Building a Harness with Jev" (2026-09-18) | Exists; unread |
| Grok seed's other web sources; Open-Jev; LLM2Jev | Exist; unread. Four cited repos (intikhab49, dtunai, souvikr, rhighs) return 404 |
| @_aj cost receipt ($2.95→$0.25/alert) | Unverified; not repeated as fact |
| Operator's 2026-09-19 run dictations | One confirmed against Bee with quotes; one via Mori summary only |
| Vercel adoption (~13% of paid gateway teams in 24 h) | Vercel's own statement; free there through 2026-09-25 |
| Hands-on use of Jev | None |
