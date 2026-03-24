---
uri: klappy://odd/ledger/2026-03-21-drift-audit-session
title: "Session Ledger — Drift Audit, Supersession Method, and Learning in Public"
type: ledger
audience: internal
exposure: internal
epoch: E0006
date: 2026-03-21
session_scope: "Governance drift audit → supersession method → projection inventory → essay"
artifacts_produced:
  - "canon/methods/supersession.md (draft — five-response taxonomy, drift layers, projection constraint)"
  - "Projection inventory (draft — 15 pure projections, 12 hybrids identified)"
  - "writings/learning-in-public.md (draft — essay on vulnerability and building in the open)"
---

# Session Ledger — March 21, 2026

> Drift audit of governance documents → discovered the system lacked a supersession model → designed the five-response taxonomy → discovered that 7 of 12 drift findings were stale projections → realized projections-as-source violates Anti-Cache Lying → drafted the supersession method, projection inventory, and a public essay on learning in the open → discovered during essay drafting that ODD/oddkit recapitulates the buddy system pattern from the author's team leadership era. All of this happened in a single session, in public, as evidence of the process it describes.

-----

## Observations

### O1: Governance drift across three primary surfaces

**What:** Audited Canon README, Constraints README, and ODD README against current system state in E0006. Found 12 drift findings.

