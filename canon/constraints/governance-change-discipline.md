---
uri: klappy://canon/constraints/governance-change-discipline
title: "Governance Change Discipline — Versioning, Changelog, Release Notes, and Epoch Bumps for Behavior-Affecting Changes"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "constraints", "governance", "versioning", "changelog", "release-notes", "epoch", "behavior-change", "self-governance"]
epoch: E0008.4
date: 2026-04-21
derives_from: "canon/CHANGELOG.md, canon/principles/ritual-is-a-smell.md, docs/appendices/epoch-7.md"
governs: "Any canon, docs/oddkit/, or odd/ change intended to alter operator or agent behavior"
complements: "canon/CHANGELOG.md, docs/planning/automated-changelog.md, canon/constraints/proactive-frequency-calibration.md"
---

# Governance Change Discipline — Versioning, Changelog, Release Notes, and Epoch Bumps

> Any change intended to impact how operators or agents use the system must carry the structural markers that make the change visible: bumped canon version, appended changelog entry, release notes that frame impact (not inventory), and an epoch bump when the change shifts posture or behavior. Untracked governance changes are governance failures. The system that writes governance must govern its own writing the same way.

---

## Summary — Self-Governance Is Not Optional

The canon already requires version bumps, changelog entries, and epoch annotations for substantive changes. What was missing until now is an explicit constraint that *behavior-affecting* changes — changes that intend to alter how operators or agents use the system — must always carry those markers. The default has been to bump for "big" releases and not bump for "additive" ones. That default is wrong: a small change that recalibrates an existing posture is more impactful than a large release that adds documentation no one will use.

This constraint closes the gap. If a change is shipped because the author intends it to change behavior, it must be tracked. The four required markers are:

1. **Canon version bumped** in `canon/CHANGELOG.md` per the existing pack-level versioning convention.
2. **Changelog entry appended** following the existing format (version, date, summary, sections by impact area).
3. **Release notes written** at `docs/oddkit/release-notes/YYYY-MM-DD-<slug>.md` framing impact by usage, not by file inventory.
4. **Epoch bumped** when the change shifts operator or agent posture, behavior, or the answer to *who initiates*. Annotated in a `docs/appendices/epoch-N.md` file when a new epoch is named.

A change that lacks any of these markers is incomplete and should not merge.

---

## Why This Constraint Exists

This constraint was authored from a near-miss in PR #133 (post-4.7 adaptation suite). That PR shipped a new tier-2 canon constraint, three public writings, an architecture doc, a session ledger, a backlog stub, and release notes — a substantial behavior-affecting release. It almost merged with no version bump, no changelog entry, no epoch annotation. The artifacts were good. The governance around their shipping was absent.

Klappy caught it: *we need governance for writing governance or any changes that intend to impact model usage should be version bumped and/or epoch bumped as well as ensure changelog and release notes are updated.*

That observation is correct and structural. The fix is canon, not a one-time process patch.

---

## What Counts as a Behavior-Affecting Change

A behavior-affecting change is any change to canon, ODD, or `docs/oddkit/` that intends to alter how operators or agents act after the change merges. Concrete examples:

**Always behavior-affecting:**
- New canon constraint that adds, changes, or removes an operating rule.
- Change to an existing constraint that recalibrates frequency, scope, or threshold.
- New canon principle or value, or change to an existing one.
- New epistemic mode, mode rule, or mode discipline.
- New oddkit tool, change to an existing tool's contract, or change to a tool's posture (passive vs. proactive).
- Change to the writing canon, gate criteria, definition of done, or self-audit checklist.
- Public writings that establish or change a public framing the system will be evaluated against.

**Often behavior-affecting (judgment required):**
- Refactor of canon doc structure that changes how documents are read or extracted.
- New diagnostic, audit, or detection pattern.
- New architecture doc that creates a build queue (even if no code lands yet).

**Generally not behavior-affecting:**
- Typo fixes, spelling corrections, tense fixes that do not change meaning.
- Adding cross-references between existing documents.
- Reformatting, whitespace cleanup, frontmatter normalization.
- Internal session ledgers that record what happened without changing what should happen next.

