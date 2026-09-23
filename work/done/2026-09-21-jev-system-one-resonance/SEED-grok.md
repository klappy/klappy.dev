---
uri: klappy://odd/handoffs/2026-09-21-jev-system-one-resonance-seed
title: "Handoff — Seed a Jev / System One resonance doc and architecture sketch"
audience: crew
exposure: nav
tier: 2
voice: first_person
stability: draft
kind: journals
tags: [handoff, resonance, jev, system-one, harness, telemetry, compiled-memory, oddkit]
date: 2026-09-21
owner: next session (Claude + operator)
blocked_by: none
derives_from: "canon/values/axioms.md, canon/resonance/template, canon/resonance/ai-coding-toolkit.md, canon/resonance/agentic-engineering.md, canon/constraints/telemetry-governance.md, canon/constraints/retrieval-disclosure-contract.md, canon/bootstrap/model-operating-contract.md, docs/appendices/compiled-memory.md"
complements: "canon/resonance/ai-coding-toolkit.md, canon/resonance/agentic-engineering.md, canon/resonance/seeing-like-an-agent.md, writings/the-harness-and-the-operating-system.md, canon/definitions/cooking-taxonomy.md"
---

# Handoff — Seed a Jev / System One resonance doc and architecture sketch

> What comes next: draft `canon/resonance/jev-system-one.md` (or similar slug) using the resonance template, then sketch how a System One decision layer slipstreams under Oddkit / kitchen without replacing the epistemic OS. This file is the seed. It is not the resonance doc.

```
H	Draft Jev System One resonance + architecture sketch	Use this seed: sources, live telemetry shapes, layer split, 5B stance, open questions. Follow canon/resonance/ai-coding-toolkit.md as the shape. Do not treat Jev as a replacement for canon, modes, or validation.		next session
```

---

## How this session found the work

Operator (Klappy) and Grok spent 2026-09-21 walking from a raw idea — “Jev is an LLM that only emits numbers / multiple-choice” — through harness literature, TypeSafe Jev, GrepdotAI’s agent.run cost graph, Oddkit telemetry contracts, and live 30-day payload shapes.

The live question that closed the session:

> Look at our telemetry tool shapes for our MCP servers. Could we use that or do we need more details that might be in our journals?

Answer already measured: telemetry is enough to route **tool + disclosure**. Journals are needed only for **why a number lies** and for **which lines inside a document matter**. Telemetry is forbidden from seeing substance.

Proposed product of the next session:

1. A resonance page (tier 3, exploratory) mapping Jev / System One / constrained decision models onto ODD.
2. An architecture inspiration note: where a decision lattice sits relative to the Model Operating Contract, retrieval-disclosure contract, compiled memory, and cooking taxonomy.

Do not ship implementation. Do not mutate canon beyond a draft resonance + optional open items.

---

## The claim, stated so it can be challenged

Jev-class models (TypeSafe “System One”) do not write prose. They take a state plus typed questions and return Choice / Score / Noul with probabilities. That is a new substrate for the *decision* layer of a harness, not a new epistemic OS.

ODD already has:

- axioms and modes (what counts as knowing)
- a bootloader (`klappy://canon/bootstrap/model-operating-contract`)
- progressive retrieval (`klappy://canon/constraints/retrieval-disclosure-contract`)
- compiled, wipeable packs (`klappy://docs/appendices/compiled-memory`)
- structural telemetry (shape, never substance)

The missing piece is a cheap, typed, parallel decision function that can sit *under* those contracts and answer “which tool, which disclosure, which branch, is this body worth it?” without another essay-generating LLM call.

Type-safe ≠ true. A model can be structurally incapable of returning an invalid label and still confidently pick the wrong valid label. Feynman still applies: did you test it?

---

## Session arc (so Claude does not re-derive from vibes)

1. Operator framed Jev as multiple-choice vs essay. Pushback: confidence can still be wrong; the win is *measurable* answers, not guaranteed truth.
2. Question: best attempt to reroute a whole LLM stack so the LLM is only the final emitter.
3. Research landed on TypeSafe Jev (launched ~2026-09-15), open reproductions (Open-Jev, LLM2Jev, cu-Jev), constrained decoding / SGLang choices, and harness-native routing papers.
4. Operator asked whether Oddkit + kitchen + local ontology could become a dynamically generated decision lattice, with a small generator proposing branches and Jev scoring them.
5. Then: slipstream a bootloader so prompt/context selection, “which lines add value,” and smaller I/O happen in code + Jev; LLM only emits the last typed slice.
6. External receipt: @_aj / GrepdotAI + @typesafeai Jev harness on compliance alerts — cost per alert from ~$2.95 (Opus 5 full agent) to ~$0.25 as accepted workflow versions moved steps into code. 100k alerts: >$290k → <$26k. Post: https://x.com/_aj/status/2102061534956662818
7. Telemetry inspection of Oddkit / Cartographer / Kirigami. Verdict below.

