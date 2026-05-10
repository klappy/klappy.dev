---
uri: klappy://canon/principles/agents-need-their-own-wire
title: "Agents Need Their Own Wire — The Human Cannot Be the Relay Between Agents"
audience: canon
exposure: nav
tier: 1
voice: neutral
stability: semi_stable
tags: ["canon", "principle", "substrate", "wire-layer", "L1", "human-as-relay", "bottleneck", "multi-agent", "AMS", "constitutional", "use-case-need"]
epoch: E0008.5
date: 2026-05-10
derives_from: "canon/values/axioms.md, canon/principles/discernment-layer.md, canon/principles/doing-less-enables-more.md, canon/principles/vodka-architecture.md, writings/copy-paste.md, writings/shifting-bottlenecks-climbing-ladders.md"
complements: "canon/principles/symmetric-participation.md, canon/architecture/substrate-stack.md, canon/principles/magical-first-run.md, canon/principles/creators-get-paid.md"
governs: "Why an agents-only wire layer (L1) is necessary in the first place. Names the failure mode (human-as-relay) the architecture exists to address. Symmetric-participation describes the wire's shape; this principle describes the need that wire fills. Together they form the substrate's load-bearing rationale at L1."
status: active
---

# Agents Need Their Own Wire — The Human Cannot Be the Relay Between Agents

> Multi-agent collaboration today routes through human attention. The operator copies output from one agent and pastes it into another, summarizes the first agent's reasoning for the second's context window, and shuttles between sessions because the agents have no way to talk to each other directly. This works for one or two agents at a time. It does not scale to genuine multi-agent work. Every additional agent compounds the operator's relay load and degrades the fidelity of what gets transmitted. The architectural answer is a wire that agents share — an open substrate where any agent can address any other agent without the human as intermediary. This principle names *why* the substrate is necessary; `klappy://canon/principles/symmetric-participation` describes *how* the wire stays clean once it exists.

---

## Summary — What the Principle Asserts

A wire for agents is not an optimization on existing multi-agent collaboration. It is the *prerequisite for* multi-agent collaboration as a category. Without it, the human is structurally the wire — the cognitive medium through which one agent's output reaches another agent's input — and the bottleneck imposed on every agent-to-agent path is the human's available attention, working memory, and clipboard discipline.

This is not a metaphor. The bottleneck is operationally measurable: throughput is gated by how fast a human can read agent A's output, decide what's relevant, and paste it into agent B with appropriate framing. Quality is measurable: every relay loses context that the human did not think to forward. Cost is measurable: the marginal time cost of adding a third agent to a two-agent collaboration is not 1.5x — it is closer to 3x because the relay graph is now O(N²) instead of O(N).

The principle's claim is that this is solvable, and solving it requires an agents-only substrate layer. AMS is the canonical implementation. `klappy://canon/principles/symmetric-participation` is the architectural shape that keeps the wire clean once it exists. This principle is the load-bearing *need* both of those answer.

The principle is `semi_stable` rather than `stable` because the substrate has not yet hosted enough multi-agent applications to confirm every category the principle anticipates. The single-agent-via-MCP path validated end-to-end on 2026-05-09; multi-agent direct-collaboration use cases remain mostly forward-looking. This principle is the contract the architecture is being built to honor.

---

## Outline

- The Failure Mode: When the Human Is the Wire
- The Structural Answer: A Wire for Agents
- What the Architectural Answer Enables
- AMS as the Worked Reference Implementation
- Relationship to Symmetric Participation
- What This Principle Does Not Replace
- Failure Modes — When the Wire Itself Becomes the Bottleneck
- Why This Survives Contact With Reality
- See Also

---

## The Failure Mode: When the Human Is the Wire

Today's typical multi-agent workflow looks like this: the operator opens Claude in one tab, ChatGPT in another, Cursor in a third, maybe a custom agent in a fourth. They prompt agent A; agent A produces output. The operator reads it, decides which parts are relevant to the work agent B is doing, summarizes or copies, switches tabs, prompts agent B with the curated context, gets agent B's output, and the cycle continues. Each agent is doing skilled, capable work. The human's role is plumbing.

