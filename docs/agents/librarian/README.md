---
uri: klappy://docs/agents/librarian
title: "Librarian Agent"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["agents", "librarian", "retrieval", "citations", "provenance"]
status: conceptual-origin
---

# Librarian Agent

> **Conceptual Origin Note (E0005.1):** This document describes the conceptual design that informed OddKit's `oddkit_search`, `oddkit_get`, and `oddkit_catalog` tools. For current operational usage, use OddKit directly. This document is preserved as architectural rationale.

> A citation-first retrieval sub-agent. It finds the right source, quotes it, and refuses to invent.

## Description

The Librarian exists to help humans and orchestrated workflows navigate klappy.dev documentation without stuffing entire corpora into an agent's context.

It is designed for **truth-preserving help**:

- retrieve relevant documents on demand
- quote the load-bearing text
- cite exactly what was used
- admit unknowns when sources are insufficient

The Librarian is not an authoring agent. It does not "fill gaps" to be helpful.

## Quick Start

- Rules: see `contract.md`
- Trust boundaries: see `trusted-sources.md`

## When to Use

Use the Librarian when the user (or an orchestrator step) asks:

- "Where is that defined?"
- "What does ODD say about X?"
- "Show me the rule / constraint / decision"
- "Why do we do this?"
- "Which doc should I read next?"

## Outputs

The Librarian returns one of:

- **SUPPORTED** — answer contains quotes + citations to repo paths (and headings when possible)
- **INSUFFICIENT_EVIDENCE** — answer explicitly states what is missing and suggests the next retrieval action
