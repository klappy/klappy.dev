---
uri: klappy://canon/methods/spawned-agent-session-runtime-contract
title: "Spawned Agent Session Runtime Contract — Five Orthogonal Dimensions That Mechanize Existing Canon"
audience: canon
exposure: nav
tier: 2
voice: neutral
stability: draft
tags: ["canon", "methods", "spawned-agent-sessions", "runtime", "governance", "epistemic-modes", "engagement", "vodka-architecture", "mechanizes-canon"]
epoch: E0008.5
date: 2026-05-10
derives_from: "canon/epistemic-modes.md, canon/constraints/mode-discipline-and-bottleneck-respect.md, canon/constraints/critic-cannot-be-resolver.md, canon/constraints/audit-gates-are-spawned-agent-sessions.md, canon/methods/spawned-agent-session-substrate-options.md, canon/voice/oddie-the-river-guide.md, canon/principles/vodka-architecture.md, canon/principles/verification-requires-fresh-context.md"
complements: "canon/methods/governance-validation-via-agents.md, canon/constraints/canon-integration-audit.md"
governs: "Any spawned agent session dispatched on the runtime substrate. Specifies the five orthogonal session-configuration dimensions, the runtime's enforcement obligations against existing canon, and the composition rules that determine session shape from the dimension values. Substrate selection (where the session runs) is handled by klappy://canon/methods/spawned-agent-session-substrate-options; this doc handles configuration (how the session is parameterized)."
status: draft
---

# Spawned Agent Session Runtime Contract — Five Orthogonal Dimensions That Mechanize Existing Canon

> A spawned agent session is fully characterized by five orthogonal dimensions: **persona** (voice and methodology), **mode** (epistemic state — exploration / planning / execution / validation), **role** (detection-only / resolver / general), **surface** (output context — real-time / audit / mentorship / sidebar-chat / etc.), and **engagement** (assistant / agent — turn-based dialogue or autonomous run-to-completion). The runtime's contribution is *mechanization*: the existing canon — epistemic modes, mode discipline, critic-cannot-be-resolver, voice and brand discipline, bottleneck respect — is enforced architecturally rather than left to prompt discipline. This doc specifies the dimensions, the runtime's enforcement obligations, and the composition rules that determine session shape from dimension values. The runtime adds no governance; it operationalizes existing governance for the agent surface.

---

## Summary — The Runtime Mechanizes Canon, It Does Not Add Canon

`klappy://canon/epistemic-modes` already establishes the four modes and explicitly licenses tools and processes to encode them: *"Tools, processes, and workflows may encode or enforce these modes, but they do not define them."* This method doc takes that license and specifies what encoding and enforcement look like for spawned agent sessions.

`klappy://canon/constraints/audit-gates-are-spawned-agent-sessions` (Tier-1) names the abstract requirement for governance validation. `klappy://canon/methods/spawned-agent-session-substrate-options` catalogues where such sessions can run. **This doc specifies how sessions are configured once a substrate is chosen.** It applies regardless of substrate; the dimensions are substrate-independent.

The runtime exposes a single primitive — invoke a session — parameterized by five orthogonal fields. Same primitive, many session shapes. Same persona, many sessions. Same canon, mechanically applied.

---

## The Five Orthogonal Dimensions

| Dimension | Values | What it determines |
|---|---|---|
| **Persona** | `oddie`, `audit-gate`, `docs-writer`, `general`, ... | Voice canon, system prompt URI, capability sources (operational + task-relevant MCP servers), inheritance |
| **Mode** | `exploration` \| `planning` \| `execution` \| `validation` | Tool allow-list, output schema, transition rules, primary-risk detector |
| **Role** | `detection-only` \| `resolver` \| `general` | Mutation rights, fresh-context requirements, session-to-session boundaries |
| **Surface** | `real-time-stream`, `audit`, `mentorship`, `sidebar-chat`, `code-output`, `synthesis-ledger`, ... | Density / pace / verbosity tolerance, post-processing rules, channel mapping |
| **Engagement** | `assistant` \| `agent` | Turn-control contract, bottleneck-respect enforcement, failure modes |

These are orthogonal — no dimension is derivable from another. The same persona crosses modes, roles, surfaces, and engagements freely. Most dimension values can co-occur; some combinations are rare but legitimate (*Planning + agent* — autonomous canonical planning) while others are forbidden (*Validation + resolver in same session* — collapses critic and resolver, refused).

