---
uri: klappy://docs/audits/epoch4-phase2-classification
title: "Epoch 4 Phase 2 — Classification Inventory"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: draft
tags: ["audit", "epoch-4", "migration", "classification", "inventory"]
---

# Epoch 4 Phase 2 — Classification Inventory

> Complete classification of every document in the repository against the Epoch 4 target topology. No files were moved — this is the mapping only.

## Summary

| Area | Total Files | Correctly Placed | Needs Move |
|------|-------------|-----------------|------------|
| docs/ | 88 | 71 | 17 |
| canon/ | 62 | 28 | 34 |
| Peripheral (about/, apocrypha/, drift-audit/, root) | 24 | 20 | 4 |
| **Total** | **174** | **119** | **55** |

---

## Key Findings

1. **Root-level accumulation is the primary drift pattern.** In both `docs/` and `canon/`, the subdirectory structure is already well-formed. Files that need to move are overwhelmingly root-level files authored before the subdirectory taxonomy matured.

2. **`canon/agents/` is entirely operational, not normative.** All 7 agent role definitions describe how agents behave, not what must be true. They reference canon but are not themselves canon. All 7 should move to `docs/`.

3. **`canon/documentation/` is a pre-Epoch 4 artifact.** Its 4 files split cleanly: 2 are formal vocabulary (`definitions/`), 2 are architecture metadata (`meta/`). The directory should be dissolved.

4. **`canon/` root has 14 misplaced files.** These are the highest-value moves: constraints that should be in `constraints/`, definitions in `definitions/`, methods in `methods/`, and diagnostics in `diagnostics/`.

5. **`canon/self-audit.md` has a self-contradiction.** It carries `execution_posture: operational` while living in canon. Its own metadata flags it as non-normative.

6. **Top-level `apocrypha/` is not redundant with `canon/apocrypha/`.** They serve different purposes (literary series vs. CHARTER-governed system-voice fragments). No bulk migration needed.

---

## docs/ — Files Needing Relocation (17 files)

### Root-level docs/ (15 moves)

| # | Current Path | Classification | Target |
|---|---|---|---|
| 1 | `docs/AGENT_ENTRYPOINT.md` | agent-docs | `docs/agents/` |
| 2 | `docs/AGENT_KICKOFF.md` | agent-docs | `docs/agents/` |
| 3 | `docs/ATTEMPTS.md` | appendix | `docs/appendices/` |
| 4 | `docs/ATTEMPT_KICKOFF.md` | operational | `docs/appendices/` |
| 5 | `docs/ATTEMPT_RECORD_PACK.md` | appendix | `docs/appendices/` |
| 6 | `docs/CLOUDFLARE_CONFIG.md` | infra-docs | `docs/infra/` |
| 7 | `docs/DISTILLATION_CLASSIFICATION.md` | history | `docs/history/` |
| 8 | `docs/PREVIEW.md` | infra-docs | `docs/infra/` |
| 9 | `docs/TRUTH_MAP.md` | canon-candidate | `docs/appendices/` (or promote to `canon/`) |
| 10 | `docs/WHAT_THIS_REPO_IS_NOT.md` | appendix | `docs/appendices/` |
| 11 | `docs/WHY.md` | oddkit-docs | `docs/oddkit/` |
| 12 | `docs/concept.md` | history | `docs/history/` |
| 13 | `docs/context-packs-and-projection-detail.md` | appendix | `docs/appendices/` |
| 14 | `docs/mode-separated-conversations.md` | appendix | `docs/appendices/` |
| 15 | `docs/synthesis-ledger.md` | appendix | `docs/appendices/` |

### Subdirectory misplacements (2 moves)

| # | Current Path | Classification | Target |
|---|---|---|---|
| 16 | `docs/appendices/memory-architecture.proposed.md` | plan | `docs/plans/` |
| 17 | `docs/appendices/repo-truth-audit.md` | audit | `docs/audits/` |

---

## canon/ — Files Needing Relocation (34 files)

### Root-level canon/ → constraints/ (5 moves)

