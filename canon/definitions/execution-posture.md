---
uri: klappy://canon/documentation/execution-posture
title: "Execution Posture"
audience: canon
exposure: nav
tier: 1
relevance: decision
voice: neutral
stability: stable
tags: ["documentation", "agents", "governance"]
execution_posture: governing
---

# Execution Posture

> How strongly a document is expected to govern behavior.

## Summary

Execution posture declares **how executable a document intends to be**.
It prevents forced structure while still enabling agent usefulness.

Documents should be **as executable as they naturally allow — no more, no less**.

---

## Allowed Values

### `governing`
- Defines constraints, rules, or standards
- Expected to change agent behavior
- High extraction value for context packs

### `operational`
- Guides action without strict enforcement
- Playbooks, workflows, how-tos
- Moderate extraction expectations

### `exploratory`
- Thinking tools, essays, design exploration
- Human-first
- Minimal or no executable structure required

### `routing`
- Indexes, maps, glossaries
- Exists to point, not to govern
- Extraction focuses on links and triggers only

---

## Required Frontmatter Field

```yaml
execution_posture: governing | operational | exploratory | routing
```

---

## Governing Principle

Executable structure is an affordance, not a requirement.

If a section would be forced or misleading, it should be omitted intentionally.

---

## Compiler Expectations
- Governing docs: missing executable sections should WARN
- Operational docs: missing sections may WARN
- Exploratory and routing docs: missing sections are expected

Compilers must never auto-generate content.

---

## Operating Constraints

- MUST declare execution_posture in frontmatter for all documents
- MUST NOT force executable structure on exploratory or routing documents
- MUST NOT auto-generate content to satisfy compiler requirements
- MUST treat executable structure as an affordance, not a requirement
- MUST omit sections deliberately if they would be forced or misleading

---

## Defaults

- When uncertain about posture, start with operational and upgrade to governing based on observed impact
- Governing docs expect most required sections; operational expects a subset
- Exploratory and routing docs may omit executable sections entirely
- Compilers warn but do not block on missing sections

---

## Failure Modes

- **Forced Structure**: Adding sections that don't apply just to satisfy tooling
- **Posture Inflation**: Marking documents as governing when they're actually operational
- **Auto-Generation**: Compilers filling in missing sections with generated content
- **Template Cargo Cult**: Copying section headings without meaningful content
- **Exploratory Suppression**: Forcing executable structure on thinking-tools and essays

---

## Verification

- execution_posture is declared in frontmatter
- Section presence matches declared posture expectations
- Forced or empty sections have been deliberately omitted
- Compilers emit warnings, not errors, for missing sections
- No auto-generated content in executable sections
