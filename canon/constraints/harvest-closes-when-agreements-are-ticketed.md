---
uri: klappy://canon/constraints/harvest-closes-when-agreements-are-ticketed
title: "A Harvest Closes When Its Agreements Are Ticketed — Milestone Work Is Tagged at Filing, Never Dropped"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["canon", "constraint", "harvest", "meetings", "ticketing", "milestone", "tags", "status", "cookbook", "delivery", "anti-pattern"]
epoch: E0012
date: 2026-10-26
derives_from: "canon/constraints/actionable-output-in-actionable-form.md, canon/principles/status-carries-three-tenses.md, canon/values/axioms.md"
complements: "canon/constraints/actionable-output-in-actionable-form.md, canon/principles/status-carries-three-tenses.md"
governs: "Every harvest pass that turns a meeting, call or correspondence into project knowledge — in any cookbook or project that keeps work as filed units — and every work unit bound to a named milestone"
status: active
target_repo: "outcomes-driven-development"
---

# A Harvest Closes When Its Agreements Are Ticketed — Milestone Work Is Tagged at Filing, Never Dropped

> A harvest pass closes only when every change the source agreed to is a filed work unit; a unit bound to a milestone carries that project's current milestone tag from the moment it is filed; and a tagged unit that misses its freeze is queued with the miss recorded, never dropped.

---

## Simple Rules

- **Use when:** Use when a harvest pass turns a meeting, call or correspondence into project knowledge and the source agreed to a change, fix or preparation item.
- **Skip when:** Skip when the source agreed to nothing actionable, or the project keeps no filed work units.
- **Stop when:** Stop when every agreed item is a filed unit (new, or existing with the new source cited) and every milestone-bound unit carries the tag.
- **Keep going when:** Keep going while any agreement lives only in a journal row, state file or summary, or a milestone-bound unit lacks its tag.
- **Where:** The project's harvest procedure and its work-unit store; the tag vocabulary lives in each project's own procedure.
- **Who:** Whoever runs the harvest pass; the owner is the one the source named.
- **Why:** An agreement that is not filed is forgotten; a milestone item tagged late is invisible to the status walk that should find it.
- **What:** One unit per agreement, the source cited beside it, the milestone tag at filing, the miss rowed if a freeze is missed.
- **How:** Read the project's declared milestone tag, file or attach each agreement, tag at filing, queue and row any miss.

---

## Summary — An Agreement Not Filed Is an Agreement Lost

Meetings produce agreements; summaries do not keep them. A harvest that records "we agreed to X" in a journal row, a state file or a recap has captured the information in a form nobody acts on. This is the delivery failure named by [`actionable-output-in-actionable-form`](klappy://canon/constraints/actionable-output-in-actionable-form) applied to commitments: an agreement is delivered only when it is a unit someone can claim. The harvest is therefore not complete — whatever else it captured — until each agreement has a filed unit.

Milestone work adds a second obligation. A status walk for a milestone can only find what carries the milestone's tag, so the tag is applied when the unit is filed, not when someone remembers later. And under [`status-carries-three-tenses`](klappy://canon/principles/status-carries-three-tenses), a tagged unit that misses its freeze is moved to the project's queue with the miss recorded — its history stays legible instead of vanishing.

---

## The Constraint

1. **The pass closes on tickets, not on notes.** Before a harvest pass is recorded complete, every change, fix or preparation item the source agreed to is a filed work unit. An item that already has a unit gets the new source cited beside it — never a duplicate.
2. **Each unit names its source and owner.** The unit cites a neutral pointer to the source evidence and the owner the source named. It does not copy transcripts, quotations or sensitive detail into the unit.
3. **Milestone-bound units are tagged at filing.** A unit whose outcome must be live, printed or rehearsed for a named milestone carries the project's current milestone tag from the moment it is filed. Each project declares its own tag and where it appears (frontmatter, title, or both); the rule names no tag.
4. **The tag is machine-readable.** A status walk for the milestone reads the declared tag field, not only titles, so every tagged unit is found.
5. **A missed freeze is queued and rowed, never dropped.** A tagged unit that misses its milestone's freeze window moves to the project's queue with the miss recorded on its record. It is not deleted, silently untagged, or left in place as if on track.

---

## Failure Modes

- **Recap-as-ticket.** The agreement is written into a summary or state file and the pass is marked done.
- **Late tag.** A milestone item is filed untagged and tagged weeks later, after the milestone walk has already missed it.
- **Duplicate on re-harvest.** A second source for the same agreement creates a second unit instead of citing beside the first.
- **Silent drop.** A tagged unit that cannot make the freeze disappears from the milestone list with no record of why.

---

## Example (illustrative, not binding)

A project declares `summit` as its current milestone tag, carried as `tags: summit` in the unit's frontmatter and `[summit]` in its title. A planning meeting agrees to three changes, one of them needed for the summit. The harvest files three units, each citing its source pointer and named owner; the summit one carries both tag forms from filing. When it cannot land before the summit's freeze, it moves to the queue with a row naming the miss.

---

## Prior Art (cited, not restated)

- [`klappy://canon/constraints/actionable-output-in-actionable-form`](klappy://canon/constraints/actionable-output-in-actionable-form)
- [`klappy://canon/principles/status-carries-three-tenses`](klappy://canon/principles/status-carries-three-tenses)
- `klappy/3d-review-cookbook` `HYGIENE.md` §§11–12 and `PROCEDURE.md` step 7 @ `331fea8` — first project copy of this rule.
- `klappy/fia-app-cookbook` `harvest/PROCEDURE.md` step 6 @ `127976e` — second project copy, public-repo wording.

Those project copies are the origin of this constraint; once this lands, each is meant to point here and keep only its own milestone tag declaration.
