---
uri: klappy://docs/architecture/epistemic-os-layers
title: "Epistemic OS Layers — How the System's Concerns Separate"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["architecture", "layers", "epistemic-os", "separation-of-concerns", "overview"]
epoch: E0005
date: 2026-02-13
derives_from: "canon/values/axioms.md, canon/values/orientation.md, docs/appendices/repo-topology.md"
complements: "canon/values/shared-values-as-trust-proxy.md, odd/appendices/media-as-learning-layer.md, odd/appendices/cognitive-saturation-threshold.md, docs/evidence/testimony-2026-02-13.md, writings/the-most-expensive-problem.md"
status: final
start_here: true
start_here_order: 4
start_here_label: "How the System Works"
---

# Epistemic OS Layers — How the System's Concerns Separate

> The system operates as four separable layers, each doing one thing well: (1) Values/Trust — shared axioms that bootstrap trust between any combination of participants, (2) Dynamic Context — lightweight indexing that retrieves only what's needed rather than bloating the context window, (3) Alignment — epistemic modes and phase gates that move work from discovery through planning to execution, (4) Generation/Outcomes — evidence-backed production of assets driven by the definition of done. These layers are independently portable: a team can adopt the values layer without the tooling, or use the context layer with their own values. The "Epistemic OS" framing describes how these layers compose, not a monolithic system.

-----

## Summary — Four Layers, Each Independently Useful, Composable by Design

The ecosystem that has grown around ODD — canon, oddkit, epistemic modes, validation — can be understood as four layers with clear separation of concerns. This document maps those layers, identifies what already exists at each tier, and names the interfaces between them. The purpose is orientation: helping teams and contributors understand where a given concern lives, what depends on what, and where the extension points are.

This is not an aspirational architecture. It describes what already exists, organized by the concerns each piece addresses. The "Epistemic OS" label is a framing device for how these layers compose — it does not imply a monolithic system or a traditional operating system. Each layer follows the Unix philosophy: do one thing well, compose with others through clear interfaces.

-----

## Layer 1: Values and Trust — The Kernel

**What it does:** Bootstraps shared identity, axioms, and behavioral expectations between participants. Functions as a trust proxy by making transparency cheaper than concealment.

**What already exists:**

- `canon/values/axioms.md` — Four foundational axioms
- `canon/values/orientation.md` — Identity creed
- `canon/constraints/` — Behavioral boundaries derived from axioms
- `canon/values/shared-values-as-trust-proxy.md` — How shared values produce trust (draft)

**Interface:** Portable markdown documents. No tooling dependency. Can be loaded into any context window, any agent framework, or read by humans directly. The values layer works without any other layer present.

**What makes it a "kernel":** Everything else in the system derives from or is constrained by these values. The dynamic context layer indexes these documents first. The alignment layer's phase gates enforce these values. The generation layer's definition of done traces back to these axioms. Remove this layer and the others become unconstrained procedures — functional but ungrounded.

**Extension point:** Fork the canon. Replace the author's values with your own. The rest of the system continues to function with your values as the new kernel.

-----

## Layer 2: Dynamic Context — The Memory

**What it does:** Provides lightweight, on-demand access to knowledge without requiring it all to be present in the context window. Builds indexes, retrieves relevant documents by search, and manages the tradeoff between context size and information availability.

**What already exists:**

- OddKit MCP server — Catalog, search, get, challenge, orient, preflight, validate
- Local JSON index builder (NPX command for repository-level indexing)
- Cloudflare-deployed dynamic fetcher (remote repository indexing via zip + hash)
- `klappy://`, `oddkit://`, `odd://` URI schemes for canonical addressing

**Interface:** MCP protocol (current bridge), URI-based document retrieval, search queries returning ranked results with snippets.

**Why "dynamic":** Static context packs failed because they were scoped too narrowly to be reusable and too broad to be efficient. The index approach solves this: build once, query dynamically, retrieve only what the current task requires. The context window stays small while the accessible knowledge base stays large.

**Current limitation:** MCP is a bridge technology. The long-term goal is more native model interaction — whether through skills, plugins, or capabilities that don't require an external server to mediate knowledge access. The architecture is designed to survive the transition: the URI scheme and content-addressed hashing work regardless of the transport layer.

**Extension point:** Any repository can be indexed. The system is not limited to ODD canon — project knowledge bases, product documentation, and team-specific learnings all use the same indexing and retrieval infrastructure.

-----

## Layer 3: Alignment — The Scheduler