| # | Current Path | Target | Notes |
|---|---|---|---|
| 1 | `canon/decision-rules.md` | `canon/constraints/decision-rules.md` | Has MUST/MUST NOT statements |
| 2 | `canon/definition-of-done.md` | `canon/constraints/definition-of-done.md` | 6 MUST statements |
| 3 | `canon/epistemic-challenge.md` | `canon/constraints/epistemic-challenge.md` | 6 MUST statements defining governance |
| 4 | `canon/verification-and-evidence.md` | `canon/constraints/verification-and-evidence.md` | Core constraint: "Claims are untrusted" |
| 5 | `canon/visual-proof.md` | `canon/constraints/visual-proof.md` | 6 MUST statements, specializes verification |

### Root-level canon/ → definitions/ (2 moves)

| # | Current Path | Target | Notes |
|---|---|---|---|
| 6 | `canon/epistemic-modes.md` | `canon/definitions/epistemic-modes.md` | Defines 3 formal epistemic modes |
| 7 | `canon/epistemic-obligation-and-document-tiers.md` | `canon/definitions/epistemic-obligation-and-document-tiers.md` | Defines the tier system |

### Root-level canon/ → methods/ (3 moves)

| # | Current Path | Target | Notes |
|---|---|---|---|
| 8 | `canon/epistemic-surface-extraction.md` | `canon/methods/epistemic-surface-extraction.md` | ESE is a repeatable protocol |
| 9 | `canon/self-audit.md` | `canon/methods/self-audit.md` | execution_posture: operational |
| 10 | `canon/weighted-relevance-and-arbitration.md` | `canon/methods/weighted-relevance-and-arbitration.md` | Durable application pattern |

### Root-level canon/ → diagnostics/ (1 move)

| # | Current Path | Target | Notes |
|---|---|---|---|
| 11 | `canon/epistemic-hygiene.md` | `canon/diagnostics/epistemic-hygiene.md` | Defines decay signals |

### Root-level canon/ → meta/ (2 moves)

| # | Current Path | Target | Notes |
|---|---|---|---|
| 12 | `canon/TEMPLATE.md` | `canon/meta/TEMPLATE.md` | Scaffolding, not normative |
| 13 | `canon/completion-report-template.md` | `canon/meta/completion-report-template.md` | Output format template |

### Root-level canon/ — special case (1)

| # | Current Path | Target | Notes |
|---|---|---|---|
| 14 | `canon/constraints.md` | `canon/constraints/README.md` | Promote to constraints index |

### canon/agents/ → docs/ (7 moves — entire directory)

| # | Current Path | Target | Notes |
|---|---|---|---|
| 15 | `canon/agents/odd-scribe.md` | `docs/agents/` | Operational, not normative |
| 16 | `canon/agents/odd-map-navigator.md` | `docs/agents/` | Operational, not normative |
| 17 | `canon/agents/odd-mode-selector.md` | `docs/agents/` | Operational, not normative |
| 18 | `canon/agents/odd-epistemic-guide.md` | `docs/agents/` | Operational, not normative |
| 19 | `canon/agents/odd-implementation-guide.md` | `docs/agents/` | Operational, not normative |
| 20 | `canon/agents/odd-orchestrator.md` | `docs/agents/` | Operational, not normative |
| 21 | `canon/agents/odd-instruction-sync.md` | `docs/agents/` | Operational, not normative |

### canon/documentation/ → dissolved (4 moves)

| # | Current Path | Target | Notes |
|---|---|---|---|
| 22 | `canon/documentation/tier-vs-relevance.md` | `canon/definitions/tier-vs-relevance.md` | Formal vocabulary |
| 23 | `canon/documentation/execution-posture.md` | `canon/definitions/execution-posture.md` | Formal vocabulary |
| 24 | `canon/documentation/slice-contract-sml.md` | `canon/meta/slice-contract-sml.md` | Architecture metadata |
| 25 | `canon/documentation/agent-executable-outline.md` | `canon/meta/agent-executable-outline.md` | Architecture metadata |

### canon/odd/appendices/ → dissolved (1 move)

| # | Current Path | Target | Notes |
|---|---|---|---|
| 26 | `canon/odd/appendices/tool-specialization.md` | `canon/methods/tool-specialization.md` | Durable application pattern |

---

## Peripheral — Files Needing Relocation (4 files)

