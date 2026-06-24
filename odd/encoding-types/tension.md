---
uri: klappy://odd/encoding-types/tension
kind: canon
title: "Encoding Type: Tension (T, derived)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "encode", "dolche", "dolcheo", "dolcheot", "tension", "tensions", "contradiction", "tradeoff", "drift", "derived", "second-order", "projection", "encoding-type", "tsv", "governance", "epoch-9"]
epoch: E0009
date: 2026-06-24
derives_from: "canon/definitions/dolcheo-vocabulary.md, odd/encoding-types/how-to-write-encoding-types.md, canon/principles/quality-attributes-are-in-tension.md, canon/principles/prompt-over-code.md"
complements: "odd/encoding-types/observation.md, odd/encoding-types/decision.md, odd/encoding-types/learning.md, odd/encoding-types/constraint.md, odd/encoding-types/handoff.md, odd/encoding-types/encode.md, odd/encoding-types/open.md, odd/encoding-types/how-to-write-encoding-types.md, odd/encoding-types/serialization-format.md"
governs: "oddkit_encode parsing and quality scoring for type T (derived/second-order)"
status: active
target_repo: "outcomes-driven-development"
---

# Encoding Type: Tension (T, derived)

> A contradiction or unresolved conflict visible only *across* two or more captured artifacts — never in any single one. Unlike every other DOLCHEOT type, a Tension is synthesized by default rather than asserted in the common case; when an operator asserts the contradiction in their own voice, it becomes an authored, sovereign Tension. It is advisory and sha-bound to the artifacts it spans: when they change, it goes stale and is re-derived. A Tension closes when an author resolves it (a Decision) or retracts one of its poles.

---

## Summary — The Derived Dimension: What the Artifacts, Together, Contradict

For months, `oddkit_encode` surfaced tensions as a side effect: writing a project journal in prose, the model would notice that two captured items disagreed and write about it — but the contradiction had no type, no schema, and no home. It lived in prose or vanished. Tension makes that emergent behavior first-class.

Tension is the first **second-order** DOLCHEOT type. Every other letter is *asserted* — an author or agent states a Decision, an Observation, a Constraint as content. Tension is *inferred* — computed by a detection pass *over* the other captured artifacts. That is what makes it a projection off the source map rather than a fact entered into it: regeneratable, advisory, and never sovereign unless an author asserts it in their own voice. See `canon/definitions/dolcheo-vocabulary.md` for how Tension joins the core letter set and why it is core (universal) rather than a domain extension.

---

## Type Identity

| Field | Value |
|---|---|
| Letter | T |
| Name | Tension |
| Custody | Synthesized by default (derived); authored only when an operator asserts the contradiction in their own voice |
| Priority | Derived / second-order — emitted by a detection pass after the assertable types by default; entered by hand only when an operator asserts the contradiction |

---

## Field Schema

When encoding a Tension, the model outputs a row with the following fields (serialization format governed by `odd/encoding-types/serialization-format.md`):

```
T	{title}	{body}	{between}	{kind}	{status}
```

| Field | Recommended | Description |
|---|---|---|
| type | yes | Always `T` |
| title | yes | Short summary of the contradiction (≤12 words) |
| body | yes | What disagrees, and why the two sides cannot both stand as written |
| between | yes | The ≥2 artifacts/claims in conflict — references (artifact ids, row ids, or short source labels). A tension needs ≥2 poles |
| kind | no | `tradeoff` (two goods in tension), `contradiction` (factual conflict), or `drift` (canon vs implementation/observed) |
| status | yes | `open` with what would close it, or `resolved:{ref}` (the Decision or retraction that closed it) |

Example:

```
T	Per-artifact encode output vs observed batch collapse	Canon requires oddkit_encode to return a per-artifact array for batched input; an observed run collapsed six prefix-tagged artifacts into one Decision blob.	canon/definitions/dolcheo-vocabulary#tool-level-implication, encode-run-2026-06-24	drift	open — closes when the tool ships per-artifact output, or the requirement is retracted
```

---

## Trigger Words (Fallback Classification)

When encode input is unstructured (not TSV), these trigger words classify a paragraph as Tension:

