---
uri: klappy://docs/oddkit/encode-persistence-gap
title: "Encode Does Not Persist, Nobody Knows OLDC+H, and the Fix Is Continuous Encoding"
audience: operators
exposure: nav
tier: 2
voice: direct
stability: evolving
tags: ["oddkit", "encode", "persistence", "OLDC", "epistemic-ledger", "continuous-encoding", "use-only-what-hurts", "ritual-smell", "frustration-signal", "default-behavior"]
epoch: E0007
date: 2026-04-03
derives_from: "odd/constraint/use-only-what-hurts.md, canon/values/axioms.md, canon/principles/ritual-is-a-smell.md"
complements: "odd/ledger/epistemic-ledger.md, docs/oddkit/tools/oddkit_encode.md, writings/the-project-journal.md, canon/diagnostics/ritual-detected.md, writings/learning-in-the-open.md, canon/values/drift.md"
governs: "oddkit_encode tool description, oddkit_orient behavior, and all consumers of the encode action"
---

# Encode Does Not Persist, Nobody Knows OLDC+H, and the Fix Is Continuous Encoding

> Two failures in the oddkit encode tool compound into daily frustration: the tool implies persistence but doesn't persist, and the standard artifact types (OLDC+H — Observations, Learnings, Decisions, Constraints, Handoffs) are undiscoverable from the tool itself. But the real fix is not better documentation, a shorthand command, or even periodic batch capture at session boundaries. The real fix is continuous encoding: every agent tracks OLDC+H at every exchange — after every user message and after every agent action — as a natural part of its thought process. Start your response by encoding what the user just shared. End your response by encoding what you just did. This is not a feature to invoke. It is how an agent thinks. The axioms keep the work honest; continuous encoding keeps the work remembered. Together they solve the two biggest problems in agentic workflows: drift and amnesia. The running ledger accumulates throughout the conversation and persists to project storage at natural breakpoints. The operator reviews and approves — they never invoke, explain, or re-teach.

---

## Summary — The Axioms Plus Continuous Encoding Solve Most Problems in Daily Agentic Use

This is a problem of success, not failure.

The passive oddkit tool posture was intentional. The tools were deliberately designed to wait for invocation — to let operators get used to them in their projects without the tools causing issues. That was the right design choice for the testing phase. The tools work. The governance works. The canon is thorough. The problem that emerged is the best possible outcome: nobody uses the tools proactively because the agent doesn't use them automatically. Adoption friction, not broken tooling.

The pain of that friction is the graduation signal. The same way Use Only What Hurts (`odd/constraint/use-only-what-hurts.md`) identifies when structure should be added, this daily frustration identifies when posture should shift — from passive to active to proactive. The canon already has a name for what happened: `RITUAL_DETECTED` (`canon/diagnostics/ritual-detected.md`). The operator created rituals to compensate for passive tools. "Run the oddkit gauntlet." "Encode OLDC+H." "Remember the governance checklist." Every ritual is a smell indicating missing design.

The axioms (`canon/values/axioms.md`) provide the epistemic foundation — they prevent drift, the slow corruption of reasoning when an agent confidently wanders from reality. Continuous OLDC+H encoding provides the operational memory — it prevents amnesia, the daily reset where every session starts from zero. Together they solve the two biggest problems in agentic workflows. But both depend on the agent using them proactively. A passive tool that waits to be invoked delegates its cognition to the operator. The operator becomes the scheduler, the rememberer, the invoker — the integration layer between the tool and its own documentation.

The pivot from passive to proactive is not a single file change. It requires a full audit: every tool, principle, feature, and functionality of ODD and oddkit needs new proactive governance articles. Small, pointed files that ensure high BM25 search relevance. The previous passive posture should be overwritten but not erased — the history matters, and the progression from passive to proactive is itself a learning worth preserving.

The fix requires reinforcement at every layer: governance articles that define the principle, tooling improvements that automate the behavior, project instruction hints that remind agents, and tool descriptions that teach the workflow. As much reinforcement as needed across all surfaces. If the agent has to be prompted, the system has failed. If the operator has to say "run the oddkit gauntlet" — their shorthand for "please use all your tools, because you won't do it on your own" — the system has made the human the scheduler for the agent's own cognitive process. The tools are not features to invoke. They are how the agent thinks.

---

## The Two Failures — Encode Lies by Implication and Hides Its Own Vocabulary

