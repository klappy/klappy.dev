---
uri: klappy://docs/promotions/P0009-dolcheo-not-dolcheo-plus-h-anti-pattern
title: "P0009: DOLCHEO+H Is Not the Vocabulary — Explicit Anti-Pattern Callout"
audience: docs
exposure: nav
tier: 3
voice: neutral
stability: evolving
tags: ["promotions", "proposed", "dolcheo", "vocabulary", "anti-pattern", "amendment"]
promotion_status: proposed
---

# P0009: DOLCHEO+H Is Not the Vocabulary — Explicit Anti-Pattern Callout

> The vocabulary is DOLCHEO. The H (Handoffs) is the fifth letter of the seven-letter acronym. Writing "DOLCHEO+H" is residue from the superseded OLDC+H vocabulary and doubles the H. Add an explicit anti-pattern callout to the canon definition.

## Observed Pattern

`canon/definitions/dolcheo-vocabulary.md` (2026-04-19) supersedes the earlier `OLDC+H` vocabulary. In OLDC+H, Handoffs were tacked on with `+H` because the original four letters did not include them. DOLCHEO absorbed Handoffs into the seven-letter acronym (D-O-L-C-**H**-E-O), eliminating the need for the suffix.

The pattern observed across many sessions and repositories is that the `+H` suffix survives as muscle memory in agents and as residue in canon documents. It propagates because:

1. The DOLCHEO vocabulary doc itself lists "OLDC+H" as a discoverability search term in its `## Discoverability` section, exposing the legacy form to BM25 search
2. The doc's `## See Also` correctly links the superseded `OLDC+H` doc, but does not explicitly say *do not write `DOLCHEO+H`*
3. At least one canon-resident artifact in a sibling repo (`klappy/PTXprint-MCP/canon/encodings/pr-30-fresh-validator-ledger.md`) contains the malformed string "DOLCHEO+H encoding of findings"
4. Agents reading that ledger as evidence echo the malformed form back when synthesizing patterns from it

The result is a recurring hallucination across sessions: agents write "DOLCHEO+H" believing it is correct because they have seen it in canon-adjacent context. The fix is one explicit anti-pattern callout in the authoritative vocabulary doc, which makes the malformed string searchable as "do not write this."

- Affects: every session that captures DOLCHEO artifacts; every downstream consumer of session ledgers
- Outcome without the callout: the malformed string keeps re-appearing in new artifacts; downstream agents propagate it; operators encounter the same correction across multiple sessions
- Outcome with the callout: oddkit_search for "DOLCHEO+H" surfaces the anti-pattern note; agents reading the vocabulary doc see the explicit "do not" and bounce off; the residue is killed at the source

## Evidence

| Validation Session | Date | Outcome | Notes |
| --- | --- | --- | --- |
| Session producing this slate | 2026-05-03 | Hallucinated "DOLCHEO+H" 8 times across 2 artifacts | Agent (Claude) propagated the form from PTXprint PR #30 ledger header into freshly-authored slate documents. Operator caught and corrected mid-session: "I have no idea where you keep making up the H." |
| `klappy/PTXprint-MCP` `canon/encodings/pr-30-fresh-validator-ledger.md` | 2026-Q2 | Canon-resident artifact contains the malformed string | Line ~12 of body: "DOLCHEO+H encoding of findings from the independent validation of PR #30." |
| Operator's stated experience | recurring | "Resurfacing every conversation" | Operator's framing on 2026-05-03: "It's minor but I'm frustrated at it resurfacing every conversation" — direct testimony of the recurring hallucination across multiple sessions |

**Total observations**: 3 across multiple sessions and at least 2 repositories
**Independent occurrences**: ≥3 distinct sessions in the operator's stated experience (the hallucination has resurfaced repeatedly; the slate-authoring session is the one that surfaced the pattern explicitly)
**Affected workflows**: every DOLCHEO artifact authored by an agent that has read OLDC+H-era context

## Current Handling

