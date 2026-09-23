---
uri: klappy://canon/methods/writing-simple-rules
title: "Writing Simple Rules — Nine Routing Lines That Decide Load, Skip, or Put Down Before the Body Enters Context"
status: tasting
date: 2026-09-23
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: draft
tags: ["canon", "method", "simple-rules", "routing", "progressive-disclosure", "jev", "skills", "context-economy"]
relevance: decision
derives_from: "canon/meta/writing-canon.md, canon/principles/dry-canon-says-it-once.md"
complements: "canon/constraints/legibility-standard.md (worked example, PR #330), canon/resonance/jev-system-one.md, docs/guides/jev-in-the-odd-stack.md"
governs: "Writing, revising, and testing the `## Simple Rules` section of any canon document"
target_repo: "outcomes-driven-development"
---

# Writing Simple Rules

> A `## Simple Rules` section is nine one-line rules that let a reader route a document (load it, skip it, or put it down) before its body enters context. Write each line to answer only that routing question, point to the body instead of restating it, and keep it short. When a router misreads the lines, fix the doc or swap the router (Jev). Never make the lines longer. This guide is candidate skill #1 for the ODD skills pack. Friction with reality improves it.

## Simple Rules

- **Use when:** Use when writing, revising, or testing the `## Simple Rules` section of a canon document.
- **Skip when:** Skip when writing the document body, frontmatter, blockquote, or Summary; skip for docs that carry no Simple Rules section.
- **Stop when:** Stop once the section has its nine lines, each passes the Line Rules table, and the rules-only test agrees with the full-doc reader.
- **Keep going when:** Keep going while a test reader disagrees with the full-doc reader: trace the miss to the line, the doc, or the scenario before editing anything.
- **Where:** `canon/**`, `odd/**`, and `docs/**` documents: principles, constraints, methods, and policies.
- **Who:** Any author or agent adding or changing a Simple Rules section, and whoever tests one.
- **Why:** Routing on about 1.6KB of lines instead of the full body saved 74–92% of routing input in the pilots (see Evidence).
- **What:** A method: the nine-line template, the guidelines learned from pilot misses, and the test that checks a section against its doc.
- **How:** Fill the Line Rules table in order, check the Guidelines rows, then run the test in How to Test a Section.

---

## Summary — The Section Routes; the Body Governs

A reader, human or model, sees a document's title, blockquote, and Simple Rules and has to decide: load the body, skip it, or put it down. The section exists only to make that decision correctly and cheaply. It is not a second summary and it does not grant or forbid actions. Nine lines, one sentence each, placed right after the blockquote. `oddkit_get section: "Simple Rules"` returns the section by itself, so routers read it without the body.

Pilots on six boarding docs (kitchen `rail/1-ordered/2026-09-23-simple-rules-sidecar`, RESULTS.md and RESULTS-2.md) found a rules-only Sonnet reader matched the full-doc reader 50/54 times while reading 74–92% fewer bytes. Every miss traced back to a template ambiguity, a soft edge in the doc, or a scenario gap. None came from the lines being too short.

---

## Line Rules — Nine Lines, One Job Each

| Line | Answers | Rule |
|---|---|---|
| Use when | Load this doc for this situation? (yes cases) | Open with "Use when …", the same shape as a Skills `description`. Name concrete situations. |
| Skip when | Load this doc for this situation? (no cases) | Name the near-misses a reader would plausibly confuse with Use. |
| Stop when | When does this doc stop governing? | Scope exit only: the job is done or the work left the doc's scope. Never an in-flight tripwire. |
| Keep going when | What keeps it governing? | In-flight conditions and tripwires go here (or in How). |
| Where | Which surfaces or paths? | Paths or globs when possible, so a router can match without a model call. |
| Who | Which actors? | Roles, never named seats or people. |
| Why | Why load it? | One clause of stakes, then point to the doc's WHY section. |
| What | What kind of doc, and its core claim? | Doc kind (constraint, method, principle) plus the claim in one clause. |
| How | Where to act from? | Point to the body sections by name. Do not restate steps. |

Use and Skip answer only "should this document be loaded for this situation?". Do not phrase them as allowed/forbidden, may/must, or "governs".

---

## Guidelines — Learned From Friction