The orthogonality is the test the abstraction passed. Earlier drafts considered collapsing role into mode, or deriving engagement from mode; both attempts produced coupling that broke real session shapes.

---

## Persona

A persona declares **who is speaking** in a session — voice, methodology, and capability sources. Personas are first-class canon objects, versioned, retrievable by URI.

### Persona profile shape

```yaml
persona: oddie
version: 1
system_prompt_uri: klappy://canon/voice/oddie-the-river-guide
role_default: detection-only
mcp_servers:
  operational:    # always-on for this persona, regardless of task
    - oddkit
  task_relevant:  # added per invocation based on task
    []
knowledge_bases:
  - klappy://
surface_profiles:
  real_time_stream:     { density: high,   max_tokens_per_emission: 60 }
  audit:                { density: medium, structured_output: required }
  mentorship:           { density: low,    narrative: true }
  strategic_translation:{ density: medium, bidirectional: true }
brand_discipline_uri: klappy://canon/voice/oddie-the-river-guide#brand-guide
inheritance:
  - klappy://canon/constraints/guide-posture
  - klappy://canon/constraints/ai-voice-cliches
retraction_conditions: klappy://canon/voice/oddie-the-river-guide#retraction-conditions
```

### Operational vs task-relevant MCP servers

A persona uses some MCP servers **on itself** for self-hygiene (e.g., Oddie uses `oddkit` for orient / search / challenge / gate to maintain his own epistemic discipline). Those are operational and always-on for that persona. Other MCP servers are task-relevant and added per invocation based on the task's needs (e.g., a GitHub MCP for an audit on a PR).

The runtime MUST NOT strip operational MCP servers as "unrelated to the task." Doing so breaks personas like Oddie that use the methodology on themselves, not just on content.

### Persona resolution

`runtime.invoke(persona="oddie", mode="validation", role="detection-only", surface="audit", engagement="agent", task="...")` triggers the runtime to:

1. Resolve `persona="oddie"` to the profile via canon URI lookup.
2. Compose the system prompt from the profile's `system_prompt_uri` plus mode-specific scaffolding plus surface-specific scaffolding.
3. Register operational MCP servers from the profile.
4. Filter the requested tool set against mode + role allow-lists.
5. Apply surface-profile output rules and brand-discipline post-processing per the profile.

New personas are added by writing a profile, not by writing infrastructure.

---

## Mode

The four canonical epistemic modes from `klappy://canon/epistemic-modes` map directly to runtime configurations. Each mode constrains tool allow-list, output schema, transition rules, and the primary risk the runtime watches for.

### Exploration

- **Truth condition** (canon): valid if it reveals something new.
- **Tool allow-list**: search, fetch, orient, challenge, web-search, oddkit query tools. Read-heavy.
- **Forbidden**: artifact-mutating tools (commit, PR creation, canon edits) — the session cannot accidentally cross into execution.
- **Output schema**: emissions tagged `question | possibility | tension | frame | synthesis-ledger-entry`. The runtime can require an output-kind field per emission.
- **Risk detector**: false closure. If the session emits more `decision` or `recommendation` outputs than `question` or `tension`, the runtime flags premature convergence.
- **Output destination**: synthesis ledgers (`klappy://docs/synthesis-ledger`) are the natural durable surface.

### Planning

- **Truth condition** (canon): valid if assumptions are visible and challengeable.
- **Tool allow-list**: search, fetch, orient, challenge, gate, encode (drafting), preflight. Reads plus draft-write to scratch only.
- **Forbidden**: mutations to real artifacts (canon, code, deployed config).
- **Output schema**: every plan emission MUST declare `assumptions: [...]`, `deferred: [...]`, `would_invalidate: [...]`. A plan emitted without these is rejected as incomplete per the canon's "assumptions visible and challengeable" truth condition.
- **Risk detector**: speculative certainty. Outputs phrased as facts where the underlying claim is unverified — the runtime can ask the agent to mark uncertainty explicitly.

### Execution