When in doubt, treat the change as behavior-affecting. The cost of an unnecessary version bump is trivial. The cost of an unmarked behavior change is invisibility, which compounds across releases.

---

## The Four Required Markers

### Marker 1 — Canon Version Bumped

The canon uses pack-level versioning (one number for the whole canon pack). The convention from `canon/CHANGELOG.md`:

- **Patch bump (0.X.Y → 0.X.Y+1)** for fixes, clarifications, and minor refinements that do not change behavior. Rare for canon; mostly used for typos or formatting fixes shipped between minor releases.
- **Minor bump (0.X.Y → 0.X+1.0)** for additive behavior-affecting changes: new constraints, new principles, new modes, new tools, new public writings.
- **Major bump (0.X → 1.0+ or 1.X → 2.0+)** is reserved. Canon is currently 0.x; major-version semantics will be defined when the project graduates from exploration to production maturity (see `odd/maturity.md`).

The version is bumped in `canon/CHANGELOG.md` as the first action of the release commit, not the last. This makes the bump visible during review.

### Marker 2 — Changelog Entry Appended

Every version bump requires a changelog entry following the existing format:

```
## X.Y.Z — YYYY-MM-DD

**Title — One-Line Summary of the Release**

One- or two-paragraph description of what changed and why.

### Added — <section>

- **Item Name** (`path/to/file.md`) — Tier, voice, stability. One-sentence description.

### Changed — <section>

- **Item Name** (`path/to/file.md`) — One-sentence description of what changed.
```

Sections (`Added — Canon`, `Added — Writings`, `Changed`, etc.) follow the established convention. The entry goes at the top of `canon/CHANGELOG.md` directly under the title and intro, not the bottom.

### Marker 3 — Release Notes Written

Release notes live at `docs/oddkit/release-notes/YYYY-MM-DD-<slug>.md` and answer **what changes after merge**, not *what is in the PR*. The first release notes document establishing this pattern is `docs/oddkit/release-notes/2026-04-20-post-4-7-adaptation.md`. Future release notes follow its structure:

- One-sentence impact per artifact at the top.
- Per-behavior-change section with success and failure indicators.
- Lineage and forward references.
- Reading guidance for different audiences (operators, maintainers, etc.).

Release notes are required for any minor or major version bump. Patch bumps may use the changelog entry alone.

### Marker 4 — Epoch Bumped When Posture Changes

The epoch number changes when the *posture* of the system changes — when the answer to *who initiates*, *what the system assumes about the operator*, or *what failure modes are now recognized* shifts. Sub-epoch numbers (E0008.1, E0008.2, etc.) are used for substantive sub-themes within an active epoch.

Epoch bumps require a new file at `docs/appendices/epoch-N.md` (or `epoch-N-M.md` for sub-epochs) following the format established in `docs/appendices/epoch-7.md`:

- **Forcing fault**: the failure pattern that made the prior posture insufficient.
- **New invariant**: the posture rule that now holds.
- **Core shift**: one sentence naming what changed about who initiates or what is recognized.
- **Documents introduced**: list of canon, docs, or writings the epoch establishes.

Existing artifacts get their `epoch:` frontmatter updated to the new epoch when they are part of the epoch's bundle. Artifacts authored after the epoch is named carry the new epoch tag from creation.

---

## What This Means For Future Releases

**Before any PR that touches canon, ODD, or `docs/oddkit/` is opened:**

1. Determine whether the change is behavior-affecting. If in doubt, treat it as behavior-affecting.
2. If behavior-affecting:
   - Add a changelog entry to `canon/CHANGELOG.md` with the next version number.
   - Write release notes at `docs/oddkit/release-notes/YYYY-MM-DD-<slug>.md`.
   - Decide whether the change shifts posture enough to warrant an epoch bump.
3. If an epoch bump is warranted:
   - Author `docs/appendices/epoch-N.md` (or `epoch-N-M.md` for sub-epoch).
   - Update `epoch:` frontmatter on the artifacts in the bundle.
4. The PR description must surface the version and epoch up front so reviewers can verify the markers were applied.

**During review:**

