# D0008 — ROADMAP as Vision Only (No Status Tracking)

## Decision

ROADMAP tracks future vision and version objectives only. It does not track version status (champion, failed, in-progress). The `history/` folder is the single source of truth for what happened.

## Status

**Active**

## Context

The ROADMAP contained a "Status" field for each version (e.g., "CHAMPION", "FAILED", "PRD written, awaiting attempt"). After v1.2.1 was promoted to champion, the ROADMAP still showed "awaiting attempt" — creating drift between ROADMAP and history.

Options considered:

1. **Remove status from ROADMAP** — history/ is authoritative, ROADMAP is vision-only
2. **Enforce ROADMAP updates during promotion** — Add to promotion checklist

## Why

- **DRY**: history/ already tracks champion/failed status authoritatively. Duplicating in ROADMAP violates DRY.
- **KISS**: Fewer places to maintain = fewer places to forget
- **Role clarity**: ROADMAP answers "where are we going?" / history/ answers "where have we been?"
- **Antifragile**: Design removes drift possibility rather than relying on discipline to prevent it

Option 2 was rejected because it fights drift with process discipline instead of structural design. Discipline eventually loses to forgetfulness.

## Consequences

- ✅ No more drift between ROADMAP and history/
- ✅ Clear separation of concerns (vision vs. history)
- ✅ Simpler ROADMAP maintenance (just update vision, not status)
- ⚠️ Loses at-a-glance "where are we" in ROADMAP (go to history/ for that)
- ⚠️ Agents loading ROADMAP need to also check history/ for current state

## Relationship to Canon

- **Overrides**: None (canon doesn't specify roadmap structure)
- **Extends**: Canon principle of DRY (with isolation), KISS
- **Candidate for elevation**: Yes — useful pattern for any lane with both ROADMAP and LEDGER

## Evidence

- Conversation: 2026-01-21 (ROADMAP showed v1.2.1 as "awaiting attempt" after champion promotion)
- Root cause: Status tracked in two places (ROADMAP + LEDGER)
