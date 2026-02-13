---
archived: true
archived_reason: "E0005.1 — superseded by OddKit dynamic routing"
uri: klappy://canon/meta/slice-contract-sml
title: "Slice Contract: S / M / L"
audience: canon
exposure: nav
tier: 1
relevance: decision
voice: neutral
stability: stable
tags: ["context-packs", "extraction"]
execution_posture: governing
---

# Slice Contract: S / M / L

> How much to extract from each included topic.

## Summary

S/M/L define **extraction depth per topic**, not topic inclusion.

Topic inclusion is controlled by `relevance`.
Extraction depth is controlled by slice size.

---

## Required Headings (when applicable)

Documents with `relevance: decision` are expected to use these headings where appropriate:

- `## Operating Constraints`
- `## Defaults`
- `## Failure Modes`
- `## Verification`

Recommended:
- `## Summary`
- `## Examples`
- `## Related`

---

## Slice Definitions

### S — Execution Slice
Extract:
- Title
- Subtitle
- Description
- Operating Constraints
- Defaults
- Failure Modes
- Verification

Purpose: change behavior immediately.

---

### M — Execution + Correctness
Extract:
- Everything in S
- Summary
- Examples (if present)

Purpose: reduce errors and misapplication.

---

### L — Full Topic
Extract:
- Everything in M
- Any additional background or rationale sections

Purpose: deep understanding and auditability.

---

### XL — Book Export
- Entire document
- No slicing
- Not intended for execution packs

---

## Rules

- Extraction is structural only (heading-to-heading)
- No summarization or rewriting
- Missing sections are skipped, not fabricated
- Warnings may be emitted for governing docs

---

## Invariant

> **If a slice does not change behavior, it does not belong in S.**

---

## Operating Constraints

- MUST extract S-slices structurally (heading-to-heading), not by summarization or rewriting
- MUST NOT fabricate content for missing sections; skip them instead
- MUST include only behavior-changing content in S-slices
- MUST use relevance to control topic inclusion; use slice size to control extraction depth
- MUST emit warnings for governing docs missing required sections

---

## Defaults

- S-slice extracts: Title, Subtitle, Operating Constraints, Defaults, Failure Modes, Verification
- M-slice adds: Summary, Examples
- L-slice adds: Background, Rationale, any remaining sections
- XL is full document export, not intended for execution packs
- Missing sections are skipped without error for non-governing docs

---

## Failure Modes

- **Fabricated Content**: Generating summaries or filling in missing sections
- **Bloated S-Slices**: Including background or rationale in S when it doesn't change behavior
- **Relevance Confusion**: Using slice size to control inclusion instead of relevance metadata
- **Summarization**: Rewriting content instead of structural extraction
- **Completeness Fetish**: Requiring all sections even when some don't apply

---

## Verification

- S-slice contains only sections that change immediate behavior
- Extraction is verbatim from source headings, not summarized
- Missing sections result in skip, not fabrication
- Governing docs without required sections emit warnings
- Pack size reflects extraction depth, not document length
