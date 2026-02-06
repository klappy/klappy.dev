---
uri: klappy://docs/attempt-record-pack
title: "Attempt Record Packs"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["docs", "implementation", "attempts", "records", "evidence"]
---

# 📦 Attempt Record Packs

An attempt produces immutable evidence and metadata that MAY be merged
before a winner is chosen.

## SHA Model

Each attempt tracks:

- `attempt_head_sha`: build + evidence commit
- `record_pack_merge_sha`: merge of attempt records into main
- `champion_merge_sha`: merge of winning src (optional)

Auditability is preserved by never reusing SHAs.

## Evidence Location

Evidence is always exposed at:

```
/_evidence/
```

This URL must return HTTP 200 on any deployed build.

## Minimum Proof

- 1 video recording OR
- 3 screenshots

Markdown alone does not count.

## Merge Policy

Attempt records MAY be merged to main before a champion is selected.
This preserves auditability without blocking parallel work.

The winning attempt's source code is merged separately via `champion_merge_sha`.