```
contradicts, conflicts with, in tension, at odds, doesn't square, inconsistent with, can't both, mutually exclusive, trade-off, tradeoff, pulls against, disagrees with, contradiction, conflict between
```

Classification preference: a paragraph prefixed `[T]` is classified as Tension. Because a Tension is *derived*, the primary way it enters a journal is not an author prefix but the detection pass (below) emitting `T` rows over the other artifacts.

These words build the dynamic fallback regex only. On the primary TSV path, the type letter `T` is the classifier.

---

## Quality Criteria

Each criterion adds 1 to the quality score (max 5):

| Criterion | Check | Gap message if missing |
|---|---|---|
| Substance | Body is ≥10 words describing the conflict | "Tension is too brief — state what disagrees and why both can't stand" |
| Two poles named | `between` references ≥2 distinct artifacts/claims | "A tension needs ≥2 sides — name what is in conflict" |
| Each pole sourced | Each pole in `between` points to a captured artifact, not an unanchored assertion | "Anchor each side to a source — which artifacts contradict?" |
| Genuine opposition | Body shows the poles actually conflict, not two unrelated facts | "Show the opposition — why can't both hold as written?" |
| Closure path | `status` is `resolved:{ref}`, or `open` with what would close it | "How does this close? A Decision, a retraction, or a specific event?" |

Quality levels:

| Score | Level | Status |
|---|---|---|
| 5 | strong | recorded |
| 3–4 | adequate | recorded |
| 2 | weak | draft |
| 0–1 | insufficient | draft |

---

## The Detection Pass — How Tensions Get Emitted

Because a Tension is synthesized by default, it is usually produced by a pass rather than an author. After the assertable artifacts (D, O, L, C, H, E, Open) are typed for a session, the encoder runs one scan across them — and across any cited source documents — and emits a `T` row for each genuine cross-artifact contradiction. Guidance:

- Emit a Tension only when ≥2 captured artifacts (or an artifact and a cited source) genuinely conflict. Two unrelated facts are not a tension.
- Keep it signal: cap emitted tensions per session and require the opposition and sourced-pole criteria. A detector that flags everything is worse than the prose habit it replaces.
- Mark custody `synthesized`. A Tension an operator asserts in their own voice is authored and sovereign; a Tension the pass infers is advisory and dismissable.
- Bind it to its poles. A Tension is sha-bound to the artifacts in `between`; when any changes, it goes stale and is re-derived. Re-derivation is **not guaranteed identical** — detection is an inference, not a deterministic transform.

---

## What Makes a Good Tension Encoding

A strong Tension answers four questions: What two (or more) things disagree? Where is each side sourced? Why can't both stand as written? What would resolve it? The most common gap is a single-pole "tension" that is really just an Observation — if there is only one side, it is not a tension. The second most common gap is a vague opposition ("these are in tension") with no statement of why both cannot hold.

Three senses of "tension" must not be confused. The *quality-attribute tradeoff* (`canon/principles/quality-attributes-are-in-tension`) is one `kind` of Tension. The *challenge-vs-canon contradiction* surfaced by oddkit challenge is the challenge-time sibling. The DOLCHEOT `T` is the **encode-time, within-source** primitive: a contradiction across the captured artifacts. They share machinery; they are not the same artifact.

A Tension earns its place only if it stays honest about its own confidence: it is a derived guess at a contradiction, valuable precisely because it is cheap to emit and cheap to dismiss. If the detector becomes noise, raise the bar or retract the type (see the vocabulary's retraction conditions).

---

## See Also

- [DOLCHEOT Vocabulary](klappy://canon/definitions/dolcheo-vocabulary) — the eight-dimension framework this type belongs to; why Tension is core, not a domain extension
- [How to Write an Encoding Type](klappy://odd/encoding-types/how-to-write-encoding-types) — the meta-governance this doc follows
- [Quality Attributes Are In Tension](klappy://canon/principles/quality-attributes-are-in-tension) — the `tradeoff` kind of Tension, as a structural principle
- [Encoding Type: Encode](klappy://odd/encoding-types/encode) — the meta-level letter for encode-action receipts
- [Prompt Over Code](klappy://canon/principles/prompt-over-code) — why this governance doc exists instead of server code
