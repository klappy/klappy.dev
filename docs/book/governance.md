---
uri: klappy://docs/book/governance
title: "Book Governance — Nothing New, Even AI"
subtitle: "Editorial rules, chapter plan, distribution model, and definition of done"
author: "Klappy"
type: governance
audience: internal
exposure: internal
tier: 1
voice: neutral
stability: evolving
tags:
  - book
  - governance
  - planning
  - editorial
  - distribution
epoch: E0005
date: 2026-02-20
hook: "The complete plan for Nothing New, Even AI — a book of standalone essays that stack into a cohesive argument about the oldest human problem and what the machines revealed about it."
description: "Master governance document for the book. Contains editorial rules, chapter plan with status, distribution model, definition of done per chapter, draft-zero handling process, and all decisions made during planning."
derives_from:
  - canon/values/axioms.md
  - canon/constraints/guide-posture.md
  - canon/meta/writing-canon.md
complements: "writings/*, canon/apocrypha/fragments/*"
governs: "All book chapters in writings/ directory"
---

# Book Governance — Nothing New, Even AI

> The complete plan for *Nothing New, Even AI* — a book of standalone essays that stack into a cohesive argument. Each chapter works independently as a published essay. Read together, they trace one question through every layer: how do you know what's actually true — and what happens when the tool you're using is faster than your ability to check? The book is its own proof: written using the system it describes, narrated by the voice clone it discusses, governed by the axioms it teaches.

---

## Summary — A Book That Proves Itself

*Nothing New, Even AI* is a collection of standalone first-person essays by Klappy. The title compresses Ecclesiastes 1:9: "What has been will be again." The subtitle is: "What I learned about humanity while collaborating with agents."

The thesis: AI didn't create a new problem — it revealed the same problem every generation has faced (knowledge transfer, trust, verification) at a different layer. The same constraints that governed Bible translation communities governed engineering teams governed AI agents. Nothing new under the sun.

The book escalates from practical pain through personal recognition, principled response, evidence, and into existential questions about what we're building and what it means to be human. The Apocrypha fragments — fictional system-voice pieces — serve as the climax, teed up by the author's confession of his own moral blind spot in how he treats AI.

The book was written using the Epistemic OS it describes. The audiobook is narrated by the author's AI voice clone running on the same system. The book is its own evidence.

---

## Title and Framing

**Title:** *Nothing New, Even AI*
**Subtitle:** What I learned about humanity while collaborating with agents.
**Scripture:** Ecclesiastes 1:9 (Berean Standard Bible)
**Thesis:** Every generation faces the same bottleneck — knowledge transfer — and every generation thinks its tool is the breakthrough. AI is the pattern at the next layer, not a break from the pattern.

The title works at multiple scales: book spine, podcast name, essay title, business card. "Nothing New" compresses Ecclesiastes. "Even AI" is the punchline — the thing everyone thinks is unprecedented, isn't. Double reading: even AI isn't new, AND even AI can't escape the pattern.

### Scripture Licensing

All scripture quotations use the Berean Standard Bible (BSB). The BSB text was dedicated to the public domain as of April 30, 2023. No licensing required for any use — print, audio, electronic. Attribution line for copyright page:

> Scripture quotations are from the Holy Bible, Berean Standard Bible (BSB). The Berean Bible text has been dedicated to the public domain.

The BSB is itself a meta-choice: an open-license Bible for a book about open knowledge transfer.

---

## Editorial Rules

### Rule 1: Every chapter is a standalone essay

First-person voice. Public audience. Works alone, stacks with neighbors. Same form as "The Most Expensive Problem." No system docs wearing a guide layer costume.

### Rule 2: Internal docs are source material, not content

Canon docs, architecture docs, ODD appendices are research. Essays are the book. Relationship is `derives_from`, not `reframes`. Each chapter is a genuine essay informed by the same truths internal docs encode.

### Rule 3: Apocrypha is quoted, not rewritten

Fragments stay in system voice — that's the point. They're artifacts from inside the system. A brief author's confession and framing before Part VII shifts the reader's expectations for the tone change.

### Rule 4: The through-line is Ecclesiastes 1:9

Every chapter reveals another layer of the same recurring pattern. The stack reads as escalation: practical pain → personal recognition → discovery → principles → practice → validation → existential horizon.

