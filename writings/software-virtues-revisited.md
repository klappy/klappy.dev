---
uri: klappy://writings/software-virtues-revisited
title: "Software Virtues, Revisited — What I Wrote in 2018, What I Stand By, and What I Owed the Reader"
subtitle: "What I Wrote in 2018, What I Stand By, and What I Owed the Reader"
author: "Klappy"
type: essay
public: true
audience: public
exposure: public
tier: 3
voice: first_person
stability: stable
tags:
  - writings
  - essay
  - software-virtues
  - quality-attributes
  - tradeoffs
  - ilities
  - tension-matrix
  - revisit
epoch: E0008.4
date: 2026-05-10

# Discovery
hook: "Eight years later, a partner asked me which '-ilities' actually trade off against which. I sent him the article and told him I still stand by it — then realized it never built the full map."
description: "Eight years ago I wrote about ten software virtues and the tensions among them. A partner asked today which actually trade off against which, in which use cases — and I realized the article I'd been recommending for a decade had only listed tensions per-virtue and never assembled the full map. So I built it, and then realized the map was a worked example of something larger: a constraints survey for new work with agents."
slug: software-virtues-revisited

# Social graph
og_title: "Software Virtues, Revisited"
og_description: "Eight years later, a partner asked me which '-ilities' actually trade off against which. I sent him the article and told him I still stand by it — then realized it never built the full map."
og_type: article
twitter_card: summary_large_image
twitter_title: "Software Virtues, Revisited"
twitter_description: "Eight years later, a partner asked me which '-ilities' actually trade off against which. I sent him the article and told him I still stand by it — then realized it never built the full map."

# Relationships
derives_from: "https://medium.com/@klappy/what-are-software-virtues-and-how-to-prioritize-them-f0b583741afe (2018-09-09 — original article), canon/observations/quality-attribute-tension-matrix.md, canon/principles/quality-attributes-are-in-tension.md, canon/definitions/software-virtues-vocabulary.md, odd/maturity.md"
complements: "writings/agentic-software-development.md"
status: active
---

# Software Virtues, Revisited — What I Wrote in 2018, What I Stand By, and What I Owed the Reader

> I wrote about ten software virtues and the tensions among them in 2018. Eight years later, a partner asked me which "-ilities" actually trade off against which, in which use cases. I sent him the article and told him I still stand by it. Then I realized the article only listed the tensions named per-virtue — it never built the full map. So I built it, and then realized the map was a worked example of something larger: a constraints survey for new work with agents.

---

## A Question from a Partner

A partner of mine, Ian, asked me a question this morning that I am pretty sure I have been answering for a decade in fragments without ever giving a complete answer. He wanted to know which "-ility tradeoffs" get maximized and which get minimized by the choices you make, and in which use cases the abstraction shines and in which it does not.