| # | Guideline | Friction it came from |
|---|---|---|
| 1 | Stop when = the doc stops governing (scope exit). Tripwires go in Keep going or How. | RESULTS-2 miss 1: MOC and DDNE cooks wrote Stop as "stop doing X"; readers answered the stop question with the action trigger. |
| 2 | Ask routers "Should this document be loaded for this situation?" Never "does it govern" or "APPLY". | RESULTS-2 miss 2: Haiku read APPLY as "the agent may do this" and inverted DDNE (3/9). |
| 3 | The rules inherit the doc's soft edges. When readers split, fix the doc body first, then the line. | RESULTS S6 (async status note vs log row); RESULTS-2 miss 4 (SRS S2/S6/S9: full-doc reader and key disagreed). |
| 4 | Keep lines metaphor-neutral: plain roles and nouns, not the current project vocabulary. | TICKET seasoning (k0119): "It should be universal and swappable." |
| 5 | Point, don't restate. How and Why name body sections; a restatement is a drift surface. | TICKET door read: dry-canon-says-it-once guard. |
| 6 | One sentence per line, nine lines, about 1.5–1.9KB total. | RESULTS-2 rules bytes 1,515–1,912 held 91% R-vs-F agreement. |
| 7 | Skip names concrete near-misses, not a general "anything else". | RESULTS S2–S5, S7, S9: listed skips agreed 6/6. |
| 8 | Test scenarios state their preconditions (tools present, audience, surface). | RESULTS-2 miss 3: MOC S2/S3 missed because oddkit's presence was unstated. That was a scenario gap, not a rules gap. |

---

## Brevity Rule — A Failing Router Is Not a Reason to Lengthen Rules

When a small model routes badly on good lines, change the router, not the lines. Captain, verbatim (2026-09-23): "once Sonnet and Haiku can route a bit better, we may realize Haiku is not capable. that shouldn't mean we write more verbose rules. far from it. It means we need Jev testing and use it instead of Haiku for this step."

Order of fixes: the template wording (Guidelines 1–2), then the doc body (Guideline 3), then the scenario (Guideline 8), then the router (swap to a System-One classifier such as Jev, `klappy://canon/resonance/jev-system-one`). Adding words to the lines is not on the list.

---

## How to Test a Section

| Step | Reader | Sees | Output |
|---|---|---|---|
| 1 | Scenario writer | Full doc, blind to the section | 9 situations + 1 stop question + an answer key; each situation states its preconditions |
| 2 | Rules-only reader | Title + the nine lines, no tools | load / skip per situation; stop answer |
| 3 | Full-doc reader (control) | Full doc without the section | same |
| 4 | Small-model reader (optional) | Same as step 2 | same; a miss here tests the router, not the lines |

Question wording, verbatim for every reader: **"Should this document be loaded for this situation? Answer LOAD or SKIP."** Stop question: **"When does this document stop governing the work in situation N?"**

Pass: rules-only agrees with the full-doc reader on at least 8 of 9 and the stop answer names a scope exit. Trace each miss to line, doc, or scenario (Guidelines 3 and 8) before editing.

---

## Prior Art It Borrows

| Source | Borrowed |
|---|---|
| Agent Skills `SKILL.md` `description` | The "Use when …" shape. Harnesses already load a body only when this line matches. |
| Cursor rules activation modes (always, globs, agent-requested, manual) | Where as path globs, a match that needs no model. |
| AGENTS.md | A repo-level map of docs plus their Use lines as the index routers board first. |
| *Simple Rules* (Sull & Eisenhardt, 2015): boundary, prioritizing, stopping, how-to, coordination, timing | The stopping kind (Stop when), which the original six W's lacked. Use/Skip are boundary rules. |

---

## Evidence

| Pilot | Docs | Saved | Rules-only vs full doc | Haiku vs full doc |
|---|---|---|---|---|
| RESULTS.md (#330) | 1 | 92% | 9/9 | — |
| RESULTS-2.md (#331–#335) | 5 | 74–91% | 41/45 | 36/45 |

Not proven yet: same model family for writer and readers; no Jev run; six docs.

---

## A Candidate Skill — Improved by Friction With Reality

This guide is candidate skill #1 for the ODD skills pack (kitchen `rail/1-ordered/2026-09-23-odd-skills-pack`). Captain, verbatim (2026-09-23): "That doc guide for writing simple rules, itself could be a skill. Maybe this is our first skill. and we iteratively improve it with our frictiion with reality. only build what hurts ;)"

Add a Guidelines row only when a test miss earns it, and cite the row that produced it.
