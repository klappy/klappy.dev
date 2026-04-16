---
uri: klappy://odd/encoding-types/serialization-format
title: "Encoding Serialization Format — TSV as Default Wire and Storage Format"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: semi_stable
tags: ["odd", "oddkit", "encode", "dolche", "tsv", "format", "serialization", "encoding-type", "governance", "storage"]
epoch: E0008
date: 2026-04-15
derives_from: "docs/oddkit/proactive/dolche-vocabulary.md, odd/encoding-types/how-to-write-encoding-types.md, canon/principles/prompt-over-code.md"
complements: "odd/encoding-types/decision.md, odd/encoding-types/observation.md, odd/encoding-types/learning.md, odd/encoding-types/constraint.md, odd/encoding-types/handoff.md, odd/encoding-types/question.md"
governs: "How encoding type fields are serialized for input, output, and storage"
status: active
---

# Encoding Serialization Format — TSV as Default Wire and Storage Format

> Encoding types define what fields exist. This document defines how those fields are serialized — the wire format between model and server, and the storage format for accumulated encodings. The default is TSV. The choice is governed by this document, not by the encoding-type docs, so the format can change independently of the type definitions.

---

## Summary — Semantics and Serialization Are Independent Axes

Each encoding-type governance doc defines a field schema: field names, which are recommended, descriptions, and quality criteria. This document defines how those fields become bytes — how the model writes them, how the server reads them, and how they're stored for later processing.

Separating these concerns means: adding a new encoding type never requires thinking about serialization. Changing the serialization format never requires updating type definitions. Each axis evolves independently through its own governance doc.

---

## Default Format: TSV

Tab-separated values. One row per encoding artifact. First field is always the type letter.

```
{type_letter}\t{field_1}\t{field_2}\t{field_3}\t...
```

Field order follows the field schema defined in each encoding type's governance doc.

### Why TSV

TSV is the default because it optimizes for the full lifecycle of encoding data — from model output through server parsing to edge-scale bulk processing.

**Parsing simplicity:** Split on `\t`. No parsing library. No escaping rules. The server, the model, and bulk processors all use the same trivial operation.

**Determinism:** Tab almost never appears in natural language prose. CSV fails here — commas appear constantly, creating escaping ambiguity. TSV rows parse identically regardless of content.

**Line-streamable:** One row per line. Read a million rows by reading a million lines. No structural parsing, no bracket matching, no DOM traversal.

**Human readable:** Open in any text editor, spreadsheet app, or terminal. `cat`, `grep`, `awk`, `cut` all work natively. Debugging at 2am doesn't require tooling.

**Concatenatable:** `cat *.tsv > combined.tsv` produces a valid TSV file. Hundreds of session files merge into one bulk-processable dataset with zero transformation.

**Git-diffable:** One encoding per line. Diffs show exactly which encodings changed.

**Edge-efficient:** Cloudflare Workers can stream-process TSV from R2 line-by-line with zero dependencies. No query engine (vs. SQL/D1), no parser (vs. JSON/markdown), no escaping logic (vs. CSV).

### Conventions

- One artifact per line
- Fields separated by tab (`\t`)
- First field is always the type letter (D, O, L, C, H, Q, or any custom type)
- Field order follows the encoding type's field schema
- Empty optional fields use empty string (consecutive tabs: `\t\t`)
- No header row — the type letter identifies the schema
- Newlines within field values should be escaped as `\n` (literal backslash-n) or replaced with a space
- Files use `.tsv` extension

### Example — Mixed-Type Encoding

A single encode call with multiple types:

```
D	TSV as encode format	Governance defines TSV as the serialization format for encode input and storage.	Deterministic parsing, edge-efficient, human-readable, concatenatable.	JSON, CSV, markdown, SQL	permanent
O	Deno user-agent was 39% of traffic	Deno/2.1.4 accounted for 2,631 of 6,753 total tool calls.	telemetry_public SQL query	verified
L	Platform-agnostic ID requires URL-level mechanisms	Headers vary by platform. URLs are universal.	O: Labeled consumers only got credit for initialize events	general
C	Server must not hardcode encoding keywords	Type vocabulary is extensible via governance, not code.	D: Governance-driven encode architecture	permanent
H	Implement TSV parsing in encode handler	Replace detectEncodeType regex with governance-driven field parsing.		next session
Q	Should encode search canon internally?	Internal search guarantees discovery but adds latency.	D: Governance-driven encode architecture	important
```

---

## Fallback: Unstructured Input

When encode input is not TSV (models that haven't learned the format), the server falls back to paragraph splitting and dynamic regex classification from governance-defined trigger words. The encode response includes the TSV format specification, teaching the model for subsequent calls.

The fallback is a teaching mechanism, not a permanent path. Models converge on TSV after seeing the format in the encode response.

---

## Storage Patterns

**Session files:** One `.tsv` file per session, all types interleaved chronologically. The narrative order is preserved — what was observed, then decided, then constrained flows naturally.

**Bulk processing:** Concatenate session files. Stream line-by-line. Filter by type letter in the first field. No schema changes needed across files — the type letter self-identifies the field schema.

**Arbitration at scale:** CF Workers read `.tsv` files from R2, stream-process rows, apply type-specific logic based on the first field. Millions of rows, hundreds of files, zero parsing dependencies.

---

## Changing the Format

This document governs the serialization format. To change it — from TSV to JSON lines, CSV, or any other format — update this document. The encoding-type governance docs do not change because they define field semantics, not serialization.

The server reads this governance doc (or a format configuration) to know how to parse encode input. The same encoding-type field schemas work with any serialization format that can represent named fields.

---

## Discoverability

This article exists so that any search for "encode format," "TSV," "encoding serialization," "encode storage format," "encode wire format," "how encode input is structured," or "encode file format" surfaces this document.

---

## See Also

- [How to Write an Encoding Type](klappy://odd/encoding-types/how-to-write-encoding-types) — defines field schemas independent of format
- [DOLCHE Vocabulary](klappy://docs/oddkit/proactive/dolche-vocabulary) — the six-dimension framework
- [Prompt Over Code](klappy://canon/principles/prompt-over-code) — format governed by document, not by code
