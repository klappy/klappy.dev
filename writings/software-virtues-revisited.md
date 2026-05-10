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
  - tension-survey
  - personality-radar
  - revisit
epoch: E0008.4
date: 2026-05-10

# Discovery
hook: "Eight years later, a partner asked me which '-ilities' actually trade off against which. I sent him the article, told him I still stand by it — then realized it never built the full map. So I built the map, then a survey on top of it, then a radar that shows your product its own personality."
description: "Eight years ago I wrote about ten software virtues and the tensions among them. A partner asked today which actually trade off against which, and the article I'd been recommending for a decade only listed tensions per-virtue. So I built the full matrix, then a seven-phase constraints survey on top of it, then realized the cleanest framing was that the survey is a personality test for the product — and the radar it produces is the roadmap, visualized."
slug: software-virtues-revisited

# Social graph
og_title: "Software Virtues, Revisited"
og_description: "Eight years later, a partner asked me which '-ilities' actually trade off against which. The article I'd been recommending for a decade never built the full map. So I built it — and a personality test for the product."
og_type: article
twitter_card: summary_large_image
twitter_title: "Software Virtues, Revisited"
twitter_description: "Eight years later, a partner asked me which '-ilities' actually trade off against which. The article I'd been recommending for a decade never built the full map. So I built it — and a personality test for the product."

# Relationships
derives_from: "https://medium.com/@klappy/what-are-software-virtues-and-how-to-prioritize-them-f0b583741afe (2018-09-09 — original article), canon/observations/quality-attribute-tension-matrix.md, canon/principles/quality-attributes-are-in-tension.md, canon/definitions/software-virtues-vocabulary.md, canon/methods/quality-attribute-tension-survey.md, odd/maturity.md"
complements: "writings/agentic-software-development.md"
status: active
---

# Software Virtues, Revisited — What I Wrote in 2018, What I Stand By, and What I Owed the Reader

> I wrote about ten software virtues and the tensions among them in 2018. Eight years later, a partner asked me which "-ilities" actually trade off against which, in which use cases. I sent him the article and told him I still stand by it. Then I realized the article only listed the tensions named per-virtue — it never built the full map. So I built it. Then I realized the map was a worked example of something larger — a constraints survey for new work with agents — so I built that too. And then I realized the cleanest framing of the whole thing is that the survey is a personality test for the product, and the radar it draws is the roadmap.

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

## What This Became

