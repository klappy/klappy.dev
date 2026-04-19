---
uri: oddkit://tools/version
title: "oddkit_version"
audience: operators
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "tool", "epistemics", "version", "maintenance"]
---

# oddkit_version

> Return the current OddKit version and the authoritative baseline target.

## Description

`oddkit_version` reports the running OddKit version (semver) and the baseline URL that OddKit is currently fetching canon from. This is a diagnostic tool — it answers "what version am I talking to?" and "where is it getting its documents?"

The baseline URL indicates the remote source of truth. When OddKit behavior seems unexpected — missing documents, stale content, unfamiliar responses — checking the version and baseline URL is the first diagnostic step. If the baseline URL points to an unexpected branch or repository, that explains the discrepancy.

## When to Use

- Diagnosing unexpected OddKit behavior (missing docs, stale content)
- Verifying which baseline source OddKit is serving from
- Checking version compatibility before relying on specific tool features
- Confirming the MCP server is reachable and responding

## Tool Definition

**Name:** `oddkit_version`

**Description:** Returns oddkit version and the authoritative canon target (commit/mode). Use for diagnostics — verifying which version is running, confirming the baseline source URL, or checking that the MCP server is responding. Lightweight call with no side effects.

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "knowledge_base_url": {
      "type": "string",
      "description": "Optional. GitHub repo URL for canon override. Defaults to the configured baseline."
    }
  },
  "required": []
}
```

### Response Shape

```json
{
  "action": "version",
  "result": {
    "oddkit_version": "string — semver version of the running OddKit instance",
    "baseline_url": "string — URL of the remote baseline OddKit fetches documents from"
  }
}
```

## Behavioral Rules

1. **Returns current version as semver.** The version string follows semantic versioning and identifies the running OddKit instance.
2. **Baseline URL indicates the document source.** This URL is where OddKit fetches canon and baseline documents from. If it points to an unexpected location, document retrieval behavior will differ accordingly.
3. **Lightweight call with no side effects.** Version does not modify state, trigger reindexing, or fetch documents. It reads local configuration only.
4. **Use as a first diagnostic step.** When other OddKit tools return unexpected results, check version and baseline URL before investigating further.

## Canon References

- `klappy://odd/contract` — System contract defines version semantics and baseline resolution
