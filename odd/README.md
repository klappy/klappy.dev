---
uri: klappy://public/odd
title: "What is ODD? — Outcomes-Driven Development"
audience: public
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["odd", "definition", "outcomes-driven-development", "what-is-odd", "methodology", "philosophy", "public", "overview"]
relevance: routing
execution_posture: routing
assets: {"practice_video":"/assets/odd/odd-in-practice.mp4","misconception_image":"/assets/odd/odd-is-not-a-framework.png","deep_dive_audio":"/assets/odd/why-evidence-beats-confidence.m4a"}
---

# 🧠 Outcomes-Driven Development (ODD)

Outcomes-Driven Development (ODD) is an approach to building software that prioritizes real-world results over artifacts.

In an environment where AI can generate code, interfaces, and entire applications quickly, the limiting factor is no longer production speed—it is clarity of intent, quality of verification, and the ability to choose among many possible outcomes.

ODD exists to make those constraints explicit.

---

## ⚠️ System Constraint (Read Before Adding Structure)

ODD is governed by a single, non-negotiable constraint:

**→ [`Use Only What Hurts`](constraint/use-only-what-hurts.md)**

This document has **supremacy** over all other ODD documents.

If a proposed pattern, principle, or addition conflicts with it, the proposal is invalid.

---

## The Core Idea

Traditional software development often optimizes for outputs:

- lines of code
- shipped features
- completed tickets

ODD shifts the focus to outcomes:

- Does this solve the real problem?
- Can it be demonstrated, not just explained?
- Will it hold up as conditions change?

Code is still written. Tools still matter. But they are means, not ends.

---

## Why ODD Now

AI changes the economics of software creation.

When generation becomes cheap:

- variation explodes
- artifacts become disposable
- maintenance becomes the real cost

ODD responds by:

- treating code as ephemeral
- emphasizing verification over explanation
- encouraging curation over accumulation

The goal is not to generate _more_ software, but to ship _better_ outcomes with less long-term drag.

---

## Core Principles

ODD is guided by a small set of principles that recur across projects:

- **Prompt over Code**
  Natural language intent guides generation; code is an output, not the source of truth.

- **Keep It Simple (KISS)**
  Prefer the simplest solution that works and can be explained clearly.

- **Don’t Repeat Yourself (DRY), with Isolation**
  Reuse ideas and components where it helps, but avoid brittle global coupling.

- **Consistency**
  Similar problems should feel similar to users and maintainers.

- **Maintainability**
  Optimize for low-effort upkeep and clear handoff, not cleverness.

- **Antifragility**
  Systems should learn from stress and failure, not just survive them.

- **Scalability**
  Growth should increase capability without exploding complexity or cost.

These principles are lenses, not rules. Their application changes as projects mature.

---

## Evidence Over Explanation

ODD places a strong emphasis on evidence.

In practice, this means:

- showing working systems
- favoring visual or experiential proof
- treating explanations as hypotheses until verified

This is especially important in AI-assisted workflows, where fluent explanations are easy to produce but easy to trust incorrectly.

---

## Project Maturity Matters

ODD does not apply the same rigor at every stage.

- **Exploration (PoC)** — bias toward learning and speed
- **Validation (Pilot)** — bias toward proof and repeatability
- **Commitment (Production)** — bias toward trust, durability, and handoff

Rigor increases with maturity. Governance tightens gradually. There are no sharp lines.

---

## What ODD Is Not

ODD is not:

- a framework to install
- a fixed workflow
- a claim that outcomes can be fully predicted

It does not replace judgment. It exists to support it.

---

## How This Repository Uses ODD

This repository applies ODD in two layers:

- **Public-facing** — this document and related writing explain the philosophy in human terms.
- **Canonical** — internal reference documents capture constraints, decision rules, evidence standards, and failure modes.

The Canon is designed for orientation, not enforcement.

---

## On Variance and Learning

In AI-assisted development, outcomes are not deterministic. The same intent can produce different results depending on execution paths.

This site reflects that reality. Ideas are tested, observed, and sometimes retried before conclusions are drawn. What you see here is not a straight line—it's a record of learning under uncertainty.

---

## Where to Go Next

If you want to explore further:

- Read the **extended ODD Manifesto** in `/odd/manifesto.md`
- See how rigor scales in **Project Maturity & Progressive Governance**
- Browse the **Canon Index** to understand how decisions and verification are structured

Or skip the theory and look at projects as they are added over time.

---

> ODD is about preserving intent without freezing execution.
> The measure of success is not how elegant the artifact is, but whether the outcome holds up in the real world.