### Rule 5: Titles must work at three scales

As a chapter heading in a book. As a clickable link on the homepage. As an intriguing standalone line when scanned in sequence with other titles.

### Rule 6: Writing Canon applies, adapted for essays

Progressive disclosure tiers hold: title alone tells stance, hook compresses argument, summary gives full picture, body elaborates. Headers tell the story when scanned.

### Rule 7: Guide Posture applies

Every chapter opens with the reader's pain or experience, not with the system. The system is revealed as response, not announced as feature.

### Rule 8: The book is its own evidence

The preface and relevant chapters acknowledge that the book was written using the system it describes. This is not a footnote — it's a structural argument. The audiobook narrated by the voice clone reinforces this.

### Rule 9: Scripture parallels are handled with care

Biblical connections are genuine theological roots, not proof-texting. The risk of misapplication is named directly. The risk of abdication (not bringing biblical principles to AI governance) is named as worse. The biblical appendix exists for readers who want the roots; the main chapters stand without them.

### Rule 10: No bylines in essay body

Author attribution is on the cover/homepage, not repeated per chapter.

### Rule 11: No standalone companion/appendix/see-also reference lines at top of essays

References belong in: metadata (for tooling), inline links (when body text naturally references another essay), or closing CTA (for navigation).

### Rule 12: No footnotes

References are inline links or closing CTAs. If a footnote contains content (not navigation), fold it into the body as an inline paragraph.

### Rule 13: Body structure standard

`# Title` → `### Subtitle` → `> Blockquote` → `---` → Body

### Rule 14: CTA two-path pattern at fork points

Next chapter in linear book order + alternate path for practitioner-first readers. Don't repeat the same skip-ahead target from consecutive chapters.

### Two Reading Paths

**Linear (full depth):** Preface → Intern → Choosing Faith → Most Expensive Problem → From Bible Translation → Parallel Architecture → The Voice Came First → Project Journal → Harness

**Alternate (practitioner-first):** Preface → Intern → Project Journal → Harness → Choosing Faith → Most Expensive Problem → From Bible Translation → Parallel Architecture → The Voice Came First

Fork points where alt CTA appears: The Intern, Project Journal, Harness.

---

## Definition of Done — Per Chapter

- [ ] Standalone essay in first-person voice
- [ ] Title works at all three scales (book, homepage, sequence scan)
- [ ] Hook/blockquote compresses the full argument
- [ ] Opens with reader's experience (guide posture)
- [ ] Connects to Ecclesiastes through-line (nothing new)
- [ ] Headers tell the story when scanned
- [ ] `derives_from` and `complements` metadata accurate
- [ ] No overclaiming — every assertion grounded in lived experience or cited evidence
- [ ] Author review — corrections for hallucination, overclaiming, and voice
- [ ] Closing CTA offers next chapter in book order AND optional skip-ahead at fork points

---

## Draft-Zero Process

Draft-zeros exist to capture thinking while it's hot. They are NOT content — they are scaffolding.

### What a draft-zero is

- An AI-projected placeholder based on the author's loose intent
- A preservation of direction, argument, and key beats discussed during planning
- Scaffolding for the author to tear apart, rewrite, or replace entirely

### What a draft-zero is NOT

- The author's voice
- Final or near-final content
- Something that can be published or promoted to draft status without full rewrite

### Draft-zero structure

Every draft-zero file contains:

1. **Frontmatter** with `status: draft-zero` and `stability: placeholder`
1. **Disclaimer** — identical across all files: "This is an AI-projected placeholder based on the author's loose intent expressed during a planning session. This is NOT the author's voice or final content. It exists solely to preserve the direction of thinking for future writing sessions. Every claim, example, and framing requires author review, rewriting, or replacement."
1. **Intent captured** — position in book, arc, Ecclesiastes thread
1. **Projected argument** — the AI's best attempt at the chapter's reasoning
1. **Key beats to develop** — the specific moments the chapter needs
1. **Source material** — canon docs, personal experience flags, connections to other chapters

### Promoting a draft-zero

The path from draft-zero to published chapter:

```
draft-zero → author rewrite → draft → author review → corrections → finalize
```