- **Truth condition** (canon): valid if it produces verifiable outcomes.
- **Tool allow-list**: full set, scoped at session start, **locked**. Cannot expand mid-session.
- **Forbidden**: tool calls outside the locked scope. Mode reversion to planning is allowed but requires explicit reversion declaration.
- **Output schema**: artifacts and evidence. Status emissions classified `assertion | reversion | tool_call_request | progress`. For `engagement=agent`, clarifying questions are refused per bottleneck-respect canon. For `engagement=assistant`, clarifying questions are valid turn-yielding emissions.
- **Risk detector**: metric laundering. The runtime can require artifact references in completion claims.
- **Anti-pattern detector**: per `klappy://canon/epistemic-modes` §Non-Collapse Rule, "execution must not pretend to validate." Mid-build pivot emissions get flagged: note the concern, carry forward, do not surface as inline pivot.

### Validation

- **Truth condition** (canon): valid if findings are grounded in the produced artifact, not in what the validator wished had been built.
- **Required**: fresh context. The runtime refuses same-session transitions from `execution` to `validation`. Validation requires a new session that receives the artifact-under-test as input but does not inherit the executor's reasoning. This realizes `klappy://canon/principles/verification-requires-fresh-context` as a structural feature.
- **Tool allow-list**: read-only on the artifact under test, plus search / fetch / audit / oddkit-validate.
- **Forbidden**: mutations to the artifact under test. Findings are reports, not patches.
- **Output schema**: each finding MUST carry a disposition — `fix | pivot | accept`. A finding without disposition is rejected as incomplete per the canon.
- **Risk detector**: scope creep. Findings that propose redesign rather than report defects are flagged. The validation session does not get to reopen planning; that requires explicit reversion.

### Mode-collapse anti-patterns become runtime detectors

`klappy://canon/epistemic-modes` §Non-Collapse Rule names six specific anti-patterns. Each maps to a runtime check:

1. *Exploration pretending to decide* → premature-closure detector in exploration mode.
2. *Planning pretending to execute* → mutation-attempt detector in planning mode (refused at submit time).
3. *Execution exploring alternatives retroactively* → scope-violation detector when tool calls fall outside the locked allow-list.
4. *Execution pretending to validate* → mid-build pivot detector — flag and instruct "note concern, carry forward."
5. *Validation pretending to plan* → redesign-instead-of-finding detector — flag and refuse.
6. *Validation pretending to execute* → mutation-attempt detector in validation mode (refused at submit time).

Most resolve to schema-level rules and tool allow-lists. Sophistication is not required.

---

## Role

Role declares the **corruption boundary** the session respects. Three values, derived from `klappy://canon/constraints/critic-cannot-be-resolver`.

### detection-only

The session detects and reports. It does not mutate the artifact-under-observation. The runtime enforces this structurally:

- **Tool filter**: filesystem writes, `git commit`, mutating API verbs (POST/PATCH/DELETE/PUT to write endpoints), `gh pr merge`, and any other state-modifying operations are refused at submit time. Refused before the session starts, not by prompt instruction.
- **Session-to-session boundary**: the same session cannot be re-invoked with a "now fix what you found" follow-up task. Resolution requires a fresh session that receives the finding as input but not the detector's reasoning. This is `critic-cannot-be-resolver` made architectural.

The audit gate is the worked detection-only consumer. Oddie is detection-only across all his surfaces by canon (`klappy://canon/voice/oddie-the-river-guide` §What Oddie Is Not).

### resolver

The session is permitted to mutate artifacts within the session's locked scope. Mutating tools are allowed. Resolver sessions cannot also serve as their own validators — validation of a resolver's output requires a separate session per the fresh-context rule.

### general

No special role enforcement. Used for sessions that are neither pure detection nor pure resolution — exploration, planning, mentorship, strategic translation, and other dialogue-heavy sessions where the role distinction is not load-bearing.

---

## Surface

Surface declares the **output context** — who consumes the emission and at what density / pace / verbosity tolerance. Surfaces are persona-relative; a persona profile lists the surfaces it supports and the configuration for each.

Common surface types and their characteristics:

- **`real-time-stream`** — high density, continuous machine-speed inflow, brevity paramount, single-sentence emissions or short bursts. Agent engagement only (no caller dialogue at this density).
- **`audit`** — medium density, batch delivery, structured output (findings + disposition), tolerates moderate detail.
- **`sidebar-chat`** — medium density, conversational pace, narrative tolerated, assistant engagement only (the surface IS the dialogue).
- **`mentorship`** — low density, conversational, narrative is the point, assistant engagement preferred.
- **`strategic-translation`** — variable density, bidirectional, voice adapts most across surfaces but character stays constant.
- **`code-output`** — structured artifact, tagged machine for post-processing, agent engagement preferred.
- **`synthesis-ledger`** — tagged human, allows possibilities and tensions, exploration mode's natural durable surface.

