# Klappy.dev — Odd Teaser PRD (v1.2)

---

## Header

- **PRD Version:** v1.2
- **Lane:** odd-teaser
- **Status:** Active
- **Epoch:** E0004 (Epistemic Separation Era)
- **Graduated from:** klappy://docs/guiding-artifacts/epoch-4/klappy-dev-poc-prd
- **Supersedes:** website, ai-navigation

---

## PRD Change Log

### v1.2 — Reference Implementation with Real LLM

This revision requires **real Claude API integration**.

Changes:
- Pattern matching / regex is explicitly forbidden
- Cloudflare Worker required for API proxy
- Rate limiting required (100 requests/hour per IP)
- Streaming responses required

This is a **reference implementation** — it must demonstrate how ODD actually works.

### v1.1 — Entry-State Posture Correction

This revision restores a thinking-first entry posture.

Changes:
- Conversational thinking precedes artifact commitment
- Artifact creation is emergent and consent-based
- Entry-state pressure has been explicitly removed

---

## Product Definition

Klappy.dev is a **single-session epistemic experience**.

Its sole purpose is to help a visitor externalize at least one epistemic artifact and leave with something concrete.

**Klappy.dev must always be easier to leave than to continue.**

---

## Reference Implementation Requirement (v1.2)

Klappy.dev is the **reference implementation of Observation-Driven Development**.

A visitor arrives, engages in genuine epistemic externalization powered by **real LLM orchestration**, and leaves with artifacts they can use.

### Forbidden

- Regex pattern matching for artifact detection
- Keyword-based detection
- Simulated LLM responses
- Hollow companion responses ("Go on.", "Mmm.")

### Required

- Real Claude API integration
- LLM understands context, not just keywords
- Meaningful companion responses
- Artifact suggestions with reasoning

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     klappy.dev/odd-teaser                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌─────────────────────────────────┐   │
│  │   Frontend   │───▶│      Cloudflare Worker          │   │
│  │  (Thinking   │    │      (API proxy)                │   │
│  │   Space UI)  │◀───│                                 │   │
│  └──────────────┘    └─────────────────────────────────┘   │
│                                │                            │
│                                ▼                            │
│                      ┌─────────────────┐                   │
│                      │  Claude API     │                   │
│                      └─────────────────┘                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

- **Frontend**: Thinking-first UI at `products/odd-teaser/src/`
- **Cloudflare Worker**: Proxies Claude API, handles rate limiting
- **No persistence**: Stateless, no auth, no localStorage

---

## Entry-State Behavioral Contract

On first load, odd-teaser MUST behave as a thinking space, not an artifact editor.

The initial experience MUST communicate:
- nothing is committed yet
- messy thinking is allowed
- structure will not be forced

The primary affordance is conversational input.
Artifact systems MUST remain dormant until explicitly consented.

If a user hesitates due to fear of "doing it wrong," the entry state has failed.

---

## Target User State (Success Definition)

A first-time visitor leaves after one session having:

1. Externalized at least one epistemic artifact
2. Noticed a missing habit in their own workflow (unprompted)
3. Taken something with them (export or mental transplant)

The product succeeds even if the user never returns.

---

## Non-Goals (Hard Exclusions)

The product must NOT:

- Authenticate users
- Persist identity
- Teach ODD explicitly
- Execute tasks
- Provide project management
- Optimize retention or engagement
- Become a documentation site
- Navigate users to canon/docs
- Answer questions about ODD
- Use regex/pattern matching for artifact detection

If a feature increases time-on-site without increasing artifact creation, it is invalid.

---

## Core Experience

- Single-page web app
- Primary surface: conversational input (thinking-first)
- Secondary surface: artifact drawer (dormant until consented commitment)
- No navigation tree
- No menus beyond artifact visibility

Supported artifact types:
- Learnings
- Decisions
- Overrides

Export is the **exit ramp** (one-click, Markdown, local-only).

---

## Interface Contracts

- manifest >=2.0.0 <3.0.0
- build-output >=3.0.0 <4.0.0
- attempt-cli >=2.0.0 <3.0.0

---

## Visual Interfaces

- color-system >=1.0.0 <2.0.0
- typography >=1.0.0 <2.0.0
- spacing >=1.0.0 <2.0.0

---

## LLM Behavior Enforcement

LLM behavior for odd-teaser is defined in:

`products/odd-teaser/behavior.md`

Violation of this behavior constitutes a product defect.

---

## Success Criteria

- User can create each artifact type
- Artifacts are immediately visible upon creation
- Artifacts can be exported in one click
- The system can stop interacting without error
- Telemetry events fire correctly
- No features that increase time-on-site without increasing artifact creation
- **Real LLM responses (not regex/keywords)**

---

## Definition of Done (v1.2)

### Must Have
- [ ] Real Claude API integration (not regex)
- [ ] Streaming responses to frontend
- [ ] Cloudflare Worker deployment
- [ ] Rate limiting (100 requests/hour per IP)
- [ ] Export works without any backend dependency
- [ ] Build output produced
- [ ] Visual proof captured (screenshots committed)
- [ ] Artifact creation verified (all 3 types)

### Must NOT Have
- [ ] User accounts or authentication
- [ ] Persistent storage of conversations
- [ ] Engagement optimization features
- [ ] Navigation beyond single-page experience
- [ ] Regex pattern matching

---

## Telemetry (ODD-Safe)

**Allowed events:**
- ArtifactCreated { type }
- ArtifactExported { count, types }
- IncisionTriggered { reason }
- PrematureExit { artifact_count }

**Forbidden:**
- Raw text
- Prompts
- Responses
- Identity
- IP
- Fingerprinting

Telemetry measures epistemic motion, not users.

---

## Lifecycle

This product is the **closure artifact of Epoch 4**, not a growth product.

### Graduation / Kill Criteria

- If artifact creation rate drops to zero across 30 days → evaluate for retirement
- If feature requests accumulate that violate non-goals → scope freeze or retire

---

## Final Constraint

If someone asks: *"Should the product also…?"*

The default answer is **no**.

If the change is not clearly justified by artifact creation, it is rejected.

---

## Graduation

This PRD embodies the philosophy defined in:
- klappy://docs/guiding-artifacts/epoch-4/klappy-dev-poc-prd

That artifact remains canonical as the philosophical source.
This PRD accepts the operational gravity of maintaining the product.