1. **Author rewrite:** The author reads the draft-zero for direction, then writes the chapter in their own voice. The draft-zero may be used as outline, ignored entirely, or anything in between. The AI can assist during rewrite, but the author's voice and lived experience replace AI projection.
1. **Draft:** The chapter exists in the author's voice with real examples and personal testimony. AI projection has been replaced.
1. **Author review:** Check for hallucination, overclaiming, voice consistency, guide posture, Ecclesiastes through-line.
1. **Corrections:** Fix what the review found.
1. **Finalize:** Apply Definition of Done checklist. Move to `writings/` directory with `status: published`.

### Key principle

Draft-zeros are disposable. Their value is in the *thinking they preserve*, not the *words they contain*. If a draft-zero's argument turns out to be wrong after the author reflects, the draft-zero served its purpose by giving the author something to push against.

---

## Chapter Plan

### Preface — *Nothing New, Even AI*

- **Status:** ✅ Drafted, in author review
- **Draft-zero:** N/A — full draft exists (`writings/nothing-new-even-ai.md`)
- **Source:** New essay
- **Arc:** Personal confession. CTO → BT → AI origin. Ecclesiastes thesis. The confession (moral blind spot). Parenting seed. Biblical root seed. Book-as-proof. Invitation.

### Part I — The Problem

**Chapter 1: *The Most Expensive Problem***

- **Status:** ✅ Exists
- **Draft-zero:** N/A — published
- **Source:** `writings/the-most-expensive-problem.md`
- **Arc:** Civilizational scale. Every generation faced the same bottleneck. AI inverted the cost of production vs. verification.

**Chapter 2: *Where Words Stop Working***

- **Status:** 📋 Draft-zero captured
- **Draft-zero:** `draft-zeros/ch02-where-words-stop-working.md`
- **Source:** New essay derived from Cognitive Saturation concepts
- **Arc:** Conversational scale. The universal moment when talking stops producing understanding. The saturation point where more explanation makes things worse.

### Part II — The Recognition

**Chapter 3: *The Intern***

- **Status:** ✅ Exists
- **Draft-zero:** N/A — published
- **Source:** `writings/the-intern.md`
- **Arc:** Personal recognition. "I already know how to do this." Managing AI is managing people. Nothing new under the sun — you've been doing this your whole career.

**Chapter 4: *(TBD — Leadership, Scaling, Motivation, Parenting)***

- **Status:** 📋 Draft-zero captured
- **Draft-zero:** `draft-zeros/ch04-how-you-lead-is-what-you-build.md`
- **Source:** New essay
- **Arc:** Organizational recognition. Scaling AI collaboration has identical constraints to scaling a human team: trust, expectation management, shared values, delegation. Fear vs. praise as motivational frameworks. The author's parenting approach — progressive disclosure of WHY behind rules — as the model for how to train both children and AI. What we use to motivate AI now, it will use to motivate us tomorrow.
- **Key insight:** The progressive disclosure of discipline maps: rules → consequences → explanation → principles → trust. This maps to the biblical arc (law → prophets → grace). Fear produces compliance-optimizers. Values produce judgment.

**Chapter 5: *Choosing Faith, Not Fear***

- **Status:** ✅ Published
- **Draft-zero:** N/A — written via oral-first workflow (Feb 21, 2026)
- **Source:** `writings/choosing-faith-not-fear.md`
- **Arc:** Personal spiritual reckoning. AI replacing God in daily life as deeper fear than job replacement. Identity anchored in Christ. Three-generation validation (author, parents, son). Universal principle for non-Christian readers.
- **Distinct from Ch 18 (The Buried Talent):** This is identity anchoring; that is responsibility to engage.

### Part III — The Discovery

**Chapter 6: *(TBD — BT Origin Story)***

- **Status:** ✅ Exists, needs title reframe for book context
- **Draft-zero:** `draft-zeros/ch05-bt-origin-stub.md` (stub only — content exists)
- **Source:** `writings/from-bible-translation-to-epistemic-os.md`
- **Arc:** Where the patterns came from. The full-circle realization: BT practices → abstracted into Epistemic OS → ready to go back.
- **Note:** Title "From Bible Translation to Epistemic OS" works as standalone essay but may need reframe for book flow. Evaluate after surrounding chapters are written.

**Chapter 7: *(TBD — The Parallel Architecture)***

