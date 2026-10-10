---
uri: klappy://writings/the-void-in-the-middle
title: "The Void in the Middle"
subtitle: "The researchers are fixing the models. The engineers are shipping product. The rules that make AI trustworthy live in the gap between those two approaches, and the gap is growing faster than anyone can read it."
author: Klappy
type: essay
public: true
audience: public
exposure: draft
tier: 2
voice: first_person
stability: draft
tags: ["writings", "essay", "trust", "governance", "context", "knowledge-bases", "four-modes", "exploration", "planning", "execution", "validation", "research"]
epoch: E0012
date: 2026-10-09

hook: "Your AI follows the rules when the rules fit in one window. Then you add a partner, a department, a second project, and the rules stop fitting. It is not a model problem and it is not quite a product problem, so it falls between the two approaches most people are taking."
description: "When I explain what I do, people stare. The model researchers are solving model problems; the engineers are shipping product; I have spent 2026 in the void between them, running something like a hundred experiments on one question: how do you keep AI trustworthy over rules and knowledge that grow faster than any context window, any embedding, any training run can keep up? Here is what failed, what held, and the four kinds of trust I now measure separately."
slug: the-void-in-the-middle

og_title: "The Void in the Middle"
og_description: "The rules that make AI trustworthy outgrew the context window within a year of adding a few partners. The model side and the product side are taking different approaches to it. I work on the product-engineering side, looking in the gaps between them."
twitter_description: "Researchers fix models. Engineers ship product. The rules that keep AI honest live in the gap, and the gap outgrew the context window a year ago."

derives_from: "canon/values/trust-kernel.md, canon/bootstrap/model-operating-contract.md, canon/principles/status-carries-three-tenses.md"
complements: "writings/the-same-rules-fresh-eyes.md, writings/your-context-window-needs-a-sabbath.md, writings/learning-in-the-open.md, writings/what-was-what-is-what-will-be.md, writings/the-project-journal.md"
governs: "Public statement of the research question behind the walker work: trustworthy AI over content that outgrows any context, and trust measured per mode"
status: draft

provenance:
  trigger: "Oct 7, 2026 — a call with a collaborator in which I said out loud, for the first time, that the thing I keep trying to productize is still a research project that does not know its own shape"
  brain_dump: "Oct 7, 2026 — three recorded dictations, Saint Cloud FL (Bee conversations 11032215, 11033744, 11039406; paraphrased, not quoted); plus my own typed and dictated thesis text of the same day, quoted"
  predecessor_essays: "writings/the-same-rules-fresh-eyes.md, writings/your-context-window-needs-a-sabbath.md, writings/learning-in-the-open.md"
  ghost_writer: "Drafted by the CoS seat from the sources above; every claim traces to my words or to canon; the captain's exact-text ruling governs"
---

# The Void in the Middle

> There are two kinds of people working on AI right now, taking two different approaches. The researchers are solving model problems. The engineers are using the models to ship product. I am on the product-engineering side, but I have spent 2026 obsessed with the void between the two, where the rules that make an AI trustworthy actually live, and where I watched those rules outgrow any context window within a year of adding a few partners. Rewriting everything to one convention worked and nobody adopted it. Pre-compiled context packs worked and became a maintenance nightmare. What held was smaller than I expected: a thin pointer to what to read and in what order, and the admission that trust with an AI, like trust with a colleague, is not one thing. It is built differently while you explore, plan, execute and validate, and it has to be measured that way. I do not claim that is universal. It is what leading human and AI teams has shown me.

---

## Summary — The Rules Outgrew the Window, and That Problem Falls Between Two Approaches

If you have worked with AI seriously for more than a few months, you have felt this. The AI behaved when your instructions fit on one page. Then the page became a folder. Then a second project shared half the folder and overrode the other half. Then a partner organization brought its own rules, which inherited some of yours and contradicted others. Somewhere in there the AI started sounding confident about rules it had never read, and you went back to checking everything by hand.

That is the problem I have been living inside since January 2026. The researchers and the product engineers are taking different approaches to it, and each approach has bright spots that clearly work. I am on the product-engineering side of that line, solving product-engineering problems, but the place I keep looking is the gap between the two: taking the bright spots from each and trying to apply them in a broader, more abstract way than either side needs for its own purposes.

