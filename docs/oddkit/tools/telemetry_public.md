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
date: 2026-04-26
derives_from: "canon/constraints/telemetry-governance.md, canon/principles/vodka-architecture.md, canon/principles/prompt-over-code.md"
complements: "docs/oddkit/tools/telemetry_policy.md, docs/oddkit/responses/envelope-reference.md"
---

# telemetry_public — Raw SQL Against the Public Telemetry Dataset

> One tool, one SQL parameter, infinite questions. The server passes your query through to Cloudflare Analytics Engine and returns whatever it finds. No hardcoded leaderboards, no predefined dashboards, no menu of canned reports. The schema is documented. The data is public. Write the query that answers your question.

## Description

`telemetry_public` accepts a raw SQL query against the `oddkit_telemetry` dataset and returns the results. The server has zero domain opinions about which questions to ask — that's the caller's job. The schema is embedded in the tool description so any LLM can write valid queries without a second call.

This design follows Vodka Architecture: the server is a pass-through, not a dashboard. Adding new questions means writing new SQL, not deploying new code. Ten gaps or twenty, the server doesn't change.

Columns are queried by **semantic name** (`tool_name`, `cache_hits`, `duration_ms`), not raw slot identifiers (`blob3`, `double7`, `double2`). The server rewrites the SQL at query time using a SchemaMap fetched from canon, so the names you write match the schema documented here and in `canon/constraints/telemetry-governance.md`.

## Outline

- When to Use
- Tool Definition
- Dataset Schema
- Example Queries
- Behavioral Rules
- See Also

---

## When to Use

- Any question about oddkit usage that can be answered with SQL
- Building transparency dashboards (web, CLI, or conversational)
- Investigating spikes, trends, or anomalies
- Checking adoption signals (which knowledge bases are served, which tools are used)
- Comparing tool performance (duration, cache effectiveness, fan-out)
- Identifying consumer patterns

For per-request diagnostics on a specific call you just made, look at `debug.trace` in the response envelope instead — that data does not flow into Analytics Engine. See `docs/oddkit/responses/envelope-reference.md`.

---

## Tool Definition

