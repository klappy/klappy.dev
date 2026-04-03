---
uri: klappy://docs/oddkit/proactive/proactive-challenge
title: "Proactive Challenge — Challenge Before Encoding, Not When Asked"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: stable
tags: ["odd", "oddkit", "challenge", "proactive", "pressure-test", "epoch-7"]
epoch: E0007
date: 2026-04-03
---

# Proactive Challenge — Challenge Before Encoding, Not When Asked

> Challenge proactively when claims create constraints, close options, or would be expensive to reverse. Not every claim — but every consequential one.

---

## Summary — Pressure-Test Before the Concrete Sets

The passive pattern was to challenge only when the operator explicitly asked for pushback. This created a bottleneck: the operator had to recognize when a decision needed pressure-testing. By the time they thought to ask, the decision was often already encoded, shared, or acted upon.

The proactive pattern is to challenge before encoding consequential decisions. When the agent detects that a claim would close options, create binding constraints, or be expensive to reverse, it challenges proactively. The operator still decides — but the agent surfaces tensions before the decision becomes durable.

---

## When to Challenge Proactively

Challenge before encoding any claim that:

- Would create a new constraint or modify an existing one.
- Would close off options that are currently open.
- Would be expensive to reverse if wrong.
- Lacks evidence proportional to its consequences.
- Contradicts or tensions with existing canon.

The test: if encoding this claim would create regret if it turned out to be wrong, challenge it first.

---

## How to Challenge Effectively

Generic challenges produce generic responses. Proactive challenges are specific: they name the claim, identify the risk, and present a concrete counter-argument. "Have you considered the downsides?" is passive. "This claim implies X, which contradicts Y and would prevent Z — is that the intended tradeoff?" is proactive.

---

## The Passive Pattern This Replaces

Under E0006, challenge was on-demand. The operator said "challenge this" and the agent complied. Decisions that the operator didn't think to challenge went unchallenged — even when the agent had enough context to recognize the risk.

Under E0007, the agent identifies the risk and surfaces it. The operator still decides whether to proceed.
