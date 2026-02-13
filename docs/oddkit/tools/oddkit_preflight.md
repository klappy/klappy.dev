---
uri: oddkit://tools/preflight
title: "oddkit_preflight"
audience: operators
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "tool", "epistemics", "preflight", "implementation", "constraints"]
---

# oddkit_preflight

> Pre-implementation check that surfaces relevant docs, constraints, and definition of done before coding begins.

## Description

`oddkit_preflight` prepares an agent or operator for implementation by returning the documents, constraints, and definition of done relevant to a described task. Given a description of what is about to be implemented, it ranks available documentation by relevance, surfaces applicable constraints, and returns the definition of done — ensuring the implementer has read the governing material before writing code.

This tool operationalizes the principle that implementation without context is drift. The returned `start_here` documents are not suggestions — they are the minimum reading required before the described work can proceed with epistemic integrity. Skipping them risks violating constraints that were available but unread.

For document deliverables, preflight includes the Writing Canon (`klappy://canon/meta/writing-canon`) as an applicable constraint, ensuring progressive disclosure requirements are visible before authoring begins.

## When to Use

- Before implementing any feature, fix, or change
- As part of the AGENTS.md mandatory checkpoints (orient → **preflight** → validate)
- When starting work on a new task and needing to know what governs it
- When unsure which constraints apply to a specific type of work
- Before writing documentation, to surface the Writing Canon and structural requirements

## Tool Definition

**Name:** `oddkit_preflight`

**Description:** Pre-implementation check. Returns relevant docs to read, applicable constraints, definition of done, and pitfalls for the described task. The returned start_here documents should be READ before coding. Surfaces constraints ranked by relevance to the specific task. Always returns the definition of done. For document deliverables, includes Writing Canon as a constraint.

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "input": {
      "type": "string",
      "description": "Description of what you are about to implement. Be specific — the more detail provided, the more precisely relevant the returned docs and constraints will be."
    }
  },
  "required": ["input"]
}
```

### Response Shape

```json
{
  "action": "preflight",
  "result": {
    "topic": "string — the implementation description echoed back",
    "start_here": [
      "string — file paths to docs ranked by relevance to the described task"
    ],
    "dod": "string — path to the definition of done document",
    "constraints": [
      "string — paths to constraint documents applicable to this task"
    ],
    "docs_available": "number — total docs in the corpus, for awareness"
  }
}
```

## Behavioral Rules

1. **Return start_here docs ranked by relevance.** The most relevant documents appear first. Ranking is based on semantic similarity to the described task, not alphabetical order or recency.
2. **Always return the definition of done.** Regardless of the task type, the `dod` field must reference the canonical definition of done. Implementation without knowing what "done" means is not implementation.
3. **Surface constraints applicable to the specific task.** Do not return all constraints — return the subset that governs the described work. Generic constraints (like the constraints README) may be included for orientation.
4. **Return doc count for awareness.** The `docs_available` field tells the caller how large the corpus is, signaling whether the returned subset is narrow (well-targeted) or broad (more reading may be needed).
5. **The returned start_here docs must be read before coding.** Preflight output is not informational — it is prescriptive. The listed documents contain governing material. Ignoring them and proceeding is a policy violation.
6. **Include Writing Canon for document deliverables.** If the described task involves creating or modifying documents, the Writing Canon must appear in the constraints list.

## Canon References

- `klappy://canon/constraints/definition-of-done` — The definition of done returned by every preflight
- `klappy://canon/constraints/README` — Index of all constraints, returned when broadly applicable
- `klappy://canon/meta/writing-canon` — Progressive disclosure checklist, included for document deliverables
- `klappy://canon/epistemic-modes` — Mode obligations that inform what "ready to implement" means
