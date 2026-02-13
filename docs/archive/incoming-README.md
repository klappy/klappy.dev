---
uri: klappy://docs/_incoming
title: "Incoming Documents (Temporary Intake)"
audience: docs
exposure: internal
tier: 3
voice: neutral
stability: evolving
tags: ["intake", "migration", "epoch-4", "temporary"]
---

# Incoming Documents

> Temporary holding area for new documents that have not yet been classified into their Epoch 4 category.

## Why This Exists

During the Epoch 4 migration, the docs and canon directory structures are being reorganized to match the current epistemic model. Until that migration completes, this folder prevents further drift by giving writers a sanctioned place to put new work without guessing at placement.

**This folder is intentionally temporary.** It should be emptied over time as documents are classified and moved to their correct locations.

## Rules

1. **If you are unsure where a document belongs, put it here.**
2. Every file placed here should include standard frontmatter with at minimum: `title`, `tags`, and a one-line description.
3. Files in `_incoming/` are reviewed periodically and moved to their correct Epoch 4 location.
4. Do not leave files here indefinitely. If a file has been here for more than one review cycle, it must be classified or explicitly marked `unclear`.

## Classification Heuristic

When reviewing a document for placement, ask one question:

> **Is this document trying to define truth, or explain/change/evaluate it?**

| If the document... | It probably belongs in... |
|---------------------|--------------------------|
| Defines a rule or constraint | `canon/constraints/` or `canon/principles/` |
| Explains why a rule exists | `docs/appendices/` |
| Records a choice that was made | `docs/decisions/` |
| Describes something that happened | `docs/history/` |
| Proposes a future change | `docs/plans/` |
| Changes system structure | `docs/migrations/` |
| Checks alignment or health | `docs/audits/` |
| Is still genuinely unclear | stays in `docs/_incoming/` |

## When This Folder Goes Away

This folder is removed (or archived) when:

- The Epoch 4 migration is complete
- All existing documents have been classified and placed
- oddkit can guide placement instead of humans guessing

## Related Documents

- `klappy://docs/migrations/epoch4-canon-docs-migration` — the migration plan this supports
- `klappy://canon/constraints/meaning-must-not-depend-on-path` — the constraint that motivates structural clarity