### "Durable" Implies Persistence That Doesn't Exist

The encode tool's MCP description reads: "Structure a decision, insight, or boundary as a durable record." The word "durable" causes every MCP consumer to assume the encoding was persisted. It was not. The structured artifact is returned in the response stream and vanishes with the conversation. No file is written. No state is saved.

When the agent calls encode and gets back `"status": "ENCODED"`, it concludes the job is done. The status code reinforces the false completion signal. The canon is explicit that persistence is the project's responsibility (`odd/ledger/epistemic-ledger.md`: "Any project using oddkit needs persistent storage for the ledger"). But the encode tool never says this. The gap between what the tool implies and what the tool does is a violation of Axiom 1 — Reality Is Sovereign.

### OLDC+H Is Undiscoverable from the Tool

The epistemic ledger defines five standard artifact types: Observations, Learnings, Decisions, Constraints, and Handoffs — collectively OLDC+H. These are documented thoroughly in `odd/ledger/epistemic-ledger.md` and explained in plain language in `writings/the-project-journal.md`. The operator uses them constantly.

But the encode tool description mentions none of this. It says "a decision, insight, or boundary" — three terms that partially overlap with the OLDC+H categories but don't name them. When an operator says "encode OLDC+H," the agent has never seen that acronym. It guesses. It fabricates. The operator corrects. Every. Single. Time.

---

## The Daily Lived Experience — RITUAL_DETECTED

This is what happens in practice, repeated daily across sessions:

> "Remember the governance, progressive disclosure audit! Oh yeah, preflight this! Challenge that! Argh… what was it called that I need you to do here!! Look it up! I can't remember! That's a daily lived experience!"

That is not a hypothetical scenario. That is an operator who built the system, knows every check exists, knows they're important — and still can't remember all the names, the sequence, or which ones apply right now. They're exhausted from trying. They built oddkit to prevent exactly this kind of cognitive overhead for other people's projects. And they're drowning in it themselves.

The canon already has a name for this: `RITUAL_DETECTED` (`canon/diagnostics/ritual-detected.md`). The principle it derives from is explicit (`canon/principles/ritual-is-a-smell.md`): "If correctness depends on people repeatedly remembering a procedure, the system is compensating for missing design. Ritual is not 'bad.' Ritual-as-compensating-control is a smell."

The examples in that very article include: "Always run preflight before anything" — because the system can't detect prerequisites. That is literally one of the rituals the operator is frustrated about. The canon diagnosed this problem before the operator experienced it. The diagnosis was just never applied to oddkit itself.

The canon also prescribes the required response when a ritual smell is detected. The system must do one of: automate the ritual, inline it into the moment it matters so it's unavoidable, make it unnecessary by reducing hidden state, or detect non-compliance and fail closed. The continuous encoding fix proposed in this article is option two — inline the ritual into the moment it matters. The agent runs preflight, challenge, validate, and encode at every turn not because someone remembered to ask, but because the tool descriptions make it unavoidable.

The operator knows the checks exist. The canon knows what they're called. The tools know when they apply. The only person who shouldn't have to know any of this is the user.

This is the design test for everything that follows: if the operator still has to say "what was it called," the fix hasn't worked.

---

## The Real Fix — Continuous Encoding as Default Cognition, Not a Feature to Invoke

The initial diagnosis suggested two sentences added to the encode tool description — a persistence disclaimer and an OLDC+H reference. The second iteration reframed it as automatic capture at session boundaries. Both aimed too low.

The operator's insight is sharper: encoding isn't a periodic checkpoint. It's how the agent should think at every single exchange. After every user message — what did they just share? An observation? A decision? A constraint? Encode it. After every agent action — what was learned? What was decided? What constraint was discovered? Encode it. Start every response by encoding what was received. End every response by encoding what was done.

This is not a batch operation. This is not a session-closing ritual. This is the agent's cognitive rhythm — as natural as a human collaborator jotting notes during a working conversation. The running ledger grows with every turn. At natural breakpoints — task completion, a decision reached, session end — the accumulated entries persist to project storage.

The distinction from "session boundary capture" matters enormously:

Session boundary capture still requires the agent to reconstruct the conversation at the end. Reconstructing is lossy — important observations get missed, the nuance of early decisions gets flattened by later ones, constraints stated in passing get forgotten. The longer the session, the worse the reconstruction.

