# D0005 — Test Execution Containment

## Decision

Test execution during attempts must stay within the attempt folder. Cross-lane testing uses mock structures inside the attempt, not actual cross-lane writes.

## Status

**Active**

## Context

During v1.2 attempt-001, the distribution test script initially wrote files to `products/website/dist/packs/`. Even though the *proposals* were contained in the attempt folder, the *test execution* crossed lane boundaries.

This violated lane isolation even though it was "just a test."

## Why

- **Lane isolation is absolute**: Not just for proposals, but for test execution too
- **Attempts are sandboxes**: Nothing should escape the attempt folder until promotion
- **Mock structures prove mechanisms**: You can verify cross-lane behavior without actually crossing

## Pattern: Mock Structures

When testing cross-lane behavior:

```
attempt-001/
├── mock-website-dist/      # Mirror of target structure
│   └── packs/
│       └── agent-skill/
│           └── prd-guide-pack.md
└── scripts/
    └── distribute.js       # Writes to mock, not real target
```

The test proves the mechanism works. Actual cross-lane changes happen during PROMOTION, not during the attempt.

## Consequences

- ✅ Attempts are fully contained (no side effects)
- ✅ Failed attempts don't leave debris in other lanes
- ✅ Mechanism is proven without risk
- ⚠️ Requires creating mock structures (minor overhead)
- ⚠️ Mock may diverge from real target (verify during promotion)

## Relationship to Canon

- **Extends**: Canon "lane-contained" principle
- **Gap filled**: Canon didn't explicitly cover test execution
- **Candidate for elevation**: Yes — this is a universal principle

## Evidence

- Conversation: 2026-01-20
- Failed test: `v1.2/attempts/attempt-001/` (initially wrote outside lane)
- Corrected test: `v1.2/attempts/attempt-001/mock-website-dist/`
- Learning source: `v1.2/attempts/attempt-001/LEARNINGS.md`
