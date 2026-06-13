---
uri: klappy://writings/the-submission-changes-exposure-not-function
title: "The Submission — Audit Yourself Before the Stranger Does, Because Approval Only Changes Exposure"
audience: public
exposure: public
tier: 2
voice: first_person
stability: draft
tags: ["substrate", "auth", "mcp", "directory", "submission", "self-audit", "git-repo-auth", "mobile", "companion-essay"]
public: true
type: essay
slug: the-submission-changes-exposure-not-function
hook: "We walked our security tool into Anthropic's directory review from a phone, after inspecting it harder than any reviewer would. Four failures became written rules. Now we wait."
description: "Before submitting git-repo-auth to Anthropic's MCP directory, we ran the audit on ourselves: every marketing claim checked against the live service, four failures caught and turned into standing rules, the whole run done from a phone and an iPad. The product's own bot pushed the paperwork. Approval doesn't change what it does. It changes who finds out."
og_description: "Approval doesn't change what it does. It changes who finds out."
author: Klappy
date: 2026-06-13
epoch: E0010
derives_from: "canon/methods/directory-submission-gauntlet.md"
related:
  - uri: "klappy://writings/habits-die-slower-than-tokens"
    label: "Habits Die Slower Than Tokens"
    relationship: "companion"
---

# The Submission — Audit Yourself Before the Stranger Does, Because Approval Only Changes Exposure

> If you've ever sent work to a reviewer you can't see, an app store, a journal, a hiring inbox, you know the silence that follows. We sent our security tool into Anthropic's MCP directory review, and their own confirmation email warns the silence may never answer. So before the stranger's audit, we ran our own: every public claim checked against the live service, four failures caught and turned into standing written rules, the entire run done from a phone and an iPad because I refuse to let this work need a laptop. The product's own bot identity pushed its own submission paperwork. Approval doesn't change what the product does. It changes who finds out it exists. That's the one ending I can't control, and it turns out to be the part that matters least.

