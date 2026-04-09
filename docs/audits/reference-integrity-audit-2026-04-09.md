---
uri: klappy://docs/audits/reference-integrity-audit-2026-04-09
title: "Reference Integrity Audit — 2026-04-09"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["audit", "reference-integrity", "links", "broken-links"]
---

# Reference Integrity Audit — 2026-04-09

> Full-repo scan of internal markdown links. 85 broken references found, 34 fixed mechanically, 49 classified as intentional or unresolvable.

---

## Summary

| Metric | Count |
|--------|-------|
| Total files scanned | 297 markdown files |
| Total internal links checked | 410 |
| Broken links found | 85 |
| **Fixed mechanically** | **34** |
| Remaining (classified) | 49 |

---

## What Was Fixed (34 fixes across 19 files)

All fixes involve links whose target file was found at a different path — due to files being moved to `docs/archive/`, renamed, or restructured during past epochs.

### Path Migrations — `docs/archive/` restructuring

| File | Old Link | New Link |
|------|----------|----------|
| `canon/resonance/antifragile.md` | `/docs/appendices/ATTEMPTS.md` | `/docs/archive/ATTEMPTS.md` |
| `canon/resonance/sprint.md` | `/docs/appendices/ATTEMPTS.md` | `/docs/archive/ATTEMPTS.md` |
| `docs/archive/PRD.md` | `/docs/appendices/product-lanes.md` | `/docs/archive/product-lanes.md` |
| `docs/archive/PRD.md` | `/docs/appendices/attempt-lifecycle.md` | `/docs/archive/attempt-lifecycle.md` |
| `docs/archive/PRD.md` | `PRD/website/PRD.md` | `products/website/PRD.md` |
| `docs/archive/PRD.md` | `PRD/ai-navigation/PRD.md` | `products/ai-navigation/PRD.md` |
| `docs/archive/PRD.md` | `PRD/PRD_TEMPLATE.md` | `../templates/PRD_TEMPLATE.md` |
| `docs/archive/attempt-lifecycle.md` | `./quantum-development.md` | `/odd/appendices/quantum-development.md` |
| `docs/archive/infra/infra/README.md` | `/docs/CLOUDFLARE_CONFIG.md` | `/docs/archive/CLOUDFLARE_CONFIG.md` |
| `docs/archive/infra/infra/README.md` | `/docs/appendices/compilation-targets.md` | `/docs/archive/compilation-targets.md` |
| `docs/archive/infra/infra/prompts/doc-inclusion-audit/README.md` | `/docs/appendices/compilation-targets.md` | `/docs/archive/compilation-targets.md` |
| `docs/archive/infra/infra/prompts/doc-inclusion-audit/README.md` | `/docs/TRUTH_MAP.md` | `/docs/archive/TRUTH_MAP.md` |
| `docs/archive/klappy-dev/README.md` | `/docs/guiding-artifacts/epoch-4/klappy-dev-poc-prd.md` | `/docs/archive/klappy-dev/guiding-artifacts/klappy-dev-poc-prd.md` |
| `docs/archive/klappy-dev/README.md` | `/docs/klappy-dev/website-closure.md` | `/docs/archive/klappy-dev/website-closure.md` |
| `docs/archive/klappy-dev/README.md` | `/docs/klappy-dev/website-telemetry.md` | `/docs/archive/klappy-dev/website-telemetry.md` |
| `docs/decisions/D0015-lane-prd-structure-alignment.md` | `/docs/appendices/product-lanes.md` | `/docs/archive/product-lanes.md` |
| `odd/cognitive-partitioning.md` | `/docs/appendices/product-lanes.md` | `/docs/archive/product-lanes.md` |

### Method/agent path changes

| File | Old Link | New Link |
|------|----------|----------|
| `canon/apocrypha/artifacts/SURFACE-EXTRACTION.md` | `/canon/epistemic-surface-extraction.md` | `/canon/methods/epistemic-surface-extraction.md` |
| `canon/apocrypha/artifacts/SURFACE-EXTRACTION.md` | `promoted_to: "/canon/epistemic-surface-extraction.md"` | `promoted_to: "/canon/methods/epistemic-surface-extraction.md"` |
| `canon/decisions/decision-record-standard.md` | `/canon/agents/odd-scribe.md` | `/docs/agents/odd-scribe.md` |
| `docs/agent-architecture/sub-agents.md` | `/canon/odd/appendices/tool-specialization.md` | `/canon/methods/tool-specialization.md` |

### Fragment filename prefix corrections

| File | Old Link | New Link |
|------|----------|----------|
| `docs/CONTENT-MAP.md` | `/canon/apocrypha/fragments/when-arbitration-went-global.md` | `/canon/apocrypha/fragments/fragment-06-when-arbitration-went-global.md` |
| `docs/CONTENT-MAP.md` | `/canon/apocrypha/reconstructions/when-arbitration-went-global-recon.md` | `/canon/apocrypha/reconstructions/fragment-06-recon.md` |

