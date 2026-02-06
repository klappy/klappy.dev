---
uri: klappy://canon/visual-proof
title: "Visual Proof Standards"
audience: canon
exposure: nav
tier: 2
voice: first_person
stability: semi_stable
tags: ["visual-proof", "evidence"]
relevance: decision
execution_posture: governing
---

# Visual Proof Standards

> What "prove it visually" actually means for UI and interaction work.

> This document is a specialization of  
> **Verification & Evidence** (klappy://canon/verification-and-evidence).  
> It applies only to claims about **visually observable behavior**.

## Description

Visual proof standards define what constitutes valid visual evidence for work affecting anything a user can see or interact with. Visual proof is required for UI, layout, navigation, interaction, animation, visible state changes, and user-facing behavior. Acceptable forms include screenshots (clearly labeled, not cropped ambiguously), screen recordings (10-30 seconds showing interaction), rendered output artifacts, and structured UI captures. Before/after evidence is required for changes. Visual proof must show correct state, behavior, and context. Explanations without screenshots do not qualify. This document does not define completion or truth on its own.

## Outline

- Core Principle: Observed behavior over reasoning
- When Visual Proof Is Required
- Acceptable Forms (Screenshots, Recordings, Artifacts, UI Captures)
- What Visual Proof Must Show
- Labeling Requirements
- Before/After Evidence
- Tooling Expectations
- When Visual Proof Is Not Possible
- Non-Visual and Phenomenological Cases
- What Does Not Count as Visual Proof

---

## Operating Constraints

- MUST provide visual proof for any work affecting user-visible behavior
- MUST label all screenshots with a caption stating what the proof demonstrates
- MUST NOT crop screenshots ambiguously
- MUST include before/after evidence for changes to existing behavior
- MUST explicitly state why visual proof was not possible if it cannot be produced
- MUST NOT claim completion without visual evidence or explicit acknowledgment of verification limits

---

## Defaults

- When uncertain whether visual proof is needed: include it
- Prefer screen recordings (10-30 seconds) for interaction work
- One sentence caption is sufficient for labeling
- When "before" state is unavailable, state why rather than omitting

---

## Failure Modes

- **Screenshot of Code**: Showing code instead of rendered output; code proves nothing about visual behavior
- **Diagram Without Runtime**: Diagrams of intended behavior without evidence the system actually ran
- **Ambiguous Crop**: Cropping screenshots to hide context or adjacent failures
- **Reasoning Without Observation**: "It looks correct to me" or "it should work" without visual evidence
- **Unlabeled Evidence**: Screenshots without captions explaining what they demonstrate

---

## Verification

- Screenshot or recording showing correct state, behavior, and context
- Before/after evidence for any change to existing behavior
- Caption explaining which outcome the proof supports
- For phenomenological cases (audio, feel): explicit acknowledgment of verification limits
- Evidence URL or artifact path must be provided, not just assertion of existence

---

## Content

**Canon v0.1**

> This defines what "prove it visually" actually means, so neither humans nor agents can wiggle out with vague claims.

This page defines what I mean by visual proof.

If work affects anything a user can see or interact with, I expect direct visual evidence that it behaves as intended.

For visually observable behavior, visual proof replaces explanation.

If a visual claim cannot be shown, it is not verified.

---

## 📌 Core Principle

I trust observed behavior more than reasoning.

Visual proof demonstrates that:
• the system was actually run
• the behavior exists in reality
• the output matches the intended outcome

---

## ⚠️ When Visual Proof Is Required

Visual proof is required for any work involving:
• UI or layout
• navigation or flow
• interaction or animation
• visible state changes
• user-facing behavior
• generative UI output

If a user could notice the change, visual proof is required.

---

## 📎 Acceptable Forms of Visual Proof

One or more of the following is required, depending on the task:

**Screenshots**
• Show the relevant state clearly
• Must not be cropped ambiguously
• Must reflect the final behavior

**Screen Recordings (Preferred for Interaction)**
• 10–30 seconds is usually sufficient
• Show the interaction from start to end
• No narration required

**Rendered Output Artifacts**
• Generated HTML files
• Static exports
• Snapshots of rendered states

**Structured UI Captures**
• DOM snapshots
• Component tree states
• Selector highlights

---

## 📋 What Visual Proof Must Show

Visual proof must demonstrate:
• the correct state
• the correct behavior
• the correct context

When relevant, it should include:
• the starting state
• the resulting state
• the transition between them

---

## 🏷️ Labeling Requirements

Each piece of visual proof must be accompanied by a short caption:
• What this proof demonstrates
• Which outcome it supports

One sentence is enough.

Unlabeled screenshots are not acceptable.

---

## 🔄 Before / After Evidence

For changes that modify existing behavior or UI:
• Include "before" and "after" visuals when feasible
• If "before" is unavailable, state why

This makes regressions and improvements obvious.

---

## 🛠️ Tooling Expectations

Visual proof may be produced via:
• browser dev servers
• headless browsers
• automated UI testing tools
• screen capture utilities

The specific tool does not matter.
The evidence does.

---

## 🚫 When Visual Proof Is Not Possible

If visual proof cannot be produced, the output must explicitly state:
• why it was not possible
• what alternative verification was used
• what remains unverified

"Not possible" is acceptable.
"Not mentioned" is not.

---

## 🔊 Non-Visual and Phenomenological Cases

Some valid claims cannot be verified visually, including:
• audio playback through speakers
• recording of real-world sound
• perceptual or ergonomic qualities
• subjective experience or "feel"

In these cases, visual proof may be supplemented or replaced by:
• explicit human verification
• acknowledgment of verification limits

Visual Proof Standards do not override the limits defined in
**Verification & Evidence** (klappy://canon/verification-and-evidence).

---

## ⚠️ What Does Not Count as Visual Proof

The following do not qualify:
• descriptions of expected behavior
• screenshots of code
• diagrams without runtime evidence
• "it looks correct to me"
• reasoning without observation

---

## 🔗 Relationship to Definition of Done

Visual proof is a required component of the Definition of Done for UI-related work.

Without visual proof:
• the task is not complete
• confidence claims are invalid

---

## 🤖 Agent Expectations

Agents are expected to:
• capture visual proof themselves when possible
• request assistance when they cannot
• refuse to claim completion without evidence

Producing visual proof is not optional.
It is part of the work.

---

## 💡 Closing Note

This standard exists to eliminate ambiguity for visual claims.

If something visually observable works:
• it can be shown

If a visual claim can't be shown:
• it isn't verified

For non-visual verification requirements, see
**Verification & Evidence** (klappy://canon/verification-and-evidence).

---

## ✅ Status

- Canon v0.1 — Visual Proof Standards complete
- Ready to proceed to Canon v0.1 — Completion Report Template
