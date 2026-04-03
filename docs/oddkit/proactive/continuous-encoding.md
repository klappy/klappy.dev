---
uri: klappy://docs/oddkit/proactive/continuous-encoding
title: "Continuous OLDC+H Encoding — Track at Every Turn, Not Just Session End"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "oddkit", "encode", "oldc-h", "proactive", "continuous", "journal", "epoch-7"]
epoch: E0007
date: 2026-04-03
---

# Continuous OLDC+H Encoding — Track at Every Turn, Not Just Session End

> Track OLDC+H at every exchange. Encode when substantive. Persist at breakpoints. The session journal is built incrementally, not reconstructed from memory at the end.

---

## Summary — Capture While It's Fresh, Not After It's Faded

The passive pattern was to batch all session capture at the end. The operator would say "encode OLDC+H" or "journal this" and the agent would attempt to reconstruct the full session's observations, learnings, decisions, constraints, and handoffs from the conversation history. This reconstruction was lossy. Details faded. Sequence was compressed. The narrative that made the learnings meaningful was lost.

The proactive pattern is three cadences working together: track at every exchange, encode at substantive moments, persist at natural breakpoints.

---

## The Three Cadences

**Track** — At every exchange, the agent maintains awareness of what just happened. Did the operator share an observation? Did the conversation produce a learning? Was a decision made? Did a new constraint emerge? This is not encoding — it is attention. The agent notices OLDC+H material as it occurs.

**Encode** — When the tracked material is substantive — a real decision, a genuine learning, a constraint that will govern future work — the agent calls encode to structure it. Not every exchange produces encode-worthy material. The agent uses judgment.

**Persist** — At natural breakpoints — task completion, topic transitions, approaching context limits — the agent saves accumulated encodings to the project journal. Encode does not persist. The agent must save the output explicitly.

---

## What "Every Turn" Means in Practice

"Every turn" does not mean calling encode on every message. It means the agent is always paying attention to OLDC+H categories. Most turns produce nothing worth encoding. Some produce an observation worth noting. A few produce a decision or learning worth structuring. The agent tracks silently, encodes selectively, and persists at breakpoints.

---

## The Passive Pattern This Replaces

Under E0006, OLDC+H capture happened at session end or when the operator explicitly requested it. The agent had no continuous tracking posture. Valuable observations from early in the session were lost by the time the operator asked for a journal entry. The narrative arc — which gave context to the individual items — was compressed into a flat list.

Under E0007, the journal builds itself. The agent tracks continuously, and the operator reviews what was captured rather than dictating it from memory.

---

## Don't Separate by Type

A common failure mode is separating journal entries by OLDC+H category — all observations in one section, all decisions in another. This erases the narrative. The sequence matters: observation led to learning, learning informed decision, decision created constraint. Separating by type destroys the causal chain that makes the journal useful for future conversations.

Keep entries in chronological narrative order. Tag them with their type, but don't sort by it.
