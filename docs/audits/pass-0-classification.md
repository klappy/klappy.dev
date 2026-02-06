# Pass 0: Legacy Classification Table

**Audit Date:** 2026-01-31 (T+0)
**Epoch:** E0004 (Epistemic Separation Era)
**Baseline:** `d0a45c5` (pre-Epoch 4) → `d306e74` (Epoch 4)

---

## Key Finding: The TEMPLATE Convention

`odd/TEMPLATE.md` explicitly instructs authors to use `audience: canon` for ODD content:

> | `audience` | `canon` | ODD is canon-level content |

This is a **documented convention**, not accidental drift. Under Epoch 4, this creates an open question:

- **Intentional:** ODD content carries canon-level authority within the system
- **Conflation:** Legacy pattern that now claims the wrong layer

**Classification approach:** We classify based on what files *currently claim*, not what they *should* claim. Resolution comes later.

---

## Classification Table

### Files with CORRECT metadata (no action needed)

| File | URI Scheme | Audience | Stability | Notes |
|------|------------|----------|-----------|-------|
| `odd/terminology.md` | `klappy://odd/` | `odd` | evolving | Correctly claims abstract methodology |
| `odd/appendices/progressive-elevation.md` | `klappy://odd/` | `odd` | stable | Correctly claims abstract methodology |
| `odd/constraint/anti-metric-laundering.md` | `klappy://odd/` | `odd` | stable | Correctly claims abstract methodology |
| `odd/constraint/use-only-what-hurts.md` | `klappy://odd/` | `system` | constrained | System constraint, correct classification |
| `odd/contract/epistemic-contract.md` | `odd://` | `odd` | long_lived | Correctly claims ODD + uses pure `odd://` scheme |
| `odd/getting-started/odd-agents-and-mcp.md` | `klappy://odd/` | `odd` | evolving | Correctly claims abstract methodology |
| `odd/README.md` | `klappy://public/` | `public` | semi_stable | Public-facing entry point, correct |

**Action: 1-leave-as-is** (7 files)

---

### Files claiming `audience: canon` while living in `odd/`

These files use the TEMPLATE convention. Under Epoch 4, this may represent:
- Correct: "ODD content is canon-level within this system"
- Drift: "This claims klappy.dev authority it shouldn't"

| File | URI Scheme | Audience | Stability | Actual Role | Action |
|------|------------|----------|-----------|-------------|--------|
| `odd/index.md` | `klappy://odd` | `canon` | stable | Routing/index for ODD section | **TBD** - Is this klappy-specific or abstract? |
| `odd/manifesto.md` | `klappy://odd/` | `canon` | stable | Core ODD philosophy, universal | **2-metadata** - likely should be `audience: odd` |
| `odd/contract.md` | `klappy://odd/` | `canon` | stable | ODD System Contract (version 2.1.0) | **TBD** - Contains klappy-specific paths and lanes |
| `odd/maturity.md` | `klappy://odd/` | `canon` | semi_stable | Project maturity model, universal | **2-metadata** - likely should be `audience: odd` |
| `odd/misuse-patterns.md` | `klappy://odd/` | `canon` | evolving | ODD failure modes, universal | **2-metadata** - likely should be `audience: odd` |
| `odd/orientation-map.md` | `klappy://odd/` | `canon` | semi_stable | Mental model, universal | **2-metadata** - likely should be `audience: odd` |
| `odd/prompt-architecture.md` | `klappy://odd/` | `canon` | semi_stable | Prompt scaling philosophy, universal | **2-metadata** - likely should be `audience: odd` |
| `odd/TEMPLATE.md` | `klappy://odd/` | `canon` | stable | Template that defines the convention | **TBD** - Template itself enforces `audience: canon` |
| `odd/appendices/README.md` | `klappy://odd/` | `canon` | evolving | Appendices index | **2-metadata** - likely should be `audience: odd` |
| `odd/appendices/TEMPLATE.md` | `klappy://odd/` | `canon` | stable | Appendix template | **TBD** - Template file |
| `odd/appendices/alignment-reviews.md` | `klappy://odd/` | `canon` | stable | Drift detection, universal | **2-metadata** - likely should be `audience: odd` |
| `odd/appendices/evolution-not-automation.md` | `klappy://odd/` | `canon` | semi_stable | Philosophy, universal | **2-metadata** - likely should be `audience: odd` |
| `odd/appendices/failure-driven-modularity.md` | `klappy://odd/` | `canon` | stable | Modularity philosophy, universal | **2-metadata** - likely should be `audience: odd` |
| `odd/appendices/media-as-learning-layer.md` | `klappy://odd/` | `canon` | stable | Media philosophy, universal | **2-metadata** - likely should be `audience: odd` |
| `odd/appendices/quantum-development.md` | `klappy://odd/` | `canon` | semi_stable | Uncertainty model, universal | **2-metadata** - likely should be `audience: odd` |
| `odd/appendices/visual-evolution.md` | `klappy://odd/` | `canon` | semi_stable | Visual systems philosophy, universal | **2-metadata** - likely should be `audience: odd` |
| `odd/decisions/README.md` | `klappy://odd/` | `canon` | stable | Decisions index | **2-metadata** - likely should be `audience: odd` |
| `odd/decisions/D0001-three-tier-conceptual-hierarchy.md` | `klappy://odd/` | `canon` | stable | The hierarchy definition itself | **2-metadata** - defines the separation, should be `audience: odd` |

**Action breakdown:**
- **2-metadata** (likely): 14 files
- **TBD** (needs content review): 4 files

---

### Files with other audience values