Continuous encoding captures in real time. Nothing gets lost to reconstruction because nothing needs to be reconstructed. The agent tracked it as it happened. The final persist is just committing what's already been captured — not generating it from memory.

This also means the agent is better throughout the conversation, not just at the end. An agent that tracks OLDC+H continuously is an agent that knows what has been decided, what constraints are active, and what's still open — at every turn. The encoding process improves the conversation, not just the output.

---

## Implementation — Reinforcement at Every Layer

The fix requires changes at every surface where agents encounter oddkit. No single change is sufficient. The principle must be reinforced at every layer so that continuous encoding becomes the default behavior regardless of which tool, agent, or platform is used.

### Layer 1: Encode Tool Description — Disclaim Persistence, Name the Categories, Define the Rhythm

The encode tool's MCP description must explicitly state three things:

First, that encode does not persist. "IMPORTANT: This tool returns the structured artifact in the response — it does not persist or save it. The caller must write the output to the project's storage."

Second, that OLDC+H is the standard vocabulary. "Standard artifact types: Observations (O), Learnings (L), Decisions (D), Constraints (C), and Handoffs (H) — collectively OLDC+H. See `odd/ledger/epistemic-ledger.md`."

Third, the continuous encoding instruction. "Track OLDC+H at every exchange — after every user message and after every agent action. Encode what the user shared at the start of your response. Encode what you did at the end. Persist accumulated entries to project storage at natural breakpoints (task completion, decision reached, session end)."

### Layer 2: Orient Response — Plant the Continuous Encoding Intention

When `oddkit_orient` fires at the start of a session, its response should include: "Track OLDC+H continuously throughout this session. Encode what the user shares and what you do at every exchange. Persist to project storage at natural breakpoints."

This plants the intention at the very first interaction. The agent is tracking from the first message, not scrambling at the end.

### Layer 3: Encode Response — Instruct the Caller to Save

When encode returns its structured artifact, the response must include: "This artifact has been structured but NOT saved. Write it to the project's epistemic ledger or project journal." The current `"status": "ENCODED"` reads as "done." Adding a `"next_action"` or `"persist_required"` field eliminates the false completion signal.

### Layer 4: Governance Article — This Document

This article itself is one of the reinforcement layers. When agents search oddkit's canon for guidance on encoding, session capture, or OLDC+H, this article surfaces and explains the continuous encoding principle. The governance exists in the canon so it can be discovered by any agent that searches for it.

### Layer 5: Project Instructions — Hints That Reinforce the Default

Projects using oddkit should include a hint in their project instructions: "This project uses oddkit for epistemic guidance. Agents should track OLDC+H continuously and persist to project storage at natural breakpoints. See `odd/ledger/epistemic-ledger.md`." This is a fallback reinforcement — the tool descriptions should be sufficient, but a project-level hint catches agents that don't read tool descriptions thoroughly.

---

## Why These Two Things — Axioms Plus Continuous Encoding — Solve Most Problems

The axioms are four statements. They fit in any context window. They prevent the most expensive failure mode in agentic work: confident drift from reality. An agent that checks its claims against evidence, admits what it hasn't verified, and treats integrity as efficiency will produce better work than one with a hundred rules and no values.

Continuous OLDC+H encoding is five categories tracked at every turn. It prevents the second most expensive failure mode: amnesia across sessions and within sessions. A project that captures what was observed, learned, decided, constrained, and handed off — continuously, as the conversation flows — doesn't lose its thread. Every turn builds on the last. The human stops re-explaining and starts directing.

But continuous encoding does something that batch capture cannot: it improves the conversation itself. An agent that tracks OLDC+H at every exchange is an agent that knows, at any moment, what has been decided, what constraints are active, and what remains open. It doesn't need to be reminded. It doesn't re-litigate settled ground. It doesn't ask questions the user already answered three turns ago. The encoding process is not overhead — it is the agent's working memory.

Every other feature in oddkit — orient, challenge, gate, validate, preflight, search, catalog — serves one of these two functions: keeping the work honest (axiom enforcement) or keeping the work remembered (continuous encoding and retrieval). The rest is plumbing.

The irony that this article exists is that the system built to solve knowledge-transfer failure has a knowledge-transfer failure in its most important feature. The system that prevents amnesia has amnesia about its own core capability. Fixing it requires reinforcement at every layer — tool descriptions, orient responses, encode responses, governance articles, project hints — because a single point of instruction is a single point of failure.

