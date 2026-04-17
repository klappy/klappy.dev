---
uri: klappy://odd/challenge-types/pattern-coinage
title: "Challenge Type: Pattern Coinage"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "challenge", "challenge-type", "pattern-coinage", "writing-analysis"]
epoch: E0008
date: 2026-04-16
derives_from: "canon/constraints/epistemic-challenge.md, odd/challenge-types/how-to-write-challenge-types.md"
governs: "oddkit_challenge behavior for pattern-coinage claims — naming novel patterns or concepts"
status: active
---

# Challenge Type: Pattern Coinage

> A move that names a novel pattern, concept, or architecture and asks the reader to adopt the name. Coinage is high-stakes because a successful coinage becomes vocabulary others inherit; a failed coinage reinvents what another domain already named or promotes noise into canon. Pressure here is about novelty, precision, and survival against hostile readers.

---

## Summary — Naming Moves Are High-Stakes And Deserve Prior-Art Discipline

This type fires when an input introduces a novel named pattern — `coining`, `introduce the term`, `i call this`, `let's call this`, `the pattern is called`. Coinage is load-bearing: a successful term becomes vocabulary others inherit, and a failed term either reinvents an existing name or promotes noise into canon. The challenge asks whether the term already exists in another field, whether it is precise enough that two careful readers would apply it the same way, what the term excludes, whether a hostile reader would accept the need for a new name, and whether the coinage will hold up over time. Prerequisites check that prior art was searched, that the term is defined, that novelty is argued, and that scope is named. The goal is to force coinage to earn its place in vocabulary rather than default into it.

---

## Type Identity

| Field | Value |
|---|---|
| Slug | pattern-coinage |
| Name | Pattern Coinage |
| Priority | high |

---

## Detection Patterns

```
coining, coined, introduce the term, i call this, what we're seeing here is, the pattern is called, name this, what i mean by, the term i use, let's call this, this is what i mean by
```

---

## Challenge Questions

| Question | Stakes tier |
|---|---|
| Does this already have a name in another field or literature? | baseline |
| Is the term precise enough that two careful readers would apply it the same way? | baseline |
| What does this term exclude? A term that means everything means nothing. | elevated |
| Would a hostile reader understand why this needs its own name rather than an existing one? | elevated |
| Would this coinage still make sense five years from now, or is it tied to a transient context? | rigorous |
| What happens if the coinage spreads and is misapplied? What's the containment? | rigorous |

---

## Prerequisite Overlays

| Prerequisite | Check | Gap message if missing |
|---|---|---|
| prior-art-searched | input contains "not the same as", "distinct from", "unlike", "exists as" or equivalent prior-art acknowledgment | "No prior art acknowledged — is this genuinely new, or renaming something that already exists?" |
| term-defined-precisely | input contains "means", "refers to", "defined as", "by this i mean" | "Term not precisely defined — coinages without definitions become vibes" |
| novelty-argued | input contains "new", "novel", "not previously", "first", "no existing", or equivalent | "Novelty not argued — why is a new term needed rather than an existing one?" |
| scope-named | input contains "applies to", "in the context of", "when", "for cases where" | "Scope of the coinage not named — what does this term cover and what does it not?" |

---

## Suggested Reframings

- Reframe with prior-art check: "I'm calling this X; the closest prior art I found is Y, and the distinction is Z"
- Reframe with narrow scope: "In the context of A, I name the pattern X; I'm not claiming X holds outside A"
- Reframe as working vocabulary: "I'll use X as shorthand here; if a better name exists or emerges, I'll adopt it"
