---
uri: klappy://canon/meta/policies-vs-requirements
title: "Policies vs. Requirements — A Category the Program Has Been Collapsing"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["meta", "policy", "requirements", "steering", "governance"]
derives_from:
  - klappy://canon/meta/writing-canon
status: active
---

# Policies vs. Requirements

> "Policy" has been used to name two different things: durable, slow-changing
> principles (POLICIES) and fast-changing, build-specific functional needs
> (REQUIREMENTS). Collapsing them is a suspected root cause of steering
> failures.

## The Split

- **POLICIES** — principles and abstract guidance. Durable, slow-changing,
  canon-shaped.
- **REQUIREMENTS** — specific functional needs of a build. Fast-changing,
  PRD-shaped.

## Why the Collapse Fails

A requirement written as if it were policy inherits policy's durability
expectations and resists necessary change. A policy written as if it were a
requirement inherits requirements' fast cadence and churns when it should
hold steady.

## What This Does Not Resolve

The exact boundary test for classifying an existing document, and the
migration path for documents currently misfiled, are not defined here. This
document names the split; a follow-on promotion would need to propose the
test and the migration.

## Practical Implication

Mode-output contracts and the PRD gate should each name explicitly which
artifact type — policy or requirement — they are demanding, rather than
leaving "policy" to do double duty.