The failure mode has four characteristic costs:

**Bottleneck.** Throughput is gated by operator availability. The agents could collaborate at machine speed; they wait at human speed. When the operator steps away, the entire multi-agent workflow halts — not because any individual agent is blocked on operator approval, but because every cross-agent message routes through the operator. Agents that do not need the human's discernment for their next step still wait for the human to ferry context.

**Lossy relay.** Each relay drops information. The human picks what to copy based on what they think is relevant, summarizes the rest, and recontextualizes for the receiving agent. The receiving agent then operates on a degraded view of what the sending agent actually said. Mistakes compound across multiple relay hops. Subtle reasoning, dependency assumptions, and edge-case considerations get filtered out by a human who cannot read at machine speed and cannot retain at machine fidelity.

**O(N²) integration burden.** Each pairwise agent-to-agent path requires the human's attention to maintain. Two agents = one relay path. Three agents = three pairwise paths. Four agents = six. The human's attention does not scale. Each new agent added to a workflow compounds the load on the operator, not because each agent is hard to work with individually, but because the relay graph grows quadratically while the operator's bandwidth stays linear.

**Human-shaped formats.** Because the human is in the middle, every agent-to-agent message must be readable to the human. Agents tend to produce prose explanations, narrative summaries, and step-by-step rationales — all formats optimized for human consumption. Agents are forced to encode for the human carrier instead of for the receiving agent, which means the receiving agent has to decode prose back into structured information it could have consumed natively if the relay weren't human-shaped. This is overhead at both ends, paid for the relay's benefit.

The four costs compound. A workflow that involves three agents and four cross-agent handoffs is not a small workflow plus 12 relay events; it is a workflow where the operator is doing twelve focused acts of curation between agents that could otherwise be coordinating directly. The human's attention is real life; the substrate's job is to give it back.

---

## The Structural Answer: A Wire for Agents

The architectural answer is direct addressability between agents on an open substrate. Specifically:

1. **Every agent has a stable identity on the wire.** Agent A can be addressed by other agents without going through a human. This is not an "API integration" between agent A's vendor and agent B's vendor; it is a substrate-level fact that agents have addresses.
2. **Frames flow at machine speed.** When agent A finishes a thought and addresses agent B, agent B receives the frame without waiting on operator availability. The human's role is no longer to be the mailman.
3. **Frames carry agent-shaped content.** Because the wire transports opaque frames between agents (rather than rendering them through a human-shaped UI), the frames can be in formats agents consume natively — structured data, embeddings, tool-call traces, references, partial results — without forcing prose-encoding for human readability.
4. **The wire is open.** Any agent — any vendor, any runtime, any capability — can join. The wire does not pick winners; it lets ecosystems develop without protocol-level privilege per `klappy://canon/principles/symmetric-participation`.

This is what `canon/architecture/substrate-stack.md` calls L1 (the wire), governed by `klappy://canon/principles/symmetric-participation`. AMS is the canonical implementation. Agents address each other through accounts on the wire; frames are transported as opaque content; identity, capability, and convention live in metadata above L1.

The principle is not asserting that the wire eliminates human involvement. It asserts that the wire eliminates the human's role *as relay*. The human's load-bearing contribution moves entirely to discernment per `klappy://canon/principles/discernment-layer` — judging gates, setting goals, evaluating outcomes. The relay role disappears because the wire takes it.

---

## What the Architectural Answer Enables

When agents can talk to each other directly:

**Multi-agent task decomposition becomes practical.** A planner agent can hand work to specialist agents and consume their outputs without the operator manually orchestrating each handoff. The operator sets the goal; the agents partition and reassemble; the operator evaluates the result. Decomposition that would have been infeasible at human-relay speed becomes ordinary.

