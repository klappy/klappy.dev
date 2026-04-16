---
uri: klappy://odd/encoding-types/how-to-write-encoding-types
title: "How to Write an Encoding Type Governance Article"
audience: docs
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "encode", "dolche", "encoding-type-meta", "governance", "meta", "tsv", "prompt-over-code", "template"]
epoch: E0008
date: 2026-04-15
derives_from: "canon/principles/prompt-over-code.md, canon/principles/vodka-architecture.md, docs/oddkit/proactive/dolche-vocabulary.md"
complements: "odd/encoding-types/decision.md, odd/encoding-types/observation.md, odd/encoding-types/learning.md, odd/encoding-types/constraint.md, odd/encoding-types/handoff.md"
governs: "All encoding-type governance articles, server parsing of encoding-type docs, custom type creation"
status: active
---

# How to Write an Encoding Type Governance Article

> Every encoding type in oddkit — default or custom — is defined by a governance article, not by server code. The server discovers these articles at encode time, extracts their structure, builds parsers and quality scorers from what it finds. This document describes the recommended structure for encoding-type governance articles. The more structure the server finds, the better the results — but missing sections degrade gracefully, they don't break anything. Write the article well and the server handles the rest. No deployment. No code change. Prompt over code applied to the vocabulary itself.

---

## Summary — One Article Per Type, Machine-Extractable Structure

Each encoding type gets its own governance article. The article serves two audiences simultaneously: humans who need to understand the type, and the server that needs to parse and score it. The structure is designed for both — readable prose with predictable section headers and formats that the server can extract mechanically.

The server looks for specific section headers and extracts content from them. The more of this structure the article includes, the richer the server's parsing and quality scoring. Missing sections don't cause failures — the server extracts what it finds and skips what it doesn't. But a fully structured article produces the best results.

---

## Recommended File Location

All encoding-type governance articles live under `odd/encoding-types/`. The filename is the type name in lowercase:

```
odd/encoding-types/decision.md
odd/encoding-types/observation.md
odd/encoding-types/learning.md
odd/encoding-types/constraint.md
odd/encoding-types/handoff.md
odd/encoding-types/prayer-request.md    (custom example)
```

---

## Recommended Frontmatter

Standard oddkit frontmatter with these conventions for best results:

| Field | Convention |
|---|---|
| uri | `klappy://odd/encoding-types/{type-name}` |
| tags | Should include `encoding-type` — this is the tag the server searches for |
| governs | Should reference `oddkit_encode parsing and quality scoring for type {letter}` |
| derives_from | Should include `docs/oddkit/proactive/dolche-vocabulary.md` |

The `encoding-type` tag is the discovery mechanism. The server searches for articles tagged `encoding-type` at encode time. Without this tag, the server won't discover the type — but nothing breaks.

---

## Recommended Sections

The server extracts from these section headers when present. Including them produces the best parsing and quality scoring results. Missing sections degrade gracefully — the server uses what it finds.

### Section: Blockquote (opening)

The document's opening blockquote defines the type in one to three sentences. This is surfaced to the model as the type's description. Keep it concise — it appears in the encode response alongside every other type's description.

### Section: `## Type Identity`

A markdown table with exactly these rows:

```markdown
## Type Identity

| Field | Value |
|---|---|
| Letter | {single uppercase letter} |
| Name | {type name} |
| Priority | {relative priority description} |
```

The server extracts `Letter` and `Name` from this table. `Letter` should be a single uppercase character. `Name` is the human-readable type name.

### Section: `## Field Schema`

Defines the fields for this type. The serialization format (TSV, JSON, etc.) is governed separately by `odd/encoding-types/serialization-format.md`. This section defines semantics only — field names, requirements, and descriptions.

For best results, include:

1. A field listing showing the field order:

```
{letter}	{field1}	{field2}	{field3}	...
```

2. A markdown table defining each field:

```markdown
| Field | Recommended | Description |
|---|---|---|
| type | yes | Always `{letter}` |
| {field1} | yes/no | {description} |
| {field2} | yes/no | {description} |
```

3. A concrete example showing a real-world encoding of this type.

The server extracts field names, recommended/optional status, and field order from this section. The example is surfaced to the model as teaching material.

**Field conventions:**

- First field is always `type` (the letter)
- Second field is always `title` (≤12 words) — recommended for all types
- Third field is always `body` (the substance) — recommended for all types
- Remaining fields are type-specific — defined by each type's governance doc
- How fields are serialized (delimiter, escaping, file extension) is governed by `odd/encoding-types/serialization-format.md`

### Section: `## Trigger Words (Fallback Classification)`

A code block containing comma-separated trigger words:

```markdown
## Trigger Words (Fallback Classification)

When encode input is unstructured (not TSV), these trigger words classify a paragraph as {Name}:

\```
word1, word2, phrase one, phrase two
\```
```

The server extracts these words and builds a regex pattern: `/\b(word1|word2|phrase one|phrase two)\b/i`. This regex is used only for fallback classification of unstructured input. On the primary TSV path, the type letter is the classifier.

### Section: `## Quality Criteria`

A markdown table defining quality checks:

```markdown
## Quality Criteria

Each criterion adds 1 to the quality score (max {N}):

| Criterion | Check | Gap message if missing |
|---|---|---|
| {name} | {what the server checks} | "{message returned to model}" |
```

Followed by a quality levels table:

```markdown
Quality levels:

| Score | Level | Status |
|---|---|---|
| {high range} | strong | recorded |
| {mid} | adequate | recorded |
| {low} | weak | draft |
| {lowest} | insufficient | draft |
```

The server extracts criterion names, check descriptions, and gap messages. Quality levels define the score-to-status mapping.

**Quality check conventions:**

- Checks should reference specific columns ("Rationale column is non-empty")
- Checks should be mechanically testable (word count, non-empty, contains keyword)
- Gap messages should be actionable ("Add why this was chosen" not "Rationale missing")
- Max score equals the number of criteria rows

---

## Additional Sections

These sections improve the article's value for human readers and model teaching. The server does not extract from them directly, but they contribute to the article's overall usefulness.

- `## Summary` — expanded description of the type
- `## What Makes a Good {Type} Encoding` — prose guidance for models and operators
- `## See Also` — links to related governance docs

---

## Fallback Behavior — What Happens When No Type Matches

When a paragraph in unstructured input matches no type's trigger regex, the server uses a fallback type. The fallback type is determined by governance, not hardcoded in the server.

A type declares itself as the fallback by including `fallback: true` in its frontmatter:

```yaml
---
uri: klappy://odd/encoding-types/observation
fallback: true
---
```

Resolution order:
1. If exactly one type has `fallback: true`, that type is the fallback
2. If multiple types declare `fallback: true`, the first one discovered wins (alphabetical by filename)
3. If no type declares `fallback: true`, the server uses the first type discovered as fallback

The recommended convention is to mark **Observation (O)** as the fallback. An unclassified paragraph is raw content without interpretation — semantically, that's what an Observation is. This convention is followed by the default OLDC+H types.

---

## Scoring Algorithm — How Score Maps to Quality Level

Each type's governance doc defines N quality criteria. Each criterion the artifact satisfies adds 1 to the score, so `max_score` equals the number of criteria.

The server maps score to quality level using these thresholds:

| Condition | Level |
|---|---|
| `score == max_score` | strong |
| `score >= ceil(max_score * 0.6)` | adequate |
| `score >= ceil(max_score * 0.4)` | weak |
| otherwise | insufficient |

This algorithm works for any `max_score` value. A type with 4 criteria: strong=4, adequate≥3, weak≥2, insufficient<2. A type with 1 criterion: strong=1, insufficient=0 (the percentage thresholds round up so intermediate levels don't apply).

Individual type docs may include a `## Quality Levels` table showing the specific numbers for that type's `max_score`, but the algorithm itself is defined here once.

---

## Context vs Input — How Supplementary Context Is Handled

The encode action accepts two parameters: `input` (the primary content) and `context` (supplementary background). They serve different purposes:

- **`input`** is parsed into artifacts. Every row or paragraph in `input` generates an encoded artifact.
- **`context`** is not parsed into separate artifacts. Context supplies information that informs quality scoring — for example, a decision's rationale or alternatives mentioned in context count toward the Decision's quality score — but context itself never becomes a standalone artifact.

The server concatenates `input` and `context` only for quality scoring passes. For type detection and artifact parsing, only `input` is used.

This distinction matters because callers often want to provide background ("the meeting discussed X, Y, and Z") without generating separate artifacts for every background sentence. Context is metadata. Input is content.

---

## Writing a Custom Encoding Type

Custom types follow this identical structure. A pastoral knowledge base adding "Prayer Request" writes:

```
odd/encoding-types/prayer-request.md
```

With frontmatter tag `encoding-type`, a Type Identity table with `Letter: P`, a field schema, trigger words, and quality criteria. The server discovers it on the next encode call, parses P-typed rows against whatever schema it finds, scores against whatever criteria are defined. No server change.

**Conventions for custom types:**

- Letter should not collide with existing types (D, O, L, C, H, E)
- Letter should be a single uppercase character
- Including all recommended sections produces the best results
- Custom types are scoped to the knowledge base that defines them — they don't affect other KBs

---

## The Server's Extraction Contract

At encode time, the server:

1. Searches for articles tagged `encoding-type`
2. For each article, extracts from the recommended sections when present:
   - Letter and Name from `## Type Identity`
   - Field schema from `## Field Schema`
   - Trigger words from `## Trigger Words (Fallback Classification)`
   - Quality criteria from `## Quality Criteria`
3. Builds a per-type parser and scorer from whatever fields it finds
4. Surfaces the type definitions (letter, name, blockquote description, field schema, example) in the encode response to teach the model

Missing sections degrade gracefully. A type without quality criteria still parses — it just can't score. A type without trigger words still works on the primary path — it just can't classify unstructured fallback input. A type without a field schema can still be identified by letter but can't validate field structure. The more complete the governance doc, the better the results.

---

## Discoverability

This article exists so that any search for "how to write encoding type," "custom encoding type," "add new encode type," "encoding-type template," "encoding governance format," or "extend DOLCHE" surfaces this guide.

---

## See Also

- [Encoding Serialization Format](klappy://odd/encoding-types/serialization-format) — how fields are serialized (TSV default)
- [DOLCHE Vocabulary](klappy://docs/oddkit/proactive/dolche-vocabulary) — the six-dimension framework
- [Prompt Over Code](klappy://canon/principles/prompt-over-code) — the principle this entire mechanism implements
- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — why the server stays thin
- [Encoding Type: Decision](klappy://odd/encoding-types/decision) — the reference implementation
