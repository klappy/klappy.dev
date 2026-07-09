---
uri: klappy://canon/constraints/seeded-response-standard
title: "Seeded Response Standard — Never Ask for a Decision Without Seeding the Easy Answers"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: stable
tags: ["canon", "constraint", "seeded-response", "informed-multiple-choice", "legibility", "reviewability", "bottleneck-respect", "operator-attention", "decision-cards", "pr-descriptions", "dispatcher", "hud", "delivery", "e0010"]
epoch: E0010
date: 2026-07-09
derives_from: "canon/constraints/actionable-output-in-actionable-form.md, canon/constraints/reviewability-standard.md, canon/constraints/mode-discipline-and-bottleneck-respect.md, canon/values/axioms.md"
complements: "canon/constraints/reviewability-standard.md, canon/constraints/visual-proof.md"
governs: "Every point in the system where the captain (or any user) is asked to make a decision or give feedback — dispatcher/agent chat, PR descriptions, and board/HUD feedback and decision cards"
status: active
target_repo: "outcomes-driven-development"
---

# Seeded Response Standard — Never Ask for a Decision Without Seeding the Easy Answers

> Companion to the legibility and reviewability standards. The legibility standard makes work *readable*; the reviewability standard makes it *reviewable*; this standard makes a decision *answerable* — with as little friction as it took to make it legible and reviewable. Everywhere the system asks the captain to decide or give feedback, it MUST seed a few happy-path answers: 2–4 quick-pick options with one clearly recommended default, while always leaving free-text / "other" open. The human should be able to answer with a tap or a single number, never forced to compose a response from scratch. Big decisions get clickable buttons; fast ones get numbered quick-picks. Captain ruling, 2026-07-09. The seed is respect for the captain's time and attention — it drives the cost-to-respond toward zero.

## Description

Under Epoch 10, the captain's attention is the system's bottleneck, and every question the system poses spends it. A bare, open-ended question — "What should we do here?" — inverts the cost the same way a review with no preview URL does: it hands the captain a blank page and makes him do the framing work the crew should have already done. The crew saw the options; the crew formed a recommendation; asking the question without them throws that work away and bills the captain to reconstruct it.

This standard is the third sibling on the axis of the captain's cost. The legibility standard governs whether work can be *understood*. The reviewability standard governs whether work can be *reached* and exercised. This standard governs whether a decision can be *answered* in one gesture. All three travel together: legible-but-unanswerable still taxes the captain, because reading a clear question and then having to compose the whole reply from nothing is still friction the crew could have absorbed.

It is also the decision-shaped sibling of "A Link Is a Tap, Not a String." That constraint says an actionable output must be delivered in its lowest-friction actionable form. A request for a decision *is* an actionable output pointed back at the human, and the human's response is the action. The seeded quick-picks are to a decision what a markdown link is to a URL: same information, opposite cost. The crew eats the framing cost so the captain never eats the composition cost.

Seeding is not railroading. The recommended default is a recommendation, not a lock; the free-text / "other" path is always open so the captain is never boxed into the crew's framing. The point is to make the *easy* answer trivial to give, not to make the hard answer impossible.

## The Three Surfaces

This binds every place the system asks the captain to decide, and explicitly the following three.

**Dispatcher / agent chat.** Any question the crew puts to the captain seeds numbered quick-picks — or clickable buttons when the call is large — with a recommended default called out. Free-text is always open. The captain should be able to answer "2" or tap a button and move on, or type a full reply when he wants to. A question surfaced as bare prose with no seeded options is the lapse.

**PR descriptions.** When a PR surfaces a decision or asks the captain for a call, it presents that decision as a short labeled menu of pickable choices with a recommendation marked — not a wall of prose the captain must read, distill into options himself, and then answer freehand. This ties directly to the legibility standard: the PR is already required to be readable; a decision inside it is not fully legible until its options are laid out as choices rather than buried in paragraphs.

**Board / HUD feedback and decision cards.** Feedback prompts and decision cards on the board/HUD are rendered as informed multiple-choice, answerable in one click, with the recommended option marked. This ties to the HUD write-back and decision-card design: a card that asks for a call is a card with buttons, not a card with a text box and nothing else. The one-click answer is the default path; a write-in remains available.