My first answer was the answer I always give: the balance changes for every project, and for every stage of maturity within that project. He sent back the 💯 emoji, which is the exchange between people who have built things together long enough that we both already knew this. Then I told him I stood by something I wrote almost ten years ago on the same topic, and I sent him [the article](https://medium.com/@klappy/what-are-software-virtues-and-how-to-prioritize-them-f0b583741afe).

That article — *Software Virtues — How to Prioritize* — has been load-bearing for me since 2018. It gets shared in slack channels, surfaced in interviews, and referenced when junior engineers ask why their pull request to add a "tiny refactor" is provoking strong opinions. I refer to it about as often as I refer to anything I have ever written. And every time I send it, I notice the same thing: it overwhelms most readers.

That used to bother me. Now I think the overwhelm is the point.

## What the Article Got Right

The article enumerates ten properties every software project optimizes for at the same time:

- Usability / Simplicity
- Originality / Innovation
- Stability / Reliability
- Urgency / Timeliness
- Efficiency / Scalability
- Maintainability / Manageability
- Versatility / Adaptability
- Interoperability
- Affordability / Sustainability
- Reality

It calls them virtues because they are things worth wanting, and the moral framing matters. The engineering literature calls them "-ilities" or "quality attributes," and that is fine too. The names refer to the same set.

Each section in the article ends with a paragraph naming the virtue's "natural enemies" — the other virtues it tends to erode and that tend to erode it. (The canon I am building uses "tensions" rather than "natural enemies"; the structural meaning is identical, and "tensions" carries it more precisely.) Urgency erodes stability. Originality erodes usability. Versatility erodes both. Reality grounds everything.

That structure was the article's load-bearing claim, and I still think it was correct. **There is no single objective function for software.** A team that says it is optimizing for "fast, reliable, maintainable, secure, scalable, and innovative" software has not yet decided what it is actually doing, because those properties pull against each other along predictable axes. The team will hit the tensions whether or not it has named them. The only choice is whether to hit them oriented or disoriented.

If you have ever sat through an architecture debate where everyone agreed about the goal and disagreed about everything else, you have lived inside this tension space. The disagreement was not really about facts. It was about which virtue each person was prioritizing, and whether they were willing to say so out loud.

## What the Article Only Sketched

Here is the part I noticed today, eight years later, when Ian and I started typing back and forth.

The article names tensions inside each virtue's section. Stability has its enemies. Originality has its enemies. Versatility has its enemies. But the tensions are presented one virtue at a time. The article never assembles the full map.

Ten virtues produce forty-five unique pairs. The article names twenty-one of them — the ones each virtue's section happened to mention. Twenty-four pairs go unnamed. Maintainability versus interoperability is unnamed. Stability versus versatility is unnamed. Efficiency versus reality is unnamed. None of the gaps are random; they are just pairs the per-virtue narrative did not happen to surface.

When Ian said he was interested in "which ones are maximized and which are minimized by the choices, and also maybe in which use cases the abstraction shines and in which not so much," I started writing the per-virtue answer again. Then I caught myself. He was asking the question my article had set up but never finished answering.

I told him: "I am sure using that doc as a template we could expand this to all tensions in a massive table." He sent the heart. I said: "That isn't a bad idea! That sounds like a great Klappy.dev article!"

So this is that article. And the table — the systematic completion — is now [in canon](klappy://canon/observations/quality-attribute-tension-matrix).

## What the Matrix Looks Like

Forty-five rows, one per pair. Four relationship types:

- **Mutual tension.** Both virtues erode each other. Optimizing for one reliably costs the other. (Examples: urgency vs. maintainability, originality vs. stability, efficiency vs. versatility.)
- **Asymmetric grounding.** One virtue disciplines the other without symmetric retaliation. The grounding virtue — usually reality — is not eroded by what it constrains. (Examples: reality vs. originality, reality vs. urgency.)
- **Synergy.** Both virtues reinforce each other, with mild tension only at extremes. (Examples: stability and maintainability; efficiency and affordability.)
- **Cost gravity.** Affordability's relationship with every other virtue: each virtue is purchased with effort, time, or money, so affordability constrains how much of each can be afforded.

A third axis runs through the matrix: **phase weighting.** Each tension bites hardest at one of three project phases — proof of concept, pilot, or production. The phase axis comes from the article's "Lifecycle Priorities" section, which has since become [its own canon document](klappy://odd/maturity). Demanding production stability of a proof of concept is a category error. Tolerating proof-of-concept originality budgets in production is a different category error. The matrix tags each pair with the phase at which the tension is most consequential.

Three uses fall out naturally:

- **Design review.** Before committing to a design, look up the pairs most affected. For each pair, name the predicted direction of erosion and decide whether the cost is acceptable at the project's current phase.
- **Disagreement diagnosis.** When a team disagrees about a tradeoff, the disagreement is usually about which virtue is being prioritized, not about facts. The matrix gives the disagreement a vocabulary.
- **Phase audit.** When the project moves between phases, the priorities shift. The matrix names which tensions become more consequential at the new phase.

You do not memorize the matrix. You consult it. Like a phone book.

## What I Would Add Today

Two things the 2018 article did not yet name, that the eight years since have made unavoidable.

### The Article Lacked an Operator

The original article ends with prioritization methods — MoSCoW, the Hundred Dollar Method — and treats the team's elicitation of priorities as the load-bearing step. Get everyone to vote, sum the points, sort by total. I still think those methods are useful at the right phase. I no longer think they are sufficient.

The thing I missed in 2018 is that **knowing which virtues are in tension does not, by itself, produce good prioritization.** A team can have a beautifully complete list of virtues and tensions and still build the wrong thing, because the prioritization step requires a *discipline* the article never named. The discipline is what to do when the urgent thing is fighting the right thing, when the user-stated priority is fighting the user-observed behavior, when the executive is asking for originality and the operations team is begging for stability.

That discipline is what I have spent the last several years building. It has a name now — Outcomes-Driven Development — and an [operating system around it](https://klappy.dev). The matrix is a map. The discipline is what makes the map worth carrying.

### The Article Was Honest, and Honest Is Overwhelming

I used to apologize for the article overwhelming people. I would pre-explain it, soften it, send a chat summary alongside the link. I have stopped doing that.

The article overwhelms readers because it refuses to flatten. Most software writing offers one principle. DRY. KISS. Single Responsibility. Move fast and break things. Ship it. These are easier to absorb because they pretend the tradeoff space has one axis and one direction. The 2018 article said: there are ten things, they are in tension, your priority among them shifts by team, project, and phase, and reality grounds them all.

That is not overwhelming because it is poorly written. It is overwhelming because the world is.

The good news is that overwhelm is a lagging indicator. A reader who is overwhelmed by the article is a reader who has noticed the tradeoff space is real. The next move is not to simplify the article; it is to give the reader the tools to live inside the tradeoff space without flinching. The matrix is one of those tools. The maturity model is another. The mode discipline that ODD operationalizes is a third.

You do not need fewer virtues. You need a stronger spine.

## What I Stand By

Eight years later, the central claims still hold:

- Software has no single objective function.
- The competing properties are predictable, named, and finite.
- Each pair has a relationship type and a phase at which it bites hardest.
- Reality grounds everything else, whether or not the team acknowledges it.
- A framework that promises to optimize for everything simultaneously is selling you a flattened picture of a tradeoff space whose structure is tensions all the way down.

I would change the elicitation chapter today. I would add an operator. I would point at the matrix instead of leaving the work as an exercise. But I would not retract the central frame, and I would not flatten it.

If you have read the original article and felt overwhelmed, the matrix is what you do with the overwhelm. It is the thing the original article gestured at and never built. Now it is built — at least for the canonical ten. There are dozens more "-ilities" the article and the matrix do not yet cover. The point of the matrix is not to be exhaustive. It is to show what good looks like when the principle is applied to a concrete set, so that the principle can be applied dynamically to whatever set a project actually uses.

Ian got the table he asked for. You get the table he asked for too.

## What This Becomes Next

Here is the part I did not see clearly until this morning, and that I think is actually the most useful turn in the whole eight-year arc:

The matrix is not a reference document. It is **a constraints survey for new work with agents.**

When you scope a new project — a new product, a new service, a new feature, a new agent task — you are implicitly ranking quality attributes whether you say so or not. Most projects fail to articulate the ranking, hit the tensions sideways, and call the resulting confusion "scope creep" or "technical debt" or "we shipped the wrong thing." The article from 2018 named the ten virtues. The matrix names the tensions among them. The constraints survey is what you do *with* the matrix when you sit down to start something new.

The flow looks like this:

- Pick the quality attributes that matter for *this* project. (Usually a subset of the ten, occasionally with additions from the broader universe — securability, auditability, accessibility, observability, whatever the project actually requires.)
- Rank them for the project's current phase.
- Reference the tension graph — for the canonical ten, the matrix; for any other set, generate the graph dynamically against the same principle.
- Encode the chosen priorities and predicted sacrifices as constraints the agents working on the project inherit.

That last step is what makes this an agent-work tool rather than an architectural diagram. Agents — whether you mean LLM-driven coding agents, autonomous task runners, or the next generation of whatever this becomes — work best when the constraints they are operating under are explicit. A constraints survey grounded in the tension graph gives them a coherent answer to the question "what am I optimizing for, and what am I willing to sacrifice?" That answer is what stops an agent from cheerfully refactoring for maintainability while shipping a project whose phase calls for urgency, or from optimizing for originality on a project whose users need stability above all else.

I did not see this clearly when I started writing the matrix this morning. I saw it when I told a partner I had built the table, and the next sentence out of his mouth was that he hates reinventing the wheel and would absolutely use the abstractions. The article — once a piece of management writing aimed at a human audience that mostly bounced off it — turns out to be exactly the right shape for instrumented agent work. Or rather: the article was the seed, the matrix is the worked example, and the constraints survey is what makes both into infrastructure.

That last layer is what I am building next. The article is staying load-bearing for one more turn.

## Where to Go Next

If you have not read the original, [start there](https://medium.com/@klappy/what-are-software-virtues-and-how-to-prioritize-them-f0b583741afe). It still holds.

If you want the systematic map: [Quality Attribute Tension Matrix](klappy://canon/observations/quality-attribute-tension-matrix).

If you want the principle behind the map: [Quality Attributes Are In Tension](klappy://canon/principles/quality-attributes-are-in-tension).

If you want the vocabulary the canon uses: [Software Virtues Vocabulary](klappy://canon/definitions/software-virtues-vocabulary).

If you want the discipline that makes the map worth carrying: [the rest of klappy.dev](https://klappy.dev).
