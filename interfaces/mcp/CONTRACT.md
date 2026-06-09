---
contract: mcp
version: 0.1.0
status: draft
target_repo: "oddkit"
---

# MCP Contract (mcp@0.1.0)

This contract is intentionally draft.

It defines the future stable surface for exposing:
- canon resources
- manifest resources
- lane-scoped artifacts
via MCP.

This contract is NOT yet enforced.

---

## Scope (Draft)

Potential stable capabilities:

- list resources
- fetch resource by URI
- search content with citations
- retrieve lane PRDs
- retrieve attempt artifacts (sealed only)

---

## Non-Goals (for 0.1.0)

- no guarantee of tool names
- no guarantee of response schema
- no guarantee of authentication model

---

## When this becomes semver-stable

When an external consumer depends on this for more than experiments, we will:
- define exact tools/endpoints
- define response schemas
- publish `mcp@1.0.0`
