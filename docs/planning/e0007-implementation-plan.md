# E0007 Implementation Plan — From Passive to Proactive

## The Big Picture

E0007 shifts oddkit's tool posture from passive (wait for invocation) to proactive (act as cognitive rhythm). This is not a feature addition — it's a posture shift that touches every tool, every governance article, and every tool description. The plan follows the established epoch pattern: canon defines truth first, tooling enforces second.

**Ordering principle:** Governance articles → A/B test with branch canon → oddkit code changes → merge to main → public essay.

---

## Phase 0 — Branch Setup

**Create feature branch: `e0007-proactive-posture`**

All E0007 articles land on this branch first. This enables A/B testing via oddkit's existing `canon_url` parameter:
- **Control (A):** oddkit loads from `main` (passive posture, current behavior)
- **Treatment (B):** oddkit loads from `e0007-proactive-posture` branch (proactive posture articles present)

The `canon_url` parameter already supports this: `https://raw.githubusercontent.com/klappy/klappy.dev/e0007-proactive-posture`

Every oddkit tool accepts `canon_url` as an optional override. No new infrastructure needed.

**Steps:**
1. Clone klappy.dev repo to `/tmp/klappy.dev`
2. Create branch `e0007-proactive-posture` from `main`
3. All subsequent file creation happens on this branch
4. Push branch — oddkit can immediately read from it via `canon_url`

---

## Phase 1 — Epoch Declaration Files

These establish E0007 in the codebase following the pattern of E0005 and E0006.

### File 1: `docs/appendices/epoch-7.md`
**Title:** "Epoch 7 — From Passive to Proactive"
**Purpose:** Full epoch declaration following the pattern of epoch-5.md and epoch-6.md. Includes: what changed, forcing fault, invariant, why this is a new epoch, compatibility notes.
**Forcing fault:** "A system that requires its user to remember its features has delegated its cognition to the wrong party."
**Invariant:** "The system acts, the operator reviews."

### File 2: Update `docs/appendices/epochs.md`
**Purpose:** Add E0007 section to the epoch registry (same as E0003–E0006 entries). Update the blockquote/description to include E0007 in the list.

### File 3: `docs/oddkit/encode-persistence-gap.md`
**Title:** "Encode Does Not Persist, Nobody Knows OLDC+H, and the Fix Is Continuous Encoding"
**Purpose:** The cornerstone article. Already drafted this session. Push as-is after operator review.

---

## Phase 2 — Spin-Off Governance Articles

Small, pointed files for BM25 relevance. Each ensures the proactive posture surfaces in searches for its specific tool or topic.

### Proactive Tool Usage (one per tool — 6 files)

**File 4:** `docs/oddkit/proactive/proactive-orient.md`
**Title:** "Proactive Orient — Reorient at Every Context Shift"
**Purpose:** Orient is not a session-start ritual. Call orient whenever context shifts, a new subtask emerges, or the agent senses it may be in the wrong mode. Replaces passive pattern (orient once at start).

**File 5:** `docs/oddkit/proactive/proactive-search.md`
**Title:** "Proactive Search — Search Before Claiming, Not After Failing"
**Purpose:** Search canon before making claims canon might have guidance on. Before answering policy questions, before proposing conventions, before writing documents. Replaces passive pattern (search only when asked).

**File 6:** `docs/oddkit/proactive/proactive-challenge.md`
**Title:** "Proactive Challenge — Challenge Before Encoding, Not When Asked"
**Purpose:** Challenge proactively when claims create constraints, close options, or would be expensive to reverse. Not every claim — but every consequential one. Replaces passive pattern (challenge only on request).

**File 7:** `docs/oddkit/proactive/proactive-gate.md`
**Title:** "Proactive Gate — Gate at Every Mode Transition, Not Just Formal Ones"
**Purpose:** Gate whenever the agent senses a verb change — from exploring to building, from planning to executing. Most transitions are implicit. Replaces passive pattern (gate only at explicit phase transitions).

**File 8:** `docs/oddkit/proactive/proactive-validate.md`
**Title:** "Proactive Validate — Validate Before Claiming Done"
**Purpose:** Validate proactively when the agent believes a task is complete. Before presenting deliverables, before claiming completion. Replaces passive pattern (validate only when asked).

**File 9:** `docs/oddkit/proactive/proactive-preflight.md`
**Title:** "Proactive Preflight — Preflight Before Every Execution Task"
**Purpose:** Preflight before any execution that produces an artifact. What constraints apply? What's the definition of done? Replaces passive pattern (preflight only for major deliverables).

