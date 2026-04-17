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
date: 2026-04-16
derives_from: "canon/constraints/epistemic-challenge.md, odd/challenge-types/how-to-write-challenge-types.md"
governs: "oddkit_challenge tension detection — the vocabulary that signals a directive or load-bearing claim in retrieved canon quotes"
status: active
---

# Challenge Normative Vocabulary

> The words whose presence in a retrieved canon quote signals a tension-bearing directive or a load-bearing architectural claim. When canon says MUST, SHOULD, NEVER, or names something as an invariant, forcing function, or the real cost, the tool should surface that quote as a potential tension with the input being challenged. This vocabulary is governed here, not hardcoded in the server.

---

## Summary — Two Vocabularies, One Table, Case-Sensitive RFC Plus Case-Insensitive Architectural

This article governs the vocabulary oddkit_challenge uses to detect tension-bearing language in retrieved canon quotes. Two sets coexist in one table: RFC 2119 directive language matched case-sensitively (UPPERCASE `MUST`, `SHALL`, `NEVER`, `REQUIRED`, `PROHIBITED`) because capitalization signals intentional directive weight, and architectural-writing load-bearing phrases matched case-insensitively (`invariant`, `forcing function`, `non-negotiable`, `the test is`, `the unlock is`, `pure`) because these phrases carry weight regardless of case. The server compiles these into regex applied to retrieved canon quote previews. Adding domain-specific vocabulary is a canon edit, not a code change — a compliance KB adds `VIOLATES`, a theological KB adds `ANATHEMA`, a contracts KB adds `SHALL CAUSE`. If this article is absent, the server falls back to a minimal built-in set.

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

## Notes

The server compiles these tables into a case-sensitive word-boundary regex applied to retrieved canon quote previews. A match produces a tension entry with the directive type, citation, and quote.

Case sensitivity is intentional for the RFC 2119 row — UPPERCASE use signals intentional directive language, while lowercase `must` in prose rarely carries the same weight. The architectural-writing phrases are mixed-case and matched case-insensitively; `"the test is"` in a draft essay carries load-bearing weight regardless of capitalization.

The two sections coexist in one table because klappy.dev canon contains both software-engineering governance (where RFC 2119 dominates) and architectural writing (where the load-bearing phrases dominate). A KB focused on a single domain can prune to one section, and a KB in a third domain adds its own.

Adding domain-specific vocabulary is a canon edit:

- A formal-contracts KB might add `SHALL CAUSE`, `WARRANTS`, `COVENANTS`
- A compliance KB might add `VIOLATES`, `BREACHES`, `NON-COMPLIANT`
- A theological KB might add `ANATHEMA`, `HERETICAL`, `commanded`, `forbidden`
- A thought-leadership-from-books KB might add `the central point`, `the key move`, `load-bearing`

If this article is absent, the server falls back to a minimal built-in set of `MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT` only.
