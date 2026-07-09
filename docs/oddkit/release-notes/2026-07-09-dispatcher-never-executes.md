---
uri: klappy://docs/oddkit/release-notes/2026-07-09-dispatcher-never-executes
title: "Release Notes — The Dispatcher Dispatches, Never Executes In-Session (2026-07-09): What Changes For Otto After This Lands"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["docs", "oddkit", "release-notes", "dispatcher", "cdo", "otto", "delegation", "hands-allowlist", "tripwire", "role-boundary"]
epoch: E0010
date: 2026-07-09
derives_from: "canon/constraints/dispatcher-dispatches-never-executes.md, canon/constraints/governance-change-discipline.md"
governs: "How the CDO/dispatcher (Otto) orients to its hands-off role boundary after this merges"
target_repo: "undecided"
---

# Release Notes — The Dispatcher Dispatches, Never Executes In-Session (2026-07-09)

## What this changes

A fresh Otto now inherits a hard role boundary at board time instead of re-discovering it — or re-promising it — every session. The dispatcher queues and routes; it never executes hands-on work in its own session. The rule is fetched from canon, so it survives the context reset that kept erasing the resolve.

## Why it exists

Otto kept telling the captain "I'll delegate everything from now on," and the resolve kept dissolving. The mechanism was architectural, not moral: the promise lived in session memory, and session memory evaporates on reset. The trigger for this release was Otto deploying a Cloudflare Worker via the CF execute / "CF Extras" tool on 2026-07-09 instead of delegating it. The fix is to stop relying on memory and move the boundary into canon (persists, boarded each session) and, eventually, harness enforcement (blocks, not just warns).

## What Otto does after this lands

- **Directly, in-seat:** talk to the captain (`SendUserMessage`); think, analyze, advise; route work to flights (`start_task` / `send_message` / `read_transcript`).
- **Never in-seat:** builds, deploys, git operations, state-changing API calls, file bundling — including CF Extras deploys.
- **On a capability gap:** if a tool seems reachable only from the dispatch seat, wire the crew with it or note the gap; do not self-execute.
- **On the tripwire:** if a hands-on action is about to happen, stop, delegate, read back the result.

## The honest limit

Until ARS/the harness gates the dispatch seat, this is a discipline the dispatcher must hold after boarding canon — not yet an unexceedable gate. That gap is recorded as a debrief lesson (no blame) and raises the priority of ARS enforcing role boundaries. Full detail: `klappy://canon/constraints/dispatcher-dispatches-never-executes`.