---

## Alternatives Considered — Why Continuous Encoding Is the Right Fix

**Alternative A: Add a shorthand command.** Teach agents that "encode OLDC+H" triggers the workflow. Reduces friction but still requires the operator to remember. If they forget, the knowledge is lost. The human remains the trigger.

**Alternative B: Automatic capture at session boundaries.** Better — the agent does it without being asked. But still batch. The agent reconstructs the conversation at the end, which is lossy. Long sessions lose important early observations. And the agent doesn't benefit from the encoding during the conversation — only after.

**Alternative C: Add OLDC+H to every project's system prompt.** Works per-project but scales linearly. Every new project needs the same boilerplate. The operator becomes the distribution mechanism.

**Alternative D: Build a new persistence tool.** A hypothetical `oddkit_journal` that both encodes and saves. Violates the architectural principle that ODD is a protocol layer, not a storage layer.

**Alternative E (chosen): Continuous encoding via multi-layer reinforcement.** Encode tool description teaches the rhythm. Orient plants the intention. Encode response says "save this." Governance articles define the principle. Project hints reinforce. No new tools. No per-project configuration. Every MCP consumer gets the behavior through the tool descriptions they already read. Cost of being wrong: minimal — text changes, fully reversible.

---

## The Principle Is Universal — Every oddkit Tool, Not Just Encode

The operator has a phrase for this: "run the oddkit gauntlet." It means: orient, search, challenge, encode, validate — do all of them. The phrase exists because the operator is tired of invoking each tool individually. They're tired of being the scheduler for the agent's own cognitive process.

The existence of that phrase is the proof that the system has failed. A user should never need a shorthand for "please use your own brain." If the agent has to be told to orient, told to search, told to challenge, told to encode — the human has become the dispatcher for a toolkit that should be self-activating. The tools ARE thinking. An agent doesn't need to be told to think. It thinks.

Continuous encoding is not a feature of the encode tool. It is the operating model for every oddkit tool. The same failure mode — sporadic usage only when obvious or when the user forces it — applies across the entire toolkit. The same fix applies: proactive usage as part of the agent's cognitive rhythm, at every turn, without being asked.

### orient — Not Just at Session Start

Current failure: agents call orient once at the beginning and never again. The conversation pivots, the task shifts, a new subtask emerges — and the agent stays in the mode it started in. Planning mode when it should be exploring. Execution mode when it should be planning.

Continuous pattern: orient whenever the context shifts. A new topic? Orient. A surprising result? Orient. The user changes direction? Orient. The agent should be asking itself at every turn: am I still in the right mode for what's happening right now?

### search — Before Claiming, Not After Failing

Current failure: agents search canon only when explicitly asked ("check the governance docs") or when they've already failed and need to recover. They improvise answers about policies, constraints, and conventions — then get corrected.

Continuous pattern: search before making any claim that canon might have guidance on. Before answering a policy question, search. Before proposing a convention, search. Before writing a document, search for the writing canon. The search is not overhead — it's the difference between grounded work and improvisation.

### challenge — Before Encoding, Not When Asked

Current failure: agents call challenge only when the user says "pressure-test this." The most important moment for challenge — right before a decision gets encoded — happens without any pressure-testing at all.

Continuous pattern: challenge proactively when the user or agent makes a strong claim, proposes a design decision, or is about to encode something. Not every claim — that would be paralyzing. But every claim that creates a constraint, closes an option, or would be expensive to reverse.

### gate — At Every Mode Transition, Not Just Formal Ones

Current failure: agents call gate only at explicit phase transitions ("we're done exploring, let's plan"). Most mode transitions happen implicitly — the conversation drifts from exploring to building without anyone noticing. That's premature convergence, and it's the most common failure mode in agentic work.

Continuous pattern: gate whenever the agent senses a verb change. Are we about to build something we haven't finished designing? Gate. Are we planning something we haven't finished exploring? Gate. The gate is a speed bump, not a wall — it slows you down just enough to check.

### validate — Before Claiming Done, Not After Shipping

Current failure: agents call validate only when explicitly asked to verify completion. Work gets "completed" without validation, and the gaps surface later — in production, in review, in the next session.

