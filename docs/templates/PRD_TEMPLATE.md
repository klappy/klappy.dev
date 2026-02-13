---
uri: klappy://docs/templates/prd-template
title: "PRD Template"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["docs", "prd", "template"]
---

# 📋 PRD Template

> Standard template for Product Requirements Documents.

## Description

This template defines the standard structure for PRDs. PRDs define success criteria, constraints, and definition of done for work. Use this template when creating or revising a PRD for any project.

## Outline

- PRD Identity
- Objective and Success Criteria
- Non-Goals
- Background and Approach
- Phases
- Definition of Done
- Constraints, Risks, Notes
- Attempt Policy

---

Use this template when drafting or revising the active PRD.

Policy: There is exactly one active PRD at any time: `/docs/PRD.md`.
Prior PRDs only exist as frozen artifacts within sealed attempts.

---

## PRD Identity

| Field | Value |
|-------|-------|
| **PRD Version** | vX.Y |
| **Status** | Draft / Active / Superseded |
| **Created** | YYYY-MM-DD |
| **Author** | |
| **Preview Deploy Required** | Yes / No (phase-dependent) |

---

## Objective

_What outcome does this PRD target? One sentence._

---

## Success Criteria

_What must be true for this PRD to be considered successful?_

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

---

## Non-Goals (Anti-Scope)

_What is explicitly NOT part of this PRD?_

- Not: X
- Not: Y
- Not: Z

---

## Background

_Why does this PRD exist? What problem does it solve?_

---

## Approach

_High-level description of how the objective will be achieved._

---

## Phases (if applicable)

| Phase | Scope | Deliverable |
|-------|-------|-------------|
| Phase 1 | | |
| Phase 2 | | |

---

## Definition of Done

_What evidence is required to close an attempt against this PRD?_

- [ ] 
- [ ] 
- [ ] 

---

## Constraints

_What constraints shape this work?_

---

## Risks

_What could go wrong?_

---

## Notes

_Additional context, references, or considerations._

---

## Attempt Policy

**This PRD may be attempted multiple times.**

- Do not extend a failed attempt; start a new attempt folder
- Each attempt is evaluated independently against this PRD
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED

See: OddKit orient/gate for attempt management.