**What it does:** Manages the epistemic journey from "we don't know what we're building" to "we're ready to build it." Provides phase gates that prevent premature convergence, camping detection to avoid unproductive iteration, and mode-appropriate behaviors for exploration, planning, and execution.

**What already exists:**

- ODD's three epistemic modes: exploration, planning, execution
- Phase gates between modes (orient → gate → transition)
- OddKit's orient, challenge, and gate actions
- `odd/` portable methodology documents
- Canon constraints (definition of done, verification requirements)

**Interface:** Epistemic mode as declared state. OddKit actions that assess readiness and surface unresolved items. Human judgment at gate transitions.

**The alignment function:** This layer ensures that the right questions are being asked at the right time. In exploration, it encourages divergence and surfaces assumptions. In planning, it narrows scope and tests feasibility. In execution, it enforces the definition of done and validates claims against evidence. The values layer tells participants *how to behave*; the alignment layer tells them *where they are in the process*.

**Extension point:** Epistemic modes are structure-agnostic (as of Epoch 5.1). They apply to any kind of work — software development, writing, product planning, research — without assuming a specific methodology like sprints or agile ceremonies.

-----

## Layer 4: Generation and Outcomes — The Output

**What it does:** Produces the actual assets — code, documents, presentations, prototypes, videos, books — driven by the outcomes defined during alignment, constrained by the values layer, and informed by the context layer. This is where claims get tested against reality and the definition of done gets satisfied.

**What already exists:**

- Definition of Done (`canon/constraints/definition-of-done.md`)
- Validation agent patterns (`docs/agents/validation/`)
- Self-audit checklist (`canon/methods/self-audit.md`)
- Writing Canon (`canon/meta/writing-canon.md`) for document deliverables
- OddKit preflight and validate actions

**Interface:** Definition of done as a completable checklist. Validation actions that verify claims against observed evidence. Output artifacts that can be inspected and audited.

**What "outcomes-driven" means here:** The generation layer doesn't just produce output — it produces output that can be verified. Every claim in a generated asset traces back through the alignment layer (was this planned?) to the values layer (does this claim have evidence?). The generation layer is where "A Claim Is a Debt" gets paid.

**Extension point:** The output can be anything AI can generate. The system is not limited to software. Writing, visual assets, data analysis, and any other generative output can be governed by the same values and validated by the same mechanisms.

-----

## How the Layers Compose — Not a Stack, a Set of Constraints

The layer numbering suggests a stack, but the actual relationship is more nuanced. Layer 1 (values) constrains all other layers. Layer 2 (context) serves all other layers. Layer 3 (alignment) gates the transition to Layer 4 (generation). But a team might use Layer 1 + Layer 4 without Layer 2 or 3 — shared values directly constraining output without dynamic context or formal phase gates.

The composability is the point. A solo developer might use all four layers. A writing team might use Layer 1 + Layer 3 + Layer 4 without heavy tooling. A team evaluating ODD might start with Layer 1 alone — just the values — and add layers as constraints surface.

The "Epistemic OS" framing describes how these layers *can* compose into a complete epistemic infrastructure. It does not require that they all be present simultaneously.

-----

## Mapping to Existing Repository Structure

| Layer              | Repository Location                                            | Portability                                                |
|--------------------|----------------------------------------------------------------|------------------------------------------------------------|
| Values/Trust       | `canon/values/`, `canon/constraints/`                          | Fully portable — markdown only, no tooling required        |
| Dynamic Context    | OddKit MCP server, index builders                              | Portable via npm/Cloudflare — requires tooling             |
| Alignment          | `odd/` directory, OddKit orient/gate/challenge                 | Portable — methodology docs are markdown, tooling optional |
| Generation/Outcomes| `canon/constraints/definition-of-done.md`, validation patterns | Portable — constraints are markdown, tooling enhances      |

The three-tier hierarchy (ODD → Canon → Docs) maps across layers: ODD provides the methodology (Layer 3), Canon provides the values and constraints (Layer 1 + Layer 4 requirements), and Docs provide implementation-specific knowledge (Layer 2 content).

-----

## What This Document Is Not

This is not a specification for building an operating system. It is a map of concerns that already exist, organized to make separation of concerns visible. The layers were not designed top-down — they emerged from solving real problems (trust, context bloat, premature convergence, unverified output) and this document names the pattern after the fact.

If the architecture needs to change, the layers should be re-derived from actual constraints, not preserved for structural consistency. Reality is sovereign — including the reality of what the system actually needs.