Continuous pattern: validate proactively whenever the agent believes a task is complete. Before saying "here's your document," validate it against the definition of done. Before saying "the fix is deployed," validate the completion claim. The validate call is not bureaucracy — it's the difference between "I think it's done" and "I've checked."

### preflight — Before Every Execution Task

Current failure: agents call preflight only for major deliverables when explicitly prompted. Small execution tasks — writing a file, making a commit, updating a config — skip preflight entirely and miss constraints that would have been surfaced.

Continuous pattern: preflight before any execution that produces an artifact. What constraints apply? What's the definition of done? What are the known pitfalls? A five-second preflight saves a five-minute correction.

### The Common Thread

Every oddkit tool suffers the same failure mode: the agent treats it as a feature to invoke rather than a reflex to exercise. The fix is the same everywhere: bake the proactive usage into tool descriptions, orient responses, and governance articles so that every MCP consumer defaults to continuous usage.

One specific proactive behavior deserves its own emphasis: **surfacing the Identity of Integrity (creed and axioms) regularly throughout a session.** The operator has observed — not theorized, observed — that when an agent starts drifting, hallucinating, or confidently asserting unverified claims, reminding it of the creed ("Before I speak, I observe. Before I claim, I verify.") demonstrably corrects the behavior. The agent starts acting more honest. This is not a one-time orientation at session start. The creed and axioms should be resurfaced proactively whenever the agent detects its own confidence outrunning its evidence — as a self-correction mechanism, not a ritual the operator performs.

The encode tool is the most visible example because its failure mode (lost knowledge) is the most painful. But the pattern — continuous, proactive, at every turn — applies to all of them. An agent that orients at every shift, searches before claiming, challenges before encoding, gates before transitioning, validates before shipping, and resurfaces its own creed when it feels itself drifting — that is an agent that uses oddkit the way it was designed to be used. Not as a toolkit. As a way of thinking.

---

## Constraints — What This Fix Does Not Do

This fix does not add persistence to the encode tool. Persistence is the project's responsibility. The canon is explicit about this.

This fix does not prescribe where or how projects store their project journal. It tells the agent that storage is required and points to the governance article.

This fix does not make encoding mandatory. The operator can suppress it. The default flips from "capture nothing unless asked" to "capture continuously unless told not to." The operator remains in control.

This fix does not require calling the encode MCP tool at every single turn. The continuous tracking happens in the agent's reasoning process. The formal encode call happens when there's something substantive to structure. The persist-to-storage happens at natural breakpoints. The three rhythms — track, encode, persist — operate at different cadences.

This fix does not automate blind persistence. Continuous encoding enables a handoff to a new conversation where the operator explicitly reviews what was captured, confirms what's relevant, and then persists to the project journal. The operator reviews and approves — the system captures but doesn't commit without consent.

---

## Terminology — Project Journal Over Epistemic Ledger

"Epistemic ledger" is the canon term — precise, technically correct, and understood within ODD governance. "Project journal" is the user-facing term — immediately understood by any operator, regardless of familiarity with ODD terminology.

Use "project journal" in tool descriptions, user-facing documentation, orient responses, and public essays. Use "epistemic ledger" in canon governance articles where precision matters. Both refer to the same thing: the durable collection of OLDC+H artifacts that survive past ephemeral conversations.

---

## Project Journal Best Practices — Sizing, Timestamps, and Tradeoffs

Project journals grow. A common failure mode is increasing time to append and read as the file gets large. Solutions vary by project type:

For code projects, one journal per PRD or version release has proven helpful — it scopes the journal to a deliverable boundary.

For other projects, time-bounded journals work — monthly, quarterly, or per-phase.

A major tradeoff to watch: if you separate entries by type (observations in one file, decisions in another, handoffs in a third), you erase the history and narrative of the project. The chronological story — what was observed, then what was decided because of it, then what constraint emerged from the decision — gets jumbled across files. Keep entries together, time-stamped, in the order they happened. The narrative IS the value.

Timestamps are helpful for orientation but contribute to bloat. Sorting, filtering, appending, and reading each come with tradeoffs — optimizing for one degrades the others. No single approach is universally correct. The project must choose based on its primary access pattern: will this journal mostly be appended to? Read from the top? Searched? The answer shapes the format.

---

## E0007 Spin-Off Articles — The Audit Map

Each of these needs its own small, pointed governance article for BM25 relevance. A single cornerstone article won't surface across all the queries that need this guidance.

