---
uri: klappy://docs/orchestrator/usage-promotions
title: "Using Promotions"
subtitle: "How to capture learning and propose Canon changes with evidence"
audience: docs
exposure: nav
tier: 2
voice: neutral
stability: evolving
tags: ["promotions", "learning", "canon", "governance"]
---

# Using Promotions

> Promotions are system memory. They prevent repeating the same failure forever.

## What a promotion is

A promotion artifact is a proposal to improve Canon based on observed reality:

- repeated validation failures
- repeated confusion / lookups
- unclear rules requiring explanation
- enforcement friction without learning

Promotions do NOT change Canon automatically.
Humans decide.

## Where promotions live

- `docs/promotions/`

Start with:

- `docs/promotions/README.md`
- `docs/promotions/TEMPLATE.md`

## When to create a promotion

Create a promotion when:

- the same failure pattern happens again
- Validation keeps flagging the same gap
- Librarian answers the same "where is the rule?" question repeatedly

This is signal-triggered governance (see `canon/diagnostics/epistemic-hygiene.md`).

## How to create one

1. Copy the template
2. Fill it with observed evidence (no vibes)
3. Link to the relevant Canon doc(s)
4. Mark status as `proposed`

## What happens next

A promotion can be:

- **Accepted** → results in a Canon edit
- **Rejected** → recorded reason
- **Deferred** → explicitly tracked as unresolved learning

Promotions keep Canon from becoming ideology.
