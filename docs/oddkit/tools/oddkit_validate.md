---
uri: oddkit://tools/validate
title: "oddkit_validate"
audience: operators
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "tool", "epistemics", "validation", "completion", "evidence"]
---

# oddkit_validate

> Validate completion claims against required artifacts. Returns VERIFIED or NEEDS_ARTIFACTS.

## Description

`oddkit_validate` checks whether a completion claim meets the evidence requirements defined by the Definition of Done. It extracts claims from the input, identifies what artifact types are required, compares them against what was provided, and returns a binary verdict: VERIFIED or NEEDS_ARTIFACTS.

This tool operationalizes the Definition of Done (`klappy://canon/constraints/definition-of-done`). A claim of completion creates an evidence obligation (Axiom 2 — A Claim Is a Debt). Validate enforces that obligation by refusing to render a VERIFIED verdict until the required artifacts are present. It does not accept partial verdicts — the claim is either fully supported or it has gaps.

For document deliverables, validate also checks compliance with the Writing Canon (`klappy://canon/meta/writing-canon`), ensuring progressive disclosure structure is present — not just that the file exists.

## When to Use

- Before claiming "done" on any task
- As part of the AGENTS.md mandatory checkpoints (orient → preflight → **validate**)
- When a user or agent asserts completion and evidence must be audited
- After producing artifacts, to confirm the evidence set is sufficient
- When reviewing whether a deliverable meets the Definition of Done

## Tool Definition

**Name:** `oddkit_validate`

**Description:** Validates completion claims against required artifacts. Returns VERIFIED or NEEDS_ARTIFACTS with specific gaps. Extracts claims from input, checks for required evidence types (screenshots, test output, recordings, rendered output), and identifies what is missing. Does not render partial verdicts — either the evidence is sufficient or it is not. Per the Definition of Done, requires: change description, verification performed, observed behavior, evidence produced, self-audit completed. For document deliverables, checks Writing Canon compliance.

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "input": {
      "type": "string",
      "description": "The completion claim with artifact references. Describe what was done and reference the evidence produced (file paths, screenshots, test output, commands run)."
    }
  },
  "required": ["input"]
}
```

### Response Shape

```json
{
  "action": "validate",
  "result": {
    "verdict": "VERIFIED | NEEDS_ARTIFACTS",
    "claims": [
      "string — completion claims extracted from the input"
    ],
    "provided_artifacts": [
      "string — artifacts referenced in the input"
    ],
    "gaps": [
      "string — required evidence types that are missing"
    ]
  }
}
```

## Behavioral Rules

1. **Extract claims explicitly.** Parse the input for specific completion assertions. Do not infer claims that were not stated.
2. **Check against the full Definition of Done.** Every claim is evaluated against the five DoD requirements: change description, verification performed, observed behavior, evidence produced, self-audit completed. Missing any one produces NEEDS_ARTIFACTS.
3. **Binary verdicts only.** The result is VERIFIED or NEEDS_ARTIFACTS. There is no "partially verified," "probably done," or "close enough." Ambiguity resolves to NEEDS_ARTIFACTS.
4. **Name the gaps specifically.** When the verdict is NEEDS_ARTIFACTS, the `gaps` array must contain concrete, actionable descriptions of what is missing (e.g., "visual proof (screenshot or recording)" not "more evidence").
5. **Check document deliverables against Writing Canon.** If the completion claim involves a document targeting `canon/`, `odd/`, or `docs/`, validate progressive disclosure compliance per `canon/meta/writing-canon.md`. A document that exists but fails structural requirements is not done.
6. **Do not fabricate artifacts.** If the input references evidence that cannot be verified, treat it as provided but note that verification of the artifact itself is the caller's responsibility.

## Canon References

- `klappy://canon/constraints/definition-of-done` — The five requirements that define completion
- `klappy://canon/meta/writing-canon` — Progressive disclosure checklist for document deliverables
- `klappy://canon/values/axioms` — Axiom 2 (A Claim Is a Debt) and Axiom 4 (You Cannot Verify What You Did Not Observe)