---

## Layer split (load-bearing — do not collapse)

| Layer | Job | Substrate already in-house | What Jev adds |
|---|---|---|---|
| 1. Reality / axioms | What counts as knowing | Axioms, challenge, gate, validate | Nothing. Do not outsource this. |
| 2. Orientation | Mode, scope, CST | `orient`, Model Operating Contract | Optional Noul: “are we still in the declared mode?” |
| 3. Retrieval | What the agent is allowed to see | Retrieval-disclosure contract, compiled memory, frontmatter axes | Choice of tool + disclosure tier from telemetry shape |
| 4. Decision | Which branch, which tool, go/no-go | Today: another LLM call or human | System One Choice / Score / Noul |
| 5. Execution | Deterministic work | Code, MCP tools, kitchen recipes | Code only. Jev must not execute. |
| 6. Emission | Prose, code, PDF, briefing | Frontier / small generative model | Only when text must be written |
| 7. Validation | Fresh-context review | Validation mode + context break | Score / Noul against a rubric, never same-session self-review |

Karpathy’s public framing (quoted in the wild around Jev launch): Jev is a point on the LLM Pareto curve that was under-invested — no thinking, single-token / typed decision, low latency, intelligence-just-over-the-line. Map: Rules → classifier → **Jev** → Flash → general LLM → reasoning LLM.

Existing resonance cousins (read before drafting, do not duplicate):

- `klappy://canon/resonance/ai-coding-toolkit` — Shoemaker harness = Layer 4 coding; ODD = Layers 1–3. Same 5B shape to reuse.
- `klappy://canon/resonance/agentic-engineering` — Karpathy advice vs ODD infrastructure.
- `klappy://canon/resonance/seeing-like-an-agent` — progressive disclosure in tool design.
- `klappy://canon/resonance/ooda-loop` — orientation is the product.
- `klappy://writings/the-harness-and-the-operating-system`

5B stance to write into the resonance doc:

- **Borrow** the typed decision interface (Choice / Score / Noul) and the “learn the job, move steps to code” loop (agent.run / GrepdotAI).
- **Bend** Oddkit telemetry rows + disclosure flags into Jev *state* and *questions*.
- **Break** any claim that Jev replaces challenge, gate, validation, or canon authority. Also break vendor calibration claims until independently measured (`decision-model-benchmark` already disputes “only Jev is calibrated”).
- **Beget** TypeSafe / open-Jev / SGLang choices / logit scoring — do not rebuild a decision model.
- **Build** only the lattice compiler: ontology → candidate questions, telemetry → router state, compiled packs → candidate lines, code → effects.

---

## What telemetry already gives you (measured 2026-09-21)

Contract: `klappy://canon/constraints/telemetry-governance`  
Public query: `telemetry_public` on dataset `oddkit_telemetry`  
Sister surfaces: Cartographer (exact D1 + sampled AE), Kirigami (structural only).

Tracked: `event_type`, `method`, `tool_name`, consumer label/source, `knowledge_base_url`, `document_uri` (gets), `worker_version`, `duration_ms`, `bytes_in/out`, `tokens_in/out` (cl100k_base proxy, ~3–4% off Claude), `cache_hits`, `cache_lookups`.

Never tracked: search queries, document bodies, prompts, model responses, identity beyond self-declared label, IPs.

Live 30-day Oddkit shapes (use these numbers; do not re-guess):

| tool_name | calls | avg tokens_in | avg tokens_out | note |
|---|---:|---:|---:|---|
| oddkit_catalog | 2147 | 17 | **5394** | fattest list action |
| telemetry_policy | 2 | 0.5 | 3346 | policy dump |
| oddkit_audit | 86 | 9 | 3128 | rare, heavy |
| oddkit_challenge | 1742 | **193** | 2423 | heaviest input |
| oddkit_get | 4702 | 10 | 2394 | body-default |
| oddkit_search | 3465 | 11 | 2371 | still fat when disclosure is rich |
| oddkit_preflight | 1582 | 71 | 2058 | bundle |
| oddkit_resolve | 2393 | 8 | 1875 | |
| oddkit (router) | 1201 | 37 | 1598 | |
| oddkit_encode | 370 | 112 | 1276 | |
| oddkit_orient | 1618 | 35 | 847 | |
| oddkit_gate | 3545 | 29 | **322** | already decision-shaped |
| oddkit_validate | 1316 | 45 | 254 | |
| telemetry_public | 33278 | 21 | 136 | meta-traffic |
| oddkit_version | 759 | 0.6 | 128 | |
| oddkit_time | 7300 | 2 | 66 | bootloader primitive |