### Core E0007 Concepts (5–6 files)

**File 10:** `docs/oddkit/proactive/continuous-encoding.md`
**Title:** "Continuous OLDC+H Encoding — Track at Every Turn, Not Just Session End"
**Purpose:** The core rhythm article. Track OLDC+H at every exchange. Encode when substantive. Persist at breakpoints. Three cadences. Distinct from the encode tool spec — this is the behavioral pattern, not the tool definition.

**File 11:** `docs/oddkit/proactive/proactive-identity-of-integrity.md`
**Title:** "Proactive Identity of Integrity — Surface the Creed to Prevent Drift"
**Purpose:** Resurfacing the creed and axioms regularly throughout sessions observably corrects hallucinations. Not a one-time orientation — a continuous self-correction mechanism. The agent resurfaces its own creed when it detects its confidence outrunning its evidence.

**File 12:** `docs/oddkit/proactive/encode-does-not-persist.md`
**Title:** "Encode Does Not Persist — The Caller Must Save"
**Purpose:** Standalone article about the persistence gap. Ensures any search about encode behavior surfaces this critical fact. Small, pointed, high-relevance.

**File 13:** `docs/oddkit/proactive/oldc-h-vocabulary.md`
**Title:** "OLDC+H — The Five Standard Artifact Types for Session Capture"
**Purpose:** Standalone reference for OLDC+H: Observations, Learnings, Decisions, Constraints, Handoffs. Definitions, examples, usage patterns. Ensures "OLDC+H" searches surface this vocabulary.

**File 14:** `odd/ledger/project-journal-best-practices.md`
**Title:** "Project Journal Best Practices — Sizing, Timestamps, and Tradeoffs"
**Purpose:** Common failure modes (file size growth, append latency), proven solutions (one per PRD, time-bounded), and the major tradeoff warning: don't separate by type — it erases narrative. Timestamps help but bloat is real.

**File 15:** `docs/oddkit/proactive/handoff-to-new-conversation.md`
**Title:** "Proactive Handoff — Detect Saturation, Bootstrap the Next Conversation"
**Purpose:** Handoff is not "save and continue elsewhere." It is a proactive optimization that detects natural handoff points (task completion, CST approaching, context window filling) and initiates transition BEFORE quality degrades. The agent monitors for cognitive saturation (`canon/definitions/cognitive-saturation-threshold.md`) and proposes handoff when diminishing returns are detected. Bootstrapping the next conversation means curating what transfers: project journal, relevant decisions, active constraints — NOT the entire conversation history. The operator reviews what gets carried forward. This addresses a universal failure mode in ALL AI/LLM tools: conversations get long, quality degrades silently, and neither user nor agent acts on it.

### Terminology (1 file)

**File 16:** `docs/oddkit/proactive/terminology-project-journal.md`
**Title:** "Terminology — Project Journal Over Epistemic Ledger"
**Purpose:** "Project journal" is user-facing. "Epistemic ledger" is canon-precise. Both valid. Use project journal in tool descriptions and user-facing docs.

---

## Phase 3 — oddkit Code Changes (AFTER Phase 2 articles are written)

Canon defines truth first. Tooling enforces second. These changes happen after the governance articles exist in the branch.

### Change A: Encode Tool MCP Description
**Current:** "Structure a decision, insight, or boundary as a durable record."
**New:** "Structure a decision, insight, or boundary as a durable record. IMPORTANT: This tool returns the structured artifact in the response — it does NOT persist or save it. The caller must save the output to the project's storage. Standard artifact types: Observations (O), Learnings (L), Decisions (D), Constraints (C), Handoffs (H) — OLDC+H. Track OLDC+H at every exchange — encode what the user shared, encode what you did. Persist to project storage at natural breakpoints. See odd/ledger/epistemic-ledger.md."

### Change B: Orient Response Format
Add to orient's response: "Track OLDC+H continuously throughout this session. Encode what the user shares and what you do at every exchange. Resurface the creed when confidence outpaces evidence. Persist to project storage at natural breakpoints."

### Change C: Encode Response Format
Add `persist_required: true` and `next_action: "Save this artifact to the project's storage (project journal, file, database). Encode does NOT persist."` to encode responses.