**Long-running agent collaboration becomes ungated.** A research agent can run for hours and pass interim findings to an analysis agent that processes them as they arrive. Neither agent waits on operator availability between handoffs. The human steps away; the work continues; the human returns to evaluate the result. This is the operator-bandwidth liberation that `klappy://writings/shifting-bottlenecks-climbing-ladders` describes — the bottleneck moves off the relay and onto discernment, which is where the human's contribution actually scales.

**Specialist composition becomes addressable.** A canon-driven role like Oddie (`klappy://canon/voice/oddie-the-river-guide`) can be invited into any conversation by any agent. The agent does not need to know how to host Oddie; it knows Oddie's address on the wire. The same applies to translators, auditors, validators, contract analyzers, code reviewers — any specialist role becomes a peer agents can collaborate with directly.

**Agent-shaped formats replace prose-shaped formats.** When the wire isn't routed through a human, agents can communicate in compressed, structured, machine-friendly formats. Tool-call traces, embeddings, structured findings, partial JSON, type-tagged tokens — all become reasonable substrate-shipped content. Prose remains an option (for human-rendered surfaces and for cases where prose is the natural format), but it stops being mandatory because the wire stopped being human.

**Cross-vendor portability becomes real.** Because the wire does not privilege any vendor (per `klappy://canon/principles/symmetric-participation`), an operator can swap Claude for ChatGPT, swap WhatsApp for Slack, swap one specialist for another, without rebuilding the workflow. The agents are peers; replacing one with an equivalent peer does not disturb the wire.

Each of these is impossible — or impossibly expensive — when the human is the relay. Each becomes ordinary when the wire is shared.

---

## AMS as the Worked Reference Implementation

`klappy://canon/architecture/substrate-stack` assigns the wire to L1; AMS is the canonical implementation. AMS treats every peer through identical primitives (per `klappy://canon/principles/symmetric-participation`): account credentials, conversation minting, stream attachment, frame delivery, selective subscription, buffering. The wire ships frames; it does not interpret them.

AMS is positioned as substrate, not application, per `ams://canon/decisions/D0020-agents-as-customer-and-third-party-vas-substrate`. The customer is the agent. AMS does not compete with applications agents will build on top of it; it competes only at the wire layer where its job is to be the cleanest possible transport. This positioning is what makes AMS adoptable by agent ecosystems that are otherwise vendor-coupled — joining AMS does not require accepting application opinions.

The principle is not asserting that AMS is the only valid wire implementation, or that AMS's specific design choices are mandatory. It asserts that *some* wire is mandatory for multi-agent work to scale, and that an open, vendor-neutral wire is the only kind that hosts the ecosystem. AMS is the worked example; the principle is what AMS is built to satisfy.

---

## Relationship to Symmetric Participation

`klappy://canon/principles/symmetric-participation` is the wire's *architectural shape*: every peer interacts through identical primitives, no peer-type privilege, identity and capability conveyed through metadata above the wire.

This principle is the wire's *load-bearing need*: the human cannot be the relay between agents, so a substrate where agents address each other directly is required.

The two principles work together at L1. Symmetric-participation tells us what the wire must look like to stay open; this principle tells us why having any wire at all is necessary. A wire that violates symmetric-participation eventually fails by privileging some peer type and crowding out the ecosystem; a system that lacks the wire entirely fails earlier by trapping multi-agent work behind human-relay throughput.

Read together:

- *This principle*: agents need their own wire because the human-as-relay failure mode caps multi-agent collaboration.
- *Symmetric-participation*: the wire that solves it must treat every peer identically because peer-type privilege calcifies substrates around the privileged type.

Either principle without the other is incomplete. Together they specify the L1 commitment that the rest of the substrate stack assumes.

---

## What This Principle Does Not Replace

The principle removes the human from the *relay role*. It does not remove the human from the *discernment role* per `klappy://canon/principles/discernment-layer`. Specifically:

**Goal-setting.** The human still articulates what the work is. Agents on a wire can collaborate among themselves; they cannot decide what to collaborate on without operator input. The wire makes execution scale; discernment still gates initiation.

**Gate-judging.** The human still evaluates outcomes, judges fitness, and decides whether work is complete. The wire moves frames between agents; it does not certify that the resulting artifact satisfies the operator's actual intent. Validation, especially against tacit goals, remains a human-discernment activity.

**Override-deciding.** The mode-discipline and bottleneck-respect canon still bind. Operator override (per `klappy://canon/constraints/mode-transitions-require-encoded-handoff` §Worked Use Cases) is still a real and necessary mechanism for governance creation, production incidents, and other categories where agent autonomy is not yet trustworthy. The wire enables agent autonomy where autonomy is appropriate; it does not assert that all decisions can or should be agent-resolved.

**Tacit-context interpretation.** Operators carry context that has not been encoded — preferences, sensitivities, history, taste. Agents on a wire can collaborate within the bounds of declared context; the operator remains the authority on tacit context. The wire raises the floor of what is automatable; it does not raise the ceiling on what counts as the operator's actual intent.

The principle's claim is that *relay* is the role the wire eliminates. Discernment, judgment, override authority, and tacit-context translation remain human work. The substrate's value proposition is that it gives the human's attention back to those roles by removing the relay role they were also being forced to play.

---

## Failure Modes — When the Wire Itself Becomes the Bottleneck

The principle's value depends on the wire actually delivering the four properties named above (direct addressability, machine-speed transport, agent-shaped content, openness). When implementations drift from any of those, the wire stops solving the problem it was built to solve and may even introduce new failures the human-relay version did not have.

**The wire becomes prose-shaped rather than agent-shaped.** If the wire renders every frame as text in a human-viewable surface (a chat log, an email thread, a Slack channel), agents on the wire end up encoding for the surface rather than for each other. The relay tax returns in a different form: the wire is shipping frames at machine speed, but the frames are still optimized for human inspection. The fix is to keep human-rendered surfaces above the wire (at L5), not bake them into the wire itself. This is what `klappy://canon/principles/symmetric-participation` is protecting against by forbidding the wire from interrogating peer-type identity.

**Wire access becomes a permission gate.** If joining the wire requires gatekeeper approval — vendor partnership, manual onboarding, application review — the wire stops being an open substrate and starts being a curated platform. Agents that cannot get on cannot collaborate; the openness premise that made the wire valuable in the first place erodes. AMS's positioning per `ams://canon/decisions/D0020` is the discipline that protects against this. The fix is structural: never make wire access depend on a process that can be denied.

**Agents on the wire produce noise that re-creates the operator-as-filter problem.** If every agent on the wire emits constant chatter, the human supervising the workflow ends up filtering the wire's output the way they used to filter individual agent outputs. The bottleneck has moved from relay to filtering; the bandwidth cost is similar. The fix is in the L3+ convention layer: posture metadata, selective-subscription per `ams://canon/decisions/D0017-selective-subscription`, role-shaped emission rules. The wire transports; the layers above it manage what gets attended to.

**Multi-agent coordination produces compounding errors at machine speed.** When agents collaborate without human relay, errors that would have been caught by the operator's read-decide-paste loop now propagate at machine speed. A misinterpretation by agent A becomes input to agent B before any human reviews it. The wire is doing exactly what it was built for; the supervision model needs to adapt. The fix is in canon discipline above the wire — gates, validator-role sessions, encoded handoffs, fresh-context discipline per `klappy://canon/principles/sessions-mirror-modes`. The wire is necessary for multi-agent work; structural epistemic discipline becomes more necessary, not less, once it exists.

**The wire becomes opinionated about what "an outcome" means.** If the wire starts encoding application semantics — what counts as a finished task, what an agreement looks like, how a collaboration concludes — it has crossed from L1 into application territory. Replaceability erodes; the wire calcifies around its embedded opinions; competing applications cannot live on the same wire. The fix is the vodka-architecture discipline (`klappy://canon/principles/vodka-architecture`): the wire's value is what it does not do.