## Operating Constraints

- MUST seed 2–4 happy-path quick-pick options wherever the captain is asked to make a decision or give feedback
- MUST mark one option as the clearly recommended default, carrying the crew's recommendation, not a neutral shrug
- MUST always leave a free-text / "other" path open — seeding never removes the captain's ability to answer outside the menu
- MUST render big decisions as clickable buttons and fast decisions as numbered quick-picks (the captain's "option 3 = both": choose the form by the weight of the call)
- MUST make the seeded answer reachable in a single gesture — one tap or one number — with no composition required to take the recommended path
- MUST NOT hand the captain a bare, open-ended question when the crew has already seen the option space
- MUST apply on the dispatcher/agent chat, in PR descriptions, and on board/HUD feedback and decision cards

## Defaults

- Prefer a recommended default over an unranked list; the crew's judgment is part of the deliverable
- Prefer buttons for consequential or irreversible calls, numbers for quick or low-stakes ones
- Keep the option set small — 2 to 4 — so the choice is scannable at a glance; more than four is a menu, not a seed
- Label each option with the outcome it selects, not with internal jargon, so the captain can pick without decoding
- When genuinely unsure what the options are, say so and seed the best two you can rather than defaulting to a blank prompt

## Failure Modes

- **Blank-Page Question**: "What do you want to do?" with no seeded options, forcing the captain to compose the frame and the answer both
- **Unranked Menu**: options listed with no recommendation, making the captain do the weighing the crew should have done
- **Menu Without an Exit**: quick-picks with no free-text / "other," boxing the captain into the crew's framing
- **Wall-of-Prose PR Decision**: a PR that asks for a call by narrating it in paragraphs instead of presenting pickable choices
- **Text-Box Decision Card**: a HUD/board card that requests feedback with only a write-in field where one-click options were owed
- **Form-Mismatch**: burying a big, consequential decision in a terse numbered list, or ceremonializing a trivial one with heavy buttons

## Verification

- Every captain-facing decision or feedback prompt carries 2–4 seeded options with a marked recommended default
- A free-text / "other" path is present on every seeded prompt
- The recommended path is answerable in a single tap or single number, with no freehand composition required
- Big calls render as buttons; fast calls render as numbered quick-picks
- On all three surfaces — dispatcher chat, PR descriptions, board/HUD cards — decisions appear as pickable choices, not bare prose or empty text boxes

## When This Does Not Apply

- Open-ended creative or exploratory prompts where enumerating options would foreclose the point (e.g., "what should we name this?" when the crew has no informed shortlist)
- Moments where the captain has explicitly asked for a free-form conversation rather than a decision
- Purely informational replies that ask nothing of the captain
- Cases where the crew genuinely cannot form a shortlist; the honest "here's the one option I see, or tell me otherwise" is still a seed, not a blank page

## Why This Is Necessary

A question is cheap for the crew to ask and expensive for the captain to answer from scratch — the exact inversion the bottleneck-respect discipline exists to prevent. The crew has already walked the option space by the time it forms a question; withholding that walk and handing over a blank prompt throws away work the captain then has to redo. Seeding the answers is the same respect the reviewability standard encodes for review and the tap-not-string constraint encodes for links: the crew absorbs the friction so the captain doesn't. A false or lazy "what do you think?" costs more than an honest "here are the three live options, I recommend the second, or say otherwise." Reducing the captain's cost-to-respond to near zero is not a convenience; it is how the crew keeps the bottleneck flowing.

## See Also

- [A Link Is a Tap, Not a String — Deliver Actionable Output in Its Actionable Form](/canon/constraints/actionable-output-in-actionable-form.md) — the delivery-form sibling this standard applies to decisions
- [Reviewability Standard](/canon/constraints/reviewability-standard.md) — companion on the axis of access
- [Visual Proof Standards](/canon/constraints/visual-proof.md)
- [Mode Discipline and Bottleneck Respect](/canon/constraints/mode-discipline-and-bottleneck-respect.md)
- [Epoch 10 — Flight Crew](/docs/appendices/epoch-10.md)
- [Constraints](/canon/constraints/README.md)