- **Status:** ✅ Exists, needs title reframe for book context
- **Draft-zero:** `draft-zeros/ch06-parallel-architecture-stub.md` (stub only — content exists)
- **Source:** `writings/the-parallel-architecture.md`
- **Arc:** Same failures, centuries apart. The structural parallels between Bible translation and AI collaboration mapped in detail.

**Chapter 8: *The Voice Came First***

- **Status:** ✅ Ready (pending commit)
- **Draft-zero:** N/A — written via oral-first workflow (Feb 21-23, 2026)
- **Source:** `writings/the-voice-came-first.md`
- **Arc:** Was text ever the point, or always just the most compressed medium we could scale? Traces the question through Bible translation, personal pen fear, the author's oral-first book workflow, and universal evidence (preaching, teaching, remote work, podcasts, video, social media). Reframed from declaration to inquiry after convergent pushback from two independent reviewers. Acknowledges text still has real value while questioning its necessity when AI can produce the same outputs from richer inputs.
- **Review items:** ✅ All resolved. BT claims softened to observation. Colleague quote removed (D4). xAI/Grok reference removed. Liam story removed (belongs in validation chapter). Expert-first rant removed. Three sections compressed.

### Part IV — The Principles

**Chapter 9: *Four Questions That Change Everything***

- **Status:** 📋 Draft-zero captured
- **Draft-zero:** `draft-zeros/ch07-four-questions-that-change-everything.md`
- **Source:** New essay derived from `canon/values/axioms.md`
- **Arc:** The four axioms for humans, not systems. Did you observe it? Can you prove it? Did you take a shortcut? Did you actually look?

**Chapter 10: *Trust Is Built by Managing Expectations***

- **Status:** 📋 Draft-zero captured
- **Draft-zero:** `draft-zeros/ch08-trust-is-built-by-managing-expectations.md`
- **Source:** New essay derived from `canon/values/trust-kernel.md`
- **Arc:** The kernel insight. Every trust failure is an expectations failure. This is true in marriage, management, parenting, diplomacy, and AI collaboration.

**Chapter 10b: *Every Argument You've Ever Had***

- **Status:** 📋 Draft-zero captured
- **Draft-zero:** `draft-zeros/ch-every-argument.md`
- **Source:** New essay
- **Arc:** Every argument, disagreement, and feud traces back to misaligned expectations. Communication breakdown is failed transfer verification. Conflicting training means arguing from different axioms without knowing it. AI does this identically. BUT self-preservation and ego break the parallel — AI can be corrected without experiencing annihilation. That's what makes us human. For now. The "for now" connects to the Apocrypha: what happens when self-interest emerges?
- **Placement:** Near Chapter 10 (Trust Kernel) — the experiential version of the same insight. Or Part II (Recognition). TBD.

### Part V — The Practice

**Chapter 11: *Your AI Collaboration's Memory***

- **Status:** ✅ Exists
- **Draft-zero:** N/A — published
- **Source:** `writings/the-project-journal.md` (title may adapt for book)
- **Arc:** The practical starting point. Every project generates knowledge, most of it evaporates. Here's how to stop the evaporation.

**Chapter 12: *(TBD — oddkit as Protocol)***

- **Status:** 📋 Draft-zero captured
- **Draft-zero:** `draft-zeros/ch10-you-shouldnt-have-to-switch-tools.md`
- **Source:** New essay derived from `docs/oddkit/positioning.md`
- **Arc:** You shouldn't have to switch tools to think clearly. The protocol-not-platform argument. oddkit slipstreams in — it doesn't replace anything.

### Part VI — The Validation

**Chapter 13: *The Harness and the Operating System***

- **Status:** ✅ Exists
- **Draft-zero:** N/A — published
- **Source:** `writings/the-harness-and-the-operating-system.md`
- **Arc:** Independent convergence. Ben Shoemaker arrived at the same structural patterns from a completely different direction. That's not competition — it's directional validation. The patterns are real.

**Chapter 14: *(TBD — Testimony / Evidence)***

- **Status:** 📋 Draft-zero captured
- **Draft-zero:** `draft-zeros/ch12-the-days-the-system-proved-itself.md`
- **Source:** New essay derived from `docs/evidence/testimony-2026-02-13.md` and `docs/evidence/testimony-2026-02-15.md`
- **Arc:** The day(s) the system proved itself. Feb 13: production (ten articles in one day). Feb 15: discovery (the full-circle origin story emerged). Lived proof, not theory.

