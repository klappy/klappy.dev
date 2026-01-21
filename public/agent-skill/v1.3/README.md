# ODD PRD Guide Pack — v1.3

PRD Elicitation Enhancement release.

## What's New

v1.3 transforms the pack from an informational resource into an interrogative system:

### Agent Role Declaration

Clear framing at the start:
- "You are not a PRD author"
- "You are a PRD elicitation system"
- "You extract. You do not invent."

### PRD Stage Typing

Classify the PRD type before questioning:

| Type | Evidence | Ambiguity |
|------|----------|-----------|
| PoC / Exploration | Minimal | High |
| Feature | Required | Medium |
| Fix | Root cause | Low |
| Product slice | End-to-end | Medium |
| Refactor / migration | None visible | Low |

### Asset Inventory Phase

Catalog existing assets before defining scope:
- Text (docs, notes, prior PRDs)
- Media (screenshots, mockups)
- Links (repos, tickets)
- Oral testimony (the interview itself)

### 8-Phase Interview Loop

Resequenced from 7 stages:

| Phase | Name | Purpose |
|-------|------|---------|
| 0 | Stage Identification | Classify PRD type |
| 1 | Orient | High-level intent |
| 2 | Inventory | Existing assets |
| 3 | Constraint Surfacing | Non-negotiables |
| 4 | Outcome Framing | Falsifiable success |
| 5 | Evidence Definition | Testable criteria |
| 6 | Ambiguity Capture | Document unknowns |
| 7 | Draft Assembly | Produce PRD |

### Ambiguity Capture

New explicit phase for documenting:
- Uncertainties that remain
- Impact if wrong
- Resolution paths
- Blocking vs. deferrable

## Usage

### Option 1: Direct URL

```
https://main.klappy-dev-agent-skill.pages.dev/v1.3/prd-guide-pack.md
```

### Option 2: Local Copy

1. Download `prd-guide-pack.md`
2. Paste into your AI context
3. Ask it to help you create a PRD

## Files

- [`prd-guide-pack.md`](./prd-guide-pack.md) — The compiled pack (~16K tokens)

## Canon Version

Built against canon v0.8.0. Same sources as v1.2.4, updated INSTRUCTIONS.md.

## Stability

This is a champion version. For the latest champion, use `../latest/`.
