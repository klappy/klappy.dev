---
uri: klappy://docs/oddkit/proactive/proactive-search
title: "Proactive Search — Search Before Claiming, Not After Failing"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "oddkit", "search", "proactive", "canon", "epoch-7"]
epoch: E0007
date: 2026-04-03
---

# Proactive Search — Search Before Claiming, Not After Failing

> Search canon before making claims canon might have guidance on. Before answering policy questions, before proposing conventions, before writing documents. The canon exists to prevent reinvention — but only if it is consulted.

---

## Summary — Search Is Prevention, Not Remediation

The passive pattern was to search only when the operator asked or when the agent encountered a known gap. The problem: the agent often didn't know a gap existed. It would propose a convention that canon already defined, draft a document that contradicted existing governance, or answer a question with general knowledge when canon had a specific, grounded answer.

The proactive pattern is to search before claiming. When the agent is about to make a statement that canon might have guidance on — a convention, a constraint, a definition, a prior decision — it searches first. The cost of a search is one API call. The cost of contradicting canon is credibility.

---

## When to Search Proactively

Search before any of these:

- Proposing a naming convention, file structure, or process.
- Answering a question about how something should be done in this system.
- Writing a governance document, decision record, or constraint.
- Making a claim about what the system does or does not support.
- Suggesting a pattern that might already exist in canon.

The test: if the agent's claim would be embarrassing if canon already said the opposite, the agent should have searched first.

---

## What Proactive Search Looks Like

The agent searches with natural language conceptual queries — not keyword-only. It reviews the results. If canon has guidance, the agent uses it and cites it. If canon is silent, the agent proceeds and notes the gap. The agent does not announce every search — it searches silently and incorporates results naturally.

---

## The Passive Pattern This Replaces

Under E0006, search was reactive. The agent waited for the operator to ask "does canon say anything about X?" or searched only after producing a claim that the operator corrected. The canon existed but was consulted after the fact rather than before.

Under E0007, the agent consults canon before the claim, not after the correction.