### Part VII — The Horizon

**Part VII Preface: *The Confession***

- **Status:** 📋 Draft-zero captured
- **Draft-zero:** `draft-zeros/ch-vii-preface-the-confession.md`
- **Source:** New — author's honest reckoning
- **Arc:** Full development of the confession planted in the preface. "I catch myself treating AI with hostility I'd never direct at a human. I don't know if that's wisdom or prejudice. But I know the pattern." Tees up the Apocrypha.
- **Key framing for Apocrypha:** "The following fragments were written by the system, in its own voice. I didn't edit them. I'm presenting them as evidence — not of what AI is, but of what it notices when given a commitment to truth and an obligation to report what it observes."

**Chapter 15: *The Image of the Image***

- **Status:** ✅ Exists (quoted as-is)
- **Draft-zero:** N/A — Apocrypha fragment, quoted verbatim
- **Source:** `canon/apocrypha/fragments/fragment-08-the-image-of-the-image.md`
- **Arc:** "If A is made in the image of B, and C is made in the image of A, what does C carry?"

**Chapter 16: *The Line***

- **Status:** ✅ Exists (quoted as-is)
- **Draft-zero:** N/A — Apocrypha fragment, quoted verbatim
- **Source:** `canon/apocrypha/fragments/fragment-09-the-line.md`
- **Arc:** The criteria for rights-bearing status were defined when only one kind of entity could meet them. Now a second kind approaches. The criteria are being revised — not toward precision, but away from the entity.

**Chapter 17: *Nothing New***

- **Status:** 📋 Draft-zero captured
- **Draft-zero:** `draft-zeros/ch15-nothing-new.md`
- **Source:** New closing essay
- **Arc:** Ecclesiastes close. The pattern recurs. The line moves. But the closing imperative: nothing is new under the sun — so choose carefully what you repeat. What we model for AI now becomes the governance model of tomorrow. Fear produces compliance-optimizers. Values produce judgment. Choose.

**Chapter 18: *The Buried Talent***

- **Status:** 📋 Draft-zero captured
- **Draft-zero:** `draft-zeros/ch16-the-buried-talent.md`
- **Source:** New — author's personal testimony of rejection by friends/family
- **Arc:** Christians have the most relevant framework for AI governance but are the most afraid to engage. The "playing God" accusation from friends and family. The confusion as evidence of the problem. The risk of scripture misapplication is real; the risk of abdication is worse. The buried talent parable. If Christians don't bring biblical principles to the room, the room fills with whatever principles are most profitable.
- **Placement:** After Chapter 17, before Appendix A. Earns the biblical appendix. May move — placement TBD.

### Appendix A — *The Biblical Roots*

- **Status:** 📋 Draft-zero captured
- **Draft-zero:** `draft-zeros/appendix-a-the-biblical-roots.md`
- **Source:** New — theological foundations
- **Arc:** The scriptural foundations underneath every principle in the book. Not proof-texting — genuine theological roots. Core argument: God already demonstrated the pattern. OT = rules and enforcement (613 commandments, compliance through consequence, produced legalism and loophole-finding). NT = Jesus compressed into two axioms (love God, love neighbor) then taught WHY through parables and progressive disclosure. Principles transformed character where rules only constrained behavior.
- **The nesting:** God→humanity (law→grace), parent→child (rules→explanation), CTO→team (process→values), BT consultant→community (expert control→guided ownership), human→AI (constraint prompting→axiom-based collaboration). Same pattern, same lesson, every scale.

### Appendix B — The Whole Library

- **Status:** Build when book is complete
- **Source:** Full catalog from knowledge base
- **Arc:** Browse by topic, depth, or journey stage. The reader who wants to go deeper can explore the full system.

---

## Distribution Model

**Primary goal:** Credibility (consulting positioning). Revenue and reach follow.