- Reviewers check that the four markers are present and accurate before approving.
- Bugbot, the Sonnet validator agent, and any future non-diff review surface check for these markers as part of governance compliance.

**After merge:**

- The release notes become the canonical answer to "what changed in this release." Future operators searching the canon find them via `oddkit_search`.
- The epoch appendix becomes the canonical answer to "what shift this epoch represents."

---

## Failure Modes

### Failure Mode 1 — Behavior Change Shipped Without Markers

**Symptom:** A PR adds a new constraint, principle, or mode, but no version bump, no changelog entry, no release notes, no epoch consideration. The PR description describes file inventory rather than impact.

**Diagnosis:** The author treated the change as additive documentation rather than as a behavior-affecting release.

**Correction:** Add the four markers before merge. If discovered after merge, append the markers in a follow-up PR within the same epoch and note the gap in the next release notes.

### Failure Mode 2 — Version Bumped Without Changelog or Release Notes

**Symptom:** `canon/CHANGELOG.md` shows a new version line but no entry detail, or entry detail without corresponding release notes.

**Diagnosis:** The author treated the bump as a formality rather than a change-tracking requirement.

**Correction:** Backfill the missing markers. The version bump is not complete until all four markers are present.

### Failure Mode 3 — Epoch Bumped Silently

**Symptom:** Artifacts start carrying a new `epoch:` value without a corresponding `docs/appendices/epoch-N.md` file.

**Diagnosis:** The author named a new epoch in artifact frontmatter but did not establish what the epoch represents.

**Correction:** Author the epoch appendix or revert the epoch tag to the previous value. An unnamed epoch is worse than no epoch.

### Failure Mode 4 — Release Notes Frame Inventory, Not Impact

**Symptom:** Release notes describe what files were added and what they contain, in the same form the PR description already does. No section answers "what changes after merge."

**Diagnosis:** The author wrote release notes as a deliverable to check off, not as a usage-impact framing.

**Correction:** Rewrite to lead with one-sentence impact per artifact, behavior changes with success and failure indicators, lineage, and reading guidance per audience.

---

## Validation Criteria

This constraint is working when:

1. Every canon, ODD, or `docs/oddkit/` PR with behavior-affecting changes carries the four markers before merge.
2. Reviewers can determine the impact of a release from the PR description and release notes alone, without reading every artifact.
3. Future operators searching the canon for "what changed in epoch N" find an authored appendix.
4. The changelog and release notes together form a usable history of how the system has evolved.

This constraint has failed when:

1. PRs ship behavior-affecting changes without the markers and reviewers do not catch the omission.
2. Release notes become file-inventory documents indistinguishable from PR descriptions.
3. The epoch number drifts in artifact frontmatter without corresponding appendices.
4. The changelog falls behind the actual canon state.

---

## Lineage

This constraint is itself a behavior-affecting change. It carries its own four markers:

- **Version bump:** Canon 0.34.0 → 0.35.0 (this PR).
- **Changelog entry:** Added in this PR (see `canon/CHANGELOG.md`).
- **Release notes:** `docs/oddkit/release-notes/2026-04-20-post-4-7-adaptation.md` (added earlier in this PR; updated to reflect this constraint and the epoch bump).
- **Epoch bump:** E0008.3 → E0008.4 (Operator-Attention Calibration). Appendix at `docs/appendices/epoch-8-4.md` (this PR).

The constraint dogfoods itself. If shipping it without applying it would have been the failure mode the constraint exists to prevent.

---

## Why This Belongs in Canon, Not in a Process Doc

A process doc would be a checklist that authors are expected to remember. The proactive posture canon (`docs/oddkit/proactive/`) and the ritual-is-a-smell principle both establish that *correctness depending on humans remembering a procedure* is itself a smell. A self-governance rule that lived only in process would violate the principles it is meant to uphold.

Putting governance change discipline in canon means it is searchable by `oddkit_search`, surfaceable by `oddkit_preflight`, and enforceable by validate, gate, and challenge. Future agents reading canon before authoring a behavior change will find this constraint and apply it. Future PRs missing the markers will be caught by review surfaces that are aware of the constraint.

The constraint is the guardrail, not the checklist.
