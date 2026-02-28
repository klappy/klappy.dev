# Proposed Governance Additions — From Ch16 Session (2026-02-27)

These additions encode process learnings from the first full chapter revision session.
They touch four areas of the governance doc.

---

## 1. Definition of Done — Add 4 new checklist items

Current checklist has 9 items. Add after "Author review":

```
- [ ] Scripture verified against BSB (not memory, not KJV/ESV contamination)
- [ ] Quotes from real people verified against source transcripts
- [ ] Cross-checked against published chapters for consistency (no relitigating, no contradicting)
- [ ] Overclaiming pass — lived experience stated as lived experience, not demographic fact
```

---

## 2. New Editorial Rule — Rule 10: Confession before accusation

```
### Rule 10: Conviction lands through shared confession, not accusation

Chapters that need prophetic teeth use "we" not "you." The author includes himself
in the indictment before calling forward. Present tense mirrors ("we are") are earned
by shared confession — they sting because the reader can't dismiss them as finger-pointing.

The structural pattern (from Ephesians 4→5:1): name the darkness honestly, pivot on
identity, call to imitation as beloved children — not as terrified servants.

This is not softening. It is the difference between a sermon that gets tuned out
and a mirror that can't be put down.
```

---

## 3. Draft-Zero Process — Add "Known Hazards" subsection

Insert after "What a draft-zero is NOT" and before "Draft-zero structure":

```
### Known hazards in draft-zeros

These failure modes were discovered during chapter revision and apply to all draft-zeros:

**1. Fabricated attributed quotes.** AI will generate dialogue with quotation marks
attributed to real people. These quotes will sound perfectly in character, fit the
argument, and be completely invented. Every attributed quote in a draft-zero must be
verified against source transcripts before promotion. No exceptions.

**2. Translation contamination in scripture.** AI will blend KJV, ESV, NIV, and BSB
phrasing from memory. "Mountains" instead of "hills," "would not" instead of "did not."
Every scripture quotation must be mechanically verified against BSB text, not trusted
from AI memory.

**3. Tone drift from guide posture to pulpit.** A chapter can be first-person and still
preach at the reader. The specific failure mode: "you buried your talent" instead of
"we buried our talent." Draft-zeros default to accusatory second person. The revision
pass must convert to shared confession where conviction is needed.

**4. Overclaiming has a specific shape in this book.** Watch for: lived experience
stated as demographic fact, directional trends stated as absolutes, exceptions named
as endorsements, and complex history compressed into single-cause claims. The fix is
usually "in my experience" or naming who held the shaping power rather than claiming
total absence.

**5. Contradiction with published chapters.** Draft-zeros don't check what's already
published. A draft-zero may relitigate an origin story, contradict a timeline, or
reframe something the reader has already been told. Every draft-zero revision must
be cross-checked against published chapters for consistency.
```

---

## 4. Writing a chapter — Add verification steps

Current "Writing a chapter" process has 6 steps. Replace with:

```
### Writing a chapter

1. Read the draft-zero (if one exists) for direction and key beats
1. Author provides real examples, personal testimony, and corrections
1. AI drafts in collaboration — author voice, not AI projection
1. Apply guide posture: open with reader's pain
1. Apply Ecclesiastes through-line: where's the "nothing new"?
1. **Verify all scripture against BSB** — mechanical check, not memory
1. **Verify all attributed quotes against source transcripts** — line by line
1. **Cross-check claims against published chapters** for consistency
1. **Overclaiming pass** — flag lived-experience-as-demographic-fact, absolutes, false endorsements
1. **Tone pass** — confession before accusation where conviction is needed
1. Author reviews for hallucination, overclaiming, and voice
```

---

## 5. Key Decisions Log — New entry

```
**2026-02-27 — Chapter 16 Revision Session**

1. **Transcript verification process established** — all attributed quotes verified line-by-line against source transcripts. Categories: VERIFIED, CORRECTED, FABRICATED. One fabricated quote discovered and removed from Ch16.
2. **BSB scripture verification added to Definition of Done** — mechanical check, not AI memory. Three translation contaminations found and corrected in Ch16 (Psalm 121:1, Nehemiah 3:5).
3. **Rule 10 added: Confession before accusation** — prophetic chapters use "we" not "you." Ephesians 4→5:1 pattern (name darkness, pivot identity, call to imitation) established as structural template for chapters needing conviction + invitation.
4. **Overclaiming patterns identified** — lived experience as demographic fact, directional trends as absolutes, exceptions as endorsements, complex history as single-cause claims. These are book-specific failure modes, not generic.
5. **Cross-reference discipline added** — draft-zeros must be checked against published chapters. Ch16 nearly contradicted Ch1's axiom origin story.
6. **Draft-zero fabrication hazard named** — AI generates attributed dialogue that sounds perfectly in character and is completely invented. Named as known hazard in draft-zero process.
7. **Ephesians 5:1 discovered as structural pattern** — "beloved children" vs. "terrified servants" frames the identity pivot for chapters with prophetic conviction. May apply beyond Ch16.
8. **Provenance receipts standard adopted** — every chapter includes a `provenance` metadata block showing revision rounds, sources verified, corrections made, author interventions, and governance applied. This is the book proving its own thesis: the collaboration is messy, correction-heavy, and honest — not polished AI slop.
```

---

## 6. Provenance Receipts — New metadata standard

Add to Definition of Done checklist:

```
- [ ] Provenance metadata block included with revision history
```

Add as new section after "Definition of Done":

```
## Provenance Receipts — Per Chapter

Every chapter that moves beyond draft-zero includes a `provenance` block in its
frontmatter. This is not optional — it's the book eating its own cooking.
"A claim is a debt." If the claim is "this was genuinely collaborative," the debt
is showing the work.

### Required fields

- **revision_rounds** — approximate count of editing passes
- **sources_verified** — what was checked against what (transcripts, scripture, etc.)
- **corrections** — what was caught and fixed (fabrications, attribution errors, overclaims, tone)
- **author_interventions** — where the author overrode, redirected, or corrected the AI
- **governance_applied** — which audits and checks were run

### Why this matters

AI slop doesn't have a correction log. AI slop doesn't catch its own fabricated
quotes. AI slop doesn't have the author pushing back saying "that wasn't even him."

The provenance block is evidence that the epistemic discipline described in the book
was actually applied to the book itself. It shows the mess, not just the polish.
It differentiates genuine human-AI collaboration from generation-and-publish.

### Template

    provenance:
      revision_rounds: [number]
      sources_verified:
        - "[source] — [what was checked]"
      corrections:
        - "[what was caught and fixed]"
      author_interventions:
        - "[where author overrode or redirected]"
      governance_applied:
        - "[audit or check applied]"
```