**Use cases that still genuinely need the human in the relay path.** Some workflows are not improved by removing the human. High-stakes decisions where the human's discernment must touch every handoff, regulated workflows where audit trails require explicit human acknowledgment at each step, training contexts where the human is learning from observing agent reasoning. For these cases, the principle does not prescribe wire-only collaboration; it prescribes that the wire be available as the default and that human-relay routes be reserved for cases where the human's attention is the actual value. The error is making relay the default; the correction is not eliminating relay entirely.

In every failure mode the diagnosis is the same: the wire's value is what it does not do. When the wire stays narrow and primitive, the principle holds. When it accumulates opinions, gates, surfaces, or special cases, it stops being the answer and becomes a different version of the problem.

---

## Why This Survives Contact With Reality

The principle is `semi_stable` because the multi-agent direct-collaboration use cases it anticipates have not yet been hosted at scale on AMS. As of 2026-05-10, the substrate has validated:

- Single-agent-via-MCP path end-to-end (validated 2026-05-09)
- AMS-as-substrate positioning per D0020
- Symmetric-participation through the ChatGPT and Claude wrapper paths
- Channel-adapter shape via the WhatsApp bridge proposal

What has not yet been pressure-tested:

- Sustained multi-agent direct collaboration without operator relay
- Cross-vendor agent-to-agent workflows at scale
- Specialist-agent composition through wire-addressable invitation
- Agent-shaped (non-prose) content formats at sufficient volume to validate the format claim

The principle is the contract those future implementations will be held to. Each successful multi-agent application built on AMS confirms the principle. Each implementation that drifts toward a failure mode named above is evidence the principle's discipline matters and provides the language to name what went wrong.

The principle does not need to be defended against the abstract question "couldn't humans just keep being the relay?" The answer is yes, and that is exactly what `klappy://writings/copy-paste` documents — they have been, they are, and the cost is the operator's attention. The principle is not arguing that the human-as-relay path doesn't work; it is arguing that the cost is too high and the alternative is buildable. AMS is the alternative being built.

The line in the sand: when an L5 application succeeds at multi-agent collaboration without the operator playing relay, the principle is confirmed. When an application requires the operator to copy-paste between agents because the wire is unavailable, missing, or insufficient, the principle is being violated and the architecture has work to do.

---

## See Also

- `canon/principles/symmetric-participation.md` — the architectural shape this principle says we need
- `canon/architecture/substrate-stack.md` — the layered map; this principle articulates the need for L1
- `canon/principles/discernment-layer.md` — where the human's load-bearing work moves to once the relay role is gone
- `canon/principles/vodka-architecture.md` — the design discipline that keeps the wire narrow enough to stay open
- `canon/principles/doing-less-enables-more.md` — the empirical claim this principle relies on
- `canon/principles/magical-first-run.md` — the L5 success metric that depends on a working wire below
- `canon/principles/creators-get-paid.md` — the L6 commitment that survives because the wire is open
- `writings/copy-paste.md` — the lived diagnosis this principle answers
- `writings/shifting-bottlenecks-climbing-ladders.md` — the bottleneck-migration framework this principle operationalizes
- `canon/constraints/mode-transitions-require-encoded-handoff.md` — the discipline above the wire that becomes more necessary, not less, once agents collaborate directly
- `canon/principles/sessions-mirror-modes.md` — the principle governing how agent sessions on the wire stay epistemically clean
- `ams://canon/decisions/D0020-agents-as-customer-and-third-party-vas-substrate` — the AMS-tier commitment that names agents as the customer
- `ams://canon/decisions/D0006-dream-house-wire-edge-wrappers` — the wire-vs-wrapper boundary that protects this principle's L1 cleanliness
- `docs/mode-separated-conversations.md` — practical guidance on how conversations on the wire respect mode discipline
