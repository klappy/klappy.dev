---
# ─── writings/ essay template ──────────────────────────────────────────────
# Copy this file to writings/<your-slug>.md and fill it in. Every field below
# the divider is REQUIRED by the frontmatter validator
# (scripts/validate-frontmatter.py) for ALL essays in writings/, regardless of
# where they surface. Leaving any of them out fails CI — and, historically,
# silently dropped the essay from the homepage.
#
# Underscore-prefixed files (this one) are skipped by the validator.

# ── Universal (every document) ──
uri: "klappy://writings/REPLACE-WITH-SLUG"
title: "REPLACE — the essay title"
audience: public            # public | canon | docs | odd | operators | apocrypha
exposure: public            # public = ON THE HOMEPAGE | nav = navigable, NOT promoted | draft | hidden | internal
tier: 2                     # 1 foundational | 2 governance | 3 operational | 4 ephemeral
voice: first_person         # first_person | neutral | direct | narrative | conversational | authoritative
stability: draft            # stable | semi_stable | evolving | draft | experimental
tags: ["REPLACE", "tags"]

# ── Renderer-critical for EVERY essay (missing = empty card / silent drop) ──
public: true                # true = real published essay; false = draft/internal. MUST be an unquoted boolean.
type: "essay"               # essay | article
slug: "REPLACE-WITH-SLUG"   # must match the filename and the uri tail
hook: "REPLACE — one or two sentences that open with the reader's pain."
description: "REPLACE — 1-3 sentence summary used for the card and social preview."

# ── Recommended ──
date: "2026-01-01"
epoch: "E0009"
og_description: "REPLACE — social/OG description (can mirror description)."

# ── Optional: curated homepage reading path ──
# Set BOTH of these only if this essay belongs on the ordered 'start here'
# path on the homepage. Omit them otherwise — exposure: public alone already
# puts the essay in the homepage feed.
# start_here: true
# start_here_order: 99
# ─────────────────────────────────────────────────────────────────────────────
---

Write the essay here.
