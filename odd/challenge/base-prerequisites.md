---
uri: klappy://odd/challenge/base-prerequisites
title: "Challenge Base Prerequisites"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "challenge", "base-prerequisites", "universal"]
epoch: E0008
date: 2026-04-16
derives_from: "canon/constraints/epistemic-challenge.md, odd/challenge-types/how-to-write-challenge-types.md"
governs: "oddkit_challenge universal prerequisite checks applied regardless of matched type"
status: active
---

# Challenge Base Prerequisites

> Universal prerequisites applied to every claim, regardless of which challenge types matched. Base prerequisites are checks so fundamental that their absence is a gap in any claim — evidence, sources, and signaled confidence. Type overlays add domain-specific checks on top of these; they do not replace them.

---

## Summary — Three Universal Checks That Run On Every Challenge

This article governs three prerequisite checks that run on every oddkit_challenge invocation regardless of which types matched: evidence cited, source named, and confidence signaled. Type overlays add domain-specific checks in addition to these; they do not replace them. The check vocabularies are deliberately broad (`saw`, `heard`, `read`, `observed`, `example`, `case`, `data`) because evidence has different surface forms across domains — measurements in engineering, quotes in writing, testimony in ministry. Missing base prerequisites produce explicit gap messages in the response. If this article is absent, the server proceeds with type-overlay prerequisites only and logs a warning.

---

## Prerequisite Overlays

| Prerequisite | Check | Gap message if missing |
|---|---|---|
| evidence-cited | input contains "evidence", "saw", "observed", "noticed", "heard", "read", "example", "case", "instance", "data", "measured" | "No evidence cited — a claim without grounding in something observed, read, or experienced is just a belief" |
| source-named | input contains "per", "according to", "from", "source:", a URL, a quoted phrase, a proper-noun attribution, "who said", "where i read" | "No source named — verifiability is unclear; where does this come from?" |
| confidence-signaled | input contains "believe", "think", "know", "suspect", "certain", "tentative", "confident", "unsure", or an explicit confidence marker | "Confidence level not signaled — is this a guess, a working belief, or an established fact?" |

---

## Notes

These prerequisites run on every challenge invocation, added to any overlays contributed by matched types. The server dedupes gap messages across base and overlays before surfacing.

The check vocabularies here are deliberately broad — "saw," "observed," "noticed," "heard," "read," "example," "case" — because evidence has different surface forms in different domains. In software engineering, evidence looks like measurements, tests, and studies. In thought leadership, evidence looks like quotes, passages, and case studies. In ministry, evidence looks like what was witnessed or heard in the community. The base article accepts all of these; domain-specific articles narrow further if needed.

If this article is absent, the server proceeds with type overlays only and logs a warning.
