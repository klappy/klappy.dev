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
    },
    "knowledge_base_url": {
      "type": "string",
      "description": "Optional. GitHub repo URL for canon override. Defaults to the configured baseline."
    },
    "result_grouping": {
      "type": "string",
      "enum": ["merged", "overlay_first", "grouped"],
      "description": "Optional. Ranking policy for start_here when an overlay (knowledge_base_url) is set. \"merged\" preserves pure relevance ranking. \"overlay_first\" promotes overlay (canon) docs above baseline docs. \"grouped\" additionally returns separate start_here_overlay and start_here_baseline arrays. Conditional default: knowledge_base_url unset → \"merged\"; knowledge_base_url set → \"overlay_first\"."
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
    "start_here_overlay": "array — only present when result_grouping is \"grouped\"; subset of start_here restricted to overlay (source=\"canon\") docs",
    "start_here_baseline": "array — only present when result_grouping is \"grouped\"; subset of start_here restricted to baseline docs",
    "dod": "string — path to the definition of done document",
    "constraints": [
      "string — paths to constraint documents applicable to this task"
    ],
    "docs_available": "number — total docs in the corpus, for awareness"
  }
}
```

## Result Grouping (Knowledge Base Overlay)

When `knowledge_base_url` is set, `start_here` and `constraints` are partitioned the same way `oddkit_search` partitions hits: overlay (`source: "canon"`) docs surface above baseline docs by default. Without this, project-specific governance can be displaced from the top of `start_here` by larger baseline corpora — the contamination shape that `klappy://canon/principles/scoped-truth` names.

`result_grouping` accepts the same three values as `oddkit_search`:

- **`"merged"`** — Pure relevance ranking, no partition. Default when `knowledge_base_url` is unset.
- **`"overlay_first"`** — Overlay docs ranked above baseline docs in `start_here` and `constraints`, BM25 ordering preserved within each tier. **Default when `knowledge_base_url` is set.**
- **`"grouped"`** — Adds explicit `start_here_overlay` and `start_here_baseline` arrays so callers can render or reason about the tiers separately.

## Behavioral Rules

1. **Return start_here docs ranked by relevance.** The most relevant documents appear first. Ranking is based on semantic similarity to the described task, not alphabetical order or recency.
2. **Always return the definition of done.** Regardless of the task type, the `dod` field must reference the canonical definition of done. Implementation without knowing what "done" means is not implementation.
3. **Surface constraints applicable to the specific task.** Do not return all constraints — return the subset that governs the described work. Generic constraints (like the constraints README) may be included for orientation.
4. **Return doc count for awareness.** The `docs_available` field tells the caller how large the corpus is, signaling whether the returned subset is narrow (well-targeted) or broad (more reading may be needed).
5. **The returned start_here docs must be read before coding.** Preflight output is not informational — it is prescriptive. The listed documents contain governing material. Ignoring them and proceeding is a policy violation.
6. **Include Writing Canon for document deliverables.** If the described task involves creating or modifying `.md` files in `canon/`, `odd/`, `docs/`, or `writings/`, the Writing Canon (`canon/meta/writing-canon.md`) must appear in the constraints list, and `start_here` must include it as a required read.

## Writing Canon Gate — Document Deliverable Detection

This gate fires automatically. No one asks for it. If the preflight input describes creating, editing, writing, reviewing, or auditing a document, the gate activates.

### Detection

The gate activates when any of these conditions are true:

- The input mentions creating or editing a `.md` file
- The input references paths in `canon/`, `odd/`, `docs/`, or `writings/`
- The input describes writing an article, essay, document, spec, or canon entry
- The input uses verbs like "write," "draft," "author," "document," "update" in connection with a deliverable

### What Preflight Returns When the Gate Fires

In addition to the standard preflight response:

1. **Constraints** must include `canon/meta/writing-canon.md`
2. **Start_here** must include `canon/meta/writing-canon.md` ranked high
3. **Definition of done** must include the seven-point Writing Canon checklist:

   1. **Title test:** Does the title name the concept and its stance? Could someone decide relevance from the title alone?
   2. **Blockquote test:** Does the blockquote contain the complete compressed argument? Could an agent act on title + blockquote alone?
   3. **Metadata test:** Do the metadata fields orient the document in the canon? Is the epoch, derivation, and governance clear?
   4. **Summary test:** Is the summary self-contained? Could someone skip everything below it and still have the full picture?
   5. **Header scan test:** Do the headers tell the document's story when read in sequence? Do structural markers have descriptive subtitles?
   6. **No buried claims:** Is every key assertion present in compressed form at a higher tier? Does the body elaborate rather than introduce?
   7. **Axiom space test:** If loaded in a small context alongside the axioms and creed, does this document amplify the values or crowd them out?

### Why This Is Mandatory

The Progressive Disclosure Failure incident (February 2026) proved that agents with full access to the Writing Canon will skip it unless preflight surfaces it as a constraint. Access is not enforcement. This gate ensures the checklist is visible before authoring begins — not after a human asks "why didn't you check progressive disclosure?"

## Canon References

- `klappy://canon/constraints/definition-of-done` — The definition of done returned by every preflight
- `klappy://canon/constraints/README` — Index of all constraints, returned when broadly applicable
- `klappy://canon/meta/writing-canon` — Progressive disclosure checklist, included for document deliverables
- `klappy://canon/epistemic-modes` — Mode obligations that inform what "ready to implement" means
- `klappy://canon/principles/scoped-truth` — The contamination shape that motivated `result_grouping`; ranking precedence between overlay and baseline applies to start_here and constraints