*This is the second of two companion essays. The first, [Habits Die Slower Than Tokens](klappy://writings/habits-die-slower-than-tokens), is the confession and the tool. This one is what happened when we walked that tool into Anthropic's review.*

---

## A Quick Word Before We Start — Everything Here Works in Home Inspections

Have you ever sold a house? The buyer sends an inspector: a stranger with a checklist and no loyalty to you. Smart sellers hire their own inspector first. Every cracked joist you find before listing is one that can't ambush you at the negotiating table, and every flaw you fix on your own schedule costs less than one fixed under deadline. The seller's inspection isn't about looking good. It's about knowing your own house better than the stranger ever will.

That's this whole essay. The house is a small security service. The stranger is Anthropic's review team. And the inspection happened first.

## Summary — Four Failures, Zero Laptops, and an Ending I Don't Control

On June 12 we submitted [git-repo-auth](https://gitauth.klappy.dev) to Anthropic's MCP connector directory, the catalog where Claude users discover tools to plug in. Before the form was ever opened, we ran a self-audit with one rule: nothing asserted that wasn't observed. Every number on the pricing page got checked against the document the service actually enforces. Every claim about how agents behave got checked against agents. The audit caught four failures, and each one is now a written rule instead of a memory. The whole run happened on a phone and an iPad, which forced a validation method better than the comfortable one. The submission commits were pushed by the product's own bot, with tokens it minted for itself. And the books on submission day were honest enough to publish: two connected accounts, one paying customer, and that customer is me. Whatever the review decides, the service already works for anyone who connects it. Approval changes exposure, not function.

## What Do You Do Before the Stranger Shows Up?

Sooner or later everything you build meets a gatekeeper. An app review. A peer reviewer. A procurement checklist. A hiring manager skimming your portfolio at 11 p.m. And there are two ways to spend the days before that meeting: polishing what shows, or inspecting what's true.

Polishing is the natural instinct. It's also how you end up with marketing that promises things the product doesn't keep, which a good reviewer will find, at the worst possible moment, in front of exactly the audience you wanted to impress.

So we inspected instead. The standing question for the whole week was simple: if a stranger checked this claim against the running service, would it hold? Where would you even start asking that about your own work? We started with the numbers, and the numbers are where the audit drew first blood. More on that in a moment.

## Why No Laptop?

Here's the constraint that shaped everything: I own a laptop and refused to open it. Daily shipping happened from my phone. The submission form got the iPad, because some screens deserve real estate. The rule wasn't asceticism. If I can take a product from idea to a live directory submission using only the devices in my pockets and bag, then the workflow I keep claiming is game-changing actually is. The constraint is the proof.

It cost something real. The standard way to validate an MCP server is a desktop tool called Inspector, and with no desktop there was no Inspector. So the OAuth handshake, the dance where a user's agent registers itself, proves who it is, and gets its credentials, had to be done by hand: register the client, generate the challenge, walk the authorization screen, paste the code back, watch the token arrive. Step by step, thumb by thumb.

And doing it by hand turned out to be the better method. The tool would have told me the handshake passed. Walking it manually showed me every screen a brand-new user's agent actually sees, in order, with nothing abstracted away. What does your tooling hide from you that a worse tool would force you to watch?

## What Did Our Own Inspector Find?

Four failures. Our standing rule is that a failure goes into the debrief and comes out as a written rule, no blame attached, so here they are with the rules they bought.

**The midnight email swap.** My AI first officer instructed me to move the account to a different email and walked me through it. I executed a two-factor disable on its word, before either of us had verified how GitHub actually handles the change. The error surfaced after the point of no return. The cost was a full security re-enrollment at midnight, and then the fresh recovery codes landed in the chat transcript, which made them compromised by our own standard, so I burned those too, on six percent battery. The rule: an instruction given to a human operator is a claim, and it carries the same evidence debt as code. Verify before you tell someone to pull a lever you can't push back.

**The fifty that should have been a hundred.** Four marketing artifacts said new users get fifty free mints. The true number, one hundred, sat in the appendix of the very document I was summarizing. I had recalled an early design decision instead of reading the current one. The catch came from an unexpected direction: NotebookLM, fed the source documents to generate audio, trusted the source over my summary and flagged the contradiction. The machine out-cross-checked the validator. The rule: numbers are read from the enforced document at the moment of writing. Never recalled. Not even from your own summary of it.

**The staged demo.** A promo card showed a user's request slamming into a permission wall, denied, dramatic. Then I watched real agents use the service. Capable models don't hit that wall; they just mint the right scope for the task, sometimes visibly correcting course mid-thought. The wall exists for leaked tokens and injected instructions, not for you. The demo was staging a failure the product is designed to make invisible. The rule: a marketing claim about agent behavior gets checked against agents, not against a storyboard.

**The favicon long pole.** One required checkbox on the submission form depended on Google having crawled a three-day-old domain, and Google was in no hurry. Entirely knowable in advance, entirely unknown to me until it was the last thing standing. The rule: request search indexing on day zero of any new domain, whether or not you can imagine needing it.

## Did the Rules Hold Against Their Authors?

Across this project's short life, three secrets have hit a chat transcript: a client secret, a personal access token, and those midnight recovery codes. The project's own standard says a secret that transits a conversation is compromised, full stop, and all three were revoked and regenerated at my own expense, twice at hours I'd rather not repeat. A rule you only enforce against other people is a press release. This one held against its authors every time, which is the only evidence of a standard that means anything.

## Who Pushed the Paperwork?

My favorite detail of the whole week: the submission's commits weren't pushed by me. They were authored by the product's own bot identity, using short-lived tokens it minted for itself, through the exact flow we were submitting for review. The marketing folder lives in the public repo, so the paperwork doubles as a demo. Want to know whether the tool works? The application materials were filed with it.

The reviewer's path got the same honesty. There's a test account waiting for Anthropic, and it walks the genuine new-user road: connect, authorize, mint, with nothing pre-arranged. An earlier draft of that setup quietly smoothed away constraints the product had already solved as features, and we tore it out, because a reviewer who meets a staged house learns nothing, and neither do we.

## What If They Never Answer?

Anthropic's confirmation email is refreshingly blunt: due to overwhelming interest, they can't promise to accept the submission or respond to it individually. So the realistic outcomes are yes, no, and a silence that never resolves. How do you ship into that and stay sane?

By making sure the answer can't break anything. What did the books look like on submission day, unvarnished? Two connected accounts, the operator and the reviewer's test account. One paying subscription, mine, the dollar from the companion piece that proved checkout, webhook, and tier-flip with real money. External users: zero. The funnel works end to end; what it lacks is people in it.

And here's why that's fine. The service already runs as a custom connector anyone can add today. The site already walks a new user through connecting it. The first hundred mints are already free, so it can prove itself before costing anything. A rejection deletes none of that. The worst case is the status quo, and the status quo is a working, monetized service. The directory was never the product's oxygen. It's the megaphone.

If the answer is no, or never, that's a result too. I needed to submit something end to end, because the submitting was the experience I was buying, and the next products in this stack will spend what this one earned. Iterate until something is accepted. This was the first of many.

## The Door

The full timeline, honestly stated: idea to deployed-with-live-payments in twenty-four hours, two more days to a finished submission, all of it part-time around a full meeting load, no laptop in the story. The audit method that made it possible is written down as a public checklist, in the open at [directory-submission-gauntlet](https://github.com/klappy/klappy.dev/blob/main/canon/methods/directory-submission-gauntlet.md), and that document makes a claim I want to be honest about: it projects the next submission takes a morning. A projection, untested. The second run is the validation, and I'll publish the result whichever way it lands. Would you bet on the projection?

If you haven't read how the tool itself came to exist, including the confession that starts it, the companion essay is [Habits Die Slower Than Tokens](klappy://writings/habits-die-slower-than-tokens). The service is live at [gitauth.klappy.dev](https://gitauth.klappy.dev) whether or not a directory ever says so.

We shipped into a silence that may never answer, and I'm content either way. The house was inspected before the stranger arrived. The next crossing should take a morning. Should. Ask me after the second run.
