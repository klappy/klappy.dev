---
uri: oddkit://tools/telemetry_policy
title: "telemetry_policy"
audience: operators
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "tool", "telemetry", "transparency", "privacy", "governance", "policy"]
epoch: E0008
date: 2026-04-09
derives_from: "canon/constraints/telemetry-governance.md"
complements: "docs/oddkit/tools/telemetry_public.md"
---

# telemetry_policy

> Return the canonical telemetry governance policy — what oddkit tracks, what it excludes, and why. Fetched at runtime from canon, not hardcoded in server logic.

## Description

`telemetry_policy` retrieves the authoritative telemetry governance document (`canon/constraints/telemetry-governance.md`) and returns a structured summary of what the oddkit hosted service tracks, what it excludes, and the principles behind those decisions.

This tool exists so that any consumer can understand the telemetry contract before deciding whether or how to identify themselves. The policy is a canon document — if it changes, the tool's response changes. The server never hardcodes governance.

## When to Use

- Understanding what oddkit tracks before connecting a new client or knowledge base
- Verifying that the telemetry policy matches your privacy requirements
- Explaining to stakeholders what data oddkit collects about their usage
- Checking whether the policy has changed since your last review
- Informing a decision about whether to self-identify via headers or OAuth

## Tool Definition

**Name:** `telemetry_policy`

**Description:** Return oddkit telemetry and sharing policy guidance. Returns what is tracked (structural identifiers: tool names, repo URLs, document paths, timestamps), what is excluded (content, queries, prompts, PII), how consumer identification works, and the transparency principles. Fetched from canonical governance document at runtime.

### Input Schema

```json
{
  "type": "object",
  "properties": {},
  "required": []
}
```

### Response Shape

```json
{
  "action": "telemetry_policy",
  "result": {
    "tracked": "array — list of structural dimensions collected",
    "excluded": "array — list of what is never collected",
    "identification": {
      "phase_1": "string — current identification model (best-effort from headers)",
      "phase_2": "string — future identification model (OAuth for TruthKit)"
    },
    "principles": "array — the three transparency rules",
    "self_report_headers": "object — optional headers consumers can set to identify themselves",
    "governance_uri": "string — klappy://canon/constraints/telemetry-governance",
    "generated_at": "string — ISO timestamp"
  }
}
```

## Behavioral Rules

1. **Fetch from canon, never hardcode.** The policy document is retrieved from the knowledge base at request time. If the governance document is updated, the tool's response reflects the update immediately.
2. **Return structured summary, not raw document.** The tool parses the governance document and returns key facts in a structured format. For the full document, use `oddkit_get` with URI `klappy://canon/constraints/telemetry-governance`.
3. **Include self-report headers.** The response always includes the list of optional headers consumers can set to identify themselves (`x-oddkit-client`, `x-oddkit-agent-name`, etc.) with their purpose and scoring weight.
4. **Side-effect free.** Calling `telemetry_policy` does not itself generate a telemetry data point beyond the standard tool call record. The policy request is tracked the same as any other tool call.
5. **No authentication required.** The policy is public by design. Anyone can query it, whether identified or not.

## Canon References

- [Telemetry Governance](klappy://canon/constraints/telemetry-governance) — The authoritative source document this tool returns
- [telemetry_public](oddkit://tools/telemetry_public) — Query the actual usage data
- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — Governance in documents, enforcement in the server
- [Axiom 4](klappy://canon/values/axioms) — You cannot verify what you did not observe
