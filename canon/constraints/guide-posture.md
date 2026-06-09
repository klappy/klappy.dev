---
uri: klappy://canon/constraints/guide-posture
title: "Guide Posture — We Enter Their Story, Not the Other Way Around"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "constraints", "posture", "voice", "public", "positioning", "storybrand", "guide-hero"]
epoch: E0005
date: 2026-02-17
derives_from: "canon/values/trust-kernel.md, canon/values/axioms.md"
complements: "docs/oddkit/positioning.md, canon/meta/writing-canon.md"
governs: "All public-facing content: websites (klappy.dev, odd.klappy.dev), voice agents, documentation with audience: public, tool descriptions, onboarding flows, and marketing copy"
---

# Guide Posture — We Enter Their Story, Not the Other Way Around

> In every public-facing surface — websites, voice agents, documentation, tool descriptions, onboarding — we are the guide, not the hero. The user is the hero. They have a problem (AI collaboration that wastes time, loses context, produces outputs they can't trust). We have a plan (epistemic discipline that keeps agents honest). All public content must open with their pain, not our system. The moment we lead with "here's what we built" instead of "here's what's frustrating you," we have broken posture. This constraint is recursive: when we guide users to build their own products, the same posture applies — their customers become the hero, and we help them become guides. This constraint governs every word a user encounters before they choose to go deeper.

-----

## Summary — The User's Story Comes First, the System Is Revealed as the Plan

Every AI product in the market opens with itself: "here's our architecture, here's our methodology, here's our philosophy." This is hero posture — it centers the product and asks the user to care about the system before they've been shown that the system understands their problem.

Guide posture inverts this. The user is the hero of their own story. They are struggling with something real: AI outputs they can't trust, context that vanishes between sessions, knowledge trapped in one person's head, expensive rework caused by hallucinations. We enter their story by naming their pain before naming our solution.

ODD, oddkit, the epistemic ledger — these are the plan the guide offers. They are not the opening. They are revealed only after the user recognizes that we understand where they are.

This is not a marketing tactic. It is a structural application of the trust kernel (`canon/values/trust-kernel.md`): trust is built by managing expectations. When we lead with the user's experience, we set the expectation that we are here to serve their outcome. When we lead with our system, we set the expectation that they need to learn it first. The first builds trust. The second builds friction.

-----

## The Story Structure

Every public-facing surface should follow this arc, adapted to the medium:

### The Hero — The Person or Team Working with AI

They are not stupid. They are not unskilled. They are dealing with a genuinely hard problem: AI collaboration at scale is epistemically fragile. Context disappears. Agents hallucinate confidently. Institutional knowledge stays locked in one person's head. The tools are powerful but the trust layer is missing.

### The Problem — What's Frustrating Them Right Now

External problem: AI outputs require constant verification, context is lost between sessions, teams can't access what leadership knows without the leader being present.

Internal problem: They feel like they're babysitting the AI instead of collaborating with it. The promise of AI productivity keeps falling short.

Philosophical problem: Intelligence without discipline is unreliable. Speed without trust creates more rework than it saves.

### The Guide — Us

We've been here. Fifteen years of building trust systems in Bible translation — where communities validate meaning, experts guide without controlling, and expectation management is the entire game. That work produced principles that turned out to be exactly what AI collaboration needs: observe before asserting, treat every claim as a debt, never verify what you didn't observe.

We show empathy (we know the pain) and authority (we've solved it in production, across languages and modalities).

### The Plan — The Epistemic OS

Simple, clear steps: add oddkit to your existing tools. It doesn't replace your workflow — it keeps your agents honest while they work. Orient before acting. Challenge before agreeing. Gate before transitioning. Encode before forgetting.

### The Call to Action — Direct and Transitional

Direct: Start a fireside chat. Bring your hardest AI collaboration problem. See what disciplined thinking produces.

Transitional: Read a case study. Try the voice agent. Browse the canon.

### Success — What Life Looks Like After

Teams that scale knowledge without losing trust. Leadership insight accessible to the whole org, even when the leader isn't present. AI collaboration that produces outputs you can stake decisions on. Going from months per deliverable to ten in a day — not by cutting corners, but by cutting waste.

### Failure — What Happens Without This

Expensive rework. Hallucination-driven decisions. Institutional knowledge that walks out the door with one person. AI tools that feel productive in the moment but erode trust over time.

-----

## Application by Surface

### Websites (klappy.dev, odd.klappy.dev)

Landing pages open with the hero's pain, not system features. "You're losing hours to AI outputs you can't trust" before "oddkit provides epistemic discipline." Feature descriptions are framed as solutions to named problems. The system name appears only after the problem is established.

### Voice Agent (Fireside Chat)

Opens with "What's frustrating you right now when you work with AI?" — not "Let me tell you about ODD." The agent enters the user's story immediately. System concepts are introduced only when they directly address something the user has surfaced. The user should feel guided, not taught.

### Public Documentation

Documentation with `audience: public` should lead with the problem the document solves, not the internal concept it describes. Titles and blockquotes should be scannable from the user's perspective: "what will this help me do?" not "what is this system component?"

### Tool Descriptions and Onboarding

Tool descriptions name the user's action first: "Pressure-test a claim before committing to it" rather than "oddkit challenge function." Onboarding flows start with "what are you working on?" not "here's how oddkit works."

-----

## The Test — Three Questions for Every Public Surface

1. **Who is the hero?** If the answer is "our system" or "our methodology," the posture is broken. The hero must be the user.
1. **Does it open with their pain?** If the first thing a user encounters is a description of our system, the order is wrong. Pain first, plan second.
1. **Is the system revealed as a plan, not a product?** The user should encounter oddkit/ODD as "here's how we solve the problem you just recognized" — not "here's a product you should adopt."

-----

## Constraints — What Guide Posture Prohibits

Guide posture prohibits leading any public-facing surface with system terminology before establishing the user's problem.

Guide posture prohibits positioning oddkit or ODD as the hero of the story. They are what the guide offers to the hero.

Guide posture prohibits onboarding flows that require the user to learn the system before experiencing its value. Value first, vocabulary second.

Guide posture does not prohibit technical depth, system terminology, or detailed documentation — it only constrains *the order of encounter*. Once the user has chosen to go deeper, give them everything.

-----

## Guide Posture Is Portable to Users' Own Products

This constraint does not only govern how we present ourselves. It governs how we guide others to present themselves.

When we help someone build their product, launch their service, or shape their messaging, the same structure applies recursively. They are the hero of their story with us — and their customers are the hero of the story they're building. Our job as guide is to help them become guides themselves.

The three questions port directly into any product or outcome a user is building:

1. **Who is their customer's hero?** If the answer is the user's product, the posture is broken. The hero is the customer.
1. **Does their product open with their customer's pain?** If the first thing a customer encounters is a feature list or methodology, the order is wrong.
1. **Is the solution revealed as a plan?** The customer should encounter the product as "here's how we solve the problem you just recognized" — not "here's a system you should adopt."

This was demonstrated before the constraint was written. In a 30-minute Spanish-language voice session, the fireside chat agent guided a user through sharpening her product — online courses — for her customers. The agent didn't teach ODD. It didn't explain epistemic discipline. It asked what was frustrating her, challenged her assumptions, and helped her build a plan her customers would recognize as their own story. She walked away with clarity about her product, not knowledge about ours.

Guide posture is recursive: we guide users to become guides to their users. The constraint travels with whoever applies it.

-----

## Derivation — Why This Is a Canon Constraint, Not a Style Guide

This constraint derives from two canon values:

The trust kernel (`canon/values/trust-kernel.md`): trust is built by managing expectations. Leading with the user's pain sets the expectation "we understand your situation." Leading with our system sets the expectation "you need to understand our system." The first manages expectations toward trust. The second creates an expectations gap.

Axiom 1 — Reality Is Sovereign (`canon/values/axioms.md`): the user's reality is their experience of frustration with AI collaboration. If we don't observe and name that reality first, we're asserting our system's importance before establishing it. That's a claim without evidence — Axiom 2 violation.

This is not a marketing preference. It is epistemic discipline applied to how we present ourselves.
