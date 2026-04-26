---
uri: klappy://docs/planning/link-rot-elimination-campaign
title: "Campaign Sequencing — Link-Rot Elimination (KISS)"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["planning", "campaign", "link-rot", "vodka", "kiss", "epoch-8"]
epoch: E0008
date: 2026-04-26
derives_from:
  - "docs/oddkit/specs/oddkit-resolve.md"
  - "docs/oddkit/specs/oddkit-audit.md"
  - "canon/principles/identity-resolved-by-protocol.md"
  - "docs/planning/link-rot-deferred-concerns.md"
governs: "Sequencing of the four artifacts that together eliminate the link-rot bug class"
supersedes: "DRAFT v1 (2026-04-26, six-phase pre-Vodka-cut version)"
---

# Campaign Sequencing — Link-Rot Elimination (KISS)

> Three phases. Four artifacts. The minimum that closes the bug class. Everything else is deferred per `klappy://docs/planning/link-rot-deferred-concerns`.

## The Goal

Eliminate the broken-link bug class on `klappy.dev` such that:

1. Every consumer of canon resolves `klappy://` URIs through the protocol — no consumer hardcodes URLs.
2. CI mechanically prevents new dead references and legacy markdown link patterns from merging.
3. A canon principle names the architectural answer so future surfaces inherit it.

## Phase Overview

```
Phase 1 — Foundation (3 PRs, parallelizable)
    ├── PR-1.1 — Resolver spec (klappy://docs/oddkit/specs/oddkit-resolve)
    ├── PR-1.2 — Audit spec (klappy://docs/oddkit/specs/oddkit-audit)
    └── PR-1.3 — Tier-1 principle + deferred ledger
                 (klappy://canon/principles/identity-resolved-by-protocol +
                  klappy://docs/planning/link-rot-deferred-concerns +
                  this campaign doc)

Phase 2 — Implementation (3 PRs, serial)
    ├── PR-2.1 — Implement oddkit_resolve action
    │           ⚠️  Release-validation-gate per E0008.3
    ├── PR-2.2 — Convert legacy patterns in writings/ to klappy:// URIs
    │           Re-audit the 49 from April-9 audit; fix or delete
    └── PR-2.3 — Implement oddkit_audit action
                 ⚠️  Release-validation-gate per E0008.3

Phase 3 — Enforcement (2 PRs, serial after observation)
    ├── PR-3.1 — canon-quality.yml workflow (soft-block this cycle)
    └── PR-3.2 — Flip vars.AUDIT_ENFORCEMENT_MODE to "hard"
                 (config flip after observation cycle)
```

Eight PRs total. Critical path is six PRs (PR-1.1 → PR-1.2 → PR-2.1 → PR-2.3 → PR-3.1 → PR-3.2). The other two (PR-1.3, PR-2.2) ship in parallel.

## Dependencies

- **PR-1.1, PR-1.2, PR-1.3**: no prerequisites. Specs and canon docs. Can ship in parallel.
- **PR-2.1**: requires PR-1.1 (the spec is the contract).
- **PR-2.2**: requires PR-2.1 (the new URIs need to actually resolve when reviewers click them).
- **PR-2.3**: requires PR-2.1 (audit calls the resolver).
- **PR-3.1**: requires PR-2.3 (workflow calls the audit).
- **PR-3.2**: requires one observation cycle of PR-3.1 in soft-block mode.

## Release-Validation-Gate Application

| Phase | RV-Gate Required? | Why |
|-------|-------------------|-----|
| Phase 1 | No | Specs and canon docs; no load-bearing surface. |
| Phase 2 | **Yes for PR-2.1 and PR-2.3** | New action surfaces. Validators verify each action's contract end-to-end against live prod. |
| Phase 3 | No (PR-3.1) / No (PR-3.2) | Workflow YAML is reviewable as code. Hard-block flip is a config var change. |

Plan Phase 2 PR cadence with validator dispatch time included.

## Operator Decision Points

Three points where the campaign waits on input:

1. **Now** — greenlight to start Phase 1.
2. **After PR-3.1 lands** — observation cycle length. Recommendation: 3–5 PRs through the gate to see real signal.
3. **End of observation cycle** — greenlight to flip the enforcement mode variable (PR-3.2).

Everything else is sequenced. These three are operator-judged.

## Definition of Done

The campaign is complete when:

1. ✅ `oddkit_resolve` is in production. URIs resolve correctly.
2. ✅ Writings have zero legacy markdown link patterns.
3. ✅ `oddkit_audit` is in production. Dead-reference and legacy-link-pattern rules operational.
4. ✅ `canon-quality.yml` is in `hard` enforcement mode. Required status check on `main`.
5. ✅ Tier-1 canon principle is published.

Five conditions. Stopping anywhere short leaves the durability gap open.

## What This Campaign Does NOT Cover

Per `klappy://docs/planning/link-rot-deferred-concerns`:

- `oddkit_resolve_batch` action
- `resolve_links` flag on get/search
- `aliases` and `supersession_response` frontmatter fields
- Identity-by-meaning queries
- Terminological-drift, projection-staleness, epoch-gap audit checks
- `audit_allow:` frontmatter field
- Pre-commit hook

Each of these is a real concern with a real revisit condition. None is in this campaign. When their pain is acute, each becomes its own thin separate campaign.

## Origin

Drafted on 2026-04-26 as the v2 KISS revision of the campaign. The v1 version had six phases and ~15 PRs and violated Vodka principles by pre-building infrastructure for hypothetical pain. v2 cuts to three phases, eight PRs, and the four-artifact minimum. The cut work moved to the deferred-concerns ledger with explicit revisit triggers. Operator's framing: "Vodka principles, KISS, antifragile, maintainable, consistent."
