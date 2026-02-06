---
uri: klappy://canon
title: "Canon"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "index", "orientation"]
relevance: routing
execution_posture: routing
---

# 🧭 Canon

Curated documents that capture how decisions are made, what assumptions are held, how work is verified, and how rigor changes as projects mature.

The Canon exists so that reasoning does not have to be repeated.

---

## 📁 Contents

### Core Documents

| File | Title | Summary | Answers |
|------|-------|---------|---------|
| `epistemic-obligation-and-document-tiers.md` | Epistemic Obligation and Document Tiers | Tiers define epistemic obligation (foundational, shared, awareness), not importance. Orthogonal to folders. | How much must I internalize this? |
| `constraints.md` | Constraints | Baseline assumptions and non-negotiables that shape every decision. | What must be true for this work to make sense? |
| `methods/README.md` | Methods | Durable application patterns that help humans and agents apply principles and satisfy constraints without re-deriving safe practice each time. | How do I apply ODD safely in practice? |
| `decision-rules.md` | Decision Rules | Default heuristics used when multiple valid options exist. | How do choices tend to be made? |
| `definition-of-done.md` | Definition of Done | What qualifies as completed work and what evidence is required. | When can work honestly be called done? |
| `self-audit.md` | Self-Audit Checklist | Review checklist before declaring completion. | What should be reviewed before claiming success? |
| `visual-proof.md` | Visual Proof Standards | What qualifies as acceptable visual evidence. | What does "prove it visually" mean? |
| `completion-report-template.md` | Completion Report Template | Standard format for reporting completed work. | How should completion be communicated? |
| `CHANGELOG.md` | Canon Changelog | Version history of canon changes. | What changed and when? |

### Principles

| File | Title | Summary |
|------|-------|---------|
| `principles/bulldoze-but-keep-the-blueprint.md` | Bulldoze the App, Keep the Blueprint | When code stops being the scarce resource. Documents the cost-model inversion caused by AI: code is disposable, blueprints (intent, constraints, decisions, evidence) are durable. |
| `principles/odds-relationship-to-documentation.md` | Documentation Is the Lever, Not the Goal | Clarifies that documentation in ODD is epistemic infrastructure—a forcing function, not an end state. Distinguishes ODD from documentation-driven development. |

### Subfolders

| Folder | Purpose |
|--------|---------|
| `definitions/` | Shared vocabulary — formal definitions of load-bearing concepts (e.g., CST). |
| `methods/` | Durable application patterns for applying constraints and principles in practice. |
| `principles/` | Canon-level principle articulations grounded in lived evidence. |
| `decisions/` | Canon-level decision records (governance, model boundaries). |
| `resonance/` | External works that converge with ODD — and where ODD explicitly diverges. |
| `meta/` | Metadata and pack configuration. |
| `_compiled/` | Compiled outputs (derived, wipeable). |
| `odd/appendices/` | ODD-derived patterns and invariants. |

### Resonance (External Alignment & Divergence)

| File | Work | ODD Principle |
|------|------|---------------|
| `resonance/antifragile.md` | Antifragile | Systems Should Improve Under Stress |
| `resonance/lean-startup.md` | The Lean Startup | Epistemic Feedback Loops |
| `resonance/ooda-loop.md` | OODA Loop | Orientation Dominates Action |
| `resonance/sprint.md` | Sprint | Constrained Convergence Produces Clarity |

> **Canon Rule:** Every cited work must include at least one explicit divergence.
> If no divergence exists, the citation does not belong.

### ODD Appendices (Patterns)

| File | Title | Summary |
|------|-------|---------|
| `odd/appendices/tool-specialization.md` | Tool Specialization | Preserve reliability as tool availability increases by isolating tool usage behind narrowly scoped reasoning units. |

---

## 🚀 Start Here

1. **`constraints.md`** — What must be true for this work to make sense?
2. **`definition-of-done.md`** — When can work honestly be called done?
3. **`/odd/manifesto.md`** — Why this approach exists.

These three documents anchor everything else.

---

## 📖 Precedence & Interpretation

A useful mental model for reading:

1. ODD Manifesto provides philosophical grounding
2. Maturity Model explains when rigor increases
3. Constraints shape the solution space
4. Decision Rules guide choices
5. Evidence Policies define completion