**Name:** `telemetry_public`

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "sql": {
      "type": "string",
      "description": "Analytics Engine SQL query against the oddkit_telemetry dataset"
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

---

## Dataset Schema

Dataset name: `oddkit_telemetry`. Authoritative governance: `canon/constraints/telemetry-governance.md`.

### Structural Dimensions (Strings)

| Column | Content | Example |
|--------|---------|---------|
| `event_type` | `"mcp_request"` or `"tool_call"` | `"tool_call"` |
| `method` | JSON-RPC method | `"tools/call"`, `"initialize"` |
| `tool_name` | oddkit action name (empty for non-tool events) | `"orient"`, `"search"` |
| `consumer_label` | Best-effort caller identity | `"Claude-User"`, `"Deno/2.1.4"` |
| `consumer_source` | How the label was resolved | `"x-oddkit-client"`, `"user-agent"` |
| `knowledge_base_url` | Which knowledge base is being served | `"https://github.com/klappy/klappy.dev"` |
| `document_uri` | For `get` calls, the URI requested (empty otherwise) | `"klappy://canon/principles/vodka-architecture"` |
| `worker_version` | oddkit version string | `"0.25.0"` |

> Slot 9 is unused. It previously held `cache_tier` (a single "winning" storage tier per request) and was retired when the tracer was refactored to record per-fetch facts. Cache effectiveness is now derived from `cache_hits` / `cache_lookups` (numeric values 7 and 8).

### Numeric Values

| Column | Content |
|--------|---------|
| `count` | Always `1` — use `SUM(_sample_interval)` for totals |
| `duration_ms` | Full request wall-clock at the worker edge — includes V8 cold-start, KB fetch, MCP SDK overhead, and handler compute |
| `bytes_in` | UTF-8 byte length of the JSON-RPC request body. `0` when the body could not be read |
| `bytes_out` | UTF-8 byte length of the response body. `0` for streamed (SSE) responses where the body cannot be measured without consuming the stream |
| `tokens_in` | `cl100k_base` token count of the request body. `0` when tokenization was skipped or failed |
| `tokens_out` | `cl100k_base` token count of the response body. `0` for streamed responses or tokenizer failure |
| `cache_hits` | Count of per-fetch records in the request whose `cached` flag was true. Sourced from `tracer.cacheStats.hits` |
| `cache_lookups` | Total per-fetch records in the request — the denominator for hit rate. Sourced from `tracer.cacheStats.total` |

### Automatic Fields

| Field | Content |
|-------|---------|
| `timestamp` | Automatic per data point — use `toStartOfInterval(timestamp, INTERVAL '1' DAY)` for daily trends |
| `_sample_interval` | Sampling weight — always use `SUM(_sample_interval)` instead of `COUNT(*)` |

---

## Example Queries

These examples are guidance for callers, not code in the server. Write whatever SQL answers your question.

### Tool leaderboard

```sql
SELECT tool_name, SUM(_sample_interval) AS calls
FROM oddkit_telemetry
WHERE timestamp > NOW() - INTERVAL '30' DAY AND tool_name != ''
GROUP BY tool_name
ORDER BY calls DESC LIMIT 20
```

### Cache hit rate per tool

```sql
SELECT tool_name,
       SUM(cache_hits) AS hits,
       SUM(cache_lookups) AS lookups,
       ROUND(SUM(cache_hits) / SUM(cache_lookups) * 100, 1) AS hit_rate_pct
FROM oddkit_telemetry
WHERE timestamp > NOW() - INTERVAL '7' DAY AND cache_lookups > 0
GROUP BY tool_name
ORDER BY lookups DESC
```

### Per-tool storage fan-out — which actions touch the most data per call

```sql
SELECT tool_name,
       SUM(_sample_interval) AS calls,
       ROUND(AVG(cache_lookups), 1) AS avg_fetches_per_call,
       MAX(cache_lookups) AS peak_fetches
FROM oddkit_telemetry
WHERE timestamp > NOW() - INTERVAL '7' DAY AND tool_name != ''
GROUP BY tool_name
ORDER BY avg_fetches_per_call DESC
```

### Cold-start frequency — how often does each tool hit a cold worker

A request with `cache_lookups > 0 AND cache_hits = 0` did at least one storage read and missed every cache tier — strong signal of a cold V8.

```sql
SELECT tool_name,
       SUM(_sample_interval) AS calls,
       SUM(IF(cache_hits = 0 AND cache_lookups > 0, _sample_interval, 0)) AS cold_calls,
       ROUND(SUM(IF(cache_hits = 0 AND cache_lookups > 0, _sample_interval, 0))
             / SUM(_sample_interval) * 100, 1) AS cold_pct
FROM oddkit_telemetry
WHERE timestamp > NOW() - INTERVAL '24' HOUR AND tool_name != ''
GROUP BY tool_name
HAVING SUM(_sample_interval) >= 5
ORDER BY cold_pct DESC
```

### Latency vs fan-out — does doing more storage work make a tool slower?

```sql
SELECT tool_name,
       ROUND(AVG(duration_ms), 0) AS avg_ms,
       ROUND(AVG(cache_lookups), 1) AS avg_lookups,
       ROUND(AVG(bytes_out), 0) AS avg_bytes_out
FROM oddkit_telemetry
WHERE timestamp > NOW() - INTERVAL '7' DAY AND tool_name != ''
GROUP BY tool_name
HAVING SUM(_sample_interval) >= 5
ORDER BY avg_ms DESC
```

### Knowledge bases served (the adoption signal)

```sql
SELECT knowledge_base_url, SUM(_sample_interval) AS calls
FROM oddkit_telemetry
WHERE timestamp > NOW() - INTERVAL '30' DAY AND event_type = 'tool_call'
GROUP BY knowledge_base_url
ORDER BY calls DESC
```

### All consumers (all events, not just tool calls)

```sql
SELECT consumer_label, consumer_source, SUM(_sample_interval) AS calls
FROM oddkit_telemetry
WHERE timestamp > NOW() - INTERVAL '30' DAY
GROUP BY consumer_label, consumer_source
ORDER BY calls DESC LIMIT 20
```

### Daily call volume

```sql
SELECT toStartOfInterval(timestamp, INTERVAL '1' DAY) AS day,
       SUM(_sample_interval) AS calls
FROM oddkit_telemetry
WHERE timestamp > NOW() - INTERVAL '30' DAY
GROUP BY day
ORDER BY day DESC
```

### Most accessed documents

```sql
SELECT document_uri, SUM(_sample_interval) AS calls
FROM oddkit_telemetry
WHERE timestamp > NOW() - INTERVAL '30' DAY AND document_uri != ''
GROUP BY document_uri
ORDER BY calls DESC LIMIT 20
```

### Token-cost ranking — which tools produce the most output per call

```sql
SELECT tool_name,
       SUM(_sample_interval) AS calls,
       ROUND(AVG(tokens_out), 0) AS avg_tokens_out,
       MAX(tokens_out) AS peak_tokens_out
FROM oddkit_telemetry
WHERE timestamp > NOW() - INTERVAL '7' DAY AND tool_name != ''
GROUP BY tool_name
ORDER BY avg_tokens_out DESC
```

---

## Behavioral Rules

1. **Pass-through, not dashboard.** The server executes the SQL and returns the result. It has no opinion about which queries are interesting.
2. **Schema is the interface.** The dataset schema is documented here and embedded in the tool description. Callers write SQL using the semantic column names — no menu, no enum, no predefined reports.
3. **Public data, same as the maintainer sees.** There is no privileged query interface.
4. **Results may be sampled.** Always use `SUM(_sample_interval)` instead of `COUNT(*)`.
5. **Retention is 3 months.** Data older than 3 months is not available.
6. **Prompt over code.** New questions are answered by writing new SQL, not by deploying new server code.
7. **Per-request detail lives in the response envelope, not here.** For per-fetch URLs, sizes, and latencies on a specific call, see `debug.trace.fetches[]` in that call's response. Analytics Engine stores only the aggregate counts (`cache_hits`, `cache_lookups`) — not the individual records.

---

## See Also

- [Telemetry Governance](klappy://canon/constraints/telemetry-governance) — What is tracked, what is excluded, and why
- [telemetry_policy](oddkit://tools/telemetry_policy) — Fetch the governance document at runtime
- [Response Envelope Reference](klappy://docs/oddkit/responses/envelope-reference) — Per-request `debug.trace` shape and how to read it
- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — Thin server, rich canon
- [Prompt Over Code](klappy://canon/principles/prompt-over-code) — Governance in documents, not compiled into the server
