---
uri: klappy://odd/visual-evolution
title: "Visual Evolution"
audience: canon
exposure: nav
tier: 3
voice: neutral
stability: semi_stable
tags: ["odd", "visual", "evolution", "interfaces"]
relevance: supporting
execution_posture: operational
---

# Visual Evolution

> Visual systems evolve independently through versioned interfaces.

## Description

In ODD, visual systems evolve independently from products. Visual consistency is enforced through versioned visual interfaces and evolutionary selection of visual assets, not shared components or frozen style guides. Products consume visual systems as contracts. Visual decisions are explicit, versioned, testable, and replaceable—treated like API decisions. Three layers exist: Visual Interfaces (compatibility contracts, slow, versioned), Visual Assets (generated outputs, disposable), and Visual Attempts (evolutionary exploration, ephemeral). Visual evolution follows the same promotion rules as code. Products declare compatibility; they do not own visuals.

## Outline

- Summary
- The Core Principle
- Visual Layers
- Visual Interfaces
- Visual Assets
- Visual Attempts
- Promotion Model
- Separation from Product Lanes
- Relationship to Evolutionary Development
- Non-Goals
- Related Canon

---

## Content

Visual consistency is not enforced through shared components or frozen style guides.
It is enforced through **versioned visual interfaces** and **evolutionary selection of visual assets**.

Products consume visual systems as contracts.
Visual systems are not embedded inside product PRDs.

---

## The Core Principle

> **Visual consistency is a property of contracts, not code.**

Visual decisions are treated the same way as API decisions:
- Explicit
- Versioned
- Testable
- Replaceable

A product does not "own" its visuals.
It declares compatibility with a visual interface.

---

## Visual Layers

Visual concerns are split into three distinct layers:

| Layer | Purpose | Mutability |
|-------|---------|------------|
| Visual Interfaces | Compatibility contracts | Slow, versioned |
| Visual Assets | Generated outputs | Disposable |
| Visual Attempts | Evolutionary exploration | Ephemeral |

---

## Visual Interfaces

Visual interfaces define **what consumers may rely on**, not how visuals are implemented.

They include:
- Color systems
- Typography systems
- Spacing scales
- Motion primitives
- Iconography rules

Visual interfaces:
- Are versioned using semantic versioning
- Define breaking vs additive changes
- Contain no implementation code
- Are required for product compatibility

Example declaration (in a product PRD):

```markdown
## Visual Interfaces

This product MUST remain compatible with:
- color-system >=1.0.0 <2.0.0
- typography >=1.0.0 <2.0.0
```

---

## Visual Assets

Visual assets are outputs, not sources of truth.

They may include:
- CSS token files
- JSON theme descriptors
- Generated previews
- Screenshots

Rules:
- Assets may be regenerated
- Assets may be deleted
- Assets are always downstream of interfaces
- Assets are never authoritative

---

## Visual Attempts

Visual attempts are bounded experiments that propose changes to a visual interface or generate candidate assets.

They:
- Compete against each other
- Are evaluated on evidence, not taste
- Produce screenshots, recordings, and artifacts
- Do not directly modify products

Only a championed visual attempt may advance an interface version.

---

## Promotion Model

Visual evolution follows the same promotion rules as code:

| Stage | Result |
|-------|--------|
| Attempt | Exploration |
| Evidence | Observable comparison |
| Champion | Selected outcome |
| Promotion | Interface version update |

Products may upgrade visual compatibility only after promotion.

---

## Separation from Product Lanes

Visual evolution MUST NOT be embedded in product PRDs.

Products:
- Declare compatibility
- Consume visual interfaces
- Do not define colors, fonts, or spacing directly

Visual systems:
- Evolve independently
- May be AI-driven
- May change faster than products

This separation prevents visual churn from invalidating product experiments.

---

## Relationship to Evolutionary Development

Visual evolution is an explicit application of evolutionary principles:
- Variation via attempts
- Selection via evidence
- Retention via contracts

Visual systems form their own fitness landscape.
Products adapt to stable interfaces, not raw experimentation.

---

## Non-Goals

Visual Evolution does NOT claim:
- That one global style must exist
- That visuals must be AI-generated
- That products must share identical appearance

It exists to preserve compatibility, comparability, and reversibility.

---

## Related Canon

- [Product Lanes](/docs/archive/product-lanes.md)
- [Attempt Lifecycle](/docs/archive/attempt-lifecycle.md)
- [Interface Contracts](/interfaces/index.md)
- [Epochs](/docs/appendices/epochs.md)
