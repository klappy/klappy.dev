---
uri: klappy://docs/orchestrator/epistemic-challenge
title: "Epistemic Challenge"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["orchestrator", "validation", "librarian", "challenge", "workflow"]
status: conceptual-origin
---

# Epistemic Challenge

> **Conceptual Origin Note (E0005.1):** This document describes the conceptual design that informed OddKit's `oddkit_challenge` tool. For current operational usage, use OddKit directly. This document is preserved as architectural rationale.

> The practical playbook for applying epistemic challenge without breaking collaboration.

## Description

This document operationalizes Canon doctrine `klappy://canon/epistemic-challenge` for orchestrator-style agents and CLI tools (e.g., oddkit).

It describes:

- when to trigger challenge mode (smell-based)
- which subagent/tool should handle the moment (librarian vs validation)
- how to phrase challenge so it improves outcomes without stalling work

This is **how** to do it, not **why** it exists.

## Trigger Signals

Trigger "challenge mode" when one or more signals are present:

### Evidence signals

- "done" / "fixed" / "implemented" without artifacts
- citations present but quotes don't overlap query intent
- claims exceed evidence strength (big claim, small proof)

### Scope signals

- solution proposed before scoping (attempt/feature/PRD version/repo)
- major structure introduced without a named pain ("use-only-what-hurts" violation)
- mixing decisions across incompatible scopes (different PRDs, different lanes)

### Intent signals

- workaround phrased as promoted rule
- exploratory note treated as governing policy
- policy question answered from non-governing sources

### Arbitration signals

- contradictions exposed by arbitration output
- low-confidence margin between top candidates
- excessive duplicates (index hygiene smell)

## Routing: Who handles the moment?

### Librarian (lookup + receipts)

Use when the user asks "what is the rule / where is it / what does Canon say".

Output must:

- quote and cite sources
- prefer governing docs for policy intent
- expose drift/collisions (URI_DRIFT vs URI_COLLISION) rather than hiding it

### Validation (claims-to-evidence)

Use when someone says they shipped something or asserts completion.

Output must:

- parse claims
- map claims → required evidence
- detect provided artifacts
- return PASS | NEEDS_ARTIFACTS | FAIL | CLARIFY with next-step checklist

### Promotions (learning memory)

Use when the same failure pattern repeats and validation repeatedly blocks it.

Output must:

- record evidence from ≥2 independent validations
- propose Canon change without auto-mutation
- link back to artifacts and transcripts

## Response Form: Constructive Challenge Template

When challenging, follow this order:

1. **Name the object**

- "I'm challenging the claim that X is complete."

2. **Name the trigger**

- "Trigger: missing artifact / scope mismatch / weak evidence / contradiction."

3. **Request the cheapest proof**

- "Smallest artifact that raises confidence: [screenshot | test output | path | excerpt]."

4. **Offer a path forward**

- "If you provide Y, I can validate. If not, we should mark this as advisory."

## What Not To Do

- Don't invent counterclaims ("maybe it fails")—ask for evidence instead.
- Don't block if a cheap artifact would resolve uncertainty.
- Don't re-litigate settled policy—retrieve and cite the governing doc.
- Don't smooth contradictions—surface them and choose an outcome.

## Canon Links

- Governing doctrine: `klappy://canon/epistemic-challenge`
- Smell triggers: `klappy://canon/epistemic-hygiene`
- Conflict handling: `klappy://canon/weighted-relevance-and-arbitration`