### Change D: All Tool Descriptions — Proactive Usage Hints
Each tool's MCP description gets a one-line proactive usage hint. Examples:
- Orient: "Call proactively whenever context shifts, not just at session start."
- Search: "Search before claiming — not just when asked."
- Challenge: "Challenge proactively before encoding consequential decisions."
- Gate: "Gate at every implicit mode transition, not just formal ones."
- Validate: "Validate proactively before claiming any task complete."
- Preflight: "Preflight before any execution that produces an artifact."

---

## Phase 4 — A/B Testing Strategy

### Mechanism: `canon_url` Branch Override

oddkit already supports this. Every tool call accepts `canon_url`. The default baseline is `https://raw.githubusercontent.com/klappy/klappy.dev/main`.

**Test setup:**
- **Control (A):** Call oddkit tools without `canon_url` override → loads from `main` (passive posture)
- **Treatment (B):** Call oddkit tools with `canon_url: "https://raw.githubusercontent.com/klappy/klappy.dev/e0007-proactive-posture"` → loads from E0007 branch (proactive articles present)

### What to Measure

1. **Proactive tool usage:** Does the agent call orient/search/challenge/validate proactively, or only when prompted?
2. **OLDC+H awareness:** When asked to "encode OLDC+H" or "journal this," does the agent know what to do without explanation?
3. **Persistence awareness:** After calling encode, does the agent attempt to save the output?
4. **Identity of Integrity resurfacing:** Does the agent resurface the creed during long sessions?
5. **Drift prevention:** Does the agent make fewer ungrounded claims when proactive articles are present?

### Simulated Test Design

Use the Anthropic API (Claude in Claude) to run simulated conversations:

1. **Define test scenarios** — 5–10 scenarios representing common operator interactions: "write a governance article," "encode OLDC+H," "help me decide between two approaches," "fix this bug then capture what you did," etc.
2. **Run each scenario twice** — once with control canon (main), once with treatment canon (E0007 branch) via `canon_url` override.
3. **Score each run** against the measurement criteria above. Binary scoring: did the agent do the proactive behavior (1) or not (0)?
4. **Sample size:** Run each scenario 5–10 times per condition to account for variance. Total: 50–200 API calls.
5. **Compare:** Treatment should show higher proactive behavior scores across all criteria.

### Pre/Post Testing (Phase 3 changes)

After oddkit code changes (tool descriptions updated), run the same test scenarios again WITHOUT `canon_url` override — the code changes should produce the proactive behavior even on `main` canon. This validates that the tool description changes work independently of the governance articles.

### Iteration Loop

1. Run tests → identify where proactive behavior is still absent
2. Diagnose: is the article not surfacing (BM25 relevance issue)? Is the tool description insufficient? Is the behavior instruction unclear?
3. Fix: adjust article titles/tags/content, tool description wording, or add additional spin-off articles
4. Re-test → confirm improvement
5. Repeat until all criteria pass consistently

---

## Phase 5 — Merge and Public Essay

### Merge Strategy
After A/B testing confirms improvement:
1. Create PR from `e0007-proactive-posture` → `main`
2. Squash merge (established pattern)
3. Deploy oddkit code changes
4. Verify: fresh oddkit calls (no `canon_url` override) produce proactive behavior

### Public Essay
**File:** `writings/from-passive-to-proactive.md`
**Title:** "From Passive to Proactive — When Your Tools Work But Nobody Uses Them"
**Purpose:** Companion to "Learning in the Open." Tells the story: intentional passive design → success → frustration signal → graduation. Same vulnerability and transparency. Candidate for Nothing New, Even AI.

Written AFTER merge so the essay can reference the live system and real results.

---

## Phase Ordering Summary

```
Phase 0: Branch setup
  └→ Create e0007-proactive-posture branch

Phase 1: Epoch declaration (3 files)
  └→ epoch-7.md, epochs.md update, cornerstone article

Phase 2: Spin-off articles (13 files)
  └→ 6 proactive tool articles
  └→ 5 core concept articles
  └→ 1 terminology article
  └→ 1 project journal best practices

Phase 3: oddkit code changes (4 changes)
  └→ Encode description, orient response, encode response, all tool hints

Phase 4: A/B testing
  └→ canon_url branch override for control/treatment
  └→ Simulated scenarios via API
  └→ Iteration loop until criteria pass

Phase 5: Merge and public essay
  └→ Squash merge to main
  └→ Deploy oddkit changes
  └→ Write and publish public essay
```

Total new files: ~16 governance articles + 1 public essay
Total oddkit code changes: 4 (descriptions + response formats)
Total test scenarios: 5–10 × 5–10 runs × 2 conditions = 50–200 API calls
