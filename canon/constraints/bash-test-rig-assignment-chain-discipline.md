---
uri: klappy://canon/constraints/bash-test-rig-assignment-chain-discipline
title: "Bash Test Rigs: Assignment Chains Need Explicit Newlines"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["constraint", "bash", "shell", "tests", "ci", "epoch-8"]
epoch: E0008
date: 2026-04-26
derives_from:
  - "canon/principles/ritual-is-a-smell.md"
governs: "Authoring discipline for shell-script test rigs in this codebase"
---

# Bash Test Rigs: Assignment Chains Need Explicit Newlines

> Bash silently concatenates two assignments separated by missing whitespace. The result parses, runs, and produces wrong values. Tests against the wrong value pass or fail nondeterministically depending on what the prior test left behind. Authors lose hours.

## Summary

Consider this pattern:

```bash
RAW=$(curl -sf "$URL/mcp" -X POST \
  -H "Content-Type: application/json" \
  -d '...')RESULT=$(extract_json "$RAW")
```

The intent is two statements on two lines. The bug is the dropped newline between `)` and `RESULT=`. Bash parses this as a single command-substitution statement assigning to `RAW`, with the literal characters `RESULT=$(extract_json "$RAW")` becoming part of `RAW`'s right-hand side. The actual `RESULT` variable is never assigned — it inherits whatever value the prior test set, or remains empty.

No syntax error. No runtime error. Just a silently wrong test that asserts against last-test-leftover state.

## Detection

The `bash -n` syntax check passes — the construct is valid bash. Detection requires either (a) reading the script with attention to line boundaries after every closing `)` of a command substitution, or (b) running shellcheck (which catches some related cases but not all).

The cheapest preventive: between any two assignments in a test, leave a blank line. Visual whitespace as discipline. The `bash -n` check still passes; the pattern is now legible to humans.

## When This Matters

Any shell-script test rig in this codebase, especially `tests/cloudflare-production.test.sh`. The pattern is most dangerous in tests that are structured as repeated `RAW=$(curl); RESULT=$(extract_json "$RAW"); INNER=$(echo "$RESULT" | python3 -c ...)` sequences — exactly the structure of all the smoke tests for new MCP actions.

## Origin

Surfaced in klappy/oddkit#140 (PR-2.1 of the link-rot-elimination campaign). When test 14g.2 (supersession-walk smoke) was added, the boundary between its closing `)` and test 14h's `RESULT=$(...)` lost a newline during an `str_replace` operation. The `RAW` variable for test 14h was never set; test 14h's assertion ran against the response from test 14g.2, which happened to be a `FOUND` response. Test 14h asserts `NOT_FOUND`, so it failed — but the failure message showed the URI from test 14g.2, which was confusing to debug because the reported URI was not the URI the test was supposedly calling.

Detection cost: the failure was caught by post-merge CI on klappy/oddkit#140 because preview testing exercised it. The fix was a one-character newline insertion, but the diagnostic time was non-trivial.

## What This Demands

For shell-script test rig authors:

1. After any closing `)` of a command substitution, the next character must be a newline (not another assignment, not a semicolon, not a space-then-assignment).
2. When adding a new test by copy-pasting an existing block and modifying, run `bash -n script.sh` AND visually verify the diff has no joined lines.
3. Prefer leaving a blank line between distinct test blocks. Visual separation makes joined-line bugs visible.

Future improvement: a CI lint rule that flags `\)\w*=` (close-paren immediately followed by an assignment) in `.sh` files would catch this mechanically. Defer per Use Only What Hurts; if the bug recurs, lint graduates from defer to active.

## See Also

- [Ritual Is a Smell](klappy://canon/principles/ritual-is-a-smell) — visual blank lines between tests are a low-cost pattern; CI lint is the durable fix when ritual breaks down
