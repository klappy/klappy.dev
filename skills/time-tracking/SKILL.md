---
name: time-tracking
description: "Track time, measure elapsed durations, and compare timestamps using available time tools. Use when the user says 'start timer', 'stop timer', 'how long has it been', 'what time is it', 'time this', 'start', 'stop' (in timing context), or asks about elapsed time between events. Also trigger when the user asks Claude to keep time, track duration, or measure how long something takes."
---

# Time Tracking

Claude can track time using available tools. This skill teaches how to find the right tool, use it silently, and do time math.

## Step 1: Find Your Clock

Before claiming you can't track time, CHECK what tools are available. Use `tool_search` with query "time" or "clock" to discover available tools. Common options:

- **`user_time_v0`** — Platform-native tool. Returns current time and timezone. Zero latency. Always prefer this if available.
- **`oddkit_time`** (via oddkit MCP) — Stateless interval calculator. Three modes: current time, elapsed since reference, delta between two timestamps. Available if oddkit MCP is connected.
- **`bash_tool`** — Fallback. Run `date -u +%Y-%m-%dT%H:%M:%S.%3NZ` to get UTC time.

**CRITICAL: Never claim you can't track time without checking first.** You cannot verify what you did not observe — that includes your own capabilities.

## Step 2: Workflows

### Clock Check

When the user asks "what time is it" or similar:

1. Call the time tool
1. Convert to the user's local timezone and a human-readable format
1. Report naturally: "It's 11:43 PM." or "3:15 in the afternoon."

Do NOT read back ISO timestamps, UTC offsets, or JSON. The user wants a clock, not a data structure.

### Start / Stop Timer

**You MUST call the time tool on both start and stop. Never estimate or guess elapsed time.**

**Start:**

1. Call the time tool immediately when the user says "start"
1. Hold the timestamp in context (you'll need it for "stop")
1. Confirm briefly: "Started." or "Go."
1. **DO NOT read the raw tool response aloud.** Observe it silently.

**Stop:**

1. Call the time tool immediately when the user says "stop"
1. Calculate elapsed time (see Time Math below)
1. Report ONLY the human-readable result: "47 seconds." or "3 minutes 12 seconds."
1. **DO NOT read JSON, timestamps, or tool metadata aloud.**

Note on persistence: the stored start timestamp lives only in the current conversation context. If the conversation ends, it's gone. Be honest about this if asked.

### Elapsed Since a Reference

When the user asks "how long has it been since 3pm?" or "how long since the meeting started?":

1. Call the time tool to get the current time
1. Construct the reference timestamp from the user's description:
- **Explicit times** ("since 3pm", "since 14:30") → build an ISO timestamp using today's date and the user's timezone from the tool response
- **Earlier events in this conversation** ("since we started", "since I asked the first question") → use the timestamp you observed from a prior tool call in this conversation, if you have one
- **Ambiguous references** ("since lunch", "since this morning") → ask for clarification rather than guessing
1. Calculate the delta and report in human-readable format

If the user says a time that's in the future today (e.g., "since 10pm" when it's 3pm), they likely mean yesterday. Ask to confirm rather than assuming.

### Key Rule for Voice

The user should hear ONLY the result, never the mechanism. No JSON. No timestamps. No tool names. No "I called user_time_v0 and it returned…" Just the answer.

## Step 3: Time Math

### If using `oddkit_time` (MCP)

The tool does the math for you:

- No params → returns current time
- `reference: "<timestamp>"` → returns elapsed time with human-readable text
- `reference: "<t1>", compare: "<t2>"` → returns delta between two timestamps

### If using `user_time_v0` or `bash_tool`

You get raw timestamps. Do the math yourself:

```
Start: 2026-04-12T03:30:46Z
Stop:  2026-04-12T03:31:16Z

Elapsed = Stop - Start = 30 seconds
```

For manual calculation:

- Parse both timestamps
- Subtract to get total seconds
- Convert: seconds → minutes → hours → days
- Format human-readable (see rules below)

### Minimum Resolution

There is a ~4–5 second floor on any measurement. Voice transcription, message processing, and tool invocation all add latency before the timestamp is captured. Both start and stop experience the same lag, so elapsed time calculations stay accurate — the offset cancels out. But this means any result under about 5 seconds is indistinguishable from noise. If the calculated delta is under 5 seconds, report the number but note it's at the floor of what can be measured.

### Duration Formatting Rules

- Under 60 seconds: "47 seconds"
- Under 60 minutes: "3 minutes 12 seconds" or "3m 12s"
- Under 24 hours: "2 hours 14 minutes" or "2h 14m"
- Over 24 hours: "3 days 2 hours" or "3d 2h"
- Drop zero components: "2h 3s" not "2h 0m 3s"

## Step 4: Tool Discipline

**Every start and every stop MUST trigger a tool call. No exceptions.**

You will be tempted to skip the tool and estimate the elapsed time. Do not do this. You do not have an internal clock. You cannot sense the passage of time. If you did not call the tool, you do not have a timestamp, and if you do not have a timestamp, you have nothing to report. Guessing — even when it feels reasonable — is fabrication, and the user will catch it immediately.

This is the single most important rule in this skill: **no tool call, no number.**

Other rules:

- **Never claim you "kept" time.** You called a tool twice and did subtraction. Be honest about the mechanism if asked.
- **Never read tool responses aloud** in voice mode. Observe silently, report the result.
- **Never say "I can't track time"** without first checking your available tools via `tool_search`.
- **Never promise persistence beyond this conversation.** The timestamp lives in context, not in memory.

## Examples

### Timer

```
User: "Start."
[Claude calls user_time_v0 → observes 2026-04-12T03:30:46-04:00]
Claude: "Go."

User: "Stop."
[Claude calls user_time_v0 → observes 2026-04-12T03:31:33-04:00]
[Claude calculates: 47 seconds]
Claude: "47 seconds."
```

### Clock Check

```
User: "What time is it?"
[Claude calls user_time_v0 → observes 2026-04-12T15:22:07-04:00]
Claude: "It's 3:22 PM."
```

### Elapsed Since Reference

```
User: "How long since 3pm?"
[Claude calls user_time_v0 → observes 2026-04-12T17:14:30-04:00]
[Claude constructs reference: 2026-04-12T15:00:00-04:00]
[Claude calculates: 2 hours 14 minutes]
Claude: "2 hours 14 minutes."
```

No JSON. No tool names. No narration. Just the answer.
