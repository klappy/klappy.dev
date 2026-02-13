# D0009 — History Folder Pattern (Indexed Entries)

## Decision

Lane history is stored in a `history/` folder with an index file (`index.md`) and individual entry files (`H000X-*.md`). This mirrors the `decisions/` folder pattern for consistency.

## Status

**Active**

## Context

LEDGER.md was a single file capturing all lane history (champions, failures, learnings, infrastructure changes). As the lane matures, this file will grow unbounded, making it slow for agents to parse and increasing cognitive load.

Options considered:

1. **Keep single LEDGER.md** — simple but doesn't scale
2. **Rename to CHANGELOG.md** — standard format but loses narrative/learnings structure
3. **Split into history/ folder** — mirrors decisions/ pattern, scales well

## Why

- **Consistency**: Same pattern as `decisions/` — index + individual files
- **Scalability**: Agents can scan index (~500 tokens) and dig deeper only when needed
- **Cognitive load**: Familiar pattern reduces mental overhead
- **Growth-friendly**: Individual entries can include evidence, links, screenshots without bloating index

## Structure

```
products/agent-skill/
├── history/
│   ├── index.md                           # Quick reference table
│   ├── H0001-v1.1-champion.md
│   ├── H0002-v1.2-failed.md
│   ├── H0003-lane-structure-migration.md
│   └── H0004-v1.2.1-champion.md
```

## Naming

- Folder: `history/` (not `memory/`) — universally understood, consistent with conventions
- Files: `H000X-<slug>.md` — mirrors `D000X-*.md` pattern from decisions
- Index: `index.md` — same as decisions

## Consequences

- ✅ Agents can quickly scan lane history via index
- ✅ Individual entries can grow without affecting scan performance
- ✅ Consistent with decisions/ pattern — less cognitive load
- ✅ LEDGER.md removed — single source of truth
- ✅ ROADMAP Learnings Log removed — history/ is the authority
- ⚠️ More files to manage (but same tradeoff as decisions/)

## Relationship to Canon

- **Overrides**: None (canon doesn't specify history storage pattern)
- **Extends**: Canon principle of "Memory Is the Bottleneck" — this makes memory scannable
- **Candidate for elevation**: Yes — useful pattern for any lane with accumulated history

## Evidence

- Conversation: 2026-01-21 (LEDGER drift discussion, scalability concerns)
- Prior art: `decisions/` folder in this lane