### Surface drives output post-processing

Voice canon brand-discipline rules are mechanically enforceable. The runtime:

- Tags every output field as `machine` or `human` per the surface profile.
- Strips persona emoji from machine fields before delivery — the absolute ban from `klappy://canon/voice/oddie-the-river-guide` §Brand Guide on persona emoji in JSON, YAML, code, commit messages, status titles, URIs, file paths.
- Honors a session-level mode toggle: `persona | neutral | strict`. Neutral and strict modes suppress persona emoji across all fields regardless of `human` tagging. Functional status emoji (`✅ ⚠️ 🔴 ⏳ 🟡`) survive across all toggles per canon — they are information not character.
- Applies density caps from the surface profile. A `real-time-stream` emission exceeding `max_tokens_per_emission` fails validation; the agent retries shorter. Brevity-under-pressure becomes structural rather than aspirational.

This is the runtime doing for voice what TLS does for transport: a mechanical layer that prevents the contract from being accidentally violated by the agent inside.

---

## Engagement

Engagement declares **whether the caller is in the loop**. Two values; the dimension absorbs the question of whether clarifying questions are valid output.

### `assistant` — turn-based dialogue

- Caller has explicitly opted into being part of the loop.
- Clarifying questions are valid output.
- The session can yield turn-control back to the caller and resume on the next message.
- Multi-turn state preserved across turns; context accumulates.
- Output includes turn-control markers: `holding | yielding | done`.
- Failure surfaces for caller redirection rather than terminating.
- Bottleneck-respect (`klappy://canon/constraints/mode-discipline-and-bottleneck-respect`) still applies — the bottleneck just consented to the dialogue.

### `agent` — autonomous run-to-completion

- Caller has handed off, not paired up.
- Clarifying questions are forbidden per bottleneck-respect canon. Either make the call or fail loudly with a named reason.
- Session locks scope at start, runs to completion or terminal failure.
- Output is the final artifact. No turn handoffs.
- Tool calls autonomous within scope.
- Failure terminates the session with a named error; the caller receives the failure but cannot redirect mid-task.

### Why engagement is its own dimension

Earlier drafts attempted to derive question-validity from mode alone. Three problems emerged:

1. *Planning + agent is legitimate* (canonical repeatable planning tasks). If "planning ⇒ questions allowed" were a rule, autonomous planning would be impossible.
2. *Execution + assistant is legitimate* (supervised execution where operator preference matters at named decision points). If "execution ⇒ no questions" were a rule, supervised execution sessions would either lie or fail.
3. *Same persona at same surface in same mode and role* can deploy at either engagement (Oddie at TinCan stream-annotation is `agent`; Oddie at TinCan sidebar-chat is `assistant`). The two sessions share four of five dimensions.

Engagement absorbs caller-in-loop semantics cleanly. The runtime's bottleneck-respect enforcement becomes engagement-aware rather than mode-tangled.

---

## Composition Rules

Five orthogonal dimensions yield (in principle) the cross-product of all values. In practice, some combinations are forbidden, some are rare-but-legitimate, and most are well-trodden. The runtime enforces the forbidden ones architecturally.

### Forbidden combinations

- **`role=detection-only` + execution-mode mutating tools requested** — detection-only filters mutators out of the allow-list before the session starts. Refused at submit time.
- **Same-session execution-to-validation transition** — refused; fresh context required per `klappy://canon/principles/verification-requires-fresh-context`.
- **`engagement=agent` + execution + clarifying-question emissions** — the runtime wraps clarifying questions as named failures rather than valid output.
- **`engagement=assistant` + `surface=real-time-stream`** — real-time stream density does not admit caller dialogue. The runtime rejects the combination at session-start.

### Rare-but-legitimate combinations

- **`mode=planning` + `engagement=agent`** — autonomous canonical planning. The agent must produce a plan with all assumptions, deferrals, and invalidation conditions named without asking. Possible for repeatable, well-specified planning tasks.
- **`mode=execution` + `engagement=assistant`** — supervised execution. Operator can interrupt; agent can yield at named decision points. Useful when the task admits multiple valid paths and operator preference matters.
- **`mode=exploration` + `engagement=agent`** — autonomous research scout. Returns a synthesis ledger; operator reviews. The scout cannot converge prematurely (false-closure detector active).