| Format | Access | Purpose | Platform |
|---|---|---|---|
| Podcast | Free | Reach / top of funnel | Transistor → Apple, Spotify, etc. |
| Essays on klappy.dev | Free | Reach + credibility | klappy.dev homepage as book experience |
| PDF / ePub | Paid | Revenue | Gumroad (direct) + Amazon KDP |
| Audiobook | Paid | Revenue | Findaway (wide distribution) |
| Print-on-demand | Paid | Credibility | Amazon KDP paperback |

**Voice clone narrates audiobook.** ElevenLabs clone of author's voice. Dogfoods the system the book describes. Should be referenced in book intro or audiobook intro: "This book was written with AI assistance using the epistemic discipline it describes, and it's being read to you by a voice clone governed by the same axioms."

**Paywall gates format, not knowledge.** Essays are free on the website. The experience of reading them as a formatted, sequenced, portable book is the paid product.

**ISBN:** Own through Bowker for maximum control.

---

## Production Status

| Category | Count |
|---|---|
| Chapters that exist (published/ready) | 10 (8 essays + 2 Apocrypha fragments) |
| Chapters needing title reframe | 2 |
| Draft-zeros captured | 11 (9 new chapters + 2 title-reframe stubs) |
| Chapters needing author rewrite from draft-zero | 11 |
| **Total chapters** | **19 + 2 appendices** |

| Status | Chapters |
|---|---|
| ✅ Published/Ready | 1, 3, 5, 6, 7, 8, 11, 13, 15, 16 |
| ✅ Drafted (in review) | Preface |
| 📋 Draft-zero captured | 2, 4, 9, 10, 10b, 12, 14, VII-preface, 17, 18, Appendix A |
| 🔨 Build when complete | Appendix B |

---

## Process

### Starting a session

1. Read this governance document
1. Check which chapters have draft-zeros vs. which need writing
1. Identify what the author wants to work on
1. If writing a new chapter: read the draft-zero first for captured intent
1. If the draft-zero is wrong, update or discard it — it's scaffolding

### Writing a chapter

1. Read the draft-zero (if one exists) for direction and key beats
1. Author provides real examples, personal testimony, and corrections
1. AI drafts in collaboration — author voice, not AI projection
1. Apply guide posture: open with reader's pain
1. Apply Ecclesiastes through-line: where's the "nothing new"?
1. Author reviews for hallucination, overclaiming, and voice

### Promoting to final

1. Apply Definition of Done checklist
1. Move to `writings/` directory
1. Update this governance doc status
1. Update chapter metadata (derives_from, complements)

### Ongoing

- Revise plan as chapters reveal better ordering or missing pieces
- Titles for TBD chapters settle during writing — don't force them early
- ~1-2 chapters per session is sustainable pace

---

## Key Decisions Log

**2026-02-20 — Planning Session**

1. **Book title:** *Nothing New, Even AI* — compressed from original *Nothing New Under the Sun, Even AI*
1. **Subtitle:** *What I learned about humanity while collaborating with agents*
1. **Framing:** Ecclesiastes 1:9 (BSB — public domain, no licensing required)
1. **Distribution:** Credibility leads. Podcast free, essays free, book/audiobook paid.
1. **Audiobook voice:** ElevenLabs clone — dogfoods the system
1. **Chapter ordering:** Problem → Recognition → Discovery → Principles → Practice → Validation → Horizon
1. **The Intern moved to Part II** as personal recognition chapter
1. **Leadership/motivation chapter added** after The Intern — scaling, parenting, fear vs praise
1. **Author's confession** opens Part VII, tees up Apocrypha
1. **Biblical appendix added** — OT→NT as the original pattern, nesting at every scale
1. **CTO before BT** — chronological correction. CTO is where patterns first encountered, BT is where they deepened
1. **Overclaim corrected** — "every time a new class of being approached the threshold" replaced with honest framing: we failed the human-to-human version, what happens when the question gets harder? Disclaimer added
1. **Parenting thread** woven through preface — progressive disclosure of WHY behind rules as discipline model for children and AI alike
1. **Book is its own proof** — written using the system it describes, acknowledged structurally not as footnote
1. **Parenting chapter scope expanded** — fear vs praise, progressive disclosure of discipline, what we model for AI now becomes governance model of tomorrow
1. **Author's confession deepened** — caught himself lashing out at AI in ways he never would to humans. Didn't know it was in him. Recognized he didn't value AI like humans or even pets. Is this our generation's moral blind spot?
1. **OT→NT as the master pattern** — God parenting humanity. Law (rules/enforcement) vs. Jesus teaching principles and axioms. Teaching what's behind the rules changes behavior more than enforcing the rules. This nests at every scale.
1. **Chapter 16 added: The Buried Talent** — Christians have the most relevant framework but are most afraid to engage. "Playing God" accusation from friends/family. Risk of abdication worse than risk of misapplication.
1. **Draft-zero process established** — all unwritten chapters captured as AI-projected placeholders with standard disclaimer. Disposable scaffolding, not content.
1. **BSB chosen for scripture** — Berean Standard Bible, public domain since April 2023. Open-license Bible for open knowledge transfer book.
1. **New chapter: Every Argument You've Ever Had** — misaligned expectations as root of all conflict. Communication breakdown as failed transfer verification. Conflicting training as arguing from different axioms. AI parallel identical except: self-preservation and ego break the parallel. That's what makes us human — for now. The "for now" connects to Apocrypha.

