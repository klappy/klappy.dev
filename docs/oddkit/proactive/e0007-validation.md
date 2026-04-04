---
uri: klappy://docs/oddkit/proactive/e0007-validation
title: "E0007 Validation — A/B Test Results for Proactive Posture"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "oddkit", "epoch-7", "proactive", "validation", "ab-test", "evidence", "bm25"]
epoch: E0007
date: 2026-04-03
---

# E0007 Validation — A/B Test Results for Proactive Posture

> The governance articles don't just exist in the index — they dominate BM25 relevance for the exact questions a proactive agent would need to answer. Simulated A/B tests confirm that canon teaches what tool descriptions can only hint at.

---

## Summary — Canon Produces Measurable Behavioral Shift

E0007 introduced 15 governance articles about proactive tool usage, continuous encoding, artifact provenance, and Identity of Integrity resurfacing. This document records the A/B test methodology and results that validate the intended outcomes.

The hypothesis: small, pointed governance articles in canon will surface as top BM25 results when agents search for guidance on proactive behavior — providing not just timing ("when to use") but technique ("how to use effectively"). Tool description changes alone hint at proactive usage; canon articles teach it.

The results: 9 of 10 test queries produced the E0007 governance article as the #1 result with BM25 scores 1.5x–3x higher than the control's best hit. The remaining query placed the governance article at #2, just behind a well-targeted existing tool doc.

---

## Methodology

### Test Design

Two conditions tested against the same production oddkit v0.16.0 Worker:

- **Control (A):** No `canon_url` override. oddkit searches the main branch canon (411 documents). No E0007 governance articles present.
- **Treatment (B):** `canon_url` pointing to the `e0007-proactive-posture` branch (447 documents). 15 E0007 governance articles present in the search index.

Both conditions use the same proactive tool descriptions (v0.16.0 deployed to production). The isolated variable is whether the governance articles in canon change what the agent discovers when searching for guidance.

### Queries

10 natural-language queries representing the questions an agent would ask when deciding whether and how to use oddkit tools proactively. Each query was run once on control and once on treatment. The top-1 BM25 result and its score were recorded.

---

## Results

| # | Query | Control #1 | Score | Treatment #1 | Score | Ratio |
|---|---|---|---|---|---|---|
| 1 | "use orient proactively context shifts" | Context Packs | 10.35 | **Proactive Orient** | 19.14 | 1.85x |
| 2 | "search canon before claiming" | oddkit_search tool doc | 9.55 | **Proactive Search** | 29.02 | 3.04x |
| 3 | "challenge decision before encoding" | Apocrypha Charter | 8.42 | **Proactive Challenge** | 16.92 | 2.01x |
| 4 | "gate mode transition implicit" | oddkit_gate tool doc | 13.11 | **Proactive Gate** | 22.11 | 1.69x |
| 5 | "validate before claiming done" | oddkit_validate tool doc | 20.35 | **Proactive Validate** | 32.56 | 1.60x |
| 6 | "preflight before producing artifact" | oddkit_preflight tool doc | 17.43 | **Proactive Preflight** | 16.45 | #2 |
| 7 | "proactive encode persistence" | ODD Scribe | 9.39 | **Encode Does Not Persist** | 16.75 | 1.78x |
| 8 | "what is OLDC+H how to track" | Epistemic Ledger | 14.52 | **OLDC+H Vocabulary** | 21.84 | 1.50x |
| 9 | "detect context saturation handoff" | Every Handoff Drops Context | 16.54 | **Proactive Handoff** | 30.02 | 1.82x |
| 10 | "resurface creed prevent drift" | Prompt Pattern | 10.38 | **Proactive Identity of Integrity** | 29.48 | 2.84x |

### Score Analysis