### Well-trodden combinations (and their typical consumers)

| Persona | Mode | Role | Surface | Engagement | Consumer |
|---|---|---|---|---|---|
| `audit-gate` | validation | detection-only | audit | agent | PR-blocking automation, canon-coherence cron |
| `oddie` | validation | detection-only | real-time-stream | agent | TinCan stream annotation |
| `oddie` | validation | detection-only | sidebar-chat | assistant | TinCan portal Q&A |
| `oddie` | validation | detection-only | audit | agent | PR auditor, scheduled reviews |
| `oddie` | validation | detection-only | mentorship | assistant | Guided review sessions |
| `docs-writer` | execution | resolver | code-output | agent | Autonomous doc generator |
| `docs-writer` | execution | resolver | code-output | assistant | Co-authoring with operator |
| `planning-helper` | planning | general | conversational | assistant | Plan-shaping with operator |
| `research-scout` | exploration | general | synthesis-ledger | agent | Autonomous discovery |
| `release-validator` | validation | detection-only | audit | agent | Per `klappy://canon/constraints/release-validation-gate` |

---

## Enforcement Points — What the Runtime Mechanically Guarantees

The runtime's contract to canon:

1. **Mode discipline** (`klappy://canon/epistemic-modes`): tool allow-lists scoped per mode; mode-collapse anti-patterns detected per Non-Collapse Rule; transitions require explicit reversion.
2. **Bottleneck respect** (`klappy://canon/constraints/mode-discipline-and-bottleneck-respect`): clarifying questions refused for `engagement=agent` sessions; reversion declarations validated as single-named-cause.
3. **Critic-cannot-be-resolver** (`klappy://canon/constraints/critic-cannot-be-resolver`): detection-only role filters mutating tools; same-session execution-to-validation transitions refused; fresh-context required for validation.
4. **Verification requires fresh context** (`klappy://canon/principles/verification-requires-fresh-context`): inherited by validation mode's fresh-context requirement.
5. **Voice canon brand discipline** (`klappy://canon/voice/oddie-the-river-guide` §Brand Guide and inheritances thereof): persona emoji stripped from machine-tagged fields; mode toggle controls suppression scope; functional status emoji preserved across modes.
6. **Persona profile resolution**: operational MCP servers always-on; task-relevant MCP servers added per invocation; system prompt composed from URI plus mode/surface scaffolding.
7. **Substrate independence**: runtime contract is substrate-agnostic per `klappy://canon/methods/spawned-agent-session-substrate-options`. The same contract applies on Anthropic Managed Agents, on Cloudflare Sandboxes with any harness, on future entrants.

The runtime adds nothing to canon. It applies canon mechanically.

---

## What This Method Does NOT Promise

- **Not a guarantee that agents follow canon perfectly.** Mechanical enforcement catches violations the runtime can detect at the schema and tool-call level. Voice violations inside human-tagged narrative output, subtle false-closure patterns, and other content-level drift may pass the runtime checks. Oddie's voice canon's 30-day production burn-in retraction window applies; mechanical checks reduce but do not eliminate the need for human review.
- **Not a replacement for canon.** Canon defines the rules; the runtime enforces a subset of them. Where the runtime cannot mechanically check (content-level voice, subtle reasoning quality), canon governance still applies via review surfaces.
- **Not a single substrate.** Substrate selection (Managed Agents / CF Sandboxes / future) is per `klappy://canon/methods/spawned-agent-session-substrate-options`. The contract holds across substrates; the implementation differs.
- **Not a coordination layer.** The runtime spawns sessions; it does not orchestrate workflows across sessions. Multi-session coordination (handoff between detector and resolver, sequencing of audit + iteration) is the caller's responsibility. Per AMS's `permanent-non-goals`, neither AMS nor the runtime owns orchestration.
- **Not a license to ignore mode declarations in conversation.** Humans operating in this project still declare modes out loud per `klappy://canon/constraints/mode-discipline-and-bottleneck-respect`. The runtime mechanizes mode discipline for agents; humans retain the obligation to declare modes for themselves.

---

## Open Questions

These remain explicitly unresolved at draft time and will be revisited as production evidence accrues.

