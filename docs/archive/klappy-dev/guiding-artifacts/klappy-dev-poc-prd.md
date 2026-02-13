---
uri: klappy://docs/guiding-artifacts/epoch-4/klappy-dev-poc-prd
title: "Klappy.dev Website PoC PRD"
audience: docs
stability: guiding_artifact
epoch: E0004-epistemic-separation-era
graduation_path: products/website/ or new lane
---

# Klappy.dev Website — PoC PRD (Epoch 4 Closure)

**Scope:** This document defines only the Klappy.dev website PoC and its adjacent, required documents.

**Excludes:** Oddkit internals, broader canon restructuring, future tooling, or multi-epoch concerns.

---

## 0. Purpose

Klappy.dev is a single-page epistemic experience whose sole purpose is to demonstrate—once—how learning, decisions, and overrides become durable when made visible.

The website is the closure artifact of Epoch 4, not a growth product.

---

## 1. Non-Goals (Hard Exclusions)

The Klappy.dev website must not:

- Authenticate users
- Persist identity
- Teach ODD explicitly
- Execute tasks
- Provide project management
- Optimize retention or engagement
- Become a documentation site

If a feature increases time-on-site without increasing artifact creation, it is invalid.

---

## 2. Target User State (Success Definition)

A first-time visitor leaves after one session having:

1. Externalized at least one epistemic artifact, and
2. Noticed a missing habit in their own workflow (unprompted), and
3. Taken something with them (export or mental transplant)

The site succeeds even if the user never returns.

---

## 3. Core Experience (Website Only)

### 3.1 Interaction Model

- Single-page web app
- Primary surface: conversational input
- Secondary surface: artifact drawer
- No navigation tree
- No menus beyond artifact visibility

Conversation exists only to surface artifacts.

---

## 4. First-Class Artifacts (Website Scope)

The website supports exactly three artifact types:

### Learnings

- Captured explicitly by user
- Free-form text

### Decisions

- Required structure:
  - Decision
  - Reason

### Overrides

- Required structure:
  - Default
  - Override
  - Accepted cost

Artifacts must be visible immediately upon creation.

---

## 5. Functional Requirements

### 5.1 Chat Surface

- Accepts free-form user input
- Allows short system interventions
- Detects verbosity / CST heuristically

The system may interrupt but must not dominate.

### 5.2 Artifact Drawer

- Always reflects current session state
- Shows artifacts in reverse chronological order
- Can be hidden or revealed
- No editing after creation (append-only)

### 5.3 Artifact Creation

Artifacts may be created:

- Via explicit commands (e.g. /learn, /decide, /override)
- Via structured prompts initiated by the system

Implicit inference is forbidden.

### 5.4 Export

- One-click export
- Markdown format
- Contains:
  - Learnings
  - Decisions (with reasons)
  - Overrides (with accepted costs)
- Local only (clipboard or file)

Export is the exit ramp.

---

## 6. State & Persistence

### 6.1 Session State

- Stored locally (browser only)
- Cleared explicitly by user or tab close

### 6.2 No Cross-Session Memory

- Each visit is epistemically fresh
- No continuity implied

---

## 7. Telemetry (Website-Only, ODD-Safe)

### 7.1 Allowed Events

- ArtifactCreated { type }
- ArtifactExported { count, types }
- IncisionTriggered { reason }
- PrematureExit { artifact_count }

### 7.2 Forbidden Data

- Raw text
- Prompts
- Responses
- Identity
- IP or fingerprinting

Telemetry measures epistemic motion, not users.

---

## 8. Visual & UX Constraints

- Minimal
- High contrast
- No branding beyond name
- Visuals must not explain behavior
- Silence is allowed

The UI should feel deliberate, not helpful.

---

## 9. Definition of Done (Website PoC)

The PoC is complete when:

- A user can create each artifact type
- Artifacts are immediately visible
- Artifacts can be exported
- The system can stop interacting without error
- Telemetry events fire correctly

Nothing beyond this is required.

---

## 10. Final Constraint

If someone asks:

> "Should the website also...?"

The default answer is **no**.

If the answer is not clearly justified by artifact creation, the change is rejected.

---

## 11. Closure

Klappy.dev does not scale.

It demonstrates.

When the user leaves with something concrete and the system steps aside,
the website has succeeded.

---

## 12. Graduation

This artifact is a guiding artifact, not a product lane PRD.

When ready to embody this as a product:

1. Create or update a product lane (e.g., `products/website/` or `products/klappy-dev-poc/`)
2. Pull this artifact in as seed PRD
3. Add real functional requirements
4. Make architectural choices
5. Accept maintenance gravity

At that moment, this stops being a demo and becomes a product.