If documents appear to conflict, maturity context and explicit tradeoffs usually explain why.

---

## 🧠 What the Canon Is (and Is Not)

**The Canon Is:**
- A shared reference
- A source of assumptions and defaults
- A way to encode thinking without enforcing execution

**The Canon Is Not:**
- A workflow
- A command system
- A task list
- A replacement for judgment

Nothing in the Canon executes by itself.

---

## 🔒 Public vs Internal Boundary

- `/odd/README.md` → public-facing ODD (shareable, human-friendly)
- `/canon/**` → internal reference (governance artifacts, precise language)

Public documents explain intent. Canon documents preserve precision.

---

## 📋 Meta Rules

Structural conventions for keeping the Canon coherent over time. These are not workflows or enforcement steps.

**1. Single Inventory Source**
If an inventory of Canon resources exists, there should be one authoritative source (e.g., a manifest). Other indexes should be derived or optional.

**2. Stable Names Beat Clever Names**
Prefer stable file and URI naming over clever branding. Rename rarely.

**3. Audience Separation Matters**
"Public" explains and invites. "Canon" defines and stabilizes.

**4. Voice Is Labeled, Not Transformed**
First-person documents may be consumed as-is or translated by clients. The Canon itself does not require a specific rendering voice.

**5. Multi-Lane PRD Architecture**
PRDs are organized into independent product lanes. Each lane has its own active PRD, attempts, and lifecycle. Lanes share canon, not lifecycle. See `/docs/appendices/product-lanes.md` for the full model.

---

## 🔄 Stability & Change Philosophy

Not all Canon documents are equally stable.

Some are intended to remain largely fixed. Others are expected to evolve through use.

Change is allowed, but should be:
- Intentional
- Versioned (at least informally)
- Documented somewhere discoverable

---

## ⚠️ Confidence & Drift Risk

This section expresses current confidence that the Canon and surrounding architecture align with the core pillars: KISS, DRY, Consistency, Maintainability, Antifragile, Scalable, Prompt-over-Code.

These are not guarantees. They are a snapshot of perceived risk.

**Confidence scale:**
- 0.9+ — robust
- 0.7–0.85 — strong, but watch for drift
- 0.5–0.7 — plausible, fragile under misuse
- <0.5 — likely misaligned unless corrected

**Current scores (v0.1 snapshot):**

| Pillar | Score | Notes |
|--------|-------|-------|
| Prompt-over-Code | 0.80 | Strong fit. Risk: schema sprawl or client-specific conventions. |
| KISS | 0.75 | Minimal primitives. Risk: meta-layer creep. |
| DRY (with isolation) | 0.70 | Canon centralizes principles. Risk: duplicate indices drifting. |
| Consistency | 0.65 | URI/metadata structure supports it. Risk: naming drift. |
| Maintainability | 0.70 | Stable worldview vs evolving templates. Risk: manual updates out of sync. |
| Antifragile | 0.60 | Recoverable if served statically. Risk: hidden single points of failure. |
| Scalable | 0.70 | Schema supports growth. Risk: large manifests becoming brittle. |

---

## 🚫 What Is Intentionally Undefined

The Canon deliberately does not define:
- Specific tools
- Specific agents
- Specific workflows
- Specific automation loops

These are left open to evolve without rewriting foundational thinking.

---

## 📦 For Pack Compilation

When building a guide pack, include:
- This README for orientation
- Specific documents needed for the pack's purpose
- Subfolder READMEs for scannable summaries without including all files

See `/docs/appendices/compilation.md` for the compilation model.

---

## 🔗 See Also

- [ODD (Universal Principles)](/odd/README.md) — Timeless methodology that Canon derives from
- [Implementation Docs](/docs/README.md) — How klappy.dev implements Canon
- [Three-Tier Hierarchy](/odd/decisions/D0001-three-tier-conceptual-hierarchy.md) — Why ODD, Canon, and Docs are separate

---

## ✅ Status

- Canon Index v0.1 complete
- Orientation-only
- Includes confidence and drift snapshot

This Canon v0.1 is considered stable for initial builds. Revisions should be additive unless a documented failure requires change.
