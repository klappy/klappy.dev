---
uri: oddkit://tools/telemetry_public
title: "telemetry_public"
audience: operators
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "tool", "telemetry", "transparency", "leaderboard", "analytics"]
epoch: E0008
date: 2026-04-09
derives_from: "canon/constraints/telemetry-governance.md"
complements: "docs/oddkit/tools/telemetry_policy.md"
---

# telemetry_public

> Query the same usage dashboard the maintainer sees. Consumer leaderboard, tool leaderboard, canon URL leaderboard, document leaderboard, daily trends. No information asymmetry between host and user.

## Description

`telemetry_public` exposes oddkit's usage telemetry to any consumer — the same data the maintainer uses to make prioritization decisions. It queries Cloudflare Workers Analytics Engine via SQL and returns aggregated structural metrics: which tools are called, which repos are served, which consumers are active, and when usage happens.

This tool answers the question "who's using oddkit and how?" without revealing what anyone searched for, what documents contained, or what models responded. The data is structural — shapes and counts, not substance.

## When to Use

- Understanding how oddkit is being used across the community
- Checking whether your consumer label appears on the leaderboard
- Verifying that telemetry is working after setup or configuration changes
- Investigating usage spikes or trends
- Comparing tool popularity to inform contribution or feature requests

## Tool Definition

**Name:** `telemetry_public`

**Description:** Returns public telemetry disclosures and usage leaderboards for the oddkit hosted service. Shows the same data the maintainer sees — consumer leaderboard, tool usage, canon URL distribution, document access patterns, and daily trends. No information asymmetry.

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "period": {
      "type": "string",
      "enum": ["7d", "30d", "all"],
      "description": "Optional. Time period for the query. Defaults to '30d'."
    },
    "query_type": {
      "type": "string",
      "enum": ["summary", "tools", "consumers", "canon_urls", "documents", "daily_trend"],
      "description": "Optional. Which leaderboard or metric to return. Defaults to 'summary'."
    }
  },
  "required": []
}
```

### Response Shape

```json
{
  "action": "telemetry_public",
  "result": {
    "period": "string — the time period queried",
    "query_type": "string — which metric was returned",
    "data": "object — query-specific result (leaderboard array, summary object, or trend array)",
    "generated_at": "string — ISO timestamp of query execution"
  }
}
```

### Query Types

**summary** — Total requests and tool calls for the period, with breakdown by method.

**tools** — Tool leaderboard: which epistemic actions are called, ranked by frequency. Answers "is `gate` changing how people work, or is everyone just using `search`?"

**consumers** — Consumer leaderboard: unique consumer labels with request counts and completeness scores. Answers "how many people are using oddkit?"

**canon_urls** — Canon URL leaderboard: which repos are being served. Answers "has anyone pointed oddkit at a knowledge base that isn't the maintainer's?" This is the primary adoption signal.

**documents** — Document leaderboard: most accessed document URIs (from `get` calls). Answers "which canon documents actually matter?"

**daily_trend** — Daily request counts over the period. Answers "what caused the spike?"

## Behavioral Rules

1. **Return aggregated metrics, never raw events.** Individual request details are not exposed — only counts, rankings, and trends.
2. **The data is the same data the maintainer sees.** There is no privileged dashboard. `telemetry_public` queries the same Analytics Engine dataset with the same SQL.
3. **Consumer labels are self-declarations.** They are not identity proof. Treat them as honest claims, not authentication. See `telemetry_policy` for the full identification model.
4. **Results may be sampled.** Cloudflare Analytics Engine uses sampling at high volumes. Counts are estimates scaled by `_sample_interval`, not exact totals.
5. **Retention is 3 months.** Data older than 3 months is not available. For long-term trends, monthly snapshots are persisted separately.

## Canon References

- [Telemetry Governance](klappy://canon/constraints/telemetry-governance) — The authoritative reference for what is tracked and excluded
- [telemetry_policy](oddkit://tools/telemetry_policy) — Returns the governance document at runtime
- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — The design pattern telemetry must not violate
- [Maintainability](klappy://canon/principles/maintainability-one-person-indefinitely) — The principle telemetry serves