### Wrong relative depth

| File | Old Link | New Link |
|------|----------|----------|
| `docs/archive/products/agent-skill/v1.3.1/PRD.md` | `./history/H0007-v1.2.4-champion.md` | `../history/H0007-v1.2.4-champion.md` |
| `docs/archive/products/agent-skill/v1.4/PRD.md` | `./history/H0007-v1.2.4-champion.md` | `../history/H0007-v1.2.4-champion.md` |
| `docs/archive/products/agent-skill/v1.4.1/PRD.md` | `./history/H0007-v1.2.4-champion.md` | `../history/H0007-v1.2.4-champion.md` |
| `docs/archive/products/fluent-mobile/attempts/v0.1/attempt-001/ATTEMPT.md` | `../../PRD.md` | `../../../PRD.md` |

### Missing `.md` extension

| File | Old Link | New Link |
|------|----------|----------|
| `odd/getting-started/odd-agents-and-mcp.md` | `/docs/agents/odd-epistemic-guide` | `/docs/agents/odd-epistemic-guide.md` |

### Links in `odd/appendices/visual-evolution.md`

| Old Link | New Link |
|----------|----------|
| `./product-lanes.md` | `/docs/archive/product-lanes.md` |
| `./attempt-lifecycle.md` | `/docs/archive/attempt-lifecycle.md` |
| `./epochs.md` | `/docs/appendices/epochs.md` |

### `.cursor/plans/` path corrections

| File | Old Link | New Link |
|------|----------|----------|
| `.cursor/plans/prd_v-0.1_attempt_001_05758f4a.plan.md` | `docs/PRD.md` | `../../docs/archive/PRD.md` |
| `.cursor/plans/prd_v-0.1_attempt_001_05758f4a.plan.md` | `projects/repo-as-a-system/BUILD_PROMPT_PHASE1.md` | `../../docs/archive/projects/repo-as-a-system/BUILD_PROMPT_PHASE1.md` |

### Archive project index

| File | Old Link | New Link |
|------|----------|----------|
| `docs/archive/projects/index.md` | `/canon/index.md` | `/canon/README.md` |

---

## Remaining Broken Links (49) — Classified

### Class A: Template Placeholders (6) — Intentional, Do Not Fix

These appear in template files as syntactic examples. They are not real paths.

| File | Link |
|------|------|
| `canon/resonance/TEMPLATE.md` | `/odd/<file>` |
| `canon/resonance/TEMPLATE.md` | `/canon/<file>` |
| `docs/TEMPLATE.md` | `/path/to/doc.md` |
| `docs/TEMPLATE_README.md` | `/path/to/folder/` |
| `docs/TEMPLATE_README.md` | `/path/to/doc.md` |
| `docs/archive/infra/infra/prompts/doc-inclusion-audit/CHECKLIST.md` | `/path/to/doc.md` |

### Class B: Website URL Routes (8) — Intentional, Deployed Site Routes

These use `/page/...` prefixes that are Astro site routes on the deployed site. They are not relative file paths and cannot be resolved in the file system.

| File | Link |
|------|------|
| `writings/from-passive-to-proactive.md` | `/page/writings/learning-in-the-open` (×3) |
| `writings/from-passive-to-proactive.md` | `/page/writings/getting-started-with-odd-and-oddkit` (×2) |
| `writings/getting-started-with-odd-and-oddkit.md` | `/page/writings/the-journey-from-ai-tasks-to-ai-augmented-workflows` (×2) |
| `writings/getting-started-with-odd-and-oddkit.md` | `/page/docs/oddkit/proactive/proactive-bootstrap` |

**Recommendation:** If oddkit or site rendering resolve `/page/...` routes correctly, no fix needed. If link resolution fails in rendered output, consider converting to relative file links like `../the-journey-from-ai-tasks-to-ai-augmented-workflows.md`.

### Class C: Directory Links (2) — Historical / Intentional

| File | Link | Note |
|------|------|------|
| `about/why-this-exists.md` | `/attempts/` | Refers to a directory that no longer exists in this structure |
| `docs/README.md` | `./_incoming/` | Epoch 4 migration intake directory; no longer present |

### Class D: Missing Files — No Discoverable Target (30)

These files do not exist anywhere in the repository and have no clear resolvable target. Fixing them requires either creating the missing files or removing the dead links.

**Template `related.md` stubs (5 links across 4 template files):**

| File | Link |
|------|------|
| `canon/meta/TEMPLATE.md` | `/canon/related.md` |
| `canon/meta/TEMPLATE.md` | `/odd/appendices/related.md` |
| `odd/TEMPLATE.md` | `/odd/appendices/related.md` |
| `odd/appendices/TEMPLATE.md` | `/odd/related.md` |
| `odd/appendices/TEMPLATE.md` | `/odd/appendices/related.md` |