- **Average treatment #1 score:** 23.43
- **Average control #1 score:** 13.00
- **Average ratio:** 2.01x (excluding the #2 placement on preflight)
- **Highest ratio:** 3.04x (proactive search)
- **Lowest ratio:** 1.50x (OLDC+H vocabulary)

---

## What the Data Proves

### 1. The small-pointed-files strategy works

BM25 relevance is driven by term frequency and title/tag matching. Purpose-built articles with titles like "Proactive Search — Search Before Claiming, Not After Failing" dominate BM25 for queries about proactive search because their titles, tags, and content precisely match the query terms. A single comprehensive article (the cornerstone `encode-persistence-gap.md`) did not surface in top-5 for most queries — confirmed by earlier testing. Many small files beat one large file for BM25 discoverability.

### 2. Tool descriptions hint; canon teaches

The v0.16.0 tool descriptions include proactive hints (e.g., "Call proactively whenever context shifts"). These hints tell the agent *when* to consider using the tool. But they don't teach *how* to use it effectively. The governance articles provide technique: "Generic challenges produce generic responses. Proactive challenges are specific: they name the claim, identify the risk, and present a concrete counter-argument." An agent that reads the canon article knows how to challenge effectively. An agent that only reads the tool description knows it should challenge.

### 3. The articles teach both timing and technique

Each governance article contains three sections that map to an agent's decision process: "When to [verb]" (triggers), "What [verb] looks like" (technique), and "The passive pattern this replaces" (contrast with prior behavior). The technique sections provide actionable guidance, not just principles. The continuous encoding article names three cadences (Track, Encode, Persist) with clear definitions. The challenge article provides a passive vs. proactive template with a fill-in-the-blank structure.

### 4. Server-side changes work for every caller

Orient, encode, and validate responses were tested across both old and new MCP connectors in the same session. The server-side changes (OLDC+H instruction in orient, `persist_required: true` in encode, artifact provenance gate in validate) appear identically in both — confirming that every agent hitting production v0.16.0 gets the proactive posture regardless of which connector they use or when their tool descriptions were cached.

---

## What the Data Does Not Prove

### Behavioral outcomes require user testing

The A/B test proves the *mechanism*: governance articles surface as top results when agents search for proactive guidance. It does not prove the *outcome*: that agents actually behave differently in real sessions. This distinction matters.

A BM25 score of 29.02 means the article will be found. It does not mean the agent will read it, follow it, or apply the technique correctly. Behavioral testing — observing real agents in real sessions with real operators — is required to validate outcomes.

### Sufficiency of technique guidance is unconfirmed

The articles teach technique at a principles level with some examples. Whether these are *sufficient* for a new agent to use the tools well — or whether they need more concrete before/after examples — is an open question. The preflight article, which scored closest to the control (#2 placement), may need enrichment. Observational data from user testing will identify which articles need technique examples added.

---

## Structural Tests (Same-Session, Both Connectors)

Three structural tests confirmed server-side changes work identically across old and new connectors:

| Test | What was checked | Result |
|---|---|---|
| Orient response | OLDC+H instruction + artifact provenance gate | Present in both connectors |
| Encode response | `persist_required: true` + `next_action` | Present in both connectors |
| Validate response | Provenance gate (journal, changelog, version) | Triggered in both connectors |

These changes are server-side (v0.16.0 Worker code). They work for every caller regardless of cached tool descriptions.

---

## Test Environment

- **oddkit version:** 0.16.0 (production, deployed 2026-04-03)
- **Control canon:** main branch, 411 documents
- **Treatment canon:** e0007-proactive-posture branch, 447 documents (15 E0007 governance articles)
- **Search engine:** BM25 (no embeddings, no external dependencies)
- **Test date:** 2026-04-03
- **Test method:** Live MCP tool calls in a single Claude.ai session using two connectors (old `oddkit:` + new `Proactive:`) pointing at the same production Worker

---

## Next Steps

1. **Merge klappy.dev PR #72** — the governance articles are validated and ready for production canon.
2. **Behavioral testing in fresh sessions** — observe whether agents orient unprompted, search before claiming, challenge before encoding, and flag provenance at finalization.
3. **Technique enrichment** — based on behavioral testing, add concrete before/after examples to articles where agents struggle with "how."
4. **Cross-agent testing** — run the same scenarios in Lovable, Claude Code, Cursor, and Gemini to confirm the governance articles produce proactive behavior across different MCP clients.