| # | Current Path | Classification | Target | Notes |
|---|---|---|---|---|
| 1 | `drift-audit/pass-0-classification.md` | audit | `docs/audits/` | Epoch 4 audit; drift-audit/ becomes empty |
| 2 | `apocrypha/fragments/when-arbitration-went-global.md` | apocrypha | `canon/apocrypha/fragments/` | Uses system_first_person voice per CHARTER |
| 3 | `about/home.md` | operational | unclear | URI is `klappy://public/home`, not `klappy://about/`. Functionally a content-config stub |
| 4 | `klappy-dev-book-export.md` | compiled-output | .gitignore or `_compiled/` | 1.1MB generated artifact at repo root |

---

## docs/ — Already Correctly Placed (71 files)

All files in these directories are correctly placed and need no action:

- `docs/decisions/` — 15 decision records + README + TEMPLATE (all correct)
- `docs/appendices/` — 15 of 17 files correct (2 misplaced noted above)
- `docs/agents/` — 11 files (all correct)
- `docs/oddkit/` — 6 files (all correct)
- `docs/orchestrator/` — 5 files (all correct)
- `docs/examples/` — 2 files (all correct)
- `docs/migrations/` — 2 files (all correct)
- `docs/promotions/` — 3 files (all correct)
- `docs/infra/` — 1 file (correct)
- `docs/klappy-dev/` — 3 files (all correct)
- `docs/guiding-artifacts/` — 1 file (correct)
- `docs/retellings/` — 1 file (correct)
- `docs/_incoming/` — 1 file (correct)
- Root indexes/templates: `CONTENT-MAP.md`, `PRD.md`, `README.md`, `TEMPLATE.md`, `TEMPLATE_README.md` (all correct)

## canon/ — Already Correctly Placed (28 files)

- `canon/constraints/` — 6 files (all correct)
- `canon/principles/` — 4 files (all correct)
- `canon/methods/` — 7 files including README (all correct)
- `canon/resonance/` — 6 files including README and TEMPLATE (all correct)
- `canon/decisions/` — 2 files (all correct)
- `canon/defaults/` — 2 files (all correct)
- `canon/definitions/` — 1 file (correct)
- `canon/diagnostics/` — 1 file (correct)
- `canon/meta/` — 1 file (correct)
- `canon/apocrypha/` — 3 files (all correct)
- `canon/README.md` — acceptable at root

## Peripheral — Correctly Placed (20 files)

- `about/` — 5 of 6 files correct (home.md noted above)
- `apocrypha/` — 14 of 15 files correct (when-arbitration-went-global.md noted above)
- `README.md` — repo root, correct

---

## Directories to Dissolve After Migration

| Directory | Reason | Files Move To |
|---|---|---|
| `canon/agents/` | Entirely operational, not normative | `docs/agents/` |
| `canon/documentation/` | Pre-Epoch 4 artifact | `canon/definitions/` and `canon/meta/` |
| `canon/odd/appendices/` | Orphaned single file | `canon/methods/` |
| `drift-audit/` | Single file, belongs in docs/audits | `docs/audits/` |

---

## Recommended Phase 3 Commit Order

Moves should be done in category-pure commits per the migration plan:

1. **canon/ root → canon/constraints/** (6 files including constraints.md → README.md)
2. **canon/ root → canon/definitions/** (2 files)
3. **canon/ root → canon/methods/** (3 files)
4. **canon/ root → canon/diagnostics/** (1 file)
5. **canon/ root → canon/meta/** (2 files)
6. **canon/documentation/ → canon/definitions/ + canon/meta/** (4 files, dissolves directory)
7. **canon/odd/appendices/ → canon/methods/** (1 file, dissolves directory)
8. **canon/agents/ → docs/agents/** (7 files, dissolves directory)
9. **docs/ root → docs/appendices/** (7 files)
10. **docs/ root → docs/agents/** (2 files)
11. **docs/ root → docs/infra/** (2 files)
12. **docs/ root → docs/history/** (2 files)
13. **docs/ root → docs/oddkit/** (1 file)
14. **docs/appendices/ → docs/plans/ + docs/audits/** (2 files)
15. **Peripheral moves** (drift-audit, apocrypha fragment, book export)

Each commit follows the pattern: `move: relocate <description> to Epoch 4 structure`

---

## Related Documents

- `klappy://docs/migrations/epoch4-canon-docs-migration` — the migration plan this inventory supports
- `klappy://docs/_incoming/README` — the temporary intake area
- `klappy://canon/constraints/meaning-must-not-depend-on-path` — the constraint motivating structural clarity
