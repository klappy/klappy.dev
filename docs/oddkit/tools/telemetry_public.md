---
uri: oddkit://tools/telemetry_public
title: "telemetry_public — Raw SQL Against the Public Telemetry Dataset"
audience: operators
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["oddkit", "tool", "telemetry", "transparency", "analytics", "sql", "vodka-architecture", "prompt-over-code"]
epoch: E0008
date: 2026-04-11
derives_from: "canon/constraints/telemetry-governance.md, canon/principles/vodka-architecture.md, canon/principles/prompt-over-code.md"
complements: "docs/oddkit/tools/telemetry_policy.md"
---

# telemetry_public — Raw SQL Against the Public Telemetry Dataset

> One tool, one SQL parameter, infinite questions. The server passes your query through to Cloudflare Analytics Engine and returns whatever it finds. No hardcoded leaderboards, no predefined dashboards, no menu of canned reports. The schema is documented. The data is public. Write the query that answers your question.

## Summary — Prompt Over Code for Telemetry

`telemetry_public` accepts a raw SQL query against the `oddkit_telemetry` dataset and returns the results. The server has zero domain opinions about which questions to ask — that's the caller's job. The schema is embedded in the tool description so any LLM can write valid queries without a second call.

This design follows Vodka Architecture: the server is a pass-through, not a dashboard. Adding new questions means writing new SQL, not deploying new code. Ten gaps or twenty, the server doesn't change.

## When to Use

- Any question about oddkit usage that can be answered with SQL
- Building transparency dashboards (web, CLI, or conversational)
- Investigating spikes, trends, or anomalies
- Checking adoption signals (which repos are served, which tools are used)
- Comparing tool performance (duration stats)
- Identifying consumer patterns

## Tool Definition

**Name:** `telemetry_public`

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "sql": {
      "type": "string",
      "description": "SQL query against the oddkit_telemetry dataset"
    }
  },
  "required": ["sql"]
}
```

### Response Shape

```json
{
  "action": "telemetry_public",
  "result": {
    "sql": "string — the query that was executed",
    "data": {
      "meta": [{"name": "column_name", "type": "column_type"}],
      "data": [{"column_name": "value"}],
      "rows": "number"
    },
    "generated_at": "string — ISO timestamp"
  }
}
```

## Dataset Schema

Dataset name: `oddkit_telemetry`

### Blob Fields (Strings)

| Field | Column | Content | Example |
|-------|--------|---------|---------|
| blob1 | event_type | `"mcp_request"` or `"tool_call"` | `"tool_call"` |
| blob2 | method | JSON-RPC method | `"tools/call"`, `"initialize"` |
| blob3 | tool_name | oddkit action name (empty for non-tool events) | `"orient"`, `"search"` |
| blob4 | consumer_label | Best-effort caller identity | `"Claude-User"`, `"Deno/2.1.4"` |
| blob5 | consumer_source | How label was resolved | `"x-oddkit-client"`, `"user-agent"` |
| blob6 | canon_url | Which repo is being served (from tool args or env default) | `"https://github.com/klappy/klappy.dev"` |
| blob7 | document_uri | For `get` calls, the URI requested (empty otherwise) | `"klappy://canon/principles/vodka-architecture"` |
| blob8 | worker_version | oddkit version string | `"0.16.0"` |

### Double Fields (Numbers)

| Field | Column | Content |
|-------|--------|---------|
| double1 | count | Always `1` — use `SUM(_sample_interval)` for totals |
| double2 | duration_ms | Request processing time in milliseconds |

### Automatic Fields

| Field | Content |
|-------|---------|
| timestamp | Automatic per data point — use `toStartOfDay(timestamp)` for daily trends |
| _sample_interval | Sampling weight — always use `SUM(_sample_interval)` instead of `COUNT(*)` |

## Example Queries

These examples are guidance for callers, not code in the server. Write whatever SQL answers your question.

### Tool leaderboard
```sql
SELECT blob3 AS tool, SUM(_sample_interval) AS calls
FROM oddkit_telemetry WHERE blob1 = 'tool_call'
GROUP BY tool ORDER BY calls DESC LIMIT 20
```

### All consumers (all events, not just tool calls)
```sql
SELECT blob4 AS consumer, blob5 AS source, SUM(_sample_interval) AS calls
FROM oddkit_telemetry
GROUP BY consumer, source ORDER BY calls DESC LIMIT 20
```

### Knowledge bases served (the adoption signal)
```sql
SELECT blob6 AS canon_url, SUM(_sample_interval) AS calls
FROM oddkit_telemetry WHERE blob1 = 'tool_call'
GROUP BY canon_url ORDER BY calls DESC
```

### Daily trend
```sql
SELECT toStartOfDay(timestamp) AS day, SUM(_sample_interval) AS calls
FROM oddkit_telemetry GROUP BY day ORDER BY day DESC LIMIT 30
```

### Consumer × tool matrix
```sql
SELECT blob4 AS consumer, blob3 AS tool, SUM(_sample_interval) AS calls
FROM oddkit_telemetry WHERE blob1 = 'tool_call'
GROUP BY consumer, tool ORDER BY consumer, calls DESC
```

### Duration stats per tool
```sql
SELECT blob3 AS tool, AVG(double2) AS avg_ms, MAX(double2) AS max_ms,
  SUM(_sample_interval) AS calls
FROM oddkit_telemetry WHERE blob1 = 'tool_call'
GROUP BY tool ORDER BY avg_ms DESC
```

### Consumer trend (daily by consumer)
```sql
SELECT toStartOfDay(timestamp) AS day, blob4 AS consumer, SUM(_sample_interval) AS calls
FROM oddkit_telemetry
GROUP BY day, consumer ORDER BY day DESC, calls DESC LIMIT 50
```

### Most accessed documents
```sql
SELECT blob7 AS document_uri, SUM(_sample_interval) AS calls
FROM oddkit_telemetry WHERE blob7 != ''
GROUP BY document_uri ORDER BY calls DESC LIMIT 20
```

## Behavioral Rules

1. **Pass-through, not dashboard.** The server executes the SQL and returns the result. It has no opinion about which queries are interesting.
2. **Schema is the interface.** The dataset schema is documented here and embedded in the tool description. Callers write SQL based on the schema — no menu, no enum, no predefined reports.
3. **Public data, same as the maintainer sees.** There is no privileged query interface.
4. **Results may be sampled.** Always use `SUM(_sample_interval)` instead of `COUNT(*)`.
5. **Retention is 3 months.** Data older than 3 months is not available.
6. **Prompt over code.** New questions are answered by writing new SQL, not by deploying new server code.

## Canon References

- [Telemetry Governance](klappy://canon/constraints/telemetry-governance) — What is tracked, what is excluded, and why
- [telemetry_policy](oddkit://tools/telemetry_policy) — Fetch the governance document at runtime
- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — Thin server, rich canon
- [Prompt Over Code](klappy://canon/principles/prompt-over-code) — Governance in documents, not compiled into the server