- **Detection today**: operators correct it manually when they spot it in agent output. The DOLCHEO vocabulary doc's `## Discoverability` paragraph mentions both "DOLCHEO" and "OLDC+H" as searchable terms, but does not warn against the malformed combination
- **Closest adjacent canon**: `canon/definitions/dolcheo-vocabulary.md` (the authoritative definition). The doc currently treats `OLDC+H` as a search term and a superseded predecessor, but does not flag `DOLCHEO+H` as an anti-pattern
- **Gap**: `oddkit_search` for "DOLCHEO+H" surfaces the legacy `OLDC+H` doc and ledger uses, but no document that explicitly says "this is wrong; the vocabulary is DOLCHEO; the H is already in it"

## Proposed Promotion

### Target Document

`canon/definitions/dolcheo-vocabulary.md` — append a new short section.

### Section

`## Anti-Pattern — Do Not Write "DOLCHEO+H"` (new section near the end, before `## See Also`)

### Proposed Language

```markdown
## Anti-Pattern — Do Not Write "DOLCHEO+H"

The vocabulary is **DOLCHEO**. The seven letters are D-O-L-C-**H**-E-O — Handoffs is the fifth letter, already inside the acronym. Writing **DOLCHEO+H** is malformed:

- It doubles the H (once inside the acronym, once as the suffix).
- It is residue from the superseded `OLDC+H` vocabulary (`docs/oddkit/proactive/oldc-h-vocabulary.md`), in which Handoffs were appended with `+H` because the original four letters did not include them. DOLCHEO absorbed Handoffs into the acronym; the suffix is no longer needed.
- It propagates because agents see "OLDC+H" in canon-adjacent context (this doc's See Also, ledger headers in older artifacts) and pattern-match the suffix onto the new vocabulary by mistake.

When tagging or describing session capture, write **DOLCHEO**. The Handoff section is named with the letter `H` inside the acronym, just like Decision is `D` and Encode is `E`.

### If you are reading an older artifact that uses "DOLCHEO+H"

Treat it as a typo equivalent to "DOLCHEO." Do not propagate the form into new artifacts. If editing the older artifact, correct it.

### Receipts

- `klappy/PTXprint-MCP/canon/encodings/pr-30-fresh-validator-ledger.md` line ~12 — contains "DOLCHEO+H encoding of findings." Marked here as the propagation source for at least one downstream session's hallucination chain.
- 2026-05-03 slate-authoring session — agent propagated the form 8 times across two synthesis documents before operator correction. Direct stimulus for this anti-pattern callout.
```

### Rationale

The callout is two paragraphs of net-new prose. It makes the malformed string findable through `oddkit_search` (which is the only way agents discover canon during preflight). Once the anti-pattern entry exists, an agent searching for "DOLCHEO+H" or for "DOLCHEO encoding" will hit the explicit warning and bounce off, rather than echoing the malformed form into new artifacts.

This is the simplest, lowest-risk way to kill a recurring hallucination at the source — a single paragraph of canon weighed against an unbounded sequence of operator corrections in future sessions.

The PTXprint PR-30 ledger's malformed instance is also flagged as a receipt so a future canon-cleanup pass can correct it at the source repo.

## Risk Assessment

| Risk Level | Description |
| --- | --- |
| **Low** | **Clarifies existing rule, no scope change** |
| Medium | Adds new requirement, may affect workflows |
| High | Changes existing behavior, requires migration |

**Risk level**: Low

**Mitigation**: Pure documentation addition. No workflow change. No agent retraining required — agents read the updated doc at next preflight and absorb the warning automatically. The fix is the same mechanism that produces the bug (canon read at preflight) so it is structurally aligned with how the system already self-corrects.

## Status

`proposed`

## Review Notes

(To be filled during review)

- **Reviewer**:
- **Decision**:
- **Date**:
- **Notes**:

## Execution Record

(To be filled after acceptance)

- **Commit**:
- **Canon doc updated**: `canon/definitions/dolcheo-vocabulary.md`
- **Backlink added**: Yes / No
- **Adjacent cleanup recommended**: `klappy/PTXprint-MCP/canon/encodings/pr-30-fresh-validator-ledger.md` line ~12 — separate PR in the PTXprint-MCP repo