Caveats the journals already named (do not “discover” again):

- `duration_ms` is I/O-bounded on Workers. Pure CPU (tokenize, BM25) reads 0. Take wall clock from the harness, not AE.
- `bytes_out` / `tokens_out` = 0 on SSE streams that cannot be measured without consuming the stream.
- Pre-wrapper wire-edge era had ~27% zero-shape rows, biased toward heavy tools. Cutover: `klappy://odd/handoffs/2026-05-14-telemetry-coverage-completeness` and `klappy://canon/decisions/DR-20260514-0001-telemetry-wrapper-pattern`.
- Catalog token firehose is why P0010 exists: `klappy://odd/ledger/2026-05-23-p0010-retrieval-disclosure-contract-proposal-drafted` (~112k tokens/call, 97% of a week’s output from one consumer). The contract is the fix; telemetry was the smoke.

Router implication, already stated:

```
state = {tool, tokens_in, tokens_out, cache_hit_rate, disclosure_requested}
questions = {
  next_tool: Choice[time, gate, orient, search_floor, get_summary, get_body, challenge, encode],
  payload_risk: Score[cheap, moderate, fat, firehose],
  body_worth_it: Noul
}
```

Journals do **not** become a second telemetry stream. They are the exception path when a cheap shape still produced drift.

---

## In-house surfaces the lattice should reuse

- Bootloader: `klappy://canon/bootstrap/model-operating-contract`
- Cooking / kitchen: `klappy://canon/definitions/cooking-taxonomy` — clients order from a menu; gates stay in the kitchen.
- Compiled memory + compilation targets: lane-scoped wipeable packs.
- Frontmatter axes already on every doc: `audience`, `exposure`, `tier`, `public`, `start_here`, `relevance` vs tier (`klappy://canon/definitions/tier-vs-relevance`).
- CST: `klappy://canon/definitions/cognitive-saturation-threshold`
- Harness word collision: `klappy://canon/constraints/harness-disambiguation`
- Mode + context-break validation: `klappy://canon/validation-as-epistemic-mode`

MCP family already sharing the telemetry *shape*: Oddkit, Cartographer, Kirigami. Any Jev router should speak that schema, not a new one.

---

## External sources (primary + reproductions)

Use these as resonance sources. Verify quotes and dates before promoting anything to tier-1 voice. Prefer primary pages over recaps.

### TypeSafe Jev / System One

- TypeSafe launch context (mid-September 2026). Founder publicly associated with Diogo Almeida / RLHF lineage — verify before stating as fact in canon.
- Interface primitives: **Noul** (P(yes)), **Choice** (closed set, vendor cap often cited at 255), **Score** (ordered 2–10 levels). Multiple questions over one state in one pass. Output tokens free; input-priced.
- Guides / explainers encountered this session:
  - https://jevaiguide.com/compare/jev-vs-llms/
  - https://www.paralect.com/stack/what-is-jev-new-llm
  - https://aijev.org/
  - https://www.langchain.com/blog/building-a-harness-with-jev
  - https://madewithjev.com/what-is-jev-engineering
  - https://www.refix.ai/news/jev-choice-score-noul/
  - https://jev-trader.com/jev-ai-decision-model

### Open reproductions and harnesses

- https://zefan-cai.github.io/open-jev/
- https://github.com/Yinsongxu/LLM2Jev — local models, prefill / logit scoring, no answer-token generation
- https://github.com/intikhab49/open-jev-typed-decision-engine — 150M encoder claim
- https://github.com/dtunai/cu-Jev — CUDA-native, Qwen3.5 0.8B–9B, read logits of option labels
- https://github.com/souvikr/jev-test — OpenRouter Decisions API harness
- https://github.com/rhighs/jev-code — coding CLI as a chain of Jev picks
- https://github.com/rorshopping/jev-on-a-laptop — parallel constrained decoding / slot scoring
- https://github.com/nibzard/decision-model-benchmark — independent bench: Jev mid-pack on accuracy, sharp 255-option cap, worse uncertainty admission / ECE than constrained LLMs in that protocol. **Read before repeating vendor calibration claims.**

### Constrained decoding / “LLM as Jev”