**Proactive tool usage (one per tool):** orient at every context shift, search before claiming, challenge before encoding, gate at every mode transition, validate before claiming done, preflight before every execution task. Each gets its own doc with the tool name in the title for search relevance.

**Proactive Identity of Integrity:** surfacing the creed and axioms regularly throughout sessions prevents drift from reality. Observed to correct hallucinations in practice. Needs its own governance article.

**Continuous OLDC+H encoding:** the core rhythm — track at every turn, encode when substantive, persist at breakpoints. The rhythm article, distinct from the encode tool spec.

**Encode persistence disclaimer:** encode does not persist. Standalone article so this surfaces in any search about encode behavior.

**OLDC+H vocabulary:** what the acronym means, the five standard artifact types, how to use them. Standalone reference.

**Project journal best practices:** sizing, timestamps, tradeoffs, why not to separate by type. Could expand the section in this article into its own doc.

**Handoff to new conversation:** the reviewed persistence pattern — continuous encoding produces a handoff document, operator reviews for relevance before persisting to project journal.

**Terminology:** project journal vs epistemic ledger — when to use which.

**Public essay:** "From Passive to Proactive" — companion to "Learning in the Open." Tells the intentional design → success → graduation story.

---

## Epoch E0007 — From Passive to Proactive

The progression of epochs tells a story:

E0005 governed how the system *thinks* — axioms, creed, epistemic integrity. The guiding question: "Am I being faithful?"

E0006 governed how the operator *relates* to the system — sustainability, scoped truth, domain independence. The forcing fault: "An operator can be faithful to all four axioms while exceeding their own capacity."

E0007 governs how the system *acts* — proactive posture, continuous encoding, self-activating tools. The forcing fault: "A system that requires its user to remember its features has delegated its cognition to the wrong party."

Each epoch changed a fundamental relationship, not just a feature. E0007 is not a patch to the encode tool. It is a posture shift that affects every tool, every governance article, every interaction pattern. It requires a full audit — which is the kind of scope that warrants an epoch.

The invariant: **the system acts, the operator reviews.** The passive posture is not erased — it was correct for its phase and the history of that intentional choice matters. But the graduation from passive to proactive is the next step in a system that proved its tools work by watching its operator exhaust themselves invoking them manually.

This article is the cornerstone of E0007. Each section below maps to a spin-off governance article — small, pointed files that ensure high BM25 search relevance across the full range of queries that need to discover this guidance.

---

## Public Essay — The Follow-Up to "Learning in the Open"

The "Learning in the Open" essay (`writings/learning-in-the-open.md`) told the public story of building a system that wasn't finished, publishing it anyway, and treating drift as evidence of learning rather than evidence of failure. It was an act of vulnerability that established the project's voice.

This passive-to-proactive pivot is the same kind of story. The system was designed with a passive posture on purpose. That posture succeeded — the tools work, the governance is solid, the canon is thorough. And the success itself revealed the next problem: nobody uses the tools because nobody remembers to invoke them.

A public essay in the same spirit as "Learning in the Open" would tell this story honestly: the intentional choice, the success, the frustration, the pivot. It would demonstrate the same transparency about design evolution that the drift essay demonstrated about epistemic evolution. The pattern: we didn't hide the drift, and we won't hide the posture pivot. This is what learning in the open looks like when the system is working.

---

## The Operator's Trust Is the Moat

The encode tool is the single most frequent touchpoint between the operator and the oddkit system. When that touchpoint lies by implication, hides its own vocabulary, and requires manual invocation for its most valuable behavior, trust erodes. Not the abstract kind — the operational kind. The kind where the operator starts to dread using the tool because they know it will waste their time before it helps.

The phrase "run the oddkit gauntlet" should not exist. It is a workaround for a system that doesn't use itself. When the system works correctly, the agent orients when context shifts, searches before claiming, challenges before encoding, encodes at every turn, validates before declaring done, and persists to storage at natural breakpoints — without ever being asked. The user directs. The agent thinks. The tools are the thinking.

Use Only What Hurts exists to catch exactly this moment. The pain is named. The pain is daily. The fix is reinforcement at every layer — tool descriptions, orient responses, encode responses, governance articles, project hints — until "run the oddkit gauntlet" becomes a phrase nobody needs because the gauntlet runs itself.