This essay is about what I found there. The short version: governance for AI is fractal and it compounds faster than any context, embedding or training run can keep up; the two approaches I tried first both worked and both failed for reasons that had nothing to do with the model; what survived was a small discipline rather than a big system, and a record that keeps its receipts; and the thing we call "AI trust" is at least four things, because trust during exploration is built differently from trust during validation. Why trust is the hinge at all is already written down in [the trust kernel](klappy://canon/values/trust-kernel): collaboration hangs on trust, and trust is built by managing expectations. I am not going to restate it. I am going to tell you what it cost me to learn where the expectations actually live.

---

## The Stare

When I explain this to people at the organizations I work with, they stare at me.

Not hostile. Interested, even. But nobody knows what to do with it. They cannot see how to productize it, and they cannot see how to leverage it inside what they already run. I keep wanting to make it a product, because that is the shape I know how to sell. And every time I try, the honest answer comes back the same: this is still a research project. It does not yet know its own shape.

I said that out loud for the first time on October 7, 2026, on a call with a collaborator who works on the product side of the fence. Saying it was a relief. It meant I could stop pretending the thing was a feature and start describing it as a question.

So here is the question, in the words I used that day. How can we trust an AI to keep up with the rate of change of fresh content being created? How does it navigate content that is ever-changing, ever-populating, and has never been read before?

If that sounds abstract, let me show you where it came from.

---

## Where the Rules Went

Think about where governance lives in your own life. There are universal rules, then country rules, state, city, the HOA, the rules in your own house. At work there are company rules, department rules, rules for a vertical, rules a partner insists on. Every layer inherits from the one above and overrides some of it. Everything is fractally spread out.

Now hand all of that to an AI and ask it to behave.

This is what I wrote on October 7, trying to pin the thesis down:

> "Basically for me to get AI to work for me and my organizations and the companies that I work with, the content has ballooned. The more people I work with, the more complexity, but we keep sharing parts of it and there's inheritance. But when you do that, there's just too much content to fit into any one context very quickly. Like within a year of just a few partners, the governance has far exceeded the amount that would fit inside of a session, let alone work well."

Let me be precise about the tense, because it matters. That was true by the fall of 2026, after roughly a year of partners. It was not true in January 2026, when everything I needed an AI to know fit in one project's instructions. The window did not shrink. The rules grew, and they grew by sharing and inheriting, which is exactly how rules grow between humans too.

My working theory, and I hold it as a theory, is that this is the shape of the next decade. Most content people create from here on will be second brains, knowledge bases, the accumulated rules and context of teams and organizations. That content will be created faster than anyone can train a model on it, and faster than anyone can embed it. "Just put it in a RAG system" is the reflex, and it is a reasonable reflex when the content holds still. It does not hold still. By the time it is indexed, it has moved.

So the tools I went looking for had a strange constraint: no embeddings, no training, nearly deterministic, close to instant, and able to map content they had never seen before. Blazing fast ways to read fractals, is how I put it on the call. That constraint is not where the industry is pointed, which is the first sign you are standing in a gap.

---

## Two Things That Led Here

I did not arrive at that constraint by thinking. I arrived by failing, in public, with my own tools, more than once.

The first failure was before oddkit existed, back in January 2026, and it is where oddkit came from. The rules were already too big to read every time, so I compiled them: pre-packaged context packs meant to spare the model from reading everything. They worked, right up until the rules changed, and then the pack was lying until somebody rebuilt it. So I automated the compilation, rebuilding the pack on every change. That worked too, and it was slow, and the changes kept coming faster than the compile could keep up. Underneath the speed problem was a worse one: a pack is compiled for a purpose, and I could not predict every purpose a session would show up with. There were too many variations to build ahead of time. So the packs got small and stackable, parts that composed into whatever a task needed, and once the parts were small enough the natural next step was obvious: stop compiling ahead of time at all, and compose at the moment of reading, from live source, for the task actually at hand. That is what oddkit is.

For most of 2026 oddkit has been the progressive-disclosure tool I use for all of my own governance: an agent reads a title, then a compressed argument, then a summary, then only the section it needs, and the full body last if ever, stopping as soon as it has enough to act. It works. It works really well, with one condition I underestimated for months.

> "Oddkit requires a convention, a strict convention for it to work optimally. Yes, it can work without it, but it's not as optimal. I can't get anybody other than myself to adopt Oddkit. How am I going to expect that to be a standard for people to use?"

Every document had to be reshaped to the convention before the ladder could be walked. I did that to my own knowledge base, hundreds of documents, and the result was worth it. Then I looked at the partners whose rules were now part of mine, and I knew with near certainty that none of them would ever rewrite their ontology to my template. Good discipline and good conventions work. I have the receipts. They also demand rework and maintenance that nobody else is going to sign up for, and a tool only I can use is a hobby.

So the second thing was Cartographer: what if the tool were agnostic, a walker that could move through anybody's governance as it already is, no rewrite required? The idea was an agent that does not know what to search for but knows what it has been asked to do. It boards with nothing but a short framing, finds the right repositories and the right files, pulls in only the pieces it needs, and leaves itself a note that says, roughly, if I hit something in this category later, come back here. Dynamic walking, because a hard-coded map of everything is too expensive to maintain and drifts the day after you draw it.

What fell out of testing the walker was not what I was building. It was the thing I had been circling for the better part of a year.

> "What shook out of it during testing for Cartographer and the Walker for boarding was actually pretty powerful and really good hygiene and good discipline to shake out and shape out good definitions of what should be walked and when."

A manifest. A sidecar to the content rather than a rewrite of it: a short list of what to read, in what order, plus a few lines of framing, handed to the agent at boarding. Go do your research, here is the pointer. Not a distillation. I want to be clear about that because the compilation packs above were distillation, and the lesson of the packs was that every time the rules moved the pack lied. The pointer does not lie, because it points at the live source.

I am not going to describe how the pointer is built here. That part is still being measured, and the numbers belong on the ledger with their caveats, not in an essay. What I will say is that there were somewhere around a hundred experiments between January and October 2026 attacking this same problem again and again, across every epoch of the knowledge base, and many of them are failures worth citing: context cramming, context shaping, context engineering under a dozen names. Each one worked until the content moved. The small thing is the one that survived the content moving.

One of those failures deserves its own paragraph, because it is where the bright-spot habit paid for itself. For most of the year I was fairly sure the map would end up being generated: a small model running beside the main session, reading the repositories and folding what it found into a compact table of claims, each row a short statement with where it came from and how sure it was, that the main session could then read instead of the raw files. It is an attractive idea, and I had built the pieces for it. What disconfirmed it was looking harder at the tools that already worked. The coding agents I use every day are startlingly good at finding their way around a codebase they have never seen, and the reason is not clever: they list, they grep, they open the file, in a loop, and the tools underneath are the cheap deterministic ones that have shipped with every command line for decades. Paired with ordinary ranked text search, the same primitives found their way around governance just as well, for a cost that rounds to zero, with no model in the loop to drift or hallucinate the map. The generated map lost to that baseline. Note what did not lose: the manifest sidecar from a few paragraphs up is a different animal. It never tried to be the map. It is a hand-kept pointer, a few lines saying what to read first and in what order, sitting beside the content and leaning on the same cheap primitives to do the walking. The thing that failed was a model generating the map; the thing that survived was a human-sized hint that lets deterministic tools find the rest. So the rule I now hold is: the list-and-grep layer is the floor, everything else has to earn its place on top of it, and when a cheap deterministic approach is good enough, the expensive one has to prove it is better, not assume it. The gap in the void is not a lack of tools. It is that these tools assume a command line, and most of the places governance lives do not have one.

---

## The Record Has to Survive Too

Reading was only half of it. The other half was the record, and I underrated it for longer.

Everything above is about getting the right rules in front of an AI. Nothing above says what happens to what the AI and I decided once the session ends. In early 2026 the answer was: it evaporated, or it lived in a chat transcript nobody would ever open again, or it lived in a tidy summary that quietly dropped the one caveat that mattered. Then a partner would ask why we did something and I would have to reconstruct it from memory. That is an expectations failure of the oldest kind, and the trust kernel names it: expectations not maintained, not transferred.

So the journal became the flight recorder. Not prose. Rows. Every session leaves rows, and every row carries the same twelve fields, and four of them do the work: who contributed it, what kind of claim it is, how confident, and the relationships that tie it to the rows and sources it rests on. A dictation I gave on a walk, a ruling I made in a chat, a run a seat finished at three in the morning, all land in the same shape, and the shape is what makes them comparable later.

The tool that folds raw material into those rows is called Kirigami, and it was not built for this. It was Cartographer's predecessor, an earlier attempt at the map, and I put it on ice when that attempt lost. Then it turned out to be exactly the right shape for something else: recording a turn-by-turn synthesis of each session in a form we could debrief, run a post-mortem on, and trace a failure back to its cause. Something like git blame for models. It has saved me countless hours of rework, because when a session goes wrong we can reliably see where. It also turned out to be a good way to harvest the useful details out of meeting briefs, which nobody planned either.

Two of its rules matter more than its name. Folding is lossy on purpose, but discarding is not deleting: every row keeps a pointer back to the cold source it was cut from, so a claim can always be traced to the moment it was made. And synthesis is connective, never generative: a row may wire together things that already exist, and it is not allowed to invent a connection and call it a finding.

That is the pattern with most of the failures on this list. They solved adjacent problems I had not set out to solve, and each time the system got better for it.

This is why I can write "I said this on October 7" and mean it. The provenance block on this essay names the three dictations it was built from and the typed text it quotes. The ledger keeps the numbers I am not putting here. When the thing you are trusting is the record of a collaboration that is now months old and spread across a dozen sessions and two or three partners, provenance is not bookkeeping. It is the only way the expectation you set back then is still checkable now.

---

## Four Kinds of Trust

Somewhere in those experiments the question changed on me. I had started out trying to validate AI work, which is where everyone starts. Can I trust the output? And I kept noticing that this was not how I trusted the people I work with.

Think about a colleague you trust. Do you validate every one of their outputs? I do not. I expect to validate some, and I still find value in the rest, and I still trust the person. The trust was earned somewhere else: in the experience of exploring a problem with them, in watching how they plan, in how they tell me what they did and did not do. Output checking is one source of trust. It is not the only one, and for a good colleague it is not even the main one.

That is why I think we have been measuring AI trust in too few places. In my own work there are four distinct modes a team gets into to produce anything, whether the thing is a scientific experiment, a product, or a piece of writing: exploration, planning, execution, validation. I did not invent them; they are already the spine of [the operating contract](klappy://canon/bootstrap/model-operating-contract) every AI session in my system boards under, and that document says what each mode is for better than I will here. What I am adding is narrower. Each mode behaves differently, and trust in each mode is built and broken differently.

> "I think AI trust pivots on evaluating the different steps differently because exploring an idea behaves differently than validating that something was done well."

An AI that invents a possibility during exploration has done its job. The same invention during execution is a hallucination. A question in planning is diligence; the same question mid-execution is a tax on my attention. A confident claim during validation is worth nothing until it carries evidence, and a confident claim during exploration is just a candidate. If you measure all four with one yardstick, you will end up either trusting a model that should have been checked or babysitting one that should have been left alone.

I want to be careful here, in the same words I used on October 7:

> "I don't know, I don't want to claim this is universal, but I do believe in my experience, these are the four areas or modes that I've had to focus AI to operate differently in. And so any evaluation or metrics we would do when evaluating AI trust is evaluated differently for each of these modes."

If your work has a fifth mode, or three, I would like to hear it. The claim I will defend is the smaller one: trust is not one number, and anyone selling you a single "AI trust score" has already collapsed something that should stay separate.

---

## The Void in the Middle

Here is where I think I actually am, as of October 2026.

On one side there are the AI scientists, the people doing real research on models. They are solving model problems, and the pace of that work is too slow for the problem I have. By the time a model change lands, my partners' rules have moved again. On the other side there are the engineers using the models to ship product, and that is my side; I have been one of them for most of my career. We are fast, and most of the time a bigger prompt and a vector store will get the product out the door, so the question of where the rules live rarely gets asked on its own.

These two groups speak different languages, and they are taking different approaches. I am obsessed with the void in the middle. It is where governance has to be navigated rather than memorized, where trust has to be earned in four modes rather than scored once, and where the content keeps changing faster than either side's tools assume.

I do not have the patience for pure research. What I do have is a product-engineering problem that the product side's usual answers stopped solving, and a habit of looking at the bright spots on both sides, the things that visibly work, and asking whether they can be applied more broadly and more abstractly than either side built them for. The only reason this gap holds my attention is that every experiment, including the failed ones, has been proving the gap is real.

---

## What I Am Asking You

If you are the reader I have in mind, you already have a version of this problem, and you have probably been treating it as a prompt-engineering chore. I would ask you to look at it differently for a week.

Where do your rules actually live right now, and how many of them does your AI read before it acts? When the rules moved last, who updated the summary the AI was reading, and how long was the summary wrong before anyone noticed? And when you say you trust or do not trust your AI, which mode were you in when the trust broke?

I do not have a product for you. As of today I have a research question, a pile of documented failures, a small discipline that has held up so far, and a way of splitting trust into four that I measure separately and do not claim is universal. If any of that is useful, the kernel it hangs on is public and short, and the contract that defines the four modes is public too. Start there. Then write down where your own rules outgrew the window, because that is the moment the void opened under you, and it is the moment nobody else is looking at.