The first draft of this essay closed with a forward-looking sketch: *the matrix is a constraints survey for new work with agents, and that's what I'm building next.* By the time I finished publishing, the survey was already built. The canon now carries the [seven-phase method](klappy://canon/methods/quality-attribute-tension-survey) the sketch promised. The arc landed faster than the essay anticipated, which is the right way for an essay about a tradeoff system to age — the system kept moving while the writing was settling.

The shape of the method is small enough to describe in a paragraph and big enough that it took the rest of the day to specify. You start by naming the project's stage — proof of concept, pilot, production, refactor, or *other*-with-a-name. You select the ilities that apply, both the ones the project optimizes for **today** and the ones it should optimize for **going forward**; the two lists are usually close and never identical. You rank each ility on the MoSCoW scale — *Won't, Could, Should, Must* — for both states. You consult the tension matrix (or generate dynamically for non-canonical ilities) to surface the sacrifices the desired ranking commits to and the sacrifices the current state is already living with. You acknowledge each sacrifice explicitly, and you let the inevitable rejections kick you back to re-rank. Then you encode the result.

The encoding is where the survey stops being a workshop artifact and starts being infrastructure. Three [DOLCHEO](klappy://canon/definitions/dolcheo-vocabulary) artifact types fall out of one survey pass: **Constraints** capturing the desired state (the priorities the project commits to, the sacrifices it accepts, the ilities it explicitly does not optimize for), **Observations** capturing the current state (the observed level of each ility, with the source — telemetry, code review, contributor survey, lived experience), and **Opens** capturing the gap between them (one roadmap item per non-zero gap, ranked by magnitude, direction of investment named). The agent working on the project inherits the Constraints automatically. The Observations are the falsifiable baseline against which future surveys measure drift. The Opens are the prioritized roadmap.

The whole loop is wired to [oddkit](https://oddkit.klappy.dev) actions: `preflight` opens the survey, `gate` enforces every phase boundary, `challenge` pressure-tests sacrifices before they're accepted, `encode` produces the typed output, `validate` closes the survey. The runtime contract is mechanical — it adds no rules, it just enforces the ones canon already carries. A re-run is triggered by phase transition, scope change, tension surprise, stakeholder change, or measured drift; the prior artifacts are archived, the new ones supersede.

That description is the spec. The reason the spec is interesting is not that the spec is interesting. It is that the spec produces a picture.

## The Survey Is a Personality Test for the Product

The cleanest way to think about the survey's output is not as a list of constraints but as a personality profile. The same shape humans use to map traits onto a person — a radar chart with one axis per trait — maps naturally onto a project. Each ility is a trait. The project's ranking on each ility is its score. The polygon connecting the scores is the project's *shape*. Two products can have similar functions and entirely different personalities, and that personality difference is the most important thing a stakeholder, a reviewer, or an inheriting agent needs to know about the project up front.

The framing earns the radar chart for free. It is also the framing that lets the survey reach audiences who would never read a method doc. "What's your product's personality?" is a question that gets answered. "Have you completed your quality-attribute tension survey?" is a question that gets ignored. The personality framing is the spoonful of sugar; the survey is the medicine.

The default radar has one axis per ility, ordered so that **ilities in strong mutual tension sit across from each other on the chart**, and ilities that reinforce each other sit adjacent. The visual benefit is structural: a spike on one axis with a valley directly across shows the polygon *leaning* toward what the project prioritizes against what it sacrifices. Adjacent synergistic ilities form smooth contours. The polygon's silhouette becomes the tradeoff record by construction.

The scale is the same MoSCoW scale the 2018 article surfaced. Quantitative 0–100 scoring is rejected as false precision; *Won't / Could / Should / Must* matches the level at which decisions are actually made.

And the survey produces *two* polygons, not one — because every survey is dual-state. The **desired** polygon (solid, full opacity) is the personality the project commits to. The **current** polygon (dashed outline, lighter) is the personality the project actually has today. Where the polygons coincide, the project is on-target on that axis. Where they diverge, the gap is a roadmap item. The radar *is* the roadmap, visualized.

Here is the worked example from canon — a hypothetical pilot-stage authentication service:

<svg viewBox="0 0 600 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="radar-title radar-desc" style="max-width: 600px; background: white;">
  <title id="radar-title">Project Personality Radar — Pilot-stage Authentication Service (Current and Desired)</title>
  <desc id="radar-desc">Radar chart with ten axes showing both the current and desired priority profiles of a hypothetical pilot-stage authentication service. The desired polygon (solid blue) reaches level 4 on Stability, Reality, and Interoperability and level 3 on Maintainability and Affordability. The current polygon (dashed orange) is smaller, sitting at level 2 on Stability, Maintainability, and Interoperability and level 3 on Reality and Affordability. Gaps between the two polygons on Stability, Maintainability, Reality, and Interoperability visualize the roadmap. Axes ordered tension-opposite clockwise from top: Stability, Maintainability, Reality, Affordability, Efficiency, Urgency, Versatility, Originality, Usability, Interoperability.</desc>

  <!-- Scale rings -->
  <g fill="none" stroke="#d0d0d0" stroke-width="0.7">
    <polygon points="300.0,212.5 322.0,219.7 335.7,238.4 335.7,261.6 322.0,280.3 300.0,287.5 278.0,280.3 264.3,261.6 264.3,238.4 278.0,219.7" />
    <polygon points="300.0,175.0 344.1,189.3 371.3,226.8 371.3,273.2 344.1,310.7 300.0,325.0 255.9,310.7 228.7,273.2 228.7,226.8 255.9,189.3" />
    <polygon points="300.0,137.5 366.1,159.0 407.0,215.2 407.0,284.8 366.1,341.0 300.0,362.5 233.9,341.0 193.0,284.8 193.0,215.2 233.9,159.0" />
    <polygon points="300.0,100.0 388.2,128.6 442.7,203.6 442.7,296.4 388.2,371.4 300.0,400.0 211.8,371.4 157.3,296.4 157.3,203.6 211.8,128.6" stroke="#999" stroke-width="1" />
  </g>

  <!-- Axis lines (tension-opposite ordering, clockwise from top) -->
  <g stroke="#999" stroke-width="0.5">
    <line x1="300" y1="250" x2="300.0" y2="100.0" />
    <line x1="300" y1="250" x2="388.2" y2="128.6" />
    <line x1="300" y1="250" x2="442.7" y2="203.6" />
    <line x1="300" y1="250" x2="442.7" y2="296.4" />
    <line x1="300" y1="250" x2="388.2" y2="371.4" />
    <line x1="300" y1="250" x2="300.0" y2="400.0" />
    <line x1="300" y1="250" x2="211.8" y2="371.4" />
    <line x1="300" y1="250" x2="157.3" y2="296.4" />
    <line x1="300" y1="250" x2="157.3" y2="203.6" />
    <line x1="300" y1="250" x2="211.8" y2="128.6" />
  </g>

  <!-- Desired polygon (solid fill, full opacity) -->
  <polygon points="300.0,100.0 366.1,159.0 442.7,203.6 407.0,284.8 344.1,310.7 300.0,287.5 278.0,280.3 264.3,261.6 264.3,238.4 211.8,128.6"
           fill="rgba(0,100,200,0.20)" stroke="#0064C8" stroke-width="2" />

  <!-- Current polygon (dashed outline, no fill, contrasting color) -->
  <polygon points="300.0,175.0 344.1,189.3 407.0,215.2 407.0,284.8 344.1,310.7 300.0,287.5 278.0,280.3 264.3,261.6 264.3,238.4 255.9,189.3"
           fill="none" stroke="#E07B2A" stroke-width="2" stroke-dasharray="5,3" />

  <!-- Desired polygon vertices -->
  <g fill="#0064C8">
    <circle cx="300.0" cy="100.0" r="3.5" />
    <circle cx="366.1" cy="159.0" r="3.5" />
    <circle cx="442.7" cy="203.6" r="3.5" />
    <circle cx="407.0" cy="284.8" r="3.5" />
    <circle cx="344.1" cy="310.7" r="3.5" />
    <circle cx="300.0" cy="287.5" r="3.5" />
    <circle cx="278.0" cy="280.3" r="3.5" />
    <circle cx="264.3" cy="261.6" r="3.5" />
    <circle cx="264.3" cy="238.4" r="3.5" />
    <circle cx="211.8" cy="128.6" r="3.5" />
  </g>

  <!-- Current polygon vertices -->
  <g fill="#E07B2A">
    <circle cx="300.0" cy="175.0" r="2.5" />
    <circle cx="344.1" cy="189.3" r="2.5" />
    <circle cx="407.0" cy="215.2" r="2.5" />
    <circle cx="407.0" cy="284.8" r="2.5" />
    <circle cx="344.1" cy="310.7" r="2.5" />
    <circle cx="300.0" cy="287.5" r="2.5" />
    <circle cx="278.0" cy="280.3" r="2.5" />
    <circle cx="264.3" cy="261.6" r="2.5" />
    <circle cx="264.3" cy="238.4" r="2.5" />
    <circle cx="255.9" cy="189.3" r="2.5" />
  </g>

  <!-- Axis labels -->
  <g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#333">
    <text x="300.0" y="75.0" text-anchor="middle">Stability</text>
    <text x="402.9" y="108.4" text-anchor="middle">Maintainability</text>
    <text x="466.4" y="199.9" text-anchor="start">Reality</text>
    <text x="466.4" y="308.1" text-anchor="start">Affordability</text>
    <text x="402.9" y="395.6" text-anchor="middle">Efficiency</text>
    <text x="300.0" y="425.0" text-anchor="middle">Urgency</text>
    <text x="197.1" y="395.6" text-anchor="middle">Versatility</text>
    <text x="133.6" y="308.1" text-anchor="end">Originality</text>
    <text x="133.6" y="199.9" text-anchor="end">Usability</text>
    <text x="197.1" y="108.4" text-anchor="middle">Interoperability</text>
  </g>

  <!-- Scale labels along the top axis -->
  <g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" fill="#999">
    <text x="305" y="216">1</text>
    <text x="305" y="178">2</text>
    <text x="305" y="141">3</text>
    <text x="305" y="103">4</text>
  </g>

  <!-- Title -->
  <g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fill="#222">
    <text x="300" y="22" text-anchor="middle" font-size="14" font-weight="600">Pilot-Stage Authentication Service</text>
    <text x="300" y="40" text-anchor="middle" font-size="11" fill="#666">Personality Radar — MoSCoW (1=Won't, 2=Could, 3=Should, 4=Must)</text>
  </g>

  <!-- Legend -->
  <g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#333">
    <line x1="438" y1="445" x2="458" y2="445" stroke="#0064C8" stroke-width="2" />
    <text x="462" y="448">Desired</text>
    <line x1="510" y1="445" x2="530" y2="445" stroke="#E07B2A" stroke-width="2" stroke-dasharray="5,3" />
    <text x="534" y="448">Current</text>
  </g>
</svg>

Three things the picture makes visible at a glance that the table buries.

**The gap between the polygons is the roadmap.** The visible gap segments — Stability (top, +2), Maintainability (upper-right, +1), Reality (right, +1), Interoperability (upper-left, +2) — are the four committed investment directions, ranked by gap magnitude. The bottom and bottom-left of the chart show coincident polygons: those axes are on-target. The radar audits the project's trajectory, not just its commitments.

**Tension-opposite axes show their tradeoff structurally.** Stability sits at the top, Urgency directly across at the bottom — the project's spike on Stability (level 4) with valley on Urgency (level 1) shows the strongest single tradeoff being made, visualized as the radar's most pronounced lean. The same pattern across Reality/Originality, Affordability/Usability, Interoperability/Efficiency. The silhouette is the tradeoff record.

**An honest profile is asymmetric, and the two polygons should usually differ.** A near-circular polygon means the ranking was rubber-stamped — no real prioritization happened. A perfectly-coincident pair of polygons means either the project is already at its committed personality (rare on a first survey) or the current state was reported aspirationally rather than observationally. Both failure modes are diagnoseable from the picture.

A project asked which virtues it prioritizes will sometimes claim all of them. A project asked which personality it has will not — because *all of them* is not a personality. The reframe extracts an honest answer where the direct question extracted a defensive one. That is the point.

## Where to Go Next

If you have not read the original, [start there](https://medium.com/@klappy/what-are-software-virtues-and-how-to-prioritize-them-f0b583741afe). It still holds.

If you want the systematic map: [Quality Attribute Tension Matrix](klappy://canon/observations/quality-attribute-tension-matrix).

If you want the principle behind the map: [Quality Attributes Are In Tension](klappy://canon/principles/quality-attributes-are-in-tension).

If you want the vocabulary the canon uses: [Software Virtues Vocabulary](klappy://canon/definitions/software-virtues-vocabulary).

If you want the survey itself — the seven-phase method that turns the matrix into an operational artifact and produces the radar — start at [Quality Attribute Tension Survey](klappy://canon/methods/quality-attribute-tension-survey).

If you want the discipline that makes the map worth carrying: [the rest of klappy.dev](https://klappy.dev).