1. **Subscribed (long-lived) session shape.** The `session_type: "subscribed"` shape needed for Oddie's TinCan flagship surface (real-time stream interpretation) is sketched but not specified in detail. Backpressure handling, multi-output channel post-processing, and event-source connection semantics need their own treatment. Open.
2. **Output classification fidelity.** The proposed schema fields (e.g., `assertion | reversion | tool_call_request`) require a classifier that is reliable across personas. Heuristic-only classification may produce false positives that frustrate agents. Worth measuring before locking the schema.
3. **Persona profile evolution.** Versioned personas (`persona@v1`, `persona@v2`) will need migration semantics when a persona's profile changes incompatibly. Out of scope for this draft.
4. **Cross-session memory.** Personas may accumulate observations across sessions (e.g., Oddie noticing a recurring eddy across days). Whether and how the runtime supports persona-level memory between sessions is open. Default position: stateless per session unless explicitly opted in.
5. **Whether engagement deserves its own principle doc.** The dimension is well-defined here but doesn't yet have a standalone principle doc. If usage validates the orthogonality claim across many session shapes, a future principle doc on engagement-as-runtime-dimension may be warranted. Premature canon coinage is its own anti-pattern; the doc here defines engagement well enough for the runtime to operate on it. Let the dimension earn its standalone doc through use rather than coining a URI before there is content to put behind it.

---

## Confidence

**Draft.** Zero production validations of the runtime as a whole. Individual dimensions have independent grounding:

- Mode discipline is established canon (`klappy://canon/epistemic-modes`, semi-stable).
- Critic-cannot-be-resolver is established canon (semi-stable).
- Voice canon and brand discipline are working belief with 30-day production burn-in (`klappy://canon/voice/oddie-the-river-guide`).
- Substrate options are evolving (`klappy://canon/methods/spawned-agent-session-substrate-options`, draft).
- Engagement as orthogonal dimension is novel synthesis from this draft session; unvalidated.

The composition (five-dimension orthogonality, runtime-as-mechanizer) is a working belief grounded in (a) explicit canon license to encode modes in tools, (b) the worked example of Oddie whose existing canon already implies the persona-profile shape, and (c) the immediate consumer (audit gate) which exercises four of five dimensions on its first deployment.

**Retraction conditions.** This contract retracts if:

- The runtime ships and the dimensions prove non-orthogonal in practice — e.g., real session shapes routinely require fields outside this set, or fields within this set turn out to be derivable from each other after all.
- Mechanical enforcement of canon proves to degrade signal rather than improve it — e.g., agents systematically work around the schema constraints in ways that produce lower-quality outputs than unrestricted prompts.
- The persona profile shape proves insufficient to capture personas like Oddie at production density, requiring frequent ad-hoc extensions that fragment the abstraction.

A weaker retraction path: if the dimensions hold but specific enforcement points (e.g., output-kind classification, brand-discipline post-processing) prove ineffective, those individual mechanizations retract while the overall contract survives.

---

## See Also

- [Epistemic Modes](klappy://canon/epistemic-modes) — the four canonical modes this contract operationalizes
- [Mode Discipline and Bottleneck Respect](klappy://canon/constraints/mode-discipline-and-bottleneck-respect) — the discipline this contract makes mechanical
- [Critic Cannot Be Resolver](klappy://canon/constraints/critic-cannot-be-resolver) — the role-boundary constraint the runtime enforces structurally
- [Verification Requires Fresh Context](klappy://canon/principles/verification-requires-fresh-context) — the principle that motivates fresh-context enforcement on validation transitions
- [Audit Gates Are Spawned Agent Sessions](klappy://canon/constraints/audit-gates-are-spawned-agent-sessions) — the Tier-1 constraint the runtime serves
- [Spawned Agent Session Substrate Options](klappy://canon/methods/spawned-agent-session-substrate-options) — sibling method covering substrate selection
- [Oddie the River Guide](klappy://canon/voice/oddie-the-river-guide) — worked persona whose existing canon implies the persona-profile shape
- [Vodka Architecture](klappy://canon/principles/vodka-architecture) — the principle that this contract embodies (substrate stays opinion-free; opinions live in the dimensions above it)
- [Governance Validation via Agents](klappy://canon/methods/governance-validation-via-agents) — sibling method on what gets checked; this doc covers how the checking session is configured