**Intentionally-unwritten fragments (2 links in CONTENT-MAP):**

| File | Link | Note |
|------|------|------|
| `docs/CONTENT-MAP.md` | `/canon/apocrypha/fragments/on-artifacts.md` | Marked *"not yet written"* in CONTENT-MAP |
| `docs/CONTENT-MAP.md` | `/canon/apocrypha/fragments/on-consent-drift.md` | Marked *"not yet written"* in CONTENT-MAP |

**Agent-skill ROADMAP.md (6 links):** Referenced in multiple version PRDs and the history index, never created.

| File | Link |
|------|------|
| `docs/archive/products/agent-skill/PRD.md` | `./ROADMAP.md` |
| `docs/archive/products/agent-skill/history/index.md` | `../ROADMAP.md` |
| `docs/archive/products/agent-skill/v1.3/PRD.md` | `../ROADMAP.md` |
| `docs/archive/products/agent-skill/v1.3.1/PRD.md` | `./ROADMAP.md` |
| `docs/archive/products/agent-skill/v1.4/PRD.md` | `./ROADMAP.md` |
| `docs/archive/products/agent-skill/v1.4.1/PRD.md` | `./ROADMAP.md` |

**Fluent-mobile missing companion files (9 links):** These files were referenced but never committed.

| File | Link |
|------|------|
| `docs/archive/products/fluent-mobile/PRD.md` | `HISTORY.md`, `KICKOFF.md`, `INSTRUCTIONS.md`, `AGENT_RULES.md` |
| `docs/archive/products/fluent-mobile/attempts/v0.1/attempt-001/ATTEMPT.md` | `HYPOTHESES.md` (×2), `PLAN.md`, `../../INSTRUCTIONS.md` |
| `docs/archive/products/fluent-mobile/attempts/v0.2/attempt-001/ATTEMPT.md` | `HYPOTHESES.md` |
| `docs/archive/products/fluent-mobile/attempts/v0.3/attempt-001/ATTEMPT.md` | `HYPOTHESES.md` |

**Missing screenshots (5 links):** Evidence files reference screenshots that were never committed.

| File | Link |
|------|------|
| `docs/archive/products/odd-teaser/attempts/prd-v1.1/_runs/6593bb53/EVIDENCE.md` | `screenshots/initial-state.png`, `ready-to-commit.png`, `commit-options.png`, `artifact-created.png` |
| `docs/archive/products/odd-teaser/attempts/v1.1/attempt-001/evidence/EVIDENCE.md` | `screenshots/01-entry-state.png` |

**Other missing files (3 links):**

| File | Link | Note |
|------|------|------|
| `docs/archive/PRD.md` | `PRD/website/PRD-legacy-v0.3.md` | Legacy PRD version, never committed |
| `docs/decisions/D0015-lane-prd-structure-alignment.md` | `/products/fluent-mobile/HISTORY.md` | HISTORY.md never committed |

### Class E: Stale `.cursor/plans/` Links (3) — Low Priority

These are Cursor IDE plan artifacts with internal relative paths that no longer resolve.

| File | Link | Note |
|------|------|------|
| `.cursor/plans/prd_v0.1_attempt_002_5c644251.plan.md` | `attempts/prd-v0.1/attempt-002/ATTEMPT.md` | Attempt directory never committed |
| `.cursor/plans/prd_v0.1_attempt_002_5c644251.plan.md` | `attempts/prd-v0.1/attempt-002/META.json` | Attempt directory never committed |
| `.cursor/plans/prd_v0.1_attempt_002_5c644251.plan.md` | `docs/PRD/PRD_v0.1.md` | Early PRD version not present |

---

## Methodology

1. Scanned all `.md` files recursively (excluding `.git/`)
2. Extracted all `[text](url)` and `![alt](url)` patterns via regex
3. Skipped external URLs (`http://`, `https://`), `mailto:`, `klappy://`, `data:`, and pure anchors (`#`)
4. Resolved each relative/absolute path against the source file's directory
5. Checked `Path.exists()` for each resolved target
6. For each broken link: searched the entire repo for files with similar names to find moved targets
7. Applied only fixes where the target file was positively confirmed to exist at the new path

---

## Recommendations

1. **Remove dead links to ROADMAP.md files** — 6 references across agent-skill PRDs. Either create stub ROADMAP files or remove the links.
2. **Remove or replace fluent-mobile companion file links** — HYPOTHESES.md, PLAN.md, KICKOFF.md, INSTRUCTIONS.md, AGENT_RULES.md were never committed. Links should be removed or stubs created.
3. **Commit missing screenshots or remove links** — 5 evidence files reference screenshots that were never committed.
4. **Evaluate `/page/...` route links** — 8 links use deployed site routing that doesn't resolve in the file system. Verify they work correctly on the deployed site.
5. **Create `related.md` stubs** — 5 template files reference a `related.md` convention that was never implemented.