**Classification:**
- 4 terminological (lane→work-unit rename not propagated to outlines, operating constraints, verification section, failure modes)
- 3 emphasis (E0006 concepts — Capability Is Not Permission, Scoped Truth — absent from existing governance surfaces)
- 3 structural (precedence hierarchy outdated, lane PRD meta rule still present with stale "under review" note, pack compilation reference to potentially stale doc)
- 2 investigate (seven-pillar confidence framework vs axiom-based governance in Canon README, oddkit's absence from ODD README)

**Canon references:** canon/values/drift.md, canon/methods/weighted-relevance-and-arbitration.md

### O2: The system had no mechanism for baseline-supersedes-baseline

**What:** Existing `applySupersedes.js` only handles local→baseline suppression (branch overrides main). No mechanism exists for graduating a committed document on main when a new committed document supersedes it. The two available responses were overwrite (forced coherence) or archive (hidden history).

**Code references:** oddkit/src/resolve/applySupersedes.js, oddkit/workers/src/orchestrate.ts lines 270-289

### O3: The Cloudflare Worker does not extract stability or superseded_by

**What:** The Worker's frontmatter parser (`zip-baseline-fetcher.ts`) extracts intent, authority_band, exposure, tags, title, URI — but not stability or superseded_by. Even if documents were marked as superseded today, the production search index would ignore it.

**Code reference:** oddkit/workers/src/zip-baseline-fetcher.ts

### O4: Seven of twelve drift findings were stale projections

**What:** The majority of drift findings from O1 were not about authored governance content drifting — they were about navigational surfaces (indexes, outlines, file tables) that didn't update when the documents they reference changed. These are projections committed as source files.

### O5: Sovee reconnection as proximate trigger

**What:** A conversation with a former Sovee developer (~March 15, 2026 — first contact in 10 years since Sovee shut down) resurfaced the buddy system, hiring-for-honesty, and structured vulnerability patterns from the author's team leadership era. These patterns had been dormant and were reactivated by relational reconnection at the exact moment the author was building ODD/oddkit, which recapitulates the same design.

-----

## Learnings

### L1: Forced coherence at scale

The system was young enough during E0002–E0005 that most drift was handled by amending in place. At 400 documents across 6 epochs, in-place amendment produces forced coherence at scale. The forcing fault: you cannot celebrate growth you've overwritten. This is a direct violation of Axiom 3 — integrity requires the provenance of current understanding to be verifiable, and overwriting destroys provenance.

### L2: Hardcoded projections are cached lies

Indexes, READMEs, outlines, and navigational summaries committed as source files are the documentation equivalent of a TTL cache. They serve a past observation as current truth. Anti-Cache Lying (`odd/constraint/anti-cache-lying.md`) already prohibits this for data caching. The same prohibition was never applied to documentation artifacts. This inconsistency is a direct axiom violation (Axiom 1: Reality Is Sovereign).

### L3: The drift audit, the supersession method, and the projection inventory are the content

The process of discovering drift and designing responses IS the content that teaches others how to work with AI-augmented knowledge systems. Hiding the mess and only showing the clean result violates the same integrity principle the supersession method encodes. Writing about what you do is a structural requirement of transparency, not a marketing choice.

### L4: The buddy system maps to ODD/oddkit

**Discovery:** Spontaneous realization during essay drafting. The buddy system the author designed for engineering teams (paired learning, structured vulnerability, permission to not know) is the same pattern encoded in ODD/oddkit at protocol scale.

**The mapping:**
- "Reality Is Sovereign" = share what you actually observed → buddy prompt: what did you work on?
- "A Claim Is a Debt" = show your work → interview question: how do you solve something new?
- "Integrity Is Non-Negotiable Efficiency" = don't pretend you checked → day-one permission: look things up
- "You Cannot Verify What You Did Not Observe" = admit what you haven't looked at → buddy gift: what am I not seeing?
- orient = where am I? → honest session start
- challenge = what might be wrong? → asking for insights
- encode = here's what I decided → sharing what you learned
- preflight = what haven't I checked? → preventing the expensive mistake

The author built this system three times: for himself, for his teams, for human-agent collaboration. The pattern was recognized, not planned.

-----

## Decisions

### D: Graduation vs. Suppression (quality: 4/5)

The system will distinguish two supersession patterns:
1. **Suppression** (existing) — local document overrides baseline, removes it from results. For branch-level development.
2. **Graduation** (new) — committed baseline document supersedes another committed baseline document, deprioritizing but NOT removing the predecessor. For governance evolution.

### D: Five-response taxonomy for drift rectification (quality: 5/5)

Replaces the drift value's amend/acknowledge/investigate with a richer taxonomy:
1. **Tolerate** — drift noticed, deliberately left. Not neglect.
2. **Observe** — record in ledger, defer action. Wait for pain.
3. **Graduate** — full supersession with bidirectional pointers and OLDC record. For authored governance.
4. **Replace** — update in place, old version goes away. For derived documents (indexes, READMEs).
5. **Regenerate** — delete stale projection, regenerate from canonical sources with content-hash key.

Source documents graduate. Derived documents get replaced. Projections get regenerated. The distinction drives which response is correct.

Format/shape/style drift CAN trigger graduation when the incompatibility is in content (structure communicates something false) rather than presentation (just looks dated). The test: does the mismatch cause wrong decisions or just look old?

-----

## Constraints

### C: Projections must not be stored as source

Any document whose content is a deterministic function of other canonical sources MUST NOT be hardcoded. It must be generated JIT, stored with content-hash keying, and regenerated when source content changes. This eliminates the most painful class of drift: stale navigational surfaces blocking production with errors that don't matter.

Derives from: odd/constraint/anti-cache-lying.md, canon/values/axioms.md (Axiom 1)

### C: Supersession hangs on Axiom 3 (Integrity)

Hiding where the system was is a shortcut on truth. Shortcuts on truth always cost more than honest unknowns. Superseded documents must remain discoverable as historical evidence.

### C: Supersession must be explicit (existing, reinforced)

Per Weighted Relevance hard constraints: if a document does not declare what it supersedes, it supersedes nothing. Implicit supersession — inferred from content similarity, recency, or scope — is prohibited.

-----

## Handoffs

### Supersession method document

**Path:** `canon/methods/supersession.md`
**Status:** Draft complete, ready for author review on voice/tone
**Contains:** Five-response taxonomy, drift layers with format/shape exception, graduation mechanics (frontmatter convention, oddkit implementation layers), automation paths, OLDC ledger integration, failure modes, constraints
**Next:** Author review → oddkit challenge → commit

### Projection inventory

**Path:** TBD (recommended: `docs/audits/projection-inventory-2026-03-21.md`)
**Status:** Draft complete
**Contains:** 15 pure projections identified, 12 hybrids with embedded projection sections, priority-ordered implementation plan, four generation mechanism options
**Next:** Prioritize top 4 (writings/README, canon/README tables, constraints outline, decisions table) → implement generation

### Learning in Public essay

**Path:** `writings/learning-in-public.md`
**Status:** Draft complete, near-final per author
**Contains:** Personal narrative (1999-present), team leadership patterns, software principles connection, BT parallel, drift audit as lived evidence, buddy-system-to-ODD discovery, Ecclesiastes thesis
**Provenance:** Five oral-first passes, eight OLDC encodes, Sovee reconnection as proximate trigger
**Next:** Author final review → writing canon checklist → oddkit challenge → commit

-----

## Session Metadata

- **Duration:** ~3 hours
- **Starting intent:** Drift audit of klappy.dev governance documents
- **Ending state:** Three draft deliverables + this ledger
- **OLDC encodes during session:** 8 (1 decision 4/5, 1 decision 5/5, 1 constraint 3/5, 2 observations 1-2/5, 2 learnings 2-3/5, 1 insight 3/5)
- **oddkit tools used:** orient (2), search (8), get (12), challenge (3), gate (1), encode (8), preflight (2), validate (1), catalog (1)
- **Canon documents consulted:** drift value, weighted relevance, writing canon, definition of done, axioms, anti-cache-lying, community checking, guide posture, author identity language, epistemic ledger, compiled memory, epistemic OS layers, repo truth audit, lean startup resonance
- **Code examined:** oddkit/src/search/bm25.js, oddkit/src/index/buildIndex.js, oddkit/src/resolve/applySupersedes.js, oddkit/workers/src/bm25.ts, oddkit/workers/src/orchestrate.ts, oddkit/workers/src/zip-baseline-fetcher.ts

-----

## Addendum — Retrospective and Planning (Session Continued)

### O6: The Worker's frontmatter parser is a hardcoded projection

**What:** The Cloudflare Worker cherry-picks 6 fields (title, intent, authority_band, uri, tags, exposure) using targeted regex and discards all other frontmatter. This is the same pattern the supersession method constrains against — a cached assumption about what matters, going stale every time the system needs a new field. The Node CLI stores full frontmatter (buildIndex.js line 122) but the Worker doesn't match.

**Measured:** Total frontmatter across 428 files is ~958KB. Well within Worker limits.

### O7: The essay challenge and pipeline completed

**What:** "Learning in the Open — The Vulnerability That Unlocks Everything Else" went through two challenge passes (5 counter-arguments each, 3 text changes from first, 0 from second), a guide posture Socratic pass, writing canon 7-point gate (all pass), author identity language check (clean), and preflight. Jonathan and Sovee references added pending Jonathan's review. Title changed from "Learning in Public" to "Learning in the Open" per author direction. ETEN Innovation Lab corrected from E10.

### L5: Filtering fields is compounding drift by design

**What:** The author caught that the proposed "add 7 fields to the Worker parser" was itself the pattern we just constrained against — adding specific fields one at a time compounds drift. The fix is to stop filtering entirely and store all frontmatter. This applies the projection constraint to oddkit's own infrastructure.

### D: Stop filtering frontmatter — store all of it (quality: 2/5 — needs rationale strengthened)

Parse and store all YAML frontmatter as a generic object. Scoring reads specific fields from the generic object. New frontmatter fields work automatically without code changes. This eliminates the compounding friction of "someone has to add another regex every time the schema evolves."

### Handoff: Planning doc for drift-centric oddkit improvements

**Path:** `docs/planning/oddkit-full-frontmatter-and-drift-audit.md`
**Status:** Draft complete, commit-ready spec
**Contains:** Three-phase plan — (1) full frontmatter indexing in Worker, (2) oddkit_audit action for automated drift detection, (3) projection tagging and staleness detection
**Dependencies:** Phase 2 depends on Phase 1. Phase 3 content-side (tagging) is parallel with Phase 1.

### Updated Artifacts Produced

| Artifact | Path | Status |
|----------|------|--------|
| Supersession method | `canon/methods/supersession.md` | Draft, ready for review |
| Projection inventory | `docs/audits/projection-inventory-2026-03-21.md` | Draft |
| Session ledger | `odd/ledger/2026-03-21-drift-audit-session.md` | This document |
| Learning in the Open essay | `writings/learning-in-the-open.md` | Near-final, pending Jonathan review |
| Drift/audit planning doc | `docs/planning/oddkit-full-frontmatter-and-drift-audit.md` | Commit-ready spec |

### Updated Session Metadata

- **OLDC encodes during session:** 10 (original 8 + 2 from retrospective)
- **Additional oddkit tools used:** orient (1), challenge (1), encode (1), preflight (1)
- **Additional canon consulted:** anti-cache-lying (revisited), constraint-driven-audits, oddkit_diff implementation doc
- **Additional code examined:** zip-baseline-fetcher.ts frontmatter parser (field inventory), buildIndex.js full frontmatter storage (line 122)

-----

## Addendum — Write Path Breakthrough (March 24, 2026)

### O8: Claude Code mobile timeout failure

**What:** Claude Code on mobile timed out 7+ times attempting to write a single 287-line markdown file from the handoff document. Even after switching from parallel to sequential file writes, every attempt produced "Request timed out." The handoff document was correct — every file embedded, every path specified, metadata production-ready. The last mile failed because the tool couldn't execute it.

**Evidence:** Screenshots IMG_3191 through IMG_3195.

### O9: Claude.ai with computer use succeeded in 3 minutes

**What:** Claude.ai (this session) cloned the repo, created a branch, copied all 5 files (1158 lines) to their target paths, committed with a descriptive message, pushed to GitHub, and created PR #69 with full description — all via bash/git/curl. Total time from "let's push from here" to PR open: ~3 minutes.

**PR:** https://github.com/klappy/klappy.dev/pull/69

### L6: The write path bottleneck was an environment problem, not a tooling problem

**What:** For months, the plan was to build oddkit_write as a custom MCP action using the GitHub Data API with atomic multi-file commits, IndexedDB as local staging, and branch-and-PR workflows. None of that was needed. Claude.ai with computer use already has bash, git, and network access. The correct workflow is plain git: clone, branch, copy, commit, push, create PR. The engineering instinct was to build infrastructure. The correct instinct was to use what already existed. This is Use Only What Hurts applied to itself — we designed the write path planning doc instead of noticing the capability was already present in a different tool.

### L7: Over-engineering credential management is the same pattern

**What:** When asked how to make the PAT durable and secure, three options were proposed: (1) oddkit MCP action with Cloudflare Worker secret, (2) PAT in project instructions, (3) GitHub App with auto-refreshing tokens. The author correctly identified that options 1 and 3 reinvent the over-engineering nightmare that caused the write path bottleneck in the first place. Option 2 — the simplest possible solution — was chosen. A fine-grained PAT scoped to one repo, stored in project instructions, read at session start. No infrastructure. No deployment. No maintenance.

### D: Write path uses plain git + PAT in project instructions

**Decision:** The write path for klappy.dev uses claude.ai computer use with a fine-grained GitHub PAT stored in project instructions. Scoped to klappy/klappy.dev only (contents:write, pull_requests:write). No custom oddkit action, no GitHub App, no Cloudflare Worker proxy.

**Workflow:** Session produces artifacts → clone repo → create branch → copy files → commit → push → create PR via GitHub API → author reviews and merges.

**Alternatives rejected:** (1) oddkit_commit MCP action — over-engineered for a problem plain git solves. (2) GitHub App — justified only for multi-user scenarios. 

**Reversible:** Yes — upgrading to Worker secret or GitHub App later requires no workflow changes, only auth mechanism changes.

### D: Revoke conversation-exposed PAT, create fine-grained replacement

**Decision:** The PAT pasted into this conversation must be revoked immediately. A new fine-grained PAT should be created at https://github.com/settings/personal-access-tokens/new with: repository access limited to klappy/klappy.dev, permissions limited to contents:write and pull_requests:write. The new PAT is stored in project instructions, never in conversation text.

### Final Session Metadata

- **Total OLDC encodes:** 14 (original 10 + 4 from write path breakthrough)
- **Total artifacts committed:** 5 files, 1158 lines, PR #69
- **Write path proven:** claude.ai computer use + git + GitHub API
- **Credential decision:** Fine-grained PAT in project instructions
- **Session span:** March 21–24, 2026