- SGLang `choices` primitive + `/v1/score`
- Outlines / XGrammar / Guidance / llama.cpp GBNF
- Trie logit-mask classification (e.g. SachinKalsi/constrained-decoding)
- CRANE / suffix-constrained generation / two-phase think-then-constrain
- Avi Chawla writeup on local Jev-style scoring via SGLang

### Harness-native routing (not Jev, same layer)

- Retort / MetaHarness (Adrian Cockcroft) — stack is the unit, not the model
- Harness-Native agentic routing / OpenSquilla
- Life-Harness (runtime interface adaptation, frozen weights)
- “Push orchestration down the stack” three-system model
- AutoHarness (filter / verifier / policy-in-code)
- Vercel / LangChain / Princeton CORE-Bench harness-only lifts (same weights, different scaffold)

### External receipt to cite in “How this was found”

- AJ Asver @_aj, 2026-09-21: Jev harness on GrepdotAI / agent.run, 90% cost cut on repetitive compliance alerts. Quotes Miguel Ríos @MiguelriosEN / https://agent.run
- Graph: cost per alert ~$2.95 → ~$0.25 across accepted workflow versions v1–v4.

### Field framing worth a quote block (verify)

- Karpathy on Jev as an under-invested Pareto point (no-thinking, typed, low-latency).
- “Jev engineering” street definition from madewithjev: LLM writes, Jev decides, code acts.

---

## Resonance page shape to follow

Copy section order from `klappy://canon/resonance/ai-coding-toolkit` and `klappy://canon/resonance/template`:

1. Frontmatter (audience: canon, tier: 3, execution_posture: exploratory, tags include `resonance`, `6B`/`5B`, `borrow`)
2. One-paragraph blockquote that works as the only thing a caller reads
3. How This Was Found
4. ODD Principle being tested (candidate: *decisions should be typed and cheap; knowing should stay expensive and evidenced*)
5. Convergent Quotes (non-authoritative)
6. Where ODD Aligns
7. Where ODD Diverges (explicit)
8. Why the Divergence Matters
9. 5B / 6B Operationalization
10. Related Canon

Working title candidates (operator picks):

- Jev / System One — Typed Decisions Under the Epistemic OS
- Decision Models Are Not Knowing
- The Missing Layer Between Classifier and Flash

Do not write the public essay in the same pass. Resonance first.

---

## Architecture inspiration (sketch only)

```
incoming state
    │
    ├─ rules / regex / code          exact computation
    ├─ telemetry row + cache stats   shape, not meaning
    ├─ compiled pack + frontmatter   candidate vocabulary
    │
    ▼
 Jev / System One / local logit-scorer
    Choice  next tool + disclosure
    Score   payload risk / confidence band
    Noul    “is a body fetch justified?”
    │
    ├─ code executes the pick
    ├─ oddkit fetch at that disclosure
    ├─ generative LLM only if text must be written
    └─ human if Noul/confidence below threshold
```

Kitchen mapping: Jev stays in the kitchen (gates, routing, mise en place). The diner sees a menu item, not the decision lattice. Recipes declare ingredients; the lattice is not discovered mid-plate.

Bootloader mapping: Model Operating Contract stays the session constitution. Jev does not get to rewrite modes. It may only answer questions the contract already considers legal in that mode.

Open-domain warning from this session: you cannot pre-build bajillions of branches. Generate the next branch from the ontology, score it, prune below threshold. Tight domains (BT tools, oddkit retrieval, compliance alerts) are the first kitchens.

---

## Opens for the receiving session

- P1 Draft the resonance page against the template. Operator reviews before any promotion.
- P1 Read `decision-model-benchmark` before repeating TypeSafe speed/calibration numbers.
- P2 Propose a *compiled pack* of Jev question schemas for Oddkit retrieval routing (not an implementation).
- P2 Decide whether the first kitchen is Oddkit retrieval, Cartographer routing-lens, or a client recipe — not all three.
- P3 Independent smoke: score the same 20 oddkit tool-shape rows with Jev vs `oddkit_gate` vs constrained local logits. Measure agreement, latency, cost. Do not argue first.
- P3 Name collision: “harness” already has two meanings in canon. Do not add a third without `harness-disambiguation` amendment.

---

## What this handoff is not

- Not permission to build a billed Jev gateway.
- Not a claim that Oddkit should emit Jev-shaped answers from `gate` / `challenge`.
- Not a replacement for fresh-context validation.
- Not a dump of journal prose into telemetry.

The next session starts from this file, the linked canon URIs, and the live telemetry table. If those three disagree, measure again before writing.
