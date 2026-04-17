---
uri: klappy://odd/challenge/normative-vocabulary
title: "Challenge Normative Vocabulary"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "challenge", "normative-vocabulary", "tensions"]
epoch: E0008
date: 2026-04-17
derives_from: "canon/constraints/epistemic-challenge.md, odd/challenge-types/how-to-write-challenge-types.md"
governs: "oddkit_challenge detection vocabulary on two surfaces — signal in retrieved canon quotes (tension detection) and noise in user input (BM25 stop-word filter)"
status: active
---

# Challenge Normative Vocabulary

> The vocabulary the challenge tool uses both to detect signal in canon and to detect noise in user input. Two surfaces, one article: when canon says MUST, SHOULD, NEVER, or names something an invariant or forcing function, the tool surfaces that quote as a tension; when user input contains common filler (the, of, in, etc.), the tool filters it before scoring. Both opinions are domain-specific and both belong in canon, not hardcoded in the server.

---

## Summary — Two Vocabularies, Two Surfaces, One Governance Article

This article governs the full vocabulary `oddkit_challenge` uses for detection, on two surfaces. **Surface one — signal in canon:** RFC 2119 directive language matched case-sensitively (`MUST`, `SHALL`, `NEVER`, `REQUIRED`, `PROHIBITED`) plus architectural-writing load-bearing phrases matched case-insensitively (`invariant`, `forcing function`, `non-negotiable`, `the test is`, `pure`). The server compiles these into regex applied to retrieved canon quote previews — a match becomes a tension entry. **Surface two — noise in user input:** common filler words (`the`, `of`, `in`, `we`) that should be filtered from BM25 detection of the user's claim against challenge-type articles. Modal verbs (`must`, `should`, `shall`, `may`, `not`) are deliberately NOT filtered here because they are the load-bearing trigger words for `strong-claim` and `proposal` types. Adding domain-specific vocabulary on either surface is a canon edit, not a code change — a compliance KB adds `VIOLATES` to the signal table, a different domain may add or remove filler words from the noise list. If this article is absent, the server falls back to a minimal built-in set on both surfaces.

---

## Normative Vocabulary

### Directive Language (RFC 2119 and Related)

| Word | Directive type |
|---|---|
| MUST | requirement |
| MUST NOT | prohibition |
| SHOULD | recommendation |
| SHOULD NOT | discouragement |
| SHALL | requirement |
| SHALL NOT | prohibition |
| REQUIRED | requirement |
| PROHIBITED | prohibition |
| NEVER | prohibition |
| ALWAYS | requirement |
| CANNOT | prohibition |
| DO NOT | prohibition |

### Architectural Writing Load-Bearing Terms

| Phrase | Directive type |
|---|---|
| invariant | invariant-claim |
| forcing function | forcing-function-claim |
| non-negotiable | non-negotiable-claim |
| the test is | test-claim |
| the unlock is | unlock-claim |
| the real cost | cost-claim |
| the whole point | purpose-claim |
| the key insight | insight-claim |
| only what hurts | scope-limit-claim |
| pure | purity-claim |

---

## Detection Noise

The words filtered from user input before BM25 scores it against per-type detection text. These are the words this domain treats as filler — present in normal prose, not informative for type matching. Filtering them prevents irrelevant input ("the cat sat on the mat") from accumulating fractional scores against every type that happens to mention "the" in its blockquote.

The list is deliberately conservative. Modal verbs (`must`, `should`, `shall`, `may`, `might`, `can`, `could`, `will`, `would`), negation (`not`, `no`, `never`, `always`), and auxiliary verbs (`do`, `does`, `did`, `have`, `has`, `had`) are NOT in this list — they are signal for the `strong-claim`, `proposal`, and `assumption` types. Removing them would silently break detection for those types.

### Common Filler

```
a, an, the, is, are, was, were, be, been, being,
of, in, to, for, with, on, at, by, from, as, into, through,
and, but, or, nor, if, then, than,
that, this, it, its, we, you, he, she, they
```

A KB in a different domain may extend or replace this list. A KB working in formal legal text might add `whereas`, `wherein`, `hereinafter`. A KB working in narrative might keep `we`, `you`, `they` as signal (they identify the actor) and remove them from this list. The choice is local to the canon, not the server.

If this section is absent or empty, the server applies no filter and relies entirely on BM25's IDF weighting to suppress shared filler. That is workable for canons with highly distinctive per-type vocabulary but produces fractional false-positive scores for inputs heavy in common prose words.

---

## Notes

**Signal surface (canon quote tension detection):** the server compiles the two `## Normative Vocabulary` tables into a case-sensitive word-boundary regex and a case-insensitive regex, applied to retrieved canon quote previews. A match produces a tension entry with the directive type, citation, and quote.

Case sensitivity is intentional for the RFC 2119 row — UPPERCASE use signals intentional directive language, while lowercase `must` in prose rarely carries the same weight. The architectural-writing phrases are mixed-case and matched case-insensitively; `"the test is"` in a draft essay carries load-bearing weight regardless of capitalization.

**Noise surface (user input matching):** the server reads the `## Detection Noise` code block as a Set of words, passed to the BM25 indexer as the custom stop-word filter. The same Set is then used to tokenize the user's input at search time, ensuring index and query vocabularies stay aligned. Words in this list are dropped before scoring; words not in this list contribute via BM25 (with stemming, IDF, and phrase boost as usual).

The two surfaces coexist in one article because they are two roles of the same domain vocabulary opinion. A KB focused on a single domain can prune both sections together; a KB in a third domain can extend both together. Keeping them separated would create drift risk — different vocabularies for "what counts as content" vs "what counts as filler" within the same domain rarely makes sense.

Adding domain-specific vocabulary on either surface is a canon edit:

- A formal-contracts KB might add `SHALL CAUSE`, `WARRANTS`, `COVENANTS` to signal; might add `whereas`, `wherein`, `hereinafter` to noise
- A compliance KB might add `VIOLATES`, `BREACHES`, `NON-COMPLIANT` to signal
- A theological KB might add `ANATHEMA`, `HERETICAL`, `commanded`, `forbidden` to signal
- A thought-leadership-from-books KB might add `the central point`, `the key move`, `load-bearing` to signal

If this article is absent, the server falls back to a minimal built-in set on both surfaces: `MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT` for signal; an empty noise filter (no filtering, BM25 IDF only). If the article is present but the `## Detection Noise` section is missing, the server uses the empty noise filter — explicitly opting into IDF-only scoring is a valid governance choice.
