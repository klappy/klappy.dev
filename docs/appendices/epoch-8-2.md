---
uri: klappy://docs/appendices/epoch-8-2
title: "Epoch 8.2 — Put the Clock in the Room"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: stable
tags: ["odd", "epochs", "observability", "time", "epistemic-primitive", "vodka-architecture", "epoch-8", "epoch-8.2"]
epoch: E0008.2
date: 2026-04-11
forcing_fault: "Models fabricate timelines from context clues because the message format carries no timestamps. oddkit — a system that demands 'Reality Is Sovereign' — was returning responses without telling the model what time it was."
new_invariant: "Same as E0008: the maintainer can see the shape of what's happening. E0008.2 extends this to the model itself — it can now see real time via server_time in every oddkit response."
core_shift: "Time-blind model → clock in the room. The model doesn't have to use it. But it's there."
derives_from: "docs/appendices/epoch-8-1.md, canon/observations/time-blindness-axiom-violation.md"
documents_introduced: ["docs/appendices/epoch-8-2.md"]
---

# Epoch 8.2 — Put the Clock in the Room

> E0008 gave oddkit eyes on usage. E0008.1 gave it eyes on infrastructure. E0008.2 puts a clock in the room — `server_time` in every response, so the model can observe real time instead of fabricating it.

---

## Summary — One Field, Every Response

Every oddkit response now includes `server_time` in the debug envelope. UTC. ISO 8601. Millisecond precision. The model can compare consecutive timestamps to know how much time has passed between calls. It doesn't have to. But the evidence is there.

That's the whole epoch.

---

## The Forcing Fault

The LLM message format has no timestamps. A model receiving a conversation cannot tell whether the last message was sent 30 seconds ago or 3 days ago. It fabricates timelines from context clues. This violates Axiom 1 (Reality Is Sovereign) and Axiom 4 (You Cannot Verify What You Did Not Observe).

oddkit demands epistemic discipline of its operators but was not providing them with observable time. A system that says "observe before asserting" should probably tell you what time it is.

---

## What E0008.2 Introduces

One field in the debug envelope of every OddkitEnvelope:

```json
{
  "debug": {
    "server_time": "2026-04-11T22:47:32.123Z",
    "duration_ms": 342
  }
}
```

One line of code: `server_time: new Date().toISOString()`

---

## What E0008.2 Does Not Introduce

- No governance of how models use the timestamp. The clock is in the room. What the model does with it is the model's business.
- No harness-level time injection. That's TruthKit's job, later.
- No `elapsed_since_last` computation. The model can do subtraction.
- No new tools, no new telemetry dimensions, no new constraints.

---

## Why E0008.2 and Not E0009

Same observability invariant. One more thing is observable. The clock was always part of E0008's theme — "the maintainer can see the shape of what's happening." Now the model can too.

---

## Compatibility

- E0008 and E0008.1 artifacts remain valid.
- The debug envelope gains one field. No existing fields change.
- E0008.2 is the current epoch.
