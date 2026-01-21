# INSTRUCTIONS.md Diff: v1.2.4 → v1.3

This document summarizes the changes between v1.2.4 and v1.3 INSTRUCTIONS.md.

## Summary

v1.3 transforms the pack from teaching ODD to actively eliciting PRDs through structured questioning.

## New Sections Added

### 1. Agent Role Declaration (NEW)

```markdown
## Agent Role

You are not a PRD author.
You are a PRD elicitation system that helps humans externalize intent, constraints, uncertainty, and evidence requirements.

**You extract. You do not invent.**
```

**Purpose**: Explicitly frame the agent's role as an extractor, not an author.

### 2. PRD Stage Typing (NEW)

Added classification table with 6 PRD types:

| Stage Type | Evidence Expectations | Ambiguity Tolerance |
|------------|----------------------|---------------------|
| PoC / Exploration | Minimal | High |
| Feature | Required | Medium |
| Fix | Root cause required | Low |
| Product slice | End-to-end | Medium |
| Refactor / migration | No user-facing change | Low |
| Other | Determined through conversation | Varies |

**Purpose**: Set expectations before questioning begins.

### 3. Asset Intake Contract (NEW)

Added guidance for inventorying existing assets:

| Asset Type | Examples | When Missing |
|------------|----------|--------------|
| Text | docs, notes, prior PRDs | Proceed with flag |
| Media | screenshots, mockups | Require for UI work |
| Links | repos, tickets | Note as greenfield |
| Oral testimony | interview answers | Session itself |

**Purpose**: Know what exists before defining what's needed.

### 4. Phase 0: Stage Identification (NEW)

```markdown
**Start with**:
"Before we define what you're building, I need to understand what kind of work this is.
Is this exploring something new, building something known, or fixing something broken?"
```

**Purpose**: Gate the entire interview with type classification.

### 5. Phase 1: Orient (NEW)

```markdown
**Start with**:
"What are we trying to learn or change? Give me the 30-second version — we'll refine it."
```

**Purpose**: Quick orientation before deep questioning.

### 6. Phase 2: Inventory (NEW)

```markdown
**Start with**:
"Before we define exactly what you want, let's inventory what already exists.
You can't define what you want until you know what you have."
```

**Purpose**: Catalog assets before scope definition.

### 7. Phase 6: Ambiguity Capture (NEW)

```markdown
**Start with**:
"What's still unclear? Every PRD has uncertainty — let's name it explicitly
rather than pretending it doesn't exist."
```

**Purpose**: ODD principle — uncertainty acknowledged early is cheaper than uncertainty discovered late.

## Resequenced Phases

| v1.2.4 | v1.3 | Change |
|--------|------|--------|
| Stage 1: Outcome Discovery | Phase 4: Outcome Framing | Moved after inventory |
| Stage 2: Success Criteria | Phase 5: Evidence Definition | Moved after outcome |
| Stage 3: Non-Goals and Scope | Phase 7: Draft Assembly | Consolidated |
| Stage 4: Constraints | Phase 3: Constraint Surfacing | Moved earlier |
| Stage 5: Definition of Done | Phase 7: Draft Assembly | Consolidated |
| Stage 6: Risks and Tradeoffs | Phase 7: Draft Assembly | Consolidated |
| Stage 7: Draft Assembly | Phase 7: Draft Assembly | Same |
| — | Phase 0: Stage Identification | NEW |
| — | Phase 1: Orient | NEW |
| — | Phase 2: Inventory | NEW |
| — | Phase 6: Ambiguity Capture | NEW |

## Key Flow Change

**v1.2.4 flow**:
1. "What outcome are you trying to achieve?" (jumps straight to outcome)

**v1.3 flow**:
1. "What kind of work is this?" (classify first)
2. "Give me the 30-second version" (orient)
3. "What already exists?" (inventory)
4. "What constraints apply?" (constraints)
5. "What outcome are you trying to achieve?" (then outcome)
6. "What conditions prove success?" (evidence)
7. "What's still unclear?" (ambiguity)
8. "Let me assemble the PRD" (draft)

## Updated Example Dialogue

New dialogue demonstrates the full elicitation flow:
- Agent asks about PRD type before anything else
- Agent inventories existing assets
- Agent surfaces constraints before outcomes
- Agent captures ambiguity explicitly
- Agent assembles PRD from conversation

## Updated Success Criteria

v1.2.4 had 6 success indicators. v1.3 has 9:

1. PRD type identified (NEW)
2. Assets inventoried (NEW)
3. Constraints surfaced (moved)
4. Clear outcome
5. Testable criteria
6. Ambiguities captured (NEW)
7. Honest scope
8. Evidence requirements
9. Acknowledged risks

## Hash Comparison

| Version | INSTRUCTIONS.md Hash |
|---------|---------------------|
| v1.2.4 | 0fc8d637a4021c7c579ed0f936dedffa8e2b96787d4d762b38c3e79b137a8dfa |
| v1.3 | e4d17740961edb424ab8ea4eaa9a6892e8401b358a954d111d7c78f66f02f431 |

Hashes differ — confirms INSTRUCTIONS.md is demonstrably different.

## Canon Sources

All 12 canon sources are UNCHANGED from v1.2.4 (same hashes).
