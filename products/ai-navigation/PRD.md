# PRD: AI Navigation Interface

| Field           | Value            |
|-----------------|------------------|
| **PRD Version** | v1.0             |
| **Lane**        | ai-navigation    |
| **Status**      | Active           |
| **Created**     | 2026-01-17       |
| **Author**      | Chris Klapp      |

---

## Interface Contracts

This lane MUST remain compatible with:

- manifest >=2.0.0 <3.0.0
- build-output >=3.0.0 <4.0.0
- attempt-cli >=2.0.0 <3.0.0

If MCP is used, it is currently draft (`mcp@0.1.x`) and MUST be treated as unstable.

---

## Objective

Enable humans to ask questions of the ODD corpus and be:

- Answered accurately
- Guided progressively
- Linked to the right documents
- Without reading everything

---

## Background

This is an AI layer over the documentation.

It helps humans understand ODD through conversation.

This is NOT agent tooling.
This is NOT teaching agents to execute ODD.
This is AI helping humans navigate and understand.

---

## Core Capability

- Load all site content + Medium articles into retrievable context
- Answer questions conversationally
- Navigate users to relevant docs
- Respect progressive disclosure tiers

---

## In Scope

- RAG over markdown content
- Citation + linking to canon/docs
- Progressive depth control ("go deeper", "show sources")
- Conversational Q&A interface
- Eventually voice (explicitly deferred to future version)

---

## Explicitly Out of Scope

- Teaching agents how to execute ODD (belongs to agent-skill lane)
- Modifying the canon
- Running attempts
- Enforcing process
- Website UI/UX concerns (belongs to website lane)

---

## Success Criteria

- [ ] User can ask "What is ODD?" and get a correct summary + links
- [ ] Follow-up questions narrow scope instead of expanding noise
- [ ] Responses always cite source docs
- [ ] No hallucinated concepts outside corpus
- [ ] Progressive disclosure respected (Tier 0 answers don't dump Tier 2 content)

---

## Definition of Done

An attempt against this PRD is complete when:

- [ ] RAG retrieval working over canon + docs
- [ ] Test questions answered correctly with citations
- [ ] Hallucination check passed (no invented concepts)
- [ ] Progressive depth demonstrated (follow-up narrows, doesn't explode)
- [ ] Self-audit completed with explicit tradeoffs

---

## Primary User

Humans trying to understand and evaluate ODD.

---

## Constraints

This PRD is shaped by Canon constraints:

- Evidence over assertion
- AI as accelerator, not authority
- Grounding required (no unmoored responses)
- Maintainability over cleverness

---

## Attempt Policy

This PRD may be attempted multiple times.

- Each attempt is evaluated independently
- Failed attempts inform future attempts or PRD revisions
- Attempts are sealed when CLOSED or ABANDONED

Attempts live at: `/attempts/ai-navigation/prd-v1.0/attempt-NNN/`

---

## Related Documents

- Lane architecture: `/docs/appendices/product-lanes.md`
- Canon constraints: `/canon/constraints/README.md`
- Definition of Done: `/canon/constraints/definition-of-done.md`
