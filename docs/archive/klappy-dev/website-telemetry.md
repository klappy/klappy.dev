---
uri: klappy://docs/klappy-dev/website-telemetry
title: "Website Telemetry Specification"
audience: docs
stability: stable
---

# Website Telemetry Specification

This document defines the telemetry rules for the klappy.dev website PoC.

Telemetry measures epistemic motion, not users.

## Allowed Events

The following events are permitted:

| Event | Payload |
|-------|---------|
| ArtifactCreated | { type } |
| ArtifactExported | { count, types } |
| IncisionTriggered | { reason } |
| PrematureExit | { artifact_count } |

## Forbidden Data

The following data MUST NOT be collected:

- Raw text (artifact content, prompts, responses)
- Prompts
- Responses
- Identity (user accounts, names, emails)
- IP addresses
- Browser fingerprinting

## Rationale

This telemetry spec is ODD-safe:

- It captures epistemic motion (what types of artifacts were created, when the system intervened)
- It does not capture content or identity
- It allows understanding system behavior without surveilling users

## Constraint

No additional events may be added without explicit justification that they measure epistemic motion, not user behavior.