| File | URI Scheme | Audience | Stability | Actual Role | Action |
|------|------------|----------|-----------|-------------|--------|
| `odd/cognitive-partitioning.md` | `klappy://odd/` | `docs` | evolving | Abstract scaling principle | **2-metadata** - universal principle, not implementation |

**Action: 2-metadata** (1 file)

---

## Summary by Action

| Action | Count | Files |
|--------|-------|-------|
| **1-leave-as-is** | 7 | terminology, progressive-elevation, anti-metric-laundering, use-only-what-hurts, epistemic-contract, odd-agents-and-mcp, README |
| **2-metadata** (likely) | 15 | manifesto, maturity, misuse-patterns, orientation-map, prompt-architecture, appendices/README, alignment-reviews, evolution-not-automation, failure-driven-modularity, media-as-learning-layer, quantum-development, visual-evolution, decisions/README, D0001, cognitive-partitioning |
| **TBD** | 4 | index, contract, TEMPLATE, appendices/TEMPLATE |
| **3-add-pointer** | 0 | — |
| **4-mark-deprecated** | 0 | — |
| **5-quarantine** | 0 | — |

**Total files classified:** 26

---

## URI Scheme Findings

### Count by Scheme

| Scheme | Count | Notes |
|--------|-------|-------|
| `klappy://odd/...` | 24 | Hybrid scheme (klappy instance + ODD namespace) |
| `klappy://public/...` | 1 | Public-facing (README) |
| `odd://...` | 1 | Pure ODD scheme (epistemic-contract) |

### Files by Scheme

**`odd://...` (pure ODD):**
- `odd/contract/epistemic-contract.md` → `odd://contract/epistemic-contract`

**`klappy://odd/...` (hybrid):**
- All other files in `odd/`

### Observation

The `odd://` scheme appears in exactly one file: the Epistemic Contract. This may be intentional (the contract is the most "pure" ODD artifact) or may represent an inconsistency.

**No changes made.**

---

## TBD Files: Why They Need Content Review

### `odd/index.md`
- Contains klappy-specific references ("this repository")
- But also serves as abstract ODD entry point
- Question: Is this the klappy.dev ODD index, or the ODD index that happens to live in klappy.dev?
- **Ruling:** True TBD — requires content judgment after Pass 3

### `odd/contract.md`
- Contains version 2.1.0 with klappy-specific paths (`/products/<lane>/attempts/`)
- References epochs that are klappy-specific (E0001, E0002)
- But the contract structure is meant to be portable
- Question: Should the contract be abstract ODD, or is it inherently instance-specific?
- **Ruling:** True TBD — requires content judgment after Pass 3

### `odd/TEMPLATE.md` and `odd/appendices/TEMPLATE.md`
- These templates **define** the convention that ODD content uses `audience: canon`
- Changing the templates would change the rule itself
- Question: Should the templates be updated to use `audience: odd`, thus changing the convention?
- **Ruling:** TBD (Governance Decision) — encodes a pre-Epoch-4 authority model; changing it alters authorship norms. Do NOT change until after Pass 3.

---

## Governance Ruling (2026-01-31)

### The Core Question Resolved

> Is "canon-level authority" the same thing as "klappy.dev authority"?

**Answer: No.** And it never actually was. But Epoch 4 is the first time the system is capable of saying that cleanly.

### What the TEMPLATE Was Saying

The instruction `audience: canon` meant "this is not app-specific or ephemeral" — a coarse signal, not a precise one.

Epoch 4 introduces a three-layer authority model:

| Layer | What it governs | URI signal |
|-------|-----------------|------------|
| ODD | How judgment works | `odd://` |
| Canon (instance) | How Klappy applies ODD | `klappy://canon/...` |
| Docs / Surfaces | How it's used | `klappy://docs/...` |

Under this model, ODD is authoritative but not instance-canon.

### The TEMPLATE Is Not Wrong

The TEMPLATE is **underspecified**, not wrong. It collapses two meanings of "canon":
- authoritative
- instance-binding

Epoch 4 splits those apart. That's the whole point.

### Decision: Do NOT Change the TEMPLATE Yet

Changing it now would:
- Retroactively rewrite history
- Collapse Pass 0 into mutation
- Preempt Pass 3's epistemic review

The TEMPLATE is evidence of the old mental model. Epoch 4 explicitly says: artifacts are evidence of learning.

### Are These Files "Lying"?

**Precise answer:** They are telling an older truth with insufficient vocabulary.

Epoch 4 gives us the vocabulary. We don't rewrite the past to match it.

---

## What This Classification Does NOT Resolve

Per Pass 0 rules:

> Pass 0 does not attempt to resolve whether a file "should" be ODD or canon — only whether it currently claims the wrong layer.

The 15 files marked **2-metadata (likely)** represent potential drift, not confirmed corrections. The 4 files marked **TBD** require explicit decisions about what klappy.dev's relationship to abstract ODD should be.

These resolutions belong to a future decision, not this audit pass.

### What NOT To Do Next

Per governance ruling (2026-01-31):

- Do NOT "fix the template"
- Do NOT "align everything to `odd://`"
- Do NOT "clean up audience fields"

That urge is exactly how Epoch 3 thinking sneaks back in.

Epoch 4's discipline is: **See clearly first. Decide later.**

URI normalization and TEMPLATE updates are Phase 2 activities, not part of Epoch 4 lock.

---

## Receipts

- [x] 26 files in `odd/` classified
- [x] Each file's URI scheme, audience, and stability recorded
- [x] Action assigned to each file
- [x] TBD files documented with specific questions
- [x] URI Scheme Findings section with counts and file lists
- [x] No changes made

---

## Pass 0 Complete

Classification table is complete. No metadata was changed. No files were moved.

Next: Walk away until Pass 1 (T+24, Feb 1, 2026).
