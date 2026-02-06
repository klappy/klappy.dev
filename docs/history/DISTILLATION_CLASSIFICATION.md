---
uri: klappy://docs/distillation-classification
title: "Canon Distillation Classification"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["docs", "implementation", "distillation", "classification", "archive"]
---

# 📊 Canon Distillation Classification

**Status: COMPLETED (with corrections)**

This document tracks the classification of canon files for the progressive distillation effort.

## Summary of Work Completed

- Classified all 57 canon files as portable or implementation-specific
- Extracted 14 decisions to `/docs/decisions/`
- Extracted 17 appendices to `/docs/appendices/` (originally 18, 1 re-elevated)
- Added progressive distillation structure (Title, Subtitle, Description, Outline, Content) to all files
- Updated cross-references in key canon files
- **Moved ODD to root level**: `/canon/odd/` → `/odd/`
- **Re-elevated `progressive-elevation.md`** back to `/odd/appendices/` (it defines the portability ladder itself)

## Post-Distillation Corrections

| File | Original Classification | Corrected Classification | Reason |
|------|------------------------|-------------------------|--------|
| `progressive-elevation.md` | IMPLEMENTATION | **ODD** | Defines the five-layer portability model - that's universal methodology, not implementation |

## Classification Criteria

**PORTABLE** = Concepts that could apply to any ODD-following repo
- No hardcoded paths or tooling references
- Methodology/philosophy over procedure

**IMPLEMENTATION-SPECIFIC** = Contains this repo's specific implementation details
- Absolute paths (`/products/`, `/docs/PRD.md`, `/infra/`)
- CLI commands (`attempt:register`, `attempt:nuke`)
- Branch names (`prod`, `main`, `attempt/*`)
- Tool-specific config (Cloudflare Pages, git worktrees)
- Lane names (`website`, `ai-navigation`, `agent-skill`)

---

## Canon Root Files (6 files)

| File | Classification | Notes |
|------|---------------|-------|
| `constraints.md` | PORTABLE | Pure methodology |
| `decision-rules.md` | PORTABLE | Pure heuristics |
| `definition-of-done.md` | PORTABLE | Pure methodology |
| `self-audit.md` | PORTABLE | Pure methodology |
| `visual-proof.md` | PORTABLE | Pure methodology |
| `completion-report-template.md` | PORTABLE | Pure template |

---

## Canon ODD Root Files (7 files)

| File | Classification | Notes |
|------|---------------|-------|
| `manifesto.md` | PORTABLE | Pure philosophy |
| `contract.md` | IMPLEMENTATION | Epoch IDs, paths, META.json schema |
| `maturity.md` | PORTABLE | Pure methodology |
| `orientation-map.md` | PORTABLE | Pure mental model |
| `misuse-patterns.md` | PORTABLE | Pure failure modes |
| `prompt-architecture.md` | PORTABLE | Pure methodology |
| `README.md` | STAYS | Index file |

---

## Canon ODD Decisions (15 files)

**ALL DECISIONS → docs/decisions/**

| File | Classification | Notes |
|------|---------------|-------|
| `D0001-prod-branch-is-production.md` | IMPLEMENTATION | Branch names, CLI, Cloudflare |
| `D0002-attempt-provenance-required.md` | IMPLEMENTATION | CLI, META.json, paths |
| `D0003-prd-version-auto-detection.md` | IMPLEMENTATION | Specific paths, CLI |
| `D0004-repo-truth-cleanup-mandatory.md` | IMPLEMENTATION | CLI commands, paths |
| `D0005-nuke-safety-guards.md` | IMPLEMENTATION | CLI, branch names, paths |
| `D0006-dogfooding-requirement.md` | IMPLEMENTATION | klappy.dev specific |
| `D0007-branch-names-are-convenience.md` | IMPLEMENTATION | Cloudflare, META.json |
| `D0008-register-before-nuke.md` | IMPLEMENTATION | CLI commands |
| `D0009-multi-lane-prd-architecture.md` | IMPLEMENTATION | Specific lanes, paths |
| `D0010-canonical-agent-kickoff.md` | IMPLEMENTATION | Specific paths |
| `D0011-odd-contract-2.0.0.md` | IMPLEMENTATION | Epoch IDs, paths |
| `D0012-e0002-transition-interpretation.md` | IMPLEMENTATION | Epoch transitions |
| `D0013-build-output-lane-scoped-dist.md` | IMPLEMENTATION | Specific paths |
| `D0014-e0003-evidence-first-era.md` | IMPLEMENTATION | Cloudflare, evidence URLs |
| `README.md` | STAYS | Index file (will update) |

---

## Canon ODD Appendices (25 files)

| File | Classification | Notes |
|------|---------------|-------|
| `alignment-reviews.md` | PORTABLE | Pure methodology |
| `attempt-lifecycle.md` | IMPLEMENTATION | CLI, paths, META.json |
| `canonical-compression.md` | IMPLEMENTATION | Specific paths |
| `compilation.md` | IMPLEMENTATION | Paths, npm commands |
| `compilation-targets.md` | IMPLEMENTATION | Specific paths |
| `compiled-memory.md` | IMPLEMENTATION | Paths, lanes |
| `deploy-evidence.md` | IMPLEMENTATION | Cloudflare, paths |
| `drift-checks.md` | IMPLEMENTATION | npm commands, contracts |
| `epochs.md` | IMPLEMENTATION | E0003 section is very implementation-specific |
| `evidence.md` | IMPLEMENTATION | Specific path structure |
| `evolution-not-automation.md` | PORTABLE | Pure philosophy |
| `failure-driven-modularity.md` | PORTABLE | Pure methodology |
| `lane-build-layout.md` | IMPLEMENTATION | Cloudflare, lanes |
| `lane-implementation-surfaces.md` | IMPLEMENTATION | Cloudflare, lanes |
| `media-as-learning-layer.md` | PORTABLE | Pure principles |
| `memory-architecture.proposed.md` | IMPLEMENTATION | Folder patterns |
| `online-evidence.md` | IMPLEMENTATION | Cloudflare, paths |
| `product-lanes.md` | IMPLEMENTATION | Specific lanes, paths |
| `progressive-elevation.md` | **ELEVATED TO ODD** | Defines the portability ladder - paths are examples, principle is universal |
| `quantum-development.md` | PORTABLE | Pure methodology |
| `repo-topology.md` | IMPLEMENTATION | All paths |
| `repo-truth.md` | IMPLEMENTATION | CLI, branch names |
| `repo-truth-audit.md` | IMPLEMENTATION | Specific files to read |
| `visual-evolution.md` | PORTABLE | Pure methodology |
| `README.md` | STAYS | Index file (will update) |

---

## Summary

- **PORTABLE (Stay in Canon):** ~18 files
- **IMPLEMENTATION-SPECIFIC (Move to docs/):** ~32 files (14 decisions + 18 appendices)
- **Index files (Stay, update references):** ~4 files

## Extraction Order

1. Move all 14 decisions to `docs/decisions/`
2. Move 18 appendices to `docs/appendices/`
3. Update README indexes in both locations
4. Add progressive distillation structure to all files