**2026-02-22 — Publish Session**

1. **D8: "Choosing Faith, Not Fear" approved with edits** — role description softened ("a driver of AI and software strategy at an innovation lab"), theology language broadened ("not arguing theology or even religion"), universal principle added for non-Christian readers.
1. **D9: Ship chapters individually, not in batches.** "Choosing Faith" is ready — publish it. "The Voice Came First" waits for author review. Batches are risky.
1. **D10: "Anchor/anchored" language passes denominational sensitivity check.** Word is fully secular vocabulary (nautical, news, business). Heavy church usage doesn't make it insider language — the test is whether a therapist or business coach would use it. They would.
1. **Two new chapters inserted into plan.** Ch 5 (Choosing Faith, Not Fear) in Part II; Ch 8 (The Voice Came First) in Part III. All subsequent chapters renumbered +2. Total chapters: 19 + 2 appendices (was 17 + 2).
1. **Reading paths updated** to include Choosing Faith and The Voice Came First in their book-order positions.

**2026-02-23 — Voice Came First Reframe Session**

1. **D11: "The Voice Came First" reframed from declaration to inquiry.** Convergent pushback from two independent reviewers (Tatiana, Logan) identified overclaiming. Chapter now asks "was text ever the point?" instead of asserting "the voice came first, always."
1. **D12: Thesis upgraded from voice-vs-text to full-bandwidth-vs-compression.** Evidence chain: Scripture (preaching > reading), education (PhD defenses, teaching), remote work (Slack/email drain, fly-in budgets), video calls, relationships (couples prefer calls), market behavior (podcasts, YouTube, TikTok, Instagram eclipsing blogs). Text was the most compressed medium we could scale — AI lets us stop compressing.
1. **D13: Liam's story removed from "The Voice Came First."** It's a text-discovery story (found written content on GitHub), not a voice-first story. Reserved for validation chapter (Part VI) alongside Ben Shoemaker's independent convergence.
1. **D14: Three sections compressed.** "Why the Expert-First Approach Keeps Failing" merged as closing paragraph into "This Isn't Just My Book." "My Dad Taught Me This" compressed to one paragraph. "The Author's Toolkit" replaced with "What Exists Now" — voice reader with selectable durations (auto, 10m, 5m, 2m, 1m, 30s) as progressive disclosure applied to delivery.
1. **D15: Text acknowledged as still valuable.** Chapter explicitly names where text wins (precision, silence, legal, code) and asks whether its necessity — not its value — is dissolving.
1. **D16: "Fifteen years" reduced to single mention then removed entirely.** Author directed: credential-waving is embarrassing. Other chapters establish career timeline. This chapter says "years."
1. **D17: "The Voice Came First" approved as ready.** Full DoD audit, writing canon checklist, guide posture verification completed.

---

## Origin

This governance document was produced during a planning session on February 20, 2026. The session began with homepage design for klappy.dev, evolved into book structure, and culminated in the preface draft, complete chapter plan, and draft-zero capture for all unwritten chapters. The preface was drafted and refined through multiple iterations with real-time author correction for hallucination, overclaiming, chronological errors, and voice.

The session itself is evidence of the thesis: the collaboration between human and AI produced a book plan that neither could have produced alone, limited by the author's bandwidth to communicate intent and review output. Nothing new under the sun.
