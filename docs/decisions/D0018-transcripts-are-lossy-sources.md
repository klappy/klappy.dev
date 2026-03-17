---
uri: klappy://docs/decisions/D0018
title: "D0018: Transcripts Are Lossy Sources — Speaker Confirmation Required for Named Quotes"
audience: docs
exposure: internal
tier: 2
voice: neutral
stability: stable
tags: ["docs", "decisions", "provenance", "verification", "transcripts", "writing", "governance"]
derives_from: "canon/constraints/verification-and-evidence.md (Axiom 4 — You Cannot Verify What You Did Not Observe)"
epoch: E0006
date: 2026-03-17
---

# D0018 — Transcripts Are Lossy Sources

> Verifying a quote against a transcript only proves alignment with the transcript, not with what the speaker said. Named quotes require speaker confirmation before publication.

## Description

The provenance system for "The Broken Wall and the Buried Talent" verified all quotes against the source transcript across 22 revision rounds. The system worked correctly — every quote matched the transcript. But when the quoted speaker reviewed the published text, she identified a dropped word: "there's some there" should have been "there's something there." The transcript itself was lossy. This decision establishes transcripts as intermediary evidence, not ground truth, and requires speaker confirmation for named quotes before publication.

## Outline

- Decision
- Status
- Context
- Observation
- Learning
- Alternatives Considered
- Consequences
- Implementation
- Evidence
- Pattern Recognition

---

## Decision

1. **Provenance metadata must distinguish evidence tiers.** "Verified against transcript" and "verified by speaker" are different claims with different confidence levels. Provenance records must state which tier of verification was performed.

2. **Named quotes from transcripts require speaker confirmation before publication.** When a real person is quoted by name, the speaker is the authoritative source — not the transcript. Final verification requires the speaker to review their attributed quotes. This applies only to direct quotes attributed to named individuals, not to paraphrased content or anonymous references.

3. **Transcripts are added to the Phenomenological Limits section of Verification & Evidence.** Transcript lossiness joins audio playback and subjective experience as a category where machine verification is insufficient and human confirmation is required.

## Status

**Active**

## Context

"The Broken Wall and the Buried Talent" went through 22 revision rounds with rigorous provenance tracking. The system caught and corrected six errors: a fabricated quote, a wrong family attribution, an incorrect collaborator attribution, a parable extrapolation that needed clarification, overclaims, and accusatory tone. Eleven items were fact-checked. All quotes were verified against the original transcript.

The system performed exactly as designed. The gap was not in execution but in the model of what constitutes sufficient evidence. The transcript was treated as ground truth when it was actually a lossy intermediary — an imperfect rendering of the spoken word. The speaker caught what the system could not: a single dropped word that changed the meaning from unclear ("there's some there") to clear ("there's something there").

This is structurally identical to the phenomenological limits already documented in canon: some properties cannot be machine-verified. Transcription fidelity is one of them.

## Observation

The provenance system verified all Yvonne Carlson quotes against the Feb 26 transcript. The quote `"So I think there's some there — in this process of interacting with AI, can God be calling us back to himself?"` matched the transcript exactly. When Yvonne reviewed the essay, she identified that she had said "something" not "some" — the transcript had dropped a word. The verification was faithful to its source; the source was lossy.

## Learning

Transcripts are lossy intermediaries, not ground truth. They inherit errors from transcription technology (dropped words, mishearings, speaker attribution mistakes) and from the oral medium itself (false starts, self-corrections that get flattened). Verifying against a transcript only proves alignment with the transcript. It does not prove alignment with what the speaker intended to say.

This is especially critical for an oral-first workflow where all content begins as voice. The entire pipeline — voice → transcript → encoding → publication — has a lossy step in the middle. The system must account for this.

The existing memory note about transcription hallucination (fabricating colleagues in solo recordings) is a related but distinct failure mode. This decision addresses a subtler problem: the transcript is mostly correct but occasionally drops or alters words in ways that change meaning.

## Alternatives Considered

1. **Do nothing — rely on existing provenance notes.** Rejected. The gap is systemic, not one-off. Every essay with named quotes from transcripts has this vulnerability.

2. **Require speaker review of all content mentioning them.** Rejected as too broad. The constraint should be scoped to direct quotes attributed to named individuals. Paraphrased content and thematic descriptions don't carry the same fidelity obligation.

3. **Improve transcription technology.** Not a solution. Even perfect transcription cannot capture speaker intent vs. literal words. The speaker remains the authoritative source of what they meant to say.

## Consequences

- ✅ Named quotes are verified by the only authoritative source: the speaker
- ✅ Provenance records gain a clear evidence tier system (transcript vs. speaker)
- ✅ Oral-first workflow has an explicit quality gate for the lossy step
- ✅ Existing canon (Verification & Evidence) gains a concrete new failure mode
- ⚠️ Adds a human-in-the-loop step before publication of essays with named quotes
- ⚠️ Requires tracking which speakers have confirmed vs. only transcript-verified

## Implementation

- Amendment: `canon/constraints/verification-and-evidence.md` — add transcript lossiness to Phenomenological Limits
- Amendment: `writings/the-broken-wall-and-the-buried-talent.md` — provenance correction entry and quote fix
- Governance: Future essays with named quotes must include a `speaker_confirmed` field in provenance metadata
- Index: Update `docs/decisions/README.md` with D0018 entry

## Evidence

- Yvonne Carlson email (Mar 17, 2026): identified "there's some there" should be "there's something there"
- Essay provenance record: 22 revision rounds, 11 fact-check items, 6 corrections — all verified against transcript
- Existing memory: "Transcription tools can hallucinate colleagues in solo voice recordings — fabricated meeting contexts require vigilance; verify before encoding"

## Pattern Recognition

- **Anti-pattern identified:** Treating intermediary evidence as ground truth. The transcript is a derived artifact, not a primary source. The speaker is the primary source.
- **Elevation candidate:** Already elevated — this amends `canon/constraints/verification-and-evidence.md` directly.
- **Recurrence check:** This pattern has appeared before: the memory note about transcription hallucination in solo recordings is the same class of problem (transcript ≠ reality). The difference is severity — hallucinated participants are obvious on review; dropped words are subtle and can pass 22 revision rounds undetected.
- **Broader pattern:** Every lossy step in a pipeline that is treated as lossless will eventually produce a verified lie. This is the verification equivalent of the stale cache incident — the system reported truth faithfully, but the source it reported from was wrong.
